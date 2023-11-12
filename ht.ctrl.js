var canvas;
var ctx;

window.addEventListener("load", () => {
  canvas = document.getElementById("histogram");
  ctx = canvas.getContext("2d");
  document
    .getElementById("generate-histogram")
    .addEventListener("click", () => {
      var outputText = "";
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

      //////////////////////////////////////////////////////////////

      //output hash
      for (let i = 0; i < hashT.table.length; i++) {
        if (hashT.table[i]) {
          var hashTArrayElem = hashT.table[i].toArray();
          for (let j = 0; j < hashTArrayElem.length; j++) {
            outputText += hashTArrayElem[j] + "\n";
          }
        }
      }

      document.getElementById("hash-output").value = outputText;

      //////////////////////////////////////////////////////////////
      //output longest 10% of collisions

      var collisions = [];
      for (let i = 0; i < hashT.table.length; i++) {
        if (hashT.table[i]) {
          collisions.push(hashT.table[i].toArray().length);
        } else {
          collisions.push(0);
        }
      }

      var outputLongCollisions = "";
      var sortedCollisions = [...collisions];
      sortedCollisions = sortedCollisions
        .sort((a, b) => {
          return a - b;
        })
        .reverse();
      var tenpct = Math.ceil(collisions.length * 0.1);
      for (let i = 0; i < tenpct; i++) {
        outputLongCollisions += sortedCollisions[i] + ", ";
      }
      document.getElementById("longest-collisions").value =
        outputLongCollisions;

      //////////////////////////////////////////////////////////////

      //graph related code

      const barWidth = canvas.width / maxHash;

      var maxHeightNum1 = Math.max(...collisions);
      var maxHeightDenom1 = maxHeightNum1 * (8 / 7); //87.5% the way total

      var maxHeightDenom2 = canvas.height;

      var denomRatio = maxHeightDenom2 / maxHeightDenom1;

      var height = [];
      for (let i = 0; i < collisions.length; i++) {
        height[i] = collisions[i] * denomRatio;
      }

      //cool animation for bars can be added here
      for (let i = 0; i < height.length; i++) {
        var xPos = i * barWidth;
        var yPos = canvas.height - height[i];
        var bar = new Rect(
          xPos,
          yPos,
          Math.ceil(barWidth),
          height[i],
          "#000000"
        );
        bar.draw();
      }

      //need to draw some scale / tickmarks -- I think 4 is enough.
      //need to calculate some stats + variance

      var variance = Probability.variance(collisions);
      var mean = Probability.average(collisions);

      var statsBackground = new Rect(
        0,
        0,
        canvas.width,
        canvas.height * 0.1,
        "rgba(0,0,0,0.75)"
      );

      var varWord = new Word(
        "Variance: " + variance.toFixed(2),
        "#ffffff",
        "20px 'Courier New'",
        100,
        35
      );

      var meanWord = new Word(
        "Mean: " + mean.toFixed(2),
        "#ffffff",
        "20px 'Courier New'",
        350,
        35
      );

      var maxWord = new Word(
        "Max: " + Math.max(...collisions),
        "#ffffff",
        "20px 'Courier New'",
        600,
        35
      );

      var minWord = new Word(
        "Min: " + Math.min(...collisions),
        "#ffffff",
        "20px 'Courier New'",
        850,
        35
      );

      //////////////////////////////////////////
      var sideBar = new Rect(
        0,
        canvas.height * 0.1,
        100,
        canvas.height * 0.9,
        "rgba(0,0,0,0.6)"
      );

      //generate heights of 4 marker lines
      var numCollsAtH = maxHeightNum1 / 4;
      var numHeightAtH = numCollsAtH * denomRatio;

      var hwordArr = [];

      for (let i = 1; i <= 4; i++) {
        var hbar = new Rect(
          100,
          canvas.height - numHeightAtH * i + 1,
          canvas.width - 100,
          2,
          "#ffffff"
        );
        hwordArr.push(
          new Word(
            (numCollsAtH * i).toFixed(1),
            "#ffffff",
            "20px 'Courier New'",
            30,
            canvas.height - numHeightAtH * i + 10
          )
        );
        hbar.draw();
      }

      var meanBarY = canvas.height - mean * denomRatio;

      var meanBar = new Rect(
        100,
        meanBarY + 1,
        canvas.width - 100,
        2,
        "#FF0000"
      );

      var meanBarWord = new Word(
        mean.toFixed(1),
        "#FF0000",
        "20px 'Courier New'",
        30,
        meanBarY + 10
      );

      //topbar
      statsBackground.draw();
      varWord.draw();
      meanWord.draw();
      maxWord.draw();
      minWord.draw();

      // graphical
      sideBar.draw();
      meanBar.draw();
      meanBarWord.draw();
      for (let i = 0; i < hwordArr.length; i++) {
        hwordArr[i].draw();
      }
    });
});

class Probability {
  static variance(list) {
    if (list.length == 1 || list.length == 0) {
      return 0;
    }

    var mean = Probability.average(list);
    var varNum = 0;

    for (let i = 0; i < list.length; i++) {
      varNum += Math.pow(list[i] - mean, 2);
    }

    return varNum / (list.length - 1);
  }

  static average(list) {
    var total = 0;
    for (let i = 0; i < list.length; i++) {
      total += list[i];
    }
    return total / list.length;
  }
}

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

class Word {
  constructor(text, color, font, x, y) {
    this.text = text;
    this.color = color;
    this.font = font;
    this.x = x;
    this.y = y;
  }

  draw() {
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.fillText(this.text, this.x, this.y);
  }
}
