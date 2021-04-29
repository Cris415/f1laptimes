import { line, curveMonotoneX, easePoly } from 'd3';

export class createLine {
  constructor(group, data, xScale, yScale, xValue, yValue, color = "white") {
    this.group = group;
    this.data = data;
    this.color = color;
    this.lineGeneratorOutput;

    this.lineGenerator(xScale, yScale, xValue, yValue);
  }

  lineGenerator(xScale, yScale, xValue, yValue) {
    this.lineGeneratorOutput = line()
      .x((d) => xScale(xValue(d)))
      .y((d) => yScale(yValue(d)))
      .curve(curveMonotoneX);
  }

  animate() {
    const totalLength = this.path.node().getTotalLength();
    this.path
      .attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", totalLength)
      .transition()
      .duration(4500)
      .ease(easePoly)
      .attr("stroke-dashoffset", 0);
  }

  render() {
    this.path = this.group
      .append("path")
      .attr("class", "line-path")
      .style("stroke", this.color)
      .attr("d", this.lineGeneratorOutput(this.data));
    return this.path;
  }
}