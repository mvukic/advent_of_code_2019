import fs from 'fs';
import { IntCodeVM, IntCodeVMConfig } from './vm/intcode.vm';
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

async function processIntCode(program: number[], config?: Partial<IntCodeVMConfig>): Promise<IntCodeVMSnapshot> {
  const vm = new IntCodeVM(program, config);
  return await vm.run();
}

async function start() {
  const input = await readFile('./input/part1.txt');
  const intcode = parseInput(input);
  try {
    const result = await processIntCode(intcode, {});
  } catch (error) {
    console.log('Error:');
    console.log(error);
  }
}

start();
