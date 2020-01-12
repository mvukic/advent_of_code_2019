import { CPU } from '../cpu';
import { Memory } from '../memory';
import { Opcode, OpcodeType, parseOpcode } from '../opcode';
import { operations } from '../operations';
import { IntCodeVMSnapshot } from './vm.shapshot';

export interface IntCodeVMConfig {
  debug: boolean;
  automated: boolean;
  inputs?: number[];
}

export const defaultIntCodeVMConfig: IntCodeVMConfig = {
  debug: false,
  /* reads input from variable */
  /* saves output into variable */
  automated: false
};

export class IntCodeVM {

  private _opcodeCache: Map<number, Opcode> = new Map();
  private _cpu: CPU;
  private _memory: Memory;

  constructor(program: number[], config: Partial<IntCodeVMConfig>) {
    const _config = {...defaultIntCodeVMConfig, ...config};

    this._memory = new Memory(program, _config);
    this._cpu = new CPU(_config);
  }

  public async run(): Promise<IntCodeVMSnapshot> {
    while (true) {
      const opcode = this.decode(this._memory.read(this._cpu.pc));
      if (opcode.type === OpcodeType.ADD) {
        operations.add(this._memory, this._cpu, opcode);
      } else if (opcode.type === OpcodeType.EQUALS) {
        operations.equals(this._memory, this._cpu, opcode);
      } else if (opcode.type === OpcodeType.JUMP_IF_FALSE) {
        operations.jumpIfFalse(this._memory, this._cpu, opcode);
      } else if (opcode.type === OpcodeType.JUMP_IF_TRUE) {
        operations.jumpIfTrue(this._memory, this._cpu, opcode);
      } else if (opcode.type === OpcodeType.LESS_THAN) {
        operations.lessThan(this._memory, this._cpu, opcode);
      } else if (opcode.type === OpcodeType.MULTIPLY) {
        operations.multiply(this._memory, this._cpu, opcode);
      } else if (opcode.type === OpcodeType.READ) {
        await operations.read(this._memory, this._cpu, opcode);
      } else if (opcode.type === OpcodeType.WRITE) {
        operations.write(this._memory, this._cpu, opcode);
      } else if (opcode.type === OpcodeType.HALT) {
        return Promise.resolve({cpu: this._cpu, memory: this._memory});
      } else {
        return Promise.reject(opcode);
      }
    }
  }

  private decode(raw: number): Opcode {
    if (this._opcodeCache.has(raw)) {
      return this._opcodeCache.get(raw);
    }
    const opcode = parseOpcode(raw);
    this._opcodeCache.set(raw, opcode);
    return opcode;
  }

}
