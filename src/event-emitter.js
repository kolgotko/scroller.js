;"use strict";

(function () {

	var EventEmitter = function () {

		this._queue = [];

	}

	EventEmitter.prototype.dispatch = function () {

		for(var i = 0; i != this._queue.length; i++)
			this._queue[i].apply(this, arguments);

	}

	EventEmitter.prototype.push = function (handler) {

		this._queue.push(handler);
		return this;

	}

	EventEmitter.prototype.clear = function () {

		this._queue = [];

	}

	Scroller.prototype.EventEmitter = EventEmitter;

})();
