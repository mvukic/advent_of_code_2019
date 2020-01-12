import { OpcodeType } from '../opcode';
import { IntCodeVMConfig } from '../vm/intcode.vm';

export class Memory {

  /* memory values */
  private _values: number[];

  /* opcode counter */
  private _opcodeCounter: Map<OpcodeType, number>;
  get opcodeCounter() {
    return this._opcodeCounter;
  }

  /* used for reading values in automated mode */
  private _inputValues: number[] = [];
  get inputValues(): number[] {
    return this._inputValues;
  }
  set inputValues(values: number[]) {
    this._inputValues = values;
  }

  /* used for saving values in automated mode */
  private _outputValues: number[] = [];
  get outputValues(): number[] {
    return this._outputValues;
  }
  set outputValues(values: number[]) {
    this._outputValues = values;
  }

  constructor(program: number[], config?: IntCodeVMConfig) {
    this._values = [...program];
    this._opcodeCounter = new Map();
    this._inputValues = config?.inputs ?? [];
  }

  public read(address: number): number {
    return this._values[address];
  }

  public write(address: number, value: number) {
    this._values[address] = value;
  }

  public updateOpcodeCounter(opcodeType: OpcodeType) {
    if (this._opcodeCounter.has(opcodeType)) {
      this._opcodeCounter.set(opcodeType, this._opcodeCounter.get(opcodeType) + 1);
    } else {
      this._opcodeCounter.set(opcodeType, 1);
    }
  }

}
