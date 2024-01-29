var rad = 0;
var mysize = 200;
var count = 500;
var mytime = 0;

var pressingCount = 0;
var mapRadiusHole = 0;

const myPI = (1 + Math.sqrt(5))/2;
var mouse;

var pulseSpeed = 0.02; // Adjust the pulse speed
var sineWaveOffset = 0; // Variable to control sine wave pattern
var sineWaveSpeed = 0.01; // Adjust the speed of the sine wave
var isSpacePressed = false; // Flag to check if the space key is pressed

// Define multiple color palettes
var colorPalettes = [
  ['#FF3E4D', '#FC8262', '#FF0000', '#A8D8EA', '#00E4F1'],
  ['#6A0572', '#AB83A1', '#C7B7A9', '#0A9FB1', '#2400BD'],
  ['#003049', '#D62828', '#F77F00', '#FCBF49', '#EAE2B7'],
  ['#000000', '#464646', '#555555', '#AEAEAE', '#FFFFFF'],
  ['#C0E3F5', '#37D628', '#F77F00', '#E949FC', '#9C0536'],
  ['#FF0000', '#FFB200', '#73FF00', '#00F5FF', '#FF0000'],
];

var currentPalette;
var trailAlpha = 20; // Trail opacity

function setup() {
  createCanvas(600, 600);
  noStroke();
  let canvas=createCanvas(600, 600);
    canvas.parent('canvas-container');
  // Randomly select a color palette initially
  changeColorPalette();
  
  rad = width;
  mouse = createVector(mouseX, mouseY);
}

function draw() { 
  mytime = frameCount/100;
  mouse.x = map(mouseX, 0, width, 0, 50);
  mouse.y = map(mouseY, 0, width, 0, 20);
  count = abs(cos(mytime/8)*5000);
  
  // Draw a semi-transparent background each frame
  background(0, trailAlpha);
  
  push();
  translate(width/2, height/2);
  for(let i = 0; i <= count; i ++){
    var x = cos(i * myPI * TWO_PI)*(i/count)*rad;
    var y = sin(i * myPI * TWO_PI)*(i/count)*rad;

    // Apply the sine wave offset if space key is pressed
    if (isSpacePressed) {
      x += sin(i * sineWaveSpeed + sineWaveOffset) * 50;
    }

    // Use the current color palette
    var index = i % currentPalette.length;
    fill(color(currentPalette[index]));
    
    circle(x, y, abs(cos(i*mouse.y/count + mytime*2)*mouse.x));
  }
  pop();
}

function mousePressed() {
  // Change the color palette when the mouse is clicked
  changeColorPalette();
}

function keyPressed() {
  // Check if the space key is pressed
  if (keyCode === 32) {
    // Toggle the flag to start/stop the sine wave pattern
    isSpacePressed = !isSpacePressed;
    
    // Reset the sine wave offset when starting the pattern
    if (isSpacePressed) {
      sineWaveOffset = 0;
    }
  }
}

function changeColorPalette() {
  currentPalette = random(colorPalettes);
}
