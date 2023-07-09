import * as THREE from "three";

// shaders
import { dissolve_frag, dissolve_vertix } from "../shaders";

import { UpdatableObject3D } from "../abstractions";
import { ShaderService } from "../helpers";

export default class MySphere extends UpdatableObject3D {
  objectName: string = "Sphere";

  uniforms: Record<string, THREE.Uniform | { value: number }> = {
    uProgress: { value: 0 },
    uIntensity: { value: 0 },
  };

  constructor() {
    super();
    this.setUniformControllers();
    this.set();
  }

  set() {
    // Sphere data
    const shaderService = new ShaderService(
      {
        frag: dissolve_frag,
        vertix: dissolve_vertix,
      },
      this.uniforms
    );

    const geometry = shaderService.setUpGeometryAttributes(
      new THREE.SphereGeometry(1, 32, 32)
    );

    const { depthMaterial, customShaderMaterial } = shaderService;

    this.mesh = new THREE.Mesh(geometry, customShaderMaterial);
    this.mesh.customDepthMaterial = depthMaterial;
    this.mesh.receiveShadow = true;
    this.mesh.castShadow = true;
    this.mesh.position.y = 3;

    this.materials.push(customShaderMaterial);
    this.materials.push(depthMaterial);
    this.geometries.push(geometry);
  }

  resize() {}

  update({ delta, elapsed }) {}
}
