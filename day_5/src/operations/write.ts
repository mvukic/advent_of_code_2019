import { Memory, increaseMemoryIndex, getMemoryValue } from '../memory';
import { Opcode } from '../opcode';

export function write(memory: Memory, opcode: Opcode) {

  const program = memory.program;
  const index = memory.index;

  const firstPointer = program[index + 1];
  console.log(getMemoryValue(memory, firstPointer));

  increaseMemoryIndex(memory, 2);
}
