window.addEventListener("load", () => {
  var binomialHeap;
  document.getElementById("bh-insert").addEventListener("click", () => {
    var input = parseInt(document.getElementById("bh-input").value);
    if (!binomialHeap) {
      binomialHeap = new BinomialHeap(input);
    } else {
      binomialHeap.insert(input);
    }

    document.getElementById("bh-output").value = binomialHeap.toString();
    console.log(binomialHeap);
  });

  document.getElementById("bh-min").addEventListener("click", () => {
    if (!binomialHeap) {
      document.getElementById("bh-output").value = "undefined";
    } else {
      document.getElementById("bh-output").value = binomialHeap.min();
    }
  });

  document.getElementById("bh-extract-min").addEventListener("click", () => {
    var input = parseInt(document.getElementById("bh-input").value);
    if (!binomialHeap) {
      document.getElementById("bh-output").value = "undefined";
    } else {
      document.getElementById("bh-output").value =
        binomialHeap.extractMin(input);
    }
  });

  document.getElementById("bh-view").addEventListener("click", () => {
    if (!binomialHeap) {
      document.getElementById("bh-output").value = "undefined";
    } else {
      document.getElementById("bh-output").value = binomialHeap.toString();
    }
  });
});
