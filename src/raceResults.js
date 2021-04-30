function createRow(datum, header) {
  datum = Object.values(datum)
  const newRow = document.createElement("tr");
  datum.forEach(d => {
    const box = header ? document.createElement('th') : document.createElement("td");
    const content = document.createTextNode(d);
    box.appendChild(content);
    newRow.appendChild(box);
  });
  return newRow;
}

const headerItems = ['driver', 'constructor','number','position','laps','fastest lap time','fastest lap speed','status']

function raceResults(results, status, drivers, constructors) {
  const table = document.getElementById("race-results");

  table.append(createRow(headerItems, true))
  results.forEach((result) => {
    const driver = drivers.filter(driver => driver.driverId === result.driverId)[0];
    if(driver){
      result.driverId = `${driver.forename} ${driver.surname}`;
    } else {
      result.driverId = '\\N'
    }

    result.constructorId = constructors.filter(
      (team) => team.constructorId === result.constructorId
    )[0].name;
    result.status = status.filter(status => status.statusId === result.statusId)[0].status

    if (Number.isInteger(+result.fastestLapSpeed)){
      result.fastestLapSpeed = (+result.fastestLapSpeed / 1.609).toFixed(2) + " mph";
    }
    
    
    delete result.grid
    delete result.raceId
    delete result.resultId;
    delete result.statusId;
    delete result.position
    delete result.positionOrder;
    delete result.points
    delete result.milliseconds
    delete result.rank
    delete result.fastestLap
    delete result.time

    table.append(createRow(result))
  }); 
}
export default raceResults;
