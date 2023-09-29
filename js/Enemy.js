import * as data from "./data.js";
export class Enemy {
  constructor(theRoot, enemySpot) {
    this.root = theRoot;
    this.spot = enemySpot;
    this.x = enemySpot * data.ENEMY_WIDTH;
    this.y = -data.ENEMY_HEIGHT;
    this.destroyed = false;
    this.domElement = document.createElement("img");
    this.domElement.src = "/asteroid.png";
    this.domElement.style.position = "absolute";
    this.domElement.style.left = `${this.x}px`;
    this.domElement.style.top = `${this.y}px`;
    this.domElement.style.zIndex = 5;
    this.root.appendChild(this.domElement);
    this.speed = Math.random() / 2 + 0.25;
  }

  update(timeDiff) {
    this.y = this.y + timeDiff * this.speed;
    this.domElement.style.top = `${this.y}px`;
    if (this.y > window.innerHeight - data.ENEMY_HEIGHT) {
      this.destroy();
    }
  }

  destroy() {
    if (this.root.contains(this.domElement)) {
      this.root.removeChild(this.domElement);
      this.destroyed = true;
    }
  }
}
