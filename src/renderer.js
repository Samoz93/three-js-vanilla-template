import * as THREE from "three";
import { Experience } from "./experience";

// src

export default class Renderer {
  constructor() {
    this.sizes = Experience.sizes;
    this.scene = Experience.scene;
    this.canvas = Experience.canvas;
    this.camera = Experience.camera;

    this.setRenderer();
  }

  setRenderer() {
    this.webglRenderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });

    this.webglRenderer.useLegacyLights = true;
    this.webglRenderer.outputColorSpace = THREE.SRGBColorSpace;
    this.webglRenderer.toneMapping = THREE.CineonToneMapping;
    this.webglRenderer.toneMappingExposure = 1.75;
    this.webglRenderer.shadowMap.enabled = true;
    this.webglRenderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.webglRenderer.setSize(this.sizes.width, this.sizes.height);
    this.webglRenderer.setPixelRatio(this.sizes.pixelRatio);
  }

  resize() {
    this.webglRenderer.setSize(this.sizes.width, this.sizes.height);
    this.webglRenderer.setPixelRatio(this.sizes.pixelRatio);
  }

  update() {
    this.webglRenderer.render(this.scene, this.camera.perspectiveCamera);
  }
}
