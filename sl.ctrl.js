var canvas3;
var ctx3;

window.addEventListener("load", () => {
  canvas3 = document.getElementById("list-graph");
  ctx3 = canvas3.getContext("2d");

  var skiplist = new SkipList();
  document.getElementById("sl-insert").addEventListener("click", () => {
    ctx3.clearRect(0, 0, canvas3.width, canvas3.height);
    //insert val
    var input = parseInt(document.getElementById("sl-input").value);

    skiplist.insert(input);
    drawSL(skiplist);
    console.log(skiplist);
  });
});

function drawSL(skiplist) {
  var array = skiplist.getStacks();
  //space begin and after

  var max = 0;
  for (let i = 0; i < array.length; i++) {
    if (max < array[i].length) {
      max = array[i].length;
    }
  }

  var boxDimension =
    canvas3.width / (array.length * 2 + 1) > canvas3.height / max
      ? canvas3.height / max
      : canvas3.width / (array.length * 2 + 1);
  //counter for array indices
  var c = 0;
  //outer loop, deciding positions horizontally
  for (let i = 1; i < array.length * 2 + 1; i += 2) {
    var xPos = i * boxDimension;
    //for each element in each stack
    for (let j = 0; j < array[c].length; j++) {
      var box = new Rect(
        xPos,
        canvas3.height - j * boxDimension - boxDimension - j,
        boxDimension,
        boxDimension,
        "#000000"
      );

      var keyVal =
        array[c][j].key === -9007199254740991 ? "-∞" : array[c][j].key;

      var num = new Word(
        keyVal,
        "#ffffff",
        boxDimension / 2 + "px 'Courier New'",
        xPos + boxDimension / 5,
        canvas3.height - j * boxDimension - boxDimension / 3 - j
      );
      box.draw(ctx3);
      num.draw(ctx3);
    }
    c++;
  }
}
