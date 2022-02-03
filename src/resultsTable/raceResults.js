import {clearInputChildren} from '../graph/clearInputs';

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

  clearInputChildren(table);

  table.append(createRow(headerItems, true));

  results.forEach((result) => {
    const newResult = {...result};

    const driver = drivers.filter(driver => driver.driverId === newResult.driverId)[0];
    if(driver){
      newResult.driverId = `${driver.forename} ${driver.surname}`;
    } else {
      newResult.driverId = '\\N'
    }

    // replace constructorId with the actual name
    newResult.constructorId = constructors.filter(
      (team) => team.constructorId === newResult.constructorId
    )[0].name;

    newResult.status = status.filter(status => status.statusId === newResult.statusId)[0].status

    // to avoid occasions where speed isn't present
    // convert kph to mph
    const speedInt = parseInt(newResult.fastestLapSpeed);
    if (speedInt) {
      newResult.fastestLapSpeed = (speedInt / 1.609).toFixed(2) + " mph";
    }

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
    for (const property in newResult) {
      orderedArr[resultDict[property]] = newResult[property];
    }
    
    table.append(createRow(orderedArr))
  }); 
}
export default raceResults;
