let canvas,
  circle = { x: 100, y: 100, r: 50, xSpeed: 5, ySpeed: 3 };
let frames = [];
let pageCounter = 2;
let isSetupComplete = false; // Flag, um anzuzeigen, ob setup abgeschlossen ist

window.addEventListener("load", () => {
  class MyHandlers extends Paged.Handler {
    afterRendered(pages) {
      console.log("Rendering abgeschlossen!");
    }
  }

  Paged.registerHandlers(MyHandlers);
});

function setup() {
  const interval = setInterval(() => {
    if (document.getElementById("page-1")) {
      let p1 = document.getElementById("page-1").getBoundingClientRect();
      canvas = createCanvas(p1.width, p1.height);
      canvas.parent("page-1");

      while (document.getElementById("page-" + pageCounter)) {
        let page = document
          .getElementById("page-" + pageCounter)
          .getBoundingClientRect();
        frames[pageCounter - 2] = createGraphics(page.width, page.height);
        frames[pageCounter - 2].parent("page-" + pageCounter);
        frames[pageCounter - 2].canvas.style.display = "block";
        if (pageCounter % 2 == 0) {
          frames[pageCounter - 2].position(
            page.left + window.scrollX,
            page.top + window.scrollY
          );
        }

        print(pageCounter);
        pageCounter++;
      }

      //     for (let i = 1; i < pageCounter; i++) {

      //       frames[i] = createGraphics(graphicsWidth, graphicsHeight);

      //       print(frames[i]);
      //     }

      isSetupComplete = true; // Markiere setup als abgeschlossen
      clearInterval(interval); // Stop checking once the element is found
    }
  }, 500); // Check every 100ms
}

function draw() {
  if (!isSetupComplete) return; // Beende draw, wenn setup noch nicht abgeschlossen ist
  // print("pageCounter: " + pageCounter);
  // for (let i = 0; i < pageCounter; i++) {
  //   print(i);
  //   frames[i].image(get(), 0, 0);
  // }
  // frames[0].image(get(), 0, 0);
  // frames[0].background("yellow");

  background("grey");
  fill(100, 150, 200);
  noStroke();
  ellipse(
    (circle.x += circle.xSpeed),
    (circle.y += circle.ySpeed),
    circle.r * 2
  );

  if (circle.x - circle.r <= 0 || circle.x + circle.r >= width)
    circle.xSpeed *= -1;
  if (circle.y - circle.r <= 0 || circle.y + circle.r >= height)
    circle.ySpeed *= -1;
}

function resizeCanvasToSheet(sheet) {
  // const { width, height } = sheet.getBoundingClientRect(); // Get sheet dimensions
  resizeCanvas(sheet.getBoundingClientRect()); // Resize canvas to match
}
