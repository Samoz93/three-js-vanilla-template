// src
import { CameraUtil } from "./camera.js";
import Renderer from "./renderer.js";

// utils
import World from "./scenes/world.js";
import Helpers from "./utils/helpers.js";
import Resources from "./utils/resources.js";
// config
import assets from "./config/assets.js";
import { Sizes } from "./utils/sizes.js";
import { TimeUtil } from "./utils/time";
// world

class ExperienceCLS {
  renderer: Renderer;

  resources: Resources;

  init = () => {
    CameraUtil.init();
    this.renderer = new Renderer();
    this.resources = new Resources(assets);
    this.helpers = new Helpers();
    this.world = new World();

    Sizes.on("resize", () => {
      this.resize();
    });
    TimeUtil.on("update", (data) => {
      CameraUtil.update();
      this.renderer.update();
    });
  };
  resize() {
    CameraUtil.resize();
    this.renderer.resize();
  }
}

export const Experience = new ExperienceCLS();
