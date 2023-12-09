// src
import {
  Audio,
  AudioAnalyser,
  AudioListener,
  CanvasTexture,
  PlaneGeometry,
  Points,
  ShaderMaterial,
} from "three";

// helpers
import { UpdatableObject3D } from "../abstractions/basic.object.3d.js";
import { particles_fs, particles_vs } from "../shaders/index.js";
import { ResourcesUtil } from "../utils/resources.js";

export default class ParticlesImage extends UpdatableObject3D {
  resize(): void {}
  update(data: { delta: number; elapsed: number }): void {
    if (this.isReady) this.renderVideo();
    if (this.analyser) console.log(this.analyser?.getAverageFrequency());
  }
  state = {
    modelReady: false,
    modelOption: {
      architecture: "MobileNetV1",
      outputStride: 16,
      multiplier: 0.1,
      quantBytes: 2,
    },
    foregroundColor: { r: 0, g: 0, b: 0, a: 255 },
    backgroundColor: { r: 0, g: 10, b: 0, a: 0 },
    height: 400,
    width: 400,
    video: true,
    audio: true,
  };

  camEl = document.querySelector("#cam-el")!! as HTMLVideoElement;
  canvas = document.createElement("canvas")!! as HTMLCanvasElement;

  objectName: string = "ParticlesImage";
  model;
  tfjsModel;
  uniforms = {
    uRadius: {
      value: 1,
      options: {
        max: 100,
        min: 1,
        steps: 1,
      },
    },
    uDisplacement: {
      value: 0,
      options: {
        max: 2,
        min: 0,
        steps: 0.01,
      },
    },
    uTime: { value: 0 },
    uTAudio: { value: 0 },
  };
  constraints = {
    video: {
      width: {
        ideal: 1920,
        max: 2560,
      },
      height: {
        ideal: 1080,
        max: 1440,
      },
      facingMode: "user",
    },
  };

  set(): void {
    this.setBox();
  }
  constructor() {
    super();
    this.set();
    this.setUniformControllers();
    this.canvas.width = 640;
    this.canvas.height = 480;
    // this.setupCamera();
    this.setupApp();
  }

  listener = new AudioListener();
  audio = new Audio(this.listener);
  analyser = new AudioAnalyser(this.audio, 32);

  setupCamera = async (): Promise<HTMLVideoElement> => {
    if (
      "mediaDevices" in navigator &&
      "getUserMedia" in navigator.mediaDevices
    ) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      // const devices = await navigator.mediaDevices.enumerateDevices();
      // const videoDevices = devices.filter(
      //   (device) => device.kind === "videoinput"
      // );
      this.constraints = {
        ...this.constraints,
        deviceId: {
          exact:
            "b657e1467c7030619a92380f93ae9a7fccd5330793c98566950822eec301d8ba",
        },
      };
      const stream = await navigator.mediaDevices.getUserMedia(
        this.constraints
      );
      this.camEl.srcObject = stream;
      return new Promise((resolve) => {
        this.camEl.onloadedmetadata = () => {
          resolve(this.camEl);
          const x = stream.getAudioTracks()[0];
        };
      });
    }
  };

  setBox() {
    const geo = new PlaneGeometry(1, 1, 1000, 1000);
    const material = new ShaderMaterial({
      vertexShader: particles_vs,
      fragmentShader: particles_fs,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        ...this.uniforms,
        uImage: { value: ResourcesUtil.items.model_bw },
      },
    });

    this.mesh = new Points(geo, material);
    this.materials.push(material);
    this.geometries.push(geo);
  }

  setupApp = async () => {
    const video = await this.setupCamera();
    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;
    video.play();

    // 3. Setup output canvas
    const canvas = this.canvas;
    canvas.width = videoWidth;
    canvas.height = videoHeight;

    this.state.height = videoHeight;
    this.state.width = videoWidth;
    // this.renderVideo();
    this.isReady = true;
  };

  renderVideo = async () => {
    const { height, width } = this.state;

    const ctx = this.canvas.getContext("2d")!!;

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(this.camEl, 0, 0);
    ctx.filter = "grayscale(100%)";
    this.materials[0].uniforms.uImage.value = new CanvasTexture(this.canvas);
  };
}
