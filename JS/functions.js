//Global Variables*********************************************************

// timer global variables
var tmr,target_datehours, minutes, seconds, milliseconds;
//variable to store the current game currency
var currencysym = "";
//variable to store the folder name for the selected game version 
var datafolder = "";

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
	name:   "Banco",
	color:  "",
	money:  Infinity,
	worth:  Infinity,
	houses: {},
	hotels: {}
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
				"<thead><tr><th><center><b>Jugador: " + i + "</b></center></th></tr></thead>" +
				"<tbody><tr><td>" +
				"<div class='form-group row'>" +
				"<label for='Nombre" + i + "' class='col-xs-2 col-form-label'>Nombre:</label>" +
				"<div class='col-xs-10'>" +
				"<input type='text' id='Nombre" + i + "' class='form-control input-sm' placeholder='AndRBR'>" +
				"</div>" +
				"</div>" +
				"<div class='form-group row'>" +
				"<label for='colorsel" + i + "' class='col-xs-2 col-form-label'>Color:</label>" +
				"<div class='col-xs-10'>" +
				"<input type='color' id='colorsel" + i + "' class='form-control input-sm' value='" + randcolor() + "'>" +
				"</div>" +
				"<script>" +
				"game['players'][" + i + "] = {name: '', color: $('#colorsel" + i + "').val(), money: game['initmoney'], worth: game['initmoney'], houses: 0, hotels: 0};" +
				"$('#colorsel" + i + "').change(function(){game['players'][" + i + "].color = $(this).val();});" +
				"$('#Nombre" + i + "').change(function(){game['players'][" + i + "].name = $(this).val();});" +
				"</script>" +
				"</div>" +
				"</td></tr><tbody>" +
				"</table>";
		}

	}
	//if the user is oppening the new game dialog (or the site just oppened),
	//then it will show the option to choose the initial money and number of players
	else if (game["init"] === 0) {
		game["init"]++;
		txt = "<center>" +
			"<div class='cant-dinero'>" +
			"<div id='bill'></div>" +
			"<script>" +
			"drawbill('bill', ($(document).width() < 450) ? $(document).width()-50 : 400, '#d7ce22', 'mainbill');" +
			"</script>" +
			"<h1 class='indicador-dinero'></h1>" +
			"</div>" +
			"</center>" +
			"<div id='optjuego'>" +
			"<div id='divinicial' class='form-group row'>" +
			"<label for='inicial' class='col-xs-3 col-form-label'>Dinero Inicial:</label>" +
			"<div class='input-group col-xs-9'>" +
			"<input id='inicial'" +
			"class='form-control input-sm'" +
			"type='number'" +
			"onchange='setInitialMoney()'" +
			"value='0'>" +
			"<script>setInitialMoney();</script>" +
			"<div class='currencysymbol input-group-addon'></div>" +
			"</div>" +
			"</div>" +
			"<div class='form-group row'>" +
			"<label for='nJugadores' class='col-xs-3 col-form-label'># Jugadores:</label>" +
			"<div class='col-xs-9'>" +
			"<input id='nJugadores'" +
			"type='number'" +
			"class='form-control input-sm'" +
			"value='0'" +
			"min='0'" +
			"max='9'" +
			"step='1'>" +
			"</div>" +
			"</div>" +
			"</div>";
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
		$('.playersel').each(function() {
			$(this).html("");
			for (var i = 0; i <= game["nplayers"]; i++) {
				$(this).append("<option value=" + i + ">" + game["players"][i].name + "</option>");
			}
		});

		updateplayertable(); 			 	 //updates the shown players info
		$("#histdatatable").DataTable().clear(); //clears the history table
		$('#modaldialog').modal('hide'); 	 //hides the new game dialog
	}

	//loads the txt (as html) to the new game dialog body
	$("#modaldialogbody").html(txt);
}

//loads the java script file (from the 'folder') that holds the chance/comunnity chest texts
function loadcardstext(folder) {
	loadjs("JS/" + folder + "/cards.min.js", "cardscript");
}

