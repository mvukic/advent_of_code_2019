import fs from 'fs';
import { IntCodeVM } from './vm/intcode.vm';
import { IntCodeVMSnapshot } from './vm/vm.shapshot';

function readFile(path: string): Promise<string> {
  return fs.promises.readFile(path, { encoding: 'utf8' });
}

function parseInput(input: string): number[] {
  return input
    .trim()
    .split(',')
    .map((it) => parseInt(it, 10));
}

async function processIntCode(program: number[]): Promise<IntCodeVMSnapshot> {
  const vm = new IntCodeVM(program);
  return await vm.run();
}

async function start() {
  const input = await readFile('./input/part1.txt');
  const intcode = parseInput(input);
  try {
    const result = await processIntCode(intcode);
    // console.log(result);
  } catch (error) {
    console.log(error);
  }
}

start();
