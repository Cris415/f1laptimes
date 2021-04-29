import { csv } from "d3";
import renderGraph from "./renderGraph";
import selectFill from './selectFill';

function loadData(svg, raceId, driver1Id, driver2Id) {
  csv("data/races.csv").then((races) => {
    csv("data/drivers.csv").then((drivers) => {
      csv("data/lap_times.csv").then((laps) => {
        
        // Temporary filters
        const race = races.filter((race) => race.raceId === raceId)[0];

        const driver = drivers.filter(
          (driver) => driver.driverId === driver1Id
        )[0];
        const driver2 = drivers.filter(
          (driver) => driver.driverId === driver2Id
        )[0];

        const drivers1LapData = laps.filter(
          (lap) => lap.driverId === driver1Id && lap.raceId === raceId
        );
        const drivers2LapData = laps.filter(
          (lap) => lap.driverId === driver2Id && lap.raceId === raceId
        );

        const lapsFromRace = laps.filter((lap) => lap.raceId === raceId);
        
        const distinctDrivers = [...new Set(lapsFromRace.map(lap => lap.driverId))]
        
        const filteredDrivers = drivers.filter(driver => distinctDrivers.includes(driver.driverId))

        // fill race select box
        const raceEl = document.getElementById("race-select");
        const selectRaceText = (item) => `${item.name} ${item.year}`;
        const sortCb = (a, b) => b.year > a.year;
        selectFill(raceEl, races, raceId, selectRaceText, sortCb);

        // fill driver's select box
        const selectDriverNameText = (item) => `${item.surname} ${item.forename}`;
        const driverSortCb = (a, b) => b.surname > a.surname;

        const driver1El = document.getElementById("driver1-select");
        selectFill(driver1El, filteredDrivers, raceId, selectDriverNameText, driverSortCb);

        const driver2El = document.getElementById("driver2-select");
        selectFill(driver2El, filteredDrivers, raceId, selectDriverNameText, driverSortCb);

        // package information
        const driverData = {
          laps: drivers1LapData,
          driver: driver,
        };
        const driver2Data = {
          laps: drivers2LapData,
          driver: driver2,
        };

        // process data
        driverData.laps.forEach((d) => {
          d.lap = +d.lap;
          d.position = +d.position;
          d.seconds = +d.milliseconds / 1000;
          d.time = d.time;
          // delete d.milliseconds;
          // delete d.driverId;
          // delete d.raceId;
        });

        driver2Data.laps.forEach((d) => {
          d.lap = +d.lap;
          d.position = +d.position;
          d.seconds = +d.milliseconds / 1000;
          d.time = d.time;
          // delete d.milliseconds;
          // delete d.driverId;
          // delete d.raceId;
        });

        renderGraph(svg, race, driver2Data, driverData);
      });
    });
  });
}

export default loadData;
