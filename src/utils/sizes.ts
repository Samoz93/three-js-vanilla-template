import { EventEmitter } from "events";

class SizesCLS extends EventEmitter {
  width = window.innerWidth;
  height = window.innerHeight;
  aspect = this.width / this.height;
  pixelRatio = Math.min(window.devicePixelRatio, 2);
  frustrum = 4.5;

  constructor() {
    super();

    window.addEventListener("resize", () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.aspect = this.width / this.height;
      this.pixelRatio = Math.min(window.devicePixelRatio, 2);
      this.frustrum = 4.5;

      this.emit("resize");
    });
  }
}

export const Sizes = new SizesCLS();
