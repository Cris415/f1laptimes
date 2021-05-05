import renderGraph from "./renderGraph";
import fillSelectElement from "./fillSelectElement";
import {
  selectDriversFromRace,
  selectByDriverandRace,
  selectDriverById,
  selectRaceById,
} from "./selectUtil";
import processLapData from "./processLapData";


function processData(svg, statsArr ,raceId, driver1Id, driver2Id, selectFormItems) {
  const [lapTimes, circuits, constructors, drivers, races, results, status] = statsArr;
  const stats = {
    lapTimes, circuits, constructors, drivers, races, results, status
  }

  const race = selectRaceById(races, raceId);

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

  // if the driver's list does not include driverId from input
  // select a driver from the list
  if (!filteredDrivers1.includes(driver1)) {
    driver1 = filteredDrivers1[0];
    filteredDrivers2 = filteredDrivers2.filter(
      (driver) => driver.driverId !== filteredDrivers1[0].driverId
    );
  }

  if (!filteredDrivers2.includes(driver2)) {
    driver2 = filteredDrivers2[1];
    filteredDrivers1 = filteredDrivers1.filter(
      (driver) => driver.driverId !== filteredDrivers2[1].driverId
    );
  }



  // fill race select box
  const filteredRaces = races.filter(
    (race) => race.year !== "2021" && +race.year > 1995
  );
  const selectRaceText = (item) => `${item.name} ${item.year}`;
  const sortCb = (a, b) => b.year - a.year;
  fillSelectElement(
    selectFormItems.race,
    filteredRaces,
    "raceId",
    raceId,
    selectRaceText,
    sortCb
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
    laps: selectByDriverandRace(lapTimes, driver1.driverId, raceId),
    driver: driver1
  };
  const d2Data = {
    laps: selectByDriverandRace(lapTimes, driver2.driverId, raceId),
    driver: driver2
  };

  d1Data.laps = processLapData(d1Data);
  d2Data.laps = processLapData(d2Data);

  renderGraph(svg, race, d1Data, d2Data);
}
export default processData;
