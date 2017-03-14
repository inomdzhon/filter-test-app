var $ = require('../common/dom-helpers');

module.exports = (function() {
	'use strict';

	var SHOW_TIMEOUT = 500;
	var SELECTOR = {
		ITEM: '.js-list-item',
		FILTER: '.js-filter',
	};
	var STATE = {
		PREPARE: 'is-prepare',
		DISABLE: 'is-disable',
		ACTIVE: 'is-active',
	};

	var mainEl = null;
	var itemsEl = null;
	var filterEl = null;

	/**
	 * Блокирирование кнопок фильтрации
	 */
	function disableFilters() {
		filterEl.forEach(function(item) {
			item.disabled = true;
		});
	}

	/**
	 * Разблокирирование кнопок фильтрации
	 */
	function undisableFilters() {
		filterEl.forEach(function(item) {
			item.disabled = false;
		});
	}

	/**
	 * Привязывание собитий
	 */
	function bindEvents() {
		$.on(filterEl, 'change', onFilterChange);
	}

	/**
	 * Анимированное поочередноё появление эл-ов
	 * @param  {Array|HTMLElement} arrElems
	 * @param  {function} onComplete - callback функция
	 */
	function slideIn(arrElems, onComplete) {
		// Заводим счетчик, который даст понять, что мы прошлись по всему массиву
		var elCountIndex = 0;
		var elTotalLength = arrElems.length;

		onComplete = typeof onComplete === 'function' ? onComplete : function() {};

		/**
		 * После того, как один эл-т полностью появился,
		 * показываем следующий
		 * @param  {TransitionEvent} evt
		 */
		function onTransitionEnd(evt) {
			if (evt.target === this) {
				showNext();
			}
		}

		/**
		 * Навешивание обработчика на завершение анимации.
		 * Возвращение эл-ту дефолтной позиции.
		 * Если прошлись по всему массиву, то вызываем callback
		 */
		function showNext() {
			var prevEl = arrElems[elCountIndex - 1];

			if (prevEl) {
				$.off(prevEl, 'transitionend', onTransitionEnd);
			}

			if (elCountIndex === elTotalLength) {
				onComplete();
				return;
			}

			var currEl = arrElems[elCountIndex];

			$.on(currEl, 'transitionend', onTransitionEnd);

			currEl.classList.add(STATE.ACTIVE);
			currEl.classList.remove(STATE.PREPARE);
			currEl.style.left = 0;

			elCountIndex = elCountIndex + 1;
		}

		showNext();
	}

	/**
	 * Анимированное скртыие эл-ов
	 * @param  {Array|HTMLElement} arrElems
	 * @param  {function} onComplete - callback функция
	 */
	function slideOut(arrElems, onComplete) {
		// Заводим счетчик, который даст понять, что мы прошлись по всему массиву
		var elCountIndex = 0;
		var elTotalLength = arrElems.length - 1;

		onComplete = typeof onComplete === 'function' ? onComplete : function() {};

		/**
		 * Каждый раз проверяем, прошлись ли по всему массиву,
		 * если да, то вызываем callback
		 * @param  {TransitionEvent} evt
		 */
		function onTransitionEnd(evt) {
			if (evt.target === this) {
				$.off(this, 'transitionend', onTransitionEnd);
				this.classList.remove(STATE.ACTIVE);

				if (elCountIndex === elTotalLength) {
					onComplete(arrElems);
				}

				elCountIndex = elCountIndex + 1;
			}
		}
		// Выносим эл-ты за экран.
		// Каждый второй эл-т отправляется вправо
		arrElems.forEach(function(item, index) {
			var direction = (index + 1) % 2 === 0 ? 'right' : 'left';
			$.on(item, 'transitionend', onTransitionEnd);
			item.style.left = $.getOffset(item, direction) + '%';
		});
	}

	/**
	 * Небольшой хак для корректного смещения элементов
	 * за область видимой части экрана
	 * @param  {Array|HTMLElement} arrElems
	 * @param  {function} onComplete - callback функция
	 */
	function prepareToShow(arrElems, onComplete) {
		onComplete = typeof onComplete === 'function' ? onComplete : function() {};

		// Выставляем эл-ты на их дефолтные позиции
		arrElems.forEach(function(item, index) {
			item.classList.add(STATE.PREPARE);
			item.style.left = 0;
		});
		// Выносим эл-ты за экран.
		// Каждый второй эл-т отправляется вправо
		arrElems.forEach(function(item, index) {
			var direction = (index + 1) % 2 === 0 ? 'right' : 'left';
			item.style.left = $.getOffset(item, direction) + '%';
		});

		window.setTimeout(function() {
			onComplete(arrElems);
		}, SHOW_TIMEOUT);
	}

	/**
	 * Обработчик изменения фильтра
	 * @param  {InputEvent} evt [description]
	 */
	function onFilterChange(evt) {
		disableFilters();

		var filter = evt.target.value;
		var arrActiveElem = $.qa(SELECTOR.ITEM + '.' + STATE.ACTIVE, mainEl);

		function initFilter() {
			var arrFilteredElem = [];

			if (filter === 'all') {
				itemsEl.forEach(function(item) {
					item.classList.remove(STATE.DISABLE);
				});

				arrFilteredElem = itemsEl;
			} else {
				itemsEl.forEach(function(item) {
					var param = $.getData(item, 'param') || [];

					if (param.indexOf(filter) !== -1) {
						item.classList.remove(STATE.DISABLE);
						arrFilteredElem.push(item);
					} else {
						item.classList.add(STATE.DISABLE);
					}
				});
			}

			prepareToShow(arrFilteredElem, function(arrElems) {
				slideIn(arrElems, undisableFilters);
			});
		}

		if (arrActiveElem.length) {
			slideOut(arrActiveElem, initFilter);
		} else {
			initFilter();
		}
	}

	/**
	 * Первая инициализация
	 */
	function firstInit() {
		disableFilters();
		prepareToShow(itemsEl, function(itemsEl) {
			slideIn(itemsEl, undisableFilters);
		});
	}

	return {
		init: function(el) {
			mainEl = el;
			itemsEl = $.qa(SELECTOR.ITEM, mainEl);
			filterEl = $.qa(SELECTOR.FILTER);

			firstInit();
			bindEvents();
		}
	};
})();
