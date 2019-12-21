import { Opcode } from './opcode';
import { OpcodeModesGroup, OpcodeMode } from './opcode.mode';
import { OpcodeType } from './opcode.type';

export function parseOpcode(raw: number): Opcode {
  const modes = parseOpcodesModeGroup(raw);
  const type = parseOpcodeType(raw);
  return {
    type,
    modes,
    raw
  };
}

function parseOpcodesModeGroup(value: number): OpcodeModesGroup {
  const modes: OpcodeModesGroup = {
    first: OpcodeMode.POSITIONAL,
    second: OpcodeMode.POSITIONAL,
    third: OpcodeMode.POSITIONAL
  };
  const asString = `${value}`;

  if (asString.length === 3) {
    modes.first = Number.parseInt(asString[0], 10) as OpcodeMode;
  }
  if (asString.length === 4) {
    modes.first = Number.parseInt(asString[1], 10) as OpcodeMode;
    modes.second = Number.parseInt(asString[0], 10) as OpcodeMode;
  }
  if (asString.length === 5) {
    modes.first = Number.parseInt(asString[2], 10) as OpcodeMode;
    modes.second = Number.parseInt(asString[1], 10) as OpcodeMode;
    modes.third = Number.parseInt(asString[0], 10) as OpcodeMode;
  }

  return modes;
}

function parseOpcodeType(value: number): OpcodeType {
  const asString = `${value}`;
  if (asString.length === 1 || asString.length === 2) {
    return value;
  } else {
    return value % 100;
  }
}
