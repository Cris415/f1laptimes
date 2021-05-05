import { csv } from "d3";

const raceData = [
  csv("data/lap_times.csv"),
  csv("data/circuits.csv"),
  csv("data/constructors.csv"),
  csv("data/drivers.csv"),
  csv("data/races.csv"),
  csv("data/results.csv"),
  csv("data/status.csv"),
];

function loadStats() {
  return Promise.all(raceData);
}

export default loadStats;
