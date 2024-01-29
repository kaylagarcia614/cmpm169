var rad = 0;
var mysize = 200;
var count = 500;
var mytime = 0;

var pressingCount = 0;
var mapRadiusHole = 0;

const myPI = (1 + Math.sqrt(5))/2
var mouse;

function setup() {
  createCanvas(600, 600);
  colorMode(HSB, 360, 100, 100);
  
  rad = width;
  mouse = createVector(mouseX, mouseY);
  noStroke();
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

    // Calculate hue value based on the angle
    var hueValue = map(atan2(y, x), -PI, PI, 0, 360);

    fill(hueValue, 100, 100);
    circle(x, y, abs(cos(i*mouse.y/count + mytime*2)*mouse.x));
  }
  pop();
}
