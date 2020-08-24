webpackHotUpdatelive2d("main",{

/***/ "./src/lappdefine.ts":
/*!***************************!*\
  !*** ./src/lappdefine.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var live2dcubismframework_1 = __webpack_require__(/*! ../Framework/src/live2dcubismframework */ "./Framework/src/live2dcubismframework.ts");
exports.ViewMaxScale = 2.0;
exports.ViewMinScale = 0.8;
exports.ViewLogicalLeft = -1.0;
exports.ViewLogicalRight = 1.0;
exports.ViewLogicalMaxLeft = -2.0;
exports.ViewLogicalMaxRight = 2.0;
exports.ViewLogicalMaxBottom = -2.0;
exports.ViewLogicalMaxTop = 2.0;
exports.ResourcesPath = './Resources/';
exports.BackImageName = 'back_class_normal.png';
exports.GearImageName = 'icon_gear.png';
exports.PowerImageName = 'CloseNormal.png';
exports.ModelDir = ['Hiyori', 'Haru', 'Rice'];
exports.ModelDirSize = exports.ModelDir.length;
exports.MotionGroupIdle = 'Idle';
exports.MotionGroupTapBody = 'TapBody';
exports.HitAreaNameHead = 'Head';
exports.HitAreaNameBody = 'Body';
exports.HitBodyList = ['啊呀，你的手在摸哪里嘛~', '哼，坏人'];
exports.HitHeadList = ['讨厌~不要掐人家的脸嘛~', '希望明天也能感受到你的触摸呢'];
exports.PriorityNone = 0;
exports.PriorityIdle = 1;
exports.PriorityNormal = 2;
exports.PriorityForce = 3;
exports.DebugLogEnable = true;
exports.DebugTouchLogEnable = false;
exports.CubismLoggingLevel = live2dcubismframework_1.LogLevel.LogLevel_Verbose;
exports.RenderTargetWidth = 1900;
exports.RenderTargetHeight = 1000;
var lappdefineSet = (function () {
    function lappdefineSet() {
    }
    lappdefineSet.setModelDir = function (modelDir) {
        exports.ModelDir = modelDir.length > 0 ? modelDir : exports.ModelDir;
    };
    lappdefineSet.setHitBody = function (hitBodyList) {
        exports.HitBodyList = hitBodyList.length > 0 ? hitBodyList : exports.HitBodyList;
    };
    lappdefineSet.setHitHead = function (hitHeadList) {
        exports.HitHeadList = hitHeadList.length > 0 ? hitHeadList : exports.HitHeadList;
    };
    return lappdefineSet;
}());
exports.lappdefineSet = lappdefineSet;


/***/ }),

/***/ "./src/lappdelegate.ts":
/*!*****************************!*\
  !*** ./src/lappdelegate.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var live2dcubismframework_1 = __webpack_require__(/*! ../Framework/src/live2dcubismframework */ "./Framework/src/live2dcubismframework.ts");
var Csm_CubismFramework = live2dcubismframework_1.Live2DCubismFramework.CubismFramework;
var lappview_1 = __webpack_require__(/*! ./lappview */ "./src/lappview.ts");
var lapppal_1 = __webpack_require__(/*! ./lapppal */ "./src/lapppal.ts");
var lapptexturemanager_1 = __webpack_require__(/*! ./lapptexturemanager */ "./src/lapptexturemanager.ts");
var lapplive2dmanager_1 = __webpack_require__(/*! ./lapplive2dmanager */ "./src/lapplive2dmanager.ts");
var LAppDefine = __importStar(__webpack_require__(/*! ./lappdefine */ "./src/lappdefine.ts"));
exports.canvas = null;
exports.s_instance = null;
exports.gl = null;
exports.frameBuffer = null;
var LAppDelegate = (function () {
    function LAppDelegate() {
        this._captured = false;
        this._mouseX = 0.0;
        this._mouseY = 0.0;
        this._isEnd = false;
        this._cubismOption = new live2dcubismframework_1.Option();
        this._view = new lappview_1.LAppView();
        this._textureManager = new lapptexturemanager_1.LAppTextureManager();
    }
    LAppDelegate.getInstance = function () {
        if (exports.s_instance == null) {
            exports.s_instance = new LAppDelegate();
        }
        return exports.s_instance;
    };
    LAppDelegate.releaseInstance = function () {
        console.log("releaseInstance");
        if (exports.s_instance != null) {
            exports.s_instance.release();
        }
        exports.s_instance = null;
    };
    LAppDelegate.prototype.initialize = function () {
        exports.canvas = document.getElementById("live2d");
        document.addEventListener("mousemove", function (e) {
            if (!LAppDelegate.getInstance()._view) {
                lapppal_1.LAppPal.printMessage("view notfound");
                return;
            }
            else {
            }
            var rect = document.getElementById("live2d").getBoundingClientRect();
            var posX = e.clientX - rect.left;
            var posY = e.clientY - rect.top;
            LAppDelegate.getInstance()._view.onTouchesMoved(posX, posY);
        }, false);
        document.addEventListener("mouseout", function (e) {
            var live2DManager = lapplive2dmanager_1.LAppLive2DManager.getInstance();
            live2DManager.onDrag(0.0, 0.0);
        }, false);
        exports.canvas.addEventListener("click", function (e) {
            console.log(e);
            if (!LAppDelegate.getInstance()._view) {
                lapppal_1.LAppPal.printMessage("view notfound");
                return;
            }
            var rect = exports.canvas.getBoundingClientRect();
            var posX = e.clientX - rect.left;
            var posY = e.clientY - rect.top;
            LAppDelegate.getInstance()._view.onTouchesBegan(posX, posY);
            LAppDelegate.getInstance()._view.onTouchesEnded(posX, posY);
        }, false);
        exports.gl = exports.canvas.getContext('webgl') || exports.canvas.getContext('experimental-webgl');
        if (!exports.gl) {
            alert('Cannot initialize WebGL. This browser does not support.');
            exports.gl = null;
            document.body.innerHTML =
                'This browser does not support the <code>&lt;canvas&gt;</code> element.';
            return false;
        }
        if (!exports.frameBuffer) {
            exports.frameBuffer = exports.gl.getParameter(exports.gl.FRAMEBUFFER_BINDING);
        }
        exports.gl.enable(exports.gl.BLEND);
        exports.gl.blendFunc(exports.gl.SRC_ALPHA, exports.gl.ONE_MINUS_SRC_ALPHA);
        var supportTouch = 'ontouchend' in exports.canvas;
        if (supportTouch) {
            exports.canvas.ontouchstart = onTouchBegan;
            exports.canvas.ontouchmove = onTouchMoved;
            exports.canvas.ontouchend = onTouchEnded;
            exports.canvas.ontouchcancel = onTouchCancel;
        }
        else {
        }
        this._view.initialize();
        this.initializeCubism();
        return true;
    };
    LAppDelegate.prototype.release = function () {
        this._textureManager.release();
        this._textureManager = null;
        this._view.release();
        this._view = null;
        lapplive2dmanager_1.LAppLive2DManager.releaseInstance();
        Csm_CubismFramework.dispose();
    };
    LAppDelegate.prototype.run = function () {
        var _this = this;
        console.log('run');
        var loop = function () {
            if (exports.s_instance == null) {
                return;
            }
            lapppal_1.LAppPal.updateTime();
            exports.gl.clearColor(0.0, 0.0, 0.0, 0.0);
            exports.gl.enable(exports.gl.DEPTH_TEST);
            exports.gl.depthFunc(exports.gl.LEQUAL);
            exports.gl.clear(exports.gl.COLOR_BUFFER_BIT | exports.gl.DEPTH_BUFFER_BIT);
            exports.gl.clearDepth(1.0);
            exports.gl.enable(exports.gl.BLEND);
            exports.gl.blendFunc(exports.gl.SRC_ALPHA, exports.gl.ONE_MINUS_SRC_ALPHA);
            _this._view.render();
            requestAnimationFrame(loop);
        };
        loop();
    };
    LAppDelegate.prototype.createShader = function () {
        var vertexShaderId = exports.gl.createShader(exports.gl.VERTEX_SHADER);
        if (vertexShaderId == null) {
            lapppal_1.LAppPal.printMessage('failed to create vertexShader');
            return null;
        }
        var vertexShader = 'precision mediump float;' +
            'attribute vec3 position;' +
            'attribute vec2 uv;' +
            'varying vec2 vuv;' +
            'void main(void)' +
            '{' +
            '   gl_Position = vec4(position, 1.0);' +
            '   vuv = uv;' +
            '}';
        exports.gl.shaderSource(vertexShaderId, vertexShader);
        exports.gl.compileShader(vertexShaderId);
        var fragmentShaderId = exports.gl.createShader(exports.gl.FRAGMENT_SHADER);
        if (fragmentShaderId == null) {
            lapppal_1.LAppPal.printMessage('failed to create fragmentShader');
            return null;
        }
        var fragmentShader = 'precision mediump float;' +
            'varying vec2 vuv;' +
            'uniform sampler2D texture;' +
            'void main(void)' +
            '{' +
            '   gl_FragColor = texture2D(texture, vuv);' +
            '}';
        exports.gl.shaderSource(fragmentShaderId, fragmentShader);
        exports.gl.compileShader(fragmentShaderId);
        var programId = exports.gl.createProgram();
        exports.gl.attachShader(programId, vertexShaderId);
        exports.gl.attachShader(programId, fragmentShaderId);
        exports.gl.deleteShader(vertexShaderId);
        exports.gl.deleteShader(fragmentShaderId);
        exports.gl.linkProgram(programId);
        exports.gl.useProgram(programId);
        return programId;
    };
    LAppDelegate.prototype.getView = function () {
        return this._view;
    };
    LAppDelegate.prototype.getTextureManager = function () {
        return this._textureManager;
    };
    LAppDelegate.prototype.initializeCubism = function () {
        this._cubismOption.logFunction = lapppal_1.LAppPal.printMessage;
        this._cubismOption.loggingLevel = LAppDefine.CubismLoggingLevel;
        Csm_CubismFramework.startUp(this._cubismOption);
        Csm_CubismFramework.initialize();
        lapplive2dmanager_1.LAppLive2DManager.getInstance();
        lapppal_1.LAppPal.updateTime();
        this._view.initializeSprite();
    };
    return LAppDelegate;
}());
exports.LAppDelegate = LAppDelegate;
function onClickBegan(e) {
    if (!LAppDelegate.getInstance()._view) {
        lapppal_1.LAppPal.printMessage('view notfound');
        return;
    }
    LAppDelegate.getInstance()._captured = true;
    var posX = e.pageX;
    var posY = e.pageY;
    LAppDelegate.getInstance()._view.onTouchesBegan(posX, posY);
}
function onMouseMoved(e) {
    if (!LAppDelegate.getInstance()._captured) {
        return;
    }
    if (!LAppDelegate.getInstance()._view) {
        lapppal_1.LAppPal.printMessage('view notfound');
        return;
    }
    var rect = e.target.getBoundingClientRect();
    var posX = e.clientX - rect.left;
    var posY = e.clientY - rect.top;
    LAppDelegate.getInstance()._view.onTouchesMoved(posX, posY);
}
function onClickEnded(e) {
    LAppDelegate.getInstance()._captured = false;
    if (!LAppDelegate.getInstance()._view) {
        lapppal_1.LAppPal.printMessage('view notfound');
        return;
    }
    var rect = e.target.getBoundingClientRect();
    var posX = e.clientX - rect.left;
    var posY = e.clientY - rect.top;
    LAppDelegate.getInstance()._view.onTouchesEnded(posX, posY);
}
function onTouchBegan(e) {
    if (!LAppDelegate.getInstance()._view) {
        lapppal_1.LAppPal.printMessage('view notfound');
        return;
    }
    LAppDelegate.getInstance()._captured = true;
    var posX = e.changedTouches[0].pageX;
    var posY = e.changedTouches[0].pageY;
    LAppDelegate.getInstance()._view.onTouchesBegan(posX, posY);
}
function onTouchMoved(e) {
    if (!LAppDelegate.getInstance()._captured) {
        return;
    }
    if (!LAppDelegate.getInstance()._view) {
        lapppal_1.LAppPal.printMessage('view notfound');
        return;
    }
    var rect = e.target.getBoundingClientRect();
    var posX = e.changedTouches[0].clientX - rect.left;
    var posY = e.changedTouches[0].clientY - rect.top;
    LAppDelegate.getInstance()._view.onTouchesMoved(posX, posY);
}
function onTouchEnded(e) {
    LAppDelegate.getInstance()._captured = false;
    if (!LAppDelegate.getInstance()._view) {
        lapppal_1.LAppPal.printMessage('view notfound');
        return;
    }
    var rect = e.target.getBoundingClientRect();
    var posX = e.changedTouches[0].clientX - rect.left;
    var posY = e.changedTouches[0].clientY - rect.top;
    LAppDelegate.getInstance()._view.onTouchesEnded(posX, posY);
}
function onTouchCancel(e) {
    LAppDelegate.getInstance()._captured = false;
    if (!LAppDelegate.getInstance()._view) {
        lapppal_1.LAppPal.printMessage('view notfound');
        return;
    }
    var rect = e.target.getBoundingClientRect();
    var posX = e.changedTouches[0].clientX - rect.left;
    var posY = e.changedTouches[0].clientY - rect.top;
    LAppDelegate.getInstance()._view.onTouchesEnded(posX, posY);
}


/***/ }),

/***/ "./src/lapplive2dmanager.ts":
/*!**********************************!*\
  !*** ./src/lapplive2dmanager.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var cubismmatrix44_1 = __webpack_require__(/*! ../Framework/src/math/cubismmatrix44 */ "./Framework/src/math/cubismmatrix44.ts");
var csmvector_1 = __webpack_require__(/*! ../Framework/src/type/csmvector */ "./Framework/src/type/csmvector.ts");
var Csm_csmVector = csmvector_1.Live2DCubismFramework.csmVector;
var Csm_CubismMatrix44 = cubismmatrix44_1.Live2DCubismFramework.CubismMatrix44;
var lappmodel_1 = __webpack_require__(/*! ./lappmodel */ "./src/lappmodel.ts");
var lapppal_1 = __webpack_require__(/*! ./lapppal */ "./src/lapppal.ts");
var lappdelegate_1 = __webpack_require__(/*! ./lappdelegate */ "./src/lappdelegate.ts");
var LAppDefine = __importStar(__webpack_require__(/*! ./lappdefine */ "./src/lappdefine.ts"));
exports.s_instance = null;
var timer = null;
var LAppLive2DManager = (function () {
    function LAppLive2DManager() {
        this._finishedMotion = function (self) {
            lapppal_1.LAppPal.printMessage('Motion Finished:');
        };
        this._viewMatrix = new Csm_CubismMatrix44();
        this._models = new Csm_csmVector();
        this._sceneIndex = 0;
        this.changeScene(this._sceneIndex);
    }
    LAppLive2DManager.getInstance = function () {
        if (exports.s_instance == null) {
            exports.s_instance = new LAppLive2DManager();
        }
        return exports.s_instance;
    };
    LAppLive2DManager.releaseInstance = function () {
        if (exports.s_instance != null) {
            exports.s_instance = void 0;
        }
        exports.s_instance = null;
    };
    LAppLive2DManager.prototype.getModel = function (no) {
        if (no < this._models.getSize()) {
            return this._models.at(no);
        }
        return null;
    };
    LAppLive2DManager.prototype.releaseAllModel = function () {
        for (var i = 0; i < this._models.getSize(); i++) {
            this._models.at(i).release();
            this._models.set(i, null);
        }
        this._models.clear();
    };
    LAppLive2DManager.prototype.onDrag = function (x, y) {
        for (var i = 0; i < this._models.getSize(); i++) {
            var model = this.getModel(i);
            if (model) {
                model.setDragging(x, y);
            }
        }
    };
    LAppLive2DManager.prototype.onTap = function (x, y) {
        if (LAppDefine.DebugLogEnable) {
            lapppal_1.LAppPal.printMessage("[APP]tap point: {x: " + x.toFixed(2) + " y: " + y.toFixed(2) + "}");
        }
        for (var i = 0; i < this._models.getSize(); i++) {
            if (this._models.at(i).hitTest(LAppDefine.HitAreaNameHead, x, y)) {
                if (LAppDefine.DebugLogEnable) {
                    lapppal_1.LAppPal.printMessage("[APP]hit area: [" + LAppDefine.HitAreaNameHead + "]");
                    this.talkPrint(LAppDefine.HitHeadList[Math.floor(Math.random() * LAppDefine.HitHeadList.length)]);
                }
                this._models.at(i).setRandomExpression();
            }
            else if (this._models.at(i).hitTest(LAppDefine.HitAreaNameBody, x, y)) {
                if (LAppDefine.DebugLogEnable) {
                    lapppal_1.LAppPal.printMessage("[APP]hit area: [" + LAppDefine.HitAreaNameBody + "]");
                    this.talkPrint(LAppDefine.HitBodyList[Math.floor(Math.random() * LAppDefine.HitBodyList.length)]);
                }
                this._models
                    .at(i)
                    .startRandomMotion(LAppDefine.MotionGroupTapBody, LAppDefine.PriorityNormal, this._finishedMotion);
            }
        }
    };
    LAppLive2DManager.prototype.talkPrint = function (print) {
        clearTimeout(timer);
        var printNow = document.getElementById('live2d-print');
        printNow.innerHTML = print;
        printNow.style.display = 'block';
        timer = setTimeout(function () {
            printNow.innerHTML = '';
            printNow.style.display = 'none';
        }, 2000);
    };
    LAppLive2DManager.prototype.onUpdate = function () {
        var projection = new Csm_CubismMatrix44();
        var width = lappdelegate_1.canvas.width, height = lappdelegate_1.canvas.height;
        projection.scale(1.0, width / height);
        if (this._viewMatrix != null) {
            projection.multiplyByMatrix(this._viewMatrix);
        }
        var saveProjection = projection.clone();
        var modelCount = this._models.getSize();
        for (var i = 0; i < modelCount; ++i) {
            var model = this.getModel(i);
            projection = saveProjection.clone();
            model.update();
            model.draw(projection);
        }
    };
    LAppLive2DManager.prototype.nextScene = function () {
        var no = (this._sceneIndex + 1) % LAppDefine.ModelDirSize;
        this.changeScene(no);
    };
    LAppLive2DManager.prototype.changeScene = function (index) {
        this._sceneIndex = index;
        if (LAppDefine.DebugLogEnable) {
            lapppal_1.LAppPal.printMessage("[APP]model index: " + this._sceneIndex);
        }
        var model = LAppDefine.ModelDir[index];
        var modelPath = LAppDefine.ResourcesPath + model + '/';
        var modelJsonName = LAppDefine.ModelDir[index];
        modelJsonName += '.model3.json';
        this.releaseAllModel();
        this._models.pushBack(new lappmodel_1.LAppModel());
        this._models.at(0).loadAssets(modelPath, modelJsonName);
    };
    return LAppLive2DManager;
}());
exports.LAppLive2DManager = LAppLive2DManager;


/***/ }),

/***/ "./src/lappmodel.ts":
/*!**************************!*\
  !*** ./src/lappmodel.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var live2dcubismframework_1 = __webpack_require__(/*! ../Framework/src/live2dcubismframework */ "./Framework/src/live2dcubismframework.ts");
