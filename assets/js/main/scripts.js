/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!******************************************!*\
  !*** ./frontend/scripts/main/scripts.js ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nvar $ = __webpack_require__(/*! ./common/dom-helpers */ 1);\n\n/* Инициализация модулей */\n(function(elem) {\n\tif (!elem) {\n\t\treturn false;\n\t}\n\n\t__webpack_require__(/*! ./modules/menu */ 2).init(elem);\n})($.qs('.js-menu'));\n\n(function(elem) {\n\tif (!elem) {\n\t\treturn false;\n\t}\n\n\t__webpack_require__(/*! ./modules/list */ 3).init(elem);\n})($.qs('.js-list'));\n\n(function(elem) {\n\tif (!elem) {\n\t\treturn false;\n\t}\n\n\t__webpack_require__(/*! ./modules/up-btn */ 4).init(elem);\n})($.qs('.js-up-btn'));\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./frontend/scripts/main/scripts.js\n// module id = 0\n// module chunks = 0\n//# sourceURL=webpack:///./frontend/scripts/main/scripts.js?");

/***/ },
/* 1 */
/*!*****************************************************!*\
  !*** ./frontend/scripts/main/common/dom-helpers.js ***!
  \*****************************************************/
/***/ function(module, exports) {

	eval("module.exports = (function() {\n\t'use strict';\n\n\tvar FULL_PERCENTAGE_WIDTH = 100;\n\tvar DIMENSION_MAP = {\n\t\tpercentage: '%',\n\t\tpixel: 'px'\n\t};\n\tvar CB_EVENTS = {\n\t\ttransitionend: {\n\t\t\t'transition': 'transitionend',\n\t\t\t'OTransition': 'otransitionend', // oTransitionEnd in very old Opera\n\t\t\t'MozTransition': 'transitionend',\n\t\t\t'WebkitTransition': 'webkitTransitionEnd'\n\t\t}\n\t};\n\n\t/**\n\t * Для получения события с префиксом под нужны браузер\n\t * @param  {HTMLElement} elem\n\t * @param  {string} eventType\n\t * @return {string}\n\t */\n\tfunction getCrossBrowserEvent(elem, eventType) {\n\t\tif (CB_EVENTS[eventType]) {\n\t\t\tvar eventObj = CB_EVENTS[eventType];\n\n\t\t\tfor (var prop in eventObj) {\n\t\t\t\tif (eventObj.hasOwnProperty(prop) && elem.style[prop] !== 'undefined') {\n\t\t\t\t\treturn eventObj[prop];\n\t\t\t\t}\n\t\t\t}\n\t\t} else {\n\t\t\treturn eventType;\n\t\t}\n\t}\n\n\treturn {\n\t\t/**\n\t\t * Обёртка над querySelector\n\t\t * @param {string} selector\n\t\t * @param {Object} scope\n\t\t * @return {HTMLElement|null}\n\t\t */\n\t\tqs: function(selector, scope) {\n\t\t\treturn (scope || document).querySelector(selector);\n\t\t},\n\n\t\t/**\n\t\t * Обёртка над querySelectorAll\n\t\t * @param {string} selector\n\t\t * @param {Object} scope\n\t\t * @return {HTMLElement|null}\n\t\t */\n\t\tqa: function(selector, scope) {\n\t\t\treturn (scope || document).querySelectorAll(selector);\n\t\t},\n\n\t\t/**\n\t\t * Обёртка над addEventListener\n\t\t * @param {(string|Object)} target\n\t\t * @param {string} eventType\n\t\t * @param {function} handler\n\t\t * @param {boolean=} useCapture\n\t\t */\n\t\ton: function(target, eventType, handler, useCapture) {\n\t\t\teventType = getCrossBrowserEvent(target, eventType);\n\n\t\t\tif (typeof target === 'string') {\n\t\t\t\ttarget = document.querySelectorAll(target);\n\t\t\t}\n\t\t\tif (target.forEach) {\n\t\t\t\ttarget.forEach(function(elem) {\n\t\t\t\t\telem.addEventListener(eventType, handler, !!useCapture);\n\t\t\t\t});\n\t\t\t} else {\n\t\t\t\ttarget.addEventListener(eventType, handler, !!useCapture);\n\t\t\t}\n\t\t},\n\n\t\t/**\n\t\t * Обёртка над removeEventListener\n\t\t * @param {(string|Object)} target\n\t\t * @param {string} eventType\n\t\t * @param {function} handler\n\t\t * @param {boolean=} useCapture\n\t\t */\n\t\toff: function(target, eventType, handler, useCapture) {\n\t\t\teventType = getCrossBrowserEvent(target, eventType);\n\n\t\t\tif (typeof target === 'string') {\n\t\t\t\ttarget = document.querySelectorAll(target);\n\t\t\t}\n\t\t\tif (target.forEach) {\n\t\t\t\ttarget.forEach(function(elem) {\n\t\t\t\t\telem.removeEventListener(eventType, handler, !!useCapture);\n\t\t\t\t});\n\t\t\t} else {\n\t\t\t\ttarget.removeEventListener(eventType, handler, !!useCapture);\n\t\t\t}\n\t\t},\n\n\t\t/**\n\t\t * Получаем смещение слева/справа\n\t\t * @param {HTMLElement} elem\n\t\t * @param {string} side\n\t\t * @param {string} dimension\n\t\t */\n\t\tgetOffset: function(elem, side, dimension) {\n\t\t\tvar elemRect = elem.getBoundingClientRect();\n\t\t\tvar scrollWidth = document.documentElement.scrollWidth;\n\t\t\tvar offset = 0;\n\n\t\t\tdimension = DIMENSION_MAP[dimension] || DIMENSION_MAP['percentage'];\n\n\t\t\tswitch (side) {\n\t\t\tcase 'left':\n\t\t\t\toffset = elemRect.left + elemRect.width;\n\t\t\t\t// Отрицательно значение\n\t\t\t\toffset = offset - (offset * 2);\n\t\t\t\tbreak;\n\t\t\tcase 'right':\n\t\t\t\toffset = scrollWidth - elemRect.right + elemRect.width;\n\t\t\t\tbreak;\n\t\t\t}\n\n\t\t\tif (dimension === '%') {\n\t\t\t\toffset = (offset / scrollWidth) * FULL_PERCENTAGE_WIDTH;\n\t\t\t}\n\n\t\t\treturn offset;\n\t\t},\n\n\t\tgetData: function(elem, param) {\n\t\t\tif (!elem || !elem.dataset[param]) {\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tvar data = elem.dataset[param];\n\n\t\t\ttry {\n\t\t\t\treturn JSON.parse(data);\n\t\t\t} catch(e) {\n\t\t\t\treturn data;\n\t\t\t}\n\t\t},\n\t};\n})();\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./frontend/scripts/main/common/dom-helpers.js\n// module id = 1\n// module chunks = 0\n//# sourceURL=webpack:///./frontend/scripts/main/common/dom-helpers.js?");

/***/ },
/* 2 */
/*!***********************************************!*\
  !*** ./frontend/scripts/main/modules/menu.js ***!
  \***********************************************/
