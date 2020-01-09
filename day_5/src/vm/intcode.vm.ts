import { CPU } from '../cpu';
import { Memory } from '../memory';
import { Opcode, OpcodeType, parseOpcode } from '../opcode';
import { operations } from '../operations';

export interface IntCodeVMConfig {
  debug: boolean;
  inputs?: number[];
}

export const defaultIntCodeVMConfig: IntCodeVMConfig = {
  debug: false
};

export class IntCodeVM {

  private _opcodeCache: Map<number, Opcode> = new Map();
  private _cpu: CPU;
  private _memory: Memory;

  constructor(program: number[], config: IntCodeVMConfig = defaultIntCodeVMConfig) {
    const _config = {...config, ...defaultIntCodeVMConfig};

    this._memory = new Memory(program);
    this._memory.inputValues = _config.inputs;

    this._cpu = new CPU();
    this._cpu.debug = _config.debug;
  }

  public run(): Promise<void> {
    return new Promise( async (resolve, reject) => {
      while (true) {
        const opcode = this.decode(this._memory.read(this._cpu.pc));
        switch (opcode.type) {
          case OpcodeType.ADD:
            operations.add(this._memory, this._cpu, opcode);
            break;
          case OpcodeType.EQUALS:
            operations.equals(this._memory, this._cpu, opcode);
            break;
          case OpcodeType.JUMP_IF_FALSE:
            operations.jumpIfFalse(this._memory, this._cpu, opcode);
            break;
          case OpcodeType.JUMP_IF_TRUE:
            operations.jumpIfTrue(this._memory, this._cpu, opcode);
            break;
          case OpcodeType.LESS_THAN:
            operations.lessThan(this._memory, this._cpu, opcode);
            break;
          case OpcodeType.MULTIPLY:
            operations.multiply(this._memory, this._cpu, opcode);
            break;
          case OpcodeType.READ:
            await operations.read(this._memory, this._cpu, opcode);
            break;
          case OpcodeType.WRITE:
            operations.write(this._memory, this._cpu, opcode);
            break;
          case OpcodeType.HALT:
            resolve();
          default:
            reject(opcode);
        }
      }
    });
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
