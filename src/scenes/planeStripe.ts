import colors from "nice-color-palettes";
import * as THREE from "three";
// shaders

import { UpdatableObject3D } from "../abstractions";
import { gradient_frag, gradient_vertix } from "../shaders";

export class PlaneStripe extends UpdatableObject3D {
  objectName: string = "PlaneStripe";

  uniforms: Record<string, THREE.Uniform | { value: number }> = {
    uTime: { value: 0 },
  };

  constructor() {
    super();
    this.setUniformControllers();
    this.set();
  }

  set() {
    const uColors = colors[Math.floor(colors.length * Math.random())].map(
      (c) => new THREE.Color(c)
    );

    const geometry = new THREE.PlaneGeometry(1, 1, 300, 300);
    const material = new THREE.ShaderMaterial({
      fragmentShader: gradient_frag,
      vertexShader: gradient_vertix,
      // wireframe: true,
      uniforms: { ...this.uniforms, uColors: { value: uColors } },
      name: "gradient",
      side: THREE.DoubleSide,
    });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.receiveShadow = true;
    this.mesh.castShadow = true;
    this.mesh.position.y = 3;
    // this.mesh.rotation.x = Math.PI / 2;

    this.mesh.scale.set(8, 8, 8);

    this.materials.push(material);
    this.geometries.push(geometry);
  }

  resize() {}

  update({ delta, elapsed }) {}
}
