import * as THREE from "three";
import { UpdatableObject3D } from "../abstractions";
import { bend_frag, bend_vertix } from "../shaders";
export default class BendedPlane extends UpdatableObject3D {
  objectName: string = "BendedPlane";

  planSize = 4;
  uniforms = {
    uRadius: { value: this.planSize / 2, options: { min: 0, max: 10 } },
  };
  constructor() {
    super();
    this.set();
    this.setUniformControllers();
  }

  set() {
    const geometry = new THREE.PlaneGeometry(
      this.planSize,
      this.planSize,
      100,
      100
    );
    geometry.center();
    const material = new THREE.ShaderMaterial({
      vertexShader: bend_vertix,
      fragmentShader: bend_frag,
      uniforms: this.uniforms,
      wireframe: false,
      side: THREE.DoubleSide,
    });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.x = -5;
    this.mesh.position.y = 1;
    this.mesh.position.z = 0.9;
    this.mesh.receiveShadow = true;
    this.geometries.push(geometry);
    this.materials.push(material);
  }

  resize() {}

  update({ delta, elapsed }) {
    this.mesh.position.x += Math.sin(elapsed * 0.001) * delta * 0.01 * 0.5;
    this.mesh.position.z += Math.cos(elapsed * 0.001) * delta * 0.01 * 0.5;
    this.mesh.lookAt(0, 0, 0);
    // this.mesh.position.z += Math.cos(elapsed);
  }
}
