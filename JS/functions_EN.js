//Global Variables*********************************************************

// timer global variables
var tmr,target_datehours, minutes, seconds, milliseconds;
//variable to store the current game currency
var currencysym = "";
//variable to store the folder name for the selected game version 
var datafolder = "";

var histdescriptions = {
	transfer   : "Transfer",
	propsell   : "Property Sell",
	mortprop   : "Mortgaged property",
	mortpaid   : "Mortgage payed",
	housebought: "House/Hotel buy",
	housesold  : "House/Hotel sell",
	setbankrupt: "Bankruptcy Declaration"
};

//variable to store the current game data
var game = {
	init: 	   0,  //it stores the current state of the new game dialog
	nplayers:  0,  //number of players
	initmoney: 0,  //selected initial amount of money
	goamount:  0,  //amount of money when passing through 'go'
	players:   [], //players data
	cards:     {}, //chance & comunity chest cards
	taxes: {       //income & luxury taxes cost
		income: ["10%", 0],
		luxury: 0
	},
	propsdet: {	   //detailed property list
		utilities: {},
		railroads: {},
		streets:   []
	},
	avalprops: [], //avaliable properties (to buy)
	soldprops: [], //bought properties
	mortprops: [], //mortgaged properties
	hist:      []  //history of transactions
};

//saves bank's info
game.players[0] = {
	name:   "Bank",
	color:  "",
	money:  Infinity,
	worth:  Infinity,
};
//*************************************************************************

//timer *******************************************************************
function myTimer() {
	// find the amount of "seconds" between now and target
	var current_date = new Date().getTime();
	var milliseconds_left = (target_date - current_date);
	if (milliseconds_left < 10) {
		stopTmr();
		clearTmr();
		return;
	}

	// do some time calculations
	hours = parseInt(milliseconds_left / 3600000);
	milliseconds_left = milliseconds_left % 3600000;

	minutes = parseInt(milliseconds_left / 60000);
	milliseconds_left = parseInt(milliseconds_left % 60000);

	seconds = parseInt(milliseconds_left / 1000);
	milliseconds = parseInt((milliseconds_left % 1000) / 10);

	// set tag value
	$("#auctionhoursleft").html(pad2(hours));
	$("#auctionminsleft").html(pad2(minutes));
	$("#auctionsecsleft").html(pad2(seconds));
	$("#auctionmillsleft").html(pad2(milliseconds));
}

//stop the timer
function stopTmr() {
	clearInterval(tmr);
}

//clear the timer
function clearTmr() {
	clearInterval(tmr);
	$(".tmr-segment").html("00");
}

//returns the number using at least 2 digits
function pad2(number) {
	return ((number < 10) ? "0" : "") + number
}
//*************************************************************************

//GeneralPurpose Functions*************************************************

//change color luminance
function ColorLuminance(hex, lum) {

	// validate hex string
	hex = String(hex).replace(/[^0-9a-f]/gi, '');
	if (hex.length < 6) {
		hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
	}
	lum = lum || 0;

	// convert to decimal and change luminosity
	var rgb = "#", c, i;
	for (i = 0; i < 3; i++) {
		c = parseInt(hex.substr(i*2,2), 16);
		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		rgb += ("00"+c).substr(c.length);
	}

	return rgb;
}

//generate a random color
function randcolor() {
	var num = "#" + (Math.random() * 0xFFFFFF << 0).toString(16);
	while(num.length < 7)
			num = "#0" + num.substr(1);
	return (num);
}

//loads a .js file
function loadjs(src, id) {
	$("#" + id).remove(); //removes any existing element with this id (BE CAREFULL!!)

	var script= document.createElement('script');
	script.type = 'text/javascript';
	script.id = id;
	script.src = src;
	document.getElementsByTagName('head')[0].appendChild(script);
}
//**************************************************************************

