import {
  setCustomProperty,
  incrementCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js"

const SPEED = 0.05
const OBSTACLE_INTERVAL_MIN = 800
const OBSTACLE_INTERVAL_MAX = 2500
const worldElem = document.querySelector("[data-world]")

let nextObstacleTime

function getRandomNumberInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setupObstacles() {
  nextObstacleTime = getRandomNumberInRange(OBSTACLE_INTERVAL_MIN, OBSTACLE_INTERVAL_MAX)
  document.querySelectorAll("[data-obstacle]").forEach(obstacle => {
    obstacle.remove()
  })
}

export function updateObstacle(delta, speedScale) {
  document.querySelectorAll("[data-obstacle]").forEach(obstacle => {
    incrementCustomProperty(obstacle, "--left", delta * speedScale * SPEED * -1)
    if (getCustomProperty(obstacle, "--left") <= -100) {
      obstacle.remove()
    }
  })

  nextObstacleTime -= delta
  if (nextObstacleTime <= 0) {
    createRandomObstacle()
    nextObstacleTime = getRandomNumberInRange(OBSTACLE_INTERVAL_MIN, OBSTACLE_INTERVAL_MAX) / speedScale
  }
}

function createRandomObstacle() {
  const choice = Math.random();
  if (choice < 0.5) {
    createObstacle1();
  } else {
    createObstacle2();
  }
}

function createObstacle1() {
  const obstacle = document.createElement("img");
  obstacle.dataset.obstacle = true;
  obstacle.src = "imgs/vodka.png"; // Image for the first obstacle
  obstacle.classList.add("obstacle");
  setCustomProperty(obstacle, "--left", 100);
  worldElem.append(obstacle);
}

function createObstacle2() {
  const obstacle = document.createElement("img");
  obstacle.dataset.obstacle = true;
  obstacle.src = "imgs/kokain.jpg"; // Image for the second obstacle
  obstacle.classList.add("obstacle");
  setCustomProperty(obstacle, "--left", 100);
  worldElem.append(obstacle);
}

export function getObstacleRects() {
  return [...document.querySelectorAll("[data-obstacle]")].map(obstacle => {
    return obstacle.getBoundingClientRect()
  })
}

export { setupObstacles };
