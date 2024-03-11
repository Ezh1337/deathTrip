// Utility functions for manipulating CSS custom properties

// Gets the current numerical value of a CSS custom property
export function getCustomProperty(elem, prop) {
  // parseFloat tries to convert the value to a number, || 0 provides a default value of 0
  return parseFloat(getComputedStyle(elem).getPropertyValue(prop)) || 0;
}

// Sets a new value for a CSS custom property
export function setCustomProperty(elem, prop, value) {
  elem.style.setProperty(prop, value);
}

// Increments (or decrements if value is negative) a CSS custom property by a certain amount
export function incrementCustomProperty(elem, prop, inc) {
  // Gets the current value, adds the increment, and updates the property
  setCustomProperty(elem, prop, getCustomProperty(elem, prop) + inc);
}
