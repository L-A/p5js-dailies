let noiseCycle;

function setup() {
  noiseCycle = createNoiseCycle(1);
  createCanvas(400, 300);
  noFill();
}

function draw() {
  const cycle = 90;
  blendMode(BLEND);
  background("#000");
  blendMode(ADD);
  strokeWeight(20);

  const centerHeight =
    height - 80 - sinCycle((frameCount + cycle / 2 + 20) / cycle) * 60;

  stroke("#F00");
  ellipse(width / 2, centerHeight, (sinCycle(frameCount / cycle) * height) / 3);
  stroke("#0f0");
  ellipse(
    width / 2 + sinCycle((frameCount + cycle / 3) / cycle) * 10,
    centerHeight,
    (sinCycle((frameCount - 4) / cycle) * height) / 3
  );
  stroke("#00F");
  ellipse(
    width / 2 + 4,
    centerHeight,
    (sinCycle((frameCount - 6) / cycle) * height) / 3
  );
}

const createNoiseCycle = wildness => {
  const xOffset = random(100);
  const yOffset = random(100);

  return position => {
    const x = wildness * sin(position * TWO_PI) + xOffset;
    const y = wildness * cos(position * TWO_PI) + yOffset;
    return noise(x, y);
  };
};

const sinCycle = position => sin(position * TWO_PI) / 2 + 1;
