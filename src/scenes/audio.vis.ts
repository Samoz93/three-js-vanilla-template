import { gsap } from "gsap";
import * as THREE from "three";
import { UpdatableObject3D } from "../abstractions";
import { audio_frag, audio_vertix } from "../shaders";

class AudioVisController {
  private listener = new THREE.AudioListener();
  private sound = new THREE.Audio(this.listener);
  private loader = new THREE.AudioLoader();
  private analyser = new THREE.AudioAnalyser(this.sound, 32);

  constructor(private mesh: THREE.Mesh, private frequencyUniformName: string) {
    this.mesh.add(this.listener);
  }

  load(path: string) {
    this.loader.load(path, (buffer) => {
      this.sound.setBuffer(buffer);
      this.sound.setLoop(true);
      this.sound.setVolume(0.1);
      this.sound.play();
    });
  }

  getFrequency() {
    return Math.max(this.analyser.getAverageFrequency() - 60, 0) / 50;
  }

  update() {
    const freq = this.getFrequency();
    const freqUniform = this.mesh.material.uniforms[this.frequencyUniformName];
    gsap.to(freqUniform, {
      duration: 0.2,
      ease: "slow.easeOut",
      value: freq,
    });
  }
}
export default class AudioVis extends UpdatableObject3D {
  objectName: string = "AudioVis";
  private uFrequency = "uFrequency";
  uniforms = {
    uRadius: { value: 1, options: { min: 0, max: 10 } },
    uTime: { value: 0 },
    [this.uFrequency]: { value: 0 },
  };

  visualizer: AudioVisController;

  constructor() {
    super();
    this.set();
    this.setUniformControllers();
  }

  set() {
    const geometry = new THREE.IcosahedronGeometry(1, 100);
    const material = new THREE.ShaderMaterial({
      vertexShader: audio_vertix,
      fragmentShader: audio_frag,
      uniforms: { ...this.uniforms },
      wireframe: false,
      side: THREE.DoubleSide,
    });

    const wireFrame = new THREE.LineSegments(
      new THREE.SphereGeometry(1, 100, 100),
      material
    );

    this.mesh = new THREE.Mesh(geometry, material);
    const WIREFRAME_DELTA = 0.014;
    wireFrame.scale.setScalar(1 + WIREFRAME_DELTA);
    this.visualizer = new AudioVisController(
      this.mesh as THREE.Mesh,
      this.uFrequency
    );
    this.visualizer.load("/audio/satara.mp3");
    this.mesh.add(wireFrame);
    this.mesh.position.y = 2;
    this.mesh.receiveShadow = true;
    this.geometries.push(geometry);
    this.materials.push(material);
  }

  resize() {}

  update({ delta, elapsed }) {
    if (this.mesh) {
      this.visualizer.update();
      this.mesh.rotation.y += Math.sin(
        delta * 0.0005 + this.visualizer.getFrequency() * 0.01
      );

      this.mesh.rotation.x -=
        delta * 0.0005 + this.visualizer.getFrequency() * 0.03;
    }
    // this.mesh.position.z += Math.cos(elapsed);
  }
}
