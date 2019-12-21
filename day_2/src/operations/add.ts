import { Memory, increaseIndex } from '../memory';

export function add(memory: Memory) {
  const program = memory.program;
  const index = memory.index;

  const firstPointer = program[index + 1];
  const secondPointer = program[index + 2];
  const resultPointer = program[index + 3];

  const firstValue = program[firstPointer];
  const secondValue = program[secondPointer];

  const result = firstValue + secondValue;

  memory.program[resultPointer] = result;
  increaseIndex(memory, 4);
}
