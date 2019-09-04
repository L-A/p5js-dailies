const segments = 100;
const r = 80;
const cycleLength = 240;
let noiseCycle;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  background(0, 0, 0, 255);
  noiseCycle = SimplexNoise.createNoiseCycle(2, 4);
}

function draw() {
  background(0);
  noStroke();
  for (let i = 0; i <= 1.1; i += 1 / segments) {
    const cyclePosition = (frameCount % cycleLength) / cycleLength;
    let offset =
      noiseCycle(i, cyclePosition) *
      (sin((i - cyclePosition) * TWO_PI) / 2 + 1) *
      4;
    let ellipseColor = lerpColor(
      color("#60004E"),
      color("#54B8FF"),
      (offset / 4) * (offset / 4)
    );
    fill(ellipseColor);
    let x = (r + offset) * sin(i * TWO_PI);
    let y = (r + offset) * cos(i * TWO_PI);
    ellipse(x, y, offset + 1);
    let lineColor = lerpColor(
      color("#20004E"),
      color("#00FFE6"),
      (offset / 8) * (offset / 8)
    );
    fill(lineColor);
    let x2 = (r / 3 + offset * offset) * sin(i * TWO_PI);
    let y2 = (r / 3 + offset * offset) * cos(i * TWO_PI);
    stroke(lineColor);
    strokeWeight(1);
    line(x2 / 3, y2 / 3, x2, y2);
    noStroke();
  }
}
