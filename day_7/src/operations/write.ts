import { Memory, increaseMemoryIndex, getMemoryValue } from '../memory';
import { Opcode, OpcodeMode } from '../opcode';

export function write(memory: Memory, opcode: Opcode) {

  const program = memory.program;
  const index = memory.index;

  const firstPointer = program[index + 1];

  const value = opcode.modes.first === OpcodeMode.POSITIONAL ? program[firstPointer] : firstPointer;

  console.log(value);

  increaseMemoryIndex(memory, 2);
}
