/***************
     Vars
***************/

var hiddenVariables = [
	/* jQueryUI ($.ui) */
	"$.fn.autocomplete", "$.fn.tooltip", "$.fn.tabs", "$.widget", "$.fn.button", "$.fn.mouse", "$.fn.menu", "$.position",
	"$.fn._focus", "$.fn._show", "$.fn._hide", "$.fn._addClass", "$.fn._removeClass", "$.fn._toggleClass", "$.fn.__toggle",
	"$.fn.selectable", "$.fn.progressbar", "$.fn.buttonset", "$.effects", "$.fn.effect", "$.fn.draggable", "$.fn.droppable",
	"$.fn.datepicker", "$.datepicker", "$.fn.dialog", "$.fn.slider", "$.fn.sortable", "$.fn.resizable",
	"$.fn.accordion", "$.fn.scrollParent", "$.fn.uniqueId", "$.fn.removeUniqueId", "$.fn.focus",
	"$.fn.disableSelection", "$.fn.enableSelection", "$.fn.zIndex", "$.fn.toggleClass", "$.fn.switchClass",
	"$.fn.cssUnit", "$.data", "$.focusable", "$.tabbable", "$.Widget", "$.fn.propAttr",
	/* Ajax Form */
	"$.fieldValue", "$.fn.fieldValue", "$.fn.ajaxSubmit", "$.fn.formToArray", "$.fn.ajaxFormUnbind", "$.fn.clearForm", "$.fn.formSerialize",
	"$.fn.fieldSerialize", "$.fn.enable", "$.fn.clearInputs", "$.fn.clearFields", "$.fn.resetForm",
	/* Google Search (GSearch) */
	"GSearchForm", "GwebSearch", "GcustomwebSearch", "GbookSearch", "GblogSearch", "GvideoSearch", "GnewsSearch", "GlocalSearch",
	"GcustomimageSearch", "GpatentSearch", "GSearchControl", "GsearcherOptions", "GdrawOptions", "GimageSearch",
	/* Google Misc. */
	"CreativeToolset", "CreativeToolsetProxy", "ExpandableAdSlotFactory", "DhtmlExpandableIframeFactory", "GPT_jstiming", "GA_jstiming", "ToolbarApi",
	/* Keywords */
	"DEBUG", "Analytics", "Fx", "Try", "Chain", "Selectors", "Class", "Form", "Window", "Events", "Elements", "Options", "Type", "Toggle", "Position",
	"Browser", "Asset", "Field", "Insertion", "Color", "Request", "Tips", "Group", "Effect", "Native", "Builder", "Control", "Locale", "Table",
	/* GSAP */
	"Ease", "Strong", "Power4", "Quint", "Power3", "Quart", "Power2", "Cubic", "Quad", "Power1", "Linear", "Power0", "Back", "BackOut", "BackIn",
	"BackInOut", "SlowMo", "BounceOut", "BounceIn", "SteppedEase", "BounceInOut", "Bounce", "CircOut", "CircIn", "CircInOut", "CSSPlugin", "Circ",
	"ElasticOut", "ElasticIn", "ElasticInOut", "Elastic", "ExpoOut", "ExpoIn", "ExpoInOut", "Expo", "SineOut", "RoughEase", "SineIn", "Sine", "SineInOut", "EaseLookup",
	/* Temporary */
	"IframeBase", "Iframe", "IFrame", "IframeProxy", "IframeWindow"
];

/* Google misc., Drupal Webform, ClickTale, Baidu, Wordpress, Misc. */
var hiddenVariableGroups = /^(Goog_.+|G(A|S)_google.+|WebForm_.+|WR[A-z]{1,2}|ClickTale[A-z]+|BAIDU_[A-z]+|\$(\.fn)?\.wpcf7[A-z].+|Sys\$[A-z].+|[A-Z][0-9]{1,2}|[A-z]$|[A-Z][a-z]$)/;

/***************
    Elements
***************/

