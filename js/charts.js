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
      height: 600,
      spacing: [10, 10, 15, 10],
      style: {
        fontFamily: '"Avenir Medium", "Lucida Grande", sans-serif', 
        fontSize: '12px'
      }
    },
    credits: {
      enabled: false
    },
    title: {
      text: 'Most Popular Libraries (% penetration)'
    },
    xAxis: {
      type: 'category',
      lineColor: '#d5d5d5',
      categories:   ['jQuery', 'jQuery UI', 'Modernizr', 'Ajax Form', 'Fancy Box', 'Carousel'],
      labels: {
        rotation: -45,
        style: {
          fontSize: '13px',
        }
      },
      // title: {
      //   text: 'Lib / Script',
      //   style: {
      //     "font-size":"16px",
      //     "color":"#bdbdbd"
      //   },
      //   margin: 15
      // },
    },
    yAxis: {
      min: 0,
      title: {
        text: '',
        // style: {
        //   "font-size":"16px",
        //   "color":"#bdbdbd"
        // },
        // margin: 15
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
          y: 3,
          format: '{y}%',
          inside: true,
          color: '#FFFFFF',
          verticalAlign: 'top',
          style: {
            fontSize: '12px',
            fontWeight: 600
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

  $('.tab-content').highcharts(barOptions);

  $('.nav-tabs a').click(function () {
    $('.nav-tabs li.active').removeClass();
    $(this).parent('li').addClass('active');

    var chart = $('.tab-content').highcharts(),
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
      newTitle = "Most Popular Libraries (% penetration)"
    } 

    else if (newChart == 'topCMS'){
      var newData = [
        ['Wordpress', 4.2],
        ['Blogger', 2.0],
        ['Shopify', .28],
        ['Squarespace', .14]
      ],
      newLabels = ["Wordpress", "Blogger", "Shopify", "Squarespace"],
      newTitle = "CMS Comparison (Homepage % Penetration)"
    }

    else if (newChart == 'topChat'){
      var newData = [
        ['Zopim', .94],
        ['Olark', .44],
        ['LiveChat', .34]
      ],
      newLabels = ["Zopim", "Olark", "LiveChat"],
      newTitle = "Live Chat Comparison (% penetration)"
    } 

    else if (newChart == 'topAB'){
      var newData = [
        ['Optimizely', .86],
        ['Visual Website Opt.', .59]
      ],
      newLabels = ["Optimizely", "Visual Website Opt."],
      newTitle = "A/B Testing Comparison (% penetration)"
    } 
    
    //change chart data based on above conditional
    function reDraw() {

      var series = chart.series[0],
      MaximumBarWidth = 80;

      series.setData(newData);
      chart.xAxis[0].setCategories(newLabels);
      chart.setTitle({text: newTitle});

      //set max value for chart bar width
      if (series && series.data.length) {
          if (series.data[0].pointWidth  >  MaximumBarWidth) {
              for(var i=0;i< chart.series.length;i++)
                  chart.series[i].update({
                  pointWidth:MaximumBarWidth
              });
          }
      }
    }

    reDraw();
    
    return false;
  });

})();