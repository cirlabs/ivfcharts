var d3 = require('d3');
window.d3 = d3;
var births = require('./data.json');
window.births = births;

var Chart = {
  // these defaults may be overridden by the create method
  margin: {
    "top": 45,
    "right": 20,
    "bottom": 45,
    "left": 85
  },
  // provide option to override default
  create: function(opts) {
    console.log("creating");
    var instance = Object.create(this);
    Object.keys(opts)
      .forEach(function(key) {
        // set the value of each instance VAR to the value of the config KEY
        instance[key] = opts[key];
      });
    return instance;
  },
  // these paramaters are calculated after chart creation
  calculateParamaters: function() {

    var elWidth = document.querySelector(this.el)
      .clientWidth;

    console.log(`width = ${elWidth}`);

    this.width = elWidth - this.margin.left - this.margin.right;

    this.height = (this.width * 0.85) - this.margin.top - this.margin.bottom;

    var parseTime = d3.timeParse("%Y");
    // coerce to num
    births.forEach(function(d, i) {
      d.year = parseTime(d.year);
      d.total = +(d.total);
      d.twin = +d.twin;
      d.triplet = +d.triplet;
      return d;
    });

  },
  // CHART BUILDING
  createScales: function() {
    console.log("creating scales");
    var that = this;

    var extent = d3.extent(births, function(d) {
      return d.triplet;
    });

    // outflow
    this.yScale = d3.scaleLinear()
      .domain([0, d3.max(births, function(d){ return d.triplet; })])
      .range([this.height, 0])
      .nice();


    // date
    this.xScale = d3.scaleTime()
      .domain(d3.extent(births, function(d) { return d.year; }))
      .range([0, this.width]);

  },
  addAxes: function() {
    const that = this;

    // define x axis
    var xAxis = d3.axisBottom()
      .scale(this.xScale);

    // apply axis
    this.plot.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .attr("class", "xaxis")
      .call(xAxis);

    // define y axis
    var yAxis = d3.axisLeft()
      .scale(this.yScale);

    // apply y axis
    this.plot.append("g")
      .attr("transform", "translate(0, 0)")
      .attr("class", "yaxis")
      .call(yAxis);
    
    // function to make grid lines
    function make_y_gridlines(){
      return d3.axisLeft(that.yScale)
        .ticks();
    }

    this.plot.append("g")
      .attr("class", "grid")
      .call(make_y_gridlines()
          .tickSize(-this.width)
          .tickFormat("")
      );
  },
  // make the svg
  drawPlot: function() {
    console.log("drawing svg");

    // clear el
    document.querySelector(this.el)
      .innerHTML = '';

    // build svg
    this.svg = d3.select(this.el)
      .append("svg")
      .attr("width", this.width + this.margin.left + this.margin.right)
      .attr("height", this.height + this.margin.top + this.margin.bottom)

    this.plot = this.svg
      .append("g")
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
  },
  drawData: function() {
    console.log("drawing line");
    var that = this;

    var line = d3.line()
      .x(function(d) { return that.xScale(d.year); })
      .y(function(d) {
        return that.yScale(d.triplet);
      });

    this.plot.append('path')
      .datum(births)
      .attr("fill", "none")
      .attr("stroke-linecap", "round")
      //.style('stroke', "orange")
      .attr("class", "line")
      .attr("d", line);
  },
  addLabels: function(){
    this.svg.append("text")
      .attr('text-anchor', 'middle')
      .attr('y', 6)
      .attr("x", -(this.height/2))
      .attr('dy', '.75em')
      .attr('transform', 'rotate(-90)')
      .text('Births');
  
  },
  draw: function() {
    this.calculateParamaters();
    this.drawPlot();
    this.createScales();
    this.addAxes();
    this.drawData();
    this.addLabels();
  },
  // public methods here:
  resize: function(w) {
    this.maxWidth = w;
    this.draw();
  }

};

module.exports = Chart
