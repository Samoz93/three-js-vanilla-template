import GUI from "lil-gui";

const controllers = {};

export const gui = new GUI();

export const addControllers = (
  folderName: string,
  key: string,
  cb: (val) => void
) => {
  let folder = gui.folders.find((f) => f._title === folderName);

  if (!folder) {
    folder = gui.addFolder(folderName);
  }

  console.log(folder._title);

  let ctrlRef = folder.controllers.find((ct) => ct._name === key);

  if (!ctrlRef) {
    controllers[key] = 0;
    ctrlRef = folder.add(controllers, key, 0, 1, 0.01);
  }

  ctrlRef.onChange(cb);
};
