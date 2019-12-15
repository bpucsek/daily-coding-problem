/**

Given an integer k and a string s, find the length of the longest substring that contains at most k distinct characters.

For example, given s = "abcba" and k = 2, the longest substring with k distinct characters is "bcb".

Approach 1:
- Loop through the entire string starting at index i and look forward until k + 1 distinct characters have been found.
- O(n^2) time, O(1) space (keep track of max).

Approach 2:
  - Keep track of letters and their LAST occurrence in a dictionary
  - Fill the dictionary by looking at letters
  - When the dictionary overflows then find the letter with the lowest last occurrence and remove it.
  - Recalculate bounds

*/

function findMinChar(map) {
  let minIndex = Infinity;
  let minChar;

  map.forEach((v, k) => {
    if (v < minIndex) {
      minIndex = v;
      minChar = k;
    }
  });

  return minChar;
}

function longestSubstring(s, k) {
  let map = new Map();
  let bounds = [0, 0];
  let maxSubstringLength = 0;
  let minChar;

  for (var i = 0; i < s.length; i++) {
    map.set(s[i], i);

    if (map.size > k) {
      minChar = findMinChar(map);

      bounds[0] = map.get(minChar) + 1; // Exclude that character
      map.delete(minChar);
    }

    bounds[1] = i + 1; // Include the current character

    maxSubstringLength = Math.max(maxSubstringLength, bounds[1] - bounds[0]);
  }

  return maxSubstringLength;
}

[
  // ['', 0],
  // ['a', 1],
  // ['abcba', 2],
  ['abefefefefecd', 4]
].map(([s, k]) => {
  console.log(longestSubstring(s, k));
});
