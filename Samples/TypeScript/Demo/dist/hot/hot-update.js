webpackHotUpdatelive2d("main",{

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lappdelegate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lappdelegate */ "./src/lappdelegate.ts");
/* harmony import */ var _lappdelegate__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lappdelegate__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lappdefine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lappdefine */ "./src/lappdefine.ts");
/* harmony import */ var _lappdefine__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lappdefine__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
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
  }, "display", 'none');

  Object(react__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function () {
    console.log('props', props);
    props.ModelList ? _lappdefine__WEBPACK_IMPORTED_MODULE_1__["lappdefineSet"].setModelDir(props.ModelList) : _lappdefine__WEBPACK_IMPORTED_MODULE_1__["lappdefineSet"].setModelDir([]);
    props.TouchBody ? _lappdefine__WEBPACK_IMPORTED_MODULE_1__["lappdefineSet"].setHitBody(props.TouchBody) : _lappdefine__WEBPACK_IMPORTED_MODULE_1__["lappdefineSet"].setHitBody([]);
    props.TouchHead ? _lappdefine__WEBPACK_IMPORTED_MODULE_1__["lappdefineSet"].setHitHead(props.TouchHead) : _lappdefine__WEBPACK_IMPORTED_MODULE_1__["lappdefineSet"].setHitHead([]);
    props.PathFull ? _lappdefine__WEBPACK_IMPORTED_MODULE_1__["lappdefineSet"].setPathFull(props.PathFull) : _lappdefine__WEBPACK_IMPORTED_MODULE_1__["lappdefineSet"].setPathFull('');

    if (!navigator.userAgent.match(/mobile/i) || props.MobileShow == true) {
      if (_lappdelegate__WEBPACK_IMPORTED_MODULE_0__["LAppDelegate"].getInstance().initialize() == false) {
        return;
      }

      _lappdelegate__WEBPACK_IMPORTED_MODULE_0__["LAppDelegate"].getInstance().run();

      window.onbeforeunload = function () {
        return _lappdelegate__WEBPACK_IMPORTED_MODULE_0__["LAppDelegate"].releaseInstance();
      };
    }
  }, []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    style: containerStyle,
    width: props.width ? props.width : '300',
    height: props.height ? props.height : '500',
    id: "live2d-container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    id: "live2d-print",
    style: printStyle
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("canvas", {
    id: "live2d",
    style: canvasStyle,
    width: props.width ? props.width : '300',
    height: props.height ? props.height : '500',
    className: "live2d"
  })));
}

