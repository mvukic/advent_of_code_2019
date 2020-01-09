import fs from 'fs';
import { IntCodeVM } from './vm/intcode.vm';

function readFile(path: string): Promise<string> {
  return fs.promises.readFile(path, { encoding: 'utf8' });
}

function parseInput(input: string): number[] {
  return input
    .trim()
    .split(',')
    .map((it) => parseInt(it, 10));
}

async function processIntCode(program: number[]) {
  const vm = new IntCodeVM(program);
  await vm.run();
}

async function start() {
  const input = await readFile('./input/part1.txt');
  const intcode = parseInput(input);
  try {
    await processIntCode(intcode);
    // console.log(memory);
  } catch (error) {
    console.log(error);
  }
}

start();
