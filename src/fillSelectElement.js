import { clearInputChildren } from './clearInputs';

function fillSelectElement(element, data, value, id, textCb, sortCb = (a, b) => a - b) {
  clearInputChildren(element);
  data
    .sort((a, b) => sortCb(a, b))
    .forEach((item) => {
      option = document.createElement("option");
      option.setAttribute("value", item[value] ? item[value] : item);
      option.appendChild(document.createTextNode(textCb(item)));
      element.appendChild(option);
    });
  element.value = id.toString();
}

export default fillSelectElement;