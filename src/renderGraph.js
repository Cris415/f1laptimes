import {
  scaleLinear,
  extent,
  axisLeft,
  axisBottom,
  select
} from "d3";

import {colorsMain, colorsAlt} from './constructorColors';
import { createLine } from './createLine';
import renderLegend from './renderLegend';

function renderGraph(svg, race, constructors, ...drivers) {
  svg.selectChildren().remove();

  // set the dimensions and margins of the graph
  const height = +svg.attr("height");
  const width = +svg.attr("width");
  const margin = { top: 50, right: 20, bottom: 70, left: 80 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const allLapData = [].concat(drivers[1].laps, drivers[0].laps);


  const xValue = (d) => d.lap;
  const xAxisLabel = "Lap";

  const yValue = (d) => d.seconds;
  const yAxisLabel = "Lap Time";

  // set the ranges
  const xScale = scaleLinear()
    .domain(extent(allLapData, xValue))
    .range([0, innerWidth])
    .clamp(true)
    .nice();

  const yScale = scaleLinear()
    .domain(extent(allLapData, yValue))
    .range([innerHeight, 0])
    .nice();

  // create main group
  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // set title
  const title = `Lap times for ${drivers[0].driver.surname} and ${drivers[1].driver.surname} at the ${race.name} ${race.year}`;
  g.append("text").attr("class", "title").attr("y", -10).text(title);

  // set axis
  const xAxis = axisBottom(xScale).tickSize(-innerHeight).tickPadding(15);

  const yAxis = axisLeft(yScale)
    .tickFormat((d) => d + "s")
    .tickSize(-innerWidth)
    .tickPadding(10);

  // set axis label
  const yAxisG = g.append("g").call(yAxis).attr("class", "axis");

  const xAxisG = g
    .append("g")
    .call(xAxis)
    .attr("class", "axis")
    .attr("transform", `translate(0, ${innerHeight})`);

  // append axis labels
  yAxisG
    .append("text")
    .attr("class", "axis-label")
    .attr("y", -60)
    .attr("x", -innerHeight / 2)
    .attr("transform", "rotate(-90)")
    .attr("text-anchor", "middle")
    .text(yAxisLabel);

  xAxisG
    .append("text")
    .attr("class", "axis-label")
    .attr("y", 50)
    .attr("x", innerWidth / 2)
    .text(xAxisLabel);

  // Iterate over driver data and create line for each driver
  // store in a lines object
  const d1Color = colorsMain[constructors["driver1"].constructorId];
  const d2Color =
    constructors["driver1"].constructorId === constructors["driver2"].constructorId
      ? colorsAlt[constructors["driver2"].constructorId]
      : colorsMain[constructors["driver2"].constructorId];

  colors = [d1Color, d2Color];

  const lines = {};
  drivers.forEach((driver, i) => {
    lines[driver.driver.code] = new createLine(
      g,
      driver.laps,
      xScale,
      yScale,
      xValue,
      yValue,
      colors[i]
    );
    lines[driver.driver.code].render();
    lines[driver.driver.code].animate();
  });

  // Circles for scatter plot
  g.selectAll("circle")
    .data(allLapData)
    .enter()
    .append("circle")
    .attr("cy", (d) => yScale(yValue(d)))
    .attr("cx", (d) => xScale(xValue(d)))
    .attr("r", 4)
    .on("mouseover", function (event, d) {
      select("#tooltip")
        .transition()
        .duration(200)
        .style("opacity", 1)
        .text(
          `DRIVER: ${d.code} TIME: ${d.time},   POS: ${d.position},   LAP: ${d.lap} `
        );
    })
    .on("mouseout", function () {
      select("#tooltip").style("opacity", 0);
    })
    .on("mousemove", function (event) {
      select("#tooltip")
        .style("left", event.pageX + 10 + "px")
        .style("top", event.pageY + 10 + "px");
    });
    
    const driversLengendInfo = {
      driver1: {
        name: drivers[0].driver.surname,
        color: colors[0],
        team: constructors["driver1"].name
      },
      driver2: {
        name: drivers[1].driver.surname,
        color: colors[1],
        team: constructors["driver2"].name
      },
    };
    
    renderLegend(driversLengendInfo);
}

export default renderGraph;
