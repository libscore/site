(function(){
  /***************
      Elements
  ***************/

  var $header_logo = $("#header-logo"),
  $header_title = $("#header h1");

  /**************
       Init
  **************/

  $(window).load(function() {
    $.Velocity.RunSequence([
      { elements: $header_logo, properties: "transition.fadeIn", options: { delay: 100, duration: 800} },
      { elements: $header_title, properties: "transition.fadeIn", options: { delay: 250, duration: 800, sequenceQueue: false} }
    ]);
  });


  var topLibsData = [
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
  		label: "jQuery UI"
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


  var topScriptsData = [
    {
      value: 55.9,
      color:"#29bd66",
      // highlight: "#FF5A5E",
      label: "Google Analytics"
    },
    {
      value: 18.6,
      color: "#29a478",
      // highlight: "#5AD3D1",
      label: "Facebook Like Button"
    },
    {
      value: 12.1,
      color: "#298c8b",
      // highlight: "#FFC870",
      label: "Twitter Tweet Button"
    },
    {
      value: 2.7,
      color: "#29749d",
      // highlight: "#A8B3C5",
      label: "Google Maps Widget"
    },
    {
      value: 2.0,
      color: "#295cb0",
      // highlight: "#616774",
      label: "New Relic"
    },
    {
      value: 2.0,
      color: "#2a4bbd",
      // highlight: "#616774",
      label: "Pinterest Pin Button"
    },
    {
      value: 1.3,
      color: "#2a4bbd",
      // highlight: "#616774",
      label: "Adroll"
    },
    {
      value: 1.2,
      color: "#2a4bbd",
      // highlight: "#616774",
      label: "TypeKit"
    },
    {
      value: 1.2,
      color: "#2a4bbd",
      // highlight: "#616774",
      label: "LinkedIn Share Button"
    }
  ];

  var defaults = {
    tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>%",
    animateRotate: true,
    animation: true,
    animationSteps : 60,
    animationEasing : "easeOutQuad",
    percentageInnerCutout : 25,
    legendTemplate : "<ul class=\"legend\" id=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%><p><%=segments[i].value%>%</p></li><%}%></ul>"
  }

  var helpers = Chart.helpers;
  var legendHolder = document.createElement('div');

  function createChart(dataName){
    legendHolder.innerHTML = dataName.generateLegend();

    helpers.each(legendHolder.firstChild.childNodes, function (legendNode, index) {
      helpers.addEvent(legendNode, 'mouseover', function () {
        var activeSegment = dataName.segments[index];
        activeSegment.save();
        dataName.showTooltip([activeSegment]);
        activeSegment.restore();
      });

      helpers.addEvent(legendHolder.firstChild, 'mouseout', function () {
        dataName.draw();
      });
    });

    dataName.chart.canvas.parentNode.parentNode.appendChild(legendHolder.firstChild);
  }

  // Chart One - Top Libraries
  var topLib = new Chart(document.getElementById("topLib").getContext("2d")).Doughnut(topLibsData, defaults);
  createChart(topLib);

  // Chart Two - Top Scripts
  var topScript = new Chart(document.getElementById("topScript").getContext("2d")).Doughnut(topScriptsData, defaults);
  createChart(topScript);


})();