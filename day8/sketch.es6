let noiseCycle;
let boxWidth;

const margin = 1;
const boxAmount = 12;
const axes = 200;
const cycleLength = 180;
let orthoAngle;
let cycle = 0;

function setup() {
  createCanvas(820, 620, WEBGL);
  boxWidth = ((axes - margin) * 2) / boxAmount - 2;
  orthoAngle = QUARTER_PI * 1.5;
  ortho(-axes * 2, axes * 2, -axes * 2, axes * 2, -axes * 4, axes * 4);

  stroke(0);
  strokeWeight(2);
  // noStroke();
}

function draw() {
  const cyclePosition = (frameCount % cycleLength) / cycleLength;

  background(0, 20, 10);
  specularMaterial(255);
  directionalLight(45, 45, 255, 1, 0, 0);
  directionalLight(0, 155, 100, 0, 1, 0);

  rotateX(-QUARTER_PI * 0.4);
  rotateY(orthoAngle);

  for (let z = -axes; z < axes; z += boxWidth + margin) {
    for (let x = -axes; x < axes; x += boxWidth + margin) {
      const offset = map(dist(x, z, 0, 0), 0, axes * 2, 0, 1);
      push();
      let height = sinPosition(offset + cyclePosition) * axes * 0.8 + 60;
      translate(x, 0, z);
      box(boxWidth, height, boxWidth);
      pop();
    }
  }
  cycle += 0.01;
}

const sinPosition = position => sin(position * TWO_PI) / 2 + 0.5;
