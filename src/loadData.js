import { csv } from "d3";
import renderGraph from "./renderGraph";


function loadData(svg, raceId) {
  csv("data/races.csv").then((races) => {
    csv("data/drivers.csv").then((drivers) => {
      csv("data/lap_times.csv").then((laps) => {
        // Temporary filters
        const race = races.filter((race) => race.raceId === raceId)[0];
        
        const driver = drivers.filter((driver) => driver.driverId === "1")[0];
        const driver2 = drivers.filter(
          (driver) => driver.driverId === "847"
        )[0];

        const drivers1LapData = laps.filter((lap) => lap.driverId === "1" && lap.raceId === "1033");
        const drivers2LapData = laps.filter(
          (lap) => lap.driverId === "154" && lap.raceId === "1033"
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
