// Add here all your JS customizations

/* 
Orginal Page: http://thecodeplayer.com/walkthrough/jquery-multi-step-form-with-progress-bar 

*/
//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

$(".fs-option").click(function(){
	var selectRow = $(this).find("input");
	selectRow.attr('checked', true);
})

$(".next,.fs-option").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	next_fs = $(this).parent().next();
	
	//activate next step on progressbar using the index of next_fs
	$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
	
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale current_fs down to 80%
			scale = 1 - (1 - now) * 0.2;
			//2. bring next_fs from the right(50%)
			left = (now * 50)+"%";
			//3. increase opacity of next_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({'transform': 'scale('+scale+')'});
			next_fs.css({'left': left, 'opacity': opacity});
		
			// console.log(current_fs);
			// console.log(current_fs.parents("#contact").height());

		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
	//show the next fieldset
	next_fs.show(); 
	// change the height of container
	var heightTrans = next_fs.height() - current_fs.height();
	current_fs.parents("#contact").animate({
		height: '+=' + heightTrans,
		duration: 1000,
		easing: 'easeInOutBack'
	});
});

$(".previous").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();
	
	//de-activate current step on progressbar
	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
	
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale previous_fs from 80% to 100%
			scale = 0.8 + (1 - now) * 0.2;
			//2. take current_fs to the right(50%) - from 0%
			left = ((1-now) * 50)+"%";
			//3. increase opacity of previous_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({'left': left});
			previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});

	//show the previous fieldset
	previous_fs.show(); 
	// change the height of container
	var heightTrans = previous_fs.height() - current_fs.height();
	current_fs.parents("#contact").animate({
		height: '+=' + heightTrans,
		duration: 1000,
		easing: 'easeInOutBack'});
});

$(".submit").click(function(){
	$( "#msform" ).submit(function( event ) {
		var result = [];
		var fieldsets = $("#msform").find("fieldset");
		for (var i = 0; i < fieldsets.length - 1; i++) {
			var options = $(fieldsets[i]).find(".fs-option > input:radio");
			var value = null;
			for (var j = 0; j < options.length; j++) {
				if(options[j].checked) {
					value = options[j].value;
				}
			}
			var fieldName = options[0].getAttribute("name");
			result[result.length] = fieldName + ": " + value;
		}

		personalDetails = $(fieldsets[fieldsets.length - 1]).find("input, textarea");
		for (var i = 0; i < personalDetails.length; i++) {
			var fieldName = personalDetails[i].getAttribute("name");
			if(fieldName !== "submit" && fieldName !== "previous"){
				var value = $(personalDetails[i]).val();
				result[result.length] = fieldName + ": " + value;
			}
		}
		console.log(result);
		return false;
	});
});
