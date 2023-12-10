import _ from "lodash";
import { Object3D, Uniform } from "three";
import { addControllers } from "../helpers/gui.controller";
import { TimeUtil } from "../utils/time";

export abstract class UpdatableObject3D {
  // Utils

  abstract objectName: string;

  // Object data (used for clean up)
  mesh: THREE.Mesh | Object3D;
  geometries: THREE.BufferGeometry[] = [];
  materials: (THREE.Material | THREE.ShaderMaterial)[] = [];

  // Uniforms
  uniforms: Record<string, Uniform | { value: number }> = {};

  // abstract methods
  abstract setMainMesh(): void;
  abstract resize(): void;
  abstract update(data: { delta: number; elapsed: number }): void;

  constructor() {
    TimeUtil.on("update", (data: { delta: number; elapsed: number }) => {
      // Update uTime for all the materials if any
      this.materials?.forEach((material) => {
        if (material.uniforms?.uTime) {
          material.uniforms.uTime.value += data.delta * 0.01;
        }
      });

      if (_.isEmpty(this.materials) || _.isNil(this.update)) return;
      this.update(data);
    });
  }

  setUniformControllers = () => {
    if (_.isEmpty(this.uniforms)) return;

    _.forEach(this.uniforms, (val, unifromKey) => {
      const controllerName = this.getControllerName(unifromKey);
      addControllers(this.objectName ?? "unknown", controllerName, (val) => {
        this.uniforms[unifromKey].value = val;
      });
    });
  };

  protected getControllerName = (str: string) => {
    const secondChar = str.charAt(1).toLocaleLowerCase();
    const rest = str.slice(2);
    return `${secondChar}${rest}`;
  };
}
