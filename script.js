// $("#header_logo span").each(function(val, i) {
// 	//this.style.color = "rgb(" + [ 195 + i*6, 195 + i*6, 195 + i*6 ].join(", ") + ")";
// 	if (i === 5) {
// 		this.style.color = "rgb(" + [ 224, 224, 224 ].join(", ") + ")";
// 	}
// });
// svg icons

/* Loading */
Velocity.RunSequence([
	{ elements: $("footer"), properties: "transition.vanishBottomIn", options: { duration: 1000 } },
	{ elements: $("main"), properties: "transition.clipBottomIn", options: { duration: 500, delay: 265, sequenceQueue: false, complete: function() {
		$("#lookup")[0].focus();
		$("#lookup").val($("#lookup").val())
	} } },
	{ elements: $("header hr"), properties: { scaleY: [ 1, 0 ], translateZ: 0, opacity: 1 }, options: { easing: "easeInOutQuad", delay: 250, duration: 400, sequenceQueue: false } },
	{ elements: $("#header-logo"), properties: { opacity: [ 1, 0.2 ] }, options: { duration: 425, sequenceQueue: false } },
	{ elements: $("#body-flare"), properties: { opacity: 0.75 }, options: { easing: "linear", duration: 2750 } },
	{ elements: $("#header-logo o"), properties: { opacity: 0.60 }, options: { sequenceQueue: false, duration: 560, loop: 2 } },
	{ elements: $("#code"), properties: "transition.fadeIn", options: { sequenceQueue: false, duration: 1250, begin: function() {
			var $codesnippet = $("#codesnippet");

			[ "location()", "hash()", "reduce()", "map()", "filter()" ].forEach(function(val, i) {
				Velocity($codesnippet, "transition.vanishBottomIn",
					{ 
						delay: i === 0 ? 125 : 0,
						duration: 300 - (i * 3),
						begin: function() {
							$codesnippet.html(val);

							if (i === 2) {
								$("#shlong").html("Array");
								Velocity($("#dong"), "callout.flicker");
							}
						},
						complete: function() {
							if (i === 4) {
								Velocity($("#dong"), "transition.fadeOut", 400);
							}
						}
					}
				);
			});
		}}
	},
	{ elements: $("#header-logo"), properties: { textShadowBlur: 70 }, options: { duration: 3000 } },
	{ elements: $("#header-logo o"), properties: { textShadowBlur: 20 }, options: { duration: 800 } },
	{ elements: $("#header-logo o"), properties: { textShadowBlur: 0, opacity: 0.85 }, options: { duration: 3000, loop: true } }
]);

Velocity($("input.field-input"), "callout.glitch", { delay: 2000, begin: function() {
	$(this).val("구끙므끗므끙푸뫼쓰뫼");
	$(this).val("ㄹㅁㅂㅅㅇㅈㅊㅋㅌㅠㅛ");
}})
Velocity($("input.field-input"), "callout.glitch", { delay: 135, begin: function() {
	$(this).val("variable or domain");
}});

/* Action */
var UI = {
	resetInput: function(event) {
		var target = event.target;
		Velocity(target, "stop", true);
		Velocity(target, { color: "#a7c03e" }, this.nodeType ? 750 : 1);
	}
};

$("input.field-input")
	.on("mouseover", function() {
		Velocity(this, { color: "#f1ff07" }, { loop: true, duration: 1350 });
	})
	.on("mouseout", UI.resetInput)
	.on("keydown", function(event) {
		if (event.keyCode === 13) {

			var target = this,
				targetID = this.id,
				symbols = (targetID === "lookup") ? [ "ネ", "カ", "仚", "仌", "亼" ] : [ "△", "▱", "▽", "◯" ];

			var $symbols = $(target).parent().find(".field-input-symbols"),
				$field_label = $(target).parent().parent().find(".field-label");

			UI.resetInput(event);

			Velocity.RunSequence([
				{ elements: $field_label, properties: { opacity: 0.45 }, options: { duration: 400, queue: false } },
				{ elements: target, properties: { scaleX: [ 0, "easeInOutCirc" ], opacity: [ 0, "linear" ] }, options: { duration: 150, sequenceQueue: false } },
				{ elements: $("#field--lookup o").eq(0), properties: "callout.flicker", options: { delay: 1000 } },
			]);

			symbols.forEach(function(symbol, index) {
				Velocity($symbols, "reverse");
				Velocity(
					$symbols,
					{ 
						opacity: 0, 
						scale: 1.5 - index/20
					}, 
					{ 
						delay: index === 0 ? 25 : 0,
						duration: 225 + (index * 5),
						begin: function() { 
							$symbols.html(symbol);
						},
						complete: function() {
							if (index === symbols.length - 1) {
								Velocity.RunSequence([
									{ elements: $field_label, properties: { opacity: 2 }, options: { duration: 700, sequenceQueue: false } },
									{ elements: target, properties: { scaleX: [ "100%", "easeInOutCirc" ], opacity: [ 1, "linear" ] }, options: { duration: 150 } },
								]);

								if (targetID === "lookup") {
									Velocity.RunSequence([
										{ elements: target, properties: { paddingBottom: 300 }, options: { duration: 400, easing: "easeInOutCirc" } },
										{ elements: $("#field--subscribe, #legend--subscribe"), properties: "transition.fadeIn", options: { duration: 3000, stagger: 750 } }
									]);
								} else if (targetID === "subscribe") {
									$(target).val("check your email");
								}
							}
						}
					}
				);
		    });
		}
	});

$("#legend--lookup")
	.on("mouseenter", function() {
		Velocity(this, { opacity: 1 }, { duration: 225, queue: false, easing: "easeInOutQuad" });
	})
	.on("mouseleave", function() {
		Velocity(this, { opacity: 0.3 }, { duration: 225, queue: false, easing: "easeInOutQuad" });
	});

$("a").on("click", function(event) {
	event.preventDefault();
	window.open(this.href)
});