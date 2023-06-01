class Bullet {
    constructor(root, playerPosition) {

        this.root = root;
        this.y = GAME_HEIGHT - BULLET_HEIGHT - 20;
        this.x = playerPosition + 10;
        this.domElement = document.createElement('img');
        this.domElement.src = "images/laser.png";
        this.domElement.style.height = "32px";
        this.domElement.style.position = 'absolute';
        this.domElement.style.left = `${this.x}px`;
        this.domElement.style.top = `${this.y}px`
        this.domElement.style.zIndex = '20';

        root.appendChild(this.domElement);
    }

    begin(target) {
        setTimeout(() => {
            if (this.y <= target.y + 50) {
                this.selfDestruct();
                target.destroy();
                return;
            }
            this.y -= 30;
            this.domElement.style.top = `${this.y}px`
            return this.begin(target);

        }, 20)

    }
    selfDestruct() {
        this.root.removeChild(this.domElement)
    }

}
