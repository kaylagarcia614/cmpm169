const msg = "WHOA"; // Text to display
let msgSize = 200; // Adjust font size to make text more visible

const noiseParams = {
    cumulative: true, // Whether noise displacements of points accumulate
    noiseZoom: 0.006, // Perlin noise zoom
    noiseOctaves: 4, // Perlin noise octaves
    noiseFalloff: 0.5, // Perlin noise falloff
    lineSpeed: 0.5, // Maximum amount each point can move each frame
    direction: 1 // Direction of noise displacement: 1 for positive, -1 for negative
};

let font;
let points = []; // Array to store points
let bounds;

function preload() {
    font = loadFont('Anton.ttf');

}

function setup() {
    let canvas=createCanvas(600, 600);
    canvas.parent('canvas-container');
    strokeWeight(6);
    noiseDetail(noiseParams.noiseOctaves, noiseParams.noiseFalloff);

    bounds = font.textBounds(msg, 0, 0, msgSize);

    for (let p of font.textToPoints(msg, 0, 0, msgSize, {
        simplifyThreshold: 0
    })) {
        p.zOffset = random();
        p.color = color(random(255), random(255), random(255)); // Generate random color for each point
        points.push(p);
    }

    background(130);
}

function draw() {
   
    translate(width / 2, height / 2); // Translate to the center of the canvas
    rotate(frameCount * 0.01); // Rotate the canvas on the z-axis (plane)

    translate(-bounds.w / 2, bounds.h / 2); // Translate to adjust for text bounds

    // Add a new dot randomly every second
    if (frameCount % 60 == 0) { // Every second
        let newPoint = font.textToPoints(msg, random(width), random(height), msgSize, {
            simplifyThreshold: 0
        })[0];
        newPoint.zOffset = random();
        newPoint.color = color(random(255), random(255), random(255)); // Generate random color for each point
        points.push(newPoint);
    }

    for (let i = 0; i < points.length; i++) {
        let p = points[i];

        let noiseX = p.x * noiseParams.noiseZoom;
        let noiseY = p.y * noiseParams.noiseZoom;
        let noiseZ = frameCount * 0.01 + p.zOffset;

        let noiseDisplacementX = map(noise(noiseX, noiseY, noiseZ), 0, 1, -noiseParams.lineSpeed, noiseParams.lineSpeed) * noiseParams.direction;
        let noiseDisplacementY = map(noise(noiseX, noiseY, noiseZ + 214), 0, 1, -noiseParams.lineSpeed, noiseParams.lineSpeed) * noiseParams.direction;

        if (noiseParams.cumulative) {
            p.x += noiseDisplacementX;
            p.y += noiseDisplacementY;
        } else {
            p.x += noiseDisplacementX - p.prevNoiseDisplacementX;
            p.y += noiseDisplacementY - p.prevNoiseDisplacementY;
        }

        p.prevNoiseDisplacementX = noiseDisplacementX;
        p.prevNoiseDisplacementY = noiseDisplacementY;

        stroke(0); // Set stroke color to black
        fill(p.color); // Use the random color for filling
        ellipse(p.x, p.y, 8); // Draw each point with an ellipse

        if (p.alpha == 1) { // Character break?
            endShape(CLOSE);
            beginShape();
        }
    }
    endShape();
}

function mouseClicked() {
    // Toggle the direction of noise displacement
    noiseParams.direction *= -1;
}
