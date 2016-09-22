var Scroller = function (elem, align) {

	this._elem = elem;
	this._container = elem.parentNode;
	this.setAlign(align);

	if(!this._elem.style.position)
		this._elem.style.position = 'absolute';

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

Scroller.prototype._elem = null;
Scroller.prototype._container = null;
Scroller.prototype._align = 'start';
Scroller.prototype._offset = ' + 0';

/**
 *  Вернёт область просмотра окна браузера
 */
Scroller.prototype.getViewport = function () {

	return {
		x: document.documentElement.clientWidth,
		y: document.documentElement.clientHeight,
	};

}

/**
 * Вернёт позицию прокрутки.
 */
Scroller.prototype.getScroll = function () {

	return {
		x: window.pageXOffset,
		y: window.pageYOffset,
	};

}

/**
 *  Устанавливает выравнивание элемента относительно области просмотра.
 */
Scroller.prototype.setAlign = function (align) {

	var matches = align.match(/^(\w+)(\s*[\+\-]\s*\d+)?$/);
	if (matches && matches[1]) this._align = matches[1];
	if (matches && matches[2]) this._offset = matches[2];
	return this;

}

/**
 *  Процедура позиционирования элемента.
 */
Scroller.prototype.position = function () {

	var scroll = this.getScroll();
	var offset = this.getOffset();
	var position = scroll.y + (offset);

	var ebcr = this._elem.getBoundingClientRect();
	var cbcr = this._container.getBoundingClientRect();

	var maxPosition = cbcr.height - ebcr.height;
	var minPosition = 0;

	if(position < minPosition) position = minPosition;
	if(position > maxPosition) position = maxPosition;

	this._elem.style.top = position + 'px';

}

/**
 *  Возвращает смещение элемента в пикселях
 */
Scroller.prototype.getOffset = function () {

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
