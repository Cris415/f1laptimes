import { select } from "d3";
import loadData from './src/loadData';

document.addEventListener("DOMContentLoaded", () => {
  const svg = select('svg');
  const raceEl = document.getElementById("race-select");
  const driver1El = document.getElementById("driver1-select");
  const driver2El = document.getElementById("driver2-select");

  const selectFormItems = {
    race: raceEl,
    driver1: driver1El,
    driver2: driver2El
  }

  function resetForms(){
    svg.selectChildren().remove();
    [...driver1El.children].forEach((child) => child.remove());
    [...driver2El.children].forEach((child) => child.remove());
    [...raceEl.children].forEach((child) => child.remove());
  }

  raceEl.addEventListener("change", (e) => {
    e.preventDefault();
    raceId = e.currentTarget.value;
    resetForms();

    loadData(svg, raceId, driver1Id, driver2Id, selectFormItems);
  });

  driver1El.addEventListener("change", (e) => {
    e.preventDefault();
    driver1Id = e.currentTarget.value;
    resetForms();
    loadData(svg, raceId, driver1Id, driver2Id, selectFormItems);
  })
  driver2El.addEventListener("change", (e) => {
    e.preventDefault();
    driver2Id = e.currentTarget.value;
    
    resetForms();
    loadData(svg, raceId, driver1Id, driver2Id, selectFormItems);
  })



  let raceId = "1033";
  let driver1Id = "1"
  let driver2Id = "847";


  loadData(svg, raceId, driver1Id, driver2Id, selectFormItems);
})