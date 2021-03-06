var aux = "";

//amount when passing through go
game.goamount = 200;

//taxes
game.taxes.income[1] = 200;
game.taxes.luxury = 75;

//utilities
game.propsdet.utilities = {
	"electric": "Electric Company",
	"water": "Water Works",
	"price": 150,
	"mortprice": 75,
	"rent": [4, 10]
};

//railroads
game.propsdet.railroads = {
	"names": [
		"Kings Cross Station",
		"Marylebone Station",
		"Fenchurch St Station",
		"Liverpool Street Station"
	],
	"price": 200,
	"mortprice": 100,
	"rent": [25, 50, 100, 200]
};

//streets
game.propsdet.streets = [
	{
		"color": "#7F007F",
		"houseprice": 50,
		"data":[
			{
				"name": "Old Kent Road",
				"price": 60,
				"mortprice": 30,
				"rent": [2, 10, 30, 90, 160, 250]
			},
			{
				"name": "Whitechapel Road",
				"price": 60,
				"mortprice": 30,
				"rent": [4, 20, 60, 180, 320, 450]
			}
		]
	},
	{
		"color": "#ADD8E6",
		"houseprice": 50,
		"data":[
			{
				"name": "The Angel Islington",
				"price": 100,
				"mortprice": 50,
				"rent": [6, 30, 90, 270, 400, 550]
			},
			{
				"name": "Euston Road",
				"price": 100,
				"mortprice": 50,
				"rent": [6, 30, 90, 270, 400, 550]
			},
			{
				"name": "Pentonville Road",
				"price": 120,
				"mortprice": 60,
				"rent": [8, 40, 100, 300, 450, 600]
			}
		]
	},
	{
		"color": "#C71585",
		"houseprice": 100,
		"data":[
			{
				"name": "Pall Mall",
				"price": 140,
				"mortprice": 70,
				"rent": [10, 50, 150, 450, 625, 750]
			},
			{
				"name": "Whitehall",
				"price": 140,
				"mortprice": 70,
				"rent": [10, 50, 150, 450, 625, 750]
			},
			{
				"name": "Northumberland Avenue",
				"price": 160,
				"mortprice": 80,
				"rent": [12, 60, 180, 500, 700, 900]
			}
		]
	},
	{
		"color": "#FFA500",
		"houseprice": 100,
		"data":[
			{
				"name": "Bow Street",
				"price": 180,
				"mortprice": 90,
				"rent": [14, 70, 200, 550, 750, 950]
			},
			{
				"name": "Marlborough Street",
				"price": 180,
				"mortprice": 90,
				"rent": [14, 70, 200, 550, 750, 950]
			},
			{
				"name": "Vine Street",
				"price": 200,
				"mortprice": 100,
				"rent": [16, 80, 220, 600, 800, 1000]
			}
		]
	},
	{
		"color": "#FF0000",
		"houseprice": 150,
		"data":[
			{
				"name": "The Strand",
				"price": 220,
				"mortprice": 110,
				"rent": [18, 90, 250, 700, 875, 1050]
			},
			{
				"name": "Fleet Street",
				"price": 220,
				"mortprice": 110,
				"rent": [18, 90, 250, 700, 875, 1050]
			},
			{
				"name": "Trafalgar Square",
				"price": 240,
				"mortprice": 120,
				"rent": [20, 100, 300, 750, 925, 1100]
			}
		]
	},
	{
		"color": "#FFFF00",
		"houseprice": 150,
		"data":[
			{
				"name": "Leicester Square",
				"price": 260,
				"mortprice": 130,
				"rent": [22, 110, 330, 800, 970, 1150]
			},
			{
				"name": "Coventry Street",
				"price": 260,
				"mortprice": 130,
				"rent": [22, 110, 330, 800, 970, 1150]
			},
			{
				"name": "Piccadilly",
				"price": 280,
				"mortprice": 140,
				"rent": [24, 120, 360, 850, 1025, 1200]
			}
		]
	},
	{
		"color": "#008000",
		"houseprice": 200,
		"data":[
			{
				"name": "Regent Street",
				"price": 300,
				"mortprice": 150,
				"rent": [26, 130, 390, 900, 1100, 1275]
			},
			{
				"name": "Oxford Street",
				"price": 300,
				"mortprice": 150,
				"rent": [26, 130, 390, 900, 1100, 1275]
			},
			{
				"name": "Bond Street",
				"price": 320,
				"mortprice": 160,
				"rent": [28, 150, 450, 1000, 1200, 1400]
			}
		]
	},
	{
		"color": "#00008B",
		"houseprice": 200,
		"data":[
			{
				"name": "Park Lane",
				"price": 350,
				"mortprice": 175,
				"rent": [35, 175, 500, 1100, 1300, 1500]
			},
			{
				"name": "Mayfair",
				"price": 400,
				"mortprice": 200,
				"rent": [50, 200, 600, 1400, 1700, 2000]
			}
		]
	}
];

//empties the sold and mortgaged lists
game.soldprops = [];
game.mortprops = [];

//initializes the avaliable properties list with all the properties
game.avalprops = [
	game.propsdet.utilities.electric,
	game.propsdet.utilities.water
];
game.avalprops = game.avalprops.concat(game.propsdet.railroads.names);
$.each(game.propsdet.streets, function(i, group) {
	$.each(group.data, function(j, street) {
		game["avalprops"].push(street.name);
	});
});

//reloads the shown info
//-------------------------------------------------------------
//sets the game language as english
$(".gamelang").attr("lang", "en");

//reloads the utilities info
$(".utilelectric" ).html(game.propsdet.utilities.electric	 );
$(".utilwater"	  ).html(game.propsdet.utilities.water		 );
$(".utilprice"	  ).html(game.propsdet.utilities.price		 );
$(".utilmortprice").html(game.propsdet.utilities.mortprice	 );
$(".utilrent1"	  ).html("x" + game.propsdet.utilities.rent[0]);
$(".utilrent2"	  ).html("x" + game.propsdet.utilities.rent[1]);

//reloads the railroads info
$(".railmortprice").html(game.propsdet.railroads.mortprice);
$(".railprice"	  ).html(game.propsdet.railroads.price);
$.each(game.propsdet.railroads.names, function(i, name) {
	$("#rail"     + (i + 1)).html(name);
	$("#railrent" + (i + 1)).html(game.propsdet.railroads.rent[i]);
});

//shows the price of the default availiable property
$("#sellavalpropcost").html(findinprops(game.avalprops[0]).price);

//reloads the streets info
$('#streetsdatatable').DataTable().clear();
$.each(game.propsdet.streets, function(index, group) {
	$.each(group.data, function(subindex, street) {
		aux = [
			group.color,
			street.name,
			street.price,
			street.mortprice
		];

		$.each(street.rent, function(subsubindex, rent) {
			aux.push(rent);
		});

		aux.push(group.houseprice);
		$('#streetsdatatable').DataTable().row.add(aux);
	});
});
$('#streetsdatatable').DataTable().draw();

//reloads the property selectors
updatepropsels();

//shows the current player's transaction data
loadplayeropts();
//-------------------------------------------------------------