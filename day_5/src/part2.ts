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
  const phases = [0, 1, 2, 3, 4];
  const phasePermutations = permute(phases);
  const outputs: Array<{phases: number[], value: number}> = [];
  let m: {phases: number[], value: number} = {phases: [], value: 0};
  try {
    for (const permutation of phasePermutations) {
      let output = 0;
      for (const phase of permutation) {
        const result = await processIntCode(intcode, {automated: true, inputs: [phase, output]});
        output = result.memory.outputValues[0];
      }
      if (output > m.value) {
        m = {phases: permutation, value: output};
      }
      outputs.push({phases: permutation, value: output});
    }
    console.log(m);
  } catch (error) {
    console.log('Error:');
    console.log(error);
  }
}

start();

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