function onokmodal() {
	var txt = "";

	if(game["init"] === 1 && $("#nJugadores").val() < 2){
		game["init"] = 0;
	}

	//if the user pressed ok on 'new game' dialog and the choosed number of players is at least 2
	//then it will show the players info options
	if (game["init"] === 1 && $("#nJugadores").val() > 1) {

		game["init"]++;
		game["nplayers"]  = $("#nJugadores").val();
		game["initmoney"] = $("#inicial").val();

		for (var i = 1; i <= game["nplayers"]; i++) {
			txt += "<table class='table' id='jugador" + i + "'>" +
				"<thead><tr><th><center><b>Player: " + i + "</b></center></th></tr></thead>" +
				"<tbody>" +
					"<tr><td>" +
						"<div class='form-group row'>" +
							"<label for='Nombre" + i + "' class='col-sm-2 col-form-label'>Name:</label>" +
							"<div class='col-sm-10'>" +
								"<input type='text' id='Nombre" + i + "' class='form-control input-sm' placeholder='AndRBR'>" +
							"</div>" +
						"</div>" +
						"<div class='form-group row'>" +
							"<label for='colorsel" + i + "' class='col-sm-2 col-form-label'>Color:</label>" +
							"<div class='col-sm-10'>" +
								"<input type='color' id='colorsel" + i + "' class='form-control input-sm' value='" + randcolor() + "'>" +
							"</div>" +
							"<script>" +
								"game.players[" + i + "] = {name: '', color: $('#colorsel" + i + "').val(), money: game['initmoney'], worth: game['initmoney'], properties: [], houses: 0};" +
								"$('#colorsel" + i + "').change(function(){game.players[" + i + "].color = $(this).val();});" +
								"$('#Nombre" + i + "').change(function(){game.players[" + i + "].name = $(this).val();});" +
							"</script>" +
						"</div>" +
					"</td></tr>" +
				"<tbody>" +
			"</table>";
		}

	}
	//if the user is oppening the new game dialog (or the site just oppened),
	//then it will show the option to choose the initial money and number of players
	else if (game["init"] === 0) {
		game["init"]++;
		txt += "<div id='bill'><h1 id='indicador-dinero'></h1></div>" +
			"<div id='optjuego'>" +
				"<div id='divinicial' class='form-group row'>" +
					"<label for='inicial' class='col-sm-3 col-form-label'>Initial Money:</label>" +
					"<div class='input-group col-sm-9'>" +
						"<input id='inicial' class='form-control input-sm' type='number' value='0'>" +
						"<div class='currencysymbol input-group-addon'></div>" +
					"</div>" +
				"</div>" +
				"<div class='form-group row'>" +
					"<label for='nJugadores' class='col-sm-3 col-form-label'>Players #:</label>" +
					"<div class='col-sm-9'>" +
						"<input id='nJugadores' type='number' class='form-control input-sm' value='0' min='0' max='9' step='1'>" +
					"</div>" +
				"</div>" +
			"</div>" +
			"<script>" +
				"$('#inicial').change(function() {" +
					"setInitialMoney();" +
				"});" +
			"</script>";
		$(document).ready(function($) {
			setInitialMoney();
		});
	}
	//if the user finnished the input of the options,
	//then it will load the basics (properties, player statistics, cards, ...) of the site
	else {
		//empties the variables
		var playermodel = {};
		game.hist = [];

		datafolder = $("#versionsel").val();

		//loads the economic data from the java script file
		loadeconomicdata(datafolder);
		//loads the cards from the java script file
		loadcardstext(datafolder);

		//loads the player list on each player selector
		updateplayersel();

		updateplayertable(); 			 	 //updates the shown players info
		$("#histdatatable").DataTable().clear(); //clears the history table
		$('#modaldialog').modal('hide'); 	 //hides the new game dialog
	}

	//loads the txt (as html) to the new game dialog body
	$("#modaldialogbody").html(txt);
}

//updates player selectors
function updateplayersel() {
	$('.playersel').html("");
	for (var i = 0; i <= game["nplayers"]; i++) {
		$('.playersel').append("<option value=" + i + ">" + game.players[i].name + "</option>");
	}
}

//loads the java script file (from the 'folder') that holds the chance/comunnity chest texts
function loadcardstext(folder) {
	loadjs("../JS/" + folder + "/cards.min.js", "cardscript");
}

//loads the card dialog data (title, text) depending on the 'type': chance|comunitychest
function loadcarddialogdata(type){
	switch(type) {
		case "chance":
			$("#carddialogtitle").html("Chance");
			break;
		case "comunitychest":
			$("#carddialogtitle").html("Comunity Chest");
			break;
	};
	$("#carddialogtxt").html(getrandcard(type));
}

