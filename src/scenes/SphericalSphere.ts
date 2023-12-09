import * as THREE from "three";
import { ShaderService } from "../helpers";
// shaders

import { UpdatableObject3D } from "../abstractions";
import { spherical_frag, spherical_vertix } from "../shaders";
import { ResourcesUtil } from "../utils/resources";
export class SphericalSphere extends UpdatableObject3D {
  objectName: string = "SphericalSphere";

  uniforms: Record<string, THREE.Uniform | { value: number }> = {
    uRadius: { value: 0.9 },
    uTime: { value: 1 },
  };

  constructor() {
    super();
    this.set();
    this.setUniformControllers();
  }

  set() {
    const service = new ShaderService(
      {
        vertix: spherical_vertix,
        frag: spherical_frag,
      },
      {
        ...this.uniforms,
        uImage: { value: ResourcesUtil.items.colorful_texture },
      },
      new THREE.MeshStandardMaterial({
        color: "red",
        metalness: 0.1,
        roughness: 0.9,
        wireframe: true,
      })
    );
    const geometry = new THREE.IcosahedronGeometry(1, 100);
    const material = service.customShaderMaterial;

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.customDepthMaterial = service.depthMaterial;
    this.mesh.receiveShadow = true;
    this.mesh.castShadow = true;
    this.mesh.position.y = 3;

    this.materials.push(material);
    this.geometries.push(geometry);
  }

  resize() {}

  update({ delta, elapsed }) {}
}
