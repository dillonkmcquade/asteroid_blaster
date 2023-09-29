import * as data from "./data.js";
import { Bullet } from "./Bullet.js";
export class Player {
  constructor(root) {
    this.x = 8 * data.PLAYER_WIDTH;
    this.target = undefined;
    this.isDead = false;
    this.root = root;
    this.lives = [];
    this.kills = 0;
    this.scores = [];
    this.lastTime = null;

    const y = data.GAME_HEIGHT - data.PLAYER_HEIGHT - 10;

    this.domElement = document.createElement("img");
    this.domElement.src = "/spaceship.png";
    this.domElement.style.position = "absolute";
    this.domElement.style.left = `${this.x}px`;
    this.domElement.style.top = ` ${y}px`;
    this.domElement.style.zIndex = "10";
    root.appendChild(this.domElement);

    for (let i = 0; i < data.PLAYER_LIVES; i++) {
      const newLife = document.createElement("img");
      newLife.src = "/spaceship.png";
      this.lives.push(newLife);
    }
  }

  moveLeft() {
    if (this.x > 0) {
      this.x = this.x - data.PLAYER_WIDTH;
    }

    this.domElement.style.left = `${this.x}px`;
  }

  moveRight() {
    if (this.x + data.PLAYER_WIDTH < data.GAME_WIDTH) {
      this.x = this.x + data.PLAYER_WIDTH;
    }
    this.domElement.style.left = `${this.x}px`;
  }

  shoot() {
    if (this.target) {
      const bullet = new Bullet(this.root, this.x);
      bullet.begin(this.target);
      this.kills += 1;
    }
  }

  resetKillCount() {
    this.kills = 0;
  }

  reset() {
    this.lives = [];
    for (let i = 0; i < data.PLAYER_LIVES; i++) {
      const newLife = document.createElement("img");
      newLife.src = "/spaceship.png";
      this.lives.push(newLife);
    }
  }
  updateScore(time) {
    const score = {
      time: time,
      kills: this.kills,
    };
    this.scores.push(score);
  }
}
