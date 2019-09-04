"use strict";

var xCycle = void 0,
    yCycle = void 0,
    zCycle = void 0;
var head = void 0;
var cycle = 0;
var drawCycles = 50;
var setupDrawCycles = 18000;
var angle = 0.5;
var cycleLength = 480;
var backgroundColor = void 0;

function setup() {
  pixelDensity(displayDensity());
  createCanvas(800, 600);
  xCycle = SimplexNoise.createNoiseCycle(1.3, 2);
  yCycle = SimplexNoise.createNoiseCycle(1.3, 2);
  zCycle = SimplexNoise.createNoiseCycle(1.3, 2);
  head = { x: 0, y: 0, z: 0 };

  background(0);
  noStroke();

  var tracingArray = [];

  for (var i = 0; i < 1; i += 1 / setupDrawCycles) {
    var newX = xCycle(i) * width - width / 2;
    var newY = yCycle(i) * width - width / 2;
    var newDepth = zCycle(i) / cycleLength;

    var edgeProximity = max(abs(head.y) / (height / 2), abs(head.x) / (width / 2));

    var centerVector = p5.Vector.fromAngle(atan2(head.y, head.x), 3);
    var threadColor = lerpColor(color("#F7B500"), color("#99F339"), edgeProximity * 2);
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

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = tracingArray[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var trace = _step.value;

      push();
      translate(width / 2, height / 2);
      fill(0, 0, 0, 10);
      ellipse(trace.x, trace.y, 10);
      ellipse(trace.x, trace.y, 16);
      fill(trace.color);
      ellipse(trace.x, trace.y, 12 - trace.z * 10);
      pop();
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
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