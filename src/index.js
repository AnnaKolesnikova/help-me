function count(s, pairs) {
  const prod = pairs.reduce((mul, [p]) => p * mul, 1);
  if (prod > 100000000) {
    return 0;
  }
  const arr = Array(prod).fill('1');
  pairs.forEach(([p]) => {
    const d = prod / p;
    for (let i = 0; i < d; i++) {
      arr[i * p] = '0';
    }
  });
  const M = pairs.reduce((mul, [p1, p2]) => mul * power(p1, p2 - 1, 1000000007), 1);
  return (countMasks(arr, s) * M) % 1000000007;
}

function countMasks(arr, mask) {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    if (checkMask(arr, mask, i)) {
      count += 1;
    }
  }
  return count;
}

function checkMask(arr, mask, pos) {
  for (let i = 0; i < mask.length; i++) {
    if (arr[(i + pos) % arr.length] !== mask[i]) {
      return false;
    }
  }
  return true;
}

function power(base, exp, mod) {
  let pow = 1;
  if (exp === 0) {
    return 1;
  }
  if (exp === 1) {
    return base % mod;
  }
  if (exp % 2 === 0) {
    const half = power(base, exp / 2, mod);
    return (half * half) % mod;
  }
  return (base * power(base, exp - 1, mod)) % mod;
}

module.exports = count;
