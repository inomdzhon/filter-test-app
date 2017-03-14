'use strict';

var $ = require('./common/dom-helpers');

/* Инициализация модулей */
(function(elem) {
	if (!elem) {
		return false;
	}

	require('./modules/menu').init(elem);
})($.qs('.js-menu'));

(function(elem) {
	if (!elem) {
		return false;
	}

	require('./modules/list').init(elem);
})($.qs('.js-list'));

(function(elem) {
	if (!elem) {
		return false;
	}

	require('./modules/up-btn').init(elem);
})($.qs('.js-up-btn'));
