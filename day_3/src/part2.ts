import fs from 'fs';

interface Move {
  orientation: string;
  steps: number;
}

interface Point {
  x: number;
  y: number;
  distance?: number;
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
  const points: Point[] = [startPoint];
  if (startPoint.x === endPoint.x) {
    // x1 === x2
    if (startPoint.y > endPoint.y) {
      // y1 > y2
      for (let y = startPoint.y; y >= endPoint.y; y--) {
        points.push({x: startPoint.x, y, distance: points[points.length - 1].distance + 1 });
      }
    } else {
      // y1 < y2
      for (let y = startPoint.y; y <= endPoint.y; y++) {
        points.push({x: startPoint.x, y, distance: points[points.length - 1].distance + 1 });
      }
    }
  } else {
    // y1 === y2
    if (startPoint.x > endPoint.x) {
      // x1 > x2
      for (let x = startPoint.x; x >= endPoint.x; x--) {
        points.push({ x, y: startPoint.y, distance: points[points.length - 1].distance + 1 });
      }
    } else {
      // x1 < x2
      for (let x = startPoint.x; x <= endPoint.x; x++) {
        points.push({ x, y: startPoint.y, distance: points[points.length - 1].distance + 1 });
      }
    }
  }
  return points;
}

function getCoordinates(wire: Move[]): Point[] {
  const points: Point[] = [{x: 0, y: 0, distance: 0}];
  let travel = 0;
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
    travel += move.steps;
    // Increase traveled distance for current point
    currentPoint.distance = currentPoint.distance + move.steps;
    // console.log(`(${lastPoint.x}, ${lastPoint.y}, ${lastPoint.distance}) -> (${currentPoint.x} ,${currentPoint.y}, ${currentPoint.distance})`);
    // Remove already included first point
    const [_, ...rest] = getPointsBetweenCoordinates({...lastPoint, distance: lastPoint.distance - 1}, currentPoint);
    // console.log(`Travel so far: ${travel}`);
    points.push(...rest);
  });
  return points;
}

function getUniquePointsWithSmallestTravel(points: Point[]): Point[] {
  const unique: Point[] = [];
  points.forEach((point) => {
    // console.log(`Looking at ${point.x},${point.y}`);
    const index = unique.findIndex((it: Point) => it.x === point.x && it.y === point.y);
    // If we already found this location
    if (index > -1) {
      // console.log(`Already have ${point.x},${point.y}`);
      // Check distance and replace old one if neded
      if (point.distance < unique[index].distance) {
        // console.log(`Distance is smaller ${point.distance}`);
        // Update old distance with smaller one
        unique[index].distance = point.distance;
      }
    } else {
      // Found nonexisting point
      unique.push(point);
    }
  });
  return unique;
}

function getIntersections(wire1: Point[], wire2: Point[]): Point[] {
  // Get intersections
  return wire1
    .map((point) => {
      const index = wire2.findIndex((it) => it.x === point.x && it.y === point.y);
      if (index > -1) {
        // Return point but add travel distances for both wires
        return { x: point.x, y: point.y, distance: point.distance + wire2[index].distance };
      }
    })
    .filter((it) => it !== undefined);

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

function getUnique(points: Point[]): Point[] {
  const unique: Point[] = [];
  points.forEach((point) => {
    if (unique.findIndex((it) => it.x === point.x && it.y === point.y && it.distance === point.distance) === -1) {
      unique.push(point);
    }
  });
  return unique;
}

async function start() {
  console.log('Wait 30 minutes');
  const input: string = await fs.promises.readFile('./input/part1.txt', { encoding: 'utf8' });
  const [wire1, wire2] = parseInput(input);

  const wire1Coordinates = getUnique(getCoordinates(wire1));
  const wire2Coordinates = getUnique(getCoordinates(wire2));

  const wire1ClosestPoints = getUniquePointsWithSmallestTravel(wire1Coordinates);
  const wire2ClosestPoints = getUniquePointsWithSmallestTravel(wire2Coordinates);

  const [_, ...intersections] = getIntersections(wire1ClosestPoints, wire2ClosestPoints);
  let best = intersections[0];
  intersections.forEach((point) => {
    if (point.distance < best.distance) { best = point; }
  });
  console.log('Fastest intersection is:');
  console.log(best);
}

start();
