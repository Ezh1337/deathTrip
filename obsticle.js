import {
    setCustomProperty,
    incrementCustomProperty,
    getCustomProperty,
  } from "./updateCustomProperty.js"
  

  function getRandomNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
   
  // Eksempel på bruk
  var tilfeldigTall = getRandomNumberInRange(700, 2000);
  
  
  const SPEED = 0.05
  const CACTUS_INTERVAL_MIN = 500
  const CACTUS_INTERVAL_MAX = 2000
  const worldElem = document.querySelector("[data-world]")
  
  let nextCactusTime
  export function setupvodka() {
    nextCactusTime = tilfeldigTall
    document.querySelectorAll("[data-cactus]").forEach(cactus => {
      cactus.remove()
    })
  }
  export function setupkokain() {
    nextCactusTime = tilfeldigTall
    document.querySelectorAll("[data-cactus]").forEach(cactus => {
      cactus.remove()
    })
  }
  export function updateObsticle(delta, speedScale) {
    document.querySelectorAll("[data-cactus]").forEach(cactus => {
      incrementCustomProperty(cactus, "--left", delta * speedScale * SPEED * -1)
      if (getCustomProperty(cactus, "--left") <= -100) {
        cactus.remove()
      }
    })



  
    if (nextCactusTime <= 0) {
      createCactus1()
      createCactus2()
      nextCactusTime =
        randomNumberBetween(CACTUS_INTERVAL_MIN, CACTUS_INTERVAL_MAX) / speedScale
    }
    nextCactusTime -= delta  
  }
  
  export function getCactusRects() {
    return [...document.querySelectorAll("[data-cactus]")].map(cactus => {
      return cactus.getBoundingClientRect()
    })
  }

  function obsticleChooser() {
    return Math.floor(Math.random() * 10);
  }
  
  const choice = obsticleChooser();
  
  if (choice < 5) {
    createCactus1();
  } else {
    createCactus2();
  }
  
  function createCactus1() {
    const cactus = document.createElement("img");
    cactus.dataset.cactus = true;
    cactus.src = "imgs/vodka.png";
    cactus.classList.add("cactus");
    setCustomProperty(cactus, "--left", 100);
    worldElem.append(cactus);
  }
  
  function createCactus2() {
    const cactus = document.createElement("img");
    cactus.dataset.cactus = true;
    cactus.src = "imgs/kokain.jpg";
    cactus.classList.add("cactus");
    setCustomProperty(cactus, "--left", 100);
    worldElem.append(cactus);
  }
  
  


  
  function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }