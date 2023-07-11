import * as THREE from "three";
import { UpdatableObject3D } from "../abstractions";
import { AudioVisController, AudioVisualizerController } from "../helpers";
import { audio_frag_V2, audio_vertix_v2 } from "../shaders";

export default class AudioVisV2 extends UpdatableObject3D {
  objectName: string = "AudioVisV2";
  private uFrequency = "uFrequency";
  uniforms = {
    uRadius: { value: 1, options: { min: 0, max: 10 } },
    uTime: { value: 0 },
    [this.uFrequency]: { value: 0 },
  };

  visualizer: AudioVisController = AudioVisualizerController;

  constructor() {
    super();
    this.set();
    this.setUniformControllers();
  }

  set() {
    const geometry = new THREE.IcosahedronGeometry(1, 100);
    const material = new THREE.ShaderMaterial({
      vertexShader: audio_vertix_v2,
      fragmentShader: audio_frag_V2,
      uniforms: { ...this.uniforms },
      wireframe: false,
      side: THREE.DoubleSide,
    });

    const wireFrame = new THREE.LineSegments(
      new THREE.SphereGeometry(1, 100, 100),
      material
    );

    this.mesh = new THREE.Mesh(geometry, material);
    const WIREFRAME_DELTA = 0.05;
    wireFrame.scale.setScalar(1 + WIREFRAME_DELTA);
    this.mesh.add(this.visualizer.listener);
    this.visualizer.load("/audio/satara.mp3");

    this.mesh.add(wireFrame);
    this.mesh.position.y = 2;
    this.mesh.position.x = -2;
    this.mesh.receiveShadow = true;
    this.geometries.push(geometry);
    this.materials.push(material);
  }

  resize() {}

  update({ delta, elapsed }) {
    if (this.mesh) {
      this.visualizer.updateMaterialUniform(this.mesh.material);
      this.mesh.rotation.y += Math.sin(
        delta * 0.0005 + this.visualizer.getFrequency() * 0.002
      );

      this.mesh.rotation.x -=
        delta * 0.0005 + this.visualizer.getFrequency() * 0.003;
    }
    // this.mesh.position.z += Math.cos(elapsed);
  }
}
