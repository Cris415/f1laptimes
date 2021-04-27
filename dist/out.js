(() => {
  // entry.js
  document.addEventListener("DOMContentLoaded", () => {
    const pTag = document.createElement("p");
    const text = document.createTextNode("Welcome!");
    pTag.appendChild(text);
    const element = document.getElementById("root");
    console.log("testing");
    element.appendChild(pTag);
  });
})();
//# sourceMappingURL=out.js.map
