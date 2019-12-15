/**

The area of a circle is defined as πr^2. Estimate π to 3 decimal places using a Monte Carlo method.

Hint: The basic equation of a circle is x2 + y2 = r2.

*/

function calculatePi(r) {
  let p = Math.floor(r*Math.pow(0.5, 0.5));

  let area = p*p,
    rSquared = r*r;

  for (let x = 0; x <= p; x++) {
    for (let y = p; y <= r; y++) {
      if (x*x + y*y <= rSquared) area += 2;
    }
  }

  return 4*area/rSquared;
}

console.log(`my slow method: ${calculatePi(10000)}`);


/**
  With the monte carlo method
*/

function calculatePiMonteCarlo(numPoints) {
  let count = 0;
  let x, y;

  for (var i = 0; i < numPoints; i++) {
    x = Math.random();
    y = Math.random();

    if (x*x + y*y <= 1) count++;
  }

  return 4*count/numPoints;
}

console.log(`monte carlo: ${calculatePiMonteCarlo(100000000)}`);