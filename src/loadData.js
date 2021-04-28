import { csv } from "d3";
import renderGraph from "./renderGraph";


function loadData(svg, raceId, driver1Id, driver2Id) {
  csv("data/races.csv").then((races) => {

    // fill select box
    const selectEl = document.getElementById("race-select");
    races.sort((a,b) => b.year > a.year).forEach(race => {
      option = document.createElement("option");
      option.setAttribute("value", race.raceId);
      option.appendChild(document.createTextNode(`${race.name} ${race.year}`));
      selectEl.appendChild(option);
    })


    csv("data/drivers.csv").then((drivers) => {
      csv("data/lap_times.csv").then((laps) => {
        // Temporary filters
        const race = races.filter((race) => race.raceId === raceId)[0];
        
        const driver = drivers.filter((driver) => driver.driverId === driver1Id)[0];
        const driver2 = drivers.filter((driver) => driver.driverId === driver2Id)[0];

        const drivers1LapData = laps.filter((lap) => lap.driverId === driver1Id && lap.raceId === raceId);
        const drivers2LapData = laps.filter(
          (lap) => lap.driverId === driver2Id && lap.raceId === raceId
        );

        // package information 
        const driverData = {
          laps: drivers1LapData,
          driver: driver
        }
        const driver2Data = {
          laps: drivers2LapData,
          driver: driver2
        }

        // process data
        driverData.laps.forEach((d) => {
          d.lap = +d.lap;
          d.position = +d.position;
          d.seconds = +d.milliseconds / 1000;
          d.time = d.time;
          delete d.milliseconds;
          delete d.driverId;
          delete d.raceId;
        });

        driver2Data.laps.forEach((d) => {
          d.lap = +d.lap;
          d.position = +d.position;
          d.seconds = +d.milliseconds / 1000;
          d.time = d.time;
          delete d.milliseconds;
          delete d.driverId;
          delete d.raceId;
        });

        renderGraph(svg, race, driver2Data, driverData);
      });
    });
  });
}

export default loadData;
