import { Memory, setMemoryIndex, increaseMemoryIndex } from '../memory';
import { Opcode, OpcodeMode } from '../opcode';

export function equals(memory: Memory, opcode: Opcode) {
  const program = memory.program;
  const index = memory.index;

  const firstPointer = program[index + 1];
  const secondPointer = program[index + 2];
  const resultPointer = program[index + 3];

  const firstValue = opcode.modes.first === OpcodeMode.POSITIONAL ? program[firstPointer] : firstPointer;
  const secondValue = opcode.modes.second === OpcodeMode.POSITIONAL ? program[secondPointer] : secondPointer;
  const thirdValue = opcode.modes.third === OpcodeMode.POSITIONAL ? program[resultPointer] : resultPointer;

  if (firstValue === secondValue) {
    memory.program[thirdValue] = 1;
  } else {
    memory.program[thirdValue] = 0;
  }

  increaseMemoryIndex(memory, 4);
}
