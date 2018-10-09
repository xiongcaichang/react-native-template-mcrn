const computedNum = (num, bits, forced) => {
  if (!forced && (num % 1 === 0 || num.toString().split('.')[1].length === 1)) {
    return num;
  } else {
    return num.toFixed(bits);
  }
};

export const handleFloat = (num, bits = 2, forced = false) => {
  if (isNaN(num - 0)) {
    return 0;
  }
  num = num - 0;

  if (num < 100000) {
    return computedNum(num, bits, forced);
  } else {
    return computedNum(num / 10000, bits, forced) + 'w';
  }
};
