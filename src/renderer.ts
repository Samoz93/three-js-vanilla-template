import * as THREE from "three";
import { DotScreenPass } from "three/examples/jsm/postprocessing/DotScreenPass";
import {
  EffectComposer,
  Pass,
} from "three/examples/jsm/postprocessing/EffectComposer.js";
import { HalftonePass } from "three/examples/jsm/postprocessing/HalftonePass";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { CameraUtil } from "./camera";
import { addControllers } from "./helpers/gui.controller";
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
    this.webglRenderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.webglRenderer.toneMappingExposure = 0.7;
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
      2,
      1.5,
      0.27
    );
    const dot = new DotScreenPass();
    const halftone = new HalftonePass(0.001, 0.0001, { shape: 0.00001 });
    this.composer.addPass(renderPass);
    // this.composer.addPass(bloom);
    // this.composer.addPass(halftone);
    // this.composer.addPass(dot);
    addControllers(
      "renderer",
      "toneMapping",
      (val) => {
        this.webglRenderer.toneMappingExposure = val;
      },
      0.6,
      { min: 0.2, max: 2, steps: 0.01 }
    );

    addControllers(
      "renderer",
      "BloomStrength",
      (val) => {
        bloom.strength = val;
      },
      2,
      { min: 0.2, max: 10, steps: 0.01 }
    );
    addControllers(
      "renderer",
      "BloomThreshold",
      (val) => {
        bloom.threshold = val;
      },
      0.6,
      { min: 0.27, max: 1, steps: 0.01 }
    );
    addControllers(
      "renderer",
      "BloomRadius",
      (val) => {
        bloom.radius = val;
      },
      0.6,
      { min: 1.5, max: 10, steps: 0.01 }
    );
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
