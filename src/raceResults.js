function createRow(datum, header) {
  const newRow = document.createElement("tr");
  datum.forEach(d => {
    const box = header ? document.createElement('th') : document.createElement("td");
    const content = document.createTextNode(d);
    box.appendChild(content);
    newRow.appendChild(box);
  });
  return newRow;
}

const headerItems = ['position', 'driver','number','constructor','laps','fastest lap time','fastest lap speed','status']

function raceResults(results, status, drivers, constructors) {
  const table = document.getElementById("race-results");

  table.append(createRow(headerItems, true));

  results.forEach((result) => {
    const driver = drivers.filter(driver => driver.driverId === result.driverId)[0];
    if(driver){
      result.driverId = `${driver.forename} ${driver.surname}`;
    } else {
      result.driverId = '\\N'
    }

    // replace constructorId with the actual name
    result.constructorId = constructors.filter(
      (team) => team.constructorId === result.constructorId
    )[0].name;

    result.status = status.filter(status => status.statusId === result.statusId)[0].status

    // to avoid occasions where speed isn't present
    // convert kph to mph
    const speedInt = parseInt(result.fastestLapSpeed);
    if (speedInt) {
      result.fastestLapSpeed = (speedInt / 1.609).toFixed(2) + " mph";
    }
    
    delete result.grid;
    delete result.raceId;
    delete result.resultId;
    delete result.statusId;
    delete result.position;
    delete result.positionOrder;
    delete result.points;
    delete result.milliseconds;
    delete result.rank;
    delete result.fastestLap;
    delete result.time;

    const resultDict = {
      positionText: 0,
      driverId: 1,
      number: 2,
      constructorId: 3,
      laps: 4,
      fastestLapTime: 5,
      fastestLapSpeed: 6,
      status: 7,
    };
    
    const orderedArr = new Array(8);
    // re-assign original object to ordered object
    for (const property in result) {
      orderedArr[resultDict[property]] = result[property];
    }
    
    table.append(createRow(orderedArr))
  }); 
}
export default raceResults;
