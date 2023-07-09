import * as THREE from "three";
import { UpdatableObject3D } from "../abstractions";
import ShaderService from "../helpers/shader.service";
import { tengents_frag, tengents_vertix } from "../shaders";
import { ResourcesUtil } from "../utils/resources";
export default class TengentsObject extends UpdatableObject3D {
  objectName: string = "PlaneTengents";

  uniforms: Record<string, THREE.Uniform<any> | { value: number; options? }> = {
    uUpper: { value: 1, options: { min: -2, max: 2, steps: 0.01 } },
    uLower: { value: -1, options: { min: -2, max: 2, steps: 0.01 } },
    uAngle: { value: 1, options: { min: 0, max: 4, steps: 0.01 } },
    uIntensity: { value: 3, options: { min: 0, max: 10, steps: 0.01 } },
    uOffset: { value: 0.5, options: { min: 0, max: 0.01, steps: 0.001 } },
    uTimeIntensity: {
      value: 0.1,
      options: { min: 0, max: 1, steps: 0.001 },
    },
  };

  constructor() {
    super();
    this.set();
    this.setUniformControllers();
  }

  set() {
    const mat = new THREE.MeshPhysicalMaterial({
      map: ResourcesUtil.items.iw_texture,
      side: THREE.DoubleSide,
      roughness: 0.1,
      metalness: 0.05,
      clearcoat: 1,
      clearcoatRoughness: 0,
    });

    const service = new ShaderService(
      { frag: tengents_frag, vertix: tengents_vertix },
      this.uniforms,
      mat
    );

    let geometry = new THREE.IcosahedronGeometry(1, 100);
    // const material = new THREE.ShaderMaterial({
    //   vertexShader: tengents_vertix,
    //   fragmentShader: tengents_frag,
    //   uniforms: {
    //     ...this.uniforms,
    //     uTime: { value: 0 },
    //   },
    //   wireframe: false,
    //   side: THREE.DoubleSide,
    // });

    geometry = ResourcesUtil.items.iw.scene.children[0].geometry.toNonIndexed();
    geometry.computeVertexNormals();
    console.log(ResourcesUtil.items.iw_texture);

    const customMaterial = service.customShaderMaterial;
    // this.mesh = group;
    this.mesh = new THREE.Mesh(geometry, customMaterial);
    // obj.this.mesh.receiveShadow = true;
    this.mesh.position.y = 2;
    // this.mesh.scale.set(0.5, 0.5, 0.5);
    // this.geometries.push(grou);
    // this.materials.push(material);
    this.materials.push(customMaterial);
  }

  resize() {}

  update({ delta, elapsed }) {}
}
