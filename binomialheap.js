class BinomialHeap {
  constructor(val) {
    this.heaps = [new BinHeapNode(val)];
  }

  insert(key) {
    this.merge(new BinomialHeap(key));
  }

  merge(binHeap) {
    let bothHeaps = this.heaps.concat(binHeap.heaps);
    this.heaps = this.consolidate(bothHeaps);
  }

  consolidate(array) {
    while (this.hasDuplicateOrder(array)) {
      let duplicates = this.findDuplicates(array);
      if (duplicates[0].value < duplicates[1].value) {
        duplicates[0].order += 1;
        duplicates[0].children.push(duplicates[1]);
        this.sortByOrderDescending(duplicates[0].children);
        duplicates[1].parent = duplicates[0];
        array.push(duplicates[0]);
      } else {
        duplicates[1].order += 1;
        duplicates[1].children.push(duplicates[0]);
        this.sortByOrderDescending(duplicates[1].children);
        duplicates[0].parent = duplicates[1];
        array.push(duplicates[1]);
      }
    }
    this.sortByOrderAscending(array);
    return array;
  }

  min() {
    var min = this.heaps[0].value;
    for (let i = 1; i < this.heaps.length; i++) {
      if (this.heaps[i].value < min) {
        min = this.heaps[i].value;
      }
    }
    return min;
  }

  extractMin() {
    //find min node
    var min = this.heaps[0];
    var minIndex = 0;
    for (let i = 1; i < this.heaps.length; i++) {
      if (this.heaps[i].value < min.value) {
        min = this.heaps[i];
        minIndex = i;
      }
    }

    this.heaps = this.heaps.concat(min.children);

    this.heaps.splice(minIndex, 1);

    this.heaps = this.consolidate(this.heaps);

    return min.value;
  }

  /**
   * Given an array of BinHeapNodes, does
   * the same order appear twice or more?
   *
   * @param {BinHeapNode} array
   * @returns boolean
   */
  hasDuplicateOrder(array) {
    let orders = [];
    for (let i = 0; i < array.length; i++) {
      orders.push(array[i].order);
    }
    return orders.some((order, index) => {
      return orders.indexOf(order) != index;
    });
  }

  /**
   * Returns the first two duplicate order
   * BinHeapNodes, and then deletes them from
   * the given array;
   *
   * @param {BinHeapNode} array
   * @returns [BinheapNodes]
   */
  findDuplicates(array) {
    for (let i = 0; i < array.length; i++) {
      for (let j = i + 1; j < array.length; j++) {
        if (array[i].order == array[j].order) {
          return array.splice(i, 1).concat(array.splice(j - 1, 1));
        }
      }
    }
  }

  /**
   *
   *
   * @param {*} array
   */
  sortByOrderDescending(array) {
    array.sort((node1, node2) => {
      return node2.order - node1.order;
    });
  }

  /**
   *
   *
   * @param {*} array
   */
  sortByOrderAscending(array) {
    array.sort((node1, node2) => {
      return node1.order - node2.order;
    });
  }

  toString() {
    var output = "";
    for (let i = 0; i < this.heaps.length; i++) {
      output +=
        this.heaps[i].toString() +
        (i == this.heaps.length - 1 ? "" : "\n |\n |\n V\n\n");
    }
    return output;
  }
}

class BinHeapNode {
  constructor(val) {
    this.value = val;
    this.parent = null;
    this.children = [];
    this.order = 0;
  }

  toString() {
    return this.toStringRecur(0);
  }

  toStringRecur(i) {
    var output = "";

    var carriage = "";
    for (let j = 0; j <= i; j++) {
      carriage += "|---";
    }

    output += "value: " + this.value + "\n";

    for (let j = 0; j < this.children.length; j++) {
      output += carriage + this.children[j].toStringRecur(i + 1);
    }

    return output;
  }
}

window.addEventListener("load", () => {
  function testBinomialHeap() {
    var binHeap = new BinomialHeap(0);
    //var binHeap = new BinomialHeap(1);

    binHeap.insert(1);
    binHeap.insert(2);
    binHeap.insert(3);
    binHeap.insert(4);
    binHeap.insert(-1);
    binHeap.insert(-2);
    binHeap.insert(10);

    console.log(binHeap);
  }

  //testBinomialHeap();
});
