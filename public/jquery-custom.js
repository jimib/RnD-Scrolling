$(document).ready( function(){
	//find all the items with data-jquery attr
	$("[data-jquery]").each( function( index, item ){
		var $item = $(item);
		//evaluate the expression which enabled jquery for us
		eval("$item."+$item.attr("data-jquery"));
	} );
} );

//TWITTER
$.widget( "pixel.scrollAutoHide", {
 
    // Default options.
    options: {
	},
	
    _create: function() {
		var self = this;
		self.isRunning = true;
		var $el = $( this.element ),
			$elChild = $el.find(">*");
		
		var offsetTop = $elChild.offset().top;
		
		setInterval( function(){
			if( $elChild.offset().top != offsetTop ){
				offsetTop = $elChild.offset().top;
				updateDisplay();
			} 
		}, 10);
		
		//update the display
		updateDisplay();
		
		//$el.on("scroll", updateDisplay );
		//helper to update the state of all the items
		function updateDisplay(){
			var $items = $el.find("[data-auto-hide]");
			
			var x = $el.offset().left,
				y = $el.offset().top,
				w = $el.width(),
				h = $el.height();
				
			//update our list of children - hiding those that need hiding
			$items.each( function( index, item ){
				//
				var $item = $(item), $parent = $item.parent();
				var ix = $parent.offset().left,
					iy = $parent.offset().top,
					iw = $parent.width(),
					ih = $parent.height();
				
				if( 
					iy > y + h 
					|| iy + ih < y 
					|| ix > x + w 
					|| ix + iw < x 
				){
					//hide the item
					if( !item.hidden ){
						item.hidden = true;
						$item.addClass("hidden");
					}
				}else{
					//show the item
					if( item.hidden ){
						item.hidden = false;
						$item.removeClass("hidden");
					}
				}
			} );
		}
    },
	
	_destroy : function(){
		this.isRunning = false;
	}
 
});
