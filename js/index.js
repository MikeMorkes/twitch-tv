$(document).ready(function() {

	// switchIt buttons
	$('#all').click(function(evt) {
		evt.preventDefault();
		$(".list-online, .list-offline, .list-dead").removeClass("hideIt");
	})
	$('#online').click(function(evt) {
		evt.preventDefault();
		$(".list-online").removeClass("hideIt");
		$(".list-offline, .list-dead").addClass("hideIt");
	})
	$('#offline').click(function(evt) {
		evt.preventDefault();
		$(".list-offline, .list-dead").removeClass("hideIt");
		$(".list-online").addClass("hideIt");
	})

})

// channel list array
var channelList = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

// slices the array into individual channels 
function channelSlice(value, index) {
	var broadcast;
	var switchIt;
	var timer;

	// grab data to find out if the channels are streaming, not streaming, or dead
	$.getJSON("https://wind-bow.gomix.me/twitch-api/streams/" + channelList[index] + "?callback=?", function(resultStreams) {
		
		console.log("https://wind-bow.gomix.me/twitch-api/streams/" + channelList[index] + "?callback=?");

		// assign variable based on stream status
		if (resultStreams.stream === undefined) {
			broadcast = "Dead";
		} else if (resultStreams.stream === null) {
			broadcast = "Offline";
		} else {
			broadcast = "Online";
		};

		// grab data about each channel
		$.getJSON("https://wind-bow.gomix.me/twitch-api/channels/" + channelList[index] + "?callback=?", function(result) {

			// check to see if channel has a logo - give custom logo based on offline or dead
			if (result.logo === undefined) {
				result.logo = "http://www.mikemorkes.com/codepen/twitch/dead_logo.png";
			} else if (result.logo === null) {
				result.logo = "http://www.mikemorkes.com/codepen/twitch/generic_logo.png";
			};

			// style and populate an online channel
			if (broadcast === "Online") {

					$("#online-channels").append('<div class="row list-online channel" id="list-online"><a href="https://www.twitch.tv/' + result.name + '" target="_blank"><div class="col-sm-1 logo-bkgd"><p class="topper" id="logo"><img class="logo" src="' + result.logo + '" width="50" height="50"></p></div><div class="col-sm-4"><h3 id="twitch-name">' + result.display_name + '</h3></div><div class="col-sm-6"><p class="topper" id="stream">' + result.game + ": " + result.status + '</p></div></a></div>');
					switchIt = "Online";


				// style and populate a dead channel					
			} else if (broadcast === "Dead") { // this helps make sure the dead channels display last if we have to wait for the data to come in on the channels that do exist

					$("#dead-channels").append('<div class="row list-dead" id="list-dead"><div class="col-sm-1 logo-bkgd"><p class="topper" id="logo"><img class="logo" src="' + result.logo + '" width="50" height="50"></p></div><div class="col-sm-4"><h3 id="twitch-name">' + value + '</h3></div><div class="col-sm-6"><p class="topper" id="stream">' + 'Account Closed/Does Not Exist' + '</p></div></div>');
					switchIt = "Offline";


			} else {

				// style and populate an offline channel	
											 
					$("#offline-channels").append('<div class="row list-offline channel" id="list-offline"><a href="https://www.twitch.tv/' + result.name + '" target="_blank"><div class="col-sm-1 logo-bkgd"><p class="topper" id="logo"><img class="logo" src="' + result.logo + '" width="50" height="50"></p></div><div class="col-sm-4"><h3 id="twitch-name">' + result.display_name + '</h3></div><div class="col-sm-6"><p class="topper" id="stream">' + 'Offline' + '</p></div></a></div>');
					switchIt = "Offline";


			}

		})
	})

}

// Using the forEach method, grab each channel name from the array and loop it in code above
channelList.forEach(channelSlice);