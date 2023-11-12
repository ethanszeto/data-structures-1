/**
 * Red Black Tree
 */
class RedBlackTree {
  constructor() {
    this.root = null;
    this.nil = null;
  }

  /**
   * Rotates leftwards
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
    x.p = y;
  }

  /**
   * Insert RedBlackNode z into this RedBlackTree.
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

    //this.insertFixup(z);
  }

  insertFixup(z) {
    while (z.parent.color == c.red) {
      if (z.parent == z.parent.parent.left) {
        var y = z.parent.parent.right;
        if (y.color == c.red) {
          z.parent.color = c.black;
          y.color = black;
          z.parent.parent.color = black;
          z = z.parent.parent;
        } else {
          if (z == z.parent.right) {
            z = z.parent;
          }
        }
      }
    }
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
    console.log(rkt);
    rkt.insert(new RedBlackNode(11));
    console.log(rkt);
    rkt.insert(new RedBlackNode(9));
    console.log(rkt);
  }

  testRedBlackTree();
});
