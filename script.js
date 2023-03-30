const canvas = document.getElementById("canvasA");
const context = canvas.getContext("2d");

const CANVAS_WIDTH = (canvas.width = 800);
const CANVAS_HEIGHT = (canvas.height = 700);

let gameSpeed = 5;

const bgLayer1 = new Image();
const bgLayer2 = new Image();
const bgLayer3 = new Image();
const bgLayer4 = new Image();
const bgLayer5 = new Image();

bgLayer1.src = "background-layers/layer-1.png";
bgLayer2.src = "background-layers/layer-2.png";
bgLayer3.src = "background-layers/layer-3.png";
bgLayer4.src = "background-layers/layer-4.png";
bgLayer5.src = "background-layers/layer-5.png";

window.addEventListener("load", function () {
  const slider = document.getElementById("slider");
  slider.value = gameSpeed;

  const showGameSpeed = document.getElementById("showGameSpeed");
  showGameSpeed.innerHTML = gameSpeed;

  slider.addEventListener("change", function (event) {
    gameSpeed = event.target.value;
    showGameSpeed.innerHTML = event.target.value;
  });

  class Layer {
    constructor(image, speedModifier) {
      this.xPos = 0;
      this.yPos = 0;
      this.width = 2400;
      this.height = 700;
      this.image = image;
      this.speedModifier = speedModifier;
      this.speed = gameSpeed * this.speedModifier;
    }
    update() {
      this.speed = gameSpeed * this.speedModifier;
      if (this.xPos <= -this.width) {
        this.xPos = 0;
      }
      this.xPos = this.xPos - this.speed;
    }
    draw() {
      context.drawImage(
        this.image,
        this.xPos,
        this.yPos,
        this.width,
        this.height
      );
      context.drawImage(
        this.image,
        this.xPos + this.width,
        this.yPos,
        this.width,
        this.height
      );
    }
  }

  const layer1 = new Layer(bgLayer1, 0.2);
  const layer2 = new Layer(bgLayer2, 0.4);
  const layer3 = new Layer(bgLayer3, 0.6);
  const layer4 = new Layer(bgLayer4, 0.8);
  const layer5 = new Layer(bgLayer5, 1);

  const gameObjects = [layer1, layer2, layer3, layer4, layer5];

  function animate() {
    context.drawImage(bgLayer1, 0, 0);
    gameObjects.forEach((object) => {
      object.update();
      object.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();
});