var $html = $("html"),
	$body = $("body"),
	$header_code = $("#header-code"),
	$header_code_object = $("#header-code-object"),
	$header_code_property = $("#header-code-property"),
	$header_logo = $("#header-logo"),
	$header_logo_o = $("#header-logo o"),
	$main = $("main"),
	$slogan = $("#slogan"),
	$subSlogan = $("#subSlogan"),
	$data = $("#data"),
	$data_table = $("#data table"),
	$data_cols = $("#data_cols"),
	$data_scroll = $("#data_scroll"),
	$data_lib = $("#data-lib"),
	$data_name = $("#data-name"),
	$about = $("#about"),
	$sectionHeader_search = $("#sectionHeader--search"),
	$search_ = $("#search_"),
	$search = $("#search"),
	$searchSymbols = $("#searchSymbols"),
	$queryButtons = $("#queryButtons span"),
	$howTo = $("#howTo"),
	$footer = $("footer"),
	$subscribe_ = $("#subscribe_"),
	$subscribe = $("#subscribe"),
	$searchWrap = $("#searchWrap"),
  $hasRendered;
	

/**************
    Global
**************/

$body.on("click", "a", function(event) {
	if (event.target.id !== "view_trending_data") {
		event.preventDefault();
		window.open(event.target.href)
	}
});

$body.on("click", "[data-query]", function(event) {
	var target = event.target,
		dataQuery = target.getAttribute("data-query");

	if (dataQuery !== null) {
		var query = dataQuery || $(target).text();

		for (var i = 0; i < query.length; i++) {
			(function(j) {
				setTimeout(function() {
					$search.val(query.slice(0, j + 1));

					if (j === query.length - 1) {
						setTimeout(function() {
							UI.query($search[0]);
						}, 75);
					}
				}, j * (18 - Math.min(12, query.length)) * 3);
			})(i);
		}
	}
});

$(window).on("scroll", function() {
	$data_scroll.hide();
});

/***************
    Helpers
***************/

$search.one("mouseup", function() {
	$search.select();
});

/**************
      UI
**************/

