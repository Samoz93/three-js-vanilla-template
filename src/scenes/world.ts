// src

// scenes
import _ from "lodash";
import { Spherical } from "three";
import { GlobalUtil } from "../utils/global.js";
import { ResourcesUtil } from "../utils/resources.js";
import Environment from "./environment.js";
import ParticlesImage from "./particles.js";

export default class World {
  environment: Environment;
  objects = [ParticlesImage];

  private set(): void {
    ResourcesUtil.on("ready", () => {
      this.environment = new Environment();
      _.forEach(this.objects, (Obj) => {
        const obj = new Obj();
        // if (!(obj instanceof Plane)) {
        //   obj.mesh.position.x = Math.round(random(true) * 5);
        //   obj.mesh.position.z = Math.round(random(true) * 5);
        // }
        GlobalUtil.scene.add(obj.mesh);
      });
    });
  }

  init = () => {
    this.set();
  };
}

export const TheWorld = new World();