/***/ function(module, exports, __webpack_require__) {

	eval("var $ = __webpack_require__(/*! ../common/dom-helpers */ 1);\n\nmodule.exports = (function() {\n\t'use strict';\n\n\tvar SELECTOR = {\n\t\tTRIGGER: '.js-menu-trigger',\n\t};\n\tvar STATE = {\n\t\tACTIVE: 'is-active',\n\t};\n\n\tvar isOpen = false;\n\n\tvar menuEl = null;\n\tvar triggerEl = null;\n\n\tfunction open() {\n\t\tisOpen = true;\n\n\t\ttriggerEl.classList.add(STATE.ACTIVE);\n\t\tmenuEl.classList.add(STATE.ACTIVE);\n\t}\n\n\tfunction close() {\n\t\tisOpen = false;\n\n\t\ttriggerEl.classList.remove(STATE.ACTIVE);\n\t\tmenuEl.classList.remove(STATE.ACTIVE);\n\t}\n\n\tfunction onTriggerClick() {\n\t\tif (isOpen) {\n\t\t\tclose();\n\t\t} else {\n\t\t\topen();\n\t\t}\n\t}\n\n\treturn {\n\t\tinit: function(el) {\n\t\t\tmenuEl = el;\n\t\t\ttriggerEl = $.qs(SELECTOR.TRIGGER);\n\n\t\t\t$.on(triggerEl, 'click', onTriggerClick);\n\t\t}\n\t};\n})();\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./frontend/scripts/main/modules/menu.js\n// module id = 2\n// module chunks = 0\n//# sourceURL=webpack:///./frontend/scripts/main/modules/menu.js?");

/***/ },
/* 3 */
/*!***********************************************!*\
  !*** ./frontend/scripts/main/modules/list.js ***!
  \***********************************************/
