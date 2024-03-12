import {
  incrementCustomProperty,
  setCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js"

const CAR_FRAME_COUNT = 2
const FRAME_TIME = 100
const JUMP_SPEED = 0.57
const GRAVITY = 0.0018

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
  if (!isJumping) return

  incrementCustomProperty(carElem, "--bottom", yVelocity * delta)

  if (getCustomProperty(carElem, "--bottom") <= 0) {
    setCustomProperty(carElem, "--bottom", 0)
    isJumping = false
  }


  yVelocity -= GRAVITY * delta
}

function onJump(e) {
  if (e.code !== "Space" || isJumping) return

  yVelocity = JUMP_SPEED
  isJumping = true
}
