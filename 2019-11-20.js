/**

Given the mapping a = 1, b = 2, ... z = 26, and an encoded message, count the number of ways it can be decoded.

For example, the message '111' would give 3, since it could be decoded as 'aaa', 'ka', and 'ak'.

You can assume that the messages are decodable. For example, '001' is not allowed.

*/

function countEncodingsHelper(map, str) {
  // console.log('countEncodingsHelper: ', str.padStart(4, '_'));

  if (parseInt(str[0]) === 0) return 0;
  if (str.length <= 1) return 1;
  if (map.has(str)) return map.get(str);

  let total = countEncodingsHelper(map, str.slice(1));

  if (parseInt(str.slice(0, 2)) <= 26) {
    total += countEncodingsHelper(map, str.slice(2));
  }

  map.set(str, total);

  return total;
}

function countEncodings(str) {
  let map = new Map();

  let total = countEncodingsHelper(map, str);

  // console.log(map);
  return total;
}

[
  '',
  '1',
  '0',
  '21',
  '1213',
  '12344134123245346342134254363452453'
].map((str) => {
  // console.log('-----------------------------------');
  console.log(`${str.padStart(8, '_')}: ${countEncodings(str)}`);
});