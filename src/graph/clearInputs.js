import { select } from "d3";

export function clearInputChildren(...elements) {
  elements.forEach((el) => {
    [...el.children].forEach((child) => {
      child.remove()});
  });
}

export function clearInputsAndGraph(...elements) {
  const svg = select("svg");
  svg.selectChildren().remove();
  clearInputChildren(...elements);
}
