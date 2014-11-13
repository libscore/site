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
	$bigError = $("#body-bigError"),
	$bigCount = $("#body-bigCount"),
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
	$about = $("#about"),
	$sectionHeader_search = $("#sectionHeader--search"),
	$search_ = $("#search_"),
	$search = $("#search"),
	$searchSymbols = $("#searchSymbols"),
	$queryButtons = $("#queryButtons span"),
	$howTo = $("#howTo"),
	$footer = $("footer"),
	$subscribe_ = $("#subscribe_"),
	$subscribe = $("#subscribe");

/**************
    Global
**************/

$(window).on("mousewheel", function(event) {
	$data_table[0].scrollTop += event.originalEvent.deltaY / 2;
	$data_scroll.filter(":visible").velocity("transition.fadeOut");
});

$body.on("mousedown", function(event) {
	var target = event.target,
		dataQuery = target.getAttribute("data-query");

	if (target.href) {
		event.preventDefault();
		window.open(target.href)
	}

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

		$.Velocity(target, "callout.pulse", 250);
	}
});

/***************
    Helpers
***************/

$search.one("mouseup", function() {
	$search.select();
});

$subscribe.one("mouseup", function() {
	$subscribe
		.val("email@domain.com")
		.select();
});

$data_scroll.one("mousedown", function() {
	$data_table[0].scrollTop += 50;
	$data_scroll.velocity("transition.slideDownBigOut");
});

/**************
      UI
**************/

