import fs from 'fs';
import { operations } from './operations';
import { Memory, getMemoryValue, initMemory } from './memory';
import { OpcodeType, parseOpcode } from './opcode';

function readFile(path: string): Promise<string> {
  return fs.promises.readFile(path, { encoding: 'utf8' });
}

function parseInput(input: string): number[] {
  return input
    .trim()
    .split(',')
    .map((it) => parseInt(it, 10));
}

async function processIntCode(program: number[]): Promise<Memory> {
  return new Promise(async (resolve, reject) => {
    const memory = initMemory(program);
    while (true) {
      const opcode = parseOpcode(getMemoryValue(memory));
      if (opcode.type === OpcodeType.ADD) {
        operations.add(memory, opcode);
      } else if (opcode.type === OpcodeType.MULTIPLY) {
        operations.multiply(memory, opcode);
      } else if (opcode.type === OpcodeType.READ) {
        await operations.read(memory, opcode);
      } else if (opcode.type === OpcodeType.WRITE) {
        operations.write(memory, opcode);
      } else if (opcode.type === OpcodeType.EQUALS) {
        operations.equals(memory, opcode);
      } else if (opcode.type === OpcodeType.JUMP_IF_FALSE) {
        operations.jumpIfFalse(memory, opcode);
      } else if (opcode.type === OpcodeType.JUMP_IF_TRUE) {
        operations.jumpIfTrue(memory, opcode);
      } else if (opcode.type === OpcodeType.LESS_THAN) {
        operations.lessThan(memory, opcode);
      } else if (opcode.type === OpcodeType.HALT) {
        // console.log('HALT!');
        break;
      } else {
        reject('unknown opcode');
      }
    }
    resolve(memory);
  });
}

async function start() {
  const input = await readFile('./input/part1.txt');
  const intcode = parseInput(input);
  try {
    const memory = await processIntCode(intcode);
    // console.log(memory);
  } catch (error) {
    console.log(error);
  }
}

start();
