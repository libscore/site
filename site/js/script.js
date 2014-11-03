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
	/* Google Search (GSearch) */
	"GSearchForm", "GwebSearch", "GcustomwebSearch", "GbookSearch", "GblogSearch", "GvideoSearch", "GnewsSearch", "GlocalSearch",
	"GcustomimageSearch", "GpatentSearch", "GSearchControl", "GsearcherOptions", "GdrawOptions", "GimageSearch",
	/* Google Misc. */
	"CreativeToolset", "CreativeToolsetProxy", "ExpandableAdSlotFactory", "DhtmlExpandableIframeFactory", "GPT_jstiming", "GA_jstiming", "ToolbarApi",
	/* Temporary */
	"IframeBase", "Iframe", "IFrame", "IframeProxy", "IframeWindow"
];

/* Google misc., Drupal Webform, ClickTale, Baidu, Misc. */
var hiddenVariableGroups = /^(Goog_.+|G(A|S)_google.+|WebForm_.+|WR[A-z]{1,2}|ClickTale[A-z]+|BAIDU_[A-z]+|Sys\$[A-z].+|[A-Z][0-9]{1,2}|[A-z]$)/;

/***************
    Elements
***************/

var $body = $("body"),
	$body_flare = $("#body-flare"),
	$bigCount = $("#body-bigCount"),
	$error = $("#body-error"),
	$header_code = $("#header-code"),
	$header_code_object = $("#header-code-object"),
	$header_code_property = $("#header-code-property"),
	$header_logo = $("#header-logo"),
	$header_logo_o = $("#header-logo o"),
	$header_hr = $("#header-hr"),
	$main = $("main"),
	$dataCols = $(".data-cols tr"),
	$data = $(".data"),
	$data_scroll = $(".dataScroll"),
	$about = $("#about"),
	$field_subscribe = $("#field--subscribe"),
	$field_search = $("#field--search"),
	$search = $("#search"),
	$footer = $("footer");

/**************
    Global
**************/

$body
	.on("click", function(event) {
		var target = event.target;

		if (target.href) {
			event.preventDefault();
			window.open(target.href)
		}

		if (target.getAttribute("data-query")) {
			var query = $(target).attr("data-query");

			for (var i = 0; i < query.length; i++) {
				(function(j) {
					setTimeout(function() {
						$search.val(query.slice(0, j + 1));

						if (j === query.length - 1) {
							setTimeout(function() {
								UI.query($search[0]);
							}, 300);
						}
					}, j * (18 - Math.min(12, query.length)) * 4);
				})(i);
			}
		}
	})
	.on("mousewheel", function(event) {
	    $data[0].scrollTop -= event.wheelDeltaY / 7.5;
	});

/**************
      UI
**************/

