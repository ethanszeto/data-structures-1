class SkipList {
  constructor() {
    this.head = null;
    this.levels = [];
  }

  /**
   * Mutation
   *
   * @param {*} key
   */
  insert(key) {
    this.head
      ? this.head.insert(key)
      : (this.head = new SkipListNode(key, this.head));
  }
}

class SkipListNode {
  constructor(head, tail) {
    this.key = head;
    this.next = tail;
    this.up = null;
    this.down = null;
  }

  insert(key) {
    //insert head
    if (key <= this.key) {
      //has to have the height of the max height in general
    } else {
      //insert somewhere else, has to have some height, but also connecting
      this.next.inserRecur(this, key);
    }
  }

  insertRecur(prev, withUp, key) {}
}

window.addEventListener("load", () => {
  function testSkipList() {
    var sl = new SkipList();
    console.log(Probability.rand());

    sl.insert(10);

    console.log(sl);
  }

  testSkipList();
});