/***/ function(module, exports, __webpack_require__) {

	eval("var $ = __webpack_require__(/*! ../common/dom-helpers */ 1);\n\nmodule.exports = (function() {\n\t'use strict';\n\n\tvar SHOW_TIMEOUT = 500;\n\tvar SELECTOR = {\n\t\tITEM: '.js-list-item',\n\t\tFILTER: '.js-filter',\n\t};\n\tvar STATE = {\n\t\tPREPARE: 'is-prepare',\n\t\tDISABLE: 'is-disable',\n\t\tACTIVE: 'is-active',\n\t};\n\n\tvar mainEl = null;\n\tvar itemsEl = null;\n\tvar filterEl = null;\n\n\t/**\n\t * Блокирирование кнопок фильтрации\n\t */\n\tfunction disableFilters() {\n\t\tfilterEl.forEach(function(item) {\n\t\t\titem.disabled = true;\n\t\t});\n\t}\n\n\t/**\n\t * Разблокирирование кнопок фильтрации\n\t */\n\tfunction undisableFilters() {\n\t\tfilterEl.forEach(function(item) {\n\t\t\titem.disabled = false;\n\t\t});\n\t}\n\n\t/**\n\t * Привязывание собитий\n\t */\n\tfunction bindEvents() {\n\t\t$.on(filterEl, 'change', onFilterChange);\n\t}\n\n\t/**\n\t * Анимированное поочередноё появление эл-ов\n\t * @param  {Array|HTMLElement} arrElems\n\t * @param  {function} onComplete - callback функция\n\t */\n\tfunction slideIn(arrElems, onComplete) {\n\t\t// Заводим счетчик, который даст понять, что мы прошлись по всему массиву\n\t\tvar elCountIndex = 0;\n\t\tvar elTotalLength = arrElems.length;\n\n\t\tonComplete = typeof onComplete === 'function' ? onComplete : function() {};\n\n\t\t/**\n\t\t * После того, как один эл-т полностью появился,\n\t\t * показываем следующий\n\t\t * @param  {TransitionEvent} evt\n\t\t */\n\t\tfunction onTransitionEnd(evt) {\n\t\t\tif (evt.target === this) {\n\t\t\t\tshowNext();\n\t\t\t}\n\t\t}\n\n\t\t/**\n\t\t * Навешивание обработчика на завершение анимации.\n\t\t * Возвращение эл-ту дефолтной позиции.\n\t\t * Если прошлись по всему массиву, то вызываем callback\n\t\t */\n\t\tfunction showNext() {\n\t\t\tvar prevEl = arrElems[elCountIndex - 1];\n\n\t\t\tif (prevEl) {\n\t\t\t\t$.off(prevEl, 'transitionend', onTransitionEnd);\n\t\t\t}\n\n\t\t\tif (elCountIndex === elTotalLength) {\n\t\t\t\tonComplete();\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tvar currEl = arrElems[elCountIndex];\n\n\t\t\t$.on(currEl, 'transitionend', onTransitionEnd);\n\n\t\t\tcurrEl.classList.add(STATE.ACTIVE);\n\t\t\tcurrEl.classList.remove(STATE.PREPARE);\n\t\t\tcurrEl.style.left = 0;\n\n\t\t\telCountIndex = elCountIndex + 1;\n\t\t}\n\n\t\tshowNext();\n\t}\n\n\t/**\n\t * Анимированное скртыие эл-ов\n\t * @param  {Array|HTMLElement} arrElems\n\t * @param  {function} onComplete - callback функция\n\t */\n\tfunction slideOut(arrElems, onComplete) {\n\t\t// Заводим счетчик, который даст понять, что мы прошлись по всему массиву\n\t\tvar elCountIndex = 0;\n\t\tvar elTotalLength = arrElems.length - 1;\n\n\t\tonComplete = typeof onComplete === 'function' ? onComplete : function() {};\n\n\t\t/**\n\t\t * Каждый раз проверяем, прошлись ли по всему массиву,\n\t\t * если да, то вызываем callback\n\t\t * @param  {TransitionEvent} evt\n\t\t */\n\t\tfunction onTransitionEnd(evt) {\n\t\t\tif (evt.target === this) {\n\t\t\t\t$.off(this, 'transitionend', onTransitionEnd);\n\t\t\t\tthis.classList.remove(STATE.ACTIVE);\n\n\t\t\t\tif (elCountIndex === elTotalLength) {\n\t\t\t\t\tonComplete(arrElems);\n\t\t\t\t}\n\n\t\t\t\telCountIndex = elCountIndex + 1;\n\t\t\t}\n\t\t}\n\t\t// Выносим эл-ты за экран.\n\t\t// Каждый второй эл-т отправляется вправо\n\t\tarrElems.forEach(function(item, index) {\n\t\t\tvar direction = (index + 1) % 2 === 0 ? 'right' : 'left';\n\t\t\t$.on(item, 'transitionend', onTransitionEnd);\n\t\t\titem.style.left = $.getOffset(item, direction) + '%';\n\t\t});\n\t}\n\n\t/**\n\t * Небольшой хак для корректного смещения элементов\n\t * за область видимой части экрана\n\t * @param  {Array|HTMLElement} arrElems\n\t * @param  {function} onComplete - callback функция\n\t */\n\tfunction prepareToShow(arrElems, onComplete) {\n\t\tonComplete = typeof onComplete === 'function' ? onComplete : function() {};\n\n\t\t// Выставляем эл-ты на их дефолтные позиции\n\t\tarrElems.forEach(function(item, index) {\n\t\t\titem.classList.add(STATE.PREPARE);\n\t\t\titem.style.left = 0;\n\t\t});\n\t\t// Выносим эл-ты за экран.\n\t\t// Каждый второй эл-т отправляется вправо\n\t\tarrElems.forEach(function(item, index) {\n\t\t\tvar direction = (index + 1) % 2 === 0 ? 'right' : 'left';\n\t\t\titem.style.left = $.getOffset(item, direction) + '%';\n\t\t});\n\n\t\twindow.setTimeout(function() {\n\t\t\tonComplete(arrElems);\n\t\t}, SHOW_TIMEOUT);\n\t}\n\n\t/**\n\t * Обработчик изменения фильтра\n\t * @param  {InputEvent} evt [description]\n\t */\n\tfunction onFilterChange(evt) {\n\t\tdisableFilters();\n\n\t\tvar filter = evt.target.value;\n\t\tvar arrActiveElem = $.qa(SELECTOR.ITEM + '.' + STATE.ACTIVE, mainEl);\n\n\t\tfunction initFilter() {\n\t\t\tvar arrFilteredElem = [];\n\n\t\t\tif (filter === 'all') {\n\t\t\t\titemsEl.forEach(function(item) {\n\t\t\t\t\titem.classList.remove(STATE.DISABLE);\n\t\t\t\t});\n\n\t\t\t\tarrFilteredElem = itemsEl;\n\t\t\t} else {\n\t\t\t\titemsEl.forEach(function(item) {\n\t\t\t\t\tvar param = $.getData(item, 'param') || [];\n\n\t\t\t\t\tif (param.indexOf(filter) !== -1) {\n\t\t\t\t\t\titem.classList.remove(STATE.DISABLE);\n\t\t\t\t\t\tarrFilteredElem.push(item);\n\t\t\t\t\t} else {\n\t\t\t\t\t\titem.classList.add(STATE.DISABLE);\n\t\t\t\t\t}\n\t\t\t\t});\n\t\t\t}\n\n\t\t\tprepareToShow(arrFilteredElem, function(arrElems) {\n\t\t\t\tslideIn(arrElems, undisableFilters);\n\t\t\t});\n\t\t}\n\n\t\tif (arrActiveElem.length) {\n\t\t\tslideOut(arrActiveElem, initFilter);\n\t\t} else {\n\t\t\tinitFilter();\n\t\t}\n\t}\n\n\t/**\n\t * Первая инициализация\n\t */\n\tfunction firstInit() {\n\t\tdisableFilters();\n\t\tprepareToShow(itemsEl, function(itemsEl) {\n\t\t\tslideIn(itemsEl, undisableFilters);\n\t\t});\n\t}\n\n\treturn {\n\t\tinit: function(el) {\n\t\t\tmainEl = el;\n\t\t\titemsEl = $.qa(SELECTOR.ITEM, mainEl);\n\t\t\tfilterEl = $.qa(SELECTOR.FILTER);\n\n\t\t\tfirstInit();\n\t\t\tbindEvents();\n\t\t}\n\t};\n})();\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./frontend/scripts/main/modules/list.js\n// module id = 3\n// module chunks = 0\n//# sourceURL=webpack:///./frontend/scripts/main/modules/list.js?");

/***/ },
/* 4 */
/*!*************************************************!*\
  !*** ./frontend/scripts/main/modules/up-btn.js ***!
  \*************************************************/
