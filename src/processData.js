import renderGraph from "./renderGraph";
import fillSelectElement from "./fillSelectElement";
import processLapData from "./processLapData";
import loadResults from "./loadResults";
import renderRaceInfo from './renderRaceInfo';

import {
  selectDriversFromRace,
  selectLapsByDriverandRace,
  selectDriverById,
  selectRaceById,
} from "./selectUtil";


function processData(svg, statsArr ,raceId, year, driver1Id, driver2Id, selectFormItems) {
  const [lapTimes, circuits, constructors, drivers, races, results, status] =
    statsArr;
  const originalRaceId = raceId;

  let filteredRaces = races.filter((race) => race.year === year);
  let race = selectRaceById(races, raceId);
  raceId = chooseItemIfNotInList(filteredRaces, race, 1).raceId;

  if (raceId !== originalRaceId){
    // If the year changes the results must display a different race.
    loadResults(raceId, statsArr);
  }

  race = selectRaceById(races, raceId);
  const circuit = circuits.filter(circuit => circuit.circuitId === race.circuitId)[0];
    
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

  let years = races.reduce((yearsArr, currVal) => {
    if (
      !yearsArr.includes(currVal.year) &&
      currVal.year > "1995" &&
      currVal.year < "2021"
    ) {
      return [...yearsArr, currVal.year];
    } else {
      return yearsArr;
    }
  }, []);

  // If item is not on list, choose another one,
  function chooseItemIfNotInList(list, item, offset = 0) {
    return list.includes(item) ? item : list[offset];
  }

  function removeItemFromList(list, exclude, property) {
    return list.filter((item) => item[property] !== exclude[property]);
  }

  driver1 = chooseItemIfNotInList(filteredDrivers1, driver1, 1)
  driver2 = chooseItemIfNotInList(filteredDrivers2, driver2, 2)

  filteredDrivers1 = removeItemFromList(filteredDrivers1, driver2, 'driverId');
  filteredDrivers2 = removeItemFromList(filteredDrivers2, driver1, 'driverId');

  // fill race select box
  const selectRaceText = (item) => `${item.name}`;
  const sortCb = (a, b) => b.year - a.year;
  fillSelectElement(
    selectFormItems.race,
    filteredRaces,
    "raceId",
    raceId,
    selectRaceText,
    sortCb
  );

  // fill year dropdown box
  const selectYearText = (year) => `${year}`;
  const yearSort = (a, b) => b - a;

  fillSelectElement(
    selectFormItems.year,
    years,
    "year",
    year.toString(),
    selectYearText,
    yearSort
  );

  // fill driver's select box
  const selectDriverNameText = (item) => `${item.forename} ${item.surname}`;
  const driverSortCb = (a, b) => b.surname - a.surname;

  fillSelectElement(
    selectFormItems.driver1,
    filteredDrivers1,
    "driverId",
    driver1.driverId,
    selectDriverNameText,
    driverSortCb
  );

  fillSelectElement(
    selectFormItems.driver2,
    filteredDrivers2,
    "driverId",
    driver2.driverId,
    selectDriverNameText,
    driverSortCb
  );

  const d1Data = {
    laps: selectLapsByDriverandRace(lapTimes, driver1.driverId, raceId),
    driver: driver1,
  };
  const d2Data = {
    laps: selectLapsByDriverandRace(lapTimes, driver2.driverId, raceId),
    driver: driver2,
  };

  d1Data.laps = processLapData(d1Data);
  d2Data.laps = processLapData(d2Data);

  const constructorId1 = results.filter(
        (result) =>
          result.driverId === driver1.driverId && result.raceId === raceId
      )[0].constructorId;
  const constructorId2 = results.filter(
        (result) =>
          result.driverId === driver2.driverId && result.raceId === raceId
      )[0].constructorId;
      
  const constructor1 = constructors.filter(
    (item) => item.constructorId === constructorId1
  )[0];
  const constructor2 = constructors.filter(
    (item) => item.constructorId === constructorId2
  )[0];

  const driversConstructors = {
    driver1: constructor1,
    driver2: constructor2,
  };

  const driverInfo = {
    driver1,
    driver2
  }

  renderRaceInfo(race, circuit, driversConstructors, driverInfo);

  renderGraph(svg, race, driversConstructors, d1Data, d2Data);
}
export default processData;
