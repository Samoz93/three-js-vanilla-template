import * as THREE from "three";

// src
import Camera from "./camera.js";
import Renderer from "./renderer.js";

// utils
import World from "./scenes/world.js";
import Helpers from "./utils/helpers.js";
import Resources from "./utils/resources.js";
import Sizes from "./utils/sizes";
import Time from "./utils/time.js";
// config
import assets from "./config/assets.js";

// world

export default class Experience {
  static instance: Experience;

  sizes = new Sizes();
  scene = new THREE.Scene();
  time = new Time();

  resources: Resources;

  constructor(private canvas) {
    if (Experience.instance) {
      return Experience.instance;
    }

    Experience.instance = this;
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.resources = new Resources(assets);
    this.helpers = new Helpers();
    this.world = new World();

    this.sizes.on("resize", () => {
      this.resize();
    });
    this.time.on("update", (data) => {
      this.camera.update();
      this.renderer.update();
    });
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
    this.world.resize();
  }
}
