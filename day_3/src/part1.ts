import fs from 'fs';

interface Move {
  orientation: string;
  steps: number;
}

interface Point {
  x: number;
  y: number;
}

function parseMovements(movements: string[]): Move[] {
  return movements.map((value) => {
    const matches = value.trim().split(/^([A-Z])([0-9]+)$/gm);
    const [orientation, steps] = [matches[1], parseInt(matches[2], 10)];
    return { orientation, steps };
  });
}

function parseInput(input: string): [Move[], Move[]] {
  const [wire1, wire2] = input.trim().split(/\n/g);
  return [ parseMovements(wire1.split(',')), parseMovements(wire2.split(','))];
}

function getPointsBetweenCoordinates(startPoint: Point, endPoint: Point): Point[] {
  const points: Point[] = [];
  if (startPoint.x === endPoint.x) {
    // x1 === x2
    if (startPoint.y > endPoint.y) {
      // y1 > y2
      for (let y = startPoint.y; y >= endPoint.y; y--) {
        points.push({x: startPoint.x, y });
      }
    } else {
      // y1 < y2
      for (let y = startPoint.y; y <= endPoint.y; y++) {
        points.push({x: startPoint.x, y });
      }
    }
  } else {
    // y1 === y2
    if (startPoint.x > endPoint.x) {
      // x1 > x2
      for (let x = startPoint.x; x >= endPoint.x; x--) {
        points.push({ x, y: startPoint.y });
      }
    } else {
      // x1 < x2
      for (let x = startPoint.x; x <= endPoint.x; x++) {
        points.push({ x, y: startPoint.y });
      }
    }
  }
  return points;
}

function getCoordinates(wire: Move[]): Point[] {
  const points: Point[] = [{x: 0, y: 0}];
  wire.forEach((move) => {
    const lastPoint = {...points[points.length - 1]};
    const currentPoint = { ...lastPoint };
    if (move.orientation === 'L') {
      currentPoint.x = currentPoint.x - move.steps;
    } else if (move.orientation === 'R') {
      currentPoint.x = currentPoint.x + move.steps;
    } else if (move.orientation === 'U') {
      currentPoint.y = currentPoint.y + move.steps;
    } else if (move.orientation === 'D') {
      currentPoint.y = currentPoint.y - move.steps;
    }
    // console.log(`(${lastPoint.x}, ${lastPoint.y}) -> (${currentPoint.x},${currentPoint.y})`);
    const [_, ...rest] = getPointsBetweenCoordinates(lastPoint, currentPoint);
    // console.log(rest);
    points.push(...rest);
  });
  const [zero, ...withoutCenter] = points;
  return withoutCenter;
}

function getIntersections(wire1: Point[], wire2: Point[]): Point[] {
  return wire1.filter((point) => {
    return wire2.find((it) => it.x === point.x && it.y === point.y);
  });
}

function getManhattanDistance(point: Point): number {
  return Math.abs(point.x) + Math.abs(point.y);
}

function getClosestPoint(points: Point[]): [Point, number] {
  let closest: Point = { ...points[0] };
  let smallest = getManhattanDistance(closest);
  points.forEach((point) => {
    const distance = getManhattanDistance(point);
    if (distance < smallest) {
      closest = { ...point };
      smallest = distance;
    }
  })
  return [closest, smallest];
}

async function start() {
  const input: string = await fs.promises.readFile('./input/part1.txt', { encoding: 'utf8' });
  const [wire1, wire2] = parseInput(input);

  const wire1Coordinates = getCoordinates(wire1);
  const wire2Coordinates = getCoordinates(wire2);

  const intersections = getIntersections(wire1Coordinates, wire2Coordinates);
  console.log(intersections);
  const [point, distance] = getClosestPoint(intersections);
  console.log(`Closest point is (${point.x},${point.y}) with ${distance}\n`);
}

start();
