"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lappdelegate = require("./lappdelegate");

var _lapplive2dmanager = require("./lapplive2dmanager");

var LAppDefine = _interopRequireWildcard(require("./lappdefine"));

var _react = _interopRequireWildcard(require("react"));

require("./asset/index.css");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function ReactLive2d(props) {
  // 好看颜色列表
  // green: '#B4DEAE',
  // DeepBlue: '#5B8DBE',
  // LightBlue: '#C8E6FE',
  // pink: '#F9B8BE'
  // 容器样式
  var containerStyle = {
    position: 'fixed',
    top: props.top ? props.top : '',
    right: props.right ? props.right : '0',
    bottom: props.bottom ? props.bottom : '0',
    left: props.left ? props.left : ''
  }; // canvas样式

  var canvasStyle = {
    position: 'relative',
    top: props.top ? props.top : '',
    right: props.right ? props.right : '0',
    bottom: props.bottom ? props.bottom : '0',
    left: props.left ? props.left : ''
  }; // 对话框样式

  var printStyle = _defineProperty({
    position: 'absolute',
    width: props.width > 300 ? props.width / 2 : '150px',
    left: props.width > 300 ? (props.width - props.width / 2) / 2 + 'px' : (props.width - 150) / 2 + 'px',
    top: '0',
    minHeight: '20px',
    display: 'block',
    borderRadius: '5px',
    border: '1px dashed #ccc',
    padding: '5px',
    background: props.color ? props.color : '#C8E6FE'
  }, "display", 'none'); // 面板主题样式


  var Theme = {
    color: props.color ? props.color : '#C8E6FE',
    width: '30px',
    height: '30px'
  };
  var timer = null;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      controllerOn = _useState2[0],
      setControllerOn = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      controllerIn = _useState4[0],
      setControllerIn = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      printMenu = _useState6[0],
      setPrintMenu = _useState6[1]; // 进入显示控制台


  function cvMouseOver() {
    setControllerOn(true);
  }

  function cvMouseOut() {
    timer = setTimeout(function () {
      // 0.01秒内没有进入点击面板，说明已经鼠标离开
      if (!controllerIn) {
        setControllerOn(false);
        setControllerIn(false);
      }
    }, 10);
  } // 进入选择菜单


  function ctMouseOver() {
    setControllerIn(true);
    clearTimeout(timer);
  } // 离开选择菜单


  function ctMouseOut() {
    setControllerIn(false);
  } //切换


  function ctTab() {
    _lapplive2dmanager.LAppLive2DManager.getInstance().nextScene();
  } // 悬停菜单时的对白


  function talkPrint(print) {
    var printNow = document.getElementById('live2d-print');
    printNow.innerHTML = print;
    printNow.style.display = 'block';
  }

  function cancelPrint() {
    var printNow = document.getElementById('live2d-print');
    printNow.innerHTML = '';
    printNow.style.display = 'none';
  }

  (0, _react.useEffect)(function () {
    console.log('props', props);
    props.ModelList ? LAppDefine.lappdefineSet.setModelDir(props.ModelList) : LAppDefine.lappdefineSet.setModelDir([]);
    props.TouchBody ? LAppDefine.lappdefineSet.setHitBody(props.TouchBody) : LAppDefine.lappdefineSet.setHitBody([]);
    props.TouchHead ? LAppDefine.lappdefineSet.setHitHead(props.TouchHead) : LAppDefine.lappdefineSet.setHitHead([]);
    props.TouchDefault ? LAppDefine.lappdefineSet.setHitDefault(props.TouchDefault) : LAppDefine.lappdefineSet.setHitDefault([]);
    props.PathFull ? LAppDefine.lappdefineSet.setPathFull(props.PathFull) : LAppDefine.lappdefineSet.setPathFull('');

    if (!navigator.userAgent.match(/mobile/i) || props.MobileShow == true) {
      if (_lappdelegate.LAppDelegate.getInstance().initialize() == false) {
        return;
      }

      _lappdelegate.LAppDelegate.getInstance().run(); // window.onbeforeunload = () => LAppDelegate.releaseInstance();

    }
  }, []);
  (0, _react.useEffect)(function () {
    if (props.release == true) {
      _lappdelegate.LAppDelegate.releaseInstance();
    }
  }, [props.release]);
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
    style: containerStyle,
    width: props.width ? props.width : '300',
    height: props.height ? props.height : '500',
    id: "live2d-container"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    id: "live2d-hidden",
    style: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: '0',
      left: '0',
      zIndex: '2'
    }
  }), /*#__PURE__*/_react["default"].createElement("div", {
    id: "live2d-print",
    style: printStyle
  }), /*#__PURE__*/_react["default"].createElement("canvas", {
    id: "live2d",
    style: canvasStyle,
    width: props.width ? props.width : '300',
    height: props.height ? props.height : '500',
    className: "live2d",
    onMouseEnter: cvMouseOver,
    onMouseLeave: cvMouseOut
  }), controllerOn && (!props.menuList || props.menuList.length > 0) && /*#__PURE__*/_react["default"].createElement("div", {
    className: "live2d-controller",
    style: {
      position: 'absolute',
      top: '20px',
      left: '20px'
    },
    onMouseEnter: ctMouseOver,
    onMouseLeave: ctMouseOut
  }, (!props.menuList || props.menuList.indexOf('Mtab') > -1) && /*#__PURE__*/_react["default"].createElement("div", {
    className: "iconfont",
    style: Theme,
    onClick: ctTab,
    onMouseEnter: function onMouseEnter() {
      return talkPrint('你想要换一个看板娘吗？');
    },
    onMouseLeave: cancelPrint
  }, "\uE7CA"))));
}

var _default = ReactLive2d;
exports["default"] = _default;