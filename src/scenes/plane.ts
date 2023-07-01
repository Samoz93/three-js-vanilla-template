import * as THREE from "three";
import { UpdatableObject3D } from "../abstractions";

export default class Plane extends UpdatableObject3D {
  objectName: string = "Plane";

  constructor() {
    super();
    this.set();
  }

  set() {
    const geometry = new THREE.PlaneGeometry(10, 10, 100, 100);
    const material = new THREE.MeshStandardMaterial({
      // vertexShader: vertexShader,
      // fragmentShader: fragmentShader,
      // uniforms: {},
      wireframe: false,
      side: THREE.DoubleSide,
    });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.receiveShadow = true;
    this.mesh.rotation.x = Math.PI / 2;
    this.geometries.push(geometry);
    this.materials.push(material);
  }

  resize() {}

  update() {}
}
