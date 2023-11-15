class SkipList {
  constructor() {
    //head should be the top node of the first stack
    this.head = new SkipListHead();
  }

  /**
   * Mutation
   *
   * @param {*} key
   */
  insert(key) {
    var height = Probability.trials();
    this.head.insert(key, height);
  }
}

class SkipListHead {
  constructor() {
    this.next = null;
    this.up = null;
    this.down = null;
  }

  insert(key, height) {
    if (this.next) {
      //insert into some list
      this.next.insert(key, height, null);
    } else {
      //insert first into list
      this.next = new SkipListNode(key);
      this.next.prev = this;
      var currentNode = this;
      for (let i = 0; i < height; i++) {
        currentNode.up = new SkipListHead();
        currentNode.up.down = currentNode;
        currentNode.up.next = new SkipListNode(key);
        currentNode.up.next.down = currentNode.next;
        currentNode.up.next.prev = currentNode.up;
        currentNode = currentNode.up;
      }
    }
    //check this
    this.head = currentNode.down;
  }

  /**
   * Gets the height of this stack
   *
   * @returns nat
   */
  height() {
    return 1 + (this.down ? this.down.height() : 0);
  }

  isHead() {
    return true;
  }
}

class SkipListNode {
  constructor(key) {
    this.key = key;
    this.next = null;
    this.prev = null;
    this.down = null;
  }

  insert(key, height, prevInStack) {
    if (this.height() >= height) {
      var nodeBefore = this.searchAtLevel(key, height);
      var node = new SkipListNode(key);

      node.next = nodeBefore.next;
      node.prev = nodeBefore;

      nodeBefore.next.prev = node;
      nodeBefore.next = node;

      prevInStack.down = node;
      node.up = prevInStack;
      //there's no vertical connectivity here. think about how to add it

      //if lower nodes, recur, and see where they fit
      if (nodeBefore.down) {
        nodeBefore.down.insert(key, height - 1, node);
      }
    } else {
      //something else, if the height requested is higher than exists
    }
  }

  /**
   * Searches for the node with the given key (top)
   *
   * @param {*} key
   * @returns node / undefined
   */
  search(key) {
    if (key == this.key) {
      return this;
    } else {
      if (this.hasNext() && key > this.key) {
        if (this.next.key >= key) {
          this.next.search(key);
        } else {
          this.down.search(key);
        }
      } else {
        return;
      }
    }
  }

  hasNext() {
    return this.next ? true : false;
  }

  /**
   * you can assume this.height >= height
   *
   * @param {*} key
   * @param {*} height
   */
  searchAtLevel(key, height) {
    if (this.height == height) {
      //traverse through linked list
      if (this.hasNext()) {
        if (this.next.key > key) {
          return this.next.searchAtLevel(key, height);
        } else {
          return this.prev;
        }
      } else {
        return this;
      }
    } else {
      if (this.hasNext() && this.key != key) {
        if (this.next.key > key) {
          return this.next.searchAtLevel(key, height);
        } else {
          //there will always be a down if it reaches this half of the og if statement
          return this.down.searchAtLevel(key, height);
        }
      } else {
        //2 cases when you found the right spot, but have to traverse downwards
        return this.down.searchAtLevel(key, height);
      }
    }
  }

  /**
   * Gets the height of this stack
   *
   * @returns nat
   */
  height() {
    return 1 + (this.down ? this.down.height() : 0);
  }

  isHead() {
    return false;
  }
}

window.addEventListener("load", () => {
  function testSkipList() {
    var sl = new SkipList();
    console.log(Probability.rand());
    console.log(Probability.trials());

    sl.insert(10);
    sl.insert(9);

    console.log(sl);
  }

  testSkipList();
});
