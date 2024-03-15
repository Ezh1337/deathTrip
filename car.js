import {
  incrementCustomProperty,
  setCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js"

const CAR_FRAME_COUNT = 2
const FRAME_TIME = 100
const JUMP_SPEED = 0.57
const GRAVITY = 0.0018
const CEILING_HEIGHT = 90; // Adjust this value to set the height of the ceiling


const carElem = document.querySelector("[data-car]")
let isJumping
let carFrame
let currentFrameTime
let yVelocity


export function debounce(func, timeout = 300){
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

function saveInput(){
  console.log('Saving data');
}

const processChange = debounce(() => saveInput());

export function setupCar() {
  isJumping = false
  carFrame = 0
  currentFrameTime = 0
  yVelocity = 0
  setCustomProperty(carElem, "--bottom", 0)
  document.removeEventListener("keydown", onJump)
  document.addEventListener("keydown", onJump)
}

export function updateCar(delta, speedScale) {
  handleRun(delta, speedScale)
  handleJump(delta)
}

export function getCarRect() {
  return carElem.getBoundingClientRect()
}

export function setCarCrash() {
  carElem.src = "imgs/explotion1.png"
}

function handleRun(delta, speedScale) {
  if (isJumping) {
    carElem.src = `imgs/car.png`
    return
  }
  // Additional logic for running animation can go here if needed
}

function handleJump(delta) {
  if (!isJumping) return;
  
  incrementCustomProperty(carElem, "--bottom", yVelocity * delta);
  yVelocity -= GRAVITY * delta;
  
  const currentBottom = getCustomProperty(carElem, "--bottom");
  if (currentBottom <= 0) {
    setCustomProperty(carElem, "--bottom", 0);
    isJumping = false;
    yVelocity = 0;
  } else if (currentBottom > MAX_JUMP_HEIGHT) {
    // If the car is above max height, ensure it doesn't go any higher
    yVelocity = Math.max(yVelocity, 0);
  }
}


  // Apply gravity to decrease the velocity for the next frame
  yVelocity -= GRAVITY * delta;

  // Check if the car is back on the ground
  if (newBottom <= 0) {
    setCustomProperty(carElem, "--bottom", 0);
    isJumping = false;
    yVelocity = 0;
  }



function onJump(e) {
  if (e.code !== "Space" || isJumping) return;
  
  // ... rest of the onJump logic ...
  yVelocity = JUMP_SPEED;
  isJumping = true;
}


