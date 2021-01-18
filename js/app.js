// @TODO: YOUR CODE HERE!
var svgWidth = 1000;
var svgHeight = 800;
var margin = {
    top: 60,
    right: 10,
    bottom: 120,
    left: 80
  };
  
  // chart area minus margins
  var chartHeight = svgHeight - margin.top - margin.bottom;
  var chartWidth = svgWidth - margin.left - margin.right;
// create an SVG element
var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .attr("transform", "translate(10,100)");

var chartGroup = svg.append("g")
.attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("data/data.csv").then (function(dataInfo) {

    // var state= d3.data.state;
    dataInfo.forEach(function(data) {
        data.smokes = +data.smokes;
        data.income = +data.income;
        data.age = +data.age;
        data.healthcare = +data.healthcare;
        data.obesity = +data.obesity;
        data.poverty = +data.poverty;
      });
    
      // Create a scale for your independent (x) coordinates
    var xScale = d3.scaleLinear()
        .domain(d3.extent(dataInfo, d => d.income))
        .range([0, chartWidth]);
    
      // Create a scale for your dependent (y) coordinates
    var yScale = d3.scaleLinear()
        .domain([0, d3.max(dataInfo, d => d.smokes)])
        .range([chartHeight, 0]);

    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);

    chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(xAxis)
        .append("text")
        .text("Income")
        .attr("transform", `translate(${chartWidth/2}, 30)`)
        .attr("font-family", "sans-serif")
        .attr("font-size", "30px")
        .attr("color", "black");

    chartGroup.append("g")
        .attr("transform", "translate(10,0)")
        .call(yAxis)
        .append("text")
        .text("Smoking %")
        .attr("transform", `translate(${chartHeight/2}, 10)`)
        // .attr("font-family", "sans-serif")
        // .attr("font-size", "30px")
        // .attr("color", "black");;

    
      // Append a path element to the svg, make sure to set the stroke, stroke-width, and fill attributes.
    chartGroup.selectAll("circle")
        .data(dataInfo)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return xScale(d.income); } )
        .attr("cy", function (d) { return yScale(d.smokes); } )
        .attr("r", function (d) { return Math.log(d.income);})
        .attr("stroke", "black")
        .style("fill", "#69b3a2")
        .append("text")
        .text(function(d) {
          return `${d.abbr}`;
        })
        .attr("dx", function(d) {           
            return xScale(d.income);
        })
        .attr("text-anchor", "middle")
        .attr("dy", function(d) {
            return yScale(d.smokes);
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "10px")
        .attr("fill", "red");

                          
    
    }).catch(function(error) {
      console.log(error);
    });
    