var UI = {
	State: {
		showingAbout: false,
		requestTarget: null,
	},
	showCount: function() {
		Velocity.RunSequence([
			{ elements: $bigCount, properties: "transition.fadeIn", options: { duration: 35 } },
			{ elements: $bigCount, properties: "callout.flicker.text" },
			{ elements: $bigCount, properties: { opacity: 0.1 }, options: { duration: 1000 } }
		]);
	},
	hideCount: function() {
		Velocity.RunSequence([
			{ elements: $bigCount, properties: "transition.fadeOut", options: { duration: 575 } },
		]);
	},
	error: function() {
		Velocity.RunSequence([
			{ elements: $data, properties: "transition.vanishTopOut", options: { sequenceQueue: false, duration: 725 } },
			{ elements: $field_search, properties: "callout.shake", options: { sequenceQueue: false, duration: 375 } },
			{ elements: $error, properties: { opacity: 1 }, options: { sequenceQueue: false, duration: 250, easing: "linear" } },
			{ elements: $error, properties: "reverse", options: { duration: 200 } },
		]);
	},
	query: function(el_target) {
		var $target = $(el_target),
			$symbols = $target.parent().find(".field-input-symbols"),
			$field_label = $target.parent().parent().find(".field-label"),
			$subscribeFields = $("#field--subscribe, #legend--subscribe");

		var target = el_target.id,
			data = $target.val(),
			symbols = (target === "search") ? [ "△", "▱", "▽", /* "◯" */ ] : [ "ネ", "カ", "仌" /*, "仚", "亼"*/ ];

		Velocity.RunSequence([
			{ elements: $target, properties: { scaleX: [ 0, "easeInOutCirc" ], opacity: [ 0, "linear" ] }, options: { duration: 225 } },
			{ elements: $field_label, properties: { opacity: 0.45 }, options: { duration: 300, sequenceQueue: false, complete: UI.activateO } },
			{ elements: $field_label.find("o"), properties: "callout.flicker", options: { delay: 1000 } }
		]);

		symbols.forEach(function(symbol, index) {
			Velocity($symbols, "reverse");
			Velocity(
				$symbols,
				{ 
					opacity: [ 0, "easeInOutsine" ], 
					color: "#79ffd6",
					scale: 1.5 - index/20
				}, 
				{ 
					duration: 225,
					easing: "linear",
					begin: function() { 
						$symbols.html(symbol);
					},
					complete: function() {
						if (index === symbols.length - 1) {
							Velocity.RunSequence([
								{ elements: $target, properties: { scaleX: [ "100%", "easeInOutCirc" ], opacity: [ 1, "linear" ] }, options: { duration: 200 } },
								{ elements: $field_label, properties: { opacity: 1 }, options: { duration: 700 } }
							]);
						}
					}
				}
			);
		});

		function request (query, callback) {
			function ajax(url) {
				$body.css("cursor", "wait");

				$.ajax({
					url: url + "&callback=?",
					type: "GET",
					contentType: "application/json",
					dataType: "json",
					success: function (response) {
						var responseParsed = JSON.parse(response);

						if (response && responseParsed.meta) {
							callback(JSON.parse(response));
						} else {
							UI.error();
						}

						$body.css("cursor", "default");
					},
					error: function() {
						UI.error();
						$body.css("cursor", "default");
					}
				});
			}

			var API = {
					hostname: "http://104.131.144.189/v1/",
					librariesPath: "libraries/",
					sitesPath: "sites/",
					scriptsPath: "scripts/"
				},
				queryNormalized;

			if (/^[-A-z0-9]+\.[-A-z0-9]+$/.test(query)) {
				queryNormalized = "site";
				query = query.toLowerCase();
			} else if (/^script:[-A-z0-9]+/.test(query)) {
				queryNormalized = "script";
				query = query.replace(/^script:/, "").toLowerCase();
			} else {
				queryNormalized = query;
			}

			switch (queryNormalized) {
				case "site":
					UI.requestTarget = "site";
					ajax(API.hostname + API.sitesPath + query + "/?");
					break;
				case "*.*":
					UI.requestTarget = "sites";
					ajax(API.hostname + API.sitesPath + "?limit=500");
					break;
				case "script":
					UI.requestTarget = "script";
					ajax(API.hostname + API.scriptsPath + query + "/?limit=500");
					break;
				case "script:*":
					UI.requestTarget = "scripts";
					ajax(API.hostname + API.scriptsPath + "?limit=1000");
					break;
				case "*":
					UI.requestTarget = "libs";
					ajax(API.hostname + API.librariesPath + "?limit=1000");
					break;
				default:
					UI.requestTarget = "lib";
					ajax(API.hostname + API.librariesPath + query + "?limit=500");
			}
		}

		if (target === "subscribe") {
			setTimeout(function() {
				$field_subscribe[0].submit();
				$target.val("Check your email.");
			}, 625);
		} else {	
			function prettifyName (name, type) {
				var prettified = name;
				var truncated = false;

				if (name.length > 20) {
					truncated = true;
					prettified = prettified.slice(0, 18);
				}

				prettified = prettified.replace(/\./g, "<span class='text-blue'>.</span>");

				if (truncated) {
					prettified = "<span title='" + name + "'>" + prettified + "…</span>";
				}

				if (type === "mobile") {
					prettified += " <span title='Appears on the mobile version of this site.' class='text-grey'>[m]</span>";
				}

				return prettified;
			}

			request(data, function(response) {
				var $html = "";
				var $columns;
				var matches = (response.results || response.sites || response.libraries);

				matches.forEach(function(match) {
					var $matchData;

					if (hiddenVariables.indexOf((match.library || match.name)) !== -1 || hiddenVariableGroups.test((match.library || match.name))) {
						return;
					}

					switch (UI.requestTarget) {
						case "site":
							$columns = "<td>lib</td><td>site count</td>";
							$matchData = "<td><a href='//" + (match.github ? ("github.com/" + match.github) : "github.com/julianshapiro/libscore/issues/1") + "'>" + prettifyName(match.name, match.type) + " <span class='text-blue'>" + (match.github ? "⇗" : "?") + "</span></a>";
							$matchData += "<td>" + numeral(match.count).format("0,0") + "</td>";
							break

						case "sites":
							$columns = "<td>site</td><td>site rank</td>";
							$matchData = "<td><span data-query='" + match.url + "'>" + prettifyName(match.url) + " <span class='text-blue'>→</span></td>";
							$matchData += "<td><span class='text-green-dark'>#</span>" + numeral(match.rank).format("0,0") + "</td>";
							break;

						case "lib":
							// also pop open an alert when 'get badge' is clicked telling people to subscribe
							$columns = "<td>" + response.count + " sites (<a href='//status.io/libscore/' class='text-grey'>get badge</a>)</td><td>site rank</td>";
							$matchData = "<td><a href='//" + match.url + "'>" + prettifyName(match.url) + " <span class='text-blue'>⇗</span></a></td>";
							$matchData += "<td><span class='text-green-dark'>#</span>" + numeral(match.rank).format("0,0") + "</td>";
							break;

						case "libs":
							$columns = "<td>lib (<a href='//api.libscore.com/libraries.txt' class='text-grey'>download full list</a>)</td><td>site count</td>";
							$matchData = "<td><a href='//" + (match.github ? ("github.com/" + match.github) : "github.com/julianshapiro/libscore/issues/1") + "'>" + prettifyName(match.library) + " <span class='text-blue'>" + (match.github ? "⇗" : "?") + "</span></a>";
							$matchData += "<td>" + numeral(match.count).format("0,0") + "</td>";
							break;

						case "script":
							$columns = "<td>" + response.count + " sites</td><td>site rank</td>";
							$matchData = "<td><a href='//" + match.url + "'>" + prettifyName(match.url) + " <span class='text-blue'>⇗</span></a></td>";
							$matchData += "<td><span class='text-green-dark'>#</span>" + numeral(match.rank).format("0,0") + "</td>";
							break;

						case "scripts":
							$columns = "<td>script</td><td>site count</td>";
							$matchData = "<td><a href='//" + match.script + "'>" + prettifyName(match.script) + "</a></td>";
							$matchData += "<td>" + numeral(match.count).format("0,0") + "</td>";
							break;
					}

					$html += "<tr>" + $matchData + "</tr>";
				});
				
				$dataCols.html($columns);
				$data.find("table").eq(1).remove();
				$data.append("<table>" + ($html || "<tr><td>no matches</td><td>0</td></tr>") + "</table>");

				if (UI.requestTarget === "lib") {
					$bigCount.html(response.count.toString());
					UI.showCount();
				} else {
					UI.hideCount();
				}

				$data_scroll.css("opacity", 0);
				Velocity($data, "transition.vanishTopIn", { 
						duration: 475,
						complete: function() {
							$data.parent().css("height", $data.outerHeight() + "px");

							if ($data[0].scrollHeight > $data.parent()[0].scrollHeight) {
								Velocity($data_scroll, "transition.fadeIn", 850);
							}
						}
				});
			});
		}
	},
	activateO: function() {
		Velocity($header_logo_o, "stop", true);
		Velocity.RunSequence([
			{ elements: $header_logo_o, properties: { opacity: 0.65, textShadowBlur: 0 }, options: { duration: 600, loop: 1 } },
			{ elements: $header_logo_o, properties: { textShadowBlur: 70, opacity: 0.85 }, options: { duration: 3000, loop: true } }
		]);
	}
};

