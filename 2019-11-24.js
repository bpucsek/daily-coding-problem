/**

Implement an autocomplete system. That is, given a query string s and a set of all possible query strings, return all strings in the set that have s as a prefix.

For example, given the query string de and the set of strings [dog, deer, deal], return [deer, deal].

Hint: Try preprocessing the dictionary into a more efficient data structure to speed up queries.

*/

function Node(isCompleteWord) {
  this.children = new Map();
  this.isCompleteWord = isCompleteWord;
}

function Trie() {
  this.root = new Node();

  this.addWord = function(word) {
    let node = this.root;

    for (var i = 0; i < word.length; i++) {
      if (!node.children.has(word[i])) {
        node.children.set(word[i], new Node(i === word.length - 1));
      }

      node = node.children.get(word[i]);
    }
  }

  this.findHelper = function(node, chars, words) {
    if (node.isCompleteWord) {
      words.push(chars);
    }

    node.children.forEach((v, k) => {
      this.findHelper(node.children.get(k), `${chars}${k}`, words);
    });
  }

  this.find = function(chars) {
    let node = this.root;
    let words = [];

    for (var i = 0; i < chars.length; i++) {
      if (!node.children.has(chars[i])) return words;

      node = node.children.get(chars[i]);
    }

    this.findHelper(node, chars, words);

    return words;
  }
}

let trie = new Trie();

trie.addWord('dog');
trie.addWord('deer');
trie.addWord('deal');
trie.addWord('defrost');

console.log('words: ', trie.find('de'));