var UI = {
	loading: false,
	error: function() {
		$search.addClass('error');

		$.Velocity.RunSequence([
			{ elements: $search_, properties: "callout.shake", options: { delay: 800, duration: 450, sequenceQueue: false } }
		]);
	},
	query: function() {
		var data = $search.val();
		
		$("#header-logo").on("click", function (){
			if ($("body").hasClass("results")) {
  			window.location.hash = "";
  			$data_scroll.hide();
    		$body.removeClass();
				$data_table.empty();
				$data_table.removeClass("show");
				$data_lib.removeClass("show");
				$data_cols.removeClass("show");
				$searchSymbols.removeClass("show");
			}
		});

		function request (query, callback) {
			var API = {
					hostname: "http://104.131.144.192:3000/v1/",
					librariesPath: "libraries/",
					sitesPath: "sites/",
					scriptsPath: "scripts/"
				},
				queryNormalized;

			function ajax(url) {
				$search.removeClass('error');
				UI.loading = true;
				$data_table.removeClass('show');
				$data_lib.removeClass("show");
				$data_cols.removeClass("show");
				$body.addClass("results");
				$searchSymbols.addClass("show");
				$html.css("cursor", "wait");
				
				//giving a lag to let the animation complete
				setTimeout(function(){
					$body.removeClass('slim');

					$.ajax({
						url: API.hostname + url,
						dataType: "json",
						complete: function() {
							// UI.loading = false;
							$searchSymbols.removeClass("show");
							$html.css("cursor", "default");
						},
						success: function (response) {
							if (response && response.meta) {

								$(window).scrollTop(0);
								callback(response);
								$data_table.addClass('show');
								$data_lib.addClass("show");
								$data_cols.addClass("show");

								var tableHeight = $("#data table").outerHeight();
								var docHeight = $(window).height() - $("footer").outerHeight();

								if(tableHeight > docHeight) {
									$data_scroll.velocity("transition.fadeIn", { delay: 1000, duration: 1000 });
								}

								//refresh the time series graph
								//reDraw();

							} else {
								UI.error();
							}
						},
						error: UI.error
					});
				}, 700);
			}

			$data_scroll.velocity("fadeOut");

			if (/\.js$/.test(query)) {
				alert("Be careful: We noticed you suffixed your search query with '.js'. Instead, you need to enter the exact case-sensitive VARIABLE that a library exposes itself under -- not simply the name of the library.");
			}

			query = $.trim(query.replace(/^(^https?:\/\/)?(www\.)?/i, "").replace(/^jQuery\./i, "$.").replace(/\.js$/i, ""));
			if (query === "jquery" || query === "$") {
				if (query === "jquery") {
					alert("Be careful: Variable lookup is case sensitive. We've gone ahead and turned 'jquery' into 'jQuery' for you. Remember that you need to enter the exact case-sensitive VARIABLE that a library exposes itself under -- not simply the name of the library.");
				}

				query = "jQuery";
			}

			$search.val(query);
			// disabling this for dev
			window.location.hash = query;

			if (/^[-A-z0-9]+\.[-A-z0-9]+$/.test(query)) {
				queryNormalized = "site";
				query = query.toLowerCase();
			} else if (/^script: ?[-A-z0-9]+/.test(query)) {
				queryNormalized = "script";
				query = query.replace(/^script: */, "").toLowerCase();
			} else {
				queryNormalized = query;
			}

			if (query === "libscore.com") {
				alert("OMG. RECURSION!!@#!KJ$K BRAIN EXPLOSION. AHAHAHAHAHAHHHHHHH\n\nJust kidding. But there's no data to show right now...")
			}

			switch (queryNormalized) {
				case "site":
					UI.requestTarget = "site";
					ajax(API.sitesPath + query + "/?");
					break;
				case "*.*":
					UI.requestTarget = "sites";
					ajax(API.sitesPath + "?limit=1000");
					break;
				case "script":
					UI.requestTarget = "script";
					ajax(API.scriptsPath + query + "?limit=1000");
					break;
				case "script:*":
					UI.requestTarget = "scripts";
					ajax(API.scriptsPath + "?limit=1000");
					break;
				case "*":
					UI.requestTarget = "libs";
					ajax(API.librariesPath + "?limit=1500");
					break;

				default:
					UI.requestTarget = "lib";
					ajax(API.librariesPath + query + "?limit=1000");
			}
		}

		function prettifyName (name, type) {
			var prettified = name || "";
			var truncated = false;

			if (name && name.length > 40) {
				truncated = true;
				prettified = prettified.slice(0, 37);
			}

			if (truncated) {
				prettified = "<span title='" + name + "'>" + prettified + "…</span>";
			}

			if (type === "mobile") {
				prettified += " <span title='Appears on the mobile version of this site.' class='accent'>[mobile]</span>";
			}

			return prettified;
		}

		function prettifyNumber (number, isRank) {
			var prettified = numeral(number).format("0,0").replace(/,/g, "<span class='accent'>,</span>");

			if (isRank === true) {
				prettified = "<span class='text-grey'>#</span>" + prettified;
			}

			return prettified;
		}

		var matches;

		request(data, function(response) {

			var $html = "";
			var $columns;
			var $chartLabel;
      var $chartSubLabel;

			if (response.scripts) {
				response.libraries = response.libraries.concat(response.scripts.map(function(obj) { obj.name = "script:" + obj.name; return obj; }));
			}

			matches = (response.results || response.sites || response.libraries);
			matches.forEach(function(match) {
				var $matchData;

				if (hiddenVariables.indexOf((match.library || match.name)) !== -1 || hiddenVariableGroups.test((match.library || match.name))) {
					return;
				}

				switch (UI.requestTarget) {
					case "site":
						$data_name.text(data);
						$columns = "<h3 class='middle'><span>Site: </span> " + data + " </h3><div class='left'>library</div><div class='right'>site count</div>";

						var isScript = /^script:/.test(match.name);

						if (isScript) {
						  $matchData = "<td><span data-query='script:" + match.name.replace(/^script:/, "") + "'>" + prettifyName(match.name, match.type) + "</span> <span class='text-green'></span></td>";
						} else {
							$matchData = "<td><span data-query='" + match.name + "'>" + prettifyName(match.name, match.type) + "</span><a href='http://" + (match.github ? ("github.com/" + match.github) : "github.com/julianshapiro/libscore/issues/1") + "' data-hint='Click to help track down this library.' class='github'></a></td>";
						}

						$matchData += "<td>" + prettifyNumber(match.count) + "</td>";
						break

					case "sites":
						$chartLabel = 'Top Sites';
						$columns = "<h3 class='middle'><span>Top Sites</span></h3><div class='left'>site</div><div class='right'>site rank</div>";
						$matchData = "<td><span data-query='" + match.url + "'>" + prettifyName(match.url) + "</span> <span class='text-green'></span></td>";
						$matchData += "<td>" + prettifyNumber(match.rank, true) + "</td>";
						break;

					case "lib":
						var diff = (response.count[0] - response.count[1]) / response.count[1];
						var percentChange = (diff * 100).toFixed(2);

						if(percentChange < 0) {
							$data_name.html($search.val() + ": <span class='negative'>"+ percentChange + "%</span>");
						} else {
							$data_name.html($search.val() + ": <span class='positive'>"+ percentChange + "%</span>");
						}
						
						$body.addClass("slim");
						$chartLabel = data;
            $chartSubLabel = response.count;
						$columns = "<div class='left'><span id='data_badge'>" + prettifyNumber(response.count[0]) + "</span> sites <a href='http://107.170.240.125/badge/" + $search.val() + ".svg'>Get badge</a></div></div><div class='right'>site rank</div>";
						$matchData = "<td><a href='//" + match.url + "'>" + prettifyName(match.url) + " <span class='text-green'></span></a></td>";
						$matchData += "<td>" + prettifyNumber(match.rank, true) + "</td>";

						break;

					case "libs":
						$chartLabel = 'Top Libs';
						$columns = "<div class='left'>library <a href='http://api.libscore.com/latest/libraries.txt'>Download list</a></div><div class='right'>site count</div>";
						$matchData = "<td><span data-query='" + match.library + "'>" + prettifyName(match.library) + "</span><a href='http://" + (match.github ? ("github.com/" + match.github) : "github.com/julianshapiro/libscore/issues/1") + "' data-hint='Click to help track down this library.' class='github'></a></td>";
						$matchData += "<td>" + prettifyNumber(match.count[0]) + "</td>";
						break;

					case "script":
						$body.addClass("slim");
						$chartLabel = data;
            			$chartSubLabel = response.count;
						$columns = "<div class='left'>" + prettifyNumber(response.count[0]) + " sites</div><div class='right'>site rank</div>";
						$matchData = "<td><a href='//" + match.url + "'>" + prettifyName(match.url) + " <span class='text-green'></span></a></td>";
						$matchData += "<td>" + prettifyNumber(match.rank, true) + "</td>";
						break;

					case "scripts":
						$chartLabel = 'Top Scripts';
						$columns = "<div class='left'>script</div><div class='right'>site count</div>";
						$matchData = "<td><span data-query='script:" + match.script + "'>" + prettifyName(match.script) + "</span> <span class='text-green'></span></td>";
						$matchData += "<td>" + prettifyNumber(match.count[0]) + "</td>";
						break;
				}

				$html += "<tr>" + $matchData + "</tr>";
			});
    
      //if data is available, we are creating a chart, if not, destroying it.
      if(typeof $chartSubLabel === 'undefined'){
        if($hasRendered == true){
          $('#time-series').highcharts().destroy();
          $hasRendered = false;
        }
      } else {
        $hasRendered = true;

        $('#time-series').highcharts({
          chart: {
            type: 'area',
            height: 330,
            backgroundColor: 'transparent',
            spacingBottom: 40,
            style: {
              fontFamily: '"Avenir Medium", "Lucida Grande", sans-serif', 
              fontSize: '12px'
            }
          },
          title: {
            text: ''
          },
          xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            title: {
              enabled: false
            },
            lineColor: '#dcdcdc',
            lineWidth: 1,
            labels: {
              align: 'center',
              style: {
                fontSize: '12px',
                color: '#29BD66',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontWeight: 'bold'
              }
            },
            tickInterval: null,
            tickPosition: "outside",
            pointPadding: null,
            groupPadding: null,
            borderWidth: null,
          },
          yAxis: {
            min: 0,
            title: {
              text: '',
            },
            gridLineColor: 'transparent',
            lineColor: '#dcdcdc',
            lineWidth: 1,
            labels: {
              align: 'right',
              step: 1,
              style: {
                fontSize: '12px',
                color: '#29BD66',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontWeight: 'bold'
              }
            },
          },
          credits: {
            enabled: false
          },
          navigation: {

          },
          legend: {
            align: 'right',
            enabled: true,
            itemDistance: 20,
            floating: true,
            y: 38,
            x: 10,
            verticalAlign: 'bottom',
            itemMarginTop: 5,
            itemStyle: {
              color: '#29BD66',
              fontSize: 15,
              fontWeight: '400'
            },
            symbolRadius: 5,
            symbolHeight: 8,
            symbolWidth: 8,
            symbolPadding: 6
          },
          series: [{
            name: 'jQuery',
            data: [$chartSubLabel],
            color: '#29BD66'
          }],
          tooltip: {
            useHTML: true,
            headerFormat: '<h4 style="font-size: 11px; margin: 5px 0 7px 0; text-transform: uppercase; letter-spacing: 1px; color: #bcbcbc;">Penetration Percentage</h4>',
            pointFormat: '<h2 style="font-size:16px; margin: 0; display: inline; color: #3a3a3a">{series.name} <span style="color: #29BD66;">{point.y} Sites</span></h2>',
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
            area: {
              lineColor: '#29BD66',
              lineWidth: 2,
              fillColor: {
                linearGradient: [0, 0, 0, 300],
                stops: [
                  [0, 'rgba(41,189,102,.12)'],
                  [1, 'rgba(148,196,168,.1)']
                ]
              },
              marker: {
                lineWidth: 2,
                radius: 6,
                lineColor: '#29BD66',
                fillColor: '#fafafa',
                states: {
                  hover: {
                    enabled: false
                  }
                }
              },
              pointPlacement: "on"
            }
          }
        });
      };

      function setData() {
        var chart = $('#time-series').highcharts(),
         series = chart.series[0];

        chart.options.legend.itemStyle.color = '#4973d6';

        chart.addSeries({
          name: 'mooTools',
          data: [300000],
          color: '#4973d6',
          lineColor: '#4973d6',
          fillColor: {
            linearGradient: [0, 0, 0, 300],
            stops: [
              [0, 'rgba(73,115,214,.15)'],
              [1, 'rgba(73,115,214,.07)']
            ]
          },
          marker: {
            lineColor: '#4973d6'
          }
        });
      }

      $(".addData").on("click", function(){
        setData();
        return false;
      });

			// $data_name.text($chartLabel);
      $chartSubLabel = '';

			$data_table
				.scrollTop = 0;

			if ($html) {
				$data_cols.html($columns);
				$data_table.html($html);
			} else {
				$data_cols.html("<div>library</div><div>site count</div>")
				$data_table.html("<tr><td class='text-red'>No libraries or scripts were detected on this site.</td><td class='text-red'>Ø</td></tr>");
			}

			if (matches.length > 900) {
				$data_table.append("<div id='data_more'><span>Results after 1,000 are not shown. Query our <a href='https://github.com/julianshapiro/libscore'>API</a> for a complete list.</span></div>");
			}

			setTimeout(function() {
				$("#data").resize();
			}, 2000);
		});
	}
};

