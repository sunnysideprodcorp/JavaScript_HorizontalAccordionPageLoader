// timing of animated transitions
const SHORT_TIME = 300;
const LONG_TIME = 2*SHORT_TIME;

// layout of accordion divs within parent divs
const PORTION_DIV = .85;
const MULTIPLE_TO = .65;
const HEIGHT_MULTIPLE_TO = .3;

// div aesthetics
const COLORS = [ "#ccf8ff", "ffe0b5", "#aad6a5", "#f0f8ff", "#d3d3d3",  "#fffefda", "#dfffcc"];
const BORDER_RADIUS = "0px";
const BORDER = "0px solid ";
const BORDER_STRING = "3px solid gray";

var width, height;
var widthPer, heightPer;

function addHorizontalAccordion(addName, longPageArray, pageArray)
{
    // creates a horizontal accordion of divs to load pageArray (collapsed div form) and longPayArray (expanded div form) 
    // all divs are added to div addName

    // first get the physical parameters of containing div
    width =  $('#'+addName).width()*.9;
    height = $('#'+addName).height();
    widthPer = width/pageArray.length;  // starting width when all divs are collapsed
    heightPer = height*HEIGHT_MULTIPLE_TO; 
    var widthPerSmall = Math.round((1-MULTIPLE_TO)*width/(pageArray.length - 1)); // collapsed width when one div is open		

    // create a div, set up its content and click functions for each remote page to load, as established by length of pageArray
    for(i = 1; i <= pageArray.length; i++){

	// div names indicate the containing div to which they are appended to avoid conflicts
	var divName = addName+"div_"+i
	$('#'+addName).append("<div id = '"+divName+"' class = 'unselected toAppend' style = 'padding: 20px; overflow:hidden; float:left;'></div>");

	$('#'+divName)
	    .load(pageArray[i-1])
	    .css({"width" : Math.round(widthPer*PORTION_DIV), "height" : heightPer, "background-color": COLORS[i-1], "cursor" : "pointer", "border-radius" : BORDER_RADIUS})
	    .click(function(event){

		// must select target by name to ensure we are not using some child of desired div target
		var currentTarget = "#"+addName+"div_"+event.currentTarget.id.slice(-1);	
		if($(currentTarget).hasClass("unselected")){

		    // every div other than currentTarget is added to shrinkString
		    // currently selected div that should be shrunk to give way to currentTarget is divToShrink
		    var shrinkString = ""
		    var divToShrink = "";		    
		    for(ii = 1; ii <= pageArray.length; ii++){
			if(ii !== Number(event.currentTarget.id.slice(-1))){
	      		    var divShrink = "#"+addName+"div_"+ii;      
	      		    shrinkString = shrinkString + divShrink +", " ;
			    if($(divShrink).hasClass("selected")){
				divToShrink = divShrink;
			    }		      
			}	      
		    }	

		    // all divs with names in shrink string will be simultaneously shrunk
		    shrinkString = shrinkString.slice(0, -2);
		    //first shring previously enlarged div so there will be room to expand newly selected div
		    $(shrinkString) 
			.animate({ width: widthPerSmall, height: heightPer}, LONG_TIME, function(){
			    // animate change to larger size for selected div
			    $(currentTarget)
				.animate({width: Math.round(MULTIPLE_TO*width), height: height}, LONG_TIME, function(){
				    // then load old content in now shrunken previously selected div
				    if(divToShrink.length > 1){
					toShrink = divToShrink.slice(-1)
					$(divToShrink)
					    .load(pageArray[toShrink-1])
					    .switchClass("selected", "unselected", SHORT_TIME)
					    .css({"background-color" : COLORS[toShrink-1], "border" : "0px solid black"});
				    }
				})
				.switchClass("unselected", "selected")
				.load(longPageArray[Number(event.currentTarget.id.slice(-1))-1 ]).attr("class", "selected")
				.css("background-color", "white").css("border", BORDER_STRING)
			})		 	    
		    
		    // if there is no div already selected, just select div without having to unselect
		    if(divToShrink.length < 1){
			// animate change to larger size for selected div
			$(currentTarget).animate({width: Math.round(MULTIPLE_TO*width), height: height}, LONG_TIME)
			// then switch to selected class, change style accordingly, and load larger content
			    .switchClass("unselected" , "selected")
			    .load(longPageArray[Number(event.currentTarget.id.slice(-1))-1 ])
			    .css({"background-color" : "white", "border" : BORDER_STRING})
		    }
		}
	    })
    }
}
