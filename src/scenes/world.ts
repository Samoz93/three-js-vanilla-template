// src

// scenes
import _ from "lodash";
import { GlobalUtil } from "../utils/global.js";
import { ResourcesUtil } from "../utils/resources.js";
import AudioVis from "./audio.vis.js";
import Environment from "./environment.js";
import Plane from "./plane.js";

export default class World {
  environment: Environment;
  objects = [Plane, AudioVis];

  private set(): void {
    ResourcesUtil.on("ready", () => {
      this.environment = new Environment();
      _.forEach(this.objects, (Obj) => {
        const obj = new Obj();
        GlobalUtil.scene.add(obj.mesh);
      });
    });
  }

  init = () => {
    this.set();
  };
}

export const TheWorld = new World();
