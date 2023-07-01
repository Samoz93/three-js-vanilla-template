// src
import { CameraUtil } from "./camera.js";
import { RendererUtil } from "./renderer.js";

// utils
import { TheWorld } from "./scenes/world.js";
import { HelperUtil } from "./utils/helpers.js";
import { ResourcesUtil } from "./utils/resources.js";
// config
import assets from "./config/assets.js";
import { SizesUtil } from "./utils/sizes.js";
import { TimeUtil } from "./utils/time";
// world

class ExperienceCLS {
  init = () => {
    CameraUtil.init();
    RendererUtil.init();
    ResourcesUtil.init(assets);
    HelperUtil.init();
    TheWorld.init();

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
