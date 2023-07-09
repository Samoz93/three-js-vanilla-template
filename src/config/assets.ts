import { ResourcesTypes } from "../types";

export const assets: { type: ResourcesTypes; path: string; name: string }[] = [
  // {
  //   name: 'asset_name',
  //   type: ['glbModel', 'basicTexture', 'normalTexture', 'cubeTexture', 'audio' ,'font', 'video'],
  //   path: 'asset_path',
  // },
  // {
  //   name: "boxModel",
  //   type: "glbModel",
  //   path: "models/box.glb",
  // },
  // {
  //   name: "boxTexture",
  //   type: "normalTexture",
  //   path: "textures/box_texture.png",
  // },
  {
    name: "dancer",
    type: "glbModel",
    path: "models/dancer.glb",
  },
  {
    name: "box2",
    type: "glbModel",
    path: "models/box2.glb",
  },
  {
    name: "iw",
    type: "glbModel",
    path: "models/iw.glb",
  },
  {
    name: "iw_texture",
    type: "normalTexture",
    path: "textures/iw_texture.jpeg",
  },
  {
    name: "colorful_texture",
    type: "normalTexture",
    path: "textures/colorful.avif",
  },
  // {
  //   name: "dna",
  //   type: "glbModel",
  //   path: "models/dna.glb",
  // },
  // {
  //   name: "mosquito",
  //   type: "glbModel",
  //   path: "models/mosquito.glb",
  // },
] as const;
