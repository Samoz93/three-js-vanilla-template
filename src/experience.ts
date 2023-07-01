// src
import { CameraUtil } from "./camera.js";
import { RendererUtil } from "./renderer.js";

// utils
import World from "./scenes/world.js";
import Helpers from "./utils/helpers.js";
import { ResourcesUtil } from "./utils/resources.js";
// config
import assets from "./config/assets.js";
import { SizesUtil } from "./utils/sizes.js";
import { TimeUtil } from "./utils/time";
// world

class ExperienceCLS {
  resources: Resources;

  init = () => {
    CameraUtil.init();
    RendererUtil.init();
    ResourcesUtil.init(assets);
    this.helpers = new Helpers();
    this.world = new World();

    SizesUtil.on("resize", () => {
      this.resize();
    });
    TimeUtil.on("update", (data) => {
      CameraUtil.update();
      RendererUtil.update();
    });
  };
  resize() {
    CameraUtil.resize();
    RendererUtil.resize();
  }
}

export const Experience = new ExperienceCLS();
