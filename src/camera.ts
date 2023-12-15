import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GlobalUtil } from "./utils/global";
import { SizesUtil } from "./utils/sizes";

// src

class CameraCls {
  perspectiveCamera: THREE.PerspectiveCamera;
  orthographicCamera: THREE.OrthographicCamera;
  orbitControls: OrbitControls;

  init() {
    this.createPerspectiveCamera();
    this.createOrthographicCamera();
    this.setOrbitControls();
  }
  createPerspectiveCamera() {
    this.perspectiveCamera = new THREE.PerspectiveCamera(
      35,
      SizesUtil.aspect,
      0.1,
      1000
    );
    this.perspectiveCamera.position.x = 0;
    this.perspectiveCamera.position.y = 0;
    this.perspectiveCamera.position.z = 10;

    GlobalUtil.scene.add(this.perspectiveCamera);
  }

  createOrthographicCamera() {
    this.orthographicCamera = new THREE.OrthographicCamera(
      (-SizesUtil.aspect * SizesUtil.frustrum) / 2,
      (SizesUtil.aspect * SizesUtil.frustrum) / 2,
      SizesUtil.frustrum / 2,
      -SizesUtil.frustrum / 2,
      -100,
      100
    );

    GlobalUtil.scene.add(this.orthographicCamera);
  }

  setOrbitControls() {
    this.orbitControls = new OrbitControls(
      this.perspectiveCamera,
      GlobalUtil.canvas
    );
    this.orbitControls.enableDamping = true;
    this.orbitControls.enableZoom = true;
    this.orbitControls.enablePan = false;
    this.orbitControls.maxPolarAngle = Math.PI / 2;
    this.orbitControls.target.set(0, 0, 0);
  }

  resize() {
    this.perspectiveCamera.aspect = SizesUtil.aspect;
    this.perspectiveCamera.updateProjectionMatrix();

    this.orthographicCamera.left = (-SizesUtil.aspect * SizesUtil.frustrum) / 2;
    this.orthographicCamera.right = (SizesUtil.aspect * SizesUtil.frustrum) / 2;
    this.orthographicCamera.top = SizesUtil.frustrum / 2;
    this.orthographicCamera.bottom = -SizesUtil.frustrum / 2;
    this.orthographicCamera.updateProjectionMatrix();
  }

  update() {
    this.orbitControls.update();
  }
}

export const CameraUtil = new CameraCls();
