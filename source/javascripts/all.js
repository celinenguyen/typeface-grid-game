//= require_tree .

$(document).ready(function() {

	var square_size = 250;
	var grid_size = square_size * 3;
	var empty_top = square_size;
	var empty_left = square_size;

	// load in character classes
	$.getJSON( "/characters.json", function(data) {

		var character_ids = [];
	  $.each( data, function(key, value) {
	    character_ids.push(value);
	  });

	  // remove existing classes
	  var initial_grid = $(".character > div");
	  for (var i = 0; i < initial_grid.length; i++) {
	  	var remove_id = initial_grid[i].id;
	  	var remove_index = character_ids.indexOf(remove_id);
	  	if (remove_index >= 0) {
	  		var removed = character_ids.splice(remove_index, 1);
	  	}
	  }

	  // helper function: take out random ID from character_ids
		function random_id() {
			var index = Math.floor(Math.random() * character_ids.length);
			var id = character_ids.splice(index, 1);
			if (!id || 0 === id.length) {
				console.log("id is " + id);
				console.log(character_ids);
			}
			return id;
		}

		$("#refresh").click(function(event) {
			var current_grid = $(".character > div");
		  for (var i = 0; i < initial_grid.length; i++) {
		  	// put back old id
		  	character_ids.push(current_grid[i].id);
		  	// get new id
		  	var new_id = random_id();
		  	// replace id
		  	$(current_grid[i]).css("opacity", 0);
		  	$(current_grid[i]).attr("id", new_id);
			  $(current_grid[i]).fadeTo("slow", 1);
		  }
		});

	});

	// helper function: check square adjacency
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

	// move character tiles on click
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
  });

  // change weight
  $("#normal").click(function(event) {
  	$('#grid').css("font-style", "normal")
  	$('#grid').css("font-weight", "normal")
  });
  $("#italic").click(function(event) {
  	$('#grid').css("font-style", "italic")
  	$('#grid').css("font-weight", "normal")
  });
  $("#bold").click(function(event) {
  	$('#grid').css("font-style", "normal")
  	$('#grid').css("font-weight", "bold")
  });
  $("#bolditalic").click(function(event) {
  	$('#grid').css("font-style", "italic")
  	$('#grid').css("font-weight", "bold")
  });

});