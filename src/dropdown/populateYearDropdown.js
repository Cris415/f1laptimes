import populateSelectElement from "./populateSelectElement";
import { reduceRaceYears } from "../data/selectDataUtil";
function populateYearDropdown(races, selectedYear) {
  const years = reduceRaceYears(races);
  const selectYearText = (year) => `${year}`;
  const yearSort = (a, b) => b - a;
  const selectYearElement = document.getElementById("year-select");

  populateSelectElement(
    selectYearElement,
    years,
    "year",
    selectedYear.toString(),
    selectYearText,
    yearSort
  );
}

export default populateYearDropdown;
