# Three.js Boilerplate

A Template to start coding with Threejs on the fly, using vite + TS
Forked from https://github.com/bibashmgr/three-js-boilerplate and refactored slowly to TS

## Quick Start:

**Install the dependencies:**

```
npm install
```

## Commands:

**Run app in development:**

```
npm run dev
```

## Packages:

| Package                                       | Version                                                                      |
| --------------------------------------------- | :--------------------------------------------------------------------------- |
| [vite](packages/vite)                         | ![vite version](https://img.shields.io/npm/v/vite.svg?label=%20)             |
| [three](packages/three)                       | ![three](https://img.shields.io/npm/v/three?label=%20)                       |
| [events](packages/events)                     | ![events](https://img.shields.io/npm/v/events?label=%20)                     |
| [vite-plugin-glsl](packages/vite-glsl-plugin) | ![vite-plugin=glsl](https://img.shields.io/npm/v/vite-plugin-glsl?label=%20) |

## Project Structure:

```
public\
  |--models\
  |--textures\
src\
  |--config\        # Environment variables and configuration related things
  |--helpers\       # Helper classes and functions
  |--scenes\        # Scenes and Objects logic
  |--shaders\       # Shaders
  |--utils\         # Utility classes and functions
  |--camera.js
  |--experience
  |--renderer.js
index.html
main.js
style.css
```

---
