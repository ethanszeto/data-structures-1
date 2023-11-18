var canvas3;
var ctx3;

window.addEventListener("load", () => {
  canvas3 = document.getElementById("list-graph");
  ctx3 = canvas3.getContext("2d");

  var skiplist = new SkipList();
  document.getElementById("sl-insert").addEventListener("click", () => {
    ctx3.clearRect(0, 0, canvas3.width, canvas3.height);

    var input = parseInt(document.getElementById("sl-input").value);

    skiplist.insert(input);
    drawSL(skiplist, null);
  });

  document.getElementById("sl-delete").addEventListener("click", () => {
    ctx3.clearRect(0, 0, canvas3.width, canvas3.height);

    var input = parseInt(document.getElementById("sl-input").value);

    skiplist.delete(input);
    drawSL(skiplist, null);
  });

  document.getElementById("sl-search").addEventListener("click", () => {
    ctx3.clearRect(0, 0, canvas3.width, canvas3.height);

    var input = parseInt(document.getElementById("sl-input").value);

    var stack = skiplist.search(input);

    drawSL(skiplist, stack);
  });
});

function drawSL(skiplist, searchStack) {
  var array = skiplist.getStacks();
  //space begin and after

  var max = 0;
  for (let i = 0; i < array.length; i++) {
    if (max < array[i].length) {
      max = array[i].length;
    }
  }

  var maxSet = [];
  for (let i = 0; i < max; i++) {
    maxSet.push(new SkipListNode("∞"));
  }

  array.push(maxSet);

  var boxDimension =
    canvas3.width / (array.length * 2 + 1) > canvas3.height / max
      ? canvas3.height / max
      : canvas3.width / (array.length * 2 + 1);

  var pointers = [];
  var boxes = [];
  var words = [];
  var maxX = 0;
  //counter for array indices
  var c = 0;
  //outer loop, deciding positions horizontally
  for (let i = 1; i < array.length * 2; i += 2) {
    var xPos = i * boxDimension;
    //for each element in each stack
    for (let j = 0; j < array[c].length; j++) {
      var boxColor = "#000000";
      var wordColor = "#ffffff";
      var pointerColor = "#000000";

      if (searchStack) {
        //console.log(array[c][j].equals(searchStack[j]));
        if (array[c][j].equals(searchStack[j])) {
          boxColor = "#0b6100";
        }
      }

      boxes.push(
        new Rect(
          xPos,
          canvas3.height - j * boxDimension - boxDimension - j,
          boxDimension,
          boxDimension,
          boxColor
        )
      );

      var keyVal =
        array[c][j].key === -9007199254740991 ? "-∞" : array[c][j].key;

      words.push(
        new Word(
          keyVal,
          wordColor,
          boxDimension / 2 + "px 'Courier New'",
          xPos + boxDimension / 5,
          canvas3.height - j * boxDimension - boxDimension / 3 - j
        )
      );

      if (c != array.length - 1) {
        pointers.push(
          new Rect(
            xPos,
            Math.floor(
              canvas3.height - j * boxDimension - boxDimension / 2 - j
            ),
            canvas3.width - xPos - boxDimension,
            2,
            pointerColor
          )
        );
      } else {
        maxX = xPos + boxDimension;
      }
    }
    c++;
  }

  var order = pointers.concat(boxes, words);
  for (let i = 0; i < order.length; i++) {
    order[i].draw(ctx3);
  }
  ctx3.clearRect(maxX, 0, canvas3.width, canvas3.height);
}
