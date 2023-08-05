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
  while (!list.includes(item) && offset < list.length) {
    item = list[offset];
    offset++;
  }
  return item;
}

export function removeItemFromList(list, exclude, property) {
  return list.filter((item) => item[property] !== exclude[property]);
}

export function reduceRaceYears(races) {
  return races.reduce((yearsArr, currVal) => {
    if (
      !yearsArr.includes(currVal.year) &&
      currVal.year > "1995" &&
      currVal.year <= "2023"
    ) {
      return [...yearsArr, currVal.year];
    } else {
      return yearsArr;
    }
  }, []);
}

export function selectCircuitById(circuits, id) {
  return circuits.filter((circuit) => circuit.circuitId === id)[0];
}

export function selectDriverConstructor(results, constructors, driverId, raceId) {
  const constructorId = results.filter(
    (result) => result.driverId === driverId && result.raceId === raceId
  )[0].constructorId;

  return constructors.filter((item) => item.constructorId === constructorId)[0];
}
