import * as THREE from "three";

// shaders

import { UpdatableObject3D } from "../abstractions";
import { new_frag, new_vertix } from "../shaders";
import { ResourcesUtil } from "../utils/resources";
export default class BasicShaderToturial extends UpdatableObject3D {
  objectName: string = "BasicShaderToturial";

  uniforms: Record<string, THREE.Uniform | { value: number }> = {
    uRadius: { value: 0.2 },
  };

  constructor() {
    super();
    this.set();
    this.setUniformControllers();
  }

  set() {
    const geometry = new THREE.PlaneGeometry(5, 5, 100);
    console.log(ResourcesUtil.items.colorful_texture);

    const material = new THREE.ShaderMaterial({
      vertexShader: new_vertix,
      fragmentShader: new_frag,
      side: THREE.DoubleSide,
      transparent: true,
      uniforms: {
        ...this.uniforms,
        uImage: { value: ResourcesUtil.items.colorful_texture },
      },
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.receiveShadow = true;
    this.mesh.castShadow = true;
    this.mesh.position.y = 3;

    this.materials.push(material);
    this.geometries.push(geometry);
  }

  resize() {}

  update({ delta, elapsed }) {}
}
