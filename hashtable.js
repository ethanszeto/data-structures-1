class HashTable {
  constructor(max) {
    this.max = max;
    this.table = [];
  }
}

//hash KVP
class HashNode {
  constructor(hashID, list) {
    this.hashID = hashID;
    this.list = list;
  }
}

class LinkedList {
  constructor(head, tail) {
    this.head = head;
    this.tail = tail;
  }

  //asks if this linked list has a next
  hasNext() {
    return this.tail ? true : false;
  }

  //gets the next Linked list node
  next() {
    return this.hasNext() ? this.tail : null;
  }

  //gets the value at the head
  getVal() {
    return this.head;
  }

  //adds an element to the head
  addToHead(x) {
    return new LinkedList(x, this);
  }

  //converts this LinkedList into an array
  toArray() {
    var array = [];
    return this.toArrayRecur(array);
  }

  //helper for converstion
  toArrayRecur(array) {
    array.push(this.getVal());
    return this.hasNext() ? this.tail.toArrayRecur(array) : array;
  }
}

class KVP {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
}

window.addEventListener("load", () => {
  function testLinkedList() {
    var list = new LinkedList(1, null);
    var list1 = new LinkedList(2, list);
    var list2 = new LinkedList(3, list1);
    var list3 = new LinkedList(4, list2);
    var list4 = new LinkedList(5, list3);
    var list5 = new LinkedList(6, list4);
    var list6 = new LinkedList(7, list5);

    console.log(list4.getVal());
    console.log(list3.hasNext());
    console.log(list6.next());
  }
});
