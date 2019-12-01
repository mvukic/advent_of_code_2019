import fs from 'fs';

function parseInput(input: string): number[] {
  const lines = input.split('\r\n');
  return lines.map((line) => parseInt(line, 10));
}

function calculateFuel(masses: number[]): number {
  return masses
    .map(mass => Math.floor(mass / 3) - 2)
    .reduce((sum, fuel) => sum + fuel, 0);

}


async function start() {
  const input: string = await fs.promises.readFile('./input/part1.txt', { encoding: 'utf8' });
  const masses = parseInput(input);
  const fuel = calculateFuel(masses);
  console.log(`Required fuel is ${fuel}.`);
}

start();
