/**

Given the root to a binary tree, implement serialize(root), which serializes the tree into a string, and deserialize(s), which deserializes the string back into the tree.

*/

function Node(val, left=null, right=null) {
  this.val = val;
  this.left = left;
  this.right = right;
};

function serialize(node) {
  if (node === null) {
    return '#';
  }

  return `${node.val} ${serialize(node.left)} ${serialize(node.right)}`;
}

function deserializeImpl(iter) {
  let next = iter.next();

  if (next.value === '#' || next.done) return null;

  return new Node(
    next.value,
    deserializeImpl(iter),
    deserializeImpl(iter)
  );
}

function deserialize(s) {
  if (s.length === 0) {
    return null;
  }

  return deserializeImpl(s.split(' ')[Symbol.iterator]());
}

[
  null,
  new Node('root'),
  new Node('1', null, new Node('2', null, new Node('3', null, new Node('4', null, null)))),
  new Node('root', new Node('left', new Node('left.left', null), null), new Node('right', null, null))
].forEach((node) => {
  console.log(JSON.stringify(deserialize(serialize(node)), 2, 2))
});


