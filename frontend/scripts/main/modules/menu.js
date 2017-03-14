var $ = require('../common/dom-helpers');

module.exports = (function() {
	'use strict';

	var SELECTOR = {
		TRIGGER: '.js-menu-trigger',
	};
	var STATE = {
		ACTIVE: 'is-active',
	};

	var isOpen = false;

	var menuEl = null;
	var triggerEl = null;

	function open() {
		isOpen = true;

		triggerEl.classList.add(STATE.ACTIVE);
		menuEl.classList.add(STATE.ACTIVE);
	}

	function close() {
		isOpen = false;

		triggerEl.classList.remove(STATE.ACTIVE);
		menuEl.classList.remove(STATE.ACTIVE);
	}

	function onTriggerClick() {
		if (isOpen) {
			close();
		} else {
			open();
		}
	}

	return {
		init: function(el) {
			menuEl = el;
			triggerEl = $.qs(SELECTOR.TRIGGER);

			$.on(triggerEl, 'click', onTriggerClick);
		}
	};
})();
