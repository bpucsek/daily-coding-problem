function countEncodings(s) {
  let map = new Map([[ s.length, 1 ]]);

  for (let i = s.length - 1; i >= 0; i--) {
    if (parseInt(s[i]) === 0) {
      map.set(i, 0);
    } else if (i === s.length - 1) {
      map.set(i, 1);
    } else {
      if (parseInt(s.slice(i, i + 2)) <= 26) {
        map.set(i, map.get(i + 2))
      }
      map.set(i, (map.get(i) || 0) + map.get(i + 1));
    }
  }

  return map.get(0);
}

[
  '',
  '1',
  '0',
  '21',
  '1213',
  '12344',
  '12344134123245346342134254363452453'
].map((str) => {
  console.log(`${str.padStart(8, '_')}: ${countEncodings(str)}`);
});