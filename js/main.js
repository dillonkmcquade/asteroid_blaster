/* Game is started here */
import { GameEngine } from "./Engine.js";

function main() {
  const gameEngine = new GameEngine(document.getElementById("app"));
  const startButton = document.getElementById("start");
  startButton.addEventListener("click", gameEngine.start);
}
main();
