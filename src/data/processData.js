import renderGraph from "../graph/renderGraph";
import populateYearDropdown from "../dropdown/populateYearDropdown";
import populateDriverDropdown from "../dropdown/populateDriverDropdown";
import populateRaceDropdown from "../dropdown/populateRaceDropdown";
import processLapData from "../graph/processLapData";
import loadRaceResultsTable from "../resultsTable/loadRaceResultsTable";
import renderRaceFacts from "../raceFacts/renderRaceFacts";

import {
  selectDriversFromRace,
  selectLapsByDriverandRace,
  selectDriverById,
  selectRaceById,
  chooseItemIfNotInList,
  removeItemFromList,
  selectCircuitById,
  selectDriverConstructor,
} from "./selectDataUtil";

function processData(statsArr, selection) {
  let { raceId, year, driver1Id, driver2Id } = selection;

  const [lapTimes, circuits, constructors, drivers, races, results, status] =
    statsArr;

  const originalRaceId = raceId;

  const racesForYear = races.filter((race) => race.year === year);
  let race = selectRaceById(races, raceId);
  raceId = chooseItemIfNotInList(racesForYear, race, 1).raceId;

  if (raceId !== originalRaceId) {
    // If the year changes the results must display a different race.
    loadRaceResultsTable(raceId, statsArr);
  }

  race = selectRaceById(races, raceId);
  const circuit = selectCircuitById(circuits, race.circuitId);

  let driver1 = selectDriverById(drivers, driver1Id);
  let driver2 = selectDriverById(drivers, driver2Id);

  let filteredDrivers1 = selectDriversFromRace(
    lapTimes,
    drivers,
    raceId,
    driver2.driverId // don't want other driver to show up on select
  );

  let filteredDrivers2 = selectDriversFromRace(
    lapTimes,
    drivers,
    raceId,
    driver1.driverId
  );
  
  // If a driver is not present in a race, find another
  driver1 = chooseItemIfNotInList(filteredDrivers1, driver1, 1);
  driver2 = chooseItemIfNotInList(filteredDrivers2, driver2, 2);

  filteredDrivers1 = removeItemFromList(filteredDrivers1, driver2, "driverId");
  filteredDrivers2 = removeItemFromList(filteredDrivers2, driver1, "driverId");

  // Populate Dropdowns
  populateRaceDropdown(racesForYear, raceId);
  populateYearDropdown(races, year);
  populateDriverDropdown("driver1", filteredDrivers1, driver1.driverId);
  populateDriverDropdown("driver2", filteredDrivers2, driver2.driverId);

  // package driver data for graph
  const d1Laps = selectLapsByDriverandRace(lapTimes, driver1.driverId, raceId);
  const d2Laps = selectLapsByDriverandRace(lapTimes, driver2.driverId, raceId);

  const d1Data = {
    driver: driver1,
    laps: processLapData(driver1, d1Laps),
  };
  const d2Data = {
    driver: driver2,
    laps: processLapData(driver2, d2Laps),
  };

  const driversConstructors = {
    driver1: selectDriverConstructor(
      results,
      constructors,
      driver1.driverId,
      raceId
    ),
    driver2: selectDriverConstructor(
      results,
      constructors,
      driver2.driverId,
      raceId
    ),
  };

  renderGraph(race, driversConstructors, d1Data, d2Data);
  renderRaceFacts(race, circuit, driversConstructors, { driver1, driver2 });
}
export default processData;
