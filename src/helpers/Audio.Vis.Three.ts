import {
  Audio,
  AudioAnalyser,
  AudioListener,
  AudioLoader,
  DataTexture,
  LuminanceFormat,
  RedFormat,
} from "three";
import { RendererUtil } from "../renderer";
export class AudioVisThree {
  constructor(private file: string) {
    this.init();
  }
  fftSize = 128;
  listener = new AudioListener();
  sound = new Audio(this.listener);
  analyser = new AudioAnalyser(this.sound, this.fftSize);
  loader = new AudioLoader();

  private init() {
    this.loader.load(this.file, (buffer) => {
      this.sound.setBuffer(buffer);
      this.sound.play();
    });
  }

  format = RendererUtil.webglRenderer.capabilities.isWebGL2
    ? RedFormat
    : LuminanceFormat;

  get uniforms() {
    return {
      value: new DataTexture(
        this.analyser.data,
        this.fftSize / 2,
        1,
        this.format
      ),
    };
  }
}
