import * as THREE from "three";
import { Experience } from "../experience";

export default class Helpers {
  constructor() {
    this.scene = Experience.scene;

    this.parameters = {
      size: 10,
      divisions: 10,
    };

    this.setAxes();
    this.setGrid();
  }

  setAxes() {
    const axesHelper = new THREE.AxesHelper(this.parameters.size / 2);
    this.scene.add(axesHelper);
  }

  setGrid() {
    const gridHelper = new THREE.GridHelper(
      this.parameters.size,
      this.parameters.divisions
    );
    this.scene.add(gridHelper);
  }
}
