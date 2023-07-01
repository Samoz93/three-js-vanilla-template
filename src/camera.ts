import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GlobalUtil } from "./utils/global";
import { Sizes } from "./utils/sizes";

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
      Sizes.aspect,
      0.1,
      1000
    );
    this.perspectiveCamera.position.x = 5;
    this.perspectiveCamera.position.y = 7.5;
    this.perspectiveCamera.position.z = 10;

    GlobalUtil.scene.add(this.perspectiveCamera);
  }

  createOrthographicCamera() {
    this.orthographicCamera = new THREE.OrthographicCamera(
      (-Sizes.aspect * Sizes.frustrum) / 2,
      (Sizes.aspect * Sizes.frustrum) / 2,
      Sizes.frustrum / 2,
      -Sizes.frustrum / 2,
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
    this.perspectiveCamera.aspect = Sizes.aspect;
    this.perspectiveCamera.updateProjectionMatrix();

    this.orthographicCamera.left = (-Sizes.aspect * Sizes.frustrum) / 2;
    this.orthographicCamera.right = (Sizes.aspect * Sizes.frustrum) / 2;
    this.orthographicCamera.top = Sizes.frustrum / 2;
    this.orthographicCamera.bottom = -Sizes.frustrum / 2;
    this.orthographicCamera.updateProjectionMatrix();
  }

  update() {
    this.orbitControls.update();
  }
}

export const CameraUtil = new CameraCls();
