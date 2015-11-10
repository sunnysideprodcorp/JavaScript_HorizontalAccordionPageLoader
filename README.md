# Horizontal Accordion Page Loader

This JavaScript/jQuery widget creates a horizontal page loader that initially loads short content into mini divs when initially loaded and then loads longer content when a div is selected. 

To use create an empty div and two arrays. On array houls be the `shortPageArray` and have a list of "short" pages to show in a div when it is not expanded. The other array should be the `longPageArray` and have a list of full size pages to show in a div when it is expanded. 

Here's an example of how you could set-up the widget.

HTML:
```	
	<div id="toAppend1"  style = " height: 800px; width: 100%; overflow:hidden; "></div>

```

JavaScript:
```
      pageArray = ["demoPages/t1.html", "demoPages/t2.html", "demoPages/t3.html", "demoPages/t4.html"];
      longPageArray = ["demoPages/t11_long.html", "demoPages/t22_long.html", "demoPages/t33_long.html", "demoPages/t44_long.html"];

      $(document).ready(function(){ 
            addHorizontalAccordion('toAppend1', longPageArray, pageArray);
      });
 
 ```

The accordion widget comes with seven colors as a suggsted palette. You can substitute your own palette into the top of horizontalAccordion.js here:

```
	const COLORS = [ "#ccf8ff", "ffe0b5", "#aad6a5", "#f0f8ff", "#d3d3d3",  "#fffefda", "#dfffcc"];
```

There are also other defined constants at the top of that file to play with. 

Here's a demo of what the accordion will look like. 

![working demo](https://github.com/sunnysideprodcorp/JavaScript_HorizontalAccordionPageLoader/blob/master/demo.gif)

If you wish to change the ordering of the transitioning (when color fades in and out and when pages are loaded), you probably want to update this portion of the code:

```
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

```

As you can see the current order is (1) shrink all non-selected divs, (2) expand newly selected div, (3) load short content of formerly selected div, (4) switch formerly selected div back to unselected state, (5) switch newly selected div to selected state, (6) load content of newly selected div, and (7) slap a border on that newly highlighted div. What ordering you do will depend on your priorities and what you want to highlight. There's a good argument for moving up the asynchronous loading(`.load`) of the longer content, so that's likely to take more time and lag. For the purpose I initially coded, I liked this order the best.

Bug reports and suggested modifications are always welcome. 