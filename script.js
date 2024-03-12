import { updateGround, setupGround } from "./Ground.js";
import { updateCar, setupCar, getCarRect, setCarCrash } from "./car.js";
import { updateObstacle, setupObstacles, getObstacleRects } from "./obsticle.js";

const WORLD_WIDTH = 100;
const WORLD_HEIGHT = 30;
let SPEED_SCALE_INCREASE = 0.00001;

const worldElem = document.querySelector("[data-world]");
const scoreElem = document.querySelector("[data-score]");
const startScreenElem = document.querySelector("[data-start-screen]");

setPixelToWorldScale();
window.addEventListener("resize", setPixelToWorldScale);
document.addEventListener("keydown", handleStart, { once: true });

let lastTime;
let speedScale;
let score;
let lives = 3;
const livesElem = document.querySelector("[data-lives]");

function updateLivesDisplay() {
  livesElem.textContent = '❤️'.repeat(lives);
}
let invincible = false; // Flag to check if the car is temporarily invincible

function checkLose() {
  if (invincible) return false; // If the car is invincible, no loss is registered

  const carRect = getCarRect();
  const hasCollision = getObstacleRects().some(rect => isCollision(rect, carRect));
  
  if (hasCollision && !invincible) {
    lives--; // Decrement lives
    updateLivesDisplay();
    setCarInvincible(); 
    SPEED_SCALE_INCREASE = SPEED_SCALE_INCREASE * 3// Make the car temporarily invincible

    if (lives <= 0) {
      // No more lives left, handle game over
      return true;
    }

    // Provide feedback for collision, like flashing the car
    flashCar();
  }

  return false;
}

function setCarInvincible() {
  invincible = true;
  setTimeout(() => {
    invincible = false; // Car becomes vulnerable again after a timeout
  }, 1000); // Duration of invincibility in milliseconds
}

function flashCar() {
  // Add a class to the car to change its appearance
  // Then remove it after some time to indicate invincibility duration
  const carElem = document.querySelector('[data-car]');
  carElem.classList.add('invincible');


  setTimeout(() => {
    carElem.classList.remove('invincible');
  }, 1000); // Match this duration to the invincibility timeout
}

// Remember to reset invincibility when the game starts
function handleStart() {
  lastTime = null;
  speedScale = 1;
  score = 0;
  lives = 3; // Reset lives
  updateLivesDisplay(); // Update the display
  setupGround();
  setupCar();
  setupObstacles();
  startScreenElem.classList.add("hide");
  invincible = false; // Ensure the car starts as not invincible
  window.requestAnimationFrame(update);
}



function update(time) {
  if (lastTime == null) {
    lastTime = time;
    window.requestAnimationFrame(update);
    return;
  }
  const delta = time - lastTime;

  updateGround(delta, speedScale);
  updateCar(delta, speedScale);
  updateObstacle(delta, speedScale);
  updateSpeedScale(delta);
  updateScore(delta);
  if (checkLose()) return handleLose();

  lastTime = time;
  window.requestAnimationFrame(update);
}


function isCollision(rect1, rect2) {
  return (
    rect1.left < rect2.right &&
    rect1.top < rect2.bottom &&
    rect1.right > rect2.left &&
    rect1.bottom > rect2.top
  );
}

function updateSpeedScale(delta) {
  speedScale += delta * SPEED_SCALE_INCREASE;
}

function updateScore(delta) {
  score += delta * 0.01;
  scoreElem.textContent = Math.floor(score);
}


 
  


function handleLose() {
  setCarCrash();
  setTimeout(() => {
   resetGame();
  }, 1000);
}




function resetGame() {
  document.addEventListener("keydown", handleStart, { once: true });
  startScreenElem.classList.remove("hide");

}
function setPixelToWorldScale() {
  let worldToPixelScale;
  if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
    worldToPixelScale = window.innerWidth / WORLD_WIDTH;
  } else {
    worldToPixelScale = window.innerHeight / WORLD_HEIGHT;
  }

  worldElem.style.width = `${WORLD_WIDTH * worldToPixelScale}px`;
  worldElem.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`;
}
