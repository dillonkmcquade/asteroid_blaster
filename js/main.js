/* Game is started here */
import { GameEngine } from "./Engine";
import { Text } from "./Text";

const gameEngine = new GameEngine(document.getElementById("app"));
const textModal = new Text(
  document.getElementById("app"),
  "calc(20% - 51px)",
  "calc(20% - 18px)"
);
const startButton = document.getElementById("start");

const keydownHandler = (event) => {
  if (event.code === "ArrowLeft") {
    gameEngine.player.moveLeft();
  }

  if (event.code === "ArrowRight") {
    gameEngine.player.moveRight();
  }
  if (event.code === "ArrowUp") {
    gameEngine.player.shoot();
  }
};

const startGameHandler = () => {
  document.addEventListener("keydown", keydownHandler);
  textModal.update("");
  textModal.toggleVisible("none");
  updateButtonText("Start");
  gameEngine.gameLoop();
};

const updateButtonText = (text) => {
  startButton.innerText = text;
};

startButton.addEventListener("click", startGameHandler);
