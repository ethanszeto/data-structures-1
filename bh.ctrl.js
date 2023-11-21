window.addEventListener("load", () => {
  var binomialHeap;
  var heaps = [];
  var names = [];
  var currentHeapName;

  document.getElementById("bh-insert").addEventListener("click", () => {
    var input = parseInt(document.getElementById("bh-input").value);
    if (!binomialHeap) {
      binomialHeap = new BinomialHeap(input);
    } else {
      binomialHeap.insert(input);
    }

    document.getElementById("bh-output").value = binomialHeap.toString();
  });

  document.getElementById("bh-delete").addEventListener("click", () => {
    var input = parseInt(document.getElementById("bh-input").value);
    if (binomialHeap) {
      binomialHeap.delete(input);
    }
    document.getElementById("bh-input").value = "";
    document.getElementById("bh-output").value = binomialHeap.toString();
  });

  document.getElementById("bh-search").addEventListener("click", () => {
    var input = parseInt(document.getElementById("bh-input").value);
    var output;
    if (binomialHeap) {
      output = binomialHeap.search(input);
      console.log(output);
      output = output ? output.toString() : "undefined";
    }

    document.getElementById("bh-input").value = "";
    document.getElementById("bh-output").value = output;
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

  document.getElementById("bh-new").addEventListener("click", () => {
    binomialHeap = undefined;
    document.getElementById("bh-output").value = "";
  });

  document.getElementById("bh-decrease-key").addEventListener("click", () => {
    if (!binomialHeap) {
      document.getElementById("bh-output").value = "undefined";
    } else {
      var oldKey = parseInt(document.getElementById("bh-old-key").value);
      var newKey = parseInt(document.getElementById("bh-new-key").value);

      document.getElementById("bh-old-key").value = "";
      document.getElementById("bh-new-key").value = "";

      binomialHeap.decreaseKey(oldKey, newKey);
      document.getElementById("bh-output").value = binomialHeap.toString();
    }
  });

  ////////////////////////////////////////////////////////////////////////////
  /*                          Mutliple Heaps                                */
  ////////////////////////////////////////////////////////////////////////////

  document.getElementById("bh-save-as").addEventListener("click", () => {
    var bhName = document.getElementById("bh-name").value;
    heaps.push(binomialHeap);
    names.push(bhName);

    binomialHeap = undefined;
    document.getElementById("bh-output").value = "";
    document.getElementById("bh-name").value = "";

    listHeaps();

    for (let i = 0; i < names.length; i++) {
      document
        .getElementById("view-" + names[i])
        .addEventListener("click", () => {
          binomialHeap = getHeap(names[i]);
          document.getElementById("bh-output").value = binomialHeap.toString();
          currentHeapName = names[i];
          document.getElementById("current-heap").innerHTML =
            "Current Heap: " + currentHeapName;
        });

      document
        .getElementById("merge-" + names[i])
        .addEventListener("click", () => {
          if (currentHeapName != names[i] && binomialHeap) {
            binomialHeap.merge(getHeap(names[i]));
            document.getElementById("bh-output").value =
              binomialHeap.toString();
            names.splice(i, 1);
            heaps.splice(i, 1);
            listHeaps();
          } else {
            document.getElementById("bh-output").value = "Cannot Merge to Self";
          }
        });
    }

    function listHeaps() {
      var output = "";
      for (let i = 0; i < names.length; i++) {
        let curName = names[i];
        output += `
      <div>
        <button id="view-${curName}">View ${curName}</button>
        <br />
        <button id="merge-${curName}">Merge with ${curName}</button>
      </div>
      `;
      }
      document.getElementById("saved-heaps").innerHTML = output;
    }
  });

  function getHeap(name) {
    for (let i = 0; i < names.length; i++) {
      if (names[i] == name) {
        return heaps[i];
      }
    }
  }
});
