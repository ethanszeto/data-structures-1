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
        currentHead = newHead;
      }
      this.head = currentHead;
    }
    //insert with the new stuff
    this.head.insert(key, height, null);
  }
}

class SkipListNode {
  constructor(key) {
    this.key = key;

    this.next = null;
    this.prev = null;
    this.down = null;
  }

  insert(key, height, prevAdded) {
    //insert beginning
    if (key < this.key && !this.hasPrev()) {
      //unlikely --- impossible
      var node = new SkipListNode(key);
    } else if (key > this.key && !this.hasNext()) {
      //insert end
      //check for correct height to add at
      if (this.height() == height) {
        var node = new SkipListNode(key);
        this.next = node;
        node.prev = this;

        //need to add verticality fields. If you previously added one,
        //then you need to make it's "down" this newly added node
        if (prevAdded) {
          prevAdded.down = node;
        }

        //if more below, insert below
        if (this.hasDown()) {
          this.down.insert(key, height - 1, node);
        }
      } else {
        //if not the right height, insert it below
        this.down.insert(key, height, prevAdded);
      }

      var node = new SkipListNode(key);
    } else {
      //insert middle somewhere
    }
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
}

window.addEventListener("load", () => {
  function testSkipList() {
    var sl = new SkipList();
    // console.log(Probability.rand());
    // console.log(Probability.trials());

    sl.insert(10);
    sl.insert(11);
    // sl.insert(8);

    console.log(sl);
  }

  testSkipList();
});

// class SkipList {
//   constructor() {
//     //head should be the top node of the first stack
//     this.head = new SkipListHead();
//   }

//   /**
//    * Mutation
//    *
//    * @param {*} key
//    */
//   insert(key) {
//     var height = Probability.trials();
//     this.head.insert(key, height);
//   }
// }

// class SkipListHead {
//   constructor() {
//     this.next = null;
//     this.up = null;
//     this.down = null;
//   }

//   insert(key, height) {
//     if (this.next) {
//       //insert into some list
//       this.next.insert(key, height, null, this.head);
//     } else {
//       //insert first into list
//       this.next = new SkipListNode(key);
//       this.next.prev = this;
//       var currentNode = this;
//       for (let i = 0; i < height; i++) {
//         currentNode.up = new SkipListHead();
//         currentNode.up.down = currentNode;
//         currentNode.up.next = new SkipListNode(key);
//         currentNode.up.next.down = currentNode.next;
//         currentNode.up.next.prev = currentNode.up;
//         currentNode = currentNode.up;
//       }
//     }
//     //check this
//     this.head = currentNode;
//   }

//   /**
//    * Gets the height of this stack
//    *
//    * @returns nat
//    */
//   height() {
//     return 1 + (this.down ? this.down.height() : 0);
//   }

//   isHead() {
//     return true;
//   }
// }

// class SkipListNode {
//   constructor(key) {
//     this.key = key;
//     this.next = null;
//     this.prev = null;
//     this.down = null;
//   }

//   insert(key, height, prevInStack, head) {
//     if (this.height() >= height) {
//       var nodeBefore = this.searchAtLevel(key, height);
//       var node = new SkipListNode(key);

//       if (nodeBefore.next) {
//         node.next = nodeBefore.next;
//         nodeBefore.next.prev = node;
//       }

//       node.prev = nodeBefore;
//       nodeBefore.next = node;

//       if (prevInStack) {
//         prevInStack = node;
//       }
//       node.up = prevInStack;

//       //if lower nodes, recur, and see where they fit
//       if (nodeBefore.down) {
//         nodeBefore.down.insert(key, height - 1, node);
//       }
//     } else {
//       //something else, if the height requested is higher than exists
//       var currentNode = head;
//       var node = new SkipListNode(key);

//       for (let i = 0; i < height - this.height; i++) {
//         currentNode.up = new SkipListHead();
//         currentNode.up.down = head;
//         currentNode.up.next = node;
//         node.prev = currentNode;

//         currentNode = currentNode.up;
//       }
//     }
//   }

//   /**
//    * Searches for the node with the given key (top)
//    *
//    * @param {*} key
//    * @returns node / undefined
//    */
//   search(key) {
//     if (key == this.key) {
//       return this;
//     } else {
//       if (this.hasNext() && key > this.key) {
//         if (this.next.key >= key) {
//           this.next.search(key);
//         } else {
//           this.down.search(key);
//         }
//       } else {
//         return;
//       }
//     }
//   }

//   hasNext() {
//     return this.next ? true : false;
//   }

//   /**
//    * you can assume this.height >= height
//    *
//    * @param {*} key
//    * @param {*} height
//    */
//   searchAtLevel(key, height) {
//     if (this.height == height) {
//       //traverse through linked list
//       if (this.hasNext()) {
//         if (this.next.key > key) {
//           return this.next.searchAtLevel(key, height);
//         } else {
//           return this.prev;
//         }
//       } else {
//         return this;
//       }
//     } else {
//       if (this.hasNext() && this.key != key) {
//         if (this.next.key > key) {
//           return this.next.searchAtLevel(key, height);
//         } else {
//           //there will always be a down if it reaches this half of the og if statement
//           return this.down.searchAtLevel(key, height);
//         }
//       } else {
//         //2 cases when you found the right spot, but have to traverse downwards
//         return this.down ? this.down.searchAtLevel(key, height) : this;
//       }
//     }
//   }

//   /**
//    * Gets the height of this stack
//    *
//    * @returns nat
//    */
//   height() {
//     return 1 + (this.down ? this.down.height() : 0);
//   }

//   isHead() {
//     return false;
//   }
// }
