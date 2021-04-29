import { csv } from "d3";
import renderGraph from "./renderGraph";
import fillSelectElement from "./fillSelectElement";
import {
  selectDriversFromRace,
  selectByDriverandRace,
  selectDriverById,
  selectRaceById,
} from "./selectUtil";

function loadData(svg, raceId, driver1Id, driver2Id, selectFormItems) {
  csv("data/races.csv").then((races) => {
    csv("data/drivers.csv").then((drivers) => {
      csv("data/lap_times.csv").then((laps) => {
        const race = selectRaceById(races, raceId);

        const driver1 = selectDriverById(drivers, driver1Id);
        const driver2 = selectDriverById(drivers, driver2Id);

        const drivers1LapData = selectByDriverandRace(laps, driver1.driverId, raceId)
        const drivers2LapData = selectByDriverandRace(laps, driver2.driverId, raceId)

        const filteredDrivers1 = selectDriversFromRace(laps, drivers, raceId, driver2.driverId);
        const filteredDrivers2 = selectDriversFromRace(laps, drivers, raceId, driver1.driverId);

        // fill race select box
        const filteredRaces = races.filter((race) => race.year !== "2021"); 
        const selectRaceText = (item) => `${item.name} ${item.year}`;
        const sortCb = (a, b) => b.year - a.year;
        fillSelectElement(
          selectFormItems.race,
          filteredRaces,
          "raceId",
          raceId,
          selectRaceText,
          sortCb
        );

        // fill driver's select box
        const selectDriverNameText = (item) => `${item.surname} ${item.forename}`;
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

        // package information
        const driverData = {
          laps: drivers1LapData,
          driver: driver1,
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

        driver2Data.laps.sort((a,b) => a.lap - b.lap);
        driverData.laps.sort((a,b) => a.lap - b.lap);
        renderGraph(svg, race, driver2Data, driverData);
      });
    });
  });
}

export default loadData;
