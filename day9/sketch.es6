let xCycle, yCycle, zCycle;
let head;
let cycle = 0;
let drawCycles = 50;
let setupDrawCycles = 18000;
let angle = 0.5;
let cycleLength = 480;
let backgroundColor;

function setup() {
  pixelDensity(displayDensity());
  createCanvas(800, 600);
  xCycle = SimplexNoise.createNoiseCycle(1.3, 2);
  yCycle = SimplexNoise.createNoiseCycle(1.3, 2);
  zCycle = SimplexNoise.createNoiseCycle(1.3, 2);
  head = { x: 0, y: 0, z: 0 };

  background(0);
  noStroke();

  let tracingArray = [];

  for (let i = 0; i < 1; i += 1 / setupDrawCycles) {
    let newX = xCycle(i) * width - width / 2;
    let newY = yCycle(i) * width - width / 2;
    let newDepth = zCycle(i) / cycleLength;

    let edgeProximity = max(
      abs(head.y) / (height / 2),
      abs(head.x) / (width / 2)
    );

    let centerVector = p5.Vector.fromAngle(atan2(head.y, head.x), 3);
    let threadColor = lerpColor(
      color("#F7B500"),
      color("#99F339"),
      edgeProximity * 2
    );
    head.x = newX - centerVector.x * edgeProximity * 5;
    head.y = newY - centerVector.y * edgeProximity * 5;
    head.z = newDepth;
    head.edgeProximity = edgeProximity;
    head.color = threadColor;
    tracingArray.push({
      x: head.x,
      y: head.y,
      z: head.z,
      color: head.color,
      edgeProximity: head.edgeProximity
    });
  }

  for (let trace of tracingArray) {
    push();
    translate(width / 2, height / 2);
    fill(0, 0, 0, 10);
    ellipse(trace.x, trace.y, 10);
    ellipse(trace.x, trace.y, 16);
    fill(trace.color);
    ellipse(trace.x, trace.y, 12 - trace.z * 10);
    pop();
  }
}

// function draw() {
//   for (let i = 0; i < 1; i += 1 / drawCycles) {
//     let newX =
//       xCycle((frameCount + (i % cycleLength)) / cycleLength) * width -
//       width / 2;
//     let newY =
//       yCycle((frameCount + (i % cycleLength)) / cycleLength) * width -
//       width / 2;
//     let newDepth = zCycle((frameCount + (i % cycleLength)) / cycleLength);

//     let edgeProximity = max(
//       abs(head.y) / (height / 2),
//       abs(head.x) / (width / 2)
//     );

//     let centerVector = p5.Vector.fromAngle(atan2(head.y, head.x), 3);

//     let threadColor = lerpColor(
//       color("#F7B500"),
//       color("#99F339"),
//       edgeProximity * 2
//     );
//     head.x = newX - centerVector.x * edgeProximity;
//     head.y = newY - centerVector.y * edgeProximity;
//     push();
//     translate(width / 2, height / 2);
//     fill(0, 0, 0, 10);
//     ellipse(head.x, head.y, 10);
//     ellipse(head.x, head.y, 16);
//     fill(threadColor);
//     ellipse(head.x, head.y, 12 - newDepth * 6);
//     pop();
//   }
//   fill(255);
//   translate(width / 2, height / 2);

//   ellipse(head.x, head.y, 3);
// }
