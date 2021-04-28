import { csv, 
  select, 
  scaleLinear, 
  extent, 
  axisLeft, 
  axisBottom, 
  line, 
  curveBasis, 
  } from "d3";

document.addEventListener("DOMContentLoaded", () => {
  const svg = select('svg');
  const height = +svg.attr('height');
  const width = +svg.attr('width');


  const render = (data) => {
    const title = "Lap times for one race / driver";

    const xValue = (d) => d.lap;
    const xAxisLabel = 'Lap';

    const yValue = (d) => d.milliseconds;
    const yAxisLabel = "Lap time";

    const margin = { top: 20, right: 20, bottom: 100, left: 100 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = scaleLinear()
      // const xScale = scaleTime() is a lap time actual time? probably not
      .domain(extent(data, xValue))
      .range([1, innerWidth])
      .nice();

     const yScale = scaleLinear()
       .domain(extent(data, yValue))
       .range([innerHeight, 0])
       .nice();

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

    const xAxis = axisBottom(xScale)
      .tickSize(-innerHeight)
      .tickPadding(15);

    const yAxis = axisLeft(yScale)
      .tickSize(-innerWidth)
      .tickPadding(10);

    const yAxisG = g.append('g').call(yAxis);
    yAxisG.selectAll('.domain').remove();

    yAxisG
      .append("text")
      .attr("class", "axis-label")
      .attr("y", -10)
      .attr("x", -innerHeight / 2)
      .attr("fill", "black")
      .attr("transform", "rotate(-90")
      .attr("text-anchor", "middle")
      .text(yAxisLabel);

    const xAxisG = g.append('g').call(xAxis)
      .attr('transform', `translate(0, ${innerHeight})`);

    xAxisG.select('.domain').remove();

    xAxisG.append('text')
      .attr('class', 'axis-label')
      .attr('y', 75)
      .attr('x', innerWidth /2)
      .attr('fill', 'black')
      .text(xAxisLabel);

    const lineGenerator = line()
      .x((d) => xScale(xValue(d)))
      .y((d) => yScale(yValue(d)))
      .curve(curveBasis);

    g.append('path')
      .attr('class', 'line-path')
      .attr('d', lineGenerator(data));

    // Circles from scatter plot
    // g.selectAll('circle').data(data)
    //   .enter().append('circle')
    //   .attr('cy', d => yScale(yValue(d)))
    //   .attr('cx', d => xScale(xValue(d)))
    //   .attr('r', circleRadius);

    g.append('text')
      .attr('class', 'title')
      .attr('y', -10)
      .text(title);
  };

  csv('data/races.csv').then(races => {
    csv('data/drivers.csv').then(drivers => {
      const race = races.filter(race => race.raceId === "1033")[0];
      const driver = drivers.filter(driver => driver.driverId === "1")[0];
      csv('data/lap_times.csv').then(laps => {
        const driverslaps = laps.filter(lap => lap.driverId === "1" && lap.raceId === "1033");
        laps.forEach(d => {
          d.lap = +d.lap;
          d.position = +d.position;
          d.milliseconds = +d.milliseconds;
          d.time = d.time;
          delete d.driverId;
          delete d.raceId;
        });
        render(driverslaps, driver, race);
      });
    });
  })
})