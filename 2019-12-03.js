/**

Given two singly linked lists that intersect at some point, find the intersecting node. The lists are non-cyclical.

For example, given A = 3 -> 7 -> 8 -> 10 and B = 99 -> 1 -> 8 -> 10, return the node with value 8.

In this example, assume nodes with the same value are the exact same node objects.

Do this in O(M + N) time (where M and N are the lengths of the lists) and constant space.

*/

function Node(key, next=null) {
  this.key = key;
  this.next = next;
}

function getLength(node) {
  let count = 0;

  while (node !== null) {
    count++;
    node = node.next;
  }

  return count;
}

function findIntersect(rootA, rootB) {
  const lenA = getLength(rootA);
  const lenB = getLength(rootB);
  let longer = (lenA >= lenB) ? rootA : rootB;
  let shorter = (lenA >= lenB) ? rootB : rootA;

  for (let i = 0; i < Math.abs(lenA - lenB); i++) {
    longer = longer.next;
  }

  while (longer !== null) {
    if (longer.key === shorter.key) {
      return longer;
    }

    longer = longer.next;
    shorter = shorter.next;
  }

  return null;
}


let A = new Node(3, new Node(7, new Node(5, new Node(2, new Node(8, new Node(10))))));
let B = new Node(99, new Node(1, new Node(8, new Node(10))));

console.log(findIntersect(A, B));