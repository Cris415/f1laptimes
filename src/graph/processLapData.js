function processLapData(driver, laps){

  laps.forEach((d) => {
    d.lap = +d.lap;
    d.seconds = +d.milliseconds / 1000;
    d.code = driver.code;
  });

  laps.sort((a, b) => a.lap - b.lap);

  return laps;
}

export default processLapData;