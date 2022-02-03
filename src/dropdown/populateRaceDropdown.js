import populateSelectElement from "./populateSelectElement";
function populateRaceDropdown(races, raceId) {
  const raceDropdownElement = document.getElementById("race-select");
  const selectRaceText = (item) => `${item.name}`;
  const sortCb = (a, b) => b.year - a.year;
  populateSelectElement(
    raceDropdownElement,
    races,
    "raceId",
    raceId,
    selectRaceText,
    sortCb
  );
}

export default populateRaceDropdown;
