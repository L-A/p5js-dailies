let dots;

colorFade = position => ({
  r: lerp(145, 255, position),
  g: lerp(95, 220, position),
  b: lerp(0, 30, position)
});

function setup() {
  pixelDensity(displayDensity());
  createCanvas(800, 600);
  background(145, 85, 0);
  noStroke();

  lines = [...Array(100)]
    .map(dot => ({
      strokeWeight: random(5) + 15,
      x: random(800),
      y: random(200) - 100,
      color: colorFade(random(1))
    }))
    .sort((a, b) => a.color.r > b.color.r);

  noFill();
  lines.forEach(l => {
    strokeWeight(l.strokeWeight);
    stroke(l.color.r, l.color.g, l.color.b);
    line(l.x, l.y, l.x + random(40) - 20, l.y + 600 + random(20) - 10);
    strokeWeight(l.strokeWeight / 3);
  });
}

function draw() {}