/**************
    Events
**************/

/* Input behavior. */
$("input").on("keydown", function(event) {
	if (event.keyCode === 13 && this.value !== "") {
		if (event.target.id === "search" && this.value !== "variable (case sensitive) or domain...") {
			UI.query(event.target);
		} else if (this.id === "subscribe" && this.value) {
			$subscribe_
				.submit()
				.remove();
		}
	}
});

/**************
     Init
**************/
$(document).ready(function() {

    $('#script-tip').tooltipster({
    	interactive: true,
      animation: "fade",
      touchDevices: true,
      interactiveTolerance: 300,
      maxWidth: 320,
      offsetY: 10,
      onlyOne: true,
      content: $('<p>You can also search for sites containing an external script by prefixing a query with <i>script:</i>, e.g. <b class="tip-link" data-query="">script:stats.wp.com</b> or <b class="tip-link" data-query="">script:use.typekit.net</b></p>'),
      functionReady: function(){
      	$(".tip-link").on("click", function(){
		    	$('#script-tip').tooltipster('hide');
		    });
      }
    });

    $('#domain-tip').tooltipster({
    	interactive: true,
      animation: "fade",
      touchDevices: true,
      interactiveTolerance: 300,
      maxWidth: 320,
      offsetY: 10,
      onlyOne: true,
      content: $('<p>You can retrieve all libraries used on a site by querying for its domain name, e.g. <b data-query="">stripe.com</b> or <b data-query="">digitalocean.com</b></p>'),
      functionReady: function(){
      	$(".tip-link").on("click", function(){
		    	$('#domain-tip').tooltipster('hide');
		    });
      }
    });

    $(".directions").on('click', function(){
    	$(this).next('#howTo').addClass('reveal');
    	$("#subscribe_").addClass("revealedHowTo");
    	$(this).remove();
    	return false;
    });	
});

