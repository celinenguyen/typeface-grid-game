//= require_tree .

$(document).ready(function() {

	var square_size = 250;
	var grid_size = square_size * 3;
	var empty_top = square_size;
	var empty_left = square_size;

	// load in character classes
	$.getJSON( "characters.json", function(data) {

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

  // recolor character tiles on doubleclick
  $(".character").dblclick(function(event) {
  	$(this).toggleClass("inverted");
  });

  // clear UI on toggles
  function clear_weight_toggles() {
  	$('#normal').removeClass("on");
		$('#italic').removeClass("on");
		$('#bold').removeClass("on");
		$('#bolditalic').removeClass("on");
	}

	// clear UI exclusive-on toggles
	function clear_weight_exclusive_toggles() {
		var exclusives = $(".exclusive-on");
		exclusives.removeClass("exclusive-on");
		exclusives.addClass("on");
	}

	function change_on_to_exclusive_on() {
		$(".on").toggleClass("exclusive-on");
		$(".on").toggleClass("on");
		var all_characters = $('.character');
		var style = $(".exclusive-on")[0].id;
		for (var i = 0; i < all_characters.length; i++) {
			var item = all_characters[i];
			$(item).attr('class', 'character'); // clears old style classes
			$(item).addClass(style);
		}
	}

	function select_some_to_restyle(style) {
		var all_characters = $('.character');
		for (var i = 0; i < 3; i++) {
			var index = Math.floor(Math.random() * all_characters.length);
			var item = all_characters[index];
			$(item).attr('class', 'character'); // clears old style classes
			$(item).addClass(style);
		}
	}

	function get_active_styles() {
		var active_styles = [];
		var styles_on = $('#options .on');
		for (var i = 0; i < styles_on.length; i++) {
			var id = $(styles_on)[i].id;
			active_styles.push($(styles_on)[i].id);
		}
		return active_styles;
	}

	function unstyle_all_of_style(style) {
		var active_styles = get_active_styles();
		console.log(active_styles);
		var selector = "." + style;
		var to_unstyle = $(selector);
		console.log(to_unstyle);
		for (var i = 0; i < to_unstyle.length; i++) {
			var index = Math.floor(Math.random() * active_styles.length);
			var new_style = active_styles[index];
			var item = to_unstyle[i];
			$(item).addClass(new_style);
			$(item).removeClass(style);
		}
	}

	// change weight single click
  $("#normal").click(function(event) {
  	$(this).toggleClass("on");
  	if ($(this).hasClass("on")) {
  		clear_weight_exclusive_toggles();
  		if ($(".on").length === 1) {
  			change_on_to_exclusive_on();
  		}
  		else {
  			select_some_to_restyle("normal");
  		}
  	}
  	else {
  		unstyle_all_of_style("normal");
  		if ($(".on").length === 1) {
  			change_on_to_exclusive_on();
  		}
  	}
  });
  $("#italic").click(function(event) {
  	$(this).toggleClass("on");
  	if ($(this).hasClass("on")) {
  		clear_weight_exclusive_toggles();
  		if ($(".on").length === 1) {
  			change_on_to_exclusive_on();
  		}
  		else {
  			select_some_to_restyle("italic");
  		}
  	}
  	else {
  		unstyle_all_of_style("italic");
  		if ($(".on").length === 1) {
  			change_on_to_exclusive_on();
  		}
  	}
  });
  $("#bold").click(function(event) {
  	$(this).toggleClass("on");
  	if ($(this).hasClass("on")) {
  		clear_weight_exclusive_toggles();
  		if ($(".on").length === 1) {
  			change_on_to_exclusive_on();
  		}
  		else {
  			select_some_to_restyle("bold");
  		}
  	}
  	else {
  		unstyle_all_of_style("bold");
  		if ($(".on").length === 1) {
  			change_on_to_exclusive_on();
  		}
  	}
  });
  $("#bolditalic").click(function(event) {
  	$(this).toggleClass("on");
  	if ($(this).hasClass("on")) {
  		clear_weight_exclusive_toggles();
  		if ($(".on").length === 1) {
  			change_on_to_exclusive_on();
  		}
  		else {
  			select_some_to_restyle("bolditalic");
  		}
  	}
  	else {
  		unstyle_all_of_style("bolditalic");
  		if ($(".on").length === 1) {
  			change_on_to_exclusive_on();
  		}
  	}
  });

  // change weight double click
  $("#normal").dblclick(function(event) {
  	clear_weight_exclusive_toggles();
  	clear_weight_toggles();
  	$(this).toggleClass("on");
  	change_on_to_exclusive_on();
  });
  $("#italic").dblclick(function(event) {
  	clear_weight_exclusive_toggles();
  	clear_weight_toggles();
  	$(this).toggleClass("on");
  	change_on_to_exclusive_on();
  });
  $("#bold").dblclick(function(event) {
  	clear_weight_exclusive_toggles();
  	clear_weight_toggles();
  	$(this).toggleClass("on");
  	change_on_to_exclusive_on();
  });
  $("#bolditalic").dblclick(function(event) {
  	clear_weight_exclusive_toggles();
  	clear_weight_toggles();
  	$(this).toggleClass("on");
  	change_on_to_exclusive_on();
  });

});