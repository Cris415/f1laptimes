import { select } from "d3";
import loadResults from "./src/loadResults";
import loadStats from "./src/loadStats";
import processData from "./src/processData";

document.addEventListener("DOMContentLoaded", async () => {
  const yearEl = document.getElementById("year-select");
  const raceEl = document.getElementById("race-select");
  const driver1El = document.getElementById("driver1-select");
  const driver2El = document.getElementById("driver2-select");

  let raceId = "1052";
  let year = "2021";
  let driver1Id = "1";
  let driver2Id = "844";

  const dropdownElements = {
    year: yearEl,
    race: raceEl,
    driver1: driver1El,
    driver2: driver2El,
  };
  const statsArr = await loadStats().catch(console.error);

  yearEl.addEventListener("change", (e) => {
    e.preventDefault();
    year = e.currentTarget.value;

    processData(
      statsArr,
      raceId,
      year,
      driver1Id,
      driver2Id,
      dropdownElements
    );
  });

  raceEl.addEventListener("change", (e) => {
    e.preventDefault();
    raceId = e.currentTarget.value;

    processData(
      statsArr,
      raceId,
      year,
      driver1Id,
      driver2Id,
      dropdownElements
    );
    loadResults(raceId, statsArr);
  });

  driver1El.addEventListener("change", (e) => {
    e.preventDefault();
    driver1Id = e.currentTarget.value;

    processData(
      statsArr,
      raceId,
      year,
      driver1Id,
      driver2Id,
      dropdownElements
    );
  });

  driver2El.addEventListener("change", (e) => {
    e.preventDefault();
    driver2Id = e.currentTarget.value;

    processData(
      statsArr,
      raceId,
      year,
      driver1Id,
      driver2Id,
      dropdownElements
    );
  });

  processData(
    statsArr,
    raceId,
    year,
    driver1Id,
    driver2Id,
    dropdownElements
  );
  loadResults(raceId, statsArr);
});
