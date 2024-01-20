const S = 600;

const PAD = S / 12;

const N = 100;
const spacing = (S - PAD * 2) / N;
let newMode = false;
function setup() {
  createCanvas(S, S);
  frameRate(120);
  background(0)
}

const loopLength = 350;

function draw() {
    
  
    // Update center position based on mouse
    let centerX = mouseX;
    let centerY = mouseY;
  
    let t = (frameCount % loopLength) / loopLength;
    let sineWave = sin(t * TWO_PI); // Add a sine wave component
    let C = map(sineWave, -1, 1, 0, TAU);
  
    for (let x = 0; x <= N; x++) {
      for (let y = 0; y <= N; y++) {
        // Update radius based on sine wave
        let R = 100 + 50 * sin(C + x * 0.1 + y * 0.1);
        let x1 = centerX + R * cos(C);
        let y1 = centerY + R * sin(C);
  
        let x2 = centerX + R * cos(C + PI);
        let y2 = centerY + R * sin(C + PI);
  
        let factor = 18;
  
        let d = pDistance(x * spacing + PAD, y * spacing + PAD, x1, y1, x2, y2) / factor;
  
        let rat = map(sin(C), -1, 1, 0.2, 0.8);
  
        stroke(
          127.5 + 127.5 * sin(d + C),
          80 - 127.5 * cos(d * 0.75 + C),
          127.5 + 127.5 * cos(d * 0.15 + C)
        );
  
        strokeWeight(15 + 15 * sin(d + C));
        point(x * spacing + PAD, y * spacing + PAD);
      }
    }
  }
  
//stays unchanged, basically a grid so the circles dont overlap with eachother
function pDistance(x, y, x1, y1, x2, y2) {

    if (!newMode) {


        // Original pDistance function
        var A = x - x1;
        var B = y - y1;
        var C = x2 - x1;
        var D = y2 - y1;
    
        var dot = A * C + B * D;
        var len_sq = C * C + D * D;
        var param = dot / len_sq;
    
        var xx, yy;
    
        if (param < 0) {
          xx = x1;
          yy = y1;
        } else if (param > 1) {
          xx = x2;
          yy = y2;
        } else {
          xx = x1 + param * C;
          yy = y1 + param * D;
        }
    
        var dx =  xx;
        var dy =  yy;
        return Math.sqrt(dx * dx + dy * dy);
      } else {


        // Adjusted from original function to create new mode
        let dx1 =  x1;
        let dy1 =  y1;
        let dist1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
    
        let dx2 = x - x2;
        let dy2 = y - y2;
        let dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
    
        return min(dist1, dist2);
      }
}
function keyPressed() {
    if (keyCode === ENTER) {
      newMode = !newMode;
      background(0); // Clear canvas when switching modes
    }
  }