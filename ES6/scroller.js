'use strict';

class Scroller extends EventEmitter {

	constructor(elem, align = 'start') {

		super();

		this._elem = null;
		this._container = null;
		this._align = 'start';
		this._offset = ' + 0';
		this._events = null;

		this._elem = elem;
		this._container = elem.parentNode;
		this.setAlign(align);
		this._offset = ' + 0';

		this._events = {
			move: new EventEmitter,
			positionEnd: new EventEmitter,
			positionStart: new EventEmitter,
		};

		if(!this._container.style.position)
			this._container.style.position = 'relative';

		var self = this;

		window.addEventListener('scroll', function () {
			self.position();
		} );

		window.addEventListener('resize', function () {
			self.position();
		} );

		this.position();

	}

	getViewport() {

		return {
			x: document.documentElement.clientWidth,
			y: document.documentElement.clientHeight,
		};

	}

	getScroll() {

		return {
			x: window.pageXOffset,
			y: window.pageYOffset,
		};

	}

	setAlign(align) {

		var matches = align.match(/^(\w+)(\s*[\+\-]\s*\d+)?$/);
		if (matches && matches[1]) this._align = matches[1];
		if (matches && matches[2]) this._offset = matches[2];
		return this;

	}

	position() {
	
		var scroll = this.getScroll();
		var offset = this.getOffset();
		var position = scroll.y + (offset);
	
		var ebcr = this._elem.getBoundingClientRect();
		var cbcr = this._container.getBoundingClientRect();
	
		var maxPosition = cbcr.height - ebcr.height;
		var minPosition = 0;

		if(position <= minPosition) {
			let position = minPosition;
			this._events.positionStart
				.dispatch(position, this._container, this._elem);
		}

		if(position >= maxPosition) {
			let position = maxPosition;
			this._events.positionEnd
				.dispatch(position, this._container, this._elem);

		}

		this._events.move
				.dispatch(position, this._container, this._elem);

		this._elem.style.transform = 'translateY(' + position+ 'px)';

	}

	getOffset() {

		var scroll = this.getScroll();
		var ebcr = this._elem.getBoundingClientRect();
		var cbcr = this._container.getBoundingClientRect();

		var containerOffset = scroll.y + cbcr.top;

		var offset = 0;

		switch (this._align) {

			case 'start':

				offset = 0;
				break;

			case 'middle':

				offset = (this.getViewport().y / 2) - (ebcr.height / 2);
				break;

			case 'end':

				offset = this.getViewport().y - ebcr.height;
				break;

			default:

				offset = 0;
				break;

		}

		offset = new Function('return ' + offset + this._offset)();
		offset -= containerOffset;

		return offset;

	}

	on(name, handler) {
	
		if (!this._events[name])
		  this._events[name] = new this.EventEmitter;
	
		this._events[name].push(handler);
	
	}


}
