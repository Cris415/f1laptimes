import raceResults from "./raceResults";
import { selectDriversFromRace } from "../data/selectDataUtil";

function loadRaceResultsTable(raceId, raceData) {
  const [laps, circuits, constructors, drivers, races, results, status] =
    raceData;
  let filteredResults = results.filter((result) => {
    return result.raceId === raceId;
  });
  const filteredDrivers = selectDriversFromRace(laps, drivers, raceId);

  raceResults(filteredResults, status, filteredDrivers, constructors);
}

export default loadRaceResultsTable;
