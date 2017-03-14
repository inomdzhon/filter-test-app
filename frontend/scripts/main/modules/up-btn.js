var $ = require('../common/dom-helpers');

module.exports = (function() {
	'use strict';

	var SELECTOR = {
		TRIGGER: '.js-up-btn-trigger',
	};
	var STATE = {
		ACTIVE: 'is-active',
	};
	var SCROLL_INTERVAL_ID = null;
	var SCROLL_INTERVAL = 10;
	var SCROLL_TOP = 0;
	var SCROLL_OFFSET = 600;

	var btnWrapEl = null;
	var triggerEl = null;

	function scrollUp() {
		window.clearInterval(SCROLL_INTERVAL_ID);
		SCROLL_INTERVAL_ID = window.setInterval(function() {
			var scrollTop = document.body.scrollTop;
			if (scrollTop > SCROLL_TOP) {
				document.body.scrollTop = scrollTop - 25;
			} else {
				window.clearInterval(SCROLL_INTERVAL_ID);
			}
		}, SCROLL_INTERVAL);
	}

	function onTriggerClick() {
		scrollUp();
	}

	function onScrollUp() {
		if (document.body.scrollTop > SCROLL_OFFSET) {
			btnWrapEl.classList.add(STATE.ACTIVE);
		} else {
			btnWrapEl.classList.remove(STATE.ACTIVE);
		}
	}

	return {
		init: function(el) {
			btnWrapEl = el;
			triggerEl = $.qs(SELECTOR.TRIGGER);

			$.on(triggerEl, 'click', onTriggerClick);
			$.on(window, 'scroll', onScrollUp);
		}
	};
})();
