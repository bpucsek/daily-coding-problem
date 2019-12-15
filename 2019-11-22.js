/**

Given a list of integers, write a function that returns the largest sum of non-adjacent numbers. Numbers can be 0 or negative.

For example, [2, 4, 6, 2, 5] should return 13, since we pick 2, 6, and 5. [5, 1, 1, 5] should return 10, since we pick 5 and 5.

Follow-up: Can you do this in O(N) time and constant space?

Brute Force solution:
- Add up each possible permutation. O(n^2) time, O(1) space.
2: 10, 01
3: 101, 010
4: 1010, 0101, 1001
5: 10101, 10010, 01001, 01010

12345
1 + 345
    3 + 5
    4
  = 9
2 + 45
    4
    5
  = 7

This runs in O(2^n) since for each call we make 2 recursive calls.

Then we could memoize to make it O(n) time and O(n) space.

*/

// Runs in O(2^n). Could memoize to run in O(n) with O(n) space.
function findMaxSlow(map, arr) {
  if (arr.length === 0) return 0;
  if (arr.length === 1) return arr[0];

  return Math.max(arr[0] + findMax(map, arr.slice(2)), findMax(map, arr.slice(1)));
}

// Runs in O(n) but uses O(n) space.
function findMaxBetter(arr) {
  let map = new Map();

  for (let i = arr.length - 1; i >= 0; i--) {
    if (i === arr.length - 1) {
      map.set(i, arr[i]);
    } else if (i === arr.length - 2) {
      map.set(i, Math.max(arr[i], map.get(i + 1)));
    } else {
      map.set(i, Math.max(map.get(i + 1), arr[i] + map.get(i + 2)))
    }
  }

  return map.get(0);
}

function findMaxBest(arr) {
  let curr, prev, temp;

  for (let i = arr.length - 1; i >= 0; i--) {
    if (i === arr.length - 1) {
      curr = arr[i];
      prev = arr[i];
    } else if (i === arr.length - 2) {
      curr = Math.max(arr[i], curr);
    } else {
      temp = curr;
      curr = Math.max(curr, arr[i] + prev);
      prev = temp;
    }
  }

  return curr;
}

[
  [1, 2, 3, 4, 5],
  [2, 4, 6, 2, 5],
  [5, 1, 1, 5]
].map((arr) => {
  console.log(`arr:${arr} max:${findMaxBest(arr)}`);
});