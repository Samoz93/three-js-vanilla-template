import { random } from "lodash";
import * as THREE from "three";
import { UpdatableObject3D } from "../abstractions";
import { vibrant_frag, vibrant_vertix } from "../shaders";
import { ResourcesUtil } from "../utils";
export class VibrantModel extends UpdatableObject3D {
  objectName: string = "IlluminatiHuman";

  planSize = 4;

  uniforms = {
    uTime: { value: 0 },
  };

  constructor() {
    super();
    this.set();
    this.setUniformControllers();
  }

  set() {
    const { scene } = ResourcesUtil.items.female_model;

    const material = new THREE.ShaderMaterial({
      vertexShader: vibrant_vertix,
      fragmentShader: vibrant_frag,
      uniforms: {
        ...this.uniforms,
        uTexture: { value: ResourcesUtil.items.colorful_texture },
      },
      wireframe: false,
      side: THREE.DoubleSide,
      clipIntersection: true,
    });

    const group = new THREE.Group();
    const geometry = new THREE.PlaneGeometry(5, 5, 100, 100);
    const size = geometry.attributes.position.count;
    console.log(size);

    for (let i = 0; i < size; i++) {
      // geometry.attributes.position.array[i * 3] += random(true);
      // geometry.attributes.position.array[i * 3 + 1] += random(true);
      geometry.attributes.position.array[i * 3 + 2] += random(true);
    }
    const mesh = new THREE.Mesh(
      geometry,
      new THREE.MeshBasicMaterial({ color: "red", wireframe: true })
    );
    mesh.position.y = 2;

    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (child.name === "Female_Body_Mesh001__0") {
          child.geometry.center();
          child.material = material;
          child.rotation.x = -Math.PI / 2;
          group.add(child);
        }
        // child.material.wireframe = true;
      }
    });
    this.mesh = group;
    // GlobalUtil.scene.add(mesh);
    // new THREE.Mesh(geometry, material);
    this.mesh.position.y = 3;
    this.mesh.position.x = 0;
    this.mesh.position.z = 0;
    // this.mesh.rotateX(-Math.PI / 2);
    this.mesh.scale.setScalar(3);
    this.mesh.receiveShadow = true;
    this.materials.push(this.mesh.children[0].material);
  }

  resize() {}

  update({ delta, elapsed }) {
    // this.mesh.rotation.y += 0.01;
  }
}
