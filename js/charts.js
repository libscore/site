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

  var topLibsData = {
    labels: ["jQuery", "jQuery UI", "Modernizr", "Ajax Form", "Fancy Box", "Carousel"],
    datasets: [
      {
          fillColor: "rgba(41,189,102,1)",
          strokeColor: "rgba(220,220,220,0.8)",
          highlightFill: "rgba(41,189,102,0.7)",
          highlightStroke: "rgba(220,220,220,1)",
          data: [63.4, 17.6, 10.9, 8.7, 7.9, 7.3]
      }
    ]
  };

  // var topLibsData = [
  // 	{
  // 		value: 63.4,
  // 		color:"#29bd66",
  // 		// highlight: "#FF5A5E",
  // 		label: "jQuery"
  // 	},
  // 	{
  // 		value: 17.6,
  // 		color: "#29a478",
  // 		// highlight: "#5AD3D1",
  // 		label: "jQuery UI"
  // 	},
  // 	{
  // 		value: 10.9,
  // 		color: "#298c8b",
  // 		// highlight: "#FFC870",
  // 		label: "Modernizr"
  // 	},
  // 	{
  // 		value: 8.7,
  // 		color: "#29749d",
  // 		// highlight: "#A8B3C5",
  // 		label: "Ajax For"
  // 	},
  // 	{
  // 		value: 7.9,
  // 		color: "#295cb0",
  // 		// highlight: "#616774",
  // 		label: "Fancy Box"
  // 	},
  //   {
  //     value: 7.3,
  //     color: "#2a4bbd",
  //     // highlight: "#616774",
  //     label: "Carousel"
  //   }
  // ];

  // var topScriptsData = {
  //   labels: ["Google Analytics", "Facebook Like Button", "Twitter Tweet Button", "Google Maps Widget", "New Relic", "Pinterest Pin Button", "Adroll", "Typekit", "LinkedIn Share Button"],
  //   datasets: [
  //     {
  //         fillColor: "rgba(220,220,220,0.5)",
  //         strokeColor: "rgba(220,220,220,0.8)",
  //         highlightFill: "rgba(220,220,220,0.75)",
  //         highlightStroke: "rgba(220,220,220,1)",
  //         data: [55.9, 18.6, 12.1, 2.7, 2.0, 2.0, 1.3, 1.2, 1.2]
  //     }
  //   ]
  // };

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

  var topMVCData = [
    {
      value: .79,
      color:"#29bd66",
      // highlight: "#FF5A5E",
      label: "Backbone"
    },
    {
      value: .49,
      color: "#29a478",
      // highlight: "#5AD3D1",
      label: "Angular"
    },
    {
      value: .2,
      color: "#295cb0",
      // highlight: "#616774",
      label: "Knockout"
    },
    {
      value: .002,
      color: "#298c8b",
      // highlight: "#FFC870",
      label: "React"
    },
    {
      value: .0018,
      color: "#29749d",
      // highlight: "#A8B3C5",
      label: "Ember"
    }
  ];

  var donutDefaults = {
    tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>%",
    animateRotate: true,
    animation: true,
    segmentStrokeColor : "#f2f2f2",
    animationSteps : 60,
    animationEasing : "easeOutQuad",
    percentageInnerCutout : 57,
    legendTemplate : "<ul class=\"legend\" id=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><p class=\"metric\"><%if(segments[i].label){%><%=segments[i].label%><%}%></p><p class=\"value\"><%=segments[i].value%>%</p></li><%}%></ul>"
  }

  var barDefaults = {
    tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>%",
    animateRotate: true,
    animation: true,
    scaleShowGridLines: false,
    scaleGridLineColor : "rgba(0,0,0,.15)",
    barShowStroke : false,
    barStrokeWidth : 2,
    barValueSpacing : 5,
    barDatasetSpacing : 3,
    animationEasing : "easeOutQuad",
    //legendTemplate : "<ul class=\"legend\" id=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><p class=\"metric\"><%if(datasets[i].label){%><%=datasets[i].label%><%}%></p><p class=\"value\"><%=datasets[i].value%>%</p></li><%}%></ul>"
  }

  var helpers = Chart.helpers;
  var legendHolder = document.createElement('div');

  function createLegend(dataName){
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
  var topLib = new Chart(document.getElementById("topLib").getContext("2d")).Bar(topLibsData, barDefaults);

  // Chart Two - Top Scripts
  var topScript = new Chart(document.getElementById("topScript").getContext("2d")).Doughnut(topScriptsData, donutDefaults);
  createLegend(topScript);

  //Chart Two - Top MVC
  var topMVC = new Chart(document.getElementById("topMVC").getContext("2d")).Doughnut(topMVCData, donutDefaults);
  createLegend(topMVC);



  //var myBarChart = new Chart(document.getElementById("topMVC").getContext("2d")).Bar(jesse, donutDefaults);


})();