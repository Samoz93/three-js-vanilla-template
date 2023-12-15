// src

// scenes
import _ from "lodash";
import { GlobalUtil } from "../utils/global.js";
import { ResourcesUtil } from "../utils/resources.js";
import Dancer from "./dancer.ts";
import Environment from "./environment.js";
import InteractiveCircle from "./interactive.circle.js";
import InteractiveCircleTurkey from "./interactive.circle.turkey.js";

export default class World {
  environment: Environment;
  objects = [InteractiveCircleTurkey, InteractiveCircle, Dancer];

  private set(): void {
    ResourcesUtil.on("ready", () => {
      this.environment = new Environment();
      _.forEach(this.objects, (Obj, index) => {
        const obj = new Obj();
        obj.mesh.position.x = index * 4 - 4;
        if (obj.mesh) GlobalUtil.scene.add(obj.mesh);
      });
    });
  }

  init = () => {
    this.set();
  };
}

export const TheWorld = new World();
