import { select } from 'd3';

  function renderLegend(drivers) {
    const legend = select("#legend");

    legend.selectAll("*").remove();

    const { driver1, driver2 } = drivers;
    const legend1 = legend.append("div").attr("class", "legend-container");

    legend1
      .append("div")
      .attr("class", "legend-color")
      .style("background-color", driver1.color);

    legend1
    .append("p").text(`${driver1.name} (${driver1.team})`);
    
    const legend2 = legend.append("div").attr("class", "legend-container");

    legend2
      .append("div")
      .attr("class", "legend-color")
      .style("background-color", driver2.color);

    legend2.append("p").text(`${driver2.name} (${driver2.team})`);

  }

  export default renderLegend;