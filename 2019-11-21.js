/**

A unival tree (which stands for "universal value") is a tree where all nodes under it have the same value.

Given the root to a binary tree, count the number of unival subtrees.

For example, the following tree has 5 unival subtrees:

   0
  / \
 1   0
    / \
   1   0
  / \
 1   1

- DFS traversal with postfix analysis
- each child returns to parent reporting # of univals beneath and including it + value of the child node if itself is a unival subtree.

*/


function Node(val, left=null, right=null) {
  this.val = val;
  this.left = left;
  this.right = right;
}

function countUnivalSubtreesHelper(node) {
  let left, right;

  if (!(node.left || node.right)) {
    return { val: node.val, count: 1, unival: true };;
  }

  let unival = true;
  let count = 0;

  if (node.left) {
    left = countUnivalSubtreesHelper(node.left);
    console.log('left: ', left);

    unival = left.unival && left.val === node.val;
  }

  if (node.right) {
    right = countUnivalSubtreesHelper(node.right);
    console.log('right: ', right);

    unival = unival && right.unival && right.val === node.val;
  }

  return {
    val: node.val,
    count: left.count + right.count + ((unival) ? 1 : 0),
    unival
  };
}

function countUnivalSubtrees(node) {
  return countUnivalSubtreesHelper(node).count;
}

let root = new Node(0, new Node(1), new Node(0, new Node(1, new Node(1), new Node(1)), new Node(0)));

console.log(countUnivalSubtrees(root));