//loads the card dialog data (title, text) depending on the 'type': chance|comunitychest
function loadcarddialogdata(type){
	switch(type) {
		case "chance":
			$("#carddialogtitle").html("Casualidad");
			break;
		case "comunitychest":
			$("#carddialogtitle").html("Arca Comunal");
			break;
	};
	$("#carddialogtxt").html(getrandcard(type));
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
			randi = Math.floor(Math.random() * game.soldprops.length);
			txt = txt.replace(/\'-street-\'/g, game.soldprops[randi]);
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
	loadjs("JS/" + folder + "/economic_data.min.js", "economic_data");
}

//sets the selected initial money value in any component with the class 'indicador-dinero'
function setInitialMoney() {
	var money = $('#inicial').val();
	$('.indicador-dinero').html(money + " " + currencysym);
}

//updates the table that displays the players info
function updateplayertable() {
	$('#playerstable').DataTable().clear();
	for (var i = 0; i <= game["nplayers"]; i++) {
		$('#playerstable').DataTable().row.add([
			game["players"][i].color,
			game["players"][i].name,
			game["players"][i].money,
			game["players"][i].worth
		]);
	}
	$('#playerstable').DataTable().draw();
}

//moves the selected 'available property' to the list of sold properties
function movetosold(index) {
	game["soldprops"].push(game["avalprops"][index]);
	game["avalprops"].splice(index, 1);
	updatepropsels();
}

//copies the selected 'sold property' to the list of mortgaged properties
function movetomort(index) {
	game["mortprops"].push(game["soldprops"][index]);
	updatepropsels();
}

//removes the selected 'mortgaged property' from this list
function paidmort(index) {
	game["mortprops"].splice(index, 1);
	updatepropsels();
}

//moves the selected 'sold property' back to the list of available properties
function movetoaval(index) {
	game["avalprops"].push(game["soldprops"][index]);
	game["soldprops"].splice(index, 1);
	updatepropsels(); //this can be improved by adding or eliminating properties dinamically in the selectors instead of reloading them
}

//updates the lists used by the property selectors
function updatepropsels() {
	$("#avalpropsel").html("");
	$("#soldpropsel").html("");
	$("#mortpropsel").html("");

	for (var i = 0; i < game["avalprops"].length; i++) {
		$("#avalpropsel").append(
			"<option value=" + i + ">" + game["avalprops"][i] + "</option>"
		);
	}

	for (var i = 0; i < game["soldprops"].length; i++) {
		$("#soldpropsel").append(
			"<option value=" + i + ">" + game["soldprops"][i] + "</option>"
		);
	}

	for (var i = 0; i < game["mortprops"].length; i++) {
		$("#mortpropsel").append(
			"<option value=" + i + ">" + game["mortprops"][i] + "</option>"
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
	game["players"][from].money = parseFloat(game["players"][from].money) - parseFloat(amount);
	game["players"][to].money = parseFloat(game["players"][to].money) + parseFloat(amount);
	game["players"][from].worth = parseFloat(game["players"][from].worth) - parseFloat(amount);
	game["players"][to].worth = parseFloat(game["players"][to].worth) + parseFloat(amount);

	appendtransaction(from, to, amount);

	//updates the shown player info
	updateplayertable(); //this canalso be improved by doing this dinamically
}

function purchase() {
	var from = $("#transfromplayer").prop('selectedIndex');
	var to = $("#transtoplayer").prop('selectedIndex');
	var amount = $("#transamount").val();

	game["players"][from].worth = parseFloat(game["players"][from].worth) + parseFloat(amount);
	game["players"][to].worth = parseFloat(game["players"][to].worth) - parseFloat(amount);

	transfer();
}

function appendtransaction(from, to, amount){
	//saves into the history variable
	game.hist.push({
		from: game["players"][from].name,
		to: game["players"][to].name,
		amount: parseFloat(amount)
	});

	//appends the transaction to the shown history table
	$('#histdatatable').DataTable().row.add([
		game.hist.length,
		game["players"][from].name,
		game["players"][to].name,
		amount + currencysym
	]).draw();
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
			"<strong>" + i + " Ferrocarril" + ((i > 1) ? "es" : "") + ": </strong>" +
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

	//the newgame link is pressed on the navbar
	$("#navbar-newgame").click(function(){game["init"] = 0; onokmodal();});

	//load the random text for the card dialog whenever the correspondant navbar links are pressed
	$("#navbar-chance"  ).click(function (){loadcarddialogdata("chance")});
	$("#navbar-comchest").click(function (){loadcarddialogdata("comunitychest")});

	//transfer options event listeners
	$("#transferbtn").click(function(){transfer()});
	$("#purchasebtn").click(function(){purchase()});

	//properties event listeners
	$("#propsoldbtn").click(function(){movetosold($("#avalpropsel").val())});
	$("#propmortbtn").click(function(){movetomort($("#soldpropsel").val())});
	$("#propavalbtn").click(function(){movetoaval($("#soldpropsel").val())});
	$("#proppaidmortbtn").click(function(){paidmort($("#mortpropsel").val())});

	//load the data to show in the new game dialog
	$("#newgame-ok-btn").click(function(){onokmodal()});

	//change the currency whenever the selected game version changes
	$("#versionsel").change(function (){
			currencysym = datasources[$("#versionsel").prop("selectedIndex")].currency; 
			setcurrency();
	});
	//bill canvas resizer
	$(window).resize(function(){
		if( $("#bill").length ){
			drawbill("bill", ($(window).width() < 450) ? $(window).width()-50 : 400, "#d7ce22", "mainbill");
		}
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
		language: {
			"sProcessing":     "Procesando...",
			"sLengthMenu":     "Mostrar _MENU_ registros",
			"sZeroRecords":    "No se encontraron resultados",
			"sEmptyTable":     "Ningún dato disponible en esta tabla",
			"sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
			"sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
			"sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
			"sInfoPostFix":    "",
			"sSearch":         "Buscar:",
			"sUrl":            "",
			"sInfoThousands":  ",",
			"sLoadingRecords": "Cargando...",
			"oPaginate": {
				"sFirst":    "Primero",
				"sLast":     "Último",
				"sNext":     "Siguiente",
				"sPrevious": "Anterior"
			},
			"oAria": {
				"sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
				"sSortDescending": ": Activar para ordenar la columna de manera descendente"
			}
		},
		scrollY: 300,
		scrollX: true,
		scrollCollapse: true,
		columnDefs: [{
			"targets": 0,
			"createdCell": function (td, cellData, rowData, row, col) {
				if ( cellData.length === 7 && /#[0-9|a-f]{6}/i.test( cellData ) ) {
					$(td).css("background-color", cellData)
					$(td).html("");
				}
			}
		}]
	});

	//***************************************************************
});
