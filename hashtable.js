class HashTable {
  constructor(max) {
    this.max = max;
    this.table = [];
  }

  //ring Zm hash function over strings
  hash(key) {
    //abstracted
    return hashAbs(key, this.max);
  }

  insert(key, value) {
    var kvp = new KVP(key, value);
    var hashID = this.hash(key);
    if (this.table[hashID]) {
      this.table[hashID] = new LinkedList(kvp, this.table[hashID]);
    } else {
      this.table[hashID] = new LinkedList(kvp, null);
    }
  }

  find(key) {
    var hashID = this.hash(key);
    var val = findRecur(this.table[hashID], key);

    function findRecur(list, key) {
      if (list.head.key == key) {
        return list.head.value;
      } else {
        if (list.hasNext()) {
          findRecur(list.tail, key);
        } else {
          return;
        }
      }
    }
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

//generic key value pairing
class KVP {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
}

function hashAbs(key, max) {
  var keyArray = [];

  for (let i = 0; i < key.length; i++) {
    keyArray.push(strToNum(key[i]));
  }

  keyArray = permute(keyArray);

  return recombine(keyArray, max);

  function strToNum(s) {
    const alphanumeric = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
    ];

    for (let i = 0; i < alphanumeric.length; i++) {
      if (s == alphanumeric[i]) {
        return i;
      }
    }
    return 0;
  }

  function permute(array) {
    const permutation = [
      11, 25, 0, 18, 19, 5, 17, 4, 16, 13, 22, 1, 6, 12, 20, 2, 24, 3, 23, 7,
      10, 9, 14, 21, 15, 14, 8,
    ];
    var output = [];
    for (let i = 0; i < array.length; i++) {
      output[i] = permutation[array[i]];
    }
    return output;
  }

  function recombine(array, m) {
    var bool = true;
    var num = 0;
    for (let i = 0; i < array.length; i++) {
      if (bool) {
        num += array[i];
        bool = false;
      } else {
        num /= array[i];
        num *= 10;
      }
    }
    num = Math.floor(num);

    return num % m;
  }
}

////////////////////////////////////////////////////////////
//*                        Test                          *//
////////////////////////////////////////////////////////////

window.addEventListener("load", () => {
  function testLinkedList() {
    var list = new LinkedList(1, null);
    var list1 = new LinkedList(2, list);
    var list2 = new LinkedList(3, list1);
    var list3 = new LinkedList(4, list2);
    var list4 = new LinkedList(5, list3);
    var list5 = new LinkedList(6, list4);
    var list6 = new LinkedList(7, list5);
    var list7 = list6.addToHead(8);

    console.log(list4.getVal());
    console.log(list3.hasNext());
    console.log(list6.next());
    console.log(list7);
  }

  function testHash() {
    var hashT = new HashTable(10);
    console.log(hashT.hash("myname"));
    console.log(hashT.hash("myname"));
    console.log(hashT.hash("yourname"));
    console.log(hashT.hash("bruh"));
    console.log(hashT.hash("e"));
    console.log(hashT.hash("a"));
    console.log(hashT.hash("c"));
    console.log(hashT.hash("d"));
    console.log(hashT.hash("longword"));
    console.log(hashT.hash("l"));
    console.log(hashT.hash("q"));
    console.log(hashT.hash("qsadfwerfqw"));
  }

  function testHashTable() {
    var hashT = new HashTable(10);
    hashT.insert("myname", 20);
    hashT.insert("myname", 21);
    hashT.insert("myname", 22);

    console.log(hashT.table);
  }

  //testLinkedList();
  testHashTable();
});
