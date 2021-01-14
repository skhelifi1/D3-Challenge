// @TODO: YOUR CODE HERE!
var svgWidth = 1000;
var svgHeight = 600;
var margin = {
    top: 90,
    right: 100,
    bottom: 50,
    left: 100
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
        .range([0, svgWidth]);
    
      // Create a scale for your dependent (y) coordinates
    var yScale = d3.scaleLinear()
        .domain([0, d3.max(dataInfo, d => d.smokes)])
        .range([svgHeight, 0]);

    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);

    svg.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(xAxis);

    svg.append("g")
        .attr("transform", "translate(10,-140)")
        .call(yAxis);

    
      // Append a path element to the svg, make sure to set the stroke, stroke-width, and fill attributes.
    svg.selectAll("circle")
        .data(dataInfo)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return xScale(d.income); } )
        .attr("cy", function (d) { return yScale(d.smokes); } )
        .attr("r", function (d) { return Math.log(d.income) * 30;})
        .attr("stroke", "black")
        .style("fill", "#69b3a2")
        .append("text").text(function(d) { 
        //console.log(d.abbr)
    
        return xScale(d.abbr);
        
     })
        // .attr("x", function (d) { return xAxis(d.income); })
        // .attr("y", function (d) { return yAxis(d.smokes); });
    
    }).catch(function(error) {
      console.log(error);
    });
    
