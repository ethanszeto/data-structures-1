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
    x.parent = y;
  }

  /**
   * Rotates rightward
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
    rkt.insert(new RedBlackNode(9));
    rkt.insert(new RedBlackNode(8));
    rkt.insert(new RedBlackNode(7));
    rkt.insert(new RedBlackNode(6));
    rkt.insert(new RedBlackNode(5));
    rkt.insert(new RedBlackNode(4));
    // rkt.insert(new RedBlackNode(11));
    // rkt.insert(new RedBlackNode(12));
    // rkt.insert(new RedBlackNode(13));
    // rkt.insert(new RedBlackNode(14));
    // rkt.insert(new RedBlackNode(15));
    // rkt.insert(new RedBlackNode(16));
    // rkt.insert(new RedBlackNode(17));
    // rkt.insert(new RedBlackNode(18));
    // rkt.insert(new RedBlackNode(19));
    // rkt.insert(new RedBlackNode(20));
    // rkt.insert(new RedBlackNode(21));
    console.log(rkt);
  }

  testRedBlackTree();
});
