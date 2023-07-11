import * as THREE from "three";
import {
  EffectComposer,
  Pass,
} from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { CameraUtil } from "./camera";
import { GlobalUtil } from "./utils/global";
import { SizesUtil } from "./utils/sizes";

// src

class RendererCls {
  init = () => {
    this.setRenderer();
  };
  webglRenderer: THREE.WebGLRenderer;
  composer: EffectComposer;

  addPass(pass: Pass) {
    this.composer.addPass(pass);
  }

  removePass(pass: Pass) {
    this.composer.removePass(pass);
  }

  private setRenderer() {
    this.webglRenderer = new THREE.WebGLRenderer({
      canvas: GlobalUtil.canvas,
      antialias: true,
    });

    this.webglRenderer.useLegacyLights = true;
    this.webglRenderer.outputEncoding = THREE.sRGBEncoding;
    this.webglRenderer.toneMapping = THREE.CineonToneMapping;
    this.webglRenderer.toneMappingExposure = 0.8;
    this.webglRenderer.shadowMap.enabled = true;
    this.webglRenderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.webglRenderer.setSize(SizesUtil.width, SizesUtil.height);
    this.webglRenderer.setPixelRatio(SizesUtil.pixelRatio);
    this.composer = new EffectComposer(this.webglRenderer);
    const renderPass = new RenderPass(
      GlobalUtil.scene,
      CameraUtil.perspectiveCamera
    );
    const bloom = new UnrealBloomPass(
      new THREE.Vector2(1024, 1024),
      0.3,
      0.4,
      0.7
    );
    this.composer.addPass(renderPass);
    this.composer.addPass(bloom);
  }

  resize() {
    this.webglRenderer.setSize(SizesUtil.width, SizesUtil.height);
    this.webglRenderer.setPixelRatio(SizesUtil.pixelRatio);
  }

  update() {
    // this.webglRenderer.render(GlobalUtil.scene, CameraUtil.perspectiveCamera);
    if (this.composer) this.composer.render();
  }
}

export const RendererUtil = new RendererCls();
