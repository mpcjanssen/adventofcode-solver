import { solveAll, solveAllYears } from './utils/solver.js';
import { execSync } from 'node:child_process';
import * as process from 'node:process';

if (!process.env.ADVENT_SESSION) {
  try {
    let session = execSync('cookies https://adventofcode.com/ session');
    process.env.ADVENT_SESSION = session.toString();
  } catch {
    //
  }
}

// if (process.env.ADVENT_SESSION) {
let year = process.argv[2];
let day = process.argv[3];
if (year && (year.includes('/') || year.includes('\\'))) {
  let clean = year.split(/[\\/]/).slice(-2);
  let yearNum = parseInt(clean[0]);
  let dayNum = parseInt(clean[1].match(/\d+/).pop());
  if (Number.isNaN(yearNum) || Number.isNaN(dayNum)) {
    console.error('Invalid arguments');
    process.exit(0);
  }
  year = `${yearNum}`;
  day = `${dayNum}`;
}
if (year) {
  await solveAll(year, day).catch(err => console.error(err.stack));
} else {
  await solveAllYears().catch(err => console.error(err.stack));
}

process.exit(0);
