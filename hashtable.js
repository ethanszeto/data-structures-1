class HashTable {
  constructor(max) {
    this.max = max;
    this.table = [];
  }

  //ring Zm hash function over strings
  hash(key) {
    //abstracted, can use multiple hashes here
    return hash2(key, this.max);
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
    if (!this.table[hashID]) {
      return;
    } else {
      var kvp = this.table[hashID].find(key);
      if (!kvp) {
        return;
      }
      return kvp.value;
    }
  }

  delete(key) {
    var hashID = this.hash(key);
    this.table[hashID] = this.table[hashID].delete(key);
  }

  increase(key) {
    var hashID = this.hash(key);
    var kvp = this.table[hashID].find(key);
    if (kvp) {
      kvp.value = kvp.value + 1;
    }
  }
}

/**
 * Linked List of KVPs
 */
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

  //not mutation, returns list with deleted thing
  delete(key) {
    return this.deleteRecur(this, key);
  }

  //delete helper method
  deleteRecur(list, key) {
    //remove off head
    if (list.head.key == key) {
      return list.tail;
    }

    //other
    if (list.hasNext()) {
      if (list.tail.head.key == key) {
        return new LinkedList(list.head, list.tail.tail);
      } else {
        return new LinkedList(list.head, this.deleteRecur(list.tail, key));
      }
    } else {
      return new LinkedList(list.head, list.tail);
    }
  }

  //finds the KVP at said key. Returns undefined if not found
  find(key) {
    return this.findRecur(this, key);
  }

  //helper for finding
  findRecur(list, key) {
    if (list.head.key == key) {
      return list.head;
    } else {
      if (list.hasNext()) {
        return this.findRecur(list.tail, key);
      } else {
        return;
      }
    }
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

  toString() {
    return this.key + ": " + this.value;
  }
}

