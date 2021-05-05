import { select } from "d3";
import { clearInputsAndGraph } from "./src/clearInputs";
import loadResults from "./src/loadResults";
import loadStats from './src/loadStats';
import processData from './src/processData';


document.addEventListener("DOMContentLoaded", async () => {
  const svg = select('svg');
  const raceEl = document.getElementById("race-select");
  const driver1El = document.getElementById("driver1-select");
  const driver2El = document.getElementById("driver2-select");
  const table = document.getElementById("race-results");

  const selectFormItems = {
    race: raceEl,
    driver1: driver1El,
    driver2: driver2El,
    table
  }

  const statsArr = await loadStats().catch(console.error);


  raceEl.addEventListener("change", (e) => {
    e.preventDefault();
    raceId = e.currentTarget.value;
    clearInputsAndGraph(...Object.values(selectFormItems));

    processData(svg, statsArr, raceId, driver1Id, driver2Id, selectFormItems);
    loadResults(raceId);
  });

  driver1El.addEventListener("change", (e) => {
    e.preventDefault();
    driver1Id = e.currentTarget.value;
    clearInputsAndGraph(driver1El, driver2El, raceEl);

    processData(svg, statsArr, raceId, driver1Id, driver2Id, selectFormItems);
  });

  driver2El.addEventListener("change", (e) => {
    e.preventDefault();
    driver2Id = e.currentTarget.value;
    
    clearInputsAndGraph(driver1El, driver2El, raceEl);
    processData(svg, statsArr, raceId, driver1Id, driver2Id, selectFormItems);
  });



  let raceId = "1033";
  let driver1Id = "1"
  let driver2Id = "847";


  loadResults(raceId);
  processData(svg, statsArr, raceId, driver1Id, driver2Id, selectFormItems);
})