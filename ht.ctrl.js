var canvas;
var ctx;

window.addEventListener("load", () => {
  canvas = document.getElementById("histogram");
  ctx = canvas.getContext("2d");
  document
    .getElementById("generate-histogram")
    .addEventListener("click", () => {
      var text = document.getElementById("text").value;
      var maxHash = document.getElementById("max-hash").value;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      var hashT = new HashTable(maxHash);

      text = text.split(" ");

      for (let i = 0; i < text.length; i++) {
        //if key doesn't exist
        if (!hashT.find(text[i])) {
          hashT.insert(text[i], 1);
        } else {
          //key alr exists
          hashT.increase(text[i]);
        }
      }

      var collisions = [];
      for (let i = 0; i < hashT.table.length; i++) {
        if (hashT.table[i]) {
          collisions.push(hashT.table[i].toArray().length);
        } else {
          collisions.push(0);
        }
      }

      const barWidth = canvas.width / maxHash;

      var maxHeightNum1 = Math.max(...collisions);
      var maxHeightDenom1 = maxHeightNum1 * (8 / 7); //87.5% the way total

      var maxHeightDenom2 = canvas.height;

      var denomRatio = maxHeightDenom2 / maxHeightDenom1;

      for (let i = 0; i < collisions.length; i++) {
        collisions[i] = collisions[i] * denomRatio;
      }

      //collisions becomes height of each bar

      for (let i = 0; i < collisions.length; i++) {
        var xPos = i * barWidth;
        var yPos = canvas.height - collisions[i];
        var bar = new Rect(
          xPos,
          yPos,
          Math.ceil(barWidth),
          collisions[i],
          "#000000"
        );
        bar.draw();
      }

      //need to draw some scale / tickmarks -- I think 4 is enough.
      //need to calculate some stats + variance
    });
});

class Rect {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
