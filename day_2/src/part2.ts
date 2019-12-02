import fs from 'fs';

function parseInput(input: string): number[] {
  return input
    .trim()
    .split(',')
    .map((it) => parseInt(it, 10));
}

function processIntCode(intcode: number[], noun: number, verb: number): number[] {
  const copy = [...intcode];
  copy[1] = noun;
  copy[2] = verb;

  let index = 0;
  let isProcessing = true;
  while (isProcessing) {
    const value = copy[index];
    if (value === 1) {
      // handle addition
      const firstValue = copy[copy[index + 1]];
      const secondValue = copy[copy[index + 2]];
      const result = firstValue + secondValue;
      copy[copy[index + 3]] = result;
      index += 4;
    } else if (value === 2) {
      // handle multiplication
      const firstValue = copy[copy[index + 1]];
      const secondValue = copy[copy[index + 2]];
      const result = firstValue * secondValue;
      copy[copy[index + 3]] = result;
      index += 4;
    } else if (value === 99) {
      // handle halt
      isProcessing = false;
    }
  }
  return copy;
}

async function start() {
  const input: string = await fs.promises.readFile('./input/part1.txt', { encoding: 'utf8' });
  const intcode = parseInput(input);
  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      const resultIntocde = processIntCode(intcode, i, j);
      if (resultIntocde[0] === 19690720) {
        console.log(`100 * noun + verb = ${100 * i + j}`);
        return;
      }
    }
  }
}

start();