/**************
    Events
**************/

/* Input behavior. */
$("input.field-input").on("keydown", function(event) {
	if (event.keyCode === 13) {
		UI.query(event.target);
	}
});

$("#header-code-property")
	.on("click", function() {
		UI.activateO();

		Velocity(
			[ $main[0], $header_code_property[0] ],
			"transition.vanishBottomOut",
			{ 
				duration: 450,
				display: null,
				complete: function() {
					if (UI.State.showingAbout === false) {
						$main.children().css("display", "none");
						$about.css("display", "block");
						$header_code_property.html("Back");
					} else {
						$main.children().css("display", "block");
						$about.css("display", "none");
						$header_code_property.html("About");
					}

					Velocity.RunSequence([
						{ elements: [ $main[0], $header_code_property[0] ], properties: "transition.vanishBottomIn", options: { duration: 1100 } },
						{ elements: $body_flare, properties: UI.State.showingAbout ? "transition.fadeOut" : "transition.fadeIn", options: { duration: 2000 } }
					]);

					UI.State.showingAbout = !UI.State.showingAbout;
				}
			}
		);
	});

/**************
     Init
**************/

Velocity.hook($footer, "translateX", "-50%");
Velocity.hook($bigCount, "translateX", "-50%");

Velocity.RunSequence([
	{ elements: $footer, properties: "transition.vanishBottomIn", options: { delay: 265, duration: 700 } },
	{ elements: $main, properties: "transition.clipBottomIn", options: { delay: 265, duration: 500, sequenceQueue: false } },
	{ elements: $header_hr, properties: { scaleY: [ 1, 0 ], translateZ: 0, opacity: [ 1, 0 ] }, options: { easing: "easeInOutQuad", delay: 300, duration: 400, sequenceQueue: false } },
	{ elements: $header_logo, properties: { opacity: [ 1, 0.1 ] }, options: { duration: 425, sequenceQueue: false } },
	{ elements: $header_logo_o, properties: { opacity: [ 0.60, 1 ] }, options: { sequenceQueue: false, duration: 525, loop: 2 } },
	{ elements: $header_code, properties: "transition.fadeIn", options: { sequenceQueue: false, duration: 1250, begin: function() {
			$search
				.val("jQuery")
				[0].focus();

			[ "location()", "hash()", "map()", "About" ].forEach(function(val, i) {
				Velocity($header_code_property, "transition.vanishBottomIn",
					{ 
						delay: i === 0 ? 125 : 0,
						duration: 325,
						begin: function() {
							$header_code_property.html(val);

							if (i === 1) {
								$header_code_object.html("Array.");
							}
						},
						complete: function() {
							if (i === 3) {
								Velocity.RunSequence([
									{ elements: $header_code_object, properties: "transition.fadeOut", options: { duration: 400 } },
									{ elements: $header_code_property, properties: "callout.swing", options: { duration: 850 } }
								]);
							}
						}
					}
				);
			});
		}}
	},
	{ elements: $header_logo, properties: { textShadowBlur: 70 }, options: { duration: 3000, complete: UI.activateO } }
]);

$("#legend--search .legend--search-option .accent").each(function(el, i) {
	Velocity(el, { color: "#fff" }, { delay: Math.random() * 10000, duration: 450 });
	Velocity(el, "reverse");
});

// 구끙므끗므끙푸뫼쓰뫼, ㄹㅁㅂㅅㅇㅈㅊㅋㅌㅠㅛ 