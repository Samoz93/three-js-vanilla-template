import GUI from "lil-gui";

const controllers = {};

export const gui = new GUI();

export const addControllers = (
  folderName: string,
  key: string,
  cb: (val) => void,
  value: number = 0,
  options: { min; max; steps } = { min: 0, max: 1, steps: 0.01 }
) => {
  let folder = gui.folders.find((f) => f._title === folderName);

  if (!folder) {
    folder = gui.addFolder(folderName);
  }

  let ctrlRef = folder.controllers.find((ct) => ct._name === key);

  if (!ctrlRef) {
    controllers[key] = value ?? 0;
    ctrlRef = folder.add(
      controllers,
      key,
      options.min,
      options.max,
      options.steps
    );
  }

  ctrlRef.onChange(cb);
};
