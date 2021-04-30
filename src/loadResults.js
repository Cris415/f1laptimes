import raceResults from "./raceResults";
import { csv } from "d3";
import {
  selectDriversFromRace,
} from "./selectUtil";

const raceData = [
  csv("data/lap_times.csv"),
  csv("data/circuits.csv"),
  csv("data/constructors.csv"),
  csv("data/drivers.csv"),
  csv("data/races.csv"),
  csv("data/results.csv"),
  csv("data/status.csv"),
];

function loadResults(raceId) {
  Promise.all(raceData).then(function (raceData) {
    const [laps, circuits, constructors, drivers, races, results, status] = raceData;

    let filteredResults = results.filter((result) => result.raceId === raceId);
    const filteredDrivers = selectDriversFromRace(laps, drivers, raceId);

    raceResults(
      filteredResults,
      status,
      filteredDrivers,
      constructors
    );
  });
}

export default loadResults;