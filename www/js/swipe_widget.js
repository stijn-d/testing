$.widget('namespace.swipe_widget', {
	_variable:"",
	
	initX : 0,
	initY : 0,
	diff : 5,
	direction : null,
	
	options: {
		key:'value'
	},
	
	_create: function() {		
		$('body').addClass('swipe_widget');
		this._bind();
	},
	
	
	// HELPER FUNCTIONS
	isTouchDevice : function()
	{
		return !!('ontouchstart' in window);
	},
	
	_bind: function(){
		var self = this;
		if(self.isTouchDevice())
		{
			console.log('self.isTouchDevice()')
			$(window).bind('touchstart', function(e){self.downHandler(e)});
			$(window).bind('touchmove', function(e){self.moveHandler(e)});
			$(window).bind('touchend', function(e){self.upHandler(e)});			
		}else{
			console.log('!self.isTouchDevice()')
			$('html').bind('mousedown', function(e){
				console.log('click')
				self.downHandler(e);
				self.addMousemoveHandler();
			});
			$('html').bind('mouseup', function(e){
				self.upHandler(e);
				self.removeMousemoveHandler();
			});				
		};
	},
	downHandler: function(e)
	{
		var self = this;
		self.initX = self.getPosition(e).pageX;
		self.initY = self.getPosition(e).pageY;		
	},
	upHandler: function(e)
	{
		this.direction = null;	// reset	
	},
	moveHandler: function(e)
	{
		e.preventDefault();
		var self = this;
		var diffX = self.getPosition(e).pageX - self.initX;
		var diffY = self.getPosition(e).pageY - self.initY;
		if(Math.abs(diffX) > self.diff){
			if(diffX > 0){
				if(self.direction === null){
					self.direction = 'left';
					self._trigger('_swipe',  0, self.direction);
				}
				
			}else{
				if(self.direction === null){
					self.direction = 'right';
					self._trigger('_swipe',  0, self.direction);
				}
			};
		};
		if(Math.abs(diffY) > self.diff){
			if(diffY > 0){
				if(self.direction === null){
					self.direction = 'up';
					// console.log(self.direction);
					self._trigger('_swipe', 0, self.direction);
				}	
			}else{
				if(self.direction === null){
					self.direction = 'down';
					// console.log(self.direction);
					self._trigger('_swipe', 0, self.direction);
				}	
			};
		};		
	},
	addMousemoveHandler : function()
	{
		var self = this;
		$('html').bind('mousemove', function(e){self.moveHandler(e)} );
	},
	removeMousemoveHandler : function(e)
	{
		var self = this;
		$('html').unbind('mousemove');
	},
	
	_unbind: function(){
	},	
	

	getPosition : function(e)
	{
		var self = this;
		var _event = e;
		if(self.isTouchDevice())
		{
			_event = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
		}
		var position = {
			pageX : _event.pageX, 
			pageY : _event.pageY
		};
		return position;
	},

	destroy: function() {
		$('body').removeClass('swipe_widget');
		$.Widget.prototype.destroy.call( this );
	},
	
	_setOption: function( key, value ) {
		$.Widget.prototype._setOption.apply( this, arguments );
		switch ( key ) {
			case "target":
				//this.open();
				break;
		}
	}
});
