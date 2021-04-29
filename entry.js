import { select } from "d3";
import loadData from './src/loadData';

document.addEventListener("DOMContentLoaded", () => {
  const svg = select('svg');


  const raceId = "1033";
  const driver1Id = "1";
  const driver2Id = "847";


  loadData(svg, raceId, driver1Id, driver2Id);
})