import populateSelectElement from "./populateSelectElement";
function populateDriverDropdown(driverNum, driverList, driverId) {
  const driverElement = document.getElementById(`${driverNum}-select`);
  const selectDriverNameText = (item) => `${item.forename} ${item.surname}`;
  const driverSortCb = (a, b) => b.surname - a.surname;

  populateSelectElement(
    driverElement,
    driverList,
    "driverId",
    driverId,
    selectDriverNameText,
    driverSortCb
  );
}

export default populateDriverDropdown;
