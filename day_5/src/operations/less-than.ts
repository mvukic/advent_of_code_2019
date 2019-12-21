import { increaseMemoryIndex, Memory } from '../memory';
import { Opcode, OpcodeMode } from '../opcode';

export function lessThan(memory: Memory, opcode: Opcode) {
  const program = memory.program;
  const index = memory.index;

  const firstPointer = program[index + 1];
  const secondPointer = program[index + 2];
  const resultPointer = program[index + 3];

  const firstValue = opcode.modes.first === OpcodeMode.POSITIONAL ? program[firstPointer] : firstPointer;
  const secondValue = opcode.modes.second === OpcodeMode.POSITIONAL ? program[secondPointer] : secondPointer;
  const resultValue = opcode.modes.third === OpcodeMode.POSITIONAL ? program[resultPointer] : resultPointer;

  if (firstValue < secondValue) {
    memory.program[resultValue] = 1;
  } else {
    memory.program[resultValue] = 0;
  }

  increaseMemoryIndex(memory, 4);
}
