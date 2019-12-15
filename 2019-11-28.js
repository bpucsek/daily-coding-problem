/**

Given a stream of elements too large to store in memory, pick a random element from the stream with uniform probability.


*/

function findRandomItem(len) {
  let val;

  for (var i = 0; i < len; i++) {
    if (Math.random() < 1/(i + 1)) val = i;
  }

  return val;
}