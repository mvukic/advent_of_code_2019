import { IntCodeVMConfig } from '../vm/intcode.vm';

export class CPU {

  /* registers */
  private _pc = 0;
  get pc() {
    return this._pc;
  }

  /* debug flag */
  private _debug = false;
  get debug(): boolean {
    return this._debug;
  }
  set debug(debug: boolean) {
    this._debug = debug;
  }

  /* auto flag */
  private _auto = false;
  get auto(): boolean {
    return this._auto;
  }
  set auto(auto: boolean) {
    this._auto = auto;
  }

  constructor(config: IntCodeVMConfig) {
    this._auto = config.automated;
    this._debug = config.debug;
  }

  public increasePC(by: number) {
    this._pc += by;
  }

  public setPC(pc: number) {
    this._pc = pc;
  }

}