var cubismusermodel_1 = __webpack_require__(/*! ../Framework/src/model/cubismusermodel */ "./Framework/src/model/cubismusermodel.ts");
var cubismmodelsettingjson_1 = __webpack_require__(/*! ../Framework/src/cubismmodelsettingjson */ "./Framework/src/cubismmodelsettingjson.ts");
var cubismdefaultparameterid_1 = __webpack_require__(/*! ../Framework/src/cubismdefaultparameterid */ "./Framework/src/cubismdefaultparameterid.ts");
var acubismmotion_1 = __webpack_require__(/*! ../Framework/src/motion/acubismmotion */ "./Framework/src/motion/acubismmotion.ts");
var cubismeyeblink_1 = __webpack_require__(/*! ../Framework/src/effect/cubismeyeblink */ "./Framework/src/effect/cubismeyeblink.ts");
var cubismbreath_1 = __webpack_require__(/*! ../Framework/src/effect/cubismbreath */ "./Framework/src/effect/cubismbreath.ts");
var csmvector_1 = __webpack_require__(/*! ../Framework/src/type/csmvector */ "./Framework/src/type/csmvector.ts");
var csmmap_1 = __webpack_require__(/*! ../Framework/src/type/csmmap */ "./Framework/src/type/csmmap.ts");
var cubismmotionqueuemanager_1 = __webpack_require__(/*! ../Framework/src/motion/cubismmotionqueuemanager */ "./Framework/src/motion/cubismmotionqueuemanager.ts");
var cubismdebug_1 = __webpack_require__(/*! ../Framework/src/utils/cubismdebug */ "./Framework/src/utils/cubismdebug.ts");
var InvalidMotionQueueEntryHandleValue = cubismmotionqueuemanager_1.Live2DCubismFramework.InvalidMotionQueueEntryHandleValue;
var csmMap = csmmap_1.Live2DCubismFramework.csmMap;
var csmVector = csmvector_1.Live2DCubismFramework.csmVector;
var CubismBreath = cubismbreath_1.Live2DCubismFramework.CubismBreath;
var BreathParameterData = cubismbreath_1.Live2DCubismFramework.BreathParameterData;
var CubismEyeBlink = cubismeyeblink_1.Live2DCubismFramework.CubismEyeBlink;
var ACubismMotion = acubismmotion_1.Live2DCubismFramework.ACubismMotion;
var CubismFramework = live2dcubismframework_1.Live2DCubismFramework.CubismFramework;
var CubismUserModel = cubismusermodel_1.Live2DCubismFramework.CubismUserModel;
var CubismModelSettingJson = cubismmodelsettingjson_1.Live2DCubismFramework.CubismModelSettingJson;
var CubismDefaultParameterId = cubismdefaultparameterid_1.Live2DCubismFramework;
var lapppal_1 = __webpack_require__(/*! ./lapppal */ "./src/lapppal.ts");
var lappdelegate_1 = __webpack_require__(/*! ./lappdelegate */ "./src/lappdelegate.ts");
var LAppDefine = __importStar(__webpack_require__(/*! ./lappdefine */ "./src/lappdefine.ts"));
__webpack_require__(/*! whatwg-fetch */ "./node_modules/whatwg-fetch/fetch.js");
var LoadStep;
(function (LoadStep) {
    LoadStep[LoadStep["LoadAssets"] = 0] = "LoadAssets";
    LoadStep[LoadStep["LoadModel"] = 1] = "LoadModel";
    LoadStep[LoadStep["WaitLoadModel"] = 2] = "WaitLoadModel";
    LoadStep[LoadStep["LoadExpression"] = 3] = "LoadExpression";
    LoadStep[LoadStep["WaitLoadExpression"] = 4] = "WaitLoadExpression";
    LoadStep[LoadStep["LoadPhysics"] = 5] = "LoadPhysics";
    LoadStep[LoadStep["WaitLoadPhysics"] = 6] = "WaitLoadPhysics";
    LoadStep[LoadStep["LoadPose"] = 7] = "LoadPose";
    LoadStep[LoadStep["WaitLoadPose"] = 8] = "WaitLoadPose";
    LoadStep[LoadStep["SetupEyeBlink"] = 9] = "SetupEyeBlink";
    LoadStep[LoadStep["SetupBreath"] = 10] = "SetupBreath";
    LoadStep[LoadStep["LoadUserData"] = 11] = "LoadUserData";
    LoadStep[LoadStep["WaitLoadUserData"] = 12] = "WaitLoadUserData";
    LoadStep[LoadStep["SetupEyeBlinkIds"] = 13] = "SetupEyeBlinkIds";
    LoadStep[LoadStep["SetupLipSyncIds"] = 14] = "SetupLipSyncIds";
    LoadStep[LoadStep["SetupLayout"] = 15] = "SetupLayout";
    LoadStep[LoadStep["LoadMotion"] = 16] = "LoadMotion";
    LoadStep[LoadStep["WaitLoadMotion"] = 17] = "WaitLoadMotion";
    LoadStep[LoadStep["CompleteInitialize"] = 18] = "CompleteInitialize";
    LoadStep[LoadStep["CompleteSetupModel"] = 19] = "CompleteSetupModel";
    LoadStep[LoadStep["LoadTexture"] = 20] = "LoadTexture";
    LoadStep[LoadStep["WaitLoadTexture"] = 21] = "WaitLoadTexture";
    LoadStep[LoadStep["CompleteSetup"] = 22] = "CompleteSetup";
})(LoadStep || (LoadStep = {}));
var LAppModel = (function (_super) {
    __extends(LAppModel, _super);
    function LAppModel() {
        var _this = _super.call(this) || this;
        _this._modelSetting = null;
        _this._modelHomeDir = null;
        _this._userTimeSeconds = 0.0;
        _this._eyeBlinkIds = new csmVector();
        _this._lipSyncIds = new csmVector();
        _this._motions = new csmMap();
        _this._expressions = new csmMap();
        _this._hitArea = new csmVector();
        _this._userArea = new csmVector();
        _this._idParamAngleX = CubismFramework.getIdManager().getId(CubismDefaultParameterId.ParamAngleX);
        _this._idParamAngleY = CubismFramework.getIdManager().getId(CubismDefaultParameterId.ParamAngleY);
        _this._idParamAngleZ = CubismFramework.getIdManager().getId(CubismDefaultParameterId.ParamAngleZ);
        _this._idParamEyeBallX = CubismFramework.getIdManager().getId(CubismDefaultParameterId.ParamEyeBallX);
        _this._idParamEyeBallY = CubismFramework.getIdManager().getId(CubismDefaultParameterId.ParamEyeBallY);
        _this._idParamBodyAngleX = CubismFramework.getIdManager().getId(CubismDefaultParameterId.ParamBodyAngleX);
        _this._state = LoadStep.LoadAssets;
        _this._expressionCount = 0;
        _this._textureCount = 0;
        _this._motionCount = 0;
        _this._allMotionCount = 0;
        return _this;
    }
    LAppModel.prototype.loadAssets = function (dir, fileName) {
        var _this = this;
        console.log('dir', dir);
        this._modelHomeDir = dir;
        fetch(this._modelHomeDir + "/" + fileName)
            .then(function (response) { return response.arrayBuffer(); })
            .then(function (arrayBuffer) {
            var setting = new CubismModelSettingJson(arrayBuffer, arrayBuffer.byteLength);
            _this._state = LoadStep.LoadModel;
            _this.setupModel(setting);
        });
    };
    LAppModel.prototype.setupModel = function (setting) {
        var _this = this;
        this._updating = true;
        this._initialized = false;
        this._modelSetting = setting;
        if (this._modelSetting.getModelFileName() != '') {
            var modelFileName = this._modelSetting.getModelFileName();
            fetch(this._modelHomeDir + "/" + modelFileName)
                .then(function (response) { return response.arrayBuffer(); })
                .then(function (arrayBuffer) {
                _this.loadModel(arrayBuffer);
                _this._state = LoadStep.LoadExpression;
                loadCubismExpression();
            });
            this._state = LoadStep.WaitLoadModel;
        }
        else {
            lapppal_1.LAppPal.printMessage('Model data does not exist.');
        }
        var loadCubismExpression = function () {
            if (_this._modelSetting.getExpressionCount() > 0) {
                var count_1 = _this._modelSetting.getExpressionCount();
                var _loop_1 = function (i) {
                    var expressionName = _this._modelSetting.getExpressionName(i);
                    var expressionFileName = _this._modelSetting.getExpressionFileName(i);
                    fetch(_this._modelHomeDir + "/" + expressionFileName)
                        .then(function (response) { return response.arrayBuffer(); })
                        .then(function (arrayBuffer) {
                        var motion = _this.loadExpression(arrayBuffer, arrayBuffer.byteLength, expressionName);
                        if (_this._expressions.getValue(expressionName) != null) {
                            ACubismMotion.delete(_this._expressions.getValue(expressionName));
                            _this._expressions.setValue(expressionName, null);
                        }
                        _this._expressions.setValue(expressionName, motion);
                        _this._expressionCount++;
                        if (_this._expressionCount >= count_1) {
                            _this._state = LoadStep.LoadPhysics;
                            loadCubismPhysics();
                        }
                    });
                };
                for (var i = 0; i < count_1; i++) {
                    _loop_1(i);
                }
                _this._state = LoadStep.WaitLoadExpression;
            }
            else {
                _this._state = LoadStep.LoadPhysics;
                loadCubismPhysics();
            }
        };
        var loadCubismPhysics = function () {
            if (_this._modelSetting.getPhysicsFileName() != '') {
                var physicsFileName = _this._modelSetting.getPhysicsFileName();
                fetch(_this._modelHomeDir + "/" + physicsFileName)
                    .then(function (response) { return response.arrayBuffer(); })
                    .then(function (arrayBuffer) {
                    _this.loadPhysics(arrayBuffer, arrayBuffer.byteLength);
                    _this._state = LoadStep.LoadPose;
                    loadCubismPose();
                });
                _this._state = LoadStep.WaitLoadPhysics;
            }
            else {
                _this._state = LoadStep.LoadPose;
                loadCubismPose();
            }
        };
        var loadCubismPose = function () {
            if (_this._modelSetting.getPoseFileName() != '') {
                var poseFileName = _this._modelSetting.getPoseFileName();
                fetch(_this._modelHomeDir + "/" + poseFileName)
                    .then(function (response) { return response.arrayBuffer(); })
                    .then(function (arrayBuffer) {
                    _this.loadPose(arrayBuffer, arrayBuffer.byteLength);
                    _this._state = LoadStep.SetupEyeBlink;
                    setupEyeBlink();
                });
                _this._state = LoadStep.WaitLoadPose;
            }
            else {
                _this._state = LoadStep.SetupEyeBlink;
                setupEyeBlink();
            }
        };
        var setupEyeBlink = function () {
            if (_this._modelSetting.getEyeBlinkParameterCount() > 0) {
                _this._eyeBlink = CubismEyeBlink.create(_this._modelSetting);
                _this._state = LoadStep.SetupBreath;
            }
            setupBreath();
        };
        var setupBreath = function () {
            _this._breath = CubismBreath.create();
            var breathParameters = new csmVector();
            breathParameters.pushBack(new BreathParameterData(_this._idParamAngleX, 0.0, 15.0, 6.5345, 0.5));
            breathParameters.pushBack(new BreathParameterData(_this._idParamAngleY, 0.0, 8.0, 3.5345, 0.5));
            breathParameters.pushBack(new BreathParameterData(_this._idParamAngleZ, 0.0, 10.0, 5.5345, 0.5));
            breathParameters.pushBack(new BreathParameterData(_this._idParamBodyAngleX, 0.0, 4.0, 15.5345, 0.5));
            breathParameters.pushBack(new BreathParameterData(CubismFramework.getIdManager().getId(CubismDefaultParameterId.ParamBreath), 0.0, 0.5, 3.2345, 0.5));
            _this._breath.setParameters(breathParameters);
            _this._state = LoadStep.LoadUserData;
            loadUserData();
        };
        var loadUserData = function () {
            if (_this._modelSetting.getUserDataFile() != '') {
                var userDataFile = _this._modelSetting.getUserDataFile();
                fetch(_this._modelHomeDir + "/" + userDataFile)
                    .then(function (response) { return response.arrayBuffer(); })
                    .then(function (arrayBuffer) {
                    _this.loadUserData(arrayBuffer, arrayBuffer.byteLength);
                    _this._state = LoadStep.SetupEyeBlinkIds;
                    setupEyeBlinkIds();
                });
                _this._state = LoadStep.WaitLoadUserData;
            }
            else {
                _this._state = LoadStep.SetupEyeBlinkIds;
                setupEyeBlinkIds();
            }
        };
        var setupEyeBlinkIds = function () {
            var eyeBlinkIdCount = _this._modelSetting.getEyeBlinkParameterCount();
            for (var i = 0; i < eyeBlinkIdCount; ++i) {
                _this._eyeBlinkIds.pushBack(_this._modelSetting.getEyeBlinkParameterId(i));
            }
            _this._state = LoadStep.SetupLipSyncIds;
            setupLipSyncIds();
        };
        var setupLipSyncIds = function () {
            var lipSyncIdCount = _this._modelSetting.getLipSyncParameterCount();
            for (var i = 0; i < lipSyncIdCount; ++i) {
                _this._lipSyncIds.pushBack(_this._modelSetting.getLipSyncParameterId(i));
            }
            _this._state = LoadStep.SetupLayout;
            setupLayout();
        };
        var setupLayout = function () {
            var layout = new csmMap();
            _this._modelSetting.getLayoutMap(layout);
            _this._modelMatrix.setupFromLayout(layout);
            _this._state = LoadStep.LoadMotion;
            loadCubismMotion();
        };
        var loadCubismMotion = function () {
            _this._state = LoadStep.WaitLoadMotion;
            _this._model.saveParameters();
            _this._allMotionCount = 0;
            _this._motionCount = 0;
            var group = [];
            var motionGroupCount = _this._modelSetting.getMotionGroupCount();
            for (var i = 0; i < motionGroupCount; i++) {
                group[i] = _this._modelSetting.getMotionGroupName(i);
                _this._allMotionCount += _this._modelSetting.getMotionCount(group[i]);
            }
            for (var i = 0; i < motionGroupCount; i++) {
                _this.preLoadMotionGroup(group[i]);
            }
            if (motionGroupCount == 0) {
                _this._state = LoadStep.LoadTexture;
                _this._motionManager.stopAllMotions();
                _this._updating = false;
                _this._initialized = true;
                _this.createRenderer();
                _this.setupTextures();
                _this.getRenderer().startUp(lappdelegate_1.gl);
            }
        };
    };
    LAppModel.prototype.setupTextures = function () {
        var _this = this;
        var usePremultiply = true;
        if (this._state == LoadStep.LoadTexture) {
            var textureCount_1 = this._modelSetting.getTextureCount();
            var _loop_2 = function (modelTextureNumber) {
                if (this_1._modelSetting.getTextureFileName(modelTextureNumber) == '') {
                    console.log('getTextureFileName null');
                    return "continue";
                }
                var texturePath = this_1._modelSetting.getTextureFileName(modelTextureNumber);
                texturePath = this_1._modelHomeDir + texturePath;
                var onLoad = function (textureInfo) {
                    _this.getRenderer().bindTexture(modelTextureNumber, textureInfo.id);
                    _this._textureCount++;
                    if (_this._textureCount >= textureCount_1) {
                        _this._state = LoadStep.CompleteSetup;
                    }
                };
                lappdelegate_1.LAppDelegate.getInstance()
                    .getTextureManager()
                    .createTextureFromPngFile(texturePath, usePremultiply, onLoad);
                this_1.getRenderer().setIsPremultipliedAlpha(usePremultiply);
            };
            var this_1 = this;
            for (var modelTextureNumber = 0; modelTextureNumber < textureCount_1; modelTextureNumber++) {
                _loop_2(modelTextureNumber);
            }
            this._state = LoadStep.WaitLoadTexture;
        }
    };
    LAppModel.prototype.reloadRenderer = function () {
        this.deleteRenderer();
        this.createRenderer();
        this.setupTextures();
    };
    LAppModel.prototype.update = function () {
        if (this._state != LoadStep.CompleteSetup)
            return;
        var deltaTimeSeconds = lapppal_1.LAppPal.getDeltaTime();
        this._userTimeSeconds += deltaTimeSeconds;
        this._dragManager.update(deltaTimeSeconds);
        this._dragX = this._dragManager.getX();
        this._dragY = this._dragManager.getY();
        var motionUpdated = false;
        this._model.loadParameters();
        if (this._motionManager.isFinished()) {
            this.startRandomMotion(LAppDefine.MotionGroupIdle, LAppDefine.PriorityIdle);
        }
        else {
            motionUpdated = this._motionManager.updateMotion(this._model, deltaTimeSeconds);
        }
        this._model.saveParameters();
        if (!motionUpdated) {
            if (this._eyeBlink != null) {
                this._eyeBlink.updateParameters(this._model, deltaTimeSeconds);
            }
        }
        if (this._expressionManager != null) {
            this._expressionManager.updateMotion(this._model, deltaTimeSeconds);
        }
        this._model.addParameterValueById(this._idParamAngleX, this._dragX * 30);
        this._model.addParameterValueById(this._idParamAngleY, this._dragY * 30);
        this._model.addParameterValueById(this._idParamAngleZ, this._dragX * this._dragY * -30);
        this._model.addParameterValueById(this._idParamBodyAngleX, this._dragX * 10);
        this._model.addParameterValueById(this._idParamEyeBallX, this._dragX);
        this._model.addParameterValueById(this._idParamEyeBallY, this._dragY);
        if (this._breath != null) {
            this._breath.updateParameters(this._model, deltaTimeSeconds);
        }
        if (this._physics != null) {
            this._physics.evaluate(this._model, deltaTimeSeconds);
        }
        if (this._lipsync) {
            var value = 0;
            for (var i = 0; i < this._lipSyncIds.getSize(); ++i) {
                this._model.addParameterValueById(this._lipSyncIds.at(i), value, 0.8);
            }
        }
        if (this._pose != null) {
            this._pose.updateParameters(this._model, deltaTimeSeconds);
        }
        this._model.update();
    };
    LAppModel.prototype.startMotion = function (group, no, priority, onFinishedMotionHandler) {
        var _this = this;
        if (priority == LAppDefine.PriorityForce) {
            this._motionManager.setReservePriority(priority);
        }
        else if (!this._motionManager.reserveMotion(priority)) {
            if (this._debugMode) {
                lapppal_1.LAppPal.printMessage("[APP]can't start motion.");
            }
            return InvalidMotionQueueEntryHandleValue;
        }
        var motionFileName = this._modelSetting.getMotionFileName(group, no);
        var name = group + "_" + no;
        var motion = this._motions.getValue(name);
        var autoDelete = false;
        if (motion == null) {
            fetch(this._modelHomeDir + "/" + motionFileName)
                .then(function (response) { return response.arrayBuffer(); })
                .then(function (arrayBuffer) {
                motion = _this.loadMotion(arrayBuffer, arrayBuffer.byteLength, null, onFinishedMotionHandler);
                var fadeTime = _this._modelSetting.getMotionFadeInTimeValue(group, no);
                if (fadeTime >= 0.0) {
                    motion.setFadeInTime(fadeTime);
                }
                fadeTime = _this._modelSetting.getMotionFadeOutTimeValue(group, no);
                if (fadeTime >= 0.0) {
                    motion.setFadeOutTime(fadeTime);
                }
                motion.setEffectIds(_this._eyeBlinkIds, _this._lipSyncIds);
                autoDelete = true;
            });
        }
        else {
            motion.setFinishedMotionHandler(onFinishedMotionHandler);
        }
        if (this._debugMode) {
            lapppal_1.LAppPal.printMessage("[APP]start motion: [" + group + "_" + no);
        }
        return this._motionManager.startMotionPriority(motion, autoDelete, priority);
    };
    LAppModel.prototype.startRandomMotion = function (group, priority, onFinishedMotionHandler) {
        if (this._modelSetting.getMotionCount(group) == 0) {
            return InvalidMotionQueueEntryHandleValue;
        }
        var no = Math.floor(Math.random() * this._modelSetting.getMotionCount(group));
        return this.startMotion(group, no, priority, onFinishedMotionHandler);
    };
    LAppModel.prototype.setExpression = function (expressionId) {
        var motion = this._expressions.getValue(expressionId);
        if (this._debugMode) {
            lapppal_1.LAppPal.printMessage("[APP]expression: [" + expressionId + "]");
        }
        if (motion != null) {
            this._expressionManager.startMotionPriority(motion, false, LAppDefine.PriorityForce);
        }
        else {
            if (this._debugMode) {
                lapppal_1.LAppPal.printMessage("[APP]expression[" + expressionId + "] is null");
            }
        }
    };
    LAppModel.prototype.setRandomExpression = function () {
        if (this._expressions.getSize() == 0) {
            return;
        }
        var no = Math.floor(Math.random() * this._expressions.getSize());
        for (var i = 0; i < this._expressions.getSize(); i++) {
            if (i == no) {
                var name_1 = this._expressions._keyValues[i].first;
                this.setExpression(name_1);
                return;
            }
        }
    };
    LAppModel.prototype.motionEventFired = function (eventValue) {
        cubismdebug_1.CubismLogInfo('{0} is fired on LAppModel!!', eventValue.s);
    };
    LAppModel.prototype.hitTest = function (hitArenaName, x, y) {
        if (this._opacity < 1) {
            return false;
        }
        var count = this._modelSetting.getHitAreasCount();
        for (var i = 0; i < count; i++) {
            if (this._modelSetting.getHitAreaName(i) == hitArenaName) {
                var drawId = this._modelSetting.getHitAreaId(i);
                return this.isHit(drawId, x, y);
            }
        }
        return false;
    };
    LAppModel.prototype.preLoadMotionGroup = function (group) {
        var _this = this;
        var _loop_3 = function (i) {
            var motionFileName = this_2._modelSetting.getMotionFileName(group, i);
            var name_2 = group + "_" + i;
            if (this_2._debugMode) {
                lapppal_1.LAppPal.printMessage("[APP]load motion: " + motionFileName + " => [" + name_2 + "]");
            }
            fetch(this_2._modelHomeDir + "/" + motionFileName)
                .then(function (response) { return response.arrayBuffer(); })
                .then(function (arrayBuffer) {
                var tmpMotion = _this.loadMotion(arrayBuffer, arrayBuffer.byteLength, name_2);
                var fadeTime = _this._modelSetting.getMotionFadeInTimeValue(group, i);
                if (fadeTime >= 0.0) {
                    tmpMotion.setFadeInTime(fadeTime);
                }
                fadeTime = _this._modelSetting.getMotionFadeOutTimeValue(group, i);
                if (fadeTime >= 0.0) {
                    tmpMotion.setFadeOutTime(fadeTime);
                }
                tmpMotion.setEffectIds(_this._eyeBlinkIds, _this._lipSyncIds);
                if (_this._motions.getValue(name_2) != null) {
                    ACubismMotion.delete(_this._motions.getValue(name_2));
                }
                _this._motions.setValue(name_2, tmpMotion);
                _this._motionCount++;
                if (_this._motionCount >= _this._allMotionCount) {
                    _this._state = LoadStep.LoadTexture;
                    _this._motionManager.stopAllMotions();
                    _this._updating = false;
                    _this._initialized = true;
                    _this.createRenderer();
                    _this.setupTextures();
                    _this.getRenderer().startUp(lappdelegate_1.gl);
                }
            });
        };
        var this_2 = this;
        for (var i = 0; i < this._modelSetting.getMotionCount(group); i++) {
            _loop_3(i);
        }
    };
    LAppModel.prototype.releaseMotions = function () {
        this._motions.clear();
    };
    LAppModel.prototype.releaseExpressions = function () {
        this._expressions.clear();
    };
    LAppModel.prototype.doDraw = function () {
        if (this._model == null)
            return;
        var viewport = [0, 0, lappdelegate_1.canvas.width, lappdelegate_1.canvas.height];
        this.getRenderer().setRenderState(lappdelegate_1.frameBuffer, viewport);
        this.getRenderer().drawModel();
    };
    LAppModel.prototype.draw = function (matrix) {
        if (this._model == null) {
            return;
        }
        if (this._state == LoadStep.CompleteSetup) {
            matrix.multiplyByMatrix(this._modelMatrix);
            this.getRenderer().setMvpMatrix(matrix);
            this.doDraw();
        }
    };
    return LAppModel;
}(CubismUserModel));
exports.LAppModel = LAppModel;


/***/ }),

/***/ "./src/lappview.ts":
/*!*************************!*\
  !*** ./src/lappview.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var cubismmatrix44_1 = __webpack_require__(/*! ../Framework/src/math/cubismmatrix44 */ "./Framework/src/math/cubismmatrix44.ts");
var cubismviewmatrix_1 = __webpack_require__(/*! ../Framework/src/math/cubismviewmatrix */ "./Framework/src/math/cubismviewmatrix.ts");
var Csm_CubismViewMatrix = cubismviewmatrix_1.Live2DCubismFramework.CubismViewMatrix;
var Csm_CubismMatrix44 = cubismmatrix44_1.Live2DCubismFramework.CubismMatrix44;
var touchmanager_1 = __webpack_require__(/*! ./touchmanager */ "./src/touchmanager.ts");
var lapplive2dmanager_1 = __webpack_require__(/*! ./lapplive2dmanager */ "./src/lapplive2dmanager.ts");
var lappdelegate_1 = __webpack_require__(/*! ./lappdelegate */ "./src/lappdelegate.ts");
var lapppal_1 = __webpack_require__(/*! ./lapppal */ "./src/lapppal.ts");
var LAppDefine = __importStar(__webpack_require__(/*! ./lappdefine */ "./src/lappdefine.ts"));
var LAppView = (function () {
    function LAppView() {
        this._programId = null;
        this._back = null;
        this._gear = null;
        this._touchManager = new touchmanager_1.TouchManager();
        this._deviceToScreen = new Csm_CubismMatrix44();
        this._viewMatrix = new Csm_CubismViewMatrix();
    }
    LAppView.prototype.initialize = function () {
        var width = lappdelegate_1.canvas.width, height = lappdelegate_1.canvas.height;
        var ratio = height / width;
        var left = LAppDefine.ViewLogicalLeft;
        var right = LAppDefine.ViewLogicalRight;
        var bottom = -ratio;
        var top = ratio;
        this._viewMatrix.setScreenRect(left, right, bottom, top);
        var screenW = Math.abs(left - right);
        this._deviceToScreen.scaleRelative(screenW / width, -screenW / width);
        this._deviceToScreen.translateRelative(-width * 0.5, -height * 0.5);
        this._viewMatrix.setMaxScale(LAppDefine.ViewMaxScale);
        this._viewMatrix.setMinScale(LAppDefine.ViewMinScale);
        this._viewMatrix.setMaxScreenRect(LAppDefine.ViewLogicalMaxLeft, LAppDefine.ViewLogicalMaxRight, LAppDefine.ViewLogicalMaxBottom, LAppDefine.ViewLogicalMaxTop);
    };
    LAppView.prototype.release = function () {
        this._viewMatrix = null;
        this._touchManager = null;
        this._deviceToScreen = null;
        this._gear.release();
        this._gear = null;
        this._back.release();
        this._back = null;
        lappdelegate_1.gl.deleteProgram(this._programId);
        this._programId = null;
    };
    LAppView.prototype.render = function () {
        lappdelegate_1.gl.useProgram(this._programId);
        if (this._back) {
            this._back.render(this._programId);
        }
        if (this._gear) {
            this._gear.render(this._programId);
        }
        lappdelegate_1.gl.flush();
        var live2DManager = lapplive2dmanager_1.LAppLive2DManager.getInstance();
        live2DManager.onUpdate();
    };
    LAppView.prototype.initializeSprite = function () {
        var width = lappdelegate_1.canvas.width;
        var height = lappdelegate_1.canvas.height;
        var textureManager = lappdelegate_1.LAppDelegate.getInstance().getTextureManager();
        var resourcesPath = LAppDefine.ResourcesPath;
        var imageName = '';
    };
    LAppView.prototype.onTouchesBegan = function (pointX, pointY) {
        this._touchManager.touchesBegan(pointX, pointY);
    };
    LAppView.prototype.onTouchesMoved = function (pointX, pointY) {
        var viewX = this.transformViewX(this._touchManager.getX());
        var viewY = this.transformViewY(this._touchManager.getY());
        this._touchManager.touchesMoved(pointX, pointY);
        var live2DManager = lapplive2dmanager_1.LAppLive2DManager.getInstance();
        live2DManager.onDrag(viewX, viewY);
    };
    LAppView.prototype.onTouchesEnded = function (pointX, pointY) {
        var live2DManager = lapplive2dmanager_1.LAppLive2DManager.getInstance();
        live2DManager.onDrag(0.0, 0.0);
        {
            var x = this._deviceToScreen.transformX(this._touchManager.getX());
            var y = this._deviceToScreen.transformY(this._touchManager.getY());
            if (LAppDefine.DebugTouchLogEnable) {
                lapppal_1.LAppPal.printMessage("[APP]touchesEnded x: " + x + " y: " + y);
            }
            live2DManager.onTap(x, y);
        }
    };
    LAppView.prototype.transformViewX = function (deviceX) {
        var screenX = this._deviceToScreen.transformX(deviceX);
        return this._viewMatrix.invertTransformX(screenX);
    };
    LAppView.prototype.transformViewY = function (deviceY) {
        var screenY = this._deviceToScreen.transformY(deviceY);
        return this._viewMatrix.invertTransformY(screenY);
    };
    LAppView.prototype.transformScreenX = function (deviceX) {
        return this._deviceToScreen.transformX(deviceX);
    };
    LAppView.prototype.transformScreenY = function (deviceY) {
        return this._deviceToScreen.transformY(deviceY);
    };
    return LAppView;
}());
exports.LAppView = LAppView;


