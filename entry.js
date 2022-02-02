import loadResults from "./src/loadResults";
import loadStats from "./src/loadStats";
import processData from "./src/processData";

document.addEventListener("DOMContentLoaded", async () => {
  let raceId = "1052";
  let year = "2021";
  let driver1Id = "1";
  let driver2Id = "844";

  const statsArr = await loadStats().catch(console.error);

  document.querySelector(".dropdowns").addEventListener("change", (e) => {
    if (e.target.classList.contains("dropdown")) {
      switch (e.target.name) {
        case "year-select":
          year = e.target.value;
          break;
        case "race-select":
          raceId = e.target.value;
          loadResults(raceId, statsArr);
          break;
        case "driver1-select":
          driver1Id = e.target.value;
          break;
        case "driver2-select":
          driver2Id = e.target.value;
          break;
      }

      processData(
        statsArr,
        raceId,
        year,
        driver1Id,
        driver2Id,
      );
    }
  });

  processData(statsArr, raceId, year, driver1Id, driver2Id);
  loadResults(raceId, statsArr);
});
