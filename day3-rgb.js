let camImage,
  rJitter = 0,
  gJitter = 0,
  bJitter = 0;

function setup() {
  createCanvas(800, 600, WEBGL);
  camImage = createGraphics(200, 150, WEBGL);
  camImage.background(240, 100, 210);
  camImage.translate(0, 0, -100);

  xRotateIncrement = random(1) / 5;
  yRotateIncrement = random(1) / 4 + 1;

  camImage.ambientLight([10, 5, 100]);
  camImage.directionalLight([150, 10, 255], 0, 2, -2); // Blue
}

function draw() {
  background(0);
  camImage.resetShader();
  camImage.background([100, 0, 210]);

  camImage.rotateY((deltaTime / 1000) * yRotateIncrement);
  camImage.rotateX((deltaTime / 1000) * xRotateIncrement);

  translate(-width / 2, -height / 2);

  camImage.specularMaterial([100, 0, 250]);
  camImage.shininess(1);
  camImage.stroke(255);
  camImage.box(50);

  camImage.push();
  camImage.noStroke();
  camImage.translate(0, 50, 0);
  camImage.ambientMaterial([0, 12]);
  camImage.shininess(0);
  camImage.box(50, 1, 50);
  camImage.pop();

  blendMode(SCREEN);
  tint([255, 0, 0]);
  rJitter = jitter(rJitter, 6);
  image(camImage, rJitter - 3, 0, 800, 600);
  tint([0, 255, 0]);
  gJitter = jitter(gJitter, 6);
  image(camImage, gJitter, 0, 800, 600);
  tint([0, 0, 255]);
  bJitter = jitter(bJitter, 6);
  image(camImage, bJitter, 0, 800, 600);
}

function jitter(value, range) {
  let newValue = value + random(range / 2) - range / 4;
  if (newValue > range) {
    newValue -= range / 2;
  } else if (newValue < 0) {
    newValue += range / 2;
  }
  return newValue;
}