$(window).load(function() {
	$.Velocity.RunSequence([
		{ elements: $header_logo.add($slogan).add($search_).add($queryButtons).add($howTo).add($howTo.find("p")), properties: "transition.fadeIn", options: { stagger: 50, duration: 300 } },
		{ elements: $header_logo_o, properties: { opacity: [ 0.6, 1 ] }, options: { sequenceQueue: false, duration: 500, loop: 2 } },
		{ elements: $header_code, properties: "transition.fadeIn", options: { sequenceQueue: false, duration: 500
			, begin: 
			function() {
					var hash = window.location.hash.slice(1);

					if (hash) {
						$search.attr("placeholder", hash);
						$search.val(hash);
						UI.query();
					} else {
						$search.attr("placeholder", "search for a JavaScript variable (case sensitive) or a domain name...");
					}

					[ "location()", "hash()", "map()", "<a href='//medium.com/@Shapiro/introducing-libscore-com-be93165fa497'>Learn more <span style='color: #29bd66'></span></a>" ].forEach(function(val, i) {
						$.Velocity($header_code_property, "transition.vanishBottomIn",
							{ 
								delay: i === 0 ? 125 : 0,
								duration: 250,
								begin: function() {
									$header_code_property.html(val);

									if (i === 1) {
										$header_code_object.html("Array.");
									}
								},
								complete: function() {
									if (i === 3) {
										$.Velocity.RunSequence([
											{ elements: $header_code_object, properties: "transition.fadeOut", options: { duration: 400 } },
											{ elements: $header_code_property, properties: "callout.pulse", options: { duration: 650 } }
										]);
									}
								}
							}
						);
					});
			}
			}
		},
		{ elements: $header_logo_o, properties: { opacity: 0.9, color: "#24A85A" }, options: { duration: 2000, loop: true } }
	]);
});

function stickyNav(){
	var scrollTop     = $(window).scrollTop(),
  elementOffset = $('#query').offset().top + 30,
  distance      = (elementOffset - scrollTop);

	if(scrollTop > distance){
		$("#searchWrap").addClass("sticky");
		$("#data").addClass("sticky");
	} else {
		$("#searchWrap").removeClass("sticky");
		$("#data").removeClass("sticky");
	}
}

if ($(window).width() < 850) {
	$(window).on('scroll', function() {
		stickyNav();
	});

	$(".footer-chart").on('click', function (){
		$("#data-lib").toggleClass("slideUp");
		return false;
	});

	$(".close").on('click', function (){
		$("#data-lib").removeClass("slideUp");
		return false;
	});
}

$(window).resize( function(e){
  if ($(window).width() < 850) {
		$(window).on('scroll', function() {
			stickyNav();
		});
	}
});