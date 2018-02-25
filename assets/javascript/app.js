var buttonList = ["Legend of Zelda", "Metal Gear", "Mario", "Metroid", "Final Fantasy", "Half-Life", "World of Warcraft", "Portal"];

function makeButtons() {
	$("#buttons").empty();
	for (var i = 0 ; i < buttonList.length ; i++) {
		var newButton = $("<button>");
		newButton.addClass("game");
		newButton.text(buttonList[i]);
		newButton.attr("data-name", buttonList[i]);
		$("#buttons").append(newButton);
	}
}

function loadGifs(game) {
	var name = $(this).attr("data-name");
	console.log(name);
	var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=Knc50IeW6tiVTKQaNLuJ8FHQPtZz7cGp&q=" + name + "&limit=10&offset=0&lang=en";
	$.ajax({
		url: queryURL,
		method: 'GET'
	}).then(function(object) {
		console.log(object);
		var spacerCol1 = $("<div>");
		spacerCol1.addClass("col-md-1");
		var spacerCol2 = $("<div>");
		spacerCol2.addClass("col-md-1");
		var firstImageRow = $("<div>");
		firstImageRow.addClass("row");
		firstImageRow.append(spacerCol1);
		var secondImageRow = $("<div>");
		secondImageRow.addClass("row");
		secondImageRow.append(spacerCol2);
		
		for (var i = 0 ; i < 10 ; i++) {
			var newImageCard = $("<div>");
			newImageCard.addClass("card col-md-2");
			var newImage = $("<img>");
			newImage.addClass("gif card-img-top");
			newImage.attr("src", object.data[i].images.fixed_width_still.url);
			newImage.attr("data-status", "still");
			newImage.attr("data-still", object.data[i].images.fixed_width_still.url);
			newImage.attr("data-animate", object.data[i].images.fixed_width.url);
			newImageCard.append(newImage);
			var newCardText = $("<div>");
			newCardText.addClass("card-text text-center")
			newCardText.html("<p>Rating: "+object.data[i].rating.toUpperCase()+"</p>");
			newCardText.append("<a href='"+object.data[i].images.original.url+"' class='btn btn-dark' target='blank'>View Full Size</a></p>");
			newImageCard.append(newCardText);
			if (i < 5) {
				firstImageRow.append(newImageCard);
			}
			else {
				secondImageRow.append(newImageCard);
			}

		$("#images").prepend(secondImageRow);
		$("#images").prepend(firstImageRow);
			
		}
	})
}

function changeState(image) {
	if ($(this).attr("data-status") === "still") {
		$(this).attr("src", $(this).attr("data-animate"));
		$(this).attr("data-status", "animate");
	}
	else {
		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-status", "still");
	}
}

$("#addButton").on("click", function(event) {
	event.preventDefault();
	var newGame = $("#buttonText").val().trim();
	console.log(newGame);
	buttonList.push(newGame);
	makeButtons();
})

$(document).on("click", ".game", loadGifs);
$(document).on("click", ".gif", changeState);

makeButtons();