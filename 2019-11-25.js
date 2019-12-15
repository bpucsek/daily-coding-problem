/**

There exists a staircase with N steps, and you can climb up either 1 or 2 steps at a time. Given N, write a function that returns the number of unique ways you can climb the staircase. The order of the steps matters.

For example, if N is 4, then there are 5 unique ways:

1, 1, 1, 1
2, 1, 1
1, 2, 1
1, 1, 2
2, 2

1: 1
2: 11, 2
3: 111, 12, 21
4: 1111, 112, 121, 211, 22
...

            4
         /     \
        2       3
       / \     / \
      0   1   1   2
                 / \
                0   1

Base cases:
0 left: 1
1 left: 1

Approach 1:
- Recursively move through the steps. On one branch take 2 steps and on the other branch take 1 step.
  - Add the results of subproblems
  - Memoize to make more quick.
  - O(n) space, O(?) time

Approach 2:
- Start with 0 and 1 as base cases.
- Iterate from 1 - N.
- Most efficient way to climb a step is the same as the sum of the most efficient way to climb 1 less step + 2 less steps.
- O(n) time, O(1) space.
*/

function countWays(n) {
  if (n === 0) return 1;
  if (n === 1) return 1;

  let twoLess = 1;
  let oneLess = 1;
  let temp;

  for (var i = 2; i < n; i++) {
    let temp = twoLess;
    twoLess = oneLess;
    oneLess = twoLess + temp;
  }

  return twoLess + oneLess;
}


/**

What if, instead of being able to climb 1 or 2 steps at a time, you could climb any number from a set of positive integers X? For example, if X = {1, 3, 5}, you could climb 1, 3, or 5 steps at a time.

Troubles here:
- May not be able to climb the steps if steps aren't divisible by factors
- 

*/

function countWaysFollowup(n, allowedSteps) {
  console.log(n, allowedSteps);
  let count = 0;
  let cache = [1];

  for (let i = 1; i <= n; i++) {
    allowedSteps.forEach((numSteps) => {
      if (i >= numSteps) count += (cache[i - numSteps] || 0);
    });

    cache.push(count);
    count = 0;
  }

  return cache[cache.length - 1];
}

[
/*  [1, [1, 3, 5]],
  [2, [1, 3, 5]],
  [3, [1, 3, 5]],
  [4, [1, 3, 5]],*/
  [5, [1, 3, 5]]
].map(([n, allowedSteps]) => {
  console.log(`n:${n} count:${countWaysFollowup(n, allowedSteps)}`);
});