var UI = {
	loading: false,
	showCount: function() {
		$.Velocity.RunSequence([
			{ elements: $bigCount, properties: { color: "#2eca3f" }, options: { duration: 1 } },
			{ elements: $bigCount, properties: "transition.vanishBottomIn", options: { duration: 225 } },
			{ elements: $bigCount, properties: "callout.flicker.text" },
			{ elements: $bigCount, properties: { opacity: 0.05 }, options: { delay: 250, duration: 750 } },
			{ elements: $bigCount, properties: { color: "#000000" }, options: { duration: 550 } }
		]);
	},
	hideCount: function() {
		$.Velocity.RunSequence([
			{ elements: $bigCount, properties: "transition.fadeOut", options: { duration: 575 } }
		]);
	},
	error: function() {
		$body.velocity("stop", true);

		$.Velocity.RunSequence([
			{ elements: $search_, properties: "callout.shake", options: { duration: 375, sequenceQueue: false } },
			{ elements: $body, properties: { borderColor: "#ff0000" }, options: { sequenceQueue: false, duration: 400 } },
			{ elements: $bigError, properties: "transition.fadeIn", options: { sequenceQueue: false, duration: 225 } },
			{ elements: $bigError, properties: "transition.fadeOut", options: { duration: 300 } },
			{ elements: $body, properties: "reverse", options: { sequenceQueue: false, duration: 500 } }
		]);
	},
	query: function() {
		var data = $search.val();

		$.Velocity.RunSequence([
			{ elements: $search, properties: { opacity: .4 }, options: { sequenceQueue: false, duration: 225 } },
			{ elements: $body, properties: { borderColor: "#3dd46d" }, options: { duration: 400, sequenceQueue: false } },
			{ elements: $sectionHeader_search, properties: { opacity: 0.45 }, options: { duration: 300, sequenceQueue: false } },
			{ elements: $sectionHeader_search.find("o"), properties: "callout.flicker", options: { delay: 300 } }
		]);

		(function indicator () {
			var symbols = [ "□","◅","◇","○" ];

			symbols.forEach(function(symbol, index) {
				$.Velocity($searchSymbols, "reverse");
				$.Velocity(
					$searchSymbols,
					{ 
						opacity: [ 0, "easeInOutsine" ], 
						color: "#29BD66",
						scale: 2 - index/20
					}, 
					{ 
						duration: 300,
						easing: "linear",
						begin: function() { 
							$searchSymbols.html(symbol);
						},
						complete: function() {
							if (UI.loading === false) {

								$search
									.velocity({ scaleX: [ "100%", "easeInOutCirc" ], opacity: [ 1, "linear" ] }, { sequenceQueue: false, duration: 350 });

								$.Velocity.RunSequence([
									{ elements: $body, properties: { borderColor: "#000" }, options: { queue: false } },
									{ elements: $sectionHeader_search, properties: { opacity: 1 }, options: { duration: 700 } }
								]);
							} else if (index === symbols.length - 1) {
								indicator();
							}
						}
					}
				);
			});
		})();

		$("#header-logo").on("click", function (){
			$("body").removeClass("results");
		});

		function request (query, callback) {
			var API = {
					hostname: "http://107.170.240.125/v1/",
					librariesPath: "libraries/",
					sitesPath: "sites/",
					scriptsPath: "scripts/"
				},
				queryNormalized;

			function ajax(url) {
				UI.loading = true;
				$html.css("cursor", "wait");
				$("body").addClass("results");

				$.ajax({
					url: API.hostname + url,
					dataType: "json",
					complete: function() {
						UI.loading = false;
						$html.css("cursor", "default");
						
					},
					success: function (response) {
						if (response && response.meta) {
							callback(response);
						} else {
							UI.error();
						}
					},
					error: UI.error
				});
			}

			if (/\.js$/.test(query)) {
				alert("Be careful: We noticed you suffixed your search query with '.js'. Instead, you need to enter the exact case-sensitive VARIABLE that a library exposes itself under -- not simply the name of the library.");
			}

			query = $.trim(query.replace(/^(^https?:\/\/)?(www\.)?/i, "").replace(/^jQuery\./i, "$.").replace(/\.js$/i, ""));
			if (query === "jquery" || query === "$") {
				if (query === "jquery") {
					alert("Be careful: Variable lookup is case sensitive. We've gone ahead and turned 'jquery' into 'jQuery' for you. Remember that you need to enter the exact case-sensitive VARIABLE that a library epxoses itself under -- not simply the name of the library.");
				}

				query = "jQuery";
			}
			$search.val(query);
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
				alert("OMG. RECURSION!!@#!KJ$K BRAIN EXPLOSION. AHAHAHAHAHAHHHHHHH\n\nJust kidding. Let's pull some data from you.")
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
			var prettified = name;
			var truncated = false;

			if (name.length > 40) {
				truncated = true;
				prettified = prettified.slice(0, 37);
			}

			prettified = prettified.replace(/\./g, "<span class='accent'>.</span>");

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
						$columns = "<div>library</div><div>site count</div>";

						var isScript = /^script:/.test(match.name);

						if (isScript) {
							$matchData = "<td><a href='//" + match.name.replace(/^script:/, "") + "'>" + prettifyName(match.name, match.type) + "</a> <span class='text-blue'>⬈</span></td>";
						} else {
							$matchData = "<td><a href='//" + (match.github ? ("github.com/" + match.github) : "github.com/julianshapiro/libscore/issues/1") + "'>" + prettifyName(match.name, match.type)
							$matchData += " <span class='text-blue'>" + (match.github ? "⬈" : "<span class='hint' data-hint='Click to help track down this library.'>?</span>") + "</span></a>";
						}

						$matchData += "<td>" + prettifyNumber(match.count) + "</td>";
						break

					case "sites":
						$columns = "<div>site</div><div>site rank</div>";
						$matchData = "<td><span data-query='" + match.url + "'>" + prettifyName(match.url) + "</span> <span class='text-green'>→</span></td>";
						$matchData += "<td>" + prettifyNumber(match.rank, true) + "</td>";
						break;

					case "lib":
						$columns = "<div><span id='data_badge'>" + prettifyNumber(response.count) + "</span> sites <a href='http://107.170.240.125/badge/" + $search.val() + ".svg'>Get badge</a></div></div><div>site rank</div>";
						$matchData = "<td><a href='//" + match.url + "'>" + prettifyName(match.url) + " <span class='text-blue'>⬈</span></a></td>";
						$matchData += "<td>" + prettifyNumber(match.rank, true) + "</td>";
						break;

					case "libs":
						$columns = "<div>library <a href='https://107.170.240.125/libraries.txt'>Download list</a></div><div>site count</div>";
						$matchData = "<td><a href='//" + (match.github ? ("github.com/" + match.github) : "github.com/julianshapiro/libscore/issues/1") + "'>" + prettifyName(match.library) + " <span class='text-blue'>" + (match.github ? "⬈" : "<span class='hint' data-hint='Click to help track down this library.'>?</span>") + "</span></a>";
						$matchData += "<td>" + prettifyNumber(match.count) + "</td>";
						break;

					case "script":
						$columns = "<div>" + prettifyNumber(response.count) + " sites</div><div>site rank</div>";
						$matchData = "<td><a href='//" + match.url + "'>" + prettifyName(match.url) + " <span class='text-blue'>⬈</span></a></td>";
						$matchData += "<td>" + prettifyNumber(match.rank, true) + "</td>";
						break;

					case "scripts":
						$columns = "<div>script</div><div>site count</div>";
						$matchData = "<td><span data-query='script:" + match.script + "'>" + prettifyName(match.script) + "</span> <span class='text-green'>→</span></td>";
						$matchData += "<td>" + prettifyNumber(match.count) + "</td>";
						break;
				}

				$html += "<tr>" + $matchData + "</tr>";
			});

			switch (UI.requestTarget) {
				case "lib":
					$bigCount.html(prettifyNumber(response.count));
					UI.showCount();
					break;

				default:
					UI.hideCount();
			}

			$data_table
				.css("opacity", 0)
				[0].scrollTop = 0;

			if ($html) {
				$data_cols.html($columns);
				$data_table.html($html);
			} else {
				$data_cols.html("<div>library</div><div>site count</div>")
				$data_table.html("<tr><td class='text-red'>No libraries or scripts were detected on this site.</td><td class='text-red'>Ø</td></tr>");
			}

			$.Velocity.RunSequence([
				{ elements: $data_cols.find("div"), properties: "transition.glitchIn" },
				{ elements: $data_table, properties: "transition.vanishBottomIn", options: { 
					sequenceQueue: false,
					display: "block",
					duration: 475,
					complete: function() {
						if ($data_table[0].scrollHeight > $data_table.height()) {
							$data_scroll
								.velocity("stop", true)
								.velocity("transition.fadeIn", 850);

							if (matches.length > 900) {
								$data_table.append("<tr id='data_more'><td>Results after 1,000 are not shown. Query our <a href='https://github.com/julianshapiro/libscore'>API</a> for a complete list.</td><td></td></tr>");
							}
						} else {
							$data_scroll.css("opacity", 0);
						}
					}
				} },
				{ elements: $subscribe_.filter(":hidden"), properties: "transition.glitchIn", options: { delay: 4500, duration: 300 } },
				{ elements: $subscribe.filter(":hidden"), properties: "transition.glitchIn", options: { delay: 25, duration: 300 } }
			]);
		});
	}
};

