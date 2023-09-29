import * as data from "./data.js";
export class Utilities {
  constructor() {
    this.candidate = undefined;
    this.enemySpots = data.GAME_WIDTH / data.ENEMY_WIDTH;
    this.spotsTaken = [false, false, false, false, false];
  }

  nextEnemySpot(enemies) {
    enemies.forEach((enemy) => {
      this.spotsTaken[enemy.spot] = true;
    });

    while (this.candidate === undefined || this.spotsTaken[this.candidate]) {
      this.candidate = Math.floor(Math.random() * this.enemySpots);
    }

    return this.candidate;
  }
}
