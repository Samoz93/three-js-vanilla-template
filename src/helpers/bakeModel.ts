import * as THREE from "three";

export default class BakedModel {
  material: THREE.MeshBasicMaterial;

  constructor(
    private model: THREE.Object3D,
    private texture: THREE.Texture,
    private scale: number = 1
  ) {
    this.texture.flipY = false;
    this.texture.encoding = THREE.sRGBEncoding;

    this.material = new THREE.MeshBasicMaterial({
      map: this.texture,
    });

    this.model.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (scale) child.scale.set(scale, scale, scale);
        child.material.map = this.texture;
        child.material = this.material;
      }
    });

    return this;
  }

  getModel() {
    return this.model.scene;
  }
}
