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
function handleRun(delta, speedScale) {
  if (isJumping) return; // Skip the running animation if the car is jumping
  
  currentFrameTime += delta * speedScale;
  if (currentFrameTime >= FRAME_TIME) {
    carFrame = (carFrame + 1) % CAR_FRAME_COUNT; // Loop through the frames
    carElem.src = `imgs/car-frame${carFrame}.png`; // Change the image source to the current frame
    currentFrameTime -= FRAME_TIME; // Reset the frame time
  }
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


  
 
  // Additional logic for running animation can go here if needed


  
  const currentBottom = getCustomProperty(carElem, "--bottom");
  if (currentBottom <= 0) {
    setCustomProperty(carElem, "--bottom", 0);
    isJumping = false;
    yVelocity = 0;
  } else if (currentBottom >= MAX_JUMP_HEIGHT) {
    yVelocity = 0; // Stop the car's upward movement if it reaches the max jump height
  }
  

  // Apply gravity to decrease the velocity for the next frame
  

  // Check if the car is back on the ground
  if (currentBottom <= 0) {
    setCustomProperty(carElem, "--bottom", 0);
    isJumping = false;
    yVelocity = 0;
  }





function onJump(e) {
  console.log('onJump called with key code:', e.code);
  if (e.code !== "Space" || isJumping) return;
  
  console.log('Jump initiated');
  yVelocity = JUMP_SPEED;
  isJumping = true;
}

function handleJump(delta) {
  console.log('handleJump called, isJumping:', isJumping);
  if (!isJumping) return;
  
  incrementCustomProperty(carElem, "--bottom", yVelocity * delta);
  console.log('Car bottom after increment:', getCustomProperty(carElem, "--bottom"));
  
  if (getCustomProperty(carElem, "--bottom") <= 0) {
    setCustomProperty(carElem, "--bottom", 0);
    isJumping = false;
  }
  
  yVelocity -= GRAVITY * delta;
}