/* harmony default export */ __webpack_exports__["default"] = (ReactLive2d);

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9saXZlMmQvLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiUmVhY3RMaXZlMmQiLCJwcm9wcyIsImNvbnRhaW5lclN0eWxlIiwicG9zaXRpb24iLCJ0b3AiLCJyaWdodCIsImJvdHRvbSIsImxlZnQiLCJjYW52YXNTdHlsZSIsInByaW50U3R5bGUiLCJ3aWR0aCIsIm1pbkhlaWdodCIsImRpc3BsYXkiLCJib3JkZXJSYWRpdXMiLCJib3JkZXIiLCJwYWRkaW5nIiwiYmFja2dyb3VuZCIsImNvbG9yIiwidXNlRWZmZWN0IiwiY29uc29sZSIsImxvZyIsIk1vZGVsTGlzdCIsIkxBcHBEZWZpbmUiLCJzZXRNb2RlbERpciIsIlRvdWNoQm9keSIsInNldEhpdEJvZHkiLCJUb3VjaEhlYWQiLCJzZXRIaXRIZWFkIiwiUGF0aEZ1bGwiLCJzZXRQYXRoRnVsbCIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsIm1hdGNoIiwiTW9iaWxlU2hvdyIsIkxBcHBEZWxlZ2F0ZSIsImdldEluc3RhbmNlIiwiaW5pdGlhbGl6ZSIsInJ1biIsIndpbmRvdyIsIm9uYmVmb3JldW5sb2FkIiwicmVsZWFzZUluc3RhbmNlIiwiaGVpZ2h0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBOztBQUVBLFNBQVNBLFdBQVQsQ0FBcUJDLEtBQXJCLEVBQTRCO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBLE1BQUlDLGNBQWMsR0FBRztBQUNqQkMsWUFBUSxFQUFHLE9BRE07QUFFakJDLE9BQUcsRUFBRUgsS0FBSyxDQUFDRyxHQUFOLEdBQVlILEtBQUssQ0FBQ0csR0FBbEIsR0FBd0IsRUFGWjtBQUdqQkMsU0FBSyxFQUFFSixLQUFLLENBQUNJLEtBQU4sR0FBY0osS0FBSyxDQUFDSSxLQUFwQixHQUE0QixHQUhsQjtBQUlqQkMsVUFBTSxFQUFFTCxLQUFLLENBQUNLLE1BQU4sR0FBZUwsS0FBSyxDQUFDSyxNQUFyQixH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LGVBQWIsRUFBTjtBQUFBLE9BQXhCO0FBQ0g7QUFFSixHQXBCUSxFQW9CTixFQXBCTSxDQUFUO0FBc0JBLHNCQUNJLHFGQUNJO0FBQ0MsU0FBSyxFQUFFdEMsY0FEUjtBQUVDLFNBQUssRUFBRUQsS0FBSyxDQUFDUyxLQUFOLEdBQWNULEtBQUssQ0FBQ1MsS0FBcEIsR0FBNEIsS0FGcEM7QUFHQyxVQUFNLEVBQUVULEtBQUssQ0FBQ3dDLE1BQU4sR0FBZXhDLEtBQUssQ0FBQ3dDLE1BQXJCLEdBQThCLEtBSHZDO0FBSUMsTUFBRSxFQUFDO0FBSkosa0JBS0k7QUFBSyxNQUFFLEVBQUMsY0FBUjtBQUNJLFNBQUssRUFBRWhDO0FBRFgsSUFMSixlQVFJO0FBQ0ksTUFBRSxFQUFDLFFBRFA7QUFFSSxTQUFLLEVBQUVELFdBRlg7QUFHSSxTQUFLLEVBQUVQLEtBQUssQ0FBQ1MsS0FBTixHQUFjVCxLQUFLLENBQUNTLEtBQXBCLEdBQTRCLEtBSHZDO0FBSUksVUFBTSxFQUFFVCxLQUFLLENBQUN3QyxNQUFOLEdBQWV4QyxLQUFLLENBQUN3QyxNQUFyQixHQUE4QixLQUoxQztBQUtJLGFBQVMsRUFBQztBQUxkLElBUkosQ0FESixDQURKO0FBb0JIOztBQUVjekMsMEVBQWYsRSIsImZpbGUiOiJob3QvaG90LXVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExBcHBEZWxlZ2F0ZSB9IGZyb20gJy4vbGFwcGRlbGVnYXRlJztcclxuaW1wb3J0ICogYXMgTEFwcERlZmluZSBmcm9tICcuL2xhcHBkZWZpbmUnO1xyXG5pbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcclxuXHJcbmZ1bmN0aW9uIFJlYWN0TGl2ZTJkKHByb3BzKSB7XHJcbiAgICAvLyDlpb3nnIvpopzoibLliJfooahcclxuICAgIC8vIGdyZWVuOiAnI0I0REVBRScsXHJcbiAgICAvLyBEZWVwQmx1ZTogJyM1QjhEQkUnLFxyXG4gICAgLy8gTGlnaHRCbHVlOiAnI0M4RTZGRScsXHJcbiAgICAvLyBwaW5rOiAnI0Y5QjhCRSdcclxuXHJcbiAgICAvLyDlrrnlmajmoLflvI9cclxuICAgIGxldCBjb250YWluZXJTdHlsZSA9IHtcclxuICAgICAgICBwb3NpdGlvbiA6ICdmaXhlZCcsXHJcbiAgICAgICAgdG9wOiBwcm9wcy50b3AgPyBwcm9wcy50b3AgOiAnJyxcclxuICAgICAgICByaWdodDogcHJvcHMucmlnaHQgPyBwcm9wcy5yaWdodCA6ICcwJyxcclxuICAgICAgICBib3R0b206IHByb3BzLmJvdHRvbSA/IHByb3BzLmJvdHRvbSA6ICcwJyxcclxuICAgICAgICBsZWZ0OiBwcm9wcy5sZWZ0ID8gcHJvcHMubGVmdCA6ICcnXHJcbiAgICB9XHJcbiAgICAvLyBjYW52YXPmoLflvI9cclxuICAgIGxldCBjYW52YXNTdHlsZSA9IHtcclxuICAgICAgICBwb3NpdGlvbiA6ICdyZWxhdGl2ZScsXHJcbiAgICAgICAgdG9wOiBwcm9wcy50b3AgPyBwcm9wcy50b3AgOiAnJyxcclxuICAgICAgICByaWdodDogcHJvcHMucmlnaHQgPyBwcm9wcy5yaWdodCA6ICcwJyxcclxuICAgICAgICBib3R0b206IHByb3BzLmJvdHRvbSA/IHByb3BzLmJvdHRvbSA6ICcwJyxcclxuICAgICAgICBsZWZ0OiBwcm9wcy5sZWZ0ID8gcHJvcHMubGVmdCA6ICcnXHJcbiAgICB9XHJcbiAgICAvLyDlr7nor53moYbmoLflvI9cclxuICAgIGxldCBwcmludFN0eWxlID0ge1xyXG4gICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG4gICAgICAgIHdpZHRoOiBwcm9wcy53aWR0aCA+IDMwMCA/IHByb3BzLndpZHRoLzIgOiAnMTUwcHgnLFxyXG4gICAgICAgIGxlZnQ6IHByb3BzLndpZHRoID4gMzAwID8gKHByb3BzLndpZHRoIC0gcHJvcHMud2lkdGgvMikvMiArICdweCcgOiAocHJvcHMud2lkdGgtMTUwKS8yICsgJ3B4JyxcclxuICAgICAgICB0b3A6ICcwJyxcclxuICAgICAgICBtaW5IZWlnaHQ6ICcyMHB4JyxcclxuICAgICAgICBkaXNwbGF5OiAnYmxvY2snLFxyXG4gICAgICAgIGJvcmRlclJhZGl1czogJzVweCcsXHJcbiAgICAgICAgYm9yZGVyOiAnMXB4IGRhc2hlZCAjY2NjJyxcclxuICAgICAgICBwYWRkaW5nOiAnNXB4JyxcclxuICAgICAgICBiYWNrZ3JvdW5kOiBwcm9wcy5jb2xvciA/IHByb3BzLmNvbG9yIDogJyNDOEU2RkUnLFxyXG4gICAgICAgIGRpc3BsYXk6ICdub25lJyxcclxuICAgIH1cclxuXHJcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdwcm9wcycsIHByb3BzKVxyXG4gICAgICAgIFxyXG4gICAgICAgIHByb3BzLk1vZGVsTGlzdCA/IExBcHBEZWZpbmUubGFwcGRlZmluZVNldC5zZXRNb2RlbERpcihwcm9wcy5Nb2RlbExpc3QpIDogTEFwcERlZmluZS5sYXBwZGVmaW5lU2V0LnNldE1vZGVsRGlyKFtdKVxyXG4gICAgICAgIHByb3BzLlRvdWNoQm9keSA/IExBcHBEZWZpbmUubGFwcGRlZmluZVNldC5zZXRIaXRCb2R5KHByb3BzLlRvdWNoQm9keSkgOiBMQXBwRGVmaW5lLmxhcHBkZWZpbmVTZXQuc2V0SGl0Qm9keShbXSlcclxuICAgICAgICBwcm9wcy5Ub3VjaEhlYWQgPyBMQXBwRGVmaW5lLmxhcHBkZWZpbmVTZXQuc2V0SGl0SGVhZChwcm9wcy5Ub3VjaEhlYWQpIDogTEFwcERlZmluZS5sYXBwZGVmaW5lU2V0LnNldEhpdEhlYWQoW10pXHJcbiAgICAgICAgcHJvcHMuUGF0aEZ1bGwgPyBMQXBwRGVmaW5lLmxhcHBkZWZpbmVTZXQuc2V0UGF0aEZ1bGwocHJvcHMuUGF0aEZ1bGwpIDogTEFwcERlZmluZS5sYXBwZGVmaW5lU2V0LnNldFBhdGhGdWxsKCcnKVxyXG5cclxuICAgICAgICBpZiAoIW5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL21vYmlsZS9pKSB8fCBwcm9wcy5Nb2JpbGVTaG93PT10cnVlKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKCkuaW5pdGlhbGl6ZSgpID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgICAgICBMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKS5ydW4oKTtcclxuICAgIFxyXG4gICAgXHJcbiAgICAgICAgICAgIHdpbmRvdy5vbmJlZm9yZXVubG9hZCA9ICgpID0+IExBcHBEZWxlZ2F0ZS5yZWxlYXNlSW5zdGFuY2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSwgW10pO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICAgc3R5bGU9e2NvbnRhaW5lclN0eWxlfVxyXG4gICAgICAgICAgICAgd2lkdGg9e3Byb3BzLndpZHRoID8gcHJvcHMud2lkdGggOiAnMzAwJ31cclxuICAgICAgICAgICAgIGhlaWdodD17cHJvcHMuaGVpZ2h0ID8gcHJvcHMuaGVpZ2h0IDogJzUwMCd9XHJcbiAgICAgICAgICAgICBpZD1cImxpdmUyZC1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJsaXZlMmQtcHJpbnRcIlxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXtwcmludFN0eWxlfVxyXG4gICAgICAgICAgICAgICAgPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGNhbnZhc1xyXG4gICAgICAgICAgICAgICAgICAgIGlkPVwibGl2ZTJkXCJcclxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17Y2FudmFzU3R5bGV9XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg9e3Byb3BzLndpZHRoID8gcHJvcHMud2lkdGggOiAnMzAwJ31cclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ9e3Byb3BzLmhlaWdodCA/IHByb3BzLmhlaWdodCA6ICc1MDAnfVxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImxpdmUyZFwiXHJcbiAgICAgICAgICAgICAgICA+PC9jYW52YXM+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgKVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSZWFjdExpdmUyZCJdLCJzb3VyY2VSb290IjoiIn0=