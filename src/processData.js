import renderGraph from "./renderGraph";
import fillSelectElement from "./fillSelectElement";
import processLapData from "./processLapData";
import {
  selectDriversFromRace,
  selectLapsByDriverandRace,
  selectDriverById,
  selectRaceById,
} from "./selectUtil";


function processData(svg, statsArr ,raceId, year, driver1Id, driver2Id, selectFormItems) {
  const [lapTimes, circuits, constructors, drivers, races, results, status] =
    statsArr;

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

  let years = races.reduce((yearsArr, currVal) => {
    if (!yearsArr.includes(currVal.year) && currVal.year > "1995" && currVal.year < "2021") {
      return [...yearsArr, currVal.year]
    } else {
      return yearsArr;
    }
  }, []);


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

  //
  const filteredRaces = races.filter(
    // (race) => race.year !== "2021" && +race.year > 1995
    (race) => race.year === year
  );

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

  renderGraph(svg, race, d1Data, d2Data);
}
export default processData;
