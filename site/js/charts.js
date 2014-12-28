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
        fillColor: "#dfdfdf",
        highlightFill: "#29bd66",
        data: [63.4, 17.6, 10.9, 8.7, 7.9, 7.3]
      }
    ]
  };

  var topABData = {
    labels: ["Optimizely", "Visual Website Opt."],
    datasets: [
      {
        fillColor: "#dfdfdf",
        highlightFill: "#29bd66",
        data: [.86, .59]
      }
    ]
  };

  var topChatData = {
    labels: ["Zopim", "Olark", "LiveChat"],
    datasets: [
      {
        fillColor: "#dfdfdf",
        highlightFill: "#29bd66",
        data: [.94, .44, .34]
      }
    ]
  };

  var topCMSData = {
    labels: ["Wordpress", "Blogger", "Shopify", "Squarespace"],
    datasets: [
      {
        fillColor: "#dfdfdf",
        highlightFill: "#29bd66",        
        data: [4.2, 2.0, .28, .14]
      }
    ]
  };

  var topScriptsData = [
    {
      value: 55.9,
      color:"#1ea866",
      // highlight: "#FF5A5E",
      label: "Google Analytics"
    },
    {
      value: 18.6,
      color: "#2fb977",
      // highlight: "#5AD3D1",
      label: "Facebook Like Button"
    },
    {
      value: 12.1,
      color: "#42c687",
      // highlight: "#FFC870",
      label: "Twitter Tweet Button"
    },
    {
      value: 2.7,
      color: "#60d39c",
      // highlight: "#A8B3C5",
      label: "Google Maps Widget"
    },
    {
      value: 2.0,
      color: "#85e0b4",
      // highlight: "#616774",
      label: "New Relic"
    },
    {
      value: 2.0,
      color: "#a9eecd",
      // highlight: "#616774",
      label: "Pinterest Pin Button"
    },
    {
      value: 1.3,
      color: "#c3f5dd",
      // highlight: "#616774",
      label: "Adroll"
    },
    {
      value: 1.2,
      color: "#c3f5dd",
      // highlight: "#616774",
      label: "Typekit"
    }
  ];

  var topMVCData = [
    {
      value: .79,
      color:"#1ea866",
      // highlight: "#FF5A5E",
      label: "Backbone (Backbone)"
    },
    {
      value: .49,
      color: "#2fb977",
      // highlight: "#5AD3D1",
      label: "Angular (angular)"
    },
    {
      value: .2,
      color: "#42c687",
      // highlight: "#616774",
      label: "Knockout (KO)"
    },
    {
      value: .002,
      color: "#60d39c",
      // highlight: "#FFC870",
      label: "React (React)"
    }
  ];

  var topAnalyticsData = [
    {
      value: 55.9,
      color:"#1ea866",
      // highlight: "#FF5A5E",
      label: "Google Analytics"
    },
    {
      value: 2.2,
      color: "#2fb977",
      // highlight: "#5AD3D1",
      label: "Scorecard Research"
    },
    {
      value: 1.9,
      color: "#42c687",
      // highlight: "#616774",
      label: "StatCounter"
    },
    {
      value: 1.4,
      color: "#60d39c",
      // highlight: "#FFC870",
      label: "Histats"
    },
    {
      value: .75,
      color: "#85e0b4",
      // highlight: "#A8B3C5",
      label: "Alexa"
    },
    {
      value: .62,
      color: "#a9eecd",
      // highlight: "#A8B3C5",
      label: "Clicky"
    },
    {
      value: .56,
      color: "#c3f5dd",
      // highlight: "#A8B3C5",
      label: "Chartbeat"
    },
    {
      value: .36,
      color: "#d5f6e6",
      // highlight: "#A8B3C5",
      label: "Mixpanel"
    }
  ];

  var donutDefaults = {
    tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>%",
    animateRotate: true,
    animation: true,
    segmentShowStroke : false,
    animationSteps : 80,
    animationEasing : "easeOutQuad",
    percentageInnerCutout : 60,
    segmentStrokeWidth : 0,
    legendTemplate : "<ul class=\"legend\" id=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><p class=\"metric\"><%if(segments[i].label){%><%=segments[i].label%><%}%></p><p class=\"value\"><%=segments[i].value%>%</p></li><%}%></ul>"
  }

  var barDefaults = {
    tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>%",
    animateRotate: true,
    animation: true,
    scaleShowGridLines: false,
    scaleGridLineColor : "red",
    barShowStroke : false,
    barStrokeWidth : 1,
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


  // Top Libraries
  var topLib = new Chart(document.getElementById("topLib").getContext("2d")).Bar(topLibsData, barDefaults);

  topLib.datasets[0].bars[0].fillColor = "#1a6792";
  topLib.datasets[0].bars[1].fillColor = "#257bab";
  topLib.datasets[0].bars[2].fillColor = "#399fb9";
  topLib.datasets[0].bars[3].fillColor = "#45aec8";
  topLib.datasets[0].bars[4].fillColor = "#61c2da";
  topLib.datasets[0].bars[5].fillColor = "#73d1e9";
  topLib.update();



  // Top Scripts
  var topScript = new Chart(document.getElementById("topScript").getContext("2d")).Doughnut(topScriptsData, donutDefaults);
  createLegend(topScript);

  // Top MVC
  var topMVC = new Chart(document.getElementById("topMVC").getContext("2d")).Doughnut(topMVCData, donutDefaults);
  createLegend(topMVC);

  // Top Analytics
  var topAnalytics = new Chart(document.getElementById("topAnalytics").getContext("2d")).Doughnut(topAnalyticsData, donutDefaults);
  createLegend(topAnalytics);

  // Top AB Testing
  var topAB = new Chart(document.getElementById("topAB").getContext("2d")).Bar(topABData, barDefaults);

  topAB.datasets[0].bars[0].fillColor = "#1a6792";
  topAB.datasets[0].bars[1].fillColor = "#257bab";
  topAB.update(); 

  // Live Chat 
  var topChat = new Chart(document.getElementById("topChat").getContext("2d")).Bar(topChatData, barDefaults);

  topChat.datasets[0].bars[0].fillColor = "#1a6792";
  topChat.datasets[0].bars[1].fillColor = "#257bab"; 
  topChat.datasets[0].bars[2].fillColor = "#399fb9"; 
  topChat.update();

  // CMS
  var topCMS = new Chart(document.getElementById("topCMS").getContext("2d")).Bar(topCMSData, barDefaults);


  topCMS.datasets[0].bars[0].fillColor = "#1a6792";
  topCMS.datasets[0].bars[1].fillColor = "#257bab"; 
  topCMS.datasets[0].bars[2].fillColor = "#399fb9"; 
  topCMS.datasets[0].bars[3].fillColor = "#45aec8";
  topCMS.update();

  //var myBarChart = new Chart(document.getElementById("topMVC").getContext("2d")).Bar(jesse, donutDefaults);


})();