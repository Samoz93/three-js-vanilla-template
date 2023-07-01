import * as THREE from "three";
import { GlobalUtil } from "../utils/global";

// src

export default class Environment {
  private parameters = {
    sunlight: {
      color: "#ffffff",
      intensity: 0.1,
      position: {
        x: 1,
        y: 5,
        z: 0,
      },
    },
    ambientlight: {
      color: "#ffffff",
      intensity: 0.1,
    },
    fog: {
      color: "#000000",
      intensity: 0.01,
    },
  };

  constructor() {
    this.set();
  }

  private setSunlight() {
    this.sunLight = new THREE.DirectionalLight(
      this.parameters.sunlight.color,
      this.parameters.sunlight.intensity
    );
    // this.sunLight.castShadow = true;
    this.sunLight.shadow.camera.far = 20;
    this.sunLight.shadow.mapSize.set(1024, 1024);
    this.sunLight.shadow.normalBias = 0.05;

    this.sunLight.position.set(
      this.parameters.sunlight.position.x,
      this.parameters.sunlight.position.y,
      this.parameters.sunlight.position.z
    );
    GlobalUtil.scene.add(this.sunLight);
  }

  private setAmbientLight() {
    this.ambientLight = new THREE.AmbientLight(
      this.parameters.ambientlight.color,
      this.parameters.ambientlight.intensity
    );
    const light1 = new THREE.DirectionalLight("blue", 0.5);
    light1.position.y = 4;
    light1.position.x = 2;
    light1.position.z = 2;
    light1.castShadow = true;
    light1.shadow.camera.far = 20;
    light1.shadow.camera.near = 1;
    light1.shadow.bias = 0.001;

    light1.lookAt(0, 0, 0);
    GlobalUtil.scene.add(light1);

    GlobalUtil.scene.add(this.ambientLight);
  }

  private setFog() {
    this.fog = new THREE.FogExp2(
      this.parameters.fog.color,
      this.parameters.fog.intensity
    );
    GlobalUtil.scene.fog = this.fog;
  }

  set(): void {
    this.setSunlight();
    this.setAmbientLight();
    this.setFog();
  }

  resize() {}

  update() {}
}
