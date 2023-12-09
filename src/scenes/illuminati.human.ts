import * as THREE from "three";
import { UpdatableObject3D } from "../abstractions";
import { RendererUtil } from "../renderer";
import { env_map_rotation } from "../shaders";
import { ResourcesUtil } from "../utils";
export class IlluminatiHuman extends UpdatableObject3D {
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

    let geometry = new THREE.PlaneGeometry(
      this.planSize,
      this.planSize,
      100,
      100
    );
    const g = new THREE.PMREMGenerator(RendererUtil.webglRenderer);
    g.compileEquirectangularShader();
    const envMap = g.fromEquirectangular(
      ResourcesUtil.items.colorful_texture
    ).texture;

    g.dispose();
    const material = new THREE.MeshStandardMaterial({
      // vertexShader: bend_vertix,
      // fragmentShader: bend_frag,
      // uniforms: this.uniforms,
      wireframe: false,
      side: THREE.DoubleSide,
      envMap,
      // emissive: new THREE.Color("blue"),
      roughness: 0.3,
      metalness: 1,
      depthWrite: true,
      clipIntersection: true,
    });

    const group = new THREE.Group();
    material.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = { value: 0 };
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <envmap_physical_pars_fragment>",
        env_map_rotation
      );
      material.userData.shader = shader;
    };

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
    // new THREE.Mesh(geometry, material);
    this.mesh.position.y = 3;
    this.mesh.position.x = 0;
    this.mesh.position.z = 0;
    // this.mesh.rotateX(-Math.PI / 2);
    this.mesh.scale.setScalar(3);
    this.mesh.receiveShadow = true;
    this.geometries.push(geometry);
    this.materials.push(this.mesh.children[0].material);
  }

  resize() {}

  update({ delta, elapsed }) {
    this.mesh.rotation.y += 0.01;
    this.mesh.children[0].material.userData.shader.uniforms.uTime.value += 1;
  }
}
