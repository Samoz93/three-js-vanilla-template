// src
import { Object3D } from "three";

// helpers
import BakedModel from "../helpers/bakeModel.js";
import { GlobalUtil } from "../utils/global.js";
import { TimeUtil } from "../utils/time.js";
import { ElementAbstract } from "./ElementsAbstract.js";

export default class Box extends ElementAbstract {
  set(): void {
    this.bakeBox();
    this.setBox();
  }
  model: Object3D;
  constructor() {
    super();
    this.set();
  }

  bakeBox() {
    this.model = new BakedModel(
      this.resources.items.boxModel,
      this.resources.items.boxTexture,
      1
    ).getModel();
  }

  setBox() {
    this.model.position.y = 1;
    GlobalUtil.scene.add(this.model);
  }

  animateBox() {
    this.model.rotation.x = TimeUtil.elapsed * 0.0005;
    this.model.rotation.y = TimeUtil.elapsed * 0.0005;
    this.model.rotation.z = TimeUtil.elapsed * 0.0005;
  }

  resize() {}

  update() {
    this.animateBox();
  }
}
