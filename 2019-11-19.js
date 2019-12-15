/**

An XOR linked list is a more memory efficient doubly linked list. Instead of each node holding next and prev fields, it holds a field named both, which is an XOR of the next node and the previous node. Implement an XOR linked list; it has an add(element) which adds the element to the end, and a get(index) which returns the node at index.

If using a language that has no pointers (such as Python), you can assume you have access to get_pointer and dereference_pointer functions that converts between nodes and memory addresses.

*/

function node(val) {
  this.addr = Math.floor(Math.random()*1000000);
  this.val = val;
  this.both = 0;
}

function xor_list() {
  this.head = null;
  this.last = null;
  this.nodes = new Map();

  this.add = function(node) {
    if (this.head === null) {
      this.head = node;
      this.last = node;
    } else {
      this.last.both = node.addr ^ this.last.both;
      node.both = this.last.addr;
      this.last = node;
    }

    this.nodes.set(node.addr, node);
  };

  this.get_pointer = function(node) {
    return node.addr;
  }

  this.dereference_pointer = function(addr) {
    if (!addr) {
      throw new Error('invalid index')
    }

    return this.nodes.get(addr);
  }

  this.get = function(index) {
    let node = this.head;

    let prev_id = 0;
    let next_id;

    for (var i = 0; i < index; i++) {
      next_id = prev_id ^ node.both;
      prev_id = this.get_pointer(node);

      node = this.dereference_pointer(next_id);
    }

    return node;
  }
}

let lst = new xor_list();

lst.add(new node(10));
lst.add(new node(11));
lst.add(new node(12));
lst.add(new node(13));

console.log(lst.get(2));