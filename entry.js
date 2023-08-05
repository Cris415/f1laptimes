import loadRaceResultsChart from "./src/resultsTable/loadRaceResultsTable";
import loadStats from "./src/data/loadStats";
import processData from "./src/data/processData";
import changeThemeButton from "./src/changeThemeButton/changeThemeButton";

document.addEventListener("DOMContentLoaded", async () => {
  changeThemeButton();
  const selection = {
    raceId: "1098",
    year: "2023",
    driver1Id: "1",
    driver2Id: "844",
  };

  const statsArr = await loadStats().catch(console.error);

  document.querySelector(".dropdowns").addEventListener("change", (e) => {
    if (e.target.classList.contains("dropdown")) {
      switch (e.target.name) {
        case "year-select":
          selection.year = e.target.value;
          break;
        case "race-select":
          selection.raceId = e.target.value;
          loadRaceResultsChart(selection.raceId, statsArr);
          break;
        case "driver1-select":
          selection.driver1Id = e.target.value;
          break;
        case "driver2-select":
          selection.driver2Id = e.target.value;
          break;
      }
      processData(statsArr, selection);
    }
  });

  processData(statsArr, selection);
  loadRaceResultsChart(selection.raceId, statsArr);
});
