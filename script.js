const canvasMain = document.getElementById("canvas_main");
const context = canvasMain.getContext("2d");
const dropdown = document.getElementById("animations");

const CANVAS_WIDTH = (canvasMain.width = 600);
const CANVAS_HEIGHT = (canvasMain.height = 600);

const playerImg = new Image();

const spriteWidth = 575;
const spriteHeight = 523;
const staggerFrame = 5;

const spriteAnimations = [];
const animationStates = [
  {
    name: "idle",
    frames: 7,
  },
  {
    name: "jump",
    frames: 7,
  },
  {
    name: "fall",
    frames: 7,
  },
  {
    name: "run",
    frames: 9,
  },
  {
    name: "dizzy",
    frames: 11,
  },
  {
    name: "sit",
    frames: 5,
  },
  {
    name: "roll",
    frames: 7,
  },
  {
    name: "bite",
    frames: 7,
  },
  {
    name: "ko",
    frames: 12,
  },
  {
    name: "getHit",
    frames: 4,
  },
];

playerImg.src = "/shadow_dog.png";

let gameFrame = 0;
let playerState = "idle";

dropdown.addEventListener("change", function (e) {
  playerState = e.target.value;
});

animationStates.forEach((state, idx) => {
  let frames = {
    loc: [],
  };

  for (let j = 0; j < state.frames; j++) {
    let positionX = j * spriteWidth;
    let positionY = idx * spriteHeight;
    frames.loc.push({ x: positionX, y: positionY });
  }

  spriteAnimations[state.name] = frames;
});

console.log(animationStates);

function animate() {
  context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  let position =
    Math.floor(gameFrame / staggerFrame) %
    spriteAnimations[playerState].loc.length;
  let frameX = spriteWidth * position;
  let frameY = spriteAnimations[playerState].loc[position].y;

  context.drawImage(
    playerImg,
    frameX,
    frameY,
    spriteWidth,
    spriteHeight,
    0,
    0,
    spriteWidth,
    spriteHeight
  );

  gameFrame++;
  requestAnimationFrame(animate);
}

animate();