/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9saXZlMmQvLi9zcmMvbGFwcGRlZmluZS50cyIsIndlYnBhY2s6Ly9saXZlMmQvLi9zcmMvbGFwcGRlbGVnYXRlLnRzIiwid2VicGFjazovL2xpdmUyZC8uL3NyYy9sYXBwbGl2ZTJkbWFuYWdlci50cyIsIndlYnBhY2s6Ly9saXZlMmQvLi9zcmMvbGFwcG1vZGVsLnRzIiwid2VicGFjazovL2xpdmUyZC8uL3NyYy9sYXBwdmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFPQSw0SUFBaUU7QUFNcEQsb0JBQVksR0FBRyxHQUFHLENBQUM7QUFDbkIsb0JBQVksR0FBRyxHQUFHLENBQUM7QUFFbkIsdUJBQWUsR0FBRyxDQUFDLEdBQUcsQ0FBQztBQUN2Qix3QkFBZ0IsR0FBRyxHQUFHLENBQUM7QUFFdkIsMEJBQWtCLEdBQUcsQ0FBQyxHQUFHLENBQUM7QUFDMUIsMkJBQW1CLEdBQUcsR0FBRyxDQUFDO0FBQzFCLDRCQUFvQixHQUFHLENBQUMsR0FBRyxDQUFDO0FBQzVCLHlCQUFpQixHQUFHLEdBQUcsQ0FBQztBQUd4QixxQkFBYSxHQUFHLGNBQWMsQ0FBQztBQUcvQixxQkFBYSxHQUFHLHVCQUF1QixDQUFDO0FBR3hDLHFCQUFhLEdBQUcsZUFBZSxDQUFDO0FBR2hDLHNCQUFjLEdBQUcsaUJBQWlCLENBQUM7QUFNckMsZ0JBQVEsR0FBYSxDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDOUMsb0JBQVksR0FBVyxnQkFBUSxDQUFDLE1BQU0sQ0FBQztBQUd2Qyx1QkFBZSxHQUFHLE1BQU0sQ0FBQztBQUN6QiwwQkFBa0IsR0FBRyxTQUFTLENBQUM7QUFHL0IsdUJBQWUsR0FBRyxNQUFNLENBQUM7QUFDekIsdUJBQWUsR0FBRyxNQUFNLENBQUM7QUFHM0IsbUJBQVcsR0FBYSxDQUFDLGNBQWMsRUFBQyxNQUFNLENBQUMsQ0FBQztBQUNoRCxtQkFBVyxHQUFhLENBQUMsY0FBYyxF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VUFBVSxDQUMvQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxDQUMxQixDQUFDO1lBRUYsSUFBSSxVQUFVLENBQUMsbUJBQW1CLEVBQUU7Z0JBQ2xDLGlCQUFPLENBQUMsWUFBWSxDQUFDLDBCQUF3QixDQUFDLFlBQU8sQ0FBRyxDQUFDLENBQUM7YUFDM0Q7WUFDRCxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQU0zQjtJQUNILENBQUM7SUFPTSxpQ0FBYyxHQUFyQixVQUFzQixPQUFlO1FBQ25DLElBQU0sT0FBTyxHQUFXLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2pFLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBT00saUNBQWMsR0FBckIsVUFBc0IsT0FBZTtRQUNuQyxJQUFNLE9BQU8sR0FBVyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNqRSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQU1NLG1DQUFnQixHQUF2QixVQUF3QixPQUFlO1FBQ3JDLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQU9NLG1DQUFnQixHQUF2QixVQUF3QixPQUFlO1FBQ3JDLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQVVILGVBQUM7QUFBRCxDQUFDO0FBdFBZLDRCQUFRIiwiZmlsZSI6ImhvdC9ob3QtdXBkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQoYykgTGl2ZTJEIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSB0aGUgTGl2ZTJEIE9wZW4gU29mdHdhcmUgbGljZW5zZVxuICogdGhhdCBjYW4gYmUgZm91bmQgYXQgaHR0cHM6Ly93d3cubGl2ZTJkLmNvbS9ldWxhL2xpdmUyZC1vcGVuLXNvZnR3YXJlLWxpY2Vuc2UtYWdyZWVtZW50X2VuLmh0bWwuXG4gKi9cblxuaW1wb3J0IHsgTG9nTGV2ZWwgfSBmcm9tICcuLi9GcmFtZXdvcmsvc3JjL2xpdmUyZGN1YmlzbWZyYW1ld29yaydcblxuLyoqXG4gKiBTYW1wbGUgQXBw44Gn5L2/55So44GZ44KL5a6a5pWwXG4gKi9cbi8vIOeUu+mdolxuZXhwb3J0IGNvbnN0IFZpZXdNYXhTY2FsZSA9IDIuMDtcbmV4cG9ydCBjb25zdCBWaWV3TWluU2NhbGUgPSAwLjg7XG5cbmV4cG9ydCBjb25zdCBWaWV3TG9naWNhbExlZnQgPSAtMS4wO1xuZXhwb3J0IGNvbnN0IFZpZXdMb2dpY2FsUmlnaHQgPSAxLjA7XG5cbmV4cG9ydCBjb25zdCBWaWV3TG9naWNhbE1heExlZnQgPSAtMi4wO1xuZXhwb3J0IGNvbnN0IFZpZXdMb2dpY2FsTWF4UmlnaHQgPSAyLjA7XG5leHBvcnQgY29uc3QgVmlld0xvZ2ljYWxNYXhCb3R0b20gPSAtMi4wO1xuZXhwb3J0IGNvbnN0IFZpZXdMb2dpY2FsTWF4VG9wID0gMi4wO1xuXG4vLyDnm7jlr77jg5HjgrlcbmV4cG9ydCBjb25zdCBSZXNvdXJjZXNQYXRoID0gJy4vUmVzb3VyY2VzLyc7XG5cbi8vIOODouODh+ODq+OBruW+jOOCjeOBq+OBguOCi+iDjOaZr+OBrueUu+WDj+ODleOCoeOCpOODq1xuZXhwb3J0IGNvbnN0IEJhY2tJbWFnZU5hbWUgPSAnYmFja19jbGFzc19ub3JtYWwucG5nJztcblxuLy8g5q2v6LuKXG5leHBvcnQgY29uc3QgR2VhckltYWdlTmFtZSA9ICdpY29uX2dlYXIucG5nJztcblxuLy8g57WC5LqG44Oc44K/44OzXG5leHBvcnQgY29uc3QgUG93ZXJJbWFnZU5hbWUgPSAnQ2xvc2VOb3JtYWwucG5nJztcblxuLy8g44Oi44OH44Or5a6a576pLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyDjg6Ljg4fjg6vjgpLphY3nva7jgZfjgZ/jg4fjgqPjg6zjgq/jg4jjg6rlkI3jga7phY3liJdcbi8vIOODh+OCo+ODrOOCr+ODiOODquWQjeOBqG1vZGVsMy5qc29u44Gu5ZCN5YmN44KS5LiA6Ie044GV44Gb44Gm44GK44GP44GT44GoXG4vLyBleHBvcnQgY29uc3QgTW9kZWxEaXI6IHN0cmluZ1tdID0gWydIYXJ1JywgJ0hpeW9yaScsICdNYXJrJywgJ05hdG9yaScsICdSaWNlJ107XG5leHBvcnQgbGV0IE1vZGVsRGlyOiBzdHJpbmdbXSA9IFsnSGl5b3JpJywgJ0hhcnUnLCAnUmljZSddO1xuZXhwb3J0IGNvbnN0IE1vZGVsRGlyU2l6ZTogbnVtYmVyID0gTW9kZWxEaXIubGVuZ3RoO1xuXG4vLyDlpJbpg6jlrprnvqnjg5XjgqHjgqTjg6vvvIhqc29u77yJ44Go5ZCI44KP44Gb44KLXG5leHBvcnQgY29uc3QgTW90aW9uR3JvdXBJZGxlID0gJ0lkbGUnOyAvLyDjgqLjgqTjg4njg6rjg7PjgrBcbmV4cG9ydCBjb25zdCBNb3Rpb25Hcm91cFRhcEJvZHkgPSAnVGFwQm9keSc7IC8vIOS9k+OCkuOCv+ODg+ODl+OBl+OBn+OBqOOBjVxuXG4vLyDlpJbpg6jlrprnvqnjg5XjgqHjgqTjg6vvvIhqc29u77yJ44Go5ZCI44KP44Gb44KLXG5leHBvcnQgY29uc3QgSGl0QXJlYU5hbWVIZWFkID0gJ0hlYWQnO1xuZXhwb3J0IGNvbnN0IEhpdEFyZWFOYW1lQm9keSA9ICdCb2R5JztcblxuLy8g5a+56K+d5YaF5a65XG5leHBvcnQgbGV0IEhpdEJvZHlMaXN0OiBzdHJpbmdbXSA9IFsn5ZWK5ZGA77yM5L2g55qE5omL5Zyo5pG45ZOq6YeM5ZibficsJ+WTvO+8jOWdj+S6uiddO1xuZXhwb3J0IGxldCBIaXRIZWFkTGlzdDogc3RyaW5nW10gPSBbJ+iuqOWOjH7kuI3opoHmjpDkurrlrrbnmoTohLjlmJt+Jywn5biM5pyb5piO5aSp5Lmf6IO95oSf5Y+X5Yiw5L2g55qE6Kem5pG45ZGiJ107XG5cbi8vIOODouODvOOCt+ODp+ODs+OBruWEquWFiOW6puWumuaVsFxuZXhwb3J0IGNvbnN0IFByaW9yaXR5Tm9uZSA9IDA7XG5leHBvcnQgY29uc3QgUHJpb3JpdHlJZGxlID0gMTtcbmV4cG9ydCBjb25zdCBQcmlvcml0eU5vcm1hbCA9IDI7XG5leHBvcnQgY29uc3QgUHJpb3JpdHlGb3JjZSA9IDM7XG5cbi8vIOODh+ODkOODg+OCsOeUqOODreOCsOOBruihqOekuuOCquODl+OCt+ODp+ODs1xuZXhwb3J0IGNvbnN0IERlYnVnTG9nRW5hYmxlID0gdHJ1ZTtcbmV4cG9ydCBjb25zdCBEZWJ1Z1RvdWNoTG9nRW5hYmxlID0gZmFsc2U7XG5cbi8vIEZyYW1ld29ya+OBi+OCieWHuuWKm+OBmeOCi+ODreOCsOOBruODrOODmeODq+ioreWumlxuZXhwb3J0IGNvbnN0IEN1YmlzbUxvZ2dpbmdMZXZlbDogTG9nTGV2ZWwgPSBMb2dMZXZlbC5Mb2dMZXZlbF9WZXJib3NlO1xuXG4vLyDjg4fjg5Xjgqnjg6vjg4jjga7jg6zjg7Pjg4Djg7zjgr/jg7zjgrLjg4Pjg4jjgrXjgqTjgrpcbmV4cG9ydCBjb25zdCBSZW5kZXJUYXJnZXRXaWR0aCA9IDE5MDA7XG5leHBvcnQgY29uc3QgUmVuZGVyVGFyZ2V0SGVpZ2h0ID0gMTAwMDtcblxuLy8g5aSW6YOo5Lyg5YWl5Yqo5oCB5Y+C5pWwXG5leHBvcnQgY2xhc3MgbGFwcGRlZmluZVNldCB7XG4gICAgcHVibGljIHN0YXRpYyBzZXRNb2RlbERpcihtb2RlbERpcjpBcnJheTxzdHJpbmc+KTogdm9pZCB7XG4gICAgICAgIE1vZGVsRGlyID0gbW9kZWxEaXIubGVuZ3RoPjAgPyBtb2RlbERpciA6IE1vZGVsRGlyXG4gICAgfVxuICAgIHB1YmxpYyBzdGF0aWMgc2V0SGl0Qm9keShoaXRCb2R5TGlzdDpBcnJheTxzdHJpbmc+KTogdm9pZCB7XG4gICAgICAgIEhpdEJvZHlMaXN0ID0gaGl0Qm9keUxpc3QubGVuZ3RoPjAgPyBoaXRCb2R5TGlzdCA6IEhpdEJvZHlMaXN0XG4gICAgfVxuICAgIHB1YmxpYyBzdGF0aWMgc2V0SGl0SGVhZChoaXRIZWFkTGlzdDpBcnJheTxzdHJpbmc+KTogdm9pZCB7XG4gICAgICAgIEhpdEhlYWRMaXN0ID0gaGl0SGVhZExpc3QubGVuZ3RoPjAgPyBoaXRIZWFkTGlzdCA6IEhpdEhlYWRMaXN0XG4gICAgfVxufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQoYykgTGl2ZTJEIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSB0aGUgTGl2ZTJEIE9wZW4gU29mdHdhcmUgbGljZW5zZVxuICogdGhhdCBjYW4gYmUgZm91bmQgYXQgaHR0cHM6Ly93d3cubGl2ZTJkLmNvbS9ldWxhL2xpdmUyZC1vcGVuLXNvZnR3YXJlLWxpY2Vuc2UtYWdyZWVtZW50X2VuLmh0bWwuXG4gKi9cblxuaW1wb3J0IHtcbiAgTGl2ZTJEQ3ViaXNtRnJhbWV3b3JrIGFzIGxpdmUyZGN1YmlzbWZyYW1ld29yayxcbiAgT3B0aW9uIGFzIENzbV9PcHRpb25cbn0gZnJvbSAnLi4vRnJhbWV3b3JrL3NyYy9saXZlMmRjdWJpc21mcmFtZXdvcmsnO1xuaW1wb3J0IENzbV9DdWJpc21GcmFtZXdvcmsgPSBsaXZlMmRjdWJpc21mcmFtZXdvcmsuQ3ViaXNtRnJhbWV3b3JrO1xuaW1wb3J0IHsgTEFwcFZpZXcgfSBmcm9tICcuL2xhcHB2aWV3JztcbmltcG9ydCB7IExBcHBQYWwgfSBmcm9tICcuL2xhcHBwYWwnO1xuaW1wb3J0IHsgTEFwcFRleHR1cmVNYW5hZ2VyIH0gZnJvbSAnLi9sYXBwdGV4dHVyZW1hbmFnZXInO1xuaW1wb3J0IHsgTEFwcExpdmUyRE1hbmFnZXIgfSBmcm9tICcuL2xhcHBsaXZlMmRtYW5hZ2VyJztcbmltcG9ydCAqIGFzIExBcHBEZWZpbmUgZnJvbSAnLi9sYXBwZGVmaW5lJztcblxuZXhwb3J0IGxldCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50ID0gbnVsbDtcbmV4cG9ydCBsZXQgc19pbnN0YW5jZTogTEFwcERlbGVnYXRlID0gbnVsbDtcbmV4cG9ydCBsZXQgZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCA9IG51bGw7XG5leHBvcnQgbGV0IGZyYW1lQnVmZmVyOiBXZWJHTEZyYW1lYnVmZmVyID0gbnVsbDtcblxuLyoqXG4gKiDjgqLjg5fjg6rjgrHjg7zjgrfjg6fjg7Pjgq/jg6njgrnjgIJcbiAqIEN1YmlzbSBTREvjga7nrqHnkIbjgpLooYzjgYbjgIJcbiAqL1xuZXhwb3J0IGNsYXNzIExBcHBEZWxlZ2F0ZSB7XG4gIC8qKlxuICAgKiDjgq/jg6njgrnjga7jgqTjg7Pjgrnjgr/jg7PjgrnvvIjjgrfjg7PjgrDjg6vjg4jjg7PvvInjgpLov5TjgZnjgIJcbiAgICog44Kk44Oz44K544K/44Oz44K544GM55Sf5oiQ44GV44KM44Gm44GE44Gq44GE5aC05ZCI44Gv5YaF6YOo44Gn44Kk44Oz44K544K/44Oz44K544KS55Sf5oiQ44GZ44KL44CCXG4gICAqXG4gICAqIEByZXR1cm4g44Kv44Op44K544Gu44Kk44Oz44K544K/44Oz44K5XG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IExBcHBEZWxlZ2F0ZSB7XG4gICAgaWYgKHNfaW5zdGFuY2UgPT0gbnVsbCkge1xuICAgICAgc19pbnN0YW5jZSA9IG5ldyBMQXBwRGVsZWdhdGUoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc19pbnN0YW5jZTtcbiAgfVxuXG4gIC8qKlxuICAgKiDjgq/jg6njgrnjga7jgqTjg7Pjgrnjgr/jg7PjgrnvvIjjgrfjg7PjgrDjg6vjg4jjg7PvvInjgpLop6PmlL7jgZnjgovjgIJcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgcmVsZWFzZUluc3RhbmNlKCk6IHZvaWQge1xuICAgIGNvbnNvbGUubG9nKFwicmVsZWFzZUluc3RhbmNlXCIpXG4gICAgaWYgKHNfaW5zdGFuY2UgIT0gbnVsbCkge1xuICAgICAgc19pbnN0YW5jZS5yZWxlYXNlKCk7XG4gICAgfVxuXG4gICAgc19pbnN0YW5jZSA9IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogQVBQ44Gr5b+F6KaB44Gq54mp44KS5Yid5pyf5YyW44GZ44KL44CCXG4gICAqL1xuICBwdWJsaWMgaW5pdGlhbGl6ZSgpOiBib29sZWFuIHtcbiAgICAvLyDjgq3jg6Pjg7Pjg5Djgrnjga7kvZzmiJBcbiAgICAvLyBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAvLyBjYW52YXMud2lkdGggPSBMQXBwRGVmaW5lLlJlbmRlclRhcmdldFdpZHRoO1xuICAgIC8vIGNhbnZhcy5oZWlnaHQgPSBMQXBwRGVmaW5lLlJlbmRlclRhcmdldEhlaWdodDtcblxuICAgIC8vICDlj5bmtojmoYbmnrbljp/mnInnmoRjYW52YXPnlLvluIPlsLrlr7jvvIzni6znq4vorr7nva7lsLrlr7hcbiAgICAvLyAg5qC55o2uaWTojrflj5bpobXpnaLph4znmoRjYW52YXNcbiAgICBjYW52YXMgPSA8SFRNTENhbnZhc0VsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsaXZlMmRcIik7XG5cbiAgICAvL+a3u+WKoOWFqOWxgOm8oOagh+enu+WKqOS6i+S7tuebkeaOp1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgZnVuY3Rpb24gKGUpIHtcblxuICAgICAgaWYgKCFMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKS5fdmlldykge1xuICAgICAgICBMQXBwUGFsLnByaW50TWVzc2FnZShcInZpZXcgbm90Zm91bmRcIik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSB7XG5cbiAgICAgIH1cblxuICAgICAgLy/ov5nph4xpZOeahOWAvOS4juS4iuaWueeahCBjYXZhbnMg5Y+Y6YeP5L+d5oyB5LiA6Ie0XG4gICAgICBsZXQgcmVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGl2ZTJkXCIpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgbGV0IHBvc1g6IG51bWJlciA9IGUuY2xpZW50WCAtIHJlY3QubGVmdDtcbiAgICAgIGxldCBwb3NZOiBudW1iZXIgPSBlLmNsaWVudFkgLSByZWN0LnRvcDtcbiAgICAgIC8vIGNvbnNvbGUubG9nKFwib25Nb3VzZU1vdmVkOiBnYXRl5paH5Lu25LitcG9zWeWAvOS4uu+8miDjgJBcIitwb3NZK1wi44CRICBjYW52YXPnmoR0b3Dot53nprvkuLrvvJpcIityZWN0LnRvcCk7XG4gICAgICBMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKS5fdmlldy5vblRvdWNoZXNNb3ZlZChwb3NYLCBwb3NZKTtcblxuICAgIH0sIGZhbHNlKTtcblxuICAgIC8v5Zyo6L+Z6YeM5Yqg5LiK6byg5qCH56a75byA5rWP6KeI5Zmo5ZCO77yM5LiA5YiH5b2S5L2NXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3V0XCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAvL+m8oOagh+emu+W8gGRvY3VtZW505ZCO77yM5bCG5YW25L2N572u572u5Li677yIMO+8jDDvvIkgIFxuICAgICAgbGV0IGxpdmUyRE1hbmFnZXI6IExBcHBMaXZlMkRNYW5hZ2VyID0gTEFwcExpdmUyRE1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcbiAgICAgIGxpdmUyRE1hbmFnZXIub25EcmFnKDAuMCwgMC4wKTtcbiAgICB9LCBmYWxzZSk7XG5cbiAgICAvL+a3u+WKoOm8oOagh+eCueWHu+S6i+S7tlxuICAgIC8v55uR5ZCsY2F2YXPnmoTpvKDmoIfngrnlh7vkuovku7Ys5aaC5p6c5L2g5biM5pyb5Zyo6byg5qCH54K55Ye76aG16Z2i5YWD57Sg5ZCOXG4gICAgLy/nnIvmnb/lqJjkuI3lnKjnnIvlkJHpvKDmoIfvvIznm7TliLDkvaDlho3mrKHnp7vliqjpvKDmoIfvvIzmiornm5HlkKzkuovku7blr7nosaHku45jYW52YXPmjaLmiJBkb2N1bWVudFxuICAgIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKGUpXG4gICAgICBpZiAoIUxBcHBEZWxlZ2F0ZS5nZXRJbnN0YW5jZSgpLl92aWV3KSB7XG4gICAgICAgIExBcHBQYWwucHJpbnRNZXNzYWdlKFwidmlldyBub3Rmb3VuZFwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgbGV0IHJlY3QgPSBjYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBsZXQgcG9zWDogbnVtYmVyID0gZS5jbGllbnRYIC0gcmVjdC5sZWZ0O1xuICAgICAgbGV0IHBvc1k6IG51bWJlciA9IGUuY2xpZW50WSAtIHJlY3QudG9wO1xuICAgICAgLy8gY29uc29sZS5sb2coXCJvbk1vdXNlTW92ZWQ6IGdhdGXmlofku7bkuK1wb3NZ5YC85Li677yaIOOAkFwiK3Bvc1krXCLjgJEgIGNhbnZhc+eahHRvcOi3neemu+S4uu+8mlwiK3JlY3QudG9wKTtcbiAgICAgIC8v5YW25a6e5bCx5piv54Wn5oqE5LiK6Z2i55qE77yM5oqK5LiL6Z2i5Lik6KGM5Luj56CB5Yqg5LiKXG4gICAgICBMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKS5fdmlldy5vblRvdWNoZXNCZWdhbihwb3NYLCBwb3NZKTtcbiAgICAgIExBcHBEZWxlZ2F0ZS5nZXRJbnN0YW5jZSgpLl92aWV3Lm9uVG91Y2hlc0VuZGVkKHBvc1gsIHBvc1kpO1xuICAgIH0sIGZhbHNlKTtcblxuICAgIC8vIGds44Kz44Oz44OG44Kt44K544OI44KS5Yid5pyf5YyWXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGdsID0gY2FudmFzLmdldENvbnRleHQoJ3dlYmdsJykgfHwgY2FudmFzLmdldENvbnRleHQoJ2V4cGVyaW1lbnRhbC13ZWJnbCcpO1xuXG4gICAgaWYgKCFnbCkge1xuICAgICAgYWxlcnQoJ0Nhbm5vdCBpbml0aWFsaXplIFdlYkdMLiBUaGlzIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydC4nKTtcbiAgICAgIGdsID0gbnVsbDtcblxuICAgICAgZG9jdW1lbnQuYm9keS5pbm5lckhUTUwgPVxuICAgICAgICAnVGhpcyBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgdGhlIDxjb2RlPiZsdDtjYW52YXMmZ3Q7PC9jb2RlPiBlbGVtZW50Lic7XG5cbiAgICAgIC8vIGds5Yid5pyf5YyW5aSx5pWXXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8g44Kt44Oj44Oz44OQ44K544KSIERPTSDjgavov73liqBcbiAgICAvLyBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNhbnZhcyk7XG5cbiAgICBpZiAoIWZyYW1lQnVmZmVyKSB7XG4gICAgICBmcmFtZUJ1ZmZlciA9IGdsLmdldFBhcmFtZXRlcihnbC5GUkFNRUJVRkZFUl9CSU5ESU5HKTtcbiAgICB9XG5cbiAgICAvLyDpgI/pgY7oqK3lrppcbiAgICBnbC5lbmFibGUoZ2wuQkxFTkQpO1xuICAgIGdsLmJsZW5kRnVuYyhnbC5TUkNfQUxQSEEsIGdsLk9ORV9NSU5VU19TUkNfQUxQSEEpO1xuXG4gICAgY29uc3Qgc3VwcG9ydFRvdWNoOiBib29sZWFuID0gJ29udG91Y2hlbmQnIGluIGNhbnZhcztcblxuICAgIGlmIChzdXBwb3J0VG91Y2gpIHtcbiAgICAgIC8vIOOCv+ODg+ODgemWoumAo+OCs+ODvOODq+ODkOODg+OCr+mWouaVsOeZu+mMslxuICAgICAgY2FudmFzLm9udG91Y2hzdGFydCA9IG9uVG91Y2hCZWdhbjtcbiAgICAgIGNhbnZhcy5vbnRvdWNobW92ZSA9IG9uVG91Y2hNb3ZlZDtcbiAgICAgIGNhbnZhcy5vbnRvdWNoZW5kID0gb25Ub3VjaEVuZGVkO1xuICAgICAgY2FudmFzLm9udG91Y2hjYW5jZWwgPSBvblRvdWNoQ2FuY2VsO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyDjg57jgqbjgrnplqLpgKPjgrPjg7zjg6vjg5Djg4Pjgq/plqLmlbDnmbvpjLJcbiAgICAgIC8vIGNhbnZhcy5vbm1vdXNlZG93biA9IG9uQ2xpY2tCZWdhbjtcbiAgICAgIC8vIGNhbnZhcy5vbm1vdXNlbW92ZSA9IG9uTW91c2VNb3ZlZDtcbiAgICAgIC8vIGNhbnZhcy5vbm1vdXNldXAgPSBvbkNsaWNrRW5kZWQ7XG4gICAgfVxuXG4gICAgLy8gQXBwVmlld+OBruWIneacn+WMllxuICAgIHRoaXMuX3ZpZXcuaW5pdGlhbGl6ZSgpO1xuXG4gICAgLy8gQ3ViaXNtIFNES+OBruWIneacn+WMllxuICAgIHRoaXMuaW5pdGlhbGl6ZUN1YmlzbSgpO1xuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKipcbiAgICog6Kej5pS+44GZ44KL44CCXG4gICAqL1xuICBwdWJsaWMgcmVsZWFzZSgpOiB2b2lkIHtcbiAgICB0aGlzLl90ZXh0dXJlTWFuYWdlci5yZWxlYXNlKCk7XG4gICAgdGhpcy5fdGV4dHVyZU1hbmFnZXIgPSBudWxsO1xuXG4gICAgdGhpcy5fdmlldy5yZWxlYXNlKCk7XG4gICAgdGhpcy5fdmlldyA9IG51bGw7XG5cbiAgICAvLyDjg6rjgr3jg7zjgrnjgpLop6PmlL5cbiAgICBMQXBwTGl2ZTJETWFuYWdlci5yZWxlYXNlSW5zdGFuY2UoKTtcblxuICAgIC8vIEN1YmlzbSBTREvjga7op6PmlL5cbiAgICBDc21fQ3ViaXNtRnJhbWV3b3JrLmRpc3Bvc2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDlrp/ooYzlh6bnkIbjgIJcbiAgICovXG4gIHB1YmxpYyBydW4oKTogdm9pZCB7XG4gICAgY29uc29sZS5sb2coJ3J1bicpXG4gICAgLy8g44Oh44Kk44Oz44Or44O844OXXG4gICAgY29uc3QgbG9vcCA9ICgpOiB2b2lkID0+IHtcbiAgICAgIC8vIOOCpOODs+OCueOCv+ODs+OCueOBruacieeEoeOBrueiuuiqjVxuICAgICAgLy8g56Gu5a6a5pyJ5peg5a6e5L6LXG4gICAgICBpZiAoc19pbnN0YW5jZSA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8g5pmC6ZaT5pu05pawXG4gICAgICBMQXBwUGFsLnVwZGF0ZVRpbWUoKTtcblxuICAgICAgLy8g55S76Z2i44Gu5Yid5pyf5YyWXG4gICAgICBnbC5jbGVhckNvbG9yKDAuMCwgMC4wLCAwLjAsIDAuMCk7XG5cbiAgICAgIC8vIOa3seW6puODhuOCueODiOOCkuacieWKueWMllxuICAgICAgZ2wuZW5hYmxlKGdsLkRFUFRIX1RFU1QpO1xuXG4gICAgICAvLyDov5HjgY/jgavjgYLjgovniankvZPjga/jgIHpgaDjgY/jgavjgYLjgovniankvZPjgpLopobjgYTpmqDjgZlcbiAgICAgIGdsLmRlcHRoRnVuYyhnbC5MRVFVQUwpO1xuXG4gICAgICAvLyDjgqvjg6njg7zjg5Djg4Pjg5XjgqHjgoTmt7Hluqbjg5Djg4Pjg5XjgqHjgpLjgq/jg6rjgqLjgZnjgotcbiAgICAgIGdsLmNsZWFyKGdsLkNPTE9SX0JVRkZFUl9CSVQgfCBnbC5ERVBUSF9CVUZGRVJfQklUKTtcblxuICAgICAgZ2wuY2xlYXJEZXB0aCgxLjApO1xuXG4gICAgICAvLyDpgI/pgY7oqK3lrppcbiAgICAgIGdsLmVuYWJsZShnbC5CTEVORCk7XG4gICAgICBnbC5ibGVuZEZ1bmMoZ2wuU1JDX0FMUEhBLCBnbC5PTkVfTUlOVVNfU1JDX0FMUEhBKTtcblxuICAgICAgLy8g5o+P55S75pu05pawXG4gICAgICB0aGlzLl92aWV3LnJlbmRlcigpO1xuXG4gICAgICAvLyDjg6vjg7zjg5fjga7jgZ/jgoHjgavlho3luLDlkbzjgbPlh7rjgZdcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcbiAgICB9O1xuICAgIGxvb3AoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDjgrfjgqfjg7zjg4Djg7zjgpLnmbvpjLLjgZnjgovjgIJcbiAgICovXG4gIHB1YmxpYyBjcmVhdGVTaGFkZXIoKTogV2ViR0xQcm9ncmFtIHtcbiAgICAvLyDjg5Djg7zjg4bjg4Pjgq/jgrnjgrfjgqfjg7zjg4Djg7zjga7jgrPjg7Pjg5HjgqTjg6tcbiAgICBjb25zdCB2ZXJ0ZXhTaGFkZXJJZCA9IGdsLmNyZWF0ZVNoYWRlcihnbC5WRVJURVhfU0hBREVSKTtcblxuICAgIGlmICh2ZXJ0ZXhTaGFkZXJJZCA9PSBudWxsKSB7XG4gICAgICBMQXBwUGFsLnByaW50TWVzc2FnZSgnZmFpbGVkIHRvIGNyZWF0ZSB2ZXJ0ZXhTaGFkZXInKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHZlcnRleFNoYWRlcjogc3RyaW5nID1cbiAgICAgICdwcmVjaXNpb24gbWVkaXVtcCBmbG9hdDsnICtcbiAgICAgICdhdHRyaWJ1dGUgdmVjMyBwb3NpdGlvbjsnICtcbiAgICAgICdhdHRyaWJ1dGUgdmVjMiB1djsnICtcbiAgICAgICd2YXJ5aW5nIHZlYzIgdnV2OycgK1xuICAgICAgJ3ZvaWQgbWFpbih2b2lkKScgK1xuICAgICAgJ3snICtcbiAgICAgICcgICBnbF9Qb3NpdGlvbiA9IHZlYzQocG9zaXRpb24sIDEuMCk7JyArXG4gICAgICAnICAgdnV2ID0gdXY7JyArXG4gICAgICAnfSc7XG5cbiAgICBnbC5zaGFkZXJTb3VyY2UodmVydGV4U2hhZGVySWQsIHZlcnRleFNoYWRlcik7XG4gICAgZ2wuY29tcGlsZVNoYWRlcih2ZXJ0ZXhTaGFkZXJJZCk7XG5cbiAgICAvLyDjg5Xjg6njgrDjg6Hjg7Pjg4jjgrfjgqfjg7zjg4Djga7jgrPjg7Pjg5HjgqTjg6tcbiAgICBjb25zdCBmcmFnbWVudFNoYWRlcklkID0gZ2wuY3JlYXRlU2hhZGVyKGdsLkZSQUdNRU5UX1NIQURFUik7XG5cbiAgICBpZiAoZnJhZ21lbnRTaGFkZXJJZCA9PSBudWxsKSB7XG4gICAgICBMQXBwUGFsLnByaW50TWVzc2FnZSgnZmFpbGVkIHRvIGNyZWF0ZSBmcmFnbWVudFNoYWRlcicpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgZnJhZ21lbnRTaGFkZXI6IHN0cmluZyA9XG4gICAgICAncHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7JyArXG4gICAgICAndmFyeWluZyB2ZWMyIHZ1djsnICtcbiAgICAgICd1bmlmb3JtIHNhbXBsZXIyRCB0ZXh0dXJlOycgK1xuICAgICAgJ3ZvaWQgbWFpbih2b2lkKScgK1xuICAgICAgJ3snICtcbiAgICAgICcgICBnbF9GcmFnQ29sb3IgPSB0ZXh0dXJlMkQodGV4dHVyZSwgdnV2KTsnICtcbiAgICAgICd9JztcblxuICAgIGdsLnNoYWRlclNvdXJjZShmcmFnbWVudFNoYWRlcklkLCBmcmFnbWVudFNoYWRlcik7XG4gICAgZ2wuY29tcGlsZVNoYWRlcihmcmFnbWVudFNoYWRlcklkKTtcblxuICAgIC8vIOODl+ODreOCsOODqeODoOOCquODluOCuOOCp+OCr+ODiOOBruS9nOaIkFxuICAgIGNvbnN0IHByb2dyYW1JZCA9IGdsLmNyZWF0ZVByb2dyYW0oKTtcbiAgICBnbC5hdHRhY2hTaGFkZXIocHJvZ3JhbUlkLCB2ZXJ0ZXhTaGFkZXJJZCk7XG4gICAgZ2wuYXR0YWNoU2hhZGVyKHByb2dyYW1JZCwgZnJhZ21lbnRTaGFkZXJJZCk7XG5cbiAgICBnbC5kZWxldGVTaGFkZXIodmVydGV4U2hhZGVySWQpO1xuICAgIGdsLmRlbGV0ZVNoYWRlcihmcmFnbWVudFNoYWRlcklkKTtcblxuICAgIC8vIOODquODs+OCr1xuICAgIGdsLmxpbmtQcm9ncmFtKHByb2dyYW1JZCk7XG5cbiAgICBnbC51c2VQcm9ncmFtKHByb2dyYW1JZCk7XG5cbiAgICByZXR1cm4gcHJvZ3JhbUlkO1xuICB9XG5cbiAgLyoqXG4gICAqIFZpZXfmg4XloLHjgpLlj5blvpfjgZnjgovjgIJcbiAgICovXG4gIHB1YmxpYyBnZXRWaWV3KCk6IExBcHBWaWV3IHtcbiAgICByZXR1cm4gdGhpcy5fdmlldztcbiAgfVxuXG4gIHB1YmxpYyBnZXRUZXh0dXJlTWFuYWdlcigpOiBMQXBwVGV4dHVyZU1hbmFnZXIge1xuICAgIHJldHVybiB0aGlzLl90ZXh0dXJlTWFuYWdlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiDjgrPjg7Pjgrnjg4jjg6njgq/jgr9cbiAgICovXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuX2NhcHR1cmVkID0gZmFsc2U7XG4gICAgdGhpcy5fbW91c2VYID0gMC4wO1xuICAgIHRoaXMuX21vdXNlWSA9IDAuMDtcbiAgICB0aGlzLl9pc0VuZCA9IGZhbHNlO1xuXG4gICAgdGhpcy5fY3ViaXNtT3B0aW9uID0gbmV3IENzbV9PcHRpb24oKTtcbiAgICB0aGlzLl92aWV3ID0gbmV3IExBcHBWaWV3KCk7XG4gICAgdGhpcy5fdGV4dHVyZU1hbmFnZXIgPSBuZXcgTEFwcFRleHR1cmVNYW5hZ2VyKCk7XG4gIH1cblxuICAvKipcbiAgICogQ3ViaXNtIFNES+OBruWIneacn+WMllxuICAgKi9cbiAgcHVibGljIGluaXRpYWxpemVDdWJpc20oKTogdm9pZCB7XG4gICAgLy8gc2V0dXAgY3ViaXNtXG4gICAgdGhpcy5fY3ViaXNtT3B0aW9uLmxvZ0Z1bmN0aW9uID0gTEFwcFBhbC5wcmludE1lc3NhZ2U7XG4gICAgdGhpcy5fY3ViaXNtT3B0aW9uLmxvZ2dpbmdMZXZlbCA9IExBcHBEZWZpbmUuQ3ViaXNtTG9nZ2luZ0xldmVsO1xuICAgIENzbV9DdWJpc21GcmFtZXdvcmsuc3RhcnRVcCh0aGlzLl9jdWJpc21PcHRpb24pO1xuXG4gICAgLy8gaW5pdGlhbGl6ZSBjdWJpc21cbiAgICBDc21fQ3ViaXNtRnJhbWV3b3JrLmluaXRpYWxpemUoKTtcblxuICAgIC8vIGxvYWQgbW9kZWxcbiAgICBMQXBwTGl2ZTJETWFuYWdlci5nZXRJbnN0YW5jZSgpO1xuXG4gICAgTEFwcFBhbC51cGRhdGVUaW1lKCk7XG5cbiAgICB0aGlzLl92aWV3LmluaXRpYWxpemVTcHJpdGUoKTtcbiAgfVxuXG4gIF9jdWJpc21PcHRpb246IENzbV9PcHRpb247IC8vIEN1YmlzbSBTREsgT3B0aW9uXG4gIF92aWV3OiBMQXBwVmlldzsgLy8gVmlld+aDheWgsVxuICBfY2FwdHVyZWQ6IGJvb2xlYW47IC8vIOOCr+ODquODg+OCr+OBl+OBpuOBhOOCi+OBi1xuICBfbW91c2VYOiBudW1iZXI7IC8vIOODnuOCpuOCuVjluqfmqJlcbiAgX21vdXNlWTogbnVtYmVyOyAvLyDjg57jgqbjgrlZ5bqn5qiZXG4gIF9pc0VuZDogYm9vbGVhbjsgLy8gQVBQ57WC5LqG44GX44Gm44GE44KL44GLXG4gIF90ZXh0dXJlTWFuYWdlcjogTEFwcFRleHR1cmVNYW5hZ2VyOyAvLyDjg4bjgq/jgrnjg4Hjg6Pjg57jg43jg7zjgrjjg6Pjg7xcbn1cblxuLyoqXG4gKiDjgq/jg6rjg4Pjgq/jgZfjgZ/jgajjgY3jgavlkbzjgbDjgozjgovjgIJcbiAqL1xuZnVuY3Rpb24gb25DbGlja0JlZ2FuKGU6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgaWYgKCFMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKS5fdmlldykge1xuICAgIExBcHBQYWwucHJpbnRNZXNzYWdlKCd2aWV3IG5vdGZvdW5kJyk7XG4gICAgcmV0dXJuO1xuICB9XG4gIExBcHBEZWxlZ2F0ZS5nZXRJbnN0YW5jZSgpLl9jYXB0dXJlZCA9IHRydWU7XG5cbiAgY29uc3QgcG9zWDogbnVtYmVyID0gZS5wYWdlWDtcbiAgY29uc3QgcG9zWTogbnVtYmVyID0gZS5wYWdlWTtcblxuICBMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKS5fdmlldy5vblRvdWNoZXNCZWdhbihwb3NYLCBwb3NZKTtcbn1cblxuLyoqXG4gKiDjg57jgqbjgrnjg53jgqTjg7Pjgr/jgYzli5XjgYTjgZ/jgonlkbzjgbDjgozjgovjgIJcbiAqL1xuZnVuY3Rpb24gb25Nb3VzZU1vdmVkKGU6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgaWYgKCFMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKS5fY2FwdHVyZWQpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoIUxBcHBEZWxlZ2F0ZS5nZXRJbnN0YW5jZSgpLl92aWV3KSB7XG4gICAgTEFwcFBhbC5wcmludE1lc3NhZ2UoJ3ZpZXcgbm90Zm91bmQnKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCByZWN0ID0gKGUudGFyZ2V0IGFzIEVsZW1lbnQpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICBjb25zdCBwb3NYOiBudW1iZXIgPSBlLmNsaWVudFggLSByZWN0LmxlZnQ7XG4gIGNvbnN0IHBvc1k6IG51bWJlciA9IGUuY2xpZW50WSAtIHJlY3QudG9wO1xuXG4gIExBcHBEZWxlZ2F0ZS5nZXRJbnN0YW5jZSgpLl92aWV3Lm9uVG91Y2hlc01vdmVkKHBvc1gsIHBvc1kpO1xufVxuXG4vKipcbiAqIOOCr+ODquODg+OCr+OBjOe1guS6huOBl+OBn+OCieWRvOOBsOOCjOOCi+OAglxuICovXG5mdW5jdGlvbiBvbkNsaWNrRW5kZWQoZTogTW91c2VFdmVudCk6IHZvaWQge1xuICBMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKS5fY2FwdHVyZWQgPSBmYWxzZTtcbiAgaWYgKCFMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKS5fdmlldykge1xuICAgIExBcHBQYWwucHJpbnRNZXNzYWdlKCd2aWV3IG5vdGZvdW5kJyk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgcmVjdCA9IChlLnRhcmdldCBhcyBFbGVtZW50KS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgY29uc3QgcG9zWDogbnVtYmVyID0gZS5jbGllbnRYIC0gcmVjdC5sZWZ0O1xuICBjb25zdCBwb3NZOiBudW1iZXIgPSBlLmNsaWVudFkgLSByZWN0LnRvcDtcblxuICBMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKS5fdmlldy5vblRvdWNoZXNFbmRlZChwb3NYLCBwb3NZKTtcbn1cblxuLyoqXG4gKiDjgr/jg4Pjg4HjgZfjgZ/jgajjgY3jgavlkbzjgbDjgozjgovjgIJcbiAqL1xuZnVuY3Rpb24gb25Ub3VjaEJlZ2FuKGU6IFRvdWNoRXZlbnQpOiB2b2lkIHtcbiAgaWYgKCFMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKS5fdmlldykge1xuICAgIExBcHBQYWwucHJpbnRNZXNzYWdlKCd2aWV3IG5vdGZvdW5kJyk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKCkuX2NhcHR1cmVkID0gdHJ1ZTtcblxuICBjb25zdCBwb3NYID0gZS5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWDtcbiAgY29uc3QgcG9zWSA9IGUuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVk7XG5cbiAgTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKCkuX3ZpZXcub25Ub3VjaGVzQmVnYW4ocG9zWCwgcG9zWSk7XG59XG5cbi8qKlxuICog44K544Ov44Kk44OX44GZ44KL44Go5ZG844Gw44KM44KL44CCXG4gKi9cbmZ1bmN0aW9uIG9uVG91Y2hNb3ZlZChlOiBUb3VjaEV2ZW50KTogdm9pZCB7XG4gIGlmICghTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKCkuX2NhcHR1cmVkKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKCFMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKS5fdmlldykge1xuICAgIExBcHBQYWwucHJpbnRNZXNzYWdlKCd2aWV3IG5vdGZvdW5kJyk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgcmVjdCA9IChlLnRhcmdldCBhcyBFbGVtZW50KS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICBjb25zdCBwb3NYID0gZS5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRYIC0gcmVjdC5sZWZ0O1xuICBjb25zdCBwb3NZID0gZS5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRZIC0gcmVjdC50b3A7XG5cbiAgTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKCkuX3ZpZXcub25Ub3VjaGVzTW92ZWQocG9zWCwgcG9zWSk7XG59XG5cbi8qKlxuICog44K/44OD44OB44GM57WC5LqG44GX44Gf44KJ5ZG844Gw44KM44KL44CCXG4gKi9cbmZ1bmN0aW9uIG9uVG91Y2hFbmRlZChlOiBUb3VjaEV2ZW50KTogdm9pZCB7XG4gIExBcHBEZWxlZ2F0ZS5nZXRJbnN0YW5jZSgpLl9jYXB0dXJlZCA9IGZhbHNlO1xuXG4gIGlmICghTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKCkuX3ZpZXcpIHtcbiAgICBMQXBwUGFsLnByaW50TWVzc2FnZSgndmlldyBub3Rmb3VuZCcpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHJlY3QgPSAoZS50YXJnZXQgYXMgRWxlbWVudCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgY29uc3QgcG9zWCA9IGUuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WCAtIHJlY3QubGVmdDtcbiAgY29uc3QgcG9zWSA9IGUuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WSAtIHJlY3QudG9wO1xuXG4gIExBcHBEZWxlZ2F0ZS5nZXRJbnN0YW5jZSgpLl92aWV3Lm9uVG91Y2hlc0VuZGVkKHBvc1gsIHBvc1kpO1xufVxuXG4vKipcbiAqIOOCv+ODg+ODgeOBjOOCreODo+ODs+OCu+ODq+OBleOCjOOCi+OBqOWRvOOBsOOCjOOCi+OAglxuICovXG5mdW5jdGlvbiBvblRvdWNoQ2FuY2VsKGU6IFRvdWNoRXZlbnQpOiB2b2lkIHtcbiAgTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKCkuX2NhcHR1cmVkID0gZmFsc2U7XG5cbiAgaWYgKCFMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKS5fdmlldykge1xuICAgIExBcHBQYWwucHJpbnRNZXNzYWdlKCd2aWV3IG5vdGZvdW5kJyk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgcmVjdCA9IChlLnRhcmdldCBhcyBFbGVtZW50KS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICBjb25zdCBwb3NYID0gZS5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRYIC0gcmVjdC5sZWZ0O1xuICBjb25zdCBwb3NZID0gZS5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRZIC0gcmVjdC50b3A7XG5cbiAgTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKCkuX3ZpZXcub25Ub3VjaGVzRW5kZWQocG9zWCwgcG9zWSk7XG59XG4iLCIvKipcbiAqIENvcHlyaWdodChjKSBMaXZlMkQgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IHRoZSBMaXZlMkQgT3BlbiBTb2Z0d2FyZSBsaWNlbnNlXG4gKiB0aGF0IGNhbiBiZSBmb3VuZCBhdCBodHRwczovL3d3dy5saXZlMmQuY29tL2V1bGEvbGl2ZTJkLW9wZW4tc29mdHdhcmUtbGljZW5zZS1hZ3JlZW1lbnRfZW4uaHRtbC5cbiAqL1xuXG5pbXBvcnQgeyBMaXZlMkRDdWJpc21GcmFtZXdvcmsgYXMgY3ViaXNtbWF0cml4NDQgfSBmcm9tICcuLi9GcmFtZXdvcmsvc3JjL21hdGgvY3ViaXNtbWF0cml4NDQnO1xuaW1wb3J0IHsgTGl2ZTJEQ3ViaXNtRnJhbWV3b3JrIGFzIGNzbXZlY3RvciB9IGZyb20gJy4uL0ZyYW1ld29yay9zcmMvdHlwZS9jc212ZWN0b3InO1xuaW1wb3J0IHsgTGl2ZTJEQ3ViaXNtRnJhbWV3b3JrIGFzIGFjdWJpc21tb3Rpb24gfSBmcm9tICcuLi9GcmFtZXdvcmsvc3JjL21vdGlvbi9hY3ViaXNtbW90aW9uJztcbmltcG9ydCBDc21fY3NtVmVjdG9yID0gY3NtdmVjdG9yLmNzbVZlY3RvcjtcbmltcG9ydCBDc21fQ3ViaXNtTWF0cml4NDQgPSBjdWJpc21tYXRyaXg0NC5DdWJpc21NYXRyaXg0NDtcbmltcG9ydCBBQ3ViaXNtTW90aW9uID0gYWN1YmlzbW1vdGlvbi5BQ3ViaXNtTW90aW9uO1xuXG5pbXBvcnQgeyBMQXBwTW9kZWwgfSBmcm9tICcuL2xhcHBtb2RlbCc7XG5pbXBvcnQgeyBMQXBwUGFsIH0gZnJvbSAnLi9sYXBwcGFsJztcbmltcG9ydCB7IGNhbnZhcyB9IGZyb20gJy4vbGFwcGRlbGVnYXRlJztcbmltcG9ydCAqIGFzIExBcHBEZWZpbmUgZnJvbSAnLi9sYXBwZGVmaW5lJztcblxuZXhwb3J0IGxldCBzX2luc3RhbmNlOiBMQXBwTGl2ZTJETWFuYWdlciA9IG51bGw7XG5cbmxldCB0aW1lciA9IG51bGw7XG5cbi8qKlxuICog44K144Oz44OX44Or44Ki44OX44Oq44Kx44O844K344On44Oz44Gr44GK44GE44GmQ3ViaXNtTW9kZWzjgpLnrqHnkIbjgZnjgovjgq/jg6njgrlcbiAqIOODouODh+ODq+eUn+aIkOOBqOegtOajhOOAgeOCv+ODg+ODl+OCpOODmeODs+ODiOOBruWHpueQhuOAgeODouODh+ODq+WIh+OCiuabv+OBiOOCkuihjOOBhuOAglxuICog566h55CG5qC35pys5bqU55So56iL5bqP5Lit55qEQ3ViaXNtTW9kZWznmoTnsbtcbiAqIOi/m+ihjOaooeWei+eUn+aIkOWSjOW6n+W8g+OAgeaKveWktOS6i+S7tueahOWkhOeQhuOAgeaooeWei+WIh+aNouOAglxuICovXG5leHBvcnQgY2xhc3MgTEFwcExpdmUyRE1hbmFnZXIge1xuICAvKipcbiAgICog44Kv44Op44K544Gu44Kk44Oz44K544K/44Oz44K577yI44K344Oz44Kw44Or44OI44Oz77yJ44KS6L+U44GZ44CCXG4gICAqIOOCpOODs+OCueOCv+ODs+OCueOBjOeUn+aIkOOBleOCjOOBpuOBhOOBquOBhOWgtOWQiOOBr+WGhemDqOOBp+OCpOODs+OCueOCv+ODs+OCueOCkueUn+aIkOOBmeOCi+OAglxuICAgKlxuICAgKiBAcmV0dXJuIOOCr+ODqeOCueOBruOCpOODs+OCueOCv+ODs+OCuVxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBMQXBwTGl2ZTJETWFuYWdlciB7XG4gICAgaWYgKHNfaW5zdGFuY2UgPT0gbnVsbCkge1xuICAgICAgc19pbnN0YW5jZSA9IG5ldyBMQXBwTGl2ZTJETWFuYWdlcigpO1xuICAgIH1cblxuICAgIHJldHVybiBzX2luc3RhbmNlO1xuICB9XG5cbiAgLyoqXG4gICAqIOOCr+ODqeOCueOBruOCpOODs+OCueOCv+ODs+OCue+8iOOCt+ODs+OCsOODq+ODiOODs++8ieOCkuino+aUvuOBmeOCi+OAglxuICAgKi9cbiAgcHVibGljIHN0YXRpYyByZWxlYXNlSW5zdGFuY2UoKTogdm9pZCB7XG4gICAgaWYgKHNfaW5zdGFuY2UgIT0gbnVsbCkge1xuICAgICAgc19pbnN0YW5jZSA9IHZvaWQgMDtcbiAgICB9XG5cbiAgICBzX2luc3RhbmNlID0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiDnj77lnKjjga7jgrfjg7zjg7Pjgafkv53mjIHjgZfjgabjgYTjgovjg6Ljg4fjg6vjgpLov5TjgZnjgIJcbiAgICpcbiAgICogQHBhcmFtIG5vIOODouODh+ODq+ODquOCueODiOOBruOCpOODs+ODh+ODg+OCr+OCueWApFxuICAgKiBAcmV0dXJuIOODouODh+ODq+OBruOCpOODs+OCueOCv+ODs+OCueOCkui/lOOBmeOAguOCpOODs+ODh+ODg+OCr+OCueWApOOBjOevhOWbsuWkluOBruWgtOWQiOOBr05VTEzjgpLov5TjgZnjgIJcbiAgICovXG4gIHB1YmxpYyBnZXRNb2RlbChubzogbnVtYmVyKTogTEFwcE1vZGVsIHtcbiAgICBpZiAobm8gPCB0aGlzLl9tb2RlbHMuZ2V0U2l6ZSgpKSB7XG4gICAgICByZXR1cm4gdGhpcy5fbW9kZWxzLmF0KG5vKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiDnj77lnKjjga7jgrfjg7zjg7Pjgafkv53mjIHjgZfjgabjgYTjgovjgZnjgbnjgabjga7jg6Ljg4fjg6vjgpLop6PmlL7jgZnjgotcbiAgICovXG4gIHB1YmxpYyByZWxlYXNlQWxsTW9kZWwoKTogdm9pZCB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9tb2RlbHMuZ2V0U2l6ZSgpOyBpKyspIHtcbiAgICAgIHRoaXMuX21vZGVscy5hdChpKS5yZWxlYXNlKCk7XG4gICAgICB0aGlzLl9tb2RlbHMuc2V0KGksIG51bGwpO1xuICAgIH1cblxuICAgIHRoaXMuX21vZGVscy5jbGVhcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIOeUu+mdouOCkuODieODqeODg+OCsOOBl+OBn+aZguOBruWHpueQhlxuICAgKlxuICAgKiBAcGFyYW0geCDnlLvpnaLjga5Y5bqn5qiZXG4gICAqIEBwYXJhbSB5IOeUu+mdouOBrlnluqfmqJlcbiAgICovXG4gIHB1YmxpYyBvbkRyYWcoeDogbnVtYmVyLCB5OiBudW1iZXIpOiB2b2lkIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX21vZGVscy5nZXRTaXplKCk7IGkrKykge1xuICAgICAgY29uc3QgbW9kZWw6IExBcHBNb2RlbCA9IHRoaXMuZ2V0TW9kZWwoaSk7XG5cbiAgICAgIGlmIChtb2RlbCkge1xuICAgICAgICBtb2RlbC5zZXREcmFnZ2luZyh4LCB5KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICog55S76Z2i44KS44K/44OD44OX44GX44Gf5pmC44Gu5Yem55CGXG4gICAqXG4gICAqIEBwYXJhbSB4IOeUu+mdouOBrljluqfmqJlcbiAgICogQHBhcmFtIHkg55S76Z2i44GuWeW6p+aomVxuICAgKi9cbiAgcHVibGljIG9uVGFwKHg6IG51bWJlciwgeTogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKExBcHBEZWZpbmUuRGVidWdMb2dFbmFibGUpIHtcbiAgICAgIExBcHBQYWwucHJpbnRNZXNzYWdlKFxuICAgICAgICBgW0FQUF10YXAgcG9pbnQ6IHt4OiAke3gudG9GaXhlZCgyKX0geTogJHt5LnRvRml4ZWQoMil9fWBcbiAgICAgICk7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9tb2RlbHMuZ2V0U2l6ZSgpOyBpKyspIHtcbiAgICAgIGlmICh0aGlzLl9tb2RlbHMuYXQoaSkuaGl0VGVzdChMQXBwRGVmaW5lLkhpdEFyZWFOYW1lSGVhZCwgeCwgeSkpIHtcbiAgICAgICAgaWYgKExBcHBEZWZpbmUuRGVidWdMb2dFbmFibGUpIHtcbiAgICAgICAgICBMQXBwUGFsLnByaW50TWVzc2FnZShcbiAgICAgICAgICAgIGBbQVBQXWhpdCBhcmVhOiBbJHtMQXBwRGVmaW5lLkhpdEFyZWFOYW1lSGVhZH1dYFxuICAgICAgICAgICk7XG4gICAgICAgICAgdGhpcy50YWxrUHJpbnQoTEFwcERlZmluZS5IaXRIZWFkTGlzdFtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqTEFwcERlZmluZS5IaXRIZWFkTGlzdC5sZW5ndGgpXSlcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9tb2RlbHMuYXQoaSkuc2V0UmFuZG9tRXhwcmVzc2lvbigpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLl9tb2RlbHMuYXQoaSkuaGl0VGVzdChMQXBwRGVmaW5lLkhpdEFyZWFOYW1lQm9keSwgeCwgeSkpIHtcbiAgICAgICAgaWYgKExBcHBEZWZpbmUuRGVidWdMb2dFbmFibGUpIHtcbiAgICAgICAgICBMQXBwUGFsLnByaW50TWVzc2FnZShcbiAgICAgICAgICAgIGBbQVBQXWhpdCBhcmVhOiBbJHtMQXBwRGVmaW5lLkhpdEFyZWFOYW1lQm9keX1dYFxuICAgICAgICAgICk7XG4gICAgICAgICAgdGhpcy50YWxrUHJpbnQoTEFwcERlZmluZS5IaXRCb2R5TGlzdFtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqTEFwcERlZmluZS5IaXRCb2R5TGlzdC5sZW5ndGgpXSlcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9tb2RlbHNcbiAgICAgICAgICAuYXQoaSlcbiAgICAgICAgICAuc3RhcnRSYW5kb21Nb3Rpb24oXG4gICAgICAgICAgICBMQXBwRGVmaW5lLk1vdGlvbkdyb3VwVGFwQm9keSxcbiAgICAgICAgICAgIExBcHBEZWZpbmUuUHJpb3JpdHlOb3JtYWwsXG4gICAgICAgICAgICB0aGlzLl9maW5pc2hlZE1vdGlvblxuICAgICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8g6aG16Z2i5bGe5oCn5Y+Y5YyWXG4gIHB1YmxpYyB0YWxrUHJpbnQocHJpbnQ6c3RyaW5nKTogdm9pZCB7XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICBsZXQgcHJpbnROb3cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGl2ZTJkLXByaW50Jyk7XG4gICAgcHJpbnROb3cuaW5uZXJIVE1MID0gcHJpbnQ7XG4gICAgcHJpbnROb3cuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHByaW50Tm93LmlubmVySFRNTCA9ICcnO1xuICAgICAgcHJpbnROb3cuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9LCAyMDAwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDnlLvpnaLjgpLmm7TmlrDjgZnjgovjgajjgY3jga7lh6bnkIZcbiAgICog44Oi44OH44Or44Gu5pu05paw5Yem55CG5Y+K44Gz5o+P55S75Yem55CG44KS6KGM44GGXG4gICAqL1xuICBwdWJsaWMgb25VcGRhdGUoKTogdm9pZCB7XG4gICAgbGV0IHByb2plY3Rpb246IENzbV9DdWJpc21NYXRyaXg0NCA9IG5ldyBDc21fQ3ViaXNtTWF0cml4NDQoKTtcblxuICAgIGNvbnN0IHsgd2lkdGgsIGhlaWdodCB9ID0gY2FudmFzO1xuICAgIHByb2plY3Rpb24uc2NhbGUoMS4wLCB3aWR0aCAvIGhlaWdodCk7XG5cbiAgICBpZiAodGhpcy5fdmlld01hdHJpeCAhPSBudWxsKSB7XG4gICAgICBwcm9qZWN0aW9uLm11bHRpcGx5QnlNYXRyaXgodGhpcy5fdmlld01hdHJpeCk7XG4gICAgfVxuXG4gICAgY29uc3Qgc2F2ZVByb2plY3Rpb246IENzbV9DdWJpc21NYXRyaXg0NCA9IHByb2plY3Rpb24uY2xvbmUoKTtcbiAgICBjb25zdCBtb2RlbENvdW50OiBudW1iZXIgPSB0aGlzLl9tb2RlbHMuZ2V0U2l6ZSgpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtb2RlbENvdW50OyArK2kpIHtcbiAgICAgIGNvbnN0IG1vZGVsOiBMQXBwTW9kZWwgPSB0aGlzLmdldE1vZGVsKGkpO1xuICAgICAgcHJvamVjdGlvbiA9IHNhdmVQcm9qZWN0aW9uLmNsb25lKCk7XG5cbiAgICAgIG1vZGVsLnVwZGF0ZSgpO1xuICAgICAgbW9kZWwuZHJhdyhwcm9qZWN0aW9uKTsgLy8g5Y+C54Wn5rih44GX44Gq44Gu44GncHJvamVjdGlvbuOBr+WkieizquOBmeOCi+OAglxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiDmrKHjga7jgrfjg7zjg7PjgavliIfjgorjgYvjgYjjgotcbiAgICog44K144Oz44OX44Or44Ki44OX44Oq44Kx44O844K344On44Oz44Gn44Gv44Oi44OH44Or44K744OD44OI44Gu5YiH44KK5pu/44GI44KS6KGM44GG44CCXG4gICAqL1xuICBwdWJsaWMgbmV4dFNjZW5lKCk6IHZvaWQge1xuICAgIGNvbnN0IG5vOiBudW1iZXIgPSAodGhpcy5fc2NlbmVJbmRleCArIDEpICUgTEFwcERlZmluZS5Nb2RlbERpclNpemU7XG4gICAgdGhpcy5jaGFuZ2VTY2VuZShubyk7XG4gIH1cblxuICAvKipcbiAgICog44K344O844Oz44KS5YiH44KK5pu/44GI44KLXG4gICAqIOOCteODs+ODl+ODq+OCouODl+ODquOCseODvOOCt+ODp+ODs+OBp+OBr+ODouODh+ODq+OCu+ODg+ODiOOBruWIh+OCiuabv+OBiOOCkuihjOOBhuOAglxuICAgKiDovazmjaLplZzlpLRcbiAgICog5Zyo5qC35pys5bqU55So56iL5bqP5Lit5YiH5o2i5qih5Z6L6ZuG44CCXG4gICAqL1xuICBwdWJsaWMgY2hhbmdlU2NlbmUoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX3NjZW5lSW5kZXggPSBpbmRleDtcbiAgICBpZiAoTEFwcERlZmluZS5EZWJ1Z0xvZ0VuYWJsZSkge1xuICAgICAgTEFwcFBhbC5wcmludE1lc3NhZ2UoYFtBUFBdbW9kZWwgaW5kZXg6ICR7dGhpcy5fc2NlbmVJbmRleH1gKTtcbiAgICB9XG5cbiAgICAvLyBNb2RlbERpcltd44Gr5L+d5oyB44GX44Gf44OH44Kj44Os44Kv44OI44Oq5ZCN44GL44KJXG4gICAgLy8gbW9kZWwzLmpzb27jga7jg5HjgrnjgpLmsbrlrprjgZnjgovjgIJcbiAgICAvLyDjg4fjgqPjg6zjgq/jg4jjg6rlkI3jgahtb2RlbDMuanNvbuOBruWQjeWJjeOCkuS4gOiHtOOBleOBm+OBpuOBiuOBj+OBk+OBqOOAglxuICAgIGNvbnN0IG1vZGVsOiBzdHJpbmcgPSBMQXBwRGVmaW5lLk1vZGVsRGlyW2luZGV4XTtcbiAgICBjb25zdCBtb2RlbFBhdGg6IHN0cmluZyA9IExBcHBEZWZpbmUuUmVzb3VyY2VzUGF0aCArIG1vZGVsICsgJy8nO1xuICAgIGxldCBtb2RlbEpzb25OYW1lOiBzdHJpbmcgPSBMQXBwRGVmaW5lLk1vZGVsRGlyW2luZGV4XTtcbiAgICBtb2RlbEpzb25OYW1lICs9ICcubW9kZWwzLmpzb24nO1xuXG4gICAgdGhpcy5yZWxlYXNlQWxsTW9kZWwoKTtcbiAgICB0aGlzLl9tb2RlbHMucHVzaEJhY2sobmV3IExBcHBNb2RlbCgpKTtcbiAgICB0aGlzLl9tb2RlbHMuYXQoMCkubG9hZEFzc2V0cyhtb2RlbFBhdGgsIG1vZGVsSnNvbk5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIOOCs+ODs+OCueODiOODqeOCr+OCv1xuICAgKi9cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5fdmlld01hdHJpeCA9IG5ldyBDc21fQ3ViaXNtTWF0cml4NDQoKTtcbiAgICB0aGlzLl9tb2RlbHMgPSBuZXcgQ3NtX2NzbVZlY3RvcjxMQXBwTW9kZWw+KCk7XG4gICAgdGhpcy5fc2NlbmVJbmRleCA9IDA7XG4gICAgdGhpcy5jaGFuZ2VTY2VuZSh0aGlzLl9zY2VuZUluZGV4KTtcbiAgfVxuXG4gIF92aWV3TWF0cml4OiBDc21fQ3ViaXNtTWF0cml4NDQ7IC8vIOODouODh+ODq+aPj+eUu+OBq+eUqOOBhOOCi3ZpZXfooYzliJdcbiAgX21vZGVsczogQ3NtX2NzbVZlY3RvcjxMQXBwTW9kZWw+OyAvLyDjg6Ljg4fjg6vjgqTjg7Pjgrnjgr/jg7Pjgrnjga7jgrPjg7Pjg4bjg4pcbiAgX3NjZW5lSW5kZXg6IG51bWJlcjsgLy8g6KGo56S644GZ44KL44K344O844Oz44Gu44Kk44Oz44OH44OD44Kv44K55YCkXG4gIC8vIOODouODvOOCt+ODp+ODs+WGjeeUn+e1guS6huOBruOCs+ODvOODq+ODkOODg+OCr+mWouaVsFxuICBfZmluaXNoZWRNb3Rpb24gPSAoc2VsZjogQUN1YmlzbU1vdGlvbik6IHZvaWQgPT4ge1xuICAgIExBcHBQYWwucHJpbnRNZXNzYWdlKCdNb3Rpb24gRmluaXNoZWQ6Jyk7XG4gIH07XG59XG4iLCIvKipcbiAqIENvcHlyaWdodChjKSBMaXZlMkQgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IHRoZSBMaXZlMkQgT3BlbiBTb2Z0d2FyZSBsaWNlbnNlXG4gKiB0aGF0IGNhbiBiZSBmb3VuZCBhdCBodHRwczovL3d3dy5saXZlMmQuY29tL2V1bGEvbGl2ZTJkLW9wZW4tc29mdHdhcmUtbGljZW5zZS1hZ3JlZW1lbnRfZW4uaHRtbC5cbiAqL1xuXG5pbXBvcnQgeyBMaXZlMkRDdWJpc21GcmFtZXdvcmsgYXMgbGl2ZTJkY3ViaXNtZnJhbWV3b3JrIH0gZnJvbSAnLi4vRnJhbWV3b3JrL3NyYy9saXZlMmRjdWJpc21mcmFtZXdvcmsnO1xuaW1wb3J0IHsgTGl2ZTJEQ3ViaXNtRnJhbWV3b3JrIGFzIGN1YmlzbWlkIH0gZnJvbSAnLi4vRnJhbWV3b3JrL3NyYy9pZC9jdWJpc21pZCc7XG5pbXBvcnQgeyBMaXZlMkRDdWJpc21GcmFtZXdvcmsgYXMgY3ViaXNtdXNlcm1vZGVsIH0gZnJvbSAnLi4vRnJhbWV3b3JrL3NyYy9tb2RlbC9jdWJpc211c2VybW9kZWwnO1xuaW1wb3J0IHsgTGl2ZTJEQ3ViaXNtRnJhbWV3b3JrIGFzIGljdWJpc21tb2RlbHNldHRpbmcgfSBmcm9tICcuLi9GcmFtZXdvcmsvc3JjL2ljdWJpc21tb2RlbHNldHRpbmcnO1xuaW1wb3J0IHsgTGl2ZTJEQ3ViaXNtRnJhbWV3b3JrIGFzIGN1YmlzbW1vZGVsc2V0dGluZ2pzb24gfSBmcm9tICcuLi9GcmFtZXdvcmsvc3JjL2N1YmlzbW1vZGVsc2V0dGluZ2pzb24nO1xuaW1wb3J0IHsgTGl2ZTJEQ3ViaXNtRnJhbWV3b3JrIGFzIGN1YmlzbWRlZmF1bHRwYXJhbWV0ZXJpZCB9IGZyb20gJy4uL0ZyYW1ld29yay9zcmMvY3ViaXNtZGVmYXVsdHBhcmFtZXRlcmlkJztcbmltcG9ydCB7IExpdmUyREN1YmlzbUZyYW1ld29yayBhcyBhY3ViaXNtbW90aW9uIH0gZnJvbSAnLi4vRnJhbWV3b3JrL3NyYy9tb3Rpb24vYWN1YmlzbW1vdGlvbic7XG5pbXBvcnQgeyBMaXZlMkRDdWJpc21GcmFtZXdvcmsgYXMgY3ViaXNtZXllYmxpbmsgfSBmcm9tICcuLi9GcmFtZXdvcmsvc3JjL2VmZmVjdC9jdWJpc21leWVibGluayc7XG5pbXBvcnQgeyBMaXZlMkRDdWJpc21GcmFtZXdvcmsgYXMgY3ViaXNtYnJlYXRoIH0gZnJvbSAnLi4vRnJhbWV3b3JrL3NyYy9lZmZlY3QvY3ViaXNtYnJlYXRoJztcbmltcG9ydCB7IExpdmUyREN1YmlzbUZyYW1ld29yayBhcyBjc212ZWN0b3IgfSBmcm9tICcuLi9GcmFtZXdvcmsvc3JjL3R5cGUvY3NtdmVjdG9yJztcbmltcG9ydCB7IExpdmUyREN1YmlzbUZyYW1ld29yayBhcyBjc21tYXAgfSBmcm9tICcuLi9GcmFtZXdvcmsvc3JjL3R5cGUvY3NtbWFwJztcbmltcG9ydCB7IExpdmUyREN1YmlzbUZyYW1ld29yayBhcyBjdWJpc21tYXRyaXg0NCB9IGZyb20gJy4uL0ZyYW1ld29yay9zcmMvbWF0aC9jdWJpc21tYXRyaXg0NCc7XG5pbXBvcnQgeyBMaXZlMkRDdWJpc21GcmFtZXdvcmsgYXMgY3ViaXNtbW90aW9uIH0gZnJvbSAnLi4vRnJhbWV3b3JrL3NyYy9tb3Rpb24vY3ViaXNtbW90aW9uJztcbmltcG9ydCB7IExpdmUyREN1YmlzbUZyYW1ld29yayBhcyBjdWJpc21tb3Rpb25xdWV1ZW1hbmFnZXIgfSBmcm9tICcuLi9GcmFtZXdvcmsvc3JjL21vdGlvbi9jdWJpc21tb3Rpb25xdWV1ZW1hbmFnZXInO1xuaW1wb3J0IHsgTGl2ZTJEQ3ViaXNtRnJhbWV3b3JrIGFzIGNzbXN0cmluZyB9IGZyb20gJy4uL0ZyYW1ld29yay9zcmMvdHlwZS9jc21zdHJpbmcnO1xuaW1wb3J0IHsgTGl2ZTJEQ3ViaXNtRnJhbWV3b3JrIGFzIGNzbXJlY3QgfSBmcm9tICcuLi9GcmFtZXdvcmsvc3JjL3R5cGUvY3NtcmVjdGYnO1xuaW1wb3J0IHsgQ3ViaXNtTG9nSW5mbyB9IGZyb20gJy4uL0ZyYW1ld29yay9zcmMvdXRpbHMvY3ViaXNtZGVidWcnO1xuaW1wb3J0IGNzbVJlY3QgPSBjc21yZWN0LmNzbVJlY3Q7XG5pbXBvcnQgY3NtU3RyaW5nID0gY3Ntc3RyaW5nLmNzbVN0cmluZztcbmltcG9ydCBJbnZhbGlkTW90aW9uUXVldWVFbnRyeUhhbmRsZVZhbHVlID0gY3ViaXNtbW90aW9ucXVldWVtYW5hZ2VyLkludmFsaWRNb3Rpb25RdWV1ZUVudHJ5SGFuZGxlVmFsdWU7XG5pbXBvcnQgQ3ViaXNtTW90aW9uUXVldWVFbnRyeUhhbmRsZSA9IGN1YmlzbW1vdGlvbnF1ZXVlbWFuYWdlci5DdWJpc21Nb3Rpb25RdWV1ZUVudHJ5SGFuZGxlO1xuaW1wb3J0IEN1YmlzbU1vdGlvbiA9IGN1YmlzbW1vdGlvbi5DdWJpc21Nb3Rpb247XG5pbXBvcnQgQ3ViaXNtTWF0cml4NDQgPSBjdWJpc21tYXRyaXg0NC5DdWJpc21NYXRyaXg0NDtcbmltcG9ydCBjc21NYXAgPSBjc21tYXAuY3NtTWFwO1xuaW1wb3J0IGNzbVZlY3RvciA9IGNzbXZlY3Rvci5jc21WZWN0b3I7XG5pbXBvcnQgQ3ViaXNtQnJlYXRoID0gY3ViaXNtYnJlYXRoLkN1YmlzbUJyZWF0aDtcbmltcG9ydCBCcmVhdGhQYXJhbWV0ZXJEYXRhID0gY3ViaXNtYnJlYXRoLkJyZWF0aFBhcmFtZXRlckRhdGE7XG5pbXBvcnQgQ3ViaXNtRXllQmxpbmsgPSBjdWJpc21leWVibGluay5DdWJpc21FeWVCbGluaztcbmltcG9ydCBBQ3ViaXNtTW90aW9uID0gYWN1YmlzbW1vdGlvbi5BQ3ViaXNtTW90aW9uO1xuaW1wb3J0IEZpbmlzaGVkTW90aW9uQ2FsbGJhY2sgPSBhY3ViaXNtbW90aW9uLkZpbmlzaGVkTW90aW9uQ2FsbGJhY2s7XG5pbXBvcnQgQ3ViaXNtRnJhbWV3b3JrID0gbGl2ZTJkY3ViaXNtZnJhbWV3b3JrLkN1YmlzbUZyYW1ld29yaztcbmltcG9ydCBDdWJpc21JZEhhbmRsZSA9IGN1YmlzbWlkLkN1YmlzbUlkSGFuZGxlO1xuaW1wb3J0IEN1YmlzbVVzZXJNb2RlbCA9IGN1YmlzbXVzZXJtb2RlbC5DdWJpc21Vc2VyTW9kZWw7XG5pbXBvcnQgSUN1YmlzbU1vZGVsU2V0dGluZyA9IGljdWJpc21tb2RlbHNldHRpbmcuSUN1YmlzbU1vZGVsU2V0dGluZztcbmltcG9ydCBDdWJpc21Nb2RlbFNldHRpbmdKc29uID0gY3ViaXNtbW9kZWxzZXR0aW5nanNvbi5DdWJpc21Nb2RlbFNldHRpbmdKc29uO1xuaW1wb3J0IEN1YmlzbURlZmF1bHRQYXJhbWV0ZXJJZCA9IGN1YmlzbWRlZmF1bHRwYXJhbWV0ZXJpZDtcblxuaW1wb3J0IHsgTEFwcFBhbCB9IGZyb20gJy4vbGFwcHBhbCc7XG5pbXBvcnQgeyBnbCwgY2FudmFzLCBmcmFtZUJ1ZmZlciwgTEFwcERlbGVnYXRlIH0gZnJvbSAnLi9sYXBwZGVsZWdhdGUnO1xuaW1wb3J0IHsgVGV4dHVyZUluZm8gfSBmcm9tICcuL2xhcHB0ZXh0dXJlbWFuYWdlcic7XG5pbXBvcnQgKiBhcyBMQXBwRGVmaW5lIGZyb20gJy4vbGFwcGRlZmluZSc7XG5pbXBvcnQgJ3doYXR3Zy1mZXRjaCc7XG5cbmVudW0gTG9hZFN0ZXAge1xuICBMb2FkQXNzZXRzLFxuICBMb2FkTW9kZWwsXG4gIFdhaXRMb2FkTW9kZWwsXG4gIExvYWRFeHByZXNzaW9uLFxuICBXYWl0TG9hZEV4cHJlc3Npb24sXG4gIExvYWRQaHlzaWNzLFxuICBXYWl0TG9hZFBoeXNpY3MsXG4gIExvYWRQb3NlLFxuICBXYWl0TG9hZFBvc2UsXG4gIFNldHVwRXllQmxpbmssXG4gIFNldHVwQnJlYXRoLFxuICBMb2FkVXNlckRhdGEsXG4gIFdhaXRMb2FkVXNlckRhdGEsXG4gIFNldHVwRXllQmxpbmtJZHMsXG4gIFNldHVwTGlwU3luY0lkcyxcbiAgU2V0dXBMYXlvdXQsXG4gIExvYWRNb3Rpb24sXG4gIFdhaXRMb2FkTW90aW9uLFxuICBDb21wbGV0ZUluaXRpYWxpemUsXG4gIENvbXBsZXRlU2V0dXBNb2RlbCxcbiAgTG9hZFRleHR1cmUsXG4gIFdhaXRMb2FkVGV4dHVyZSxcbiAgQ29tcGxldGVTZXR1cFxufVxuXG4vKipcbiAqIOODpuODvOOCtuODvOOBjOWun+mam+OBq+S9v+eUqOOBmeOCi+ODouODh+ODq+OBruWun+ijheOCr+ODqeOCuTxicj5cbiAqIOODouODh+ODq+eUn+aIkOOAgeapn+iDveOCs+ODs+ODneODvOODjeODs+ODiOeUn+aIkOOAgeabtOaWsOWHpueQhuOBqOODrOODs+ODgOODquODs+OCsOOBruWRvOOBs+WHuuOBl+OCkuihjOOBhuOAglxuICovXG5leHBvcnQgY2xhc3MgTEFwcE1vZGVsIGV4dGVuZHMgQ3ViaXNtVXNlck1vZGVsIHtcbiAgLyoqXG4gICAqIG1vZGVsMy5qc29u44GM572u44GL44KM44Gf44OH44Kj44Os44Kv44OI44Oq44Go44OV44Kh44Kk44Or44OR44K544GL44KJ44Oi44OH44Or44KS55Sf5oiQ44GZ44KLXG4gICAqIEBwYXJhbSBkaXJcbiAgICogQHBhcmFtIGZpbGVOYW1lXG4gICAqL1xuICBwdWJsaWMgbG9hZEFzc2V0cyhkaXI6IHN0cmluZywgZmlsZU5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnNvbGUubG9nKCdkaXInLGRpcilcbiAgICB0aGlzLl9tb2RlbEhvbWVEaXIgPSBkaXI7XG4gICAgZmV0Y2goYCR7dGhpcy5fbW9kZWxIb21lRGlyfS8ke2ZpbGVOYW1lfWApXG4gICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5hcnJheUJ1ZmZlcigpKVxuICAgICAgLnRoZW4oYXJyYXlCdWZmZXIgPT4ge1xuICAgICAgICBjb25zdCBzZXR0aW5nOiBJQ3ViaXNtTW9kZWxTZXR0aW5nID0gbmV3IEN1YmlzbU1vZGVsU2V0dGluZ0pzb24oXG4gICAgICAgICAgYXJyYXlCdWZmZXIsXG4gICAgICAgICAgYXJyYXlCdWZmZXIuYnl0ZUxlbmd0aFxuICAgICAgICApO1xuXG4gICAgICAgIC8vIOOCueODhuODvOODiOOCkuabtOaWsFxuICAgICAgICB0aGlzLl9zdGF0ZSA9IExvYWRTdGVwLkxvYWRNb2RlbDtcblxuICAgICAgICAvLyDntZDmnpzjgpLkv53lrZhcbiAgICAgICAgdGhpcy5zZXR1cE1vZGVsKHNldHRpbmcpO1xuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogbW9kZWwzLmpzb27jgYvjgonjg6Ljg4fjg6vjgpLnlJ/miJDjgZnjgovjgIJcbiAgICogbW9kZWwzLmpzb27jga7oqJjov7DjgavlvpPjgaPjgabjg6Ljg4fjg6vnlJ/miJDjgIHjg6Ljg7zjgrfjg6fjg7PjgIHniannkIbmvJTnrpfjgarjganjga7jgrPjg7Pjg53jg7zjg43jg7Pjg4jnlJ/miJDjgpLooYzjgYbjgIJcbiAgICpcbiAgICogQHBhcmFtIHNldHRpbmcgSUN1YmlzbU1vZGVsU2V0dGluZ+OBruOCpOODs+OCueOCv+ODs+OCuVxuICAgKi9cbiAgcHJpdmF0ZSBzZXR1cE1vZGVsKHNldHRpbmc6IElDdWJpc21Nb2RlbFNldHRpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl91cGRhdGluZyA9IHRydWU7XG4gICAgdGhpcy5faW5pdGlhbGl6ZWQgPSBmYWxzZTtcblxuICAgIHRoaXMuX21vZGVsU2V0dGluZyA9IHNldHRpbmc7XG5cbiAgICAvLyBDdWJpc21Nb2RlbFxuICAgIGlmICh0aGlzLl9tb2RlbFNldHRpbmcuZ2V0TW9kZWxGaWxlTmFtZSgpICE9ICcnKSB7XG4gICAgICBjb25zdCBtb2RlbEZpbGVOYW1lID0gdGhpcy5fbW9kZWxTZXR0aW5nLmdldE1vZGVsRmlsZU5hbWUoKTtcblxuICAgICAgZmV0Y2goYCR7dGhpcy5fbW9kZWxIb21lRGlyfS8ke21vZGVsRmlsZU5hbWV9YClcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuYXJyYXlCdWZmZXIoKSlcbiAgICAgICAgLnRoZW4oYXJyYXlCdWZmZXIgPT4ge1xuICAgICAgICAgIHRoaXMubG9hZE1vZGVsKGFycmF5QnVmZmVyKTtcbiAgICAgICAgICB0aGlzLl9zdGF0ZSA9IExvYWRTdGVwLkxvYWRFeHByZXNzaW9uO1xuXG4gICAgICAgICAgLy8gY2FsbGJhY2tcbiAgICAgICAgICBsb2FkQ3ViaXNtRXhwcmVzc2lvbigpO1xuICAgICAgICB9KTtcblxuICAgICAgdGhpcy5fc3RhdGUgPSBMb2FkU3RlcC5XYWl0TG9hZE1vZGVsO1xuICAgIH0gZWxzZSB7XG4gICAgICBMQXBwUGFsLnByaW50TWVzc2FnZSgnTW9kZWwgZGF0YSBkb2VzIG5vdCBleGlzdC4nKTtcbiAgICB9XG5cbiAgICAvLyBFeHByZXNzaW9uXG4gICAgY29uc3QgbG9hZEN1YmlzbUV4cHJlc3Npb24gPSAoKTogdm9pZCA9PiB7XG4gICAgICBpZiAodGhpcy5fbW9kZWxTZXR0aW5nLmdldEV4cHJlc3Npb25Db3VudCgpID4gMCkge1xuICAgICAgICBjb25zdCBjb3VudDogbnVtYmVyID0gdGhpcy5fbW9kZWxTZXR0aW5nLmdldEV4cHJlc3Npb25Db3VudCgpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgICAgIGNvbnN0IGV4cHJlc3Npb25OYW1lID0gdGhpcy5fbW9kZWxTZXR0aW5nLmdldEV4cHJlc3Npb25OYW1lKGkpO1xuICAgICAgICAgIGNvbnN0IGV4cHJlc3Npb25GaWxlTmFtZSA9IHRoaXMuX21vZGVsU2V0dGluZy5nZXRFeHByZXNzaW9uRmlsZU5hbWUoXG4gICAgICAgICAgICBpXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGZldGNoKGAke3RoaXMuX21vZGVsSG9tZURpcn0vJHtleHByZXNzaW9uRmlsZU5hbWV9YClcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmFycmF5QnVmZmVyKCkpXG4gICAgICAgICAgICAudGhlbihhcnJheUJ1ZmZlciA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IG1vdGlvbjogQUN1YmlzbU1vdGlvbiA9IHRoaXMubG9hZEV4cHJlc3Npb24oXG4gICAgICAgICAgICAgICAgYXJyYXlCdWZmZXIsXG4gICAgICAgICAgICAgICAgYXJyYXlCdWZmZXIuYnl0ZUxlbmd0aCxcbiAgICAgICAgICAgICAgICBleHByZXNzaW9uTmFtZVxuICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgIGlmICh0aGlzLl9leHByZXNzaW9ucy5nZXRWYWx1ZShleHByZXNzaW9uTmFtZSkgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIEFDdWJpc21Nb3Rpb24uZGVsZXRlKFxuICAgICAgICAgICAgICAgICAgdGhpcy5fZXhwcmVzc2lvbnMuZ2V0VmFsdWUoZXhwcmVzc2lvbk5hbWUpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9leHByZXNzaW9ucy5zZXRWYWx1ZShleHByZXNzaW9uTmFtZSwgbnVsbCk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICB0aGlzLl9leHByZXNzaW9ucy5zZXRWYWx1ZShleHByZXNzaW9uTmFtZSwgbW90aW9uKTtcblxuICAgICAgICAgICAgICB0aGlzLl9leHByZXNzaW9uQ291bnQrKztcblxuICAgICAgICAgICAgICBpZiAodGhpcy5fZXhwcmVzc2lvbkNvdW50ID49IGNvdW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3RhdGUgPSBMb2FkU3RlcC5Mb2FkUGh5c2ljcztcblxuICAgICAgICAgICAgICAgIC8vIGNhbGxiYWNrXG4gICAgICAgICAgICAgICAgbG9hZEN1YmlzbVBoeXNpY3MoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc3RhdGUgPSBMb2FkU3RlcC5XYWl0TG9hZEV4cHJlc3Npb247XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9zdGF0ZSA9IExvYWRTdGVwLkxvYWRQaHlzaWNzO1xuXG4gICAgICAgIC8vIGNhbGxiYWNrXG4gICAgICAgIGxvYWRDdWJpc21QaHlzaWNzKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIFBoeXNpY3NcbiAgICBjb25zdCBsb2FkQ3ViaXNtUGh5c2ljcyA9ICgpOiB2b2lkID0+IHtcbiAgICAgIGlmICh0aGlzLl9tb2RlbFNldHRpbmcuZ2V0UGh5c2ljc0ZpbGVOYW1lKCkgIT0gJycpIHtcbiAgICAgICAgY29uc3QgcGh5c2ljc0ZpbGVOYW1lID0gdGhpcy5fbW9kZWxTZXR0aW5nLmdldFBoeXNpY3NGaWxlTmFtZSgpO1xuXG4gICAgICAgIGZldGNoKGAke3RoaXMuX21vZGVsSG9tZURpcn0vJHtwaHlzaWNzRmlsZU5hbWV9YClcbiAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5hcnJheUJ1ZmZlcigpKVxuICAgICAgICAgIC50aGVuKGFycmF5QnVmZmVyID0+IHtcbiAgICAgICAgICAgIHRoaXMubG9hZFBoeXNpY3MoYXJyYXlCdWZmZXIsIGFycmF5QnVmZmVyLmJ5dGVMZW5ndGgpO1xuXG4gICAgICAgICAgICB0aGlzLl9zdGF0ZSA9IExvYWRTdGVwLkxvYWRQb3NlO1xuXG4gICAgICAgICAgICAvLyBjYWxsYmFja1xuICAgICAgICAgICAgbG9hZEN1YmlzbVBvc2UoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fc3RhdGUgPSBMb2FkU3RlcC5XYWl0TG9hZFBoeXNpY3M7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9zdGF0ZSA9IExvYWRTdGVwLkxvYWRQb3NlO1xuXG4gICAgICAgIC8vIGNhbGxiYWNrXG4gICAgICAgIGxvYWRDdWJpc21Qb3NlKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIFBvc2VcbiAgICBjb25zdCBsb2FkQ3ViaXNtUG9zZSA9ICgpOiB2b2lkID0+IHtcbiAgICAgIGlmICh0aGlzLl9tb2RlbFNldHRpbmcuZ2V0UG9zZUZpbGVOYW1lKCkgIT0gJycpIHtcbiAgICAgICAgY29uc3QgcG9zZUZpbGVOYW1lID0gdGhpcy5fbW9kZWxTZXR0aW5nLmdldFBvc2VGaWxlTmFtZSgpO1xuXG4gICAgICAgIGZldGNoKGAke3RoaXMuX21vZGVsSG9tZURpcn0vJHtwb3NlRmlsZU5hbWV9YClcbiAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5hcnJheUJ1ZmZlcigpKVxuICAgICAgICAgIC50aGVuKGFycmF5QnVmZmVyID0+IHtcbiAgICAgICAgICAgIHRoaXMubG9hZFBvc2UoYXJyYXlCdWZmZXIsIGFycmF5QnVmZmVyLmJ5dGVMZW5ndGgpO1xuXG4gICAgICAgICAgICB0aGlzLl9zdGF0ZSA9IExvYWRTdGVwLlNldHVwRXllQmxpbms7XG5cbiAgICAgICAgICAgIC8vIGNhbGxiYWNrXG4gICAgICAgICAgICBzZXR1cEV5ZUJsaW5rKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX3N0YXRlID0gTG9hZFN0ZXAuV2FpdExvYWRQb3NlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fc3RhdGUgPSBMb2FkU3RlcC5TZXR1cEV5ZUJsaW5rO1xuXG4gICAgICAgIC8vIGNhbGxiYWNrXG4gICAgICAgIHNldHVwRXllQmxpbmsoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gRXllQmxpbmtcbiAgICBjb25zdCBzZXR1cEV5ZUJsaW5rID0gKCk6IHZvaWQgPT4ge1xuICAgICAgaWYgKHRoaXMuX21vZGVsU2V0dGluZy5nZXRFeWVCbGlua1BhcmFtZXRlckNvdW50KCkgPiAwKSB7XG4gICAgICAgIHRoaXMuX2V5ZUJsaW5rID0gQ3ViaXNtRXllQmxpbmsuY3JlYXRlKHRoaXMuX21vZGVsU2V0dGluZyk7XG4gICAgICAgIHRoaXMuX3N0YXRlID0gTG9hZFN0ZXAuU2V0dXBCcmVhdGg7XG4gICAgICB9XG5cbiAgICAgIC8vIGNhbGxiYWNrXG4gICAgICBzZXR1cEJyZWF0aCgpO1xuICAgIH07XG5cbiAgICAvLyBCcmVhdGhcbiAgICBjb25zdCBzZXR1cEJyZWF0aCA9ICgpOiB2b2lkID0+IHtcbiAgICAgIHRoaXMuX2JyZWF0aCA9IEN1YmlzbUJyZWF0aC5jcmVhdGUoKTtcblxuICAgICAgY29uc3QgYnJlYXRoUGFyYW1ldGVyczogY3NtVmVjdG9yPEJyZWF0aFBhcmFtZXRlckRhdGE+ID0gbmV3IGNzbVZlY3RvcigpO1xuICAgICAgYnJlYXRoUGFyYW1ldGVycy5wdXNoQmFjayhcbiAgICAgICAgbmV3IEJyZWF0aFBhcmFtZXRlckRhdGEodGhpcy5faWRQYXJhbUFuZ2xlWCwgMC4wLCAxNS4wLCA2LjUzNDUsIDAuNSlcbiAgICAgICk7XG4gICAgICBicmVhdGhQYXJhbWV0ZXJzLnB1c2hCYWNrKFxuICAgICAgICBuZXcgQnJlYXRoUGFyYW1ldGVyRGF0YSh0aGlzLl9pZFBhcmFtQW5nbGVZLCAwLjAsIDguMCwgMy41MzQ1LCAwLjUpXG4gICAgICApO1xuICAgICAgYnJlYXRoUGFyYW1ldGVycy5wdXNoQmFjayhcbiAgICAgICAgbmV3IEJyZWF0aFBhcmFtZXRlckRhdGEodGhpcy5faWRQYXJhbUFuZ2xlWiwgMC4wLCAxMC4wLCA1LjUzNDUsIDAuNSlcbiAgICAgICk7XG4gICAgICBicmVhdGhQYXJhbWV0ZXJzLnB1c2hCYWNrKFxuICAgICAgICBuZXcgQnJlYXRoUGFyYW1ldGVyRGF0YSh0aGlzLl9pZFBhcmFtQm9keUFuZ2xlWCwgMC4wLCA0LjAsIDE1LjUzNDUsIDAuNSlcbiAgICAgICk7XG4gICAgICBicmVhdGhQYXJhbWV0ZXJzLnB1c2hCYWNrKFxuICAgICAgICBuZXcgQnJlYXRoUGFyYW1ldGVyRGF0YShcbiAgICAgICAgICBDdWJpc21GcmFtZXdvcmsuZ2V0SWRNYW5hZ2VyKCkuZ2V0SWQoXG4gICAgICAgICAgICBDdWJpc21EZWZhdWx0UGFyYW1ldGVySWQuUGFyYW1CcmVhdGhcbiAgICAgICAgICApLFxuICAgICAgICAgIDAuMCxcbiAgICAgICAgICAwLjUsXG4gICAgICAgICAgMy4yMzQ1LFxuICAgICAgICAgIDAuNVxuICAgICAgICApXG4gICAgICApO1xuXG4gICAgICB0aGlzLl9icmVhdGguc2V0UGFyYW1ldGVycyhicmVhdGhQYXJhbWV0ZXJzKTtcbiAgICAgIHRoaXMuX3N0YXRlID0gTG9hZFN0ZXAuTG9hZFVzZXJEYXRhO1xuXG4gICAgICAvLyBjYWxsYmFja1xuICAgICAgbG9hZFVzZXJEYXRhKCk7XG4gICAgfTtcblxuICAgIC8vIFVzZXJEYXRhXG4gICAgY29uc3QgbG9hZFVzZXJEYXRhID0gKCk6IHZvaWQgPT4ge1xuICAgICAgaWYgKHRoaXMuX21vZGVsU2V0dGluZy5nZXRVc2VyRGF0YUZpbGUoKSAhPSAnJykge1xuICAgICAgICBjb25zdCB1c2VyRGF0YUZpbGUgPSB0aGlzLl9tb2RlbFNldHRpbmcuZ2V0VXNlckRhdGFGaWxlKCk7XG5cbiAgICAgICAgZmV0Y2goYCR7dGhpcy5fbW9kZWxIb21lRGlyfS8ke3VzZXJEYXRhRmlsZX1gKVxuICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmFycmF5QnVmZmVyKCkpXG4gICAgICAgICAgLnRoZW4oYXJyYXlCdWZmZXIgPT4ge1xuICAgICAgICAgICAgdGhpcy5sb2FkVXNlckRhdGEoYXJyYXlCdWZmZXIsIGFycmF5QnVmZmVyLmJ5dGVMZW5ndGgpO1xuXG4gICAgICAgICAgICB0aGlzLl9zdGF0ZSA9IExvYWRTdGVwLlNldHVwRXllQmxpbmtJZHM7XG5cbiAgICAgICAgICAgIC8vIGNhbGxiYWNrXG4gICAgICAgICAgICBzZXR1cEV5ZUJsaW5rSWRzKCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5fc3RhdGUgPSBMb2FkU3RlcC5XYWl0TG9hZFVzZXJEYXRhO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fc3RhdGUgPSBMb2FkU3RlcC5TZXR1cEV5ZUJsaW5rSWRzO1xuXG4gICAgICAgIC8vIGNhbGxiYWNrXG4gICAgICAgIHNldHVwRXllQmxpbmtJZHMoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gRXllQmxpbmtJZHNcbiAgICBjb25zdCBzZXR1cEV5ZUJsaW5rSWRzID0gKCk6IHZvaWQgPT4ge1xuICAgICAgY29uc3QgZXllQmxpbmtJZENvdW50OiBudW1iZXIgPSB0aGlzLl9tb2RlbFNldHRpbmcuZ2V0RXllQmxpbmtQYXJhbWV0ZXJDb3VudCgpO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGV5ZUJsaW5rSWRDb3VudDsgKytpKSB7XG4gICAgICAgIHRoaXMuX2V5ZUJsaW5rSWRzLnB1c2hCYWNrKFxuICAgICAgICAgIHRoaXMuX21vZGVsU2V0dGluZy5nZXRFeWVCbGlua1BhcmFtZXRlcklkKGkpXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3N0YXRlID0gTG9hZFN0ZXAuU2V0dXBMaXBTeW5jSWRzO1xuXG4gICAgICAvLyBjYWxsYmFja1xuICAgICAgc2V0dXBMaXBTeW5jSWRzKCk7XG4gICAgfTtcblxuICAgIC8vIExpcFN5bmNJZHNcbiAgICBjb25zdCBzZXR1cExpcFN5bmNJZHMgPSAoKTogdm9pZCA9PiB7XG4gICAgICBjb25zdCBsaXBTeW5jSWRDb3VudCA9IHRoaXMuX21vZGVsU2V0dGluZy5nZXRMaXBTeW5jUGFyYW1ldGVyQ291bnQoKTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXBTeW5jSWRDb3VudDsgKytpKSB7XG4gICAgICAgIHRoaXMuX2xpcFN5bmNJZHMucHVzaEJhY2sodGhpcy5fbW9kZWxTZXR0aW5nLmdldExpcFN5bmNQYXJhbWV0ZXJJZChpKSk7XG4gICAgICB9XG4gICAgICB0aGlzLl9zdGF0ZSA9IExvYWRTdGVwLlNldHVwTGF5b3V0O1xuXG4gICAgICAvLyBjYWxsYmFja1xuICAgICAgc2V0dXBMYXlvdXQoKTtcbiAgICB9O1xuXG4gICAgLy8gTGF5b3V0XG4gICAgY29uc3Qgc2V0dXBMYXlvdXQgPSAoKTogdm9pZCA9PiB7XG4gICAgICBjb25zdCBsYXlvdXQ6IGNzbU1hcDxzdHJpbmcsIG51bWJlcj4gPSBuZXcgY3NtTWFwPHN0cmluZywgbnVtYmVyPigpO1xuICAgICAgdGhpcy5fbW9kZWxTZXR0aW5nLmdldExheW91dE1hcChsYXlvdXQpO1xuICAgICAgdGhpcy5fbW9kZWxNYXRyaXguc2V0dXBGcm9tTGF5b3V0KGxheW91dCk7XG4gICAgICB0aGlzLl9zdGF0ZSA9IExvYWRTdGVwLkxvYWRNb3Rpb247XG5cbiAgICAgIC8vIGNhbGxiYWNrXG4gICAgICBsb2FkQ3ViaXNtTW90aW9uKCk7XG4gICAgfTtcblxuICAgIC8vIE1vdGlvblxuICAgIGNvbnN0IGxvYWRDdWJpc21Nb3Rpb24gPSAoKTogdm9pZCA9PiB7XG4gICAgICB0aGlzLl9zdGF0ZSA9IExvYWRTdGVwLldhaXRMb2FkTW90aW9uO1xuICAgICAgdGhpcy5fbW9kZWwuc2F2ZVBhcmFtZXRlcnMoKTtcbiAgICAgIHRoaXMuX2FsbE1vdGlvbkNvdW50ID0gMDtcbiAgICAgIHRoaXMuX21vdGlvbkNvdW50ID0gMDtcbiAgICAgIGNvbnN0IGdyb3VwOiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgICBjb25zdCBtb3Rpb25Hcm91cENvdW50OiBudW1iZXIgPSB0aGlzLl9tb2RlbFNldHRpbmcuZ2V0TW90aW9uR3JvdXBDb3VudCgpO1xuXG4gICAgICAvLyDjg6Ljg7zjgrfjg6fjg7Pjga7nt4/mlbDjgpLmsYLjgoHjgotcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbW90aW9uR3JvdXBDb3VudDsgaSsrKSB7XG4gICAgICAgIGdyb3VwW2ldID0gdGhpcy5fbW9kZWxTZXR0aW5nLmdldE1vdGlvbkdyb3VwTmFtZShpKTtcbiAgICAgICAgdGhpcy5fYWxsTW90aW9uQ291bnQgKz0gdGhpcy5fbW9kZWxTZXR0aW5nLmdldE1vdGlvbkNvdW50KGdyb3VwW2ldKTtcbiAgICAgIH1cblxuICAgICAgLy8g44Oi44O844K344On44Oz44Gu6Kqt44G/6L6844G/XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1vdGlvbkdyb3VwQ291bnQ7IGkrKykge1xuICAgICAgICB0aGlzLnByZUxvYWRNb3Rpb25Hcm91cChncm91cFtpXSk7XG4gICAgICB9XG5cbiAgICAgIC8vIOODouODvOOCt+ODp+ODs+OBjOOBquOBhOWgtOWQiFxuICAgICAgaWYgKG1vdGlvbkdyb3VwQ291bnQgPT0gMCkge1xuICAgICAgICB0aGlzLl9zdGF0ZSA9IExvYWRTdGVwLkxvYWRUZXh0dXJlO1xuXG4gICAgICAgIC8vIOWFqOOBpuOBruODouODvOOCt+ODp+ODs+OCkuWBnOatouOBmeOCi1xuICAgICAgICB0aGlzLl9tb3Rpb25NYW5hZ2VyLnN0b3BBbGxNb3Rpb25zKCk7XG5cbiAgICAgICAgdGhpcy5fdXBkYXRpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5faW5pdGlhbGl6ZWQgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuY3JlYXRlUmVuZGVyZXIoKTtcbiAgICAgICAgdGhpcy5zZXR1cFRleHR1cmVzKCk7XG4gICAgICAgIHRoaXMuZ2V0UmVuZGVyZXIoKS5zdGFydFVwKGdsKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIOODhuOCr+OCueODgeODo+ODpuODi+ODg+ODiOOBq+ODhuOCr+OCueODgeODo+OCkuODreODvOODieOBmeOCi1xuICAgKi9cbiAgcHJpdmF0ZSBzZXR1cFRleHR1cmVzKCk6IHZvaWQge1xuICAgIC8vIGlQaG9uZeOBp+OBruOCouODq+ODleOCoeWTgeizquWQkeS4iuOBruOBn+OCgVR5cGVzY3JpcHTjgafjga9wcmVtdWx0aXBsaWVkQWxwaGHjgpLmjqHnlKhcbiAgICBjb25zdCB1c2VQcmVtdWx0aXBseSA9IHRydWU7XG5cbiAgICBpZiAodGhpcy5fc3RhdGUgPT0gTG9hZFN0ZXAuTG9hZFRleHR1cmUpIHtcbiAgICAgIC8vIOODhuOCr+OCueODgeODo+iqreOBv+i+vOOBv+eUqFxuICAgICAgY29uc3QgdGV4dHVyZUNvdW50OiBudW1iZXIgPSB0aGlzLl9tb2RlbFNldHRpbmcuZ2V0VGV4dHVyZUNvdW50KCk7XG5cbiAgICAgIGZvciAoXG4gICAgICAgIGxldCBtb2RlbFRleHR1cmVOdW1iZXIgPSAwO1xuICAgICAgICBtb2RlbFRleHR1cmVOdW1iZXIgPCB0ZXh0dXJlQ291bnQ7XG4gICAgICAgIG1vZGVsVGV4dHVyZU51bWJlcisrXG4gICAgICApIHtcbiAgICAgICAgLy8g44OG44Kv44K544OB44Oj5ZCN44GM56m65paH5a2X44Gg44Gj44Gf5aC05ZCI44Gv44Ot44O844OJ44O744OQ44Kk44Oz44OJ5Yem55CG44KS44K544Kt44OD44OXXG4gICAgICAgIGlmICh0aGlzLl9tb2RlbFNldHRpbmcuZ2V0VGV4dHVyZUZpbGVOYW1lKG1vZGVsVGV4dHVyZU51bWJlcikgPT0gJycpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnZ2V0VGV4dHVyZUZpbGVOYW1lIG51bGwnKTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFdlYkdM44Gu44OG44Kv44K544OB44Oj44Om44OL44OD44OI44Gr44OG44Kv44K544OB44Oj44KS44Ot44O844OJ44GZ44KLXG4gICAgICAgIGxldCB0ZXh0dXJlUGF0aCA9IHRoaXMuX21vZGVsU2V0dGluZy5nZXRUZXh0dXJlRmlsZU5hbWUoXG4gICAgICAgICAgbW9kZWxUZXh0dXJlTnVtYmVyXG4gICAgICAgICk7XG4gICAgICAgIHRleHR1cmVQYXRoID0gdGhpcy5fbW9kZWxIb21lRGlyICsgdGV4dHVyZVBhdGg7XG5cbiAgICAgICAgLy8g44Ot44O844OJ5a6M5LqG5pmC44Gr5ZG844Gz5Ye644GZ44Kz44O844Or44OQ44OD44Kv6Zai5pWwXG4gICAgICAgIGNvbnN0IG9uTG9hZCA9ICh0ZXh0dXJlSW5mbzogVGV4dHVyZUluZm8pOiB2b2lkID0+IHtcbiAgICAgICAgICB0aGlzLmdldFJlbmRlcmVyKCkuYmluZFRleHR1cmUobW9kZWxUZXh0dXJlTnVtYmVyLCB0ZXh0dXJlSW5mby5pZCk7XG5cbiAgICAgICAgICB0aGlzLl90ZXh0dXJlQ291bnQrKztcblxuICAgICAgICAgIGlmICh0aGlzLl90ZXh0dXJlQ291bnQgPj0gdGV4dHVyZUNvdW50KSB7XG4gICAgICAgICAgICAvLyDjg63jg7zjg4nlrozkuoZcbiAgICAgICAgICAgIHRoaXMuX3N0YXRlID0gTG9hZFN0ZXAuQ29tcGxldGVTZXR1cDtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8g6Kqt44G/6L6844G/XG4gICAgICAgIExBcHBEZWxlZ2F0ZS5nZXRJbnN0YW5jZSgpXG4gICAgICAgICAgLmdldFRleHR1cmVNYW5hZ2VyKClcbiAgICAgICAgICAuY3JlYXRlVGV4dHVyZUZyb21QbmdGaWxlKHRleHR1cmVQYXRoLCB1c2VQcmVtdWx0aXBseSwgb25Mb2FkKTtcbiAgICAgICAgdGhpcy5nZXRSZW5kZXJlcigpLnNldElzUHJlbXVsdGlwbGllZEFscGhhKHVzZVByZW11bHRpcGx5KTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fc3RhdGUgPSBMb2FkU3RlcC5XYWl0TG9hZFRleHR1cmU7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIOODrOODs+ODgOODqeOCkuWGjeani+evieOBmeOCi1xuICAgKi9cbiAgcHVibGljIHJlbG9hZFJlbmRlcmVyKCk6IHZvaWQge1xuICAgIHRoaXMuZGVsZXRlUmVuZGVyZXIoKTtcbiAgICB0aGlzLmNyZWF0ZVJlbmRlcmVyKCk7XG4gICAgdGhpcy5zZXR1cFRleHR1cmVzKCk7XG4gIH1cblxuICAvKipcbiAgICog5pu05pawXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9zdGF0ZSAhPSBMb2FkU3RlcC5Db21wbGV0ZVNldHVwKSByZXR1cm47XG5cbiAgICBjb25zdCBkZWx0YVRpbWVTZWNvbmRzOiBudW1iZXIgPSBMQXBwUGFsLmdldERlbHRhVGltZSgpO1xuICAgIHRoaXMuX3VzZXJUaW1lU2Vjb25kcyArPSBkZWx0YVRpbWVTZWNvbmRzO1xuXG4gICAgdGhpcy5fZHJhZ01hbmFnZXIudXBkYXRlKGRlbHRhVGltZVNlY29uZHMpO1xuICAgIHRoaXMuX2RyYWdYID0gdGhpcy5fZHJhZ01hbmFnZXIuZ2V0WCgpO1xuICAgIHRoaXMuX2RyYWdZID0gdGhpcy5fZHJhZ01hbmFnZXIuZ2V0WSgpO1xuXG4gICAgLy8g44Oi44O844K344On44Oz44Gr44KI44KL44OR44Op44Oh44O844K/5pu05paw44Gu5pyJ54ShXG4gICAgbGV0IG1vdGlvblVwZGF0ZWQgPSBmYWxzZTtcblxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICB0aGlzLl9tb2RlbC5sb2FkUGFyYW1ldGVycygpOyAvLyDliY3lm57jgrvjg7zjg5bjgZXjgozjgZ/nirbmhYvjgpLjg63jg7zjg4lcbiAgICBpZiAodGhpcy5fbW90aW9uTWFuYWdlci5pc0ZpbmlzaGVkKCkpIHtcbiAgICAgIC8vIOODouODvOOCt+ODp+ODs+OBruWGjeeUn+OBjOOBquOBhOWgtOWQiOOAgeW+heapn+ODouODvOOCt+ODp+ODs+OBruS4reOBi+OCieODqeODs+ODgOODoOOBp+WGjeeUn+OBmeOCi1xuICAgICAgdGhpcy5zdGFydFJhbmRvbU1vdGlvbihcbiAgICAgICAgTEFwcERlZmluZS5Nb3Rpb25Hcm91cElkbGUsXG4gICAgICAgIExBcHBEZWZpbmUuUHJpb3JpdHlJZGxlXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBtb3Rpb25VcGRhdGVkID0gdGhpcy5fbW90aW9uTWFuYWdlci51cGRhdGVNb3Rpb24oXG4gICAgICAgIHRoaXMuX21vZGVsLFxuICAgICAgICBkZWx0YVRpbWVTZWNvbmRzXG4gICAgICApOyAvLyDjg6Ljg7zjgrfjg6fjg7PjgpLmm7TmlrBcbiAgICB9XG4gICAgdGhpcy5fbW9kZWwuc2F2ZVBhcmFtZXRlcnMoKTsgLy8g54q25oWL44KS5L+d5a2YXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLy8g44G+44Gw44Gf44GNXG4gICAgaWYgKCFtb3Rpb25VcGRhdGVkKSB7XG4gICAgICBpZiAodGhpcy5fZXllQmxpbmsgIT0gbnVsbCkge1xuICAgICAgICAvLyDjg6HjgqTjg7Pjg6Ljg7zjgrfjg6fjg7Pjga7mm7TmlrDjgYzjgarjgYTjgajjgY1cbiAgICAgICAgdGhpcy5fZXllQmxpbmsudXBkYXRlUGFyYW1ldGVycyh0aGlzLl9tb2RlbCwgZGVsdGFUaW1lU2Vjb25kcyk7IC8vIOebruODkeODgVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLl9leHByZXNzaW9uTWFuYWdlciAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9leHByZXNzaW9uTWFuYWdlci51cGRhdGVNb3Rpb24odGhpcy5fbW9kZWwsIGRlbHRhVGltZVNlY29uZHMpOyAvLyDooajmg4Xjgafjg5Hjg6njg6Hjg7zjgr/mm7TmlrDvvIjnm7jlr77lpInljJbvvIlcbiAgICB9XG5cbiAgICAvLyDjg4njg6njg4PjgrDjgavjgojjgovlpInljJZcbiAgICAvLyDjg4njg6njg4PjgrDjgavjgojjgovpoZTjga7lkJHjgY3jga7oqr/mlbRcbiAgICB0aGlzLl9tb2RlbC5hZGRQYXJhbWV0ZXJWYWx1ZUJ5SWQodGhpcy5faWRQYXJhbUFuZ2xlWCwgdGhpcy5fZHJhZ1ggKiAzMCk7IC8vIC0zMOOBi+OCiTMw44Gu5YCk44KS5Yqg44GI44KLXG4gICAgdGhpcy5fbW9kZWwuYWRkUGFyYW1ldGVyVmFsdWVCeUlkKHRoaXMuX2lkUGFyYW1BbmdsZVksIHRoaXMuX2RyYWdZICogMzApO1xuICAgIHRoaXMuX21vZGVsLmFkZFBhcmFtZXRlclZhbHVlQnlJZChcbiAgICAgIHRoaXMuX2lkUGFyYW1BbmdsZVosXG4gICAgICB0aGlzLl9kcmFnWCAqIHRoaXMuX2RyYWdZICogLTMwXG4gICAgKTtcblxuICAgIC8vIOODieODqeODg+OCsOOBq+OCiOOCi+S9k+OBruWQkeOBjeOBruiqv+aVtFxuICAgIHRoaXMuX21vZGVsLmFkZFBhcmFtZXRlclZhbHVlQnlJZChcbiAgICAgIHRoaXMuX2lkUGFyYW1Cb2R5QW5nbGVYLFxuICAgICAgdGhpcy5fZHJhZ1ggKiAxMFxuICAgICk7IC8vIC0xMOOBi+OCiTEw44Gu5YCk44KS5Yqg44GI44KLXG5cbiAgICAvLyDjg4njg6njg4PjgrDjgavjgojjgovnm67jga7lkJHjgY3jga7oqr/mlbRcbiAgICB0aGlzLl9tb2RlbC5hZGRQYXJhbWV0ZXJWYWx1ZUJ5SWQodGhpcy5faWRQYXJhbUV5ZUJhbGxYLCB0aGlzLl9kcmFnWCk7IC8vIC0x44GL44KJMeOBruWApOOCkuWKoOOBiOOCi1xuICAgIHRoaXMuX21vZGVsLmFkZFBhcmFtZXRlclZhbHVlQnlJZCh0aGlzLl9pZFBhcmFtRXllQmFsbFksIHRoaXMuX2RyYWdZKTtcblxuICAgIC8vIOWRvOWQuOOBquOBqVxuICAgIGlmICh0aGlzLl9icmVhdGggIT0gbnVsbCkge1xuICAgICAgdGhpcy5fYnJlYXRoLnVwZGF0ZVBhcmFtZXRlcnModGhpcy5fbW9kZWwsIGRlbHRhVGltZVNlY29uZHMpO1xuICAgIH1cblxuICAgIC8vIOeJqeeQhua8lOeul+OBruioreWumlxuICAgIGlmICh0aGlzLl9waHlzaWNzICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX3BoeXNpY3MuZXZhbHVhdGUodGhpcy5fbW9kZWwsIGRlbHRhVGltZVNlY29uZHMpO1xuICAgIH1cblxuICAgIC8vIOODquODg+ODl+OCt+ODs+OCr+OBruioreWumlxuICAgIGlmICh0aGlzLl9saXBzeW5jKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IDA7IC8vIOODquOCouODq+OCv+OCpOODoOOBp+ODquODg+ODl+OCt+ODs+OCr+OCkuihjOOBhuWgtOWQiOOAgeOCt+OCueODhuODoOOBi+OCiemfs+mHj+OCkuWPluW+l+OBl+OBpuOAgTB+MeOBruevhOWbsuOBp+WApOOCkuWFpeWKm+OBl+OBvuOBmeOAglxuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2xpcFN5bmNJZHMuZ2V0U2l6ZSgpOyArK2kpIHtcbiAgICAgICAgdGhpcy5fbW9kZWwuYWRkUGFyYW1ldGVyVmFsdWVCeUlkKHRoaXMuX2xpcFN5bmNJZHMuYXQoaSksIHZhbHVlLCAwLjgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIOODneODvOOCuuOBruioreWumlxuICAgIGlmICh0aGlzLl9wb3NlICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX3Bvc2UudXBkYXRlUGFyYW1ldGVycyh0aGlzLl9tb2RlbCwgZGVsdGFUaW1lU2Vjb25kcyk7XG4gICAgfVxuXG4gICAgdGhpcy5fbW9kZWwudXBkYXRlKCk7XG4gIH1cblxuICAvKipcbiAgICog5byV5pWw44Gn5oyH5a6a44GX44Gf44Oi44O844K344On44Oz44Gu5YaN55Sf44KS6ZaL5aeL44GZ44KLXG4gICAqIEBwYXJhbSBncm91cCDjg6Ljg7zjgrfjg6fjg7PjgrDjg6vjg7zjg5flkI1cbiAgICogQHBhcmFtIG5vIOOCsOODq+ODvOODl+WGheOBrueVquWPt1xuICAgKiBAcGFyYW0gcHJpb3JpdHkg5YSq5YWI5bqmXG4gICAqIEBwYXJhbSBvbkZpbmlzaGVkTW90aW9uSGFuZGxlciDjg6Ljg7zjgrfjg6fjg7Plho3nlJ/ntYLkuobmmYLjgavlkbzjgbPlh7rjgZXjgozjgovjgrPjg7zjg6vjg5Djg4Pjgq/plqLmlbBcbiAgICogQHJldHVybiDplovlp4vjgZfjgZ/jg6Ljg7zjgrfjg6fjg7Pjga7orZjliKXnlarlj7fjgpLov5TjgZnjgILlgIvliKXjga7jg6Ljg7zjgrfjg6fjg7PjgYzntYLkuobjgZfjgZ/jgYvlkKbjgYvjgpLliKTlrprjgZnjgotpc0ZpbmlzaGVkKCnjga7lvJXmlbDjgafkvb/nlKjjgZnjgovjgILplovlp4vjgafjgY3jgarjgYTmmYLjga9bLTFdXG4gICAqL1xuICBwdWJsaWMgc3RhcnRNb3Rpb24oXG4gICAgZ3JvdXA6IHN0cmluZyxcbiAgICBubzogbnVtYmVyLFxuICAgIHByaW9yaXR5OiBudW1iZXIsXG4gICAgb25GaW5pc2hlZE1vdGlvbkhhbmRsZXI/OiBGaW5pc2hlZE1vdGlvbkNhbGxiYWNrXG4gICk6IEN1YmlzbU1vdGlvblF1ZXVlRW50cnlIYW5kbGUge1xuICAgIGlmIChwcmlvcml0eSA9PSBMQXBwRGVmaW5lLlByaW9yaXR5Rm9yY2UpIHtcbiAgICAgIHRoaXMuX21vdGlvbk1hbmFnZXIuc2V0UmVzZXJ2ZVByaW9yaXR5KHByaW9yaXR5KTtcbiAgICB9IGVsc2UgaWYgKCF0aGlzLl9tb3Rpb25NYW5hZ2VyLnJlc2VydmVNb3Rpb24ocHJpb3JpdHkpKSB7XG4gICAgICBpZiAodGhpcy5fZGVidWdNb2RlKSB7XG4gICAgICAgIExBcHBQYWwucHJpbnRNZXNzYWdlKFwiW0FQUF1jYW4ndCBzdGFydCBtb3Rpb24uXCIpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIEludmFsaWRNb3Rpb25RdWV1ZUVudHJ5SGFuZGxlVmFsdWU7XG4gICAgfVxuXG4gICAgY29uc3QgbW90aW9uRmlsZU5hbWUgPSB0aGlzLl9tb2RlbFNldHRpbmcuZ2V0TW90aW9uRmlsZU5hbWUoZ3JvdXAsIG5vKTtcblxuICAgIC8vIGV4KSBpZGxlXzBcbiAgICBjb25zdCBuYW1lID0gYCR7Z3JvdXB9XyR7bm99YDtcbiAgICBsZXQgbW90aW9uOiBDdWJpc21Nb3Rpb24gPSB0aGlzLl9tb3Rpb25zLmdldFZhbHVlKG5hbWUpIGFzIEN1YmlzbU1vdGlvbjtcbiAgICBsZXQgYXV0b0RlbGV0ZSA9IGZhbHNlO1xuXG4gICAgaWYgKG1vdGlvbiA9PSBudWxsKSB7XG4gICAgICBmZXRjaChgJHt0aGlzLl9tb2RlbEhvbWVEaXJ9LyR7bW90aW9uRmlsZU5hbWV9YClcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuYXJyYXlCdWZmZXIoKSlcbiAgICAgICAgLnRoZW4oYXJyYXlCdWZmZXIgPT4ge1xuICAgICAgICAgIG1vdGlvbiA9IHRoaXMubG9hZE1vdGlvbihcbiAgICAgICAgICAgIGFycmF5QnVmZmVyLFxuICAgICAgICAgICAgYXJyYXlCdWZmZXIuYnl0ZUxlbmd0aCxcbiAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICBvbkZpbmlzaGVkTW90aW9uSGFuZGxlclxuICAgICAgICAgICk7XG4gICAgICAgICAgbGV0IGZhZGVUaW1lOiBudW1iZXIgPSB0aGlzLl9tb2RlbFNldHRpbmcuZ2V0TW90aW9uRmFkZUluVGltZVZhbHVlKFxuICAgICAgICAgICAgZ3JvdXAsXG4gICAgICAgICAgICBub1xuICAgICAgICAgICk7XG5cbiAgICAgICAgICBpZiAoZmFkZVRpbWUgPj0gMC4wKSB7XG4gICAgICAgICAgICBtb3Rpb24uc2V0RmFkZUluVGltZShmYWRlVGltZSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZmFkZVRpbWUgPSB0aGlzLl9tb2RlbFNldHRpbmcuZ2V0TW90aW9uRmFkZU91dFRpbWVWYWx1ZShncm91cCwgbm8pO1xuICAgICAgICAgIGlmIChmYWRlVGltZSA+PSAwLjApIHtcbiAgICAgICAgICAgIG1vdGlvbi5zZXRGYWRlT3V0VGltZShmYWRlVGltZSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbW90aW9uLnNldEVmZmVjdElkcyh0aGlzLl9leWVCbGlua0lkcywgdGhpcy5fbGlwU3luY0lkcyk7XG4gICAgICAgICAgYXV0b0RlbGV0ZSA9IHRydWU7IC8vIOe1guS6huaZguOBq+ODoeODouODquOBi+OCieWJiumZpFxuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgbW90aW9uLnNldEZpbmlzaGVkTW90aW9uSGFuZGxlcihvbkZpbmlzaGVkTW90aW9uSGFuZGxlcik7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2RlYnVnTW9kZSkge1xuICAgICAgTEFwcFBhbC5wcmludE1lc3NhZ2UoYFtBUFBdc3RhcnQgbW90aW9uOiBbJHtncm91cH1fJHtub31gKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX21vdGlvbk1hbmFnZXIuc3RhcnRNb3Rpb25Qcmlvcml0eShcbiAgICAgIG1vdGlvbixcbiAgICAgIGF1dG9EZWxldGUsXG4gICAgICBwcmlvcml0eVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICog44Op44Oz44OA44Og44Gr6YG444Gw44KM44Gf44Oi44O844K344On44Oz44Gu5YaN55Sf44KS6ZaL5aeL44GZ44KL44CCXG4gICAqIEBwYXJhbSBncm91cCDjg6Ljg7zjgrfjg6fjg7PjgrDjg6vjg7zjg5flkI1cbiAgICogQHBhcmFtIHByaW9yaXR5IOWEquWFiOW6plxuICAgKiBAcGFyYW0gb25GaW5pc2hlZE1vdGlvbkhhbmRsZXIg44Oi44O844K344On44Oz5YaN55Sf57WC5LqG5pmC44Gr5ZG844Gz5Ye644GV44KM44KL44Kz44O844Or44OQ44OD44Kv6Zai5pWwXG4gICAqIEByZXR1cm4g6ZaL5aeL44GX44Gf44Oi44O844K344On44Oz44Gu6K2Y5Yil55Wq5Y+344KS6L+U44GZ44CC5YCL5Yil44Gu44Oi44O844K344On44Oz44GM57WC5LqG44GX44Gf44GL5ZCm44GL44KS5Yik5a6a44GZ44KLaXNGaW5pc2hlZCgp44Gu5byV5pWw44Gn5L2/55So44GZ44KL44CC6ZaL5aeL44Gn44GN44Gq44GE5pmC44GvWy0xXVxuICAgKi9cbiAgcHVibGljIHN0YXJ0UmFuZG9tTW90aW9uKFxuICAgIGdyb3VwOiBzdHJpbmcsXG4gICAgcHJpb3JpdHk6IG51bWJlcixcbiAgICBvbkZpbmlzaGVkTW90aW9uSGFuZGxlcj86IEZpbmlzaGVkTW90aW9uQ2FsbGJhY2tcbiAgKTogQ3ViaXNtTW90aW9uUXVldWVFbnRyeUhhbmRsZSB7XG4gICAgaWYgKHRoaXMuX21vZGVsU2V0dGluZy5nZXRNb3Rpb25Db3VudChncm91cCkgPT0gMCkge1xuICAgICAgcmV0dXJuIEludmFsaWRNb3Rpb25RdWV1ZUVudHJ5SGFuZGxlVmFsdWU7XG4gICAgfVxuXG4gICAgY29uc3Qgbm86IG51bWJlciA9IE1hdGguZmxvb3IoXG4gICAgICBNYXRoLnJhbmRvbSgpICogdGhpcy5fbW9kZWxTZXR0aW5nLmdldE1vdGlvbkNvdW50KGdyb3VwKVxuICAgICk7XG5cbiAgICByZXR1cm4gdGhpcy5zdGFydE1vdGlvbihncm91cCwgbm8sIHByaW9yaXR5LCBvbkZpbmlzaGVkTW90aW9uSGFuZGxlcik7XG4gIH1cblxuICAvKipcbiAgICog5byV5pWw44Gn5oyH5a6a44GX44Gf6KGo5oOF44Oi44O844K344On44Oz44KS44K744OD44OI44GZ44KLXG4gICAqXG4gICAqIEBwYXJhbSBleHByZXNzaW9uSWQg6KGo5oOF44Oi44O844K344On44Oz44GuSURcbiAgICovXG4gIHB1YmxpYyBzZXRFeHByZXNzaW9uKGV4cHJlc3Npb25JZDogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgbW90aW9uOiBBQ3ViaXNtTW90aW9uID0gdGhpcy5fZXhwcmVzc2lvbnMuZ2V0VmFsdWUoZXhwcmVzc2lvbklkKTtcblxuICAgIGlmICh0aGlzLl9kZWJ1Z01vZGUpIHtcbiAgICAgIExBcHBQYWwucHJpbnRNZXNzYWdlKGBbQVBQXWV4cHJlc3Npb246IFske2V4cHJlc3Npb25JZH1dYCk7XG4gICAgfVxuXG4gICAgaWYgKG1vdGlvbiAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9leHByZXNzaW9uTWFuYWdlci5zdGFydE1vdGlvblByaW9yaXR5KFxuICAgICAgICBtb3Rpb24sXG4gICAgICAgIGZhbHNlLFxuICAgICAgICBMQXBwRGVmaW5lLlByaW9yaXR5Rm9yY2VcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLl9kZWJ1Z01vZGUpIHtcbiAgICAgICAgTEFwcFBhbC5wcmludE1lc3NhZ2UoYFtBUFBdZXhwcmVzc2lvblske2V4cHJlc3Npb25JZH1dIGlzIG51bGxgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICog44Op44Oz44OA44Og44Gr6YG444Gw44KM44Gf6KGo5oOF44Oi44O844K344On44Oz44KS44K744OD44OI44GZ44KLXG4gICAqL1xuICBwdWJsaWMgc2V0UmFuZG9tRXhwcmVzc2lvbigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fZXhwcmVzc2lvbnMuZ2V0U2l6ZSgpID09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBubzogbnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5fZXhwcmVzc2lvbnMuZ2V0U2l6ZSgpKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fZXhwcmVzc2lvbnMuZ2V0U2l6ZSgpOyBpKyspIHtcbiAgICAgIGlmIChpID09IG5vKSB7XG4gICAgICAgIGNvbnN0IG5hbWU6IHN0cmluZyA9IHRoaXMuX2V4cHJlc3Npb25zLl9rZXlWYWx1ZXNbaV0uZmlyc3Q7XG4gICAgICAgIHRoaXMuc2V0RXhwcmVzc2lvbihuYW1lKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiDjgqTjg5njg7Pjg4jjga7nmbrngavjgpLlj5fjgZHlj5bjgotcbiAgICovXG4gIHB1YmxpYyBtb3Rpb25FdmVudEZpcmVkKGV2ZW50VmFsdWU6IGNzbVN0cmluZyk6IHZvaWQge1xuICAgIEN1YmlzbUxvZ0luZm8oJ3swfSBpcyBmaXJlZCBvbiBMQXBwTW9kZWwhIScsIGV2ZW50VmFsdWUucyk7XG4gIH1cblxuICAvKipcbiAgICog5b2T44Gf44KK5Yik5a6a44OG44K544OIXG4gICAqIOaMh+Wumu+8qe+8pOOBrumggueCueODquOCueODiOOBi+OCieefqeW9ouOCkuioiOeul+OBl+OAgeW6p+aomeOCkuOBjOefqeW9ouevhOWbsuWGheOBi+WIpOWumuOBmeOCi+OAglxuICAgKlxuICAgKiBAcGFyYW0gaGl0QXJlbmFOYW1lICDlvZPjgZ/jgorliKTlrprjgpLjg4bjgrnjg4jjgZnjgovlr77osaHjga5JRFxuICAgKiBAcGFyYW0geCAgICAgICAgICAgICDliKTlrprjgpLooYzjgYZY5bqn5qiZXG4gICAqIEBwYXJhbSB5ICAgICAgICAgICAgIOWIpOWumuOCkuihjOOBhlnluqfmqJlcbiAgICovXG4gIHB1YmxpYyBoaXRUZXN0KGhpdEFyZW5hTmFtZTogc3RyaW5nLCB4OiBudW1iZXIsIHk6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIC8vIOmAj+aYjuaZguOBr+W9k+OBn+OCiuWIpOWumueEoeOBl+OAglxuICAgIGlmICh0aGlzLl9vcGFjaXR5IDwgMSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IGNvdW50OiBudW1iZXIgPSB0aGlzLl9tb2RlbFNldHRpbmcuZ2V0SGl0QXJlYXNDb3VudCgpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICBpZiAodGhpcy5fbW9kZWxTZXR0aW5nLmdldEhpdEFyZWFOYW1lKGkpID09IGhpdEFyZW5hTmFtZSkge1xuICAgICAgICBjb25zdCBkcmF3SWQ6IEN1YmlzbUlkSGFuZGxlID0gdGhpcy5fbW9kZWxTZXR0aW5nLmdldEhpdEFyZWFJZChpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNIaXQoZHJhd0lkLCB4LCB5KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICog44Oi44O844K344On44Oz44OH44O844K/44KS44Kw44Or44O844OX5ZCN44GL44KJ5LiA5ous44Gn44Ot44O844OJ44GZ44KL44CCXG4gICAqIOODouODvOOCt+ODp+ODs+ODh+ODvOOCv+OBruWQjeWJjeOBr+WGhemDqOOBp01vZGVsU2V0dGluZ+OBi+OCieWPluW+l+OBmeOCi+OAglxuICAgKlxuICAgKiBAcGFyYW0gZ3JvdXAg44Oi44O844K344On44Oz44OH44O844K/44Gu44Kw44Or44O844OX5ZCNXG4gICAqL1xuICBwdWJsaWMgcHJlTG9hZE1vdGlvbkdyb3VwKGdyb3VwOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX21vZGVsU2V0dGluZy5nZXRNb3Rpb25Db3VudChncm91cCk7IGkrKykge1xuICAgICAgY29uc3QgbW90aW9uRmlsZU5hbWUgPSB0aGlzLl9tb2RlbFNldHRpbmcuZ2V0TW90aW9uRmlsZU5hbWUoZ3JvdXAsIGkpO1xuXG4gICAgICAvLyBleCkgaWRsZV8wXG4gICAgICBjb25zdCBuYW1lID0gYCR7Z3JvdXB9XyR7aX1gO1xuICAgICAgaWYgKHRoaXMuX2RlYnVnTW9kZSkge1xuICAgICAgICBMQXBwUGFsLnByaW50TWVzc2FnZShcbiAgICAgICAgICBgW0FQUF1sb2FkIG1vdGlvbjogJHttb3Rpb25GaWxlTmFtZX0gPT4gWyR7bmFtZX1dYFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBmZXRjaChgJHt0aGlzLl9tb2RlbEhvbWVEaXJ9LyR7bW90aW9uRmlsZU5hbWV9YClcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuYXJyYXlCdWZmZXIoKSlcbiAgICAgICAgLnRoZW4oYXJyYXlCdWZmZXIgPT4ge1xuICAgICAgICAgIGNvbnN0IHRtcE1vdGlvbjogQ3ViaXNtTW90aW9uID0gdGhpcy5sb2FkTW90aW9uKFxuICAgICAgICAgICAgYXJyYXlCdWZmZXIsXG4gICAgICAgICAgICBhcnJheUJ1ZmZlci5ieXRlTGVuZ3RoLFxuICAgICAgICAgICAgbmFtZVxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBsZXQgZmFkZVRpbWUgPSB0aGlzLl9tb2RlbFNldHRpbmcuZ2V0TW90aW9uRmFkZUluVGltZVZhbHVlKGdyb3VwLCBpKTtcbiAgICAgICAgICBpZiAoZmFkZVRpbWUgPj0gMC4wKSB7XG4gICAgICAgICAgICB0bXBNb3Rpb24uc2V0RmFkZUluVGltZShmYWRlVGltZSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZmFkZVRpbWUgPSB0aGlzLl9tb2RlbFNldHRpbmcuZ2V0TW90aW9uRmFkZU91dFRpbWVWYWx1ZShncm91cCwgaSk7XG4gICAgICAgICAgaWYgKGZhZGVUaW1lID49IDAuMCkge1xuICAgICAgICAgICAgdG1wTW90aW9uLnNldEZhZGVPdXRUaW1lKGZhZGVUaW1lKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdG1wTW90aW9uLnNldEVmZmVjdElkcyh0aGlzLl9leWVCbGlua0lkcywgdGhpcy5fbGlwU3luY0lkcyk7XG5cbiAgICAgICAgICBpZiAodGhpcy5fbW90aW9ucy5nZXRWYWx1ZShuYW1lKSAhPSBudWxsKSB7XG4gICAgICAgICAgICBBQ3ViaXNtTW90aW9uLmRlbGV0ZSh0aGlzLl9tb3Rpb25zLmdldFZhbHVlKG5hbWUpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLl9tb3Rpb25zLnNldFZhbHVlKG5hbWUsIHRtcE1vdGlvbik7XG5cbiAgICAgICAgICB0aGlzLl9tb3Rpb25Db3VudCsrO1xuICAgICAgICAgIGlmICh0aGlzLl9tb3Rpb25Db3VudCA+PSB0aGlzLl9hbGxNb3Rpb25Db3VudCkge1xuICAgICAgICAgICAgdGhpcy5fc3RhdGUgPSBMb2FkU3RlcC5Mb2FkVGV4dHVyZTtcblxuICAgICAgICAgICAgLy8g5YWo44Gm44Gu44Oi44O844K344On44Oz44KS5YGc5q2i44GZ44KLXG4gICAgICAgICAgICB0aGlzLl9tb3Rpb25NYW5hZ2VyLnN0b3BBbGxNb3Rpb25zKCk7XG5cbiAgICAgICAgICAgIHRoaXMuX3VwZGF0aW5nID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLl9pbml0aWFsaXplZCA9IHRydWU7XG5cbiAgICAgICAgICAgIHRoaXMuY3JlYXRlUmVuZGVyZXIoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0dXBUZXh0dXJlcygpO1xuICAgICAgICAgICAgdGhpcy5nZXRSZW5kZXJlcigpLnN0YXJ0VXAoZ2wpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIOOBmeOBueOBpuOBruODouODvOOCt+ODp+ODs+ODh+ODvOOCv+OCkuino+aUvuOBmeOCi+OAglxuICAgKi9cbiAgcHVibGljIHJlbGVhc2VNb3Rpb25zKCk6IHZvaWQge1xuICAgIHRoaXMuX21vdGlvbnMuY2xlYXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDlhajjgabjga7ooajmg4Xjg4fjg7zjgr/jgpLop6PmlL7jgZnjgovjgIJcbiAgICovXG4gIHB1YmxpYyByZWxlYXNlRXhwcmVzc2lvbnMoKTogdm9pZCB7XG4gICAgdGhpcy5fZXhwcmVzc2lvbnMuY2xlYXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDjg6Ljg4fjg6vjgpLmj4/nlLvjgZnjgovlh6bnkIbjgILjg6Ljg4fjg6vjgpLmj4/nlLvjgZnjgovnqbrplpPjga5WaWV3LVByb2plY3Rpb27ooYzliJfjgpLmuKHjgZnjgIJcbiAgICovXG4gIHB1YmxpYyBkb0RyYXcoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX21vZGVsID09IG51bGwpIHJldHVybjtcblxuICAgIC8vIOOCreODo+ODs+ODkOOCueOCteOCpOOCuuOCkua4oeOBmVxuICAgIGNvbnN0IHZpZXdwb3J0OiBudW1iZXJbXSA9IFswLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHRdO1xuXG4gICAgdGhpcy5nZXRSZW5kZXJlcigpLnNldFJlbmRlclN0YXRlKGZyYW1lQnVmZmVyLCB2aWV3cG9ydCk7XG4gICAgdGhpcy5nZXRSZW5kZXJlcigpLmRyYXdNb2RlbCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIOODouODh+ODq+OCkuaPj+eUu+OBmeOCi+WHpueQhuOAguODouODh+ODq+OCkuaPj+eUu+OBmeOCi+epuumWk+OBrlZpZXctUHJvamVjdGlvbuihjOWIl+OCkua4oeOBmeOAglxuICAgKi9cbiAgcHVibGljIGRyYXcobWF0cml4OiBDdWJpc21NYXRyaXg0NCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9tb2RlbCA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8g5ZCE6Kqt44G/6L6844G/57WC5LqG5b6MXG4gICAgaWYgKHRoaXMuX3N0YXRlID09IExvYWRTdGVwLkNvbXBsZXRlU2V0dXApIHtcbiAgICAgIG1hdHJpeC5tdWx0aXBseUJ5TWF0cml4KHRoaXMuX21vZGVsTWF0cml4KTtcblxuICAgICAgdGhpcy5nZXRSZW5kZXJlcigpLnNldE12cE1hdHJpeChtYXRyaXgpO1xuXG4gICAgICB0aGlzLmRvRHJhdygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiDjgrPjg7Pjgrnjg4jjg6njgq/jgr9cbiAgICovXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5fbW9kZWxTZXR0aW5nID0gbnVsbDtcbiAgICB0aGlzLl9tb2RlbEhvbWVEaXIgPSBudWxsO1xuICAgIHRoaXMuX3VzZXJUaW1lU2Vjb25kcyA9IDAuMDtcblxuICAgIHRoaXMuX2V5ZUJsaW5rSWRzID0gbmV3IGNzbVZlY3RvcjxDdWJpc21JZEhhbmRsZT4oKTtcbiAgICB0aGlzLl9saXBTeW5jSWRzID0gbmV3IGNzbVZlY3RvcjxDdWJpc21JZEhhbmRsZT4oKTtcblxuICAgIHRoaXMuX21vdGlvbnMgPSBuZXcgY3NtTWFwPHN0cmluZywgQUN1YmlzbU1vdGlvbj4oKTtcbiAgICB0aGlzLl9leHByZXNzaW9ucyA9IG5ldyBjc21NYXA8c3RyaW5nLCBBQ3ViaXNtTW90aW9uPigpO1xuXG4gICAgdGhpcy5faGl0QXJlYSA9IG5ldyBjc21WZWN0b3I8Y3NtUmVjdD4oKTtcbiAgICB0aGlzLl91c2VyQXJlYSA9IG5ldyBjc21WZWN0b3I8Y3NtUmVjdD4oKTtcblxuICAgIHRoaXMuX2lkUGFyYW1BbmdsZVggPSBDdWJpc21GcmFtZXdvcmsuZ2V0SWRNYW5hZ2VyKCkuZ2V0SWQoXG4gICAgICBDdWJpc21EZWZhdWx0UGFyYW1ldGVySWQuUGFyYW1BbmdsZVhcbiAgICApO1xuICAgIHRoaXMuX2lkUGFyYW1BbmdsZVkgPSBDdWJpc21GcmFtZXdvcmsuZ2V0SWRNYW5hZ2VyKCkuZ2V0SWQoXG4gICAgICBDdWJpc21EZWZhdWx0UGFyYW1ldGVySWQuUGFyYW1BbmdsZVlcbiAgICApO1xuICAgIHRoaXMuX2lkUGFyYW1BbmdsZVogPSBDdWJpc21GcmFtZXdvcmsuZ2V0SWRNYW5hZ2VyKCkuZ2V0SWQoXG4gICAgICBDdWJpc21EZWZhdWx0UGFyYW1ldGVySWQuUGFyYW1BbmdsZVpcbiAgICApO1xuICAgIHRoaXMuX2lkUGFyYW1FeWVCYWxsWCA9IEN1YmlzbUZyYW1ld29yay5nZXRJZE1hbmFnZXIoKS5nZXRJZChcbiAgICAgIEN1YmlzbURlZmF1bHRQYXJhbWV0ZXJJZC5QYXJhbUV5ZUJhbGxYXG4gICAgKTtcbiAgICB0aGlzLl9pZFBhcmFtRXllQmFsbFkgPSBDdWJpc21GcmFtZXdvcmsuZ2V0SWRNYW5hZ2VyKCkuZ2V0SWQoXG4gICAgICBDdWJpc21EZWZhdWx0UGFyYW1ldGVySWQuUGFyYW1FeWVCYWxsWVxuICAgICk7XG4gICAgdGhpcy5faWRQYXJhbUJvZHlBbmdsZVggPSBDdWJpc21GcmFtZXdvcmsuZ2V0SWRNYW5hZ2VyKCkuZ2V0SWQoXG4gICAgICBDdWJpc21EZWZhdWx0UGFyYW1ldGVySWQuUGFyYW1Cb2R5QW5nbGVYXG4gICAgKTtcblxuICAgIHRoaXMuX3N0YXRlID0gTG9hZFN0ZXAuTG9hZEFzc2V0cztcbiAgICB0aGlzLl9leHByZXNzaW9uQ291bnQgPSAwO1xuICAgIHRoaXMuX3RleHR1cmVDb3VudCA9IDA7XG4gICAgdGhpcy5fbW90aW9uQ291bnQgPSAwO1xuICAgIHRoaXMuX2FsbE1vdGlvbkNvdW50ID0gMDtcbiAgfVxuXG4gIF9tb2RlbFNldHRpbmc6IElDdWJpc21Nb2RlbFNldHRpbmc7IC8vIOODouODh+ODq+OCu+ODg+ODhuOCo+ODs+OCsOaDheWgsVxuICBfbW9kZWxIb21lRGlyOiBzdHJpbmc7IC8vIOODouODh+ODq+OCu+ODg+ODhuOCo+ODs+OCsOOBjOe9ruOBi+OCjOOBn+ODh+OCo+ODrOOCr+ODiOODqlxuICBfdXNlclRpbWVTZWNvbmRzOiBudW1iZXI7IC8vIOODh+ODq+OCv+aZgumWk+OBruepjeeul+WApFvnp5JdXG5cbiAgX2V5ZUJsaW5rSWRzOiBjc21WZWN0b3I8Q3ViaXNtSWRIYW5kbGU+OyAvLyDjg6Ljg4fjg6vjgavoqK3lrprjgZXjgozjgZ/nnqzjgY3mqZ/og73nlKjjg5Hjg6njg6Hjg7zjgr9JRFxuICBfbGlwU3luY0lkczogY3NtVmVjdG9yPEN1YmlzbUlkSGFuZGxlPjsgLy8g44Oi44OH44Or44Gr6Kit5a6a44GV44KM44Gf44Oq44OD44OX44K344Oz44Kv5qmf6IO955So44OR44Op44Oh44O844K/SURcblxuICBfbW90aW9uczogY3NtTWFwPHN0cmluZywgQUN1YmlzbU1vdGlvbj47IC8vIOiqreOBv+i+vOOBvuOCjOOBpuOBhOOCi+ODouODvOOCt+ODp+ODs+OBruODquOCueODiFxuICBfZXhwcmVzc2lvbnM6IGNzbU1hcDxzdHJpbmcsIEFDdWJpc21Nb3Rpb24+OyAvLyDoqq3jgb/ovrzjgb7jgozjgabjgYTjgovooajmg4Xjga7jg6rjgrnjg4hcblxuICBfaGl0QXJlYTogY3NtVmVjdG9yPGNzbVJlY3Q+O1xuICBfdXNlckFyZWE6IGNzbVZlY3Rvcjxjc21SZWN0PjtcblxuICBfaWRQYXJhbUFuZ2xlWDogQ3ViaXNtSWRIYW5kbGU7IC8vIOODkeODqeODoeODvOOCv0lEOiBQYXJhbUFuZ2xlWFxuICBfaWRQYXJhbUFuZ2xlWTogQ3ViaXNtSWRIYW5kbGU7IC8vIOODkeODqeODoeODvOOCv0lEOiBQYXJhbUFuZ2xlWVxuICBfaWRQYXJhbUFuZ2xlWjogQ3ViaXNtSWRIYW5kbGU7IC8vIOODkeODqeODoeODvOOCv0lEOiBQYXJhbUFuZ2xlWlxuICBfaWRQYXJhbUV5ZUJhbGxYOiBDdWJpc21JZEhhbmRsZTsgLy8g44OR44Op44Oh44O844K/SUQ6IFBhcmFtRXllQmFsbFhcbiAgX2lkUGFyYW1FeWVCYWxsWTogQ3ViaXNtSWRIYW5kbGU7IC8vIOODkeODqeODoeODvOOCv0lEOiBQYXJhbUV5ZUJBbGxZXG4gIF9pZFBhcmFtQm9keUFuZ2xlWDogQ3ViaXNtSWRIYW5kbGU7IC8vIOODkeODqeODoeODvOOCv0lEOiBQYXJhbUJvZHlBbmdsZVhcblxuICBfc3RhdGU6IG51bWJlcjsgLy8g54++5Zyo44Gu44K544OG44O844K/44K5566h55CG55SoXG4gIF9leHByZXNzaW9uQ291bnQ6IG51bWJlcjsgLy8g6KGo5oOF44OH44O844K/44Kr44Km44Oz44OIXG4gIF90ZXh0dXJlQ291bnQ6IG51bWJlcjsgLy8g44OG44Kv44K544OB44Oj44Kr44Km44Oz44OIXG4gIF9tb3Rpb25Db3VudDogbnVtYmVyOyAvLyDjg6Ljg7zjgrfjg6fjg7Pjg4fjg7zjgr/jgqvjgqbjg7Pjg4hcbiAgX2FsbE1vdGlvbkNvdW50OiBudW1iZXI7IC8vIOODouODvOOCt+ODp+ODs+e3j+aVsFxufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQoYykgTGl2ZTJEIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSB0aGUgTGl2ZTJEIE9wZW4gU29mdHdhcmUgbGljZW5zZVxuICogdGhhdCBjYW4gYmUgZm91bmQgYXQgaHR0cHM6Ly93d3cubGl2ZTJkLmNvbS9ldWxhL2xpdmUyZC1vcGVuLXNvZnR3YXJlLWxpY2Vuc2UtYWdyZWVtZW50X2VuLmh0bWwuXG4gKi9cblxuaW1wb3J0IHsgTGl2ZTJEQ3ViaXNtRnJhbWV3b3JrIGFzIGN1YmlzbU1hdHJpeDQ0IH0gZnJvbSAnLi4vRnJhbWV3b3JrL3NyYy9tYXRoL2N1YmlzbW1hdHJpeDQ0JztcbmltcG9ydCB7IExpdmUyREN1YmlzbUZyYW1ld29yayBhcyBjdWJpc212aWV3bWF0cml4IH0gZnJvbSAnLi4vRnJhbWV3b3JrL3NyYy9tYXRoL2N1YmlzbXZpZXdtYXRyaXgnO1xuaW1wb3J0IENzbV9DdWJpc21WaWV3TWF0cml4ID0gY3ViaXNtdmlld21hdHJpeC5DdWJpc21WaWV3TWF0cml4O1xuaW1wb3J0IENzbV9DdWJpc21NYXRyaXg0NCA9IGN1YmlzbU1hdHJpeDQ0LkN1YmlzbU1hdHJpeDQ0O1xuaW1wb3J0IHsgVG91Y2hNYW5hZ2VyIH0gZnJvbSAnLi90b3VjaG1hbmFnZXInO1xuaW1wb3J0IHsgTEFwcExpdmUyRE1hbmFnZXIgfSBmcm9tICcuL2xhcHBsaXZlMmRtYW5hZ2VyJztcbmltcG9ydCB7IExBcHBEZWxlZ2F0ZSwgY2FudmFzLCBnbCB9IGZyb20gJy4vbGFwcGRlbGVnYXRlJztcbmltcG9ydCB7IExBcHBTcHJpdGUgfSBmcm9tICcuL2xhcHBzcHJpdGUnO1xuaW1wb3J0IHsgVGV4dHVyZUluZm8gfSBmcm9tICcuL2xhcHB0ZXh0dXJlbWFuYWdlcic7XG5pbXBvcnQgeyBMQXBwUGFsIH0gZnJvbSAnLi9sYXBwcGFsJztcbmltcG9ydCAqIGFzIExBcHBEZWZpbmUgZnJvbSAnLi9sYXBwZGVmaW5lJztcblxuLyoqXG4gKiDmj4/nlLvjgq/jg6njgrnjgIJcbiAqL1xuZXhwb3J0IGNsYXNzIExBcHBWaWV3IHtcbiAgLyoqXG4gICAqIOOCs+ODs+OCueODiOODqeOCr+OCv1xuICAgKi9cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5fcHJvZ3JhbUlkID0gbnVsbDtcbiAgICB0aGlzLl9iYWNrID0gbnVsbDtcbiAgICB0aGlzLl9nZWFyID0gbnVsbDtcblxuICAgIC8vIOOCv+ODg+ODgemWouS/guOBruOCpOODmeODs+ODiOeuoeeQhlxuICAgIHRoaXMuX3RvdWNoTWFuYWdlciA9IG5ldyBUb3VjaE1hbmFnZXIoKTtcblxuICAgIC8vIOODh+ODkOOCpOOCueW6p+aomeOBi+OCieOCueOCr+ODquODvOODs+W6p+aomeOBq+WkieaPm+OBmeOCi+OBn+OCgeOBrlxuICAgIHRoaXMuX2RldmljZVRvU2NyZWVuID0gbmV3IENzbV9DdWJpc21NYXRyaXg0NCgpO1xuXG4gICAgLy8g55S76Z2i44Gu6KGo56S644Gu5ouh5aSn57iu5bCP44KE56e75YuV44Gu5aSJ5o+b44KS6KGM44GG6KGM5YiXXG4gICAgdGhpcy5fdmlld01hdHJpeCA9IG5ldyBDc21fQ3ViaXNtVmlld01hdHJpeCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIOWIneacn+WMluOBmeOCi+OAglxuICAgKi9cbiAgcHVibGljIGluaXRpYWxpemUoKTogdm9pZCB7XG4gICAgY29uc3QgeyB3aWR0aCwgaGVpZ2h0IH0gPSBjYW52YXM7XG5cbiAgICBjb25zdCByYXRpbzogbnVtYmVyID0gaGVpZ2h0IC8gd2lkdGg7XG4gICAgY29uc3QgbGVmdDogbnVtYmVyID0gTEFwcERlZmluZS5WaWV3TG9naWNhbExlZnQ7XG4gICAgY29uc3QgcmlnaHQ6IG51bWJlciA9IExBcHBEZWZpbmUuVmlld0xvZ2ljYWxSaWdodDtcbiAgICBjb25zdCBib3R0b206IG51bWJlciA9IC1yYXRpbztcbiAgICBjb25zdCB0b3A6IG51bWJlciA9IHJhdGlvO1xuXG4gICAgdGhpcy5fdmlld01hdHJpeC5zZXRTY3JlZW5SZWN0KGxlZnQsIHJpZ2h0LCBib3R0b20sIHRvcCk7IC8vIOODh+ODkOOCpOOCueOBq+WvvuW/nOOBmeOCi+eUu+mdouOBruevhOWbsuOAgiBY44Gu5bem56uv44CBWOOBruWPs+err+OAgVnjga7kuIvnq6/jgIFZ44Gu5LiK56uvXG5cbiAgICBjb25zdCBzY3JlZW5XOiBudW1iZXIgPSBNYXRoLmFicyhsZWZ0IC0gcmlnaHQpO1xuICAgIHRoaXMuX2RldmljZVRvU2NyZWVuLnNjYWxlUmVsYXRpdmUoc2NyZWVuVyAvIHdpZHRoLCAtc2NyZWVuVyAvIHdpZHRoKTtcbiAgICB0aGlzLl9kZXZpY2VUb1NjcmVlbi50cmFuc2xhdGVSZWxhdGl2ZSgtd2lkdGggKiAwLjUsIC1oZWlnaHQgKiAwLjUpO1xuXG4gICAgLy8g6KGo56S656+E5Zuy44Gu6Kit5a6aXG4gICAgdGhpcy5fdmlld01hdHJpeC5zZXRNYXhTY2FsZShMQXBwRGVmaW5lLlZpZXdNYXhTY2FsZSk7IC8vIOmZkOeVjOaLoeW8teeOh1xuICAgIHRoaXMuX3ZpZXdNYXRyaXguc2V0TWluU2NhbGUoTEFwcERlZmluZS5WaWV3TWluU2NhbGUpOyAvLyDpmZDnlYznuK7lsI/njodcblxuICAgIC8vIOihqOekuuOBp+OBjeOCi+acgOWkp+evhOWbslxuICAgIHRoaXMuX3ZpZXdNYXRyaXguc2V0TWF4U2NyZWVuUmVjdChcbiAgICAgIExBcHBEZWZpbmUuVmlld0xvZ2ljYWxNYXhMZWZ0LFxuICAgICAgTEFwcERlZmluZS5WaWV3TG9naWNhbE1heFJpZ2h0LFxuICAgICAgTEFwcERlZmluZS5WaWV3TG9naWNhbE1heEJvdHRvbSxcbiAgICAgIExBcHBEZWZpbmUuVmlld0xvZ2ljYWxNYXhUb3BcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIOino+aUvuOBmeOCi1xuICAgKi9cbiAgcHVibGljIHJlbGVhc2UoKTogdm9pZCB7XG4gICAgdGhpcy5fdmlld01hdHJpeCA9IG51bGw7XG4gICAgdGhpcy5fdG91Y2hNYW5hZ2VyID0gbnVsbDtcbiAgICB0aGlzLl9kZXZpY2VUb1NjcmVlbiA9IG51bGw7XG5cbiAgICB0aGlzLl9nZWFyLnJlbGVhc2UoKTtcbiAgICB0aGlzLl9nZWFyID0gbnVsbDtcblxuICAgIHRoaXMuX2JhY2sucmVsZWFzZSgpO1xuICAgIHRoaXMuX2JhY2sgPSBudWxsO1xuXG4gICAgZ2wuZGVsZXRlUHJvZ3JhbSh0aGlzLl9wcm9ncmFtSWQpO1xuICAgIHRoaXMuX3Byb2dyYW1JZCA9IG51bGw7XG4gIH1cblxuICAvKipcbiAgICog5o+P55S744GZ44KL44CCXG4gICAqL1xuICBwdWJsaWMgcmVuZGVyKCk6IHZvaWQge1xuICAgIGdsLnVzZVByb2dyYW0odGhpcy5fcHJvZ3JhbUlkKTtcblxuICAgIGlmICh0aGlzLl9iYWNrKSB7XG4gICAgICB0aGlzLl9iYWNrLnJlbmRlcih0aGlzLl9wcm9ncmFtSWQpO1xuICAgIH1cbiAgICBpZiAodGhpcy5fZ2Vhcikge1xuICAgICAgdGhpcy5fZ2Vhci5yZW5kZXIodGhpcy5fcHJvZ3JhbUlkKTtcbiAgICB9XG5cbiAgICBnbC5mbHVzaCgpO1xuXG4gICAgY29uc3QgbGl2ZTJETWFuYWdlcjogTEFwcExpdmUyRE1hbmFnZXIgPSBMQXBwTGl2ZTJETWFuYWdlci5nZXRJbnN0YW5jZSgpO1xuXG4gICAgbGl2ZTJETWFuYWdlci5vblVwZGF0ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIOeUu+WDj+OBruWIneacn+WMluOCkuihjOOBhuOAglxuICAgKi9cbiAgcHVibGljIGluaXRpYWxpemVTcHJpdGUoKTogdm9pZCB7XG4gICAgY29uc3Qgd2lkdGg6IG51bWJlciA9IGNhbnZhcy53aWR0aDtcbiAgICBjb25zdCBoZWlnaHQ6IG51bWJlciA9IGNhbnZhcy5oZWlnaHQ7XG5cbiAgICBjb25zdCB0ZXh0dXJlTWFuYWdlciA9IExBcHBEZWxlZ2F0ZS5nZXRJbnN0YW5jZSgpLmdldFRleHR1cmVNYW5hZ2VyKCk7XG4gICAgY29uc3QgcmVzb3VyY2VzUGF0aCA9IExBcHBEZWZpbmUuUmVzb3VyY2VzUGF0aDtcblxuICAgIGxldCBpbWFnZU5hbWUgPSAnJztcblxuICAgIC8vIOS4jeWKoOi9veeUu+W4g++8jOeUqOS6juWBmueci+adv+WomFxuXG4gICAgLy8gLy8g6IOM5pmv55S75YOP5Yid5pyf5YyWXG4gICAgLy8gaW1hZ2VOYW1lID0gTEFwcERlZmluZS5CYWNrSW1hZ2VOYW1lO1xuXG4gICAgLy8gLy8g6Z2e5ZCM5pyf44Gq44Gu44Gn44Kz44O844Or44OQ44OD44Kv6Zai5pWw44KS5L2c5oiQXG4gICAgLy8gY29uc3QgaW5pdEJhY2tHcm91bmRUZXh0dXJlID0gKHRleHR1cmVJbmZvOiBUZXh0dXJlSW5mbyk6IHZvaWQgPT4ge1xuICAgIC8vICAgY29uc3QgeDogbnVtYmVyID0gd2lkdGggKiAwLjU7XG4gICAgLy8gICBjb25zdCB5OiBudW1iZXIgPSBoZWlnaHQgKiAwLjU7XG5cbiAgICAvLyAgIGNvbnN0IGZ3aWR0aCA9IHRleHR1cmVJbmZvLndpZHRoICogMi4wO1xuICAgIC8vICAgY29uc3QgZmhlaWdodCA9IGhlaWdodCAqIDAuOTU7XG4gICAgLy8gICB0aGlzLl9iYWNrID0gbmV3IExBcHBTcHJpdGUoeCwgeSwgZndpZHRoLCBmaGVpZ2h0LCB0ZXh0dXJlSW5mby5pZCk7XG4gICAgLy8gfTtcblxuICAgIC8vIHRleHR1cmVNYW5hZ2VyLmNyZWF0ZVRleHR1cmVGcm9tUG5nRmlsZShcbiAgICAvLyAgIHJlc291cmNlc1BhdGggKyBpbWFnZU5hbWUsXG4gICAgLy8gICBmYWxzZSxcbiAgICAvLyAgIGluaXRCYWNrR3JvdW5kVGV4dHVyZVxuICAgIC8vICk7XG5cbiAgICAvLyAvLyDmra/ou4rnlLvlg4/liJ3mnJ/ljJZcbiAgICAvLyBpbWFnZU5hbWUgPSBMQXBwRGVmaW5lLkdlYXJJbWFnZU5hbWU7XG4gICAgLy8gY29uc3QgaW5pdEdlYXJUZXh0dXJlID0gKHRleHR1cmVJbmZvOiBUZXh0dXJlSW5mbyk6IHZvaWQgPT4ge1xuICAgIC8vICAgY29uc3QgeCA9IHdpZHRoIC0gdGV4dHVyZUluZm8ud2lkdGggKiAwLjU7XG4gICAgLy8gICBjb25zdCB5ID0gaGVpZ2h0IC0gdGV4dHVyZUluZm8uaGVpZ2h0ICogMC41O1xuICAgIC8vICAgY29uc3QgZndpZHRoID0gdGV4dHVyZUluZm8ud2lkdGg7XG4gICAgLy8gICBjb25zdCBmaGVpZ2h0ID0gdGV4dHVyZUluZm8uaGVpZ2h0O1xuICAgIC8vICAgdGhpcy5fZ2VhciA9IG5ldyBMQXBwU3ByaXRlKHgsIHksIGZ3aWR0aCwgZmhlaWdodCwgdGV4dHVyZUluZm8uaWQpO1xuICAgIC8vIH07XG5cbiAgICAvLyB0ZXh0dXJlTWFuYWdlci5jcmVhdGVUZXh0dXJlRnJvbVBuZ0ZpbGUoXG4gICAgLy8gICByZXNvdXJjZXNQYXRoICsgaW1hZ2VOYW1lLFxuICAgIC8vICAgZmFsc2UsXG4gICAgLy8gICBpbml0R2VhclRleHR1cmVcbiAgICAvLyApO1xuXG4gICAgLy8gLy8g44K344Kn44O844OA44O844KS5L2c5oiQXG4gICAgLy8gaWYgKHRoaXMuX3Byb2dyYW1JZCA9PSBudWxsKSB7XG4gICAgLy8gICB0aGlzLl9wcm9ncmFtSWQgPSBMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKS5jcmVhdGVTaGFkZXIoKTtcbiAgICAvLyB9XG4gIH1cblxuICAvKipcbiAgICog44K/44OD44OB44GV44KM44Gf5pmC44Gr5ZG844Gw44KM44KL44CCXG4gICAqXG4gICAqIEBwYXJhbSBwb2ludFgg44K544Kv44Oq44O844OzWOW6p+aomVxuICAgKiBAcGFyYW0gcG9pbnRZIOOCueOCr+ODquODvOODs1nluqfmqJlcbiAgICovXG4gIHB1YmxpYyBvblRvdWNoZXNCZWdhbihwb2ludFg6IG51bWJlciwgcG9pbnRZOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl90b3VjaE1hbmFnZXIudG91Y2hlc0JlZ2FuKHBvaW50WCwgcG9pbnRZKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDjgr/jg4Pjg4HjgZfjgabjgYTjgovjgajjgY3jgavjg53jgqTjg7Pjgr/jgYzli5XjgYTjgZ/jgonlkbzjgbDjgozjgovjgIJcbiAgICpcbiAgICogQHBhcmFtIHBvaW50WCDjgrnjgq/jg6rjg7zjg7NY5bqn5qiZXG4gICAqIEBwYXJhbSBwb2ludFkg44K544Kv44Oq44O844OzWeW6p+aomVxuICAgKi9cbiAgcHVibGljIG9uVG91Y2hlc01vdmVkKHBvaW50WDogbnVtYmVyLCBwb2ludFk6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IHZpZXdYOiBudW1iZXIgPSB0aGlzLnRyYW5zZm9ybVZpZXdYKHRoaXMuX3RvdWNoTWFuYWdlci5nZXRYKCkpO1xuICAgIGNvbnN0IHZpZXdZOiBudW1iZXIgPSB0aGlzLnRyYW5zZm9ybVZpZXdZKHRoaXMuX3RvdWNoTWFuYWdlci5nZXRZKCkpO1xuXG4gICAgdGhpcy5fdG91Y2hNYW5hZ2VyLnRvdWNoZXNNb3ZlZChwb2ludFgsIHBvaW50WSk7XG5cbiAgICBjb25zdCBsaXZlMkRNYW5hZ2VyOiBMQXBwTGl2ZTJETWFuYWdlciA9IExBcHBMaXZlMkRNYW5hZ2VyLmdldEluc3RhbmNlKCk7XG4gICAgbGl2ZTJETWFuYWdlci5vbkRyYWcodmlld1gsIHZpZXdZKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDjgr/jg4Pjg4HjgYzntYLkuobjgZfjgZ/jgonlkbzjgbDjgozjgovjgIJcbiAgICpcbiAgICogQHBhcmFtIHBvaW50WCDjgrnjgq/jg6rjg7zjg7NY5bqn5qiZXG4gICAqIEBwYXJhbSBwb2ludFkg44K544Kv44Oq44O844OzWeW6p+aomVxuICAgKi9cbiAgcHVibGljIG9uVG91Y2hlc0VuZGVkKHBvaW50WDogbnVtYmVyLCBwb2ludFk6IG51bWJlcik6IHZvaWQge1xuICAgIC8vIOOCv+ODg+ODgee1guS6hlxuICAgIGNvbnN0IGxpdmUyRE1hbmFnZXI6IExBcHBMaXZlMkRNYW5hZ2VyID0gTEFwcExpdmUyRE1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcbiAgICBsaXZlMkRNYW5hZ2VyLm9uRHJhZygwLjAsIDAuMCk7XG5cbiAgICB7XG4gICAgICAvLyDjgrfjg7PjgrDjg6vjgr/jg4Pjg5dcbiAgICAgIGNvbnN0IHg6IG51bWJlciA9IHRoaXMuX2RldmljZVRvU2NyZWVuLnRyYW5zZm9ybVgoXG4gICAgICAgIHRoaXMuX3RvdWNoTWFuYWdlci5nZXRYKClcbiAgICAgICk7IC8vIOirlueQhuW6p+aomeWkieaPm+OBl+OBn+W6p+aomeOCkuWPluW+l+OAglxuICAgICAgY29uc3QgeTogbnVtYmVyID0gdGhpcy5fZGV2aWNlVG9TY3JlZW4udHJhbnNmb3JtWShcbiAgICAgICAgdGhpcy5fdG91Y2hNYW5hZ2VyLmdldFkoKVxuICAgICAgKTsgLy8g6KuW55CG5bqn5qiZ5aSJ5YyW44GX44Gf5bqn5qiZ44KS5Y+W5b6X44CCXG5cbiAgICAgIGlmIChMQXBwRGVmaW5lLkRlYnVnVG91Y2hMb2dFbmFibGUpIHtcbiAgICAgICAgTEFwcFBhbC5wcmludE1lc3NhZ2UoYFtBUFBddG91Y2hlc0VuZGVkIHg6ICR7eH0geTogJHt5fWApO1xuICAgICAgfVxuICAgICAgbGl2ZTJETWFuYWdlci5vblRhcCh4LCB5KTtcblxuICAgICAgLy8g5q2v6LuK44Gr44K/44OD44OX44GX44Gf44GLXG4gICAgICAvLyBpZiAodGhpcy5fZ2Vhci5pc0hpdChwb2ludFgsIHBvaW50WSkpIHtcbiAgICAgIC8vICAgbGl2ZTJETWFuYWdlci5uZXh0U2NlbmUoKTtcbiAgICAgIC8vIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogWOW6p+aomeOCklZpZXfluqfmqJnjgavlpInmj5vjgZnjgovjgIJcbiAgICpcbiAgICogQHBhcmFtIGRldmljZVgg44OH44OQ44Kk44K5WOW6p+aomVxuICAgKi9cbiAgcHVibGljIHRyYW5zZm9ybVZpZXdYKGRldmljZVg6IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3Qgc2NyZWVuWDogbnVtYmVyID0gdGhpcy5fZGV2aWNlVG9TY3JlZW4udHJhbnNmb3JtWChkZXZpY2VYKTsgLy8g6KuW55CG5bqn5qiZ5aSJ5o+b44GX44Gf5bqn5qiZ44KS5Y+W5b6X44CCXG4gICAgcmV0dXJuIHRoaXMuX3ZpZXdNYXRyaXguaW52ZXJ0VHJhbnNmb3JtWChzY3JlZW5YKTsgLy8g5ouh5aSn44CB57iu5bCP44CB56e75YuV5b6M44Gu5YCk44CCXG4gIH1cblxuICAvKipcbiAgICogWeW6p+aomeOCklZpZXfluqfmqJnjgavlpInmj5vjgZnjgovjgIJcbiAgICpcbiAgICogQHBhcmFtIGRldmljZVkg44OH44OQ44Kk44K5WeW6p+aomVxuICAgKi9cbiAgcHVibGljIHRyYW5zZm9ybVZpZXdZKGRldmljZVk6IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3Qgc2NyZWVuWTogbnVtYmVyID0gdGhpcy5fZGV2aWNlVG9TY3JlZW4udHJhbnNmb3JtWShkZXZpY2VZKTsgLy8g6KuW55CG5bqn5qiZ5aSJ5o+b44GX44Gf5bqn5qiZ44KS5Y+W5b6X44CCXG4gICAgcmV0dXJuIHRoaXMuX3ZpZXdNYXRyaXguaW52ZXJ0VHJhbnNmb3JtWShzY3JlZW5ZKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBY5bqn5qiZ44KSU2NyZWVu5bqn5qiZ44Gr5aSJ5o+b44GZ44KL44CCXG4gICAqIEBwYXJhbSBkZXZpY2VYIOODh+ODkOOCpOOCuVjluqfmqJlcbiAgICovXG4gIHB1YmxpYyB0cmFuc2Zvcm1TY3JlZW5YKGRldmljZVg6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2RldmljZVRvU2NyZWVuLnRyYW5zZm9ybVgoZGV2aWNlWCk7XG4gIH1cblxuICAvKipcbiAgICogWeW6p+aomeOCklNjcmVlbuW6p+aomeOBq+WkieaPm+OBmeOCi+OAglxuICAgKlxuICAgKiBAcGFyYW0gZGV2aWNlWSDjg4fjg5DjgqTjgrlZ5bqn5qiZXG4gICAqL1xuICBwdWJsaWMgdHJhbnNmb3JtU2NyZWVuWShkZXZpY2VZOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9kZXZpY2VUb1NjcmVlbi50cmFuc2Zvcm1ZKGRldmljZVkpO1xuICB9XG5cbiAgX3RvdWNoTWFuYWdlcjogVG91Y2hNYW5hZ2VyOyAvLyDjgr/jg4Pjg4Hjg57jg43jg7zjgrjjg6Pjg7xcbiAgX2RldmljZVRvU2NyZWVuOiBDc21fQ3ViaXNtTWF0cml4NDQ7IC8vIOODh+ODkOOCpOOCueOBi+OCieOCueOCr+ODquODvOODs+OBuOOBruihjOWIl1xuICBfdmlld01hdHJpeDogQ3NtX0N1YmlzbVZpZXdNYXRyaXg7IC8vIHZpZXdNYXRyaXhcbiAgX3Byb2dyYW1JZDogV2ViR0xQcm9ncmFtOyAvLyDjgrfjgqfjg7zjg4BJRFxuICBfYmFjazogTEFwcFNwcml0ZTsgLy8g6IOM5pmv55S75YOPXG4gIF9nZWFyOiBMQXBwU3ByaXRlOyAvLyDjgq7jgqLnlLvlg49cbiAgX2NoYW5nZU1vZGVsOiBib29sZWFuOyAvLyDjg6Ljg4fjg6vliIfjgormm7/jgYjjg5Xjg6njgrBcbiAgX2lzQ2xpY2s6IGJvb2xlYW47IC8vIOOCr+ODquODg+OCr+S4rVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==