export function selectDriversFromRace(
  lapsArray,
  drivers,
  raceId,
  excludedDriverId
) {
  const lapsFromRace = lapsArray.filter((lap) => lap.raceId === raceId);
  const listOfDriverIds = lapsFromRace.map((lap) => lap.driverId);

  const distinctDrivers = listOfDriverIds.reduce((uniqueArr, item) => {
    return uniqueArr.includes(item) ? uniqueArr : [...uniqueArr, item];
  }, []);

  const filteredDrivers = drivers.filter(
    (driver) =>
      distinctDrivers.includes(driver.driverId) &&
      driver.driverId !== excludedDriverId
  );
  return filteredDrivers;
}

export function selectLapsByDriverandRace(laps, driverId, raceId) {
  return laps.filter(
    (lap) => lap.driverId === driverId && lap.raceId === raceId
  );
}

export function selectDriverById(drivers, driverId) {
  return drivers.filter((driver) => driver.driverId === driverId)[0];
}

export function selectRaceById(races, raceId) {
  return races.filter((race) => race.raceId === raceId)[0];
}

// If item is not on list, choose another one,
export function chooseItemIfNotInList(list, item, offset = 0) {
  return list.includes(item) ? item : list[offset];
}

export function removeItemFromList(list, exclude, property) {
  return list.filter((item) => item[property] !== exclude[property]);
}

export function reduceRaceYears(races) {
  return races.reduce((yearsArr, currVal) => {
    if (
      !yearsArr.includes(currVal.year) &&
      currVal.year > "1995" &&
      currVal.year <= "2021"
    ) {
      return [...yearsArr, currVal.year];
    } else {
      return yearsArr;
    }
  }, []);
}
