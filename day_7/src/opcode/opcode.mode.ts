export interface OpcodeModesGroup {
  first: OpcodeMode;
  second: OpcodeMode;
  third: OpcodeMode;
}

export enum OpcodeMode {
  POSITIONAL = 0,
  IMMEDIATE = 1
}
