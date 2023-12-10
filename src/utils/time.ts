import { EventEmitter } from "events";

class TimeCls extends EventEmitter {
  start = Date.now();
  current = this.start;
  elapsed = 0;
  delta = 16;

  constructor() {
    super();
    window.addEventListener("pointermove", (e) => {
      const data = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
      this.emit("pointermove", data);
    });
    this.update();
  }

  update() {
    const currentTime = Date.now();
    this.delta = currentTime - this.current;
    this.current = currentTime;
    this.elapsed = this.current - this.start;

    this.emit("update", { delta: this.delta, elapsed: this.elapsed });
    window.requestAnimationFrame(() => this.update());
  }
}

export const TimeUtil = new TimeCls();
