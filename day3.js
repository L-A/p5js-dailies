let rgbShader, cam, camImage;

// Unfortunately, the shaders don't work for now :(

const vs = `attribute vec3 aPosition;
varying vec2 vTexCoord;
void main() {
  vec4 positionVec4 = vec4(aPosition, 1.0);
  positionVec4.xy = positionVec4.xy * 2.0 - 1.0;
  gl_Position = positionVec4;
}`;

const fs = `precision mediump float;
varying vec2 vTexCoord;
uniform sampler2D tex0;
uniform vec2 resolution;
void main() {
  vec2 uv = vTexCoord;
  uv = 1.0 - uv;
  vec2 pixelSize = vec2(1.0) / resolution;
  vec2 offset = pixelSize * 10.0;
  vec4 rTex = texture2D(tex0, uv - offset);
  vec4 gTex = texture2D(tex0, uv);
  vec4 bTex = texture2D(tex0, uv + offset);
  // vec4 color = vec4(rTex.r, gTex.g, bTex.b, 1.0);
  // vec4 color = vec4(1.0, 1.0, 0.0, 1.0);
  gl_FragColor = color;
}`;

function setup() {
  createCanvas(800, 600, WEBGL);
  rgbShader = createShader(vs, fs);
  cam = createGraphics(800, 600);
  camImage = createImage(800, 600);
  stroke(100, 0, 100);
  strokeWeight(0.5);
  background(240, 100, 210);

  xRotateIncrement = random(6) * 60;
  yRotateIncrement = random(6) * 60;
}

function draw() {
  resetShader();
  // background(40, 0, 20);

  push();
  directionalLight(100, 10, 210, -100, 0, -30);
  directionalLight(200, 60, 155, 300, 0, 0);
  rotateX(frameCount / xRotateIncrement);
  rotateY(frameCount / yRotateIncrement);
  box(200);
  pop();

  // shader(rgbShader);
  // rect(0, 0, 800, 600);
  const currentCanvas = get(0, 0);
  camImage.loadPixels();
  camImage.pixels = currentCanvas;
  camImage.updatePixels();
  cam.image(camImage, 0, 0);
  rgbShader.setUniform("tex0", cam);
  rgbShader.setUniform("resolution", [800, 600]);
}
