var aux = "";

//currency
currencysym = "Bs";
//amount when passing through go
game.goamount = 10;
//taxes
game.taxes.income[1] = 10;
game.taxes.luxury = 4;
//utilities
game.propsdet.utilities = {
	"electric": "Compañía Eléctrica",
	"water": "Servicio de Agua Potable",
	"price": 8,
	"mortprice": 6,
	"rent": [2, 4]
};
//railroads
game.propsdet.railroads = {
	"names": [
		"Ferrocarril De Puerto Cabello",
		"Ferrocarril De Venezuela",
		"Ferrocarril Caracas-Valencia",
		"Ferrocarril De Occidente"
	],
	"price": 15,
	"mortprice": 6,
	"rent": [2, 4, 6, 12]
};
//streets
game.propsdet.streets = [
	{
		"color": "#FFFF00",
		"houseprice": 10,
		"data":[
			{
				"name": "Av. Andrés Bello",
				"price": 15,
				"mortprice": 8,
				"rent": [2, 8, 18, 42, 50, 58]
			},
			{
				"name": "Plaza Venezuela",
				"price": 14,
				"mortprice": 8,
				"rent": [2, 8, 20, 42, 52, 62]
			},
			{
				"name": "Parque Los Caobos",
				"price": 15,
				"mortprice": 8,
				"rent": [2, 8, 18, 42, 50, 58]
			}
		]
	},
	{
		"color": "#00FF00",
		"houseprice": 12,
		"data":[
			{
				"name": "Plaza Altamira",
				"price": 16,
				"mortprice": 10,
				"rent": [2, 10, 24, 52, 62, 72]
			},
			{
				"name": "Sabana Grande",
				"price": 15,
				"mortprice": 10,
				"rent": [2, 8, 22, 42, 56, 65]
			},
			{
				"name": "Av. Francisco de Miranda",
				"price": 15,
				"mortprice": 10,
				"rent": [2, 8, 22, 42, 56, 65]
			}
		]
	},
	{
		"color": "#FF0000",
		"houseprice": 10,
		"data":[
			{
				"name": "Av. San Martín",
				"price": 14,
				"mortprice": 8,
				"rent": [2, 6, 16, 40, 48, 56]
			},
			{
				"name": "Urb. El Paraíso",
				"price": 12,
				"mortprice": 6,
				"rent": [2, 6, 14, 36, 45, 54]
			},
			{
				"name": "Av. La Paz",
				"price": 12,
				"mortprice": 6,
				"rent": [2, 6, 14, 36, 45, 54]
			}
		]
	},
	{
		"color": "#FF7F00",
		"houseprice": 6,
		"data":[
			{
				"name": "Av. Nueva Granada",
				"price": 12,
				"mortprice": 6,
				"rent": [2, 6, 12, 32, 42, 52]
			},
			{
				"name": "Av. Roosevelt",
				"price": 10,
				"mortprice": 6,
				"rent": [2, 5, 12, 28, 40, 48]
			},
			{
				"name": "Av. Victoria",
				"price": 10,
				"mortprice": 6,
				"rent": [2, 5, 12, 28, 40, 48]
			}
		]
	},
	{
		"color": "#00FFFF",
		"houseprice": 4,
		"data":[
			{
				"name": "Av. Sucre",
				"price": 6,
				"mortprice": 4,
				"rent": [2, 4, 5, 16, 24, 32]
			},
			{
				"name": "Plaza Catia",
				"price": 5,
				"mortprice": 4,
				"rent": [2, 4, 5, 15, 22, 28]
			},
			{
				"name": "Av. Atlántico",
				"price": 5,
				"mortprice": 4,
				"rent": [2, 4, 5, 15, 22, 28]
			}
		]
	},
	{
		"color": "#FF007F",
		"houseprice": 6,
		"data":[
			{
				"name": "Av. Bello Monte",
				"price": 8,
				"mortprice": 5,
				"rent": [2, 4, 10, 26, 36, 46]
			},
			{
				"name": "Urb. Los Chaguaramos",
				"price": 6,
				"mortprice": 4,
				"rent": [2, 4, 10, 24, 32, 40]
			},
			{
				"name": "Av. Santa Mónica",
				"price": 6,
				"mortprice": 4,
				"rent": [2, 4, 10, 24, 32, 40]
			}
		]
	},
	{
		"color": "#0000FF",
		"houseprice": 12,
		"data":[
			{
				"name": "Av. Urdaneta",
				"price": 18,
				"mortprice": 10,
				"rent": [2, 10, 26, 56, 72, 76]
			},
			{
				"name": "Av. Bolívar",
				"price": 20,
				"mortprice": 12,
				"rent": [4, 12, 32, 72, 86, 100]
			}
		]
	},
	{
		"color": "#00007F",
		"houseprice": 4,
		"data":[
			{
				"name": "Urb. El Conde",
				"price": 4,
				"mortprice": 2,
				"rent": [2, 4, 4, 10, 18, 24]
			},
			{
				"name": "San Agustín del Sur",
				"price": 4,
				"mortprice": 2,
				"rent": [2, 2, 4, 6, 10, 14]
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
//-------------------------------------------------------------