//my attempt at a hash function
function hash1(key, max) {
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
      11, 25, 26, 18, 19, 5, 17, 4, 16, 13, 22, 1, 6, 12, 20, 2, 24, 3, 23, 7,
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

//given hash function from someone online, modified to fit
function hash2(str, m) {
  let hash = 0;
  for (let i = 0, len = str.length; i < len; i++) {
    let chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  if (hash < 0) {
    return (hash % m) + m - 1;
  }
  return hash % m;
}

function hash3(s, m) {
  for (var i = 0, h = 0xdeadbeef; i < s.length; i++)
    h = Math.imul(h ^ s.charCodeAt(i), 2654435761);
  var output = (h ^ (h >>> 16)) >>> 0;
  return output % m;
}

////////////////////////////////////////////////////////////
//*                        Test                          *//
////////////////////////////////////////////////////////////

window.addEventListener("load", () => {
  function testLinkedList() {
    var kvp1 = new KVP("a", 1);
    var kvp2 = new KVP("b", 2);
    var kvp3 = new KVP("c", 3);
    var kvp4 = new KVP("d", 4);
    var kvp5 = new KVP("e", 5);
    var kvp6 = new KVP("f", 6);
    var kvp7 = new KVP("g", 7);
    var kvp8 = new KVP("h", 8);
    var kvp9 = new KVP("i", 9);

    var list1 = new LinkedList(kvp1, null);
    var list2 = new LinkedList(kvp2, list1);
    var list3 = new LinkedList(kvp3, list2);
    var list4 = new LinkedList(kvp4, list3);
    var list5 = new LinkedList(kvp5, list4);
    var list6 = new LinkedList(kvp6, list5);
    var list7 = new LinkedList(kvp7, list6);
    var list8 = new LinkedList(kvp8, list7);
    var list9 = new LinkedList(kvp9, list8);

    console.log(list9.toArray());

    console.log(list9.find("f"));

    console.log(list9.find("x"));

    console.log(list9.delete("h").toArray());

    console.log(list9.delete("i").toArray());

    console.log(list9.delete("x").toArray());
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

    var str =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sagittis eu volutpat odio facilisis mauris sit amet massa. Amet facilisis magna etiam tempor orci eu lobortis elementum. Orci porta non pulvinar neque laoreet suspendisse interdum. Ipsum nunc aliquet bibendum enim facilisis gravida. Sodales ut etiam sit amet nisl purus in mollis. Pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum. Nisl condimentum id venenatis a condimentum vitae sapien pellentesque habitant. Fames ac turpis egestas sed tempus urna et. Imperdiet proin fermentum leo vel orci porta non. Varius vel pharetra vel turpis nunc. Dui ut ornare lectus sit. Non odio euismod lacinia at quis risus. Ultrices mi tempus imperdiet nulla malesuada pellentesque elit eget gravida. Ut faucibus pulvinar elementum integer enim neque volutpat ac. Lacus vestibulum sed arcu non odio euismod lacinia at. Semper auctor neque vitae tempus quam. Feugiat nibh sed pulvinar proin gravida hendrerit. Maecenas accumsan lacus vel facilisis volutpat est velit egestas dui. Tortor condimentum lacinia quis vel eros donec. Auctor neque vitae tempus quam pellentesque nec nam. Sollicitudin aliquam ultrices sagittis orci a scelerisque purus semper eget. Amet commodo nulla facilisi nullam. Amet commodo nulla facilisi nullam vehicula ipsum. Fermentum et sollicitudin ac orci phasellus. Ac turpis egestas integer eget aliquet. Ipsum faucibus vitae aliquet nec ullamcorper sit amet. Auctor elit sed vulputate mi sit amet. Cras semper auctor neque vitae tempus. Tristique et egestas quis ipsum. Dictum varius duis at consectetur lorem donec massa sapien. Nec nam aliquam sem et. Ornare arcu dui vivamus arcu felis bibendum ut tristique et. Arcu odio ut sem nulla. Scelerisque eleifend donec pretium vulputate sapien. Nisl purus in mollis nunc sed id semper risus in. Ipsum dolor sit amet consectetur adipiscing. Adipiscing at in tellus integer feugiat scelerisque varius morbi enim. Vel facilisis volutpat est velit. Vitae congue mauris rhoncus aenean vel elit scelerisque mauris pellentesque. Accumsan tortor posuere ac ut. Convallis aenean et tortor at risus viverra adipiscing. Tortor condimentum lacinia quis vel eros donec. Faucibus ornare suspendisse sed nisi lacus. Risus pretium quam vulputate dignissim suspendisse in est. Convallis a cras semper auctor. Convallis a cras semper auctor neque vitae tempus quam. Amet consectetur adipiscing elit ut aliquam. Consectetur libero id faucibus nisl tincidunt. Adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque. Justo nec ultrices dui sapien eget mi. Pulvinar sapien et ligula ullamcorper malesuada proin libero. Quis viverra nibh cras pulvinar. Euismod lacinia at quis risus sed. Tincidunt tortor aliquam nulla facilisi cras fermentum. Risus nec feugiat in fermentum posuere urna nec. Fringilla ut morbi tincidunt augue interdum. Aenean sed adipiscing diam donec adipiscing tristique. Scelerisque eu ultrices vitae auctor eu augue. Augue ut lectus arcu bibendum at varius vel pharetra. Pellentesque elit eget gravida cum sociis natoque penatibus. Scelerisque eu ultrices vitae auctor eu augue ut lectus. Nulla pharetra diam sit amet nisl suscipit adipiscing bibendum. Et sollicitudin ac orci phasellus egestas tellus rutrum. Iaculis nunc sed augue lacus";

    var strArr = str.split(" ");

    /*
    //for positions of each word (EXTRA CREDIT)
    for (let i = 0; i < strArr.length; i++) {
      hashT.insert(strArr[i], i);
    }
    */

    //for count of each word
    for (let i = 0; i < strArr.length; i++) {
      //if key doesn't exist
      if (!hashT.find(strArr[i])) {
        hashT.insert(strArr[i], 1);
      } else {
        //key alr exists
        hashT.increase(strArr[i]);
      }
    }

    console.log(hashT.table);

    var collisions = [];
    for (let i = 0; i < hashT.table.length; i++) {
      if (hashT.table[i]) {
        console.log(hashT.table[i].toArray());
        collisions.push(hashT.table[i].toArray().length);
      }
    }

    console.log("------------------------------------------------");
    console.log(hashT.find("sapien"));
    console.log(hashT.table[hashT.hash("nunc")].toArray());
    hashT.delete("nunc");
    hashT.delete("nam");
    hashT.delete("tempor");
    hashT.delete("x");
    console.log(hashT.table[hashT.hash("nunc")].toArray());
    console.log("------------------------------------------------");

    //produce histogram based off this one
    console.log(collisions);
  }

  //testLinkedList();
  //testHashTable();
});
