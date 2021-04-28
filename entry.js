import { select } from "d3";
import loadData from './src/loadData';

document.addEventListener("DOMContentLoaded", () => {
  const svg = select('svg');

  loadData(svg)
})