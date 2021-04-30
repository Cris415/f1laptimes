export function selectDriversFromRace(lapsArray, drivers ,raceId, excludedDriverId){
  const lapsFromRace = lapsArray.filter((lap) => lap.raceId === raceId);
  const distinctDrivers = [...new Set(lapsFromRace.map((lap) => lap.driverId))];

  const filteredDrivers = drivers.filter(
    (driver) =>
      distinctDrivers.includes(driver.driverId) &&
      driver.driverId !== excludedDriverId
  );
  return filteredDrivers;
}

export function selectByDriverandRace(laps, driverId, raceId){
  return laps.filter((lap) => lap.driverId === driverId && lap.raceId === raceId);
}

export function selectDriverById(drivers, driverId){
  return drivers.filter((driver) => driver.driverId === driverId)[0];
}

export function selectRaceById(races, raceId){
  return races.filter((race) => race.raceId === raceId)[0];
}