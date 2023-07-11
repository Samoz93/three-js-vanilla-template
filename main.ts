import "./style.css";
// src
import _ from "lodash";
import { Experience } from "./src/experience";
import { AudioVisualizerController } from "./src/helpers";
import { GlobalUtil } from "./src/utils/global";

GlobalUtil.init(document.querySelector("canvas.experience-canvas"));
Experience.init();

document.querySelector("#musicBtn")?.addEventListener("click", () => {
  AudioVisualizerController.load("/audio/best-time.mp3");
});

const sanitizeNameAndCapitilizeFirstLetter = (name: string) => {
  const nameArray = name.split("-");
  return nameArray
    .map((name) => {
      return name.charAt(0).toUpperCase() + name.slice(1);
    })
    .join(" ");
};
const musicList = ["best-time", "electro", "satara"];
const musicUl = document.querySelector(".musicList");
_.forEach(musicList, (music) => {
  const li = document.createElement("li");
  li.textContent = sanitizeNameAndCapitilizeFirstLetter(music);
  li.classList.add("list-group-item");
  li.style.backgroundColor = "transparent";
  li.style.cursor = "url(cursor.cur),pointer";
  li.addEventListener("click", () => {
    AudioVisualizerController.load(`/audio/${music}.mp3`);
  });
  musicUl?.appendChild(li);
});