/***/ function(module, exports, __webpack_require__) {

	eval("var $ = __webpack_require__(/*! ../common/dom-helpers */ 1);\n\nmodule.exports = (function() {\n\t'use strict';\n\n\tvar SELECTOR = {\n\t\tTRIGGER: '.js-up-btn-trigger',\n\t};\n\tvar STATE = {\n\t\tACTIVE: 'is-active',\n\t};\n\tvar SCROLL_INTERVAL_ID = null;\n\tvar SCROLL_INTERVAL = 10;\n\tvar SCROLL_TOP = 0;\n\tvar SCROLL_OFFSET = 600;\n\n\tvar btnWrapEl = null;\n\tvar triggerEl = null;\n\n\tfunction scrollUp() {\n\t\twindow.clearInterval(SCROLL_INTERVAL_ID);\n\t\tSCROLL_INTERVAL_ID = window.setInterval(function() {\n\t\t\tvar scrollTop = document.body.scrollTop;\n\t\t\tif (scrollTop > SCROLL_TOP) {\n\t\t\t\tdocument.body.scrollTop = scrollTop - 25;\n\t\t\t} else {\n\t\t\t\twindow.clearInterval(SCROLL_INTERVAL_ID);\n\t\t\t}\n\t\t}, SCROLL_INTERVAL);\n\t}\n\n\tfunction onTriggerClick() {\n\t\tscrollUp();\n\t}\n\n\tfunction onScrollUp() {\n\t\tif (document.body.scrollTop > SCROLL_OFFSET) {\n\t\t\tbtnWrapEl.classList.add(STATE.ACTIVE);\n\t\t} else {\n\t\t\tbtnWrapEl.classList.remove(STATE.ACTIVE);\n\t\t}\n\t}\n\n\treturn {\n\t\tinit: function(el) {\n\t\t\tbtnWrapEl = el;\n\t\t\ttriggerEl = $.qs(SELECTOR.TRIGGER);\n\n\t\t\t$.on(triggerEl, 'click', onTriggerClick);\n\t\t\t$.on(window, 'scroll', onScrollUp);\n\t\t}\n\t};\n})();\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./frontend/scripts/main/modules/up-btn.js\n// module id = 4\n// module chunks = 0\n//# sourceURL=webpack:///./frontend/scripts/main/modules/up-btn.js?");

/***/ }
/******/ ]);