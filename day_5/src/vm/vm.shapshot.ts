import { CPU } from '../cpu';
import { Memory } from '../memory';

export interface IntCodeVMSnapshot {
  cpu: CPU;
  memory: Memory;
}
