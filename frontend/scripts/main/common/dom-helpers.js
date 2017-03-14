module.exports = (function() {
	'use strict';

	var FULL_PERCENTAGE_WIDTH = 100;
	var DIMENSION_MAP = {
		percentage: '%',
		pixel: 'px'
	};
	var CB_EVENTS = {
		transitionend: {
			'transition': 'transitionend',
			'OTransition': 'otransitionend', // oTransitionEnd in very old Opera
			'MozTransition': 'transitionend',
			'WebkitTransition': 'webkitTransitionEnd'
		}
	};

	/**
	 * Для получения события с префиксом под нужны браузер
	 * @param  {HTMLElement} elem
	 * @param  {string} eventType
	 * @return {string}
	 */
	function getCrossBrowserEvent(elem, eventType) {
		if (CB_EVENTS[eventType]) {
			var eventObj = CB_EVENTS[eventType];

			for (var prop in eventObj) {
				if (eventObj.hasOwnProperty(prop) && elem.style[prop] !== 'undefined') {
					return eventObj[prop];
				}
			}
		} else {
			return eventType;
		}
	}

	return {
		/**
		 * Обёртка над querySelector
		 * @param {string} selector
		 * @param {Object} scope
		 * @return {HTMLElement|null}
		 */
		qs: function(selector, scope) {
			return (scope || document).querySelector(selector);
		},

		/**
		 * Обёртка над querySelectorAll
		 * @param {string} selector
		 * @param {Object} scope
		 * @return {HTMLElement|null}
		 */
		qa: function(selector, scope) {
			return (scope || document).querySelectorAll(selector);
		},

		/**
		 * Обёртка над addEventListener
		 * @param {(string|Object)} target
		 * @param {string} eventType
		 * @param {function} handler
		 * @param {boolean=} useCapture
		 */
		on: function(target, eventType, handler, useCapture) {
			eventType = getCrossBrowserEvent(target, eventType);

			if (typeof target === 'string') {
				target = document.querySelectorAll(target);
			}
			if (target.forEach) {
				target.forEach(function(elem) {
					elem.addEventListener(eventType, handler, !!useCapture);
				});
			} else {
				target.addEventListener(eventType, handler, !!useCapture);
			}
		},

		/**
		 * Обёртка над removeEventListener
		 * @param {(string|Object)} target
		 * @param {string} eventType
		 * @param {function} handler
		 * @param {boolean=} useCapture
		 */
		off: function(target, eventType, handler, useCapture) {
			eventType = getCrossBrowserEvent(target, eventType);

			if (typeof target === 'string') {
				target = document.querySelectorAll(target);
			}
			if (target.forEach) {
				target.forEach(function(elem) {
					elem.removeEventListener(eventType, handler, !!useCapture);
				});
			} else {
				target.removeEventListener(eventType, handler, !!useCapture);
			}
		},

		/**
		 * Получаем смещение слева/справа
		 * @param {HTMLElement} elem
		 * @param {string} side
		 * @param {string} dimension
		 */
		getOffset: function(elem, side, dimension) {
			var elemRect = elem.getBoundingClientRect();
			var scrollWidth = document.documentElement.scrollWidth;
			var offset = 0;

			dimension = DIMENSION_MAP[dimension] || DIMENSION_MAP['percentage'];

			switch (side) {
			case 'left':
				offset = elemRect.left + elemRect.width;
				// Отрицательно значение
				offset = offset - (offset * 2);
				break;
			case 'right':
				offset = scrollWidth - elemRect.right + elemRect.width;
				break;
			}

			if (dimension === '%') {
				offset = (offset / scrollWidth) * FULL_PERCENTAGE_WIDTH;
			}

			return offset;
		},

		getData: function(elem, param) {
			if (!elem || !elem.dataset[param]) {
				return;
			}

			var data = elem.dataset[param];

			try {
				return JSON.parse(data);
			} catch(e) {
				return data;
			}
		},
	};
})();
