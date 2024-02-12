let angleX = 0;
let angleY = 0;
let angleZ = 0;
let cubeSize = 150;

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

  for (let i = -cubeSize; i <= cubeSize; i += 50) {
    for (let j = -cubeSize; j <= cubeSize; j += 50) {
      for (let k = -cubeSize; k <= cubeSize; k += 50) {
        let r = map(sin(frameCount * 0.01 + i + j + k), -1, 1, 0, 255);
        let g = map(sin(frameCount * 0.02 + i + j + k), -1, 1, 0, 255);
        let b = map(sin(frameCount * 0.03 + i + j + k), -1, 1, 0, 255);

        push();
        translate(i, j, k);
        stroke(r, g, b);
        box(15);
        pop();
      }
    }
  }

  angleX += 0.01;
  angleY += 0.02;
  angleZ += 0.03;
}

function mouseClicked() {
  cubeSize += 10;
}
