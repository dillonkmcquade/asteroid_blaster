import { Enemy } from "./Enemy.js";
import { Text } from "./Text.js";
import { Utilities } from "./engine-utilities.js";
import { Player } from "./Player.js";
import * as data from "./data.js";

const killElement = document.getElementById("kills");
const livesContainer = document.getElementById("lives-container");
const utility = new Utilities();

export class GameEngine {
  constructor(root) {
    this.root = root;
    this.player = new Player(root);
    this.enemies = [];
    this.startTime;
    this.endTime;
    this.textModal = new Text(
      document.getElementById("app"),
      "calc(20% - 51px)",
      "calc(20% - 18px)"
    );
  }

  gameLoop = () => {
    if (!this.startTime) {
      this.startTime = Date.now();
    }
    /* This is where the lives are loaded at the beginning of each round */

    if (this.player.lives.length === 3) {
      this.updateLifeIcons();
    }
    killElement.innerText = `${this.player.kills} kills`;

    if (this.lastFrame === undefined) {
      this.lastFrame = new Date().getTime();
    }
    let timeDiff = new Date().getTime() - this.lastFrame;
    this.lastFrame = new Date().getTime();

    this.player.target = this.enemies.find((enemy) => {
      return enemy.x === this.player.x;
    });

    this.enemies.forEach((enemy) => {
      enemy.update(timeDiff);
    });

    // show timer in UI
    minutes.innerText = new Date(Date.now() - this.startTime)
      .toISOString()
      .substring(14, 19);

    this.enemies = this.enemies.filter((enemy) => {
      return !enemy.destroyed;
    });

    while (this.enemies.length < data.MAX_ENEMIES) {
      const spot = utility.nextEnemySpot(this.enemies);
      this.enemies.push(new Enemy(this.root, spot));
    }

    if (this.isPlayerDead()) {
      console.log("DEAD");
      document.removeEventListener("keydown", this.keydownHandler);
      this.updateButtonText(`Next round`);
      this.endTime = Date.now() - this.startTime;
      this.updatePlayer();
      this.clearTimer();
      this.player.lives.length === 0 ? this.handleEndGame() : this.updateDom();
      return;
    }
    setTimeout(this.gameLoop, 20);
  };

  keydownHandler = (event) => {
    if (event.code === "ArrowLeft") {
      this.player.moveLeft();
    }

    if (event.code === "ArrowRight") {
      this.player.moveRight();
    }
    if (event.code === "ArrowUp") {
      this.player.shoot();
    }
  };

  updateButtonText(text) {
    const startButton = document.getElementById("start");
    startButton.innerText = text;
  }

  start = () => {
    document.addEventListener("keydown", this.keydownHandler);
    this.textModal.update("");
    this.textModal.toggleVisible("none");
    this.updateButtonText("Start");
    this.gameLoop(this);
  };

  isPlayerDead() {
    let isDead = false;
    this.enemies.forEach((enemy) => {
      const enemyDepth = enemy.y + data.ENEMY_HEIGHT;
      const playerDepth = data.GAME_HEIGHT - data.PLAYER_HEIGHT;
      if (this.player.x === enemy.x && enemyDepth >= playerDepth) {
        console.log("COLLISION");
        isDead = true;
      }
    });
    return isDead;
  }

  updatePlayer() {
    if (this.player.lives.length > 0) {
      this.player.lives.pop();
      this.player.updateScore(
        new Date(this.endTime).toISOString().substring(14, 19)
      );
      this.player.resetKillCount();
    }
  }
  updateLifeIcons() {
    livesContainer.innerHTML = "";
    this.player.lives.forEach((life) => livesContainer.appendChild(life));
  }
  handleEndGame() {
    this.player.reset();
    this.updateButtonText("Play again");
    this.textModal.update(`Game Over!`);
    this.textModal.toggleVisible("block");
    this.textModal.displayScores(this.player.scores);
    this.player.scores = [];
  }
  updateDom() {
    this.textModal.update(`Lives remaining: ${this.player.lives.length}`);
    this.textModal.toggleVisible("block");
    this.updateLifeIcons();
  }

  clearTimer() {
    this.player.lastTime = (this.startTime - Date.now()) / 1000;
    this.startTime = null;
  }
}
