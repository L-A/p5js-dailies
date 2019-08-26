let x = 0,
  y = 0,
  fade = 255;
clicked = false;

function setup() {
  createCanvas(800, 600);
  background("#0827A0");

  let i = 1000;
  while (i > 0) {
    const variation = random(24) - 5;
    blendMode(LIGHTEST);
    if (x >= 800 || y >= 600) {
      x = random(800);
      y = random(600);
      fade = 255;
    }
    x += variation / 2;
    y += variation;
    fade -= variation * 0.8;
    strokeWeight(variation / 20);
    stroke(255 - (fade * variation) / 12);
    noFill();
    ellipse(x, y, variation * 2, variation);
    i--;
  }
}

function mouseClicked() {
  clicked = !clicked;
}
