import * as THREE from "three";
import { CameraUtil } from "./camera";
import { GlobalUtil } from "./utils/global";
import { Sizes } from "./utils/sizes";

// src

export default class Renderer {
  constructor() {
    this.setRenderer();
  }
  webglRenderer: THREE.WebGLRenderer;

  setRenderer() {
    this.webglRenderer = new THREE.WebGLRenderer({
      canvas: GlobalUtil.canvas,
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
    this.webglRenderer.render(GlobalUtil.scene, CameraUtil.perspectiveCamera);
  }
}
