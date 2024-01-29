var rad = 0;
var mysize = 200;
var count = 500;
var mytime = 0;

var pressingCount = 0;
var mapRadiusHole = 0;

const myPI = (1 + Math.sqrt(5))/2;
var mouse;

// Define multiple color palettes
var colorPalettes = [
  ['#FF3E4D', '#FC8262', '#FFD076', '#A8D8EA', '#94A5A6'],
  ['#6A0572', '#AB83A1', '#C7B7A9', '#FFD8BE', '#FFE981'],
  ['#003049', '#D62828', '#F77F00', '#FCBF49', '#EAE2B7']
];

var currentPalette;

function setup() {
  createCanvas(600, 600);
  noStroke();
  
  // Randomly select a color palette
  currentPalette = random(colorPalettes);
  
  rad = width;
  mouse = createVector(mouseX, mouseY);
}

function draw() { 
  mytime = frameCount/100;
  mouse.x = map(mouseX, 0, width, 0, 50);
  mouse.y = map(mouseY, 0, width, 0, 20);
  count = abs(cos(mytime/8)*5000);
  
  background(0);
  push();
  translate(width/2, height/2);
  for(let i = 0; i <= count; i ++){
    var x = cos(i * myPI * TWO_PI)*(i/count)*rad;
    var y = sin(i * myPI * TWO_PI)*(i/count)*rad;

    // Use the current color palette
    var index = i % currentPalette.length;
    fill(color(currentPalette[index]));
    
    circle(x, y, abs(cos(i*mouse.y/count + mytime*2)*mouse.x));
  }
  pop();
}
