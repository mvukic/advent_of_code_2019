import { Memory } from '../memory';
import { Opcode, OpcodeMode } from '../opcode';
import { CPU } from '../cpu';

export function write(memory: Memory, cpu: CPU, opcode: Opcode) {

  const firstPointer = memory.read(cpu.pc + 1);

  const firstValue = opcode.modes.first === OpcodeMode.POSITIONAL ? memory.read(firstPointer) : firstPointer;

  console.log(firstValue);

  cpu.increasePC(2);

  memory.updateOpcodeCounter(opcode.type);
}
