"use strict";

var movementNoise = void 0;
var head = void 0;
var cycle = 0;
var drawCycles = 100;
var angle = 0;

function setup() {
  pixelDensity(displayDensity());
  createCanvas(800, 600);

  var noiseSource = new SimplexNoise();
  movementNoise = function movementNoise(x) {
    return noiseSource.noise2D(x / 2, 1);
  };
  head = createVector();

  background(0, 0, 0);
  noStroke();
  fill(255, 255, 255, 100);
}

function draw() {
  for (var i = 0; i < drawCycles; i++) {
    var edgeProximity = (abs(head.x) + abs(head.y)) / (width / 2 + height / 2);
    angle += movementNoise(cycle += 0.01) * HALF_PI - QUARTER_PI;
    var movementVector = p5.Vector.fromAngle(angle + PI * edgeProximity);
    head.x += movementVector.x;
    head.y += movementVector.y;
    push();
    translate(width / 2, height / 2);
    ellipse(head.x, head.y, 1);
    pop();
  }
}