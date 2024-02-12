// project.js - 3D Art
// Author: Kayla Garcia
// Date:2/12/2024
let angleX = 0;
let angleY = 0;
let angleZ = 0;
let sphereSize = 5; // Size of each sphere
let noiseScale = 0.1; // Scale factor for Perlin noise
let zoomFactor = 1.0; // Initial zoom factor
let breathingSpeed = 0.02; // Speed of the breathing effect
let breathingRange = 50; // Range of brightness oscillation

function setup() {
    let canvas=createCanvas(600, 600,WEBGL);
    canvas.parent('canvas-container');
}

function draw() {
  background(0);
  noFill();
  strokeWeight(2);
  scale(zoomFactor); // Apply zoom factor

  angleX = map(mouseY, 0, height, -PI, PI); // Rotate around X-axis based on mouseY position
  angleY = map(mouseX, 0, width, -PI, PI); // Rotate around Y-axis based on mouseX position

  rotateX(angleX);
  rotateY(angleY);
  rotateZ(angleZ);

  let brightnessOffset = map(sin(frameCount * breathingSpeed), -1, 1, -breathingRange, breathingRange);

  for (let i = 0; i < 1000; i++) { // Drawing 1000 spheres
    let x = map(noise(noiseScale * i), 0, 1, -400, 400); 
    let y = map(noise(noiseScale * i + 1000), 0, 1, -400, 400); 
    let z = map(noise(noiseScale * i + 2000), 0, 1, -400, 400); 

    let r = map(sin(frameCount * 0.01 + x + y + z), -1, 1, 200, 255) + brightnessOffset; 
    let g = map(sin(frameCount * 0.02 + x + y + z), -1, 1, 200, 255) + brightnessOffset; 
    let b = map(sin(frameCount * 0.03 + x + y + z), -1, 1, 200, 255) + brightnessOffset; 

    push();
    translate(x, y, z);
    stroke(r, g, b);
    ambientMaterial(255); // White material for the spheres
    sphere(sphereSize);
    pop();
  }
}

function mouseWheel(event) {
  zoomFactor += event.delta * 0.001; // Adjust zoom factor based on mouse scroll
  zoomFactor = constrain(zoomFactor, 0.1, 10); // Constrain zoom factor to reasonable limits
  return false; // Prevent default browser behavior
}
