/** @type {HTMLCanvasElement} */
const canvasA = document.getElementById("canvasA");
const context = canvasA.getContext("2d");

const noOfEnemies = 100;
const enemiesArray = [];

CANVAS_WIDTH = canvasA.width = 500;
CANVAS_HEIGHT = canvasA.height = 900;

let gameFrame = 0;

class Enemy {
  constructor() {
    this.image = new Image();
    this.image.src = "enemies/enemy1.png";
    this.speed = Math.random() * 5 - 2.5;
    this.spriteWidth = 293;
    this.spriteHeight = 155;
    this.width = this.spriteWidth / 2.5;
    this.height = this.spriteHeight / 2.5;
    this.x = Math.random() * (canvasA.width - this.width);
    this.y = Math.random() * (canvasA.height - this.height);
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);
  }

  update() {
    this.x += this.speed;
    this.y += this.speed;
    if (gameFrame % this.flapSpeed === 0) {
      this.frame > 4 ? (this.frame = 0) : (this.frame += 1);
    }
  }

  draw() {
    context.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

for (let i = 0; i < noOfEnemies; i++) {
  enemiesArray.push(new Enemy());
}

function animate() {
  context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  enemiesArray.forEach((enemy) => {
    enemy.update();
    enemy.draw();
  });
  gameFrame++;
  requestAnimationFrame(animate);
}
animate();
