import { Memory } from '../memory';
import { Opcode, OpcodeMode } from '../opcode';
import { CPU } from '../cpu';

export function jumpIfFalse(memory: Memory, cpu: CPU, opcode: Opcode) {
  const firstPointer = memory.read(cpu.pc + 1);
  const secondPointer = memory.read(cpu.pc + 2);

  const firstValue = opcode.modes.first === OpcodeMode.POSITIONAL ? memory.read(firstPointer) : firstPointer;
  const secondValue = opcode.modes.second === OpcodeMode.POSITIONAL ? memory.read(secondPointer) : secondPointer;

  if (firstValue === 0) {
    cpu.setPC(secondValue);
  } else {
    cpu.increasePC(3);
  }

  memory.updateOpcodeCounter(opcode.type);
}
