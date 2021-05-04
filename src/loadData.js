import { csv } from "d3";
import renderGraph from "./renderGraph";
import fillSelectElement from "./fillSelectElement";
import {
  selectDriversFromRace,
  selectByDriverandRace,
  selectDriverById,
  selectRaceById,
} from "./selectUtil";

const raceData = [
  csv("data/lap_times.csv"),
  csv("data/circuits.csv"),
  csv("data/constructors.csv"),
  csv("data/drivers.csv"),
  csv("data/races.csv"),
  csv("data/results.csv"),
  csv("data/status.csv"),
];

function loadData(svg, raceId, driver1Id, driver2Id, selectFormItems) {
  Promise.all(raceData)
    .then(function (raceData) {
      const [lapTimes, circuits, constructors, drivers, races, results, status] = raceData;

         const race = selectRaceById(races, raceId);

         let driver1 = selectDriverById(drivers, driver1Id);
         let driver2 = selectDriverById(drivers, driver2Id);

        //  console.log("raceId",raceId, "results.length>>>", results.length);

        //  let filteredResults = results.filter(
        //    (result) => result.raceId === raceId
        //  );

         let filteredDrivers1 = selectDriversFromRace(
           lapTimes,
           drivers,
           raceId,
           driver2.driverId // don't want other driver to show up on select
         );
         let filteredDrivers2 = selectDriversFromRace(
           lapTimes,
           drivers,
           raceId,
           driver1.driverId
         );

          // if the driver's list does not include driverId from input 
          // select a driver from the list
         if (!filteredDrivers1.includes(driver1)) {
           driver1 = filteredDrivers1[0];
           filteredDrivers2 = filteredDrivers2.filter(
             (driver) => driver.driverId !== filteredDrivers1[0].driverId
           );
         }
         if (!filteredDrivers2.includes(driver2)) {
           driver2 = filteredDrivers2[1];
           filteredDrivers1 = filteredDrivers1.filter(
             (driver) => driver.driverId !== filteredDrivers2[1].driverId
           );
         }

        

         const drivers1LapData = selectByDriverandRace(
           lapTimes,
           driver1.driverId,
           raceId
         );
         const drivers2LapData = selectByDriverandRace(
           lapTimes,
           driver2.driverId,
           raceId
         );

         // fill race select box
         const filteredRaces = races.filter(
           (race) => race.year !== "2021" && +race.year > 1995
         );
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
         const selectDriverNameText = (item) =>
           `${item.forename} ${item.surname}`;
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
           d.code = driver1.code;
           delete d.milliseconds;
           delete d.driverId;
          //  delete d.raceId;
         });

         driver2Data.laps.forEach((d) => {
           d.lap = +d.lap;
           d.position = +d.position;
           d.seconds = +d.milliseconds / 1000;
           d.time = d.time;
           d.code = driver2.code;
           delete d.milliseconds;
           delete d.driverId;
          //  delete d.raceId;
         });

        

         driver2Data.laps.sort((a, b) => a.lap - b.lap);
         driverData.laps.sort((a, b) => a.lap - b.lap);
         renderGraph(svg, race, driver2Data, driverData);
        //  loadResults(raceId);

        //  raceResults(filteredResults, status, [
        //    ...filteredDrivers1,
        //    ...filteredDrivers2,
        //  ], constructors);
    })
    .catch(function (err) {
      console.log("err", err);
    });
}
export default loadData;