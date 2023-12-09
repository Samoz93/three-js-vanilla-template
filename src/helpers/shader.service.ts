import * as THREE from "three";
import CustomShaderMaterial from "three-custom-shader-material/vanilla";

export class ShaderService {
  constructor(
    private shader: { frag; vertix },
    private uniforms:
      | {
          [key: string]: THREE.IUniform<any>;
        }
      | undefined,
    private base?: THREE.Material | THREE.ShaderMaterial
  ) {}

  get customShaderMaterial() {
    return new CustomShaderMaterial({
      baseMaterial: this.base || new THREE.MeshStandardMaterial(),
      vertexShader: this.shader.vertix,
      fragmentShader: this.shader.frag,
      side: THREE.DoubleSide,
      wireframe: true,
      uniforms: {
        uTime: { value: 0 },
        ...this.uniforms,
      },
    });
  }

  get depthMaterial() {
    return new CustomShaderMaterial({
      baseMaterial: new THREE.MeshDepthMaterial({
        depthPacking: THREE.RGBADepthPacking,
        alphaTest: 0.1,
      }),
      vertexShader: this.shader.vertix,
      fragmentShader: this.shader.frag,
      uniforms: {
        uTime: { value: 0 },
        ...this.uniforms,
      },
    });
  }

  setUpGeometryAttributes = (geometry: THREE.BufferGeometry) => {
    geometry = geometry.toNonIndexed();
    const { count } = geometry.attributes.position;
    const randoms = new Float32Array(count);
    const centerBuffer = new Float32Array(count * 3);

    for (let i = 0; i < count; i += 3) {
      let random = Math.random();
      randoms[i] = random;
      randoms[i + 1] = random;
      randoms[i + 2] = random;

      const x = geometry.attributes.position.array[i * 3];
      const y = geometry.attributes.position.array[i * 3 + 1];
      const z = geometry.attributes.position.array[i * 3 + 2];

      const x2 = geometry.attributes.position.array[i * 3 + 3];
      const y2 = geometry.attributes.position.array[i * 3 + 4];
      const z2 = geometry.attributes.position.array[i * 3 + 5];

      const x3 = geometry.attributes.position.array[i * 3 + 6];
      const y3 = geometry.attributes.position.array[i * 3 + 7];
      const z3 = geometry.attributes.position.array[i * 3 + 8];

      const center = new THREE.Vector3(x, y, z)
        .add(new THREE.Vector3(x2, y2, z2))
        .add(new THREE.Vector3(x3, y3, z3))
        .divideScalar(3);

      centerBuffer.set([center.x, center.y, center.z], i * 3);
      centerBuffer.set([center.x, center.y, center.z], (i + 1) * 3);
      centerBuffer.set([center.x, center.y, center.z], (i + 2) * 3);
    }

    geometry.setAttribute(
      "aCenter",
      new THREE.BufferAttribute(centerBuffer, 3)
    );

    geometry.setAttribute("aRandom", new THREE.BufferAttribute(randoms, 1));
    return geometry;
  };
}

export default ShaderService;
