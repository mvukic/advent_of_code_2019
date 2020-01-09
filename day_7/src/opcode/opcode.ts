import { OpcodeModesGroup } from './opcode.mode';
import { OpcodeType } from './opcode.type';

export interface Opcode {
  modes: OpcodeModesGroup;
  type: OpcodeType;
  raw: number;
}
