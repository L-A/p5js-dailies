"use strict";

var noiseCycle = void 0;
var boxWidth = void 0;

var margin = 1;
var boxAmount = 12;
var axes = 200;
var cycleLength = 180;
var orthoAngle = void 0;
var cycle = 0;

function setup() {
  createCanvas(820, 620, WEBGL);
  boxWidth = (axes - margin) * 2 / boxAmount - 2;
  orthoAngle = QUARTER_PI * 1.5;
  ortho(-axes * 2, axes * 2, -axes * 2, axes * 2, -axes * 4, axes * 4);

  stroke(0);
  strokeWeight(2);
  // noStroke();
}

function draw() {
  var cyclePosition = frameCount % cycleLength / cycleLength;

  background(0, 20, 10);
  specularMaterial(255);
  directionalLight(45, 45, 255, 1, 0, 0);
  directionalLight(0, 155, 100, 0, 1, 0);

  rotateX(-QUARTER_PI * 0.4);
  rotateY(orthoAngle);

  for (var z = -axes; z < axes; z += boxWidth + margin) {
    for (var x = -axes; x < axes; x += boxWidth + margin) {
      var offset = map(dist(x, z, 0, 0), 0, axes * 2, 0, 1);
      push();
      var height = sinPosition(offset + cyclePosition) * axes * 0.8 + 60;
      translate(x, 0, z);
      box(boxWidth, height, boxWidth);
      pop();
    }
  }
  cycle += 0.01;
}

var sinPosition = function sinPosition(position) {
  return sin(position * TWO_PI) / 2 + 0.5;
};