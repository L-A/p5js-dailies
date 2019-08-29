function setup() {
  createCanvas(800, 600);
  noFill();
  strokeWeight(2);
}

function draw() {
  background("#240086");
  let y = 0;
  let x;
  while (y < height - 200) {
    x = 0;
    beginShape();
    while (x < width) {
      stroke(
        lerpColor(color("#FF9E9E"), color("#240086"), (height - y) / height)
      );
      vertex(
        x,
        y +
          140 * noise((x + frameCount) / 200, (y + x / 10 + frameCount) / 200) +
          50
      );
      x++;
    }
    y += 8;
    endShape();
  }
  // Final shape
  y -= 6;
  x = 0;
  beginShape();
  while (x < width) {
    stroke(color("#FF9E9E"));
    vertex(
      x,
      y +
        140 * noise((x + frameCount) / 200, (y + x / 10 + frameCount) / 200) +
        50
    );
    x++;
  }
  noStroke();
  fill("#2F00AD");
  vertex(width, height);
  vertex(0, height);
  endShape();

  noLoop();
}
