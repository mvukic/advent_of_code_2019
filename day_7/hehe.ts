function f(phase: number, x: number) {
  if (phase === 0) {
    return 4 + x;
  }
  if (phase === 1) {
    return Number.parseInt(`${10 + x * 2}2`, 10);
  }
  if (phase === 2) {
    return 54 + 8 * x;
  }
  if (phase === 3) {
    return 6 * (3 * x);
  }
  if (phase === 4) {
    return 11 + 4 * x;
  }
}

function main() {
  const permutations = permute([0, 1, 2, 3, 4]);
  permutations.forEach(p =)

}

function permute(permutation: number[]): number[][] {
  const length = permutation.length;
  const result = [permutation.slice()];
  const c = new Array(length).fill(0);
  let i = 1;
  let k;
  let p;

  while (i < length) {
    if (c[i] < i) {
      k = i % 2 && c[i];
      p = permutation[i];
      permutation[i] = permutation[k];
      permutation[k] = p;
      ++c[i];
      i = 1;
      result.push(permutation.slice());
    } else {
      c[i] = 0;
      ++i;
    }
  }
  return result;
}
