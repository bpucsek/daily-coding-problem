/**
Question:
Given an array of integers, find the first missing positive integer in linear time and constant space. In other words, find the lowest positive integer that does not exist in the array. The array can contain duplicates and negative numbers as well.

For example, the input [3, 4, -1, 1] should give 2. The input [1, 2, 0] should give 3.

You can modify the input array in-place.
*/

/**
Algorithm:

for each element in the array
  check to see if the value is slotted into it's position. IE. position 0 should be 0, pos 1 should be 1, etc.

  if it's not then we haven't found that number yet and set to null.

  some number was there though - was it below 0? higher than the array is in length? if so, it's not relevant and don't do anything further with that number, just chuck it out.

  if the number in the i-th position is > 0 and < arr.length then it's valuable to us. so let's swap it into its correct position.
    repeat
      this
        until
          you
            hit the base case

  once this has run you'll end up with a sparse but sorted array. you can then loop over it one more time to see which is the first number > 0 that is not in its position and return that as your value.


  Worries:
    - I am allocating a tmp variable each call of swap. Does this count as O(1) space still?
    - I don't really see how you do this without sorting the list since we aren't allowed to use extra space. My algorithm can't possibly be O(n) given that it is somewhat sorting the list.
*/


function swap(arr, val, replacement) {
  if (val === null || val < 0 || val >= arr.length) return;

  let tmp = arr[val];

  arr[val] = replacement;
  swap(arr, tmp, tmp);
}

function main(arr) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === i) continue;

    swap(arr, i, null);
  }

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] !== i) return i;
  }

  return arr.length;
}


console.log(main([3, 4, -1, 1]));
console.log(main([1, 2, 0]));
console.log(main([6,3,4,2,1,5]));