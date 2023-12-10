// src

// scenes
import _ from "lodash";
import { GlobalUtil } from "../utils/global.js";
import { ResourcesUtil } from "../utils/resources.js";
import Environment from "./environment.js";
import InteractiveCircle from "./interactive.circle.js";

export default class World {
  environment: Environment;
  objects = [InteractiveCircle];

  private set(): void {
    ResourcesUtil.on("ready", () => {
      this.environment = new Environment();
      _.forEach(this.objects, (Obj) => {
        const obj = new Obj();
        if (obj.mesh) GlobalUtil.scene.add(obj.mesh);
      });
    });
  }

  init = () => {
    this.set();
  };
}

export const TheWorld = new World();
