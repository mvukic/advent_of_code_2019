import { Memory, setMemoryIndex, increaseMemoryIndex } from '../memory';
import { Opcode, OpcodeMode } from '../opcode';

export function jumpIfTrue(memory: Memory, opcode: Opcode) {
  const program = memory.program;
  const index = memory.index;

  const firstPointer = program[index + 1];
  const secondPointer = program[index + 2];

  const firstValue = opcode.modes.first === OpcodeMode.POSITIONAL ? program[firstPointer] : firstPointer;
  const secondValue = opcode.modes.second === OpcodeMode.POSITIONAL ? program[secondPointer] : secondPointer;

  if (firstValue !== 0) {
    setMemoryIndex(memory, secondValue);
  } else {
    increaseMemoryIndex(memory, 3);
  }

}
