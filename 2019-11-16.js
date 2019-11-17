/**

Given the root to a binary tree, implement serialize(root), which serializes the tree into a string, and deserialize(s), which deserializes the string back into the tree.

*/

function Node(val, left=null, right=null) {
  this.val = val;
  this.left = left;
  this.right = right;
};

function serialize(node) {
  let queue = [node];
  let serializedNodes = [];
  let nullsBeforeEnd = 0;

  while (queue.length) {
    let curr = queue.shift();

    if (curr === null) {
      serializedNodes.push('null');
      nullsBeforeEnd++;
    } else {
      serializedNodes.push(encodeURI(curr.val));
      nullsBeforeEnd = 0;

      queue.push(curr.left);
      queue.push(curr.right);
    }
  }

  return serializedNodes.slice(0, -nullsBeforeEnd).join(',');
}

function deserializeHelper(vals, i) {
  if (i >= vals.length || vals[i] === 'null') {
    return null;
  }

  return new Node(
    vals[i],
    deserializeHelper(vals, 2*i + 1),
    deserializeHelper(vals, 2*i + 2)
  );
}

function deserialize(s) {
  let vals = s.split(',');

  return deserializeHelper(vals, 0);
}

let node = new Node('root', new Node('left', new Node('left.left')), new Node('right'));