"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lappdelegate = require("./lappdelegate");

var LAppDefine = _interopRequireWildcard(require("./lappdefine"));

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
    left: props.width > 300 ? (props.width - props.width / 2) / 2 : (props.width - 150) / 2,
    top: '0',
    minHeight: '20px',
    display: 'block',
    borderRadius: '5px',
    border: '1px dashed #ccc',
    padding: '5px',
    background: props.color ? props.color : '#C8E6FE'
  }, "display", 'none');

  (0, _react.useEffect)(function () {
    console.log('props', props);
    props.ModelList ? LAppDefine.lappdefineSet.setModelDir(props.ModelList) : LAppDefine.lappdefineSet.setModelDir([]);
    props.TouchBody ? LAppDefine.lappdefineSet.setHitBody(props.TouchBody) : LAppDefine.lappdefineSet.setHitBody([]);
    props.TouchHead ? LAppDefine.lappdefineSet.setHitHead(props.TouchHead) : LAppDefine.lappdefineSet.setHitHead([]);

    if (_lappdelegate.LAppDelegate.getInstance().initialize() == false) {
      return;
    }

    _lappdelegate.LAppDelegate.getInstance().run();

    window.onbeforeunload = function () {
      return _lappdelegate.LAppDelegate.releaseInstance();
    };
  }, []);
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
    style: containerStyle,
    width: props.width ? props.width : '300',
    height: props.height ? props.height : '500',
    id: "live2d-container"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    id: "live2d-print",
    style: printStyle
  }), /*#__PURE__*/_react["default"].createElement("canvas", {
    id: "live2d",
    style: canvasStyle,
    width: props.width ? props.width : '300',
    height: props.height ? props.height : '500',
    className: "live2d"
  })));
}

var _default = ReactLive2d;
exports["default"] = _default;