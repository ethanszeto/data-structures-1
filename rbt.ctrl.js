var canvas2;
var ctx2;

window.addEventListener("load", () => {
  canvas2 = document.getElementById("graph");
  ctx2 = canvas2.getContext("2d");

  var rbt = new RedBlackTree();

  document.getElementById("rbt-view").addEventListener("click", () => {
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    document.getElementById("rbt-output").value = rbt;
    drawHeight(rbt);
  });

  document.getElementById("rbt-insert").addEventListener("click", () => {
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    var input = document.getElementById("rbt-input").value;
    rbt.insertKey(input);
    document.getElementById("rbt-output").value = rbt;
    drawHeight(rbt);
  });

  document.getElementById("rbt-search").addEventListener("click", () => {
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    var input = document.getElementById("rbt-input").value;
    var node = rbt.search(input);
    document.getElementById("rbt-output").value = node;
    drawHeight(rbt);
  });

  document.getElementById("rbt-successor").addEventListener("click", () => {
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    var input = document.getElementById("rbt-input").value;
    drawHeight(rbt);
  });

  document.getElementById("rbt-predecessor").addEventListener("click", () => {
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    var input = document.getElementById("rbt-input").value;
    drawHeight(rbt);
  });

  document.getElementById("rbt-min").addEventListener("click", () => {
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);

    drawHeight(rbt);
  });

  document.getElementById("rbt-max").addEventListener("click", () => {
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);

    drawHeight(rbt);
  });
});

function drawHeight(rbt) {
  var height = rbt.height();
  var heightBox = new Rect(0, 0, 175, 50, "rgba(0,0,0,0.75)");
  var heightText = new Word(
    "Height: " + height,
    "#ffffff",
    "20px 'Courier New'",
    20,
    30
  );
  heightBox.draw(ctx2);
  heightText.draw(ctx2);
}

/**
 * this is gonna be tough
 *
 * IDEA: get leaves of left and right, and proportional to that is the placement of the root node
 * Then recursively do it, so that each node can only span that portion of the graph, basically yea.
 *
 * The root splits 1:3
 *
 * the left side gets 1 to split their stuff,
 *
 * the right side gets 3 to split that
 *
 * @param {*} rbt
 */
function drawRbt(rbt) {}
