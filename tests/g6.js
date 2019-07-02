(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["G6"] = factory();
	else
		root["G6"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@antv/g/lib/canvas.js":
/*!********************************************!*\
  !*** ./node_modules/@antv/g/lib/canvas.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(/*! ./util/index */ "./node_modules/@antv/g/lib/util/index.js");

var Event = __webpack_require__(/*! ./core/mixin/event */ "./node_modules/@antv/g/lib/core/mixin/event.js");

var Group = __webpack_require__(/*! ./core/group */ "./node_modules/@antv/g/lib/core/group.js");

var Timeline = __webpack_require__(/*! ./core/mixin/timeline */ "./node_modules/@antv/g/lib/core/mixin/timeline.js");

var renderers = __webpack_require__(/*! ./renderers/index */ "./node_modules/@antv/g/lib/renderers/index.js");

var Canvas = function Canvas(cfg) {
  Canvas.superclass.constructor.call(this, cfg);
};

Canvas.CFG = {
  eventEnable: true,

  /**
   * 像素宽度
   * @type {Number}
   */
  width: null,

  /**
   * 像素高度
   * @type {Number}
   */
  height: null,

  /**
   * 画布宽度
   * @type {Number}
   */
  widthCanvas: null,

  /**
   * 画布高度
   * @type {Number}
   */
  heightCanvas: null,

  /**
   * CSS宽
   * @type {String}
   */
  widthStyle: null,

  /**
   * CSS高
   * @type {String}
   */
  heightStyle: null,

  /**
   * 容器DOM
   * @type {Object}
   */
  containerDOM: null,

  /**
   * 当前Canvas的DOM
   * @type {Object}
   */
  canvasDOM: null,

  /**
   * 屏幕像素比
   * @type {Number}
   */
  pixelRatio: null,

  /**
   * 渲染器，默认是canvas
   * @type {String}
   */
  renderer: 'canvas'
};
Util.extend(Canvas, Group);
Util.augment(Canvas, Event, {
  init: function init() {
    Canvas.superclass.init.call(this);

    this._setGlobalParam();

    this._setContainer();

    this._initPainter();

    this._scale();

    if (this.get('eventEnable')) {
      this.registerEvent(this);
    }
  },
  _scale: function _scale() {
    if (this._cfg.renderType !== 'svg') {
      var pixelRatio = this.get('pixelRatio');
      this.scale(pixelRatio, pixelRatio);
    }
  },
  _setGlobalParam: function _setGlobalParam() {
    var renderType = this.get('renderer') || 'canvas';

    if (renderType === 'svg') {
      this.set('pixelRatio', 1);
    } else if (!this.get('pixelRatio')) {
      this.set('pixelRatio', Util.getRatio());
    }

    this._cfg.renderType = renderType;
    var renderer = renderers[renderType];
    this._cfg.renderer = renderer;
    this._cfg.canvas = this;
    var timeline = new Timeline(this);
    this._cfg.timeline = timeline;
  },
  _setContainer: function _setContainer() {
    var containerId = this.get('containerId');
    var containerDOM = this.get('containerDOM');

    if (!containerDOM) {
      containerDOM = document.getElementById(containerId);
      this.set('containerDOM', containerDOM);
    }

    Util.modifyCSS(containerDOM, {
      position: 'relative'
    });
  },
  _initPainter: function _initPainter() {
    var containerDOM = this.get('containerDOM');
    var painter = new this._cfg.renderer.painter(containerDOM);
    this._cfg.painter = painter;
    this._cfg.canvasDOM = this._cfg.el = painter.canvas;
    this.changeSize(this.get('width'), this.get('height'));
  },
  _resize: function _resize() {
    var canvasDOM = this.get('canvasDOM');
    var widthCanvas = this.get('widthCanvas');
    var heightCanvas = this.get('heightCanvas');
    var widthStyle = this.get('widthStyle');
    var heightStyle = this.get('heightStyle');
    canvasDOM.style.width = widthStyle;
    canvasDOM.style.height = heightStyle;
    canvasDOM.setAttribute('width', widthCanvas);
    canvasDOM.setAttribute('height', heightCanvas);
  },
  getWidth: function getWidth() {
    var pixelRatio = this.get('pixelRatio');
    var width = this.get('width');
    return width * pixelRatio;
  },
  getHeight: function getHeight() {
    var pixelRatio = this.get('pixelRatio');
    var height = this.get('height');
    return height * pixelRatio;
  },
  changeSize: function changeSize(width, height) {
    var pixelRatio = this.get('pixelRatio');
    var widthCanvas = width * pixelRatio;
    var heightCanvas = height * pixelRatio;
    this.set('widthCanvas', widthCanvas);
    this.set('heightCanvas', heightCanvas);
    this.set('widthStyle', width + 'px');
    this.set('heightStyle', height + 'px');
    this.set('width', width);
    this.set('height', height);

    this._resize();
  },

  /**
   * 将窗口坐标转变成 canvas 坐标
   * @param  {Number} clientX 窗口x坐标
   * @param  {Number} clientY 窗口y坐标
   * @return {Object} canvas坐标
   */
  getPointByClient: function getPointByClient(clientX, clientY) {
    var el = this.get('el');
    var pixelRatio = this.get('pixelRatio') || 1;
    var bbox = el.getBoundingClientRect();
    return {
      x: (clientX - bbox.left) * pixelRatio,
      y: (clientY - bbox.top) * pixelRatio
    };
  },
  getClientByPoint: function getClientByPoint(x, y) {
    var el = this.get('el');
    var bbox = el.getBoundingClientRect();
    var pixelRatio = this.get('pixelRatio') || 1;
    return {
      clientX: x / pixelRatio + bbox.left,
      clientY: y / pixelRatio + bbox.top
    };
  },
  draw: function draw() {
    this._cfg.painter.draw(this);
  },
  getShape: function getShape(x, y, e) {
    if (arguments.length === 3 && this._cfg.renderer.getShape) {
      return this._cfg.renderer.getShape.call(this, x, y, e);
    }

    return Canvas.superclass.getShape.call(this, x, y);
  },
  getRenderer: function getRenderer() {
    return this._cfg.renderType;
  },
  _drawSync: function _drawSync() {
    this._cfg.painter.drawSync(this);
  },
  destroy: function destroy() {
    var cfg = this._cfg;
    var containerDOM = cfg.containerDOM;
    var canvasDOM = cfg.canvasDOM;

    if (canvasDOM && containerDOM) {
      containerDOM.removeChild(canvasDOM);
    }

    cfg.timeline.stop();
    Canvas.superclass.destroy.call(this);
  }
});
module.exports = Canvas;

/***/ }),

/***/ "./node_modules/@antv/g/lib/core/advanced-event-emitter.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@antv/g/lib/core/advanced-event-emitter.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(/*! ../util/index */ "./node_modules/@antv/g/lib/util/index.js");

var Event = __webpack_require__(/*! ../event */ "./node_modules/@antv/g/lib/event.js");

var EventEmitter = __webpack_require__(/*! ./event-emitter */ "./node_modules/@antv/g/lib/core/event-emitter.js");

var PROPOGATE_EVENTS = ['click', 'mousedown', 'mouseup', 'dblclick', 'contextmenu', 'mouseout', 'mouseover', 'mousemove', 'dragstart', 'drag', 'dragend', 'dragenter', 'dragleave', 'drop'];

var AdvancedEE = function AdvancedEE() {};

Util.augment(AdvancedEE, EventEmitter, {
  emit: function emit(evt, e) {
    var args = arguments;
    EventEmitter.prototype.emit.apply(this, args);

    if (args.length >= 2 && args[1] instanceof Event && args[1].propagationStopped) {
      return;
    }

    if (PROPOGATE_EVENTS.indexOf(evt) >= 0 && e.target === this
    /* prevent bubbling multiple times */
    ) {
        var shape = this._cfg.parent;

        while (shape && !shape.get('destroyed')) {
          shape.emit.apply(shape, args);
          shape = shape._cfg.parent;
        }
      }
  }
});
module.exports = AdvancedEE;

/***/ }),

/***/ "./node_modules/@antv/g/lib/core/element.js":
/*!**************************************************!*\
  !*** ./node_modules/@antv/g/lib/core/element.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(/*! ../util/index */ "./node_modules/@antv/g/lib/util/index.js");

var Attribute = __webpack_require__(/*! ./mixin/attribute */ "./node_modules/@antv/g/lib/core/mixin/attribute.js");

var Transform = __webpack_require__(/*! ./mixin/transform */ "./node_modules/@antv/g/lib/core/mixin/transform.js");

var Animate = __webpack_require__(/*! ./mixin/animation */ "./node_modules/@antv/g/lib/core/mixin/animation.js");

var EventEmitter = __webpack_require__(/*! ./advanced-event-emitter */ "./node_modules/@antv/g/lib/core/advanced-event-emitter.js");

var Element = function Element(cfg) {
  this._cfg = {
    zIndex: 0,
    capture: true,
    visible: true,
    destroyed: false
  }; // 配置存放地

  Util.assign(this._cfg, this.getDefaultCfg(), cfg); // Element.CFG不合并，提升性能 合并默认配置，用户配置->继承默认配置->Element默认配置

  this.initAttrs(this._cfg.attrs); // 初始化绘图属性

  this._cfg.attrs = {};
  this.initTransform(); // 初始化变换

  this.init(); // 类型初始化
};

Element.CFG = {
  /**
   * 唯一标示
   * @type {Number}
   */
  id: null,

  /**
   * Z轴的层叠关系，Z值越大离用户越近
   * @type {Number}
   */
  zIndex: 0,

  /**
   * Canvas对象
   * @type: {Object}
   */
  canvas: null,

  /**
   * 父元素指针
   * @type {Object}
   */
  parent: null,

  /**
   * 用来设置当前对象是否能被捕捉
   * true 能
   * false 不能
   * 对象默认是都可以被捕捉的, 当capture为false时，group.getShape(x, y)方法无法获得该元素
   * 通过将不必要捕捉的元素的该属性设置成false, 来提高捕捉性能
   * @type {Boolean}
   **/
  capture: true,

  /**
   * 画布的上下文
   * @type {Object}
   */
  context: null,

  /**
   * 是否显示
   * @type {Boolean}
   */
  visible: true,

  /**
   * 是否被销毁
   * @type: {Boolean}
   */
  destroyed: false
};
Util.augment(Element, Attribute, Transform, EventEmitter, Animate, {
  init: function init() {
    this.setSilent('animable', true);
    this.setSilent('animating', false); // 初始时不处于动画状态
  },
  getParent: function getParent() {
    return this._cfg.parent;
  },

  /**
   * 获取默认的配置信息
   * @protected
   * @return {Object} 默认的属性
   */
  getDefaultCfg: function getDefaultCfg() {
    return {};
  },
  set: function set(name, value) {
    if (name === 'zIndex' && this._beforeSetZIndex) {
      this._beforeSetZIndex(value);
    }

    if (name === 'loading' && this._beforeSetLoading) {
      this._beforeSetLoading(value);
    }

    this._cfg[name] = value;
    return this;
  },
  // deprecated
  setSilent: function setSilent(name, value) {
    this._cfg[name] = value;
  },
  get: function get(name) {
    return this._cfg[name];
  },
  show: function show() {
    this._cfg.visible = true;
    return this;
  },
  hide: function hide() {
    this._cfg.visible = false;
    return this;
  },
  remove: function remove(destroy, delayRemove) {
    var cfg = this._cfg;
    var parent = cfg.parent;
    var el = cfg.el;

    if (parent) {
      Util.remove(parent.get('children'), this);
    }

    if (el) {
      if (delayRemove) {
        parent && parent._cfg.tobeRemoved.push(el);
      } else {
        el.parentNode.removeChild(el);
      }
    }

    if (destroy || destroy === undefined) {
      this.destroy();
    }

    return this;
  },
  destroy: function destroy() {
    var destroyed = this.get('destroyed');

    if (destroyed) {
      return;
    }

    this._attrs = null;
    this.removeEvent(); // 移除所有的事件

    this._cfg = {
      destroyed: true
    };
  },
  toFront: function toFront() {
    var cfg = this._cfg;
    var parent = cfg.parent;

    if (!parent) {
      return;
    }

    var children = parent._cfg.children;
    var el = cfg.el;
    var index = children.indexOf(this);
    children.splice(index, 1);
    children.push(this);

    if (el) {
      el.parentNode.removeChild(el);
      cfg.el = null;
    }
  },
  toBack: function toBack() {
    var cfg = this._cfg;
    var parent = cfg.parent;

    if (!parent) {
      return;
    }

    var children = parent._cfg.children;
    var el = cfg.el;
    var index = children.indexOf(this);
    children.splice(index, 1);
    children.unshift(this);

    if (el) {
      var parentNode = el.parentNode;
      parentNode.removeChild(el);
      parentNode.insertBefore(el, parentNode.firstChild);
    }
  },
  _beforeSetZIndex: function _beforeSetZIndex(zIndex) {
    var parent = this._cfg.parent;
    this._cfg.zIndex = zIndex;

    if (!Util.isNil(parent)) {
      parent.sort();
    }

    var el = this._cfg.el;

    if (el) {
      var children = parent._cfg.children;
      var index = children.indexOf(this);
      var parentNode = el.parentNode;
      parentNode.removeChild(el);

      if (index === children.length - 1) {
        parentNode.appendChild(el);
      } else {
        parentNode.insertBefore(el, parentNode.childNodes[index]);
      }
    }

    return zIndex;
  },
  _setAttrs: function _setAttrs(attrs) {
    this.attr(attrs);
    return attrs;
  },
  setZIndex: function setZIndex(zIndex) {
    this._cfg.zIndex = zIndex;
    return this._beforeSetZIndex(zIndex);
  },
  clone: function clone() {
    return Util.clone(this);
  },
  getBBox: function getBBox() {}
});
module.exports = Element;

/***/ }),

/***/ "./node_modules/@antv/g/lib/core/event-emitter.js":
/*!********************************************************!*\
  !*** ./node_modules/@antv/g/lib/core/event-emitter.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(/*! ../util/common */ "./node_modules/@antv/g/lib/util/common.js");

var slice = Array.prototype.slice;

function indexOfCallback(events, callback) {
  var i = events.length;

  while (i--) {
    if (events[i].callback === callback) {
      return i;
    }
  }

  return -1;
}

var EventEmitter = function EventEmitter() {};

Util.augment(EventEmitter, {
  on: function on(evt, callback, one) {
    var self = this;

    if (!Util.isFunction(callback)) {
      throw new TypeError('listener should be a function');
    }

    if (!self._cfg._events) {
      self._cfg._events = {};
    }

    if (!self._cfg._events[evt]) {
      self._cfg._events[evt] = [];
    }

    self._cfg._events[evt].push({
      callback: callback,
      one: one
    });

    return this;
  },
  one: function one(evt, callback) {
    this.on(evt, callback, true);
    return this;
  },
  emit: function emit(evt) {
    if (this.get('destroyed')) {
      return;
    }

    if (!this._cfg._events || Util.isEmpty(this._cfg._events)) {
      return;
    }

    var events = this._cfg._events[evt];

    if (Util.isEmpty(events)) {
      return;
    }

    var args = arguments;
    var arg = slice.call(args, 1);
    var length = events.length;

    for (var i = 0; i < length;) {
      if (!events[i]) {
        continue;
      }

      events[i].callback.apply(this, arg);

      if (events[i] && events[i].one) {
        events.splice(i, 1);
        length--;
      } else {
        i++;
      }
    }
  },
  trigger: function trigger() {
    this.emit.apply(this, arguments);
  },
  off: function off(evt, callback) {
    var events = this._cfg._events;

    if (!events || Util.isEmpty(events)) {
      return;
    }

    if (arguments.length === 0) {
      this._cfg._events = {};
      return this;
    }

    if (events[evt]) {
      var index = indexOfCallback(events[evt], callback);

      if (index >= 0) {
        events[evt].splice(index, 1);
      }

      if (events[evt].length === 0) {
        delete events[evt];
      }
    }
  },
  removeEvent: function removeEvent(evt) {
    if (typeof evt === 'undefined') {
      this._cfg._events = {};
    } else {
      delete this._cfg._events[evt];
    }

    return this;
  },
  _getEvents: function _getEvents() {
    return this._cfg._events || {};
  }
});
module.exports = EventEmitter;

/***/ }),

/***/ "./node_modules/@antv/g/lib/core/group.js":
/*!************************************************!*\
  !*** ./node_modules/@antv/g/lib/core/group.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(/*! ../util/index */ "./node_modules/@antv/g/lib/util/index.js");

var Element = __webpack_require__(/*! ./element */ "./node_modules/@antv/g/lib/core/element.js");

var Shape = __webpack_require__(/*! ../shapes/index */ "./node_modules/@antv/g/lib/shapes/index.js");

var SHAPE_MAP = {}; // 缓存图形类型

var INDEX = '_INDEX';
var CLONE_CFGS = ['zIndex', 'capture', 'visible'];

function getComparer(compare) {
  return function (left, right) {
    var result = compare(left, right);
    return result === 0 ? left[INDEX] - right[INDEX] : result;
  };
}

function find(children, x, y) {
  var rst;

  for (var i = children.length - 1; i >= 0; i--) {
    var child = children[i];

    if (child._cfg.visible && child._cfg.capture) {
      if (child.isGroup) {
        rst = child.getShape(x, y);
      } else if (child.isHit(x, y)) {
        rst = child;
      }
    }

    if (rst) {
      break;
    }
  }

  return rst;
}

function _cloneArrayAttr(arr) {
  var result = [];

  for (var i = 0; i < arr.length; i++) {
    result.push(arr[i]);
  }

  return result;
}

var Group = function Group(cfg) {
  Group.superclass.constructor.call(this, cfg);
  this.set('children', []);
  this.set('tobeRemoved', []);

  this._beforeRenderUI();

  this._renderUI();

  this._bindUI();
};

function initClassCfgs(c) {
  if (c._cfg || c === Group) {
    return;
  }

  var superCon = c.superclass.constructor;

  if (superCon && !superCon._cfg) {
    initClassCfgs(superCon);
  }

  c._cfg = {};
  Util.merge(c._cfg, superCon._cfg);
  Util.merge(c._cfg, c.CFG);
}

Util.extend(Group, Element);
Util.augment(Group, {
  isGroup: true,
  type: 'group',
  canFill: true,
  canStroke: true,
  getDefaultCfg: function getDefaultCfg() {
    initClassCfgs(this.constructor);
    return Util.merge({}, this.constructor._cfg);
  },
  _beforeRenderUI: function _beforeRenderUI() {},
  _renderUI: function _renderUI() {},
  _bindUI: function _bindUI() {},
  addShape: function addShape(type, cfg) {
    var canvas = this.get('canvas');
    cfg = cfg || {};
    var shapeType = SHAPE_MAP[type];

    if (!shapeType) {
      shapeType = Util.upperFirst(type);
      SHAPE_MAP[type] = shapeType;
    }

    if (cfg.attrs && canvas) {
      var attrs = cfg.attrs;

      if (type === 'text') {
        // 临时解决
        var topFontFamily = canvas.get('fontFamily');

        if (topFontFamily) {
          attrs.fontFamily = attrs.fontFamily ? attrs.fontFamily : topFontFamily;
        }
      }
    }

    cfg.canvas = canvas;
    cfg.type = type;
    var rst = new Shape[shapeType](cfg);
    this.add(rst);
    return rst;
  },

  /** 添加图组
   * @param  {Function|Object|undefined} param 图组类
   * @param  {Object} cfg 配置项
   * @return {Object} rst 图组
   */
  addGroup: function addGroup(param, cfg) {
    var canvas = this.get('canvas');
    var rst;
    cfg = Util.merge({}, cfg);

    if (Util.isFunction(param)) {
      if (cfg) {
        cfg.canvas = canvas;
        cfg.parent = this;
        rst = new param(cfg);
      } else {
        rst = new param({
          canvas: canvas,
          parent: this
        });
      }

      this.add(rst);
    } else if (Util.isObject(param)) {
      param.canvas = canvas;
      rst = new Group(param);
      this.add(rst);
    } else if (param === undefined) {
      rst = new Group();
      this.add(rst);
    } else {
      return false;
    }

    return rst;
  },

  /** 绘制背景
   * @param  {Array} padding 内边距
   * @param  {Attrs} attrs 图形属性
   * @param  {Shape} backShape 背景图形
   * @return {Object} 背景层对象
   */
  renderBack: function renderBack(padding, attrs) {
    var backShape = this.get('backShape');
    var innerBox = this.getBBox(); // const parent = this.get('parent'); // getParent

    Util.merge(attrs, {
      x: innerBox.minX - padding[3],
      y: innerBox.minY - padding[0],
      width: innerBox.width + padding[1] + padding[3],
      height: innerBox.height + padding[0] + padding[2]
    });

    if (backShape) {
      backShape.attr(attrs);
    } else {
      backShape = this.addShape('rect', {
        zIndex: -1,
        attrs: attrs
      });
    }

    this.set('backShape', backShape);
    this.sort();
    return backShape;
  },
  removeChild: function removeChild(item, destroy) {
    if (arguments.length >= 2) {
      if (this.contain(item)) {
        item.remove(destroy);
      }
    } else {
      if (arguments.length === 1) {
        if (Util.isBoolean(item)) {
          destroy = item;
        } else {
          if (this.contain(item)) {
            item.remove(true);
          }

          return this;
        }
      }

      if (arguments.length === 0) {
        destroy = true;
      }

      Group.superclass.remove.call(this, destroy);
    }

    return this;
  },

  /**
   * 向组中添加shape或者group
   * @param {Object} items 图形或者分组
   * @return {Object} group 本尊
   */
  add: function add(items) {
    var self = this;
    var children = self.get('children');

    if (Util.isArray(items)) {
      Util.each(items, function (item) {
        var parent = item.get('parent');

        if (parent) {
          parent.removeChild(item, false);
        }

        self._setCfgProperty(item);
      });
      self._cfg.children = children.concat(items);
    } else {
      var item = items;
      var parent = item.get('parent');

      if (parent) {
        parent.removeChild(item, false);
      }

      self._setCfgProperty(item);

      children.push(item);
    }

    return self;
  },
  _setCfgProperty: function _setCfgProperty(item) {
    var cfg = this._cfg;
    item.set('parent', this);
    item.set('canvas', cfg.canvas);

    if (cfg.timeline) {
      item.set('timeline', cfg.timeline);
    }
  },
  contain: function contain(item) {
    var children = this.get('children');
    return children.indexOf(item) > -1;
  },
  getChildByIndex: function getChildByIndex(index) {
    var children = this.get('children');
    return children[index];
  },
  getFirst: function getFirst() {
    return this.getChildByIndex(0);
  },
  getLast: function getLast() {
    var lastIndex = this.get('children').length - 1;
    return this.getChildByIndex(lastIndex);
  },
  getBBox: function getBBox() {
    var self = this;
    var minX = Infinity;
    var maxX = -Infinity;
    var minY = Infinity;
    var maxY = -Infinity;
    var children = self.get('children');

    if (children.length > 0) {
      Util.each(children, function (child) {
        if (child.get('visible')) {
          if (child.isGroup && child.get('children').length === 0) {
            return;
          }

          var _box = child.getBBox();

          if (!_box) {
            return true;
          }

          var leftTop = [_box.minX, _box.minY, 1];
          var leftBottom = [_box.minX, _box.maxY, 1];
          var rightTop = [_box.maxX, _box.minY, 1];
          var rightBottom = [_box.maxX, _box.maxY, 1];
          child.apply(leftTop);
          child.apply(leftBottom);
          child.apply(rightTop);
          child.apply(rightBottom);
          var boxMinX = Math.min(leftTop[0], leftBottom[0], rightTop[0], rightBottom[0]);
          var boxMaxX = Math.max(leftTop[0], leftBottom[0], rightTop[0], rightBottom[0]);
          var boxMinY = Math.min(leftTop[1], leftBottom[1], rightTop[1], rightBottom[1]);
          var boxMaxY = Math.max(leftTop[1], leftBottom[1], rightTop[1], rightBottom[1]);

          if (boxMinX < minX) {
            minX = boxMinX;
          }

          if (boxMaxX > maxX) {
            maxX = boxMaxX;
          }

          if (boxMinY < minY) {
            minY = boxMinY;
          }

          if (boxMaxY > maxY) {
            maxY = boxMaxY;
          }
        }
      });
    } else {
      minX = 0;
      maxX = 0;
      minY = 0;
      maxY = 0;
    }

    var box = {
      minX: minX,
      minY: minY,
      maxX: maxX,
      maxY: maxY
    };
    box.x = box.minX;
    box.y = box.minY;
    box.width = box.maxX - box.minX;
    box.height = box.maxY - box.minY;
    return box;
  },
  getCount: function getCount() {
    return this.get('children').length;
  },
  sort: function sort() {
    var children = this.get('children'); // 稳定排序

    Util.each(children, function (child, index) {
      child[INDEX] = index;
      return child;
    });
    children.sort(getComparer(function (obj1, obj2) {
      return obj1.get('zIndex') - obj2.get('zIndex');
    }));
    return this;
  },
  findById: function findById(id) {
    return this.find(function (item) {
      return item.get('id') === id;
    });
  },

  /**
   * 根据查找函数查找分组或者图形
   * @param  {Function} fn 匹配函数
   * @return {Canvas.Base} 分组或者图形
   */
  find: function find(fn) {
    if (Util.isString(fn)) {
      return this.findById(fn);
    }

    var children = this.get('children');
    var rst = null;
    Util.each(children, function (item) {
      if (fn(item)) {
        rst = item;
      } else if (item.find) {
        rst = item.find(fn);
      }

      if (rst) {
        return false;
      }
    });
    return rst;
  },

  /**
   * @param  {Function} fn filter mathod
   * @return {Array} all the matching shapes and groups
   */
  findAll: function findAll(fn) {
    var children = this.get('children');
    var rst = [];
    var childRst = [];
    Util.each(children, function (item) {
      if (fn(item)) {
        rst.push(item);
      }

      if (item.findAllBy) {
        childRst = item.findAllBy(fn);
        rst = rst.concat(childRst);
      }
    });
    return rst;
  },

  /**
   * @Deprecated
   * @param  {Function} fn filter method
   * @return {Object} found shape or group
   */
  findBy: function findBy(fn) {
    var children = this.get('children');
    var rst = null;
    Util.each(children, function (item) {
      if (fn(item)) {
        rst = item;
      } else if (item.findBy) {
        rst = item.findBy(fn);
      }

      if (rst) {
        return false;
      }
    });
    return rst;
  },

  /**
   * @Deprecated
   * @param  {Function} fn filter mathod
   * @return {Array} all the matching shapes and groups
   */
  findAllBy: function findAllBy(fn) {
    var children = this.get('children');
    var rst = [];
    var childRst = [];
    Util.each(children, function (item) {
      if (fn(item)) {
        rst.push(item);
      }

      if (item.findAllBy) {
        childRst = item.findAllBy(fn);
        rst = rst.concat(childRst);
      }
    });
    return rst;
  },
  getShape: function getShape(x, y) {
    var self = this;
    var clip = self._attrs.clip;
    var children = self._cfg.children;
    var rst;

    if (clip) {
      var v = [x, y, 1];
      clip.invert(v, self.get('canvas')); // 已经在外面转换

      if (clip.isPointInPath(v[0], v[1])) {
        rst = find(children, x, y);
      }
    } else {
      rst = find(children, x, y);
    }

    return rst;
  },
  clearTotalMatrix: function clearTotalMatrix() {
    var m = this.get('totalMatrix');

    if (m) {
      this.setSilent('totalMatrix', null);
      var children = this._cfg.children;

      for (var i = 0; i < children.length; i++) {
        var child = children[i];
        child.clearTotalMatrix();
      }
    }
  },
  clear: function clear(delayRemove) {
    if (this.get('destroyed')) {
      return;
    }

    var children = this._cfg.children;

    for (var i = children.length - 1; i >= 0; i--) {
      children[i].remove(true, delayRemove);
    }

    this._cfg.children = [];
    return this;
  },
  destroy: function destroy() {
    if (this.get('destroyed')) {
      return;
    }

    this.clear();
    Group.superclass.destroy.call(this);
  },
  clone: function clone() {
    var self = this;
    var children = self._cfg.children;
    var _attrs = self._attrs;
    var attrs = {};
    Util.each(_attrs, function (i, k) {
      if (k === 'matrix') {
        attrs[k] = _cloneArrayAttr(_attrs[k]);
      } else {
        attrs[k] = _attrs[k];
      }
    });
    var clone = new Group({
      attrs: attrs,
      canvas: self.get('canvas')
    });
    Util.each(children, function (child) {
      clone.add(child.clone());
    }); // 对于一些在 cfg 中的特殊属性做 clone

    Util.each(CLONE_CFGS, function (cfg) {
      clone._cfg[cfg] = self._cfg[cfg];
    });
    return clone;
  }
});
module.exports = Group;

/***/ }),

/***/ "./node_modules/@antv/g/lib/core/mixin/animation.js":
/*!**********************************************************!*\
  !*** ./node_modules/@antv/g/lib/core/mixin/animation.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var Util = __webpack_require__(/*! ../../util/index */ "./node_modules/@antv/g/lib/util/index.js");

var ReservedProps = {
  delay: 'delay',
  repeat: 'repeat',
  rotate: 'rotate'
};
var colorRalaredProps = {
  fill: 'fill',
  stroke: 'stroke',
  fillStyle: 'fillStyle',
  strokeStyle: 'strokeStyle'
};

function getFromAttrs(toAttrs, shape) {
  var rst = {};
  var attrs = shape._attrs;

  for (var k in toAttrs.attrs) {
    rst[k] = attrs[k];
  }

  return rst;
}

function getFormatProps(props, shape) {
  var rst = {
    matrix: null,
    attrs: {}
  };
  var attrs = shape._attrs;

  for (var k in props) {
    if (k === 'transform') {
      rst.matrix = Util.transform(shape.getMatrix(), props[k]);
    } else if (k === 'matrix') {
      rst.matrix = props[k];
    } else if (colorRalaredProps[k] && /^[r,R,L,l]{1}[\s]*\(/.test(props[k])) {
      // 渐变色不支持动画
      continue;
    } else if (!ReservedProps[k] && attrs[k] !== props[k]) {
      if (k === 'rotate') {
        shape._attrs.rotate = shape._attrs.rotate || 0;
      }

      rst.attrs[k] = props[k];
    }
  }

  return rst;
}

function checkExistedAttrs(animators, animator) {
  if (animator.onFrame) {
    return animators;
  }

  var delay = animator.delay;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  Util.each(animator.toAttrs, function (v, k) {
    Util.each(animators, function (animator) {
      if (delay < animator.startTime + animator.duration) {
        if (hasOwnProperty.call(animator.toAttrs, k)) {
          delete animator.toAttrs[k];
          delete animator.fromAttrs[k];
        }
      }
    });
  });

  if (animator.toMatrix) {
    Util.each(animators, function (animator) {
      if (delay < animator.startTime + animator.duration && animator.toMatrix) {
        delete animator.toMatrix;
      }
    });
  }

  return animators;
}

module.exports = {
  /**
   * 执行动画
   * @param  {Object}   toProps  动画最终状态
   * @param  {Number}   duration 动画执行时间
   * @param  {String}   easing   动画缓动效果
   * @param  {Function} callback 动画执行后的回调
   * @param  {Number}   delay    动画延迟时间
   */
  animate: function animate(toProps, duration, easing, callback, delay) {
    if (delay === void 0) {
      delay = 0;
    }

    var self = this;
    self.set('animating', true);
    var timeline = self.get('timeline');

    if (!timeline) {
      timeline = self.get('canvas').get('timeline');
      self.setSilent('timeline', timeline);
    }

    var animators = self.get('animators') || []; // 初始化tick

    if (!timeline._timer) {
      timeline.initTimer();
    }

    if (Util.isNumber(callback)) {
      delay = callback;
      callback = null;
    }

    if (Util.isFunction(easing)) {
      callback = easing;
      easing = 'easeLinear';
    } else {
      easing = easing ? easing : 'easeLinear';
    }

    var animator = {
      repeat: toProps.repeat,
      duration: duration,
      easing: easing,
      callback: callback,
      delay: delay,
      startTime: timeline.getTime(),
      id: Util.uniqueId()
    };

    if (toProps.onFrame) {
      animator.onFrame = toProps.onFrame;
    } else {
      var formatProps = getFormatProps(toProps, self);
      animator = _extends({
        fromAttrs: getFromAttrs(formatProps, self),
        toAttrs: formatProps.attrs,
        fromMatrix: Util.clone(self.getMatrix()),
        toMatrix: formatProps.matrix
      }, animator);
    } // 如果动画队列中已经有这个图形了


    if (animators.length > 0) {
      // 先检查是否需要合并属性。若有相同的动画，将该属性从前一个动画中删除,直接用后一个动画中
      animators = checkExistedAttrs(animators, animator);
    } else {
      // 否则将图形添加到队列
      timeline.addAnimator(self);
    }

    animators.push(animator);
    self.setSilent('animators', animators);
    self.setSilent('pause', {
      isPaused: false
    });
  },
  stopAnimate: function stopAnimate() {
    var _this = this;

    var animators = this.get('animators'); // 将动画执行到最后一帧，执行回调

    Util.each(animators, function (animator) {
      _this.attr(animator.toAttrs || animator.onFrame(1));

      if (animator.toMatrix) {
        _this.attr('matrix', animator.toMatrix);
      }

      if (animator.callback) {
        animator.callback();
      }
    });
    this.setSilent('animating', false);
    this.setSilent('animators', []);
  },
  pauseAnimate: function pauseAnimate() {
    var self = this;
    var timeline = self.get('timeline'); // 记录下是在什么时候暂停的

    self.setSilent('pause', {
      isPaused: true,
      pauseTime: timeline.getTime()
    });
    return self;
  },
  resumeAnimate: function resumeAnimate() {
    var self = this;
    var timeline = self.get('timeline');
    var current = timeline.getTime();
    var animators = self.get('animators');
    var pauseTime = self.get('pause').pauseTime; // 之后更新属性需要计算动画已经执行的时长，如果暂停了，就把初始时间调后

    Util.each(animators, function (animator) {
      animator.startTime = animator.startTime + (current - pauseTime);
      animator._paused = false;
      animator._pauseTime = null;
    });
    self.setSilent('pause', {
      isPaused: false
    });
    self.setSilent('animators', animators);
    return self;
  }
};

/***/ }),

/***/ "./node_modules/@antv/g/lib/core/mixin/attribute.js":
/*!**********************************************************!*\
  !*** ./node_modules/@antv/g/lib/core/mixin/attribute.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(/*! ../../util/index */ "./node_modules/@antv/g/lib/util/index.js");

module.exports = {
  canFill: false,
  canStroke: false,
  initAttrs: function initAttrs(attrs) {
    this._attrs = {
      opacity: 1,
      fillOpacity: 1,
      strokeOpacity: 1,
      matrix: [1, 0, 0, 0, 1, 0, 0, 0, 1]
    };
    this.attr(Util.assign(this.getDefaultAttrs(), attrs));
    return this;
  },
  getDefaultAttrs: function getDefaultAttrs() {
    return {};
  },

  /**
   * 设置或者设置属性，有以下 4 种情形：
   *   - name 不存在, 则返回属性集合
   *   - name 为字符串，value 为空，获取属性值
   *   - name 为字符串，value 不为空，设置属性值，返回 this
   *   - name 为键值对，value 为空，设置属性值
   *
   * @param  {String | Object} name  属性名
   * @param  {*} value 属性值
   * @return {*} 属性值
   */
  attr: function attr(name, value) {
    var self = this;

    if (arguments.length === 0) {
      return self._attrs;
    }

    if (Util.isObject(name)) {
      // self._attrs = Util.deepMix(self._attrs, name);
      for (var k in name) {
        this._setAttr(k, name[k]);
      }

      self.clearBBox();
      this._cfg.hasUpdate = true;
      return self;
    }

    if (arguments.length === 2) {
      this._setAttr(name, value);

      self.clearBBox();
      this._cfg.hasUpdate = true;
      return self;
    }

    return self._attrs[name];
  },
  _setAttr: function _setAttr(name, value) {
    var self = this;
    var attrs = this._attrs;
    attrs[name] = value;

    if (name === 'fill' || name === 'stroke') {
      attrs[name + 'Style'] = value;
      return;
    }

    if (name === 'opacity') {
      attrs.globalAlpha = value;
      return;
    }

    if (name === 'clip' && value) {
      self._setClip(value);

      return;
    }

    if (name === 'path' && self._afterSetAttrPath) {
      self._afterSetAttrPath(value);

      return;
    }

    if (name === 'transform') {
      self.transform(value);
      return;
    }

    if (name === 'rotate') {
      self.rotateAtStart(value);
    }
  },
  clearBBox: function clearBBox() {
    this.setSilent('box', null);
  },
  hasFill: function hasFill() {
    return this.canFill && this._attrs.fillStyle;
  },
  hasStroke: function hasStroke() {
    return this.canStroke && this._attrs.strokeStyle;
  },
  _setClip: function _setClip(item) {
    item._cfg.renderer = this._cfg.renderer;
    item._cfg.canvas = this._cfg.canvas;
    item._cfg.parent = this._cfg.parent;

    item.hasFill = function () {
      return true;
    };
  }
};

/***/ }),

/***/ "./node_modules/@antv/g/lib/core/mixin/event.js":
/*!******************************************************!*\
  !*** ./node_modules/@antv/g/lib/core/mixin/event.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(/*! ../../util/index */ "./node_modules/@antv/g/lib/util/index.js");

var Event = __webpack_require__(/*! ../../event */ "./node_modules/@antv/g/lib/event.js");

var EVENTS = ['mousedown', 'mouseup', 'dblclick', 'mouseenter', 'mouseout', 'mouseover', 'mousemove', 'mouseleave'];
var CLICK_OFFSET = 40;
var LEFT_BTN_CODE = 0;
var preShape = null;
var mousedownShape = null;
var mousedownOffset = {};
var dragging = null;
var dragTimer = null;
module.exports = {
  registerEvent: function registerEvent() {
    var self = this;
    var el = this.get('el');
    Util.each(EVENTS, function (evt) {
      el.addEventListener(evt, function (e) {
        self._triggerEvent(evt, e);
      }, false);
    }); // special cases

    el.addEventListener('touchstart', function (e) {
      if (!Util.isEmpty(e.touches)) {
        self._triggerEvent('touchstart', e.touches[0]);
      }
    }, false);
    el.addEventListener('touchmove', function (e) {
      if (!Util.isEmpty(e.touches)) {
        self._triggerEvent('touchmove', e.touches[0]);
      }
    }, false);
    el.addEventListener('touchend', function (e) {
      if (!Util.isEmpty(e.changedTouches)) {
        self._triggerEvent('touchend', e.changedTouches[0]);
      }
    }, false);
    el.addEventListener('contextmenu', function (e) {
      self._triggerEvent('contextmenu', e);

      e.preventDefault();
    }, false);
  },
  _getEmitter: function _getEmitter(element, event) {
    if (element) {
      if (Util.isEmpty(element._getEvents())) {
        var parent = element.get('parent');

        if (parent && !event.propagationStopped) {
          return this._getEmitter(parent, event);
        }
      } else {
        return element;
      }
    }
  },
  _getEventObj: function _getEventObj(type, e, point, target) {
    var event = new Event(type, e, true, true); // 事件的x,y应该是基于画布左上角的，与canvas的matrix无关

    event.x = point.x;
    event.y = point.y;
    event.clientX = e.clientX;
    event.clientY = e.clientY;
    event.currentTarget = target;
    event.target = target;
    return event;
  },
  _triggerEvent: function _triggerEvent(type, e) {
    var self = this;
    var point = self.getPointByClient(e.clientX, e.clientY);
    var shape = self.getShape(point.x, point.y, e);
    var el = self.get('el'); // svg原生事件取不到dragover, dragout, drop等事件的对象。这边需要走数学拾取。

    if (dragging && self.getRenderer() === 'svg') {
      shape = self.getShape(point.x, point.y);
    }

    if (type === 'mousemove') {
      if (preShape && preShape !== shape) {
        self._emitEvent('mouseout', e, point, preShape);

        self._emitEvent('mouseleave', e, point, preShape);

        if (dragging) {
          self._emitEvent('dragleave', e, point, preShape);
        } // 当 mouseleave 触发时，如果拾取到其他 shape 的 mouseenter ，鼠标样式会正常
        // 当鼠标移出 shape 但是移动到画布上时，没有shape，就不恢复样式。这里判断一下，直接重置


        if (!shape || shape.destroyed) {
          el.style.cursor = 'default';
        }
      }

      if (dragging) {
        self._emitEvent('drag', e, point, dragging);
        /**
         * H5原生事件中drag同时不会触发mousemove
         * 但是在上层具有嵌套关系的item事件计算中需要用到drag时的mousemove
         * 才能计算dragenter etc.
         */


        self._emitEvent('mousemove', e, point, shape);
      }

      if (shape) {
        if (!dragging) {
          if (mousedownShape === shape) {
            dragging = shape;
            mousedownShape = null;

            this._emitEvent('dragstart', e, point, shape);
          } else {
            self._emitEvent('mousemove', e, point, shape);
          }
        }

        if (preShape !== shape) {
          self._emitEvent('mouseenter', e, point, shape);

          self._emitEvent('mouseover', e, point, shape);

          if (dragging) {
            self._emitEvent('dragenter', e, point, shape);
          }
        }
      } else {
        var canvasmousemove = self._getEventObj('mousemove', e, point, self);

        self.emit('mousemove', canvasmousemove);
      }

      preShape = shape;
    } else {
      this._emitEvent(type, e, point, shape || this); // e.button === 0 保证按下左键，防止点击右键触发click


      if (!dragging && type === 'mousedown' && e.button === LEFT_BTN_CODE) {
        mousedownShape = shape;
        mousedownOffset = {
          x: e.clientX,
          y: e.clientY
        };
      }

      if (type === 'mouseup' && e.button === LEFT_BTN_CODE) {
        var dx = mousedownOffset.x - e.clientX;
        var dy = mousedownOffset.y - e.clientY;
        var dist = dx * dx + dy * dy;

        if (dist < CLICK_OFFSET) {
          clearTimeout(dragTimer);
          dragTimer = null;

          this._emitEvent('click', e, point, mousedownShape || this);
        }

        if (dragging) {
          dragging._cfg.capture = true;

          this._emitEvent('dragend', e, point, dragging);

          dragging = null;

          this._emitEvent('drop', e, point, shape || this);
        }

        mousedownShape = null;
      }
    }

    if (shape && !shape.get('destroyed')) {
      el.style.cursor = shape.attr('cursor') || 'default';
    }
  },
  _emitEvent: function _emitEvent(type, evt, point, shape) {
    var event = this._getEventObj(type, evt, point, shape);

    var emitShape = this._getEmitter(shape, evt);

    emitShape && !emitShape.get('destroyed') && emitShape.emit(type, event);
    return emitShape;
  }
};

/***/ }),

/***/ "./node_modules/@antv/g/lib/core/mixin/isPointInPath.js":
/*!**************************************************************!*\
  !*** ./node_modules/@antv/g/lib/core/mixin/isPointInPath.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(/*! ../../util/index */ "./node_modules/@antv/g/lib/util/index.js");

var Inside = __webpack_require__(/*! ../../shapes/util/inside */ "./node_modules/@antv/g/lib/shapes/util/inside.js");

var mathUtl = {
  arc: __webpack_require__(/*! ../../shapes/math/arc */ "./node_modules/@antv/g/lib/shapes/math/arc.js"),
  ellipse: __webpack_require__(/*! ../../shapes/math/ellipse */ "./node_modules/@antv/g/lib/shapes/math/ellipse.js"),
  line: __webpack_require__(/*! ../../shapes/math/line */ "./node_modules/@antv/g/lib/shapes/math/line.js")
};
var canvas = Util.createDom('<canvas width="1" height="1"></canvas>');
var context = canvas.getContext('2d');

function isPointInPathByContext(x, y, ctx) {
  ctx.createPath(context);
  return context.isPointInPath(x, y);
}

var arc = function arc(x, y) {
  var attrs = this._attrs;
  var cx = attrs.x;
  var cy = attrs.y;
  var r = attrs.r,
      startAngle = attrs.startAngle,
      endAngle = attrs.endAngle,
      clockwise = attrs.clockwise;
  var lineWidth = this.getHitLineWidth();

  if (this.hasStroke()) {
    return Inside.arcline(cx, cy, r, startAngle, endAngle, clockwise, lineWidth, x, y);
  }

  return false;
};

var circle = function circle(x, y) {
  var attrs = this._attrs;
  var cx = attrs.x;
  var cy = attrs.y;
  var r = attrs.r;
  var lineWidth = this.getHitLineWidth();
  var fill = this.hasFill();
  var stroke = this.hasStroke();

  if (fill && stroke) {
    return Inside.circle(cx, cy, r, x, y) || Inside.arcline(cx, cy, r, 0, Math.PI * 2, false, lineWidth, x, y);
  }

  if (fill) {
    return Inside.circle(cx, cy, r, x, y);
  }

  if (stroke) {
    return Inside.arcline(cx, cy, r, 0, Math.PI * 2, false, lineWidth, x, y);
  }

  return false;
};

var ellipse = function ellipse(x, y) {
  var attrs = this._attrs;
  var fill = this.hasFill();
  var stroke = this.hasStroke();
  var cx = attrs.x;
  var cy = attrs.y;
  var rx = attrs.rx;
  var ry = attrs.ry;
  var lineWidth = this.getHitLineWidth();
  var r = rx > ry ? rx : ry;
  var scaleX = rx > ry ? 1 : rx / ry;
  var scaleY = rx > ry ? ry / rx : 1;
  var p = [x, y, 1];
  var m = [1, 0, 0, 0, 1, 0, 0, 0, 1];
  Util.mat3.scale(m, m, [scaleX, scaleY]);
  Util.mat3.translate(m, m, [cx, cy]);
  var inm = Util.mat3.invert([], m);
  Util.vec3.transformMat3(p, p, inm);

  if (fill && stroke) {
    return Inside.circle(0, 0, r, p[0], p[1]) || Inside.arcline(0, 0, r, 0, Math.PI * 2, false, lineWidth, p[0], p[1]);
  }

  if (fill) {
    return Inside.circle(0, 0, r, p[0], p[1]);
  }

  if (stroke) {
    return Inside.arcline(0, 0, r, 0, Math.PI * 2, false, lineWidth, p[0], p[1]);
  }

  return false;
};

var fan = function fan(x, y) {
  var self = this;
  var fill = self.hasFill();
  var stroke = self.hasStroke();
  var attrs = self._attrs;
  var cx = attrs.x;
  var cy = attrs.y;
  var rs = attrs.rs;
  var re = attrs.re;
  var startAngle = attrs.startAngle;
  var endAngle = attrs.endAngle;
  var clockwise = attrs.clockwise;
  var v1 = [1, 0];
  var subv = [x - cx, y - cy];
  var angle = Util.vec2.angleTo(v1, subv);

  function _isPointInFill() {
    var angle1 = mathUtl.arc.nearAngle(angle, startAngle, endAngle, clockwise);

    if (Util.isNumberEqual(angle, angle1)) {
      var ls = Util.vec2.squaredLength(subv);

      if (rs * rs <= ls && ls <= re * re) {
        return true;
      }
    }

    return false;
  }

  function _isPointInStroke() {
    var lineWidth = self.getHitLineWidth();
    var ssp = {
      x: Math.cos(startAngle) * rs + cx,
      y: Math.sin(startAngle) * rs + cy
    };
    var sep = {
      x: Math.cos(startAngle) * re + cx,
      y: Math.sin(startAngle) * re + cy
    };
    var esp = {
      x: Math.cos(endAngle) * rs + cx,
      y: Math.sin(endAngle) * rs + cy
    };
    var eep = {
      x: Math.cos(endAngle) * re + cx,
      y: Math.sin(endAngle) * re + cy
    };

    if (Inside.line(ssp.x, ssp.y, sep.x, sep.y, lineWidth, x, y)) {
      return true;
    }

    if (Inside.line(esp.x, esp.y, eep.x, eep.y, lineWidth, x, y)) {
      return true;
    }

    if (Inside.arcline(cx, cy, rs, startAngle, endAngle, clockwise, lineWidth, x, y)) {
      return true;
    }

    if (Inside.arcline(cx, cy, re, startAngle, endAngle, clockwise, lineWidth, x, y)) {
      return true;
    }

    return false;
  }

  if (fill && stroke) {
    return _isPointInFill() || _isPointInStroke();
  }

  if (fill) {
    return _isPointInFill();
  }

  if (stroke) {
    return _isPointInStroke();
  }

  return false;
};

var image = function image(x, y) {
  var attrs = this._attrs;

  if (this.get('toDraw') || !attrs.img) {
    return false;
  }

  if (!this._cfg.attrs || this._cfg.attrs.img !== attrs.img) {
    this._setAttrImg();
  }

  var rx = attrs.x;
  var ry = attrs.y;
  var width = attrs.width;
  var height = attrs.height;
  return Inside.rect(rx, ry, width, height, x, y);
};

var line = function line(x, y) {
  var attrs = this._attrs;
  var x1 = attrs.x1,
      y1 = attrs.y1,
      x2 = attrs.x2,
      y2 = attrs.y2;
  var lineWidth = this.getHitLineWidth();

  if (this.hasStroke()) {
    return Inside.line(x1, y1, x2, y2, lineWidth, x, y);
  }

  return false;
};

var path = function path(x, y) {
  var self = this;
  var segments = self.get('segments');
  var fill = self.hasFill();
  var stroke = self.hasStroke();

  function _isPointInStroke() {
    if (!Util.isEmpty(segments)) {
      var lineWidth = self.getHitLineWidth();

      for (var i = 0, l = segments.length; i < l; i++) {
        if (segments[i].isInside(x, y, lineWidth)) {
          return true;
        }
      }

      return false;
    }
  }

  if (fill && stroke) {
    return isPointInPathByContext(x, y, self) || _isPointInStroke();
  }

  if (fill) {
    return isPointInPathByContext(x, y, self);
  }

  if (stroke) {
    return _isPointInStroke();
  }

  return false;
};

var polygon = function polygon(x, y) {
  var self = this;
  var fill = self.hasFill();
  var stroke = self.hasStroke();

  function _isPointInStroke() {
    var attrs = self._attrs;
    var points = attrs.points;

    if (points.length < 2) {
      return false;
    }

    var lineWidth = self.getHitLineWidth();
    var outPoints = points.slice(0);

    if (points.length >= 3) {
      outPoints.push(points[0]);
    }

    return Inside.polyline(outPoints, lineWidth, x, y);
  }

  if (fill && stroke) {
    return isPointInPathByContext(x, y, self) || _isPointInStroke();
  }

  if (fill) {
    return isPointInPathByContext(x, y, self);
  }

  if (stroke) {
    return _isPointInStroke();
  }

  return false;
};

var marker = function marker(x, y) {
  var attrs = this._attrs;
  var cx = attrs.x;
  var cy = attrs.y;
  var r = attrs.radius || attrs.r;
  var lineWidth = this.getHitLineWidth();
  return Inside.circle(cx, cy, r + lineWidth / 2, x, y);
};

var polyline = function polyline(x, y) {
  var self = this;
  var attrs = self._attrs;

  if (self.hasStroke()) {
    var points = attrs.points;

    if (points.length < 2) {
      return false;
    }

    var lineWidth = attrs.lineWidth;
    return Inside.polyline(points, lineWidth, x, y);
  }

  return false;
};

var rect = function rect(x, y) {
  var self = this;
  var fill = self.hasFill();
  var stroke = self.hasStroke();

  function _isPointInStroke() {
    var attrs = self._attrs;
    var rx = attrs.x;
    var ry = attrs.y;
    var width = attrs.width;
    var height = attrs.height;
    var radius = attrs.radius;
    var lineWidth = self.getHitLineWidth();

    if (radius === 0) {
      var halfWidth = lineWidth / 2;
      return Inside.line(rx - halfWidth, ry, rx + width + halfWidth, ry, lineWidth, x, y) || Inside.line(rx + width, ry - halfWidth, rx + width, ry + height + halfWidth, lineWidth, x, y) || Inside.line(rx + width + halfWidth, ry + height, rx - halfWidth, ry + height, lineWidth, x, y) || Inside.line(rx, ry + height + halfWidth, rx, ry - halfWidth, lineWidth, x, y);
    }

    return Inside.line(rx + radius, ry, rx + width - radius, ry, lineWidth, x, y) || Inside.line(rx + width, ry + radius, rx + width, ry + height - radius, lineWidth, x, y) || Inside.line(rx + width - radius, ry + height, rx + radius, ry + height, lineWidth, x, y) || Inside.line(rx, ry + height - radius, rx, ry + radius, lineWidth, x, y) || Inside.arcline(rx + width - radius, ry + radius, radius, 1.5 * Math.PI, 2 * Math.PI, false, lineWidth, x, y) || Inside.arcline(rx + width - radius, ry + height - radius, radius, 0, 0.5 * Math.PI, false, lineWidth, x, y) || Inside.arcline(rx + radius, ry + height - radius, radius, 0.5 * Math.PI, Math.PI, false, lineWidth, x, y) || Inside.arcline(rx + radius, ry + radius, radius, Math.PI, 1.5 * Math.PI, false, lineWidth, x, y);
  }

  if (fill && stroke) {
    return isPointInPathByContext(x, y, self) || _isPointInStroke();
  }

  if (fill) {
    return isPointInPathByContext(x, y, self);
  }

  if (stroke) {
    return _isPointInStroke();
  }

  return false;
};

var text = function text(x, y) {
  var self = this;
  var box = self.getBBox();

  if (self.hasFill() || self.hasStroke()) {
    return Inside.box(box.minX, box.maxX, box.minY, box.maxY, x, y);
  }
};

var dom = function dom(x, y) {
  if (!this._cfg.el) {
    return false;
  }

  var box = this._cfg.el.getBBox();

  return Inside.box(box.x, box.x + box.width, box.y, box.y + box.height, x, y);
};

var shapes = {
  arc: arc,
  circle: circle,
  dom: dom,
  ellipse: ellipse,
  fan: fan,
  image: image,
  line: line,
  path: path,
  marker: marker,
  polygon: polygon,
  polyline: polyline,
  rect: rect,
  text: text
};
module.exports = {
  isPointInPath: function isPointInPath(x, y) {
    var shape = shapes[this.type];

    if (shape) {
      return shape.call(this, x, y);
    }

    return false;
  }
};

/***/ }),

/***/ "./node_modules/@antv/g/lib/core/mixin/timeline.js":
/*!*********************************************************!*\
  !*** ./node_modules/@antv/g/lib/core/mixin/timeline.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(/*! ../../util/index */ "./node_modules/@antv/g/lib/util/index.js");

var PathUtil = __webpack_require__(/*! ../../util/path */ "./node_modules/@antv/g/lib/util/path.js");

var d3Timer = __webpack_require__(/*! d3-timer */ "./node_modules/d3-timer/src/index.js");

var d3Ease = __webpack_require__(/*! d3-ease */ "./node_modules/d3-ease/src/index.js");

var _require = __webpack_require__(/*! d3-interpolate */ "./node_modules/d3-interpolate/index.js"),
    interpolate = _require.interpolate,
    interpolateArray = _require.interpolateArray; // 目前整体动画只需要数值和数组的差值计算


var Timeline = function Timeline(canvas) {
  // 待执行动画的队列
  this._animators = []; // 当前时间

  this._current = 0; // 计时器实例

  this._timer = null; // 画布

  this.canvas = canvas;
};

function _update(self, animator, ratio) {
  var cProps = {}; // 此刻属性

  var toAttrs = animator.toAttrs;
  var fromAttrs = animator.fromAttrs;
  var toMatrix = animator.toMatrix;

  if (self.get('destroyed')) {
    return;
  }

  var interf; //  差值函数

  for (var k in toAttrs) {
    if (!Util.isEqual(fromAttrs[k], toAttrs[k])) {
      if (k === 'path') {
        var toPath = toAttrs[k];
        var fromPath = fromAttrs[k];

        if (toPath.length > fromPath.length) {
          toPath = PathUtil.parsePathString(toAttrs[k]); // 终点状态

          fromPath = PathUtil.parsePathString(fromAttrs[k]); // 起始状态

          fromPath = PathUtil.fillPathByDiff(fromPath, toPath);
          fromPath = PathUtil.formatPath(fromPath, toPath);
          animator.fromAttrs.path = fromPath;
          animator.toAttrs.path = toPath;
        } else if (!animator.pathFormatted) {
          toPath = PathUtil.parsePathString(toAttrs[k]);
          fromPath = PathUtil.parsePathString(fromAttrs[k]);
          fromPath = PathUtil.formatPath(fromPath, toPath);
          animator.fromAttrs.path = fromPath;
          animator.toAttrs.path = toPath;
          animator.pathFormatted = true;
        }

        cProps[k] = [];

        for (var i = 0; i < toPath.length; i++) {
          var toPathPoint = toPath[i];
          var fromPathPoint = fromPath[i];
          var cPathPoint = [];

          for (var j = 0; j < toPathPoint.length; j++) {
            if (Util.isNumber(toPathPoint[j]) && fromPathPoint && Util.isNumber(fromPathPoint[j])) {
              interf = interpolate(fromPathPoint[j], toPathPoint[j]);
              cPathPoint.push(interf(ratio));
            } else {
              cPathPoint.push(toPathPoint[j]);
            }
          }

          cProps[k].push(cPathPoint);
        }
      } else {
        interf = interpolate(fromAttrs[k], toAttrs[k]);
        cProps[k] = interf(ratio);
      }
    }
  }

  if (toMatrix) {
    var mf = interpolateArray(animator.fromMatrix, toMatrix);
    var cM = mf(ratio);
    self.setMatrix(cM);
  }

  self.attr(cProps);
}

function update(shape, animator, elapsed) {
  var startTime = animator.startTime; // 如果还没有开始执行或暂停，先不更新

  if (elapsed < startTime + animator.delay || animator.isPaused) {
    return false;
  }

  var ratio;
  var duration = animator.duration;
  var easing = animator.easing; // 已执行时间

  elapsed = elapsed - startTime - animator.delay;

  if (animator.repeat) {
    ratio = elapsed % duration / duration;
    ratio = d3Ease[easing](ratio);
  } else {
    ratio = elapsed / duration;

    if (ratio < 1) {
      ratio = d3Ease[easing](ratio);
    } else {
      var attrs = animator.toAttrs || animator.onFrame(1);
      shape.attr(attrs);

      if (animator.toMatrix) {
        shape.setMatrix(animator.toMatrix);
      }

      return true;
    }
  }

  if (animator.onFrame) {
    var _attrs = animator.onFrame(ratio);

    shape.attr(_attrs);
  } else {
    _update(shape, animator, ratio);
  }

  return false;
}

Util.augment(Timeline, {
  initTimer: function initTimer() {
    var _this = this;

    var self = this;
    var isFinished = false;
    var shape, animators, animator;
    self._timer = d3Timer.timer(function (elapsed) {
      self._current = elapsed;

      if (_this._animators.length > 0) {
        for (var i = _this._animators.length - 1; i >= 0; i--) {
          shape = _this._animators[i];

          if (shape.get('destroyed')) {
            // 如果已经被销毁，直接移出队列
            self.removeAnimator(i);
            continue;
          }

          if (!shape.get('pause').isPaused) {
            animators = shape.get('animators');

            for (var j = animators.length - 1; j >= 0; j--) {
              animator = animators[j];
              isFinished = update(shape, animator, elapsed);

              if (isFinished) {
                animators.splice(j, 1);
                isFinished = false;

                if (animator.callback) {
                  animator.callback();
                }
              }
            }
          }

          if (animators.length === 0) {
            self.removeAnimator(i);
          }
        }

        _this.canvas.draw();
      }
    });
  },
  addAnimator: function addAnimator(shape) {
    this._animators.push(shape);
  },
  removeAnimator: function removeAnimator(index) {
    this._animators.splice(index, 1);
  },
  isAnimating: function isAnimating() {
    return !!this._animators.length;
  },
  stop: function stop() {
    if (this._timer) {
      this._timer.stop();
    }
  },
  stopAllAnimations: function stopAllAnimations() {
    this._animators.forEach(function (animator) {
      animator.stopAnimate();
    });

    this._animators = [];
    this.canvas.draw();
  },
  getTime: function getTime() {
    return this._current;
  }
});
module.exports = Timeline;

/***/ }),

/***/ "./node_modules/@antv/g/lib/core/mixin/transform.js":
/*!**********************************************************!*\
  !*** ./node_modules/@antv/g/lib/core/mixin/transform.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(/*! ../../util/index */ "./node_modules/@antv/g/lib/util/index.js"); // 是否未改变


function isUnchanged(m) {
  return m[0] === 1 && m[1] === 0 && m[3] === 0 && m[4] === 1 && m[6] === 0 && m[7] === 0;
} // 是否仅仅是scale


function isScale(m) {
  return m[1] === 0 && m[3] === 0 && m[6] === 0 && m[7] === 0;
}

function multiple(m1, m2) {
  if (!isUnchanged(m2)) {
    if (isScale(m2)) {
      m1[0] *= m2[0];
      m1[4] *= m2[4];
    } else {
      Util.mat3.multiply(m1, m1, m2);
    }
  }
}

module.exports = {
  initTransform: function initTransform() {},
  resetMatrix: function resetMatrix() {
    this.attr('matrix', [1, 0, 0, 0, 1, 0, 0, 0, 1]);
  },
  translate: function translate(tx, ty) {
    var matrix = this._attrs.matrix;
    Util.mat3.translate(matrix, matrix, [tx, ty]);
    this.clearTotalMatrix();
    this.attr('matrix', matrix);
    return this;
  },
  rotate: function rotate(radian) {
    var matrix = this._attrs.matrix;
    Util.mat3.rotate(matrix, matrix, radian);
    this.clearTotalMatrix();
    this.attr('matrix', matrix);
    return this;
  },
  scale: function scale(s1, s2) {
    var matrix = this._attrs.matrix;
    Util.mat3.scale(matrix, matrix, [s1, s2]);
    this.clearTotalMatrix();
    this.attr('matrix', matrix);
    return this;
  },
  rotateAtStart: function rotateAtStart(rotate) {
    var x = this._attrs.x || this._cfg.attrs.x;
    var y = this._attrs.y || this._cfg.attrs.y;

    if (Math.abs(rotate) > Math.PI * 2) {
      rotate = rotate / 180 * Math.PI;
    }

    return this.transform([['t', -x, -y], ['r', rotate], ['t', x, y]]);
  },
  move: function move(x, y) {
    var cx = this.get('x') || 0; // 当前的x

    var cy = this.get('y') || 0; // 当前的y

    this.translate(x - cx, y - cy);
    this.set('x', x);
    this.set('y', y);
    return this;
  },
  transform: function transform(ts) {
    var self = this;
    var matrix = this._attrs.matrix;
    Util.each(ts, function (t) {
      switch (t[0]) {
        case 't':
          self.translate(t[1], t[2]);
          break;

        case 's':
          self.scale(t[1], t[2]);
          break;

        case 'r':
          self.rotate(t[1]);
          break;

        case 'm':
          self.attr('matrix', Util.mat3.multiply([], matrix, t[1]));
          self.clearTotalMatrix();
          break;

        default:
          break;
      }
    });
    return self;
  },
  setTransform: function setTransform(ts) {
    this.attr('matrix', [1, 0, 0, 0, 1, 0, 0, 0, 1]);
    return this.transform(ts);
  },
  getMatrix: function getMatrix() {
    return this.attr('matrix');
  },
  setMatrix: function setMatrix(m) {
    this.attr('matrix', m);
    this.clearTotalMatrix();
    return this;
  },
  apply: function apply(v, root) {
    var m;

    if (root) {
      m = this._getMatrixByRoot(root);
    } else {
      m = this.attr('matrix');
    }

    Util.vec3.transformMat3(v, v, m);
    return this;
  },
  // 获取到达指定根节点的矩阵
  _getMatrixByRoot: function _getMatrixByRoot(root) {
    var self = this;
    root = root || self;
    var parent = self;
    var parents = [];

    while (parent !== root) {
      parents.unshift(parent);
      parent = parent.get('parent');
    }

    parents.unshift(parent);
    var m = [1, 0, 0, 0, 1, 0, 0, 0, 1];
    Util.each(parents, function (child) {
      Util.mat3.multiply(m, child.attr('matrix'), m);
    });
    return m;
  },

  /**
   * 应用到当前元素上的总的矩阵
   * @return {Matrix} 矩阵
   */
  getTotalMatrix: function getTotalMatrix() {
    var m = this._cfg.totalMatrix;

    if (!m) {
      m = [1, 0, 0, 0, 1, 0, 0, 0, 1];
      var parent = this._cfg.parent;

      if (parent) {
        var pm = parent.getTotalMatrix();
        multiple(m, pm);
      }

      multiple(m, this.attr('matrix'));
      this._cfg.totalMatrix = m;
    }

    return m;
  },
  // 清除当前的矩阵
  clearTotalMatrix: function clearTotalMatrix() {// this._cfg.totalMatrix = null;
  },
  invert: function invert(v) {
    var m = this.getTotalMatrix(); // 单精屏幕下大多数矩阵没变化

    if (isScale(m)) {
      v[0] /= m[0];
      v[1] /= m[4];
    } else {
      var inm = Util.mat3.invert([], m);

      if (inm) {
        Util.vec3.transformMat3(v, v, inm);
      }
    }

    return this;
  },
  resetTransform: function resetTransform(context) {
    var mo = this.attr('matrix'); // 不改变时

    if (!isUnchanged(mo)) {
      context.transform(mo[0], mo[1], mo[3], mo[4], mo[6], mo[7]);
    }
  }
};

/***/ }),

/***/ "./node_modules/@antv/g/lib/core/shape.js":
/*!************************************************!*\
  !*** ./node_modules/@antv/g/lib/core/shape.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(/*! ../util/index */ "./node_modules/@antv/g/lib/util/index.js");

var isPointInPath = __webpack_require__(/*! ./mixin/isPointInPath */ "./node_modules/@antv/g/lib/core/mixin/isPointInPath.js");

var Element = __webpack_require__(/*! ./element */ "./node_modules/@antv/g/lib/core/element.js");

var Inside = __webpack_require__(/*! ../shapes/util/inside */ "./node_modules/@antv/g/lib/shapes/util/inside.js");

var CLONE_CFGS = ['zIndex', 'capture', 'visible'];

var Shape = function Shape(cfg) {
  Shape.superclass.constructor.call(this, cfg);
};

Shape.ATTRS = {};
Util.extend(Shape, Element);
var ARRAY_ATTRS = {
  matrix: 'matrix',
  path: 'path',
  points: 'points',
  lineDash: 'lineDash'
};

function _cloneArrayAttr(arr) {
  var result = [];

  for (var i = 0; i < arr.length; i++) {
    if (Util.isArray(arr[i])) {
      result.push([].concat(arr[i]));
    } else {
      result.push(arr[i]);
    }
  }

  return result;
}

Util.augment(Shape, isPointInPath, {
  isShape: true,
  drawInner: function drawInner(context) {
    var self = this;
    var attrs = self._attrs;
    self.createPath(context);
    var originOpacity = context.globalAlpha;

    if (self.hasFill()) {
      var fillOpacity = attrs.fillOpacity;

      if (!Util.isNil(fillOpacity) && fillOpacity !== 1) {
        context.globalAlpha = fillOpacity;
        context.fill();
        context.globalAlpha = originOpacity;
      } else {
        context.fill();
      }
    }

    if (self.hasStroke()) {
      var lineWidth = self._attrs.lineWidth;

      if (lineWidth > 0) {
        var strokeOpacity = attrs.strokeOpacity;

        if (!Util.isNil(strokeOpacity) && strokeOpacity !== 1) {
          context.globalAlpha = strokeOpacity;
        }

        context.stroke();
      }
    }

    self.afterPath(context);
  },
  afterPath: function afterPath() {},

  /**
   * 击中图形时是否进行包围盒判断
   * @return {Boolean} [description]
   */
  isHitBox: function isHitBox() {
    return true;
  },

  /**
   * 节点是否能够被击中
   * @param {Number} x x坐标
   * @param {Number} y y坐标
   * @return {Boolean} 是否在图形中
   */
  isHit: function isHit(x, y) {
    var self = this;
    var v = [x, y, 1];
    self.invert(v); // canvas

    if (self.isHitBox()) {
      var box = self.getBBox();

      if (box && !Inside.box(box.minX, box.maxX, box.minY, box.maxY, v[0], v[1])) {
        return false;
      }
    }

    var clip = self._attrs.clip;

    if (clip) {
      clip.invert(v, self.get('canvas'));

      if (clip.isPointInPath(v[0], v[1])) {
        return self.isPointInPath(v[0], v[1]);
      }
    } else {
      return self.isPointInPath(v[0], v[1]);
    }

    return false;
  },

  /**
   * @protected
   * 计算包围盒
   * @return {Object} 包围盒
   */
  calculateBox: function calculateBox() {
    return null;
  },
  // 获取拾取时线的宽度，需要考虑附加的线的宽度
  getHitLineWidth: function getHitLineWidth() {
    var attrs = this._attrs; // if (!attrs.stroke) {
    //   return 0;
    // }

    var lineAppendWidth = attrs.lineAppendWidth || 0;
    var lineWidth = attrs.lineWidth || 0;
    return lineWidth + lineAppendWidth;
  },
  // 清除当前的矩阵
  clearTotalMatrix: function clearTotalMatrix() {
    this._cfg.totalMatrix = null;
    this._cfg.region = null;
  },
  clearBBox: function clearBBox() {
    this._cfg.box = null;
    this._cfg.region = null;
  },
  getBBox: function getBBox() {
    var box = this._cfg.box; // 延迟计算

    if (!box) {
      box = this.calculateBox();

      if (box) {
        box.x = box.minX;
        box.y = box.minY;
        box.width = box.maxX - box.minX;
        box.height = box.maxY - box.minY;
      }

      this._cfg.box = box;
    }

    return box;
  },
  clone: function clone() {
    var self = this;
    var clone = null;
    var _attrs = self._attrs;
    var attrs = {};
    Util.each(_attrs, function (i, k) {
      if (ARRAY_ATTRS[k] && Util.isArray(_attrs[k])) {
        attrs[k] = _cloneArrayAttr(_attrs[k]);
      } else {
        attrs[k] = _attrs[k];
      }
    });
    clone = new self.constructor({
      attrs: attrs
    }); // 对于一些在 cfg 中的特殊属性做 clone

    Util.each(CLONE_CFGS, function (cfg) {
      clone._cfg[cfg] = self._cfg[cfg];
    });
    return clone;
  }
});
module.exports = Shape;

/***/ }),

/***/ "./node_modules/@antv/g/lib/event.js":
/*!*******************************************!*\
  !*** ./node_modules/@antv/g/lib/event.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(/*! ./util/index */ "./node_modules/@antv/g/lib/util/index.js");

var Event = function Event(type, event, bubbles, cancelable) {
  this.type = type; // 事件类型

  this.target = null; // 目标

  this.currentTarget = null; // 当前目标

  this.bubbles = bubbles; // 冒泡

  this.cancelable = cancelable; // 是否能够阻止

  this.timeStamp = new Date().getTime(); // 时间戳

  this.defaultPrevented = false; // 阻止默认

  this.propagationStopped = false; // 阻止冒泡

  this.removed = false; // 是否被移除

  this.event = event; // 触发的原生事件
};

Util.augment(Event, {
  preventDefault: function preventDefault() {
    this.defaultPrevented = this.cancelable && true;
  },
  stopPropagation: function stopPropagation() {
    this.propagationStopped = true;
  },
  remove: function remove() {
    this.remove = true;
  },
  clone: function clone() {
    return Util.clone(this);
  },
  toString: function toString() {
    return '[Event (type=' + this.type + ')]';
  }
});
module.exports = Event;

/***/ }),

/***/ "./node_modules/@antv/g/lib/index.js":
/*!*******************************************!*\
  !*** ./node_modules/@antv/g/lib/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  Canvas: __webpack_require__(/*! ./canvas */ "./node_modules/@antv/g/lib/canvas.js"),
  Group: __webpack_require__(/*! ./core/group */ "./node_modules/@antv/g/lib/core/group.js"),
  Shape: __webpack_require__(/*! ./core/shape */ "./node_modules/@antv/g/lib/core/shape.js"),
  Arc: __webpack_require__(/*! ./shapes/arc */ "./node_modules/@antv/g/lib/shapes/arc.js"),
  Circle: __webpack_require__(/*! ./shapes/circle */ "./node_modules/@antv/g/lib/shapes/circle.js"),
  Dom: __webpack_require__(/*! ./shapes/dom */ "./node_modules/@antv/g/lib/shapes/dom.js"),
  Ellipse: __webpack_require__(/*! ./shapes/ellipse */ "./node_modules/@antv/g/lib/shapes/ellipse.js"),
  Fan: __webpack_require__(/*! ./shapes/fan */ "./node_modules/@antv/g/lib/shapes/fan.js"),
  Image: __webpack_require__(/*! ./shapes/image */ "./node_modules/@antv/g/lib/shapes/image.js"),
  Line: __webpack_require__(/*! ./shapes/line */ "./node_modules/@antv/g/lib/shapes/line.js"),
  Marker: __webpack_require__(/*! ./shapes/marker */ "./node_modules/@antv/g/lib/shapes/marker.js"),
  Path: __webpack_require__(/*! ./shapes/path */ "./node_modules/@antv/g/lib/shapes/path.js"),
  Polygon: __webpack_require__(/*! ./shapes/polygon */ "./node_modules/@antv/g/lib/shapes/polygon.js"),
  Polyline: __webpack_require__(/*! ./shapes/polyline */ "./node_modules/@antv/g/lib/shapes/polyline.js"),
  Rect: __webpack_require__(/*! ./shapes/rect */ "./node_modules/@antv/g/lib/shapes/rect.js"),
  Text: __webpack_require__(/*! ./shapes/text */ "./node_modules/@antv/g/lib/shapes/text.js"),
  PathSegment: __webpack_require__(/*! ./shapes/util/path-segment */ "./node_modules/@antv/g/lib/shapes/util/path-segment.js"),
  PathUtil: __webpack_require__(/*! ./util/path */ "./node_modules/@antv/g/lib/util/path.js"),
  Event: __webpack_require__(/*! ./event */ "./node_modules/@antv/g/lib/event.js"),
  EventEmitter: __webpack_require__(/*! ./core/event-emitter */ "./node_modules/@antv/g/lib/core/event-emitter.js"),
  // version, etc.
  version: '3.4.4'
};

/***/ }),

/***/ "./node_modules/@antv/g/lib/renderers/canvas/index.js":
/*!************************************************************!*\
  !*** ./node_modules/@antv/g/lib/renderers/canvas/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  painter: __webpack_require__(/*! ./painter */ "./node_modules/@antv/g/lib/renderers/canvas/painter.js")
};

/***/ }),

/***/ "./node_modules/@antv/g/lib/renderers/canvas/painter.js":
/*!**************************************************************!*\
  !*** ./node_modules/@antv/g/lib/renderers/canvas/painter.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(/*! ../../util */ "./node_modules/@antv/g/lib/util/index.js");

var renderUtil = __webpack_require__(/*! ./util */ "./node_modules/@antv/g/lib/renderers/canvas/util.js");

var SHAPE_ATTRS = ['fillStyle', 'font', 'globalAlpha', 'lineCap', 'lineWidth', 'lineJoin', 'miterLimit', 'shadowBlur', 'shadowColor', 'shadowOffsetX', 'shadowOffsetY', 'strokeStyle', 'textAlign', 'textBaseline', 'lineDash', 'lineDashOffset'];

var Painter =
/*#__PURE__*/
function () {
  function Painter(dom) {
    if (!dom) {
      return null;
    }

    var canvasId = Util.uniqueId('canvas_');
    var canvasDom = Util.createDom('<canvas id="' + canvasId + '"></canvas>');
    dom.appendChild(canvasDom);
    this.type = 'canvas';
    this.canvas = canvasDom;
    this.context = canvasDom.getContext('2d');
    this.toDraw = false;
    return this;
  }

  var _proto = Painter.prototype;

  _proto.beforeDraw = function beforeDraw() {
    var el = this.canvas;
    this.context && this.context.clearRect(0, 0, el.width, el.height);
  };

  _proto.draw = function draw(model) {
    var self = this;

    function drawInner() {
      self.animateHandler = Util.requestAnimationFrame(function () {
        self.animateHandler = undefined;

        if (self.toDraw) {
          drawInner();
        }
      });
      self.beforeDraw();

      try {
        self._drawGroup(model);
      } catch (ev) {
        // 绘制时异常，中断重绘
        console.warn('error in draw canvas, detail as:');
        console.warn(ev);
      } finally {
        self.toDraw = false;
      }
    }

    if (self.animateHandler) {
      self.toDraw = true;
    } else {
      drawInner();
    }
  };

  _proto.drawSync = function drawSync(model) {
    this.beforeDraw();

    this._drawGroup(model);
  };

  _proto._drawGroup = function _drawGroup(group) {
    if (group._cfg.removed || group._cfg.destroyed || !group._cfg.visible) {
      return;
    }

    var self = this;
    var children = group._cfg.children;
    var child = null;
    this.setContext(group);

    for (var i = 0; i < children.length; i++) {
      child = children[i];

      if (children[i].isGroup) {
        self._drawGroup(child);
      } else {
        self._drawShape(child);
      }
    }

    this.restoreContext(group);
  };

  _proto._drawShape = function _drawShape(shape) {
    if (shape._cfg.removed || shape._cfg.destroyed || !shape._cfg.visible) {
      return;
    }

    this.setContext(shape);
    shape.drawInner(this.context);
    this.restoreContext(shape);
    shape._cfg.attrs = shape._attrs;
    shape._cfg.hasUpdate = false;
  };

  _proto.setContext = function setContext(shape) {
    var context = this.context;
    var clip = shape._attrs.clip;
    context.save();

    if (clip) {
      // context.save();
      clip.resetTransform(context);
      clip.createPath(context);
      context.clip(); // context.restore();
    }

    this.resetContext(shape);
    shape.resetTransform(context);
  };

  _proto.restoreContext = function restoreContext() {
    this.context.restore();
  };

  _proto.resetContext = function resetContext(shape) {
    var context = this.context;
    var elAttrs = shape._attrs; // var canvas = this.get('canvas');

    if (!shape.isGroup) {
      for (var k in elAttrs) {
        if (SHAPE_ATTRS.indexOf(k) > -1) {
          // 非canvas属性不附加
          var v = elAttrs[k];

          if (k === 'fillStyle') {
            v = renderUtil.parseStyle(v, shape, context);
          }

          if (k === 'strokeStyle') {
            v = renderUtil.parseStyle(v, shape, context);
          }

          if (k === 'lineDash' && context.setLineDash) {
            if (Util.isArray(v)) {
              context.setLineDash(v);
            } else if (Util.isString(v)) {
              context.setLineDash(v.split(' '));
            }
          } else {
            context[k] = v;
          }
        }
      }
    }
  };

  return Painter;
}();

module.exports = Painter;

/***/ }),

/***/ "./node_modules/@antv/g/lib/renderers/canvas/util.js":
/*!***********************************************************!*\
  !*** ./node_modules/@antv/g/lib/renderers/canvas/util.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(/*! ../../util/index */ "./node_modules/@antv/g/lib/util/index.js");

var regexTags = /[MLHVQTCSAZ]([^MLHVQTCSAZ]*)/ig;
var regexDot = /[^\s\,]+/ig;
var regexLG = /^l\s*\(\s*([\d.]+)\s*\)\s*(.*)/i;
var regexRG = /^r\s*\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*\)\s*(.*)/i;
var regexPR = /^p\s*\(\s*([axyn])\s*\)\s*(.*)/i;
var regexColorStop = /[\d.]+:(#[^\s]+|[^\)]+\))/ig; // const numColorCache = {};

function addStop(steps, gradient) {
  var arr = steps.match(regexColorStop);
  Util.each(arr, function (item) {
    item = item.split(':');
    gradient.addColorStop(item[0], item[1]);
  });
}

function parseLineGradient(color, self, context) {
  var arr = regexLG.exec(color);
  var angle = Util.mod(Util.toRadian(parseFloat(arr[1])), Math.PI * 2);
  var steps = arr[2];
  var box = self.getBBox();
  var start;
  var end;

  if (angle >= 0 && angle < 0.5 * Math.PI) {
    start = {
      x: box.minX,
      y: box.minY
    };
    end = {
      x: box.maxX,
      y: box.maxY
    };
  } else if (0.5 * Math.PI <= angle && angle < Math.PI) {
    start = {
      x: box.maxX,
      y: box.minY
    };
    end = {
      x: box.minX,
      y: box.maxY
    };
  } else if (Math.PI <= angle && angle < 1.5 * Math.PI) {
    start = {
      x: box.maxX,
      y: box.maxY
    };
    end = {
      x: box.minX,
      y: box.minY
    };
  } else {
    start = {
      x: box.minX,
      y: box.maxY
    };
    end = {
      x: box.maxX,
      y: box.minY
    };
  }

  var tanTheta = Math.tan(angle);
  var tanTheta2 = tanTheta * tanTheta;
  var x = (end.x - start.x + tanTheta * (end.y - start.y)) / (tanTheta2 + 1) + start.x;
  var y = tanTheta * (end.x - start.x + tanTheta * (end.y - start.y)) / (tanTheta2 + 1) + start.y;
  var gradient = context.createLinearGradient(start.x, start.y, x, y);
  addStop(steps, gradient);
  return gradient;
}

function parseRadialGradient(color, self, context) {
  var arr = regexRG.exec(color);
  var fx = parseFloat(arr[1]);
  var fy = parseFloat(arr[2]);
  var fr = parseFloat(arr[3]);
  var steps = arr[4]; // 环半径为0时，默认无渐变，取渐变序列的最后一个颜色

  if (fr === 0) {
    var colors = steps.match(regexColorStop);
    return colors[colors.length - 1].split(':')[1];
  }

  var box = self.getBBox();
  var width = box.maxX - box.minX;
  var height = box.maxY - box.minY;
  var r = Math.sqrt(width * width + height * height) / 2;
  var gradient = context.createRadialGradient(box.minX + width * fx, box.minY + height * fy, fr * r, box.minX + width / 2, box.minY + height / 2, r);
  addStop(steps, gradient);
  return gradient;
}

function parsePattern(color, self, context) {
  if (self.get('patternSource') && self.get('patternSource') === color) {
    return self.get('pattern');
  }

  var pattern;
  var img;
  var arr = regexPR.exec(color);
  var repeat = arr[1];
  var source = arr[2]; // Function to be called when pattern loads

  function onload() {
    // Create pattern
    pattern = context.createPattern(img, repeat);
    self.setSilent('pattern', pattern); // be a cache

    self.setSilent('patternSource', color);
  }

  switch (repeat) {
    case 'a':
      repeat = 'repeat';
      break;

    case 'x':
      repeat = 'repeat-x';
      break;

    case 'y':
      repeat = 'repeat-y';
      break;

    case 'n':
      repeat = 'no-repeat';
      break;

    default:
      repeat = 'no-repeat';
  }

  img = new Image(); // If source URL is not a data URL

  if (!source.match(/^data:/i)) {
    // Set crossOrigin for this image
    img.crossOrigin = 'Anonymous';
  }

  img.src = source;

  if (img.complete) {
    onload();
  } else {
    img.onload = onload; // Fix onload() bug in IE9

    img.src = img.src;
  }

  return pattern;
}

module.exports = {
  parsePath: function parsePath(path) {
    path = path || [];

    if (Util.isArray(path)) {
      return path;
    }

    if (Util.isString(path)) {
      path = path.match(regexTags);
      Util.each(path, function (item, index) {
        item = item.match(regexDot);

        if (item[0].length > 1) {
          var tag = item[0].charAt(0);
          item.splice(1, 0, item[0].substr(1));
          item[0] = tag;
        }

        Util.each(item, function (sub, i) {
          if (!isNaN(sub)) {
            item[i] = +sub;
          }
        });
        path[index] = item;
      });
      return path;
    }
  },
  parseStyle: function parseStyle(color, self, context) {
    if (Util.isString(color)) {
      if (color[1] === '(' || color[2] === '(') {
        if (color[0] === 'l') {
          // regexLG.test(color)
          return parseLineGradient(color, self, context);
        } else if (color[0] === 'r') {
          // regexRG.test(color)
          return parseRadialGradient(color, self, context);
        } else if (color[0] === 'p') {
          // regexPR.test(color)
          return parsePattern(color, self, context);
        }
      }

      return color;
    }
  }
  /* ,
  numberToColor(num) {
    // 增加缓存
    let color = numColorCache[num];
    if (!color) {
      let str = num.toString(16);
      for (let i = str.length; i < 6; i++) {
        str = '0' + str;
      }
      color = '#' + str;
      numColorCache[num] = color;
    }
    return color;
  }*/

};

/***/ }),

/***/ "./node_modules/@antv/g/lib/renderers/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/@antv/g/lib/renderers/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  canvas: __webpack_require__(/*! ./canvas */ "./node_modules/@antv/g/lib/renderers/canvas/index.js"),
  svg: __webpack_require__(/*! ./svg */ "./node_modules/@antv/g/lib/renderers/svg/index.js")
};

/***/ }),

/***/ "./node_modules/@antv/g/lib/renderers/svg/defs.js":
/*!********************************************************!*\
  !*** ./node_modules/@antv/g/lib/renderers/svg/defs.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by Elaine on 2018/5/9.
 */
var Util = __webpack_require__(/*! ../../util/index */ "./node_modules/@antv/g/lib/util/index.js");

var Gradient = __webpack_require__(/*! ./defs/gradient */ "./node_modules/@antv/g/lib/renderers/svg/defs/gradient.js");

var Shadow = __webpack_require__(/*! ./defs/shadow */ "./node_modules/@antv/g/lib/renderers/svg/defs/shadow.js");

var Arrow = __webpack_require__(/*! ./defs/arrow */ "./node_modules/@antv/g/lib/renderers/svg/defs/arrow.js");

var Clip = __webpack_require__(/*! ./defs/clip */ "./node_modules/@antv/g/lib/renderers/svg/defs/clip.js");

var Pattern = __webpack_require__(/*! ./defs/pattern */ "./node_modules/@antv/g/lib/renderers/svg/defs/pattern.js");

var Defs =
/*#__PURE__*/
function () {
  function Defs(canvas) {
    var el = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    var id = Util.uniqueId('defs_');
    el.id = id;
    canvas.appendChild(el);
    this.children = [];
    this.defaultArrow = {};
    this.el = el;
    this.canvas = canvas;
  }

  var _proto = Defs.prototype;

  _proto.find = function find(type, attr) {
    var children = this.children;
    var result = null;

    for (var i = 0; i < children.length; i++) {
      if (children[i].match(type, attr)) {
        result = children[i].id;
        break;
      }
    }

    return result;
  };

  _proto.findById = function findById(id) {
    var children = this.children;
    var flag = null;

    for (var i = 0; i < children.length; i++) {
      if (children[i].id === id) {
        flag = children[i];
        break;
      }
    }

    return flag;
  };

  _proto.add = function add(item) {
    this.children.push(item);
    item.canvas = this.canvas;
    item.parent = this;
  };

  _proto.getDefaultArrow = function getDefaultArrow(attrs, name) {
    var stroke = attrs.stroke || attrs.strokeStyle;

    if (this.defaultArrow[stroke]) {
      return this.defaultArrow[stroke].id;
    }

    var arrow = new Arrow(attrs, name);
    this.defaultArrow[stroke] = arrow;
    this.el.appendChild(arrow.el);
    return arrow.id;
  };

  _proto.addGradient = function addGradient(cfg) {
    var gradient = new Gradient(cfg);
    this.el.appendChild(gradient.el);
    this.add(gradient);
    return gradient.id;
  };

  _proto.addArrow = function addArrow(attrs, name) {
    var arrow = new Arrow(attrs, name);
    this.el.appendChild(arrow.el);
    return arrow.id;
  };

  _proto.addShadow = function addShadow(cfg) {
    var shadow = new Shadow(cfg);
    this.el.appendChild(shadow.el);
    this.add(shadow);
    return shadow.id;
  };

  _proto.addPattern = function addPattern(cfg) {
    var pattern = new Pattern(cfg);
    this.el.appendChild(pattern.el);
    this.add(pattern);
    return pattern.id;
  };

  _proto.addClip = function addClip(cfg) {
    var clip = new Clip(cfg);
    this.el.appendChild(clip.el);
    this.add(clip);
    return clip.id;
  };

  return Defs;
}();

module.exports = Defs;

/***/ }),

/***/ "./node_modules/@antv/g/lib/renderers/svg/defs/arrow.js":
/*!**************************************************************!*\
  !*** ./node_modules/@antv/g/lib/renderers/svg/defs/arrow.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by Elaine on 2018/5/11.
 */
var Util = __webpack_require__(/*! ../../../util/index */ "./node_modules/@antv/g/lib/util/index.js");

var Arrow =
/*#__PURE__*/
function () {
  function Arrow(attrs, type) {
    var el = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
    var id = Util.uniqueId('marker_');
    el.setAttribute('id', id);
    var shape = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    shape.setAttribute('stroke', 'none');
    shape.setAttribute('fill', attrs.stroke || '#000');
    el.appendChild(shape);
    el.setAttribute('overflow', 'visible');
    el.setAttribute('orient', 'auto-start-reverse');
    this.el = el;
    this.child = shape;
    this.id = id;
    this.cfg = attrs[type === 'marker-start' ? 'startArrow' : 'endArrow'];
    this.stroke = attrs.stroke || '#000';

    if (this.cfg === true) {
      this._setDefaultPath(type, shape);
    } else {
      this._setMarker(attrs.lineWidth, shape);
    }

    return this;
  }

  var _proto = Arrow.prototype;

  _proto.match = function match() {
    return false;
  };

  _proto._setDefaultPath = function _setDefaultPath(type, el) {
    var parent = this.el;
    el.setAttribute('d', 'M0,0 L6,3 L0,6 L3,3Z');
    parent.setAttribute('refX', 3);
    parent.setAttribute('refY', 3);
  };

  _proto._setMarker = function _setMarker(r, el) {
    var parent = this.el;
    var path = this.cfg.path;
    var d = this.cfg.d;

    if (Util.isArray(path)) {
      path = path.map(function (segment) {
        return segment.join(' ');
      }).join('');
    }

    el.setAttribute('d', path);
    parent.appendChild(el);

    if (d) {
      parent.setAttribute('refX', d / r);
    }
  };

  _proto.update = function update(fill) {
    var child = this.child;

    if (child.attr) {
      child.attr('fill', fill);
    } else {
      child.setAttribute('fill', fill);
    }
  };

  return Arrow;
}();

module.exports = Arrow;

/***/ }),

/***/ "./node_modules/@antv/g/lib/renderers/svg/defs/clip.js":
/*!*************************************************************!*\
  !*** ./node_modules/@antv/g/lib/renderers/svg/defs/clip.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by Elaine on 2018/5/14.
 */
var Util = __webpack_require__(/*! ../../../util/index */ "./node_modules/@antv/g/lib/util/index.js");

var Clip =
/*#__PURE__*/
function () {
  function Clip(cfg) {
    this.type = 'clip';
    var el = document.createElementNS('http://www.w3.org/2000/svg', 'clipPath');
    this.el = el;
    this.id = Util.uniqueId('clip_');
    el.id = this.id;
    var shapeEl = cfg._cfg.el; // just in case the clip shape is also a shape needs to be drawn

    el.appendChild(shapeEl.cloneNode(true));
    this.cfg = cfg;
    return this;
  }

  var _proto = Clip.prototype;

  _proto.match = function match() {
    return false;
  };

  _proto.remove = function remove() {
    var el = this.el;
    el.parentNode.removeChild(el);
  };

  return Clip;
}();

module.exports = Clip;

/***/ }),

/***/ "./node_modules/@antv/g/lib/renderers/svg/defs/gradient.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@antv/g/lib/renderers/svg/defs/gradient.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by Elaine on 2018/5/9.
 */
var Util = __webpack_require__(/*! ../../../util/index */ "./node_modules/@antv/g/lib/util/index.js");

var regexLG = /^l\s*\(\s*([\d.]+)\s*\)\s*(.*)/i;
var regexRG = /^r\s*\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*\)\s*(.*)/i;
var regexColorStop = /[\d.]+:(#[^\s]+|[^\)]+\))/ig;

function addStop(steps) {
  var arr = steps.match(regexColorStop);

  if (!arr) {
    return '';
  }

  var stops = '';
  arr.sort(function (a, b) {
    a = a.split(':');
    b = b.split(':');
    return Number(a[0]) - Number(b[0]);
  });
  Util.each(arr, function (item) {
    item = item.split(':');
    stops += "<stop offset=\"" + item[0] + "\" stop-color=\"" + item[1] + "\"></stop>";
  });
  return stops;
}

function parseLineGradient(color, el) {
  var arr = regexLG.exec(color);
  var angle = Util.mod(Util.toRadian(parseFloat(arr[1])), Math.PI * 2);
  var steps = arr[2];
  var start;
  var end;

  if (angle >= 0 && angle < 0.5 * Math.PI) {
    start = {
      x: 0,
      y: 0
    };
    end = {
      x: 1,
      y: 1
    };
  } else if (0.5 * Math.PI <= angle && angle < Math.PI) {
    start = {
      x: 1,
      y: 0
    };
    end = {
      x: 0,
      y: 1
    };
  } else if (Math.PI <= angle && angle < 1.5 * Math.PI) {
    start = {
      x: 1,
      y: 1
    };
    end = {
      x: 0,
      y: 0
    };
  } else {
    start = {
      x: 0,
      y: 1
    };
    end = {
      x: 1,
      y: 0
    };
  }

  var tanTheta = Math.tan(angle);
  var tanTheta2 = tanTheta * tanTheta;
  var x = (end.x - start.x + tanTheta * (end.y - start.y)) / (tanTheta2 + 1) + start.x;
  var y = tanTheta * (end.x - start.x + tanTheta * (end.y - start.y)) / (tanTheta2 + 1) + start.y;
  el.setAttribute('x1', start.x);
  el.setAttribute('y1', start.y);
  el.setAttribute('x2', x);
  el.setAttribute('y2', y);
  el.innerHTML = addStop(steps);
}

function parseRadialGradient(color, self) {
  var arr = regexRG.exec(color);
  var cx = parseFloat(arr[1]);
  var cy = parseFloat(arr[2]);
  var r = parseFloat(arr[3]);
  var steps = arr[4];
  self.setAttribute('cx', cx);
  self.setAttribute('cy', cy);
  self.setAttribute('r', r);
  self.innerHTML = addStop(steps);
}

var Gradient =
/*#__PURE__*/
function () {
  function Gradient(cfg) {
    var el = null;
    var id = Util.uniqueId('gradient_');

    if (cfg.toLowerCase()[0] === 'l') {
      el = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
      parseLineGradient(cfg, el);
    } else {
      el = document.createElementNS('http://www.w3.org/2000/svg', 'radialGradient');
      parseRadialGradient(cfg, el);
    }

    el.setAttribute('id', id);
    this.el = el;
    this.id = id;
    this.cfg = cfg;
    return this;
  }

  var _proto = Gradient.prototype;

  _proto.match = function match(type, attr) {
    return this.cfg === attr;
  };

  return Gradient;
}();

module.exports = Gradient;

/***/ }),

/***/ "./node_modules/@antv/g/lib/renderers/svg/defs/pattern.js":
/*!****************************************************************!*\
  !*** ./node_modules/@antv/g/lib/renderers/svg/defs/pattern.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by Elaine on 2018/5/9.
 */
var Util = __webpack_require__(/*! ../../../util/index */ "./node_modules/@antv/g/lib/util/index.js");

var regexPR = /^p\s*\(\s*([axyn])\s*\)\s*(.*)/i;

var Pattern =
/*#__PURE__*/
function () {
  function Pattern(cfg) {
    var el = document.createElementNS('http://www.w3.org/2000/svg', 'pattern');
    el.setAttribute('patternUnits', 'userSpaceOnUse');
    var child = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    el.appendChild(child);
    var id = Util.uniqueId('pattern_');
    el.id = id;
    this.el = el;
    this.id = id;
    this.cfg = cfg;
    var arr = regexPR.exec(cfg);
    var source = arr[2];
    child.setAttribute('href', source);
    var img = new Image();

    if (!source.match(/^data:/i)) {
      img.crossOrigin = 'Anonymous';
    }

    img.src = source;

    function onload() {
      console.log(img.width, img.height);
      el.setAttribute('width', img.width);
      el.setAttribute('height', img.height);
    }

    if (img.complete) {
      onload();
    } else {
      img.onload = onload; // Fix onload() bug in IE9

      img.src = img.src;
    }

    return this;
  }

  var _proto = Pattern.prototype;

  _proto.match = function match(type, attr) {
    return this.cfg === attr;
  };

  return Pattern;
}();

module.exports = Pattern;

/***/ }),

/***/ "./node_modules/@antv/g/lib/renderers/svg/defs/shadow.js":
/*!***************************************************************!*\
  !*** ./node_modules/@antv/g/lib/renderers/svg/defs/shadow.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by Elaine on 2018/5/10.
 */
var Util = __webpack_require__(/*! ../../../util/index */ "./node_modules/@antv/g/lib/util/index.js");

var ATTR_MAP = {
  shadowColor: 'color',
  shadowOpacity: 'opacity',
  shadowBlur: 'blur',
  shadowOffsetX: 'dx',
  shadowOffsetY: 'dy'
};
var SHADOW_DIMENSION = {
  x: '-40%',
  y: '-40%',
  width: '200%',
  height: '200%'
};

var Shadow =
/*#__PURE__*/
function () {
  function Shadow(cfg) {
    this.type = 'filter';
    var el = document.createElementNS('http://www.w3.org/2000/svg', 'filter'); // expand the filter region to fill in shadows

    Util.each(SHADOW_DIMENSION, function (v, k) {
      el.setAttribute(k, v);
    });
    this.el = el;
    this.id = Util.uniqueId('filter_');
    this.el.id = this.id;
    this.cfg = cfg;

    this._parseShadow(cfg, el);

    return this;
  }

  var _proto = Shadow.prototype;

  _proto.match = function match(type, cfg) {
    if (this.type !== type) {
      return false;
    }

    var flag = true;
    var config = this.cfg;
    Util.each(Object.keys(config), function (attr) {
      if (config[attr] !== cfg[attr]) {
        flag = false;
        return false;
      }
    });
    return flag;
  };

  _proto.update = function update(name, value) {
    var config = this.cfg;
    config[ATTR_MAP[name]] = value;

    this._parseShadow(config, this.el);

    return this;
  };

  _proto._parseShadow = function _parseShadow(config, el) {
    var child = "<feDropShadow \n      dx=\"" + (config.dx || 0) + "\" \n      dy=\"" + (config.dy || 0) + "\" \n      stdDeviation=\"" + (config.blur ? config.blur / 10 : 0) + "\"\n      flood-color=\"" + (config.color ? config.color : '#000') + "\"\n      flood-opacity=\"" + (config.opacity ? config.opacity : 1) + "\"\n      />";
    el.innerHTML = child;
  };

  return Shadow;
}();

module.exports = Shadow;

/***/ }),

/***/ "./node_modules/@antv/g/lib/renderers/svg/getShape.js":
/*!************************************************************!*\
  !*** ./node_modules/@antv/g/lib/renderers/svg/getShape.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var TAG_MAP = {
  svg: 'svg',
  circle: 'circle',
  rect: 'rect',
  text: 'text',
  path: 'path',
  foreignObject: 'foreignObject',
  polygon: 'polygon',
  ellipse: 'ellipse',
  image: 'image'
};

module.exports = function getShape(x, y, e) {
  var target = e.target || e.srcElement;

  if (!TAG_MAP[target.tagName]) {
    var parent = target.parentNode;

    while (parent && !TAG_MAP[parent.tagName]) {
      parent = parent.parentNode;
    }

    target = parent;
  }

  if (this._cfg.el === target) {
    return this;
  }

  return this.find(function (item) {
    return item._cfg && item._cfg.el === target;
  });
};

/***/ }),

/***/ "./node_modules/@antv/g/lib/renderers/svg/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/@antv/g/lib/renderers/svg/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  painter: __webpack_require__(/*! ./painter */ "./node_modules/@antv/g/lib/renderers/svg/painter.js"),
  getShape: __webpack_require__(/*! ./getShape */ "./node_modules/@antv/g/lib/renderers/svg/getShape.js")
};

/***/ }),

/***/ "./node_modules/@antv/g/lib/renderers/svg/painter.js":
/*!***********************************************************!*\
  !*** ./node_modules/@antv/g/lib/renderers/svg/painter.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(/*! ../../util */ "./node_modules/@antv/g/lib/util/index.js");

var _require = __webpack_require__(/*! ../../util/format */ "./node_modules/@antv/g/lib/util/format.js"),
    parseRadius = _require.parseRadius;

var Marker = __webpack_require__(/*! ../../shapes/marker */ "./node_modules/@antv/g/lib/shapes/marker.js");

var Defs = __webpack_require__(/*! ./defs */ "./node_modules/@antv/g/lib/renderers/svg/defs.js");

var SHAPE_TO_TAGS = {
  rect: 'path',
  circle: 'circle',
  line: 'line',
  path: 'path',
  marker: 'path',
  text: 'text',
  polygon: 'polygon',
  image: 'image',
  ellipse: 'ellipse',
  dom: 'foreignObject',
  fan: 'path',
  group: 'g'
};
var LETTER_SPACING = 0.3;
var SVG_ATTR_MAP = {
  opacity: 'opacity',
  fillStyle: 'fill',
  strokeOpacity: 'stroke-opacity',
  fillOpacity: 'fill-opacity',
  strokeStyle: 'stroke',
  x: 'x',
  y: 'y',
  r: 'r',
  rx: 'rx',
  ry: 'ry',
  width: 'width',
  height: 'height',
  x1: 'x1',
  x2: 'x2',
  y1: 'y1',
  y2: 'y2',
  lineCap: 'stroke-linecap',
  lineJoin: 'stroke-linejoin',
  lineWidth: 'stroke-width',
  lineDash: 'stroke-dasharray',
  lineDashOffset: 'stroke-dashoffset',
  miterLimit: 'stroke-miterlimit',
  font: 'font',
  fontSize: 'font-size',
  fontStyle: 'font-style',
  fontVariant: 'font-variant',
  fontWeight: 'font-weight',
  fontFamily: 'font-family',
  startArrow: 'marker-start',
  endArrow: 'marker-end',
  path: 'd',
  "class": 'class',
  id: 'id',
  style: 'style',
  preserveAspectRatio: 'preserveAspectRatio'
};
var BASELINE_MAP = {
  top: 'before-edge',
  middle: 'central',
  bottom: 'after-edge',
  alphabetic: 'baseline',
  hanging: 'hanging'
};
var ANCHOR_MAP = {
  left: 'left',
  start: 'left',
  center: 'middle',
  right: 'end',
  end: 'end'
};

var Painter =
/*#__PURE__*/
function () {
  function Painter(dom) {
    if (!dom) {
      return null;
    }

    var svgId = Util.uniqueId('canvas_');
    var canvasDom = Util.createDom("<svg id=\"" + svgId + "\"></svg>");
    dom.appendChild(canvasDom);
    this.type = 'svg';
    this.canvas = canvasDom;
    this.context = new Defs(canvasDom);
    this.toDraw = false;
    return this;
  }

  var _proto = Painter.prototype;

  _proto.draw = function draw(model) {
    var self = this;

    function drawInner() {
      self.animateHandler = Util.requestAnimationFrame(function () {
        self.animateHandler = undefined;

        if (self.toDraw) {
          drawInner();
        }
      });

      try {
        self._drawChildren(model);
      } catch (ev) {
        // 绘制时异常，中断重绘
        console.warn('error in draw canvas, detail as:');
        console.warn(ev);
      } finally {
        self.toDraw = false;
      }
    }

    if (self.animateHandler) {
      self.toDraw = true;
    } else {
      drawInner();
    }
  };

  _proto.drawSync = function drawSync(model) {
    this._drawChildren(model);
  };

  _proto._drawGroup = function _drawGroup(model, index) {
    var cfg = model._cfg;

    if (cfg.removed || cfg.destroyed) {
      return;
    }

    if (cfg.tobeRemoved) {
      Util.each(cfg.tobeRemoved, function (item) {
        if (item.parentNode) {
          item.parentNode.removeChild(item);
        }
      });
      cfg.tobeRemoved = [];
    }

    this._drawShape(model, index);

    if (cfg.children && cfg.children.length > 0) {
      this._drawChildren(model);
    }
  };

  _proto._drawChildren = function _drawChildren(parent) {
    var self = this;
    var children = parent._cfg.children;
    var shape; // 防止在画children的时候，父group已经被destroy

    if (!children) {
      return;
    }

    for (var i = 0; i < children.length; i++) {
      shape = children[i];

      if (shape.isGroup) {
        self._drawGroup(shape, i);
      } else {
        self._drawShape(shape, i);
      }
    }
  };

  _proto._drawShape = function _drawShape(model, index) {
    var self = this;
    var attrs = model._attrs;
    var cfg = model._cfg;
    var el = cfg.el; // 删除

    if (cfg.removed || cfg.destroyed) {
      if (el) {
        el.parentNode.removeChild(cfg.el);
      }

      return;
    } // 新增节点


    if (!el && cfg.parent) {
      self._createDom(model, index);

      self._updateShape(model);
    }

    el = cfg.el;

    if (cfg.visible === false) {
      el.setAttribute('visibility', 'hidden');
      return;
    }

    if (cfg.visible && el.hasAttribute('visibility')) {
      el.removeAttribute('visibility');
    } // 更新


    if (cfg.hasUpdate) {
      self._updateShape(model);
    }

    if (attrs.clip && attrs.clip._cfg.hasUpdate) {
      self._updateShape(attrs.clip);
    }
  };

  _proto._updateShape = function _updateShape(model) {
    var self = this;
    var attrs = model._attrs;
    var formerAttrs = model._cfg.attrs;

    if (!formerAttrs) {
      return;
    }

    if (!model._cfg.el) {
      self._createDom(model);
    }

    if ('clip' in attrs) {
      this._setClip(model, attrs.clip);
    }

    if ('shadowOffsetX' in attrs || 'shadowOffsetY' in attrs || 'shadowBlur' in attrs || 'shadowColor' in attrs) {
      this._setShadow(model);
    }

    if (model.type === 'text') {
      self._updateText(model);

      return;
    }

    if (model.type === 'fan') {
      self._updateFan(model);
    }

    if (model.type === 'marker') {
      model._cfg.el.setAttribute('d', self._assembleMarker(attrs));
    }

    if (model.type === 'rect') {
      model._cfg.el.setAttribute('d', self._assembleRect(attrs));
    }

    for (var key in attrs) {
      if (attrs[key] !== formerAttrs[key]) {
        self._setAttribute(model, key, attrs[key]);
      }
    }

    model._cfg.attrs = Util.deepMix({}, model._attrs);
    model._cfg.hasUpdate = false;
  };

  _proto._setAttribute = function _setAttribute(model, name, value) {
    var type = model.type;
    var attrs = model._attrs;
    var el = model._cfg.el;
    var defs = this.context; // 计算marker路径

    if ((type === 'marker' || type === 'rect') && ~['x', 'y', 'radius', 'r'].indexOf(name)) {
      return;
    } // 圆和椭圆不是x, y， 是cx, cy。 marker的x,y 用于计算marker的路径，不需要写到dom


    if (~['circle', 'ellipse'].indexOf(type) && ~['x', 'y'].indexOf(name)) {
      el.setAttribute('c' + name, parseInt(value, 10));
      return;
    } // 多边形


    if (type === 'polygon' && name === 'points') {
      if (!value || value.length === 0) {
        value = '';
      }

      if (Util.isArray(value)) {
        value = value.map(function (point) {
          return point[0] + ',' + point[1];
        });
        value = value.join(' ');
      }

      el.setAttribute('points', value);
      return;
    } // 设置path


    if (name === 'path' && Util.isArray(value)) {
      el.setAttribute('d', this._formatPath(value));
      return;
    } // 设置图片


    if (name === 'img') {
      this._setImage(model, value);

      return;
    }

    if (name === 'transform') {
      if (!value) {
        el.removeAttribute('transform');
        return;
      }

      this._setTransform(model);

      return;
    }

    if (name === 'rotate') {
      if (!value) {
        el.removeAttribute('transform');
        return;
      }

      this._setTransform(model);

      return;
    }

    if (name === 'matrix') {
      this._setTransform(model);

      return;
    }

    if (name === 'fillStyle' || name === 'strokeStyle') {
      this._setColor(model, name, value);

      return;
    }

    if (name === 'clip') {
      return;
    }

    if (~name.indexOf('Arrow')) {
      name = SVG_ATTR_MAP[name];

      if (!value) {
        model._cfg[name] = null;
        el.removeAttribute(name);
      } else {
        var id = null;

        if (typeof value === 'boolean') {
          id = defs.getDefaultArrow(attrs, name);
        } else {
          id = defs.addArrow(attrs, name);
        }

        el.setAttribute(name, "url(#" + id + ")");
        model._cfg[name] = id;
      }

      return;
    } // foreignObject


    if (name === 'html') {
      if (typeof value === 'string') {
        el.innerHTML = value;
      } else {
        el.innerHTML = '';
        el.appendChild(value);
      }
    }

    if (SVG_ATTR_MAP[name]) {
      el.setAttribute(SVG_ATTR_MAP[name], value);
    }
  };

  _proto._createDom = function _createDom(model, index) {
    var type = SHAPE_TO_TAGS[model.type];
    var attrs = model._attrs;
    var parent = model._cfg.parent;

    if (!type) {
      throw new Error('the type' + model.type + 'is not supported by svg');
    }

    var shape = document.createElementNS('http://www.w3.org/2000/svg', type);

    if (model._cfg.id) {
      shape.id = model._cfg.id;
    }

    model._cfg.el = shape;

    if (parent) {
      var parentNode = parent._cfg.el;

      if (typeof index === 'undefined') {
        parentNode.appendChild(shape);
      } else {
        var childNodes = parent._cfg.el.childNodes; // svg下天然有defs作为子节点，svg下子元素index需要+1

        if (parentNode.tagName === 'svg') {
          index += 1;
        }

        if (childNodes.length <= index) {
          parentNode.appendChild(shape);
        } else {
          parentNode.insertBefore(shape, childNodes[index]);
        }
      }
    }

    model._cfg.attrs = {};

    if (model.type === 'text') {
      shape.setAttribute('paint-order', 'stroke');
      shape.setAttribute('style', 'stroke-linecap:butt; stroke-linejoin:miter;');
    } else {
      if (!attrs.stroke && !attrs.strokeStyle) {
        shape.setAttribute('stroke', 'none');
      }

      if (!attrs.fill && !attrs.fillStyle) {
        shape.setAttribute('fill', 'none');
      }
    }

    return shape;
  };

  _proto._assembleMarker = function _assembleMarker(attrs) {
    var r = attrs.r;

    if (typeof attrs.r === 'undefined') {
      r = attrs.radius;
    }

    if (isNaN(Number(attrs.x)) || isNaN(Number(attrs.y)) || isNaN(Number(r))) {
      return '';
    }

    var d = '';

    if (typeof attrs.symbol === 'function') {
      d = attrs.symbol(attrs.x, attrs.y, r);
    } else {
      d = Marker.Symbols[attrs.symbol || 'circle'](attrs.x, attrs.y, r);
    }

    if (Util.isArray(d)) {
      d = d.map(function (path) {
        return path.join(' ');
      }).join('');
    }

    return d;
  };

  _proto._assembleRect = function _assembleRect(attrs) {
    var x = attrs.x;
    var y = attrs.y;
    var w = attrs.width;
    var h = attrs.height;
    var radius = attrs.radius;

    if (!radius) {
      return "M " + x + "," + y + " l " + w + ",0 l 0," + h + " l" + -w + " 0 z";
    }

    var r = parseRadius(radius);

    if (Util.isArray(radius)) {
      if (radius.length === 1) {
        r.r1 = r.r2 = r.r3 = r.r4 = radius[0];
      } else if (radius.length === 2) {
        r.r1 = r.r3 = radius[0];
        r.r2 = r.r4 = radius[1];
      } else if (radius.length === 3) {
        r.r1 = radius[0];
        r.r2 = r.r4 = radius[1];
        r.r3 = radius[2];
      } else {
        r.r1 = radius[0];
        r.r2 = radius[1];
        r.r3 = radius[2];
        r.r4 = radius[3];
      }
    } else {
      r.r1 = r.r2 = r.r3 = r.r4 = radius;
    }

    var d = [["M " + (x + r.r1) + "," + y], ["l " + (w - r.r1 - r.r2) + ",0"], ["a " + r.r2 + "," + r.r2 + ",0,0,1," + r.r2 + "," + r.r2], ["l 0," + (h - r.r2 - r.r3)], ["a " + r.r3 + "," + r.r3 + ",0,0,1," + -r.r3 + "," + r.r3], ["l " + (r.r3 + r.r4 - w) + ",0"], ["a " + r.r4 + "," + r.r4 + ",0,0,1," + -r.r4 + "," + -r.r4], ["l 0," + (r.r4 + r.r1 - h)], ["a " + r.r1 + "," + r.r1 + ",0,0,1," + r.r1 + "," + -r.r1], ['z']];
    return d.join(' ');
  };

  _proto._formatPath = function _formatPath(value) {
    value = value.map(function (path) {
      return path.join(' ');
    }).join('');

    if (~value.indexOf('NaN')) {
      return '';
    }

    return value;
  };

  _proto._setTransform = function _setTransform(model) {
    var matrix = model._attrs.matrix;
    var el = model._cfg.el;
    var transform = [];

    for (var i = 0; i < 9; i += 3) {
      transform.push(matrix[i] + ',' + matrix[i + 1]);
    }

    transform = transform.join(',');

    if (transform.indexOf('NaN') === -1) {
      el.setAttribute('transform', "matrix(" + transform + ")");
    } else {
      console.warn('invalid matrix:', matrix);
    }
  };

  _proto._setImage = function _setImage(model, img) {
    var attrs = model._attrs;
    var el = model._cfg.el;

    if (Util.isString(img)) {
      el.setAttribute('href', img);
    } else if (img instanceof Image) {
      if (!attrs.width) {
        el.setAttribute('width', img.width);
        model._attrs.width = img.width;
      }

      if (!attrs.height) {
        el.setAttribute('height', img.height);
        model._attrs.height = img.height;
      }

      el.setAttribute('href', img.src);
    } else if (img instanceof HTMLElement && Util.isString(img.nodeName) && img.nodeName.toUpperCase() === 'CANVAS') {
      el.setAttribute('href', img.toDataURL());
    } else if (img instanceof ImageData) {
      var canvas = document.createElement('canvas');
      canvas.setAttribute('width', img.width);
      canvas.setAttribute('height', img.height);
      canvas.getContext('2d').putImageData(img, 0, 0);

      if (!attrs.width) {
        el.setAttribute('width', img.width);
        model._attrs.width = img.width;
      }

      if (!attrs.height) {
        el.setAttribute('height', img.height);
        model._attrs.height = img.height;
      }

      el.setAttribute('href', canvas.toDataURL());
    }
  };

  _proto._updateFan = function _updateFan(model) {
    function getPoint(angle, radius, center) {
      return {
        x: radius * Math.cos(angle) + center.x,
        y: radius * Math.sin(angle) + center.y
      };
    }

    var attrs = model._attrs;
    var cfg = model._cfg;
    var center = {
      x: attrs.x,
      y: attrs.y
    };
    var d = [];
    var startAngle = attrs.startAngle;
    var endAngle = attrs.endAngle;

    if (Util.isNumberEqual(endAngle - startAngle, Math.PI * 2)) {
      endAngle -= 0.00001;
    }

    var outerStart = getPoint(startAngle, attrs.re, center);
    var outerEnd = getPoint(endAngle, attrs.re, center);
    var fa = endAngle > startAngle ? 1 : 0;
    var fs = Math.abs(endAngle - startAngle) > Math.PI ? 1 : 0;
    var rs = attrs.rs;
    var re = attrs.re;
    var innerStart = getPoint(startAngle, attrs.rs, center);
    var innerEnd = getPoint(endAngle, attrs.rs, center);

    if (attrs.rs > 0) {
      d.push("M " + outerEnd.x + "," + outerEnd.y);
      d.push("L " + innerEnd.x + "," + innerEnd.y);
      d.push("A " + rs + "," + rs + ",0," + fs + "," + (fa === 1 ? 0 : 1) + "," + innerStart.x + "," + innerStart.y);
      d.push("L " + outerStart.x + " " + outerStart.y);
    } else {
      d.push("M " + center.x + "," + center.y);
      d.push("L " + outerStart.x + "," + outerStart.y);
    }

    d.push("A " + re + "," + re + ",0," + fs + "," + fa + "," + outerEnd.x + "," + outerEnd.y);

    if (attrs.rs > 0) {
      d.push("L " + innerEnd.x + "," + innerEnd.y);
    } else {
      d.push('Z');
    }

    cfg.el.setAttribute('d', d.join(' '));
  };

  _proto._updateText = function _updateText(model) {
    var self = this;
    var attrs = model._attrs;
    var formerAttrs = model._cfg.attrs;
    var el = model._cfg.el;

    this._setFont(model);

    for (var attr in attrs) {
      if (attrs[attr] !== formerAttrs[attr]) {
        if (attr === 'text') {
          self._setText(model, "" + attrs[attr]);

          continue;
        }

        if (attr === 'fillStyle' || attr === 'strokeStyle') {
          this._setColor(model, attr, attrs[attr]);

          continue;
        }

        if (attr === 'matrix') {
          this._setTransform(model);

          continue;
        }

        if (SVG_ATTR_MAP[attr]) {
          el.setAttribute(SVG_ATTR_MAP[attr], attrs[attr]);
        }
      }
    }

    model._cfg.attrs = Object.assign({}, model._attrs);
    model._cfg.hasUpdate = false;
  };

  _proto._setFont = function _setFont(model) {
    var el = model.get('el');
    var attrs = model._attrs;
    var fontSize = attrs.fontSize;
    el.setAttribute('alignment-baseline', BASELINE_MAP[attrs.textBaseline] || 'baseline');
    el.setAttribute('text-anchor', ANCHOR_MAP[attrs.textAlign] || 'left');

    if (fontSize && +fontSize < 12) {
      // 小于 12 像素的文本进行 scale 处理
      attrs.matrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
      model.transform([['t', -attrs.x, -attrs.y], ['s', +fontSize / 12, +fontSize / 12], ['t', attrs.x, attrs.y]]);
    }
  };

  _proto._setText = function _setText(model, text) {
    var el = model._cfg.el;
    var baseline = model._attrs.textBaseline || 'bottom';

    if (!text) {
      el.innerHTML = '';
    } else if (~text.indexOf('\n')) {
      var x = model._attrs.x;
      var textArr = text.split('\n');
      var textLen = textArr.length - 1;
      var arr = '';
      Util.each(textArr, function (segment, i) {
        if (i === 0) {
          if (baseline === 'alphabetic') {
            arr += "<tspan x=\"" + x + "\" dy=\"" + -textLen + "em\">" + segment + "</tspan>";
          } else if (baseline === 'top') {
            arr += "<tspan x=\"" + x + "\" dy=\"0.9em\">" + segment + "</tspan>";
          } else if (baseline === 'middle') {
            arr += "<tspan x=\"" + x + "\" dy=\"" + -(textLen - 1) / 2 + "em\">" + segment + "</tspan>";
          } else if (baseline === 'bottom') {
            arr += "<tspan x=\"" + x + "\" dy=\"-" + (textLen + LETTER_SPACING) + "em\">" + segment + "</tspan>";
          } else if (baseline === 'hanging') {
            arr += "<tspan x=\"" + x + "\" dy=\"" + (-(textLen - 1) - LETTER_SPACING) + "em\">" + segment + "</tspan>";
          }
        } else {
          arr += "<tspan x=\"" + x + "\" dy=\"1em\">" + segment + "</tspan>";
        }
      });
      el.innerHTML = arr;
    } else {
      el.innerHTML = text;
    }
  };

  _proto._setClip = function _setClip(model, value) {
    var el = model._cfg.el;

    if (!value) {
      el.removeAttribute('clip-path');
      return;
    }

    if (!el.hasAttribute('clip-path')) {
      this._createDom(value);

      this._updateShape(value);

      var id = this.context.addClip(value);
      el.setAttribute('clip-path', "url(#" + id + ")");
    } else if (value._cfg.hasUpdate) {
      this._updateShape(value);
    }
  };

  _proto._setColor = function _setColor(model, name, value) {
    var el = model._cfg.el;
    var defs = this.context;

    if (!value) {
      el.setAttribute(SVG_ATTR_MAP[name], 'none');
      return;
    }

    value = value.trim();

    if (/^[r,R,L,l]{1}[\s]*\(/.test(value)) {
      var id = defs.find('gradient', value);

      if (!id) {
        id = defs.addGradient(value);
      }

      el.setAttribute(SVG_ATTR_MAP[name], "url(#" + id + ")");
    } else if (/^[p,P]{1}[\s]*\(/.test(value)) {
      var _id = defs.find('pattern', value);

      if (!_id) {
        _id = defs.addPattern(value);
      }

      el.setAttribute(SVG_ATTR_MAP[name], "url(#" + _id + ")");
    } else {
      el.setAttribute(SVG_ATTR_MAP[name], value);
    }
  };

  _proto._setShadow = function _setShadow(model) {
    var el = model._cfg.el;
    var attrs = model._attrs;
    var cfg = {
      dx: attrs.shadowOffsetX,
      dy: attrs.shadowOffsetY,
      blur: attrs.shadowBlur,
      color: attrs.shadowColor
    };

    if (!cfg.dx && !cfg.dy && !cfg.blur && !cfg.color) {
      el.removeAttribute('filter');
    } else {
      var id = this.context.find('filter', cfg);

      if (!id) {
        id = this.context.addShadow(cfg, this);
      }

      el.setAttribute('filter', "url(#" + id + ")");
    }
  };

  return Painter;
}();

module.exports = Painter;

/***/ }),

/***/ "./node_modules/@antv/g/lib/shapes/arc.js":
/*!************************************************!*\
  !*** ./node_modules/@antv/g/lib/shapes/arc.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(/*! ../util/index */ "./node_modules/@antv/g/lib/util/index.js");

var Shape = __webpack_require__(/*! ../core/shape */ "./node_modules/@antv/g/lib/core/shape.js");

var ArcMath = __webpack_require__(/*! ./math/arc */ "./node_modules/@antv/g/lib/shapes/math/arc.js");

var Arrow = __webpack_require__(/*! ./util/arrow */ "./node_modules/@antv/g/lib/shapes/util/arrow.js");

function _getArcX(x, radius, angle) {
  return x + radius * Math.cos(angle);
}

function _getArcY(y, radius, angle) {
  return y + radius * Math.sin(angle);
}

var Arc = function Arc(cfg) {
  Arc.superclass.constructor.call(this, cfg);
};

Arc.ATTRS = {
  x: 0,
  y: 0,
  r: 0,
  startAngle: 0,
  endAngle: 0,
  clockwise: false,
  lineWidth: 1,
  startArrow: false,
  endArrow: false
};
Util.extend(Arc, Shape);
Util.augment(Arc, {
  canStroke: true,
  type: 'arc',
  getDefaultAttrs: function getDefaultAttrs() {
    return {
      x: 0,
      y: 0,
      r: 0,
      startAngle: 0,
      endAngle: 0,
      clockwise: false,
      lineWidth: 1,
      startArrow: false,
      endArrow: false
    };
  },
  calculateBox: function calculateBox() {
    var attrs = this._attrs;
    var x = attrs.x,
        y = attrs.y,
        r = attrs.r,
        startAngle = attrs.startAngle,
        endAngle = attrs.endAngle,
        clockwise = attrs.clockwise;
    var lineWidth = this.getHitLineWidth();
    var halfWidth = lineWidth / 2;
    var box = ArcMath.box(x, y, r, startAngle, endAngle, clockwise);
    box.minX -= halfWidth;
    box.minY -= halfWidth;
    box.maxX += halfWidth;
    box.maxY += halfWidth;
    return box;
  },
  getStartTangent: function getStartTangent() {
    var attrs = this._attrs;
    var x = attrs.x,
        y = attrs.y,
        startAngle = attrs.startAngle,
        r = attrs.r,
        clockwise = attrs.clockwise;
    var diff = Math.PI / 180;

    if (clockwise) {
      diff *= -1;
    }

    var result = [];

    var x1 = _getArcX(x, r, startAngle + diff);

    var y1 = _getArcY(y, r, startAngle + diff);

    var x2 = _getArcX(x, r, startAngle);

    var y2 = _getArcY(y, r, startAngle);

    result.push([x1, y1]);
    result.push([x2, y2]);
    return result;
  },
  getEndTangent: function getEndTangent() {
    var attrs = this._attrs;
    var x = attrs.x,
        y = attrs.y,
        endAngle = attrs.endAngle,
        r = attrs.r,
        clockwise = attrs.clockwise;
    var diff = Math.PI / 180;
    var result = [];

    if (clockwise) {
      diff *= -1;
    }

    var x1 = _getArcX(x, r, endAngle + diff);

    var y1 = _getArcY(y, r, endAngle + diff);

    var x2 = _getArcX(x, r, endAngle);

    var y2 = _getArcY(y, r, endAngle);

    result.push([x2, y2]);
    result.push([x1, y1]);
    return result;
  },
  createPath: function createPath(context) {
    var attrs = this._attrs;
    var x = attrs.x,
        y = attrs.y,
        r = attrs.r,
        startAngle = attrs.startAngle,
        endAngle = attrs.endAngle,
        clockwise = attrs.clockwise;
    context = context || self.get('context');
    context.beginPath();
    context.arc(x, y, r, startAngle, endAngle, clockwise);
  },
  afterPath: function afterPath(context) {
    var attrs = this._attrs;
    context = context || this.get('context');

    if (attrs.startArrow) {
      var startPoints = this.getStartTangent();
      Arrow.addStartArrow(context, attrs, startPoints[0][0], startPoints[0][1], startPoints[1][0], startPoints[1][1]);
    }

    if (attrs.endArrow) {
      var endPoints = this.getEndTangent();
      Arrow.addEndArrow(context, attrs, endPoints[0][0], endPoints[0][1], endPoints[1][0], endPoints[1][1]);
    }
  }
});
module.exports = Arc;

/***/ }),

/***/ "./node_modules/@antv/g/lib/shapes/circle.js":
/*!***************************************************!*\
  !*** ./node_modules/@antv/g/lib/shapes/circle.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(/*! ../util/index */ "./node_modules/@antv/g/lib/util/index.js");

var Shape = __webpack_require__(/*! ../core/shape */ "./node_modules/@antv/g/lib/core/shape.js");

var Circle = function Circle(cfg) {
  Circle.superclass.constructor.call(this, cfg);
};

Circle.ATTRS = {
  x: 0,
  y: 0,
  r: 0,
  lineWidth: 1
};
Util.extend(Circle, Shape);
Util.augment(Circle, {
  canFill: true,
  canStroke: true,
  type: 'circle',
  getDefaultAttrs: function getDefaultAttrs() {
    return {
      lineWidth: 1
    };
  },
  calculateBox: function calculateBox() {
    var attrs = this._attrs;
    var cx = attrs.x;
    var cy = attrs.y;
    var r = attrs.r;
    var lineWidth = this.getHitLineWidth();
    var halfWidth = lineWidth / 2 + r;
    return {
      minX: cx - halfWidth,
      minY: cy - halfWidth,
      maxX: cx + halfWidth,
      maxY: cy + halfWidth
    };
  },
  createPath: function createPath(context) {
    var attrs = this._attrs;
    var cx = attrs.x;
    var cy = attrs.y;
    var r = attrs.r;
    context.beginPath();
    context.arc(cx, cy, r, 0, Math.PI * 2, false);
    context.closePath();
  }
});
module.exports = Circle;

/***/ }),

/***/ "./node_modules/@antv/g/lib/shapes/dom.js":
/*!************************************************!*\
  !*** ./node_modules/@antv/g/lib/shapes/dom.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(/*! ../util/index */ "./node_modules/@antv/g/lib/util/index.js");

var Shape = __webpack_require__(/*! ../core/shape */ "./node_modules/@antv/g/lib/core/shape.js");

var Dom = function Dom(cfg) {
  Dom.superclass.constructor.call(this, cfg);
};

Util.extend(Dom, Shape);
Util.augment(Dom, {
  canFill: true,
  canStroke: true,
  type: 'dom',
  calculateBox: function calculateBox() {
    var self = this;
    var attrs = self._attrs;
    var x = attrs.x;
    var y = attrs.y;
    var width = attrs.width;
    var height = attrs.height;
    var lineWidth = this.getHitLineWidth();
    var halfWidth = lineWidth / 2;
    return {
      minX: x - halfWidth,
      minY: y - halfWidth,
      maxX: x + width + halfWidth,
      maxY: y + height + halfWidth
    };
  }
});
module.exports = Dom;

/***/ }),

/***/ "./node_modules/@antv/g/lib/shapes/ellipse.js":
/*!****************************************************!*\
  !*** ./node_modules/@antv/g/lib/shapes/ellipse.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(/*! ../util/index */ "./node_modules/@antv/g/lib/util/index.js");

var Shape = __webpack_require__(/*! ../core/shape */ "./node_modules/@antv/g/lib/core/shape.js");

var Ellipse = function Ellipse(cfg) {
  Ellipse.superclass.constructor.call(this, cfg);
};

Ellipse.ATTRS = {
  x: 0,
  y: 0,
  rx: 1,
  ry: 1,
  lineWidth: 1
};
Util.extend(Ellipse, Shape);
Util.augment(Ellipse, {
  canFill: true,
  canStroke: true,
  type: 'ellipse',
  getDefaultAttrs: function getDefaultAttrs() {
    return {
      lineWidth: 1
    };
  },
  calculateBox: function calculateBox() {
    var attrs = this._attrs;
    var cx = attrs.x;
    var cy = attrs.y;
    var rx = attrs.rx;
    var ry = attrs.ry;
    var lineWidth = this.getHitLineWidth();
    var halfXWidth = rx + lineWidth / 2;
    var halfYWidth = ry + lineWidth / 2;
    return {
      minX: cx - halfXWidth,
      minY: cy - halfYWidth,
      maxX: cx + halfXWidth,
      maxY: cy + halfYWidth
    };
  },
  createPath: function createPath(context) {
    var attrs = this._attrs;
    var cx = attrs.x;
    var cy = attrs.y;
    var rx = attrs.rx;
    var ry = attrs.ry;
    context = context || self.get('context');
    var r = rx > ry ? rx : ry;
    var scaleX = rx > ry ? 1 : rx / ry;
    var scaleY = rx > ry ? ry / rx : 1;
    var m = [1, 0, 0, 0, 1, 0, 0, 0, 1];
    Util.mat3.scale(m, m, [scaleX, scaleY]);
    Util.mat3.translate(m, m, [cx, cy]);
    context.beginPath();
    context.save();
    context.transform(m[0], m[1], m[3], m[4], m[6], m[7]);
    context.arc(0, 0, r, 0, Math.PI * 2);
    context.restore();
    context.closePath();
  }
});
module.exports = Ellipse;

/***/ }),

/***/ "./node_modules/@antv/g/lib/shapes/fan.js":
/*!************************************************!*\
  !*** ./node_modules/@antv/g/lib/shapes/fan.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(/*! ../util/index */ "./node_modules/@antv/g/lib/util/index.js");

var Shape = __webpack_require__(/*! ../core/shape */ "./node_modules/@antv/g/lib/core/shape.js");

var ArcMath = __webpack_require__(/*! ./math/arc */ "./node_modules/@antv/g/lib/shapes/math/arc.js");

var Fan = function Fan(cfg) {
  Fan.superclass.constructor.call(this, cfg);
};

Fan.ATTRS = {
  x: 0,
  y: 0,
  rs: 0,
  re: 0,
  startAngle: 0,
  endAngle: 0,
  clockwise: false,
  lineWidth: 1
};
Util.extend(Fan, Shape);
Util.augment(Fan, {
  canFill: true,
  canStroke: true,
  type: 'fan',
  getDefaultAttrs: function getDefaultAttrs() {
    return {
      clockwise: false,
      lineWidth: 1,
      rs: 0,
      re: 0
    };
  },
  calculateBox: function calculateBox() {
    var self = this;
    var attrs = self._attrs;
    var cx = attrs.x;
    var cy = attrs.y;
    var rs = attrs.rs;
    var re = attrs.re;
    var startAngle = attrs.startAngle;
    var endAngle = attrs.endAngle;
    var clockwise = attrs.clockwise;
    var lineWidth = this.getHitLineWidth();
    var boxs = ArcMath.box(cx, cy, rs, startAngle, endAngle, clockwise);
    var boxe = ArcMath.box(cx, cy, re, startAngle, endAngle, clockwise);
    var minX = Math.min(boxs.minX, boxe.minX);
    var minY = Math.min(boxs.minY, boxe.minY);
    var maxX = Math.max(boxs.maxX, boxe.maxX);
    var maxY = Math.max(boxs.maxY, boxe.maxY);
    var halfWidth = lineWidth / 2;
    return {
      minX: minX - halfWidth,
      minY: minY - halfWidth,
      maxX: maxX + halfWidth,
      maxY: maxY + halfWidth
    };
  },
  createPath: function createPath(context) {
    var attrs = this._attrs;
    var cx = attrs.x;
    var cy = attrs.y;
    var rs = attrs.rs;
    var re = attrs.re;
    var startAngle = attrs.startAngle;
    var endAngle = attrs.endAngle;
    var clockwise = attrs.clockwise;
    var ssp = {
      x: Math.cos(startAngle) * rs + cx,
      y: Math.sin(startAngle) * rs + cy
    };
    var sep = {
      x: Math.cos(startAngle) * re + cx,
      y: Math.sin(startAngle) * re + cy
    };
    var esp = {
      x: Math.cos(endAngle) * rs + cx,
      y: Math.sin(endAngle) * rs + cy
    };
    context = context || self.get('context');
    context.beginPath();
    context.moveTo(ssp.x, ssp.y);
    context.lineTo(sep.x, sep.y);
    context.arc(cx, cy, re, startAngle, endAngle, clockwise);
    context.lineTo(esp.x, esp.y);
    context.arc(cx, cy, rs, endAngle, startAngle, !clockwise);
    context.closePath();
  }
});
module.exports = Fan;

/***/ }),

/***/ "./node_modules/@antv/g/lib/shapes/image.js":
/*!**************************************************!*\
  !*** ./node_modules/@antv/g/lib/shapes/image.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(/*! ../util/index */ "./node_modules/@antv/g/lib/util/index.js");

var Shape = __webpack_require__(/*! ../core/shape */ "./node_modules/@antv/g/lib/core/shape.js");

var CImage = function CImage(cfg) {
  CImage.superclass.constructor.call(this, cfg);
};

CImage.ATTRS = {
  x: 0,
  y: 0,
  img: undefined,
  width: 0,
  height: 0,
  sx: null,
  sy: null,
  swidth: null,
  sheight: null
};
Util.extend(CImage, Shape);
Util.augment(CImage, {
  type: 'image',
  isHitBox: function isHitBox() {
    return false;
  },
  calculateBox: function calculateBox() {
    var attrs = this._attrs;

    if (!this._cfg.attrs || this._cfg.attrs.img !== attrs.img) {
      this._setAttrImg();
    }

    var x = attrs.x;
    var y = attrs.y;
    var width = attrs.width;
    var height = attrs.height;
    return {
      minX: x,
      minY: y,
      maxX: x + width,
      maxY: y + height
    };
  },
  _beforeSetLoading: function _beforeSetLoading(loading) {
    var canvas = this.get('canvas');

    if (loading === false && this.get('toDraw') === true) {
      this._cfg.loading = false;
      canvas.draw();
    }

    return loading;
  },
  _setAttrImg: function _setAttrImg() {
    var self = this;
    var attrs = self._attrs;
    var img = attrs.img;

    if (Util.isString(img)) {
      var image = new Image();

      image.onload = function () {
        if (self.get('destroyed')) return false;
        self.attr('imgSrc', img);
        self.attr('img', image);
        var callback = self.get('callback');

        if (callback) {
          callback.call(self);
        }

        self.set('loading', false);
      };

      image.src = img;
      image.crossOrigin = 'Anonymous';
      self.set('loading', true);
    } else if (img instanceof Image) {
      if (!attrs.width) {
        self.attr('width', img.width);
      }

      if (!attrs.height) {
        self.attr('height', img.height);
      }

      return img;
    } else if (img instanceof HTMLElement && Util.isString(img.nodeName) && img.nodeName.toUpperCase() === 'CANVAS') {
      if (!attrs.width) {
        self.attr('width', Number(img.getAttribute('width')));
      }

      if (!attrs.height) {
        self.attr('height', Number(img.getAttribute('height')));
      }

      return img;
    } else if (img instanceof ImageData) {
      if (!attrs.width) {
        self.attr('width', img.width);
      }

      if (!attrs.height) {
        self.attr('height', img.height);
      }

      return img;
    } else {
      return null;
    }
  },
  drawInner: function drawInner(context) {
    if (this._cfg.hasUpdate) {
      this._setAttrImg();
    }

    if (this.get('loading')) {
      this.set('toDraw', true);
      return;
    }

    this._drawImage(context);

    this._cfg.hasUpdate = false;
  },
  _drawImage: function _drawImage(context) {
    var attrs = this._attrs;
    var x = attrs.x;
    var y = attrs.y;
    var image = attrs.img;
    var width = attrs.width;
    var height = attrs.height;
    var sx = attrs.sx;
    var sy = attrs.sy;
    var swidth = attrs.swidth;
    var sheight = attrs.sheight;
    this.set('toDraw', false);
    var img = image;

    if (img instanceof ImageData) {
      img = new Image();
      img.src = image;
    }

    if (img instanceof Image || img instanceof HTMLElement && Util.isString(img.nodeName) && img.nodeName.toUpperCase() === 'CANVAS') {
      if (Util.isNil(sx) || Util.isNil(sy) || Util.isNil(swidth) || Util.isNil(sheight)) {
        context.drawImage(img, x, y, width, height);
        return;
      }

      if (!Util.isNil(sx) && !Util.isNil(sy) && !Util.isNil(swidth) && !Util.isNil(sheight)) {
        context.drawImage(img, sx, sy, swidth, sheight, x, y, width, height);
        return;
      }
    }

    return;
  }
});
module.exports = CImage;

/***/ }),

/***/ "./node_modules/@antv/g/lib/shapes/index.js":
/*!**************************************************!*\
  !*** ./node_modules/@antv/g/lib/shapes/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Shape = __webpack_require__(/*! ../core/shape */ "./node_modules/@antv/g/lib/core/shape.js");

Shape.Arc = __webpack_require__(/*! ./arc */ "./node_modules/@antv/g/lib/shapes/arc.js");
Shape.Circle = __webpack_require__(/*! ./circle */ "./node_modules/@antv/g/lib/shapes/circle.js");
Shape.Dom = __webpack_require__(/*! ./dom */ "./node_modules/@antv/g/lib/shapes/dom.js");
Shape.Ellipse = __webpack_require__(/*! ./ellipse */ "./node_modules/@antv/g/lib/shapes/ellipse.js");
Shape.Fan = __webpack_require__(/*! ./fan */ "./node_modules/@antv/g/lib/shapes/fan.js");
Shape.Image = __webpack_require__(/*! ./image */ "./node_modules/@antv/g/lib/shapes/image.js");
Shape.Line = __webpack_require__(/*! ./line */ "./node_modules/@antv/g/lib/shapes/line.js");
Shape.Marker = __webpack_require__(/*! ./marker */ "./node_modules/@antv/g/lib/shapes/marker.js");
Shape.Path = __webpack_require__(/*! ./path */ "./node_modules/@antv/g/lib/shapes/path.js");
Shape.Polygon = __webpack_require__(/*! ./polygon */ "./node_modules/@antv/g/lib/shapes/polygon.js");
Shape.Polyline = __webpack_require__(/*! ./polyline */ "./node_modules/@antv/g/lib/shapes/polyline.js");
Shape.Rect = __webpack_require__(/*! ./rect */ "./node_modules/@antv/g/lib/shapes/rect.js");
Shape.Text = __webpack_require__(/*! ./text */ "./node_modules/@antv/g/lib/shapes/text.js");
module.exports = Shape;

/***/ }),

/***/ "./node_modules/@antv/g/lib/shapes/line.js":
/*!*************************************************!*\
  !*** ./node_modules/@antv/g/lib/shapes/line.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(/*! ../util/index */ "./node_modules/@antv/g/lib/util/index.js");

var Shape = __webpack_require__(/*! ../core/shape */ "./node_modules/@antv/g/lib/core/shape.js");

var Arrow = __webpack_require__(/*! ./util/arrow */ "./node_modules/@antv/g/lib/shapes/util/arrow.js");

var LineMath = __webpack_require__(/*! ./math/line */ "./node_modules/@antv/g/lib/shapes/math/line.js");

var Line = function Line(cfg) {
  Line.superclass.constructor.call(this, cfg);
};

Line.ATTRS = {
  x1: 0,
  y1: 0,
  x2: 0,
  y2: 0,
  lineWidth: 1,
  startArrow: false,
  endArrow: false
};
Util.extend(Line, Shape);
Util.augment(Line, {
  canStroke: true,
  type: 'line',
  getDefaultAttrs: function getDefaultAttrs() {
    return {
      lineWidth: 1,
      startArrow: false,
      endArrow: false
    };
  },
  calculateBox: function calculateBox() {
    var attrs = this._attrs;
    var x1 = attrs.x1,
        y1 = attrs.y1,
        x2 = attrs.x2,
        y2 = attrs.y2;
    var lineWidth = this.getHitLineWidth();
    return LineMath.box(x1, y1, x2, y2, lineWidth);
  },
  createPath: function createPath(context) {
    var attrs = this._attrs;
    var x1 = attrs.x1,
        y1 = attrs.y1,
        x2 = attrs.x2,
        y2 = attrs.y2;
    context = context || self.get('context');
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
  },
  afterPath: function afterPath(context) {
    var attrs = this._attrs;
    var x1 = attrs.x1,
        y1 = attrs.y1,
        x2 = attrs.x2,
        y2 = attrs.y2;
    context = context || this.get('context');

    if (attrs.startArrow) {
      Arrow.addStartArrow(context, attrs, x2, y2, x1, y1);
    }

    if (attrs.endArrow) {
      Arrow.addEndArrow(context, attrs, x1, y1, x2, y2);
    }
  },
  getPoint: function getPoint(t) {
    var attrs = this._attrs;
    return {
      x: LineMath.at(attrs.x1, attrs.x2, t),
      y: LineMath.at(attrs.y1, attrs.y2, t)
    };
  }
});
module.exports = Line;

/***/ }),

/***/ "./node_modules/@antv/g/lib/shapes/marker.js":
/*!***************************************************!*\
  !*** ./node_modules/@antv/g/lib/shapes/marker.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(/*! ../util/index */ "./node_modules/@antv/g/lib/util/index.js");

var Shape = __webpack_require__(/*! ../core/shape */ "./node_modules/@antv/g/lib/core/shape.js");

var Format = __webpack_require__(/*! ../util/format */ "./node_modules/@antv/g/lib/util/format.js");

var PathSegment = __webpack_require__(/*! ./util/path-segment */ "./node_modules/@antv/g/lib/shapes/util/path-segment.js");

var Marker = function Marker(cfg) {
  Marker.superclass.constructor.call(this, cfg);
};

Marker.Symbols = {
  // 圆
  circle: function circle(x, y, r) {
    return [['M', x, y], ['m', -r, 0], ['a', r, r, 0, 1, 0, r * 2, 0], ['a', r, r, 0, 1, 0, -r * 2, 0]];
  },
  // 正方形
  square: function square(x, y, r) {
    return [['M', x - r, y - r], ['L', x + r, y - r], ['L', x + r, y + r], ['L', x - r, y + r], ['Z']];
  },
  // 菱形
  diamond: function diamond(x, y, r) {
    return [['M', x - r, y], ['L', x, y - r], ['L', x + r, y], ['L', x, y + r], ['Z']];
  },
  // 三角形
  triangle: function triangle(x, y, r) {
    var diffY = r * Math.sin(1 / 3 * Math.PI);
    return [['M', x - r, y + diffY], ['L', x, y - diffY], ['L', x + r, y + diffY], ['z']];
  },
  // 倒三角形
  'triangle-down': function triangleDown(x, y, r) {
    var diffY = r * Math.sin(1 / 3 * Math.PI);
    return [['M', x - r, y - diffY], ['L', x + r, y - diffY], ['L', x, y + diffY], ['Z']];
  }
};
Marker.ATTRS = {
  path: null,
  lineWidth: 1
};
Util.extend(Marker, Shape);
Util.augment(Marker, {
  type: 'marker',
  canFill: true,
  canStroke: true,
  getDefaultAttrs: function getDefaultAttrs() {
    return {
      x: 0,
      y: 0,
      lineWidth: 1
    };
  },
  calculateBox: function calculateBox() {
    var attrs = this._attrs;
    var cx = attrs.x;
    var cy = attrs.y;
    var r = attrs.radius;
    var lineWidth = this.getHitLineWidth();
    var halfWidth = lineWidth / 2 + r;
    return {
      minX: cx - halfWidth,
      minY: cy - halfWidth,
      maxX: cx + halfWidth,
      maxY: cy + halfWidth
    };
  },
  _getPath: function _getPath() {
    var attrs = this._attrs;
    var x = attrs.x;
    var y = attrs.y;
    var r = attrs.radius || attrs.r;
    var symbol = attrs.symbol || 'circle';
    var method;

    if (Util.isFunction(symbol)) {
      method = symbol;
    } else {
      method = Marker.Symbols[symbol];
    }

    if (!method) {
      console.warn(symbol + " marker is not supported.");
      return null;
    }

    return method(x, y, r);
  },
  createPath: function createPath(context) {
    var segments = this._cfg.segments;

    if (segments && !this._cfg.hasUpdate) {
      context.beginPath();

      for (var i = 0; i < segments.length; i++) {
        segments[i].draw(context);
      }

      return;
    }

    var path = Format.parsePath(this._getPath());
    context.beginPath();
    var preSegment;
    segments = [];

    for (var _i = 0; _i < path.length; _i++) {
      var item = path[_i];
      preSegment = new PathSegment(item, preSegment, _i === path.length - 1);
      segments.push(preSegment);
      preSegment.draw(context);
    }

    this._cfg.segments = segments;
    this._cfg.hasUpdate = false;
  }
});
module.exports = Marker;

/***/ }),

/***/ "./node_modules/@antv/g/lib/shapes/math/arc.js":
/*!*****************************************************!*\
  !*** ./node_modules/@antv/g/lib/shapes/math/arc.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(/*! ../../util/index */ "./node_modules/@antv/g/lib/util/index.js");

function circlePoint(cx, cy, r, angle) {
  return {
    x: Math.cos(angle) * r + cx,
    y: Math.sin(angle) * r + cy
  };
}

function angleNearTo(angle, min, max, out) {
  var v1;
  var v2;

  if (out) {
    if (angle < min) {
      v1 = min - angle;
      v2 = Math.PI * 2 - max + angle;
    } else if (angle > max) {
      v1 = Math.PI * 2 - angle + min;
      v2 = angle - max;
    }
  } else {
    v1 = angle - min;
    v2 = max - angle;
  }

  return v1 > v2 ? max : min;
}

function nearAngle(angle, startAngle, endAngle, clockwise) {
  var plus = 0;

  if (endAngle - startAngle >= Math.PI * 2) {
    plus = Math.PI * 2;
  }

  startAngle = Util.mod(startAngle, Math.PI * 2);
  endAngle = Util.mod(endAngle, Math.PI * 2) + plus;
  angle = Util.mod(angle, Math.PI * 2);

  if (clockwise) {
    if (startAngle >= endAngle) {
      if (angle > endAngle && angle < startAngle) {
        return angle;
      }

      return angleNearTo(angle, endAngle, startAngle, true);
    }

    if (angle < startAngle || angle > endAngle) {
      return angle;
    }

    return angleNearTo(angle, startAngle, endAngle);
  }

  if (startAngle <= endAngle) {
    if (startAngle < angle && angle < endAngle) {
      return angle;
    }

    return angleNearTo(angle, startAngle, endAngle, true);
  }

  if (angle > startAngle || angle < endAngle) {
    return angle;
  }

  return angleNearTo(angle, endAngle, startAngle);
}

function arcProjectPoint(cx, cy, r, startAngle, endAngle, clockwise, x, y, out) {
  var v = [x, y];
  var v0 = [cx, cy];
  var v1 = [1, 0];
  var subv = Util.vec2.subtract([], v, v0);
  var angle = Util.vec2.angleTo(v1, subv);
  angle = nearAngle(angle, startAngle, endAngle, clockwise);
  var vpoint = [r * Math.cos(angle) + cx, r * Math.sin(angle) + cy];

  if (out) {
    out.x = vpoint[0];
    out.y = vpoint[1];
  }

  var d = Util.vec2.distance(vpoint, v);
  return d;
}

function arcBox(cx, cy, r, startAngle, endAngle, clockwise) {
  var angleRight = 0;
  var angleBottom = Math.PI / 2;
  var angleLeft = Math.PI;
  var angleTop = Math.PI * 3 / 2;
  var points = [];
  var angle = nearAngle(angleRight, startAngle, endAngle, clockwise);

  if (angle === angleRight) {
    points.push(circlePoint(cx, cy, r, angleRight));
  }

  angle = nearAngle(angleBottom, startAngle, endAngle, clockwise);

  if (angle === angleBottom) {
    points.push(circlePoint(cx, cy, r, angleBottom));
  }

  angle = nearAngle(angleLeft, startAngle, endAngle, clockwise);

  if (angle === angleLeft) {
    points.push(circlePoint(cx, cy, r, angleLeft));
  }

  angle = nearAngle(angleTop, startAngle, endAngle, clockwise);

  if (angle === angleTop) {
    points.push(circlePoint(cx, cy, r, angleTop));
  }

  points.push(circlePoint(cx, cy, r, startAngle));
  points.push(circlePoint(cx, cy, r, endAngle));
  var minX = Infinity;
  var maxX = -Infinity;
  var minY = Infinity;
  var maxY = -Infinity;
  Util.each(points, function (point) {
    if (minX > point.x) {
      minX = point.x;
    }

    if (maxX < point.x) {
      maxX = point.x;
    }

    if (minY > point.y) {
      minY = point.y;
    }

    if (maxY < point.y) {
      maxY = point.y;
    }
  });
  return {
    minX: minX,
    minY: minY,
    maxX: maxX,
    maxY: maxY
  };
}

module.exports = {
  nearAngle: nearAngle,
  projectPoint: function projectPoint(cx, cy, r, startAngle, endAngle, clockwise, x, y) {
    var rst = {};
    arcProjectPoint(cx, cy, r, startAngle, endAngle, clockwise, x, y, rst);
    return rst;
  },
  pointDistance: arcProjectPoint,
  box: arcBox
};

/***/ }),

/***/ "./node_modules/@antv/g/lib/shapes/math/cubic.js":
/*!*******************************************************!*\
  !*** ./node_modules/@antv/g/lib/shapes/math/cubic.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(/*! ../../util/index */ "./node_modules/@antv/g/lib/util/index.js");

var vec2 = Util.vec2;

function cubicAt(p0, p1, p2, p3, t) {
  var onet = 1 - t;
  return onet * onet * (onet * p3 + 3 * t * p2) + t * t * (t * p0 + 3 * onet * p1);
}

function cubicDerivativeAt(p0, p1, p2, p3, t) {
  var onet = 1 - t;
  return 3 * (((p1 - p0) * onet + 2 * (p2 - p1) * t) * onet + (p3 - p2) * t * t);
}

function cubicProjectPoint(x1, y1, x2, y2, x3, y3, x4, y4, x, y, out) {
  var t;
  var interval = 0.005;
  var d = Infinity;

  var _t;

  var v1;
  var d1;
  var d2;
  var v2;
  var prev;
  var next;
  var EPSILON = 0.0001;
  var v0 = [x, y];

  for (_t = 0; _t < 1; _t += 0.05) {
    v1 = [cubicAt(x1, x2, x3, x4, _t), cubicAt(y1, y2, y3, y4, _t)];
    d1 = vec2.squaredDistance(v0, v1);

    if (d1 < d) {
      t = _t;
      d = d1;
    }
  }

  d = Infinity;

  for (var i = 0; i < 32; i++) {
    if (interval < EPSILON) {
      break;
    }

    prev = t - interval;
    next = t + interval;
    v1 = [cubicAt(x1, x2, x3, x4, prev), cubicAt(y1, y2, y3, y4, prev)];
    d1 = vec2.squaredDistance(v0, v1);

    if (prev >= 0 && d1 < d) {
      t = prev;
      d = d1;
    } else {
      v2 = [cubicAt(x1, x2, x3, x4, next), cubicAt(y1, y2, y3, y4, next)];
      d2 = vec2.squaredDistance(v0, v2);

      if (next <= 1 && d2 < d) {
        t = next;
        d = d2;
      } else {
        interval *= 0.5;
      }
    }
  }

  if (out) {
    out.x = cubicAt(x1, x2, x3, x4, t);
    out.y = cubicAt(y1, y2, y3, y4, t);
  }

  return Math.sqrt(d);
}

function cubicExtrema(p0, p1, p2, p3) {
  var a = 3 * p0 - 9 * p1 + 9 * p2 - 3 * p3;
  var b = 6 * p1 - 12 * p2 + 6 * p3;
  var c = 3 * p2 - 3 * p3;
  var extrema = [];
  var t1;
  var t2;
  var discSqrt;

  if (Util.isNumberEqual(a, 0)) {
    if (!Util.isNumberEqual(b, 0)) {
      t1 = -c / b;

      if (t1 >= 0 && t1 <= 1) {
        extrema.push(t1);
      }
    }
  } else {
    var disc = b * b - 4 * a * c;

    if (Util.isNumberEqual(disc, 0)) {
      extrema.push(-b / (2 * a));
    } else if (disc > 0) {
      discSqrt = Math.sqrt(disc);
      t1 = (-b + discSqrt) / (2 * a);
      t2 = (-b - discSqrt) / (2 * a);

      if (t1 >= 0 && t1 <= 1) {
        extrema.push(t1);
      }

      if (t2 >= 0 && t2 <= 1) {
        extrema.push(t2);
      }
    }
  }

  return extrema;
}

function base3(t, p1, p2, p3, p4) {
  var t1 = -3 * p1 + 9 * p2 - 9 * p3 + 3 * p4;
  var t2 = t * t1 + 6 * p1 - 12 * p2 + 6 * p3;
  return t * t2 - 3 * p1 + 3 * p2;
}

function cubiclLen(x1, y1, x2, y2, x3, y3, x4, y4, z) {
  if (Util.isNil(z)) {
    z = 1;
  }

  z = z > 1 ? 1 : z < 0 ? 0 : z;
  var z2 = z / 2;
  var n = 12;
  var Tvalues = [-0.1252, 0.1252, -0.3678, 0.3678, -0.5873, 0.5873, -0.7699, 0.7699, -0.9041, 0.9041, -0.9816, 0.9816];
  var Cvalues = [0.2491, 0.2491, 0.2335, 0.2335, 0.2032, 0.2032, 0.1601, 0.1601, 0.1069, 0.1069, 0.0472, 0.0472];
  var sum = 0;

  for (var i = 0; i < n; i++) {
    var ct = z2 * Tvalues[i] + z2;
    var xbase = base3(ct, x1, x2, x3, x4);
    var ybase = base3(ct, y1, y2, y3, y4);
    var comb = xbase * xbase + ybase * ybase;
    sum += Cvalues[i] * Math.sqrt(comb);
  }

  return z2 * sum;
}

module.exports = {
  at: cubicAt,
  derivativeAt: cubicDerivativeAt,
  projectPoint: function projectPoint(x1, y1, x2, y2, x3, y3, x4, y4, x, y) {
    var rst = {};
    cubicProjectPoint(x1, y1, x2, y2, x3, y3, x4, y4, x, y, rst);
    return rst;
  },
  pointDistance: cubicProjectPoint,
  extrema: cubicExtrema,
  len: cubiclLen
};

/***/ }),

/***/ "./node_modules/@antv/g/lib/shapes/math/ellipse.js":
/*!*********************************************************!*\
  !*** ./node_modules/@antv/g/lib/shapes/math/ellipse.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  xAt: function xAt(psi, rx, ry, cx, t) {
    return rx * Math.cos(psi) * Math.cos(t) - ry * Math.sin(psi) * Math.sin(t) + cx;
  },
  yAt: function yAt(psi, rx, ry, cy, t) {
    return rx * Math.sin(psi) * Math.cos(t) + ry * Math.cos(psi) * Math.sin(t) + cy;
  },
  xExtrema: function xExtrema(psi, rx, ry) {
    return Math.atan(-ry / rx * Math.tan(psi));
  },
  yExtrema: function yExtrema(psi, rx, ry) {
    return Math.atan(ry / (rx * Math.tan(psi)));
  }
};

/***/ }),

/***/ "./node_modules/@antv/g/lib/shapes/math/line.js":
/*!******************************************************!*\
  !*** ./node_modules/@antv/g/lib/shapes/math/line.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var vec2 = __webpack_require__(/*! ../../util/index */ "./node_modules/@antv/g/lib/util/index.js").vec2;

module.exports = {
  at: function at(p1, p2, t) {
    return (p2 - p1) * t + p1;
  },
  pointDistance: function pointDistance(x1, y1, x2, y2, x, y) {
    var d = [x2 - x1, y2 - y1];

    if (vec2.exactEquals(d, [0, 0])) {
      return NaN;
    }

    var u = [-d[1], d[0]];
    vec2.normalize(u, u);
    var a = [x - x1, y - y1];
    return Math.abs(vec2.dot(a, u));
  },
  box: function box(x1, y1, x2, y2, lineWidth) {
    var halfWidth = lineWidth / 2;
    var minX = Math.min(x1, x2);
    var maxX = Math.max(x1, x2);
    var minY = Math.min(y1, y2);
    var maxY = Math.max(y1, y2);
    return {
      minX: minX - halfWidth,
      minY: minY - halfWidth,
      maxX: maxX + halfWidth,
      maxY: maxY + halfWidth
    };
  },
  len: function len(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
  }
};

/***/ }),

/***/ "./node_modules/@antv/g/lib/shapes/math/quadratic.js":
/*!***********************************************************!*\
  !*** ./node_modules/@antv/g/lib/shapes/math/quadratic.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(/*! ../../util/index */ "./node_modules/@antv/g/lib/util/index.js");

var vec2 = Util.vec2;

function quadraticAt(p0, p1, p2, t) {
  var onet = 1 - t;
  return onet * (onet * p0 + 2 * t * p1) + t * t * p2;
}

function quadraticProjectPoint(x1, y1, x2, y2, x3, y3, x, y, out) {
  var t;
  var interval = 0.005;
  var d = Infinity;
  var d1;
  var v1;
  var v2;

  var _t;

  var d2;
  var i;
  var EPSILON = 0.0001;
  var v0 = [x, y];

  for (_t = 0; _t < 1; _t += 0.05) {
    v1 = [quadraticAt(x1, x2, x3, _t), quadraticAt(y1, y2, y3, _t)];
    d1 = vec2.squaredDistance(v0, v1);

    if (d1 < d) {
      t = _t;
      d = d1;
    }
  }

  d = Infinity;

  for (i = 0; i < 32; i++) {
    if (interval < EPSILON) {
      break;
    }

    var prev = t - interval;
    var next = t + interval;
    v1 = [quadraticAt(x1, x2, x3, prev), quadraticAt(y1, y2, y3, prev)];
    d1 = vec2.squaredDistance(v0, v1);

    if (prev >= 0 && d1 < d) {
      t = prev;
      d = d1;
    } else {
      v2 = [quadraticAt(x1, x2, x3, next), quadraticAt(y1, y2, y3, next)];
      d2 = vec2.squaredDistance(v0, v2);

      if (next <= 1 && d2 < d) {
        t = next;
        d = d2;
      } else {
        interval *= 0.5;
      }
    }
  }

  if (out) {
    out.x = quadraticAt(x1, x2, x3, t);
    out.y = quadraticAt(y1, y2, y3, t);
  }

  return Math.sqrt(d);
}

function quadraticExtrema(p0, p1, p2) {
  var a = p0 + p2 - 2 * p1;

  if (Util.isNumberEqual(a, 0)) {
    return [0.5];
  }

  var rst = (p0 - p1) / a;

  if (rst <= 1 && rst >= 0) {
    return [rst];
  }

  return [];
}

module.exports = {
  at: quadraticAt,
  projectPoint: function projectPoint(x1, y1, x2, y2, x3, y3, x, y) {
    var rst = {};
    quadraticProjectPoint(x1, y1, x2, y2, x3, y3, x, y, rst);
    return rst;
  },
  pointDistance: quadraticProjectPoint,
  extrema: quadraticExtrema
};

/***/ }),

/***/ "./node_modules/@antv/g/lib/shapes/path.js":
/*!*************************************************!*\
  !*** ./node_modules/@antv/g/lib/shapes/path.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(/*! ../util/index */ "./node_modules/@antv/g/lib/util/index.js");

var Shape = __webpack_require__(/*! ../core/shape */ "./node_modules/@antv/g/lib/core/shape.js");

var PathSegment = __webpack_require__(/*! ./util/path-segment */ "./node_modules/@antv/g/lib/shapes/util/path-segment.js");

var Format = __webpack_require__(/*! ../util/format */ "./node_modules/@antv/g/lib/util/format.js");

var Arrow = __webpack_require__(/*! ./util/arrow */ "./node_modules/@antv/g/lib/shapes/util/arrow.js");

var PathUtil = __webpack_require__(/*! ../util/path */ "./node_modules/@antv/g/lib/util/path.js");

var CubicMath = __webpack_require__(/*! ./math/cubic */ "./node_modules/@antv/g/lib/shapes/math/cubic.js");

var Path = function Path(cfg) {
  Path.superclass.constructor.call(this, cfg);
};

Path.ATTRS = {
  path: null,
  lineWidth: 1,
  startArrow: false,
  endArrow: false
};
Util.extend(Path, Shape);
Util.augment(Path, {
  canFill: true,
  canStroke: true,
  type: 'path',
  getDefaultAttrs: function getDefaultAttrs() {
    return {
      lineWidth: 1,
      startArrow: false,
      endArrow: false
    };
  },
  _afterSetAttrPath: function _afterSetAttrPath(path) {
    var self = this;

    if (Util.isNil(path)) {
      self.setSilent('segments', null);
      self.setSilent('box', undefined);
      return;
    }

    var pathArray = Format.parsePath(path);
    var preSegment;
    var segments = [];

    if (!Util.isArray(pathArray) || pathArray.length === 0 || pathArray[0][0] !== 'M' && pathArray[0][0] !== 'm') {
      return;
    }

    var count = pathArray.length;

    for (var i = 0; i < pathArray.length; i++) {
      var item = pathArray[i];
      preSegment = new PathSegment(item, preSegment, i === count - 1);
      segments.push(preSegment);
    }

    self.setSilent('segments', segments);
    self.setSilent('tCache', null);
    self.setSilent('totalLength', null);
    self.setSilent('box', null);
  },
  calculateBox: function calculateBox() {
    var self = this;
    var segments = self.get('segments');

    if (!segments) {
      return null;
    }

    var lineWidth = this.getHitLineWidth();
    var minX = Infinity;
    var maxX = -Infinity;
    var minY = Infinity;
    var maxY = -Infinity;
    Util.each(segments, function (segment) {
      segment.getBBox(lineWidth);
      var box = segment.box;

      if (box) {
        if (box.minX < minX) {
          minX = box.minX;
        }

        if (box.maxX > maxX) {
          maxX = box.maxX;
        }

        if (box.minY < minY) {
          minY = box.minY;
        }

        if (box.maxY > maxY) {
          maxY = box.maxY;
        }
      }
    });

    if (minX === Infinity || minY === Infinity) {
      return {
        minX: 0,
        minY: 0,
        maxX: 0,
        maxY: 0
      };
    }

    return {
      minX: minX,
      minY: minY,
      maxX: maxX,
      maxY: maxY
    };
  },
  _setTcache: function _setTcache() {
    var totalLength = 0;
    var tempLength = 0;
    var tCache = [];
    var segmentT;
    var segmentL;
    var segmentN;
    var l;
    var curve = this._cfg.curve;

    if (!curve) {
      return;
    }

    Util.each(curve, function (segment, i) {
      segmentN = curve[i + 1];
      l = segment.length;

      if (segmentN) {
        totalLength += CubicMath.len(segment[l - 2], segment[l - 1], segmentN[1], segmentN[2], segmentN[3], segmentN[4], segmentN[5], segmentN[6]);
      }
    });
    this._cfg.totalLength = totalLength;

    if (totalLength === 0) {
      this._cfg.tCache = [];
      return;
    }

    Util.each(curve, function (segment, i) {
      segmentN = curve[i + 1];
      l = segment.length;

      if (segmentN) {
        segmentT = [];
        segmentT[0] = tempLength / totalLength;
        segmentL = CubicMath.len(segment[l - 2], segment[l - 1], segmentN[1], segmentN[2], segmentN[3], segmentN[4], segmentN[5], segmentN[6]);
        tempLength += segmentL;
        segmentT[1] = tempLength / totalLength;
        tCache.push(segmentT);
      }
    });
    this._cfg.tCache = tCache;
  },
  getTotalLength: function getTotalLength() {
    var totalLength = this.get('totalLength');

    if (!Util.isNil(totalLength)) {
      return totalLength;
    }

    this._calculateCurve();

    this._setTcache();

    return this.get('totalLength');
  },
  _calculateCurve: function _calculateCurve() {
    var self = this;
    var attrs = self._attrs;
    var path = attrs.path;
    this._cfg.curve = PathUtil.pathTocurve(path);
  },
  getStartTangent: function getStartTangent() {
    var segments = this.get('segments');
    var startPoint, endPoint, tangent, result;

    if (segments.length > 1) {
      startPoint = segments[0].endPoint;
      endPoint = segments[1].endPoint;
      tangent = segments[1].startTangent;
      result = [];

      if (Util.isFunction(tangent)) {
        var v = tangent();
        result.push([startPoint.x - v[0], startPoint.y - v[1]]);
        result.push([startPoint.x, startPoint.y]);
      } else {
        result.push([endPoint.x, endPoint.y]);
        result.push([startPoint.x, startPoint.y]);
      }
    }

    return result;
  },
  getEndTangent: function getEndTangent() {
    var segments = this.get('segments');
    var segmentsLen = segments.length;
    var startPoint, endPoint, tangent, result;

    if (segmentsLen > 1) {
      startPoint = segments[segmentsLen - 2].endPoint;
      endPoint = segments[segmentsLen - 1].endPoint;
      tangent = segments[segmentsLen - 1].endTangent;
      result = [];

      if (Util.isFunction(tangent)) {
        var v = tangent();
        result.push([endPoint.x - v[0], endPoint.y - v[1]]);
        result.push([endPoint.x, endPoint.y]);
      } else {
        result.push([startPoint.x, startPoint.y]);
        result.push([endPoint.x, endPoint.y]);
      }
    }

    return result;
  },
  getPoint: function getPoint(t) {
    var tCache = this._cfg.tCache;
    var subt;
    var index;

    if (!tCache) {
      this._calculateCurve();

      this._setTcache();

      tCache = this._cfg.tCache;
    }

    var curve = this._cfg.curve;

    if (!tCache || tCache.length === 0) {
      if (curve) {
        return {
          x: curve[0][1],
          y: curve[0][2]
        };
      }

      return null;
    }

    Util.each(tCache, function (v, i) {
      if (t >= v[0] && t <= v[1]) {
        subt = (t - v[0]) / (v[1] - v[0]);
        index = i;
      }
    });
    var seg = curve[index];

    if (Util.isNil(seg) || Util.isNil(index)) {
      return null;
    }

    var l = seg.length;
    var nextSeg = curve[index + 1];
    return {
      x: CubicMath.at(seg[l - 2], nextSeg[1], nextSeg[3], nextSeg[5], 1 - subt),
      y: CubicMath.at(seg[l - 1], nextSeg[2], nextSeg[4], nextSeg[6], 1 - subt)
    };
  },
  createPath: function createPath(context) {
    var self = this;
    var segments = self.get('segments');

    if (!Util.isArray(segments)) {
      return;
    }

    context = context || self.get('context');
    context.beginPath();
    var segmentsLen = segments.length;

    for (var i = 0; i < segmentsLen; i++) {
      segments[i].draw(context);
    }
  },
  afterPath: function afterPath(context) {
    var self = this;
    var attrs = self._attrs;
    var segments = self.get('segments');
    var path = attrs.path;
    context = context || self.get('context');

    if (!Util.isArray(segments)) {
      return;
    }

    if (segments.length === 1) {
      return;
    }

    if (!attrs.startArrow && !attrs.endArrow) {
      return;
    }

    if (path[path.length - 1] === 'z' || path[path.length - 1] === 'Z' || attrs.fill) {
      // 闭合路径不绘制箭头
      return;
    }

    var startPoints = self.getStartTangent();
    Arrow.addStartArrow(context, attrs, startPoints[0][0], startPoints[0][1], startPoints[1][0], startPoints[1][1]);
    var endPoints = self.getEndTangent();
    Arrow.addEndArrow(context, attrs, endPoints[0][0], endPoints[0][1], endPoints[1][0], endPoints[1][1]);
  }
});
module.exports = Path;

/***/ }),

/***/ "./node_modules/@antv/g/lib/shapes/polygon.js":
/*!****************************************************!*\
  !*** ./node_modules/@antv/g/lib/shapes/polygon.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(/*! ../util/index */ "./node_modules/@antv/g/lib/util/index.js");

var Shape = __webpack_require__(/*! ../core/shape */ "./node_modules/@antv/g/lib/core/shape.js");

var Polygon = function Polygon(cfg) {
  Polygon.superclass.constructor.call(this, cfg);
};

Polygon.ATTRS = {
  points: null,
  lineWidth: 1
};
Util.extend(Polygon, Shape);
Util.augment(Polygon, {
  canFill: true,
  canStroke: true,
  type: 'polygon',
  getDefaultAttrs: function getDefaultAttrs() {
    return {
      lineWidth: 1
    };
  },
  calculateBox: function calculateBox() {
    var self = this;
    var attrs = self._attrs;
    var points = attrs.points;
    var lineWidth = this.getHitLineWidth();

    if (!points || points.length === 0) {
      return null;
    }

    var minX = Infinity;
    var minY = Infinity;
    var maxX = -Infinity;
    var maxY = -Infinity;
    Util.each(points, function (point) {
      var x = point[0];
      var y = point[1];

      if (x < minX) {
        minX = x;
      }

      if (x > maxX) {
        maxX = x;
      }

      if (y < minY) {
        minY = y;
      }

      if (y > maxY) {
        maxY = y;
      }
    });
    var halfWidth = lineWidth / 2;
    return {
      minX: minX - halfWidth,
      minY: minY - halfWidth,
      maxX: maxX + halfWidth,
      maxY: maxY + halfWidth
    };
  },
  createPath: function createPath(context) {
    var self = this;
    var attrs = self._attrs;
    var points = attrs.points;

    if (points.length < 2) {
      return;
    }

    context = context || self.get('context');
    context.beginPath();
    Util.each(points, function (point, index) {
      if (index === 0) {
        context.moveTo(point[0], point[1]);
      } else {
        context.lineTo(point[0], point[1]);
      }
    });
    context.closePath();
  }
});
module.exports = Polygon;

/***/ }),

/***/ "./node_modules/@antv/g/lib/shapes/polyline.js":
/*!*****************************************************!*\
  !*** ./node_modules/@antv/g/lib/shapes/polyline.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(/*! ../util/index */ "./node_modules/@antv/g/lib/util/index.js");

var Shape = __webpack_require__(/*! ../core/shape */ "./node_modules/@antv/g/lib/core/shape.js");

var Arrow = __webpack_require__(/*! ./util/arrow */ "./node_modules/@antv/g/lib/shapes/util/arrow.js");

var LineMath = __webpack_require__(/*! ./math/line */ "./node_modules/@antv/g/lib/shapes/math/line.js");

var Polyline = function Polyline(cfg) {
  Polyline.superclass.constructor.call(this, cfg);
};

Polyline.ATTRS = {
  points: null,
  lineWidth: 1,
  startArrow: false,
  endArrow: false,
  tCache: null
};
Util.extend(Polyline, Shape);
Util.augment(Polyline, {
  canStroke: true,
  type: 'polyline',
  tCache: null,
  // 缓存各点的t
  getDefaultAttrs: function getDefaultAttrs() {
    return {
      lineWidth: 1,
      startArrow: false,
      endArrow: false
    };
  },
  calculateBox: function calculateBox() {
    var self = this;
    var attrs = self._attrs;
    var lineWidth = this.getHitLineWidth();
    var points = attrs.points;

    if (!points || points.length === 0) {
      return null;
    }

    var minX = Infinity;
    var minY = Infinity;
    var maxX = -Infinity;
    var maxY = -Infinity;
    Util.each(points, function (point) {
      var x = point[0];
      var y = point[1];

      if (x < minX) {
        minX = x;
      }

      if (x > maxX) {
        maxX = x;
      }

      if (y < minY) {
        minY = y;
      }

      if (y > maxY) {
        maxY = y;
      }
    });
    var halfWidth = lineWidth / 2;
    return {
      minX: minX - halfWidth,
      minY: minY - halfWidth,
      maxX: maxX + halfWidth,
      maxY: maxY + halfWidth
    };
  },
  _setTcache: function _setTcache() {
    var self = this;
    var attrs = self._attrs;
    var points = attrs.points;
    var totalLength = 0;
    var tempLength = 0;
    var tCache = [];
    var segmentT;
    var segmentL;

    if (!points || points.length === 0) {
      return;
    }

    Util.each(points, function (p, i) {
      if (points[i + 1]) {
        totalLength += LineMath.len(p[0], p[1], points[i + 1][0], points[i + 1][1]);
      }
    });

    if (totalLength <= 0) {
      return;
    }

    Util.each(points, function (p, i) {
      if (points[i + 1]) {
        segmentT = [];
        segmentT[0] = tempLength / totalLength;
        segmentL = LineMath.len(p[0], p[1], points[i + 1][0], points[i + 1][1]);
        tempLength += segmentL;
        segmentT[1] = tempLength / totalLength;
        tCache.push(segmentT);
      }
    });
    this.tCache = tCache;
  },
  createPath: function createPath(context) {
    var self = this;
    var attrs = self._attrs;
    var points = attrs.points;
    var l;
    var i;

    if (points.length < 2) {
      return;
    }

    context = context || self.get('context');
    context.beginPath();
    context.moveTo(points[0][0], points[0][1]);

    for (i = 1, l = points.length - 1; i < l; i++) {
      context.lineTo(points[i][0], points[i][1]);
    }

    context.lineTo(points[l][0], points[l][1]);
  },
  getStartTangent: function getStartTangent() {
    var points = this.__attrs.points;
    var result = [];
    result.push([points[1][0], points[1][1]]);
    result.push([points[0][0], points[0][1]]);
    return result;
  },
  getEndTangent: function getEndTangent() {
    var points = this.__attrs.points;
    var l = points.length - 1;
    var result = [];
    result.push([points[l - 1][0], points[l - 1][1]]);
    result.push([points[l][0], points[l][1]]);
    return result;
  },
  afterPath: function afterPath(context) {
    var self = this;
    var attrs = self._attrs;
    var points = attrs.points;
    var l = points.length - 1;
    context = context || self.get('context');

    if (attrs.startArrow) {
      Arrow.addStartArrow(context, attrs, points[1][0], points[1][1], points[0][0], points[0][1]);
    }

    if (attrs.endArrow) {
      Arrow.addEndArrow(context, attrs, points[l - 1][0], points[l - 1][1], points[l][0], points[l][1]);
    }
  },
  getPoint: function getPoint(t) {
    var attrs = this._attrs;
    var points = attrs.points;
    var tCache = this.tCache;
    var subt;
    var index;

    if (!tCache) {
      this._setTcache();

      tCache = this.tCache;
    }

    Util.each(tCache, function (v, i) {
      if (t >= v[0] && t <= v[1]) {
        subt = (t - v[0]) / (v[1] - v[0]);
        index = i;
      }
    });
    return {
      x: LineMath.at(points[index][0], points[index + 1][0], subt),
      y: LineMath.at(points[index][1], points[index + 1][1], subt)
    };
  }
});
module.exports = Polyline;

/***/ }),

/***/ "./node_modules/@antv/g/lib/shapes/rect.js":
/*!*************************************************!*\
  !*** ./node_modules/@antv/g/lib/shapes/rect.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(/*! ../util/index */ "./node_modules/@antv/g/lib/util/index.js");

var _require = __webpack_require__(/*! ../util/format */ "./node_modules/@antv/g/lib/util/format.js"),
    parseRadius = _require.parseRadius;

var Shape = __webpack_require__(/*! ../core/shape */ "./node_modules/@antv/g/lib/core/shape.js");

var Rect = function Rect(cfg) {
  Rect.superclass.constructor.call(this, cfg);
};

Rect.ATTRS = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  radius: 0,
  lineWidth: 1
};
Util.extend(Rect, Shape);
Util.augment(Rect, {
  canFill: true,
  canStroke: true,
  type: 'rect',
  getDefaultAttrs: function getDefaultAttrs() {
    return {
      lineWidth: 1,
      radius: 0
    };
  },
  calculateBox: function calculateBox() {
    var self = this;
    var attrs = self._attrs;
    var x = attrs.x;
    var y = attrs.y;
    var width = attrs.width;
    var height = attrs.height;
    var lineWidth = this.getHitLineWidth();
    var halfWidth = lineWidth / 2;
    return {
      minX: x - halfWidth,
      minY: y - halfWidth,
      maxX: x + width + halfWidth,
      maxY: y + height + halfWidth
    };
  },
  createPath: function createPath(context) {
    var self = this;
    var attrs = self._attrs;
    var x = attrs.x;
    var y = attrs.y;
    var width = attrs.width;
    var height = attrs.height;
    var radius = attrs.radius;
    context = context || self.get('context');
    context.beginPath();

    if (radius === 0) {
      // 改成原生的rect方法
      context.rect(x, y, width, height);
    } else {
      var r = parseRadius(radius);
      context.moveTo(x + r.r1, y);
      context.lineTo(x + width - r.r2, y);
      r.r2 !== 0 && context.arc(x + width - r.r2, y + r.r2, r.r2, -Math.PI / 2, 0);
      context.lineTo(x + width, y + height - r.r3);
      r.r3 !== 0 && context.arc(x + width - r.r3, y + height - r.r3, r.r3, 0, Math.PI / 2);
      context.lineTo(x + r.r4, y + height);
      r.r4 !== 0 && context.arc(x + r.r4, y + height - r.r4, r.r4, Math.PI / 2, Math.PI);
      context.lineTo(x, y + r.r1);
      r.r1 !== 0 && context.arc(x + r.r1, y + r.r1, r.r1, Math.PI, Math.PI * 1.5);
      context.closePath();
    }
  }
});
module.exports = Rect;

/***/ }),

/***/ "./node_modules/@antv/g/lib/shapes/text.js":
/*!*************************************************!*\
  !*** ./node_modules/@antv/g/lib/shapes/text.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(/*! ../util/index */ "./node_modules/@antv/g/lib/util/index.js");

var Shape = __webpack_require__(/*! ../core/shape */ "./node_modules/@antv/g/lib/core/shape.js");

var CText = function CText(cfg) {
  CText.superclass.constructor.call(this, cfg);
};

CText.ATTRS = {
  x: 0,
  y: 0,
  text: null,
  fontSize: 12,
  fontFamily: 'sans-serif',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontVariant: 'normal',
  textAlign: 'start',
  textBaseline: 'bottom',
  lineHeight: null,
  textArr: null
};
Util.extend(CText, Shape);
Util.augment(CText, {
  canFill: true,
  canStroke: true,
  type: 'text',
  getDefaultAttrs: function getDefaultAttrs() {
    return {
      lineWidth: 1,
      lineCount: 1,
      fontSize: 12,
      fontFamily: 'sans-serif',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontVariant: 'normal',
      textAlign: 'start',
      textBaseline: 'bottom'
    };
  },
  initTransform: function initTransform() {
    var fontSize = this._attrs.fontSize;

    if (fontSize && +fontSize < 12) {
      // 小于 12 像素的文本进行 scale 处理
      this.transform([['t', -1 * this._attrs.x, -1 * this._attrs.y], ['s', +fontSize / 12, +fontSize / 12], ['t', this._attrs.x, this._attrs.y]]);
    }
  },
  _assembleFont: function _assembleFont() {
    // var self = this;
    var attrs = this._attrs;
    var fontSize = attrs.fontSize;
    var fontFamily = attrs.fontFamily;
    var fontWeight = attrs.fontWeight;
    var fontStyle = attrs.fontStyle; // self.attr('fontStyle');

    var fontVariant = attrs.fontVariant; // self.attr('fontVariant');
    // self.attr('font', [fontStyle, fontVariant, fontWeight, fontSize + 'px', fontFamily].join(' '));

    attrs.font = [fontStyle, fontVariant, fontWeight, fontSize + 'px', fontFamily].join(' ');
  },
  _setAttrText: function _setAttrText() {
    var attrs = this._attrs;
    var text = attrs.text;
    var textArr = null;

    if (Util.isString(text) && text.indexOf('\n') !== -1) {
      textArr = text.split('\n');
      var lineCount = textArr.length;
      attrs.lineCount = lineCount;
    }

    attrs.textArr = textArr;
  },
  _getTextHeight: function _getTextHeight() {
    var attrs = this._attrs;
    var lineCount = attrs.lineCount;
    var fontSize = attrs.fontSize * 1;

    if (lineCount > 1) {
      var spaceingY = this._getSpaceingY();

      return fontSize * lineCount + spaceingY * (lineCount - 1);
    }

    return fontSize;
  },
  isHitBox: function isHitBox() {
    return false;
  },
  calculateBox: function calculateBox() {
    var self = this;
    var attrs = self._attrs;
    var cfg = this._cfg;

    if (!cfg.attrs || cfg.hasUpdate) {
      this._assembleFont();

      this._setAttrText();
    }

    if (!attrs.textArr) {
      this._setAttrText();
    }

    var x = attrs.x;
    var y = attrs.y;
    var width = self.measureText(); // attrs.width

    if (!width) {
      // 如果width不存在，四点共其实点
      return {
        minX: x,
        minY: y,
        maxX: x,
        maxY: y
      };
    }

    var height = self._getTextHeight(); // attrs.height


    var textAlign = attrs.textAlign;
    var textBaseline = attrs.textBaseline;
    var lineWidth = self.getHitLineWidth();
    var point = {
      x: x,
      y: y - height
    };

    if (textAlign) {
      if (textAlign === 'end' || textAlign === 'right') {
        point.x -= width;
      } else if (textAlign === 'center') {
        point.x -= width / 2;
      }
    }

    if (textBaseline) {
      if (textBaseline === 'top') {
        point.y += height;
      } else if (textBaseline === 'middle') {
        point.y += height / 2;
      }
    }

    this.set('startPoint', point);
    var halfWidth = lineWidth / 2;
    return {
      minX: point.x - halfWidth,
      minY: point.y - halfWidth,
      maxX: point.x + width + halfWidth,
      maxY: point.y + height + halfWidth
    };
  },
  _getSpaceingY: function _getSpaceingY() {
    var attrs = this._attrs;
    var lineHeight = attrs.lineHeight;
    var fontSize = attrs.fontSize * 1;
    return lineHeight ? lineHeight - fontSize : fontSize * 0.14;
  },
  drawInner: function drawInner(context) {
    var self = this;
    var attrs = self._attrs;
    var cfg = this._cfg;

    if (!cfg.attrs || cfg.hasUpdate) {
      this._assembleFont();

      this._setAttrText();
    }

    context.font = attrs.font;
    var text = attrs.text;

    if (!text) {
      return;
    }

    var textArr = attrs.textArr;
    var x = attrs.x;
    var y = attrs.y;
    context.beginPath();

    if (self.hasStroke()) {
      var strokeOpacity = attrs.strokeOpacity;

      if (!Util.isNil(strokeOpacity) && strokeOpacity !== 1) {
        context.globalAlpha = strokeOpacity;
      }

      if (textArr) {
        self._drawTextArr(context, false);
      } else {
        context.strokeText(text, x, y);
      }

      context.globalAlpha = 1;
    }

    if (self.hasFill()) {
      var fillOpacity = attrs.fillOpacity;

      if (!Util.isNil(fillOpacity) && fillOpacity !== 1) {
        context.globalAlpha = fillOpacity;
      }

      if (textArr) {
        self._drawTextArr(context, true);
      } else {
        context.fillText(text, x, y);
      }
    }

    cfg.hasUpdate = false;
  },
  _drawTextArr: function _drawTextArr(context, fill) {
    var textArr = this._attrs.textArr;
    var textBaseline = this._attrs.textBaseline;
    var fontSize = this._attrs.fontSize * 1;

    var spaceingY = this._getSpaceingY();

    var x = this._attrs.x;
    var y = this._attrs.y;
    var box = this.getBBox();
    var height = box.maxY - box.minY;
    var subY;
    Util.each(textArr, function (subText, index) {
      subY = y + index * (spaceingY + fontSize) - height + fontSize; // bottom;

      if (textBaseline === 'middle') subY += height - fontSize - (height - fontSize) / 2;
      if (textBaseline === 'top') subY += height - fontSize;

      if (fill) {
        context.fillText(subText, x, subY);
      } else {
        context.strokeText(subText, x, subY);
      }
    });
  },
  measureText: function measureText() {
    var self = this;
    var attrs = self._attrs;
    var text = attrs.text;
    var font = attrs.font;
    var textArr = attrs.textArr;
    var measureWidth;
    var width = 0;
    if (Util.isNil(text)) return undefined;
    var context = document.createElement('canvas').getContext('2d');
    context.save();
    context.font = font;

    if (textArr) {
      Util.each(textArr, function (subText) {
        measureWidth = context.measureText(subText).width;

        if (width < measureWidth) {
          width = measureWidth;
        }

        context.restore();
      });
    } else {
      width = context.measureText(text).width;
      context.restore();
    }

    return width;
  }
});
module.exports = CText;

/***/ }),

/***/ "./node_modules/@antv/g/lib/shapes/util/arrow.js":
/*!*******************************************************!*\
  !*** ./node_modules/@antv/g/lib/shapes/util/arrow.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Format = __webpack_require__(/*! ../../util/format */ "./node_modules/@antv/g/lib/util/format.js");

var PathSegment = __webpack_require__(/*! ../util/path-segment */ "./node_modules/@antv/g/lib/shapes/util/path-segment.js");

var PI = Math.PI;
var sin = Math.sin;
var cos = Math.cos;
var atan2 = Math.atan2;
var DEFAULT_LENGTH = 10;
var DEFAULT_ANGLE = PI / 3;

function _addArrow(ctx, attrs, x1, y1, x2, y2, isStart) {
  var leftX;
  var leftY;
  var rightX;
  var rightY;
  var offsetX;
  var offsetY;
  var angle;

  if (!attrs.fill) {
    // 闭合的不绘制箭头
    var arrowLength = attrs.arrowLength || DEFAULT_LENGTH;
    var arrowAngle = attrs.arrowAngle ? attrs.arrowAngle * PI / 180 : DEFAULT_ANGLE; // 转换为弧
    // Calculate angle

    angle = atan2(y1 - y2, x1 - x2);
    /* // Adjust angle correctly
    angle -= PI;*/
    // Calculate offset to place arrow at edge of path

    offsetX = Math.abs(attrs.lineWidth * cos(angle)) / 2;
    offsetY = Math.abs(attrs.lineWidth * sin(angle)) / 2;

    if (isStart) {
      offsetX = -offsetX;
      offsetY = -offsetY;
    } // Calculate coordinates for left half of arrow


    leftX = x2 + arrowLength * cos(angle + arrowAngle / 2);
    leftY = y2 + arrowLength * sin(angle + arrowAngle / 2); // Calculate coordinates for right half of arrow

    rightX = x2 + arrowLength * cos(angle - arrowAngle / 2);
    rightY = y2 + arrowLength * sin(angle - arrowAngle / 2);
    ctx.beginPath(); // Draw left half of arrow

    ctx.moveTo(leftX - offsetX, leftY - offsetY);
    ctx.lineTo(x2 - offsetX, y2 - offsetY); // Draw right half of arrow

    ctx.lineTo(rightX - offsetX, rightY - offsetY); // Visually connect arrow to path

    ctx.moveTo(x2 - offsetX, y2 - offsetY);
    ctx.lineTo(x2 + offsetX, y2 + offsetY); // Move back to end of path

    ctx.moveTo(x2, y2);
    ctx.stroke();
  }
}

function parsePath(attrs) {
  var segments = [];
  var pathArray = Format.parsePath(attrs.path);
  var preSegment;

  if (!Array.isArray(pathArray) || pathArray.length === 0 || pathArray[0][0] !== 'M' && pathArray[0][0] !== 'm') {
    return false;
  }

  var count = pathArray.length;

  for (var i = 0; i < pathArray.length; i++) {
    var item = pathArray[i];
    preSegment = new PathSegment(item, preSegment, i === count - 1);
    segments.push(preSegment);
  }

  return segments;
}

function _addCustomizedArrow(ctx, attrs, x1, y1, x2, y2, isStart) {
  var shape = isStart ? attrs.startArrow : attrs.endArrow;
  var d = shape.d;
  var deg = 0;
  var x = x2 - x1;
  var y = y2 - y1;
  var tan = Math.atan(x / y);

  if (y === 0 && x < 0) {
    deg = Math.PI;
  } else if (x > 0 && y > 0) {
    deg = Math.PI / 2 - tan;
  } else if (x < 0 && y < 0) {
    deg = -Math.PI / 2 - tan;
  } else if (x >= 0 && y < 0) {
    deg = -tan - Math.PI / 2;
  } else if (x <= 0 && y > 0) {
    deg = Math.PI / 2 - tan;
  }

  var path = parsePath(shape);

  if (!path) {
    return;
  }

  if (d) {
    if (isStart) {
      x2 = x2 + Math.sin(tan) * d;
      y2 = y2 + Math.cos(tan) * d - 0.5 * ctx.lineWidth;
    } else {
      x2 = x2 - Math.sin(tan) * d;
      y2 = y2 - Math.cos(tan) * d + 0.5 * ctx.lineWidth;
    }
  }

  ctx.save();
  ctx.beginPath();
  ctx.translate(x2, y2);
  ctx.rotate(deg);

  for (var i = 0; i < path.length; i++) {
    path[i].draw(ctx);
  }

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.fillStyle = ctx.strokeStyle;
  ctx.fill();
  ctx.restore();
}

module.exports = {
  addStartArrow: function addStartArrow(ctx, attrs, x1, y1, x2, y2) {
    if (typeof attrs.startArrow === 'object') {
      _addCustomizedArrow(ctx, attrs, x1, y1, x2, y2, true);
    } else if (attrs.startArrow) {
      _addArrow(ctx, attrs, x1, y1, x2, y2, true);
    }
  },
  addEndArrow: function addEndArrow(ctx, attrs, x1, y1, x2, y2) {
    if (typeof attrs.endArrow === 'object') {
      _addCustomizedArrow(ctx, attrs, x1, y1, x2, y2, false);
    } else if (attrs.endArrow) {
      _addArrow(ctx, attrs, x1, y1, x2, y2, false);
    }
  }
};

/***/ }),

/***/ "./node_modules/@antv/g/lib/shapes/util/inside.js":
/*!********************************************************!*\
  !*** ./node_modules/@antv/g/lib/shapes/util/inside.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Line = __webpack_require__(/*! ../math/line */ "./node_modules/@antv/g/lib/shapes/math/line.js");

var Quadratic = __webpack_require__(/*! ../math/quadratic */ "./node_modules/@antv/g/lib/shapes/math/quadratic.js");

var Cubic = __webpack_require__(/*! ../math/cubic */ "./node_modules/@antv/g/lib/shapes/math/cubic.js");

var Arc = __webpack_require__(/*! ../math/arc */ "./node_modules/@antv/g/lib/shapes/math/arc.js");

module.exports = {
  line: function line(x1, y1, x2, y2, lineWidth, x, y) {
    var box = Line.box(x1, y1, x2, y2, lineWidth);

    if (!this.box(box.minX, box.maxX, box.minY, box.maxY, x, y)) {
      return false;
    }

    var d = Line.pointDistance(x1, y1, x2, y2, x, y);

    if (isNaN(d)) {
      return false;
    }

    return d <= lineWidth / 2;
  },
  polyline: function polyline(points, lineWidth, x, y) {
    var l = points.length - 1;

    if (l < 1) {
      return false;
    }

    for (var i = 0; i < l; i++) {
      var x1 = points[i][0];
      var y1 = points[i][1];
      var x2 = points[i + 1][0];
      var y2 = points[i + 1][1];

      if (this.line(x1, y1, x2, y2, lineWidth, x, y)) {
        return true;
      }
    }

    return false;
  },
  cubicline: function cubicline(x1, y1, x2, y2, x3, y3, x4, y4, lineWidth, x, y) {
    return Cubic.pointDistance(x1, y1, x2, y2, x3, y3, x4, y4, x, y) <= lineWidth / 2;
  },
  quadraticline: function quadraticline(x1, y1, x2, y2, x3, y3, lineWidth, x, y) {
    return Quadratic.pointDistance(x1, y1, x2, y2, x3, y3, x, y) <= lineWidth / 2;
  },
  arcline: function arcline(cx, cy, r, startAngle, endAngle, clockwise, lineWidth, x, y) {
    return Arc.pointDistance(cx, cy, r, startAngle, endAngle, clockwise, x, y) <= lineWidth / 2;
  },
  rect: function rect(rx, ry, width, height, x, y) {
    return rx <= x && x <= rx + width && ry <= y && y <= ry + height;
  },
  circle: function circle(cx, cy, r, x, y) {
    return Math.pow(x - cx, 2) + Math.pow(y - cy, 2) <= Math.pow(r, 2);
  },
  box: function box(minX, maxX, minY, maxY, x, y) {
    return minX <= x && x <= maxX && minY <= y && y <= maxY;
  }
};

/***/ }),

/***/ "./node_modules/@antv/g/lib/shapes/util/path-segment.js":
/*!**************************************************************!*\
  !*** ./node_modules/@antv/g/lib/shapes/util/path-segment.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(/*! ../../util/index */ "./node_modules/@antv/g/lib/util/index.js");

var Inside = __webpack_require__(/*! ./inside */ "./node_modules/@antv/g/lib/shapes/util/inside.js");

var Cubic = __webpack_require__(/*! ../math/cubic */ "./node_modules/@antv/g/lib/shapes/math/cubic.js");

var Quadratic = __webpack_require__(/*! ../math/quadratic */ "./node_modules/@antv/g/lib/shapes/math/quadratic.js");

var Ellipse = __webpack_require__(/*! ../math/ellipse */ "./node_modules/@antv/g/lib/shapes/math/ellipse.js");

var vec3 = Util.vec3;
var mat3 = Util.mat3;
var ARR_CMD = ['m', 'l', 'c', 'a', 'q', 'h', 'v', 't', 's', 'z'];

function toAbsolute(x, y, curPoint) {
  // 获取绝对坐标
  return {
    x: curPoint.x + x,
    y: curPoint.y + y
  };
}

function toSymmetry(point, center) {
  // 点对称
  return {
    x: center.x + (center.x - point.x),
    y: center.y + (center.y - point.y)
  };
}

function vMag(v) {
  return Math.sqrt(v[0] * v[0] + v[1] * v[1]);
}

function vRatio(u, v) {
  return (u[0] * v[0] + u[1] * v[1]) / (vMag(u) * vMag(v));
}

function vAngle(u, v) {
  return (u[0] * v[1] < u[1] * v[0] ? -1 : 1) * Math.acos(vRatio(u, v));
}

function getArcParams(point1, point2, fa, fs, rx, ry, psiDeg) {
  var psi = Util.mod(Util.toRadian(psiDeg), Math.PI * 2);
  var x1 = point1.x;
  var y1 = point1.y;
  var x2 = point2.x;
  var y2 = point2.y;
  var xp = Math.cos(psi) * (x1 - x2) / 2.0 + Math.sin(psi) * (y1 - y2) / 2.0;
  var yp = -1 * Math.sin(psi) * (x1 - x2) / 2.0 + Math.cos(psi) * (y1 - y2) / 2.0;
  var lambda = xp * xp / (rx * rx) + yp * yp / (ry * ry);

  if (lambda > 1) {
    rx *= Math.sqrt(lambda);
    ry *= Math.sqrt(lambda);
  }

  var diff = rx * rx * (yp * yp) + ry * ry * (xp * xp);
  var f = Math.sqrt((rx * rx * (ry * ry) - diff) / diff);

  if (fa === fs) {
    f *= -1;
  }

  if (isNaN(f)) {
    f = 0;
  }

  var cxp = f * rx * yp / ry;
  var cyp = f * -ry * xp / rx;
  var cx = (x1 + x2) / 2.0 + Math.cos(psi) * cxp - Math.sin(psi) * cyp;
  var cy = (y1 + y2) / 2.0 + Math.sin(psi) * cxp + Math.cos(psi) * cyp;
  var theta = vAngle([1, 0], [(xp - cxp) / rx, (yp - cyp) / ry]);
  var u = [(xp - cxp) / rx, (yp - cyp) / ry];
  var v = [(-1 * xp - cxp) / rx, (-1 * yp - cyp) / ry];
  var dTheta = vAngle(u, v);

  if (vRatio(u, v) <= -1) {
    dTheta = Math.PI;
  }

  if (vRatio(u, v) >= 1) {
    dTheta = 0;
  }

  if (fs === 0 && dTheta > 0) {
    dTheta = dTheta - 2 * Math.PI;
  }

  if (fs === 1 && dTheta < 0) {
    dTheta = dTheta + 2 * Math.PI;
  }

  return [point1, cx, cy, rx, ry, theta, dTheta, psi, fs];
}

var PathSegment = function PathSegment(item, preSegment, isLast) {
  this.preSegment = preSegment;
  this.isLast = isLast;
  this.init(item, preSegment);
};

Util.augment(PathSegment, {
  init: function init(item, preSegment) {
    var command = item[0];
    preSegment = preSegment || {
      endPoint: {
        x: 0,
        y: 0
      }
    };
    var relative = ARR_CMD.indexOf(command) >= 0; // /[a-z]/.test(command);

    var cmd = relative ? command.toUpperCase() : command;
    var p = item;
    var point1;
    var point2;
    var point3;
    var point;
    var preEndPoint = preSegment.endPoint;
    var p1 = p[1];
    var p2 = p[2];

    switch (cmd) {
      default:
        break;

      case 'M':
        if (relative) {
          point = toAbsolute(p1, p2, preEndPoint);
        } else {
          point = {
            x: p1,
            y: p2
          };
        }

        this.command = 'M';
        this.params = [preEndPoint, point];
        this.subStart = point;
        this.endPoint = point;
        break;

      case 'L':
        if (relative) {
          point = toAbsolute(p1, p2, preEndPoint);
        } else {
          point = {
            x: p1,
            y: p2
          };
        }

        this.command = 'L';
        this.params = [preEndPoint, point];
        this.subStart = preSegment.subStart;
        this.endPoint = point;

        this.endTangent = function () {
          return [point.x - preEndPoint.x, point.y - preEndPoint.y];
        };

        this.startTangent = function () {
          return [preEndPoint.x - point.x, preEndPoint.y - point.y];
        };

        break;

      case 'H':
        if (relative) {
          point = toAbsolute(p1, 0, preEndPoint);
        } else {
          point = {
            x: p1,
            y: preEndPoint.y
          };
        }

        this.command = 'L';
        this.params = [preEndPoint, point];
        this.subStart = preSegment.subStart;
        this.endPoint = point;

        this.endTangent = function () {
          return [point.x - preEndPoint.x, point.y - preEndPoint.y];
        };

        this.startTangent = function () {
          return [preEndPoint.x - point.x, preEndPoint.y - point.y];
        };

        break;

      case 'V':
        if (relative) {
          point = toAbsolute(0, p1, preEndPoint);
        } else {
          point = {
            x: preEndPoint.x,
            y: p1
          };
        }

        this.command = 'L';
        this.params = [preEndPoint, point];
        this.subStart = preSegment.subStart;
        this.endPoint = point;

        this.endTangent = function () {
          return [point.x - preEndPoint.x, point.y - preEndPoint.y];
        };

        this.startTangent = function () {
          return [preEndPoint.x - point.x, preEndPoint.y - point.y];
        };

        break;

      case 'Q':
        if (relative) {
          point1 = toAbsolute(p1, p2, preEndPoint);
          point2 = toAbsolute(p[3], p[4], preEndPoint);
        } else {
          point1 = {
            x: p1,
            y: p2
          };
          point2 = {
            x: p[3],
            y: p[4]
          };
        }

        this.command = 'Q';
        this.params = [preEndPoint, point1, point2];
        this.subStart = preSegment.subStart;
        this.endPoint = point2;

        this.endTangent = function () {
          return [point2.x - point1.x, point2.y - point1.y];
        };

        this.startTangent = function () {
          return [preEndPoint.x - point1.x, preEndPoint.y - point1.y];
        };

        break;

      case 'T':
        if (relative) {
          point2 = toAbsolute(p1, p2, preEndPoint);
        } else {
          point2 = {
            x: p1,
            y: p2
          };
        }

        if (preSegment.command === 'Q') {
          point1 = toSymmetry(preSegment.params[1], preEndPoint);
          this.command = 'Q';
          this.params = [preEndPoint, point1, point2];
          this.subStart = preSegment.subStart;
          this.endPoint = point2;

          this.endTangent = function () {
            return [point2.x - point1.x, point2.y - point1.y];
          };

          this.startTangent = function () {
            return [preEndPoint.x - point1.x, preEndPoint.y - point1.y];
          };
        } else {
          this.command = 'TL';
          this.params = [preEndPoint, point2];
          this.subStart = preSegment.subStart;
          this.endPoint = point2;

          this.endTangent = function () {
            return [point2.x - preEndPoint.x, point2.y - preEndPoint.y];
          };

          this.startTangent = function () {
            return [preEndPoint.x - point2.x, preEndPoint.y - point2.y];
          };
        }

        break;

      case 'C':
        if (relative) {
          point1 = toAbsolute(p1, p2, preEndPoint);
          point2 = toAbsolute(p[3], p[4], preEndPoint);
          point3 = toAbsolute(p[5], p[6], preEndPoint);
        } else {
          point1 = {
            x: p1,
            y: p2
          };
          point2 = {
            x: p[3],
            y: p[4]
          };
          point3 = {
            x: p[5],
            y: p[6]
          };
        }

        this.command = 'C';
        this.params = [preEndPoint, point1, point2, point3];
        this.subStart = preSegment.subStart;
        this.endPoint = point3;

        this.endTangent = function () {
          return [point3.x - point2.x, point3.y - point2.y];
        };

        this.startTangent = function () {
          return [preEndPoint.x - point1.x, preEndPoint.y - point1.y];
        };

        break;

      case 'S':
        if (relative) {
          point2 = toAbsolute(p1, p2, preEndPoint);
          point3 = toAbsolute(p[3], p[4], preEndPoint);
        } else {
          point2 = {
            x: p1,
            y: p2
          };
          point3 = {
            x: p[3],
            y: p[4]
          };
        }

        if (preSegment.command === 'C') {
          point1 = toSymmetry(preSegment.params[2], preEndPoint);
          this.command = 'C';
          this.params = [preEndPoint, point1, point2, point3];
          this.subStart = preSegment.subStart;
          this.endPoint = point3;

          this.endTangent = function () {
            return [point3.x - point2.x, point3.y - point2.y];
          };

          this.startTangent = function () {
            return [preEndPoint.x - point1.x, preEndPoint.y - point1.y];
          };
        } else {
          this.command = 'SQ';
          this.params = [preEndPoint, point2, point3];
          this.subStart = preSegment.subStart;
          this.endPoint = point3;

          this.endTangent = function () {
            return [point3.x - point2.x, point3.y - point2.y];
          };

          this.startTangent = function () {
            return [preEndPoint.x - point2.x, preEndPoint.y - point2.y];
          };
        }

        break;

      case 'A':
        {
          var rx = p1;
          var ry = p2;
          var psi = p[3];
          var fa = p[4];
          var fs = p[5];

          if (relative) {
            point = toAbsolute(p[6], p[7], preEndPoint);
          } else {
            point = {
              x: p[6],
              y: p[7]
            };
          }

          this.command = 'A';
          var params = getArcParams(preEndPoint, point, fa, fs, rx, ry, psi);
          this.params = params;
          var start = preSegment.subStart;
          this.subStart = start;
          this.endPoint = point;
          var startAngle = params[5] % (Math.PI * 2);

          if (Util.isNumberEqual(startAngle, Math.PI * 2)) {
            startAngle = 0;
          }

          var endAngle = params[6] % (Math.PI * 2);

          if (Util.isNumberEqual(endAngle, Math.PI * 2)) {
            endAngle = 0;
          }

          var d = 0.001;

          this.startTangent = function () {
            if (fs === 0) {
              d *= -1;
            }

            var dx = params[3] * Math.cos(startAngle - d) + params[1];
            var dy = params[4] * Math.sin(startAngle - d) + params[2];
            return [dx - start.x, dy - start.y];
          };

          this.endTangent = function () {
            var endAngle = params[6];

            if (endAngle - Math.PI * 2 < 0.0001) {
              endAngle = 0;
            }

            var dx = params[3] * Math.cos(startAngle + endAngle + d) + params[1];
            var dy = params[4] * Math.sin(startAngle + endAngle - d) + params[2];
            return [preEndPoint.x - dx, preEndPoint.y - dy];
          };

          break;
        }

      case 'Z':
        {
          this.command = 'Z';
          this.params = [preEndPoint, preSegment.subStart];
          this.subStart = preSegment.subStart;
          this.endPoint = preSegment.subStart;
        }
    }
  },
  isInside: function isInside(x, y, lineWidth) {
    var self = this;
    var command = self.command;
    var params = self.params;
    var box = self.box;

    if (box) {
      if (!Inside.box(box.minX, box.maxX, box.minY, box.maxY, x, y)) {
        return false;
      }
    }

    switch (command) {
      default:
        break;

      case 'M':
        return false;

      case 'TL':
      case 'L':
      case 'Z':
        return Inside.line(params[0].x, params[0].y, params[1].x, params[1].y, lineWidth, x, y);

      case 'SQ':
      case 'Q':
        return Inside.quadraticline(params[0].x, params[0].y, params[1].x, params[1].y, params[2].x, params[2].y, lineWidth, x, y);

      case 'C':
        {
          return Inside.cubicline(params[0].x, params[0].y, params[1].x, params[1].y, params[2].x, params[2].y, params[3].x, params[3].y, lineWidth, x, y);
        }

      case 'A':
        {
          var p = params;
          var cx = p[1];
          var cy = p[2];
          var rx = p[3];
          var ry = p[4];
          var theta = p[5];
          var dTheta = p[6];
          var psi = p[7];
          var fs = p[8];
          var r = rx > ry ? rx : ry;
          var scaleX = rx > ry ? 1 : rx / ry;
          var scaleY = rx > ry ? ry / rx : 1;
          p = [x, y, 1];
          var m = [1, 0, 0, 0, 1, 0, 0, 0, 1];
          mat3.translate(m, m, [-cx, -cy]);
          mat3.rotate(m, m, -psi);
          mat3.scale(m, m, [1 / scaleX, 1 / scaleY]);
          vec3.transformMat3(p, p, m);
          return Inside.arcline(0, 0, r, theta, theta + dTheta, 1 - fs, lineWidth, p[0], p[1]);
        }
    }

    return false;
  },
  draw: function draw(context) {
    var command = this.command;
    var params = this.params;
    var point1;
    var point2;
    var point3;

    switch (command) {
      default:
        break;

      case 'M':
        context.moveTo(params[1].x, params[1].y);
        break;

      case 'TL':
      case 'L':
        context.lineTo(params[1].x, params[1].y);
        break;

      case 'SQ':
      case 'Q':
        point1 = params[1];
        point2 = params[2];
        context.quadraticCurveTo(point1.x, point1.y, point2.x, point2.y);
        break;

      case 'C':
        point1 = params[1];
        point2 = params[2];
        point3 = params[3];
        context.bezierCurveTo(point1.x, point1.y, point2.x, point2.y, point3.x, point3.y);
        break;

      case 'A':
        {
          var p = params;
          var p1 = p[1];
          var p2 = p[2];
          var cx = p1;
          var cy = p2;
          var rx = p[3];
          var ry = p[4];
          var theta = p[5];
          var dTheta = p[6];
          var psi = p[7];
          var fs = p[8];
          var r = rx > ry ? rx : ry;
          var scaleX = rx > ry ? 1 : rx / ry;
          var scaleY = rx > ry ? ry / rx : 1;
          context.translate(cx, cy);
          context.rotate(psi);
          context.scale(scaleX, scaleY);
          context.arc(0, 0, r, theta, theta + dTheta, 1 - fs);
          context.scale(1 / scaleX, 1 / scaleY);
          context.rotate(-psi);
          context.translate(-cx, -cy);
          break;
        }

      case 'Z':
        context.closePath();
        break;
    }
  },
  getBBox: function getBBox(lineWidth) {
    var halfWidth = lineWidth / 2;
    var params = this.params;
    var yDims;
    var xDims;
    var i;
    var l;

    switch (this.command) {
      default:
      case 'M':
      case 'Z':
        break;

      case 'TL':
      case 'L':
        this.box = {
          minX: Math.min(params[0].x, params[1].x) - halfWidth,
          maxX: Math.max(params[0].x, params[1].x) + halfWidth,
          minY: Math.min(params[0].y, params[1].y) - halfWidth,
          maxY: Math.max(params[0].y, params[1].y) + halfWidth
        };
        break;

      case 'SQ':
      case 'Q':
        xDims = Quadratic.extrema(params[0].x, params[1].x, params[2].x);

        for (i = 0, l = xDims.length; i < l; i++) {
          xDims[i] = Quadratic.at(params[0].x, params[1].x, params[2].x, xDims[i]);
        }

        xDims.push(params[0].x, params[2].x);
        yDims = Quadratic.extrema(params[0].y, params[1].y, params[2].y);

        for (i = 0, l = yDims.length; i < l; i++) {
          yDims[i] = Quadratic.at(params[0].y, params[1].y, params[2].y, yDims);
        }

        yDims.push(params[0].y, params[2].y);
        this.box = {
          minX: Math.min.apply(Math, xDims) - halfWidth,
          maxX: Math.max.apply(Math, xDims) + halfWidth,
          minY: Math.min.apply(Math, yDims) - halfWidth,
          maxY: Math.max.apply(Math, yDims) + halfWidth
        };
        break;

      case 'C':
        xDims = Cubic.extrema(params[0].x, params[1].x, params[2].x, params[3].x);

        for (i = 0, l = xDims.length; i < l; i++) {
          xDims[i] = Cubic.at(params[0].x, params[1].x, params[2].x, params[3].x, xDims[i]);
        }

        yDims = Cubic.extrema(params[0].y, params[1].y, params[2].y, params[3].y);

        for (i = 0, l = yDims.length; i < l; i++) {
          yDims[i] = Cubic.at(params[0].y, params[1].y, params[2].y, params[3].y, yDims[i]);
        }

        xDims.push(params[0].x, params[3].x);
        yDims.push(params[0].y, params[3].y);
        this.box = {
          minX: Math.min.apply(Math, xDims) - halfWidth,
          maxX: Math.max.apply(Math, xDims) + halfWidth,
          minY: Math.min.apply(Math, yDims) - halfWidth,
          maxY: Math.max.apply(Math, yDims) + halfWidth
        };
        break;

      case 'A':
        {
          // todo 待优化
          var p = params;
          var cx = p[1];
          var cy = p[2];
          var rx = p[3];
          var ry = p[4];
          var theta = p[5];
          var dTheta = p[6];
          var psi = p[7];
          var fs = p[8];
          var start = theta;
          var end = theta + dTheta;
          var xDim = Ellipse.xExtrema(psi, rx, ry);
          var minX = Infinity;
          var maxX = -Infinity;
          var xs = [start, end];

          for (i = -Math.PI * 2; i <= Math.PI * 2; i += Math.PI) {
            var xAngle = xDim + i;

            if (fs === 1) {
              if (start < xAngle && xAngle < end) {
                xs.push(xAngle);
              }
            } else {
              if (end < xAngle && xAngle < start) {
                xs.push(xAngle);
              }
            }
          }

          for (i = 0, l = xs.length; i < l; i++) {
            var x = Ellipse.xAt(psi, rx, ry, cx, xs[i]);

            if (x < minX) {
              minX = x;
            }

            if (x > maxX) {
              maxX = x;
            }
          }

          var yDim = Ellipse.yExtrema(psi, rx, ry);
          var minY = Infinity;
          var maxY = -Infinity;
          var ys = [start, end];

          for (i = -Math.PI * 2; i <= Math.PI * 2; i += Math.PI) {
            var yAngle = yDim + i;

            if (fs === 1) {
              if (start < yAngle && yAngle < end) {
                ys.push(yAngle);
              }
            } else {
              if (end < yAngle && yAngle < start) {
                ys.push(yAngle);
              }
            }
          }

          for (i = 0, l = ys.length; i < l; i++) {
            var y = Ellipse.yAt(psi, rx, ry, cy, ys[i]);

            if (y < minY) {
              minY = y;
            }

            if (y > maxY) {
              maxY = y;
            }
          }

          this.box = {
            minX: minX - halfWidth,
            maxX: maxX + halfWidth,
            minY: minY - halfWidth,
            maxY: maxY + halfWidth
          };
          break;
        }
    }
  }
});
module.exports = PathSegment;

/***/ }),

/***/ "./node_modules/@antv/g/lib/util/common.js":
/*!*************************************************!*\
  !*** ./node_modules/@antv/g/lib/util/common.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  isFunction: __webpack_require__(/*! @antv/util/lib/type/is-function */ "./node_modules/@antv/g/node_modules/@antv/util/lib/type/is-function.js"),
  isObject: __webpack_require__(/*! @antv/util/lib/type/is-object */ "./node_modules/@antv/g/node_modules/@antv/util/lib/type/is-object.js"),
  isBoolean: __webpack_require__(/*! @antv/util/lib/type/is-boolean */ "./node_modules/@antv/g/node_modules/@antv/util/lib/type/is-boolean.js"),
  isNil: __webpack_require__(/*! @antv/util/lib/type/is-nil */ "./node_modules/@antv/g/node_modules/@antv/util/lib/type/is-nil.js"),
  isString: __webpack_require__(/*! @antv/util/lib/type/is-string */ "./node_modules/@antv/g/node_modules/@antv/util/lib/type/is-string.js"),
  isArray: __webpack_require__(/*! @antv/util/lib/type/is-array */ "./node_modules/@antv/g/node_modules/@antv/util/lib/type/is-array.js"),
  isNumber: __webpack_require__(/*! @antv/util/lib/type/is-number */ "./node_modules/@antv/g/node_modules/@antv/util/lib/type/is-number.js"),
  isEmpty: __webpack_require__(/*! @antv/util/lib/is-empty */ "./node_modules/@antv/g/node_modules/@antv/util/lib/is-empty.js"),
  // isBlank
  uniqueId: __webpack_require__(/*! @antv/util/lib/unique-id */ "./node_modules/@antv/g/node_modules/@antv/util/lib/unique-id.js"),
  clone: __webpack_require__(/*! @antv/util/lib/clone */ "./node_modules/@antv/g/node_modules/@antv/util/lib/clone.js"),
  deepMix: __webpack_require__(/*! @antv/util/lib/deep-mix */ "./node_modules/@antv/g/node_modules/@antv/util/lib/deep-mix.js"),
  assign: __webpack_require__(/*! @antv/util/lib/mix */ "./node_modules/@antv/g/node_modules/@antv/util/lib/mix.js"),
  // simpleMix
  merge: __webpack_require__(/*! @antv/util/lib/deep-mix */ "./node_modules/@antv/g/node_modules/@antv/util/lib/deep-mix.js"),
  // mix
  upperFirst: __webpack_require__(/*! @antv/util/lib/string/upper-first */ "./node_modules/@antv/g/node_modules/@antv/util/lib/string/upper-first.js"),
  // ucfirst
  each: __webpack_require__(/*! @antv/util/lib/each */ "./node_modules/@antv/g/node_modules/@antv/util/lib/each.js"),
  isEqual: __webpack_require__(/*! @antv/util/lib/is-equal */ "./node_modules/@antv/g/node_modules/@antv/util/lib/is-equal.js"),
  toArray: __webpack_require__(/*! @antv/util/lib/to-array */ "./node_modules/@antv/g/node_modules/@antv/util/lib/to-array.js"),
  extend: __webpack_require__(/*! @antv/util/lib/extend */ "./node_modules/@antv/g/node_modules/@antv/util/lib/extend.js"),
  augment: __webpack_require__(/*! @antv/util/lib/augment */ "./node_modules/@antv/g/node_modules/@antv/util/lib/augment.js"),
  remove: __webpack_require__(/*! @antv/util/lib/array/pull */ "./node_modules/@antv/g/node_modules/@antv/util/lib/array/pull.js"),
  isNumberEqual: __webpack_require__(/*! @antv/util/lib/math/is-number-equal */ "./node_modules/@antv/g/node_modules/@antv/util/lib/math/is-number-equal.js"),
  toRadian: __webpack_require__(/*! @antv/util/lib/math/to-radian */ "./node_modules/@antv/g/node_modules/@antv/util/lib/math/to-radian.js"),
  toDegree: __webpack_require__(/*! @antv/util/lib/math/to-degree */ "./node_modules/@antv/g/node_modules/@antv/util/lib/math/to-degree.js"),
  mod: __webpack_require__(/*! @antv/util/lib/math/mod */ "./node_modules/@antv/g/node_modules/@antv/util/lib/math/mod.js"),
  clamp: __webpack_require__(/*! @antv/util/lib/math/clamp */ "./node_modules/@antv/g/node_modules/@antv/util/lib/math/clamp.js"),
  createDom: __webpack_require__(/*! @antv/util/lib/dom/create-dom */ "./node_modules/@antv/g/node_modules/@antv/util/lib/dom/create-dom.js"),
  modifyCSS: __webpack_require__(/*! @antv/util/lib/dom/modify-css */ "./node_modules/@antv/g/node_modules/@antv/util/lib/dom/modify-css.js"),
  requestAnimationFrame: __webpack_require__(/*! @antv/util/lib/dom/request-animation-frame */ "./node_modules/@antv/g/node_modules/@antv/util/lib/dom/request-animation-frame.js"),
  getRatio: function getRatio() {
    return window.devicePixelRatio ? window.devicePixelRatio : 2;
  },
  mat3: __webpack_require__(/*! @antv/util/lib/matrix/mat3 */ "./node_modules/@antv/g/node_modules/@antv/util/lib/matrix/mat3.js"),
  vec2: __webpack_require__(/*! @antv/util/lib/matrix/vec2 */ "./node_modules/@antv/g/node_modules/@antv/util/lib/matrix/vec2.js"),
  vec3: __webpack_require__(/*! @antv/util/lib/matrix/vec3 */ "./node_modules/@antv/g/node_modules/@antv/util/lib/matrix/vec3.js"),
  transform: __webpack_require__(/*! @antv/util/lib/matrix/transform */ "./node_modules/@antv/g/node_modules/@antv/util/lib/matrix/transform.js")
};

/***/ }),

/***/ "./node_modules/@antv/g/lib/util/format.js":
/*!*************************************************!*\
  !*** ./node_modules/@antv/g/lib/util/format.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(/*! ../util/index */ "./node_modules/@antv/g/lib/util/index.js");

var regexTags = /[MLHVQTCSAZ]([^MLHVQTCSAZ]*)/ig;
var regexDot = /[^\s\,]+/ig;
module.exports = {
  parseRadius: function parseRadius(radius) {
    var r1 = 0,
        r2 = 0,
        r3 = 0,
        r4 = 0;

    if (Util.isArray(radius)) {
      if (radius.length === 1) {
        r1 = r2 = r3 = r4 = radius[0];
      } else if (radius.length === 2) {
        r1 = r3 = radius[0];
        r2 = r4 = radius[1];
      } else if (radius.length === 3) {
        r1 = radius[0];
        r2 = r4 = radius[1];
        r3 = radius[2];
      } else {
        r1 = radius[0];
        r2 = radius[1];
        r3 = radius[2];
        r4 = radius[3];
      }
    } else {
      r1 = r2 = r3 = r4 = radius;
    }

    return {
      r1: r1,
      r2: r2,
      r3: r3,
      r4: r4
    };
  },
  parsePath: function parsePath(path) {
    path = path || [];

    if (Util.isArray(path)) {
      return path;
    }

    if (Util.isString(path)) {
      path = path.match(regexTags);
      Util.each(path, function (item, index) {
        item = item.match(regexDot);

        if (item[0].length > 1) {
          var tag = item[0].charAt(0);
          item.splice(1, 0, item[0].substr(1));
          item[0] = tag;
        }

        Util.each(item, function (sub, i) {
          if (!isNaN(sub)) {
            item[i] = +sub;
          }
        });
        path[index] = item;
      });
      return path;
    }
  }
};

/***/ }),

/***/ "./node_modules/@antv/g/lib/util/index.js":
/*!************************************************!*\
  !*** ./node_modules/@antv/g/lib/util/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var CommonUtil = __webpack_require__(/*! ./common */ "./node_modules/@antv/g/lib/util/common.js");

var Util = {};
CommonUtil.merge(Util, CommonUtil, {
  mixin: function mixin(c, mixins) {
    var Param = c.CFG ? 'CFG' : 'ATTRS';

    if (c && mixins) {
      c._mixins = mixins;
      c[Param] = c[Param] || {};
      var temp = {};
      Util.each(mixins, function (mixin) {
        Util.augment(c, mixin);
        var attrs = mixin[Param];

        if (attrs) {
          Util.merge(temp, attrs);
        }
      });
      c[Param] = Util.merge(temp, c[Param]);
    }
  }
});
module.exports = Util;

/***/ }),

/***/ "./node_modules/@antv/g/lib/util/path.js":
/*!***********************************************!*\
  !*** ./node_modules/@antv/g/lib/util/path.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(/*! ./common */ "./node_modules/@antv/g/lib/util/common.js");

var SPACES = "\t\n\x0B\f\r \xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029";
var PATH_COMMAND = new RegExp('([a-z])[' + SPACES + ',]*((-?\\d*\\.?\\d*(?:e[\\-+]?\\d+)?[' + SPACES + ']*,?[' + SPACES + ']*)+)', 'ig');
var PATH_VALUES = new RegExp('(-?\\d*\\.?\\d*(?:e[\\-+]?\\d+)?)[' + SPACES + ']*,?[' + SPACES + ']*', 'ig'); // Parses given path string into an array of arrays of path segments

var parsePathString = function parsePathString(pathString) {
  if (!pathString) {
    return null;
  }

  if (typeof pathString === typeof []) {
    return pathString;
  }

  var paramCounts = {
    a: 7,
    c: 6,
    o: 2,
    h: 1,
    l: 2,
    m: 2,
    r: 4,
    q: 4,
    s: 4,
    t: 2,
    v: 1,
    u: 3,
    z: 0
  };
  var data = [];
  String(pathString).replace(PATH_COMMAND, function (a, b, c) {
    var params = [];
    var name = b.toLowerCase();
    c.replace(PATH_VALUES, function (a, b) {
      b && params.push(+b);
    });

    if (name === 'm' && params.length > 2) {
      data.push([b].concat(params.splice(0, 2)));
      name = 'l';
      b = b === 'm' ? 'l' : 'L';
    }

    if (name === 'o' && params.length === 1) {
      data.push([b, params[0]]);
    }

    if (name === 'r') {
      data.push([b].concat(params));
    } else {
      while (params.length >= paramCounts[name]) {
        data.push([b].concat(params.splice(0, paramCounts[name])));

        if (!paramCounts[name]) {
          break;
        }
      }
    }
  });
  return data;
}; // http://schepers.cc/getting-to-the-point


var catmullRom2bezier = function catmullRom2bezier(crp, z) {
  var d = [];

  for (var i = 0, iLen = crp.length; iLen - 2 * !z > i; i += 2) {
    var p = [{
      x: +crp[i - 2],
      y: +crp[i - 1]
    }, {
      x: +crp[i],
      y: +crp[i + 1]
    }, {
      x: +crp[i + 2],
      y: +crp[i + 3]
    }, {
      x: +crp[i + 4],
      y: +crp[i + 5]
    }];

    if (z) {
      if (!i) {
        p[0] = {
          x: +crp[iLen - 2],
          y: +crp[iLen - 1]
        };
      } else if (iLen - 4 === i) {
        p[3] = {
          x: +crp[0],
          y: +crp[1]
        };
      } else if (iLen - 2 === i) {
        p[2] = {
          x: +crp[0],
          y: +crp[1]
        };
        p[3] = {
          x: +crp[2],
          y: +crp[3]
        };
      }
    } else {
      if (iLen - 4 === i) {
        p[3] = p[2];
      } else if (!i) {
        p[0] = {
          x: +crp[i],
          y: +crp[i + 1]
        };
      }
    }

    d.push(['C', (-p[0].x + 6 * p[1].x + p[2].x) / 6, (-p[0].y + 6 * p[1].y + p[2].y) / 6, (p[1].x + 6 * p[2].x - p[3].x) / 6, (p[1].y + 6 * p[2].y - p[3].y) / 6, p[2].x, p[2].y]);
  }

  return d;
};

var ellipsePath = function ellipsePath(x, y, rx, ry, a) {
  var res = [];

  if (a === null && ry === null) {
    ry = rx;
  }

  x = +x;
  y = +y;
  rx = +rx;
  ry = +ry;

  if (a !== null) {
    var rad = Math.PI / 180;
    var x1 = x + rx * Math.cos(-ry * rad);
    var x2 = x + rx * Math.cos(-a * rad);
    var y1 = y + rx * Math.sin(-ry * rad);
    var y2 = y + rx * Math.sin(-a * rad);
    res = [['M', x1, y1], ['A', rx, rx, 0, +(a - ry > 180), 0, x2, y2]];
  } else {
    res = [['M', x, y], ['m', 0, -ry], ['a', rx, ry, 0, 1, 1, 0, 2 * ry], ['a', rx, ry, 0, 1, 1, 0, -2 * ry], ['z']];
  }

  return res;
};

var pathToAbsolute = function pathToAbsolute(pathArray) {
  pathArray = parsePathString(pathArray);

  if (!pathArray || !pathArray.length) {
    return [['M', 0, 0]];
  }

  var res = [];
  var x = 0;
  var y = 0;
  var mx = 0;
  var my = 0;
  var start = 0;
  var pa0;
  var dots;

  if (pathArray[0][0] === 'M') {
    x = +pathArray[0][1];
    y = +pathArray[0][2];
    mx = x;
    my = y;
    start++;
    res[0] = ['M', x, y];
  }

  var crz = pathArray.length === 3 && pathArray[0][0] === 'M' && pathArray[1][0].toUpperCase() === 'R' && pathArray[2][0].toUpperCase() === 'Z';

  for (var r, pa, i = start, ii = pathArray.length; i < ii; i++) {
    res.push(r = []);
    pa = pathArray[i];
    pa0 = pa[0];

    if (pa0 !== pa0.toUpperCase()) {
      r[0] = pa0.toUpperCase();

      switch (r[0]) {
        case 'A':
          r[1] = pa[1];
          r[2] = pa[2];
          r[3] = pa[3];
          r[4] = pa[4];
          r[5] = pa[5];
          r[6] = +pa[6] + x;
          r[7] = +pa[7] + y;
          break;

        case 'V':
          r[1] = +pa[1] + y;
          break;

        case 'H':
          r[1] = +pa[1] + x;
          break;

        case 'R':
          dots = [x, y].concat(pa.slice(1));

          for (var j = 2, jj = dots.length; j < jj; j++) {
            dots[j] = +dots[j] + x;
            dots[++j] = +dots[j] + y;
          }

          res.pop();
          res = res.concat(catmullRom2bezier(dots, crz));
          break;

        case 'O':
          res.pop();
          dots = ellipsePath(x, y, pa[1], pa[2]);
          dots.push(dots[0]);
          res = res.concat(dots);
          break;

        case 'U':
          res.pop();
          res = res.concat(ellipsePath(x, y, pa[1], pa[2], pa[3]));
          r = ['U'].concat(res[res.length - 1].slice(-2));
          break;

        case 'M':
          mx = +pa[1] + x;
          my = +pa[2] + y;
          break;
        // for lint

        default:
          for (var _j = 1, _jj = pa.length; _j < _jj; _j++) {
            r[_j] = +pa[_j] + (_j % 2 ? x : y);
          }

      }
    } else if (pa0 === 'R') {
      dots = [x, y].concat(pa.slice(1));
      res.pop();
      res = res.concat(catmullRom2bezier(dots, crz));
      r = ['R'].concat(pa.slice(-2));
    } else if (pa0 === 'O') {
      res.pop();
      dots = ellipsePath(x, y, pa[1], pa[2]);
      dots.push(dots[0]);
      res = res.concat(dots);
    } else if (pa0 === 'U') {
      res.pop();
      res = res.concat(ellipsePath(x, y, pa[1], pa[2], pa[3]));
      r = ['U'].concat(res[res.length - 1].slice(-2));
    } else {
      for (var k = 0, kk = pa.length; k < kk; k++) {
        r[k] = pa[k];
      }
    }

    pa0 = pa0.toUpperCase();

    if (pa0 !== 'O') {
      switch (r[0]) {
        case 'Z':
          x = +mx;
          y = +my;
          break;

        case 'H':
          x = r[1];
          break;

        case 'V':
          y = r[1];
          break;

        case 'M':
          mx = r[r.length - 2];
          my = r[r.length - 1];
          break;
        // for lint

        default:
          x = r[r.length - 2];
          y = r[r.length - 1];
      }
    }
  }

  return res;
};

var l2c = function l2c(x1, y1, x2, y2) {
  return [x1, y1, x2, y2, x2, y2];
};

var q2c = function q2c(x1, y1, ax, ay, x2, y2) {
  var _13 = 1 / 3;

  var _23 = 2 / 3;

  return [_13 * x1 + _23 * ax, _13 * y1 + _23 * ay, _13 * x2 + _23 * ax, _13 * y2 + _23 * ay, x2, y2];
};

var a2c = function a2c(x1, y1, rx, ry, angle, large_arc_flag, sweep_flag, x2, y2, recursive) {
  // for more information of where this math came from visit:
  // http://www.w3.org/TR/SVG11/implnote.html#ArcImplementationNotes
  if (rx === ry) {
    rx += 1;
  }

  var _120 = Math.PI * 120 / 180;

  var rad = Math.PI / 180 * (+angle || 0);
  var res = [];
  var xy;
  var f1;
  var f2;
  var cx;
  var cy;

  var rotate = function rotate(x, y, rad) {
    var X = x * Math.cos(rad) - y * Math.sin(rad);
    var Y = x * Math.sin(rad) + y * Math.cos(rad);
    return {
      x: X,
      y: Y
    };
  };

  if (!recursive) {
    xy = rotate(x1, y1, -rad);
    x1 = xy.x;
    y1 = xy.y;
    xy = rotate(x2, y2, -rad);
    x2 = xy.x;
    y2 = xy.y;

    if (x1 === x2 && y1 === y2) {
      // 若弧的起始点和终点重叠则错开一点
      x2 += 1;
      y2 += 1;
    } // const cos = Math.cos(Math.PI / 180 * angle);
    // const sin = Math.sin(Math.PI / 180 * angle);


    var x = (x1 - x2) / 2;
    var y = (y1 - y2) / 2;
    var h = x * x / (rx * rx) + y * y / (ry * ry);

    if (h > 1) {
      h = Math.sqrt(h);
      rx = h * rx;
      ry = h * ry;
    }

    var rx2 = rx * rx;
    var ry2 = ry * ry;
    var k = (large_arc_flag === sweep_flag ? -1 : 1) * Math.sqrt(Math.abs((rx2 * ry2 - rx2 * y * y - ry2 * x * x) / (rx2 * y * y + ry2 * x * x)));
    cx = k * rx * y / ry + (x1 + x2) / 2;
    cy = k * -ry * x / rx + (y1 + y2) / 2;
    f1 = Math.asin(((y1 - cy) / ry).toFixed(9));
    f2 = Math.asin(((y2 - cy) / ry).toFixed(9));
    f1 = x1 < cx ? Math.PI - f1 : f1;
    f2 = x2 < cx ? Math.PI - f2 : f2;
    f1 < 0 && (f1 = Math.PI * 2 + f1);
    f2 < 0 && (f2 = Math.PI * 2 + f2);

    if (sweep_flag && f1 > f2) {
      f1 = f1 - Math.PI * 2;
    }

    if (!sweep_flag && f2 > f1) {
      f2 = f2 - Math.PI * 2;
    }
  } else {
    f1 = recursive[0];
    f2 = recursive[1];
    cx = recursive[2];
    cy = recursive[3];
  }

  var df = f2 - f1;

  if (Math.abs(df) > _120) {
    var f2old = f2;
    var x2old = x2;
    var y2old = y2;
    f2 = f1 + _120 * (sweep_flag && f2 > f1 ? 1 : -1);
    x2 = cx + rx * Math.cos(f2);
    y2 = cy + ry * Math.sin(f2);
    res = a2c(x2, y2, rx, ry, angle, 0, sweep_flag, x2old, y2old, [f2, f2old, cx, cy]);
  }

  df = f2 - f1;
  var c1 = Math.cos(f1);
  var s1 = Math.sin(f1);
  var c2 = Math.cos(f2);
  var s2 = Math.sin(f2);
  var t = Math.tan(df / 4);
  var hx = 4 / 3 * rx * t;
  var hy = 4 / 3 * ry * t;
  var m1 = [x1, y1];
  var m2 = [x1 + hx * s1, y1 - hy * c1];
  var m3 = [x2 + hx * s2, y2 - hy * c2];
  var m4 = [x2, y2];
  m2[0] = 2 * m1[0] - m2[0];
  m2[1] = 2 * m1[1] - m2[1];

  if (recursive) {
    return [m2, m3, m4].concat(res);
  }

  res = [m2, m3, m4].concat(res).join().split(',');
  var newres = [];

  for (var i = 0, ii = res.length; i < ii; i++) {
    newres[i] = i % 2 ? rotate(res[i - 1], res[i], rad).y : rotate(res[i], res[i + 1], rad).x;
  }

  return newres;
};

var pathTocurve = function pathTocurve(path, path2) {
  var p = pathToAbsolute(path);
  var p2 = path2 && pathToAbsolute(path2);
  var attrs = {
    x: 0,
    y: 0,
    bx: 0,
    by: 0,
    X: 0,
    Y: 0,
    qx: null,
    qy: null
  };
  var attrs2 = {
    x: 0,
    y: 0,
    bx: 0,
    by: 0,
    X: 0,
    Y: 0,
    qx: null,
    qy: null
  };
  var pcoms1 = []; // path commands of original path p

  var pcoms2 = []; // path commands of original path p2

  var pfirst = ''; // temporary holder for original path command

  var pcom = ''; // holder for previous path command of original path

  var ii;

  var processPath = function processPath(path, d, pcom) {
    var nx, ny;

    if (!path) {
      return ['C', d.x, d.y, d.x, d.y, d.x, d.y];
    }

    !(path[0] in {
      T: 1,
      Q: 1
    }) && (d.qx = d.qy = null);

    switch (path[0]) {
      case 'M':
        d.X = path[1];
        d.Y = path[2];
        break;

      case 'A':
        path = ['C'].concat(a2c.apply(0, [d.x, d.y].concat(path.slice(1))));
        break;

      case 'S':
        if (pcom === 'C' || pcom === 'S') {
          // In "S" case we have to take into account, if the previous command is C/S.
          nx = d.x * 2 - d.bx; // And reflect the previous

          ny = d.y * 2 - d.by; // command's control point relative to the current point.
        } else {
          // or some else or nothing
          nx = d.x;
          ny = d.y;
        }

        path = ['C', nx, ny].concat(path.slice(1));
        break;

      case 'T':
        if (pcom === 'Q' || pcom === 'T') {
          // In "T" case we have to take into account, if the previous command is Q/T.
          d.qx = d.x * 2 - d.qx; // And make a reflection similar

          d.qy = d.y * 2 - d.qy; // to case "S".
        } else {
          // or something else or nothing
          d.qx = d.x;
          d.qy = d.y;
        }

        path = ['C'].concat(q2c(d.x, d.y, d.qx, d.qy, path[1], path[2]));
        break;

      case 'Q':
        d.qx = path[1];
        d.qy = path[2];
        path = ['C'].concat(q2c(d.x, d.y, path[1], path[2], path[3], path[4]));
        break;

      case 'L':
        path = ['C'].concat(l2c(d.x, d.y, path[1], path[2]));
        break;

      case 'H':
        path = ['C'].concat(l2c(d.x, d.y, path[1], d.y));
        break;

      case 'V':
        path = ['C'].concat(l2c(d.x, d.y, d.x, path[1]));
        break;

      case 'Z':
        path = ['C'].concat(l2c(d.x, d.y, d.X, d.Y));
        break;

      default:
        break;
    }

    return path;
  };

  var fixArc = function fixArc(pp, i) {
    if (pp[i].length > 7) {
      pp[i].shift();
      var pi = pp[i];

      while (pi.length) {
        pcoms1[i] = 'A'; // if created multiple C:s, their original seg is saved

        p2 && (pcoms2[i] = 'A'); // the same as above

        pp.splice(i++, 0, ['C'].concat(pi.splice(0, 6)));
      }

      pp.splice(i, 1);
      ii = Math.max(p.length, p2 && p2.length || 0);
    }
  };

  var fixM = function fixM(path1, path2, a1, a2, i) {
    if (path1 && path2 && path1[i][0] === 'M' && path2[i][0] !== 'M') {
      path2.splice(i, 0, ['M', a2.x, a2.y]);
      a1.bx = 0;
      a1.by = 0;
      a1.x = path1[i][1];
      a1.y = path1[i][2];
      ii = Math.max(p.length, p2 && p2.length || 0);
    }
  };

  ii = Math.max(p.length, p2 && p2.length || 0);

  for (var i = 0; i < ii; i++) {
    p[i] && (pfirst = p[i][0]); // save current path command

    if (pfirst !== 'C') {
      // C is not saved yet, because it may be result of conversion
      pcoms1[i] = pfirst; // Save current path command

      i && (pcom = pcoms1[i - 1]); // Get previous path command pcom
    }

    p[i] = processPath(p[i], attrs, pcom); // Previous path command is inputted to processPath

    if (pcoms1[i] !== 'A' && pfirst === 'C') pcoms1[i] = 'C'; // A is the only command
    // which may produce multiple C:s
    // so we have to make sure that C is also C in original path

    fixArc(p, i); // fixArc adds also the right amount of A:s to pcoms1

    if (p2) {
      // the same procedures is done to p2
      p2[i] && (pfirst = p2[i][0]);

      if (pfirst !== 'C') {
        pcoms2[i] = pfirst;
        i && (pcom = pcoms2[i - 1]);
      }

      p2[i] = processPath(p2[i], attrs2, pcom);

      if (pcoms2[i] !== 'A' && pfirst === 'C') {
        pcoms2[i] = 'C';
      }

      fixArc(p2, i);
    }

    fixM(p, p2, attrs, attrs2, i);
    fixM(p2, p, attrs2, attrs, i);
    var seg = p[i];
    var seg2 = p2 && p2[i];
    var seglen = seg.length;
    var seg2len = p2 && seg2.length;
    attrs.x = seg[seglen - 2];
    attrs.y = seg[seglen - 1];
    attrs.bx = parseFloat(seg[seglen - 4]) || attrs.x;
    attrs.by = parseFloat(seg[seglen - 3]) || attrs.y;
    attrs2.bx = p2 && (parseFloat(seg2[seg2len - 4]) || attrs2.x);
    attrs2.by = p2 && (parseFloat(seg2[seg2len - 3]) || attrs2.y);
    attrs2.x = p2 && seg2[seg2len - 2];
    attrs2.y = p2 && seg2[seg2len - 1];
  }

  return p2 ? [p, p2] : p;
};

var p2s = /,?([a-z]),?/gi;

var parsePathArray = function parsePathArray(path) {
  return path.join(',').replace(p2s, '$1');
};

var base3 = function base3(t, p1, p2, p3, p4) {
  var t1 = -3 * p1 + 9 * p2 - 9 * p3 + 3 * p4;
  var t2 = t * t1 + 6 * p1 - 12 * p2 + 6 * p3;
  return t * t2 - 3 * p1 + 3 * p2;
};

var bezlen = function bezlen(x1, y1, x2, y2, x3, y3, x4, y4, z) {
  if (z === null) {
    z = 1;
  }

  z = z > 1 ? 1 : z < 0 ? 0 : z;
  var z2 = z / 2;
  var n = 12;
  var Tvalues = [-0.1252, 0.1252, -0.3678, 0.3678, -0.5873, 0.5873, -0.7699, 0.7699, -0.9041, 0.9041, -0.9816, 0.9816];
  var Cvalues = [0.2491, 0.2491, 0.2335, 0.2335, 0.2032, 0.2032, 0.1601, 0.1601, 0.1069, 0.1069, 0.0472, 0.0472];
  var sum = 0;

  for (var i = 0; i < n; i++) {
    var ct = z2 * Tvalues[i] + z2;
    var xbase = base3(ct, x1, x2, x3, x4);
    var ybase = base3(ct, y1, y2, y3, y4);
    var comb = xbase * xbase + ybase * ybase;
    sum += Cvalues[i] * Math.sqrt(comb);
  }

  return z2 * sum;
};

var curveDim = function curveDim(x0, y0, x1, y1, x2, y2, x3, y3) {
  var tvalues = [];
  var bounds = [[], []];
  var a;
  var b;
  var c;
  var t;

  for (var i = 0; i < 2; ++i) {
    if (i === 0) {
      b = 6 * x0 - 12 * x1 + 6 * x2;
      a = -3 * x0 + 9 * x1 - 9 * x2 + 3 * x3;
      c = 3 * x1 - 3 * x0;
    } else {
      b = 6 * y0 - 12 * y1 + 6 * y2;
      a = -3 * y0 + 9 * y1 - 9 * y2 + 3 * y3;
      c = 3 * y1 - 3 * y0;
    }

    if (Math.abs(a) < 1e-12) {
      if (Math.abs(b) < 1e-12) {
        continue;
      }

      t = -c / b;

      if (t > 0 && t < 1) {
        tvalues.push(t);
      }

      continue;
    }

    var b2ac = b * b - 4 * c * a;
    var sqrtb2ac = Math.sqrt(b2ac);

    if (b2ac < 0) {
      continue;
    }

    var t1 = (-b + sqrtb2ac) / (2 * a);

    if (t1 > 0 && t1 < 1) {
      tvalues.push(t1);
    }

    var t2 = (-b - sqrtb2ac) / (2 * a);

    if (t2 > 0 && t2 < 1) {
      tvalues.push(t2);
    }
  }

  var j = tvalues.length;
  var jlen = j;
  var mt;

  while (j--) {
    t = tvalues[j];
    mt = 1 - t;
    bounds[0][j] = mt * mt * mt * x0 + 3 * mt * mt * t * x1 + 3 * mt * t * t * x2 + t * t * t * x3;
    bounds[1][j] = mt * mt * mt * y0 + 3 * mt * mt * t * y1 + 3 * mt * t * t * y2 + t * t * t * y3;
  }

  bounds[0][jlen] = x0;
  bounds[1][jlen] = y0;
  bounds[0][jlen + 1] = x3;
  bounds[1][jlen + 1] = y3;
  bounds[0].length = bounds[1].length = jlen + 2;
  return {
    min: {
      x: Math.min.apply(0, bounds[0]),
      y: Math.min.apply(0, bounds[1])
    },
    max: {
      x: Math.max.apply(0, bounds[0]),
      y: Math.max.apply(0, bounds[1])
    }
  };
};

var intersect = function intersect(x1, y1, x2, y2, x3, y3, x4, y4) {
  if (Math.max(x1, x2) < Math.min(x3, x4) || Math.min(x1, x2) > Math.max(x3, x4) || Math.max(y1, y2) < Math.min(y3, y4) || Math.min(y1, y2) > Math.max(y3, y4)) {
    return;
  }

  var nx = (x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4);
  var ny = (x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4);
  var denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

  if (!denominator) {
    return;
  }

  var px = nx / denominator;
  var py = ny / denominator;
  var px2 = +px.toFixed(2);
  var py2 = +py.toFixed(2);

  if (px2 < +Math.min(x1, x2).toFixed(2) || px2 > +Math.max(x1, x2).toFixed(2) || px2 < +Math.min(x3, x4).toFixed(2) || px2 > +Math.max(x3, x4).toFixed(2) || py2 < +Math.min(y1, y2).toFixed(2) || py2 > +Math.max(y1, y2).toFixed(2) || py2 < +Math.min(y3, y4).toFixed(2) || py2 > +Math.max(y3, y4).toFixed(2)) {
    return;
  }

  return {
    x: px,
    y: py
  };
};

var isPointInsideBBox = function isPointInsideBBox(bbox, x, y) {
  return x >= bbox.x && x <= bbox.x + bbox.width && y >= bbox.y && y <= bbox.y + bbox.height;
};

var rectPath = function rectPath(x, y, w, h, r) {
  if (r) {
    return [['M', +x + +r, y], ['l', w - r * 2, 0], ['a', r, r, 0, 0, 1, r, r], ['l', 0, h - r * 2], ['a', r, r, 0, 0, 1, -r, r], ['l', r * 2 - w, 0], ['a', r, r, 0, 0, 1, -r, -r], ['l', 0, r * 2 - h], ['a', r, r, 0, 0, 1, r, -r], ['z']];
  }

  var res = [['M', x, y], ['l', w, 0], ['l', 0, h], ['l', -w, 0], ['z']];
  res.parsePathArray = parsePathArray;
  return res;
};

var box = function box(x, y, width, height) {
  if (x === null) {
    x = y = width = height = 0;
  }

  if (y === null) {
    y = x.y;
    width = x.width;
    height = x.height;
    x = x.x;
  }

  return {
    x: x,
    y: y,
    width: width,
    w: width,
    height: height,
    h: height,
    x2: x + width,
    y2: y + height,
    cx: x + width / 2,
    cy: y + height / 2,
    r1: Math.min(width, height) / 2,
    r2: Math.max(width, height) / 2,
    r0: Math.sqrt(width * width + height * height) / 2,
    path: rectPath(x, y, width, height),
    vb: [x, y, width, height].join(' ')
  };
};

var isBBoxIntersect = function isBBoxIntersect(bbox1, bbox2) {
  bbox1 = box(bbox1);
  bbox2 = box(bbox2);
  return isPointInsideBBox(bbox2, bbox1.x, bbox1.y) || isPointInsideBBox(bbox2, bbox1.x2, bbox1.y) || isPointInsideBBox(bbox2, bbox1.x, bbox1.y2) || isPointInsideBBox(bbox2, bbox1.x2, bbox1.y2) || isPointInsideBBox(bbox1, bbox2.x, bbox2.y) || isPointInsideBBox(bbox1, bbox2.x2, bbox2.y) || isPointInsideBBox(bbox1, bbox2.x, bbox2.y2) || isPointInsideBBox(bbox1, bbox2.x2, bbox2.y2) || (bbox1.x < bbox2.x2 && bbox1.x > bbox2.x || bbox2.x < bbox1.x2 && bbox2.x > bbox1.x) && (bbox1.y < bbox2.y2 && bbox1.y > bbox2.y || bbox2.y < bbox1.y2 && bbox2.y > bbox1.y);
};

var bezierBBox = function bezierBBox(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y) {
  if (!Util.isArray(p1x)) {
    p1x = [p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y];
  }

  var bbox = curveDim.apply(null, p1x);
  return box(bbox.min.x, bbox.min.y, bbox.max.x - bbox.min.x, bbox.max.y - bbox.min.y);
};

var findDotsAtSegment = function findDotsAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t) {
  var t1 = 1 - t;
  var t13 = Math.pow(t1, 3);
  var t12 = Math.pow(t1, 2);
  var t2 = t * t;
  var t3 = t2 * t;
  var x = t13 * p1x + t12 * 3 * t * c1x + t1 * 3 * t * t * c2x + t3 * p2x;
  var y = t13 * p1y + t12 * 3 * t * c1y + t1 * 3 * t * t * c2y + t3 * p2y;
  var mx = p1x + 2 * t * (c1x - p1x) + t2 * (c2x - 2 * c1x + p1x);
  var my = p1y + 2 * t * (c1y - p1y) + t2 * (c2y - 2 * c1y + p1y);
  var nx = c1x + 2 * t * (c2x - c1x) + t2 * (p2x - 2 * c2x + c1x);
  var ny = c1y + 2 * t * (c2y - c1y) + t2 * (p2y - 2 * c2y + c1y);
  var ax = t1 * p1x + t * c1x;
  var ay = t1 * p1y + t * c1y;
  var cx = t1 * c2x + t * p2x;
  var cy = t1 * c2y + t * p2y;
  var alpha = 90 - Math.atan2(mx - nx, my - ny) * 180 / Math.PI; // (mx > nx || my < ny) && (alpha += 180);

  return {
    x: x,
    y: y,
    m: {
      x: mx,
      y: my
    },
    n: {
      x: nx,
      y: ny
    },
    start: {
      x: ax,
      y: ay
    },
    end: {
      x: cx,
      y: cy
    },
    alpha: alpha
  };
};

var interHelper = function interHelper(bez1, bez2, justCount) {
  var bbox1 = bezierBBox(bez1);
  var bbox2 = bezierBBox(bez2);

  if (!isBBoxIntersect(bbox1, bbox2)) {
    return justCount ? 0 : [];
  }

  var l1 = bezlen.apply(0, bez1);
  var l2 = bezlen.apply(0, bez2);
  var n1 = ~~(l1 / 8);
  var n2 = ~~(l2 / 8);
  var dots1 = [];
  var dots2 = [];
  var xy = {};
  var res = justCount ? 0 : [];

  for (var i = 0; i < n1 + 1; i++) {
    var d = findDotsAtSegment.apply(0, bez1.concat(i / n1));
    dots1.push({
      x: d.x,
      y: d.y,
      t: i / n1
    });
  }

  for (var _i = 0; _i < n2 + 1; _i++) {
    var _d = findDotsAtSegment.apply(0, bez2.concat(_i / n2));

    dots2.push({
      x: _d.x,
      y: _d.y,
      t: _i / n2
    });
  }

  for (var _i2 = 0; _i2 < n1; _i2++) {
    for (var j = 0; j < n2; j++) {
      var di = dots1[_i2];
      var di1 = dots1[_i2 + 1];
      var dj = dots2[j];
      var dj1 = dots2[j + 1];
      var ci = Math.abs(di1.x - di.x) < 0.001 ? 'y' : 'x';
      var cj = Math.abs(dj1.x - dj.x) < 0.001 ? 'y' : 'x';
      var is = intersect(di.x, di.y, di1.x, di1.y, dj.x, dj.y, dj1.x, dj1.y);

      if (is) {
        if (xy[is.x.toFixed(4)] === is.y.toFixed(4)) {
          continue;
        }

        xy[is.x.toFixed(4)] = is.y.toFixed(4);
        var t1 = di.t + Math.abs((is[ci] - di[ci]) / (di1[ci] - di[ci])) * (di1.t - di.t);
        var t2 = dj.t + Math.abs((is[cj] - dj[cj]) / (dj1[cj] - dj[cj])) * (dj1.t - dj.t);

        if (t1 >= 0 && t1 <= 1 && t2 >= 0 && t2 <= 1) {
          if (justCount) {
            res++;
          } else {
            res.push({
              x: is.x,
              y: is.y,
              t1: t1,
              t2: t2
            });
          }
        }
      }
    }
  }

  return res;
};

var interPathHelper = function interPathHelper(path1, path2, justCount) {
  path1 = pathTocurve(path1);
  path2 = pathTocurve(path2);
  var x1;
  var y1;
  var x2;
  var y2;
  var x1m;
  var y1m;
  var x2m;
  var y2m;
  var bez1;
  var bez2;
  var res = justCount ? 0 : [];

  for (var i = 0, ii = path1.length; i < ii; i++) {
    var pi = path1[i];

    if (pi[0] === 'M') {
      x1 = x1m = pi[1];
      y1 = y1m = pi[2];
    } else {
      if (pi[0] === 'C') {
        bez1 = [x1, y1].concat(pi.slice(1));
        x1 = bez1[6];
        y1 = bez1[7];
      } else {
        bez1 = [x1, y1, x1, y1, x1m, y1m, x1m, y1m];
        x1 = x1m;
        y1 = y1m;
      }

      for (var j = 0, jj = path2.length; j < jj; j++) {
        var pj = path2[j];

        if (pj[0] === 'M') {
          x2 = x2m = pj[1];
          y2 = y2m = pj[2];
        } else {
          if (pj[0] === 'C') {
            bez2 = [x2, y2].concat(pj.slice(1));
            x2 = bez2[6];
            y2 = bez2[7];
          } else {
            bez2 = [x2, y2, x2, y2, x2m, y2m, x2m, y2m];
            x2 = x2m;
            y2 = y2m;
          }

          var intr = interHelper(bez1, bez2, justCount);

          if (justCount) {
            res += intr;
          } else {
            for (var k = 0, kk = intr.length; k < kk; k++) {
              intr[k].segment1 = i;
              intr[k].segment2 = j;
              intr[k].bez1 = bez1;
              intr[k].bez2 = bez2;
            }

            res = res.concat(intr);
          }
        }
      }
    }
  }

  return res;
};

var pathIntersection = function pathIntersection(path1, path2) {
  return interPathHelper(path1, path2);
};

function decasteljau(points, t) {
  var left = [];
  var right = [];

  function recurse(points, t) {
    if (points.length === 1) {
      left.push(points[0]);
      right.push(points[0]);
    } else {
      var middlePoints = [];

      for (var i = 0; i < points.length - 1; i++) {
        if (i === 0) {
          left.push(points[0]);
        }

        if (i === points.length - 2) {
          right.push(points[i + 1]);
        }

        middlePoints[i] = [(1 - t) * points[i][0] + t * points[i + 1][0], (1 - t) * points[i][1] + t * points[i + 1][1]];
      }

      recurse(middlePoints, t);
    }
  }

  if (points.length) {
    recurse(points, t);
  }

  return {
    left: left,
    right: right.reverse()
  };
}

function splitCurve(start, end, count) {
  var points = [[start[1], start[2]]];
  count = count || 2;
  var segments = [];

  if (end[0] === 'A') {
    points.push(end[6]);
    points.push(end[7]);
  } else if (end[0] === 'C') {
    points.push([end[1], end[2]]);
    points.push([end[3], end[4]]);
    points.push([end[5], end[6]]);
  } else if (end[0] === 'S' || end[0] === 'Q') {
    points.push([end[1], end[2]]);
    points.push([end[3], end[4]]);
  } else {
    points.push([end[1], end[2]]);
  }

  var leftSegments = points;
  var t = 1 / count;

  for (var i = 0; i < count - 1; i++) {
    var rt = t / (1 - t * i);
    var split = decasteljau(leftSegments, rt);
    segments.push(split.left);
    leftSegments = split.right;
  }

  segments.push(leftSegments);
  var result = segments.map(function (segment) {
    var cmd = [];

    if (segment.length === 4) {
      cmd.push('C');
      cmd = cmd.concat(segment[2]);
    }

    if (segment.length >= 3) {
      if (segment.length === 3) {
        cmd.push('Q');
      }

      cmd = cmd.concat(segment[1]);
    }

    if (segment.length === 2) {
      cmd.push('L');
    }

    cmd = cmd.concat(segment[segment.length - 1]);
    return cmd;
  });
  return result;
}

var splitSegment = function splitSegment(start, end, count) {
  if (count === 1) {
    return [[].concat(start)];
  }

  var segments = [];

  if (end[0] === 'L' || end[0] === 'C' || end[0] === 'Q') {
    segments = segments.concat(splitCurve(start, end, count));
  } else {
    var temp = [].concat(start);

    if (temp[0] === 'M') {
      temp[0] = 'L';
    }

    for (var i = 0; i <= count - 1; i++) {
      segments.push(temp);
    }
  }

  return segments;
};

var fillPath = function fillPath(source, target) {
  if (source.length === 1) {
    return source;
  }

  var sourceLen = source.length - 1;
  var targetLen = target.length - 1;
  var ratio = sourceLen / targetLen;
  var segmentsToFill = [];

  if (source.length === 1 && source[0][0] === 'M') {
    for (var i = 0; i < targetLen - sourceLen; i++) {
      source.push(source[0]);
    }

    return source;
  }

  for (var _i3 = 0; _i3 < targetLen; _i3++) {
    var index = Math.floor(ratio * _i3);
    segmentsToFill[index] = (segmentsToFill[index] || 0) + 1;
  }

  var filled = segmentsToFill.reduce(function (filled, count, i) {
    if (i === sourceLen) {
      return filled.concat(source[sourceLen]);
    }

    return filled.concat(splitSegment(source[i], source[i + 1], count));
  }, []);
  filled.unshift(source[0]);

  if (target[targetLen] === 'Z' || target[targetLen] === 'z') {
    filled.push('Z');
  }

  return filled;
};

var isEqual = function isEqual(obj1, obj2) {
  if (obj1.length !== obj2.length) {
    return false;
  }

  var result = true;
  Util.each(obj1, function (item, i) {
    if (item !== obj2[i]) {
      result = false;
      return false;
    }
  });
  return result;
};

function getMinDiff(del, add, modify) {
  var type = null;
  var min = modify;

  if (add < min) {
    min = add;
    type = 'add';
  }

  if (del < min) {
    min = del;
    type = 'del';
  }

  return {
    type: type,
    min: min
  };
}
/*
 * https://en.wikipedia.org/wiki/Levenshtein_distance
 * 计算两条path的编辑距离
 */


var levenshteinDistance = function levenshteinDistance(source, target) {
  var sourceLen = source.length;
  var targetLen = target.length;
  var sourceSegment, targetSegment;
  var temp = 0;

  if (sourceLen === 0 || targetLen === 0) {
    return null;
  }

  var dist = [];

  for (var i = 0; i <= sourceLen; i++) {
    dist[i] = [];
    dist[i][0] = {
      min: i
    };
  }

  for (var j = 0; j <= targetLen; j++) {
    dist[0][j] = {
      min: j
    };
  }

  for (var _i4 = 1; _i4 <= sourceLen; _i4++) {
    sourceSegment = source[_i4 - 1];

    for (var _j2 = 1; _j2 <= targetLen; _j2++) {
      targetSegment = target[_j2 - 1];

      if (isEqual(sourceSegment, targetSegment)) {
        temp = 0;
      } else {
        temp = 1;
      }

      var del = dist[_i4 - 1][_j2].min + 1;
      var add = dist[_i4][_j2 - 1].min + 1;
      var modify = dist[_i4 - 1][_j2 - 1].min + temp;
      dist[_i4][_j2] = getMinDiff(del, add, modify);
    }
  }

  return dist;
};

var fillPathByDiff = function fillPathByDiff(source, target) {
  var diffMatrix = levenshteinDistance(source, target);
  var sourceLen = source.length;
  var targetLen = target.length;
  var changes = [];
  var index = 1;
  var minPos = 1; // 如果source和target不是完全不相等

  if (diffMatrix[sourceLen][targetLen] !== sourceLen) {
    // 获取从source到target所需改动
    for (var i = 1; i <= sourceLen; i++) {
      var min = diffMatrix[i][i].min;
      minPos = i;

      for (var j = index; j <= targetLen; j++) {
        if (diffMatrix[i][j].min < min) {
          min = diffMatrix[i][j].min;
          minPos = j;
        }
      }

      index = minPos;

      if (diffMatrix[i][index].type) {
        changes.push({
          index: i - 1,
          type: diffMatrix[i][index].type
        });
      }
    } // 对source进行增删path


    for (var _i5 = changes.length - 1; _i5 >= 0; _i5--) {
      index = changes[_i5].index;

      if (changes[_i5].type === 'add') {
        source.splice(index, 0, [].concat(source[index]));
      } else {
        source.splice(index, 1);
      }
    }
  } // source尾部补齐


  sourceLen = source.length;
  var diff = targetLen - sourceLen;

  if (sourceLen < targetLen) {
    for (var _i6 = 0; _i6 < diff; _i6++) {
      if (source[sourceLen - 1][0] === 'z' || source[sourceLen - 1][0] === 'Z') {
        source.splice(sourceLen - 2, 0, source[sourceLen - 2]);
      } else {
        source.push(source[sourceLen - 1]);
      }

      sourceLen += 1;
    }
  }

  return source;
}; // 将两个点均分成count个点


function _splitPoints(points, former, count) {
  var result = [].concat(points);
  var index;
  var t = 1 / (count + 1);

  var formerEnd = _getSegmentPoints(former)[0];

  for (var i = 1; i <= count; i++) {
    t *= i;
    index = Math.floor(points.length * t);

    if (index === 0) {
      result.unshift([formerEnd[0] * t + points[index][0] * (1 - t), formerEnd[1] * t + points[index][1] * (1 - t)]);
    } else {
      result.splice(index, 0, [formerEnd[0] * t + points[index][0] * (1 - t), formerEnd[1] * t + points[index][1] * (1 - t)]);
    }
  }

  return result;
}
/*
 * 抽取pathSegment中的关键点
 * M,L,A,Q,H,V一个端点
 * Q, S抽取一个端点，一个控制点
 * C抽取一个端点，两个控制点
 */


function _getSegmentPoints(segment) {
  var points = [];

  switch (segment[0]) {
    case 'M':
      points.push([segment[1], segment[2]]);
      break;

    case 'L':
      points.push([segment[1], segment[2]]);
      break;

    case 'A':
      points.push([segment[6], segment[7]]);
      break;

    case 'Q':
      points.push([segment[3], segment[4]]);
      points.push([segment[1], segment[2]]);
      break;

    case 'T':
      points.push([segment[1], segment[2]]);
      break;

    case 'C':
      points.push([segment[5], segment[6]]);
      points.push([segment[1], segment[2]]);
      points.push([segment[3], segment[4]]);
      break;

    case 'S':
      points.push([segment[3], segment[4]]);
      points.push([segment[1], segment[2]]);
      break;

    case 'H':
      points.push([segment[1], segment[1]]);
      break;

    case 'V':
      points.push([segment[1], segment[1]]);
      break;

    default:
  }

  return points;
}

var formatPath = function formatPath(fromPath, toPath) {
  if (fromPath.length <= 1) {
    return fromPath;
  }

  var points;

  for (var i = 0; i < toPath.length; i++) {
    if (fromPath[i][0] !== toPath[i][0]) {
      // 获取fromPath的pathSegment的端点，根据toPath的指令对其改造
      points = _getSegmentPoints(fromPath[i]);

      switch (toPath[i][0]) {
        case 'M':
          fromPath[i] = ['M'].concat(points[0]);
          break;

        case 'L':
          fromPath[i] = ['L'].concat(points[0]);
          break;

        case 'A':
          fromPath[i] = [].concat(toPath[i]);
          fromPath[i][6] = points[0][0];
          fromPath[i][7] = points[0][1];
          break;

        case 'Q':
          if (points.length < 2) {
            if (i > 0) {
              points = _splitPoints(points, fromPath[i - 1], 1);
            } else {
              fromPath[i] = toPath[i];
              break;
            }
          }

          fromPath[i] = ['Q'].concat(points.reduce(function (arr, i) {
            return arr.concat(i);
          }, []));
          break;

        case 'T':
          fromPath[i] = ['T'].concat(points[0]);
          break;

        case 'C':
          if (points.length < 3) {
            if (i > 0) {
              points = _splitPoints(points, fromPath[i - 1], 2);
            } else {
              fromPath[i] = toPath[i];
              break;
            }
          }

          fromPath[i] = ['C'].concat(points.reduce(function (arr, i) {
            return arr.concat(i);
          }, []));
          break;

        case 'S':
          if (points.length < 2) {
            if (i > 0) {
              points = _splitPoints(points, fromPath[i - 1], 1);
            } else {
              fromPath[i] = toPath[i];
              break;
            }
          }

          fromPath[i] = ['S'].concat(points.reduce(function (arr, i) {
            return arr.concat(i);
          }, []));
          break;

        default:
          fromPath[i] = toPath[i];
      }
    }
  }

  return fromPath;
};

module.exports = {
  parsePathString: parsePathString,
  parsePathArray: parsePathArray,
  pathTocurve: pathTocurve,
  pathToAbsolute: pathToAbsolute,
  catmullRomToBezier: catmullRom2bezier,
  rectPath: rectPath,
  fillPath: fillPath,
  fillPathByDiff: fillPathByDiff,
  formatPath: formatPath,
  intersection: pathIntersection
};

/***/ }),

/***/ "./node_modules/@antv/g/node_modules/@antv/util/lib/array/pull.js":
/*!************************************************************************!*\
  !*** ./node_modules/@antv/g/node_modules/@antv/util/lib/array/pull.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var arrPrototype = Array.prototype;
var splice = arrPrototype.splice;
var indexOf = arrPrototype.indexOf;
var slice = arrPrototype.slice;

var pull = function pull(arr) {
  var values = slice.call(arguments, 1);
  for (var i = 0; i < values.length; i++) {
    var value = values[i];
    var fromIndex = -1;
    while ((fromIndex = indexOf.call(arr, value)) > -1) {
      splice.call(arr, fromIndex, 1);
    }
  }
  return arr;
};

module.exports = pull;

/***/ }),

/***/ "./node_modules/@antv/g/node_modules/@antv/util/lib/augment.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@antv/g/node_modules/@antv/util/lib/augment.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(/*! ./type/is-function */ "./node_modules/@antv/g/node_modules/@antv/util/lib/type/is-function.js");
var toArray = __webpack_require__(/*! ./to-array */ "./node_modules/@antv/g/node_modules/@antv/util/lib/to-array.js");
var mix = __webpack_require__(/*! ./mix */ "./node_modules/@antv/g/node_modules/@antv/util/lib/mix.js");

var augment = function augment(c) {
  var args = toArray(arguments);
  for (var i = 1; i < args.length; i++) {
    var obj = args[i];
    if (isFunction(obj)) {
      obj = obj.prototype;
    }
    mix(c.prototype, obj);
  }
};

module.exports = augment;

/***/ }),

/***/ "./node_modules/@antv/g/node_modules/@antv/util/lib/clone.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@antv/g/node_modules/@antv/util/lib/clone.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var isArray = __webpack_require__(/*! ./type/is-array */ "./node_modules/@antv/g/node_modules/@antv/util/lib/type/is-array.js");

var clone = function clone(obj) {
  if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object' || obj === null) {
    return obj;
  }
  var rst = void 0;
  if (isArray(obj)) {
    rst = [];
    for (var i = 0, l = obj.length; i < l; i++) {
      if (_typeof(obj[i]) === 'object' && obj[i] != null) {
        rst[i] = clone(obj[i]);
      } else {
        rst[i] = obj[i];
      }
    }
  } else {
    rst = {};
    for (var k in obj) {
      if (_typeof(obj[k]) === 'object' && obj[k] != null) {
        rst[k] = clone(obj[k]);
      } else {
        rst[k] = obj[k];
      }
    }
  }

  return rst;
};

module.exports = clone;

/***/ }),

/***/ "./node_modules/@antv/g/node_modules/@antv/util/lib/deep-mix.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@antv/g/node_modules/@antv/util/lib/deep-mix.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isPlainObject = __webpack_require__(/*! ./type/is-plain-object */ "./node_modules/@antv/g/node_modules/@antv/util/lib/type/is-plain-object.js");
var isArray = __webpack_require__(/*! ./type/is-array */ "./node_modules/@antv/g/node_modules/@antv/util/lib/type/is-array.js");

var MAX_MIX_LEVEL = 5;

function _deepMix(dist, src, level, maxLevel) {
  level = level || 0;
  maxLevel = maxLevel || MAX_MIX_LEVEL;
  for (var key in src) {
    if (src.hasOwnProperty(key)) {
      var value = src[key];
      if (value !== null && isPlainObject(value)) {
        if (!isPlainObject(dist[key])) {
          dist[key] = {};
        }
        if (level < maxLevel) {
          _deepMix(dist[key], value, level + 1, maxLevel);
        } else {
          dist[key] = src[key];
        }
      } else if (isArray(value)) {
        dist[key] = [];
        dist[key] = dist[key].concat(value);
      } else if (value !== undefined) {
        dist[key] = value;
      }
    }
  }
}

var deepMix = function deepMix() {
  var args = new Array(arguments.length);
  var length = args.length;
  for (var i = 0; i < length; i++) {
    args[i] = arguments[i];
  }
  var rst = args[0];
  for (var _i = 1; _i < length; _i++) {
    _deepMix(rst, args[_i]);
  }
  return rst;
};

module.exports = deepMix;

/***/ }),

/***/ "./node_modules/@antv/g/node_modules/@antv/util/lib/dom/create-dom.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@antv/g/node_modules/@antv/util/lib/dom/create-dom.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * 创建DOM 节点
 * @param  {String} str Dom 字符串
 * @return {HTMLElement}  DOM 节点
 */
var TABLE = document.createElement('table');
var TABLE_TR = document.createElement('tr');
var FRAGMENT_REG = /^\s*<(\w+|!)[^>]*>/;
var CONTAINERS = {
  tr: document.createElement('tbody'),
  tbody: TABLE,
  thead: TABLE,
  tfoot: TABLE,
  td: TABLE_TR,
  th: TABLE_TR,
  '*': document.createElement('div')
};

module.exports = function createDom(str) {
  var name = FRAGMENT_REG.test(str) && RegExp.$1;
  if (!(name in CONTAINERS)) {
    name = '*';
  }
  var container = CONTAINERS[name];
  str = str.replace(/(^\s*)|(\s*$)/g, '');
  container.innerHTML = '' + str;
  var dom = container.childNodes[0];
  container.removeChild(dom);
  return dom;
};

/***/ }),

/***/ "./node_modules/@antv/g/node_modules/@antv/util/lib/dom/modify-css.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@antv/g/node_modules/@antv/util/lib/dom/modify-css.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {


module.exports = function modifyCSS(dom, css) {
  if (dom) {
    for (var key in css) {
      if (css.hasOwnProperty(key)) {
        dom.style[key] = css[key];
      }
    }
  }
  return dom;
};

/***/ }),

/***/ "./node_modules/@antv/g/node_modules/@antv/util/lib/dom/request-animation-frame.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/@antv/g/node_modules/@antv/util/lib/dom/request-animation-frame.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {


module.exports = function requestAnimationFrame(fn) {
  var method = window.requestAnimationFrame || window.webkitRequestAnimationFrame || function (fn) {
    return setTimeout(fn, 16);
  };

  return method(fn);
};

/***/ }),

/***/ "./node_modules/@antv/g/node_modules/@antv/util/lib/each.js":
/*!******************************************************************!*\
  !*** ./node_modules/@antv/g/node_modules/@antv/util/lib/each.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./type/is-object */ "./node_modules/@antv/g/node_modules/@antv/util/lib/type/is-object.js");
var isArray = __webpack_require__(/*! ./type/is-array */ "./node_modules/@antv/g/node_modules/@antv/util/lib/type/is-array.js");

var each = function each(elements, func) {
  if (!elements) {
    return;
  }
  var rst = void 0;
  if (isArray(elements)) {
    for (var i = 0, len = elements.length; i < len; i++) {
      rst = func(elements[i], i);
      if (rst === false) {
        break;
      }
    }
  } else if (isObject(elements)) {
    for (var k in elements) {
      if (elements.hasOwnProperty(k)) {
        rst = func(elements[k], k);
        if (rst === false) {
          break;
        }
      }
    }
  }
};

module.exports = each;

/***/ }),

/***/ "./node_modules/@antv/g/node_modules/@antv/util/lib/extend.js":
/*!********************************************************************!*\
  !*** ./node_modules/@antv/g/node_modules/@antv/util/lib/extend.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(/*! ./type/is-function */ "./node_modules/@antv/g/node_modules/@antv/util/lib/type/is-function.js");
var mix = __webpack_require__(/*! ./mix */ "./node_modules/@antv/g/node_modules/@antv/util/lib/mix.js");

var extend = function extend(subclass, superclass, overrides, staticOverrides) {
  // 如果只提供父类构造函数，则自动生成子类构造函数
  if (!isFunction(superclass)) {
    overrides = superclass;
    superclass = subclass;
    subclass = function subclass() {};
  }

  var create = Object.create ? function (proto, c) {
    return Object.create(proto, {
      constructor: {
        value: c
      }
    });
  } : function (proto, c) {
    function Tmp() {}
    Tmp.prototype = proto;
    var o = new Tmp();
    o.constructor = c;
    return o;
  };

  var superObj = create(superclass.prototype, subclass); // new superclass(),//实例化父类作为子类的prototype
  subclass.prototype = mix(superObj, subclass.prototype); // 指定子类的prototype
  subclass.superclass = create(superclass.prototype, superclass);
  mix(superObj, overrides);
  mix(subclass, staticOverrides);
  return subclass;
};

module.exports = extend;

/***/ }),

/***/ "./node_modules/@antv/g/node_modules/@antv/util/lib/is-empty.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@antv/g/node_modules/@antv/util/lib/is-empty.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isNil = __webpack_require__(/*! ./type/is-nil */ "./node_modules/@antv/g/node_modules/@antv/util/lib/type/is-nil.js");
var isArrayLike = __webpack_require__(/*! ./type/is-array-like */ "./node_modules/@antv/g/node_modules/@antv/util/lib/type/is-array-like.js");
var getType = __webpack_require__(/*! ./type/get-type */ "./node_modules/@antv/g/node_modules/@antv/util/lib/type/get-type.js");
var isPrototype = __webpack_require__(/*! ./type/is-prototype */ "./node_modules/@antv/g/node_modules/@antv/util/lib/type/is-prototype.js");
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isEmpty(value) {
  /**
   * isEmpty(null) => true
   * isEmpty() => true
   * isEmpty(true) => true
   * isEmpty(1) => true
   * isEmpty([1, 2, 3]) => false
   * isEmpty('abc') => false
   * isEmpty({ a: 1 }) => false
   */
  if (isNil(value)) {
    return true;
  }
  if (isArrayLike(value)) {
    return !value.length;
  }
  var type = getType(value);
  if (type === 'Map' || type === 'Set') {
    return !value.size;
  }
  if (isPrototype(value)) {
    return !Object.keys(value).length;
  }
  for (var key in value) {
    if (hasOwnProperty.call(value, key)) {
      return false;
    }
  }
  return true;
}

module.exports = isEmpty;

/***/ }),

/***/ "./node_modules/@antv/g/node_modules/@antv/util/lib/is-equal.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@antv/g/node_modules/@antv/util/lib/is-equal.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObjectLike = __webpack_require__(/*! ./type/is-object-like */ "./node_modules/@antv/g/node_modules/@antv/util/lib/type/is-object-like.js");
var isArrayLike = __webpack_require__(/*! ./type/is-array-like */ "./node_modules/@antv/g/node_modules/@antv/util/lib/type/is-array-like.js");
var isString = __webpack_require__(/*! ./type/is-string */ "./node_modules/@antv/g/node_modules/@antv/util/lib/type/is-string.js");

var isEqual = function isEqual(value, other) {
  if (value === other) {
    return true;
  }
  if (!value || !other) {
    return false;
  }
  if (isString(value) || isString(other)) {
    return false;
  }
  if (isArrayLike(value) || isArrayLike(other)) {
    if (value.length !== other.length) {
      return false;
    }
    var rst = true;
    for (var i = 0; i < value.length; i++) {
      rst = isEqual(value[i], other[i]);
      if (!rst) {
        break;
      }
    }
    return rst;
  }
  if (isObjectLike(value) || isObjectLike(other)) {
    var valueKeys = Object.keys(value);
    var otherKeys = Object.keys(other);
    if (valueKeys.length !== otherKeys.length) {
      return false;
    }
    var _rst = true;
    for (var _i = 0; _i < valueKeys.length; _i++) {
      _rst = isEqual(value[valueKeys[_i]], other[valueKeys[_i]]);
      if (!_rst) {
        break;
      }
    }
    return _rst;
  }
  return false;
};

module.exports = isEqual;

/***/ }),

/***/ "./node_modules/@antv/g/node_modules/@antv/util/lib/math/clamp.js":
/*!************************************************************************!*\
  !*** ./node_modules/@antv/g/node_modules/@antv/util/lib/math/clamp.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var clamp = function clamp(a, min, max) {
  if (a < min) {
    return min;
  } else if (a > max) {
    return max;
  }
  return a;
};

module.exports = clamp;

/***/ }),

/***/ "./node_modules/@antv/g/node_modules/@antv/util/lib/math/is-number-equal.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/@antv/g/node_modules/@antv/util/lib/math/is-number-equal.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var PRECISION = 0.00001; // numbers less than this is considered as 0

module.exports = function isNumberEqual(a, b) {
  var precision = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : PRECISION;

  return Math.abs(a - b) < precision;
};

/***/ }),

/***/ "./node_modules/@antv/g/node_modules/@antv/util/lib/math/mod.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@antv/g/node_modules/@antv/util/lib/math/mod.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var mod = function mod(n, m) {
  return (n % m + m) % m;
};

module.exports = mod;

/***/ }),

/***/ "./node_modules/@antv/g/node_modules/@antv/util/lib/math/to-degree.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@antv/g/node_modules/@antv/util/lib/math/to-degree.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var DEGREE = 180 / Math.PI;

var toDegree = function toDegree(radian) {
  return DEGREE * radian;
};

module.exports = toDegree;

/***/ }),

/***/ "./node_modules/@antv/g/node_modules/@antv/util/lib/math/to-radian.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@antv/g/node_modules/@antv/util/lib/math/to-radian.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var RADIAN = Math.PI / 180;

var toRadian = function toRadian(degree) {
  return RADIAN * degree;
};

module.exports = toRadian;

/***/ }),

/***/ "./node_modules/@antv/g/node_modules/@antv/util/lib/matrix/mat3.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@antv/g/node_modules/@antv/util/lib/matrix/mat3.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var mat3 = __webpack_require__(/*! @antv/gl-matrix/lib/gl-matrix/mat3 */ "./node_modules/@antv/gl-matrix/lib/gl-matrix/mat3.js");

mat3.translate = function (out, a, v) {
  var transMat = new Array(9);
  mat3.fromTranslation(transMat, v);
  return mat3.multiply(out, transMat, a);
};

mat3.rotate = function (out, a, rad) {
  var rotateMat = new Array(9);
  mat3.fromRotation(rotateMat, rad);
  return mat3.multiply(out, rotateMat, a);
};

mat3.scale = function (out, a, v) {
  var scaleMat = new Array(9);
  mat3.fromScaling(scaleMat, v);
  return mat3.multiply(out, scaleMat, a);
};

module.exports = mat3;

/***/ }),

/***/ "./node_modules/@antv/g/node_modules/@antv/util/lib/matrix/transform.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@antv/g/node_modules/@antv/util/lib/matrix/transform.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var clone = __webpack_require__(/*! ../clone */ "./node_modules/@antv/g/node_modules/@antv/util/lib/clone.js");
var each = __webpack_require__(/*! ../each */ "./node_modules/@antv/g/node_modules/@antv/util/lib/each.js");
var mat3 = __webpack_require__(/*! ./mat3 */ "./node_modules/@antv/g/node_modules/@antv/util/lib/matrix/mat3.js");

module.exports = function transform(m, ts) {
  m = clone(m);
  each(ts, function (t) {
    switch (t[0]) {
      case 't':
        mat3.translate(m, m, [t[1], t[2]]);
        break;
      case 's':
        mat3.scale(m, m, [t[1], t[2]]);
        break;
      case 'r':
        mat3.rotate(m, m, t[1]);
        break;
      case 'm':
        mat3.multiply(m, m, t[1]);
        break;
      default:
        return false;
    }
  });
  return m;
};

/***/ }),

/***/ "./node_modules/@antv/g/node_modules/@antv/util/lib/matrix/vec2.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@antv/g/node_modules/@antv/util/lib/matrix/vec2.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var vec2 = __webpack_require__(/*! @antv/gl-matrix/lib/gl-matrix/vec2 */ "./node_modules/@antv/gl-matrix/lib/gl-matrix/vec2.js");
var clamp = __webpack_require__(/*! ../math/clamp */ "./node_modules/@antv/g/node_modules/@antv/util/lib/math/clamp.js");

vec2.angle = function (v1, v2) {
  var theta = vec2.dot(v1, v2) / (vec2.length(v1) * vec2.length(v2));
  return Math.acos(clamp(theta, -1, 1));
};
/**
 * 向量 v1 到 向量 v2 夹角的方向
 * @param  {Array} v1 向量
 * @param  {Array} v2 向量
 * @return {Boolean} >= 0 顺时针 < 0 逆时针
 */
vec2.direction = function (v1, v2) {
  return v1[0] * v2[1] - v2[0] * v1[1];
};
vec2.angleTo = function (v1, v2, direct) {
  var angle = vec2.angle(v1, v2);
  var angleLargeThanPI = vec2.direction(v1, v2) >= 0;
  if (direct) {
    if (angleLargeThanPI) {
      return Math.PI * 2 - angle;
    }

    return angle;
  }

  if (angleLargeThanPI) {
    return angle;
  }
  return Math.PI * 2 - angle;
};
vec2.vertical = function (out, v, flag) {
  if (flag) {
    out[0] = v[1];
    out[1] = -1 * v[0];
  } else {
    out[0] = -1 * v[1];
    out[1] = v[0];
  }

  return out;
};

module.exports = vec2;

/***/ }),

/***/ "./node_modules/@antv/g/node_modules/@antv/util/lib/matrix/vec3.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@antv/g/node_modules/@antv/util/lib/matrix/vec3.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var vec3 = __webpack_require__(/*! @antv/gl-matrix/lib/gl-matrix/vec3 */ "./node_modules/@antv/gl-matrix/lib/gl-matrix/vec3.js");

module.exports = vec3;

/***/ }),

/***/ "./node_modules/@antv/g/node_modules/@antv/util/lib/mix.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@antv/g/node_modules/@antv/util/lib/mix.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _mix(dist, obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key) && key !== 'constructor' && obj[key] !== undefined) {
      dist[key] = obj[key];
    }
  }
}

var mix = function mix(dist, src1, src2, src3) {
  if (src1) _mix(dist, src1);
  if (src2) _mix(dist, src2);
  if (src3) _mix(dist, src3);
  return dist;
};

module.exports = mix;

/***/ }),

/***/ "./node_modules/@antv/g/node_modules/@antv/util/lib/string/upper-first.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@antv/g/node_modules/@antv/util/lib/string/upper-first.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toString = __webpack_require__(/*! ../to-string */ "./node_modules/@antv/g/node_modules/@antv/util/lib/to-string.js");

var upperFirst = function upperFirst(value) {
  var str = toString(value);
  return str.charAt(0).toUpperCase() + str.substring(1);
};

module.exports = upperFirst;

/***/ }),

/***/ "./node_modules/@antv/g/node_modules/@antv/util/lib/to-array.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@antv/g/node_modules/@antv/util/lib/to-array.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isArrayLike = __webpack_require__(/*! ./type/is-array-like */ "./node_modules/@antv/g/node_modules/@antv/util/lib/type/is-array-like.js");

function toArray(value) {
  return isArrayLike(value) ? Array.prototype.slice.call(value) : [];
}

module.exports = toArray;

/***/ }),

/***/ "./node_modules/@antv/g/node_modules/@antv/util/lib/to-string.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@antv/g/node_modules/@antv/util/lib/to-string.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isNil = __webpack_require__(/*! ./type/is-nil */ "./node_modules/@antv/g/node_modules/@antv/util/lib/type/is-nil.js");

function toString(value) {
  if (isNil(value)) return '';
  return value.toString();
}

module.exports = toString;

/***/ }),

/***/ "./node_modules/@antv/g/node_modules/@antv/util/lib/type/get-type.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@antv/g/node_modules/@antv/util/lib/type/get-type.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

var getType = function getType(value) {
  return toString.call(value).replace(/^\[object /, '').replace(/\]$/, '');
};

module.exports = getType;

/***/ }),

/***/ "./node_modules/@antv/g/node_modules/@antv/util/lib/type/is-array-like.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@antv/g/node_modules/@antv/util/lib/type/is-array-like.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var isArrayLike = function isArrayLike(value) {
  /**
   * isArrayLike([1, 2, 3]) => true
   * isArrayLike(document.body.children) => true
   * isArrayLike('abc') => true
   * isArrayLike(Function) => false
   */
  return value !== null && typeof value !== 'function' && isFinite(value.length);
};

module.exports = isArrayLike;

/***/ }),

/***/ "./node_modules/@antv/g/node_modules/@antv/util/lib/type/is-array.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@antv/g/node_modules/@antv/util/lib/type/is-array.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isType = __webpack_require__(/*! ./is-type */ "./node_modules/@antv/g/node_modules/@antv/util/lib/type/is-type.js");

var isArray = Array.isArray ? Array.isArray : function (value) {
  return isType(value, 'Array');
};

module.exports = isArray;

/***/ }),

/***/ "./node_modules/@antv/g/node_modules/@antv/util/lib/type/is-boolean.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@antv/g/node_modules/@antv/util/lib/type/is-boolean.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * 是否是布尔类型
 *
 * @param {Object} value 测试的值
 * @return {Boolean}
 */
var isType = __webpack_require__(/*! ./is-type */ "./node_modules/@antv/g/node_modules/@antv/util/lib/type/is-type.js");

var isBoolean = function isBoolean(value) {
  return isType(value, 'Boolean');
};

module.exports = isBoolean;

/***/ }),

/***/ "./node_modules/@antv/g/node_modules/@antv/util/lib/type/is-function.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@antv/g/node_modules/@antv/util/lib/type/is-function.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * 是否为函数
 * @param  {*} fn 对象
 * @return {Boolean}  是否函数
 */
var isType = __webpack_require__(/*! ./is-type */ "./node_modules/@antv/g/node_modules/@antv/util/lib/type/is-type.js");

var isFunction = function isFunction(value) {
  return isType(value, 'Function');
};

module.exports = isFunction;

/***/ }),

/***/ "./node_modules/@antv/g/node_modules/@antv/util/lib/type/is-nil.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@antv/g/node_modules/@antv/util/lib/type/is-nil.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// isFinite,
var isNil = function isNil(value) {
  /**
   * isNil(null) => true
   * isNil() => true
   */
  return value === null || value === undefined;
};

module.exports = isNil;

/***/ }),

/***/ "./node_modules/@antv/g/node_modules/@antv/util/lib/type/is-number.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@antv/g/node_modules/@antv/util/lib/type/is-number.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * 判断是否数字
 * @return {Boolean} 是否数字
 */
var isType = __webpack_require__(/*! ./is-type */ "./node_modules/@antv/g/node_modules/@antv/util/lib/type/is-type.js");

var isNumber = function isNumber(value) {
  return isType(value, 'Number');
};
module.exports = isNumber;

/***/ }),

/***/ "./node_modules/@antv/g/node_modules/@antv/util/lib/type/is-object-like.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@antv/g/node_modules/@antv/util/lib/type/is-object-like.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var isObjectLike = function isObjectLike(value) {
  /**
   * isObjectLike({}) => true
   * isObjectLike([1, 2, 3]) => true
   * isObjectLike(Function) => false
   * isObjectLike(null) => false
   */
  return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value !== null;
};

module.exports = isObjectLike;

/***/ }),

/***/ "./node_modules/@antv/g/node_modules/@antv/util/lib/type/is-object.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@antv/g/node_modules/@antv/util/lib/type/is-object.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var isObject = function isObject(value) {
  /**
   * isObject({}) => true
   * isObject([1, 2, 3]) => true
   * isObject(Function) => true
   * isObject(null) => false
   */
  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
  return value !== null && type === 'object' || type === 'function';
};

module.exports = isObject;

/***/ }),

/***/ "./node_modules/@antv/g/node_modules/@antv/util/lib/type/is-plain-object.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/@antv/g/node_modules/@antv/util/lib/type/is-plain-object.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObjectLike = __webpack_require__(/*! ./is-object-like */ "./node_modules/@antv/g/node_modules/@antv/util/lib/type/is-object-like.js");
var isType = __webpack_require__(/*! ./is-type */ "./node_modules/@antv/g/node_modules/@antv/util/lib/type/is-type.js");

var isPlainObject = function isPlainObject(value) {
  /**
   * isObjectLike(new Foo) => false
   * isObjectLike([1, 2, 3]) => false
   * isObjectLike({ x: 0, y: 0 }) => true
   * isObjectLike(Object.create(null)) => true
   */
  if (!isObjectLike(value) || !isType(value, 'Object')) {
    return false;
  }
  if (Object.getPrototypeOf(value) === null) {
    return true;
  }
  var proto = value;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(value) === proto;
};

module.exports = isPlainObject;

/***/ }),

/***/ "./node_modules/@antv/g/node_modules/@antv/util/lib/type/is-prototype.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@antv/g/node_modules/@antv/util/lib/type/is-prototype.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var objectProto = Object.prototype;
var isPrototype = function isPrototype(value) {
  var Ctor = value && value.constructor;
  var proto = typeof Ctor === 'function' && Ctor.prototype || objectProto;
  return value === proto;
};

module.exports = isPrototype;

/***/ }),

/***/ "./node_modules/@antv/g/node_modules/@antv/util/lib/type/is-string.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@antv/g/node_modules/@antv/util/lib/type/is-string.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isType = __webpack_require__(/*! ./is-type */ "./node_modules/@antv/g/node_modules/@antv/util/lib/type/is-type.js");

var isString = function isString(str) {
  return isType(str, 'String');
};

module.exports = isString;

/***/ }),

/***/ "./node_modules/@antv/g/node_modules/@antv/util/lib/type/is-type.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@antv/g/node_modules/@antv/util/lib/type/is-type.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;
var isType = function isType(value, type) {
  return toString.call(value) === '[object ' + type + ']';
};

module.exports = isType;

/***/ }),

/***/ "./node_modules/@antv/g/node_modules/@antv/util/lib/unique-id.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@antv/g/node_modules/@antv/util/lib/unique-id.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var uniqueId = function () {
  var map = {};
  return function (prefix) {
    prefix = prefix || 'g';
    if (!map[prefix]) {
      map[prefix] = 1;
    } else {
      map[prefix] += 1;
    }
    return prefix + map[prefix];
  };
}();

module.exports = uniqueId;

/***/ }),

/***/ "./node_modules/@antv/gl-matrix/lib/gl-matrix/common.js":
/*!**************************************************************!*\
  !*** ./node_modules/@antv/gl-matrix/lib/gl-matrix/common.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setMatrixArrayType = setMatrixArrayType;
exports.toRadian = toRadian;
exports.equals = equals;
/**
 * Common utilities
 * @module glMatrix
 */

// Configuration Constants
var EPSILON = exports.EPSILON = 0.000001;
var ARRAY_TYPE = exports.ARRAY_TYPE = typeof Float32Array !== 'undefined' ? Float32Array : Array;
var RANDOM = exports.RANDOM = Math.random;

/**
 * Sets the type of array used when creating new vectors and matrices
 *
 * @param {Type} type Array type, such as Float32Array or Array
 */
function setMatrixArrayType(type) {
  exports.ARRAY_TYPE = ARRAY_TYPE = type;
}

var degree = Math.PI / 180;

/**
 * Convert Degree To Radian
 *
 * @param {Number} a Angle in Degrees
 */
function toRadian(a) {
  return a * degree;
}

/**
 * Tests whether or not the arguments have approximately the same value, within an absolute
 * or relative tolerance of glMatrix.EPSILON (an absolute tolerance is used for values less
 * than or equal to 1.0, and a relative tolerance is used for larger values)
 *
 * @param {Number} a The first number to test.
 * @param {Number} b The second number to test.
 * @returns {Boolean} True if the numbers are approximately equal, false otherwise.
 */
function equals(a, b) {
  return Math.abs(a - b) <= EPSILON * Math.max(1.0, Math.abs(a), Math.abs(b));
}

/***/ }),

/***/ "./node_modules/@antv/gl-matrix/lib/gl-matrix/mat3.js":
/*!************************************************************!*\
  !*** ./node_modules/@antv/gl-matrix/lib/gl-matrix/mat3.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sub = exports.mul = undefined;
exports.create = create;
exports.fromMat4 = fromMat4;
exports.clone = clone;
exports.copy = copy;
exports.fromValues = fromValues;
exports.set = set;
exports.identity = identity;
exports.transpose = transpose;
exports.invert = invert;
exports.adjoint = adjoint;
exports.determinant = determinant;
exports.multiply = multiply;
exports.translate = translate;
exports.rotate = rotate;
exports.scale = scale;
exports.fromTranslation = fromTranslation;
exports.fromRotation = fromRotation;
exports.fromScaling = fromScaling;
exports.fromMat2d = fromMat2d;
exports.fromQuat = fromQuat;
exports.normalFromMat4 = normalFromMat4;
exports.projection = projection;
exports.str = str;
exports.frob = frob;
exports.add = add;
exports.subtract = subtract;
exports.multiplyScalar = multiplyScalar;
exports.multiplyScalarAndAdd = multiplyScalarAndAdd;
exports.exactEquals = exactEquals;
exports.equals = equals;

var _common = __webpack_require__(/*! ./common.js */ "./node_modules/@antv/gl-matrix/lib/gl-matrix/common.js");

var glMatrix = _interopRequireWildcard(_common);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * 3x3 Matrix
 * @module mat3
 */

/**
 * Creates a new identity mat3
 *
 * @returns {mat3} a new 3x3 matrix
 */
function create() {
  var out = new glMatrix.ARRAY_TYPE(9);
  if (glMatrix.ARRAY_TYPE != Float32Array) {
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
  }
  out[0] = 1;
  out[4] = 1;
  out[8] = 1;
  return out;
}

/**
 * Copies the upper-left 3x3 values into the given mat3.
 *
 * @param {mat3} out the receiving 3x3 matrix
 * @param {mat4} a   the source 4x4 matrix
 * @returns {mat3} out
 */
function fromMat4(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[4];
  out[4] = a[5];
  out[5] = a[6];
  out[6] = a[8];
  out[7] = a[9];
  out[8] = a[10];
  return out;
}

/**
 * Creates a new mat3 initialized with values from an existing matrix
 *
 * @param {mat3} a matrix to clone
 * @returns {mat3} a new 3x3 matrix
 */
function clone(a) {
  var out = new glMatrix.ARRAY_TYPE(9);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  return out;
}

/**
 * Copy the values from one mat3 to another
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  return out;
}

/**
 * Create a new mat3 with the given values
 *
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m10 Component in column 1, row 0 position (index 3)
 * @param {Number} m11 Component in column 1, row 1 position (index 4)
 * @param {Number} m12 Component in column 1, row 2 position (index 5)
 * @param {Number} m20 Component in column 2, row 0 position (index 6)
 * @param {Number} m21 Component in column 2, row 1 position (index 7)
 * @param {Number} m22 Component in column 2, row 2 position (index 8)
 * @returns {mat3} A new mat3
 */
function fromValues(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
  var out = new glMatrix.ARRAY_TYPE(9);
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m10;
  out[4] = m11;
  out[5] = m12;
  out[6] = m20;
  out[7] = m21;
  out[8] = m22;
  return out;
}

/**
 * Set the components of a mat3 to the given values
 *
 * @param {mat3} out the receiving matrix
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m10 Component in column 1, row 0 position (index 3)
 * @param {Number} m11 Component in column 1, row 1 position (index 4)
 * @param {Number} m12 Component in column 1, row 2 position (index 5)
 * @param {Number} m20 Component in column 2, row 0 position (index 6)
 * @param {Number} m21 Component in column 2, row 1 position (index 7)
 * @param {Number} m22 Component in column 2, row 2 position (index 8)
 * @returns {mat3} out
 */
function set(out, m00, m01, m02, m10, m11, m12, m20, m21, m22) {
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m10;
  out[4] = m11;
  out[5] = m12;
  out[6] = m20;
  out[7] = m21;
  out[8] = m22;
  return out;
}

/**
 * Set a mat3 to the identity matrix
 *
 * @param {mat3} out the receiving matrix
 * @returns {mat3} out
 */
function identity(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 1;
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  out[8] = 1;
  return out;
}

/**
 * Transpose the values of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
function transpose(out, a) {
  // If we are transposing ourselves we can skip a few steps but have to cache some values
  if (out === a) {
    var a01 = a[1],
        a02 = a[2],
        a12 = a[5];
    out[1] = a[3];
    out[2] = a[6];
    out[3] = a01;
    out[5] = a[7];
    out[6] = a02;
    out[7] = a12;
  } else {
    out[0] = a[0];
    out[1] = a[3];
    out[2] = a[6];
    out[3] = a[1];
    out[4] = a[4];
    out[5] = a[7];
    out[6] = a[2];
    out[7] = a[5];
    out[8] = a[8];
  }

  return out;
}

/**
 * Inverts a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
function invert(out, a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2];
  var a10 = a[3],
      a11 = a[4],
      a12 = a[5];
  var a20 = a[6],
      a21 = a[7],
      a22 = a[8];

  var b01 = a22 * a11 - a12 * a21;
  var b11 = -a22 * a10 + a12 * a20;
  var b21 = a21 * a10 - a11 * a20;

  // Calculate the determinant
  var det = a00 * b01 + a01 * b11 + a02 * b21;

  if (!det) {
    return null;
  }
  det = 1.0 / det;

  out[0] = b01 * det;
  out[1] = (-a22 * a01 + a02 * a21) * det;
  out[2] = (a12 * a01 - a02 * a11) * det;
  out[3] = b11 * det;
  out[4] = (a22 * a00 - a02 * a20) * det;
  out[5] = (-a12 * a00 + a02 * a10) * det;
  out[6] = b21 * det;
  out[7] = (-a21 * a00 + a01 * a20) * det;
  out[8] = (a11 * a00 - a01 * a10) * det;
  return out;
}

/**
 * Calculates the adjugate of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
function adjoint(out, a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2];
  var a10 = a[3],
      a11 = a[4],
      a12 = a[5];
  var a20 = a[6],
      a21 = a[7],
      a22 = a[8];

  out[0] = a11 * a22 - a12 * a21;
  out[1] = a02 * a21 - a01 * a22;
  out[2] = a01 * a12 - a02 * a11;
  out[3] = a12 * a20 - a10 * a22;
  out[4] = a00 * a22 - a02 * a20;
  out[5] = a02 * a10 - a00 * a12;
  out[6] = a10 * a21 - a11 * a20;
  out[7] = a01 * a20 - a00 * a21;
  out[8] = a00 * a11 - a01 * a10;
  return out;
}

/**
 * Calculates the determinant of a mat3
 *
 * @param {mat3} a the source matrix
 * @returns {Number} determinant of a
 */
function determinant(a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2];
  var a10 = a[3],
      a11 = a[4],
      a12 = a[5];
  var a20 = a[6],
      a21 = a[7],
      a22 = a[8];

  return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
}

/**
 * Multiplies two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */
function multiply(out, a, b) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2];
  var a10 = a[3],
      a11 = a[4],
      a12 = a[5];
  var a20 = a[6],
      a21 = a[7],
      a22 = a[8];

  var b00 = b[0],
      b01 = b[1],
      b02 = b[2];
  var b10 = b[3],
      b11 = b[4],
      b12 = b[5];
  var b20 = b[6],
      b21 = b[7],
      b22 = b[8];

  out[0] = b00 * a00 + b01 * a10 + b02 * a20;
  out[1] = b00 * a01 + b01 * a11 + b02 * a21;
  out[2] = b00 * a02 + b01 * a12 + b02 * a22;

  out[3] = b10 * a00 + b11 * a10 + b12 * a20;
  out[4] = b10 * a01 + b11 * a11 + b12 * a21;
  out[5] = b10 * a02 + b11 * a12 + b12 * a22;

  out[6] = b20 * a00 + b21 * a10 + b22 * a20;
  out[7] = b20 * a01 + b21 * a11 + b22 * a21;
  out[8] = b20 * a02 + b21 * a12 + b22 * a22;
  return out;
}

/**
 * Translate a mat3 by the given vector
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to translate
 * @param {vec2} v vector to translate by
 * @returns {mat3} out
 */
function translate(out, a, v) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a10 = a[3],
      a11 = a[4],
      a12 = a[5],
      a20 = a[6],
      a21 = a[7],
      a22 = a[8],
      x = v[0],
      y = v[1];

  out[0] = a00;
  out[1] = a01;
  out[2] = a02;

  out[3] = a10;
  out[4] = a11;
  out[5] = a12;

  out[6] = x * a00 + y * a10 + a20;
  out[7] = x * a01 + y * a11 + a21;
  out[8] = x * a02 + y * a12 + a22;
  return out;
}

/**
 * Rotates a mat3 by the given angle
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */
function rotate(out, a, rad) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a10 = a[3],
      a11 = a[4],
      a12 = a[5],
      a20 = a[6],
      a21 = a[7],
      a22 = a[8],
      s = Math.sin(rad),
      c = Math.cos(rad);

  out[0] = c * a00 + s * a10;
  out[1] = c * a01 + s * a11;
  out[2] = c * a02 + s * a12;

  out[3] = c * a10 - s * a00;
  out[4] = c * a11 - s * a01;
  out[5] = c * a12 - s * a02;

  out[6] = a20;
  out[7] = a21;
  out[8] = a22;
  return out;
};

/**
 * Scales the mat3 by the dimensions in the given vec2
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat3} out
 **/
function scale(out, a, v) {
  var x = v[0],
      y = v[1];

  out[0] = x * a[0];
  out[1] = x * a[1];
  out[2] = x * a[2];

  out[3] = y * a[3];
  out[4] = y * a[4];
  out[5] = y * a[5];

  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  return out;
}

/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.translate(dest, dest, vec);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {vec2} v Translation vector
 * @returns {mat3} out
 */
function fromTranslation(out, v) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 1;
  out[5] = 0;
  out[6] = v[0];
  out[7] = v[1];
  out[8] = 1;
  return out;
}

/**
 * Creates a matrix from a given angle
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.rotate(dest, dest, rad);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */
function fromRotation(out, rad) {
  var s = Math.sin(rad),
      c = Math.cos(rad);

  out[0] = c;
  out[1] = s;
  out[2] = 0;

  out[3] = -s;
  out[4] = c;
  out[5] = 0;

  out[6] = 0;
  out[7] = 0;
  out[8] = 1;
  return out;
}

/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.scale(dest, dest, vec);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {vec2} v Scaling vector
 * @returns {mat3} out
 */
function fromScaling(out, v) {
  out[0] = v[0];
  out[1] = 0;
  out[2] = 0;

  out[3] = 0;
  out[4] = v[1];
  out[5] = 0;

  out[6] = 0;
  out[7] = 0;
  out[8] = 1;
  return out;
}

/**
 * Copies the values from a mat2d into a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat2d} a the matrix to copy
 * @returns {mat3} out
 **/
function fromMat2d(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = 0;

  out[3] = a[2];
  out[4] = a[3];
  out[5] = 0;

  out[6] = a[4];
  out[7] = a[5];
  out[8] = 1;
  return out;
}

/**
* Calculates a 3x3 matrix from the given quaternion
*
* @param {mat3} out mat3 receiving operation result
* @param {quat} q Quaternion to create matrix from
*
* @returns {mat3} out
*/
function fromQuat(out, q) {
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;

  var xx = x * x2;
  var yx = y * x2;
  var yy = y * y2;
  var zx = z * x2;
  var zy = z * y2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;

  out[0] = 1 - yy - zz;
  out[3] = yx - wz;
  out[6] = zx + wy;

  out[1] = yx + wz;
  out[4] = 1 - xx - zz;
  out[7] = zy - wx;

  out[2] = zx - wy;
  out[5] = zy + wx;
  out[8] = 1 - xx - yy;

  return out;
}

/**
* Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
*
* @param {mat3} out mat3 receiving operation result
* @param {mat4} a Mat4 to derive the normal matrix from
*
* @returns {mat3} out
*/
function normalFromMat4(out, a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];

  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32;

  // Calculate the determinant
  var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

  if (!det) {
    return null;
  }
  det = 1.0 / det;

  out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
  out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
  out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;

  out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;

  out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
  out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
  out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;

  return out;
}

/**
 * Generates a 2D projection matrix with the given bounds
 *
 * @param {mat3} out mat3 frustum matrix will be written into
 * @param {number} width Width of your gl context
 * @param {number} height Height of gl context
 * @returns {mat3} out
 */
function projection(out, width, height) {
  out[0] = 2 / width;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = -2 / height;
  out[5] = 0;
  out[6] = -1;
  out[7] = 1;
  out[8] = 1;
  return out;
}

/**
 * Returns a string representation of a mat3
 *
 * @param {mat3} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
function str(a) {
  return 'mat3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' + a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' + a[8] + ')';
}

/**
 * Returns Frobenius norm of a mat3
 *
 * @param {mat3} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
function frob(a) {
  return Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2));
}

/**
 * Adds two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */
function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  out[6] = a[6] + b[6];
  out[7] = a[7] + b[7];
  out[8] = a[8] + b[8];
  return out;
}

/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */
function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  out[4] = a[4] - b[4];
  out[5] = a[5] - b[5];
  out[6] = a[6] - b[6];
  out[7] = a[7] - b[7];
  out[8] = a[8] - b[8];
  return out;
}

/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat3} out
 */
function multiplyScalar(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  out[4] = a[4] * b;
  out[5] = a[5] * b;
  out[6] = a[6] * b;
  out[7] = a[7] * b;
  out[8] = a[8] * b;
  return out;
}

/**
 * Adds two mat3's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat3} out the receiving vector
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat3} out
 */
function multiplyScalarAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  out[3] = a[3] + b[3] * scale;
  out[4] = a[4] + b[4] * scale;
  out[5] = a[5] + b[5] * scale;
  out[6] = a[6] + b[6] * scale;
  out[7] = a[7] + b[7] * scale;
  out[8] = a[8] + b[8] * scale;
  return out;
}

/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {mat3} a The first matrix.
 * @param {mat3} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8];
}

/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {mat3} a The first matrix.
 * @param {mat3} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
function equals(a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3],
      a4 = a[4],
      a5 = a[5],
      a6 = a[6],
      a7 = a[7],
      a8 = a[8];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3],
      b4 = b[4],
      b5 = b[5],
      b6 = b[6],
      b7 = b[7],
      b8 = b[8];
  return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a8), Math.abs(b8));
}

/**
 * Alias for {@link mat3.multiply}
 * @function
 */
var mul = exports.mul = multiply;

/**
 * Alias for {@link mat3.subtract}
 * @function
 */
var sub = exports.sub = subtract;

/***/ }),

/***/ "./node_modules/@antv/gl-matrix/lib/gl-matrix/vec2.js":
/*!************************************************************!*\
  !*** ./node_modules/@antv/gl-matrix/lib/gl-matrix/vec2.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.forEach = exports.sqrLen = exports.sqrDist = exports.dist = exports.div = exports.mul = exports.sub = exports.len = undefined;
exports.create = create;
exports.clone = clone;
exports.fromValues = fromValues;
exports.copy = copy;
exports.set = set;
exports.add = add;
exports.subtract = subtract;
exports.multiply = multiply;
exports.divide = divide;
exports.ceil = ceil;
exports.floor = floor;
exports.min = min;
exports.max = max;
exports.round = round;
exports.scale = scale;
exports.scaleAndAdd = scaleAndAdd;
exports.distance = distance;
exports.squaredDistance = squaredDistance;
exports.length = length;
exports.squaredLength = squaredLength;
exports.negate = negate;
exports.inverse = inverse;
exports.normalize = normalize;
exports.dot = dot;
exports.cross = cross;
exports.lerp = lerp;
exports.random = random;
exports.transformMat2 = transformMat2;
exports.transformMat2d = transformMat2d;
exports.transformMat3 = transformMat3;
exports.transformMat4 = transformMat4;
exports.rotate = rotate;
exports.angle = angle;
exports.str = str;
exports.exactEquals = exactEquals;
exports.equals = equals;

var _common = __webpack_require__(/*! ./common.js */ "./node_modules/@antv/gl-matrix/lib/gl-matrix/common.js");

var glMatrix = _interopRequireWildcard(_common);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * 2 Dimensional Vector
 * @module vec2
 */

/**
 * Creates a new, empty vec2
 *
 * @returns {vec2} a new 2D vector
 */
function create() {
  var out = new glMatrix.ARRAY_TYPE(2);
  if (glMatrix.ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
  }
  return out;
}

/**
 * Creates a new vec2 initialized with values from an existing vector
 *
 * @param {vec2} a vector to clone
 * @returns {vec2} a new 2D vector
 */
function clone(a) {
  var out = new glMatrix.ARRAY_TYPE(2);
  out[0] = a[0];
  out[1] = a[1];
  return out;
}

/**
 * Creates a new vec2 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} a new 2D vector
 */
function fromValues(x, y) {
  var out = new glMatrix.ARRAY_TYPE(2);
  out[0] = x;
  out[1] = y;
  return out;
}

/**
 * Copy the values from one vec2 to another
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the source vector
 * @returns {vec2} out
 */
function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  return out;
}

/**
 * Set the components of a vec2 to the given values
 *
 * @param {vec2} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} out
 */
function set(out, x, y) {
  out[0] = x;
  out[1] = y;
  return out;
}

/**
 * Adds two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  return out;
}

/**
 * Subtracts vector b from vector a
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  return out;
}

/**
 * Multiplies two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
function multiply(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  return out;
}

/**
 * Divides two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
function divide(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  return out;
}

/**
 * Math.ceil the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to ceil
 * @returns {vec2} out
 */
function ceil(out, a) {
  out[0] = Math.ceil(a[0]);
  out[1] = Math.ceil(a[1]);
  return out;
}

/**
 * Math.floor the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to floor
 * @returns {vec2} out
 */
function floor(out, a) {
  out[0] = Math.floor(a[0]);
  out[1] = Math.floor(a[1]);
  return out;
}

/**
 * Returns the minimum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
function min(out, a, b) {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  return out;
}

/**
 * Returns the maximum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
function max(out, a, b) {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  return out;
}

/**
 * Math.round the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to round
 * @returns {vec2} out
 */
function round(out, a) {
  out[0] = Math.round(a[0]);
  out[1] = Math.round(a[1]);
  return out;
}

/**
 * Scales a vec2 by a scalar number
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec2} out
 */
function scale(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  return out;
}

/**
 * Adds two vec2's after scaling the second operand by a scalar value
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec2} out
 */
function scaleAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  return out;
}

/**
 * Calculates the euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} distance between a and b
 */
function distance(a, b) {
  var x = b[0] - a[0],
      y = b[1] - a[1];
  return Math.sqrt(x * x + y * y);
}

/**
 * Calculates the squared euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} squared distance between a and b
 */
function squaredDistance(a, b) {
  var x = b[0] - a[0],
      y = b[1] - a[1];
  return x * x + y * y;
}

/**
 * Calculates the length of a vec2
 *
 * @param {vec2} a vector to calculate length of
 * @returns {Number} length of a
 */
function length(a) {
  var x = a[0],
      y = a[1];
  return Math.sqrt(x * x + y * y);
}

/**
 * Calculates the squared length of a vec2
 *
 * @param {vec2} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
function squaredLength(a) {
  var x = a[0],
      y = a[1];
  return x * x + y * y;
}

/**
 * Negates the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to negate
 * @returns {vec2} out
 */
function negate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  return out;
}

/**
 * Returns the inverse of the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to invert
 * @returns {vec2} out
 */
function inverse(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  return out;
}

/**
 * Normalize a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to normalize
 * @returns {vec2} out
 */
function normalize(out, a) {
  var x = a[0],
      y = a[1];
  var len = x * x + y * y;
  if (len > 0) {
    //TODO: evaluate use of glm_invsqrt here?
    len = 1 / Math.sqrt(len);
    out[0] = a[0] * len;
    out[1] = a[1] * len;
  }
  return out;
}

/**
 * Calculates the dot product of two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} dot product of a and b
 */
function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1];
}

/**
 * Computes the cross product of two vec2's
 * Note that the cross product must by definition produce a 3D vector
 *
 * @param {vec3} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec3} out
 */
function cross(out, a, b) {
  var z = a[0] * b[1] - a[1] * b[0];
  out[0] = out[1] = 0;
  out[2] = z;
  return out;
}

/**
 * Performs a linear interpolation between two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {vec2} out
 */
function lerp(out, a, b, t) {
  var ax = a[0],
      ay = a[1];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  return out;
}

/**
 * Generates a random vector with the given scale
 *
 * @param {vec2} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec2} out
 */
function random(out, scale) {
  scale = scale || 1.0;
  var r = glMatrix.RANDOM() * 2.0 * Math.PI;
  out[0] = Math.cos(r) * scale;
  out[1] = Math.sin(r) * scale;
  return out;
}

/**
 * Transforms the vec2 with a mat2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2} m matrix to transform with
 * @returns {vec2} out
 */
function transformMat2(out, a, m) {
  var x = a[0],
      y = a[1];
  out[0] = m[0] * x + m[2] * y;
  out[1] = m[1] * x + m[3] * y;
  return out;
}

/**
 * Transforms the vec2 with a mat2d
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2d} m matrix to transform with
 * @returns {vec2} out
 */
function transformMat2d(out, a, m) {
  var x = a[0],
      y = a[1];
  out[0] = m[0] * x + m[2] * y + m[4];
  out[1] = m[1] * x + m[3] * y + m[5];
  return out;
}

/**
 * Transforms the vec2 with a mat3
 * 3rd vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat3} m matrix to transform with
 * @returns {vec2} out
 */
function transformMat3(out, a, m) {
  var x = a[0],
      y = a[1];
  out[0] = m[0] * x + m[3] * y + m[6];
  out[1] = m[1] * x + m[4] * y + m[7];
  return out;
}

/**
 * Transforms the vec2 with a mat4
 * 3rd vector component is implicitly '0'
 * 4th vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec2} out
 */
function transformMat4(out, a, m) {
  var x = a[0];
  var y = a[1];
  out[0] = m[0] * x + m[4] * y + m[12];
  out[1] = m[1] * x + m[5] * y + m[13];
  return out;
}

/**
 * Rotate a 2D vector
 * @param {vec2} out The receiving vec2
 * @param {vec2} a The vec2 point to rotate
 * @param {vec2} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec2} out
 */
function rotate(out, a, b, c) {
  //Translate point to the origin
  var p0 = a[0] - b[0],
      p1 = a[1] - b[1],
      sinC = Math.sin(c),
      cosC = Math.cos(c);

  //perform rotation and translate to correct position
  out[0] = p0 * cosC - p1 * sinC + b[0];
  out[1] = p0 * sinC + p1 * cosC + b[1];

  return out;
}

/**
 * Get the angle between two 2D vectors
 * @param {vec2} a The first operand
 * @param {vec2} b The second operand
 * @returns {Number} The angle in radians
 */
function angle(a, b) {
  var x1 = a[0],
      y1 = a[1],
      x2 = b[0],
      y2 = b[1];

  var len1 = x1 * x1 + y1 * y1;
  if (len1 > 0) {
    //TODO: evaluate use of glm_invsqrt here?
    len1 = 1 / Math.sqrt(len1);
  }

  var len2 = x2 * x2 + y2 * y2;
  if (len2 > 0) {
    //TODO: evaluate use of glm_invsqrt here?
    len2 = 1 / Math.sqrt(len2);
  }

  var cosine = (x1 * x2 + y1 * y2) * len1 * len2;

  if (cosine > 1.0) {
    return 0;
  } else if (cosine < -1.0) {
    return Math.PI;
  } else {
    return Math.acos(cosine);
  }
}

/**
 * Returns a string representation of a vector
 *
 * @param {vec2} a vector to represent as a string
 * @returns {String} string representation of the vector
 */
function str(a) {
  return 'vec2(' + a[0] + ', ' + a[1] + ')';
}

/**
 * Returns whether or not the vectors exactly have the same elements in the same position (when compared with ===)
 *
 * @param {vec2} a The first vector.
 * @param {vec2} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1];
}

/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {vec2} a The first vector.
 * @param {vec2} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
function equals(a, b) {
  var a0 = a[0],
      a1 = a[1];
  var b0 = b[0],
      b1 = b[1];
  return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1));
}

/**
 * Alias for {@link vec2.length}
 * @function
 */
var len = exports.len = length;

/**
 * Alias for {@link vec2.subtract}
 * @function
 */
var sub = exports.sub = subtract;

/**
 * Alias for {@link vec2.multiply}
 * @function
 */
var mul = exports.mul = multiply;

/**
 * Alias for {@link vec2.divide}
 * @function
 */
var div = exports.div = divide;

/**
 * Alias for {@link vec2.distance}
 * @function
 */
var dist = exports.dist = distance;

/**
 * Alias for {@link vec2.squaredDistance}
 * @function
 */
var sqrDist = exports.sqrDist = squaredDistance;

/**
 * Alias for {@link vec2.squaredLength}
 * @function
 */
var sqrLen = exports.sqrLen = squaredLength;

/**
 * Perform some operation over an array of vec2s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
var forEach = exports.forEach = function () {
  var vec = create();

  return function (a, stride, offset, count, fn, arg) {
    var i = void 0,
        l = void 0;
    if (!stride) {
      stride = 2;
    }

    if (!offset) {
      offset = 0;
    }

    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }

    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];vec[1] = a[i + 1];
      fn(vec, vec, arg);
      a[i] = vec[0];a[i + 1] = vec[1];
    }

    return a;
  };
}();

/***/ }),

/***/ "./node_modules/@antv/gl-matrix/lib/gl-matrix/vec3.js":
/*!************************************************************!*\
  !*** ./node_modules/@antv/gl-matrix/lib/gl-matrix/vec3.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.forEach = exports.sqrLen = exports.len = exports.sqrDist = exports.dist = exports.div = exports.mul = exports.sub = undefined;
exports.create = create;
exports.clone = clone;
exports.length = length;
exports.fromValues = fromValues;
exports.copy = copy;
exports.set = set;
exports.add = add;
exports.subtract = subtract;
exports.multiply = multiply;
exports.divide = divide;
exports.ceil = ceil;
exports.floor = floor;
exports.min = min;
exports.max = max;
exports.round = round;
exports.scale = scale;
exports.scaleAndAdd = scaleAndAdd;
exports.distance = distance;
exports.squaredDistance = squaredDistance;
exports.squaredLength = squaredLength;
exports.negate = negate;
exports.inverse = inverse;
exports.normalize = normalize;
exports.dot = dot;
exports.cross = cross;
exports.lerp = lerp;
exports.hermite = hermite;
exports.bezier = bezier;
exports.random = random;
exports.transformMat4 = transformMat4;
exports.transformMat3 = transformMat3;
exports.transformQuat = transformQuat;
exports.rotateX = rotateX;
exports.rotateY = rotateY;
exports.rotateZ = rotateZ;
exports.angle = angle;
exports.str = str;
exports.exactEquals = exactEquals;
exports.equals = equals;

var _common = __webpack_require__(/*! ./common.js */ "./node_modules/@antv/gl-matrix/lib/gl-matrix/common.js");

var glMatrix = _interopRequireWildcard(_common);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * 3 Dimensional Vector
 * @module vec3
 */

/**
 * Creates a new, empty vec3
 *
 * @returns {vec3} a new 3D vector
 */
function create() {
  var out = new glMatrix.ARRAY_TYPE(3);
  if (glMatrix.ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
  }
  return out;
}

/**
 * Creates a new vec3 initialized with values from an existing vector
 *
 * @param {vec3} a vector to clone
 * @returns {vec3} a new 3D vector
 */
function clone(a) {
  var out = new glMatrix.ARRAY_TYPE(3);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  return out;
}

/**
 * Calculates the length of a vec3
 *
 * @param {vec3} a vector to calculate length of
 * @returns {Number} length of a
 */
function length(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  return Math.sqrt(x * x + y * y + z * z);
}

/**
 * Creates a new vec3 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} a new 3D vector
 */
function fromValues(x, y, z) {
  var out = new glMatrix.ARRAY_TYPE(3);
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}

/**
 * Copy the values from one vec3 to another
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the source vector
 * @returns {vec3} out
 */
function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  return out;
}

/**
 * Set the components of a vec3 to the given values
 *
 * @param {vec3} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} out
 */
function set(out, x, y, z) {
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}

/**
 * Adds two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  return out;
}

/**
 * Subtracts vector b from vector a
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  return out;
}

/**
 * Multiplies two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function multiply(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  out[2] = a[2] * b[2];
  return out;
}

/**
 * Divides two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function divide(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  out[2] = a[2] / b[2];
  return out;
}

/**
 * Math.ceil the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to ceil
 * @returns {vec3} out
 */
function ceil(out, a) {
  out[0] = Math.ceil(a[0]);
  out[1] = Math.ceil(a[1]);
  out[2] = Math.ceil(a[2]);
  return out;
}

/**
 * Math.floor the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to floor
 * @returns {vec3} out
 */
function floor(out, a) {
  out[0] = Math.floor(a[0]);
  out[1] = Math.floor(a[1]);
  out[2] = Math.floor(a[2]);
  return out;
}

/**
 * Returns the minimum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function min(out, a, b) {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  out[2] = Math.min(a[2], b[2]);
  return out;
}

/**
 * Returns the maximum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function max(out, a, b) {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  out[2] = Math.max(a[2], b[2]);
  return out;
}

/**
 * Math.round the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to round
 * @returns {vec3} out
 */
function round(out, a) {
  out[0] = Math.round(a[0]);
  out[1] = Math.round(a[1]);
  out[2] = Math.round(a[2]);
  return out;
}

/**
 * Scales a vec3 by a scalar number
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec3} out
 */
function scale(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  return out;
}

/**
 * Adds two vec3's after scaling the second operand by a scalar value
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec3} out
 */
function scaleAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  return out;
}

/**
 * Calculates the euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} distance between a and b
 */
function distance(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  return Math.sqrt(x * x + y * y + z * z);
}

/**
 * Calculates the squared euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} squared distance between a and b
 */
function squaredDistance(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  return x * x + y * y + z * z;
}

/**
 * Calculates the squared length of a vec3
 *
 * @param {vec3} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
function squaredLength(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  return x * x + y * y + z * z;
}

/**
 * Negates the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to negate
 * @returns {vec3} out
 */
function negate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  return out;
}

/**
 * Returns the inverse of the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to invert
 * @returns {vec3} out
 */
function inverse(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  out[2] = 1.0 / a[2];
  return out;
}

/**
 * Normalize a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to normalize
 * @returns {vec3} out
 */
function normalize(out, a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var len = x * x + y * y + z * z;
  if (len > 0) {
    //TODO: evaluate use of glm_invsqrt here?
    len = 1 / Math.sqrt(len);
    out[0] = a[0] * len;
    out[1] = a[1] * len;
    out[2] = a[2] * len;
  }
  return out;
}

/**
 * Calculates the dot product of two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} dot product of a and b
 */
function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

/**
 * Computes the cross product of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function cross(out, a, b) {
  var ax = a[0],
      ay = a[1],
      az = a[2];
  var bx = b[0],
      by = b[1],
      bz = b[2];

  out[0] = ay * bz - az * by;
  out[1] = az * bx - ax * bz;
  out[2] = ax * by - ay * bx;
  return out;
}

/**
 * Performs a linear interpolation between two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {vec3} out
 */
function lerp(out, a, b, t) {
  var ax = a[0];
  var ay = a[1];
  var az = a[2];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  out[2] = az + t * (b[2] - az);
  return out;
}

/**
 * Performs a hermite interpolation with two control points
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {vec3} c the third operand
 * @param {vec3} d the fourth operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {vec3} out
 */
function hermite(out, a, b, c, d, t) {
  var factorTimes2 = t * t;
  var factor1 = factorTimes2 * (2 * t - 3) + 1;
  var factor2 = factorTimes2 * (t - 2) + t;
  var factor3 = factorTimes2 * (t - 1);
  var factor4 = factorTimes2 * (3 - 2 * t);

  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;

  return out;
}

/**
 * Performs a bezier interpolation with two control points
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {vec3} c the third operand
 * @param {vec3} d the fourth operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {vec3} out
 */
function bezier(out, a, b, c, d, t) {
  var inverseFactor = 1 - t;
  var inverseFactorTimesTwo = inverseFactor * inverseFactor;
  var factorTimes2 = t * t;
  var factor1 = inverseFactorTimesTwo * inverseFactor;
  var factor2 = 3 * t * inverseFactorTimesTwo;
  var factor3 = 3 * factorTimes2 * inverseFactor;
  var factor4 = factorTimes2 * t;

  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;

  return out;
}

/**
 * Generates a random vector with the given scale
 *
 * @param {vec3} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec3} out
 */
function random(out, scale) {
  scale = scale || 1.0;

  var r = glMatrix.RANDOM() * 2.0 * Math.PI;
  var z = glMatrix.RANDOM() * 2.0 - 1.0;
  var zScale = Math.sqrt(1.0 - z * z) * scale;

  out[0] = Math.cos(r) * zScale;
  out[1] = Math.sin(r) * zScale;
  out[2] = z * scale;
  return out;
}

/**
 * Transforms the vec3 with a mat4.
 * 4th vector component is implicitly '1'
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec3} out
 */
function transformMat4(out, a, m) {
  var x = a[0],
      y = a[1],
      z = a[2];
  var w = m[3] * x + m[7] * y + m[11] * z + m[15];
  w = w || 1.0;
  out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
  out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
  out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
  return out;
}

/**
 * Transforms the vec3 with a mat3.
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat3} m the 3x3 matrix to transform with
 * @returns {vec3} out
 */
function transformMat3(out, a, m) {
  var x = a[0],
      y = a[1],
      z = a[2];
  out[0] = x * m[0] + y * m[3] + z * m[6];
  out[1] = x * m[1] + y * m[4] + z * m[7];
  out[2] = x * m[2] + y * m[5] + z * m[8];
  return out;
}

/**
 * Transforms the vec3 with a quat
 * Can also be used for dual quaternions. (Multiply it with the real part)
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec3} out
 */
function transformQuat(out, a, q) {
  // benchmarks: https://jsperf.com/quaternion-transform-vec3-implementations-fixed
  var qx = q[0],
      qy = q[1],
      qz = q[2],
      qw = q[3];
  var x = a[0],
      y = a[1],
      z = a[2];
  // var qvec = [qx, qy, qz];
  // var uv = vec3.cross([], qvec, a);
  var uvx = qy * z - qz * y,
      uvy = qz * x - qx * z,
      uvz = qx * y - qy * x;
  // var uuv = vec3.cross([], qvec, uv);
  var uuvx = qy * uvz - qz * uvy,
      uuvy = qz * uvx - qx * uvz,
      uuvz = qx * uvy - qy * uvx;
  // vec3.scale(uv, uv, 2 * w);
  var w2 = qw * 2;
  uvx *= w2;
  uvy *= w2;
  uvz *= w2;
  // vec3.scale(uuv, uuv, 2);
  uuvx *= 2;
  uuvy *= 2;
  uuvz *= 2;
  // return vec3.add(out, a, vec3.add(out, uv, uuv));
  out[0] = x + uvx + uuvx;
  out[1] = y + uvy + uuvy;
  out[2] = z + uvz + uuvz;
  return out;
}

/**
 * Rotate a 3D vector around the x-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */
function rotateX(out, a, b, c) {
  var p = [],
      r = [];
  //Translate point to the origin
  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2];

  //perform rotation
  r[0] = p[0];
  r[1] = p[1] * Math.cos(c) - p[2] * Math.sin(c);
  r[2] = p[1] * Math.sin(c) + p[2] * Math.cos(c);

  //translate to correct position
  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];

  return out;
}

/**
 * Rotate a 3D vector around the y-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */
function rotateY(out, a, b, c) {
  var p = [],
      r = [];
  //Translate point to the origin
  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2];

  //perform rotation
  r[0] = p[2] * Math.sin(c) + p[0] * Math.cos(c);
  r[1] = p[1];
  r[2] = p[2] * Math.cos(c) - p[0] * Math.sin(c);

  //translate to correct position
  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];

  return out;
}

/**
 * Rotate a 3D vector around the z-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */
function rotateZ(out, a, b, c) {
  var p = [],
      r = [];
  //Translate point to the origin
  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2];

  //perform rotation
  r[0] = p[0] * Math.cos(c) - p[1] * Math.sin(c);
  r[1] = p[0] * Math.sin(c) + p[1] * Math.cos(c);
  r[2] = p[2];

  //translate to correct position
  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];

  return out;
}

/**
 * Get the angle between two 3D vectors
 * @param {vec3} a The first operand
 * @param {vec3} b The second operand
 * @returns {Number} The angle in radians
 */
function angle(a, b) {
  var tempA = fromValues(a[0], a[1], a[2]);
  var tempB = fromValues(b[0], b[1], b[2]);

  normalize(tempA, tempA);
  normalize(tempB, tempB);

  var cosine = dot(tempA, tempB);

  if (cosine > 1.0) {
    return 0;
  } else if (cosine < -1.0) {
    return Math.PI;
  } else {
    return Math.acos(cosine);
  }
}

/**
 * Returns a string representation of a vector
 *
 * @param {vec3} a vector to represent as a string
 * @returns {String} string representation of the vector
 */
function str(a) {
  return 'vec3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ')';
}

/**
 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
 *
 * @param {vec3} a The first vector.
 * @param {vec3} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
}

/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {vec3} a The first vector.
 * @param {vec3} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
function equals(a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2];
  return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2));
}

/**
 * Alias for {@link vec3.subtract}
 * @function
 */
var sub = exports.sub = subtract;

/**
 * Alias for {@link vec3.multiply}
 * @function
 */
var mul = exports.mul = multiply;

/**
 * Alias for {@link vec3.divide}
 * @function
 */
var div = exports.div = divide;

/**
 * Alias for {@link vec3.distance}
 * @function
 */
var dist = exports.dist = distance;

/**
 * Alias for {@link vec3.squaredDistance}
 * @function
 */
var sqrDist = exports.sqrDist = squaredDistance;

/**
 * Alias for {@link vec3.length}
 * @function
 */
var len = exports.len = length;

/**
 * Alias for {@link vec3.squaredLength}
 * @function
 */
var sqrLen = exports.sqrLen = squaredLength;

/**
 * Perform some operation over an array of vec3s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
var forEach = exports.forEach = function () {
  var vec = create();

  return function (a, stride, offset, count, fn, arg) {
    var i = void 0,
        l = void 0;
    if (!stride) {
      stride = 3;
    }

    if (!offset) {
      offset = 0;
    }

    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }

    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];vec[1] = a[i + 1];vec[2] = a[i + 2];
      fn(vec, vec, arg);
      a[i] = vec[0];a[i + 1] = vec[1];a[i + 2] = vec[2];
    }

    return a;
  };
}();

/***/ }),

/***/ "./node_modules/@antv/hierarchy/build/hierarchy.js":
/*!*********************************************************!*\
  !*** ./node_modules/@antv/hierarchy/build/hierarchy.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else {}
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var assign = __webpack_require__(7);

module.exports = {
  assign: assign
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var hierarchy = __webpack_require__(3);

var Layout =
/*#__PURE__*/
function () {
  function Layout(root, options) {
    if (options === void 0) {
      options = {};
    }

    var me = this;
    me.options = options;
    me.rootNode = hierarchy(root, options);
  }

  var _proto = Layout.prototype;

  _proto.execute = function execute() {
    throw new Error('please override this method');
  };

  return Layout;
}();

module.exports = Layout;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var separateTree = __webpack_require__(4);

var VALID_DIRECTIONS = ['LR', // left to right
'RL', // right to left
'TB', // top to bottom
'BT', // bottom to top
'H', // horizontal
'V' // vertical
];
var HORIZONTAL_DIRECTIONS = ['LR', 'RL', 'H'];

var isHorizontal = function isHorizontal(direction) {
  return HORIZONTAL_DIRECTIONS.indexOf(direction) > -1;
};

var DEFAULT_DIRECTION = VALID_DIRECTIONS[0];

module.exports = function (root, options, layoutAlgrithm) {
  var direction = options.direction || DEFAULT_DIRECTION;
  options.isHorizontal = isHorizontal(direction);

  if (direction && VALID_DIRECTIONS.indexOf(direction) === -1) {
    throw new TypeError("Invalid direction: " + direction);
  }

  if (direction === VALID_DIRECTIONS[0]) {
    // LR
    layoutAlgrithm(root, options);
  } else if (direction === VALID_DIRECTIONS[1]) {
    // RL
    layoutAlgrithm(root, options);
    root.right2left();
  } else if (direction === VALID_DIRECTIONS[2]) {
    // TB
    layoutAlgrithm(root, options);
  } else if (direction === VALID_DIRECTIONS[3]) {
    // BT
    layoutAlgrithm(root, options);
    root.bottom2top();
  } else if (direction === VALID_DIRECTIONS[4] || direction === VALID_DIRECTIONS[5]) {
    // H or V
    // separate into left and right trees
    var _separateTree = separateTree(root, options),
        left = _separateTree.left,
        right = _separateTree.right; // do layout for left and right trees


    layoutAlgrithm(left, options);
    layoutAlgrithm(right, options);
    options.isHorizontal ? left.right2left() : left.bottom2top(); // combine left and right trees

    right.translate(left.x - right.x, left.y - right.y); // translate root

    root.x = left.x;
    root.y = right.y;
    var bb = root.getBoundingBox();

    if (options.isHorizontal) {
      if (bb.top < 0) {
        root.translate(0, -bb.top);
      }
    } else {
      if (bb.left < 0) {
        root.translate(-bb.left, 0);
      }
    }
  } // root.translate(-(root.x + root.width / 2 + root.hgap), -(root.y + root.height / 2 + root.vgap));


  return root;
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable no-cond-assign */
var util = __webpack_require__(0);

var PEM = 18;
var DEFAULT_HEIGHT = PEM * 2;
var DEFAULT_GAP = PEM;
var DEFAULT_OPTIONS = {
  getId: function getId(d) {
    return d.id || d.name;
  },
  getHGap: function getHGap(d) {
    return d.hgap || DEFAULT_GAP;
  },
  getVGap: function getVGap(d) {
    return d.vgap || DEFAULT_GAP;
  },
  getChildren: function getChildren(d) {
    return d.children;
  },
  getHeight: function getHeight(d) {
    return d.height || DEFAULT_HEIGHT;
  },
  getWidth: function getWidth(d) {
    var name = d.name || ' ';
    return d.width || name.split('').length * PEM; // FIXME DO NOT get width like this
  }
};

function Node(data, options) {
  var me = this;
  me.vgap = me.hgap = 0;
  if (data instanceof Node) return data;
  me.data = data;
  /*
   * Gaps: filling space between nodes
   * (x, y) ----------------------
   * |            vgap            |
   * |    --------------------    h
   * | h |                    |   e
   * | g |                    |   i
   * | a |                    |   g
   * | p |                    |   h
   * |   ---------------------    t
   * |                            |
   *  -----------width------------
   */

  var hgap = options.getHGap(data);
  var vgap = options.getVGap(data);
  me.width = options.getWidth(data);
  me.height = options.getHeight(data);
  me.id = options.getId(data);
  me.x = me.y = 0;
  me.depth = 0;

  if (!me.children) {
    me.children = [];
  }

  me.addGap(hgap, vgap);
  return me;
}

util.assign(Node.prototype, {
  isRoot: function isRoot() {
    return this.depth === 0;
  },
  isLeaf: function isLeaf() {
    return this.children.length === 0;
  },
  addGap: function addGap(hgap, vgap) {
    var me = this;
    me.hgap += hgap;
    me.vgap += vgap;
    me.width += 2 * hgap;
    me.height += 2 * vgap;
  },
  eachNode: function eachNode(callback) {
    // Depth First traverse
    var me = this;
    var nodes = [me];
    var current;

    while (current = nodes.pop()) {
      callback(current);
      nodes = nodes.concat(current.children);
    }
  },
  DFTraverse: function DFTraverse(callback) {
    // Depth First traverse
    this.eachNode(callback);
  },
  BFTraverse: function BFTraverse(callback) {
    // Breadth First traverse
    var me = this;
    var nodes = [me];
    var current;

    while (current = nodes.shift()) {
      callback(current);
      nodes = nodes.concat(current.children);
    }
  },
  getBoundingBox: function getBoundingBox() {
    // BBox for just one tree node
    var bb = {
      left: Number.MAX_VALUE,
      top: Number.MAX_VALUE,
      width: 0,
      height: 0
    };
    this.eachNode(function (node) {
      bb.left = Math.min(bb.left, node.x);
      bb.top = Math.min(bb.top, node.y);
      bb.width = Math.max(bb.width, node.x + node.width);
      bb.height = Math.max(bb.height, node.y + node.height);
    });
    return bb;
  },
  // translate
  translate: function translate(tx, ty) {
    if (tx === void 0) {
      tx = 0;
    }

    if (ty === void 0) {
      ty = 0;
    }

    this.eachNode(function (node) {
      node.x += tx;
      node.y += ty;
    });
  },
  right2left: function right2left() {
    var me = this;
    var bb = me.getBoundingBox();
    me.eachNode(function (node) {
      node.x = node.x - (node.x - bb.left) * 2 - node.width; // node.x = - node.x;
    });
    me.translate(bb.width, 0);
  },
  bottom2top: function bottom2top() {
    var me = this;
    var bb = me.getBoundingBox();
    me.eachNode(function (node) {
      node.y = node.y - (node.y - bb.top) * 2 - node.height; // node.y = - node.y;
    });
    me.translate(0, bb.height);
  }
});

function hierarchy(data, options, isolated) {
  if (options === void 0) {
    options = {};
  }

  options = util.assign({}, DEFAULT_OPTIONS, options);
  var root = new Node(data, options);
  var nodes = [root];
  var node;

  if (!isolated && !data.collapsed) {
    while (node = nodes.pop()) {
      if (!node.data.collapsed) {
        var children = options.getChildren(node.data);
        var length = children ? children.length : 0;
        node.children = new Array(length);

        if (children && length) {
          for (var i = 0; i < length; i++) {
            var child = new Node(children[i], options);
            node.children[i] = child;
            nodes.push(child);
            child.parent = node;
            child.depth = node.depth + 1;
          }
        }
      }
    }
  }

  return root;
}

module.exports = hierarchy;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var hierarchy = __webpack_require__(3);

module.exports = function (root, options) {
  // separate into left and right trees
  var left = hierarchy(root.data, options, true); // root only

  var right = hierarchy(root.data, options, true); // root only
  // automatically

  var treeSize = root.children.length;
  var rightTreeSize = Math.round(treeSize / 2); // separate left and right tree by meta data

  var getSide = options.getSide || function (child, index) {
    if (index < rightTreeSize) {
      return 'right';
    }

    return 'left';
  };

  for (var i = 0; i < treeSize; i++) {
    var child = root.children[i];
    var side = getSide(child, i);

    if (side === 'right') {
      right.children.push(child);
    } else {
      left.children.push(child);
    }
  }

  left.eachNode(function (node) {
    if (!node.isRoot()) {
      node.side = 'left';
    }
  });
  right.eachNode(function (node) {
    if (!node.isRoot()) {
      node.side = 'right';
    }
  });
  return {
    left: left,
    right: right
  };
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var hierarchy = {
  compactBox: __webpack_require__(6),
  dendrogram: __webpack_require__(9),
  indented: __webpack_require__(11),
  mindmap: __webpack_require__(13)
};
module.exports = hierarchy;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var TreeLayout = __webpack_require__(1);

var nonLayeredTidyTree = __webpack_require__(8);

var doTreeLayout = __webpack_require__(2);

var util = __webpack_require__(0);

var CompactBoxTreeLayout =
/*#__PURE__*/
function (_TreeLayout) {
  _inheritsLoose(CompactBoxTreeLayout, _TreeLayout);

  function CompactBoxTreeLayout() {
    return _TreeLayout.apply(this, arguments) || this;
  }

  var _proto = CompactBoxTreeLayout.prototype;

  _proto.execute = function execute() {
    var me = this;
    return doTreeLayout(me.rootNode, me.options, nonLayeredTidyTree);
  };

  return CompactBoxTreeLayout;
}(TreeLayout);

var DEFAULT_OPTIONS = {};

function compactBoxLayout(root, options) {
  options = util.assign({}, DEFAULT_OPTIONS, options);
  return new CompactBoxTreeLayout(root, options).execute();
}

module.exports = compactBoxLayout;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

function _mix(dist, obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key) && key !== 'constructor' && obj[key] !== undefined) {
      dist[key] = obj[key];
    }
  }
}

var mix = function mix(dist, src1, src2, src3) {
  if (src1) _mix(dist, src1);
  if (src2) _mix(dist, src2);
  if (src3) _mix(dist, src3);
  return dist;
};

module.exports = mix;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

// wrap tree node
function WrappedTree(w, h, y, c) {
  if (c === void 0) {
    c = [];
  }

  var me = this; // size

  me.w = w || 0;
  me.h = h || 0; // position

  me.y = y || 0;
  me.x = 0; // children

  me.c = c || [];
  me.cs = c.length; // modified

  me.prelim = 0;
  me.mod = 0;
  me.shift = 0;
  me.change = 0; // left/right tree

  me.tl = null;
  me.tr = null; // extreme left/right tree

  me.el = null;
  me.er = null; // modified left/right tree

  me.msel = 0;
  me.mser = 0;
}

WrappedTree.fromNode = function (root, isHorizontal) {
  if (!root) return null;
  var children = [];
  root.children.forEach(function (child) {
    children.push(WrappedTree.fromNode(child, isHorizontal));
  });
  if (isHorizontal) return new WrappedTree(root.height, root.width, root.x, children);
  return new WrappedTree(root.width, root.height, root.y, children);
}; // node utils


function moveRight(node, move, isHorizontal) {
  if (isHorizontal) {
    node.y += move;
  } else {
    node.x += move;
  }

  node.children.forEach(function (child) {
    moveRight(child, move, isHorizontal);
  });
}

function getMin(node, isHorizontal) {
  var res = isHorizontal ? node.y : node.x;
  node.children.forEach(function (child) {
    res = Math.min(getMin(child, isHorizontal), res);
  });
  return res;
}

function normalize(node, isHorizontal) {
  var min = getMin(node, isHorizontal);
  moveRight(node, -min, isHorizontal);
}

function convertBack(converted
/* WrappedTree */
, root
/* TreeNode */
, isHorizontal) {
  if (isHorizontal) {
    root.y = converted.x;
  } else {
    root.x = converted.x;
  }

  converted.c.forEach(function (child, i) {
    convertBack(child, root.children[i], isHorizontal);
  });
}

function layer(node, isHorizontal, d) {
  if (d === void 0) {
    d = 0;
  }

  if (isHorizontal) {
    node.x = d;
    d += node.width;
  } else {
    node.y = d;
    d += node.height;
  }

  node.children.forEach(function (child) {
    layer(child, isHorizontal, d);
  });
}

module.exports = function (root, options) {
  if (options === void 0) {
    options = {};
  }

  var isHorizontal = options.isHorizontal;

  function firstWalk(t) {
    if (t.cs === 0) {
      setExtremes(t);
      return;
    }

    firstWalk(t.c[0]);
    var ih = updateIYL(bottom(t.c[0].el), 0, null);

    for (var i = 1; i < t.cs; ++i) {
      firstWalk(t.c[i]);
      var min = bottom(t.c[i].er);
      separate(t, i, ih);
      ih = updateIYL(min, i, ih);
    }

    positionRoot(t);
    setExtremes(t);
  }

  function setExtremes(t) {
    if (t.cs === 0) {
      t.el = t;
      t.er = t;
      t.msel = t.mser = 0;
    } else {
      t.el = t.c[0].el;
      t.msel = t.c[0].msel;
      t.er = t.c[t.cs - 1].er;
      t.mser = t.c[t.cs - 1].mser;
    }
  }

  function separate(t, i, ih) {
    var sr = t.c[i - 1];
    var mssr = sr.mod;
    var cl = t.c[i];
    var mscl = cl.mod;

    while (sr !== null && cl !== null) {
      if (bottom(sr) > ih.low) ih = ih.nxt;
      var dist = mssr + sr.prelim + sr.w - (mscl + cl.prelim);

      if (dist > 0) {
        mscl += dist;
        moveSubtree(t, i, ih.index, dist);
      }

      var sy = bottom(sr);
      var cy = bottom(cl);

      if (sy <= cy) {
        sr = nextRightContour(sr);
        if (sr !== null) mssr += sr.mod;
      }

      if (sy >= cy) {
        cl = nextLeftContour(cl);
        if (cl !== null) mscl += cl.mod;
      }
    }

    if (!sr && !!cl) {
      setLeftThread(t, i, cl, mscl);
    } else if (!!sr && !cl) {
      setRightThread(t, i, sr, mssr);
    }
  }

  function moveSubtree(t, i, si, dist) {
    t.c[i].mod += dist;
    t.c[i].msel += dist;
    t.c[i].mser += dist;
    distributeExtra(t, i, si, dist);
  }

  function nextLeftContour(t) {
    return t.cs === 0 ? t.tl : t.c[0];
  }

  function nextRightContour(t) {
    return t.cs === 0 ? t.tr : t.c[t.cs - 1];
  }

  function bottom(t) {
    return t.y + t.h;
  }

  function setLeftThread(t, i, cl, modsumcl) {
    var li = t.c[0].el;
    li.tl = cl;
    var diff = modsumcl - cl.mod - t.c[0].msel;
    li.mod += diff;
    li.prelim -= diff;
    t.c[0].el = t.c[i].el;
    t.c[0].msel = t.c[i].msel;
  }

  function setRightThread(t, i, sr, modsumsr) {
    var ri = t.c[i].er;
    ri.tr = sr;
    var diff = modsumsr - sr.mod - t.c[i].mser;
    ri.mod += diff;
    ri.prelim -= diff;
    t.c[i].er = t.c[i - 1].er;
    t.c[i].mser = t.c[i - 1].mser;
  }

  function positionRoot(t) {
    t.prelim = (t.c[0].prelim + t.c[0].mod + t.c[t.cs - 1].mod + t.c[t.cs - 1].prelim + t.c[t.cs - 1].w) / 2 - t.w / 2;
  }

  function secondWalk(t, modsum) {
    modsum += t.mod;
    t.x = t.prelim + modsum;
    addChildSpacing(t);

    for (var i = 0; i < t.cs; i++) {
      secondWalk(t.c[i], modsum);
    }
  }

  function distributeExtra(t, i, si, dist) {
    if (si !== i - 1) {
      var nr = i - si;
      t.c[si + 1].shift += dist / nr;
      t.c[i].shift -= dist / nr;
      t.c[i].change -= dist - dist / nr;
    }
  }

  function addChildSpacing(t) {
    var d = 0;
    var modsumdelta = 0;

    for (var i = 0; i < t.cs; i++) {
      d += t.c[i].shift;
      modsumdelta += d + t.c[i].change;
      t.c[i].mod += modsumdelta;
    }
  }

  function updateIYL(low, index, ih) {
    while (ih !== null && low >= ih.low) {
      ih = ih.nxt;
    }

    return {
      low: low,
      index: index,
      nxt: ih
    };
  } // do layout


  layer(root, isHorizontal);
  var wt = WrappedTree.fromNode(root, isHorizontal);
  firstWalk(wt);
  secondWalk(wt, 0);
  convertBack(wt, root, isHorizontal);
  normalize(root, isHorizontal);
  return root;
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var TreeLayout = __webpack_require__(1);

var dendrogram = __webpack_require__(10);

var doTreeLayout = __webpack_require__(2);

var util = __webpack_require__(0);

var DendrogramLayout =
/*#__PURE__*/
function (_TreeLayout) {
  _inheritsLoose(DendrogramLayout, _TreeLayout);

  function DendrogramLayout() {
    return _TreeLayout.apply(this, arguments) || this;
  }

  var _proto = DendrogramLayout.prototype;

  _proto.execute = function execute() {
    var me = this;
    me.rootNode.width = 0;
    return doTreeLayout(me.rootNode, me.options, dendrogram);
  };

  return DendrogramLayout;
}(TreeLayout);

var DEFAULT_OPTIONS = {};

function dendrogramLayout(root, options) {
  options = util.assign({}, DEFAULT_OPTIONS, options);
  return new DendrogramLayout(root, options).execute();
}

module.exports = dendrogramLayout;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// wrap tree node
// TODO considering size
var util = __webpack_require__(0);

function WrappedTree(height, children) {
  if (height === void 0) {
    height = 0;
  }

  if (children === void 0) {
    children = [];
  }

  var me = this;
  me.x = me.y = 0;
  me.leftChild = me.rightChild = null;
  me.height = 0;
  me.children = children;
}

var DEFAULT_OPTIONS = {
  isHorizontal: true,
  nodeSep: 20,
  nodeSize: 20,
  rankSep: 200,
  subTreeSep: 10
};

function convertBack(converted
/* WrappedTree */
, root
/* TreeNode */
, isHorizontal) {
  if (isHorizontal) {
    root.x = converted.x;
    root.y = converted.y;
  } else {
    root.x = converted.y;
    root.y = converted.x;
  }

  converted.children.forEach(function (child, i) {
    convertBack(child, root.children[i], isHorizontal);
  });
}

module.exports = function (root, options) {
  if (options === void 0) {
    options = {};
  }

  options = util.assign({}, DEFAULT_OPTIONS, options);
  var maxDepth = 0;

  function wrappedTreeFromNode(n) {
    if (!n) return null;
    n.width = 0;

    if (n.depth && n.depth > maxDepth) {
      maxDepth = n.depth; // get the max depth
    }

    var children = n.children;
    var childrenCount = children.length;
    var t = new WrappedTree(n.height, []);
    children.forEach(function (child, i) {
      var childWT = wrappedTreeFromNode(child);
      t.children.push(childWT);

      if (i === 0) {
        // t.leftChild = childWT.leftChild ? childWT.leftChild : childWT
        t.leftChild = childWT;
      }

      if (i === childrenCount - 1) {
        // t.rightChild = childWT.rightChild ? childWT.rightChild : childWT
        t.rightChild = childWT;
      }
    });
    t.originNode = n;
    t.isLeaf = n.isLeaf();
    return t;
  }

  function getDrawingDepth(t) {
    if (t.isLeaf || t.children.length === 0) {
      t.drawingDepth = maxDepth;
    } else {
      var depths = t.children.map(function (child) {
        return getDrawingDepth(child);
      });
      var minChildDepth = Math.min.apply(null, depths);
      t.drawingDepth = minChildDepth - 1;
    }

    return t.drawingDepth;
  }

  var prevLeaf;

  function position(t) {
    t.x = t.drawingDepth * options.rankSep;

    if (t.isLeaf) {
      t.y = 0;

      if (prevLeaf) {
        t.y = prevLeaf.y + prevLeaf.height + options.nodeSep;

        if (t.originNode.parent !== prevLeaf.originNode.parent) {
          t.y += options.subTreeSep;
        }
      }

      prevLeaf = t;
    } else {
      t.children.forEach(function (child) {
        position(child);
      });
      t.y = (t.leftChild.y + t.rightChild.y) / 2;
    }
  } // wrap node


  var wt = wrappedTreeFromNode(root); // get depth for drawing

  getDrawingDepth(wt); // get position

  position(wt); // get x, y

  convertBack(wt, root, options.isHorizontal);
  return root;
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var TreeLayout = __webpack_require__(1);

var indentedTree = __webpack_require__(12);

var separateTree = __webpack_require__(4);

var util = __webpack_require__(0);

var VALID_DIRECTIONS = ['LR', // left to right
'RL', // right to left
'H' // horizontal
];
var DEFAULT_DIRECTION = VALID_DIRECTIONS[0];

var IndentedLayout =
/*#__PURE__*/
function (_TreeLayout) {
  _inheritsLoose(IndentedLayout, _TreeLayout);

  function IndentedLayout() {
    return _TreeLayout.apply(this, arguments) || this;
  }

  var _proto = IndentedLayout.prototype;

  _proto.execute = function execute() {
    var me = this;
    var options = me.options;
    var root = me.rootNode;
    options.isHorizontal = true;
    var indent = options.indent;
    var direction = options.direction || DEFAULT_DIRECTION;

    if (direction && VALID_DIRECTIONS.indexOf(direction) === -1) {
      throw new TypeError("Invalid direction: " + direction);
    }

    if (direction === VALID_DIRECTIONS[0]) {
      // LR
      indentedTree(root, indent);
    } else if (direction === VALID_DIRECTIONS[1]) {
      // RL
      indentedTree(root, indent);
      root.right2left();
    } else if (direction === VALID_DIRECTIONS[2]) {
      // H
      // separate into left and right trees
      var _separateTree = separateTree(root, options),
          left = _separateTree.left,
          right = _separateTree.right;

      indentedTree(left, indent);
      left.right2left();
      indentedTree(right, indent);
      var bbox = left.getBoundingBox();
      right.translate(bbox.width, 0);
      root.x = right.x - root.width / 2;
    }

    return root;
  };

  return IndentedLayout;
}(TreeLayout);

var DEFAULT_OPTIONS = {};

function indentedLayout(root, options) {
  options = util.assign({}, DEFAULT_OPTIONS, options);
  return new IndentedLayout(root, options).execute();
}

module.exports = indentedLayout;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

var DEFAULT_INDENT = 20;

function positionNode(node, previousNode, dx) {
  node.x += dx * node.depth;
  node.y = previousNode ? previousNode.y + previousNode.height : 0;
}

module.exports = function (root, indent) {
  if (indent === void 0) {
    indent = DEFAULT_INDENT;
  }

  var previousNode = null;
  root.eachNode(function (node) {
    positionNode(node, previousNode, indent);
    previousNode = node;
  });
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var TreeLayout = __webpack_require__(1);

var mindmap = __webpack_require__(14);

var doTreeLayout = __webpack_require__(2);

var util = __webpack_require__(0);

var MindmapLayout =
/*#__PURE__*/
function (_TreeLayout) {
  _inheritsLoose(MindmapLayout, _TreeLayout);

  function MindmapLayout() {
    return _TreeLayout.apply(this, arguments) || this;
  }

  var _proto = MindmapLayout.prototype;

  _proto.execute = function execute() {
    var me = this;
    return doTreeLayout(me.rootNode, me.options, mindmap);
  };

  return MindmapLayout;
}(TreeLayout);

var DEFAULT_OPTIONS = {};

function mindmapLayout(root, options) {
  options = util.assign({}, DEFAULT_OPTIONS, options);
  return new MindmapLayout(root, options).execute();
}

module.exports = mindmapLayout;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__(0);

function secondWalk(node, options) {
  var totalHeight = 0;

  if (!node.children.length) {
    totalHeight = node.height;
  } else {
    node.children.forEach(function (c) {
      totalHeight += secondWalk(c, options);
    });
  }

  node._subTreeSep = options.getSubTreeSep(node.data);
  node.totalHeight = Math.max(node.height, totalHeight) + 2 * node._subTreeSep;
  return node.totalHeight;
}

function thirdWalk(node) {
  var children = node.children;
  var len = children.length;

  if (len) {
    children.forEach(function (c) {
      thirdWalk(c);
    });
    var first = children[0];
    var last = children[len - 1];
    var childrenHeight = last.y - first.y + last.height;
    var childrenTotalHeight = 0;
    children.forEach(function (child) {
      childrenTotalHeight += child.totalHeight;
    });

    if (childrenHeight > node.height) {
      // 当子节点总高度大于父节点高度
      node.y = first.y + childrenHeight / 2 - node.height / 2;
    } else if (children.length !== 1 || node.height > childrenTotalHeight) {
      // 多于一个子节点或者父节点大于所有子节点的总高度
      var offset = node.y + (node.height - childrenHeight) / 2 - first.y;
      children.forEach(function (c) {
        c.translate(0, offset);
      });
    } else {
      // 只有一个子节点
      node.y = (first.y + first.height / 2 + last.y + last.height / 2) / 2 - node.height / 2;
    }
  }
}

var DEFAULT_OPTIONS = {
  getSubTreeSep: function getSubTreeSep() {
    return 0;
  }
};

module.exports = function (root, options) {
  if (options === void 0) {
    options = {};
  }

  options = util.assign({}, DEFAULT_OPTIONS, options);
  root.parent = {
    x: 0,
    width: 0,
    height: 0,
    y: 0
  }; // first walk

  root.BFTraverse(function (node) {
    node.x = node.parent.x + node.parent.width; // simply get x
  });
  root.parent = null; // second walk

  secondWalk(root, options); // assign sub tree totalHeight
  // adjusting
  // separating nodes

  root.startY = 0;
  root.y = root.totalHeight / 2 - root.height / 2;
  root.eachNode(function (node) {
    var children = node.children;
    var len = children.length;

    if (len) {
      var first = children[0];
      first.startY = node.startY + node._subTreeSep;

      if (len === 1) {
        first.y = node.y + node.height / 2 - first.height / 2;
      } else {
        first.y = first.startY + first.totalHeight / 2 - first.height / 2;

        for (var i = 1; i < len; i++) {
          var c = children[i];
          c.startY = children[i - 1].startY + children[i - 1].totalHeight;
          c.y = c.startY + c.totalHeight / 2 - c.height / 2;
        }
      }
    }
  }); // third walk

  thirdWalk(root);
};

/***/ })
/******/ ]);
});
//# sourceMappingURL=hierarchy.js.map

/***/ }),

/***/ "./node_modules/@antv/util/lib/array/pull-at.js":
/*!******************************************************!*\
  !*** ./node_modules/@antv/util/lib/array/pull-at.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isArrayLike = __webpack_require__(/*! ../type/is-array-like */ "./node_modules/@antv/util/lib/type/is-array-like.js");

var splice = Array.prototype.splice;

var pullAt = function pullAt(arr, indexes) {
  if (!isArrayLike(arr)) {
    return [];
  }
  var length = arr ? indexes.length : 0;
  var last = length - 1;

  while (length--) {
    var previous = void 0;
    var index = indexes[length];
    if (length === last || index !== previous) {
      previous = index;
      splice.call(arr, index, 1);
    }
  }
  return arr;
};

module.exports = pullAt;

/***/ }),

/***/ "./node_modules/@antv/util/lib/array/remove.js":
/*!*****************************************************!*\
  !*** ./node_modules/@antv/util/lib/array/remove.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isArrayLike = __webpack_require__(/*! ../type/is-array-like */ "./node_modules/@antv/util/lib/type/is-array-like.js");
var pullAt = __webpack_require__(/*! ./pull-at */ "./node_modules/@antv/util/lib/array/pull-at.js");

var remove = function remove(arr, predicate) {
  /**
   * const arr = [1, 2, 3, 4]
   * const evens = remove(arr, n => n % 2 == 0)
   * console.log(arr) // => [1, 3]
   * console.log(evens) // => [2, 4]
   */
  var result = [];
  if (!isArrayLike(arr)) {
    return result;
  }
  var i = -1;
  var indexes = [];
  var length = arr.length;

  while (++i < length) {
    var value = arr[i];
    if (predicate(value, i, arr)) {
      result.push(value);
      indexes.push(i);
    }
  }
  pullAt(arr, indexes);
  return result;
};

module.exports = remove;

/***/ }),

/***/ "./node_modules/@antv/util/lib/augment.js":
/*!************************************************!*\
  !*** ./node_modules/@antv/util/lib/augment.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(/*! ./type/is-function */ "./node_modules/@antv/util/lib/type/is-function.js");
var toArray = __webpack_require__(/*! ./to-array */ "./node_modules/@antv/util/lib/to-array.js");
var mix = __webpack_require__(/*! ./mix */ "./node_modules/@antv/util/lib/mix.js");

var augment = function augment(c) {
  var args = toArray(arguments);
  for (var i = 1; i < args.length; i++) {
    var obj = args[i];
    if (isFunction(obj)) {
      obj = obj.prototype;
    }
    mix(c.prototype, obj);
  }
};

module.exports = augment;

/***/ }),

/***/ "./node_modules/@antv/util/lib/clone.js":
/*!**********************************************!*\
  !*** ./node_modules/@antv/util/lib/clone.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var isArray = __webpack_require__(/*! ./type/is-array */ "./node_modules/@antv/util/lib/type/is-array.js");

var clone = function clone(obj) {
  if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object' || obj === null) {
    return obj;
  }
  var rst = void 0;
  if (isArray(obj)) {
    rst = [];
    for (var i = 0, l = obj.length; i < l; i++) {
      if (_typeof(obj[i]) === 'object' && obj[i] != null) {
        rst[i] = clone(obj[i]);
      } else {
        rst[i] = obj[i];
      }
    }
  } else {
    rst = {};
    for (var k in obj) {
      if (_typeof(obj[k]) === 'object' && obj[k] != null) {
        rst[k] = clone(obj[k]);
      } else {
        rst[k] = obj[k];
      }
    }
  }

  return rst;
};

module.exports = clone;

/***/ }),

/***/ "./node_modules/@antv/util/lib/debounce.js":
/*!*************************************************!*\
  !*** ./node_modules/@antv/util/lib/debounce.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {


function debounce(func, wait, immediate) {
  var timeout = void 0;
  return function () {
    var context = this,
        args = arguments;
    var later = function later() {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func.apply(context, args);
    }
  };
}

module.exports = debounce;

/***/ }),

/***/ "./node_modules/@antv/util/lib/deep-mix.js":
/*!*************************************************!*\
  !*** ./node_modules/@antv/util/lib/deep-mix.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isPlainObject = __webpack_require__(/*! ./type/is-plain-object */ "./node_modules/@antv/util/lib/type/is-plain-object.js");
var isArray = __webpack_require__(/*! ./type/is-array */ "./node_modules/@antv/util/lib/type/is-array.js");

var MAX_MIX_LEVEL = 5;

function _deepMix(dist, src, level, maxLevel) {
  level = level || 0;
  maxLevel = maxLevel || MAX_MIX_LEVEL;
  for (var key in src) {
    if (src.hasOwnProperty(key)) {
      var value = src[key];
      if (value !== null && isPlainObject(value)) {
        if (!isPlainObject(dist[key])) {
          dist[key] = {};
        }
        if (level < maxLevel) {
          _deepMix(dist[key], value, level + 1, maxLevel);
        } else {
          dist[key] = src[key];
        }
      } else if (isArray(value)) {
        dist[key] = [];
        dist[key] = dist[key].concat(value);
      } else if (value !== undefined) {
        dist[key] = value;
      }
    }
  }
}

var deepMix = function deepMix() {
  var args = new Array(arguments.length);
  var length = args.length;
  for (var i = 0; i < length; i++) {
    args[i] = arguments[i];
  }
  var rst = args[0];
  for (var _i = 1; _i < length; _i++) {
    _deepMix(rst, args[_i]);
  }
  return rst;
};

module.exports = deepMix;

/***/ }),

/***/ "./node_modules/@antv/util/lib/dom/add-event-listener.js":
/*!***************************************************************!*\
  !*** ./node_modules/@antv/util/lib/dom/add-event-listener.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * 添加事件监听器
 * @param  {Object} target DOM对象
 * @param  {String} eventType 事件名
 * @param  {Funtion} callback 回调函数
 * @return {Object} 返回对象
 */
module.exports = function addEventListener(target, eventType, callback) {
  if (target) {
    if (target.addEventListener) {
      target.addEventListener(eventType, callback, false);
      return {
        remove: function remove() {
          target.removeEventListener(eventType, callback, false);
        }
      };
    } else if (target.attachEvent) {
      target.attachEvent('on' + eventType, callback);
      return {
        remove: function remove() {
          target.detachEvent('on' + eventType, callback);
        }
      };
    }
  }
};

/***/ }),

/***/ "./node_modules/@antv/util/lib/dom/create-dom.js":
/*!*******************************************************!*\
  !*** ./node_modules/@antv/util/lib/dom/create-dom.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * 创建DOM 节点
 * @param  {String} str Dom 字符串
 * @return {HTMLElement}  DOM 节点
 */
var TABLE = document.createElement('table');
var TABLE_TR = document.createElement('tr');
var FRAGMENT_REG = /^\s*<(\w+|!)[^>]*>/;
var CONTAINERS = {
  tr: document.createElement('tbody'),
  tbody: TABLE,
  thead: TABLE,
  tfoot: TABLE,
  td: TABLE_TR,
  th: TABLE_TR,
  '*': document.createElement('div')
};

module.exports = function createDom(str) {
  var name = FRAGMENT_REG.test(str) && RegExp.$1;
  if (!(name in CONTAINERS)) {
    name = '*';
  }
  var container = CONTAINERS[name];
  str = str.replace(/(^\s*)|(\s*$)/g, '');
  container.innerHTML = '' + str;
  var dom = container.childNodes[0];
  container.removeChild(dom);
  return dom;
};

/***/ }),

/***/ "./node_modules/@antv/util/lib/dom/modify-css.js":
/*!*******************************************************!*\
  !*** ./node_modules/@antv/util/lib/dom/modify-css.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {


module.exports = function modifyCSS(dom, css) {
  if (dom) {
    for (var key in css) {
      if (css.hasOwnProperty(key)) {
        dom.style[key] = css[key];
      }
    }
  }
  return dom;
};

/***/ }),

/***/ "./node_modules/@antv/util/lib/each.js":
/*!*********************************************!*\
  !*** ./node_modules/@antv/util/lib/each.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./type/is-object */ "./node_modules/@antv/util/lib/type/is-object.js");
var isArray = __webpack_require__(/*! ./type/is-array */ "./node_modules/@antv/util/lib/type/is-array.js");

var each = function each(elements, func) {
  if (!elements) {
    return;
  }
  var rst = void 0;
  if (isArray(elements)) {
    for (var i = 0, len = elements.length; i < len; i++) {
      rst = func(elements[i], i);
      if (rst === false) {
        break;
      }
    }
  } else if (isObject(elements)) {
    for (var k in elements) {
      if (elements.hasOwnProperty(k)) {
        rst = func(elements[k], k);
        if (rst === false) {
          break;
        }
      }
    }
  }
};

module.exports = each;

/***/ }),

/***/ "./node_modules/@antv/util/lib/event/wrap-behavior.js":
/*!************************************************************!*\
  !*** ./node_modules/@antv/util/lib/event/wrap-behavior.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * 封装事件，便于使用上下文this,和便于解除事件时使用
 * @protected
 * @param  {Object} obj   对象
 * @param  {String} action 事件名称
 * @return {Function}        返回事件处理函数
 */
function wrapBehavior(obj, action) {
  if (obj['_wrap_' + action]) {
    return obj['_wrap_' + action];
  }
  var method = function method(e) {
    obj[action](e);
  };
  obj['_wrap_' + action] = method;
  return method;
}

module.exports = wrapBehavior;

/***/ }),

/***/ "./node_modules/@antv/util/lib/extend.js":
/*!***********************************************!*\
  !*** ./node_modules/@antv/util/lib/extend.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(/*! ./type/is-function */ "./node_modules/@antv/util/lib/type/is-function.js");
var mix = __webpack_require__(/*! ./mix */ "./node_modules/@antv/util/lib/mix.js");

var extend = function extend(subclass, superclass, overrides, staticOverrides) {
  // 如果只提供父类构造函数，则自动生成子类构造函数
  if (!isFunction(superclass)) {
    overrides = superclass;
    superclass = subclass;
    subclass = function subclass() {};
  }

  var create = Object.create ? function (proto, c) {
    return Object.create(proto, {
      constructor: {
        value: c
      }
    });
  } : function (proto, c) {
    function Tmp() {}
    Tmp.prototype = proto;
    var o = new Tmp();
    o.constructor = c;
    return o;
  };

  var superObj = create(superclass.prototype, subclass); // new superclass(),//实例化父类作为子类的prototype
  subclass.prototype = mix(superObj, subclass.prototype); // 指定子类的prototype
  subclass.superclass = create(superclass.prototype, superclass);
  mix(superObj, overrides);
  mix(subclass, staticOverrides);
  return subclass;
};

module.exports = extend;

/***/ }),

/***/ "./node_modules/@antv/util/lib/math/clamp.js":
/*!***************************************************!*\
  !*** ./node_modules/@antv/util/lib/math/clamp.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var clamp = function clamp(a, min, max) {
  if (a < min) {
    return min;
  } else if (a > max) {
    return max;
  }
  return a;
};

module.exports = clamp;

/***/ }),

/***/ "./node_modules/@antv/util/lib/matrix/mat3.js":
/*!****************************************************!*\
  !*** ./node_modules/@antv/util/lib/matrix/mat3.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var mat3 = __webpack_require__(/*! @antv/gl-matrix/lib/gl-matrix/mat3 */ "./node_modules/@antv/gl-matrix/lib/gl-matrix/mat3.js");

mat3.translate = function (out, a, v) {
  var transMat = new Array(9);
  mat3.fromTranslation(transMat, v);
  return mat3.multiply(out, transMat, a);
};

mat3.rotate = function (out, a, rad) {
  var rotateMat = new Array(9);
  mat3.fromRotation(rotateMat, rad);
  return mat3.multiply(out, rotateMat, a);
};

mat3.scale = function (out, a, v) {
  var scaleMat = new Array(9);
  mat3.fromScaling(scaleMat, v);
  return mat3.multiply(out, scaleMat, a);
};

module.exports = mat3;

/***/ }),

/***/ "./node_modules/@antv/util/lib/matrix/transform.js":
/*!*********************************************************!*\
  !*** ./node_modules/@antv/util/lib/matrix/transform.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var clone = __webpack_require__(/*! ../clone */ "./node_modules/@antv/util/lib/clone.js");
var each = __webpack_require__(/*! ../each */ "./node_modules/@antv/util/lib/each.js");
var mat3 = __webpack_require__(/*! ./mat3 */ "./node_modules/@antv/util/lib/matrix/mat3.js");

module.exports = function transform(m, ts) {
  m = clone(m);
  each(ts, function (t) {
    switch (t[0]) {
      case 't':
        mat3.translate(m, m, [t[1], t[2]]);
        break;
      case 's':
        mat3.scale(m, m, [t[1], t[2]]);
        break;
      case 'r':
        mat3.rotate(m, m, t[1]);
        break;
      case 'm':
        mat3.multiply(m, m, t[1]);
        break;
      default:
        return false;
    }
  });
  return m;
};

/***/ }),

/***/ "./node_modules/@antv/util/lib/matrix/vec2.js":
/*!****************************************************!*\
  !*** ./node_modules/@antv/util/lib/matrix/vec2.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var vec2 = __webpack_require__(/*! @antv/gl-matrix/lib/gl-matrix/vec2 */ "./node_modules/@antv/gl-matrix/lib/gl-matrix/vec2.js");
var clamp = __webpack_require__(/*! ../math/clamp */ "./node_modules/@antv/util/lib/math/clamp.js");

vec2.angle = function (v1, v2) {
  var theta = vec2.dot(v1, v2) / (vec2.length(v1) * vec2.length(v2));
  return Math.acos(clamp(theta, -1, 1));
};
/**
 * 向量 v1 到 向量 v2 夹角的方向
 * @param  {Array} v1 向量
 * @param  {Array} v2 向量
 * @return {Boolean} >= 0 顺时针 < 0 逆时针
 */
vec2.direction = function (v1, v2) {
  return v1[0] * v2[1] - v2[0] * v1[1];
};
vec2.angleTo = function (v1, v2, direct) {
  var angle = vec2.angle(v1, v2);
  var angleLargeThanPI = vec2.direction(v1, v2) >= 0;
  if (direct) {
    if (angleLargeThanPI) {
      return Math.PI * 2 - angle;
    }

    return angle;
  }

  if (angleLargeThanPI) {
    return angle;
  }
  return Math.PI * 2 - angle;
};
vec2.vertical = function (out, v, flag) {
  if (flag) {
    out[0] = v[1];
    out[1] = -1 * v[0];
  } else {
    out[0] = -1 * v[1];
    out[1] = v[0];
  }

  return out;
};

module.exports = vec2;

/***/ }),

/***/ "./node_modules/@antv/util/lib/matrix/vec3.js":
/*!****************************************************!*\
  !*** ./node_modules/@antv/util/lib/matrix/vec3.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var vec3 = __webpack_require__(/*! @antv/gl-matrix/lib/gl-matrix/vec3 */ "./node_modules/@antv/gl-matrix/lib/gl-matrix/vec3.js");

module.exports = vec3;

/***/ }),

/***/ "./node_modules/@antv/util/lib/mix.js":
/*!********************************************!*\
  !*** ./node_modules/@antv/util/lib/mix.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _mix(dist, obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key) && key !== 'constructor' && obj[key] !== undefined) {
      dist[key] = obj[key];
    }
  }
}

var mix = function mix(dist, src1, src2, src3) {
  if (src1) _mix(dist, src1);
  if (src2) _mix(dist, src2);
  if (src3) _mix(dist, src3);
  return dist;
};

module.exports = mix;

/***/ }),

/***/ "./node_modules/@antv/util/lib/string/upper-first.js":
/*!***********************************************************!*\
  !*** ./node_modules/@antv/util/lib/string/upper-first.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toString = __webpack_require__(/*! ../to-string */ "./node_modules/@antv/util/lib/to-string.js");

var upperFirst = function upperFirst(value) {
  var str = toString(value);
  return str.charAt(0).toUpperCase() + str.substring(1);
};

module.exports = upperFirst;

/***/ }),

/***/ "./node_modules/@antv/util/lib/throttle.js":
/*!*************************************************!*\
  !*** ./node_modules/@antv/util/lib/throttle.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {


function throttle(func, wait, options) {
  var timeout = void 0,
      context = void 0,
      args = void 0,
      result = void 0;
  var previous = 0;
  if (!options) options = {};

  var later = function later() {
    previous = options.leading === false ? 0 : Date.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };

  var throttled = function throttled() {
    var now = Date.now();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };

  throttled.cancel = function () {
    clearTimeout(timeout);
    previous = 0;
    timeout = context = args = null;
  };

  return throttled;
}

module.exports = throttle;

/***/ }),

/***/ "./node_modules/@antv/util/lib/to-array.js":
/*!*************************************************!*\
  !*** ./node_modules/@antv/util/lib/to-array.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isArrayLike = __webpack_require__(/*! ./type/is-array-like */ "./node_modules/@antv/util/lib/type/is-array-like.js");

function toArray(value) {
  return isArrayLike(value) ? Array.prototype.slice.call(value) : [];
}

module.exports = toArray;

/***/ }),

/***/ "./node_modules/@antv/util/lib/to-string.js":
/*!**************************************************!*\
  !*** ./node_modules/@antv/util/lib/to-string.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isNil = __webpack_require__(/*! ./type/is-nil */ "./node_modules/@antv/util/lib/type/is-nil.js");

function toString(value) {
  if (isNil(value)) return '';
  return value.toString();
}

module.exports = toString;

/***/ }),

/***/ "./node_modules/@antv/util/lib/type/is-array-like.js":
/*!***********************************************************!*\
  !*** ./node_modules/@antv/util/lib/type/is-array-like.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var isArrayLike = function isArrayLike(value) {
  /**
   * isArrayLike([1, 2, 3]) => true
   * isArrayLike(document.body.children) => true
   * isArrayLike('abc') => true
   * isArrayLike(Function) => false
   */
  return value !== null && typeof value !== 'function' && isFinite(value.length);
};

module.exports = isArrayLike;

/***/ }),

/***/ "./node_modules/@antv/util/lib/type/is-array.js":
/*!******************************************************!*\
  !*** ./node_modules/@antv/util/lib/type/is-array.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isType = __webpack_require__(/*! ./is-type */ "./node_modules/@antv/util/lib/type/is-type.js");

var isArray = Array.isArray ? Array.isArray : function (value) {
  return isType(value, 'Array');
};

module.exports = isArray;

/***/ }),

/***/ "./node_modules/@antv/util/lib/type/is-function.js":
/*!*********************************************************!*\
  !*** ./node_modules/@antv/util/lib/type/is-function.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * 是否为函数
 * @param  {*} fn 对象
 * @return {Boolean}  是否函数
 */
var isType = __webpack_require__(/*! ./is-type */ "./node_modules/@antv/util/lib/type/is-type.js");

var isFunction = function isFunction(value) {
  return isType(value, 'Function');
};

module.exports = isFunction;

/***/ }),

/***/ "./node_modules/@antv/util/lib/type/is-nil.js":
/*!****************************************************!*\
  !*** ./node_modules/@antv/util/lib/type/is-nil.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// isFinite,
var isNil = function isNil(value) {
  /**
   * isNil(null) => true
   * isNil() => true
   */
  return value === null || value === undefined;
};

module.exports = isNil;

/***/ }),

/***/ "./node_modules/@antv/util/lib/type/is-number.js":
/*!*******************************************************!*\
  !*** ./node_modules/@antv/util/lib/type/is-number.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * 判断是否数字
 * @return {Boolean} 是否数字
 */
var isType = __webpack_require__(/*! ./is-type */ "./node_modules/@antv/util/lib/type/is-type.js");

var isNumber = function isNumber(value) {
  return isType(value, 'Number');
};
module.exports = isNumber;

/***/ }),

/***/ "./node_modules/@antv/util/lib/type/is-object-like.js":
/*!************************************************************!*\
  !*** ./node_modules/@antv/util/lib/type/is-object-like.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var isObjectLike = function isObjectLike(value) {
  /**
   * isObjectLike({}) => true
   * isObjectLike([1, 2, 3]) => true
   * isObjectLike(Function) => false
   * isObjectLike(null) => false
   */
  return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value !== null;
};

module.exports = isObjectLike;

/***/ }),

/***/ "./node_modules/@antv/util/lib/type/is-object.js":
/*!*******************************************************!*\
  !*** ./node_modules/@antv/util/lib/type/is-object.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var isObject = function isObject(value) {
  /**
   * isObject({}) => true
   * isObject([1, 2, 3]) => true
   * isObject(Function) => true
   * isObject(null) => false
   */
  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
  return value !== null && type === 'object' || type === 'function';
};

module.exports = isObject;

/***/ }),

/***/ "./node_modules/@antv/util/lib/type/is-plain-object.js":
/*!*************************************************************!*\
  !*** ./node_modules/@antv/util/lib/type/is-plain-object.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObjectLike = __webpack_require__(/*! ./is-object-like */ "./node_modules/@antv/util/lib/type/is-object-like.js");
var isType = __webpack_require__(/*! ./is-type */ "./node_modules/@antv/util/lib/type/is-type.js");

var isPlainObject = function isPlainObject(value) {
  /**
   * isObjectLike(new Foo) => false
   * isObjectLike([1, 2, 3]) => false
   * isObjectLike({ x: 0, y: 0 }) => true
   * isObjectLike(Object.create(null)) => true
   */
  if (!isObjectLike(value) || !isType(value, 'Object')) {
    return false;
  }
  if (Object.getPrototypeOf(value) === null) {
    return true;
  }
  var proto = value;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(value) === proto;
};

module.exports = isPlainObject;

/***/ }),

/***/ "./node_modules/@antv/util/lib/type/is-string.js":
/*!*******************************************************!*\
  !*** ./node_modules/@antv/util/lib/type/is-string.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isType = __webpack_require__(/*! ./is-type */ "./node_modules/@antv/util/lib/type/is-type.js");

var isString = function isString(str) {
  return isType(str, 'String');
};

module.exports = isString;

/***/ }),

/***/ "./node_modules/@antv/util/lib/type/is-type.js":
/*!*****************************************************!*\
  !*** ./node_modules/@antv/util/lib/type/is-type.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;
var isType = function isType(value, type) {
  return toString.call(value) === '[object ' + type + ']';
};

module.exports = isType;

/***/ }),

/***/ "./node_modules/@antv/util/lib/unique-id.js":
/*!**************************************************!*\
  !*** ./node_modules/@antv/util/lib/unique-id.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var uniqueId = function () {
  var map = {};
  return function (prefix) {
    prefix = prefix || 'g';
    if (!map[prefix]) {
      map[prefix] = 1;
    } else {
      map[prefix] += 1;
    }
    return prefix + map[prefix];
  };
}();

module.exports = uniqueId;

/***/ }),

/***/ "./node_modules/d3-color/src/color.js":
/*!********************************************!*\
  !*** ./node_modules/d3-color/src/color.js ***!
  \********************************************/
/*! exports provided: Color, darker, brighter, default, rgbConvert, rgb, Rgb, hslConvert, hsl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Color", function() { return Color; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "darker", function() { return darker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "brighter", function() { return brighter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return color; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rgbConvert", function() { return rgbConvert; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rgb", function() { return rgb; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Rgb", function() { return Rgb; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hslConvert", function() { return hslConvert; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hsl", function() { return hsl; });
/* harmony import */ var _define__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./define */ "./node_modules/d3-color/src/define.js");


function Color() {}

var darker = 0.7;
var brighter = 1 / darker;

var reI = "\\s*([+-]?\\d+)\\s*",
    reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
    reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
    reHex3 = /^#([0-9a-f]{3})$/,
    reHex6 = /^#([0-9a-f]{6})$/,
    reRgbInteger = new RegExp("^rgb\\(" + [reI, reI, reI] + "\\)$"),
    reRgbPercent = new RegExp("^rgb\\(" + [reP, reP, reP] + "\\)$"),
    reRgbaInteger = new RegExp("^rgba\\(" + [reI, reI, reI, reN] + "\\)$"),
    reRgbaPercent = new RegExp("^rgba\\(" + [reP, reP, reP, reN] + "\\)$"),
    reHslPercent = new RegExp("^hsl\\(" + [reN, reP, reP] + "\\)$"),
    reHslaPercent = new RegExp("^hsla\\(" + [reN, reP, reP, reN] + "\\)$");

var named = {
  aliceblue: 0xf0f8ff,
  antiquewhite: 0xfaebd7,
  aqua: 0x00ffff,
  aquamarine: 0x7fffd4,
  azure: 0xf0ffff,
  beige: 0xf5f5dc,
  bisque: 0xffe4c4,
  black: 0x000000,
  blanchedalmond: 0xffebcd,
  blue: 0x0000ff,
  blueviolet: 0x8a2be2,
  brown: 0xa52a2a,
  burlywood: 0xdeb887,
  cadetblue: 0x5f9ea0,
  chartreuse: 0x7fff00,
  chocolate: 0xd2691e,
  coral: 0xff7f50,
  cornflowerblue: 0x6495ed,
  cornsilk: 0xfff8dc,
  crimson: 0xdc143c,
  cyan: 0x00ffff,
  darkblue: 0x00008b,
  darkcyan: 0x008b8b,
  darkgoldenrod: 0xb8860b,
  darkgray: 0xa9a9a9,
  darkgreen: 0x006400,
  darkgrey: 0xa9a9a9,
  darkkhaki: 0xbdb76b,
  darkmagenta: 0x8b008b,
  darkolivegreen: 0x556b2f,
  darkorange: 0xff8c00,
  darkorchid: 0x9932cc,
  darkred: 0x8b0000,
  darksalmon: 0xe9967a,
  darkseagreen: 0x8fbc8f,
  darkslateblue: 0x483d8b,
  darkslategray: 0x2f4f4f,
  darkslategrey: 0x2f4f4f,
  darkturquoise: 0x00ced1,
  darkviolet: 0x9400d3,
  deeppink: 0xff1493,
  deepskyblue: 0x00bfff,
  dimgray: 0x696969,
  dimgrey: 0x696969,
  dodgerblue: 0x1e90ff,
  firebrick: 0xb22222,
  floralwhite: 0xfffaf0,
  forestgreen: 0x228b22,
  fuchsia: 0xff00ff,
  gainsboro: 0xdcdcdc,
  ghostwhite: 0xf8f8ff,
  gold: 0xffd700,
  goldenrod: 0xdaa520,
  gray: 0x808080,
  green: 0x008000,
  greenyellow: 0xadff2f,
  grey: 0x808080,
  honeydew: 0xf0fff0,
  hotpink: 0xff69b4,
  indianred: 0xcd5c5c,
  indigo: 0x4b0082,
  ivory: 0xfffff0,
  khaki: 0xf0e68c,
  lavender: 0xe6e6fa,
  lavenderblush: 0xfff0f5,
  lawngreen: 0x7cfc00,
  lemonchiffon: 0xfffacd,
  lightblue: 0xadd8e6,
  lightcoral: 0xf08080,
  lightcyan: 0xe0ffff,
  lightgoldenrodyellow: 0xfafad2,
  lightgray: 0xd3d3d3,
  lightgreen: 0x90ee90,
  lightgrey: 0xd3d3d3,
  lightpink: 0xffb6c1,
  lightsalmon: 0xffa07a,
  lightseagreen: 0x20b2aa,
  lightskyblue: 0x87cefa,
  lightslategray: 0x778899,
  lightslategrey: 0x778899,
  lightsteelblue: 0xb0c4de,
  lightyellow: 0xffffe0,
  lime: 0x00ff00,
  limegreen: 0x32cd32,
  linen: 0xfaf0e6,
  magenta: 0xff00ff,
  maroon: 0x800000,
  mediumaquamarine: 0x66cdaa,
  mediumblue: 0x0000cd,
  mediumorchid: 0xba55d3,
  mediumpurple: 0x9370db,
  mediumseagreen: 0x3cb371,
  mediumslateblue: 0x7b68ee,
  mediumspringgreen: 0x00fa9a,
  mediumturquoise: 0x48d1cc,
  mediumvioletred: 0xc71585,
  midnightblue: 0x191970,
  mintcream: 0xf5fffa,
  mistyrose: 0xffe4e1,
  moccasin: 0xffe4b5,
  navajowhite: 0xffdead,
  navy: 0x000080,
  oldlace: 0xfdf5e6,
  olive: 0x808000,
  olivedrab: 0x6b8e23,
  orange: 0xffa500,
  orangered: 0xff4500,
  orchid: 0xda70d6,
  palegoldenrod: 0xeee8aa,
  palegreen: 0x98fb98,
  paleturquoise: 0xafeeee,
  palevioletred: 0xdb7093,
  papayawhip: 0xffefd5,
  peachpuff: 0xffdab9,
  peru: 0xcd853f,
  pink: 0xffc0cb,
  plum: 0xdda0dd,
  powderblue: 0xb0e0e6,
  purple: 0x800080,
  rebeccapurple: 0x663399,
  red: 0xff0000,
  rosybrown: 0xbc8f8f,
  royalblue: 0x4169e1,
  saddlebrown: 0x8b4513,
  salmon: 0xfa8072,
  sandybrown: 0xf4a460,
  seagreen: 0x2e8b57,
  seashell: 0xfff5ee,
  sienna: 0xa0522d,
  silver: 0xc0c0c0,
  skyblue: 0x87ceeb,
  slateblue: 0x6a5acd,
  slategray: 0x708090,
  slategrey: 0x708090,
  snow: 0xfffafa,
  springgreen: 0x00ff7f,
  steelblue: 0x4682b4,
  tan: 0xd2b48c,
  teal: 0x008080,
  thistle: 0xd8bfd8,
  tomato: 0xff6347,
  turquoise: 0x40e0d0,
  violet: 0xee82ee,
  wheat: 0xf5deb3,
  white: 0xffffff,
  whitesmoke: 0xf5f5f5,
  yellow: 0xffff00,
  yellowgreen: 0x9acd32
};

Object(_define__WEBPACK_IMPORTED_MODULE_0__["default"])(Color, color, {
  displayable: function() {
    return this.rgb().displayable();
  },
  hex: function() {
    return this.rgb().hex();
  },
  toString: function() {
    return this.rgb() + "";
  }
});

function color(format) {
  var m;
  format = (format + "").trim().toLowerCase();
  return (m = reHex3.exec(format)) ? (m = parseInt(m[1], 16), new Rgb((m >> 8 & 0xf) | (m >> 4 & 0x0f0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf), 1)) // #f00
      : (m = reHex6.exec(format)) ? rgbn(parseInt(m[1], 16)) // #ff0000
      : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
      : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
      : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
      : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
      : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
      : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
      : named.hasOwnProperty(format) ? rgbn(named[format])
      : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0)
      : null;
}

function rgbn(n) {
  return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
}

function rgba(r, g, b, a) {
  if (a <= 0) r = g = b = NaN;
  return new Rgb(r, g, b, a);
}

function rgbConvert(o) {
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Rgb;
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}

function rgb(r, g, b, opacity) {
  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
}

function Rgb(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}

Object(_define__WEBPACK_IMPORTED_MODULE_0__["default"])(Rgb, rgb, Object(_define__WEBPACK_IMPORTED_MODULE_0__["extend"])(Color, {
  brighter: function(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb: function() {
    return this;
  },
  displayable: function() {
    return (0 <= this.r && this.r <= 255)
        && (0 <= this.g && this.g <= 255)
        && (0 <= this.b && this.b <= 255)
        && (0 <= this.opacity && this.opacity <= 1);
  },
  hex: function() {
    return "#" + hex(this.r) + hex(this.g) + hex(this.b);
  },
  toString: function() {
    var a = this.opacity; a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
    return (a === 1 ? "rgb(" : "rgba(")
        + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", "
        + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", "
        + Math.max(0, Math.min(255, Math.round(this.b) || 0))
        + (a === 1 ? ")" : ", " + a + ")");
  }
}));

function hex(value) {
  value = Math.max(0, Math.min(255, Math.round(value) || 0));
  return (value < 16 ? "0" : "") + value.toString(16);
}

function hsla(h, s, l, a) {
  if (a <= 0) h = s = l = NaN;
  else if (l <= 0 || l >= 1) h = s = NaN;
  else if (s <= 0) h = NaN;
  return new Hsl(h, s, l, a);
}

function hslConvert(o) {
  if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Hsl;
  if (o instanceof Hsl) return o;
  o = o.rgb();
  var r = o.r / 255,
      g = o.g / 255,
      b = o.b / 255,
      min = Math.min(r, g, b),
      max = Math.max(r, g, b),
      h = NaN,
      s = max - min,
      l = (max + min) / 2;
  if (s) {
    if (r === max) h = (g - b) / s + (g < b) * 6;
    else if (g === max) h = (b - r) / s + 2;
    else h = (r - g) / s + 4;
    s /= l < 0.5 ? max + min : 2 - max - min;
    h *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h;
  }
  return new Hsl(h, s, l, o.opacity);
}

function hsl(h, s, l, opacity) {
  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
}

function Hsl(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}

Object(_define__WEBPACK_IMPORTED_MODULE_0__["default"])(Hsl, hsl, Object(_define__WEBPACK_IMPORTED_MODULE_0__["extend"])(Color, {
  brighter: function(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function() {
    var h = this.h % 360 + (this.h < 0) * 360,
        s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
        l = this.l,
        m2 = l + (l < 0.5 ? l : 1 - l) * s,
        m1 = 2 * l - m2;
    return new Rgb(
      hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
      hsl2rgb(h, m1, m2),
      hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
      this.opacity
    );
  },
  displayable: function() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s))
        && (0 <= this.l && this.l <= 1)
        && (0 <= this.opacity && this.opacity <= 1);
  }
}));

/* From FvD 13.37, CSS Color Module Level 3 */
function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60
      : h < 180 ? m2
      : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60
      : m1) * 255;
}


/***/ }),

/***/ "./node_modules/d3-color/src/cubehelix.js":
/*!************************************************!*\
  !*** ./node_modules/d3-color/src/cubehelix.js ***!
  \************************************************/
/*! exports provided: default, Cubehelix */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return cubehelix; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Cubehelix", function() { return Cubehelix; });
/* harmony import */ var _define__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./define */ "./node_modules/d3-color/src/define.js");
/* harmony import */ var _color__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./color */ "./node_modules/d3-color/src/color.js");
/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./math */ "./node_modules/d3-color/src/math.js");




var A = -0.14861,
    B = +1.78277,
    C = -0.29227,
    D = -0.90649,
    E = +1.97294,
    ED = E * D,
    EB = E * B,
    BC_DA = B * C - D * A;

function cubehelixConvert(o) {
  if (o instanceof Cubehelix) return new Cubehelix(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof _color__WEBPACK_IMPORTED_MODULE_1__["Rgb"])) o = Object(_color__WEBPACK_IMPORTED_MODULE_1__["rgbConvert"])(o);
  var r = o.r / 255,
      g = o.g / 255,
      b = o.b / 255,
      l = (BC_DA * b + ED * r - EB * g) / (BC_DA + ED - EB),
      bl = b - l,
      k = (E * (g - l) - C * bl) / D,
      s = Math.sqrt(k * k + bl * bl) / (E * l * (1 - l)), // NaN if l=0 or l=1
      h = s ? Math.atan2(k, bl) * _math__WEBPACK_IMPORTED_MODULE_2__["rad2deg"] - 120 : NaN;
  return new Cubehelix(h < 0 ? h + 360 : h, s, l, o.opacity);
}

function cubehelix(h, s, l, opacity) {
  return arguments.length === 1 ? cubehelixConvert(h) : new Cubehelix(h, s, l, opacity == null ? 1 : opacity);
}

function Cubehelix(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}

Object(_define__WEBPACK_IMPORTED_MODULE_0__["default"])(Cubehelix, cubehelix, Object(_define__WEBPACK_IMPORTED_MODULE_0__["extend"])(_color__WEBPACK_IMPORTED_MODULE_1__["Color"], {
  brighter: function(k) {
    k = k == null ? _color__WEBPACK_IMPORTED_MODULE_1__["brighter"] : Math.pow(_color__WEBPACK_IMPORTED_MODULE_1__["brighter"], k);
    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? _color__WEBPACK_IMPORTED_MODULE_1__["darker"] : Math.pow(_color__WEBPACK_IMPORTED_MODULE_1__["darker"], k);
    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function() {
    var h = isNaN(this.h) ? 0 : (this.h + 120) * _math__WEBPACK_IMPORTED_MODULE_2__["deg2rad"],
        l = +this.l,
        a = isNaN(this.s) ? 0 : this.s * l * (1 - l),
        cosh = Math.cos(h),
        sinh = Math.sin(h);
    return new _color__WEBPACK_IMPORTED_MODULE_1__["Rgb"](
      255 * (l + a * (A * cosh + B * sinh)),
      255 * (l + a * (C * cosh + D * sinh)),
      255 * (l + a * (E * cosh)),
      this.opacity
    );
  }
}));


/***/ }),

/***/ "./node_modules/d3-color/src/define.js":
/*!*********************************************!*\
  !*** ./node_modules/d3-color/src/define.js ***!
  \*********************************************/
/*! exports provided: default, extend */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extend", function() { return extend; });
/* harmony default export */ __webpack_exports__["default"] = (function(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
});

function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition) prototype[key] = definition[key];
  return prototype;
}


/***/ }),

/***/ "./node_modules/d3-color/src/index.js":
/*!********************************************!*\
  !*** ./node_modules/d3-color/src/index.js ***!
  \********************************************/
/*! exports provided: color, rgb, hsl, lab, hcl, lch, gray, cubehelix */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./color */ "./node_modules/d3-color/src/color.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "color", function() { return _color__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "rgb", function() { return _color__WEBPACK_IMPORTED_MODULE_0__["rgb"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hsl", function() { return _color__WEBPACK_IMPORTED_MODULE_0__["hsl"]; });

/* harmony import */ var _lab__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lab */ "./node_modules/d3-color/src/lab.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "lab", function() { return _lab__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hcl", function() { return _lab__WEBPACK_IMPORTED_MODULE_1__["hcl"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "lch", function() { return _lab__WEBPACK_IMPORTED_MODULE_1__["lch"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "gray", function() { return _lab__WEBPACK_IMPORTED_MODULE_1__["gray"]; });

/* harmony import */ var _cubehelix__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cubehelix */ "./node_modules/d3-color/src/cubehelix.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "cubehelix", function() { return _cubehelix__WEBPACK_IMPORTED_MODULE_2__["default"]; });






/***/ }),

/***/ "./node_modules/d3-color/src/lab.js":
/*!******************************************!*\
  !*** ./node_modules/d3-color/src/lab.js ***!
  \******************************************/
/*! exports provided: gray, default, Lab, lch, hcl, Hcl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gray", function() { return gray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return lab; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Lab", function() { return Lab; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lch", function() { return lch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hcl", function() { return hcl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Hcl", function() { return Hcl; });
/* harmony import */ var _define__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./define */ "./node_modules/d3-color/src/define.js");
/* harmony import */ var _color__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./color */ "./node_modules/d3-color/src/color.js");
/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./math */ "./node_modules/d3-color/src/math.js");




// https://beta.observablehq.com/@mbostock/lab-and-rgb
var K = 18,
    Xn = 0.96422,
    Yn = 1,
    Zn = 0.82521,
    t0 = 4 / 29,
    t1 = 6 / 29,
    t2 = 3 * t1 * t1,
    t3 = t1 * t1 * t1;

function labConvert(o) {
  if (o instanceof Lab) return new Lab(o.l, o.a, o.b, o.opacity);
  if (o instanceof Hcl) {
    if (isNaN(o.h)) return new Lab(o.l, 0, 0, o.opacity);
    var h = o.h * _math__WEBPACK_IMPORTED_MODULE_2__["deg2rad"];
    return new Lab(o.l, Math.cos(h) * o.c, Math.sin(h) * o.c, o.opacity);
  }
  if (!(o instanceof _color__WEBPACK_IMPORTED_MODULE_1__["Rgb"])) o = Object(_color__WEBPACK_IMPORTED_MODULE_1__["rgbConvert"])(o);
  var r = rgb2lrgb(o.r),
      g = rgb2lrgb(o.g),
      b = rgb2lrgb(o.b),
      y = xyz2lab((0.2225045 * r + 0.7168786 * g + 0.0606169 * b) / Yn), x, z;
  if (r === g && g === b) x = z = y; else {
    x = xyz2lab((0.4360747 * r + 0.3850649 * g + 0.1430804 * b) / Xn);
    z = xyz2lab((0.0139322 * r + 0.0971045 * g + 0.7141733 * b) / Zn);
  }
  return new Lab(116 * y - 16, 500 * (x - y), 200 * (y - z), o.opacity);
}

function gray(l, opacity) {
  return new Lab(l, 0, 0, opacity == null ? 1 : opacity);
}

function lab(l, a, b, opacity) {
  return arguments.length === 1 ? labConvert(l) : new Lab(l, a, b, opacity == null ? 1 : opacity);
}

function Lab(l, a, b, opacity) {
  this.l = +l;
  this.a = +a;
  this.b = +b;
  this.opacity = +opacity;
}

Object(_define__WEBPACK_IMPORTED_MODULE_0__["default"])(Lab, lab, Object(_define__WEBPACK_IMPORTED_MODULE_0__["extend"])(_color__WEBPACK_IMPORTED_MODULE_1__["Color"], {
  brighter: function(k) {
    return new Lab(this.l + K * (k == null ? 1 : k), this.a, this.b, this.opacity);
  },
  darker: function(k) {
    return new Lab(this.l - K * (k == null ? 1 : k), this.a, this.b, this.opacity);
  },
  rgb: function() {
    var y = (this.l + 16) / 116,
        x = isNaN(this.a) ? y : y + this.a / 500,
        z = isNaN(this.b) ? y : y - this.b / 200;
    x = Xn * lab2xyz(x);
    y = Yn * lab2xyz(y);
    z = Zn * lab2xyz(z);
    return new _color__WEBPACK_IMPORTED_MODULE_1__["Rgb"](
      lrgb2rgb( 3.1338561 * x - 1.6168667 * y - 0.4906146 * z),
      lrgb2rgb(-0.9787684 * x + 1.9161415 * y + 0.0334540 * z),
      lrgb2rgb( 0.0719453 * x - 0.2289914 * y + 1.4052427 * z),
      this.opacity
    );
  }
}));

function xyz2lab(t) {
  return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0;
}

function lab2xyz(t) {
  return t > t1 ? t * t * t : t2 * (t - t0);
}

function lrgb2rgb(x) {
  return 255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
}

function rgb2lrgb(x) {
  return (x /= 255) <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
}

function hclConvert(o) {
  if (o instanceof Hcl) return new Hcl(o.h, o.c, o.l, o.opacity);
  if (!(o instanceof Lab)) o = labConvert(o);
  if (o.a === 0 && o.b === 0) return new Hcl(NaN, 0, o.l, o.opacity);
  var h = Math.atan2(o.b, o.a) * _math__WEBPACK_IMPORTED_MODULE_2__["rad2deg"];
  return new Hcl(h < 0 ? h + 360 : h, Math.sqrt(o.a * o.a + o.b * o.b), o.l, o.opacity);
}

function lch(l, c, h, opacity) {
  return arguments.length === 1 ? hclConvert(l) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
}

function hcl(h, c, l, opacity) {
  return arguments.length === 1 ? hclConvert(h) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
}

function Hcl(h, c, l, opacity) {
  this.h = +h;
  this.c = +c;
  this.l = +l;
  this.opacity = +opacity;
}

Object(_define__WEBPACK_IMPORTED_MODULE_0__["default"])(Hcl, hcl, Object(_define__WEBPACK_IMPORTED_MODULE_0__["extend"])(_color__WEBPACK_IMPORTED_MODULE_1__["Color"], {
  brighter: function(k) {
    return new Hcl(this.h, this.c, this.l + K * (k == null ? 1 : k), this.opacity);
  },
  darker: function(k) {
    return new Hcl(this.h, this.c, this.l - K * (k == null ? 1 : k), this.opacity);
  },
  rgb: function() {
    return labConvert(this).rgb();
  }
}));


/***/ }),

/***/ "./node_modules/d3-color/src/math.js":
/*!*******************************************!*\
  !*** ./node_modules/d3-color/src/math.js ***!
  \*******************************************/
/*! exports provided: deg2rad, rad2deg */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deg2rad", function() { return deg2rad; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rad2deg", function() { return rad2deg; });
var deg2rad = Math.PI / 180;
var rad2deg = 180 / Math.PI;


/***/ }),

/***/ "./node_modules/d3-ease/src/back.js":
/*!******************************************!*\
  !*** ./node_modules/d3-ease/src/back.js ***!
  \******************************************/
/*! exports provided: backIn, backOut, backInOut */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "backIn", function() { return backIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "backOut", function() { return backOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "backInOut", function() { return backInOut; });
var overshoot = 1.70158;

var backIn = (function custom(s) {
  s = +s;

  function backIn(t) {
    return t * t * ((s + 1) * t - s);
  }

  backIn.overshoot = custom;

  return backIn;
})(overshoot);

var backOut = (function custom(s) {
  s = +s;

  function backOut(t) {
    return --t * t * ((s + 1) * t + s) + 1;
  }

  backOut.overshoot = custom;

  return backOut;
})(overshoot);

var backInOut = (function custom(s) {
  s = +s;

  function backInOut(t) {
    return ((t *= 2) < 1 ? t * t * ((s + 1) * t - s) : (t -= 2) * t * ((s + 1) * t + s) + 2) / 2;
  }

  backInOut.overshoot = custom;

  return backInOut;
})(overshoot);


/***/ }),

/***/ "./node_modules/d3-ease/src/bounce.js":
/*!********************************************!*\
  !*** ./node_modules/d3-ease/src/bounce.js ***!
  \********************************************/
/*! exports provided: bounceIn, bounceOut, bounceInOut */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bounceIn", function() { return bounceIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bounceOut", function() { return bounceOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bounceInOut", function() { return bounceInOut; });
var b1 = 4 / 11,
    b2 = 6 / 11,
    b3 = 8 / 11,
    b4 = 3 / 4,
    b5 = 9 / 11,
    b6 = 10 / 11,
    b7 = 15 / 16,
    b8 = 21 / 22,
    b9 = 63 / 64,
    b0 = 1 / b1 / b1;

function bounceIn(t) {
  return 1 - bounceOut(1 - t);
}

function bounceOut(t) {
  return (t = +t) < b1 ? b0 * t * t : t < b3 ? b0 * (t -= b2) * t + b4 : t < b6 ? b0 * (t -= b5) * t + b7 : b0 * (t -= b8) * t + b9;
}

function bounceInOut(t) {
  return ((t *= 2) <= 1 ? 1 - bounceOut(1 - t) : bounceOut(t - 1) + 1) / 2;
}


/***/ }),

/***/ "./node_modules/d3-ease/src/circle.js":
/*!********************************************!*\
  !*** ./node_modules/d3-ease/src/circle.js ***!
  \********************************************/
/*! exports provided: circleIn, circleOut, circleInOut */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "circleIn", function() { return circleIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "circleOut", function() { return circleOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "circleInOut", function() { return circleInOut; });
function circleIn(t) {
  return 1 - Math.sqrt(1 - t * t);
}

function circleOut(t) {
  return Math.sqrt(1 - --t * t);
}

function circleInOut(t) {
  return ((t *= 2) <= 1 ? 1 - Math.sqrt(1 - t * t) : Math.sqrt(1 - (t -= 2) * t) + 1) / 2;
}


/***/ }),

/***/ "./node_modules/d3-ease/src/cubic.js":
/*!*******************************************!*\
  !*** ./node_modules/d3-ease/src/cubic.js ***!
  \*******************************************/
/*! exports provided: cubicIn, cubicOut, cubicInOut */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cubicIn", function() { return cubicIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cubicOut", function() { return cubicOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cubicInOut", function() { return cubicInOut; });
function cubicIn(t) {
  return t * t * t;
}

function cubicOut(t) {
  return --t * t * t + 1;
}

function cubicInOut(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}


/***/ }),

/***/ "./node_modules/d3-ease/src/elastic.js":
/*!*********************************************!*\
  !*** ./node_modules/d3-ease/src/elastic.js ***!
  \*********************************************/
/*! exports provided: elasticIn, elasticOut, elasticInOut */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "elasticIn", function() { return elasticIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "elasticOut", function() { return elasticOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "elasticInOut", function() { return elasticInOut; });
var tau = 2 * Math.PI,
    amplitude = 1,
    period = 0.3;

var elasticIn = (function custom(a, p) {
  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);

  function elasticIn(t) {
    return a * Math.pow(2, 10 * --t) * Math.sin((s - t) / p);
  }

  elasticIn.amplitude = function(a) { return custom(a, p * tau); };
  elasticIn.period = function(p) { return custom(a, p); };

  return elasticIn;
})(amplitude, period);

var elasticOut = (function custom(a, p) {
  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);

  function elasticOut(t) {
    return 1 - a * Math.pow(2, -10 * (t = +t)) * Math.sin((t + s) / p);
  }

  elasticOut.amplitude = function(a) { return custom(a, p * tau); };
  elasticOut.period = function(p) { return custom(a, p); };

  return elasticOut;
})(amplitude, period);

var elasticInOut = (function custom(a, p) {
  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);

  function elasticInOut(t) {
    return ((t = t * 2 - 1) < 0
        ? a * Math.pow(2, 10 * t) * Math.sin((s - t) / p)
        : 2 - a * Math.pow(2, -10 * t) * Math.sin((s + t) / p)) / 2;
  }

  elasticInOut.amplitude = function(a) { return custom(a, p * tau); };
  elasticInOut.period = function(p) { return custom(a, p); };

  return elasticInOut;
})(amplitude, period);


/***/ }),

/***/ "./node_modules/d3-ease/src/exp.js":
/*!*****************************************!*\
  !*** ./node_modules/d3-ease/src/exp.js ***!
  \*****************************************/
/*! exports provided: expIn, expOut, expInOut */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "expIn", function() { return expIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "expOut", function() { return expOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "expInOut", function() { return expInOut; });
function expIn(t) {
  return Math.pow(2, 10 * t - 10);
}

function expOut(t) {
  return 1 - Math.pow(2, -10 * t);
}

function expInOut(t) {
  return ((t *= 2) <= 1 ? Math.pow(2, 10 * t - 10) : 2 - Math.pow(2, 10 - 10 * t)) / 2;
}


/***/ }),

/***/ "./node_modules/d3-ease/src/index.js":
/*!*******************************************!*\
  !*** ./node_modules/d3-ease/src/index.js ***!
  \*******************************************/
/*! exports provided: easeLinear, easeQuad, easeQuadIn, easeQuadOut, easeQuadInOut, easeCubic, easeCubicIn, easeCubicOut, easeCubicInOut, easePoly, easePolyIn, easePolyOut, easePolyInOut, easeSin, easeSinIn, easeSinOut, easeSinInOut, easeExp, easeExpIn, easeExpOut, easeExpInOut, easeCircle, easeCircleIn, easeCircleOut, easeCircleInOut, easeBounce, easeBounceIn, easeBounceOut, easeBounceInOut, easeBack, easeBackIn, easeBackOut, easeBackInOut, easeElastic, easeElasticIn, easeElasticOut, easeElasticInOut */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _linear__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./linear */ "./node_modules/d3-ease/src/linear.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeLinear", function() { return _linear__WEBPACK_IMPORTED_MODULE_0__["linear"]; });

/* harmony import */ var _quad__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./quad */ "./node_modules/d3-ease/src/quad.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeQuad", function() { return _quad__WEBPACK_IMPORTED_MODULE_1__["quadInOut"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeQuadIn", function() { return _quad__WEBPACK_IMPORTED_MODULE_1__["quadIn"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeQuadOut", function() { return _quad__WEBPACK_IMPORTED_MODULE_1__["quadOut"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeQuadInOut", function() { return _quad__WEBPACK_IMPORTED_MODULE_1__["quadInOut"]; });

/* harmony import */ var _cubic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cubic */ "./node_modules/d3-ease/src/cubic.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeCubic", function() { return _cubic__WEBPACK_IMPORTED_MODULE_2__["cubicInOut"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeCubicIn", function() { return _cubic__WEBPACK_IMPORTED_MODULE_2__["cubicIn"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeCubicOut", function() { return _cubic__WEBPACK_IMPORTED_MODULE_2__["cubicOut"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeCubicInOut", function() { return _cubic__WEBPACK_IMPORTED_MODULE_2__["cubicInOut"]; });

/* harmony import */ var _poly__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./poly */ "./node_modules/d3-ease/src/poly.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easePoly", function() { return _poly__WEBPACK_IMPORTED_MODULE_3__["polyInOut"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easePolyIn", function() { return _poly__WEBPACK_IMPORTED_MODULE_3__["polyIn"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easePolyOut", function() { return _poly__WEBPACK_IMPORTED_MODULE_3__["polyOut"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easePolyInOut", function() { return _poly__WEBPACK_IMPORTED_MODULE_3__["polyInOut"]; });

/* harmony import */ var _sin__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./sin */ "./node_modules/d3-ease/src/sin.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeSin", function() { return _sin__WEBPACK_IMPORTED_MODULE_4__["sinInOut"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeSinIn", function() { return _sin__WEBPACK_IMPORTED_MODULE_4__["sinIn"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeSinOut", function() { return _sin__WEBPACK_IMPORTED_MODULE_4__["sinOut"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeSinInOut", function() { return _sin__WEBPACK_IMPORTED_MODULE_4__["sinInOut"]; });

/* harmony import */ var _exp__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./exp */ "./node_modules/d3-ease/src/exp.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeExp", function() { return _exp__WEBPACK_IMPORTED_MODULE_5__["expInOut"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeExpIn", function() { return _exp__WEBPACK_IMPORTED_MODULE_5__["expIn"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeExpOut", function() { return _exp__WEBPACK_IMPORTED_MODULE_5__["expOut"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeExpInOut", function() { return _exp__WEBPACK_IMPORTED_MODULE_5__["expInOut"]; });

/* harmony import */ var _circle__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./circle */ "./node_modules/d3-ease/src/circle.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeCircle", function() { return _circle__WEBPACK_IMPORTED_MODULE_6__["circleInOut"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeCircleIn", function() { return _circle__WEBPACK_IMPORTED_MODULE_6__["circleIn"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeCircleOut", function() { return _circle__WEBPACK_IMPORTED_MODULE_6__["circleOut"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeCircleInOut", function() { return _circle__WEBPACK_IMPORTED_MODULE_6__["circleInOut"]; });

/* harmony import */ var _bounce__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./bounce */ "./node_modules/d3-ease/src/bounce.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeBounce", function() { return _bounce__WEBPACK_IMPORTED_MODULE_7__["bounceOut"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeBounceIn", function() { return _bounce__WEBPACK_IMPORTED_MODULE_7__["bounceIn"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeBounceOut", function() { return _bounce__WEBPACK_IMPORTED_MODULE_7__["bounceOut"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeBounceInOut", function() { return _bounce__WEBPACK_IMPORTED_MODULE_7__["bounceInOut"]; });

/* harmony import */ var _back__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./back */ "./node_modules/d3-ease/src/back.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeBack", function() { return _back__WEBPACK_IMPORTED_MODULE_8__["backInOut"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeBackIn", function() { return _back__WEBPACK_IMPORTED_MODULE_8__["backIn"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeBackOut", function() { return _back__WEBPACK_IMPORTED_MODULE_8__["backOut"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeBackInOut", function() { return _back__WEBPACK_IMPORTED_MODULE_8__["backInOut"]; });

/* harmony import */ var _elastic__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./elastic */ "./node_modules/d3-ease/src/elastic.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeElastic", function() { return _elastic__WEBPACK_IMPORTED_MODULE_9__["elasticOut"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeElasticIn", function() { return _elastic__WEBPACK_IMPORTED_MODULE_9__["elasticIn"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeElasticOut", function() { return _elastic__WEBPACK_IMPORTED_MODULE_9__["elasticOut"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "easeElasticInOut", function() { return _elastic__WEBPACK_IMPORTED_MODULE_9__["elasticInOut"]; });






















/***/ }),

/***/ "./node_modules/d3-ease/src/linear.js":
/*!********************************************!*\
  !*** ./node_modules/d3-ease/src/linear.js ***!
  \********************************************/
/*! exports provided: linear */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "linear", function() { return linear; });
function linear(t) {
  return +t;
}


/***/ }),

/***/ "./node_modules/d3-ease/src/poly.js":
/*!******************************************!*\
  !*** ./node_modules/d3-ease/src/poly.js ***!
  \******************************************/
/*! exports provided: polyIn, polyOut, polyInOut */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "polyIn", function() { return polyIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "polyOut", function() { return polyOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "polyInOut", function() { return polyInOut; });
var exponent = 3;

var polyIn = (function custom(e) {
  e = +e;

  function polyIn(t) {
    return Math.pow(t, e);
  }

  polyIn.exponent = custom;

  return polyIn;
})(exponent);

var polyOut = (function custom(e) {
  e = +e;

  function polyOut(t) {
    return 1 - Math.pow(1 - t, e);
  }

  polyOut.exponent = custom;

  return polyOut;
})(exponent);

var polyInOut = (function custom(e) {
  e = +e;

  function polyInOut(t) {
    return ((t *= 2) <= 1 ? Math.pow(t, e) : 2 - Math.pow(2 - t, e)) / 2;
  }

  polyInOut.exponent = custom;

  return polyInOut;
})(exponent);


/***/ }),

/***/ "./node_modules/d3-ease/src/quad.js":
/*!******************************************!*\
  !*** ./node_modules/d3-ease/src/quad.js ***!
  \******************************************/
/*! exports provided: quadIn, quadOut, quadInOut */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "quadIn", function() { return quadIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "quadOut", function() { return quadOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "quadInOut", function() { return quadInOut; });
function quadIn(t) {
  return t * t;
}

function quadOut(t) {
  return t * (2 - t);
}

function quadInOut(t) {
  return ((t *= 2) <= 1 ? t * t : --t * (2 - t) + 1) / 2;
}


/***/ }),

/***/ "./node_modules/d3-ease/src/sin.js":
/*!*****************************************!*\
  !*** ./node_modules/d3-ease/src/sin.js ***!
  \*****************************************/
/*! exports provided: sinIn, sinOut, sinInOut */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sinIn", function() { return sinIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sinOut", function() { return sinOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sinInOut", function() { return sinInOut; });
var pi = Math.PI,
    halfPi = pi / 2;

function sinIn(t) {
  return 1 - Math.cos(t * halfPi);
}

function sinOut(t) {
  return Math.sin(t * halfPi);
}

function sinInOut(t) {
  return (1 - Math.cos(pi * t)) / 2;
}


/***/ }),

/***/ "./node_modules/d3-interpolate/index.js":
/*!**********************************************!*\
  !*** ./node_modules/d3-interpolate/index.js ***!
  \**********************************************/
/*! exports provided: interpolate, interpolateArray, interpolateBasis, interpolateBasisClosed, interpolateDate, interpolateNumber, interpolateObject, interpolateRound, interpolateString, interpolateTransformCss, interpolateTransformSvg, interpolateZoom, interpolateRgb, interpolateRgbBasis, interpolateRgbBasisClosed, interpolateHsl, interpolateHslLong, interpolateLab, interpolateHcl, interpolateHclLong, interpolateCubehelix, interpolateCubehelixLong, quantize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_value__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/value */ "./node_modules/d3-interpolate/src/value.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolate", function() { return _src_value__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _src_array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/array */ "./node_modules/d3-interpolate/src/array.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateArray", function() { return _src_array__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _src_basis__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/basis */ "./node_modules/d3-interpolate/src/basis.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateBasis", function() { return _src_basis__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _src_basisClosed__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/basisClosed */ "./node_modules/d3-interpolate/src/basisClosed.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateBasisClosed", function() { return _src_basisClosed__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _src_date__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./src/date */ "./node_modules/d3-interpolate/src/date.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateDate", function() { return _src_date__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _src_number__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./src/number */ "./node_modules/d3-interpolate/src/number.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateNumber", function() { return _src_number__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _src_object__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./src/object */ "./node_modules/d3-interpolate/src/object.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateObject", function() { return _src_object__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _src_round__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./src/round */ "./node_modules/d3-interpolate/src/round.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateRound", function() { return _src_round__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _src_string__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./src/string */ "./node_modules/d3-interpolate/src/string.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateString", function() { return _src_string__WEBPACK_IMPORTED_MODULE_8__["default"]; });

/* harmony import */ var _src_transform_index__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./src/transform/index */ "./node_modules/d3-interpolate/src/transform/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateTransformCss", function() { return _src_transform_index__WEBPACK_IMPORTED_MODULE_9__["interpolateTransformCss"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateTransformSvg", function() { return _src_transform_index__WEBPACK_IMPORTED_MODULE_9__["interpolateTransformSvg"]; });

/* harmony import */ var _src_zoom__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./src/zoom */ "./node_modules/d3-interpolate/src/zoom.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateZoom", function() { return _src_zoom__WEBPACK_IMPORTED_MODULE_10__["default"]; });

/* harmony import */ var _src_rgb__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./src/rgb */ "./node_modules/d3-interpolate/src/rgb.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateRgb", function() { return _src_rgb__WEBPACK_IMPORTED_MODULE_11__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateRgbBasis", function() { return _src_rgb__WEBPACK_IMPORTED_MODULE_11__["rgbBasis"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateRgbBasisClosed", function() { return _src_rgb__WEBPACK_IMPORTED_MODULE_11__["rgbBasisClosed"]; });

/* harmony import */ var _src_hsl__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./src/hsl */ "./node_modules/d3-interpolate/src/hsl.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateHsl", function() { return _src_hsl__WEBPACK_IMPORTED_MODULE_12__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateHslLong", function() { return _src_hsl__WEBPACK_IMPORTED_MODULE_12__["hslLong"]; });

/* harmony import */ var _src_lab__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./src/lab */ "./node_modules/d3-interpolate/src/lab.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateLab", function() { return _src_lab__WEBPACK_IMPORTED_MODULE_13__["default"]; });

/* harmony import */ var _src_hcl__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./src/hcl */ "./node_modules/d3-interpolate/src/hcl.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateHcl", function() { return _src_hcl__WEBPACK_IMPORTED_MODULE_14__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateHclLong", function() { return _src_hcl__WEBPACK_IMPORTED_MODULE_14__["hclLong"]; });

/* harmony import */ var _src_cubehelix__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./src/cubehelix */ "./node_modules/d3-interpolate/src/cubehelix.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateCubehelix", function() { return _src_cubehelix__WEBPACK_IMPORTED_MODULE_15__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateCubehelixLong", function() { return _src_cubehelix__WEBPACK_IMPORTED_MODULE_15__["cubehelixLong"]; });

/* harmony import */ var _src_quantize__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./src/quantize */ "./node_modules/d3-interpolate/src/quantize.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "quantize", function() { return _src_quantize__WEBPACK_IMPORTED_MODULE_16__["default"]; });




















/***/ }),

/***/ "./node_modules/d3-interpolate/src/array.js":
/*!**************************************************!*\
  !*** ./node_modules/d3-interpolate/src/array.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _value__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./value */ "./node_modules/d3-interpolate/src/value.js");


/* harmony default export */ __webpack_exports__["default"] = (function(a, b) {
  var nb = b ? b.length : 0,
      na = a ? Math.min(nb, a.length) : 0,
      x = new Array(na),
      c = new Array(nb),
      i;

  for (i = 0; i < na; ++i) x[i] = Object(_value__WEBPACK_IMPORTED_MODULE_0__["default"])(a[i], b[i]);
  for (; i < nb; ++i) c[i] = b[i];

  return function(t) {
    for (i = 0; i < na; ++i) c[i] = x[i](t);
    return c;
  };
});


/***/ }),

/***/ "./node_modules/d3-interpolate/src/basis.js":
/*!**************************************************!*\
  !*** ./node_modules/d3-interpolate/src/basis.js ***!
  \**************************************************/
/*! exports provided: basis, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "basis", function() { return basis; });
function basis(t1, v0, v1, v2, v3) {
  var t2 = t1 * t1, t3 = t2 * t1;
  return ((1 - 3 * t1 + 3 * t2 - t3) * v0
      + (4 - 6 * t2 + 3 * t3) * v1
      + (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2
      + t3 * v3) / 6;
}

/* harmony default export */ __webpack_exports__["default"] = (function(values) {
  var n = values.length - 1;
  return function(t) {
    var i = t <= 0 ? (t = 0) : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n),
        v1 = values[i],
        v2 = values[i + 1],
        v0 = i > 0 ? values[i - 1] : 2 * v1 - v2,
        v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
});


/***/ }),

/***/ "./node_modules/d3-interpolate/src/basisClosed.js":
/*!********************************************************!*\
  !*** ./node_modules/d3-interpolate/src/basisClosed.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _basis__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./basis */ "./node_modules/d3-interpolate/src/basis.js");


/* harmony default export */ __webpack_exports__["default"] = (function(values) {
  var n = values.length;
  return function(t) {
    var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n),
        v0 = values[(i + n - 1) % n],
        v1 = values[i % n],
        v2 = values[(i + 1) % n],
        v3 = values[(i + 2) % n];
    return Object(_basis__WEBPACK_IMPORTED_MODULE_0__["basis"])((t - i / n) * n, v0, v1, v2, v3);
  };
});


/***/ }),

/***/ "./node_modules/d3-interpolate/src/color.js":
/*!**************************************************!*\
  !*** ./node_modules/d3-interpolate/src/color.js ***!
  \**************************************************/
/*! exports provided: hue, gamma, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hue", function() { return hue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gamma", function() { return gamma; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return nogamma; });
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constant */ "./node_modules/d3-interpolate/src/constant.js");


function linear(a, d) {
  return function(t) {
    return a + t * d;
  };
}

function exponential(a, b, y) {
  return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
    return Math.pow(a + t * b, y);
  };
}

function hue(a, b) {
  var d = b - a;
  return d ? linear(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : Object(_constant__WEBPACK_IMPORTED_MODULE_0__["default"])(isNaN(a) ? b : a);
}

function gamma(y) {
  return (y = +y) === 1 ? nogamma : function(a, b) {
    return b - a ? exponential(a, b, y) : Object(_constant__WEBPACK_IMPORTED_MODULE_0__["default"])(isNaN(a) ? b : a);
  };
}

function nogamma(a, b) {
  var d = b - a;
  return d ? linear(a, d) : Object(_constant__WEBPACK_IMPORTED_MODULE_0__["default"])(isNaN(a) ? b : a);
}


/***/ }),

/***/ "./node_modules/d3-interpolate/src/constant.js":
/*!*****************************************************!*\
  !*** ./node_modules/d3-interpolate/src/constant.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(x) {
  return function() {
    return x;
  };
});


/***/ }),

/***/ "./node_modules/d3-interpolate/src/cubehelix.js":
/*!******************************************************!*\
  !*** ./node_modules/d3-interpolate/src/cubehelix.js ***!
  \******************************************************/
/*! exports provided: default, cubehelixLong */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cubehelixLong", function() { return cubehelixLong; });
/* harmony import */ var d3_color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-color */ "./node_modules/d3-color/src/index.js");
/* harmony import */ var _color__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./color */ "./node_modules/d3-interpolate/src/color.js");



function cubehelix(hue) {
  return (function cubehelixGamma(y) {
    y = +y;

    function cubehelix(start, end) {
      var h = hue((start = Object(d3_color__WEBPACK_IMPORTED_MODULE_0__["cubehelix"])(start)).h, (end = Object(d3_color__WEBPACK_IMPORTED_MODULE_0__["cubehelix"])(end)).h),
          s = Object(_color__WEBPACK_IMPORTED_MODULE_1__["default"])(start.s, end.s),
          l = Object(_color__WEBPACK_IMPORTED_MODULE_1__["default"])(start.l, end.l),
          opacity = Object(_color__WEBPACK_IMPORTED_MODULE_1__["default"])(start.opacity, end.opacity);
      return function(t) {
        start.h = h(t);
        start.s = s(t);
        start.l = l(Math.pow(t, y));
        start.opacity = opacity(t);
        return start + "";
      };
    }

    cubehelix.gamma = cubehelixGamma;

    return cubehelix;
  })(1);
}

/* harmony default export */ __webpack_exports__["default"] = (cubehelix(_color__WEBPACK_IMPORTED_MODULE_1__["hue"]));
var cubehelixLong = cubehelix(_color__WEBPACK_IMPORTED_MODULE_1__["default"]);


/***/ }),

/***/ "./node_modules/d3-interpolate/src/date.js":
/*!*************************************************!*\
  !*** ./node_modules/d3-interpolate/src/date.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(a, b) {
  var d = new Date;
  return a = +a, b -= a, function(t) {
    return d.setTime(a + b * t), d;
  };
});


/***/ }),

/***/ "./node_modules/d3-interpolate/src/hcl.js":
/*!************************************************!*\
  !*** ./node_modules/d3-interpolate/src/hcl.js ***!
  \************************************************/
/*! exports provided: default, hclLong */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hclLong", function() { return hclLong; });
/* harmony import */ var d3_color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-color */ "./node_modules/d3-color/src/index.js");
/* harmony import */ var _color__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./color */ "./node_modules/d3-interpolate/src/color.js");



function hcl(hue) {
  return function(start, end) {
    var h = hue((start = Object(d3_color__WEBPACK_IMPORTED_MODULE_0__["hcl"])(start)).h, (end = Object(d3_color__WEBPACK_IMPORTED_MODULE_0__["hcl"])(end)).h),
        c = Object(_color__WEBPACK_IMPORTED_MODULE_1__["default"])(start.c, end.c),
        l = Object(_color__WEBPACK_IMPORTED_MODULE_1__["default"])(start.l, end.l),
        opacity = Object(_color__WEBPACK_IMPORTED_MODULE_1__["default"])(start.opacity, end.opacity);
    return function(t) {
      start.h = h(t);
      start.c = c(t);
      start.l = l(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }
}

/* harmony default export */ __webpack_exports__["default"] = (hcl(_color__WEBPACK_IMPORTED_MODULE_1__["hue"]));
var hclLong = hcl(_color__WEBPACK_IMPORTED_MODULE_1__["default"]);


/***/ }),

/***/ "./node_modules/d3-interpolate/src/hsl.js":
/*!************************************************!*\
  !*** ./node_modules/d3-interpolate/src/hsl.js ***!
  \************************************************/
/*! exports provided: default, hslLong */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hslLong", function() { return hslLong; });
/* harmony import */ var d3_color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-color */ "./node_modules/d3-color/src/index.js");
/* harmony import */ var _color__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./color */ "./node_modules/d3-interpolate/src/color.js");



function hsl(hue) {
  return function(start, end) {
    var h = hue((start = Object(d3_color__WEBPACK_IMPORTED_MODULE_0__["hsl"])(start)).h, (end = Object(d3_color__WEBPACK_IMPORTED_MODULE_0__["hsl"])(end)).h),
        s = Object(_color__WEBPACK_IMPORTED_MODULE_1__["default"])(start.s, end.s),
        l = Object(_color__WEBPACK_IMPORTED_MODULE_1__["default"])(start.l, end.l),
        opacity = Object(_color__WEBPACK_IMPORTED_MODULE_1__["default"])(start.opacity, end.opacity);
    return function(t) {
      start.h = h(t);
      start.s = s(t);
      start.l = l(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }
}

/* harmony default export */ __webpack_exports__["default"] = (hsl(_color__WEBPACK_IMPORTED_MODULE_1__["hue"]));
var hslLong = hsl(_color__WEBPACK_IMPORTED_MODULE_1__["default"]);


/***/ }),

/***/ "./node_modules/d3-interpolate/src/lab.js":
/*!************************************************!*\
  !*** ./node_modules/d3-interpolate/src/lab.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return lab; });
/* harmony import */ var d3_color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-color */ "./node_modules/d3-color/src/index.js");
/* harmony import */ var _color__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./color */ "./node_modules/d3-interpolate/src/color.js");



function lab(start, end) {
  var l = Object(_color__WEBPACK_IMPORTED_MODULE_1__["default"])((start = Object(d3_color__WEBPACK_IMPORTED_MODULE_0__["lab"])(start)).l, (end = Object(d3_color__WEBPACK_IMPORTED_MODULE_0__["lab"])(end)).l),
      a = Object(_color__WEBPACK_IMPORTED_MODULE_1__["default"])(start.a, end.a),
      b = Object(_color__WEBPACK_IMPORTED_MODULE_1__["default"])(start.b, end.b),
      opacity = Object(_color__WEBPACK_IMPORTED_MODULE_1__["default"])(start.opacity, end.opacity);
  return function(t) {
    start.l = l(t);
    start.a = a(t);
    start.b = b(t);
    start.opacity = opacity(t);
    return start + "";
  };
}


/***/ }),

/***/ "./node_modules/d3-interpolate/src/number.js":
/*!***************************************************!*\
  !*** ./node_modules/d3-interpolate/src/number.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(a, b) {
  return a = +a, b -= a, function(t) {
    return a + b * t;
  };
});


/***/ }),

/***/ "./node_modules/d3-interpolate/src/object.js":
/*!***************************************************!*\
  !*** ./node_modules/d3-interpolate/src/object.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _value__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./value */ "./node_modules/d3-interpolate/src/value.js");


/* harmony default export */ __webpack_exports__["default"] = (function(a, b) {
  var i = {},
      c = {},
      k;

  if (a === null || typeof a !== "object") a = {};
  if (b === null || typeof b !== "object") b = {};

  for (k in b) {
    if (k in a) {
      i[k] = Object(_value__WEBPACK_IMPORTED_MODULE_0__["default"])(a[k], b[k]);
    } else {
      c[k] = b[k];
    }
  }

  return function(t) {
    for (k in i) c[k] = i[k](t);
    return c;
  };
});


/***/ }),

/***/ "./node_modules/d3-interpolate/src/quantize.js":
/*!*****************************************************!*\
  !*** ./node_modules/d3-interpolate/src/quantize.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(interpolator, n) {
  var samples = new Array(n);
  for (var i = 0; i < n; ++i) samples[i] = interpolator(i / (n - 1));
  return samples;
});


/***/ }),

/***/ "./node_modules/d3-interpolate/src/rgb.js":
/*!************************************************!*\
  !*** ./node_modules/d3-interpolate/src/rgb.js ***!
  \************************************************/
/*! exports provided: default, rgbBasis, rgbBasisClosed */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rgbBasis", function() { return rgbBasis; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rgbBasisClosed", function() { return rgbBasisClosed; });
/* harmony import */ var d3_color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-color */ "./node_modules/d3-color/src/index.js");
/* harmony import */ var _basis__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./basis */ "./node_modules/d3-interpolate/src/basis.js");
/* harmony import */ var _basisClosed__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./basisClosed */ "./node_modules/d3-interpolate/src/basisClosed.js");
/* harmony import */ var _color__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./color */ "./node_modules/d3-interpolate/src/color.js");





/* harmony default export */ __webpack_exports__["default"] = ((function rgbGamma(y) {
  var color = Object(_color__WEBPACK_IMPORTED_MODULE_3__["gamma"])(y);

  function rgb(start, end) {
    var r = color((start = Object(d3_color__WEBPACK_IMPORTED_MODULE_0__["rgb"])(start)).r, (end = Object(d3_color__WEBPACK_IMPORTED_MODULE_0__["rgb"])(end)).r),
        g = color(start.g, end.g),
        b = color(start.b, end.b),
        opacity = Object(_color__WEBPACK_IMPORTED_MODULE_3__["default"])(start.opacity, end.opacity);
    return function(t) {
      start.r = r(t);
      start.g = g(t);
      start.b = b(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }

  rgb.gamma = rgbGamma;

  return rgb;
})(1));

function rgbSpline(spline) {
  return function(colors) {
    var n = colors.length,
        r = new Array(n),
        g = new Array(n),
        b = new Array(n),
        i, color;
    for (i = 0; i < n; ++i) {
      color = Object(d3_color__WEBPACK_IMPORTED_MODULE_0__["rgb"])(colors[i]);
      r[i] = color.r || 0;
      g[i] = color.g || 0;
      b[i] = color.b || 0;
    }
    r = spline(r);
    g = spline(g);
    b = spline(b);
    color.opacity = 1;
    return function(t) {
      color.r = r(t);
      color.g = g(t);
      color.b = b(t);
      return color + "";
    };
  };
}

var rgbBasis = rgbSpline(_basis__WEBPACK_IMPORTED_MODULE_1__["default"]);
var rgbBasisClosed = rgbSpline(_basisClosed__WEBPACK_IMPORTED_MODULE_2__["default"]);


/***/ }),

/***/ "./node_modules/d3-interpolate/src/round.js":
/*!**************************************************!*\
  !*** ./node_modules/d3-interpolate/src/round.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(a, b) {
  return a = +a, b -= a, function(t) {
    return Math.round(a + b * t);
  };
});


/***/ }),

/***/ "./node_modules/d3-interpolate/src/string.js":
/*!***************************************************!*\
  !*** ./node_modules/d3-interpolate/src/string.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _number__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./number */ "./node_modules/d3-interpolate/src/number.js");


var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
    reB = new RegExp(reA.source, "g");

function zero(b) {
  return function() {
    return b;
  };
}

function one(b) {
  return function(t) {
    return b(t) + "";
  };
}

/* harmony default export */ __webpack_exports__["default"] = (function(a, b) {
  var bi = reA.lastIndex = reB.lastIndex = 0, // scan index for next number in b
      am, // current match in a
      bm, // current match in b
      bs, // string preceding current number in b, if any
      i = -1, // index in s
      s = [], // string constants and placeholders
      q = []; // number interpolators

  // Coerce inputs to strings.
  a = a + "", b = b + "";

  // Interpolate pairs of numbers in a & b.
  while ((am = reA.exec(a))
      && (bm = reB.exec(b))) {
    if ((bs = bm.index) > bi) { // a string precedes the next number in b
      bs = b.slice(bi, bs);
      if (s[i]) s[i] += bs; // coalesce with previous string
      else s[++i] = bs;
    }
    if ((am = am[0]) === (bm = bm[0])) { // numbers in a & b match
      if (s[i]) s[i] += bm; // coalesce with previous string
      else s[++i] = bm;
    } else { // interpolate non-matching numbers
      s[++i] = null;
      q.push({i: i, x: Object(_number__WEBPACK_IMPORTED_MODULE_0__["default"])(am, bm)});
    }
    bi = reB.lastIndex;
  }

  // Add remains of b.
  if (bi < b.length) {
    bs = b.slice(bi);
    if (s[i]) s[i] += bs; // coalesce with previous string
    else s[++i] = bs;
  }

  // Special optimization for only a single match.
  // Otherwise, interpolate each of the numbers and rejoin the string.
  return s.length < 2 ? (q[0]
      ? one(q[0].x)
      : zero(b))
      : (b = q.length, function(t) {
          for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
          return s.join("");
        });
});


/***/ }),

/***/ "./node_modules/d3-interpolate/src/transform/decompose.js":
/*!****************************************************************!*\
  !*** ./node_modules/d3-interpolate/src/transform/decompose.js ***!
  \****************************************************************/
/*! exports provided: identity, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "identity", function() { return identity; });
var degrees = 180 / Math.PI;

var identity = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};

/* harmony default export */ __webpack_exports__["default"] = (function(a, b, c, d, e, f) {
  var scaleX, scaleY, skewX;
  if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
  if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
  if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
  if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
  return {
    translateX: e,
    translateY: f,
    rotate: Math.atan2(b, a) * degrees,
    skewX: Math.atan(skewX) * degrees,
    scaleX: scaleX,
    scaleY: scaleY
  };
});


/***/ }),

/***/ "./node_modules/d3-interpolate/src/transform/index.js":
/*!************************************************************!*\
  !*** ./node_modules/d3-interpolate/src/transform/index.js ***!
  \************************************************************/
/*! exports provided: interpolateTransformCss, interpolateTransformSvg */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "interpolateTransformCss", function() { return interpolateTransformCss; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "interpolateTransformSvg", function() { return interpolateTransformSvg; });
/* harmony import */ var _number__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../number */ "./node_modules/d3-interpolate/src/number.js");
/* harmony import */ var _parse__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parse */ "./node_modules/d3-interpolate/src/transform/parse.js");



function interpolateTransform(parse, pxComma, pxParen, degParen) {

  function pop(s) {
    return s.length ? s.pop() + " " : "";
  }

  function translate(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push("translate(", null, pxComma, null, pxParen);
      q.push({i: i - 4, x: Object(_number__WEBPACK_IMPORTED_MODULE_0__["default"])(xa, xb)}, {i: i - 2, x: Object(_number__WEBPACK_IMPORTED_MODULE_0__["default"])(ya, yb)});
    } else if (xb || yb) {
      s.push("translate(" + xb + pxComma + yb + pxParen);
    }
  }

  function rotate(a, b, s, q) {
    if (a !== b) {
      if (a - b > 180) b += 360; else if (b - a > 180) a += 360; // shortest path
      q.push({i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: Object(_number__WEBPACK_IMPORTED_MODULE_0__["default"])(a, b)});
    } else if (b) {
      s.push(pop(s) + "rotate(" + b + degParen);
    }
  }

  function skewX(a, b, s, q) {
    if (a !== b) {
      q.push({i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: Object(_number__WEBPACK_IMPORTED_MODULE_0__["default"])(a, b)});
    } else if (b) {
      s.push(pop(s) + "skewX(" + b + degParen);
    }
  }

  function scale(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push(pop(s) + "scale(", null, ",", null, ")");
      q.push({i: i - 4, x: Object(_number__WEBPACK_IMPORTED_MODULE_0__["default"])(xa, xb)}, {i: i - 2, x: Object(_number__WEBPACK_IMPORTED_MODULE_0__["default"])(ya, yb)});
    } else if (xb !== 1 || yb !== 1) {
      s.push(pop(s) + "scale(" + xb + "," + yb + ")");
    }
  }

  return function(a, b) {
    var s = [], // string constants and placeholders
        q = []; // number interpolators
    a = parse(a), b = parse(b);
    translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
    rotate(a.rotate, b.rotate, s, q);
    skewX(a.skewX, b.skewX, s, q);
    scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
    a = b = null; // gc
    return function(t) {
      var i = -1, n = q.length, o;
      while (++i < n) s[(o = q[i]).i] = o.x(t);
      return s.join("");
    };
  };
}

var interpolateTransformCss = interpolateTransform(_parse__WEBPACK_IMPORTED_MODULE_1__["parseCss"], "px, ", "px)", "deg)");
var interpolateTransformSvg = interpolateTransform(_parse__WEBPACK_IMPORTED_MODULE_1__["parseSvg"], ", ", ")", ")");


/***/ }),

/***/ "./node_modules/d3-interpolate/src/transform/parse.js":
/*!************************************************************!*\
  !*** ./node_modules/d3-interpolate/src/transform/parse.js ***!
  \************************************************************/
/*! exports provided: parseCss, parseSvg */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseCss", function() { return parseCss; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseSvg", function() { return parseSvg; });
/* harmony import */ var _decompose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./decompose */ "./node_modules/d3-interpolate/src/transform/decompose.js");


var cssNode,
    cssRoot,
    cssView,
    svgNode;

function parseCss(value) {
  if (value === "none") return _decompose__WEBPACK_IMPORTED_MODULE_0__["identity"];
  if (!cssNode) cssNode = document.createElement("DIV"), cssRoot = document.documentElement, cssView = document.defaultView;
  cssNode.style.transform = value;
  value = cssView.getComputedStyle(cssRoot.appendChild(cssNode), null).getPropertyValue("transform");
  cssRoot.removeChild(cssNode);
  value = value.slice(7, -1).split(",");
  return Object(_decompose__WEBPACK_IMPORTED_MODULE_0__["default"])(+value[0], +value[1], +value[2], +value[3], +value[4], +value[5]);
}

function parseSvg(value) {
  if (value == null) return _decompose__WEBPACK_IMPORTED_MODULE_0__["identity"];
  if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
  svgNode.setAttribute("transform", value);
  if (!(value = svgNode.transform.baseVal.consolidate())) return _decompose__WEBPACK_IMPORTED_MODULE_0__["identity"];
  value = value.matrix;
  return Object(_decompose__WEBPACK_IMPORTED_MODULE_0__["default"])(value.a, value.b, value.c, value.d, value.e, value.f);
}


/***/ }),

/***/ "./node_modules/d3-interpolate/src/value.js":
/*!**************************************************!*\
  !*** ./node_modules/d3-interpolate/src/value.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var d3_color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-color */ "./node_modules/d3-color/src/index.js");
/* harmony import */ var _rgb__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rgb */ "./node_modules/d3-interpolate/src/rgb.js");
/* harmony import */ var _array__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./array */ "./node_modules/d3-interpolate/src/array.js");
/* harmony import */ var _date__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./date */ "./node_modules/d3-interpolate/src/date.js");
/* harmony import */ var _number__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./number */ "./node_modules/d3-interpolate/src/number.js");
/* harmony import */ var _object__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./object */ "./node_modules/d3-interpolate/src/object.js");
/* harmony import */ var _string__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./string */ "./node_modules/d3-interpolate/src/string.js");
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./constant */ "./node_modules/d3-interpolate/src/constant.js");









/* harmony default export */ __webpack_exports__["default"] = (function(a, b) {
  var t = typeof b, c;
  return b == null || t === "boolean" ? Object(_constant__WEBPACK_IMPORTED_MODULE_7__["default"])(b)
      : (t === "number" ? _number__WEBPACK_IMPORTED_MODULE_4__["default"]
      : t === "string" ? ((c = Object(d3_color__WEBPACK_IMPORTED_MODULE_0__["color"])(b)) ? (b = c, _rgb__WEBPACK_IMPORTED_MODULE_1__["default"]) : _string__WEBPACK_IMPORTED_MODULE_6__["default"])
      : b instanceof d3_color__WEBPACK_IMPORTED_MODULE_0__["color"] ? _rgb__WEBPACK_IMPORTED_MODULE_1__["default"]
      : b instanceof Date ? _date__WEBPACK_IMPORTED_MODULE_3__["default"]
      : Array.isArray(b) ? _array__WEBPACK_IMPORTED_MODULE_2__["default"]
      : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? _object__WEBPACK_IMPORTED_MODULE_5__["default"]
      : _number__WEBPACK_IMPORTED_MODULE_4__["default"])(a, b);
});


/***/ }),

/***/ "./node_modules/d3-interpolate/src/zoom.js":
/*!*************************************************!*\
  !*** ./node_modules/d3-interpolate/src/zoom.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var rho = Math.SQRT2,
    rho2 = 2,
    rho4 = 4,
    epsilon2 = 1e-12;

function cosh(x) {
  return ((x = Math.exp(x)) + 1 / x) / 2;
}

function sinh(x) {
  return ((x = Math.exp(x)) - 1 / x) / 2;
}

function tanh(x) {
  return ((x = Math.exp(2 * x)) - 1) / (x + 1);
}

// p0 = [ux0, uy0, w0]
// p1 = [ux1, uy1, w1]
/* harmony default export */ __webpack_exports__["default"] = (function(p0, p1) {
  var ux0 = p0[0], uy0 = p0[1], w0 = p0[2],
      ux1 = p1[0], uy1 = p1[1], w1 = p1[2],
      dx = ux1 - ux0,
      dy = uy1 - uy0,
      d2 = dx * dx + dy * dy,
      i,
      S;

  // Special case for u0 ≅ u1.
  if (d2 < epsilon2) {
    S = Math.log(w1 / w0) / rho;
    i = function(t) {
      return [
        ux0 + t * dx,
        uy0 + t * dy,
        w0 * Math.exp(rho * t * S)
      ];
    }
  }

  // General case.
  else {
    var d1 = Math.sqrt(d2),
        b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1),
        b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1),
        r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0),
        r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
    S = (r1 - r0) / rho;
    i = function(t) {
      var s = t * S,
          coshr0 = cosh(r0),
          u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - sinh(r0));
      return [
        ux0 + u * dx,
        uy0 + u * dy,
        w0 * coshr0 / cosh(rho * s + r0)
      ];
    }
  }

  i.duration = S * 1000;

  return i;
});


/***/ }),

/***/ "./node_modules/d3-timer/src/index.js":
/*!********************************************!*\
  !*** ./node_modules/d3-timer/src/index.js ***!
  \********************************************/
/*! exports provided: now, timer, timerFlush, timeout, interval */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _timer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./timer */ "./node_modules/d3-timer/src/timer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "now", function() { return _timer__WEBPACK_IMPORTED_MODULE_0__["now"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "timer", function() { return _timer__WEBPACK_IMPORTED_MODULE_0__["timer"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "timerFlush", function() { return _timer__WEBPACK_IMPORTED_MODULE_0__["timerFlush"]; });

/* harmony import */ var _timeout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./timeout */ "./node_modules/d3-timer/src/timeout.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "timeout", function() { return _timeout__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _interval__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./interval */ "./node_modules/d3-timer/src/interval.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interval", function() { return _interval__WEBPACK_IMPORTED_MODULE_2__["default"]; });








/***/ }),

/***/ "./node_modules/d3-timer/src/interval.js":
/*!***********************************************!*\
  !*** ./node_modules/d3-timer/src/interval.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _timer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./timer */ "./node_modules/d3-timer/src/timer.js");


/* harmony default export */ __webpack_exports__["default"] = (function(callback, delay, time) {
  var t = new _timer__WEBPACK_IMPORTED_MODULE_0__["Timer"], total = delay;
  if (delay == null) return t.restart(callback, delay, time), t;
  delay = +delay, time = time == null ? Object(_timer__WEBPACK_IMPORTED_MODULE_0__["now"])() : +time;
  t.restart(function tick(elapsed) {
    elapsed += total;
    t.restart(tick, total += delay, time);
    callback(elapsed);
  }, delay, time);
  return t;
});


/***/ }),

/***/ "./node_modules/d3-timer/src/timeout.js":
/*!**********************************************!*\
  !*** ./node_modules/d3-timer/src/timeout.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _timer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./timer */ "./node_modules/d3-timer/src/timer.js");


/* harmony default export */ __webpack_exports__["default"] = (function(callback, delay, time) {
  var t = new _timer__WEBPACK_IMPORTED_MODULE_0__["Timer"];
  delay = delay == null ? 0 : +delay;
  t.restart(function(elapsed) {
    t.stop();
    callback(elapsed + delay);
  }, delay, time);
  return t;
});


/***/ }),

/***/ "./node_modules/d3-timer/src/timer.js":
/*!********************************************!*\
  !*** ./node_modules/d3-timer/src/timer.js ***!
  \********************************************/
/*! exports provided: now, Timer, timer, timerFlush */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "now", function() { return now; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Timer", function() { return Timer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "timer", function() { return timer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "timerFlush", function() { return timerFlush; });
var frame = 0, // is an animation frame pending?
    timeout = 0, // is a timeout pending?
    interval = 0, // are any timers active?
    pokeDelay = 1000, // how frequently we check for clock skew
    taskHead,
    taskTail,
    clockLast = 0,
    clockNow = 0,
    clockSkew = 0,
    clock = typeof performance === "object" && performance.now ? performance : Date,
    setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) { setTimeout(f, 17); };

function now() {
  return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
}

function clearNow() {
  clockNow = 0;
}

function Timer() {
  this._call =
  this._time =
  this._next = null;
}

Timer.prototype = timer.prototype = {
  constructor: Timer,
  restart: function(callback, delay, time) {
    if (typeof callback !== "function") throw new TypeError("callback is not a function");
    time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
    if (!this._next && taskTail !== this) {
      if (taskTail) taskTail._next = this;
      else taskHead = this;
      taskTail = this;
    }
    this._call = callback;
    this._time = time;
    sleep();
  },
  stop: function() {
    if (this._call) {
      this._call = null;
      this._time = Infinity;
      sleep();
    }
  }
};

function timer(callback, delay, time) {
  var t = new Timer;
  t.restart(callback, delay, time);
  return t;
}

function timerFlush() {
  now(); // Get the current time, if not already set.
  ++frame; // Pretend we’ve set an alarm, if we haven’t already.
  var t = taskHead, e;
  while (t) {
    if ((e = clockNow - t._time) >= 0) t._call.call(null, e);
    t = t._next;
  }
  --frame;
}

function wake() {
  clockNow = (clockLast = clock.now()) + clockSkew;
  frame = timeout = 0;
  try {
    timerFlush();
  } finally {
    frame = 0;
    nap();
    clockNow = 0;
  }
}

function poke() {
  var now = clock.now(), delay = now - clockLast;
  if (delay > pokeDelay) clockSkew -= delay, clockLast = now;
}

function nap() {
  var t0, t1 = taskHead, t2, time = Infinity;
  while (t1) {
    if (t1._call) {
      if (time > t1._time) time = t1._time;
      t0 = t1, t1 = t1._next;
    } else {
      t2 = t1._next, t1._next = null;
      t1 = t0 ? t0._next = t2 : taskHead = t2;
    }
  }
  taskTail = t0;
  sleep(time);
}

function sleep(time) {
  if (frame) return; // Soonest alarm already set, or will be.
  if (timeout) timeout = clearTimeout(timeout);
  var delay = time - clockNow; // Strictly less than if we recomputed clockNow.
  if (delay > 24) {
    if (time < Infinity) timeout = setTimeout(wake, time - clock.now() - clockSkew);
    if (interval) interval = clearInterval(interval);
  } else {
    if (!interval) clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
    frame = 1, setFrame(wake);
  }
}


/***/ }),

/***/ "./src/behavior/activate-relations.js":
/*!********************************************!*\
  !*** ./src/behavior/activate-relations.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  getDefaultCfg: function getDefaultCfg() {
    return {
      trigger: 'mouseenter',
      // 可选 mouseenter || click
      activeState: 'active',
      inactiveState: 'inactive',
      shouldUpdate: function shouldUpdate() {
        return true;
      }
    };
  },
  getEvents: function getEvents() {
    if (this.get('trigger') === 'mouseenter') {
      return {
        'node:mouseenter': 'setAllItemStates',
        'node:mouseleave': 'clearAllItemStates'
      };
    }

    return {
      'node:click': 'setAllItemStates',
      'canvas:click': 'clearAllItemStates'
    };
  },
  setAllItemStates: function setAllItemStates(e) {
    var graph = this.get('graph');
    var item = e.item;
    this.item = item;

    if (!this.shouldUpdate(e.item, {
      event: e,
      action: 'activate'
    })) {
      return;
    }

    var activeState = this.get('activeState');
    var inactiveState = this.get('inactiveState');
    var autoPaint = graph.get('autoPaint');
    graph.setAutoPaint(false);
    graph.getNodes().forEach(function (node) {
      graph.setItemState(node, activeState, false);
      inactiveState && graph.setItemState(node, inactiveState, true);
    });
    graph.getEdges().forEach(function (edge) {
      graph.setItemState(edge, activeState, false);
      inactiveState && graph.setItemState(edge, inactiveState, true);
    });
    inactiveState && graph.setItemState(item, inactiveState, false);
    graph.setItemState(item, activeState, true);
    graph.getEdges().forEach(function (edge) {
      if (edge.getSource() === item) {
        inactiveState && graph.setItemState(edge.getTarget(), inactiveState, false);
        graph.setItemState(edge.getTarget(), activeState, true);
        graph.setItemState(edge, activeState, true);
        graph.setItemState(edge, inactiveState, false);
        edge.toFront();
      } else if (edge.getTarget() === item) {
        inactiveState && graph.setItemState(edge.getSource(), inactiveState, false);
        graph.setItemState(edge.getSource(), activeState, true);
        graph.setItemState(edge, activeState, true);
        graph.setItemState(edge, inactiveState, false);
        edge.toFront();
      }
    });
    graph.paint();
    graph.setAutoPaint(autoPaint);
    graph.emit('afteractivaterelations', {
      item: e.item,
      action: 'activate'
    });
  },
  clearAllItemStates: function clearAllItemStates(e) {
    var graph = this.get('graph');

    if (!this.shouldUpdate(e.item, {
      event: e,
      action: 'deactivate'
    })) {
      return;
    }

    var autoPaint = graph.get('autoPaint');
    graph.setAutoPaint(false);
    graph.getNodes().forEach(function (node) {
      graph.clearItemStates(node);
    });
    graph.getEdges().forEach(function (edge) {
      graph.clearItemStates(edge);
    });
    graph.paint();
    graph.setAutoPaint(autoPaint);
    graph.emit('afteractivaterelations', {
      item: e.item || this.item,
      action: 'deactivate'
    });
  }
};

/***/ }),

/***/ "./src/behavior/behavior.js":
/*!**********************************!*\
  !*** ./src/behavior/behavior.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(/*! ../util */ "./src/util/index.js");

var Behavior = {};
/**
 * 注册行为的方法
 * @param {string} type 行为类型，外部引用指定必须，不要与已有行为类型重名
 * @param {object} behavior 行为内容,包含元素详见augment内容
 */

Behavior.registerBehavior = function (type, behavior) {
  if (!behavior) {
    throw new Error('please specify handler for this behavior:' + type);
  }

  var base = function base(cfg) {
    var self = this;
    Util.mix(self, self.getDefaultCfg(), cfg);
    var events = self.getEvents();

    if (events) {
      var eventsToBind = {};
      Util.each(events, function (handler, event) {
        eventsToBind[event] = Util.wrapBehavior(self, handler);
      });
      this._events = eventsToBind;
    }
  };

  Util.augment(base, {
    /**
     * 是否阻止行为发生，默认不阻止
     * @return {boolean} 返回false时不触发行为
     */
    shouldBegin: function shouldBegin() {
      return true;
    },

    /**
     * 是否阻止行为更新数据，更改视图
     * @return {boolean} 返回false时更新数据
     */
    shouldUpdate: function shouldUpdate() {
      return true;
    },

    /**
     * 是否阻止行为进入终止态
     * @return {boolean} 返回false时阻止
     */
    shouldEnd: function shouldEnd() {
      return true;
    },

    /**
     * 定义行为的事件监听handler，behavior内部会自动绑定事件。
     * 例如： return { click: 'onClick' }, 内部会监听graph的click事件，触发this.onClick
     */
    getEvents: function getEvents() {},

    /**
     * 绑定事件，默认绑定getEvents返回事件，不需要复写
     * @param {object} graph 画布实例
     */
    bind: function bind(graph) {
      var events = this._events;
      this.graph = graph;
      Util.each(events, function (handler, event) {
        graph.on(event, handler);
      });
    },

    /**
     * 解绑事件，多用于切换行为模式，默认解绑getEvents返回事件，复写bind时需要同时复写unbind
     * @param {object} graph 画布实例
     */
    unbind: function unbind(graph) {
      var events = this._events;
      Util.each(events, function (handler, event) {
        graph.off(event, handler);
      });
    },
    get: function get(val) {
      return this[val];
    },
    set: function set(key, val) {
      this[key] = val;
      return this;
    },

    /**
     * 定义自定义行为的默认参数，会与用户传入的参数进行合并
     */
    getDefaultCfg: function getDefaultCfg() {}
  }, behavior);
  Behavior[type] = base;
};

Behavior.hasBehavior = function (type) {
  return !!Behavior[type];
};

Behavior.getBehavior = function (type) {
  return Behavior[type];
};

module.exports = Behavior;

/***/ }),

/***/ "./src/behavior/brush-select.js":
/*!**************************************!*\
  !*** ./src/behavior/brush-select.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var min = Math.min;
var max = Math.max;
var abs = Math.abs;
var hypot = Math.hypot;
module.exports = {
  getDefaultCfg: function getDefaultCfg() {
    return {
      brushStyle: {
        fill: '#EEF6FF',
        fillOpacity: 0.4,
        stroke: '#DDEEFE',
        lineWidth: 1
      },
      onSelect: function onSelect() {},
      onDeselect: function onDeselect() {},
      selectedState: 'selected'
    };
  },
  getEvents: function getEvents() {
    return {
      mousedown: 'onMouseDown',
      mousemove: 'onMouseMove',
      mouseup: 'onMouseUp',
      'canvas:click': 'clearStates'
    };
  },
  onMouseDown: function onMouseDown(e) {
    if (this.selectedNodes && this.selectedNodes.length !== 0) {
      this.clearStates();
    }

    var brush = this.brush;

    if (!brush) {
      brush = this._createBrush();
    }

    this.originPoint = {
      x: e.canvasX,
      y: e.canvasY
    };
    brush.attr({
      width: 0,
      height: 0
    });
    brush.show();
    this.dragging = true;
  },
  onMouseMove: function onMouseMove(e) {
    var originPoint = this.originPoint;

    if (!this.dragging || hypot(originPoint.x - e.canvasX, originPoint.y - e.canvasY) < 10) {
      return;
    }

    this._updateBrush(e);

    this.graph.paint();
  },
  onMouseUp: function onMouseUp(e) {
    var graph = this.graph;
    var autoPaint = graph.get('autoPaint');
    graph.setAutoPaint(false);
    this.brush.hide();

    this._getSelectedNodes(e);

    this.dragging = false;
    this.graph.paint();
    graph.setAutoPaint(autoPaint);
  },
  clearStates: function clearStates() {
    var graph = this.graph;
    var autoPaint = graph.get('autoPaint');
    graph.setAutoPaint(false);
    var selectedState = this.selectedState;
    var shouldUpdate = this.shouldUpdate;
    var selectedNodes = [];
    var result = this.selectedNodes.filter(function (node) {
      if (shouldUpdate(node, 'deselect')) {
        graph.setItemState(node, selectedState, false);
        return true;
      }

      selectedNodes.push(node);
      return false;
    });
    this.onDeselect && this.onDeselect(result);
    this.selectedNodes = selectedNodes;
    graph.paint();
    graph.setAutoPaint(autoPaint);
  },
  _getSelectedNodes: function _getSelectedNodes(e) {
    var graph = this.graph;
    var state = this.selectedState;
    var originPoint = this.originPoint;
    var p1 = {
      x: e.x,
      y: e.y
    };
    var p2 = graph.getPointByCanvas(originPoint.x, originPoint.y);
    var left = min(p1.x, p2.x);
    var right = max(p1.x, p2.x);
    var top = min(p1.y, p2.y);
    var bottom = max(p1.y, p2.y);
    var selectedNodes = [];
    var shouldUpdate = this.shouldUpdate;
    graph.getNodes().forEach(function (node) {
      var bbox = node.getBBox();

      if (bbox.centerX >= left && bbox.centerX <= right && bbox.centerY >= top && bbox.centerY <= bottom) {
        if (shouldUpdate(node, 'select')) {
          selectedNodes.push(node);
          graph.setItemState(node, state, true);
        }
      }
    });
    this.selectedNodes = selectedNodes;
    this.onSelect && this.onSelect(selectedNodes);
  },
  _createBrush: function _createBrush() {
    var self = this;
    var brush = self.graph.get('canvas').addShape('rect', {
      attrs: self.brushStyle,
      capture: false
    });
    this.brush = brush;
    return brush;
  },
  _updateBrush: function _updateBrush(e) {
    var originPoint = this.originPoint;
    this.brush.attr({
      width: abs(e.canvasX - originPoint.x),
      height: abs(e.canvasY - originPoint.y),
      x: min(e.canvasX, originPoint.x),
      y: min(e.canvasY, originPoint.y)
    });
  }
};

/***/ }),

/***/ "./src/behavior/click-select.js":
/*!**************************************!*\
  !*** ./src/behavior/click-select.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(/*! ../util */ "./src/util/index.js");

module.exports = {
  getDefaultCfg: function getDefaultCfg() {
    return {
      multiple: true,
      keyCode: 17
    };
  },
  getEvents: function getEvents() {
    return {
      'node:click': 'onClick',
      'canvas:click': 'onCanvasClick',
      keyup: 'onKeyUp',
      keydown: 'onKeyDown'
    };
  },
  onClick: function onClick(e) {
    var self = this;
    var item = e.item;
    var graph = self.graph;
    var autoPaint = graph.get('autoPaint');
    graph.setAutoPaint(false);

    if (!self.keydown || !self.multiple) {
      var selected = graph.findAllByState('node', 'selected');
      Util.each(selected, function (node) {
        if (node !== item) {
          graph.setItemState(node, 'selected', false);
        }
      });
    }

    if (item.hasState('selected')) {
      if (self.shouldUpdate.call(self, e)) {
        graph.setItemState(item, 'selected', false);
      }

      graph.emit('nodeselectchange', {
        target: item,
        select: false
      });
    } else {
      if (self.shouldUpdate.call(self, e)) {
        graph.setItemState(item, 'selected', true);
      }

      graph.emit('nodeselectchange', {
        target: item,
        select: true
      });
    }

    graph.setAutoPaint(autoPaint);
    graph.paint();
  },
  onCanvasClick: function onCanvasClick() {
    var graph = this.graph;
    var autoPaint = graph.get('autoPaint');
    graph.setAutoPaint(false);
    var selected = graph.findAllByState('node', 'selected');
    Util.each(selected, function (node) {
      graph.setItemState(node, 'selected', false);
    });
    graph.paint();
    graph.setAutoPaint(autoPaint);
  },
  onKeyDown: function onKeyDown(e) {
    var code = e.keyCode || e.which;

    if (code === this.keyCode) {
      this.keydown = true;
    } else {
      this.keydown = false;
    }
  },
  onKeyUp: function onKeyUp() {
    this.keydown = false;
  }
};

/***/ }),

/***/ "./src/behavior/collapse-expand.js":
/*!*****************************************!*\
  !*** ./src/behavior/collapse-expand.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  getDefaultCfg: function getDefaultCfg() {
    return {
      /**
       * 发生收缩/扩展变化时的回调
       */
      onChange: function onChange() {}
    };
  },
  getEvents: function getEvents() {
    return {
      'node:click': 'onNodeClick'
    };
  },
  onNodeClick: function onNodeClick(e) {
    var item = e.item; // 如果节点进行过更新，model 会进行 merge，直接改 model 就不能改布局，所以需要去改源数据

    var sourceData = this.graph.findDataById(item.get('id'));
    var children = sourceData.children; // 叶子节点的收缩和展开没有意义

    if (!children || children.length === 0) {
      return;
    }

    var collapsed = !sourceData.collapsed;

    if (!this.shouldBegin(e, collapsed)) {
      return;
    }

    sourceData.collapsed = collapsed;
    item.getModel().collapsed = collapsed;
    this.graph.emit('itemcollapsed', {
      item: e.item,
      collapsed: collapsed
    });

    if (!this.shouldUpdate(e, collapsed)) {
      return;
    }

    try {
      this.onChange(item, collapsed);
    } catch (e) {
      console.warn('G6 自 3.0.4 版本支持直接从 item.getModel() 获取源数据(临时通知，将在之后版本清除)', e);
    }

    this.graph.refreshLayout();
  }
};

/***/ }),

/***/ "./src/behavior/drag-canvas.js":
/*!*************************************!*\
  !*** ./src/behavior/drag-canvas.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(/*! ../util */ "./src/util/index.js");

var abs = Math.abs;
var DRAG_OFFSET = 10;
var body = document.body;
module.exports = {
  getDefaultCfg: function getDefaultCfg() {
    return {
      direction: 'both'
    };
  },
  getEvents: function getEvents() {
    return {
      'canvas:mousedown': 'onMouseDown',
      'canvas:mousemove': 'onMouseMove',
      'canvas:mouseup': 'onMouseUp',
      'canvas:click': 'onMouseUp',
      'canvas:mouseleave': 'onOutOfRange'
    };
  },
  updateViewport: function updateViewport(e) {
    var origin = this.origin;
    var clientX = +e.clientX;
    var clientY = +e.clientY;

    if (isNaN(clientX) || isNaN(clientY)) {
      return;
    }

    var dx = clientX - origin.x;
    var dy = clientY - origin.y;

    if (this.get('direction') === 'x') {
      dy = 0;
    } else if (this.get('direction') === 'y') {
      dx = 0;
    }

    this.origin = {
      x: clientX,
      y: clientY
    };
    this.graph.translate(dx, dy);
    this.graph.paint();
  },
  onMouseDown: function onMouseDown(e) {
    this.origin = {
      x: e.clientX,
      y: e.clientY
    };
    this.dragging = false;
  },
  onMouseMove: function onMouseMove(e) {
    e = Util.cloneEvent(e);
    var graph = this.graph;

    if (!this.origin) {
      return;
    }

    if (this.origin && !this.dragging) {
      if (abs(this.origin.x - e.clientX) + abs(this.origin.y - e.clientY) < DRAG_OFFSET) {
        return;
      }

      if (this.shouldBegin.call(this, e)) {
        e.type = 'dragstart';
        graph.emit('canvas:dragstart', e);
        this.dragging = true;
      }
    }

    if (this.dragging) {
      e.type = 'drag';
      graph.emit('canvas:drag', e);
    }

    if (this.shouldUpdate.call(this, e)) {
      this.updateViewport(e);
    }
  },
  onMouseUp: function onMouseUp(e) {
    if (!this.dragging) {
      this.origin = null;
      return;
    }

    e = Util.cloneEvent(e);
    var graph = this.graph;

    if (this.shouldEnd.call(this, e)) {
      this.updateViewport(e);
    }

    e.type = 'dragend';
    graph.emit('canvas:dragend', e);
    this.endDrag();
  },
  endDrag: function endDrag() {
    if (this.dragging) {
      this.origin = null;
      this.dragging = false; // 终止时需要判断此时是否在监听画布外的 mouseup 事件，若有则解绑

      var fn = this.fn;

      if (fn) {
        body.removeEventListener('mouseup', fn, false);
        this.fn = null;
      }
    }
  },
  // 若在拖拽时，鼠标移出画布区域，此时放开鼠标无法终止 drag 行为。在画布外监听 mouseup 事件，放开则终止
  onOutOfRange: function onOutOfRange(e) {
    if (this.dragging) {
      var self = this;
      var canvasElement = self.graph.get('canvas').get('el');

      var fn = function fn(ev) {
        if (ev.target !== canvasElement) {
          self.onMouseUp(e);
        }
      };

      this.fn = fn;
      body.addEventListener('mouseup', fn, false);
    }
  }
};

/***/ }),

/***/ "./src/behavior/drag-node.js":
/*!***********************************!*\
  !*** ./src/behavior/drag-node.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var _require = __webpack_require__(/*! ../util */ "./src/util/index.js"),
    mix = _require.mix;

var _require2 = __webpack_require__(/*! ../global */ "./src/global.js"),
    delegateStyle = _require2.delegateStyle;

var body = document.body;
module.exports = {
  getDefaultCfg: function getDefaultCfg() {
    return {
      updateEdge: true,
      delegate: true,
      delegateStyle: {}
    };
  },
  getEvents: function getEvents() {
    return {
      'node:dragstart': 'onDragStart',
      'node:drag': 'onDrag',
      'node:dragend': 'onDragEnd',
      'canvas:mouseleave': 'onOutOfRange'
    };
  },
  onDragStart: function onDragStart(e) {
    if (!this.shouldBegin.call(this, e)) {
      return;
    }

    this.target = e.item;
    this.origin = {
      x: e.x,
      y: e.y
    };
  },
  onDrag: function onDrag(e) {
    if (!this.origin) {
      return;
    }

    if (!this.get('shouldUpdate').call(this, e)) {
      return;
    }

    this._update(this.target, e);
  },
  onDragEnd: function onDragEnd(e) {
    if (!this.shouldEnd.call(this, e)) {
      return;
    }

    if (!this.origin) {
      return;
    }

    var delegateShape = this.target.get('delegateShape');

    if (delegateShape) {
      delegateShape.remove();
      this.target.set('delegateShape', null);
    }

    this._update(this.target, e, true);

    this.point = null;
    this.origin = null; // 终止时需要判断此时是否在监听画布外的 mouseup 事件，若有则解绑

    var fn = this.fn;

    if (fn) {
      body.removeEventListener('mouseup', fn, false);
      this.fn = null;
    }
  },
  // 若在拖拽时，鼠标移出画布区域，此时放开鼠标无法终止 drag 行为。在画布外监听 mouseup 事件，放开则终止
  onOutOfRange: function onOutOfRange(e) {
    var self = this;

    if (this.origin) {
      var canvasElement = self.graph.get('canvas').get('el');

      var fn = function fn(ev) {
        if (ev.target !== canvasElement) {
          self.onDragEnd(e);
        }
      };

      this.fn = fn;
      body.addEventListener('mouseup', fn, false);
    }
  },
  _update: function _update(item, e, force) {
    var origin = this.origin;
    var model = item.get('model');

    if (!this.point) {
      this.point = {
        x: model.x,
        y: model.y
      };
    }

    var x = e.x - origin.x + this.point.x;
    var y = e.y - origin.y + this.point.y;
    this.origin = {
      x: e.x,
      y: e.y
    };
    this.point = {
      x: x,
      y: y
    };

    if (this.delegate && !force) {
      this._updateDelegate(item, x, y);

      return;
    }

    if (this.get('updateEdge')) {
      this.graph.updateItem(item, {
        x: x,
        y: y
      });
    } else {
      item.updatePosition({
        x: x,
        y: y
      });
      this.graph.paint();
    }
  },
  _updateDelegate: function _updateDelegate(item, x, y) {
    var self = this;
    var shape = item.get('delegateShape');
    var bbox = item.get('keyShape').getBBox();

    if (!shape) {
      var parent = self.graph.get('group');
      var attrs = mix({}, delegateStyle, this.delegateStyle); // model上的x, y是相对于图形中心的，delegateShape是g实例，x,y是绝对坐标

      shape = parent.addShape('rect', {
        attrs: _extends({
          width: bbox.width,
          height: bbox.height,
          x: x - bbox.width / 2,
          y: y - bbox.height / 2
        }, attrs)
      });
      shape.set('capture', false);
      item.set('delegateShape', shape);
    }

    shape.attr({
      x: x - bbox.width / 2,
      y: y - bbox.height / 2
    });
    this.graph.paint();
  }
};

/***/ }),

/***/ "./src/behavior/edge-tooltip.js":
/*!**************************************!*\
  !*** ./src/behavior/edge-tooltip.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(/*! ../util */ "./src/util/index.js");

var base = __webpack_require__(/*! ./tooltip-base */ "./src/behavior/tooltip-base.js");

module.exports = Util.mix({
  getDefaultCfg: function getDefaultCfg() {
    return {
      item: 'edge',
      formatText: function formatText(model) {
        return 'source:' + model.source + ' target:' + model.target;
      }
    };
  },
  getEvents: function getEvents() {
    return {
      'edge:mouseenter': 'onMouseEnter',
      'edge:mouseleave': 'onMouseLeave',
      'edge:mousemove': 'onMouseMove'
    };
  }
}, base);

/***/ }),

/***/ "./src/behavior/index.js":
/*!*******************************!*\
  !*** ./src/behavior/index.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(/*! ../util */ "./src/util/index.js");

var Behavior = __webpack_require__(/*! ./behavior */ "./src/behavior/behavior.js");

var behaviors = {
  'drag-canvas': __webpack_require__(/*! ./drag-canvas */ "./src/behavior/drag-canvas.js"),
  'zoom-canvas': __webpack_require__(/*! ./zoom-canvas */ "./src/behavior/zoom-canvas.js"),
  'drag-node': __webpack_require__(/*! ./drag-node */ "./src/behavior/drag-node.js"),
  'click-select': __webpack_require__(/*! ./click-select */ "./src/behavior/click-select.js"),
  tooltip: __webpack_require__(/*! ./tooltip */ "./src/behavior/tooltip.js"),
  'edge-tooltip': __webpack_require__(/*! ./edge-tooltip */ "./src/behavior/edge-tooltip.js"),
  'collapse-expand': __webpack_require__(/*! ./collapse-expand */ "./src/behavior/collapse-expand.js"),
  'activate-relations': __webpack_require__(/*! ./activate-relations */ "./src/behavior/activate-relations.js"),
  'brush-select': __webpack_require__(/*! ./brush-select */ "./src/behavior/brush-select.js")
};
Util.each(behaviors, function (behavior, type) {
  Behavior.registerBehavior(type, behavior);
});
module.exports = Behavior;

/***/ }),

/***/ "./src/behavior/tooltip-base.js":
/*!**************************************!*\
  !*** ./src/behavior/tooltip-base.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(/*! ../util */ "./src/util/index.js");

var OFFSET = 12;
module.exports = {
  onMouseEnter: function onMouseEnter(e) {
    var self = this;

    if (!self.shouldBegin(e)) {
      return;
    }

    var item = e.item;
    self.currentTarget = item;
    self.showTooltip(e);
    self.graph.emit('tooltipchange', {
      item: e.item,
      action: 'show'
    });
  },
  onMouseMove: function onMouseMove(e) {
    if (!this.shouldUpdate(e)) {
      this.hideTooltip();
      return;
    }

    if (!this.currentTarget || e.item !== this.currentTarget) {
      return;
    }

    this.updatePosition(e);
  },
  onMouseLeave: function onMouseLeave(e) {
    if (!this.shouldEnd(e)) {
      return;
    }

    this.hideTooltip();
    this.graph.emit('tooltipchange', {
      item: this.currentTarget,
      action: 'hide'
    });
    this.currentTarget = null;
  },
  showTooltip: function showTooltip(e) {
    var self = this;

    if (!e.item) {
      return;
    }

    var container = self.container;

    if (!container) {
      container = self._createTooltip(self.graph.get('canvas'));
      self.container = container;
    }

    var text = self.formatText(e.item.get('model'), e);
    container.innerHTML = text;
    this.updatePosition(e);
    Util.modifyCSS(this.container, {
      visibility: 'visible'
    });
  },
  hideTooltip: function hideTooltip() {
    Util.modifyCSS(this.container, {
      visibility: 'hidden'
    });
  },
  updatePosition: function updatePosition(e) {
    var width = this.width;
    var height = this.height;
    var container = this.container;
    var x = e.canvasX;
    var y = e.canvasY;
    var bbox = container.getBoundingClientRect();

    if (x > width / 2) {
      x -= bbox.width;
    } else {
      x += OFFSET;
    }

    if (y > height / 2) {
      y -= bbox.height;
    } else {
      y += OFFSET;
    }

    var left = x + 'px';
    var top = y + 'px';
    Util.modifyCSS(this.container, {
      left: left,
      top: top,
      visibility: 'visible'
    });
  },
  _createTooltip: function _createTooltip(canvas) {
    var el = canvas.get('el');
    el.style.position = 'relative';
    var container = Util.createDom('<div class="g6-tooltip g6-' + this.item + '-tooltip"></div>');
    el.parentNode.appendChild(container);
    Util.modifyCSS(container, {
      position: 'absolute',
      visibility: 'visible'
    });
    this.width = canvas.get('width');
    this.height = canvas.get('height');
    this.container = container;
    return container;
  }
};

/***/ }),

/***/ "./src/behavior/tooltip.js":
/*!*********************************!*\
  !*** ./src/behavior/tooltip.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(/*! ../util */ "./src/util/index.js");

var base = __webpack_require__(/*! ./tooltip-base */ "./src/behavior/tooltip-base.js");

module.exports = Util.mix({
  getDefaultCfg: function getDefaultCfg() {
    return {
      item: 'node',
      formatText: function formatText(model) {
        return model.label;
      }
    };
  },
  getEvents: function getEvents() {
    return {
      'node:mouseenter': 'onMouseEnter',
      'node:mouseleave': 'onMouseLeave',
      'node:mousemove': 'onMouseMove'
    };
  }
}, base);

/***/ }),

/***/ "./src/behavior/zoom-canvas.js":
/*!*************************************!*\
  !*** ./src/behavior/zoom-canvas.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var DELTA = 0.05;
module.exports = {
  getDefaultCfg: function getDefaultCfg() {
    return {
      sensitivity: 5,
      minZoom: 0.1,
      maxZoom: 10
    };
  },
  getEvents: function getEvents() {
    return {
      wheel: 'onWheel'
    };
  },
  onWheel: function onWheel(e) {
    e.preventDefault();

    if (!this.shouldUpdate.call(this, e)) {
      return;
    }

    var graph = this.graph;
    var canvas = graph.get('canvas');
    var point = canvas.getPointByClient(e.clientX, e.clientY);
    var pixelRatio = canvas.get('pixelRatio');
    var sensitivity = this.get('sensitivity');
    var ratio = graph.getZoom();

    if (e.wheelDelta > 0) {
      ratio = 1 - DELTA * sensitivity;
    } else {
      ratio = 1 + DELTA * sensitivity;
    }

    var zoom = ratio * graph.getZoom();

    if (zoom > this.get('maxZoom') || zoom < this.get('minZoom')) {
      return;
    }

    graph.zoom(ratio, {
      x: point.x / pixelRatio,
      y: point.y / pixelRatio
    });
    graph.paint();
    graph.emit('wheelzoom', e);
  }
};

/***/ }),

/***/ "./src/global.js":
/*!***********************!*\
  !*** ./src/global.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * @fileOverview global config
 */
module.exports = {
  version: '3.0.5-beta.6',
  rootContainerClassName: 'root-container',
  nodeContainerClassName: 'node-container',
  edgeContainerClassName: 'edge-container',
  defaultNode: {
    shape: 'circle',
    style: {
      fill: '#fff'
    },
    size: 40,
    color: '#333'
  },
  defaultEdge: {
    shape: 'line',
    style: {},
    size: 1,
    color: '#333'
  },
  nodeLabel: {
    style: {
      fill: '#595959',
      textAlign: 'center',
      textBaseline: 'middle'
    },
    offset: 5 // 节点的默认文本不居中时的偏移量

  },
  edgeLabel: {
    style: {
      fill: '#595959',
      textAlign: 'center',
      textBaseline: 'middle'
    }
  },
  // 节点应用状态后的样式，默认仅提供 active 和 selected 用户可以自己扩展
  nodeStateStyle: {
    active: {
      fillOpacity: 0.8
    },
    selected: {
      lineWidth: 2
    }
  },
  edgeStateStyle: {
    active: {
      strokeOpacity: 0.8
    },
    selected: {
      lineWidth: 2
    }
  },
  loopPosition: 'top',
  delegateStyle: {
    fill: '#F3F9FF',
    fillOpacity: 0.5,
    stroke: '#1890FF',
    strokeOpacity: 0.9,
    lineDash: [5, 5]
  }
};

/***/ }),

/***/ "./src/graph/controller/event.js":
/*!***************************************!*\
  !*** ./src/graph/controller/event.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(/*! ../../util */ "./src/util/index.js");

var EVENTS = ['click', 'mousedown', 'mouseup', 'dblclick', 'contextmenu', 'mouseenter', 'mouseout', 'mouseover', 'mousemove', 'mouseleave', 'dragstart', 'dragend', 'drag', 'dragenter', 'dragleave', 'drop'];

function getItemRoot(shape) {
  while (shape && !shape.get('item')) {
    shape = shape.get('parent');
  }

  return shape;
}

var ORIGIN_MATRIX = [1, 0, 0, 0, 1, 0, 0, 0, 1];
var MATRIX_LEN = 9;

function isViewportChanged(matrix) {
  for (var i = 0; i < MATRIX_LEN; i++) {
    if (matrix[i] !== ORIGIN_MATRIX[i]) {
      return true;
    }
  }

  return false;
}

var Event =
/*#__PURE__*/
function () {
  function Event(graph) {
    this.graph = graph;
    this.extendEvents = [];

    this._initEvents();
  }

  var _proto = Event.prototype;

  _proto._initEvents = function _initEvents() {
    var self = this;
    var graph = self.graph;
    var canvas = graph.get('canvas');
    var el = canvas.get('el');
    var extendEvents = self.extendEvents;
    var canvasHandler = Util.wrapBehavior(self, '_onCanvasEvents');
    var originHandler = Util.wrapBehavior(self, '_onExtendEvents');
    var wheelHandler = Util.wrapBehavior(self, '_onWheelEvent');
    Util.each(EVENTS, function (event) {
      canvas.on(event, canvasHandler);
    });
    this.canvasHandler = canvasHandler;
    extendEvents.push(Util.addEventListener(el, 'DOMMouseScroll', wheelHandler));
    extendEvents.push(Util.addEventListener(el, 'mousewheel', wheelHandler));
    window && extendEvents.push(Util.addEventListener(window, 'keydown', originHandler));
    window && extendEvents.push(Util.addEventListener(window, 'keyup', originHandler));
  };

  _proto._onCanvasEvents = function _onCanvasEvents(e) {
    var self = this;
    var graph = self.graph;
    var canvas = graph.get('canvas');
    var pixelRatio = canvas.get('pixelRatio');
    var target = e.target;
    var eventType = e.type;
    /**
     * (clientX, clientY): 相对于页面的坐标；
     * (canvasX, canvasY): 相对于 <canvas> 左上角的坐标；
     * (x, y): 相对于整个画布的坐标, 与 model 的 x, y 是同一维度的。
     */

    e.canvasX = e.x / pixelRatio;
    e.canvasY = e.y / pixelRatio;
    var point = {
      x: e.canvasX,
      y: e.canvasY
    };

    if (isViewportChanged(graph.get('group').getMatrix())) {
      point = graph.getPointByCanvas(e.canvasX, e.canvasY);
    }

    e.x = point.x;
    e.y = point.y; // 事件currentTarget是graph

    e.currentTarget = graph;

    if (target === canvas) {
      if (eventType === 'mousemove') {
        self._handleMouseMove(e, 'canvas');
      }

      e.target = canvas;
      e.item = null;
      graph.emit(eventType, e);
      graph.emit('canvas:' + eventType, e);
      return;
    }

    var itemShape = getItemRoot(target);

    if (!itemShape) {
      graph.emit(eventType, e);
      return;
    }

    var item = itemShape.get('item');

    if (item.destroyed) {
      return;
    }

    var type = item.getType(); // 事件target是触发事件的Shape实例，, item是触发事件的item实例

    e.target = target;
    e.item = item;
    graph.emit(eventType, e); // g的事件会冒泡，如果target不是canvas，可能会引起同个节点触发多次，需要另外判断

    if (eventType === 'mouseenter' || eventType === 'mouseleave' || eventType === 'dragenter' || eventType === 'dragleave') {
      return;
    }

    graph.emit(type + ':' + eventType, e);

    if (eventType === 'dragstart') {
      self.dragging = true;
    }

    if (eventType === 'dragend') {
      self.dragging = false;
    }

    if (eventType === 'mousemove') {
      self._handleMouseMove(e, type);
    }
  };

  _proto._onExtendEvents = function _onExtendEvents(e) {
    this.graph.emit(e.type, e);
  };

  _proto._onWheelEvent = function _onWheelEvent(e) {
    if (Util.isNil(e.wheelDelta)) {
      e.wheelDelta = -e.detail;
    }

    this.graph.emit('wheel', e);
  };

  _proto._handleMouseMove = function _handleMouseMove(e, type) {
    var self = this;
    var canvas = this.graph.get('canvas');
    var item = e.target === canvas ? null : e.item;
    var preItem = this.preItem; // 避免e的type与触发的事件不同

    e = Util.cloneEvent(e); // 从前一个item直接移动到当前item，触发前一个item的leave事件

    if (preItem && preItem !== item && !preItem.destroyed) {
      e.item = preItem;

      self._emitCustomEvent(preItem.getType(), 'mouseleave', e);

      if (self.dragging) {
        self._emitCustomEvent(preItem.getType(), 'dragleave', e);
      }
    } // 从一个item或canvas移动到当前item，触发当前item的enter事件


    if (item && preItem !== item) {
      e.item = item;

      self._emitCustomEvent(type, 'mouseenter', e);

      if (self.dragging) {
        self._emitCustomEvent(type, 'dragenter', e);
      }
    }

    this.preItem = item;
  };

  _proto._emitCustomEvent = function _emitCustomEvent(itemType, type, e) {
    e.type = type;
    this.graph.emit(itemType + ':' + type, e);
  };

  _proto.destroy = function destroy() {
    var graph = this.graph;
    var canvasHandler = this.canvasHandler;
    var canvas = graph.get('canvas');
    Util.each(EVENTS, function (event) {
      canvas.off(event, canvasHandler);
    });
    Util.each(this.extendEvents, function (event) {
      event.remove();
    });
  };

  return Event;
}();

module.exports = Event;

/***/ }),

/***/ "./src/graph/controller/index.js":
/*!***************************************!*\
  !*** ./src/graph/controller/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  View: __webpack_require__(/*! ./view */ "./src/graph/controller/view.js"),
  Event: __webpack_require__(/*! ./event */ "./src/graph/controller/event.js"),
  Mode: __webpack_require__(/*! ./mode */ "./src/graph/controller/mode.js"),
  Item: __webpack_require__(/*! ./item */ "./src/graph/controller/item.js"),
  State: __webpack_require__(/*! ./state */ "./src/graph/controller/state.js")
};

/***/ }),

/***/ "./src/graph/controller/item.js":
/*!**************************************!*\
  !*** ./src/graph/controller/item.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(/*! ../../util */ "./src/util/index.js");

var Item = __webpack_require__(/*! ../../item */ "./src/item/index.js");

var NODE = 'node';
var EDGE = 'edge';
var CFG_PREFIX = 'default';
var MAPPER_SUFFIX = 'Mapper';
var hasOwnProperty = Object.hasOwnProperty;

var ItemController =
/*#__PURE__*/
function () {
  function ItemController(graph) {
    this.graph = graph;
  }

  var _proto = ItemController.prototype;

  _proto.addItem = function addItem(type, model) {
    var graph = this.graph;
    var parent = graph.get(type + 'Group') || graph.get('group');
    var upperType = Util.upperFirst(type);
    var item;
    var styles = graph.get(type + 'Style') || {};
    var defaultModel = graph.get(CFG_PREFIX + upperType);
    var mapper = graph.get(type + MAPPER_SUFFIX);

    if (mapper) {
      var mappedModel = mapper(model);

      if (mappedModel.styles) {
        styles = mappedModel.styles;
        delete mappedModel.styles;
      }

      Util.each(mappedModel, function (val, cfg) {
        model[cfg] = val;
      });
    } else if (defaultModel) {
      // 很多布局会直接修改原数据模型，所以不能用 merge 的形式，逐个写入原 model 中
      Util.each(defaultModel, function (val, cfg) {
        if (!hasOwnProperty.call(model, cfg)) {
          if (Util.isObject(val)) {
            model[cfg] = Util.clone(val);
          } else {
            model[cfg] = defaultModel[cfg];
          }
        }
      });
    }

    graph.emit('beforeadditem', {
      type: type,
      model: model
    });

    if (type === EDGE) {
      var source = model.source;
      var target = model.target;

      if (source && Util.isString(source)) {
        source = graph.findById(source);
      }

      if (target && Util.isString(target)) {
        target = graph.findById(target);
      }

      if (!source || !target) {
        console.warn('The source or target node of edge ' + model.id + ' does not exist!');
        return;
      }

      item = new Item[upperType]({
        model: model,
        source: source,
        target: target,
        styles: styles,
        linkCenter: graph.get('linkCenter'),
        group: parent.addGroup()
      });
    } else {
      item = new Item[upperType]({
        model: model,
        styles: styles,
        group: parent.addGroup()
      });
    }

    graph.get(type + 's').push(item);
    graph.get('itemMap')[item.get('id')] = item;
    graph.autoPaint();
    graph.emit('afteradditem', {
      item: item,
      model: model
    });
    return item;
  };

  _proto.updateItem = function updateItem(item, cfg) {
    var graph = this.graph;

    if (Util.isString(item)) {
      item = graph.findById(item);
    }

    if (!item || item.destroyed) {
      return;
    } // 如果修改了与映射属性有关的数据项，映射的属性相应也需要变化


    var mapper = graph.get(item.getType() + MAPPER_SUFFIX);

    if (mapper) {
      var newModel = Util.mix({}, item.getModel(), cfg);
      var mappedModel = mapper(newModel);

      if (mappedModel.styles) {
        item.set('styles', mappedModel.styles);
        delete mappedModel.styles;
      }

      Util.each(mappedModel, function (val, key) {
        cfg[key] = val;
      });
    }

    graph.emit('beforeupdateitem', {
      item: item,
      cfg: cfg
    });

    if (item.getType() === EDGE) {
      // 若是边要更新source || target, 为了不影响示例内部model，并且重新计算startPoint和endPoint，手动设置
      if (cfg.source) {
        var source = cfg.source;

        if (Util.isString(source)) {
          source = graph.findById(source);
        }

        item.setSource(source);
      }

      if (cfg.target) {
        var target = cfg.target;

        if (Util.isString(target)) {
          target = graph.findById(target);
        }

        item.setTarget(target);
      }
    }

    item.update(cfg);

    if (item.getType() === NODE) {
      var autoPaint = graph.get('autoPaint');
      graph.setAutoPaint(false);
      Util.each(item.getEdges(), function (edge) {
        graph.refreshItem(edge);
      });
      graph.setAutoPaint(autoPaint);
    }

    graph.autoPaint();
    graph.emit('afterupdateitem', {
      item: item,
      cfg: cfg
    });
  };

  _proto.removeItem = function removeItem(item) {
    var graph = this.graph;

    if (Util.isString(item)) {
      item = graph.findById(item);
    }

    if (!item || item.destroyed) {
      return;
    }

    graph.emit('beforeremoveitem', {
      item: item
    });
    var type = item.getType();
    var items = graph.get(item.getType() + 's');
    var index = items.indexOf(item);
    items.splice(index, 1);
    delete graph.get('itemMap')[item.get('id')];

    if (type === NODE) {
      // 若移除的是节点，需要将与之相连的边一同删除
      var edges = item.getEdges();

      for (var i = edges.length; i >= 0; i--) {
        graph.removeItem(edges[i]);
      }
    }

    item.destroy();
    graph.autoPaint();
    graph.emit('afterremoveitem', {
      item: item
    });
  };

  _proto.setItemState = function setItemState(item, state, enabled) {
    var graph = this.graph;

    if (item.hasState(state) === enabled) {
      return;
    }

    graph.emit('beforeitemstatechange', {
      item: item,
      state: state,
      enabled: enabled
    });
    item.setState(state, enabled);
    graph.autoPaint();
    graph.emit('afteritemstatechange', {
      item: item,
      state: state,
      enabled: enabled
    });
  };

  _proto.clearItemStates = function clearItemStates(item, states) {
    var graph = this.graph;

    if (Util.isString(item)) {
      item = graph.findById(item);
    }

    graph.emit('beforeitemstatesclear', {
      item: item,
      states: states
    });
    item.clearStates(states);
    graph.autoPaint();
    graph.emit('afteritemstatesclear', {
      item: item,
      states: states
    });
  };

  _proto.refreshItem = function refreshItem(item) {
    var graph = this.graph;

    if (Util.isString(item)) {
      item = graph.findById(item);
    }

    graph.emit('beforeitemrefresh', {
      item: item
    });
    item.refresh();
    graph.autoPaint();
    graph.emit('afteritemrefresh', {
      item: item
    });
  };

  _proto.changeItemVisibility = function changeItemVisibility(item, visible) {
    var self = this;
    var graph = self.graph;

    if (Util.isString(item)) {
      item = graph.findById(item);
    }

    graph.emit('beforeitemvisibilitychange', {
      item: item,
      visible: visible
    });
    item.changeVisibility(visible);

    if (item.getType() === NODE) {
      var autoPaint = graph.get('autoPaint');
      graph.setAutoPaint(false);
      Util.each(item.getEdges(), function (edge) {
        // 若隐藏节点，则将与之关联的边也隐藏
        // 若显示节点，则将与之关联的边也显示，但是需要判断边两端的节点都是可见的
        if (visible && !(edge.get('source').isVisible() && edge.get('target').isVisible())) {
          return;
        }

        self.changeItemVisibility(edge, visible);
      });
      graph.setAutoPaint(autoPaint);
    }

    graph.autoPaint();
    graph.emit('afteritemvisibilitychange', {
      item: item,
      visible: visible
    });
  };

  _proto.destroy = function destroy() {
    this.graph = null;
    this.destroyed = true;
  };

  return ItemController;
}();

module.exports = ItemController;

/***/ }),

/***/ "./src/graph/controller/mode.js":
/*!**************************************!*\
  !*** ./src/graph/controller/mode.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileOverview mode
 * @author wuyue.lwy <wyueliu@gmail.com>
 */
var Util = __webpack_require__(/*! ../../util */ "./src/util/index.js");

var Behavior = __webpack_require__(/*! ../../behavior */ "./src/behavior/index.js");

function mergeBehaviors(modeBehaviors, behaviors) {
  Util.each(behaviors, function (behavior) {
    if (modeBehaviors.indexOf(behavior) < 0) {
      if (Util.isString(behavior)) {
        behavior = {
          type: behavior
        };
      }

      modeBehaviors.push(behavior);
    }
  });
  return modeBehaviors;
}

function filterBehaviors(modeBehaviors, behaviors) {
  var result = [];
  modeBehaviors.forEach(function (behavior) {
    if (behaviors.indexOf(behavior.type) < 0) {
      result.push(behavior);
    }
  });
  return result;
}

var Mode =
/*#__PURE__*/
function () {
  function Mode(graph) {
    this.graph = graph;
    this.modes = graph.get('modes') || {
      "default": []
    };

    this._formatModes();

    this.mode = graph.get('defaultMode') || 'default';
    this.currentBehaves = [];
    this.setMode(this.mode);
  }

  var _proto = Mode.prototype;

  _proto._formatModes = function _formatModes() {
    var modes = this.modes;
    Util.each(modes, function (mode) {
      Util.each(mode, function (behavior, i) {
        if (Util.isString(behavior)) {
          mode[i] = {
            type: behavior
          };
        }
      });
    });
  };

  _proto.setMode = function setMode(mode) {
    var modes = this.modes;
    var graph = this.graph;
    var behaviors = modes[mode];

    if (!behaviors) {
      return;
    }

    graph.emit('beforemodechange', {
      mode: mode
    });
    Util.each(this.currentBehaves, function (behave) {
      behave.unbind(graph);
    });

    this._setBehaviors(mode);

    graph.emit('aftermodechange', {
      mode: mode
    });
    this.mode = mode;
    return this;
  };

  _proto.manipulateBehaviors = function manipulateBehaviors(behaviors, modes, add) {
    var self = this;

    if (!Util.isArray(behaviors)) {
      behaviors = [behaviors];
    }

    if (Util.isArray(modes)) {
      Util.each(modes, function (mode) {
        if (!self.modes[mode]) {
          if (add) {
            self.modes[mode] = [].concat(behaviors);
          }
        } else {
          if (add) {
            self.modes[mode] = mergeBehaviors(self.modes[mode], behaviors);
          } else {
            self.modes[mode] = filterBehaviors(self.modes[mode], behaviors);
          }
        }
      });
      return this;
    }

    if (!modes) {
      modes = this.mode;
    }

    if (add) {
      self.modes[modes] = mergeBehaviors(self.modes[modes], behaviors);
    } else {
      self.modes[modes] = filterBehaviors(self.modes[modes], behaviors);
    }

    self.setMode(this.mode);
    return this;
  };

  _proto._setBehaviors = function _setBehaviors(mode) {
    var graph = this.graph;
    var behaviors = this.modes[mode];
    var behaves = [];
    var behave;
    Util.each(behaviors, function (behavior) {
      if (!Behavior.getBehavior(behavior.type)) {
        return;
      }

      behave = new (Behavior.getBehavior(behavior.type))(behavior);
      behave && behave.bind(graph);
      behaves.push(behave);
    });
    this.currentBehaves = behaves;
  };

  _proto.destroy = function destroy() {
    this.graph = null;
    this.modes = null;
    this.currentBehaves = null;
    this.destroyed = true;
  };

  return Mode;
}();

module.exports = Mode;

/***/ }),

/***/ "./src/graph/controller/state.js":
/*!***************************************!*\
  !*** ./src/graph/controller/state.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(/*! ../../util */ "./src/util/index.js");

var TIME_OUT = 16;
var timer = null;

var State =
/*#__PURE__*/
function () {
  function State(graph) {
    this.graph = graph;
    this.cachedStates = {
      enabled: {},
      disabled: {}
    };
  }

  var _proto = State.prototype;

  _proto.updateState = function updateState(item, state, enabled) {
    if (item.destroyed) {
      return;
    }

    var self = this;
    var cachedStates = self.cachedStates;
    var enabledStates = cachedStates.enabled;
    var disabledStates = cachedStates.disabled;

    if (enabled) {
      self._checkCache(item, state, disabledStates);

      self._cacheState(item, state, enabledStates);
    } else {
      self._checkCache(item, state, enabledStates);

      self._cacheState(item, state, disabledStates);
    }

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(function () {
      timer = null;
      self.updateGraphStates();
    }, TIME_OUT);
  };

  _proto._checkCache = function _checkCache(item, state, cache) {
    if (!cache[state]) {
      return;
    }

    var index = cache[state].indexOf(item);

    if (index >= 0) {
      cache[state].splice(index, 1);
    }
  };

  _proto._cacheState = function _cacheState(item, state, states) {
    if (!states[state]) {
      states[state] = [];
    }

    states[state].push(item);
  };

  _proto.updateGraphStates = function updateGraphStates() {
    var states = this.graph.get('states');
    var cachedStates = this.cachedStates;
    Util.each(cachedStates.disabled, function (val, key) {
      if (states[key]) {
        states[key] = states[key].filter(function (item) {
          return val.indexOf(item) < 0 && !val.destroyed;
        });
      }
    });
    Util.each(cachedStates.enabled, function (val, key) {
      if (!states[key]) {
        states[key] = val;
      } else {
        var map = {};
        states[key].forEach(function (item) {
          if (!item.destroyed) {
            map[item.get('id')] = true;
          }
        });
        val.forEach(function (item) {
          var id = item.get('id');

          if (!map[id] && !item.destroyed) {
            map[id] = true;
            states[key].push(item);
          }
        });
      }
    });
    this.graph.emit('graphstatechange', {
      states: states
    });
    this.cachedStates = {
      enabled: {},
      disabled: {}
    };
  };

  _proto.destroy = function destroy() {
    this.graph = null;
    this.cachedStates = null;

    if (timer) {
      clearTimeout(timer);
    }

    timer = null;
    this.destroyed = true;
  };

  return State;
}();

module.exports = State;

/***/ }),

/***/ "./src/graph/controller/view.js":
/*!**************************************!*\
  !*** ./src/graph/controller/view.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileOverview graph fit canvas
 * @author huangtonger@aliyun.com
 */
var Util = __webpack_require__(/*! ../../util */ "./src/util/index.js");

var View =
/*#__PURE__*/
function () {
  function View(graph) {
    this.graph = graph;
  }

  var _proto = View.prototype;

  _proto.getFormatPadding = function getFormatPadding() {
    return Util.formatPadding(this.graph.get('fitViewPadding'));
  };

  _proto._fitView = function _fitView() {
    var padding = this.getFormatPadding();
    var graph = this.graph;
    var group = graph.get('group');
    var width = graph.get('width');
    var height = graph.get('height');
    group.resetMatrix();
    var bbox = group.getBBox();

    var viewCenter = this._getViewCenter();

    var groupCenter = {
      x: bbox.x + bbox.width / 2,
      y: bbox.y + bbox.height / 2
    };
    graph.translate(viewCenter.x - groupCenter.x, viewCenter.y - groupCenter.y);
    var w = (width - padding[1] - padding[3]) / bbox.width;
    var h = (height - padding[0] - padding[2]) / bbox.height;
    var ratio = w;

    if (w > h) {
      ratio = h;
    }

    graph.zoom(ratio, viewCenter);
  };

  _proto.focusPoint = function focusPoint(point) {
    var viewCenter = this._getViewCenter();

    var modelCenter = this.getPointByCanvas(viewCenter.x, viewCenter.y);
    var viewportMatrix = this.graph.get('group').getMatrix();
    this.graph.translate((modelCenter.x - point.x) * viewportMatrix[0], (modelCenter.y - point.y) * viewportMatrix[4]);
  };

  _proto.getPointByClient = function getPointByClient(clientX, clientY) {
    var canvas = this.graph.get('canvas');
    var pixelRatio = canvas.get('pixelRatio');
    var canvasPoint = canvas.getPointByClient(clientX, clientY);
    return this.getPointByCanvas(canvasPoint.x / pixelRatio, canvasPoint.y / pixelRatio);
  };

  _proto.getClientByPoint = function getClientByPoint(x, y) {
    var canvas = this.graph.get('canvas');
    var canvasPoint = this.getCanvasByPoint(x, y);
    var pixelRatio = canvas.get('pixelRatio');
    var point = canvas.getClientByPoint(canvasPoint.x * pixelRatio, canvasPoint.y * pixelRatio);
    return {
      x: point.clientX,
      y: point.clientY
    };
  };

  _proto.getPointByCanvas = function getPointByCanvas(canvasX, canvasY) {
    var viewportMatrix = this.graph.get('group').getMatrix();
    var point = Util.invertMatrix({
      x: canvasX,
      y: canvasY
    }, viewportMatrix);
    return point;
  };

  _proto.getCanvasByPoint = function getCanvasByPoint(x, y) {
    var viewportMatrix = this.graph.get('group').getMatrix();
    return Util.applyMatrix({
      x: x,
      y: y
    }, viewportMatrix);
  };

  _proto.focus = function focus(item) {
    if (Util.isString(item)) {
      item = this.graph.findById[item];
    }

    if (item) {
      var matrix = item.get('group').getMatrix(); // 用实际位置而不是model中的x,y,防止由于拖拽等的交互导致model的x,y并不是当前的x,y

      this.focusPoint({
        x: matrix[6],
        y: matrix[7]
      });
    }
  };

  _proto.changeSize = function changeSize(width, height) {
    if (!Util.isNumber(width) || !Util.isNumber(height)) {
      throw Error('invalid canvas width & height');
    }

    var graph = this.graph;
    graph.set({
      width: width,
      height: height
    });
    var canvas = this.graph.get('canvas');
    canvas.changeSize(width, height);
  };

  _proto._getViewCenter = function _getViewCenter() {
    var padding = this.getFormatPadding();
    var graph = this.graph;
    var width = this.graph.get('width');
    var height = graph.get('height');
    return {
      x: (width - padding[2] - padding[3]) / 2 + padding[3],
      y: (height - padding[0] - padding[2]) / 2 + padding[0]
    };
  };

  _proto.destroy = function destroy() {
    this.graph = null;
    this.destroyed = true;
  };

  return View;
}();

module.exports = View;

/***/ }),

/***/ "./src/graph/graph.js":
/*!****************************!*\
  !*** ./src/graph/graph.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/**
 * @fileOverview graph
 * @author huangtonger@aliyun.com
 */
var G = __webpack_require__(/*! @antv/g/lib */ "./node_modules/@antv/g/lib/index.js");

var EventEmitter = G.EventEmitter;

var Util = __webpack_require__(/*! ../util */ "./src/util/index.js");

var Global = __webpack_require__(/*! ../global */ "./src/global.js");

var Controller = __webpack_require__(/*! ./controller */ "./src/graph/controller/index.js");

var NODE = 'node';
var EDGE = 'edge';

var Graph =
/*#__PURE__*/
function (_EventEmitter) {
  _inheritsLoose(Graph, _EventEmitter);

  var _proto = Graph.prototype;

  /**
   * Access to the default configuration properties
   * @return {object} default configuration
   */
  _proto.getDefaultCfg = function getDefaultCfg() {
    return {
      /**
       * Container could be dom object or dom id
       * @type {object|string|undefined}
       */
      container: undefined,

      /**
       * Canvas width
       * @type {number|undefined}
       * unit pixel if undefined force fit width
       */
      width: undefined,

      /**
       * Canvas height
       * @type {number|undefined}
       * unit pixel if undefined force fit height
       */
      height: undefined,

      /**
       * renderer canvas or svg
       * @type {string}
       */
      renderer: 'canvas',

      /**
       * control graph behaviors
       * @type Array
       */
      mode: [],

      /**
       * 注册插件
       */
      plugins: [],

      /**
       * source data
       * @type object
       */
      data: null,

      /**
       * Fit view padding (client scale)
       * @type {number|array}
       */
      fitViewPadding: 10,

      /**
       * Minimum scale size
       * @type {number}
       */
      minZoom: 0.2,

      /**
       * Maxmum scale size
       * @type {number}
       */
      maxZoom: 10,

      /**
       *  capture events
       *  @type boolean
       */
      event: true,

      /**
       * group node & edges into different graphic groups
       * @private
       * @type boolean
       */
      groupByTypes: true,

      /**
       * determine if it's a directed graph
       * @type boolean
       */
      directed: false,

      /**
       * when data or shape changed, should canvas draw automatically
       * @type boolean
       */
      autoPaint: true,

      /**
       * store all the node instances
       * @type [object]
       */
      nodes: [],

      /**
       * store all the edge instances
       * @type [object]
       */
      edges: [],

      /**
       * all the instances indexed by id
       * @type object
       */
      itemMap: {},

      /**
       * 边直接连接到节点的中心，不再考虑锚点
       * @type {Boolean}
       */
      linkCenter: false,

      /**
       * 默认的节点配置，data 上定义的配置会覆盖这些配置。例如：
       * defaultNode: {
       *  shape: 'rect',
       *  size: [60, 40]
       * }
       * 若数据项为 { id: 'node', x: 100, y: 100 }
       * 实际创建的节点模型是 { id: 'node', x: 100, y: 100， shape: 'rect', size: [60, 40] }
       * 若数据项为 { id: 'node', x: 100, y: 100, shape: 'circle' }
       * 实际创建的节点模型是 { id: 'node', x: 100, y: 100， shape: 'circle', size: [60, 40] }
       */
      defaultNode: {},

      /**
       * 默认边配置，data 上定义的配置会覆盖这些配置。用法同 defaultNode
       */
      defaultEdge: {},

      /**
       * 节点默认样式，也可以添加状态样式
       * 例如：
       * const graph = new G6.Graph({
       *  nodeStyle: {
       *    default: { fill: '#fff' },
       *    selected: { fill: '#ccc', stroke: '#666' },
       *    active: { lineWidth: 2 }
       *  },
       *  ...
       * });
       *
       */
      nodeStyle: {},

      /**
       * 边默认样式，用法同nodeStyle
       */
      edgeStyle: {},

      /**
       * graph 状态
       */
      states: {},

      /**
       * 是否启用全局动画
       * @type {Boolean}
       */
      animate: false,

      /**
       * 动画设置,仅在 animate 为 true 时有效
       * @type {Object}
       */
      animateCfg: {
        /**
         * 帧回调函数，用于自定义节点运动路径，为空时线性运动
         * @type {Function|null}
         */
        onFrame: null,

        /**
         * 动画时长(ms)
         * @type {Number}
         */
        duration: 500,

        /**
         * 指定动画动效
         * @type {String}
         */
        easing: 'easeLinear'
      },
      callback: null
    };
  };

  function Graph(inputCfg) {
    var _this;

    _this = _EventEmitter.call(this) || this;
    _this._cfg = Util.deepMix(_this.getDefaultCfg(), inputCfg); // merge graph configs

    _this._init();

    return _this;
  }

  _proto._init = function _init() {
    this._initCanvas();

    var eventController = new Controller.Event(this);
    var viewController = new Controller.View(this);
    var modeController = new Controller.Mode(this);
    var itemController = new Controller.Item(this);
    var stateController = new Controller.State(this);
    this.set({
      eventController: eventController,
      viewController: viewController,
      modeController: modeController,
      itemController: itemController,
      stateController: stateController
    });

    this._initPlugins();
  };

  _proto._initCanvas = function _initCanvas() {
    var container = this.get('container');

    if (Util.isString(container)) {
      container = document.getElementById(container);
      this.set('container', container);
    }

    if (!container) {
      throw Error('invalid container');
    }

    var canvas = new G.Canvas({
      containerDOM: container,
      width: this.get('width'),
      height: this.get('height'),
      renderer: this.get('renderer'),
      pixelRatio: this.get('pixelRatio')
    });
    this.set('canvas', canvas);

    this._initGroups();
  };

  _proto._initGroups = function _initGroups() {
    var canvas = this.get('canvas');
    var id = this.get('canvas').get('el').id;
    var group = canvas.addGroup({
      id: id + '-root',
      className: Global.rootContainerClassName
    });

    if (this.get('groupByTypes')) {
      var edgeGroup = group.addGroup({
        id: id + '-edge',
        className: Global.edgeContainerClassName
      });
      var nodeGroup = group.addGroup({
        id: id + '-node',
        className: Global.nodeContainerClassName
      });
      this.set({
        nodeGroup: nodeGroup,
        edgeGroup: edgeGroup
      });
    }

    this.set('group', group);
  };

  _proto._initPlugins = function _initPlugins() {
    var self = this;
    Util.each(self.get('plugins'), function (plugin) {
      if (!plugin.destroyed && plugin.initPlugin) {
        plugin.initPlugin(self);
      }
    });
  };

  _proto.get = function get(key) {
    return this._cfg[key];
  };

  _proto.set = function set(key, val) {
    if (Util.isPlainObject(key)) {
      this._cfg = Util.mix({}, this._cfg, key);
    } else {
      this._cfg[key] = val;
    }

    return this;
  }
  /**
   * 更新元素
   * @param {string|object} item 元素id或元素实例
   * @param {object} cfg 需要更新的数据
   */
  ;

  _proto.update = function update(item, cfg) {
    this.updateItem(item, cfg);
  }
  /**
   * 更新元素
   * @param {string|object} item 元素id或元素实例
   * @param {object} cfg 需要更新的数据
   */
  ;

  _proto.updateItem = function updateItem(item, cfg) {
    this.get('itemController').updateItem(item, cfg);
  }
  /**
   * 设置元素状态
   * @param {string|object} item 元素id或元素实例
   * @param {string} state 状态
   * @param {boolean} enabled 是否启用状态
   */
  ;

  _proto.setItemState = function setItemState(item, state, enabled) {
    if (Util.isString(item)) {
      item = this.findById(item);
    }

    this.get('itemController').setItemState(item, state, enabled);
    this.get('stateController').updateState(item, state, enabled);
  }
  /**
   * 清理元素多个状态
   * @param {string|object} item 元素id或元素实例
   * @param {Array|String|null} states 状态
   */
  ;

  _proto.clearItemStates = function clearItemStates(item, states) {
    this.get('itemController').clearItemStates(item, states);
  }
  /**
   * 新增元素
   * @param {string} type 元素类型(node | edge)
   * @param {object} model 元素数据模型
   * @return {object} 元素实例
   */
  ;

  _proto.add = function add(type, model) {
    return this.addItem(type, model);
  }
  /**
   * 新增元素
   * @param {string} type 元素类型(node | edge)
   * @param {object} model 元素数据模型
   * @return {object} 元素实例
   */
  ;

  _proto.addItem = function addItem(type, model) {
    return this.get('itemController').addItem(type, model);
  }
  /**
   * 删除元素
   * @param {string|object} item 元素id或元素实例
   */
  ;

  _proto.remove = function remove(item) {
    this.removeItem(item);
  }
  /**
   * 删除元素
   * @param {string|object} item 元素id或元素实例
   */
  ;

  _proto.removeItem = function removeItem(item) {
    this.get('itemController').removeItem(item);
  }
  /**
   * 设置视图初始化数据
   * @param {object} data 初始化数据
   */
  ;

  _proto.data = function data(_data) {
    this.set('data', _data);
  }
  /**
   * 设置各个节点样式，以及在各种状态下节点 keyShape 的样式。
   * 若是自定义节点切在各种状态下
   * graph.node(node => {
   *  return {
   *    default: {
   *      fill: 'red',
   *      opacity: 1
   *    },
   *    selected: {
   *      style: {
   *        fill: 'blue',
   *        opacity: 0.2
   *      }
   *    }
   *  }
   * });
   * @param {function} nodeFn 指定每个节点样式
   */
  ;

  _proto.node = function node(nodeFn) {
    if (typeof nodeFn === 'function') {
      this.set('nodeMapper', nodeFn);
    }
  }
  /**
   * 设置各个边样式
   * @param {function} edgeFn 指定每个边的样式,用法同 node
   */
  ;

  _proto.edge = function edge(edgeFn) {
    if (typeof edgeFn === 'function') {
      this.set('edgeMapper', edgeFn);
    }
  }
  /**
   * 刷新元素
   * @param {string|object} item 元素id或元素实例
   */
  ;

  _proto.refreshItem = function refreshItem(item) {
    this.get('itemController').refreshItem(item);
  }
  /**
   * 当源数据在外部发生变更时，根据新数据刷新视图。但是不刷新节点位置
   */
  ;

  _proto.refresh = function refresh() {
    var self = this;
    var autoPaint = self.get('autoPaint');
    self.setAutoPaint(false);
    self.emit('beforegraphrefresh');

    if (self.get('animate')) {
      self.positionsAnimate();
    } else {
      var nodes = self.get('nodes');
      var edges = self.get('edges');
      Util.each(nodes, function (node) {
        node.refresh();
      });
      Util.each(edges, function (edge) {
        edge.refresh();
      });
    }

    self.setAutoPaint(autoPaint);
    self.emit('aftergraphrefresh');
    self.autoPaint();
  }
  /**
   * 当节点位置在外部发生改变时，刷新所有节点位置，重计算边
   */
  ;

  _proto.refreshPositions = function refreshPositions() {
    var self = this;
    self.emit('beforegraphrefreshposition');
    var nodes = self.get('nodes');
    var edges = self.get('edges');
    var model;
    Util.each(nodes, function (node) {
      model = node.getModel();
      node.updatePosition(model);
    });
    Util.each(edges, function (edge) {
      edge.refresh();
    });
    self.emit('aftergraphrefreshposition');
    self.autoPaint();
  }
  /**
   * 根据data接口的数据渲染视图
   */
  ;

  _proto.render = function render() {
    var self = this;
    var data = this.get('data');

    if (!data) {
      throw new Error('data must be defined first');
    }

    this.clear();
    this.emit('beforerender');
    var autoPaint = this.get('autoPaint');
    this.setAutoPaint(false);
    Util.each(data.nodes, function (node) {
      self.add(NODE, node);
    });
    Util.each(data.edges, function (edge) {
      self.add(EDGE, edge);
    });

    if (self.get('fitView')) {
      self.get('viewController')._fitView();
    }

    self.paint();
    self.setAutoPaint(autoPaint);
    self.emit('afterrender');
  }
  /**
   * 接收数据进行渲染
   * @Param {Object} data 初始化数据
   */
  ;

  _proto.read = function read(data) {
    this.data(data);
    this.render();
  }
  /**
   * 更改源数据，根据新数据重新渲染视图
   * @param {object} data 源数据
   * @return {object} this
   */
  ;

  _proto.changeData = function changeData(data) {
    var self = this;

    if (!data) {
      return this;
    }

    if (!self.get('data')) {
      self.data(data);
      self.render();
    }

    var autoPaint = this.get('autoPaint');
    var itemMap = this.get('itemMap');
    var items = {
      nodes: [],
      edges: []
    };
    this.setAutoPaint(false);

    this._diffItems(NODE, items, data.nodes);

    this._diffItems(EDGE, items, data.edges);

    Util.each(itemMap, function (item, id) {
      if (items.nodes.indexOf(item) < 0 && items.edges.indexOf(item) < 0) {
        delete itemMap[id];
        self.remove(item);
      }
    });
    this.set({
      nodes: items.nodes,
      edges: items.edges
    });

    if (self.get('animate')) {
      self.positionsAnimate();
    } else {
      this.paint();
    }

    this.setAutoPaint(autoPaint);
    return this;
  };

  _proto._diffItems = function _diffItems(type, items, models) {
    var self = this;
    var item;
    var itemMap = this.get('itemMap');
    Util.each(models, function (model) {
      item = itemMap[model.id];

      if (item) {
        if (self.get('animate') && type === NODE) {
          var containerMatrix = item.getContainer().getMatrix();
          item.set('originAttrs', {
            x: containerMatrix[6],
            y: containerMatrix[7]
          });
        }

        self.updateItem(item, model);
      } else {
        item = self.addItem(type, model);
      }

      items[type + 's'].push(item);
    });
  }
  /**
   * 仅画布重新绘制
   */
  ;

  _proto.paint = function paint() {
    this.emit('beforepaint');
    this.get('canvas').draw();
    this.emit('afterpaint');
  }
  /**
   * 自动重绘
   * @internal 仅供内部更新机制调用，外部根据需求调用 render 或 paint 接口
   */
  ;

  _proto.autoPaint = function autoPaint() {
    if (this.get('autoPaint')) {
      this.paint();
    }
  }
  /**
   * 导出图数据
   * @return {object} data
   */
  ;

  _proto.save = function save() {
    var nodes = [];
    var edges = [];
    Util.each(this.get('nodes'), function (node) {
      nodes.push(node.getModel());
    });
    Util.each(this.get('edges'), function (edge) {
      edges.push(edge.getModel());
    });
    return {
      nodes: nodes,
      edges: edges
    };
  }
  /**
   * 改变画布大小
   * @param  {number} width  画布宽度
   * @param  {number} height 画布高度
   * @return {object} this
   */
  ;

  _proto.changeSize = function changeSize(width, height) {
    this.set('width', width);
    this.set('height', height);
    this.get('viewController').changeSize(width, height);
    this.fitView();
    return this;
  }
  /**
   * 平移画布
   * @param {number} dx 水平方向位移
   * @param {number} dy 垂直方向位移
   */
  ;

  _proto.translate = function translate(dx, dy) {
    var group = this.get('group');
    group.translate(dx, dy);
    this.emit('viewportchange', {
      action: 'translate',
      matrix: group.getMatrix()
    });
    this.autoPaint();
  }
  /**
   * 平移画布到某点
   * @param {number} x 水平坐标
   * @param {number} y 垂直坐标
   */
  ;

  _proto.moveTo = function moveTo(x, y) {
    var group = this.get('group');
    group.move(x, y);
    this.emit('viewportchange', {
      action: 'move',
      matrix: group.getMatrix()
    });
    this.autoPaint();
  }
  /**
   * 调整视口适应视图
   * @param {object} padding 四周围边距
   */
  ;

  _proto.fitView = function fitView(padding) {
    if (padding) {
      this.set('fitViewPadding', padding);
    }

    this.get('viewController')._fitView();

    this.autoPaint();
  }
  /**
   * 新增行为
   * @param {string|array} behaviors 添加的行为
   * @param {string|array} modes 添加到对应的模式
   * @return {object} this
   */
  ;

  _proto.addBehaviors = function addBehaviors(behaviors, modes) {
    this.get('modeController').manipulateBehaviors(behaviors, modes, true);
    return this;
  }
  /**
   * 移除行为
   * @param {string|array} behaviors 移除的行为
   * @param {string|array} modes 从指定的模式中移除
   * @return {object} this
   */
  ;

  _proto.removeBehaviors = function removeBehaviors(behaviors, modes) {
    this.get('modeController').manipulateBehaviors(behaviors, modes, false);
    return this;
  }
  /**
   * 切换行为模式
   * @param {string} mode 指定模式
   * @return {object} this
   */
  ;

  _proto.setMode = function setMode(mode) {
    this.set('mode', mode);
    this.get('modeController').setMode(mode);
    return this;
  }
  /**
   * 获取当前的行为模式
   * @return {string} 当前行为模式
   */
  ;

  _proto.getCurrentMode = function getCurrentMode() {
    return this.get('mode');
  }
  /**
   * 获取当前视口伸缩比例
   * @return {number} 比例
   */
  ;

  _proto.getZoom = function getZoom() {
    return this.get('group').getMatrix()[0];
  }
  /**
   * 获取当前图中所有节点的item实例
   * @return {array} item数组
   */
  ;

  _proto.getNodes = function getNodes() {
    return this.get('nodes');
  }
  /**
   * 获取当前图中所有边的item实例
   * @return {array} item数组
   */
  ;

  _proto.getEdges = function getEdges() {
    return this.get('edges');
  }
  /**
   * 伸缩视口
   * @param {number} ratio 伸缩比例
   * @param {object} center 以center的x, y坐标为中心缩放
   */
  ;

  _proto.zoom = function zoom(ratio, center) {
    var matrix = Util.clone(this.get('group').getMatrix());
    var minZoom = this.get('minZoom');
    var maxZoom = this.get('maxZoom');

    if (center) {
      Util.mat3.translate(matrix, matrix, [-center.x, -center.y]);
      Util.mat3.scale(matrix, matrix, [ratio, ratio]);
      Util.mat3.translate(matrix, matrix, [center.x, center.y]);
    } else {
      Util.mat3.scale(matrix, matrix, [ratio, ratio]);
    }

    if (minZoom && matrix[0] < minZoom) {
      return;
    }

    if (maxZoom && matrix[0] > maxZoom) {
      return;
    }

    this.get('group').setMatrix(matrix);
    this.emit('viewportchange', {
      action: 'zoom',
      matrix: matrix
    });
    this.autoPaint();
  }
  /**
   * 伸缩视口到一固定比例
   * @param {number} toRatio 伸缩比例
   * @param {object} center 以center的x, y坐标为中心缩放
   */
  ;

  _proto.zoomTo = function zoomTo(toRatio, center) {
    var ratio = toRatio / this.getZoom();
    this.zoom(ratio, center);
  }
  /**
   * 根据 graph 上的 animateCfg 进行视图中节点位置动画接口
   */
  ;

  _proto.positionsAnimate = function positionsAnimate() {
    var self = this;
    self.emit('beforeanimate');
    var animateCfg = self.get('animateCfg');
    var _onFrame = animateCfg.onFrame;
    var nodes = self.getNodes();
    var toNodes = nodes.map(function (node) {
      var model = node.getModel();
      return {
        id: model.id,
        x: model.x,
        y: model.y
      };
    });

    if (self.isAnimating()) {
      self.stopAnimate();
    }

    self.get('canvas').animate({
      onFrame: function onFrame(ratio) {
        Util.each(toNodes, function (data) {
          var node = self.findById(data.id);

          if (!node || node.destroyed) {
            return;
          }

          var originAttrs = node.get('originAttrs');
          var model = node.get('model');

          if (!originAttrs) {
            var containerMatrix = node.getContainer().getMatrix();
            originAttrs = {
              x: containerMatrix[6],
              y: containerMatrix[7]
            };
            node.set('originAttrs', originAttrs);
          }

          if (_onFrame) {
            var attrs = _onFrame(node, ratio, data, originAttrs);

            node.set('model', Util.mix(model, attrs));
          } else {
            model.x = originAttrs.x + (data.x - originAttrs.x) * ratio;
            model.y = originAttrs.y + (data.y - originAttrs.y) * ratio;
          }
        });
        self.refreshPositions();
      }
    }, animateCfg.duration, animateCfg.easing, function () {
      Util.each(nodes, function (node) {
        node.set('originAttrs', null);
      });

      if (animateCfg.callback) {
        animateCfg.callback();
      }

      self.emit('afteranimate');
      self.animating = false;
    });
  };

  _proto.stopAnimate = function stopAnimate() {
    this.get('canvas').stopAnimate();
  };

  _proto.isAnimating = function isAnimating() {
    return this.animating;
  }
  /**
   * 将元素移动到视口中心
   * @param {string|object} item 指定元素
   */
  ;

  _proto.focusItem = function focusItem(item) {
    this.get('viewController').focus(item);
    this.autoPaint();
  }
  /**
   * 将屏幕坐标转换为视口坐标
   * @param {number} clientX 屏幕x坐标
   * @param {number} clientY 屏幕y坐标
   * @return {object} 视口坐标
   */
  ;

  _proto.getPointByClient = function getPointByClient(clientX, clientY) {
    return this.get('viewController').getPointByClient(clientX, clientY);
  }
  /**
   * 将视口坐标转换为屏幕坐标
   * @param {number} x 视口x坐标
   * @param {number} y 视口y坐标
   * @return {object} 视口坐标
   */
  ;

  _proto.getClientByPoint = function getClientByPoint(x, y) {
    return this.get('viewController').getClientByPoint(x, y);
  }
  /**
   * 将画布坐标转换为视口坐标
   * @param {number} canvasX 屏幕x坐标
   * @param {number} canvasY 屏幕y坐标
   * @return {object} 视口坐标
   */
  ;

  _proto.getPointByCanvas = function getPointByCanvas(canvasX, canvasY) {
    return this.get('viewController').getPointByCanvas(canvasX, canvasY);
  }
  /**
   * 将视口坐标转换为画布坐标
   * @param {number} x 屏幕x坐标
   * @param {number} y 屏幕y坐标
   * @return {object} 画布坐标
   */
  ;

  _proto.getCanvasByPoint = function getCanvasByPoint(x, y) {
    return this.get('viewController').getCanvasByPoint(x, y);
  }
  /**
   * 显示元素
   * @param {string|object} item 指定元素
   */
  ;

  _proto.showItem = function showItem(item) {
    this.get('itemController').changeItemVisibility(item, true);
  }
  /**
   * 隐藏元素
   * @param {string|object} item 指定元素
   */
  ;

  _proto.hideItem = function hideItem(item) {
    this.get('itemController').changeItemVisibility(item, false);
  }
  /**
   * 查找对应id的元素
   * @param {string} id 元素id
   * @return {object} 元素实例
   */
  ;

  _proto.findById = function findById(id) {
    return this.get('itemMap')[id];
  }
  /**
   * 根据对应规则查找单个元素
   * @param {string} type 元素类型(node|edge)
   * @param {string} fn 指定规则
   * @return {object} 元素实例
   */
  ;

  _proto.find = function find(type, fn) {
    var result;
    var items = this.get(type + 's');
    Util.each(items, function (item, i) {
      if (fn(item, i)) {
        result = item;
        return false;
      }
    });
    return result;
  }
  /**
   * 查找所有满足规则的元素
   * @param {string} type 元素类型(node|edge)
   * @param {string} fn 指定规则
   * @return {array} 元素实例
   */
  ;

  _proto.findAll = function findAll(type, fn) {
    var result = [];
    Util.each(this.get(type + 's'), function (item, i) {
      if (fn(item, i)) {
        result.push(item);
      }
    });
    return result;
  }
  /**
   * 查找所有处于指定状态的元素
   * @param {string} type 元素类型(node|edge)
   * @param {string} state z状态
   * @return {object} 元素实例
   */
  ;

  _proto.findAllByState = function findAllByState(type, state) {
    return this.findAll(type, function (item) {
      return item.hasState(state);
    });
  }
  /**
   * 设置是否在更新/刷新后自动重绘
   * @param {boolean} auto 自动重绘
   */
  ;

  _proto.setAutoPaint = function setAutoPaint(auto) {
    this.set('autoPaint', auto);
  }
  /**
   * 返回图表的 dataUrl 用于生成图片
   * @return {string/Object} 图片 dataURL
   */
  ;

  _proto.toDataURL = function toDataURL() {
    var canvas = this.get('canvas');
    var renderer = canvas.getRenderer();
    var canvasDom = canvas.get('el');
    var dataURL = '';

    if (renderer === 'svg') {
      var clone = canvasDom.cloneNode(true);
      var svgDocType = document.implementation.createDocumentType('svg', '-//W3C//DTD SVG 1.1//EN', 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd');
      var svgDoc = document.implementation.createDocument('http://www.w3.org/2000/svg', 'svg', svgDocType);
      svgDoc.replaceChild(clone, svgDoc.documentElement);
      var svgData = new XMLSerializer().serializeToString(svgDoc);
      dataURL = 'data:image/svg+xml;charset=utf8,' + encodeURIComponent(svgData);
    } else if (renderer === 'canvas') {
      dataURL = canvasDom.toDataURL('image/png');
    }

    return dataURL;
  }
  /**
   * 画布导出图片
   * @param {String} name 图片的名称
   */
  ;

  _proto.downloadImage = function downloadImage(name) {
    var self = this;

    if (self.isAnimating()) {
      self.stopAnimate();
    }

    var canvas = self.get('canvas');
    var renderer = canvas.getRenderer();
    var fileName = (name || 'graph') + (renderer === 'svg' ? '.svg' : '.png');
    var link = document.createElement('a');
    setTimeout(function () {
      var dataURL = self.toDataURL();

      if (window.Blob && window.URL && renderer !== 'svg') {
        var arr = dataURL.split(',');
        var mime = arr[0].match(/:(.*?);/)[1];
        var bstr = atob(arr[1]);
        var n = bstr.length;
        var u8arr = new Uint8Array(n);

        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }

        var blobObj = new Blob([u8arr], {
          type: mime
        });

        if (window.navigator.msSaveBlob) {
          window.navigator.msSaveBlob(blobObj, fileName);
        } else {
          link.addEventListener('click', function () {
            link.download = fileName;
            link.href = window.URL.createObjectURL(blobObj);
          });
        }
      } else {
        link.addEventListener('click', function () {
          link.download = fileName;
          link.href = dataURL;
        });
      }

      var e = document.createEvent('MouseEvents');
      e.initEvent('click', false, false);
      link.dispatchEvent(e);
    }, 16);
  }
  /**
   * 清除画布元素
   * @return {object} this
   */
  ;

  _proto.clear = function clear() {
    var canvas = this.get('canvas');
    canvas.clear();

    this._initGroups();

    this.set({
      itemMap: {},
      nodes: [],
      edges: []
    });
    return this;
  }
  /**
   * 销毁画布
   */
  ;

  _proto.destroy = function destroy() {
    this.clear();
    Util.each(this.get('plugins'), function (plugin) {
      plugin.destroyPlugin();
    });
    this.get('eventController').destroy();
    this.get('itemController').destroy();
    this.get('modeController').destroy();
    this.get('viewController').destroy();
    this.get('stateController').destroy();
    this.get('canvas').destroy();
    this._cfg = null;
    this.destroyed = true;
  };

  return Graph;
}(EventEmitter);

module.exports = Graph;

/***/ }),

/***/ "./src/graph/tree-graph.js":
/*!*********************************!*\
  !*** ./src/graph/tree-graph.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Hierarchy = __webpack_require__(/*! @antv/hierarchy */ "./node_modules/@antv/hierarchy/build/hierarchy.js");

var Util = __webpack_require__(/*! ../util */ "./src/util/index.js");

var Graph = __webpack_require__(/*! ./graph */ "./src/graph/graph.js");

function indexOfChild(children, child) {
  var index = -1;
  Util.each(children, function (former, i) {
    if (child.id === former.id) {
      index = i;
      return false;
    }
  });
  return index;
}

var TreeGraph =
/*#__PURE__*/
function (_Graph) {
  _inheritsLoose(TreeGraph, _Graph);

  function TreeGraph(cfg) {
    var _this;

    _this = _Graph.call(this, cfg) || this; // 用于缓存动画结束后需要删除的节点

    _this.set('removeList', []);

    _this.set('layoutMethod', _this._getLayout());

    return _this;
  }

  var _proto = TreeGraph.prototype;

  _proto.getDefaultCfg = function getDefaultCfg() {
    var cfg = _Graph.prototype.getDefaultCfg.call(this); // 树图默认打开动画


    cfg.animate = true;
    return cfg;
  }
  /**
   * 根据data接口的数据渲染视图
   */
  ;

  _proto.render = function render() {
    var self = this;
    var data = self.get('data');

    if (!data) {
      throw new Error('data must be defined first');
    }

    self.clear();
    self.emit('beforerender');
    self.refreshLayout(this.get('fitView'));
    self.emit('afterrender');
  }
  /**
   * 添加子树到对应 id 的节点
   * @param {object} data 子树数据模型
   * @param {string} parent 子树的父节点id
   */
  ;

  _proto.addChild = function addChild(data, parent) {
    var self = this; // 将数据添加到源数据中，走changeData方法

    if (!Util.isString(parent)) {
      parent = parent.get('id');
    }

    var parentData = self.findDataById(parent);

    if (!parentData.children) {
      parentData.children = [];
    }

    parentData.children.push(data);
    self.changeData();
  } // 计算好layout的数据添加到graph中
  ;

  _proto._addChild = function _addChild(data, parent, animate) {
    var self = this;
    var model = data.data; // model 中应存储真实的数据，特别是真实的 children

    model.x = data.x;
    model.y = data.y;
    model.depth = data.depth;
    var node = self.addItem('node', model);

    if (parent) {
      node.set('parent', parent);

      if (animate) {
        var origin = parent.get('origin');

        if (origin) {
          node.set('origin', origin);
        } else {
          var parentModel = parent.getModel();
          node.set('origin', {
            x: parentModel.x,
            y: parentModel.y
          });
        }
      }

      var childrenList = parent.get('children');

      if (!childrenList) {
        parent.set('children', [node]);
      } else {
        childrenList.push(node);
      }

      self.addItem('edge', {
        source: parent,
        target: node,
        id: parent.get('id') + ':' + node.get('id')
      });
    } // 渲染到视图上应参考布局的children, 避免多绘制了收起的节点


    Util.each(data.children, function (child) {
      self._addChild(child, node, animate);
    });
    return node;
  }
  /**
   * 更新数据模型，差量更新并重新渲染
   * @param {object} data 数据模型
   */
  ;

  _proto.changeData = function changeData(data) {
    var self = this;

    if (data) {
      self.data(data);
      self.render();
    } else {
      self.refreshLayout(this.get('fitView'));
    }
  }
  /**
   * 更新源数据，差量更新子树
   * @param {object} data 子树数据模型
   * @param {string} parent 子树的父节点id
   */
  ;

  _proto.updateChild = function updateChild(data, parent) {
    var self = this; // 如果没有父节点，是全量的更新，直接重置data

    if (!parent) {
      self.changeData(data);
      return;
    }

    var parentModel = self.findById(parent).getModel();
    var current = self.findById(data.id); // 如果不存在该节点，则添加

    if (!current) {
      if (!parentModel.children) {
        parentModel.children = [current];
      } else {
        parentModel.children.push(data);
      }
    } else {
      var index = indexOfChild(parentModel.children, data);
      parentModel.children[index] = data;
    }

    self.changeData();
  } // 将数据上的变更转换到视图上
  ;

  _proto._updateChild = function _updateChild(data, parent, animate) {
    var self = this;
    var current = self.findById(data.id); // 若子树不存在，整体添加即可

    if (!current) {
      self._addChild(data, parent, animate);

      return;
    } // 更新新节点下所有子节点


    Util.each(data.children, function (child) {
      self._updateChild(child, current, animate);
    }); // 用现在节点的children实例来删除移除的子节点

    var children = current.get('children');

    if (children) {
      var len = children.length;

      if (len > 0) {
        var child;

        for (var i = children.length - 1; i >= 0; i--) {
          child = children[i].getModel();

          if (indexOfChild(data.children, child) === -1) {
            self._removeChild(child.id, {
              x: data.x,
              y: data.y
            }, animate); // 更新父节点下缓存的子节点 item 实例列表


            children.splice(i, 1);
          }
        }
      }
    }

    var model = current.getModel();

    if (animate) {
      // 如果有动画，先缓存节点运动再更新节点
      current.set('origin', {
        x: model.x,
        y: model.y
      });
    }

    current.set('model', data.data);
    current.updatePosition({
      x: data.x,
      y: data.y
    });
  }
  /**
   * 删除子树
   * @param {string} id 子树根节点id
   */
  ;

  _proto.removeChild = function removeChild(id) {
    var self = this;
    var node = self.findById(id);

    if (!node) {
      return;
    }

    var parent = node.get('parent');

    if (parent && !parent.destroyed) {
      var siblings = self.findDataById(parent.get('id')).children;
      var index = indexOfChild(siblings, node.getModel());
      siblings.splice(index, 1);
    }

    self.changeData();
  } // 删除子节点Item对象
  ;

  _proto._removeChild = function _removeChild(id, to, animate) {
    var self = this;
    var node = self.findById(id);

    if (!node) {
      return;
    }

    Util.each(node.get('children'), function (child) {
      self._removeChild(child.getModel().id, to, animate);
    });

    if (animate) {
      var model = node.getModel();
      node.set('to', to);
      node.set('origin', {
        x: model.x,
        y: model.y
      });
      self.get('removeList').push(node);
    } else {
      self.removeItem(node);
    }
  }
  /**
   * 导出图数据
   * @return {object} data
   */
  ;

  _proto.save = function save() {
    return this.get('data');
  }
  /**
   * 根据id获取对应的源数据
   * @param {string|object} id 元素id
   * @param {object} parent 从哪个节点开始寻找，为空时从根节点开始查找
   * @return {object} 对应源数据
   */
  ;

  _proto.findDataById = function findDataById(id, parent) {
    var self = this;

    if (!parent) {
      parent = self.get('data');
    }

    if (id === parent.id) {
      return parent;
    }

    var result = null;
    Util.each(parent.children, function (child) {
      if (child.id === id) {
        result = child;
        return false;
      }

      result = self.findDataById(id, child);

      if (result) {
        return false;
      }
    });
    return result;
  }
  /**
   * 更改并应用树布局算法
   * @param {object} layout 布局算法
   */
  ;

  _proto.changeLayout = function changeLayout(layout) {
    var self = this;

    if (!layout) {
      console.warn('layout cannot be null');
      return;
    }

    self.set('layout', layout);
    self.set('layoutMethod', self._getLayout());
    self.refreshLayout();
  }
  /**
   * 根据目前的 data 刷新布局，更新到画布上。用于变更数据之后刷新视图。
   * @param {boolean} fitView 更新布局时是否需要适应窗口
   */
  ;

  _proto.refreshLayout = function refreshLayout(fitView) {
    var self = this;
    var data = self.get('data');
    var layoutData = self.get('layoutMethod')(data, self.get('layout'));
    var animate = self.get('animate');
    var autoPaint = self.get('autoPaint');
    self.emit('beforerefreshlayout', {
      data: data,
      layoutData: layoutData
    });
    self.setAutoPaint(false);

    self._updateChild(layoutData, null, animate);

    if (fitView) {
      self.get('viewController')._fitView();
    }

    if (!animate) {
      // 如果没有动画，目前仅更新了节点的位置，刷新一下边的样式
      self.refresh();
      self.paint();
    } else {
      self.layoutAnimate(layoutData, null);
    }

    self.setAutoPaint(autoPaint);
    self.emit('afterrefreshlayout', {
      data: data,
      layoutData: layoutData
    });
  }
  /**
   * 布局动画接口，用于数据更新时做节点位置更新的动画
   * @param {object} data 更新的数据
   * @param {function} onFrame 定义节点位置更新时如何移动
   * @param {number} duration 动画时间
   * @param {string} ease 指定动效
   * @param {function} callback 动画结束的回调
   * @param {number} delay 动画延迟执行(ms)
   */
  ;

  _proto.layoutAnimate = function layoutAnimate(data, _onFrame) {
    var _this2 = this;

    var self = this;
    this.setAutoPaint(false);
    var animateCfg = this.get('animateCfg');
    self.emit('beforeanimate', {
      data: data
    }); // 如果边中没有指定锚点，但是本身有锚点控制，在动画过程中保持锚点不变

    self.getEdges().forEach(function (edge) {
      var model = edge.get('model');

      if (!model.sourceAnchor) {
        model.sourceAnchor = edge.get('sourceAnchorIndex');
      }
    });
    this.get('canvas').animate({
      onFrame: function onFrame(ratio) {
        Util.traverseTree(data, function (child) {
          var node = self.findById(child.id);
          var origin = node.get('origin');
          var model = node.get('model');

          if (!origin) {
            origin = {
              x: model.x,
              y: model.y
            };
            node.set('origin', origin);
          }

          if (_onFrame) {
            var attrs = _onFrame(node, ratio, origin, data);

            node.set('model', Util.mix(model, attrs));
          } else {
            model.x = origin.x + (child.x - origin.x) * ratio;
            model.y = origin.y + (child.y - origin.y) * ratio;
          }
        });
        Util.each(self.get('removeList'), function (node) {
          var model = node.getModel();
          var from = node.get('origin');
          var to = node.get('to');
          model.x = from.x + (to.x - from.x) * ratio;
          model.y = from.y + (to.y - from.y) * ratio;
        });
        self.refreshPositions();
      }
    }, animateCfg.duration, animateCfg.ease, function () {
      Util.each(self.getNodes(), function (node) {
        node.set('origin', null);
      });
      Util.each(self.get('removeList'), function (node) {
        self.removeItem(node);
      });
      self.set('removeList', []);

      if (animateCfg.callback) {
        animateCfg.callback();
      }

      self.paint();

      _this2.setAutoPaint(true);

      self.emit('afteranimate', {
        data: data
      });
    }, animateCfg.delay);
  }
  /**
   * 立即停止布局动画
   */
  ;

  _proto.stopLayoutAnimate = function stopLayoutAnimate() {
    this.get('canvas').stopAnimate();
    this.emit('layoutanimateend', {
      data: this.get('data')
    });
    this.layoutAnimating = false;
  }
  /**
   * 是否在布局动画
   * @return {boolean} 是否有布局动画
   */
  ;

  _proto.isLayoutAnimating = function isLayoutAnimating() {
    return this.layoutAnimating;
  };

  _proto._getLayout = function _getLayout() {
    var layout = this.get('layout');

    if (!layout) {
      return null;
    }

    if (typeof layout === 'function') {
      return layout;
    }

    if (!layout.type) {
      layout.type = 'dendrogram';
    }

    if (!layout.direction) {
      layout.direction = 'TB';
    }

    if (layout.radial) {
      return function (data) {
        var layoutData = Hierarchy[layout.type](data, layout);
        Util.radialLayout(layoutData);
        return layoutData;
      };
    }

    return function (data) {
      return Hierarchy[layout.type](data, layout);
    };
  };

  return TreeGraph;
}(Graph);

module.exports = TreeGraph;

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileOverview entry file
 * @author huangtonger@aliyun.com
 */
// const Shape = require('./shape/');
var Global = __webpack_require__(/*! ./global */ "./src/global.js");

var G = __webpack_require__(/*! @antv/g/lib */ "./node_modules/@antv/g/lib/index.js");

var Shape = __webpack_require__(/*! ./shape */ "./src/shape/index.js");

var Behaviors = __webpack_require__(/*! ./behavior */ "./src/behavior/index.js");

var G6 = {
  Graph: __webpack_require__(/*! ./graph/graph */ "./src/graph/graph.js"),
  TreeGraph: __webpack_require__(/*! ./graph/tree-graph */ "./src/graph/tree-graph.js"),
  Util: __webpack_require__(/*! ./util/ */ "./src/util/index.js"),
  G: G,
  Global: Global,
  Shape: Shape,
  registerNode: Shape.registerNode,
  registerEdge: Shape.registerEdge,
  registerBehavior: Behaviors.registerBehavior,
  version: Global.version
};
module.exports = G6;

/***/ }),

/***/ "./src/item/edge.js":
/*!**************************!*\
  !*** ./src/item/edge.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/**
 * @fileOverview edge item
 * @author huangtonger@aliyun.com
 */
var Util = __webpack_require__(/*! ../util/ */ "./src/util/index.js");

var Item = __webpack_require__(/*! ./item */ "./src/item/item.js");

var END_MAP = {
  source: 'start',
  target: 'end'
};
var ITEM_NAME_SUFFIX = 'Node'; // 端点的后缀，如 sourceNode, targetNode

var POINT_NAME_SUFFIX = 'Point'; // 起点或者结束点的后缀，如 startPoint, endPoint

var ANCHOR_NAME_SUFFIX = 'Anchor';

var Edge =
/*#__PURE__*/
function (_Item) {
  _inheritsLoose(Edge, _Item);

  function Edge() {
    return _Item.apply(this, arguments) || this;
  }

  var _proto = Edge.prototype;

  _proto.getDefaultCfg = function getDefaultCfg() {
    return {
      type: 'edge',
      sourceNode: null,
      targetNode: null,
      startPoint: null,
      endPoint: null,
      linkCenter: false // 参数名暂时没想好，是连接节点的中心，还是直接连接 x,y

    };
  };

  _proto.init = function init() {
    _Item.prototype.init.call(this); // 初始化两个端点


    this.setSource(this.get('source'));
    this.setTarget(this.get('target'));
  };

  _proto.setSource = function setSource(source) {
    this._setEnd('source', source);

    this.set('source', source);
  };

  _proto.setTarget = function setTarget(target) {
    this._setEnd('target', target);

    this.set('target', target);
  };

  _proto.getSource = function getSource() {
    return this.get('source');
  };

  _proto.getTarget = function getTarget() {
    return this.get('target');
  }
  /**
   * 边不需要重计算容器位置，直接重新计算 path 位置
   * @param {object} cfg 待更新数据
   */
  ;

  _proto.update = function update(cfg) {
    var model = this.get('model');
    Util.mix(model, cfg);
    this.updateShape();
    this.afterUpdate();
    this.clearCache();
  };

  _proto.updatePosition = function updatePosition() {} // 设置端点：起点或者结束点
  ;

  _proto._setEnd = function _setEnd(name, value) {
    var pointName = END_MAP[name] + POINT_NAME_SUFFIX;
    var itemName = name + ITEM_NAME_SUFFIX;
    var preItem = this.get(itemName);
    preItem && preItem.removeEdge(this); // 如果之前存在节点，则移除掉边

    if (Util.isPlainObject(value)) {
      // 如果设置成具体的点，则清理节点
      this.set(pointName, value);
      this.set(itemName, null);
    } else {
      value.addEdge(this);
      this.set(itemName, value);
      this.set(pointName, null);
    }
  } // 获取与端点相交的节点
  ;

  _proto._getLinkPoint = function _getLinkPoint(name, model, controlPoints) {
    var pointName = END_MAP[name] + POINT_NAME_SUFFIX;
    var itemName = name + ITEM_NAME_SUFFIX;
    var point = this.get(pointName);

    if (!point) {
      var item = this.get(itemName);
      var anchorName = name + ANCHOR_NAME_SUFFIX;

      var prePoint = this._getPrePoint(name, controlPoints);

      var anchorIndex = model[anchorName];

      if (!Util.isNil(anchorIndex)) {
        // 如果有锚点，则使用锚点索引获取连接点
        point = item.getLinkPointByAnchor(anchorIndex);
      } // 如果锚点没有对应的点或者没有锚点，则直接计算连接点


      point = point || item.getLinkPoint(prePoint);

      if (!Util.isNil(point.index)) {
        this.set(name + 'AnchorIndex', point.index);
      }
    }

    return point;
  } // 获取同端点进行连接的点，计算交汇点
  ;

  _proto._getPrePoint = function _getPrePoint(name, controlPoints) {
    if (controlPoints && controlPoints.length) {
      var index = name === 'source' ? 0 : controlPoints.length - 1;
      return controlPoints[index];
    }

    var oppositeName = name === 'source' ? 'target' : 'source'; // 取另一个节点的位置

    return this._getEndPoint(oppositeName);
  } // 通过端点的中心获取控制点
  ;

  _proto._getControlPointsByCenter = function _getControlPointsByCenter(model) {
    var sourcePoint = this._getEndPoint('source');

    var targetPoint = this._getEndPoint('target');

    var shapeFactory = this.get('shapeFactory');
    return shapeFactory.getControlPoints(model.shape, {
      startPoint: sourcePoint,
      endPoint: targetPoint
    });
  } // 获取端点的位置
  ;

  _proto._getEndPoint = function _getEndPoint(name) {
    var itemName = name + ITEM_NAME_SUFFIX;
    var pointName = END_MAP[name] + POINT_NAME_SUFFIX;
    var item = this.get(itemName); // 如果有端点，直接使用 model

    if (item) {
      return item.get('model');
    } // 否则直接使用点


    return this.get(pointName);
  };

  _proto._getEndCenter = function _getEndCenter(name) {
    var itemName = name + ITEM_NAME_SUFFIX;
    var pointName = END_MAP[name] + POINT_NAME_SUFFIX;
    var item = this.get(itemName); // 如果有端点，直接使用 model

    if (item) {
      var bbox = item.getBBox();
      return {
        x: bbox.centerX,
        y: bbox.centerY
      };
    } // 否则直接使用点


    return this.get(pointName);
  };

  _proto.getShapeCfg = function getShapeCfg(model) {
    var self = this;
    var linkCenter = self.get('linkCenter'); // 如果连接到中心，忽视锚点、忽视控制点

    var cfg = _Item.prototype.getShapeCfg.call(this, model);

    if (linkCenter) {
      cfg.startPoint = self._getEndCenter('source');
      cfg.endPoint = self._getEndCenter('target');
    } else {
      var controlPoints = cfg.controlPoints || self._getControlPointsByCenter(cfg);

      cfg.startPoint = self._getLinkPoint('source', model, controlPoints);
      cfg.endPoint = self._getLinkPoint('target', model, controlPoints);
    }

    cfg.sourceNode = self.get('sourceNode');
    cfg.targetNode = self.get('targetNode');
    return cfg;
  };

  _proto.getModel = function getModel() {
    var model = this.get('model');
    var out = Util.mix({}, model);
    var sourceItem = this.get('source' + ITEM_NAME_SUFFIX);
    var targetItem = this.get('target' + ITEM_NAME_SUFFIX);

    if (sourceItem) {
      out.source = sourceItem.get('id');
      delete out['source' + ITEM_NAME_SUFFIX];
    } else {
      out.source = this.get('start' + POINT_NAME_SUFFIX);
    }

    if (targetItem) {
      out.target = targetItem.get('id');
      delete out['target' + ITEM_NAME_SUFFIX];
    } else {
      out.target = this.get('end' + POINT_NAME_SUFFIX);
    }

    return out;
  };

  _proto.destroy = function destroy() {
    var sourceItem = this.get('source' + ITEM_NAME_SUFFIX);
    var targetItem = this.get('target' + ITEM_NAME_SUFFIX);
    sourceItem && !sourceItem.destroyed && sourceItem.removeEdge(this);
    targetItem && !targetItem.destroyed && targetItem.removeEdge(this);

    _Item.prototype.destroy.call(this);
  };

  return Edge;
}(Item);

module.exports = Edge;

/***/ }),

/***/ "./src/item/index.js":
/*!***************************!*\
  !*** ./src/item/index.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileOverview item entry file
 * @author huangtonger@aliyun.com
 */
module.exports = {
  Node: __webpack_require__(/*! ./node */ "./src/item/node.js"),
  Edge: __webpack_require__(/*! ./edge */ "./src/item/edge.js")
};

/***/ }),

/***/ "./src/item/item.js":
/*!**************************!*\
  !*** ./src/item/item.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileOverview item
 * @author huangtonger@aliyun.com
 */
var Util = __webpack_require__(/*! ../util/ */ "./src/util/index.js");

var Shape = __webpack_require__(/*! ../shape */ "./src/shape/index.js");

var Global = __webpack_require__(/*! ../global */ "./src/global.js");

var CACHE_BBOX = 'bboxCache';
var GLOBAL_STATE_STYLE_SUFFIX = 'StateStyle';
var NAME_STYLE = 'Style'; // cache 缓存的状态属性的名字

var RESERVED_STYLES = ['fillStyle', 'strokeStyle', 'path', 'points', 'img', 'symbol'];

var Item =
/*#__PURE__*/
function () {
  function Item(cfg) {
    var defaultCfg = {
      /**
       * id
       * @type {string}
       */
      id: null,

      /**
       * 类型
       * @type {string}
       */
      type: 'item',

      /**
       * data model
       * @type {object}
       */
      model: {},

      /**
       * g group
       * @type {G.Group}
       */
      group: null,

      /**
       * is open animate
       * @type {boolean}
       */
      animate: false,

      /**
       * visible - not group visible
       * @type {boolean}
       */
      visible: true,

      /**
       * capture event
       * @type {boolean}
       */
      event: true,

      /**
       * key shape to calculate item's bbox
       * @type object
       */
      keyShape: null,

      /**
       * item's states, such as selected or active
       * @type Array
       */
      states: []
    };
    this._cfg = Util.mix(defaultCfg, this.getDefaultCfg(), cfg);
    var group = cfg.group;
    group.set('item', this);
    var id = this.get('model').id;

    if (!id || id === '') {
      id = Util.uniqueId(this.get('type'));
    }

    this.set('id', id);
    group.set('id', id);
    this.init();
    this.draw();
  }
  /**
   * 是否是 Item 对象，悬空边情况下进行判定
   * @return {Boolean} 是否是 Item 对象
   */


  var _proto = Item.prototype;

  _proto.isItem = function isItem() {
    return true;
  }
  /**
   * 获取属性
   * @internal 仅内部类使用
   * @param  {String} key 属性名
   * @return {*} 属性值
   */
  ;

  _proto.get = function get(key) {
    return this._cfg[key];
  }
  /**
   * 设置属性
   * @internal 仅内部类使用
   * @param {String|Object} key 属性名，也可以是对象
   * @param {*} val 属性值
   */
  ;

  _proto.set = function set(key, val) {
    if (Util.isPlainObject(key)) {
      this._cfg = Util.mix({}, this._cfg, key);
    } else {
      this._cfg[key] = val;
    }
  }
  /**
   * 获取默认的配置项
   * @protected 供子类复写
   * @return {Object} 配置项
   */
  ;

  _proto.getDefaultCfg = function getDefaultCfg() {
    return {};
  }
  /**
   * 初始化
   * @protected
   */
  ;

  _proto.init = function init() {
    var shapeFactory = Shape.getFactory(this.get('type'));
    this.set('shapeFactory', shapeFactory);
  } // 根据 keyshape 计算包围盒
  ;

  _proto._calculateBBox = function _calculateBBox() {
    var keyShape = this.get('keyShape');
    var group = this.get('group'); // 因为 group 可能会移动，所以必须通过父元素计算才能计算出正确的包围盒

    var bbox = Util.getBBox(keyShape, group);
    bbox.x = bbox.minX;
    bbox.y = bbox.minY;
    bbox.width = bbox.maxX - bbox.minX;
    bbox.height = bbox.maxY - bbox.minY;
    bbox.centerX = (bbox.minX + bbox.maxX) / 2;
    bbox.centerY = (bbox.minY + bbox.maxY) / 2;
    return bbox;
  } // 绘制
  ;

  _proto._drawInner = function _drawInner() {
    var self = this;
    var shapeFactory = self.get('shapeFactory');
    var group = self.get('group');
    var model = self.get('model');
    group.clear();

    if (!shapeFactory) {
      return;
    }

    self.updatePosition(model);
    var cfg = self.getShapeCfg(model); // 可能会附加额外信息

    var shapeType = cfg.shape;
    var keyShape = shapeFactory.draw(shapeType, cfg, group);

    if (keyShape) {
      keyShape.isKeyShape = true;
      self.set('keyShape', keyShape);
      self.set('originStyle', this.getKeyShapeStyle());
    } // 防止由于用户外部修改 model 中的 shape 导致 shape 不更新


    this.set('currentShape', shapeType);

    this._resetStates(shapeFactory, shapeType);
  };

  _proto.getKeyShapeStyle = function getKeyShapeStyle() {
    var keyShape = this.getKeyShape();

    if (keyShape) {
      var styles = {};
      Util.each(keyShape.attr(), function (val, key) {
        if (RESERVED_STYLES.indexOf(key) < 0) {
          styles[key] = val;
        }
      });
      return styles;
    }
  };

  _proto._resetStates = function _resetStates(shapeFactory, shapeType) {
    var self = this;
    var states = self.get('states');
    Util.each(states, function (state) {
      shapeFactory.setState(shapeType, state, true, self);
    });
  }
  /**
   * 获取当前元素的所有状态
   * @return {Array} 元素的所有状态
   */
  ;

  _proto.getStates = function getStates() {
    return this.get('states');
  }
  /**
   * 当前元素是否处于某状态
   * @param {String} state 状态名
   * @return {Boolean} 是否处于某状态
   */
  ;

  _proto.hasState = function hasState(state) {
    return this.get('states').indexOf(state) >= 0;
  };

  _proto.getStateStyle = function getStateStyle(state) {
    var self = this; // Global.nodeStateStyle

    var globalStyle = Global[self.getType() + GLOBAL_STATE_STYLE_SUFFIX][state];
    var styles = this.get('styles');
    var defaultStyle = styles && styles[state]; // 状态名 + style（activeStyle) 存储在 item 中，如果 item 中不存在这些信息，则使用默认的样式

    var fieldName = state + NAME_STYLE;
    return Util.mix({}, globalStyle, defaultStyle, self.get(fieldName));
  };

  _proto.getOriginStyle = function getOriginStyle() {
    return this.get('originStyle');
  };

  _proto.getCurrentStatesStyle = function getCurrentStatesStyle() {
    var self = this;
    var originStyle = Util.mix({}, self.getOriginStyle());
    Util.each(self.getStates(), function (state) {
      Util.mix(originStyle, self.getStateStyle(state));
    });
    return originStyle;
  }
  /**
   * 更改元素状态， visible 不属于这个范畴
   * @internal 仅提供内部类 graph 使用
   * @param {String} state 状态名
   * @param {Boolean} enable 节点状态值
   */
  ;

  _proto.setState = function setState(state, enable) {
    var states = this.get('states');
    var shapeFactory = this.get('shapeFactory');
    var index = states.indexOf(state);

    if (enable) {
      if (index > -1) {
        return;
      }

      states.push(state);
    } else if (index > -1) {
      states.splice(index, 1);
    }

    if (shapeFactory) {
      var model = this.get('model');
      shapeFactory.setState(model.shape, state, enable, this);
    }
  };

  _proto.clearStates = function clearStates(states) {
    var self = this;
    var originStates = self.getStates();
    var shapeFactory = self.get('shapeFactory');
    var shape = self.get('model').shape;

    if (!states) {
      self.set('states', []);
      shapeFactory.setState(shape, originStates[0], false, self);
      return;
    }

    if (Util.isString(states)) {
      states = [states];
    }

    var newStates = originStates.filter(function (state) {
      shapeFactory.setState(shape, state, false, self);

      if (states.indexOf(state) >= 0) {
        return false;
      }

      return true;
    });
    self.set('states', newStates);
  }
  /**
   * 节点的图形容器
   * @return {G.Group} 图形容器
   */
  ;

  _proto.getContainer = function getContainer() {
    return this.get('group');
  }
  /**
   * 节点的关键形状，用于计算节点大小，连线截距等
   * @return {G.Shape} 关键形状
   */
  ;

  _proto.getKeyShape = function getKeyShape() {
    return this.get('keyShape');
  }
  /**
   * 节点数据模型
   * @return {Object} 数据模型
   */
  ;

  _proto.getModel = function getModel() {
    return this.get('model');
  }
  /**
   * 节点类型
   * @return {string} 节点的类型
   */
  ;

  _proto.getType = function getType() {
    return this.get('type');
  }
  /**
   * 渲染前的逻辑，提供给子类复写
   * @protected
   */
  ;

  _proto.beforeDraw = function beforeDraw() {}
  /**
   * 渲染后的逻辑，提供给子类复写
   * @protected
   */
  ;

  _proto.afterDraw = function afterDraw() {};

  _proto.getShapeCfg = function getShapeCfg(model) {
    var styles = this.get('styles');

    if (styles && styles["default"]) {
      // merge graph的item样式与数据模型中的样式
      var newModel = Util.mix({}, model);
      newModel.style = Util.mix({}, styles["default"], model.style);
      return newModel;
    }

    return model;
  }
  /**
   * 刷新一般用于处理几种情况
   * 1. item model 在外部被改变
   * 2. 边的节点位置发生改变，需要重新计算边
   *
   * 因为数据从外部被修改无法判断一些属性是否被修改，直接走位置和 shape 的更新
   */
  ;

  _proto.refresh = function refresh() {
    var model = this.get('model'); // 更新元素位置

    this.updatePosition(model); // 更新元素内容，样式

    this.updateShape(); // 做一些更新之后的操作

    this.afterUpdate(); // 清除缓存

    this.clearCache();
  }
  /**
   * 将更新应用到 model 上，刷新属性
   * @internal 仅提供给 Graph 使用，外部直接调用 graph.update 接口
   * @param  {Object} cfg       配置项，可以是增量信息
   */
  ;

  _proto.update = function update(cfg) {
    var model = this.get('model');
    var originPosition = {
      x: model.x,
      y: model.y
    }; // 直接将更新合到原数据模型上，可以保证用户在外部修改源数据然后刷新时的样式符合期待。

    Util.mix(model, cfg);

    var onlyMove = this._isOnlyMove(cfg); // 仅仅移动位置时，既不更新，也不重绘


    if (onlyMove) {
      this.updatePosition(model);
    } else {
      // 如果 x,y 有变化，先重置位置
      if (originPosition.x !== model.x || originPosition.y !== model.y) {
        this.updatePosition(model);
      }

      this.updateShape();
    }

    this.afterUpdate();
    this.clearCache();
  }
  /**
   * 更新元素内容，样式
   */
  ;

  _proto.updateShape = function updateShape() {
    var shapeFactory = this.get('shapeFactory');
    var model = this.get('model');
    var shape = model.shape; // 判定是否允许更新
    // 1. 注册的节点允许更新
    // 2. 更新后的 shape 等于原先的 shape

    if (shapeFactory.shouldUpdate(shape) && shape === this.get('currentShape')) {
      var updateCfg = this.getShapeCfg(model);
      shapeFactory.update(shape, updateCfg, this);
    } else {
      // 如果不满足上面两种状态，重新绘制
      this.draw();
    }

    this.set('originStyle', this.getKeyShapeStyle()); // 更新后重置节点状态

    this._resetStates(shapeFactory, shape);
  }
  /**
   * 更新位置，避免整体重绘
   * @param {object} cfg 待更新数据
   */
  ;

  _proto.updatePosition = function updatePosition(cfg) {
    var model = this.get('model');
    var x = Util.isNil(cfg.x) ? model.x : cfg.x;
    var y = Util.isNil(cfg.y) ? model.y : cfg.y;
    var group = this.get('group');

    if (Util.isNil(x) || Util.isNil(y)) {
      return;
    }

    group.resetMatrix();
    group.translate(x, y);
    model.x = x;
    model.y = y;
    this.clearCache(); // 位置更新后需要清除缓存
  }
  /**
   * 更新后做一些工作
   * @protected
   */
  ;

  _proto.afterUpdate = function afterUpdate() {}
  /**
   * 更新/刷新等操作后，清除 cache
   */
  ;

  _proto.clearCache = function clearCache() {
    this.set(CACHE_BBOX, null);
  }
  /**
   * 绘制元素
   */
  ;

  _proto.draw = function draw() {
    this.beforeDraw();

    this._drawInner();

    this.afterDraw();
  }
  /**
   * 获取元素的包围盒
   * @return {Object} 包含 x,y,width,height, centerX, centerY
   */
  ;

  _proto.getBBox = function getBBox() {
    var bbox = this.get(CACHE_BBOX);

    if (!bbox) {
      // 计算 bbox 开销有些大，缓存
      bbox = this._calculateBBox();
      this.set(CACHE_BBOX, bbox);
    }

    return bbox;
  }
  /**
   * 将元素放到最前面
   */
  ;

  _proto.toFront = function toFront() {
    this.get('group').toFront();
  }
  /**
   * 将元素放到最后面
   */
  ;

  _proto.toBack = function toBack() {
    this.get('group').toBack();
  }
  /**
   * 显示元素
   */
  ;

  _proto.show = function show() {
    this.changeVisibility(true);
  }
  /**
   * 隐藏元素
   */
  ;

  _proto.hide = function hide() {
    this.changeVisibility(false);
  }
  /**
   * 更改是否显示
   * @param  {Boolean} visible 是否显示
   */
  ;

  _proto.changeVisibility = function changeVisibility(visible) {
    var group = this.get('group');

    if (visible) {
      group.show();
    } else {
      group.hide();
    }

    this.set('visible', visible);
  }
  /**
   * 是否拾取及出发该元素的交互事件
   * @param {Boolean} enable 标识位
   */
  ;

  _proto.enableCapture = function enableCapture(enable) {
    var group = this.get('group');
    group && group.attr('capture', enable);
  };

  _proto.isVisible = function isVisible() {
    return this.get('visible');
  }
  /**
   * 析构函数
   */
  ;

  _proto.destroy = function destroy() {
    if (!this.destroyed) {
      var animate = this.get('animate');
      var group = this.get('group');

      if (animate) {
        group.stopAnimate();
      }

      group.remove();
      this._cfg = null;
      this.destroyed = true;
    }
  };

  return Item;
}();

module.exports = Item;

/***/ }),

/***/ "./src/item/node.js":
/*!**************************!*\
  !*** ./src/item/node.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/**
 * @fileOverview node item
 * @author huangtonger@aliyun.com
 */
var Util = __webpack_require__(/*! ../util/ */ "./src/util/index.js");

var Item = __webpack_require__(/*! ./item */ "./src/item/item.js");

var CACHE_ANCHOR_POINTS = 'anchorPointsCache';
var CACHE_BBOX = 'bboxCache';

function getNearestPoint(points, curPoint) {
  var index = 0;
  var nearestPoint = points[0];
  var minDistance = pointDistance(points[0], curPoint);

  for (var i = 0; i < points.length; i++) {
    var point = points[i];
    var distance = pointDistance(point, curPoint);

    if (distance < minDistance) {
      nearestPoint = point;
      minDistance = distance;
      index = i;
    }
  }

  nearestPoint.anchorIndex = index;
  return nearestPoint;
}

function pointDistance(p1, p2) {
  return (p2.x - p1.x) * (p2.x - p1.x) + (p2.y - p1.y) * (p2.y - p1.y);
}

var Node =
/*#__PURE__*/
function (_Item) {
  _inheritsLoose(Node, _Item);

  function Node() {
    return _Item.apply(this, arguments) || this;
  }

  var _proto = Node.prototype;

  _proto.getDefaultCfg = function getDefaultCfg() {
    return {
      type: 'node',
      anchors: [],
      edges: [],
      status: []
    };
  } // getNeighbors() {
  //   const nodes = [];
  //   let node = null;
  //   Util.each(this.get('edges'), edge => {
  //     if (edge.get('source') === this) {
  //       node = edge.get('target');
  //     } else {
  //       node = edge.get('source');
  //     }
  //     if (nodes.indexOf(node) < 0) {
  //       nodes.push(node);
  //     }
  //   });
  //   return nodes;
  // }

  /**
   * 获取从节点关联的所有边
   * @return {Array} 边的集合
   */
  ;

  _proto.getEdges = function getEdges() {
    return this.get('edges');
  }
  /**
   * 获取引入节点的边 target == this
   * @return {Array} 边的集合
   */
  ;

  _proto.getInEdges = function getInEdges() {
    var self = this;
    return this.get('edges').filter(function (edge) {
      return edge.get('target') === self;
    });
  }
  /**
   * 获取从节点引出的边 source == this
   * @return {Array} 边的集合
   */
  ;

  _proto.getOutEdges = function getOutEdges() {
    var self = this;
    return this.get('edges').filter(function (edge) {
      return edge.get('source') === self;
    });
  } // showAnchors() {
  //   // todo
  // }
  // hideAnchors() {
  // }

  /**
   * 根据锚点的索引获取连接点
   * @param  {Number} index 索引
   * @return {Object} 连接点 {x,y}
   */
  ;

  _proto.getLinkPointByAnchor = function getLinkPointByAnchor(index) {
    var anchorPoints = this.getAnchorPoints();
    return anchorPoints[index];
  }
  /**
    * 获取连接点
    * @param {Object} point 节点外面的一个点，用于计算交点、最近的锚点
    * @return {Object} 连接点 {x,y}
    */
  ;

  _proto.getLinkPoint = function getLinkPoint(point) {
    // const model = this.get('model');
    var keyShape = this.get('keyShape');
    var type = keyShape.get('type');
    var bbox = this.getBBox();
    var centerX = bbox.centerX,
        centerY = bbox.centerY;
    var anchorPoints = this.getAnchorPoints();
    var intersectPoint;

    switch (type) {
      case 'circle':
        intersectPoint = Util.getCircleIntersectByPoint({
          x: centerX,
          y: centerY,
          r: bbox.width / 2
        }, point);
        break;

      case 'ellipse':
        intersectPoint = Util.getEllispeIntersectByPoint({
          x: centerX,
          y: centerY,
          rx: bbox.width / 2,
          ry: bbox.height / 2
        }, point);
        break;

      default:
        intersectPoint = Util.getRectIntersectByPoint(bbox, point);
    }

    var linkPoint = intersectPoint; // 如果存在锚点，则使用交点计算最近的锚点

    if (anchorPoints.length) {
      if (!linkPoint) {
        // 如果计算不出交点
        linkPoint = point;
      }

      linkPoint = getNearestPoint(anchorPoints, linkPoint);
    }

    if (!linkPoint) {
      // 如果最终依然没法找到锚点和连接点，直接返回中心点
      linkPoint = {
        x: centerX,
        y: centerY
      };
    }

    return linkPoint;
  }
  /**
   * 添加边
   * @param {Edge} edge 边
   */
  ;

  _proto.addEdge = function addEdge(edge) {
    this.get('edges').push(edge);
  }
  /**
   * 移除边
   * @param {Edge} edge 边
   */
  ;

  _proto.removeEdge = function removeEdge(edge) {
    var edges = this.getEdges();
    var index = edges.indexOf(edge);

    if (index > -1) {
      edges.splice(index, 1);
    }
  };

  _proto.clearCache = function clearCache() {
    this.set(CACHE_BBOX, null); // 清理缓存的 bbox

    this.set(CACHE_ANCHOR_POINTS, null);
  } // 是否仅仅移动节点，其他属性没变化
  ;

  _proto._isOnlyMove = function _isOnlyMove(cfg) {
    if (!cfg) {
      return false; // 刷新时不仅仅移动
    } // 不能直接使用 cfg.x && cfg.y 这类的判定，因为 0 的情况会出现


    var existX = !Util.isNil(cfg.x);
    var existY = !Util.isNil(cfg.y);
    var keys = Object.keys(cfg);
    return keys.length === 1 && (existX || existY) || // 仅有一个字段，包含 x 或者 包含 y
    keys.length === 2 && existX && existY; // 两个字段，同时有 x，同时有 y
  }
  /**
   * 获取锚点的定义
   * @return {array} anchorPoints， {x,y,...cfg}
   */
  ;

  _proto.getAnchorPoints = function getAnchorPoints() {
    var anchorPoints = this.get(CACHE_ANCHOR_POINTS);

    if (!anchorPoints) {
      anchorPoints = [];
      var shapeFactory = this.get('shapeFactory');
      var bbox = this.getBBox();
      var model = this.get('model');
      var shapeCfg = this.getShapeCfg(model);
      var points = shapeFactory.getAnchorPoints(model.shape, shapeCfg) || [];
      Util.each(points, function (pointArr, index) {
        var point = Util.mix({
          x: bbox.minX + pointArr[0] * bbox.width,
          y: bbox.minY + pointArr[1] * bbox.height
        }, pointArr[2], {
          index: index
        });
        anchorPoints.push(point);
      });
      this.set(CACHE_ANCHOR_POINTS, anchorPoints);
    }

    return anchorPoints;
  };

  return Node;
}(Item);

module.exports = Node;

/***/ }),

/***/ "./src/shape/edge.js":
/*!***************************!*\
  !*** ./src/shape/edge.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileOverview 自定义边
 * @description 自定义边中有大量逻辑同自定义节点重复，虽然可以提取成为 mixin ，但是考虑到代码的可读性，还是单独实现。
 * @author dxq613@gmail.com
 */
var Shape = __webpack_require__(/*! ./shape */ "./src/shape/shape.js");

var Util = __webpack_require__(/*! ../util/index */ "./src/util/index.js");

var Global = __webpack_require__(/*! ../global */ "./src/global.js");

var SingleShapeMixin = __webpack_require__(/*! ./single-shape-mixin */ "./src/shape/single-shape-mixin.js");

var CLS_SHAPE = 'edge-shape'; // start,end 倒置，center 不变

function revertAlign(labelPosition) {
  var textAlign = labelPosition;

  if (labelPosition === 'start') {
    textAlign = 'end';
  } else if (labelPosition === 'end') {
    textAlign = 'start';
  }

  return textAlign;
} // 注册 Node 的工厂方法


Shape.registerFactory('edge', {
  defaultShapeType: 'line'
});
var singleEdgeDefinition = Util.mix({}, SingleShapeMixin, {
  itemType: 'edge',

  /**
   * 文本的位置
   * @type {String}
   */
  labelPosition: 'center',
  // start, end, center

  /**
   * 文本是否跟着线自动旋转，默认 false
   * @type {Boolean}
   */
  labelAutoRotate: false,

  /**
   * 获取边的 path
   * @internal 供扩展的边覆盖
   * @param  {Array} points 构成边的点的集合
   * @return {Array} 构成 path 的数组
   */
  getPath: function getPath(points) {
    var path = [];
    Util.each(points, function (point, index) {
      if (index === 0) {
        path.push(['M', point.x, point.y]);
      } else {
        path.push(['L', point.x, point.y]);
      }
    });
    return path;
  },
  getShapeStyle: function getShapeStyle(cfg) {
    var color = cfg.color || Global.defaultEdge.color;
    var size = cfg.size || Global.defaultEdge.size;
    cfg = this.getPathPoints(cfg);
    var startPoint = cfg.startPoint;
    var endPoint = cfg.endPoint;
    var controlPoints = this.getControlPoints(cfg);
    var points = [startPoint]; // 添加起始点
    // 添加控制点

    if (controlPoints) {
      points = points.concat(controlPoints);
    } // 添加结束点


    points.push(endPoint);
    var path = this.getPath(points);
    var style = Util.mix({}, Global.defaultEdge.style, {
      stroke: color,
      lineWidth: size,
      path: path
    }, cfg.style);
    return style;
  },
  getLabelStyleByPosition: function getLabelStyleByPosition(cfg, labelCfg, group) {
    var labelPosition = labelCfg.position || this.labelPosition; // 文本的位置用户可以传入

    var style = {};
    var pathShape = group.findByClassName(CLS_SHAPE); // 不对 pathShape 进行判空，如果线不存在，说明有问题了

    var pointPercent;

    if (labelPosition === 'start') {
      pointPercent = 0;
    } else if (labelPosition === 'end') {
      pointPercent = 1;
    } else {
      pointPercent = 0.5;
    }

    var refX = labelCfg.refX,
        refY = labelCfg.refY; // 默认的偏移量
    // 如果两个节点重叠，线就变成了一个点，这时候label的位置，就是这个点 + 绝对偏移

    if (cfg.startPoint.x === cfg.endPoint.x && cfg.startPoint.y === cfg.endPoint.y) {
      style.x = cfg.startPoint.x + refX ? refX : 0;
      style.y = cfg.endPoint.y + refY ? refY : 0;
      return style;
    }

    var autoRotate = Util.isNil(labelCfg.autoRotate) ? this.labelAutoRotate : labelCfg.autoRotate;
    var offsetStyle = Util.getLabelPosition(pathShape, pointPercent, refX, refY, autoRotate);
    style.x = offsetStyle.x;
    style.y = offsetStyle.y;
    style.rotate = offsetStyle.rotate;
    style.textAlign = this._getTextAlign(labelPosition, offsetStyle.angle);
    return style;
  },
  // 获取文本对齐方式
  _getTextAlign: function _getTextAlign(labelPosition, angle) {
    var textAlign = 'center';

    if (!angle) {
      return labelPosition;
    }

    angle = angle % (Math.PI * 2); // 取模

    if (labelPosition !== 'center') {
      if (angle >= 0 && angle <= Math.PI / 2 || angle >= 3 / 2 * Math.PI && angle < 2 * Math.PI) {
        textAlign = labelPosition;
      } else {
        textAlign = revertAlign(labelPosition);
      }
    }

    return textAlign;
  },

  /**
   * @internal 获取边的控制点
   * @param  {Object} cfg 边的配置项
   * @return {Array} 控制点的数组
   */
  getControlPoints: function getControlPoints(cfg) {
    return cfg.controlPoints;
  },

  /**
   * @internal 处理需要重计算点和边的情况
   * @param {Object} cfg 边的配置项
   * @return {Object} 边的配置项
   */
  getPathPoints: function getPathPoints(cfg) {
    return cfg;
  },

  /**
   * 绘制边
   * @override
   * @param  {Object} cfg   边的配置项
   * @param  {G.Group} group 边的容器
   * @return {G.Shape} 图形
   */
  drawShape: function drawShape(cfg, group) {
    var shapeStyle = this.getShapeStyle(cfg);
    var shape = group.addShape('path', {
      className: CLS_SHAPE,
      attrs: shapeStyle
    });
    return shape;
  }
}); // 直线

Shape.registerEdge('single-line', singleEdgeDefinition); // 直线, 不支持控制点

Shape.registerEdge('line', {
  // 控制点不生效
  getControlPoints: function getControlPoints() {
    return [];
  }
}, 'single-line'); // 折线，支持多个控制点

Shape.registerEdge('polyline', {}, 'single-line'); // 直线

Shape.registerEdge('spline', {
  getPath: function getPath(points) {
    var path = Util.getSpline(points);
    return path;
  }
}, 'single-line');
Shape.registerEdge('quadratic', {
  curvePosition: 0.5,
  // 弯曲的默认位置
  curveOffset: -20,
  // 弯曲度，沿着startPoint, endPoint 的垂直向量（顺时针）方向，距离线的距离，距离越大越弯曲
  getControlPoints: function getControlPoints(cfg) {
    var controlPoints = cfg.controlPoints; // 指定controlPoints

    if (!controlPoints || !controlPoints.length) {
      var startPoint = cfg.startPoint,
          endPoint = cfg.endPoint;
      var innerPoint = Util.getControlPoint(startPoint, endPoint, this.curvePosition, this.curveOffset);
      controlPoints = [innerPoint];
    }

    return controlPoints;
  },
  getPath: function getPath(points) {
    var path = [];
    path.push(['M', points[0].x, points[0].y]);
    path.push(['Q', points[1].x, points[1].y, points[2].x, points[2].y]);
    return path;
  }
}, 'single-line');
Shape.registerEdge('cubic', {
  curvePosition: [1 / 2, 1 / 2],
  curveOffset: [-20, 20],
  getControlPoints: function getControlPoints(cfg) {
    var controlPoints = cfg.controlPoints; // 指定controlPoints

    if (!controlPoints || !controlPoints.length) {
      var startPoint = cfg.startPoint,
          endPoint = cfg.endPoint;
      var innerPoint1 = Util.getControlPoint(startPoint, endPoint, this.curvePosition[0], this.curveOffset[0]);
      var innerPoint2 = Util.getControlPoint(startPoint, endPoint, this.curvePosition[1], this.curveOffset[1]);
      controlPoints = [innerPoint1, innerPoint2];
    }

    return controlPoints;
  },
  getPath: function getPath(points) {
    var path = [];
    path.push(['M', points[0].x, points[0].y]);
    path.push(['C', points[1].x, points[1].y, points[2].x, points[2].y, points[3].x, points[3].y]);
    return path;
  }
}, 'single-line'); // 垂直方向的三阶贝塞尔曲线，不再考虑用户外部传入的控制点

Shape.registerEdge('cubic-vertical', {
  curvePosition: [1 / 2, 1 / 2],
  getControlPoints: function getControlPoints(cfg) {
    var startPoint = cfg.startPoint,
        endPoint = cfg.endPoint;
    var innerPoint1 = {
      x: startPoint.x,
      y: (endPoint.y - startPoint.y) * this.curvePosition[0] + startPoint.y
    };
    var innerPoint2 = {
      x: endPoint.x,
      y: (endPoint.y - startPoint.y) * this.curvePosition[1] + startPoint.y
    };
    var controlPoints = [innerPoint1, innerPoint2];
    return controlPoints;
  }
}, 'cubic'); // 水平方向的三阶贝塞尔曲线，不再考虑用户外部传入的控制点

Shape.registerEdge('cubic-horizontal', {
  curvePosition: [1 / 2, 1 / 2],
  getControlPoints: function getControlPoints(cfg) {
    var startPoint = cfg.startPoint,
        endPoint = cfg.endPoint;
    var innerPoint1 = {
      x: (endPoint.x - startPoint.x) * this.curvePosition[0] + startPoint.x,
      y: startPoint.y
    };
    var innerPoint2 = {
      x: (endPoint.x - startPoint.x) * this.curvePosition[1] + startPoint.x,
      y: endPoint.y
    };
    var controlPoints = [innerPoint1, innerPoint2];
    return controlPoints;
  }
}, 'cubic');
Shape.registerEdge('loop', {
  getPathPoints: function getPathPoints(cfg) {
    return Util.getLoopCfgs(cfg);
  },
  getControlPoints: function getControlPoints(cfg) {
    return cfg.controlPoints;
  }
}, 'cubic');

/***/ }),

/***/ "./src/shape/extend/group.js":
/*!***********************************!*\
  !*** ./src/shape/extend/group.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(/*! ../../util */ "./src/util/index.js");

var Group = __webpack_require__(/*! @antv/g/lib */ "./node_modules/@antv/g/lib/index.js").Group;

module.exports = Util.augment(Group, {
  findByClassName: function findByClassName(className) {
    return this.find(function (shape) {
      return shape.get('className') === className;
    });
  }
});

/***/ }),

/***/ "./src/shape/index.js":
/*!****************************!*\
  !*** ./src/shape/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileOverview shape entry file
 * @author huangtonger@aliyun.com
 */
var Shape = __webpack_require__(/*! ./shape */ "./src/shape/shape.js");

__webpack_require__(/*! ./node */ "./src/shape/node.js");

__webpack_require__(/*! ./edge */ "./src/shape/edge.js");

module.exports = Shape;

/***/ }),

/***/ "./src/shape/node.js":
/*!***************************!*\
  !*** ./src/shape/node.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileOverview common node shape
 * @author huangtonger@aliyun.com
 */
var Shape = __webpack_require__(/*! ./shape */ "./src/shape/shape.js");

var Util = __webpack_require__(/*! ../util/index */ "./src/util/index.js");

var Global = __webpack_require__(/*! ../global */ "./src/global.js");

var SingleShapeMixin = __webpack_require__(/*! ./single-shape-mixin */ "./src/shape/single-shape-mixin.js"); // 注册 Node 的工厂方法


Shape.registerFactory('node', {
  defaultShapeType: 'circle'
});
var singleNodeDefinition = Util.mix({}, SingleShapeMixin, {
  itemType: 'node',
  // 单个图形的类型
  shapeType: '',

  /**
   * 文本相对图形的位置，默认以中心点
   * 位置包括： top, bottom, left, right, center
   * @type {String}
   */
  labelPosition: 'center',

  /**
   * 获取节点宽高
   * @internal 返回节点的大小，以 [width, height] 的方式维护
   * @param  {Object} cfg 节点的配置项
   * @return {Array} 宽高
   */
  getSize: function getSize(cfg) {
    var size = cfg.size || Global.defaultNode.size;

    if (!Util.isArray(size)) {
      size = [size, size];
    }

    return size;
  },
  // 私有方法，不希望扩展的节点复写这个方法
  getLabelStyleByPosition: function getLabelStyleByPosition(cfg, labelCfg) {
    var labelPosition = labelCfg.position || this.labelPosition; // 默认的位置（最可能的情形），所以放在最上面

    if (labelPosition === 'center') {
      return {
        x: 0,
        y: 0
      };
    }

    var size = this.getSize(cfg);
    var width = size[0];
    var height = size[1];
    var offset = labelCfg.offset;

    if (Util.isNil(offset)) {
      // 考虑 offset = 0 的场景，不用用 labelCfg.offset || Global.nodeLabel.offset
      offset = Global.nodeLabel.offset; // 不居中时的偏移量
    }

    var style;

    switch (labelPosition) {
      case 'top':
        style = {
          x: 0,
          y: 0 - height / 2 - offset,
          textBaseline: 'bottom' // 文本在图形的上面

        };
        break;

      case 'bottom':
        style = {
          x: 0,
          y: height / 2 + offset,
          textBaseline: 'top'
        };
        break;

      case 'left':
        style = {
          x: 0 - width / 2 - offset,
          y: 0,
          textAlign: 'right'
        };
        break;

      default:
        style = {
          x: width / 2 + offset,
          y: 0,
          textAlign: 'left'
        };
        break;
    }

    return style;
  },
  drawShape: function drawShape(cfg, group) {
    var shapeType = this.shapeType; // || this.type，都已经加了 shapeType

    var style = this.getShapeStyle(cfg);
    var shape = group.addShape(shapeType, {
      attrs: style
    });
    return shape;
  }
}); // 单个图形的基础，可以有 label，默认 label 居中

Shape.registerNode('single-shape', singleNodeDefinition);
/**
 * 基本的圆，可以添加文本，默认文本居中
 */

Shape.registerNode('circle', {
  shapeType: 'circle',
  getShapeStyle: function getShapeStyle(cfg) {
    var size = this.getSize(cfg);
    var color = cfg.color || Global.defaultNode.color;
    var style = Util.mix({}, {
      x: 0,
      // 节点的位置在上层确定，所以这里仅使用相对位置即可
      y: 0,
      r: size[0] / 2,
      // size 一般可以提供宽高信息
      stroke: color
    }, Global.defaultNode.style, cfg.style);
    return style;
  }
}, 'single-shape');
/**
 * 基本的椭圆，可以添加文本，默认文本居中
 */

Shape.registerNode('ellipse', {
  shapeType: 'ellipse',
  getShapeStyle: function getShapeStyle(cfg) {
    var size = this.getSize(cfg);
    var rx = size[0] / 2;
    var ry = size[1] / 2;
    var color = cfg.color || Global.defaultNode.color;
    var style = Util.mix({}, {
      x: 0,
      // 节点的位置在上层确定，所以这里仅使用相对位置即可
      y: 0,
      rx: rx,
      // size 一般可以提供宽高信息
      ry: ry,
      stroke: color
    }, Global.defaultNode.style, cfg.style);
    return style;
  }
}, 'single-shape');
/**
 * 基本的矩形，可以添加文本，默认文本居中
 */

Shape.registerNode('rect', {
  shapeType: 'rect',
  getShapeStyle: function getShapeStyle(cfg) {
    var size = this.getSize(cfg);
    var width = size[0];
    var height = size[1];
    var color = cfg.color || Global.defaultNode.color;
    var style = Util.mix({}, Global.defaultNode.style, {
      x: 0 - width / 2,
      // 节点的位置在上层确定，所以这里仅使用相对位置即可
      y: 0 - height / 2,
      width: width,
      height: height,
      stroke: color
    }, cfg.style);
    return style;
  }
}, 'single-shape');
/**
 * 基本的图片，可以添加文本，默认文本在图片的下面
 */

Shape.registerNode('image', {
  shapeType: 'image',
  labelPosition: 'bottom',
  getShapeStyle: function getShapeStyle(cfg) {
    var size = this.getSize(cfg);
    var img = cfg.img;
    var width = size[0];
    var height = size[1];
    var style = Util.mix({}, {
      x: 0 - width / 2,
      // 节点的位置在上层确定，所以这里仅使用相对位置即可
      y: 0 - height / 2,
      width: width,
      height: height,
      img: img
    }, cfg.style);
    return style;
  }
}, 'single-shape');

/***/ }),

/***/ "./src/shape/shape.js":
/*!****************************!*\
  !*** ./src/shape/shape.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileOverview 自定义 Shape 的基类
 * @author dxq613@gmail.com
 */
var Util = __webpack_require__(/*! ../util/ */ "./src/util/index.js");

__webpack_require__(/*! ./extend/group */ "./src/shape/extend/group.js");

var Shape = {};
var cache = {}; // ucfirst 开销过大，进行缓存
// 首字母大写

function ucfirst(str) {
  return cache[str] || Util.upperFirst(str);
}
/**
 * 工厂方法的基类
 * @type Shape.FactoryBase
 */


var ShapeFactoryBase = {
  /**
   * 默认的形状，当没有指定/匹配 shapeType 时，使用默认的
   * @type {String}
   */
  defaultShapeType: null,

  /**
   * 获取绘制 Shape 的工具类，无状态
   * @param  {String} type 类型
   * @return {Object} 工具类
   */
  getShape: function getShape(type) {
    var self = this;
    var shape = self[type] || self[self.defaultShapeType];
    return shape;
  },

  /**
   * 绘制图形
   * @param  {String} type  类型
   * @param  {Object} cfg 配置项
   * @param  {G.Group} group 图形的分组
   * @return {G.Shape} 图形对象
   */
  draw: function draw(type, cfg, group) {
    var shape = this.getShape(type);
    var rst = shape.draw(cfg, group);
    shape.afterDraw(cfg, group, rst);
    return rst;
  },

  /**
   * 更新
   * @param  {String} type  类型
   * @param  {Object} cfg 配置项
   * @param  {G6.Item} item 节点、边、分组等
   */
  update: function update(type, cfg, item) {
    var shape = this.getShape(type);

    if (shape.update) {
      // 防止没定义 update 函数
      shape.update(cfg, item);
      shape.afterUpdate(cfg, item);
    }
  },

  /**
   * 设置状态
   * @param {String} type  类型
   * @param {String} name  状态名
   * @param {String} value 状态值
   * @param {G6.Item} item  节点、边、分组等
   */
  setState: function setState(type, name, value, item) {
    var shape = this.getShape(type);
    shape.setState(name, value, item);
  },

  /**
   * 是否允许更新，不重新绘制图形
   * @param  {String} type 类型
   * @return {Boolean} 是否允许使用更新
   */
  shouldUpdate: function shouldUpdate(type) {
    var shape = this.getShape(type);
    return !!shape.update;
  },
  getControlPoints: function getControlPoints(type, cfg) {
    var shape = this.getShape(type);
    return shape.getControlPoints(cfg);
  },

  /**
   * 获取控制点
   * @param {String} type 节点、边类型
   * @param  {Object} cfg 节点、边的配置项
   * @return {Array|null} 控制点的数组,如果为 null，则没有控制点
   */
  getAnchorPoints: function getAnchorPoints(type, cfg) {
    var shape = this.getShape(type);
    return shape.getAnchorPoints(cfg);
  }
};
/**
 * 绘制元素的工具类基类
 * @class Shape.ShapeBase
 */

var ShapeBase = {
  /**
   * 绘制
   */
  draw: function draw()
  /* cfg, group */
  {},

  /**
   * 绘制完成后的操作，便于用户继承现有的节点、边
   */
  afterDraw: function afterDraw()
  /* cfg, group */
  {},
  // update(cfg, item) // 默认不定义
  afterUpdate: function afterUpdate()
  /* cfg, item */
  {},

  /**
   * 设置节点、边状态
   */
  setState: function setState()
  /* name, value, item */
  {},

  /**
   * 获取控制点
   * @param  {Object} cfg 节点、边的配置项
   * @return {Array|null} 控制点的数组,如果为 null，则没有控制点
   */
  getControlPoints: function getControlPoints(cfg) {
    return cfg.controlPoints;
  },

  /**
   * 获取控制点
   * @param  {Object} cfg 节点、边的配置项
   * @return {Array|null} 控制点的数组,如果为 null，则没有控制点
   */
  getAnchorPoints: function getAnchorPoints(cfg) {
    return cfg.anchorPoints;
  }
  /* 如果没定义 update 方法，每次都调用 draw 方法
  update(cfg, item) {
   }
  */

}; // 注册 Geometry 获取图形的入口

Shape.registerFactory = function (factoryType, cfg) {
  var className = ucfirst(factoryType);
  var shapeFactory = Util.mix({}, ShapeFactoryBase, cfg);
  Shape[className] = shapeFactory;
  shapeFactory.className = className;
  addRegister(shapeFactory);
  return shapeFactory;
}; // 统一 registerNode, registerEdge, registerGuide 的实现


function addRegister(shapeFactory) {
  var functionName = 'register' + shapeFactory.className;

  Shape[functionName] = function (shapeType, cfg, extendShapeType) {
    var extendShape = extendShapeType ? shapeFactory.getShape(extendShapeType) : ShapeBase;
    var shapeObj = Util.mix({}, extendShape, cfg);
    shapeObj.type = shapeType;
    shapeFactory[shapeType] = shapeObj;
    return shapeObj;
  };
} // 获得 ShapeFactory


Shape.getFactory = function (factoryType) {
  var self = this;
  factoryType = ucfirst(factoryType);
  return self[factoryType];
};

module.exports = Shape;

/***/ }),

/***/ "./src/shape/single-shape-mixin.js":
/*!*****************************************!*\
  !*** ./src/shape/single-shape-mixin.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileOverview 自定义节点和边的过程中，发现大量重复代码
 * @author dxq613@gmail.com
 */
var Global = __webpack_require__(/*! ../global */ "./src/global.js");

var Util = __webpack_require__(/*! ../util/index */ "./src/util/index.js");

var CLS_SHAPE_SUFFIX = '-shape';
var CLS_LABEL_SUFFIX = '-label'; // 单个 shape 带有一个 label，共用这段代码

var SingleShape = {
  itemType: '',
  // node, edge, group, anchor 等

  /**
   * 绘制节点/边，包含文本
   * @override
   * @param  {Object} cfg 节点的配置项
   * @param  {G.Group} group 节点的容器
   * @return {G.Shape} 绘制的图形
   */
  draw: function draw(cfg, group) {
    var shape = this.drawShape(cfg, group);
    shape.set('className', this.itemType + CLS_SHAPE_SUFFIX);

    if (cfg.label) {
      var label = this.drawLabel(cfg, group);
      label.set('className', this.itemType + CLS_LABEL_SUFFIX);
    }

    return shape;
  },
  drawShape: function drawShape()
  /* cfg, group */
  {},
  drawLabel: function drawLabel(cfg, group) {
    var labelCfg = cfg.labelCfg || {};
    var labelStyle = this.getLabelStyle(cfg, labelCfg, group);
    var label = group.addShape('text', {
      attrs: labelStyle
    });
    return label;
  },
  getLabelStyleByPosition: function getLabelStyleByPosition()
  /* cfg, labelCfg, group */
  {},

  /**
  * 获取文本的配置项
  * @internal 用户创建和更新节点/边时，同时会更新文本
  * @param  {Object} cfg 节点的配置项
   * @param {Object} labelCfg 文本的配置项
  * @param {G.Group} group 父容器，label 的定位可能与图形相关
  * @return {Object} 图形的配置项
  */
  getLabelStyle: function getLabelStyle(cfg, labelCfg, group) {
    var calculateStyle = this.getLabelStyleByPosition(cfg, labelCfg, group);
    calculateStyle.text = cfg.label;
    var attrName = this.itemType + 'Label'; // 取 nodeLabel，edgeLabel 的配置项

    var defaultStyle = Global[attrName] ? Global[attrName].style : null;
    var labelStyle = Util.mix({}, defaultStyle, calculateStyle, labelCfg.style);
    return labelStyle;
  },

  /**
  * 获取图形的配置项
  * @internal 仅在定义这一类节点使用，用户创建和更新节点
  * @param  {Object} cfg 节点的配置项
  * @return {Object} 图形的配置项
  */
  getShapeStyle: function getShapeStyle(cfg) {
    return cfg.style;
  },

  /**
   * 更新节点，包含文本
   * @override
   * @param  {Object} cfg 节点/边的配置项
   * @param  {G6.Item} item 节点/边
   */
  update: function update(cfg, item) {
    var group = item.getContainer();
    var shapeClassName = this.itemType + CLS_SHAPE_SUFFIX;
    var shape = group.findByClassName(shapeClassName);
    var shapeStyle = this.getShapeStyle(cfg);
    shape.attr(shapeStyle);
    var labelClassName = this.itemType + CLS_LABEL_SUFFIX;
    var label = group.findByClassName(labelClassName); // 此时需要考虑之前是否绘制了 label 的场景存在三种情况
    // 1. 更新时不需要 label，但是原先存在 label，此时需要删除
    // 2. 更新时需要 label, 但是原先不存在，创建节点
    // 3. 如果两者都存在，更新

    if (!cfg.label) {
      label && label.remove();
    } else {
      if (!label) {
        var newLabel = this.drawLabel(cfg, group);
        newLabel.set('className', labelClassName);
      } else {
        var labelCfg = cfg.labelCfg || {};
        var labelStyle = this.getLabelStyle(cfg, labelCfg, group);
        /**
         * fixme g中shape的rotate是角度累加的，不是label的rotate想要的角度
         * 由于现在label只有rotate操作，所以在更新label的时候如果style中有rotate就重置一下变换
         * 后续会基于g的Text复写一个Label出来处理这一类问题
         */

        label.resetMatrix();
        label.attr(labelStyle);
      }
    }
  },

  /**
   * 设置节点的状态，主要是交互状态，业务状态请在 draw 方法中实现
   * 单图形的节点仅考虑 selected、active 状态，有其他状态需求的用户自己复写这个方法
   * @override
   * @param  {String} name 状态名称
   * @param  {Object} value 状态值
   * @param  {G6.Item} item 节点
   */
  setState: function setState(name, value, item) {
    var shape = item.get('keyShape');

    if (!shape) {
      return;
    }

    var stateStyle = item.getStateStyle(name);

    if (value) {
      // 如果设置状态,在原本状态上叠加绘图属性
      shape.attr(stateStyle);
    } else {
      // 取消状态时重置所有状态，依次叠加仍有的状态
      var style = item.getCurrentStatesStyle(); // 如果默认状态下没有设置attr，在某状态下设置了，需要重置到没有设置的状态

      Util.each(stateStyle, function (val, attr) {
        if (!style[attr]) {
          style[attr] = null;
        }
      });
      shape.attr(style);
    }
  }
};
module.exports = SingleShape;

/***/ }),

/***/ "./src/util/base.js":
/*!**************************!*\
  !*** ./src/util/base.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Event = __webpack_require__(/*! @antv/g/lib/event */ "./node_modules/@antv/g/lib/event.js");

var BaseUtil = {
  deepMix: __webpack_require__(/*! @antv/util/lib/deep-mix */ "./node_modules/@antv/util/lib/deep-mix.js"),
  mix: __webpack_require__(/*! @antv/util/lib/mix */ "./node_modules/@antv/util/lib/mix.js"),
  debounce: __webpack_require__(/*! @antv/util/lib/debounce */ "./node_modules/@antv/util/lib/debounce.js"),
  each: __webpack_require__(/*! @antv/util/lib/each */ "./node_modules/@antv/util/lib/each.js"),
  throttle: __webpack_require__(/*! @antv/util/lib/throttle */ "./node_modules/@antv/util/lib/throttle.js"),
  mat3: __webpack_require__(/*! @antv/util/lib/matrix/mat3 */ "./node_modules/@antv/util/lib/matrix/mat3.js"),
  vec2: __webpack_require__(/*! @antv/util/lib/matrix/vec2 */ "./node_modules/@antv/util/lib/matrix/vec2.js"),
  vec3: __webpack_require__(/*! @antv/util/lib/matrix/vec3 */ "./node_modules/@antv/util/lib/matrix/vec3.js"),
  transform: __webpack_require__(/*! @antv/util/lib/matrix/transform */ "./node_modules/@antv/util/lib/matrix/transform.js"),
  clone: __webpack_require__(/*! @antv/util/lib/clone */ "./node_modules/@antv/util/lib/clone.js"),
  upperFirst: __webpack_require__(/*! @antv/util/lib/string/upper-first */ "./node_modules/@antv/util/lib/string/upper-first.js"),
  isNil: __webpack_require__(/*! @antv/util/lib/type/is-nil */ "./node_modules/@antv/util/lib/type/is-nil.js"),
  isArray: __webpack_require__(/*! @antv/util/lib/type/is-array */ "./node_modules/@antv/util/lib/type/is-array.js"),
  createDom: __webpack_require__(/*! @antv/util/lib/dom/create-dom */ "./node_modules/@antv/util/lib/dom/create-dom.js"),
  modifyCSS: __webpack_require__(/*! @antv/util/lib/dom/modify-css */ "./node_modules/@antv/util/lib/dom/modify-css.js"),
  isObject: __webpack_require__(/*! @antv/util/lib/type/is-object */ "./node_modules/@antv/util/lib/type/is-object.js"),
  isPlainObject: __webpack_require__(/*! @antv/util/lib/type/is-plain-object */ "./node_modules/@antv/util/lib/type/is-plain-object.js"),
  isNumber: __webpack_require__(/*! @antv/util/lib/type/is-number */ "./node_modules/@antv/util/lib/type/is-number.js"),
  isString: __webpack_require__(/*! @antv/util/lib/type/is-string */ "./node_modules/@antv/util/lib/type/is-string.js"),
  uniqueId: __webpack_require__(/*! @antv/util/lib/unique-id */ "./node_modules/@antv/util/lib/unique-id.js"),
  addEventListener: __webpack_require__(/*! @antv/util/lib/dom/add-event-listener */ "./node_modules/@antv/util/lib/dom/add-event-listener.js"),
  wrapBehavior: __webpack_require__(/*! @antv/util/lib/event/wrap-behavior */ "./node_modules/@antv/util/lib/event/wrap-behavior.js"),
  extend: __webpack_require__(/*! @antv/util/lib/extend */ "./node_modules/@antv/util/lib/extend.js"),
  augment: __webpack_require__(/*! @antv/util/lib/augment */ "./node_modules/@antv/util/lib/augment.js"),
  remove: __webpack_require__(/*! @antv/util/lib/array/remove */ "./node_modules/@antv/util/lib/array/remove.js"),

  /**
   * turn padding into [top, right, bottom, right]
   * @param  {Number|Array} padding input padding
   * @return {array} output
   */
  formatPadding: function formatPadding(padding) {
    var top = 0;
    var left = 0;
    var right = 0;
    var bottom = 0;

    if (BaseUtil.isNumber(padding) || BaseUtil.isString(padding)) {
      top = left = right = bottom = padding;
    } else if (BaseUtil.isArray(padding)) {
      top = padding[0];
      right = !BaseUtil.isNil(padding[1]) ? padding[1] : padding[0];
      bottom = !BaseUtil.isNil(padding[2]) ? padding[2] : padding[0];
      left = !BaseUtil.isNil(padding[3]) ? padding[3] : right;
    }

    return [top, right, bottom, left];
  },
  cloneEvent: function cloneEvent(e) {
    var event = new Event(e.type, e, true, true);
    event.clientX = e.clientX;
    event.clientY = e.clientY;
    event.x = e.x;
    event.y = e.y;
    event.target = e.target;
    event.currentTarget = e.currentTarget;
    event.item = e.item;
    return event;
  }
};
module.exports = BaseUtil;

/***/ }),

/***/ "./src/util/graphic.js":
/*!*****************************!*\
  !*** ./src/util/graphic.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/**
 * @fileOverview graphic util
 * @author huangtonger@aliyun.com
 */
var MathUtil = __webpack_require__(/*! ./math */ "./src/util/math.js");

var BaseUtil = __webpack_require__(/*! ./base */ "./src/util/base.js");

var Global = __webpack_require__(/*! ../global */ "./src/global.js");

var PI = Math.PI;
var sin = Math.sin;
var cos = Math.cos; // 一共支持8个方向的自环，每个环占的角度是45度，在计算时再二分，为22.5度

var SELF_LINK_SIN = sin(PI / 8);
var SELF_LINK_COS = cos(PI / 8);

function traverse(data, fn) {
  if (fn(data) === false) {
    return;
  }

  BaseUtil.each(data.children, function (child) {
    traverse(child, fn);
  });
}

var GraphicUtil = {
  getBBox: function getBBox(element, parent) {
    var bbox = element.getBBox();
    var leftTop = {
      x: bbox.minX,
      y: bbox.minY
    };
    var rightBottom = {
      x: bbox.maxX,
      y: bbox.maxY
    }; // 根据父元素变换矩阵

    if (parent) {
      var matrix = parent.getMatrix();
      leftTop = MathUtil.applyMatrix(leftTop, matrix);
      rightBottom = MathUtil.applyMatrix(rightBottom, matrix);
    }

    return {
      minX: leftTop.x,
      minY: leftTop.y,
      maxX: rightBottom.x,
      maxY: rightBottom.y
    };
  },
  // 获取某元素的自环边配置
  getLoopCfgs: function getLoopCfgs(cfg) {
    var item = cfg.sourceNode || cfg.targetNode;
    var containerMatrix = item.get('group').getMatrix();
    var bbox = item.getKeyShape().getBBox();
    var loopCfg = cfg.loopCfg || {}; // 距离keyShape边的最高距离

    var dist = loopCfg.dist || Math.max(bbox.width, bbox.height) * 2; // 自环边与keyShape的相对位置关系

    var position = loopCfg.position || Global.loopPosition;
    var r = Math.max(bbox.width, bbox.height) / 2;
    var scaleRate = (r + dist) / r; // 中心取group上真实位置

    var center = [containerMatrix[6], containerMatrix[7]];
    var sinDelta = r * SELF_LINK_SIN;
    var cosDelta = r * SELF_LINK_COS;
    var startPoint = [cfg.startPoint.x, cfg.startPoint.y];
    var endPoint = [cfg.endPoint.x, cfg.endPoint.y]; // 如果定义了锚点的，直接用锚点坐标，否则，根据自环的 cfg 计算

    if (startPoint[0] === endPoint[0] && startPoint[1] === endPoint[1]) {
      switch (position) {
        case 'top':
          startPoint = [center[0] - sinDelta, center[1] - cosDelta];
          endPoint = [center[0] + sinDelta, center[1] - cosDelta];
          break;

        case 'top-right':
          startPoint = [center[0] + sinDelta, center[1] - cosDelta];
          endPoint = [center[0] + cosDelta, center[1] - sinDelta];
          break;

        case 'right':
          startPoint = [center[0] + cosDelta, center[1] - sinDelta];
          endPoint = [center[0] + cosDelta, center[1] + sinDelta];
          break;

        case 'bottom-right':
          startPoint = [center[0] + cosDelta, center[1] + sinDelta];
          endPoint = [center[0] + sinDelta, center[1] + cosDelta];
          break;

        case 'bottom':
          startPoint = [center[0] + sinDelta, center[1] + cosDelta];
          endPoint = [center[0] - sinDelta, center[1] + cosDelta];
          break;

        case 'bottom-left':
          startPoint = [center[0] - sinDelta, center[1] + cosDelta];
          endPoint = [center[0] - cosDelta, center[1] + sinDelta];
          break;

        case 'left':
          startPoint = [center[0] - cosDelta, center[1] + sinDelta];
          endPoint = [center[0] - cosDelta, center[1] - sinDelta];
          break;

        case 'top-left':
          startPoint = [center[0] - cosDelta, center[1] - sinDelta];
          endPoint = [center[0] - sinDelta, center[1] - cosDelta];
          break;

        default:
          startPoint = [center[0] - sinDelta, center[1] - cosDelta];
          endPoint = [center[0] + sinDelta, center[1] - cosDelta];
      } // 如果逆时针画，交换起点和终点


      if (loopCfg.clockwise === false) {
        var swap = [startPoint[0], startPoint[1]];
        startPoint = [endPoint[0], endPoint[1]];
        endPoint = [swap[0], swap[1]];
      }
    }

    var startVec = [startPoint[0] - center[0], startPoint[1] - center[1]];
    var startExtendVec = BaseUtil.vec2.scale([], startVec, scaleRate);
    var controlPoint1 = [center[0] + startExtendVec[0], center[1] + startExtendVec[1]];
    var endVec = [endPoint[0] - center[0], endPoint[1] - center[1]];
    var endExtendVec = BaseUtil.vec2.scale([], endVec, scaleRate);
    var controlPoint2 = [center[0] + endExtendVec[0], center[1] + endExtendVec[1]]; // 不管原 shape 如何，要画出自环 shape 应是 cubic

    cfg.shape = 'cubic';
    cfg.startPoint = {
      x: startPoint[0],
      y: startPoint[1]
    };
    cfg.endPoint = {
      x: endPoint[0],
      y: endPoint[1]
    };
    cfg.controlPoints = [{
      x: controlPoint1[0],
      y: controlPoint1[1]
    }, {
      x: controlPoint2[0],
      y: controlPoint2[1]
    }];
    return cfg;
  },
  traverseTree: function traverseTree(data, fn) {
    if (typeof fn !== 'function') {
      return;
    }

    traverse(data, fn);
  },
  radialLayout: function radialLayout(data, layout) {
    // 布局方式有 H / V / LR / RL / TB / BT
    var VERTICAL_LAYOUTS = ['V', 'TB', 'BT'];
    var min = {
      x: Infinity,
      y: Infinity
    };
    var max = {
      x: -Infinity,
      y: -Infinity
    }; // 默认布局是垂直布局TB，此时x对应rad，y对应r

    var rScale = 'x';
    var radScale = 'y';

    if (layout && VERTICAL_LAYOUTS.indexOf(layout) >= 0) {
      // 若是水平布局，y对应rad，x对应r
      radScale = 'x';
      rScale = 'y';
    }

    var count = 0;
    this.traverseTree(data, function (node) {
      count++;

      if (node.x > max.x) {
        max.x = node.x;
      }

      if (node.x < min.x) {
        min.x = node.x;
      }

      if (node.y > max.y) {
        max.y = node.y;
      }

      if (node.y < min.y) {
        min.y = node.y;
      }
    });
    var avgRad = PI * 2 / count;
    var radDiff = max[radScale] - min[radScale];

    if (radDiff === 0) {
      return data;
    }

    this.traverseTree(data, function (node) {
      var radial = (node[radScale] - min[radScale]) / radDiff * (PI * 2 - avgRad) + avgRad;
      var r = Math.abs(rScale === 'x' ? node.x - data.x : node.y - data.y);
      node.x = r * Math.cos(radial);
      node.y = r * Math.sin(radial);
    });
    return data;
  },

  /**
   * 根据 label 所在线条的位置百分比，计算 label 坐标
   * @param {object}  pathShape  G 的 path 实例，一般是 Edge 实例的 keyShape
   * @param {number}  percent    范围 0 - 1 的线条百分比
   * @param {number}  refX     x 轴正方向为基准的 label 偏移
   * @param {number}  refY     y 轴正方向为基准的 label 偏移
   * @param {boolean} rotate     是否根据线条斜率旋转文本
   * @return {object} 文本的 x, y, 文本的旋转角度
   */
  getLabelPosition: function getLabelPosition(pathShape, percent, refX, refY, rotate) {
    var TAN_OFFSET = 0.0001;
    var vector = [];
    var point = pathShape.getPoint(percent); // 头尾最可能，放在最前面，使用 g path 上封装的方法

    if (percent < TAN_OFFSET) {
      vector = pathShape.getStartTangent().reverse();
    } else if (percent > 1 - TAN_OFFSET) {
      vector = pathShape.getEndTangent();
    } else {
      // 否则取指定位置的点,与少量偏移的点，做微分向量
      var offsetPoint = pathShape.getPoint(percent + TAN_OFFSET);
      vector.push([point.x, point.y]);
      vector.push([offsetPoint.x, offsetPoint.y]);
    }

    var rad = Math.atan2(vector[1][1] - vector[0][1], vector[1][0] - vector[0][0]);

    if (rad < 0) {
      rad += PI * 2;
    }

    if (refX) {
      point.x += cos(rad) * refX;
      point.y += sin(rad) * refX;
    }

    if (refY) {
      // 默认方向是 x 轴正方向，法线是 求出角度 - 90°
      var normal = rad - PI / 2; // 若法线角度在 y 轴负方向，切到正方向，保证 refY 相对于 y 轴正方向

      if (rad > 1 / 2 * PI && rad < 3 * 1 / 2 * PI) {
        normal -= PI;
      }

      point.x += cos(normal) * refY;
      point.y += sin(normal) * refY;
    } // 需要原始的旋转角度计算 textAlign


    var result = {
      x: point.x,
      y: point.y,
      angle: rad
    };

    if (rotate) {
      if (rad > 1 / 2 * PI && rad < 3 * 1 / 2 * PI) {
        rad -= PI;
      }

      return _extends({
        rotate: rad
      }, result);
    }

    return result;
  }
};
module.exports = GraphicUtil;

/***/ }),

/***/ "./src/util/index.js":
/*!***************************!*\
  !*** ./src/util/index.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileOverview util
 * @author huangtonger@aliyun.com
 */
var Util = {};

var MathUtil = __webpack_require__(/*! ./math */ "./src/util/math.js");

var PathUtil = __webpack_require__(/*! ./path */ "./src/util/path.js");

var BaseUtil = __webpack_require__(/*! ./base */ "./src/util/base.js");

var GraphicUtil = __webpack_require__(/*! ./graphic */ "./src/util/graphic.js");

BaseUtil.deepMix(Util, BaseUtil, GraphicUtil, PathUtil, MathUtil);
module.exports = Util;

/***/ }),

/***/ "./src/util/math.js":
/*!**************************!*\
  !*** ./src/util/math.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileOverview math util
 * @author huangtonger@aliyun.com
 */
var BaseUtil = __webpack_require__(/*! ./base */ "./src/util/base.js");

var tolerance = 0.001;
var MathUtil = {
  /**
   * 是否在区间内
   * @param   {number}       value  值
   * @param   {number}       min    最小值
   * @param   {number}       max    最大值
   * @return  {boolean}      bool   布尔
   */
  isBetween: function isBetween(value, min, max) {
    return value >= min && value <= max;
  },

  /**
   * 两线段交点
   * @param  {object}  p0 第一条线段起点
   * @param  {object}  p1 第一条线段终点
   * @param  {object}  p2 第二条线段起点
   * @param  {object}  p3 第二条线段终点
   * @return {object}  交点
   */
  getLineIntersect: function getLineIntersect(p0, p1, p2, p3) {
    var E = {
      x: p2.x - p0.x,
      y: p2.y - p0.y
    };
    var D0 = {
      x: p1.x - p0.x,
      y: p1.y - p0.y
    };
    var D1 = {
      x: p3.x - p2.x,
      y: p3.y - p2.y
    };
    var kross = D0.x * D1.y - D0.y * D1.x;
    var sqrKross = kross * kross;
    var sqrLen0 = D0.x * D0.x + D0.y * D0.y;
    var sqrLen1 = D1.x * D1.x + D1.y * D1.y;
    var point = null;

    if (sqrKross > tolerance * sqrLen0 * sqrLen1) {
      var s = (E.x * D1.y - E.y * D1.x) / kross;
      var t = (E.x * D0.y - E.y * D0.x) / kross;

      if (MathUtil.isBetween(s, 0, 1) && MathUtil.isBetween(t, 0, 1)) {
        point = {
          x: p0.x + s * D0.x,
          y: p0.y + s * D0.y
        };
      }
    }

    return point;
  },

  /**
   * point and rectangular intersection point
   * @param  {object} rect  rect
   * @param  {object} point point
   * @return {object} rst;
   */
  getRectIntersectByPoint: function getRectIntersectByPoint(rect, point) {
    var x = rect.x,
        y = rect.y,
        width = rect.width,
        height = rect.height;
    var cx = x + width / 2;
    var cy = y + height / 2;
    var points = [];
    var center = {
      x: cx,
      y: cy
    };
    points.push({
      x: x,
      y: y
    });
    points.push({
      x: x + width,
      y: y
    });
    points.push({
      x: x + width,
      y: y + height
    });
    points.push({
      x: x,
      y: y + height
    });
    points.push({
      x: x,
      y: y
    });
    var rst = null;

    for (var i = 1; i < points.length; i++) {
      rst = MathUtil.getLineIntersect(points[i - 1], points[i], center, point);

      if (rst) {
        break;
      }
    }

    return rst;
  },

  /**
   * get point and circle inIntersect
   * @param {Object} circle 圆点，x,y,r
   * @param {Object} point 点 x,y
   * @return {object} applied point
   */
  getCircleIntersectByPoint: function getCircleIntersectByPoint(circle, point) {
    var cx = circle.x;
    var cy = circle.y;
    var r = circle.r;
    var x = point.x,
        y = point.y;
    var d = Math.sqrt(Math.pow(x - cx, 2) + Math.pow(y - cy, 2));

    if (d < r) {
      return null;
    }

    var dx = x - cx;
    var dy = y - cy;
    var signX = Math.sign(dx);
    var signY = Math.sign(dy);
    var angle = Math.atan(dy / dx);
    return {
      x: cx + Math.abs(r * Math.cos(angle)) * signX,
      y: cy + Math.abs(r * Math.sin(angle)) * signY
    };
  },

  /**
   * get point and ellipse inIntersect
   * @param {Object} ellipse 椭圆 x,y,rx,ry
   * @param {Object} point 点 x,y
   * @return {object} applied point
   */
  getEllispeIntersectByPoint: function getEllispeIntersectByPoint(ellipse, point) {
    // 计算线段 (point.x, point.y) 到 (ellipse.x, ellipse.y) 与椭圆的交点
    var a = ellipse.rx;
    var b = ellipse.ry;
    var cx = ellipse.x;
    var cy = ellipse.y; // const c = Math.sqrt(a * a - b * b); // 焦距

    var dx = point.x - cx;
    var dy = point.y - cy;
    var angle = Math.atan2(dy / b, dx / a); // 直接通过 x,y 求夹角，求出来的范围是 -PI, PI

    if (angle < 0) {
      angle += 2 * Math.PI; // 转换到 0，2PI
    } // 通过参数方程求交点
    // const r = (b * b) / (a - c * Math.sin(angle));


    return {
      x: cx + a * Math.cos(angle),
      y: cy + b * Math.sin(angle)
    };
  },

  /**
   * coordinate matrix transformation
   * @param  {number} point   coordinate
   * @param  {number} matrix  matrix
   * @param  {number} tag     could be 0 or 1
   * @return {object} transformed point
   */
  applyMatrix: function applyMatrix(point, matrix, tag) {
    if (tag === void 0) {
      tag = 1;
    }

    var vector = [point.x, point.y, tag];
    BaseUtil.vec3.transformMat3(vector, vector, matrix);
    return {
      x: vector[0],
      y: vector[1]
    };
  },

  /**
   * coordinate matrix invert transformation
   * @param  {number} point   coordinate
   * @param  {number} matrix  matrix
   * @param  {number} tag     could be 0 or 1
   * @return {object} transformed point
   */
  invertMatrix: function invertMatrix(point, matrix, tag) {
    if (tag === void 0) {
      tag = 1;
    }

    var inversedMatrix = BaseUtil.mat3.invert([], matrix);
    var vector = [point.x, point.y, tag];
    BaseUtil.vec3.transformMat3(vector, vector, inversedMatrix);
    return {
      x: vector[0],
      y: vector[1]
    };
  }
};
module.exports = BaseUtil.mix({}, BaseUtil, MathUtil);

/***/ }),

/***/ "./src/util/path.js":
/*!**************************!*\
  !*** ./src/util/path.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileOverview path util
 * @author huangtonger@aliyun.com
 */
var G = __webpack_require__(/*! @antv/g/lib */ "./node_modules/@antv/g/lib/index.js");

var BaseUtil = __webpack_require__(/*! ./base */ "./src/util/base.js");

var vec2 = BaseUtil.vec2;
module.exports = {
  getSpline: function getSpline(points) {
    var data = [];

    for (var i = 0; i < points.length; i++) {
      var point = points[i];
      data.push(point.x);
      data.push(point.y);
    }

    var splinePath = G.PathUtil.catmullRomToBezier(data);
    splinePath.unshift(['M', points[0].x, points[0].y]);
    return splinePath;
  },

  /**
   * 根据起始点、相对位置、偏移量计算控制点
   * @param  {Object} startPoint 起始点，包含 x,y
   * @param  {Object} endPoint  结束点, 包含 x,y
   * @param  {Number} percent   相对位置,范围 0-1
   * @param  {Number} offset    偏移量
   * @return {Object} 控制点，包含 x,y
   */
  getControlPoint: function getControlPoint(startPoint, endPoint, percent, offset) {
    var point = {
      x: (1 - percent) * startPoint.x + percent * endPoint.x,
      y: (1 - percent) * startPoint.y + percent * endPoint.y
    };
    var tangent = []; // 类似于 C 语言的写法，真难用

    vec2.normalize(tangent, [endPoint.x - startPoint.x, endPoint.y - startPoint.y]);
    var perpendicular = [-tangent[1] * offset, tangent[0] * offset]; // 垂直向量

    point.x += perpendicular[0];
    point.y += perpendicular[1];
    return point;
  }
};

/***/ })

/******/ });
});
//# sourceMappingURL=g6.js.map