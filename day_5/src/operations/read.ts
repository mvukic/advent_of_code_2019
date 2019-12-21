import { Memory, increaseMemoryIndex } from '../memory';
import readline from 'readline';
import { Opcode } from '../opcode';

export async function read(memory: Memory, opcode: Opcode): Promise<void> {
  const rl = readline.createInterface({ input: process.stdin });

  return new Promise((resolve) => {
    console.log('Enter a single digit value:');
    rl.question('', (answer) => {
      const value = Number.parseInt(answer, 10);

      const program = memory.program;
      const index = memory.index;

      const resultPointer = program[index + 1];
      memory.program[resultPointer] = value;
      increaseMemoryIndex(memory, 2);

      rl.close();
      resolve();
    });
  });

}
