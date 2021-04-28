import {
  scaleLinear,
  extent,
  axisLeft,
  axisBottom,
  line,
  easePoly,
  curveMonotoneX,
} from "d3";

function renderGraph(svg, lapData, driver, race) {
  // set the dimensions and margins of the graph
  const height = +svg.attr("height");
  const width = +svg.attr("width");
  const margin = { top: 50, right: 20, bottom: 70, left: 80 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xValue = (d) => d.lap;
  const xAxisLabel = "Lap";

  const yValue = (d) => d.seconds;
  const yAxisLabel = "Lap time";

  // set the ranges
  const xScale = scaleLinear()
    .domain(extent(lapData, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(lapData, yValue))
    .range([innerHeight, 0])
    .nice();

  //
  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // set title
  const title = "Lap times for one race / driver";
  g.append("text").attr("class", "title").attr("y", -10).text(title);

  // set axis
  const xAxis = axisBottom(xScale).tickSize(-innerHeight).tickPadding(15);

  const yAxis = axisLeft(yScale)
    .tickFormat((d) => d + "s")
    .tickSize(-innerWidth)
    .tickPadding(10);

  // set axis label
  const yAxisG = g.append("g").call(yAxis).attr("class", "axis");
  yAxisG.selectAll(".domain").remove();

  yAxisG
    .append("text")
    .attr("class", "axis-label")
    .attr("y", -60)
    .attr("x", -innerHeight / 2)
    .attr("fill", "black")
    .attr("transform", "rotate(-90)")
    .attr("text-anchor", "middle")
    .text(yAxisLabel);

  const xAxisG = g
    .append("g")
    .call(xAxis)
    .attr("class", "axis")
    .attr("transform", `translate(0, ${innerHeight})`);

  xAxisG.select(".domain").remove();

  xAxisG
    .append("text")
    .attr("class", "axis-label")
    .attr("y", 50)
    .attr("x", innerWidth / 2)
    .attr("fill", "black")
    .text(xAxisLabel);

  const lineGenerator = line()
    .x((d) => xScale(xValue(d)))
    .y((d) => yScale(yValue(d)))
    .curve(curveMonotoneX);

  const path = g
    .append("path")
    .attr("class", "line-path")
    .attr("d", lineGenerator(lapData));

  // Animation code
  const totalLength = path.node().getTotalLength();
  path
    .attr("stroke-dasharray", totalLength + " " + totalLength)
    .attr("stroke-dashoffset", totalLength)
    .transition()
    .duration(4000)
    .ease(easePoly)
    .attr("stroke-dashoffset", 0);

  // Circles for scatter plot
  g.selectAll("circle")
    .data(lapData)
    .enter()
    .append("circle")
    .attr("cy", (d) => yScale(yValue(d)))
    .attr("cx", (d) => xScale(xValue(d)))
    .attr("r", 2);
}

export default renderGraph;
