let angleX = 0;
let angleY = 0;
let angleZ = 0;
let sphereSize = 5; // Size of each sphere
let noiseScale = 0.1; // Scale factor for Perlin noise
let zoomFactor = 1.0; // Initial zoom factor

function setup() {
  createCanvas(800, 800, WEBGL);
}

function draw() {
  background(0);
  noFill();
  strokeWeight(2);
  scale(zoomFactor); // Apply zoom factor

  rotateX(angleX);
  rotateY(angleY);
  rotateZ(angleZ);

  for (let i = 0; i < 1000; i++) { // Drawing 1000 spheres
    let x = map(noise(noiseScale * i), 0, 1, -400, 400); 
    let y = map(noise(noiseScale * i + 1000), 0, 1, -400, 400); 
    let z = map(noise(noiseScale * i + 2000), 0, 1, -400, 400); 

    let r = map(sin(frameCount * 0.01 + x + y + z), -1, 1, 200, 255);
    let g = map(sin(frameCount * 0.02 + x + y + z), -1, 1, 200, 255); 
    let b = map(sin(frameCount * 0.03 + x + y + z), -1, 1, 200, 255); 

    push();
    translate(x, y, z);
    stroke(r, g, b);
    ambientMaterial(255); // White material for the spheres
    sphere(sphereSize);
    pop();
  }

  angleX += 0.01;
  angleY += 0.02;
  angleZ += 0.03;
}

function mouseWheel(event) {
  zoomFactor += event.delta * 0.001; // Adjust zoom factor based on mouse scroll
  zoomFactor = constrain(zoomFactor, 0.1, 10); // Constrain zoom factor to reasonable limits
  return false; // Prevent default browser behavior
}
