import { csv } from "d3";
import renderGraph from "./renderGraph";


function loadData(svg) {
  csv("data/races.csv").then((races) => {
    csv("data/drivers.csv").then((drivers) => {
      csv("data/lap_times.csv").then((laps) => {
        // Temporary filters
        const race = races.filter((race) => race.raceId === "1033")[0];
        const driver = drivers.filter((driver) => driver.driverId === "1")[0];
        const driverslaps = laps.filter((lap) => lap.driverId === "1" && lap.raceId === "1033");

        // process data
        laps.forEach((d) => {
          d.lap = +d.lap;
          d.position = +d.position;
          d.seconds = +d.milliseconds / 1000;
          d.time = d.time;
          delete d.milliseconds;
          delete d.driverId;
          delete d.raceId;
        });
        renderGraph(svg, driverslaps, driver, race);
      });
    });
  });
}

export default loadData;
