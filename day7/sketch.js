"use strict";

var segments = 100;
var r = 80;
var cycleLength = 240;
var noiseCycle = void 0;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  background(0, 0, 0, 255);
  noiseCycle = SimplexNoise.createNoiseCycle(2, 4);
}

function draw() {
  background(0);
  noStroke();
  for (var i = 0; i <= 1.1; i += 1 / segments) {
    var cyclePosition = frameCount % cycleLength / cycleLength;
    var offset = noiseCycle(i, cyclePosition) * (sin((i - cyclePosition) * TWO_PI) / 2 + 1) * 4;
    var ellipseColor = lerpColor(color("#60004E"), color("#54B8FF"), offset / 4 * (offset / 4));
    fill(ellipseColor);
    var x = (r + offset) * sin(i * TWO_PI);
    var y = (r + offset) * cos(i * TWO_PI);
    ellipse(x, y, offset + 1);
    var lineColor = lerpColor(color("#20004E"), color("#00FFE6"), offset / 8 * (offset / 8));
    fill(lineColor);
    var x2 = (r / 3 + offset * offset) * sin(i * TWO_PI);
    var y2 = (r / 3 + offset * offset) * cos(i * TWO_PI);
    stroke(lineColor);
    strokeWeight(1);
    line(x2 / 3, y2 / 3, x2, y2);
    noStroke();
  }
}