import * as THREE from "three";

// shaders
import { dissolve_frag, dissolve_vertix } from "../shaders";

import { UpdatableObject3D } from "../abstractions";
import { DissolveShaderService } from "../helpers";
import { ResourcesUtil } from "../utils/resources";

export default class Dancer extends UpdatableObject3D {
  objectName: string = "dance";
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
    const objects = ["Object_4", "Object_5"];
    const dancer = new THREE.Group();

    objects.forEach((objName) => {
      const obj = ResourcesUtil.items.dancer.scene?.getObjectByName(
        objName
      ) as THREE.Mesh;

      // Sphere data
      const shaderService = new DissolveShaderService(
        {
          frag: dissolve_frag,
          vertix: dissolve_vertix,
        },
        this.uniforms,
        obj.material as THREE.Material
      );

      obj.geometry = shaderService.setUpGeometryAttributes(obj.geometry);
      obj.material = shaderService.customShaderMaterial;
      obj.customDepthMaterial = shaderService.depthMaterial;

      obj.castShadow = true;
      dancer.add(obj);

      this.geometries.push(obj.geometry);
      this.materials.push(obj.material, obj.customDepthMaterial);
    });

    dancer.scale.set(0.01, 0.01, 0.01);
    dancer.position.y = 2;
    this.mesh = dancer;
  }

  resize() {}
  update(data: { delta: number; elapsed: number }): void {}
}
