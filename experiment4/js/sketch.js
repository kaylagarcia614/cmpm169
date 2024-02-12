let sound;

function preload() {
    // Load the "allmyfellas.mp3" file
    sound = loadSound('allmyfellas.wav');
}

function setup() {
    createCanvas(400, 200);
    // Play the loaded sound
    sound.play();
}

function draw() {
    background(220);
    // Your drawing code here
}
