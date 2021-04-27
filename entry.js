import * as d3 from "d3";
document.addEventListener("DOMContentLoaded", () => {
  const pTag = document.createElement("p");
  const text = document.createTextNode("Welcome!");
  pTag.appendChild(text);
  const element = document.getElementById("root");
  element.appendChild(pTag);

});
