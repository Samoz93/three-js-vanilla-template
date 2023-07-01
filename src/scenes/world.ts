// src

// scenes
import _ from "lodash";
import { Experience } from "../experience.js";
import Dancer from "./dancer.js";
import Environment from "./environment.js";
import Plane from "./plane.js";
import MySphere from "./sphere.js";

export default class World {
  environment: Environment;
  objects = [Plane, MySphere, Dancer];

  set(): void {
    const { resources, scene } = Experience;
    resources.on("ready", () => {
      this.environment = new Environment();
      _.forEach(this.objects, (Obj) => {
        const obj = new Obj();
        scene.add(obj.mesh);
      });
    });
  }

  constructor() {
    this.set();
  }
}
