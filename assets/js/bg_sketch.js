let canvas;
let frames = [];
let pageCounter = 2;
let isSetupComplete = false; // Flag, um anzuzeigen, ob setup abgeschlossen ist
let pagedRendered = false;

class finishing extends Paged.Handler {
  //Wait for Paged.JS
  // this let us call the methods from the the chunker, the polisher and the caller for the rest of the script
  constructor(chunker, polisher, caller) {
    super(chunker, polisher, caller);
  }
  afterRendered() {
    pagedRendered = true;
  }
}

Paged.registerHandlers(finishing);

function setup() {
  const interval = setInterval(() => {
    if (pagedRendered) {
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
        pageCounter++;
      }

      isSetupComplete = true; // Markiere setup als abgeschlossen
      clearInterval(interval); // Stop checking once the element is found
    }
  }, 100);
}

function draw() {
  if (!isSetupComplete) return; // Beende draw, wenn setup noch nicht abgeschlossen ist

  for (let i = 0; i < pageCounter - 2; i++) {
    frames[i].image(get(), 0, 0);
  }
  translate(width / 2, height / 2);

  // background(182, 236, 197);
  background("white");
  noFill(100, 150, 200);
  stroke(HSB, 100, 0, 0.5, 0.5);

  for (let i = 0; i < 100; i++) {
    strokeWeight(i);
    ellipse(0, 0, millis() * 0.01 + i * 100);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
