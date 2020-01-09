import { Memory } from '../memory';
import { Opcode } from '../opcode';
import { CPU } from '../cpu';
import readline from 'readline';

export async function read(memory: Memory, cpu: CPU, opcode: Opcode): Promise<void> {
  const rl = readline.createInterface({ input: process.stdin });

  return new Promise((resolve) => {
    console.log('Enter a single digit value:');
    rl.question('', (answer) => {
      const value = Number.parseInt(answer, 10);

      const resultPointer = memory.read(cpu.pc + 1);
      memory.write(resultPointer, value);

      rl.close();

      cpu.increasePC(2);

      memory.updateOpcodeCounter(opcode.type);
      resolve();
    });
  });

}
