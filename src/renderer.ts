import * as THREE from "three";
import { CameraUtil } from "./camera";
import { GlobalUtil } from "./utils/global";
import { SizesUtil } from "./utils/sizes";

// src

class RendererCls {
  init = () => {
    this.setRenderer();
  };
  webglRenderer: THREE.WebGLRenderer;

  private setRenderer() {
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
    this.webglRenderer.setSize(SizesUtil.width, SizesUtil.height);
    this.webglRenderer.setPixelRatio(SizesUtil.pixelRatio);
  }

  resize() {
    this.webglRenderer.setSize(SizesUtil.width, SizesUtil.height);
    this.webglRenderer.setPixelRatio(SizesUtil.pixelRatio);
  }

  update() {
    this.webglRenderer.render(GlobalUtil.scene, CameraUtil.perspectiveCamera);
  }
}

export const RendererUtil = new RendererCls();
