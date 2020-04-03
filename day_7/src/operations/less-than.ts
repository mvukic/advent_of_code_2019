import { Memory } from '../memory';
import { Opcode, OpcodeMode } from '../opcode';
import { CPU } from '../cpu';

export function lessThan(memory: Memory, cpu: CPU, opcode: Opcode) {
  const firstPointer = memory.read(cpu.pc + 1);
  const secondPointer = memory.read(cpu.pc + 2);
  const resultPointer = memory.read(cpu.pc + 3);

  const firstValue = opcode.modes.first === OpcodeMode.POSITIONAL ? memory.read(firstPointer) : firstPointer;
  const secondValue = opcode.modes.second === OpcodeMode.POSITIONAL ? memory.read(secondPointer) : secondPointer;

  if (firstValue < secondValue) {
    memory.write(resultPointer, 1);
  } else {
    memory.write(resultPointer, 0);
  }

  cpu.increasePC(4);

  memory.updateOpcodeCounter(opcode.type);
}
