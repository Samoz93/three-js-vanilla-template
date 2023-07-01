import * as THREE from "three";

class GlobalUtilCls {
  scene = new THREE.Scene();
  canvas;

  init(canvas) {
    this.canvas = canvas;
  }
}

export const GlobalUtil = new GlobalUtilCls();
