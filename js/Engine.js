import { Player } from "./Player";
import { Enemy } from "./Enemy";
const killElement = document.getElementById("kills");
const livesContainer = document.getElementById("lives-container");

export class GameEngine {
  constructor(theRoot) {
    this.root = theRoot;
    this.player = new Player(theRoot);
    this.enemies = [];
    //this.gameTimer will be created in gameLoop
    //        addBackground(this.root);
  }

  gameLoop = () => {
    if (!this.gameTimer) {
      this.gameTimer = setInterval(timer, 1000);
      seconds.innerHTML = `0${secondsVar}`;
      minutes.innerHTML = `0${minutesVar} :`;
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

    this.enemies = this.enemies.filter((enemy) => {
      return !enemy.destroyed;
    });

    while (this.enemies.length < MAX_ENEMIES) {
      const spot = nextEnemySpot(this.enemies);
      this.enemies.push(new Enemy(this.root, spot));
    }

    if (this.isPlayerDead()) {
      console.log("DEAD");
      document.removeEventListener("keydown", keydownHandler);
      updateButtonText(`Next round`);
      this.updatePlayer();
      this.clearTimer();
      this.player.lives.length === 0 ? this.handleEndGame() : this.updateDom();
      return;
    }
    setTimeout(this.gameLoop, 20);
  };

  isPlayerDead() {
    let isDead = false;
    this.enemies.forEach((enemy) => {
      const enemyDepth = enemy.y + ENEMY_HEIGHT;
      const playerDepth = GAME_HEIGHT - PLAYER_HEIGHT;
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
      this.player.updateScore();
      this.player.resetKillCount();
    }
  }
  updateLifeIcons() {
    livesContainer.innerHTML = "";
    this.player.lives.forEach((life) => livesContainer.appendChild(life));
  }
  handleEndGame() {
    this.player.reset();
    updateButtonText("Play again");
    textModal.update(`Game Over!`);
    textModal.toggleVisible("block");
    textModal.displayScores(this.player.scores);
    this.player.scores = [];
  }
  updateDom() {
    textModal.update(`Lives remaining: ${this.player.lives.length}`);
    textModal.toggleVisible("block");
    this.updateLifeIcons();
  }

  clearTimer() {
    clearInterval(this.gameTimer);
    this.gameTimer = null;
    this.player.lastTime = secondsVar;
    secondsVar = 0;
    minutesVar = 0;
  }
}
