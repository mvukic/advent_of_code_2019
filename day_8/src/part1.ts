import fs from 'fs';

function parseInput(input: string): number[] {
  return input.split('').map((line) => parseInt(line, 10));
}

async function start() {
  const input: string = await fs.promises.readFile('./input/part1.txt', { encoding: 'utf8' });
  const pixels = parseInput(input);
  const n = pixels.length;
  const w = 25;
  const h = 6;
  const layerSize = n / (w * h);
  const layers = [];
  console.log(`N: ${n} W: ${w} H: ${h} L: ${layerSize}`);
  let minZeroCountIndex = -1;
  let minZeroCount = layerSize + 1;
  for (let i = 0; i < n / layerSize; i++) {
    const layer = pixels.slice(i * layerSize, (i + 1) * layerSize);
    layers.push(layer);
    const zeros = layer.filter((pixel) => pixel === 1).length;
    if (zeros < minZeroCount) {
      minZeroCountIndex = i;
      minZeroCount = zeros;
    }
  }
  console.log(layers);
  const onesCount = layers[minZeroCountIndex].filter((pixel) => pixel === 1).length;
  const twosCount = layers[minZeroCountIndex].filter((pixel) => pixel === 2).length;
  console.log(onesCount * twosCount);
}

start();
