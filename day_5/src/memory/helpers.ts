import { Memory } from './memory';

export function increaseMemoryIndex(memory: Memory, by: number) {
  memory.index += by;
}

export function setMemoryIndex(memory: Memory, value: number) {
  memory.index = value;
}

export function decreaseMemoryIndex(memory: Memory, by: number) {
  memory.index -= by;
}

export function getMemoryValue(memory: Memory, index: number = memory.index): number {
  return memory.program[index];
}

export function initMemory(program: number[]): Memory {
  return {
    index: 0,
    program: [...program]
  };
}
