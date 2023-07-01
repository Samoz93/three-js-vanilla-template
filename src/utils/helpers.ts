import * as THREE from "three";
import { GlobalUtil } from "./global";

export default class Helpers {
  constructor() {
    this.parameters = {
      size: 10,
      divisions: 10,
    };

    this.setAxes();
    this.setGrid();
  }

  setAxes() {
    const axesHelper = new THREE.AxesHelper(this.parameters.size / 2);
    GlobalUtil.scene.add(axesHelper);
  }

  setGrid() {
    const gridHelper = new THREE.GridHelper(
      this.parameters.size,
      this.parameters.divisions
    );
    GlobalUtil.scene.add(gridHelper);
  }
}
