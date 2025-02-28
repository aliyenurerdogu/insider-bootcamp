const longestCollatzSequence = (limit) => {
  let maxLength = 0;
  let maxNumber = 0;
  const cache = {};

  const collatzSequenceLength = (n) => {
    if (cache[n]) {
      return cache[n];
    }

    if (n === 1) {
      return 1;
    }

    let length;
    if (n % 2 === 0) {
      length = 1 + collatzSequenceLength(n / 2);
    } else {
      length = 1 + collatzSequenceLength(3 * n + 1);
    }

    cache[n] = length;
    return length;
  }

  for (let i = 1; i <= limit; i++) {
    const length = collatzSequenceLength(i);
    if (length > maxLength) {
      maxLength = length;
      maxNumber = i;
    }
  }

  return maxNumber;
}

console.log(`longest Collatz sequence number under 1,000,000 is: ${longestCollatzSequence(1000000)}`);