const S = 600;

const PAD = S/12

const N = 24
const spacing = (S-PAD*2)/N

function setup() {
  createCanvas(S, S);

  frameRate(50)
}

const loopLength = 350

function draw() {
  background(0);


  let t = (frameCount%loopLength)/loopLength
  let C = map(t, 0, 1, 0, TAU)

  for(let x = 0; x<=N; x++){
    for(let y = 0; y<=N; y++){

      //let d = dist(x * spacing + PAD, y * spacing + PAD,200,200)/100

      let R = 100
      let x1 = 300 + R * cos(C)
      let y1 = 300 + R * sin(C)

      let x2 = 300 + R * cos(C+PI)
      let y2 = 300 + R * sin(C+PI)



      let factor = 18

      let d = pDistance(x * spacing + PAD, y * spacing + PAD,x1,y1,x2,y2)/factor

      let rat = map(sin(C),-1,1,0.2,.8)


      stroke(127.5 + 127.5 * sin(d + C),
             80 - 127.5 * cos(d*.75 + C),
             127.5 + 127.5 * cos(d*.15 + C))

      strokeWeight(15 + 15*sin(d + C))
      point(x * spacing + PAD, y * spacing + PAD)
    }
  }
}

function pDistance(x, y, x1, y1, x2, y2) {

  var A = x - x1;
  var B = y - y1;
  var C = x2 - x1;
  var D = y2 - y1;

  var dot = A * C + B * D;
  var len_sq = C * C + D * D;
  var param = -1;
 

  var xx, yy;

  if (param < 0) {
    xx = x1;
    yy = y1;
  }
  else if (param > 1) {
    xx = x2;
    yy = y2;
  }
  else {
    xx = x1 + param * C;
    yy = y1 + param * D;
  }

  var dx = x - xx;
  var dy = y - yy;
  return Math.sqrt(dx * dx + dy * dy);
}
