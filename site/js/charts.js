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

  var barOptions = {
    chart: {
      type: 'column',
      backgroundColor: 'transparent',
      spacing: [20, 10, 15, 10],
      style: {
        fontFamily: '"Avenir Medium", "Lucida Grande", sans-serif', 
        fontSize: '12px'
      }
    },
    credits: {
      enabled: false
    },
    title: {
      text: 'Most Popular Libraries (% penetration)',
      style: {
        fontSize: '28px',
        color: '#29BD66'
      },
      y: 5
    },
    xAxis: {
      type: 'category',
      lineColor: 'transparent',
      categories:   ['jQuery', 'jQuery UI', 'Modernizr', 'Ajax Form', 'Fancy Box', 'Carousel'],
      labels: {
        rotation: -45,
        style: {
          fontSize: '13px',
        }
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: '',
      },
      // alternateGridColor: 'rgba(255,255,255,.15)',
      gridLineColor: '#d5d5d5',
      labels: {
        align: 'right',
        step: 2,
        style: {
          "font-size":"14px"
        }
      },

    },
    legend: {
      enabled: false
    },
    tooltip: {
      useHTML: true,
      headerFormat: '<h4 style="font-size: 11px; margin: 5px 0 7px 0; text-transform: uppercase; letter-spacing: 1px; color: #bcbcbc;">Penetration Percentage</h4>',
      pointFormat: '<h2 style="font-size:16px; margin: 0; display: inline; color: #3a3a3a">{point.name} <span style="color: #29BD66;">{point.y}%</span></h2>',
      borderColor: '#29BD66',
      borderWidth: 2,
      backgroundColor: '#ffffff',
      shadow: false,
      positioner: function(boxWidth, boxHeight, point) {         
        var chart = this.chart,
          distance = this.distance,
          ret = {},
          swapped,
          first = ['y', chart.chartHeight, boxHeight, point.plotY + chart.plotTop - 8],
          second = ['x', chart.chartWidth, boxWidth, point.plotX + chart.plotLeft],

          preferFarSide = point.ttBelow || (chart.inverted && !point.negative) || (!chart.inverted && point.negative),
          
          firstDimension = function (dim, outerSize, innerSize, point) {
            var roomLeft = innerSize < point - distance,
              roomRight = point + distance + innerSize < outerSize,
              alignedLeft = point - distance - innerSize,
              alignedRight = point + distance;

            if (preferFarSide && roomRight) {
              ret[dim] = alignedRight;
            } else if (!preferFarSide && roomLeft) {
              ret[dim] = alignedLeft;
            } else if (roomLeft) {
              ret[dim] = alignedLeft;
            } else if (roomRight) {
              ret[dim] = alignedRight;
            } else {
              return false;
            }
          },
          
          secondDimension = function (dim, outerSize, innerSize, point) {
            if (point < distance || point > outerSize - distance) {
              return false;
            
            } else if (point < innerSize / 2) {
              ret[dim] = 1;
            } else if (point > outerSize - innerSize / 2) {
              ret[dim] = outerSize - innerSize - 2;
            } else {
              ret[dim] = point - innerSize / 2;
            }
          },
          swap = function (count) {
            var temp = first;
            first = second;
            second = temp;
            swapped = count;
          },
          run = function () {
            if (firstDimension.apply(0, first) !== false) {
              if (secondDimension.apply(0, second) === false && !swapped) {
                swap(true);
                run();
              }
            } else if (!swapped) {
              swap(true);
              run();
            } else {
              ret.x = ret.y = 0;
            }
          };

        if (chart.inverted || this.len > 1) {
          swap();
        }
        run();

        return ret;
      },
      style: {
        color: '#333333',
        fontSize: '13px',
        padding: '15px'
      }
    },
    plotOptions: {
      column: {
        animation: true,
        borderRadius: 3,
        borderWidth: 0,
        // pointWidth: 80,
        colorByPoint: true,
        color: '#29BD66',
        colors: [
          '#29BD66',
          '#18a050'
        ],
        states: {
          hover: {
            brightness: .05
          }
        },
        dataLabels: {
          align: 'center',
          enabled: true,
          backgroundColor: '#F4F4F4',
          padding: 5,
          y: -27,
          format: '{y}%',
          inside: false,
          borderRadius: 3,
          color: '#29BD66',
          verticalAlign: 'top',
          style: {
            fontSize: '13px',
            fontWeight: 600
          }
        }
      },
      pie: {
        allowPointSelect: true,
        innerSize: '60%',
        borderWidth: 0,
        size: '75%',
        dataLabels: {
          connectorColor: '#DBDBDB',
          connectorPadding: 10,
          connectorWidth: 2,
          distance: 40,
          y: -3,
          style: {
            fontSize: '13px',
            color: '#606060'
          }
        }
      }
    },
    series: [{
      data: [
        ['jQuery', 63.4],
        ['jQuery UI', 17.6],
        ['Modernizr', 10.9],
        ['Ajax Form', 8.7],
        ['Fancy Box', 7.9],
        ['Carousel', 7.3]
      ]
    }]
  }

  // Highcharts.getOptions().plotOptions.pie.colors = (function () {
  //     var colors = [],
  //         base = '#29BD66',
  //         i;

  //     for (i = 0; i < 10; i += 1) {
  //       colors.push(Highcharts.Color(base).brighten((i - 3) / 17).get());
  //     }
      
  //     return colors;
  // }());

  $('.tab-content .padder').highcharts(barOptions);

  $(".nav-trigger").on('click', function(){
    $("#chart-nav").toggleClass('show');

    return false;
  });

  $('.nav-tabs a').click(function () {
    $('.nav-tabs li.active').removeClass();
    $(this).parent('li').addClass('active');

    var chart = $('.tab-content .padder').highcharts(),
      newChart = $(this).data('trigger');

    if ( newChart == 'topLib') {
      var newData = [
        ['jQuery', 63.4],
        ['jQuery UI', 17.6],
        ['Modernizr', 10.9],
        ['Ajax Form', 8.7],
        ['Fancy Box', 7.9],
        ['Carousel', 7.3]
      ],
      newLabels = ['jQuery', 'jQuery UI', 'Modernizr', 'Ajax Form', 'Fancy Box', 'Carousel'],
      newTitle = "Most Popular Libraries (% penetration)",
      newType = "column"
    } 

    else if (newChart == 'topCMS'){
      var newData = [
        ['Wordpress', 4.2],
        ['Blogger', 2.0],
        ['Shopify', .28],
        ['Squarespace', .14]
      ],
      newLabels = ["Wordpress", "Blogger", "Shopify", "Squarespace"],
      newTitle = "CMS Comparison (Homepage % Penetration)",
      newType = "column"
    }

    else if (newChart == 'topChat'){
      var newData = [
        ['Zopim', .94],
        ['Olark', .44],
        ['LiveChat', .34]
      ],
      newLabels = ["Zopim", "Olark", "LiveChat"],
      newTitle = "Live Chat Comparison (% penetration)",
      newType = "column"
    } 

    else if (newChart == 'topAB'){
      var newData = [
        ['Optimizely', .86],
        ['Visual Website Opt.', .59]
      ],
      newLabels = ["Optimizely", "Visual Website Opt."],
      newTitle = "A/B Testing Comparison (% penetration)",
      newType = "column"
    } 

    //start pies --> changed to columns
    else if (newChart == 'topScript'){
      var newData = [
        ['Google Analytics', 55.9],
        ['Facebook Like Button', 18.6],
        ['Twitter Tweet Button', 12.1],
        ['Google Maps Widget', 2.7],
        ['New Relic', 2.0],
        ['Pinterest Pin Button', 2.0],
        ['Adroll', 1.3],
        ['Typekit', 1.2]
      ],
      newLabels = ["Google Analytics", "Facebook Like Button", "Twitter Tweet Button", "Google Maps Widget", "New Relic", "Pinterest Pin Button", "Adroll", "Typekit"],
      newTitle = "Most Popular Scripts (% penetration)",
      newType = "column"
    } 

    else if (newChart == 'topMVC'){
      var newData = [
        ['Backbone', .79],
        ['Angular', .49],
        ['Knockout', .2],
        ['React', .002]
      ],
      newLabels = ["Backbone", "Angular", "Knockout", "React"],
      newTitle = "Most Popular MVCs (Homepage % Penetration)",
      newType = "column"
    } 

    else if (newChart == 'topAnalytics'){
      var newData = [
        ['Google Analytics', 55.9],
        ['Scorecard Research', 2.2],
        ['StatCounter', 1.9],
        ['Histats', 1.4],
        ['Alexa', .75],
        ['Clicky', .62],
        ['Chartbeat', .56],
        ['Mixpanel', .36]
      ],
      newLabels = ["Google Analytics", "Scorecard Research", "StatCounter", "Histats", "Alexa", "Clicky", "Chartbeat", "Mixpanel"],
      newTitle = "Most Popular Analytics (% penetration)",
      newType = "column"
    } 
    
    //change chart data based on above conditional
    function reDraw() {
      var series = chart.series[0],
      MaximumBarWidth = 80;
      series.update({type: newType});

      series.setData(newData);
      chart.xAxis[0].setCategories(newLabels);
      chart.setTitle({text: newTitle});

      //set max value for chart bar width only for columns
      if (series && series.data.length && newType == 'column') {
        if (series.data[0].pointWidth  >  MaximumBarWidth) {
          for(var i=0;i< chart.series.length;i++)
            chart.series[i].update({
            pointWidth:MaximumBarWidth
          });
        }
      }

      var $container = $(".tab-content .padder");
      $container.velocity("transition.expandIn", {duration: 450});
    }

    var $container = $(".tab-content .padder");
    $container.velocity("transition.expandOut", {duration: 450});

    setTimeout(function(){
      reDraw();
    }, 450);
    
    return false;
  });


})();