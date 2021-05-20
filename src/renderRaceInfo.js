// ideally it would render links to 
// the race, drivers, track, race date

// races: round, circuitId, name, date, time, url
// circuits: name, location country lat lng alt url
// drivers: driverId, forename surname dob nationality, url
// constructors: name, nationality, url
import {clearInputChildren} from './clearInputs';
function textToEl(el, text, type) {
  const p = document.createElement(type);
  const textNode = document.createTextNode(text);
  p.appendChild(textNode);
  el.appendChild(p);
}
function linkToEl(el, text, url) {
  const a = document.createElement('a');
  const textNode = document.createTextNode(text);
  a.href = url;
  a.target = "_blank"
  a.appendChild(textNode);
  el.appendChild(a);
}

function linkH3(el, text, url) {
  const h3 = document.createElement("h3");
  linkToEl(h3, text, url);
  el.appendChild(h3);
}


export default function renderRaceInfo(race, circuit, constructors, drivers){
  const infoDiv = document.querySelector('#race-info');
  clearInputChildren(infoDiv);

  const raceInfo = document.createElement('div');
  const circuitInfo = document.createElement('div');
  const driversInfo1 = document.createElement('div');
  const driversInfo2 = document.createElement('div');
  const constructorsInfo1 = document.createElement('div');
  const constructorsInfo2 = document.createElement('div');

  textToEl(infoDiv, 'Race Info', 'h3');

  
  linkH3(raceInfo, race.name, race.url);
  textToEl(raceInfo, `Race Date: ${new Date(race.date).toDateString()}`, "p");
  textToEl(raceInfo, `Time: ${race.time}`, "p");
  textToEl(raceInfo, `Round: ${race.round}`, "p");

  linkH3(circuitInfo, circuit.name, circuit.url);
  textToEl(circuitInfo, `Location: ${circuit.location}, ${circuit.country}`, "p");
  textToEl(circuitInfo, `Altitude: ${circuit.alt} m`, "p");
  
  linkH3(
    driversInfo1,
    `${drivers["driver1"].forename} ${drivers["driver1"].surname}`,
    drivers["driver1"].url
  );
  textToEl(driversInfo1, `Number: ${drivers["driver1"].number}`, "p");
  textToEl(driversInfo1, `Nationality: ${drivers["driver1"].nationality}`, "p");

  linkH3(
    driversInfo2,
    `${drivers["driver2"].forename} ${drivers["driver2"].surname}`,
    drivers["driver2"].url
  );
  textToEl(driversInfo2, `Number: ${drivers["driver2"].number}`, "p");
  textToEl(driversInfo2, `Nationality: ${drivers["driver2"].nationality}`, "p");

  linkH3(
    constructorsInfo1,
    `${constructors["driver1"].name}`,
    constructors["driver1"].url
  );
  textToEl(
    constructorsInfo1,
    `Nationality: ${constructors["driver1"].nationality}`,
    "p"
  );

  linkH3(
    constructorsInfo2,
    `${constructors["driver2"].name}`,
    constructors["driver2"].url
  );
  textToEl(
    constructorsInfo2,
    `Nationality: ${constructors["driver2"].nationality}`,
    "p"
  );
  
  infoDiv.appendChild(raceInfo)
  infoDiv.appendChild(circuitInfo);
  infoDiv.appendChild(driversInfo1);
  infoDiv.appendChild(driversInfo2);
  infoDiv.appendChild(constructorsInfo1);
  infoDiv.appendChild(constructorsInfo2);
}