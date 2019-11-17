/**
Question:
Good morning! Here's your coding interview problem for today.

This problem was asked by Uber.

Given an array of integers, return a new array such that each element at index i of the new array is the product of all the numbers in the original array except the one at i.

For example, if our input was [1, 2, 3, 4, 5], the expected output would be [120, 60, 40, 30, 24]. If our input was [3, 2, 1], the expected output would be [2, 3, 6].

Follow-up: what if you can't use division?
*/

/**
Algorithm:

- Get the product of the entire array.
- For each position, set it equal to entire array product / position's value.

Follow-up:
- Do this with bit shifts?
- Dynamic programming...?
*/


function main(arr) {
  let total = arr.reduce((acc, v) => (v * acc), 1);

  return arr.map((v) => (total/v));
}

console.log(main([1,2,3,4,5]));