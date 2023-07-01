// styling
import "./style.css";

// src
import { Experience } from "./src/experience";
import { GlobalUtil } from "./src/utils/global";

GlobalUtil.init(document.querySelector("canvas.experience-canvas"));
Experience.init();
