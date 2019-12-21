import fs from 'fs';
import { operations } from './operations';
import { Memory, getMemoryValue } from './memory';
import { Opcode } from './opcode';

function parseInput(input: string): number[] {
  return input
    .trim()
    .split(',')
    .map((it) => parseInt(it, 10));
}

function processIntCode(program: number[]): Memory {
  const memory: Memory = {
    index: 0,
    program: [...program]
  };

  while (true) {
    const value = getMemoryValue(memory);
    if (value === Opcode.ADD) {
      operations.add(memory);
    } else if (value === Opcode.MULTIPLY) {
      operations.multiply(memory);
    } else if (value === Opcode.HALT) {
      console.log('HALT!');
      break;
    }
  }
  return memory;
}

async function start() {
  const input: string = await fs.promises.readFile('./input/part1.txt', { encoding: 'utf8' });
  const intcode = parseInput(input);
  const [noun, verb] = [12, 2];
  intcode[1] = noun;
  intcode[2] = verb;
  const memory = processIntCode(intcode);
  console.log(`Position 0 is ${getMemoryValue(memory, 0)}`);
}

start();
