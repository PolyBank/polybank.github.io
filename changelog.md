## VERSION 2.2.1.3
	### UI
		+	added form to send new versions to be reviewed
		+	added english version of the site
		+	removed bootstrap tooltip initialization
	### BACKEND
		+	version display moved to a separate file to ease modification
		+	added keywords for search engines
		+	fixed problem when loading cards before a property was bought

## VERSION 2.0.0.0
	### UI
		+	added user specific transactions
		+	improved responsiveness
		+	easier to understand statistics
		+	added description to history
		+	property sell separated for ease of use
		+	modified navbar and footer colors
	### BACKEND
		+	removed now unused function "purchase" from functions.js
		+	replaced function to draw a bill by svg image

## VERSION 1.4.0.0
	### UI
		+	added index column to history

## VERSION 1.3.5.9
	### BACKEND
		+	moved PolyBank-logo.svg to a separate IMG folder
		+	moved "ColorLuminance()" function to "functions.js"
		+	fixed favicon accessing problems

## VERSION 1.3.5.6
	### UI
		+	added brand new icon for the site
		+	added header
		+	modified footer
		+	added social icons to footer
	### BACKEND
		+	moved scripts to "functions.js" (except for "title" and "version" class builders)
		+	added metadata
		+	added CDN fallback to local

## VERSION 1.3.2.4
	### UI
		+	added language preview of gametype
		+	added dinamically changed currency symbol
	### BACKEND
		+	added changelog
		+	switched to the use of minified versions of the js files
		+	removed unnecessary currency variable from "economic_data" due to redundancy with "data_index_list"
		+	corrected variable name from "currencysymbol" to "currencysym" in "index.html" file
		+	fixed bug in witch a randomly generated color was an invalid value
