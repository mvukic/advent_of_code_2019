import fs from 'fs';

function parseInput(input: string): number[] {
  const lines = input.split('\r\n');
  return lines.map((line) => parseInt(line, 10));
}

function calculateFuelForMass(mass: number): number {
  let sum = 0;
  let fuelIsPositive = true;

  let lastFuelMass = mass;
  while (fuelIsPositive) {
    lastFuelMass = Math.floor(lastFuelMass / 3) - 2;
    if (lastFuelMass <= 0) {
      fuelIsPositive = false;
    } else {
      sum += lastFuelMass;
    }
  }

  return sum;
}

function calculateFuel(masses: number[]): number {
  return masses
    .map((mass) => calculateFuelForMass(mass))
    .reduce((sum, fuel) => sum + fuel, 0);

}

async function start() {
  const input: string = await fs.promises.readFile('./input/part1.txt', { encoding: 'utf8' });
  const masses = parseInput(input);
  const fuel = calculateFuel(masses);
  console.log(`Required fuel is ${fuel}.`);
}

start();
