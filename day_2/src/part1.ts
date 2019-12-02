import fs from 'fs';

function parseInput(input: string): number[] {
  return input
    .trim()
    .split(',')
    .map((it) => parseInt(it, 10));
}

function processIntCode(intcode: number[]): number[] {
  const copy = [...intcode];

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
      console.log('HALT!');
      isProcessing = false;
    }
  }
  return copy;
}

async function start() {
  const input: string = await fs.promises.readFile('./input/part1.txt', { encoding: 'utf8' });
  const intcode = parseInput(input);
  const [noun, verb] = [12, 2];
  intcode[1] = noun;
  intcode[2] = verb;
  const resultIntocde = processIntCode(intcode);
  console.log(`Position 0 is ${resultIntocde[0]}`);
}

start();
