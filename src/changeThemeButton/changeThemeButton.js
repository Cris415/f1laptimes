function changeThemeButton() {
  const button = document.getElementById("theme-btn");
  let defaultTheme = true;
  const miami = {
    lynxWhite: "#f9f6f8",
    maldives: "#04bbe2",
    kisses: "#fb6bbb",
    gold: "#edab30",
    purple: "#2c2659",
    graphPink: "#fcd1e9ba",
    graphBlue: "#d2fcffd0",
  };

  const defaultColors = {
    racingRed: "rgb(221, 56, 18)",
    leftHeaderColor: "rgb(103, 64, 64)",
  };
  function changeColor(cssVar, color) {
    document.documentElement.style.setProperty(cssVar, color);
  }

  button.addEventListener("click", () => {
    if (defaultTheme) {
      //change bg to gradient
      changeColor(
        "--main-bg-color",
        "linear-gradient(0, #241d58eb 86%,#fb6bbb 90%)"
      );

      changeColor('--primary-color', miami.kisses)
      
      // Change top gradient
      changeColor("--left-header-color", miami.kisses);
      changeColor("--right-header-color", miami.gold);
      
      // Change graph gradient
      changeColor("--svg-gradient-left", miami.graphBlue);
      changeColor("--svg-gradient-right", miami.graphPink);
      changeColor("--deg", "0");
      defaultTheme = !defaultTheme;
    } else {
      changeColor('--primary-color', defaultColors.racingRed)
      // Change background color
      changeColor("--main-bg-color", "rgb(245, 243, 240)");
      // Change top gradient
      changeColor("--left-header-color", defaultColors.leftHeaderColor);
      changeColor("--right-header-color", defaultColors.racingRed);

      // Change graph gradient
      changeColor("--svg-gradient-left", miami.lynxWhite);
      changeColor("--svg-gradient-right", miami.lynxWhite);
      changeColor("--deg", "90deg");
      defaultTheme = !defaultTheme;
    }
  });
}

export default changeThemeButton;
