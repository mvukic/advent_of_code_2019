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

async function processIntCode(program: number[], config: Partial<IntCodeVMConfig>): Promise<IntCodeVMSnapshot> {
  const vm = new IntCodeVM(program, config);
  return await vm.run();
}

async function start() {
  const input = await readFile('./input/part1.txt');
  const intcode = parseInput(input);
  const phases = [1, 0, 4, 3, 2];
  let previousOutput = 0;
  try {
    for (const phase of phases) {
      console.log(`Phase ${phase}`);
      console.log(`\tPrevious output: ${previousOutput}`);
      const result = await processIntCode(intcode, {automated: true, inputs: [phase, previousOutput]});
      previousOutput = result.memory.outputValues[0];
      console.log(`\tNew output ${previousOutput}`);
    }
  } catch (error) {
    console.log('Error:');
    console.log(error);
  }
}

start();
