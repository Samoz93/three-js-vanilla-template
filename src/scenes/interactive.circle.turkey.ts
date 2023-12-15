import * as THREE from "three";
import { UpdatableObject3D } from "../abstractions";
import { CameraUtil } from "../camera";
import { RendererUtil } from "../renderer";
import {
  interactive_particles_frag,
  interactive_particles_vertix,
  interactive_sim_frag_turkey,
  interactive_sim_vertix,
} from "../shaders";
import { GlobalUtil } from "../utils/global";
import { TimeUtil } from "../utils/time";

export default class InteractiveCircleTurkey extends UpdatableObject3D {
  objectName: string = "InteractiveCircle";
  size = 126;
  data: Float32Array;

  inited = false;

  uniforms: Record<string, THREE.Uniform<any> | { value: any }> = {
    // uPosition: { value: [] },
    uResolution: { value: new THREE.Vector4(0, 0, 0, 0) },
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
  };

  constructor() {
    super();
    this.setFBOTexture();
    this.setMainMesh();
    this.inited = true;
    this.setUpPointer();
  }

  setUpPointer() {
    const dummy = new THREE.Mesh(
      new THREE.PlaneGeometry(100, 100),
      new THREE.MeshBasicMaterial({ color: 0xff0000 })
    );
    const raycaster = new THREE.Raycaster();
    TimeUtil.on("pointermove", (mouse) => {
      raycaster.setFromCamera(mouse, CameraUtil.perspectiveCamera);
      const intersects = raycaster.intersectObject(dummy);
      if (intersects.length > 0) {
        const { x, y } = intersects[0].point;
        this.fboMaterial.uniforms.uMouse.value = new THREE.Vector2(x, -y);
      }
    });
  }

  fbo: THREE.WebGLRenderTarget = RendererUtil.getRenderTarget();
  fbo1: THREE.WebGLRenderTarget = RendererUtil.getRenderTarget();
  fboScene = new THREE.Scene();
  fboCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, -1, 1);
  fboMaterial: THREE.ShaderMaterial;
  fboTexture: THREE.Texture;
  material: THREE.ShaderMaterial;
  fobMesh: THREE.Mesh;

  getRandomData(isRandom = false) {
    this.data = new Float32Array(this.size * this.size * 4);

    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        const stride = (j + this.size * i) * 4;
        if (isRandom) {
          this.data[stride] = Math.random() + 0.5;
          this.data[stride + 1] = Math.random() + 0.5;
        } else {
          let theta = Math.random() * Math.PI * 2;
          let radius = 0.5 + Math.random() * 0.5;
          this.data[stride] = radius * Math.cos(theta);
          this.data[stride + 1] = radius * Math.sin(theta);
        }
        this.data[stride + 2] = 1;
        this.data[stride + 3] = 1;
      }
    }

    const text = new THREE.DataTexture(
      this.data,
      this.size,
      this.size,
      undefined,
      THREE.FloatType
    );

    text.magFilter = THREE.NearestFilter;
    text.minFilter = THREE.NearestFilter;
    text.needsUpdate = true;

    return text;
  }
  setFBOTexture() {
    this.fboTexture = this.getRandomData();

    this.fboMaterial = new THREE.ShaderMaterial({
      vertexShader: interactive_sim_vertix,
      fragmentShader: interactive_sim_frag_turkey,
      uniforms: {
        ...this.uniforms,
        uPosition: { value: this.fboTexture },
        uInfo: {
          value: this.getRandomData(true),
        },
      },
      transparent: true,
      side: THREE.DoubleSide,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);

    this.fobMesh = new THREE.Mesh(geometry, this.fboMaterial);
    this.fboScene.add(this.fobMesh);

    RendererUtil.webglRenderer.setRenderTarget(this.fbo);
    RendererUtil.webglRenderer.render(this.fboScene, this.fboCamera);
    RendererUtil.webglRenderer.setRenderTarget(this.fbo1);
    RendererUtil.webglRenderer.render(this.fboScene, this.fboCamera);
    RendererUtil.webglRenderer.setRenderTarget(null);
    RendererUtil.webglRenderer.render(
      GlobalUtil.scene,
      CameraUtil.perspectiveCamera
    );
  }

  setMainMesh() {
    this.material = new THREE.ShaderMaterial({
      vertexShader: interactive_particles_vertix,
      fragmentShader: interactive_particles_frag,
      uniforms: { ...this.uniforms, uPosition: { value: this.fboTexture } },
      transparent: true,
      side: THREE.DoubleSide,
    });

    // Set uv
    const count = this.size ** 2;
    let circleGeometry = new THREE.BufferGeometry();
    let position = new Float32Array(count * 3);
    let uv = new Float32Array(count * 2);

    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        const stride = j + this.size * i;
        position[stride * 3] = Math.random();
        position[stride * 3 + 1] = Math.random();
        position[stride * 3 + 2] = 0;

        uv[stride * 2] = i / this.size;
        uv[stride * 2 + 1] = j / this.size;
      }
    }

    circleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(position, 3)
    );
    circleGeometry.setAttribute("uv", new THREE.BufferAttribute(uv, 2));

    this.mesh = new THREE.Points(circleGeometry, this.material);
    // this.mesh.rotation.x = -Math.PI / 2;
    this.geometries.push(circleGeometry);
    this.materials.push(this.material);

    // RendererUtil.webglRenderer.setRenderTarget(this.fbo1);
    // RendererUtil.webglRenderer.render(this.fboScene, this.fboCamera);
  }

  resize() {}

  update() {
    if (!this.inited) return;

    this.fboMaterial.uniforms.uPosition.value = this.fbo1.texture;
    this.material.uniforms.uPosition.value = this.fbo.texture;

    // this.fobMesh.rotation.x -= 0.001;
    RendererUtil.webglRenderer.setRenderTarget(this.fbo);
    RendererUtil.webglRenderer.render(this.fboScene, this.fboCamera);

    RendererUtil.webglRenderer.setRenderTarget(null);
    RendererUtil.webglRenderer.render(
      GlobalUtil.scene,
      CameraUtil.perspectiveCamera
    );

    let temp = this.fbo;
    this.fbo = this.fbo1;
    this.fbo1 = temp;
  }
}
