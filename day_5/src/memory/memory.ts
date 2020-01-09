import { OpcodeType } from '../opcode';

export class Memory {

  /* memory values */
  private _values: number[];

  /* opcode counter */
  private _opcodeCounter: Map<OpcodeType, number>;

  /* used for saving predefined input user values */
  private _inputValues: number[];
  get inputValues(): number[] {
    return this._inputValues;
  }
  set inputValues(values: number[]) {
    this._inputValues = values;
  }

  constructor(program: number[]) {
    this._values = [...program];
    this._opcodeCounter = new Map();
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