//executed when an avaliable property is sold to someone
function sellaval() {
	var prop   = $("#sellavalprop"  ).prop('selectedIndex');
	var to     = $("#sellavalpropto").prop('selectedIndex');
	var amount = parseFloat($("#sellavalpropcost").html());

	game.players[to].properties.push(game.avalprops[prop]);
	//updates the amount of money and the player's worth
	addmoney(to, -amount);
	addworth(to, amount);

	movetosold(prop);
	
	//append purchase to history
	appendtohistory(0, to, amount, histdescriptions.propsell);
	//updates the shown player info
	updateplayertable();
	//updates the player options
	loadplayeropts();

	$("#sellavalpropcost").html(
		findinprops(game.avalprops[$("#sellavalprop").val()]).price
	);
}

//returns a random card of 'type': chance|comunitychest 
function getrandcard(type) {
	//choose a random index among the texts
	var randi = Math.floor(Math.random() * game.cards[type].length);
	//choose a random text
	var txt = game.cards[type][randi];

	//replace any present tag on the text
	txt = txt.replace(/'-goamount-'/g, game.goamount);
	switch(Math.floor(Math.random() * 2)){
		case 0:
			randi = Math.floor(Math.random() * game.avalprops.length);
			txt = txt.replace(/\'-street-\'/g, game.avalprops[randi]);
			txt = txt.replace(/\'-utility-\'/g, game.propsdet.utilities.electric);
			break;
		case 1:
			if (game.soldprops.length > 0) {
				randi = Math.floor(Math.random() * game.soldprops.length);
				txt = txt.replace(/\'-street-\'/g, game.soldprops[randi]);
			}
			else {
				randi = Math.floor(Math.random() * game.avalprops.length);
				txt = txt.replace(/\'-street-\'/g, game.avalprops[randi]);
			}
			txt = txt.replace(/\'-utility-\'/g, game.propsdet.utilities.water);
			break;
	};
	randi = Math.floor(Math.random() * game.propsdet.railroads.names.length);
	txt = txt.replace(/\'-railroad-\'/g, game.propsdet.railroads.names[randi]);
	txt = txt.replace(/\'-goamount-\'/g, game.goamount);
	//return the selected text
	return txt;
}

//loads the java script file (from the 'folder') that holds the economic data
function loadeconomicdata(folder){
	loadjs("../JS/" + folder + "/economic_data.min.js", "economic_data");
}

//updates the table that displays the players info
function updateplayertable() {
	var table = $('#playerstable').DataTable();
	table.clear();
	for (var i = 0; i <= game["nplayers"]; i++) {
		table.row.add([
			game.players[i].color,
			game.players[i].name,
			game.players[i].money,
			game.players[i].worth
		]);
	}

	table.draw();
}

//moves the selected 'available property' to the list of sold properties
function movetosold(index) {
	game.soldprops.push(game.avalprops[index]);
	game.avalprops.splice(index, 1);
	updatepropsels();
}

//moves the selected 'sold property' back to the list of available properties
function movetoaval(index) {
	game.avalprops.push(game.soldprops[index]);
	game.soldprops.splice(index, 1);
	updatepropsels(); //this can be improved by adding or eliminating properties dinamically in the selectors instead of reloading them
}

//updates the lists used by the property selectors
function updatepropsels() {
	$(".avalprop").html("");
	$("#soldpropsel").html("");
	$("#mortpropsel").html("");

	for (var i = 0; i < game.avalprops.length; i++) {
		$(".avalprop").append(
			"<option value=" + i + ">" + game.avalprops[i] + "</option>"
		);
	}

	for (var i = 0; i < game.soldprops.length; i++) {
		$("#soldpropsel").append(
			"<option value=" + i + ">" + game.soldprops[i] + "</option>"
		);
	}

	for (var i = 0; i < game.mortprops.length; i++) {
		$("#mortpropsel").append(
			"<option value=" + i + ">" + game.mortprops[i] + "</option>"
		);
	}
}

//sets the currency symbol (as html) in any element with the class 'currencysymbol'
function setcurrency() {
	$(".currencysymbol").html(currencysym);
}

//makes the transfer operation and appends it to the history
function transfer() {
	var from = $("#transfromplayer").prop('selectedIndex');
	var to = $("#transtoplayer").prop('selectedIndex');
	var amount = $("#transamount").val();

	//updates the money amount that each involved player has
	addmoney(from, -amount);
	addmoney(to, amount);
	addworth(from, -amount);
	addworth(to, amount);

	appendtohistory(from, to, amount, histdescriptions.transfer);

	//updates the shown player info
	updateplayertable(); //this can also be improved by doing this dinamically
}

//add "amount" amount of money to the account of the player indicated by the index
function addmoney(index, amount) {
	game.players[index].money = parseFloat(game.players[index].money) + parseFloat(amount);
}

//add "amount" amount of money to the worth of the player indicated by the index
function addworth(index, amount) {
	game.players[index].worth = parseFloat(game.players[index].worth) + parseFloat(amount);
}

//Loads the player specific options
function loadplayeropts() {
	var player = game.players[$("#currentplayer").prop('selectedIndex')];

	$("#curplayerprops").html("");
	$("#curplayermortprops").html("");

	//load the properties owned by the player
	if($("#currentplayer").prop('selectedIndex') === 0) {
		for (var i = 0; i < game.avalprops.length; i++) {
			$("#curplayerprops").append("<option value=" + i + ">" + game.avalprops[i] + "</option>");
		}
	}
	else {
		for(var i=0; i < player.properties.length; i++) {
			$("#curplayerprops").append("<option value=" + i + ">" + player.properties[i] + "</option>");
		}
		//load the properties mortgaged by the player
		for(var i=0; i < player.properties.length; i++) {
			for(var j=0; j < game.mortprops.length; j++) {
				if(player.properties[i] === game.mortprops[j]) {
					$("#curplayermortprops").append("<option value=" + i + ">" + player.properties[i] + "</option>");
					break;
				}
			}
		}
	}
		

	//load player's payment amount for it's default properties
	showhouseandmortprices();
	showselmortpayprice();

	//disable player transaction buttons, if the selected player is the bank
	$(".playertbtn").toggleClass("disabled", $("#currentplayer").prop('selectedIndex') === 0);
}

//shows current player's house and mortgage prices for the selected property
function showhouseandmortprices() {
	var propname;

	$("#buyhousesprice").html("");
	$("#mortpropcost").html("");

	if($("#currentplayer").prop('selectedIndex') == 0) {
		propname = game.avalprops[$("#curplayerprops").prop('selectedIndex')];
	}
	else {
		propname = game.players[
				$("#currentplayer").prop('selectedIndex')
			].properties[
				$("#curplayerprops").prop('selectedIndex')
			];
	}

	if(typeof propname != 'undefined'){
		//show the mortgage price for the property
		$("#mortpropcost").html(findinprops(propname).mortprice);

		//try to find the property among the streets
		for(var i = 0; i < game.propsdet.streets.length; i++) {
			for (var j = 0; j < game.propsdet.streets[i].data.length; j++) {
				if(game.propsdet.streets[i].data[j].name === propname) {
					//show the house price for this property
					$("#buyhousesprice").html(game.propsdet.streets[i].houseprice);
				}
			}
		}
	}
}

//shows current player's mortgage paymentprice for the selected property
function showselmortpayprice() {
	var propname;
	$("#mortpaycost").html("");

	if($("#currentplayer").prop('selectedIndex') == 0) {
		propname = game.avalprops[$("#curplayerprops").prop('selectedIndex')];
	}
	else if($("#curplayermortprops").prop('selectedIndex') >= 0){
		propname = $("#curplayermortprops")[0][$("#curplayermortprops").prop('selectedIndex')].innerText;
	}
	
	if(typeof propname != 'undefined'){
		var mortprice = parseFloat(findinprops(propname).mortprice);
		mortprice += mortprice/10;

		$("#mortpaycost").html(mortprice);
	}
}

//appends the performed transaction to the history
function appendtohistory(from, to, amount, description){
	//saves into the history variable
	game.hist.push({
		from: game.players[from].name,
		to: game.players[to].name,
		amount: parseFloat(amount),
		description: description
	});

	//appends the transaction to the shown history table
	$('#histdatatable').DataTable().row.add([
		game.hist.length,
		game.players[from].name,
		game.players[to].name,
		amount + currencysym,
		description
	]).draw();
}

//shows the initial money amount on the bill
function setInitialMoney() {
	var money = $('#inicial').val();
	$('#indicador-dinero').html(money + " " + currencysym);
}

//finds if a property name exists, and if it does, it returns the holder of such property
function findinprops(propname) {
	//try to find the property among the utilities 
	if(game.propsdet.utilities.electric === propname || game.propsdet.utilities.water === propname) {
		return game.propsdet.utilities;
	}
	//try to find the property among the railroads
	for (var i = 0; i < game.propsdet.railroads.names.length; i++) {
		if(game.propsdet.railroads.names[i] === propname){
			return game.propsdet.railroads;
		}
	}
	//try to find the property among the streets
	for(var i = 0; i < game.propsdet.streets.length; i++) {
		for (var j = 0; j < game.propsdet.streets[i].data.length; j++) {
			if(game.propsdet.streets[i].data[j].name === propname) {
				return game.propsdet.streets[i].data[j];
			}
		}
	}
}

$(document).ready(function(){
	var i;
	var lilist = "";
	var len = datasources.length;
	
	//element builders **********************************************
	
	//railroad names
	for(var i=1; i < 5; i++){
		lilist += "<li id='rail" + i + "'></li>";
	}
	$("#railinfonames").html(lilist);
	//railroad rent prices
	lilist = "";
	for(i=1; i < 5; i++){
		lilist += "<li>" +
			"<strong>" + i + " Railroad" + ((i > 1) ? "s" : "") + ": </strong>" +
			"<span class='gamelang' id='railrent" + i + "'></span>" +
			" <span class='currencysymbol gamelang'></span>" +
		"</li>";
	}
	$("#railinforents").html(lilist);
	//load the data for the game version selector
	for(i=0; i<len; i++){
		$("#versionsel").append(
			"<option id='version" + i + 
				"' value=" + datasources[i].folder + 
			">" +
				"<span>" + datasources[i].folder.split("_")[0] + "</span>: " +
				datasources[i].version +
			"</option>"
		);
	}
	//load the data to show in the new game dialog
	onokmodal();

	//***************************************************************
	
	//set default currency
	currencysym = datasources[0].currency;
	setcurrency();
	
	//show the new game dialog
	$("#modaldialog").modal("show");

	//event listeners ***********************************************

	//show the price of the property to sell
	$("#sellavalprop").change(function (){
		var propname = game.avalprops[$("#sellavalprop").val()];

		$("#sellavalpropcost").html(findinprops(propname).price);
	});

	//when the newgame link is pressed on the navbar
	$("#navbar-newgame").click(function(){game["init"] = 0; onokmodal();});

	//load the random text for the card dialog whenever the correspondant navbar links are pressed
	$("#navbar-chance"  ).click(function (){loadcarddialogdata("chance")});
	$("#navbar-comchest").click(function (){loadcarddialogdata("comunitychest")});

	//transfer options event listeners
	$("#transferbtn").click(function(){transfer()});

	//reload player's transaction data whenever this one changes
	$("#currentplayer").change(function() {
		loadplayeropts();
	});
	//show the selected player's house and mortgage prices
	$("#curplayerprops").change(function() {
		showhouseandmortprices();
	});
	//show the selected mortgaged property's pay price
	$("#curplayermortprops").change(function() {
		showselmortpayprice();
	});

	//move the property to the mortgaged list
	$("#mortpropbtn").click(function() {
		var propindex = $("#curplayerprops").prop('selectedIndex');

		if(propindex >= 0){
			var from = $("#currentplayer").prop('selectedIndex');
			var to = 0;
			var amount = parseFloat($("#mortpropcost").html());

			//updates the money amount the player has
			addmoney(from, -amount);
			addworth(from, -amount);

			game.mortprops.push(game.players[from].properties[propindex]);
			updatepropsels();

			loadplayeropts();
			appendtohistory(from, to, amount, histdescriptions.mortprop);
			updateplayertable();
		}
	});

	//buy a house
	$("#buyhousebtn").click(function() {
		var from = $("#currentplayer").prop('selectedIndex');
		if($("#buyhousesprice").html() !== "" && from > 0){
			var to = 0;
			var amount = parseFloat($("#buyhousesprice").html());

			//updates the money amount the player has
			addmoney(from, -amount);
			//adds a house to the player
			game.players[from].houses++;

			appendtohistory(from, to, amount, histdescriptions.housebought);
			updateplayertable();
		}
	});

	//sell a house
	$("#sellhousebtn").click(function() {
		var from = $("#currentplayer").prop('selectedIndex');
		if($("#buyhousesprice").html() !== "" && from > 0){
			var to = 0;
			var amount = parseFloat($("#buyhousesprice").html());

			//updates the money amount the player has
			addmoney(from, amount);
			//adds a house to the player
			game.players[from].houses--;

			appendtohistory(from, to, amount, histdescriptions.housesold);
			updateplayertable();
		}
	});

	//property sell from player to player
	$("#sellpropbtn").click(function() {
		var from      = $("#currentplayer").prop('selectedIndex');
		var to        = $("#sellplayertoplayer").prop('selectedIndex');
		var propindex = $("#curplayerprops").prop('selectedIndex');
		var amount    = parseFloat($("#sellpropprice").val());
		var propval   = parseFloat(findinprops($("#curplayerprops")[0][propindex].innerText).price);

		//updates the money amount the player has
		addmoney(from, amount);
		addworth(from, amount - propval);

		//transfers the property
		if(to === 0){
			game.avalprops.push(game.players[from].properties[propindex]);
		}
		else{
			addmoney(to, -amount);
			addworth(to, propval - amount);
			game.players[to].properties.push(game.players[from].properties[propindex]);
		}

		game.players[from].properties.splice(propindex, 1);
		updatepropsels();

		loadplayeropts();
		appendtohistory(from, to, amount, histdescriptions.propsell);
		updateplayertable();
	});

	//pay mortgage of the selected property
	$("#paymortbtn").click(function() {
		var propindex = $("#curplayermortprops").prop("selectedIndex");

		//removes the selected 'mortgaged property' from this list
		if(propindex >= 0) {
			var from = $("#currentplayer").prop('selectedIndex');
			var to = 0;
			var amount = parseFloat($("#mortpaycost").html());

			//updates the money amount that each involved player has
			addmoney(from, -amount);
			addworth(from, -amount);

			for(var i=0; i < game.mortprops.length; i++){
				if(game.mortprops[i] === $("#curplayermortprops")[0][propindex].innerText){
					game.mortprops.splice(i, 1);
				}
			}
			updatepropsels();

			loadplayeropts();
			appendtohistory(from, to, amount, histdescriptions.mortpaid);
			updateplayertable();
		}
	});

	//declare bankruptcy
	$("#bankruptbtn").click(function() {
		var from = $("#currentplayer").prop('selectedIndex');
		if(from != 0){
			game.avalprops.concat(game.players[from].properties);
			//the history has to be updated before deleting the player
			appendtohistory(from, from, NaN, histdescriptions.setbankrupt);

			//deletes the player from the game
			game.players.splice(from, 1);
			game.nplayers--;

			updateplayersel();
			updatepropsels();
			loadplayeropts();
			updateplayertable();
		}
	});

	$(".btn").mouseup(function(){
		$(this).blur();
	});

	//load the data to show in the new game dialog
	$("#newgame-ok-btn").click(function(){onokmodal()});

	//change the currency whenever the selected game version changes
	$("#versionsel").change(function (){
			currencysym = datasources[$("#versionsel").prop("selectedIndex")].currency; 
			setcurrency();
	});

	//auction timer event listeners
	$("#starttmr-btn").click(function(){
		target_date = new Date(
			Date.now() +
			parseInt($("#tmr-mills").val()) * 10 +
			parseInt($("#tmr-secs" ).val()) * 1000 +
			parseInt($("#tmr-mins" ).val()) * 60000 +
			parseInt($("#tmr-hours").val()) * 3600000
		).getTime();
		tmr = setInterval(function(){myTimer()}, 10);
	});
	$("#stoptmr-btn" ).click(function(){stopTmr()});
	$("#resettmr-btn").click(function(){clearTmr()});

	//default transfer options event listeners
	$("#transgoamount").click(function(){
		$("#transamount"    ).val(game.goamount);
		$("#transfromplayer").val("0");
	});
	$("#luxurytaxbtn").click(function(){
		$("#transamount"  ).val(game.taxes.luxury);
		$("#transtoplayer").val("0");
	});
	$("#incometaxbtn").click(function(){
		$("#transamount"  ).val(game.taxes.income[1]);
		$("#transtoplayer").val("0");
	});
	
	//***************************************************************

	//datatable config **********************************************

	$(".DataTable").DataTable({
		scrollY: 300,
		scrollX: true,
		scrollCollapse: true,
		columnDefs: [
			{
				"targets": 0,
				"createdCell": function (td, cellData, rowData, row, col) {
					if ( cellData.length === 7 && /#[0-9|a-f]{6}/i.test( cellData ) ) {
						$(td).css("background-color", cellData);
						$(td).html("");
					}
				}
			},
			{
				"targets": [2, 3],
				"createdCell": function (td, cellData, rowData, row, col) {
					if( cellData < 0 ){
						$(td).css("color", "#ff0000");
					}
				}
			}
		]
	});

	//***************************************************************
});
