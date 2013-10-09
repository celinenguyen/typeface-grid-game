//= require_tree .

$(document).ready(function() {

	var square_size = 250;
	var grid_size = square_size * 3;
	var empty_top = square_size;
	var empty_left = square_size;

	$.getJSON( "/characters.json", function(data) {

		var character_ids = [];
	  $.each( data, function(key, value) {
	    character_ids.push(value);
	  });

		function random_id() {
			var index = Math.floor(Math.random() * data.length);
			var id = character_ids.splice(index, 1);
			return id;
		}

		$("#refresh").click(function(event) {
			// @todo
		});

	});

	function check_adjacency(et, el, tt, tl) {
		et = parseInt(et);
		el = parseInt(el);
		tt = parseInt(tt);
		tl = parseInt(tl);
		// same row and adjacent column
		if ((et === tt) && (el + square_size === tl || el - square_size === tl)) {
			return true;
		}
		// same column and adjacent row;
		if ((el === tl) && (et + square_size === tt || et - square_size === tt)) {
			return true;
		}
		else return false;
	}

  $(".character").click(function(event) {
  	// store location
    var temp_top = $(this).css("top");
    var temp_left = $(this).css("left");
    if (check_adjacency(empty_top, empty_left, temp_top, temp_left)) {
    	// move item
      $(this).css("top", empty_top);
      $(this).css("left", empty_left);
      // reassign empty space
      empty_top = temp_top;
      empty_left = temp_left;
    }
    else {
    	console.log("nope");
    }
  });

});