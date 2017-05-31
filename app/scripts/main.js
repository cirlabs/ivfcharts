// load modules like so:
var social = require('./social');
const Triplets = require('./triplets.js');
window.Triplets = Triplets;

// http://youmightnotneedjquery.com/ IE9+ loading
function ready(fn) {
  if (document.readyState != 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

var main = {
  init: function() {
    social.init();
    main.makeCharts();
  },
  makeCharts: function(){
    console.log("making charts");
    const myChart = Triplets.create({
      el: "#triplets"
    });
    myChart.draw();
    window.myChart = myChart;
  }
};


ready(main.init);
