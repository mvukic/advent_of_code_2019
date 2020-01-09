export class CPU {

  /* registers */
  private _pc = 0;
  get pc() {
    return this._pc;
  }

  /* debuf flag */
  private _debug = false;
  get debug(): boolean {
    return this._debug;
  }
  set debug(debug: boolean) {
    this._debug = debug;
  }

  public increasePC(by: number) {
    this._pc += by;
  }

  public setPC(pc: number) {
    this._pc = pc;
  }

}
