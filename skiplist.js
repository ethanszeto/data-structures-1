class SkipList {
  constructor() {
    this.head = new SkipListNode(Number.MIN_SAFE_INTEGER);
  }

  insert(key) {
    var height = Probability.trials();
    //if requested a height higher than the head array
    if (this.head.height() < height) {
      var currentHead = this.head;
      for (let i = 0; i < height - this.head.height(); i++) {
        var newHead = new SkipListNode(Number.MIN_SAFE_INTEGER);
        newHead.down = currentHead;
        currentHead.up = newHead;
        currentHead = newHead;
      }
      this.head = currentHead;
    }
    //insert with the new stuff
    this.head.insert(key, height, null);
  }

  search(key) {
    return this.head.search(key);
  }

  delete(key) {
    this.head.delete(key);
  }

  getStacks() {
    return this.head.getStacks();
  }
}

class SkipListNode {
  constructor(key) {
    this.key = key;

    this.up = null;
    this.next = null;
    this.prev = null;
    this.down = null;
  }

  insert(key, height, prevAdded) {
    if (key < this.key && !this.hasPrev()) {
      //insert beginning
      //unlikely --- impossible
      var node = new SkipListNode(key);
    } else if (key < this.key && this.hasPrev()) {
      //impossible again
      console.log("sus");
    } else if (key > this.key && !this.hasNext()) {
      //insert end
      //check for correct height to add at
      if (this.height() == height) {
        var node = new SkipListNode(key);
        node.prev = this;
        this.next = node;

        //need to add verticality fields. If you previously added one,
        //then you need to make it's "down" this newly added node
        if (prevAdded) {
          prevAdded.down = node;
          node.up = prevAdded;
        }

        //if more below, insert below
        if (height > 1) {
          this.down.insert(key, height - 1, node);
        }
      } else {
        //if not the right height, insert it below
        this.down.insert(key, height, prevAdded);
      }
    } else if (key > this.key && this.hasNext()) {
      //if the key is larger, but there is a next, you have to move on
      if (key > this.next.key) {
        //traverse forwards
        this.next.insert(key, height, prevAdded);
      } else if (key <= this.next.key) {
        //check heights to see if we have to add at this level
        if (this.height() == height) {
          var node = new SkipListNode(key);
          node.prev = this;
          node.next = this.next;
          this.next.prev = node;
          this.next = node;

          //need to add verticality fields. If you previously added one,
          //then you need to make it's "down" this newly added node
          if (prevAdded) {
            prevAdded.down = node;
            node.up = prevAdded;
          }

          //if more below, insert below
          if (height > 1) {
            this.down.insert(key, height - 1, node);
          }
        } else {
          this.down.insert(key, height, prevAdded);
        }
      }
    }
  }

  search(key) {
    if (this.key == key) {
      return this.bottomNode().getStack([]);
    } else if (this.key < key && this.hasNext()) {
      if (this.next.key <= key) {
        return this.next.search(key);
      } else if (this.next.key > key && this.hasDown()) {
        return this.down.search(key);
      } else {
        return;
      }
    } else if (this.key < key && this.hasDown()) {
      return this.down.search(key);
    } else {
      return;
    }
  }

  delete(key) {
    var deleteList = this.search(key);
    console.log(deleteList);
    if (deleteList) {
      for (let i = deleteList.length - 1; i >= 0; i--) {
        if (deleteList[i].prev) {
          deleteList[i].prev.next = deleteList[i].next;
        }

        if (deleteList[i].next) {
          deleteList[i].next.prev = deleteList[i].prev;
        }
      }
    }
  }

  equals(node) {
    return Object.is(this, node);
  }

  hasUp() {
    return this.up ? true : false;
  }

  hasDown() {
    return this.down ? true : false;
  }

  hasPrev() {
    return this.prev ? true : false;
  }

  hasNext() {
    return this.next ? true : false;
  }

  height() {
    return 1 + (this.down ? this.down.height() : 0);
  }

  getStacks() {
    var stacks = [];
    var bottomNode = this.bottomNode();
    stacks.push(bottomNode.getStack([]));
    while (bottomNode.hasNext()) {
      bottomNode = bottomNode.next;
      stacks.push(bottomNode.getStack([]));
    }
    return stacks;
  }

  getStack(arr) {
    arr.push(this);
    if (this.hasUp()) {
      return this.up.getStack(arr);
    }
    return arr;
  }

  bottomNode() {
    if (this.hasDown()) {
      return this.down.bottomNode();
    }
    return this;
  }
}

window.addEventListener("load", () => {
  function testSkipList() {
    var sl = new SkipList();
    // console.log(Probability.rand());
    // console.log(Probability.trials());

    sl.insert(20);
    sl.insert(40);
    sl.insert(10);
    sl.insert(5);
    sl.insert(80);

    console.log(sl);
  }

  //testSkipList();
});
