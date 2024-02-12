let angleX = 0;
let angleY = 0;
let angleZ = 0;
let sphereSize = 5; // Size of each sphere
let gridSize = 5; // Number of spheres in each direction

function setup() {
  createCanvas(800, 800, WEBGL);
}

function draw() {
  background(0);
  noFill();
  strokeWeight(2);
  stroke(0);

  rotateX(angleX);
  rotateY(angleY);
  rotateZ(angleZ);

  for (let i = -gridSize; i <= gridSize; i++) {
    for (let j = -gridSize; j <= gridSize; j++) {
      for (let k = -gridSize; k <= gridSize; k++) {
        let r = map(sin(frameCount * 0.01 + i + j + k), -1, 1, 0, 255);
        let g = map(sin(frameCount * 0.02 + i + j + k), -1, 1, 0, 255);
        let b = map(sin(frameCount * 0.03 + i + j + k), -1, 1, 0, 255);

        push();
        translate(i * 50, j * 50, k * 50);
        stroke(r, g, b);
        ambientMaterial(r, g, b);
        sphere(sphereSize);
        pop();
      }
    }
  }

  angleX += 0.01;
  angleY += 0.02;
  angleZ += 0.03;
}

function mouseClicked() {
  sphereSize += 1;
}
