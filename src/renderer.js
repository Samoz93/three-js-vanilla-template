import * as THREE from "three";
import { Experience } from "./experience";
import { GlobalUtil } from "./utils/global";
import { Sizes } from "./utils/sizes";

// src

export default class Renderer {
  constructor() {
    this.canvas = GlobalUtil.canvas;
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
    this.webglRenderer.setSize(Sizes.width, Sizes.height);
    this.webglRenderer.setPixelRatio(Sizes.pixelRatio);
  }

  resize() {
    this.webglRenderer.setSize(Sizes.width, Sizes.height);
    this.webglRenderer.setPixelRatio(Sizes.pixelRatio);
  }

  update() {
    this.webglRenderer.render(GlobalUtil.scene, this.camera.perspectiveCamera);
  }
}