/**************
    Events
**************/

if (localStorage.getItem("subscribed") === "true") {
	$subscribe.remove();
}

/* Input behavior. */
$("input").on("keydown", function(event) {
	if (event.keyCode === 13 && this.value !== "") {
		if (this.id === "search" && this.value !== "variable (case sensitive) or domain...") {
			UI.query(event.target);
		} else if (this.id === "subscribe" & this.value !== "email@domain.com") {
			localStorage.setItem("subscribed", "true");

			$subscribe_.submit();
			$subscribe.remove();
		}
	}
});

/**************
     Init
**************/

$.Velocity.hook($footer, "translateX", "-50%");
$.Velocity.hook($bigCount, "translateX", "-50%");

$(window).load(function() {
	$.Velocity.RunSequence([
		{ elements: $footer, properties: "transition.vanishBottomIn", options: { delay: 265, duration: 700 } },
		{ elements: $header_logo, properties: { opacity: [ 1, 0.1 ] }, options: { duration: 425, sequenceQueue: false } },
		{ elements: $slogan, properties: "transition.clipBottomIn", options: { delay: 265, duration: 625, sequenceQueue: false } },
		{ elements: $search_, properties: "transition.clipBottomIn", options: { delay: 265, duration: 625, sequenceQueue: false } },
		{ elements: $queryButtons, properties: "transition.clipBottomIn", options: { delay: 365, duration: 625, stagger: 185, sequenceQueue: false } },
		{ elements: $howTo, properties: "transition.clipBottomIn", options: { delay: 665, duration: 625, sequenceQueue: false } },
		{ elements: $header_logo_o, properties: { opacity: [ 0.6, 1 ] }, options: { sequenceQueue: false, duration: 500, loop: 2 } },
		{ elements: $header_code, properties: "transition.fadeIn", options: { sequenceQueue: false, duration: 500, begin: 
			function() {
					var hash = window.location.hash.slice(1);

					if (hash) {
						$search.attr("placeholder", hash);
						UI.query();
					} else {
						$search.attr("placeholder", "variable (case sensitive) or domain...");
					}

					[ "location()", "hash()", "map()", "<a href='//medium.com/@Shapiro/be93165fa497'>About</a>" ].forEach(function(val, i) {
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