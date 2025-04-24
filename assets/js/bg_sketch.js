let canvas;
let circle = {
  x: 100,
  y: 100,
  radius: 50,
  xSpeed: 5,
  ySpeed: 3,
};

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  loop(); // Enable looping for animation

  // Wait for the pagedjs_sheet element to exist, then attach the canvas
  const interval = setInterval(() => {
    const pagedjsSheet = document.querySelector(".pagedjs_sheet");
    if (pagedjsSheet) {
      canvas.parent(pagedjsSheet); // Attach canvas to the pagedjs_sheet container
      resizeCanvasToSheet(pagedjsSheet); // Resize canvas to match the sheet
      clearInterval(interval); // Stop checking once the element is found
    }
  }, 100); // Check every 100ms
}

function draw() {
  background("white"); // Light gray background

  // Draw the bouncing circle
  fill(100, 150, 200);
  noStroke();
  ellipse(circle.x, circle.y, circle.radius * 2);

  // Update circle position
  circle.x += circle.xSpeed;
  circle.y += circle.ySpeed;

  // Check for collisions with canvas edges
  if (circle.x - circle.radius <= 0 || circle.x + circle.radius >= width) {
    circle.xSpeed *= -1; // Reverse horizontal direction
  }
  if (circle.y - circle.radius <= 0 || circle.y + circle.radius >= height) {
    circle.ySpeed *= -1; // Reverse vertical direction
  }
}

function windowResized() {
  const pagedjsSheet = document.querySelector(".pagedjs_sheet");
  if (pagedjsSheet) {
    resizeCanvasToSheet(pagedjsSheet); // Adjust canvas size on window resize
  }

  // Ensure the circle stays within bounds after resizing
  circle.x = constrain(circle.x, circle.radius, width - circle.radius);
  circle.y = constrain(circle.y, circle.radius, height - circle.radius);
}

function resizeCanvasToSheet(sheet) {
  const { width, height } = sheet.getBoundingClientRect(); // Get sheet dimensions
  resizeCanvas(width, height); // Resize canvas to match
}
