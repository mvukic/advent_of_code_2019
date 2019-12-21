import { Memory } from './memory';

export function increaseIndex(memory: Memory, by: number) {
  memory.index += by;
}

export function getMemoryValue(memory: Memory, index: number = memory.index): number {
  return memory.program[index];
}
