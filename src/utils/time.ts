import { EventEmitter } from "events";

export default class Time extends EventEmitter {
  start = Date.now();
  current = this.start;
  elapsed = 0;
  delta = 16;

  constructor() {
    super();
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
