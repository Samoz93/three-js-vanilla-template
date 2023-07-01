import { EventEmitter } from "events";
import * as THREE from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader.js";
import { Experience } from "../experience";

// src

export default class Resources extends EventEmitter {
  items: Record<string, GLTF> = {};
  queue = 0;
  loaded = 0;

  constructor(private assets: { type: string; path: string; name: string }[]) {
    super();
    this.queue = this.assets.length;
    this.loaded = 0;

    this.setLoaders();
    this.startLoading();
  }

  loaders: any = {};

  setLoaders() {
    this.loaders.gltfLoader = new GLTFLoader();
    this.loaders.dracoLoader = new DRACOLoader();
    this.loaders.dracoLoader.setDecoderPath("/draco/");
    this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader);

    this.loaders.ktx2Loader = new KTX2Loader();
    this.loaders.ktx2Loader.setTranscoderPath("/basis/");
    this.loaders.ktx2Loader.detectSupport(Experience.renderer.webglRenderer);

    this.loaders.textureLoader = new THREE.TextureLoader();
    this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader();
    this.loaders.audioLoader = new THREE.AudioLoader();
    this.loaders.fontLoader = new FontLoader();
  }

  startLoading() {
    for (const asset of this.assets) {
      if (asset.type === "glbModel") {
        this.loaders.gltfLoader.load(asset.path, (file) => {
          this.singleAssetLoaded(asset, file);
        });
      } else if (asset.type === "basicTexture") {
        this.loaders.ktx2Loader.load(asset.path, (file) => {
          this.singleAssetLoaded(asset, file);
        });
      } else if (asset.type === "normalTexture") {
        this.loaders.textureLoader.load(asset.path, (file) => {
          file.encoding = THREE.SRGBColorSpace;
          this.singleAssetLoaded(asset, file);
        });
      } else if (asset.type === "cubeTexture") {
        this.loaders.cubeTextureLoader.load(asset.path, (file) => {
          this.singleAssetLoaded(asset, file);
        });
      } else if (asset.type === "audio") {
        this.loaders.audioLoader.load(asset.path, (buffer) => {
          this.singleAssetLoaded(asset, buffer);
        });
      } else if (asset.type === "font") {
        this.loaders.fontLoader.load(asset.path, (buffer) => {
          this.singleAssetLoaded(asset, buffer);
        });
      } else if (asset.type === "video") {
        const video = {};
        const videoTexture = {};

        video[asset.name] = document.createElement("video");
        video[asset.name].src = asset.path;
        video[asset.name].muted = true;
        video[asset.name].playsInline = true;
        video[asset.name].autoplay = true;
        video[asset.name].loop = true;
        video[asset.name].play();

        videoTexture[asset.name] = new THREE.VideoTexture(video[asset.name]);
        videoTexture[asset.name].flipY = true;
        videoTexture[asset.name].minFilter = THREE.NearestFilter;
        videoTexture[asset.name].magFilter = THREE.NearestFilter;
        videoTexture[asset.name].generateMipmaps = false;
        videoTexture[asset.name].encoding = THREE.SRGBColorSpace;

        this.singleAssetLoaded(asset, videoTexture[asset.name]);
      }
    }
  }

  singleAssetLoaded(asset, file) {
    this.items[asset.name] = file;
    this.loaded++;

    if (this.loaded === this.queue) {
      this.emit("ready");
    }
  }
}
