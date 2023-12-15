import * as THREE from "three";
import { gui } from "../helpers/gui.controller";
import { GlobalUtil } from "./global";

export default class Helpers {
  parameters = {
    size: 10,
    divisions: 10,
    showHelpers: true,
  };

  helpers: THREE.LineSegments[] = [];
  init = () => {
    this.setAxes();
    this.setGrid();
    gui.add(this.parameters, "showHelpers", 1, 1).onChange((visible) => {
      this.helpers.forEach((helper) => {
        helper.visible = visible;
      });
    });
  };

  setAxes() {
    const axesHelper = new THREE.AxesHelper(this.parameters.size / 2);
    this.helpers.push(axesHelper);
    GlobalUtil.scene.add(axesHelper);
  }

  setGrid() {
    const gridHelper = new THREE.GridHelper(
      this.parameters.size,
      this.parameters.divisions
    );
    this.helpers.push(gridHelper);
    GlobalUtil.scene.add(gridHelper);
  }
}

export const HelperUtil = new Helpers();
