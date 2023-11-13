/**
 * Red Black Tree
 */
class RedBlackTree {
  constructor() {
    this.root = null;
    this.nil = null;
  }

  /**
   * Searches for the node with the given key
   *
   * Returns undefined if not found.
   *
   * @param {*} key
   * @returns
   */
  search(key) {
    if (this.root) {
      return this.root.search(key);
    }
    return;
  }

  /**
   * Searches for the node with the minimum key value
   *
   * Returns undefined if not found.
   *
   * @returns RedBlackNode / undefined
   */
  min() {
    return this.root ? this.root.min() : undefined;
  }

  /**
   * Searches for the node with the maximum key value
   *
   * Returns undefined if not found
   *
   * @returns RedBlackNode / undefined
   */
  max() {
    return this.root ? this.root.max() : undefined;
  }

  /**
   * Finds the node that is the successor to this node
   *
   * @param {RedBlackNode} x node
   * @returns RedBlackNode
   */
  successor(x) {
    if (x.right) {
      return x.right.min();
    } else {
      var y = x.parent;
      while (y && x == y.right) {
        x = y;
        y = y.parent;
      }
      return y;
    }
  }

  /**
   * Finds the not that is the predecessor to this node
   *
   * @param {RedBlackNode} x node
   * @returns RedBlackNode
   */
  predecessor(x) {
    if (x.left) {
      return x.left.max();
    } else {
      var y = x.parent;
      while (y && x == y.left) {
        x = y;
        y = y.parent;
      }
      return y;
    }
  }

  /**
   * Rotates leftwards
   *
   * Mutation
   *
   * @param {RedBlackNode} x
   */
  leftRotate(x) {
    var y = x.right;
    x.right = y.left;
    if (y.left != this.nil) {
      y.left.parent = x;
    }
    y.parent = x.parent;

    if (x.parent == this.nil) {
      this.root = y;
    } else if (x == x.parent.left) {
      x.parent.left = y;
    } else {
      x.parent.right = y;
    }

    y.left = x;
    x.parent = y;
  }

  /**
   * Rotates rightward
   *
   * Mutation
   *
   * @param {RedBlackNode} x
   */
  rightRotate(y) {
    var x = y.left;
    y.left = x.right;
    if (x.right != this.nil) {
      x.right.parent = y;
    }
    x.parent = y.parent;
    if (y.parent == this.nil) {
      this.root = x;
    } else if (y == y.parent.right) {
      y.parent.right = x;
    } else {
      y.parent.left = x;
    }
    x.right = y;
    y.parent = x;
  }

  /**
   * Insert RedBlackNode z into this RedBlackTree.
   *
   * Mutation
   *
   * @param {RedBlackNode} z
   */
  insert(z) {
    var x = this.root;
    var y = this.nil;
    while (x != this.nil) {
      y = x;
      if (z.key < x.key) {
        x = x.left;
      } else {
        x = x.right;
      }
    }

    z.parent = y;

    if (y == this.nil) {
      this.root = z;
    } else if (z.key < y.key) {
      y.left = z;
    } else {
      y.right = z;
    }

    z.left = this.nil;
    z.right = this.nil;
    z.color = c.red;

    this.insertFixup(z);
  }

  insertFixup(z) {
    //z has to have a parent?
    while (z.parent && z.parent.color == c.red) {
      if (z.parent == z.parent.parent.left) {
        var y = z.parent.parent.right;
        if (y && y.color == c.red) {
          // y has to exist ?
          z.parent.color = c.black;
          y.color = c.black;
          z.parent.parent.color = c.red;
          z = z.parent.parent;
        } else {
          if (z == z.parent.right) {
            z = z.parent;
            this.leftRotate(z);
          }
          z.parent.color = c.black;
          z.parent.parent.color = c.red;
          this.rightRotate(z.parent.parent);
        }
      } else {
        var y = z.parent.parent.left;
        if (y && y.color == c.red) {
          // y has to exist ?
          z.parent.color = c.black;
          y.color = c.black;
          z.parent.parent.color = c.red;
          z = z.parent.parent;
        } else {
          if (z == z.parent.left) {
            z = z.parent;
            this.rightRotate(z);
          }
          z.parent.color = c.black;
          z.parent.parent.color = c.red;
          this.leftRotate(z.parent.parent);
        }
      }
    }

    this.root.color = c.black;
  }
}

/**
 * Red Black Node
 */
class RedBlackNode {
  constructor(key) {
    this.key = key;
    this.color = c.black;
    this.parent = null;
    this.right = null;
    this.left = null;
  }

  /**
   * Recursive method to find the given key in this RedBlackNode tree
   *
   * Returns undefined if not found.
   *
   * @param {*} key
   * @returns RedBlackNode / undefined
   */
  search(key) {
    if (key != this.key) {
      if (key < this.key) {
        if (this.hasLeft()) {
          return this.left.search(key);
        } else {
          return;
        }
      } else {
        if (this.hasRight()) {
          return this.right.search(key);
        } else {
          return;
        }
      }
    } else {
      return this;
    }
  }

  /**
   * Returns the node with the minimum key value in this RedBlackNode tree
   *
   * Recursive method
   *
   * @returns RedBlackNode
   */
  min() {
    return this.hasLeft() ? this.left.min() : this;
  }

  /**
   * Returns the node with the maximum key value in this RedBlackNode tree
   *
   * Recursive method
   *
   * @returns RedBlackNode
   */
  max() {
    return this.hasRight() ? this.right.max() : this;
  }

  /**
   * Does this RedBlackNode have a right child?
   *
   * @returns boolean
   */
  hasRight() {
    return this.right ? true : false;
  }

  /**
   * Does this RedBlackNode have a left child?
   *
   * @returns boolean
   */
  hasLeft() {
    return this.left ? true : false;
  }
}

/**
 * Color Class
 */
class c {
  static black = "black";
  static red = "red";
}

window.addEventListener("load", () => {
  function testRedBlackTree() {
    var rkt = new RedBlackTree();
    console.log(rkt);
    rkt.insert(new RedBlackNode(10));
    // rkt.insert(new RedBlackNode(9));
    // rkt.insert(new RedBlackNode(8));
    // rkt.insert(new RedBlackNode(7));
    // rkt.insert(new RedBlackNode(6));
    // rkt.insert(new RedBlackNode(5));
    // rkt.insert(new RedBlackNode(4));
    rkt.insert(new RedBlackNode(11));
    rkt.insert(new RedBlackNode(12));
    rkt.insert(new RedBlackNode(13));
    rkt.insert(new RedBlackNode(14));
    rkt.insert(new RedBlackNode(15));
    rkt.insert(new RedBlackNode(16));
    rkt.insert(new RedBlackNode(17));
    rkt.insert(new RedBlackNode(18));
    rkt.insert(new RedBlackNode(19));
    rkt.insert(new RedBlackNode(20));
    rkt.insert(new RedBlackNode(21));

    console.log(rkt);

    console.log(rkt.search(20));

    console.log(rkt.predecessor(rkt.max()));

    console.log(rkt.successor(rkt.min()));
  }

  testRedBlackTree();
});
