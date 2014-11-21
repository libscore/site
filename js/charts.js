(function(){
  /***************
      Elements
  ***************/

  var $header_logo = $("#header-logo");

  /**************
       Init
  **************/

  $(window).load(function() {
    $.Velocity.RunSequence([
      { elements: $header_logo, properties: "transition.fadeIn", options: { delay: 100, duration: 800} }
    ]);
  });


  var doughnutData = [
  	{
  		value: 63.4,
  		color:"#29bd66",
  		// highlight: "#FF5A5E",
  		label: "jQuery"
  	},
  	{
  		value: 17.6,
  		color: "#29a478",
  		// highlight: "#5AD3D1",
  		label: " jQuery UI"
  	},
  	{
  		value: 10.9,
  		color: "#298c8b",
  		// highlight: "#FFC870",
  		label: "Modernizr"
  	},
  	{
  		value: 8.7,
  		color: "#29749d",
  		// highlight: "#A8B3C5",
  		label: "Ajax For"
  	},
  	{
  		value: 7.9,
  		color: "#295cb0",
  		// highlight: "#616774",
  		label: "Fancy Box"
  	},
    {
      value: 7.3,
      color: "#2a4bbd",
      // highlight: "#616774",
      label: "Carousel"
    }
  ];

  // shows legend but not tooltip
  // window.onload = function(){
  // 	var ctx = document.getElementById("chart-area").getContext("2d");
  //   window.myDoughnut = new Chart(ctx).Doughnut(doughnutData, {
  //     responsive : true,
  //     legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
  //   });

  //   document.getElementById('my-doughnut-legend').innerHTML = myDoughnut.generateLegend();
  // };

  var helpers = Chart.helpers;
  var topLib = new Chart(document.getElementById("topLib").getContext("2d")).Doughnut(doughnutData, {
      tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>%",
      animateRotate: true,
      animation: false,
      legendTemplate : "<ul class=\"legend\" id=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"

  });

  var legendHolder = document.createElement('div');
  legendHolder.innerHTML = topLib.generateLegend();

  helpers.each(legendHolder.firstChild.childNodes, function (legendNode, index) {
    helpers.addEvent(legendNode, 'mouseover', function () {
      var activeSegment = topLib.segments[index];
      activeSegment.save();
      topLib.showTooltip([activeSegment]);
      activeSegment.restore();
    });
  });

  helpers.addEvent(legendHolder.firstChild, 'mouseout', function () {
    topLib.draw();
  });

  topLib.chart.canvas.parentNode.parentNode.appendChild(legendHolder.firstChild);


})();