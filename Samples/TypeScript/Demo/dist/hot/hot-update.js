webpackHotUpdatelive2d("main",{

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
        console.log('资源路径', dir);
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

/***/ "./src/lapptexturemanager.ts":
/*!***********************************!*\
  !*** ./src/lapptexturemanager.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var csmvector_1 = __webpack_require__(/*! ../Framework/src/type/csmvector */ "./Framework/src/type/csmvector.ts");
var Csm_csmVector = csmvector_1.Live2DCubismFramework.csmVector;
var lappdelegate_1 = __webpack_require__(/*! ./lappdelegate */ "./src/lappdelegate.ts");
var LAppTextureManager = (function () {
    function LAppTextureManager() {
        this._textures = new Csm_csmVector();
    }
    LAppTextureManager.prototype.release = function () {
        for (var ite = this._textures.begin(); ite.notEqual(this._textures.end()); ite.preIncrement()) {
            lappdelegate_1.gl.deleteTexture(ite.ptr().id);
        }
        this._textures = null;
    };
    LAppTextureManager.prototype.createTextureFromPngFile = function (fileName, usePremultiply, callback) {
        var _this = this;
        var _loop_1 = function (ite) {
            if (ite.ptr().fileName == fileName &&
                ite.ptr().usePremultply == usePremultiply) {
                ite.ptr().img = new Image();
                ite.ptr().img.onload = function () { return callback(ite.ptr()); };
                ite.ptr().img.src = fileName;
                return { value: void 0 };
            }
        };
        for (var ite = this._textures.begin(); ite.notEqual(this._textures.end()); ite.preIncrement()) {
            var state_1 = _loop_1(ite);
            if (typeof state_1 === "object")
                return state_1.value;
        }
        var img = new Image();
        img.onload = function () {
            var tex = lappdelegate_1.gl.createTexture();
            lappdelegate_1.gl.bindTexture(lappdelegate_1.gl.TEXTURE_2D, tex);
            lappdelegate_1.gl.texParameteri(lappdelegate_1.gl.TEXTURE_2D, lappdelegate_1.gl.TEXTURE_MIN_FILTER, lappdelegate_1.gl.LINEAR_MIPMAP_LINEAR);
            lappdelegate_1.gl.texParameteri(lappdelegate_1.gl.TEXTURE_2D, lappdelegate_1.gl.TEXTURE_MAG_FILTER, lappdelegate_1.gl.LINEAR);
            if (usePremultiply) {
                lappdelegate_1.gl.pixelStorei(lappdelegate_1.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 1);
            }
            lappdelegate_1.gl.texImage2D(lappdelegate_1.gl.TEXTURE_2D, 0, lappdelegate_1.gl.RGBA, lappdelegate_1.gl.RGBA, lappdelegate_1.gl.UNSIGNED_BYTE, img);
            lappdelegate_1.gl.generateMipmap(lappdelegate_1.gl.TEXTURE_2D);
            lappdelegate_1.gl.bindTexture(lappdelegate_1.gl.TEXTURE_2D, null);
            var textureInfo = new TextureInfo();
            if (textureInfo != null) {
                textureInfo.fileName = fileName;
                textureInfo.width = img.width;
                textureInfo.height = img.height;
                textureInfo.id = tex;
                textureInfo.img = img;
                textureInfo.usePremultply = usePremultiply;
                _this._textures.pushBack(textureInfo);
            }
            callback(textureInfo);
        };
        img.src = fileName;
        img.crossOrigin = "anonymous";
    };
    LAppTextureManager.prototype.releaseTextures = function () {
        for (var i = 0; i < this._textures.getSize(); i++) {
            this._textures.set(i, null);
        }
        this._textures.clear();
    };
    LAppTextureManager.prototype.releaseTextureByTexture = function (texture) {
        for (var i = 0; i < this._textures.getSize(); i++) {
            if (this._textures.at(i).id != texture) {
                continue;
            }
            this._textures.set(i, null);
            this._textures.remove(i);
            break;
        }
    };
    LAppTextureManager.prototype.releaseTextureByFilePath = function (fileName) {
        for (var i = 0; i < this._textures.getSize(); i++) {
            if (this._textures.at(i).fileName == fileName) {
                this._textures.set(i, null);
                this._textures.remove(i);
                break;
            }
        }
    };
    return LAppTextureManager;
}());
exports.LAppTextureManager = LAppTextureManager;
var TextureInfo = (function () {
    function TextureInfo() {
        this.id = null;
        this.width = 0;
        this.height = 0;
    }
    return TextureInfo;
}());
exports.TextureInfo = TextureInfo;


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9saXZlMmQvLi9zcmMvbGFwcGRlbGVnYXRlLnRzIiwid2VicGFjazovL2xpdmUyZC8uL3NyYy9sYXBwbGl2ZTJkbWFuYWdlci50cyIsIndlYnBhY2s6Ly9saXZlMmQvLi9zcmMvbGFwcG1vZGVsLnRzIiwid2VicGFjazovL2xpdmUyZC8uL3NyYy9sYXBwdGV4dHVyZW1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vbGl2ZTJkLy4vc3JjL2xhcHB2aWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFPQSw0SUFHZ0Q7QUFDaEQsSUFBTyxtQkFBbUIsR0FBRyw2Q0FBcUIsQ0FBQyxlQUFlLENBQUM7QUFDbkUsNEVBQXNDO0FBQ3RDLHlFQUFvQztBQUNwQywwR0FBMEQ7QUFDMUQsdUdBQXdEO0FBQ3hELDhGQUEyQztBQUVoQyxjQUFNLEdBQXNCLElBQUksQ0FBQztBQUNqQyxrQkFBVSxHQUFpQixJQUFJLENBQUM7QUFDaEMsVUFBRSxHQUEwQixJQUFJLENBQUM7QUFDakMsbUJBQVcsR0FBcUIsSUFBSSxDQUFDO0FBTWhEO0lBNlFFO1FBQ0UsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7UUFDbkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7UUFDbkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFFcEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLDhCQUFVLEVBQUUsQ0FBQztRQUN0QyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksbUJBQVEsRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSx1Q0FBa0IsRUFBRSxDQUFDO0lBQ2xELENBQUM7SUEvUWEsd0JBQVcsR0FBekI7UUFDRSxJQUFJLGtCQUFVLElBQUksSUFBSSxFQUFFO1lBQ3RCLGtCQUFVLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FB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dXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0KGMpIExpdmUyRCBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgdGhlIExpdmUyRCBPcGVuIFNvZnR3YXJlIGxpY2Vuc2VcbiAqIHRoYXQgY2FuIGJlIGZvdW5kIGF0IGh0dHBzOi8vd3d3LmxpdmUyZC5jb20vZXVsYS9saXZlMmQtb3Blbi1zb2Z0d2FyZS1saWNlbnNlLWFncmVlbWVudF9lbi5odG1sLlxuICovXG5cbmltcG9ydCB7XG4gIExpdmUyREN1YmlzbUZyYW1ld29yayBhcyBsaXZlMmRjdWJpc21mcmFtZXdvcmssXG4gIE9wdGlvbiBhcyBDc21fT3B0aW9uXG59IGZyb20gJy4uL0ZyYW1ld29yay9zcmMvbGl2ZTJkY3ViaXNtZnJhbWV3b3JrJztcbmltcG9ydCBDc21fQ3ViaXNtRnJhbWV3b3JrID0gbGl2ZTJkY3ViaXNtZnJhbWV3b3JrLkN1YmlzbUZyYW1ld29yaztcbmltcG9ydCB7IExBcHBWaWV3IH0gZnJvbSAnLi9sYXBwdmlldyc7XG5pbXBvcnQgeyBMQXBwUGFsIH0gZnJvbSAnLi9sYXBwcGFsJztcbmltcG9ydCB7IExBcHBUZXh0dXJlTWFuYWdlciB9IGZyb20gJy4vbGFwcHRleHR1cmVtYW5hZ2VyJztcbmltcG9ydCB7IExBcHBMaXZlMkRNYW5hZ2VyIH0gZnJvbSAnLi9sYXBwbGl2ZTJkbWFuYWdlcic7XG5pbXBvcnQgKiBhcyBMQXBwRGVmaW5lIGZyb20gJy4vbGFwcGRlZmluZSc7XG5cbmV4cG9ydCBsZXQgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCA9IG51bGw7XG5leHBvcnQgbGV0IHNfaW5zdGFuY2U6IExBcHBEZWxlZ2F0ZSA9IG51bGw7XG5leHBvcnQgbGV0IGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQgPSBudWxsO1xuZXhwb3J0IGxldCBmcmFtZUJ1ZmZlcjogV2ViR0xGcmFtZWJ1ZmZlciA9IG51bGw7XG5cbi8qKlxuICog44Ki44OX44Oq44Kx44O844K344On44Oz44Kv44Op44K544CCXG4gKiBDdWJpc20gU0RL44Gu566h55CG44KS6KGM44GG44CCXG4gKi9cbmV4cG9ydCBjbGFzcyBMQXBwRGVsZWdhdGUge1xuICAvKipcbiAgICog44Kv44Op44K544Gu44Kk44Oz44K544K/44Oz44K577yI44K344Oz44Kw44Or44OI44Oz77yJ44KS6L+U44GZ44CCXG4gICAqIOOCpOODs+OCueOCv+ODs+OCueOBjOeUn+aIkOOBleOCjOOBpuOBhOOBquOBhOWgtOWQiOOBr+WGhemDqOOBp+OCpOODs+OCueOCv+ODs+OCueOCkueUn+aIkOOBmeOCi+OAglxuICAgKlxuICAgKiBAcmV0dXJuIOOCr+ODqeOCueOBruOCpOODs+OCueOCv+ODs+OCuVxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBMQXBwRGVsZWdhdGUge1xuICAgIGlmIChzX2luc3RhbmNlID09IG51bGwpIHtcbiAgICAgIHNfaW5zdGFuY2UgPSBuZXcgTEFwcERlbGVnYXRlKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNfaW5zdGFuY2U7XG4gIH1cblxuICAvKipcbiAgICog44Kv44Op44K544Gu44Kk44Oz44K544K/44Oz44K577yI44K344Oz44Kw44Or44OI44Oz77yJ44KS6Kej5pS+44GZ44KL44CCXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIHJlbGVhc2VJbnN0YW5jZSgpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZyhcInJlbGVhc2VJbnN0YW5jZVwiKVxuICAgIGlmIChzX2luc3RhbmNlICE9IG51bGwpIHtcbiAgICAgIHNfaW5zdGFuY2UucmVsZWFzZSgpO1xuICAgIH1cblxuICAgIHNfaW5zdGFuY2UgPSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIEFQUOOBq+W/heimgeOBqueJqeOCkuWIneacn+WMluOBmeOCi+OAglxuICAgKi9cbiAgcHVibGljIGluaXRpYWxpemUoKTogYm9vbGVhbiB7XG4gICAgLy8g44Kt44Oj44Oz44OQ44K544Gu5L2c5oiQXG4gICAgLy8gY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgLy8gY2FudmFzLndpZHRoID0gTEFwcERlZmluZS5SZW5kZXJUYXJnZXRXaWR0aDtcbiAgICAvLyBjYW52YXMuaGVpZ2h0ID0gTEFwcERlZmluZS5SZW5kZXJUYXJnZXRIZWlnaHQ7XG5cbiAgICAvLyAg5Y+W5raI5qGG5p625Y6f5pyJ55qEY2FudmFz55S75biD5bC65a+477yM54us56uL6K6+572u5bC65a+4XG4gICAgLy8gIOagueaNrmlk6I635Y+W6aG16Z2i6YeM55qEY2FudmFzXG4gICAgY2FudmFzID0gPEhUTUxDYW52YXNFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGl2ZTJkXCIpO1xuXG4gICAgLy/mt7vliqDlhajlsYDpvKDmoIfnp7vliqjkuovku7bnm5HmjqdcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIGZ1bmN0aW9uIChlKSB7XG5cbiAgICAgIGlmICghTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKCkuX3ZpZXcpIHtcbiAgICAgICAgTEFwcFBhbC5wcmludE1lc3NhZ2UoXCJ2aWV3IG5vdGZvdW5kXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2Uge1xuXG4gICAgICB9XG5cbiAgICAgIC8v6L+Z6YeMaWTnmoTlgLzkuI7kuIrmlrnnmoQgY2F2YW5zIOWPmOmHj+S/neaMgeS4gOiHtFxuICAgICAgbGV0IHJlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxpdmUyZFwiKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIGxldCBwb3NYOiBudW1iZXIgPSBlLmNsaWVudFggLSByZWN0LmxlZnQ7XG4gICAgICBsZXQgcG9zWTogbnVtYmVyID0gZS5jbGllbnRZIC0gcmVjdC50b3A7XG4gICAgICAvLyBjb25zb2xlLmxvZyhcIm9uTW91c2VNb3ZlZDogZ2F0ZeaWh+S7tuS4rXBvc1nlgLzkuLrvvJog44CQXCIrcG9zWStcIuOAkSAgY2FudmFz55qEdG9w6Led56a75Li677yaXCIrcmVjdC50b3ApO1xuICAgICAgTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKCkuX3ZpZXcub25Ub3VjaGVzTW92ZWQocG9zWCwgcG9zWSk7XG5cbiAgICB9LCBmYWxzZSk7XG5cbiAgICAvL+WcqOi/memHjOWKoOS4ium8oOagh+emu+W8gOa1j+iniOWZqOWQju+8jOS4gOWIh+W9kuS9jVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgLy/pvKDmoIfnprvlvIBkb2N1bWVudOWQju+8jOWwhuWFtuS9jee9rue9ruS4uu+8iDDvvIww77yJICBcbiAgICAgIGxldCBsaXZlMkRNYW5hZ2VyOiBMQXBwTGl2ZTJETWFuYWdlciA9IExBcHBMaXZlMkRNYW5hZ2VyLmdldEluc3RhbmNlKCk7XG4gICAgICBsaXZlMkRNYW5hZ2VyLm9uRHJhZygwLjAsIDAuMCk7XG4gICAgfSwgZmFsc2UpO1xuXG4gICAgLy/mt7vliqDpvKDmoIfngrnlh7vkuovku7ZcbiAgICAvL+ebkeWQrGNhdmFz55qE6byg5qCH54K55Ye75LqL5Lu2LOWmguaenOS9oOW4jOacm+WcqOm8oOagh+eCueWHu+mhtemdouWFg+e0oOWQjlxuICAgIC8v55yL5p2/5aiY5LiN5Zyo55yL5ZCR6byg5qCH77yM55u05Yiw5L2g5YaN5qyh56e75Yqo6byg5qCH77yM5oqK55uR5ZCs5LqL5Lu25a+56LGh5LuOY2FudmFz5o2i5oiQZG9jdW1lbnRcbiAgICBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICBjb25zb2xlLmxvZyhlKVxuICAgICAgaWYgKCFMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKS5fdmlldykge1xuICAgICAgICBMQXBwUGFsLnByaW50TWVzc2FnZShcInZpZXcgbm90Zm91bmRcIik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGxldCByZWN0ID0gY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgbGV0IHBvc1g6IG51bWJlciA9IGUuY2xpZW50WCAtIHJlY3QubGVmdDtcbiAgICAgIGxldCBwb3NZOiBudW1iZXIgPSBlLmNsaWVudFkgLSByZWN0LnRvcDtcbiAgICAgIC8vIGNvbnNvbGUubG9nKFwib25Nb3VzZU1vdmVkOiBnYXRl5paH5Lu25LitcG9zWeWAvOS4uu+8miDjgJBcIitwb3NZK1wi44CRICBjYW52YXPnmoR0b3Dot53nprvkuLrvvJpcIityZWN0LnRvcCk7XG4gICAgICAvL+WFtuWunuWwseaYr+eFp+aKhOS4iumdoueahO+8jOaKiuS4i+mdouS4pOihjOS7o+eggeWKoOS4ilxuICAgICAgTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKCkuX3ZpZXcub25Ub3VjaGVzQmVnYW4ocG9zWCwgcG9zWSk7XG4gICAgICBMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKS5fdmlldy5vblRvdWNoZXNFbmRlZChwb3NYLCBwb3NZKTtcbiAgICB9LCBmYWxzZSk7XG5cbiAgICAvLyBnbOOCs+ODs+ODhuOCreOCueODiOOCkuWIneacn+WMllxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBnbCA9IGNhbnZhcy5nZXRDb250ZXh0KCd3ZWJnbCcpIHx8IGNhbnZhcy5nZXRDb250ZXh0KCdleHBlcmltZW50YWwtd2ViZ2wnKTtcblxuICAgIGlmICghZ2wpIHtcbiAgICAgIGFsZXJ0KCdDYW5ub3QgaW5pdGlhbGl6ZSBXZWJHTC4gVGhpcyBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQuJyk7XG4gICAgICBnbCA9IG51bGw7XG5cbiAgICAgIGRvY3VtZW50LmJvZHkuaW5uZXJIVE1MID1cbiAgICAgICAgJ1RoaXMgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IHRoZSA8Y29kZT4mbHQ7Y2FudmFzJmd0OzwvY29kZT4gZWxlbWVudC4nO1xuXG4gICAgICAvLyBnbOWIneacn+WMluWkseaVl1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIOOCreODo+ODs+ODkOOCueOCkiBET00g44Gr6L+95YqgXG4gICAgLy8gZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjYW52YXMpO1xuXG4gICAgaWYgKCFmcmFtZUJ1ZmZlcikge1xuICAgICAgZnJhbWVCdWZmZXIgPSBnbC5nZXRQYXJhbWV0ZXIoZ2wuRlJBTUVCVUZGRVJfQklORElORyk7XG4gICAgfVxuXG4gICAgLy8g6YCP6YGO6Kit5a6aXG4gICAgZ2wuZW5hYmxlKGdsLkJMRU5EKTtcbiAgICBnbC5ibGVuZEZ1bmMoZ2wuU1JDX0FMUEhBLCBnbC5PTkVfTUlOVVNfU1JDX0FMUEhBKTtcblxuICAgIGNvbnN0IHN1cHBvcnRUb3VjaDogYm9vbGVhbiA9ICdvbnRvdWNoZW5kJyBpbiBjYW52YXM7XG5cbiAgICBpZiAoc3VwcG9ydFRvdWNoKSB7XG4gICAgICAvLyDjgr/jg4Pjg4HplqLpgKPjgrPjg7zjg6vjg5Djg4Pjgq/plqLmlbDnmbvpjLJcbiAgICAgIGNhbnZhcy5vbnRvdWNoc3RhcnQgPSBvblRvdWNoQmVnYW47XG4gICAgICBjYW52YXMub250b3VjaG1vdmUgPSBvblRvdWNoTW92ZWQ7XG4gICAgICBjYW52YXMub250b3VjaGVuZCA9IG9uVG91Y2hFbmRlZDtcbiAgICAgIGNhbnZhcy5vbnRvdWNoY2FuY2VsID0gb25Ub3VjaENhbmNlbDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8g44Oe44Km44K56Zai6YCj44Kz44O844Or44OQ44OD44Kv6Zai5pWw55m76YyyXG4gICAgICAvLyBjYW52YXMub25tb3VzZWRvd24gPSBvbkNsaWNrQmVnYW47XG4gICAgICAvLyBjYW52YXMub25tb3VzZW1vdmUgPSBvbk1vdXNlTW92ZWQ7XG4gICAgICAvLyBjYW52YXMub25tb3VzZXVwID0gb25DbGlja0VuZGVkO1xuICAgIH1cblxuICAgIC8vIEFwcFZpZXfjga7liJ3mnJ/ljJZcbiAgICB0aGlzLl92aWV3LmluaXRpYWxpemUoKTtcblxuICAgIC8vIEN1YmlzbSBTREvjga7liJ3mnJ/ljJZcbiAgICB0aGlzLmluaXRpYWxpemVDdWJpc20oKTtcblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIOino+aUvuOBmeOCi+OAglxuICAgKi9cbiAgcHVibGljIHJlbGVhc2UoKTogdm9pZCB7XG4gICAgdGhpcy5fdGV4dHVyZU1hbmFnZXIucmVsZWFzZSgpO1xuICAgIHRoaXMuX3RleHR1cmVNYW5hZ2VyID0gbnVsbDtcblxuICAgIHRoaXMuX3ZpZXcucmVsZWFzZSgpO1xuICAgIHRoaXMuX3ZpZXcgPSBudWxsO1xuXG4gICAgLy8g44Oq44K944O844K544KS6Kej5pS+XG4gICAgTEFwcExpdmUyRE1hbmFnZXIucmVsZWFzZUluc3RhbmNlKCk7XG5cbiAgICAvLyBDdWJpc20gU0RL44Gu6Kej5pS+XG4gICAgQ3NtX0N1YmlzbUZyYW1ld29yay5kaXNwb3NlKCk7XG4gIH1cblxuICAvKipcbiAgICog5a6f6KGM5Yem55CG44CCXG4gICAqL1xuICBwdWJsaWMgcnVuKCk6IHZvaWQge1xuICAgIC8vIOODoeOCpOODs+ODq+ODvOODl1xuICAgIGNvbnN0IGxvb3AgPSAoKTogdm9pZCA9PiB7XG4gICAgICAvLyDjgqTjg7Pjgrnjgr/jg7Pjgrnjga7mnInnhKHjga7norroqo1cbiAgICAgIC8vIOehruWumuacieaXoOWunuS+i1xuICAgICAgaWYgKHNfaW5zdGFuY2UgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIOaZgumWk+abtOaWsFxuICAgICAgTEFwcFBhbC51cGRhdGVUaW1lKCk7XG5cbiAgICAgIC8vIOeUu+mdouOBruWIneacn+WMllxuICAgICAgZ2wuY2xlYXJDb2xvcigwLjAsIDAuMCwgMC4wLCAwLjApO1xuXG4gICAgICAvLyDmt7Hluqbjg4bjgrnjg4jjgpLmnInlirnljJZcbiAgICAgIGdsLmVuYWJsZShnbC5ERVBUSF9URVNUKTtcblxuICAgICAgLy8g6L+R44GP44Gr44GC44KL54mp5L2T44Gv44CB6YGg44GP44Gr44GC44KL54mp5L2T44KS6KaG44GE6Zqg44GZXG4gICAgICBnbC5kZXB0aEZ1bmMoZ2wuTEVRVUFMKTtcblxuICAgICAgLy8g44Kr44Op44O844OQ44OD44OV44Kh44KE5rex5bqm44OQ44OD44OV44Kh44KS44Kv44Oq44Ki44GZ44KLXG4gICAgICBnbC5jbGVhcihnbC5DT0xPUl9CVUZGRVJfQklUIHwgZ2wuREVQVEhfQlVGRkVSX0JJVCk7XG5cbiAgICAgIGdsLmNsZWFyRGVwdGgoMS4wKTtcblxuICAgICAgLy8g6YCP6YGO6Kit5a6aXG4gICAgICBnbC5lbmFibGUoZ2wuQkxFTkQpO1xuICAgICAgZ2wuYmxlbmRGdW5jKGdsLlNSQ19BTFBIQSwgZ2wuT05FX01JTlVTX1NSQ19BTFBIQSk7XG5cbiAgICAgIC8vIOaPj+eUu+abtOaWsFxuICAgICAgdGhpcy5fdmlldy5yZW5kZXIoKTtcblxuICAgICAgLy8g44Or44O844OX44Gu44Gf44KB44Gr5YaN5biw5ZG844Gz5Ye644GXXG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCk7XG4gICAgfTtcbiAgICBsb29wKCk7XG4gIH1cblxuICAvKipcbiAgICog44K344Kn44O844OA44O844KS55m76Yyy44GZ44KL44CCXG4gICAqL1xuICBwdWJsaWMgY3JlYXRlU2hhZGVyKCk6IFdlYkdMUHJvZ3JhbSB7XG4gICAgLy8g44OQ44O844OG44OD44Kv44K544K344Kn44O844OA44O844Gu44Kz44Oz44OR44Kk44OrXG4gICAgY29uc3QgdmVydGV4U2hhZGVySWQgPSBnbC5jcmVhdGVTaGFkZXIoZ2wuVkVSVEVYX1NIQURFUik7XG5cbiAgICBpZiAodmVydGV4U2hhZGVySWQgPT0gbnVsbCkge1xuICAgICAgTEFwcFBhbC5wcmludE1lc3NhZ2UoJ2ZhaWxlZCB0byBjcmVhdGUgdmVydGV4U2hhZGVyJyk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCB2ZXJ0ZXhTaGFkZXI6IHN0cmluZyA9XG4gICAgICAncHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7JyArXG4gICAgICAnYXR0cmlidXRlIHZlYzMgcG9zaXRpb247JyArXG4gICAgICAnYXR0cmlidXRlIHZlYzIgdXY7JyArXG4gICAgICAndmFyeWluZyB2ZWMyIHZ1djsnICtcbiAgICAgICd2b2lkIG1haW4odm9pZCknICtcbiAgICAgICd7JyArXG4gICAgICAnICAgZ2xfUG9zaXRpb24gPSB2ZWM0KHBvc2l0aW9uLCAxLjApOycgK1xuICAgICAgJyAgIHZ1diA9IHV2OycgK1xuICAgICAgJ30nO1xuXG4gICAgZ2wuc2hhZGVyU291cmNlKHZlcnRleFNoYWRlcklkLCB2ZXJ0ZXhTaGFkZXIpO1xuICAgIGdsLmNvbXBpbGVTaGFkZXIodmVydGV4U2hhZGVySWQpO1xuXG4gICAgLy8g44OV44Op44Kw44Oh44Oz44OI44K344Kn44O844OA44Gu44Kz44Oz44OR44Kk44OrXG4gICAgY29uc3QgZnJhZ21lbnRTaGFkZXJJZCA9IGdsLmNyZWF0ZVNoYWRlcihnbC5GUkFHTUVOVF9TSEFERVIpO1xuXG4gICAgaWYgKGZyYWdtZW50U2hhZGVySWQgPT0gbnVsbCkge1xuICAgICAgTEFwcFBhbC5wcmludE1lc3NhZ2UoJ2ZhaWxlZCB0byBjcmVhdGUgZnJhZ21lbnRTaGFkZXInKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGZyYWdtZW50U2hhZGVyOiBzdHJpbmcgPVxuICAgICAgJ3ByZWNpc2lvbiBtZWRpdW1wIGZsb2F0OycgK1xuICAgICAgJ3ZhcnlpbmcgdmVjMiB2dXY7JyArXG4gICAgICAndW5pZm9ybSBzYW1wbGVyMkQgdGV4dHVyZTsnICtcbiAgICAgICd2b2lkIG1haW4odm9pZCknICtcbiAgICAgICd7JyArXG4gICAgICAnICAgZ2xfRnJhZ0NvbG9yID0gdGV4dHVyZTJEKHRleHR1cmUsIHZ1dik7JyArXG4gICAgICAnfSc7XG5cbiAgICBnbC5zaGFkZXJTb3VyY2UoZnJhZ21lbnRTaGFkZXJJZCwgZnJhZ21lbnRTaGFkZXIpO1xuICAgIGdsLmNvbXBpbGVTaGFkZXIoZnJhZ21lbnRTaGFkZXJJZCk7XG5cbiAgICAvLyDjg5fjg63jgrDjg6njg6Djgqrjg5bjgrjjgqfjgq/jg4jjga7kvZzmiJBcbiAgICBjb25zdCBwcm9ncmFtSWQgPSBnbC5jcmVhdGVQcm9ncmFtKCk7XG4gICAgZ2wuYXR0YWNoU2hhZGVyKHByb2dyYW1JZCwgdmVydGV4U2hhZGVySWQpO1xuICAgIGdsLmF0dGFjaFNoYWRlcihwcm9ncmFtSWQsIGZyYWdtZW50U2hhZGVySWQpO1xuXG4gICAgZ2wuZGVsZXRlU2hhZGVyKHZlcnRleFNoYWRlcklkKTtcbiAgICBnbC5kZWxldGVTaGFkZXIoZnJhZ21lbnRTaGFkZXJJZCk7XG5cbiAgICAvLyDjg6rjg7Pjgq9cbiAgICBnbC5saW5rUHJvZ3JhbShwcm9ncmFtSWQpO1xuXG4gICAgZ2wudXNlUHJvZ3JhbShwcm9ncmFtSWQpO1xuXG4gICAgcmV0dXJuIHByb2dyYW1JZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBWaWV35oOF5aCx44KS5Y+W5b6X44GZ44KL44CCXG4gICAqL1xuICBwdWJsaWMgZ2V0VmlldygpOiBMQXBwVmlldyB7XG4gICAgcmV0dXJuIHRoaXMuX3ZpZXc7XG4gIH1cblxuICBwdWJsaWMgZ2V0VGV4dHVyZU1hbmFnZXIoKTogTEFwcFRleHR1cmVNYW5hZ2VyIHtcbiAgICByZXR1cm4gdGhpcy5fdGV4dHVyZU1hbmFnZXI7XG4gIH1cblxuICAvKipcbiAgICog44Kz44Oz44K544OI44Op44Kv44K/XG4gICAqL1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl9jYXB0dXJlZCA9IGZhbHNlO1xuICAgIHRoaXMuX21vdXNlWCA9IDAuMDtcbiAgICB0aGlzLl9tb3VzZVkgPSAwLjA7XG4gICAgdGhpcy5faXNFbmQgPSBmYWxzZTtcblxuICAgIHRoaXMuX2N1YmlzbU9wdGlvbiA9IG5ldyBDc21fT3B0aW9uKCk7XG4gICAgdGhpcy5fdmlldyA9IG5ldyBMQXBwVmlldygpO1xuICAgIHRoaXMuX3RleHR1cmVNYW5hZ2VyID0gbmV3IExBcHBUZXh0dXJlTWFuYWdlcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIEN1YmlzbSBTREvjga7liJ3mnJ/ljJZcbiAgICovXG4gIHB1YmxpYyBpbml0aWFsaXplQ3ViaXNtKCk6IHZvaWQge1xuICAgIC8vIHNldHVwIGN1YmlzbVxuICAgIHRoaXMuX2N1YmlzbU9wdGlvbi5sb2dGdW5jdGlvbiA9IExBcHBQYWwucHJpbnRNZXNzYWdlO1xuICAgIHRoaXMuX2N1YmlzbU9wdGlvbi5sb2dnaW5nTGV2ZWwgPSBMQXBwRGVmaW5lLkN1YmlzbUxvZ2dpbmdMZXZlbDtcbiAgICBDc21fQ3ViaXNtRnJhbWV3b3JrLnN0YXJ0VXAodGhpcy5fY3ViaXNtT3B0aW9uKTtcblxuICAgIC8vIGluaXRpYWxpemUgY3ViaXNtXG4gICAgQ3NtX0N1YmlzbUZyYW1ld29yay5pbml0aWFsaXplKCk7XG5cbiAgICAvLyBsb2FkIG1vZGVsXG4gICAgTEFwcExpdmUyRE1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcblxuICAgIExBcHBQYWwudXBkYXRlVGltZSgpO1xuXG4gICAgdGhpcy5fdmlldy5pbml0aWFsaXplU3ByaXRlKCk7XG4gIH1cblxuICBfY3ViaXNtT3B0aW9uOiBDc21fT3B0aW9uOyAvLyBDdWJpc20gU0RLIE9wdGlvblxuICBfdmlldzogTEFwcFZpZXc7IC8vIFZpZXfmg4XloLFcbiAgX2NhcHR1cmVkOiBib29sZWFuOyAvLyDjgq/jg6rjg4Pjgq/jgZfjgabjgYTjgovjgYtcbiAgX21vdXNlWDogbnVtYmVyOyAvLyDjg57jgqbjgrlY5bqn5qiZXG4gIF9tb3VzZVk6IG51bWJlcjsgLy8g44Oe44Km44K5WeW6p+aomVxuICBfaXNFbmQ6IGJvb2xlYW47IC8vIEFQUOe1guS6huOBl+OBpuOBhOOCi+OBi1xuICBfdGV4dHVyZU1hbmFnZXI6IExBcHBUZXh0dXJlTWFuYWdlcjsgLy8g44OG44Kv44K544OB44Oj44Oe44ON44O844K444Oj44O8XG59XG5cbi8qKlxuICog44Kv44Oq44OD44Kv44GX44Gf44Go44GN44Gr5ZG844Gw44KM44KL44CCXG4gKi9cbmZ1bmN0aW9uIG9uQ2xpY2tCZWdhbihlOiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gIGlmICghTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKCkuX3ZpZXcpIHtcbiAgICBMQXBwUGFsLnByaW50TWVzc2FnZSgndmlldyBub3Rmb3VuZCcpO1xuICAgIHJldHVybjtcbiAgfVxuICBMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKS5fY2FwdHVyZWQgPSB0cnVlO1xuXG4gIGNvbnN0IHBvc1g6IG51bWJlciA9IGUucGFnZVg7XG4gIGNvbnN0IHBvc1k6IG51bWJlciA9IGUucGFnZVk7XG5cbiAgTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKCkuX3ZpZXcub25Ub3VjaGVzQmVnYW4ocG9zWCwgcG9zWSk7XG59XG5cbi8qKlxuICog44Oe44Km44K544Od44Kk44Oz44K/44GM5YuV44GE44Gf44KJ5ZG844Gw44KM44KL44CCXG4gKi9cbmZ1bmN0aW9uIG9uTW91c2VNb3ZlZChlOiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gIGlmICghTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKCkuX2NhcHR1cmVkKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKCFMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKS5fdmlldykge1xuICAgIExBcHBQYWwucHJpbnRNZXNzYWdlKCd2aWV3IG5vdGZvdW5kJyk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgcmVjdCA9IChlLnRhcmdldCBhcyBFbGVtZW50KS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgY29uc3QgcG9zWDogbnVtYmVyID0gZS5jbGllbnRYIC0gcmVjdC5sZWZ0O1xuICBjb25zdCBwb3NZOiBudW1iZXIgPSBlLmNsaWVudFkgLSByZWN0LnRvcDtcblxuICBMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKS5fdmlldy5vblRvdWNoZXNNb3ZlZChwb3NYLCBwb3NZKTtcbn1cblxuLyoqXG4gKiDjgq/jg6rjg4Pjgq/jgYzntYLkuobjgZfjgZ/jgonlkbzjgbDjgozjgovjgIJcbiAqL1xuZnVuY3Rpb24gb25DbGlja0VuZGVkKGU6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKCkuX2NhcHR1cmVkID0gZmFsc2U7XG4gIGlmICghTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKCkuX3ZpZXcpIHtcbiAgICBMQXBwUGFsLnByaW50TWVzc2FnZSgndmlldyBub3Rmb3VuZCcpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHJlY3QgPSAoZS50YXJnZXQgYXMgRWxlbWVudCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gIGNvbnN0IHBvc1g6IG51bWJlciA9IGUuY2xpZW50WCAtIHJlY3QubGVmdDtcbiAgY29uc3QgcG9zWTogbnVtYmVyID0gZS5jbGllbnRZIC0gcmVjdC50b3A7XG5cbiAgTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKCkuX3ZpZXcub25Ub3VjaGVzRW5kZWQocG9zWCwgcG9zWSk7XG59XG5cbi8qKlxuICog44K/44OD44OB44GX44Gf44Go44GN44Gr5ZG844Gw44KM44KL44CCXG4gKi9cbmZ1bmN0aW9uIG9uVG91Y2hCZWdhbihlOiBUb3VjaEV2ZW50KTogdm9pZCB7XG4gIGlmICghTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKCkuX3ZpZXcpIHtcbiAgICBMQXBwUGFsLnByaW50TWVzc2FnZSgndmlldyBub3Rmb3VuZCcpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIExBcHBEZWxlZ2F0ZS5nZXRJbnN0YW5jZSgpLl9jYXB0dXJlZCA9IHRydWU7XG5cbiAgY29uc3QgcG9zWCA9IGUuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVg7XG4gIGNvbnN0IHBvc1kgPSBlLmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VZO1xuXG4gIExBcHBEZWxlZ2F0ZS5nZXRJbnN0YW5jZSgpLl92aWV3Lm9uVG91Y2hlc0JlZ2FuKHBvc1gsIHBvc1kpO1xufVxuXG4vKipcbiAqIOOCueODr+OCpOODl+OBmeOCi+OBqOWRvOOBsOOCjOOCi+OAglxuICovXG5mdW5jdGlvbiBvblRvdWNoTW92ZWQoZTogVG91Y2hFdmVudCk6IHZvaWQge1xuICBpZiAoIUxBcHBEZWxlZ2F0ZS5nZXRJbnN0YW5jZSgpLl9jYXB0dXJlZCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmICghTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKCkuX3ZpZXcpIHtcbiAgICBMQXBwUGFsLnByaW50TWVzc2FnZSgndmlldyBub3Rmb3VuZCcpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHJlY3QgPSAoZS50YXJnZXQgYXMgRWxlbWVudCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgY29uc3QgcG9zWCA9IGUuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WCAtIHJlY3QubGVmdDtcbiAgY29uc3QgcG9zWSA9IGUuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WSAtIHJlY3QudG9wO1xuXG4gIExBcHBEZWxlZ2F0ZS5nZXRJbnN0YW5jZSgpLl92aWV3Lm9uVG91Y2hlc01vdmVkKHBvc1gsIHBvc1kpO1xufVxuXG4vKipcbiAqIOOCv+ODg+ODgeOBjOe1guS6huOBl+OBn+OCieWRvOOBsOOCjOOCi+OAglxuICovXG5mdW5jdGlvbiBvblRvdWNoRW5kZWQoZTogVG91Y2hFdmVudCk6IHZvaWQge1xuICBMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKS5fY2FwdHVyZWQgPSBmYWxzZTtcblxuICBpZiAoIUxBcHBEZWxlZ2F0ZS5nZXRJbnN0YW5jZSgpLl92aWV3KSB7XG4gICAgTEFwcFBhbC5wcmludE1lc3NhZ2UoJ3ZpZXcgbm90Zm91bmQnKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCByZWN0ID0gKGUudGFyZ2V0IGFzIEVsZW1lbnQpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gIGNvbnN0IHBvc1ggPSBlLmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFggLSByZWN0LmxlZnQ7XG4gIGNvbnN0IHBvc1kgPSBlLmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFkgLSByZWN0LnRvcDtcblxuICBMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKS5fdmlldy5vblRvdWNoZXNFbmRlZChwb3NYLCBwb3NZKTtcbn1cblxuLyoqXG4gKiDjgr/jg4Pjg4HjgYzjgq3jg6Pjg7Pjgrvjg6vjgZXjgozjgovjgajlkbzjgbDjgozjgovjgIJcbiAqL1xuZnVuY3Rpb24gb25Ub3VjaENhbmNlbChlOiBUb3VjaEV2ZW50KTogdm9pZCB7XG4gIExBcHBEZWxlZ2F0ZS5nZXRJbnN0YW5jZSgpLl9jYXB0dXJlZCA9IGZhbHNlO1xuXG4gIGlmICghTEFwcERlbGVnYXRlLmdldEluc3RhbmNlKCkuX3ZpZXcpIHtcbiAgICBMQXBwUGFsLnByaW50TWVzc2FnZSgndmlldyBub3Rmb3VuZCcpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHJlY3QgPSAoZS50YXJnZXQgYXMgRWxlbWVudCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgY29uc3QgcG9zWCA9IGUuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WCAtIHJlY3QubGVmdDtcbiAgY29uc3QgcG9zWSA9IGUuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WSAtIHJlY3QudG9wO1xuXG4gIExBcHBEZWxlZ2F0ZS5nZXRJbnN0YW5jZSgpLl92aWV3Lm9uVG91Y2hlc0VuZGVkKHBvc1gsIHBvc1kpO1xufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQoYykgTGl2ZTJEIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSB0aGUgTGl2ZTJEIE9wZW4gU29mdHdhcmUgbGljZW5zZVxuICogdGhhdCBjYW4gYmUgZm91bmQgYXQgaHR0cHM6Ly93d3cubGl2ZTJkLmNvbS9ldWxhL2xpdmUyZC1vcGVuLXNvZnR3YXJlLWxpY2Vuc2UtYWdyZWVtZW50X2VuLmh0bWwuXG4gKi9cblxuaW1wb3J0IHsgTGl2ZTJEQ3ViaXNtRnJhbWV3b3JrIGFzIGN1YmlzbW1hdHJpeDQ0IH0gZnJvbSAnLi4vRnJhbWV3b3JrL3NyYy9tYXRoL2N1YmlzbW1hdHJpeDQ0JztcbmltcG9ydCB7IExpdmUyREN1YmlzbUZyYW1ld29yayBhcyBjc212ZWN0b3IgfSBmcm9tICcuLi9GcmFtZXdvcmsvc3JjL3R5cGUvY3NtdmVjdG9yJztcbmltcG9ydCB7IExpdmUyREN1YmlzbUZyYW1ld29yayBhcyBhY3ViaXNtbW90aW9uIH0gZnJvbSAnLi4vRnJhbWV3b3JrL3NyYy9tb3Rpb24vYWN1YmlzbW1vdGlvbic7XG5pbXBvcnQgQ3NtX2NzbVZlY3RvciA9IGNzbXZlY3Rvci5jc21WZWN0b3I7XG5pbXBvcnQgQ3NtX0N1YmlzbU1hdHJpeDQ0ID0gY3ViaXNtbWF0cml4NDQuQ3ViaXNtTWF0cml4NDQ7XG5pbXBvcnQgQUN1YmlzbU1vdGlvbiA9IGFjdWJpc21tb3Rpb24uQUN1YmlzbU1vdGlvbjtcblxuaW1wb3J0IHsgTEFwcE1vZGVsIH0gZnJvbSAnLi9sYXBwbW9kZWwnO1xuaW1wb3J0IHsgTEFwcFBhbCB9IGZyb20gJy4vbGFwcHBhbCc7XG5pbXBvcnQgeyBjYW52YXMgfSBmcm9tICcuL2xhcHBkZWxlZ2F0ZSc7XG5pbXBvcnQgKiBhcyBMQXBwRGVmaW5lIGZyb20gJy4vbGFwcGRlZmluZSc7XG5cbmV4cG9ydCBsZXQgc19pbnN0YW5jZTogTEFwcExpdmUyRE1hbmFnZXIgPSBudWxsO1xuXG5sZXQgdGltZXIgPSBudWxsO1xuXG4vKipcbiAqIOOCteODs+ODl+ODq+OCouODl+ODquOCseODvOOCt+ODp+ODs+OBq+OBiuOBhOOBpkN1YmlzbU1vZGVs44KS566h55CG44GZ44KL44Kv44Op44K5XG4gKiDjg6Ljg4fjg6vnlJ/miJDjgajnoLTmo4TjgIHjgr/jg4Pjg5fjgqTjg5njg7Pjg4jjga7lh6bnkIbjgIHjg6Ljg4fjg6vliIfjgormm7/jgYjjgpLooYzjgYbjgIJcbiAqIOeuoeeQhuagt+acrOW6lOeUqOeoi+W6j+S4reeahEN1YmlzbU1vZGVs55qE57G7XG4gKiDov5vooYzmqKHlnovnlJ/miJDlkozlup/lvIPjgIHmir3lpLTkuovku7bnmoTlpITnkIbjgIHmqKHlnovliIfmjaLjgIJcbiAqL1xuZXhwb3J0IGNsYXNzIExBcHBMaXZlMkRNYW5hZ2VyIHtcbiAgLyoqXG4gICAqIOOCr+ODqeOCueOBruOCpOODs+OCueOCv+ODs+OCue+8iOOCt+ODs+OCsOODq+ODiOODs++8ieOCkui/lOOBmeOAglxuICAgKiDjgqTjg7Pjgrnjgr/jg7PjgrnjgYznlJ/miJDjgZXjgozjgabjgYTjgarjgYTloLTlkIjjga/lhoXpg6jjgafjgqTjg7Pjgrnjgr/jg7PjgrnjgpLnlJ/miJDjgZnjgovjgIJcbiAgICpcbiAgICogQHJldHVybiDjgq/jg6njgrnjga7jgqTjg7Pjgrnjgr/jg7PjgrlcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogTEFwcExpdmUyRE1hbmFnZXIge1xuICAgIGlmIChzX2luc3RhbmNlID09IG51bGwpIHtcbiAgICAgIHNfaW5zdGFuY2UgPSBuZXcgTEFwcExpdmUyRE1hbmFnZXIoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc19pbnN0YW5jZTtcbiAgfVxuXG4gIC8qKlxuICAgKiDjgq/jg6njgrnjga7jgqTjg7Pjgrnjgr/jg7PjgrnvvIjjgrfjg7PjgrDjg6vjg4jjg7PvvInjgpLop6PmlL7jgZnjgovjgIJcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgcmVsZWFzZUluc3RhbmNlKCk6IHZvaWQge1xuICAgIGlmIChzX2luc3RhbmNlICE9IG51bGwpIHtcbiAgICAgIHNfaW5zdGFuY2UgPSB2b2lkIDA7XG4gICAgfVxuXG4gICAgc19pbnN0YW5jZSA9IG51bGw7XG4gIH1cblxuICAvKipcbiAgICog54++5Zyo44Gu44K344O844Oz44Gn5L+d5oyB44GX44Gm44GE44KL44Oi44OH44Or44KS6L+U44GZ44CCXG4gICAqXG4gICAqIEBwYXJhbSBubyDjg6Ljg4fjg6vjg6rjgrnjg4jjga7jgqTjg7Pjg4fjg4Pjgq/jgrnlgKRcbiAgICogQHJldHVybiDjg6Ljg4fjg6vjga7jgqTjg7Pjgrnjgr/jg7PjgrnjgpLov5TjgZnjgILjgqTjg7Pjg4fjg4Pjgq/jgrnlgKTjgYznr4Tlm7LlpJbjga7loLTlkIjjga9OVUxM44KS6L+U44GZ44CCXG4gICAqL1xuICBwdWJsaWMgZ2V0TW9kZWwobm86IG51bWJlcik6IExBcHBNb2RlbCB7XG4gICAgaWYgKG5vIDwgdGhpcy5fbW9kZWxzLmdldFNpemUoKSkge1xuICAgICAgcmV0dXJuIHRoaXMuX21vZGVscy5hdChubyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvKipcbiAgICog54++5Zyo44Gu44K344O844Oz44Gn5L+d5oyB44GX44Gm44GE44KL44GZ44G544Gm44Gu44Oi44OH44Or44KS6Kej5pS+44GZ44KLXG4gICAqL1xuICBwdWJsaWMgcmVsZWFzZUFsbE1vZGVsKCk6IHZvaWQge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fbW9kZWxzLmdldFNpemUoKTsgaSsrKSB7XG4gICAgICB0aGlzLl9tb2RlbHMuYXQoaSkucmVsZWFzZSgpO1xuICAgICAgdGhpcy5fbW9kZWxzLnNldChpLCBudWxsKTtcbiAgICB9XG5cbiAgICB0aGlzLl9tb2RlbHMuY2xlYXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDnlLvpnaLjgpLjg4njg6njg4PjgrDjgZfjgZ/mmYLjga7lh6bnkIZcbiAgICpcbiAgICogQHBhcmFtIHgg55S76Z2i44GuWOW6p+aomVxuICAgKiBAcGFyYW0geSDnlLvpnaLjga5Z5bqn5qiZXG4gICAqL1xuICBwdWJsaWMgb25EcmFnKHg6IG51bWJlciwgeTogbnVtYmVyKTogdm9pZCB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9tb2RlbHMuZ2V0U2l6ZSgpOyBpKyspIHtcbiAgICAgIGNvbnN0IG1vZGVsOiBMQXBwTW9kZWwgPSB0aGlzLmdldE1vZGVsKGkpO1xuXG4gICAgICBpZiAobW9kZWwpIHtcbiAgICAgICAgbW9kZWwuc2V0RHJhZ2dpbmcoeCwgeSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIOeUu+mdouOCkuOCv+ODg+ODl+OBl+OBn+aZguOBruWHpueQhlxuICAgKlxuICAgKiBAcGFyYW0geCDnlLvpnaLjga5Y5bqn5qiZXG4gICAqIEBwYXJhbSB5IOeUu+mdouOBrlnluqfmqJlcbiAgICovXG4gIHB1YmxpYyBvblRhcCh4OiBudW1iZXIsIHk6IG51bWJlcik6IHZvaWQge1xuICAgIGlmIChMQXBwRGVmaW5lLkRlYnVnTG9nRW5hYmxlKSB7XG4gICAgICBMQXBwUGFsLnByaW50TWVzc2FnZShcbiAgICAgICAgYFtBUFBddGFwIHBvaW50OiB7eDogJHt4LnRvRml4ZWQoMil9IHk6ICR7eS50b0ZpeGVkKDIpfX1gXG4gICAgICApO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fbW9kZWxzLmdldFNpemUoKTsgaSsrKSB7XG4gICAgICBpZiAodGhpcy5fbW9kZWxzLmF0KGkpLmhpdFRlc3QoTEFwcERlZmluZS5IaXRBcmVhTmFtZUhlYWQsIHgsIHkpKSB7XG4gICAgICAgIGlmIChMQXBwRGVmaW5lLkRlYnVnTG9nRW5hYmxlKSB7XG4gICAgICAgICAgTEFwcFBhbC5wcmludE1lc3NhZ2UoXG4gICAgICAgICAgICBgW0FQUF1oaXQgYXJlYTogWyR7TEFwcERlZmluZS5IaXRBcmVhTmFtZUhlYWR9XWBcbiAgICAgICAgICApO1xuICAgICAgICAgIHRoaXMudGFsa1ByaW50KExBcHBEZWZpbmUuSGl0SGVhZExpc3RbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKkxBcHBEZWZpbmUuSGl0SGVhZExpc3QubGVuZ3RoKV0pXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbW9kZWxzLmF0KGkpLnNldFJhbmRvbUV4cHJlc3Npb24oKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5fbW9kZWxzLmF0KGkpLmhpdFRlc3QoTEFwcERlZmluZS5IaXRBcmVhTmFtZUJvZHksIHgsIHkpKSB7XG4gICAgICAgIGlmIChMQXBwRGVmaW5lLkRlYnVnTG9nRW5hYmxlKSB7XG4gICAgICAgICAgTEFwcFBhbC5wcmludE1lc3NhZ2UoXG4gICAgICAgICAgICBgW0FQUF1oaXQgYXJlYTogWyR7TEFwcERlZmluZS5IaXRBcmVhTmFtZUJvZHl9XWBcbiAgICAgICAgICApO1xuICAgICAgICAgIHRoaXMudGFsa1ByaW50KExBcHBEZWZpbmUuSGl0Qm9keUxpc3RbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKkxBcHBEZWZpbmUuSGl0Qm9keUxpc3QubGVuZ3RoKV0pXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbW9kZWxzXG4gICAgICAgICAgLmF0KGkpXG4gICAgICAgICAgLnN0YXJ0UmFuZG9tTW90aW9uKFxuICAgICAgICAgICAgTEFwcERlZmluZS5Nb3Rpb25Hcm91cFRhcEJvZHksXG4gICAgICAgICAgICBMQXBwRGVmaW5lLlByaW9yaXR5Tm9ybWFsLFxuICAgICAgICAgICAgdGhpcy5fZmluaXNoZWRNb3Rpb25cbiAgICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIOmhtemdouWxnuaAp+WPmOWMllxuICBwdWJsaWMgdGFsa1ByaW50KHByaW50OnN0cmluZyk6IHZvaWQge1xuICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgbGV0IHByaW50Tm93ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpdmUyZC1wcmludCcpO1xuICAgIHByaW50Tm93LmlubmVySFRNTCA9IHByaW50O1xuICAgIHByaW50Tm93LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBwcmludE5vdy5pbm5lckhUTUwgPSAnJztcbiAgICAgIHByaW50Tm93LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfSwgMjAwMCk7XG4gIH1cblxuICAvKipcbiAgICog55S76Z2i44KS5pu05paw44GZ44KL44Go44GN44Gu5Yem55CGXG4gICAqIOODouODh+ODq+OBruabtOaWsOWHpueQhuWPiuOBs+aPj+eUu+WHpueQhuOCkuihjOOBhlxuICAgKi9cbiAgcHVibGljIG9uVXBkYXRlKCk6IHZvaWQge1xuICAgIGxldCBwcm9qZWN0aW9uOiBDc21fQ3ViaXNtTWF0cml4NDQgPSBuZXcgQ3NtX0N1YmlzbU1hdHJpeDQ0KCk7XG5cbiAgICBjb25zdCB7IHdpZHRoLCBoZWlnaHQgfSA9IGNhbnZhcztcbiAgICBwcm9qZWN0aW9uLnNjYWxlKDEuMCwgd2lkdGggLyBoZWlnaHQpO1xuXG4gICAgaWYgKHRoaXMuX3ZpZXdNYXRyaXggIT0gbnVsbCkge1xuICAgICAgcHJvamVjdGlvbi5tdWx0aXBseUJ5TWF0cml4KHRoaXMuX3ZpZXdNYXRyaXgpO1xuICAgIH1cblxuICAgIGNvbnN0IHNhdmVQcm9qZWN0aW9uOiBDc21fQ3ViaXNtTWF0cml4NDQgPSBwcm9qZWN0aW9uLmNsb25lKCk7XG4gICAgY29uc3QgbW9kZWxDb3VudDogbnVtYmVyID0gdGhpcy5fbW9kZWxzLmdldFNpemUoKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbW9kZWxDb3VudDsgKytpKSB7XG4gICAgICBjb25zdCBtb2RlbDogTEFwcE1vZGVsID0gdGhpcy5nZXRNb2RlbChpKTtcbiAgICAgIHByb2plY3Rpb24gPSBzYXZlUHJvamVjdGlvbi5jbG9uZSgpO1xuXG4gICAgICBtb2RlbC51cGRhdGUoKTtcbiAgICAgIG1vZGVsLmRyYXcocHJvamVjdGlvbik7IC8vIOWPgueFp+a4oeOBl+OBquOBruOBp3Byb2plY3Rpb27jga/lpInos6rjgZnjgovjgIJcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICog5qyh44Gu44K344O844Oz44Gr5YiH44KK44GL44GI44KLXG4gICAqIOOCteODs+ODl+ODq+OCouODl+ODquOCseODvOOCt+ODp+ODs+OBp+OBr+ODouODh+ODq+OCu+ODg+ODiOOBruWIh+OCiuabv+OBiOOCkuihjOOBhuOAglxuICAgKi9cbiAgcHVibGljIG5leHRTY2VuZSgpOiB2b2lkIHtcbiAgICBjb25zdCBubzogbnVtYmVyID0gKHRoaXMuX3NjZW5lSW5kZXggKyAxKSAlIExBcHBEZWZpbmUuTW9kZWxEaXJTaXplO1xuICAgIHRoaXMuY2hhbmdlU2NlbmUobm8pO1xuICB9XG5cbiAgLyoqXG4gICAqIOOCt+ODvOODs+OCkuWIh+OCiuabv+OBiOOCi1xuICAgKiDjgrXjg7Pjg5fjg6vjgqLjg5fjg6rjgrHjg7zjgrfjg6fjg7Pjgafjga/jg6Ljg4fjg6vjgrvjg4Pjg4jjga7liIfjgormm7/jgYjjgpLooYzjgYbjgIJcbiAgICog6L2s5o2i6ZWc5aS0XG4gICAqIOWcqOagt+acrOW6lOeUqOeoi+W6j+S4reWIh+aNouaooeWei+mbhuOAglxuICAgKi9cbiAgcHVibGljIGNoYW5nZVNjZW5lKGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9zY2VuZUluZGV4ID0gaW5kZXg7XG4gICAgaWYgKExBcHBEZWZpbmUuRGVidWdMb2dFbmFibGUpIHtcbiAgICAgIExBcHBQYWwucHJpbnRNZXNzYWdlKGBbQVBQXW1vZGVsIGluZGV4OiAke3RoaXMuX3NjZW5lSW5kZXh9YCk7XG4gICAgfVxuXG4gICAgLy8gTW9kZWxEaXJbXeOBq+S/neaMgeOBl+OBn+ODh+OCo+ODrOOCr+ODiOODquWQjeOBi+OCiVxuICAgIC8vIG1vZGVsMy5qc29u44Gu44OR44K544KS5rG65a6a44GZ44KL44CCXG4gICAgLy8g44OH44Kj44Os44Kv44OI44Oq5ZCN44GobW9kZWwzLmpzb27jga7lkI3liY3jgpLkuIDoh7TjgZXjgZvjgabjgYrjgY/jgZPjgajjgIJcblxuICAgIC8vIFNTUuacjeWKoeerr+a4suafk+eahOaXtuWAme+8jOaXoOazleato+ehruivu+WPlui1hOa6kOOAguiAg+iZkeaKiuS4gOS4quWfuuehgOaooeWei+W9leWFpW5wbeWMhVxuICAgIGNvbnN0IG1vZGVsOiBzdHJpbmcgPSBMQXBwRGVmaW5lLk1vZGVsRGlyW2luZGV4XTtcbiAgICBjb25zdCBtb2RlbFBhdGg6IHN0cmluZyA9IExBcHBEZWZpbmUuUmVzb3VyY2VzUGF0aCArIG1vZGVsICsgJy8nO1xuICAgIGxldCBtb2RlbEpzb25OYW1lOiBzdHJpbmcgPSBMQXBwRGVmaW5lLk1vZGVsRGlyW2luZGV4XTtcbiAgICBtb2RlbEpzb25OYW1lICs9ICcubW9kZWwzLmpzb24nO1xuXG4gICAgdGhpcy5yZWxlYXNlQWxsTW9kZWwoKTtcbiAgICB0aGlzLl9tb2RlbHMucHVzaEJhY2sobmV3IExBcHBNb2RlbCgpKTtcbiAgICB0aGlzLl9tb2RlbHMuYXQoMCkubG9hZEFzc2V0cyhtb2RlbFBhdGgsIG1vZGVsSnNvbk5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIOOCs+ODs+OCueODiOODqeOCr+OCv1xuICAgKi9cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5fdmlld01hdHJpeCA9IG5ldyBDc21fQ3ViaXNtTWF0cml4NDQoKTtcbiAgICB0aGlzLl9tb2RlbHMgPSBuZXcgQ3NtX2NzbVZlY3RvcjxMQXBwTW9kZWw+KCk7XG4gICAgdGhpcy5fc2NlbmVJbmRleCA9IDA7XG4gICAgdGhpcy5jaGFuZ2VTY2VuZSh0aGlzLl9zY2VuZUluZGV4KTtcbiAgfVxuXG4gIF92aWV3TWF0cml4OiBDc21fQ3ViaXNtTWF0cml4NDQ7IC8vIOODouODh+ODq+aPj+eUu+OBq+eUqOOBhOOCi3ZpZXfooYzliJdcbiAgX21vZGVsczogQ3NtX2NzbVZlY3RvcjxMQXBwTW9kZWw+OyAvLyDjg6Ljg4fjg6vjgqTjg7Pjgrnjgr/jg7Pjgrnjga7jgrPjg7Pjg4bjg4pcbiAgX3NjZW5lSW5kZXg6IG51bWJlcjsgLy8g6KGo56S644GZ44KL44K344O844Oz44Gu44Kk44Oz44OH44OD44Kv44K55YCkXG4gIC8vIOODouODvOOCt+ODp+ODs+WGjeeUn+e1guS6huOBruOCs+ODvOODq+ODkOODg+OCr+mWouaVsFxuICBfZmluaXNoZWRNb3Rpb24gPSAoc2VsZjogQUN1YmlzbU1vdGlvbik6IHZvaWQgPT4ge1xuICAgIExBcHBQYWwucHJpbnRNZXNzYWdlKCdNb3Rpb24gRmluaXNoZWQ6Jyk7XG4gIH07XG59XG4iLCIvKipcbiAqIENvcHlyaWdodChjKSBMaXZlMkQgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IHRoZSBMaXZlMkQgT3BlbiBTb2Z0d2FyZSBsaWNlbnNlXG4gKiB0aGF0IGNhbiBiZSBmb3VuZCBhdCBodHRwczovL3d3dy5saXZlMmQuY29tL2V1bGEvbGl2ZTJkLW9wZW4tc29mdHdhcmUtbGljZW5zZS1hZ3JlZW1lbnRfZW4uaHRtbC5cbiAqL1xuXG5pbXBvcnQgeyBMaXZlMkRDdWJpc21GcmFtZXdvcmsgYXMgbGl2ZTJkY3ViaXNtZnJhbWV3b3JrIH0gZnJvbSAnLi4vRnJhbWV3b3JrL3NyYy9saXZlMmRjdWJpc21mcmFtZXdvcmsnO1xuaW1wb3J0IHsgTGl2ZTJEQ3ViaXNtRnJhbWV3b3JrIGFzIGN1YmlzbWlkIH0gZnJvbSAnLi4vRnJhbWV3b3JrL3NyYy9pZC9jdWJpc21pZCc7XG5pbXBvcnQgeyBMaXZlMkRDdWJpc21GcmFtZXdvcmsgYXMgY3ViaXNtdXNlcm1vZGVsIH0gZnJvbSAnLi4vRnJhbWV3b3JrL3NyYy9tb2RlbC9jdWJpc211c2VybW9kZWwnO1xuaW1wb3J0IHsgTGl2ZTJEQ3ViaXNtRnJhbWV3b3JrIGFzIGljdWJpc21tb2RlbHNldHRpbmcgfSBmcm9tICcuLi9GcmFtZXdvcmsvc3JjL2ljdWJpc21tb2RlbHNldHRpbmcnO1xuaW1wb3J0IHsgTGl2ZTJEQ3ViaXNtRnJhbWV3b3JrIGFzIGN1YmlzbW1vZGVsc2V0dGluZ2pzb24gfSBmcm9tICcuLi9GcmFtZXdvcmsvc3JjL2N1YmlzbW1vZGVsc2V0dGluZ2pzb24nO1xuaW1wb3J0IHsgTGl2ZTJEQ3ViaXNtRnJhbWV3b3JrIGFzIGN1YmlzbWRlZmF1bHRwYXJhbWV0ZXJpZCB9IGZyb20gJy4uL0ZyYW1ld29yay9zcmMvY3ViaXNtZGVmYXVsdHBhcmFtZXRlcmlkJztcbmltcG9ydCB7IExpdmUyREN1YmlzbUZyYW1ld29yayBhcyBhY3ViaXNtbW90aW9uIH0gZnJvbSAnLi4vRnJhbWV3b3JrL3NyYy9tb3Rpb24vYWN1YmlzbW1vdGlvbic7XG5pbXBvcnQgeyBMaXZlMkRDdWJpc21GcmFtZXdvcmsgYXMgY3ViaXNtZXllYmxpbmsgfSBmcm9tICcuLi9GcmFtZXdvcmsvc3JjL2VmZmVjdC9jdWJpc21leWVibGluayc7XG5pbXBvcnQgeyBMaXZlMkRDdWJpc21GcmFtZXdvcmsgYXMgY3ViaXNtYnJlYXRoIH0gZnJvbSAnLi4vRnJhbWV3b3JrL3NyYy9lZmZlY3QvY3ViaXNtYnJlYXRoJztcbmltcG9ydCB7IExpdmUyREN1YmlzbUZyYW1ld29yayBhcyBjc212ZWN0b3IgfSBmcm9tICcuLi9GcmFtZXdvcmsvc3JjL3R5cGUvY3NtdmVjdG9yJztcbmltcG9ydCB7IExpdmUyREN1YmlzbUZyYW1ld29yayBhcyBjc21tYXAgfSBmcm9tICcuLi9GcmFtZXdvcmsvc3JjL3R5cGUvY3NtbWFwJztcbmltcG9ydCB7IExpdmUyREN1YmlzbUZyYW1ld29yayBhcyBjdWJpc21tYXRyaXg0NCB9IGZyb20gJy4uL0ZyYW1ld29yay9zcmMvbWF0aC9jdWJpc21tYXRyaXg0NCc7XG5pbXBvcnQgeyBMaXZlMkRDdWJpc21GcmFtZXdvcmsgYXMgY3ViaXNtbW90aW9uIH0gZnJvbSAnLi4vRnJhbWV3b3JrL3NyYy9tb3Rpb24vY3ViaXNtbW90aW9uJztcbmltcG9ydCB7IExpdmUyREN1YmlzbUZyYW1ld29yayBhcyBjdWJpc21tb3Rpb25xdWV1ZW1hbmFnZXIgfSBmcm9tICcuLi9GcmFtZXdvcmsvc3JjL21vdGlvbi9jdWJpc21tb3Rpb25xdWV1ZW1hbmFnZXInO1xuaW1wb3J0IHsgTGl2ZTJEQ3ViaXNtRnJhbWV3b3JrIGFzIGNzbXN0cmluZyB9IGZyb20gJy4uL0ZyYW1ld29yay9zcmMvdHlwZS9jc21zdHJpbmcnO1xuaW1wb3J0IHsgTGl2ZTJEQ3ViaXNtRnJhbWV3b3JrIGFzIGNzbXJlY3QgfSBmcm9tICcuLi9GcmFtZXdvcmsvc3JjL3R5cGUvY3NtcmVjdGYnO1xuaW1wb3J0IHsgQ3ViaXNtTG9nSW5mbyB9IGZyb20gJy4uL0ZyYW1ld29yay9zcmMvdXRpbHMvY3ViaXNtZGVidWcnO1xuaW1wb3J0IGNzbVJlY3QgPSBjc21yZWN0LmNzbVJlY3Q7XG5pbXBvcnQgY3NtU3RyaW5nID0gY3Ntc3RyaW5nLmNzbVN0cmluZztcbmltcG9ydCBJbnZhbGlkTW90aW9uUXVldWVFbnRyeUhhbmRsZVZhbHVlID0gY3ViaXNtbW90aW9ucXVldWVtYW5hZ2VyLkludmFsaWRNb3Rpb25RdWV1ZUVudHJ5SGFuZGxlVmFsdWU7XG5pbXBvcnQgQ3ViaXNtTW90aW9uUXVldWVFbnRyeUhhbmRsZSA9IGN1YmlzbW1vdGlvbnF1ZXVlbWFuYWdlci5DdWJpc21Nb3Rpb25RdWV1ZUVudHJ5SGFuZGxlO1xuaW1wb3J0IEN1YmlzbU1vdGlvbiA9IGN1YmlzbW1vdGlvbi5DdWJpc21Nb3Rpb247XG5pbXBvcnQgQ3ViaXNtTWF0cml4NDQgPSBjdWJpc21tYXRyaXg0NC5DdWJpc21NYXRyaXg0NDtcbmltcG9ydCBjc21NYXAgPSBjc21tYXAuY3NtTWFwO1xuaW1wb3J0IGNzbVZlY3RvciA9IGNzbXZlY3Rvci5jc21WZWN0b3I7XG5pbXBvcnQgQ3ViaXNtQnJlYXRoID0gY3ViaXNtYnJlYXRoLkN1YmlzbUJyZWF0aDtcbmltcG9ydCBCcmVhdGhQYXJhbWV0ZXJEYXRhID0gY3ViaXNtYnJlYXRoLkJyZWF0aFBhcmFtZXRlckRhdGE7XG5pbXBvcnQgQ3ViaXNtRXllQmxpbmsgPSBjdWJpc21leWVibGluay5DdWJpc21FeWVCbGluaztcbmltcG9ydCBBQ3ViaXNtTW90aW9uID0gYWN1YmlzbW1vdGlvbi5BQ3ViaXNtTW90aW9uO1xuaW1wb3J0IEZpbmlzaGVkTW90aW9uQ2FsbGJhY2sgPSBhY3ViaXNtbW90aW9uLkZpbmlzaGVkTW90aW9uQ2FsbGJhY2s7XG5pbXBvcnQgQ3ViaXNtRnJhbWV3b3JrID0gbGl2ZTJkY3ViaXNtZnJhbWV3b3JrLkN1YmlzbUZyYW1ld29yaztcbmltcG9ydCBDdWJpc21JZEhhbmRsZSA9IGN1YmlzbWlkLkN1YmlzbUlkSGFuZGxlO1xuaW1wb3J0IEN1YmlzbVVzZXJNb2RlbCA9IGN1YmlzbXVzZXJtb2RlbC5DdWJpc21Vc2VyTW9kZWw7XG5pbXBvcnQgSUN1YmlzbU1vZGVsU2V0dGluZyA9IGljdWJpc21tb2RlbHNldHRpbmcuSUN1YmlzbU1vZGVsU2V0dGluZztcbmltcG9ydCBDdWJpc21Nb2RlbFNldHRpbmdKc29uID0gY3ViaXNtbW9kZWxzZXR0aW5nanNvbi5DdWJpc21Nb2RlbFNldHRpbmdKc29uO1xuaW1wb3J0IEN1YmlzbURlZmF1bHRQYXJhbWV0ZXJJZCA9IGN1YmlzbWRlZmF1bHRwYXJhbWV0ZXJpZDtcblxuaW1wb3J0IHsgTEFwcFBhbCB9IGZyb20gJy4vbGFwcHBhbCc7XG5pbXBvcnQgeyBnbCwgY2FudmFzLCBmcmFtZUJ1ZmZlciwgTEFwcERlbGVnYXRlIH0gZnJvbSAnLi9sYXBwZGVsZWdhdGUnO1xuaW1wb3J0IHsgVGV4dHVyZUluZm8gfSBmcm9tICcuL2xhcHB0ZXh0dXJlbWFuYWdlcic7XG5pbXBvcnQgKiBhcyBMQXBwRGVmaW5lIGZyb20gJy4vbGFwcGRlZmluZSc7XG5pbXBvcnQgJ3doYXR3Zy1mZXRjaCc7XG5cbmVudW0gTG9hZFN0ZXAge1xuICBMb2FkQXNzZXRzLFxuICBMb2FkTW9kZWwsXG4gIFdhaXRMb2FkTW9kZWwsXG4gIExvYWRFeHByZXNzaW9uLFxuICBXYWl0TG9hZEV4cHJlc3Npb24sXG4gIExvYWRQaHlzaWNzLFxuICBXYWl0TG9hZFBoeXNpY3MsXG4gIExvYWRQb3NlLFxuICBXYWl0TG9hZFBvc2UsXG4gIFNldHVwRXllQmxpbmssXG4gIFNldHVwQnJlYXRoLFxuICBMb2FkVXNlckRhdGEsXG4gIFdhaXRMb2FkVXNlckRhdGEsXG4gIFNldHVwRXllQmxpbmtJZHMsXG4gIFNldHVwTGlwU3luY0lkcyxcbiAgU2V0dXBMYXlvdXQsXG4gIExvYWRNb3Rpb24sXG4gIFdhaXRMb2FkTW90aW9uLFxuICBDb21wbGV0ZUluaXRpYWxpemUsXG4gIENvbXBsZXRlU2V0dXBNb2RlbCxcbiAgTG9hZFRleHR1cmUsXG4gIFdhaXRMb2FkVGV4dHVyZSxcbiAgQ29tcGxldGVTZXR1cFxufVxuXG4vKipcbiAqIOODpuODvOOCtuODvOOBjOWun+mam+OBq+S9v+eUqOOBmeOCi+ODouODh+ODq+OBruWun+ijheOCr+ODqeOCuTxicj5cbiAqIOODouODh+ODq+eUn+aIkOOAgeapn+iDveOCs+ODs+ODneODvOODjeODs+ODiOeUn+aIkOOAgeabtOaWsOWHpueQhuOBqOODrOODs+ODgOODquODs+OCsOOBruWRvOOBs+WHuuOBl+OCkuihjOOBhuOAglxuICovXG5leHBvcnQgY2xhc3MgTEFwcE1vZGVsIGV4dGVuZHMgQ3ViaXNtVXNlck1vZGVsIHtcbiAgLyoqXG4gICAqIG1vZGVsMy5qc29u44GM572u44GL44KM44Gf44OH44Kj44Os44Kv44OI44Oq44Go44OV44Kh44Kk44Or44OR44K544GL44KJ44Oi44OH44Or44KS55Sf5oiQ44GZ44KLXG4gICAqIEBwYXJhbSBkaXJcbiAgICogQHBhcmFtIGZpbGVOYW1lXG4gICAqL1xuICBwdWJsaWMgbG9hZEFzc2V0cyhkaXI6IHN0cmluZywgZmlsZU5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnNvbGUubG9nKCfotYTmupDot6/lvoQnLGRpcilcbiAgICB0aGlzLl9tb2RlbEhvbWVEaXIgPSBkaXI7XG4gICAgZmV0Y2goYCR7dGhpcy5fbW9kZWxIb21lRGlyfS8ke2ZpbGVOYW1lfWApXG4gICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5hcnJheUJ1ZmZlcigpKVxuICAgICAgLnRoZW4oYXJyYXlCdWZmZXIgPT4ge1xuICAgICAgICBjb25zdCBzZXR0aW5nOiBJQ3ViaXNtTW9kZWxTZXR0aW5nID0gbmV3IEN1YmlzbU1vZGVsU2V0dGluZ0pzb24oXG4gICAgICAgICAgYXJyYXlCdWZmZXIsXG4gICAgICAgICAgYXJyYXlCdWZmZXIuYnl0ZUxlbmd0aFxuICAgICAgICApO1xuXG4gICAgICAgIC8vIOOCueODhuODvOODiOOCkuabtOaWsFxuICAgICAgICB0aGlzLl9zdGF0ZSA9IExvYWRTdGVwLkxvYWRNb2RlbDtcblxuICAgICAgICAvLyDntZDmnpzjgpLkv53lrZhcbiAgICAgICAgdGhpcy5zZXR1cE1vZGVsKHNldHRpbmcpO1xuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogbW9kZWwzLmpzb27jgYvjgonjg6Ljg4fjg6vjgpLnlJ/miJDjgZnjgovjgIJcbiAgICogbW9kZWwzLmpzb27jga7oqJjov7DjgavlvpPjgaPjgabjg6Ljg4fjg6vnlJ/miJDjgIHjg6Ljg7zjgrfjg6fjg7PjgIHniannkIbmvJTnrpfjgarjganjga7jgrPjg7Pjg53jg7zjg43jg7Pjg4jnlJ/miJDjgpLooYzjgYbjgIJcbiAgICpcbiAgICogQHBhcmFtIHNldHRpbmcgSUN1YmlzbU1vZGVsU2V0dGluZ+OBruOCpOODs+OCueOCv+ODs+OCuVxuICAgKi9cbiAgcHJpdmF0ZSBzZXR1cE1vZGVsKHNldHRpbmc6IElDdWJpc21Nb2RlbFNldHRpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl91cGRhdGluZyA9IHRydWU7XG4gICAgdGhpcy5faW5pdGlhbGl6ZWQgPSBmYWxzZTtcblxuICAgIHRoaXMuX21vZGVsU2V0dGluZyA9IHNldHRpbmc7XG5cbiAgICAvLyBDdWJpc21Nb2RlbFxuICAgIGlmICh0aGlzLl9tb2RlbFNldHRpbmcuZ2V0TW9kZWxGaWxlTmFtZSgpICE9ICcnKSB7XG4gICAgICBjb25zdCBtb2RlbEZpbGVOYW1lID0gdGhpcy5fbW9kZWxTZXR0aW5nLmdldE1vZGVsRmlsZU5hbWUoKTtcblxuICAgICAgZmV0Y2goYCR7dGhpcy5fbW9kZWxIb21lRGlyfS8ke21vZGVsRmlsZU5hbWV9YClcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuYXJyYXlCdWZmZXIoKSlcbiAgICAgICAgLnRoZW4oYXJyYXlCdWZmZXIgPT4ge1xuICAgICAgICAgIHRoaXMubG9hZE1vZGVsKGFycmF5QnVmZmVyKTtcbiAgICAgICAgICB0aGlzLl9zdGF0ZSA9IExvYWRTdGVwLkxvYWRFeHByZXNzaW9uO1xuXG4gICAgICAgICAgLy8gY2FsbGJhY2tcbiAgICAgICAgICBsb2FkQ3ViaXNtRXhwcmVzc2lvbigpO1xuICAgICAgICB9KTtcblxuICAgICAgdGhpcy5fc3RhdGUgPSBMb2FkU3RlcC5XYWl0TG9hZE1vZGVsO1xuICAgIH0gZWxzZSB7XG4gICAgICBMQXBwUGFsLnByaW50TWVzc2FnZSgnTW9kZWwgZGF0YSBkb2VzIG5vdCBleGlzdC4nKTtcbiAgICB9XG5cbiAgICAvLyBFeHByZXNzaW9uXG4gICAgY29uc3QgbG9hZEN1YmlzbUV4cHJlc3Npb24gPSAoKTogdm9pZCA9PiB7XG4gICAgICBpZiAodGhpcy5fbW9kZWxTZXR0aW5nLmdldEV4cHJlc3Npb25Db3VudCgpID4gMCkge1xuICAgICAgICBjb25zdCBjb3VudDogbnVtYmVyID0gdGhpcy5fbW9kZWxTZXR0aW5nLmdldEV4cHJlc3Npb25Db3VudCgpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgICAgIGNvbnN0IGV4cHJlc3Npb25OYW1lID0gdGhpcy5fbW9kZWxTZXR0aW5nLmdldEV4cHJlc3Npb25OYW1lKGkpO1xuICAgICAgICAgIGNvbnN0IGV4cHJlc3Npb25GaWxlTmFtZSA9IHRoaXMuX21vZGVsU2V0dGluZy5nZXRFeHByZXNzaW9uRmlsZU5hbWUoXG4gICAgICAgICAgICBpXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGZldGNoKGAke3RoaXMuX21vZGVsSG9tZURpcn0vJHtleHByZXNzaW9uRmlsZU5hbWV9YClcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmFycmF5QnVmZmVyKCkpXG4gICAgICAgICAgICAudGhlbihhcnJheUJ1ZmZlciA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IG1vdGlvbjogQUN1YmlzbU1vdGlvbiA9IHRoaXMubG9hZEV4cHJlc3Npb24oXG4gICAgICAgICAgICAgICAgYXJyYXlCdWZmZXIsXG4gICAgICAgICAgICAgICAgYXJyYXlCdWZmZXIuYnl0ZUxlbmd0aCxcbiAgICAgICAgICAgICAgICBleHByZXNzaW9uTmFtZVxuICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgIGlmICh0aGlzLl9leHByZXNzaW9ucy5nZXRWYWx1ZShleHByZXNzaW9uTmFtZSkgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIEFDdWJpc21Nb3Rpb24uZGVsZXRlKFxuICAgICAgICAgICAgICAgICAgdGhpcy5fZXhwcmVzc2lvbnMuZ2V0VmFsdWUoZXhwcmVzc2lvbk5hbWUpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9leHByZXNzaW9ucy5zZXRWYWx1ZShleHByZXNzaW9uTmFtZSwgbnVsbCk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICB0aGlzLl9leHByZXNzaW9ucy5zZXRWYWx1ZShleHByZXNzaW9uTmFtZSwgbW90aW9uKTtcblxuICAgICAgICAgICAgICB0aGlzLl9leHByZXNzaW9uQ291bnQrKztcblxuICAgICAgICAgICAgICBpZiAodGhpcy5fZXhwcmVzc2lvbkNvdW50ID49IGNvdW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3RhdGUgPSBMb2FkU3RlcC5Mb2FkUGh5c2ljcztcblxuICAgICAgICAgICAgICAgIC8vIGNhbGxiYWNrXG4gICAgICAgICAgICAgICAgbG9hZEN1YmlzbVBoeXNpY3MoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc3RhdGUgPSBMb2FkU3RlcC5XYWl0TG9hZEV4cHJlc3Npb247XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9zdGF0ZSA9IExvYWRTdGVwLkxvYWRQaHlzaWNzO1xuXG4gICAgICAgIC8vIGNhbGxiYWNrXG4gICAgICAgIGxvYWRDdWJpc21QaHlzaWNzKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIFBoeXNpY3NcbiAgICBjb25zdCBsb2FkQ3ViaXNtUGh5c2ljcyA9ICgpOiB2b2lkID0+IHtcbiAgICAgIGlmICh0aGlzLl9tb2RlbFNldHRpbmcuZ2V0UGh5c2ljc0ZpbGVOYW1lKCkgIT0gJycpIHtcbiAgICAgICAgY29uc3QgcGh5c2ljc0ZpbGVOYW1lID0gdGhpcy5fbW9kZWxTZXR0aW5nLmdldFBoeXNpY3NGaWxlTmFtZSgpO1xuXG4gICAgICAgIGZldGNoKGAke3RoaXMuX21vZGVsSG9tZURpcn0vJHtwaHlzaWNzRmlsZU5hbWV9YClcbiAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5hcnJheUJ1ZmZlcigpKVxuICAgICAgICAgIC50aGVuKGFycmF5QnVmZmVyID0+IHtcbiAgICAgICAgICAgIHRoaXMubG9hZFBoeXNpY3MoYXJyYXlCdWZmZXIsIGFycmF5QnVmZmVyLmJ5dGVMZW5ndGgpO1xuXG4gICAgICAgICAgICB0aGlzLl9zdGF0ZSA9IExvYWRTdGVwLkxvYWRQb3NlO1xuXG4gICAgICAgICAgICAvLyBjYWxsYmFja1xuICAgICAgICAgICAgbG9hZEN1YmlzbVBvc2UoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fc3RhdGUgPSBMb2FkU3RlcC5XYWl0TG9hZFBoeXNpY3M7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9zdGF0ZSA9IExvYWRTdGVwLkxvYWRQb3NlO1xuXG4gICAgICAgIC8vIGNhbGxiYWNrXG4gICAgICAgIGxvYWRDdWJpc21Qb3NlKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIFBvc2VcbiAgICBjb25zdCBsb2FkQ3ViaXNtUG9zZSA9ICgpOiB2b2lkID0+IHtcbiAgICAgIGlmICh0aGlzLl9tb2RlbFNldHRpbmcuZ2V0UG9zZUZpbGVOYW1lKCkgIT0gJycpIHtcbiAgICAgICAgY29uc3QgcG9zZUZpbGVOYW1lID0gdGhpcy5fbW9kZWxTZXR0aW5nLmdldFBvc2VGaWxlTmFtZSgpO1xuXG4gICAgICAgIGZldGNoKGAke3RoaXMuX21vZGVsSG9tZURpcn0vJHtwb3NlRmlsZU5hbWV9YClcbiAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5hcnJheUJ1ZmZlcigpKVxuICAgICAgICAgIC50aGVuKGFycmF5QnVmZmVyID0+IHtcbiAgICAgICAgICAgIHRoaXMubG9hZFBvc2UoYXJyYXlCdWZmZXIsIGFycmF5QnVmZmVyLmJ5dGVMZW5ndGgpO1xuXG4gICAgICAgICAgICB0aGlzLl9zdGF0ZSA9IExvYWRTdGVwLlNldHVwRXllQmxpbms7XG5cbiAgICAgICAgICAgIC8vIGNhbGxiYWNrXG4gICAgICAgICAgICBzZXR1cEV5ZUJsaW5rKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX3N0YXRlID0gTG9hZFN0ZXAuV2FpdExvYWRQb3NlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fc3RhdGUgPSBMb2FkU3RlcC5TZXR1cEV5ZUJsaW5rO1xuXG4gICAgICAgIC8vIGNhbGxiYWNrXG4gICAgICAgIHNldHVwRXllQmxpbmsoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gRXllQmxpbmtcbiAgICBjb25zdCBzZXR1cEV5ZUJsaW5rID0gKCk6IHZvaWQgPT4ge1xuICAgICAgaWYgKHRoaXMuX21vZGVsU2V0dGluZy5nZXRFeWVCbGlua1BhcmFtZXRlckNvdW50KCkgPiAwKSB7XG4gICAgICAgIHRoaXMuX2V5ZUJsaW5rID0gQ3ViaXNtRXllQmxpbmsuY3JlYXRlKHRoaXMuX21vZGVsU2V0dGluZyk7XG4gICAgICAgIHRoaXMuX3N0YXRlID0gTG9hZFN0ZXAuU2V0dXBCcmVhdGg7XG4gICAgICB9XG5cbiAgICAgIC8vIGNhbGxiYWNrXG4gICAgICBzZXR1cEJyZWF0aCgpO1xuICAgIH07XG5cbiAgICAvLyBCcmVhdGhcbiAgICBjb25zdCBzZXR1cEJyZWF0aCA9ICgpOiB2b2lkID0+IHtcbiAgICAgIHRoaXMuX2JyZWF0aCA9IEN1YmlzbUJyZWF0aC5jcmVhdGUoKTtcblxuICAgICAgY29uc3QgYnJlYXRoUGFyYW1ldGVyczogY3NtVmVjdG9yPEJyZWF0aFBhcmFtZXRlckRhdGE+ID0gbmV3IGNzbVZlY3RvcigpO1xuICAgICAgYnJlYXRoUGFyYW1ldGVycy5wdXNoQmFjayhcbiAgICAgICAgbmV3IEJyZWF0aFBhcmFtZXRlckRhdGEodGhpcy5faWRQYXJhbUFuZ2xlWCwgMC4wLCAxNS4wLCA2LjUzNDUsIDAuNSlcbiAgICAgICk7XG4gICAgICBicmVhdGhQYXJhbWV0ZXJzLnB1c2hCYWNrKFxuICAgICAgICBuZXcgQnJlYXRoUGFyYW1ldGVyRGF0YSh0aGlzLl9pZFBhcmFtQW5nbGVZLCAwLjAsIDguMCwgMy41MzQ1LCAwLjUpXG4gICAgICApO1xuICAgICAgYnJlYXRoUGFyYW1ldGVycy5wdXNoQmFjayhcbiAgICAgICAgbmV3IEJyZWF0aFBhcmFtZXRlckRhdGEodGhpcy5faWRQYXJhbUFuZ2xlWiwgMC4wLCAxMC4wLCA1LjUzNDUsIDAuNSlcbiAgICAgICk7XG4gICAgICBicmVhdGhQYXJhbWV0ZXJzLnB1c2hCYWNrKFxuICAgICAgICBuZXcgQnJlYXRoUGFyYW1ldGVyRGF0YSh0aGlzLl9pZFBhcmFtQm9keUFuZ2xlWCwgMC4wLCA0LjAsIDE1LjUzNDUsIDAuNSlcbiAgICAgICk7XG4gICAgICBicmVhdGhQYXJhbWV0ZXJzLnB1c2hCYWNrKFxuICAgICAgICBuZXcgQnJlYXRoUGFyYW1ldGVyRGF0YShcbiAgICAgICAgICBDdWJpc21GcmFtZXdvcmsuZ2V0SWRNYW5hZ2VyKCkuZ2V0SWQoXG4gICAgICAgICAgICBDdWJpc21EZWZhdWx0UGFyYW1ldGVySWQuUGFyYW1CcmVhdGhcbiAgICAgICAgICApLFxuICAgICAgICAgIDAuMCxcbiAgICAgICAgICAwLjUsXG4gICAgICAgICAgMy4yMzQ1LFxuICAgICAgICAgIDAuNVxuICAgICAgICApXG4gICAgICApO1xuXG4gICAgICB0aGlzLl9icmVhdGguc2V0UGFyYW1ldGVycyhicmVhdGhQYXJhbWV0ZXJzKTtcbiAgICAgIHRoaXMuX3N0YXRlID0gTG9hZFN0ZXAuTG9hZFVzZXJEYXRhO1xuXG4gICAgICAvLyBjYWxsYmFja1xuICAgICAgbG9hZFVzZXJEYXRhKCk7XG4gICAgfTtcblxuICAgIC8vIFVzZXJEYXRhXG4gICAgY29uc3QgbG9hZFVzZXJEYXRhID0gKCk6IHZvaWQgPT4ge1xuICAgICAgaWYgKHRoaXMuX21vZGVsU2V0dGluZy5nZXRVc2VyRGF0YUZpbGUoKSAhPSAnJykge1xuICAgICAgICBjb25zdCB1c2VyRGF0YUZpbGUgPSB0aGlzLl9tb2RlbFNldHRpbmcuZ2V0VXNlckRhdGFGaWxlKCk7XG5cbiAgICAgICAgZmV0Y2goYCR7dGhpcy5fbW9kZWxIb21lRGlyfS8ke3VzZXJEYXRhRmlsZX1gKVxuICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmFycmF5QnVmZmVyKCkpXG4gICAgICAgICAgLnRoZW4oYXJyYXlCdWZmZXIgPT4ge1xuICAgICAgICAgICAgdGhpcy5sb2FkVXNlckRhdGEoYXJyYXlCdWZmZXIsIGFycmF5QnVmZmVyLmJ5dGVMZW5ndGgpO1xuXG4gICAgICAgICAgICB0aGlzLl9zdGF0ZSA9IExvYWRTdGVwLlNldHVwRXllQmxpbmtJZHM7XG5cbiAgICAgICAgICAgIC8vIGNhbGxiYWNrXG4gICAgICAgICAgICBzZXR1cEV5ZUJsaW5rSWRzKCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5fc3RhdGUgPSBMb2FkU3RlcC5XYWl0TG9hZFVzZXJEYXRhO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fc3RhdGUgPSBMb2FkU3RlcC5TZXR1cEV5ZUJsaW5rSWRzO1xuXG4gICAgICAgIC8vIGNhbGxiYWNrXG4gICAgICAgIHNldHVwRXllQmxpbmtJZHMoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gRXllQmxpbmtJZHNcbiAgICBjb25zdCBzZXR1cEV5ZUJsaW5rSWRzID0gKCk6IHZvaWQgPT4ge1xuICAgICAgY29uc3QgZXllQmxpbmtJZENvdW50OiBudW1iZXIgPSB0aGlzLl9tb2RlbFNldHRpbmcuZ2V0RXllQmxpbmtQYXJhbWV0ZXJDb3VudCgpO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGV5ZUJsaW5rSWRDb3VudDsgKytpKSB7XG4gICAgICAgIHRoaXMuX2V5ZUJsaW5rSWRzLnB1c2hCYWNrKFxuICAgICAgICAgIHRoaXMuX21vZGVsU2V0dGluZy5nZXRFeWVCbGlua1BhcmFtZXRlcklkKGkpXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3N0YXRlID0gTG9hZFN0ZXAuU2V0dXBMaXBTeW5jSWRzO1xuXG4gICAgICAvLyBjYWxsYmFja1xuICAgICAgc2V0dXBMaXBTeW5jSWRzKCk7XG4gICAgfTtcblxuICAgIC8vIExpcFN5bmNJZHNcbiAgICBjb25zdCBzZXR1cExpcFN5bmNJZHMgPSAoKTogdm9pZCA9PiB7XG4gICAgICBjb25zdCBsaXBTeW5jSWRDb3VudCA9IHRoaXMuX21vZGVsU2V0dGluZy5nZXRMaXBTeW5jUGFyYW1ldGVyQ291bnQoKTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXBTeW5jSWRDb3VudDsgKytpKSB7XG4gICAgICAgIHRoaXMuX2xpcFN5bmNJZHMucHVzaEJhY2sodGhpcy5fbW9kZWxTZXR0aW5nLmdldExpcFN5bmNQYXJhbWV0ZXJJZChpKSk7XG4gICAgICB9XG4gICAgICB0aGlzLl9zdGF0ZSA9IExvYWRTdGVwLlNldHVwTGF5b3V0O1xuXG4gICAgICAvLyBjYWxsYmFja1xuICAgICAgc2V0dXBMYXlvdXQoKTtcbiAgICB9O1xuXG4gICAgLy8gTGF5b3V0XG4gICAgY29uc3Qgc2V0dXBMYXlvdXQgPSAoKTogdm9pZCA9PiB7XG4gICAgICBjb25zdCBsYXlvdXQ6IGNzbU1hcDxzdHJpbmcsIG51bWJlcj4gPSBuZXcgY3NtTWFwPHN0cmluZywgbnVtYmVyPigpO1xuICAgICAgdGhpcy5fbW9kZWxTZXR0aW5nLmdldExheW91dE1hcChsYXlvdXQpO1xuICAgICAgdGhpcy5fbW9kZWxNYXRyaXguc2V0dXBGcm9tTGF5b3V0KGxheW91dCk7XG4gICAgICB0aGlzLl9zdGF0ZSA9IExvYWRTdGVwLkxvYWRNb3Rpb247XG5cbiAgICAgIC8vIGNhbGxiYWNrXG4gICAgICBsb2FkQ3ViaXNtTW90aW9uKCk7XG4gICAgfTtcblxuICAgIC8vIE1vdGlvblxuICAgIGNvbnN0IGxvYWRDdWJpc21Nb3Rpb24gPSAoKTogdm9pZCA9PiB7XG4gICAgICB0aGlzLl9zdGF0ZSA9IExvYWRTdGVwLldhaXRMb2FkTW90aW9uO1xuICAgICAgdGhpcy5fbW9kZWwuc2F2ZVBhcmFtZXRlcnMoKTtcbiAgICAgIHRoaXMuX2FsbE1vdGlvbkNvdW50ID0gMDtcbiAgICAgIHRoaXMuX21vdGlvbkNvdW50ID0gMDtcbiAgICAgIGNvbnN0IGdyb3VwOiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgICBjb25zdCBtb3Rpb25Hcm91cENvdW50OiBudW1iZXIgPSB0aGlzLl9tb2RlbFNldHRpbmcuZ2V0TW90aW9uR3JvdXBDb3VudCgpO1xuXG4gICAgICAvLyDjg6Ljg7zjgrfjg6fjg7Pjga7nt4/mlbDjgpLmsYLjgoHjgotcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbW90aW9uR3JvdXBDb3VudDsgaSsrKSB7XG4gICAgICAgIGdyb3VwW2ldID0gdGhpcy5fbW9kZWxTZXR0aW5nLmdldE1vdGlvbkdyb3VwTmFtZShpKTtcbiAgICAgICAgdGhpcy5fYWxsTW90aW9uQ291bnQgKz0gdGhpcy5fbW9kZWxTZXR0aW5nLmdldE1vdGlvbkNvdW50KGdyb3VwW2ldKTtcbiAgICAgIH1cblxuICAgICAgLy8g44Oi44O844K344On44Oz44Gu6Kqt44G/6L6844G/XG4gICAgICAvLyDoo4XlhaXliqjkvZxcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbW90aW9uR3JvdXBDb3VudDsgaSsrKSB7XG4gICAgICAgIHRoaXMucHJlTG9hZE1vdGlvbkdyb3VwKGdyb3VwW2ldKTtcbiAgICAgIH1cblxuICAgICAgLy8g44Oi44O844K344On44Oz44GM44Gq44GE5aC05ZCIXG4gICAgICBpZiAobW90aW9uR3JvdXBDb3VudCA9PSAwKSB7XG4gICAgICAgIHRoaXMuX3N0YXRlID0gTG9hZFN0ZXAuTG9hZFRleHR1cmU7XG5cbiAgICAgICAgLy8g5YWo44Gm44Gu44Oi44O844K344On44Oz44KS5YGc5q2i44GZ44KLXG4gICAgICAgIHRoaXMuX21vdGlvbk1hbmFnZXIuc3RvcEFsbE1vdGlvbnMoKTtcblxuICAgICAgICB0aGlzLl91cGRhdGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9pbml0aWFsaXplZCA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5jcmVhdGVSZW5kZXJlcigpO1xuICAgICAgICB0aGlzLnNldHVwVGV4dHVyZXMoKTtcbiAgICAgICAgdGhpcy5nZXRSZW5kZXJlcigpLnN0YXJ0VXAoZ2wpO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICog44OG44Kv44K544OB44Oj44Om44OL44OD44OI44Gr44OG44Kv44K544OB44Oj44KS44Ot44O844OJ44GZ44KLXG4gICAqL1xuICBwcml2YXRlIHNldHVwVGV4dHVyZXMoKTogdm9pZCB7XG4gICAgLy8gaVBob25l44Gn44Gu44Ki44Or44OV44Kh5ZOB6LOq5ZCR5LiK44Gu44Gf44KBVHlwZXNjcmlwdOOBp+OBr3ByZW11bHRpcGxpZWRBbHBoYeOCkuaOoeeUqFxuICAgIGNvbnN0IHVzZVByZW11bHRpcGx5ID0gdHJ1ZTtcblxuICAgIGlmICh0aGlzLl9zdGF0ZSA9PSBMb2FkU3RlcC5Mb2FkVGV4dHVyZSkge1xuICAgICAgLy8g44OG44Kv44K544OB44Oj6Kqt44G/6L6844G/55SoXG4gICAgICBjb25zdCB0ZXh0dXJlQ291bnQ6IG51bWJlciA9IHRoaXMuX21vZGVsU2V0dGluZy5nZXRUZXh0dXJlQ291bnQoKTtcblxuICAgICAgZm9yIChcbiAgICAgICAgbGV0IG1vZGVsVGV4dHVyZU51bWJlciA9IDA7XG4gICAgICAgIG1vZGVsVGV4dHVyZU51bWJlciA8IHRleHR1cmVDb3VudDtcbiAgICAgICAgbW9kZWxUZXh0dXJlTnVtYmVyKytcbiAgICAgICkge1xuICAgICAgICAvLyDjg4bjgq/jgrnjg4Hjg6PlkI3jgYznqbrmloflrZfjgaDjgaPjgZ/loLTlkIjjga/jg63jg7zjg4njg7vjg5DjgqTjg7Pjg4nlh6bnkIbjgpLjgrnjgq3jg4Pjg5dcbiAgICAgICAgaWYgKHRoaXMuX21vZGVsU2V0dGluZy5nZXRUZXh0dXJlRmlsZU5hbWUobW9kZWxUZXh0dXJlTnVtYmVyKSA9PSAnJykge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gV2ViR0zjga7jg4bjgq/jgrnjg4Hjg6Pjg6bjg4vjg4Pjg4jjgavjg4bjgq/jgrnjg4Hjg6PjgpLjg63jg7zjg4njgZnjgotcbiAgICAgICAgLy8g5ZyoV2ViR0znmoTnurnnkIbljZXlhYPkuK3liqDovb3nurnnkIZcbiAgICAgICAgbGV0IHRleHR1cmVQYXRoID0gdGhpcy5fbW9kZWxTZXR0aW5nLmdldFRleHR1cmVGaWxlTmFtZShcbiAgICAgICAgICBtb2RlbFRleHR1cmVOdW1iZXJcbiAgICAgICAgKTtcbiAgICAgICAgdGV4dHVyZVBhdGggPSB0aGlzLl9tb2RlbEhvbWVEaXIgKyB0ZXh0dXJlUGF0aDtcblxuICAgICAgICAvLyDjg63jg7zjg4nlrozkuobmmYLjgavlkbzjgbPlh7rjgZnjgrPjg7zjg6vjg5Djg4Pjgq/plqLmlbBcbiAgICAgICAgLy8g5Yqg6L295a6M5oiQ5pe26LCD55So55qE5Zue6LCD5Ye95pWwXG4gICAgICAgIGNvbnN0IG9uTG9hZCA9ICh0ZXh0dXJlSW5mbzogVGV4dHVyZUluZm8pOiB2b2lkID0+IHtcbiAgICAgICAgICB0aGlzLmdldFJlbmRlcmVyKCkuYmluZFRleHR1cmUobW9kZWxUZXh0dXJlTnVtYmVyLCB0ZXh0dXJlSW5mby5pZCk7XG5cbiAgICAgICAgICB0aGlzLl90ZXh0dXJlQ291bnQrKztcblxuICAgICAgICAgIGlmICh0aGlzLl90ZXh0dXJlQ291bnQgPj0gdGV4dHVyZUNvdW50KSB7XG4gICAgICAgICAgICAvLyDjg63jg7zjg4nlrozkuoZcbiAgICAgICAgICAgIHRoaXMuX3N0YXRlID0gTG9hZFN0ZXAuQ29tcGxldGVTZXR1cDtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8g6Kqt44G/6L6844G/XG4gICAgICAgIExBcHBEZWxlZ2F0ZS5nZXRJbnN0YW5jZSgpXG4gICAgICAgICAgLmdldFRleHR1cmVNYW5hZ2VyKClcbiAgICAgICAgICAuY3JlYXRlVGV4dHVyZUZyb21QbmdGaWxlKHRleHR1cmVQYXRoLCB1c2VQcmVtdWx0aXBseSwgb25Mb2FkKTtcbiAgICAgICAgdGhpcy5nZXRSZW5kZXJlcigpLnNldElzUHJlbXVsdGlwbGllZEFscGhhKHVzZVByZW11bHRpcGx5KTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fc3RhdGUgPSBMb2FkU3RlcC5XYWl0TG9hZFRleHR1cmU7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIOODrOODs+ODgOODqeOCkuWGjeani+evieOBmeOCi1xuICAgKi9cbiAgcHVibGljIHJlbG9hZFJlbmRlcmVyKCk6IHZvaWQge1xuICAgIHRoaXMuZGVsZXRlUmVuZGVyZXIoKTtcbiAgICB0aGlzLmNyZWF0ZVJlbmRlcmVyKCk7XG4gICAgdGhpcy5zZXR1cFRleHR1cmVzKCk7XG4gIH1cblxuICAvKipcbiAgICog5pu05pawXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9zdGF0ZSAhPSBMb2FkU3RlcC5Db21wbGV0ZVNldHVwKSByZXR1cm47XG5cbiAgICBjb25zdCBkZWx0YVRpbWVTZWNvbmRzOiBudW1iZXIgPSBMQXBwUGFsLmdldERlbHRhVGltZSgpO1xuICAgIHRoaXMuX3VzZXJUaW1lU2Vjb25kcyArPSBkZWx0YVRpbWVTZWNvbmRzO1xuXG4gICAgdGhpcy5fZHJhZ01hbmFnZXIudXBkYXRlKGRlbHRhVGltZVNlY29uZHMpO1xuICAgIHRoaXMuX2RyYWdYID0gdGhpcy5fZHJhZ01hbmFnZXIuZ2V0WCgpO1xuICAgIHRoaXMuX2RyYWdZID0gdGhpcy5fZHJhZ01hbmFnZXIuZ2V0WSgpO1xuXG4gICAgLy8g44Oi44O844K344On44Oz44Gr44KI44KL44OR44Op44Oh44O844K/5pu05paw44Gu5pyJ54ShXG4gICAgbGV0IG1vdGlvblVwZGF0ZWQgPSBmYWxzZTtcblxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICB0aGlzLl9tb2RlbC5sb2FkUGFyYW1ldGVycygpOyAvLyDliY3lm57jgrvjg7zjg5bjgZXjgozjgZ/nirbmhYvjgpLjg63jg7zjg4lcbiAgICBpZiAodGhpcy5fbW90aW9uTWFuYWdlci5pc0ZpbmlzaGVkKCkpIHtcbiAgICAgIC8vIOODouODvOOCt+ODp+ODs+OBruWGjeeUn+OBjOOBquOBhOWgtOWQiOOAgeW+heapn+ODouODvOOCt+ODp+ODs+OBruS4reOBi+OCieODqeODs+ODgOODoOOBp+WGjeeUn+OBmeOCi1xuICAgICAgdGhpcy5zdGFydFJhbmRvbU1vdGlvbihcbiAgICAgICAgTEFwcERlZmluZS5Nb3Rpb25Hcm91cElkbGUsXG4gICAgICAgIExBcHBEZWZpbmUuUHJpb3JpdHlJZGxlXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBtb3Rpb25VcGRhdGVkID0gdGhpcy5fbW90aW9uTWFuYWdlci51cGRhdGVNb3Rpb24oXG4gICAgICAgIHRoaXMuX21vZGVsLFxuICAgICAgICBkZWx0YVRpbWVTZWNvbmRzXG4gICAgICApOyAvLyDjg6Ljg7zjgrfjg6fjg7PjgpLmm7TmlrBcbiAgICB9XG4gICAgdGhpcy5fbW9kZWwuc2F2ZVBhcmFtZXRlcnMoKTsgLy8g54q25oWL44KS5L+d5a2YXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLy8g44G+44Gw44Gf44GNXG4gICAgaWYgKCFtb3Rpb25VcGRhdGVkKSB7XG4gICAgICBpZiAodGhpcy5fZXllQmxpbmsgIT0gbnVsbCkge1xuICAgICAgICAvLyDjg6HjgqTjg7Pjg6Ljg7zjgrfjg6fjg7Pjga7mm7TmlrDjgYzjgarjgYTjgajjgY1cbiAgICAgICAgdGhpcy5fZXllQmxpbmsudXBkYXRlUGFyYW1ldGVycyh0aGlzLl9tb2RlbCwgZGVsdGFUaW1lU2Vjb25kcyk7IC8vIOebruODkeODgVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLl9leHByZXNzaW9uTWFuYWdlciAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9leHByZXNzaW9uTWFuYWdlci51cGRhdGVNb3Rpb24odGhpcy5fbW9kZWwsIGRlbHRhVGltZVNlY29uZHMpOyAvLyDooajmg4Xjgafjg5Hjg6njg6Hjg7zjgr/mm7TmlrDvvIjnm7jlr77lpInljJbvvIlcbiAgICB9XG5cbiAgICAvLyDjg4njg6njg4PjgrDjgavjgojjgovlpInljJZcbiAgICAvLyDjg4njg6njg4PjgrDjgavjgojjgovpoZTjga7lkJHjgY3jga7oqr/mlbRcbiAgICB0aGlzLl9tb2RlbC5hZGRQYXJhbWV0ZXJWYWx1ZUJ5SWQodGhpcy5faWRQYXJhbUFuZ2xlWCwgdGhpcy5fZHJhZ1ggKiAzMCk7IC8vIC0zMOOBi+OCiTMw44Gu5YCk44KS5Yqg44GI44KLXG4gICAgdGhpcy5fbW9kZWwuYWRkUGFyYW1ldGVyVmFsdWVCeUlkKHRoaXMuX2lkUGFyYW1BbmdsZVksIHRoaXMuX2RyYWdZICogMzApO1xuICAgIHRoaXMuX21vZGVsLmFkZFBhcmFtZXRlclZhbHVlQnlJZChcbiAgICAgIHRoaXMuX2lkUGFyYW1BbmdsZVosXG4gICAgICB0aGlzLl9kcmFnWCAqIHRoaXMuX2RyYWdZICogLTMwXG4gICAgKTtcblxuICAgIC8vIOODieODqeODg+OCsOOBq+OCiOOCi+S9k+OBruWQkeOBjeOBruiqv+aVtFxuICAgIHRoaXMuX21vZGVsLmFkZFBhcmFtZXRlclZhbHVlQnlJZChcbiAgICAgIHRoaXMuX2lkUGFyYW1Cb2R5QW5nbGVYLFxuICAgICAgdGhpcy5fZHJhZ1ggKiAxMFxuICAgICk7IC8vIC0xMOOBi+OCiTEw44Gu5YCk44KS5Yqg44GI44KLXG5cbiAgICAvLyDjg4njg6njg4PjgrDjgavjgojjgovnm67jga7lkJHjgY3jga7oqr/mlbRcbiAgICB0aGlzLl9tb2RlbC5hZGRQYXJhbWV0ZXJWYWx1ZUJ5SWQodGhpcy5faWRQYXJhbUV5ZUJhbGxYLCB0aGlzLl9kcmFnWCk7IC8vIC0x44GL44KJMeOBruWApOOCkuWKoOOBiOOCi1xuICAgIHRoaXMuX21vZGVsLmFkZFBhcmFtZXRlclZhbHVlQnlJZCh0aGlzLl9pZFBhcmFtRXllQmFsbFksIHRoaXMuX2RyYWdZKTtcblxuICAgIC8vIOWRvOWQuOOBquOBqVxuICAgIGlmICh0aGlzLl9icmVhdGggIT0gbnVsbCkge1xuICAgICAgdGhpcy5fYnJlYXRoLnVwZGF0ZVBhcmFtZXRlcnModGhpcy5fbW9kZWwsIGRlbHRhVGltZVNlY29uZHMpO1xuICAgIH1cblxuICAgIC8vIOeJqeeQhua8lOeul+OBruioreWumlxuICAgIGlmICh0aGlzLl9waHlzaWNzICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX3BoeXNpY3MuZXZhbHVhdGUodGhpcy5fbW9kZWwsIGRlbHRhVGltZVNlY29uZHMpO1xuICAgIH1cblxuICAgIC8vIOODquODg+ODl+OCt+ODs+OCr+OBruioreWumlxuICAgIGlmICh0aGlzLl9saXBzeW5jKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IDA7IC8vIOODquOCouODq+OCv+OCpOODoOOBp+ODquODg+ODl+OCt+ODs+OCr+OCkuihjOOBhuWgtOWQiOOAgeOCt+OCueODhuODoOOBi+OCiemfs+mHj+OCkuWPluW+l+OBl+OBpuOAgTB+MeOBruevhOWbsuOBp+WApOOCkuWFpeWKm+OBl+OBvuOBmeOAglxuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2xpcFN5bmNJZHMuZ2V0U2l6ZSgpOyArK2kpIHtcbiAgICAgICAgdGhpcy5fbW9kZWwuYWRkUGFyYW1ldGVyVmFsdWVCeUlkKHRoaXMuX2xpcFN5bmNJZHMuYXQoaSksIHZhbHVlLCAwLjgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIOODneODvOOCuuOBruioreWumlxuICAgIGlmICh0aGlzLl9wb3NlICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX3Bvc2UudXBkYXRlUGFyYW1ldGVycyh0aGlzLl9tb2RlbCwgZGVsdGFUaW1lU2Vjb25kcyk7XG4gICAgfVxuXG4gICAgdGhpcy5fbW9kZWwudXBkYXRlKCk7XG4gIH1cblxuICAvKipcbiAgICog5byV5pWw44Gn5oyH5a6a44GX44Gf44Oi44O844K344On44Oz44Gu5YaN55Sf44KS6ZaL5aeL44GZ44KLXG4gICAqIEBwYXJhbSBncm91cCDjg6Ljg7zjgrfjg6fjg7PjgrDjg6vjg7zjg5flkI1cbiAgICogQHBhcmFtIG5vIOOCsOODq+ODvOODl+WGheOBrueVquWPt1xuICAgKiBAcGFyYW0gcHJpb3JpdHkg5YSq5YWI5bqmXG4gICAqIEBwYXJhbSBvbkZpbmlzaGVkTW90aW9uSGFuZGxlciDjg6Ljg7zjgrfjg6fjg7Plho3nlJ/ntYLkuobmmYLjgavlkbzjgbPlh7rjgZXjgozjgovjgrPjg7zjg6vjg5Djg4Pjgq/plqLmlbBcbiAgICogQHJldHVybiDplovlp4vjgZfjgZ/jg6Ljg7zjgrfjg6fjg7Pjga7orZjliKXnlarlj7fjgpLov5TjgZnjgILlgIvliKXjga7jg6Ljg7zjgrfjg6fjg7PjgYzntYLkuobjgZfjgZ/jgYvlkKbjgYvjgpLliKTlrprjgZnjgotpc0ZpbmlzaGVkKCnjga7lvJXmlbDjgafkvb/nlKjjgZnjgovjgILplovlp4vjgafjgY3jgarjgYTmmYLjga9bLTFdXG4gICAqL1xuICBwdWJsaWMgc3RhcnRNb3Rpb24oXG4gICAgZ3JvdXA6IHN0cmluZyxcbiAgICBubzogbnVtYmVyLFxuICAgIHByaW9yaXR5OiBudW1iZXIsXG4gICAgb25GaW5pc2hlZE1vdGlvbkhhbmRsZXI/OiBGaW5pc2hlZE1vdGlvbkNhbGxiYWNrXG4gICk6IEN1YmlzbU1vdGlvblF1ZXVlRW50cnlIYW5kbGUge1xuICAgIGlmIChwcmlvcml0eSA9PSBMQXBwRGVmaW5lLlByaW9yaXR5Rm9yY2UpIHtcbiAgICAgIHRoaXMuX21vdGlvbk1hbmFnZXIuc2V0UmVzZXJ2ZVByaW9yaXR5KHByaW9yaXR5KTtcbiAgICB9IGVsc2UgaWYgKCF0aGlzLl9tb3Rpb25NYW5hZ2VyLnJlc2VydmVNb3Rpb24ocHJpb3JpdHkpKSB7XG4gICAgICBpZiAodGhpcy5fZGVidWdNb2RlKSB7XG4gICAgICAgIExBcHBQYWwucHJpbnRNZXNzYWdlKFwiW0FQUF1jYW4ndCBzdGFydCBtb3Rpb24uXCIpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIEludmFsaWRNb3Rpb25RdWV1ZUVudHJ5SGFuZGxlVmFsdWU7XG4gICAgfVxuXG4gICAgY29uc3QgbW90aW9uRmlsZU5hbWUgPSB0aGlzLl9tb2RlbFNldHRpbmcuZ2V0TW90aW9uRmlsZU5hbWUoZ3JvdXAsIG5vKTtcblxuICAgIC8vIGV4KSBpZGxlXzBcbiAgICBjb25zdCBuYW1lID0gYCR7Z3JvdXB9XyR7bm99YDtcbiAgICBsZXQgbW90aW9uOiBDdWJpc21Nb3Rpb24gPSB0aGlzLl9tb3Rpb25zLmdldFZhbHVlKG5hbWUpIGFzIEN1YmlzbU1vdGlvbjtcbiAgICBsZXQgYXV0b0RlbGV0ZSA9IGZhbHNlO1xuXG4gICAgaWYgKG1vdGlvbiA9PSBudWxsKSB7XG4gICAgICBmZXRjaChgJHt0aGlzLl9tb2RlbEhvbWVEaXJ9LyR7bW90aW9uRmlsZU5hbWV9YClcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuYXJyYXlCdWZmZXIoKSlcbiAgICAgICAgLnRoZW4oYXJyYXlCdWZmZXIgPT4ge1xuICAgICAgICAgIG1vdGlvbiA9IHRoaXMubG9hZE1vdGlvbihcbiAgICAgICAgICAgIGFycmF5QnVmZmVyLFxuICAgICAgICAgICAgYXJyYXlCdWZmZXIuYnl0ZUxlbmd0aCxcbiAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICBvbkZpbmlzaGVkTW90aW9uSGFuZGxlclxuICAgICAgICAgICk7XG4gICAgICAgICAgbGV0IGZhZGVUaW1lOiBudW1iZXIgPSB0aGlzLl9tb2RlbFNldHRpbmcuZ2V0TW90aW9uRmFkZUluVGltZVZhbHVlKFxuICAgICAgICAgICAgZ3JvdXAsXG4gICAgICAgICAgICBub1xuICAgICAgICAgICk7XG5cbiAgICAgICAgICBpZiAoZmFkZVRpbWUgPj0gMC4wKSB7XG4gICAgICAgICAgICBtb3Rpb24uc2V0RmFkZUluVGltZShmYWRlVGltZSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZmFkZVRpbWUgPSB0aGlzLl9tb2RlbFNldHRpbmcuZ2V0TW90aW9uRmFkZU91dFRpbWVWYWx1ZShncm91cCwgbm8pO1xuICAgICAgICAgIGlmIChmYWRlVGltZSA+PSAwLjApIHtcbiAgICAgICAgICAgIG1vdGlvbi5zZXRGYWRlT3V0VGltZShmYWRlVGltZSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbW90aW9uLnNldEVmZmVjdElkcyh0aGlzLl9leWVCbGlua0lkcywgdGhpcy5fbGlwU3luY0lkcyk7XG4gICAgICAgICAgYXV0b0RlbGV0ZSA9IHRydWU7IC8vIOe1guS6huaZguOBq+ODoeODouODquOBi+OCieWJiumZpFxuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgbW90aW9uLnNldEZpbmlzaGVkTW90aW9uSGFuZGxlcihvbkZpbmlzaGVkTW90aW9uSGFuZGxlcik7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2RlYnVnTW9kZSkge1xuICAgICAgTEFwcFBhbC5wcmludE1lc3NhZ2UoYFtBUFBdc3RhcnQgbW90aW9uOiBbJHtncm91cH1fJHtub31gKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX21vdGlvbk1hbmFnZXIuc3RhcnRNb3Rpb25Qcmlvcml0eShcbiAgICAgIG1vdGlvbixcbiAgICAgIGF1dG9EZWxldGUsXG4gICAgICBwcmlvcml0eVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICog44Op44Oz44OA44Og44Gr6YG444Gw44KM44Gf44Oi44O844K344On44Oz44Gu5YaN55Sf44KS6ZaL5aeL44GZ44KL44CCXG4gICAqIEBwYXJhbSBncm91cCDjg6Ljg7zjgrfjg6fjg7PjgrDjg6vjg7zjg5flkI1cbiAgICogQHBhcmFtIHByaW9yaXR5IOWEquWFiOW6plxuICAgKiBAcGFyYW0gb25GaW5pc2hlZE1vdGlvbkhhbmRsZXIg44Oi44O844K344On44Oz5YaN55Sf57WC5LqG5pmC44Gr5ZG844Gz5Ye644GV44KM44KL44Kz44O844Or44OQ44OD44Kv6Zai5pWwXG4gICAqIEBwYXJhbSBvbkZpbmlzaGVkTW90aW9uSGFuZGxlciDliqjkvZzlho3nlJ/nu5PmnZ/ml7bosIPnlKjnmoTlm57lkbzlh73mlbBcbiAgICogQHJldHVybiDplovlp4vjgZfjgZ/jg6Ljg7zjgrfjg6fjg7Pjga7orZjliKXnlarlj7fjgpLov5TjgZnjgILlgIvliKXjga7jg6Ljg7zjgrfjg6fjg7PjgYzntYLkuobjgZfjgZ/jgYvlkKbjgYvjgpLliKTlrprjgZnjgotpc0ZpbmlzaGVkKCnjga7lvJXmlbDjgafkvb/nlKjjgZnjgovjgILplovlp4vjgafjgY3jgarjgYTmmYLjga9bLTFdXG4gICAqIEByZXR1cm4g6L+U5Zue5byA5aeL5Yqo5L2c55qE6K+G5Yir5Y+356CB44CC55So5LqO5Yik5a6a5Liq5Yir5Yqo5L2c5piv5ZCm57uT5p2f55qEaXNGaW5pc2hlZO+8iO+8ieWPguaVsOOAguaXoOazleW8gOWni+aXtlstMV1cbiAgICovXG4gIHB1YmxpYyBzdGFydFJhbmRvbU1vdGlvbihcbiAgICBncm91cDogc3RyaW5nLFxuICAgIHByaW9yaXR5OiBudW1iZXIsXG4gICAgb25GaW5pc2hlZE1vdGlvbkhhbmRsZXI/OiBGaW5pc2hlZE1vdGlvbkNhbGxiYWNrXG4gICk6IEN1YmlzbU1vdGlvblF1ZXVlRW50cnlIYW5kbGUge1xuICAgIGlmICh0aGlzLl9tb2RlbFNldHRpbmcuZ2V0TW90aW9uQ291bnQoZ3JvdXApID09IDApIHtcbiAgICAgIHJldHVybiBJbnZhbGlkTW90aW9uUXVldWVFbnRyeUhhbmRsZVZhbHVlO1xuICAgIH1cblxuICAgIGNvbnN0IG5vOiBudW1iZXIgPSBNYXRoLmZsb29yKFxuICAgICAgTWF0aC5yYW5kb20oKSAqIHRoaXMuX21vZGVsU2V0dGluZy5nZXRNb3Rpb25Db3VudChncm91cClcbiAgICApO1xuXG4gICAgcmV0dXJuIHRoaXMuc3RhcnRNb3Rpb24oZ3JvdXAsIG5vLCBwcmlvcml0eSwgb25GaW5pc2hlZE1vdGlvbkhhbmRsZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIOW8leaVsOOBp+aMh+WumuOBl+OBn+ihqOaDheODouODvOOCt+ODp+ODs+OCkuOCu+ODg+ODiOOBmeOCi1xuICAgKlxuICAgKiBAcGFyYW0gZXhwcmVzc2lvbklkIOihqOaDheODouODvOOCt+ODp+ODs+OBrklEXG4gICAqL1xuICBwdWJsaWMgc2V0RXhwcmVzc2lvbihleHByZXNzaW9uSWQ6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IG1vdGlvbjogQUN1YmlzbU1vdGlvbiA9IHRoaXMuX2V4cHJlc3Npb25zLmdldFZhbHVlKGV4cHJlc3Npb25JZCk7XG5cbiAgICBpZiAodGhpcy5fZGVidWdNb2RlKSB7XG4gICAgICBMQXBwUGFsLnByaW50TWVzc2FnZShgW0FQUF1leHByZXNzaW9uOiBbJHtleHByZXNzaW9uSWR9XWApO1xuICAgIH1cblxuICAgIGlmIChtb3Rpb24gIT0gbnVsbCkge1xuICAgICAgdGhpcy5fZXhwcmVzc2lvbk1hbmFnZXIuc3RhcnRNb3Rpb25Qcmlvcml0eShcbiAgICAgICAgbW90aW9uLFxuICAgICAgICBmYWxzZSxcbiAgICAgICAgTEFwcERlZmluZS5Qcmlvcml0eUZvcmNlXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5fZGVidWdNb2RlKSB7XG4gICAgICAgIExBcHBQYWwucHJpbnRNZXNzYWdlKGBbQVBQXWV4cHJlc3Npb25bJHtleHByZXNzaW9uSWR9XSBpcyBudWxsYCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIOODqeODs+ODgOODoOOBq+mBuOOBsOOCjOOBn+ihqOaDheODouODvOOCt+ODp+ODs+OCkuOCu+ODg+ODiOOBmeOCi1xuICAgKi9cbiAgcHVibGljIHNldFJhbmRvbUV4cHJlc3Npb24oKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2V4cHJlc3Npb25zLmdldFNpemUoKSA9PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgbm86IG51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuX2V4cHJlc3Npb25zLmdldFNpemUoKSk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2V4cHJlc3Npb25zLmdldFNpemUoKTsgaSsrKSB7XG4gICAgICBpZiAoaSA9PSBubykge1xuICAgICAgICBjb25zdCBuYW1lOiBzdHJpbmcgPSB0aGlzLl9leHByZXNzaW9ucy5fa2V5VmFsdWVzW2ldLmZpcnN0O1xuICAgICAgICB0aGlzLnNldEV4cHJlc3Npb24obmFtZSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICog44Kk44OZ44Oz44OI44Gu55m654Gr44KS5Y+X44GR5Y+W44KLXG4gICAqL1xuICBwdWJsaWMgbW90aW9uRXZlbnRGaXJlZChldmVudFZhbHVlOiBjc21TdHJpbmcpOiB2b2lkIHtcbiAgICBDdWJpc21Mb2dJbmZvKCd7MH0gaXMgZmlyZWQgb24gTEFwcE1vZGVsISEnLCBldmVudFZhbHVlLnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIOW9k+OBn+OCiuWIpOWumuODhuOCueODiFxuICAgKiDmjIflrprvvKnvvKTjga7poILngrnjg6rjgrnjg4jjgYvjgonnn6nlvaLjgpLoqIjnrpfjgZfjgIHluqfmqJnjgpLjgYznn6nlvaLnr4Tlm7LlhoXjgYvliKTlrprjgZnjgovjgIJcbiAgICpcbiAgICogQHBhcmFtIGhpdEFyZW5hTmFtZSAg5b2T44Gf44KK5Yik5a6a44KS44OG44K544OI44GZ44KL5a++6LGh44GuSURcbiAgICogQHBhcmFtIHggICAgICAgICAgICAg5Yik5a6a44KS6KGM44GGWOW6p+aomVxuICAgKiBAcGFyYW0geSAgICAgICAgICAgICDliKTlrprjgpLooYzjgYZZ5bqn5qiZXG4gICAqL1xuICBwdWJsaWMgaGl0VGVzdChoaXRBcmVuYU5hbWU6IHN0cmluZywgeDogbnVtYmVyLCB5OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICAvLyDpgI/mmI7mmYLjga/lvZPjgZ/jgorliKTlrprnhKHjgZfjgIJcbiAgICBpZiAodGhpcy5fb3BhY2l0eSA8IDEpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBjb3VudDogbnVtYmVyID0gdGhpcy5fbW9kZWxTZXR0aW5nLmdldEhpdEFyZWFzQ291bnQoKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgaWYgKHRoaXMuX21vZGVsU2V0dGluZy5nZXRIaXRBcmVhTmFtZShpKSA9PSBoaXRBcmVuYU5hbWUpIHtcbiAgICAgICAgY29uc3QgZHJhd0lkOiBDdWJpc21JZEhhbmRsZSA9IHRoaXMuX21vZGVsU2V0dGluZy5nZXRIaXRBcmVhSWQoaSk7XG4gICAgICAgIHJldHVybiB0aGlzLmlzSGl0KGRyYXdJZCwgeCwgeSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIOODouODvOOCt+ODp+ODs+ODh+ODvOOCv+OCkuOCsOODq+ODvOODl+WQjeOBi+OCieS4gOaLrOOBp+ODreODvOODieOBmeOCi+OAglxuICAgKiDjg6Ljg7zjgrfjg6fjg7Pjg4fjg7zjgr/jga7lkI3liY3jga/lhoXpg6jjgadNb2RlbFNldHRpbmfjgYvjgonlj5blvpfjgZnjgovjgIJcbiAgICog5LuO57uE5ZCI5ZCN56ew5Lit57uf5LiA5Yqg6L295Yqo5L2c5pWw5o2u44CCXG4gICAqIOWKqOS9nOaVsOaNrueahOWQjeensOWcqOWGhemDqOS7jk1vZGVsU2V0dGluZ+WPluW+l+OAglxuICAgKlxuICAgKiBAcGFyYW0gZ3JvdXAg44Oi44O844K344On44Oz44OH44O844K/44Gu44Kw44Or44O844OX5ZCNXG4gICAqIGdyb3Vw5Yqo5L2c5pWw5o2u55qE57uE5ZCN56ewXG4gICAqL1xuICBwdWJsaWMgcHJlTG9hZE1vdGlvbkdyb3VwKGdyb3VwOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX21vZGVsU2V0dGluZy5nZXRNb3Rpb25Db3VudChncm91cCk7IGkrKykge1xuICAgICAgY29uc3QgbW90aW9uRmlsZU5hbWUgPSB0aGlzLl9tb2RlbFNldHRpbmcuZ2V0TW90aW9uRmlsZU5hbWUoZ3JvdXAsIGkpO1xuICAgICAgLy8gZXgpIGlkbGVfMFxuICAgICAgY29uc3QgbmFtZSA9IGAke2dyb3VwfV8ke2l9YDtcbiAgICAgIGlmICh0aGlzLl9kZWJ1Z01vZGUpIHtcbiAgICAgICAgTEFwcFBhbC5wcmludE1lc3NhZ2UoXG4gICAgICAgICAgYFtBUFBdbG9hZCBtb3Rpb246ICR7bW90aW9uRmlsZU5hbWV9ID0+IFske25hbWV9XWBcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgZmV0Y2goYCR7dGhpcy5fbW9kZWxIb21lRGlyfS8ke21vdGlvbkZpbGVOYW1lfWApXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmFycmF5QnVmZmVyKCkpXG4gICAgICAgIC50aGVuKGFycmF5QnVmZmVyID0+IHtcbiAgICAgICAgICBjb25zdCB0bXBNb3Rpb246IEN1YmlzbU1vdGlvbiA9IHRoaXMubG9hZE1vdGlvbihcbiAgICAgICAgICAgIGFycmF5QnVmZmVyLFxuICAgICAgICAgICAgYXJyYXlCdWZmZXIuYnl0ZUxlbmd0aCxcbiAgICAgICAgICAgIG5hbWVcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgbGV0IGZhZGVUaW1lID0gdGhpcy5fbW9kZWxTZXR0aW5nLmdldE1vdGlvbkZhZGVJblRpbWVWYWx1ZShncm91cCwgaSk7XG4gICAgICAgICAgaWYgKGZhZGVUaW1lID49IDAuMCkge1xuICAgICAgICAgICAgdG1wTW90aW9uLnNldEZhZGVJblRpbWUoZmFkZVRpbWUpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGZhZGVUaW1lID0gdGhpcy5fbW9kZWxTZXR0aW5nLmdldE1vdGlvbkZhZGVPdXRUaW1lVmFsdWUoZ3JvdXAsIGkpO1xuICAgICAgICAgIGlmIChmYWRlVGltZSA+PSAwLjApIHtcbiAgICAgICAgICAgIHRtcE1vdGlvbi5zZXRGYWRlT3V0VGltZShmYWRlVGltZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRtcE1vdGlvbi5zZXRFZmZlY3RJZHModGhpcy5fZXllQmxpbmtJZHMsIHRoaXMuX2xpcFN5bmNJZHMpO1xuXG4gICAgICAgICAgaWYgKHRoaXMuX21vdGlvbnMuZ2V0VmFsdWUobmFtZSkgIT0gbnVsbCkge1xuICAgICAgICAgICAgQUN1YmlzbU1vdGlvbi5kZWxldGUodGhpcy5fbW90aW9ucy5nZXRWYWx1ZShuYW1lKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5fbW90aW9ucy5zZXRWYWx1ZShuYW1lLCB0bXBNb3Rpb24pO1xuXG4gICAgICAgICAgdGhpcy5fbW90aW9uQ291bnQrKztcbiAgICAgICAgICBpZiAodGhpcy5fbW90aW9uQ291bnQgPj0gdGhpcy5fYWxsTW90aW9uQ291bnQpIHtcbiAgICAgICAgICAgIHRoaXMuX3N0YXRlID0gTG9hZFN0ZXAuTG9hZFRleHR1cmU7XG5cbiAgICAgICAgICAgIC8vIOWFqOOBpuOBruODouODvOOCt+ODp+ODs+OCkuWBnOatouOBmeOCi1xuICAgICAgICAgICAgdGhpcy5fbW90aW9uTWFuYWdlci5zdG9wQWxsTW90aW9ucygpO1xuXG4gICAgICAgICAgICB0aGlzLl91cGRhdGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5faW5pdGlhbGl6ZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVJlbmRlcmVyKCk7XG4gICAgICAgICAgICB0aGlzLnNldHVwVGV4dHVyZXMoKTtcbiAgICAgICAgICAgIHRoaXMuZ2V0UmVuZGVyZXIoKS5zdGFydFVwKGdsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiDjgZnjgbnjgabjga7jg6Ljg7zjgrfjg6fjg7Pjg4fjg7zjgr/jgpLop6PmlL7jgZnjgovjgIJcbiAgICovXG4gIHB1YmxpYyByZWxlYXNlTW90aW9ucygpOiB2b2lkIHtcbiAgICB0aGlzLl9tb3Rpb25zLmNsZWFyKCk7XG4gIH1cblxuICAvKipcbiAgICog5YWo44Gm44Gu6KGo5oOF44OH44O844K/44KS6Kej5pS+44GZ44KL44CCXG4gICAqL1xuICBwdWJsaWMgcmVsZWFzZUV4cHJlc3Npb25zKCk6IHZvaWQge1xuICAgIHRoaXMuX2V4cHJlc3Npb25zLmNsZWFyKCk7XG4gIH1cblxuICAvKipcbiAgICog44Oi44OH44Or44KS5o+P55S744GZ44KL5Yem55CG44CC44Oi44OH44Or44KS5o+P55S744GZ44KL56m66ZaT44GuVmlldy1Qcm9qZWN0aW9u6KGM5YiX44KS5rih44GZ44CCXG4gICAqL1xuICBwdWJsaWMgZG9EcmF3KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9tb2RlbCA9PSBudWxsKSByZXR1cm47XG5cbiAgICAvLyDjgq3jg6Pjg7Pjg5DjgrnjgrXjgqTjgrrjgpLmuKHjgZlcbiAgICBjb25zdCB2aWV3cG9ydDogbnVtYmVyW10gPSBbMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0XTtcblxuICAgIHRoaXMuZ2V0UmVuZGVyZXIoKS5zZXRSZW5kZXJTdGF0ZShmcmFtZUJ1ZmZlciwgdmlld3BvcnQpO1xuICAgIHRoaXMuZ2V0UmVuZGVyZXIoKS5kcmF3TW9kZWwoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDjg6Ljg4fjg6vjgpLmj4/nlLvjgZnjgovlh6bnkIbjgILjg6Ljg4fjg6vjgpLmj4/nlLvjgZnjgovnqbrplpPjga5WaWV3LVByb2plY3Rpb27ooYzliJfjgpLmuKHjgZnjgIJcbiAgICovXG4gIHB1YmxpYyBkcmF3KG1hdHJpeDogQ3ViaXNtTWF0cml4NDQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fbW9kZWwgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIOWQhOiqreOBv+i+vOOBv+e1guS6huW+jFxuICAgIGlmICh0aGlzLl9zdGF0ZSA9PSBMb2FkU3RlcC5Db21wbGV0ZVNldHVwKSB7XG4gICAgICBtYXRyaXgubXVsdGlwbHlCeU1hdHJpeCh0aGlzLl9tb2RlbE1hdHJpeCk7XG5cbiAgICAgIHRoaXMuZ2V0UmVuZGVyZXIoKS5zZXRNdnBNYXRyaXgobWF0cml4KTtcblxuICAgICAgdGhpcy5kb0RyYXcoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICog44Kz44Oz44K544OI44Op44Kv44K/XG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuX21vZGVsU2V0dGluZyA9IG51bGw7XG4gICAgdGhpcy5fbW9kZWxIb21lRGlyID0gbnVsbDtcbiAgICB0aGlzLl91c2VyVGltZVNlY29uZHMgPSAwLjA7XG5cbiAgICB0aGlzLl9leWVCbGlua0lkcyA9IG5ldyBjc21WZWN0b3I8Q3ViaXNtSWRIYW5kbGU+KCk7XG4gICAgdGhpcy5fbGlwU3luY0lkcyA9IG5ldyBjc21WZWN0b3I8Q3ViaXNtSWRIYW5kbGU+KCk7XG5cbiAgICB0aGlzLl9tb3Rpb25zID0gbmV3IGNzbU1hcDxzdHJpbmcsIEFDdWJpc21Nb3Rpb24+KCk7XG4gICAgdGhpcy5fZXhwcmVzc2lvbnMgPSBuZXcgY3NtTWFwPHN0cmluZywgQUN1YmlzbU1vdGlvbj4oKTtcblxuICAgIHRoaXMuX2hpdEFyZWEgPSBuZXcgY3NtVmVjdG9yPGNzbVJlY3Q+KCk7XG4gICAgdGhpcy5fdXNlckFyZWEgPSBuZXcgY3NtVmVjdG9yPGNzbVJlY3Q+KCk7XG5cbiAgICB0aGlzLl9pZFBhcmFtQW5nbGVYID0gQ3ViaXNtRnJhbWV3b3JrLmdldElkTWFuYWdlcigpLmdldElkKFxuICAgICAgQ3ViaXNtRGVmYXVsdFBhcmFtZXRlcklkLlBhcmFtQW5nbGVYXG4gICAgKTtcbiAgICB0aGlzLl9pZFBhcmFtQW5nbGVZID0gQ3ViaXNtRnJhbWV3b3JrLmdldElkTWFuYWdlcigpLmdldElkKFxuICAgICAgQ3ViaXNtRGVmYXVsdFBhcmFtZXRlcklkLlBhcmFtQW5nbGVZXG4gICAgKTtcbiAgICB0aGlzLl9pZFBhcmFtQW5nbGVaID0gQ3ViaXNtRnJhbWV3b3JrLmdldElkTWFuYWdlcigpLmdldElkKFxuICAgICAgQ3ViaXNtRGVmYXVsdFBhcmFtZXRlcklkLlBhcmFtQW5nbGVaXG4gICAgKTtcbiAgICB0aGlzLl9pZFBhcmFtRXllQmFsbFggPSBDdWJpc21GcmFtZXdvcmsuZ2V0SWRNYW5hZ2VyKCkuZ2V0SWQoXG4gICAgICBDdWJpc21EZWZhdWx0UGFyYW1ldGVySWQuUGFyYW1FeWVCYWxsWFxuICAgICk7XG4gICAgdGhpcy5faWRQYXJhbUV5ZUJhbGxZID0gQ3ViaXNtRnJhbWV3b3JrLmdldElkTWFuYWdlcigpLmdldElkKFxuICAgICAgQ3ViaXNtRGVmYXVsdFBhcmFtZXRlcklkLlBhcmFtRXllQmFsbFlcbiAgICApO1xuICAgIHRoaXMuX2lkUGFyYW1Cb2R5QW5nbGVYID0gQ3ViaXNtRnJhbWV3b3JrLmdldElkTWFuYWdlcigpLmdldElkKFxuICAgICAgQ3ViaXNtRGVmYXVsdFBhcmFtZXRlcklkLlBhcmFtQm9keUFuZ2xlWFxuICAgICk7XG5cbiAgICB0aGlzLl9zdGF0ZSA9IExvYWRTdGVwLkxvYWRBc3NldHM7XG4gICAgdGhpcy5fZXhwcmVzc2lvbkNvdW50ID0gMDtcbiAgICB0aGlzLl90ZXh0dXJlQ291bnQgPSAwO1xuICAgIHRoaXMuX21vdGlvbkNvdW50ID0gMDtcbiAgICB0aGlzLl9hbGxNb3Rpb25Db3VudCA9IDA7XG4gIH1cblxuICBfbW9kZWxTZXR0aW5nOiBJQ3ViaXNtTW9kZWxTZXR0aW5nOyAvLyDjg6Ljg4fjg6vjgrvjg4Pjg4bjgqPjg7PjgrDmg4XloLFcbiAgX21vZGVsSG9tZURpcjogc3RyaW5nOyAvLyDjg6Ljg4fjg6vjgrvjg4Pjg4bjgqPjg7PjgrDjgYznva7jgYvjgozjgZ/jg4fjgqPjg6zjgq/jg4jjg6pcbiAgX3VzZXJUaW1lU2Vjb25kczogbnVtYmVyOyAvLyDjg4fjg6vjgr/mmYLplpPjga7nqY3nrpflgKRb56eSXVxuXG4gIF9leWVCbGlua0lkczogY3NtVmVjdG9yPEN1YmlzbUlkSGFuZGxlPjsgLy8g44Oi44OH44Or44Gr6Kit5a6a44GV44KM44Gf556s44GN5qmf6IO955So44OR44Op44Oh44O844K/SURcbiAgX2xpcFN5bmNJZHM6IGNzbVZlY3RvcjxDdWJpc21JZEhhbmRsZT47IC8vIOODouODh+ODq+OBq+ioreWumuOBleOCjOOBn+ODquODg+ODl+OCt+ODs+OCr+apn+iDveeUqOODkeODqeODoeODvOOCv0lEXG5cbiAgX21vdGlvbnM6IGNzbU1hcDxzdHJpbmcsIEFDdWJpc21Nb3Rpb24+OyAvLyDoqq3jgb/ovrzjgb7jgozjgabjgYTjgovjg6Ljg7zjgrfjg6fjg7Pjga7jg6rjgrnjg4hcbiAgX2V4cHJlc3Npb25zOiBjc21NYXA8c3RyaW5nLCBBQ3ViaXNtTW90aW9uPjsgLy8g6Kqt44G/6L6844G+44KM44Gm44GE44KL6KGo5oOF44Gu44Oq44K544OIXG5cbiAgX2hpdEFyZWE6IGNzbVZlY3Rvcjxjc21SZWN0PjtcbiAgX3VzZXJBcmVhOiBjc21WZWN0b3I8Y3NtUmVjdD47XG5cbiAgX2lkUGFyYW1BbmdsZVg6IEN1YmlzbUlkSGFuZGxlOyAvLyDjg5Hjg6njg6Hjg7zjgr9JRDogUGFyYW1BbmdsZVhcbiAgX2lkUGFyYW1BbmdsZVk6IEN1YmlzbUlkSGFuZGxlOyAvLyDjg5Hjg6njg6Hjg7zjgr9JRDogUGFyYW1BbmdsZVlcbiAgX2lkUGFyYW1BbmdsZVo6IEN1YmlzbUlkSGFuZGxlOyAvLyDjg5Hjg6njg6Hjg7zjgr9JRDogUGFyYW1BbmdsZVpcbiAgX2lkUGFyYW1FeWVCYWxsWDogQ3ViaXNtSWRIYW5kbGU7IC8vIOODkeODqeODoeODvOOCv0lEOiBQYXJhbUV5ZUJhbGxYXG4gIF9pZFBhcmFtRXllQmFsbFk6IEN1YmlzbUlkSGFuZGxlOyAvLyDjg5Hjg6njg6Hjg7zjgr9JRDogUGFyYW1FeWVCQWxsWVxuICBfaWRQYXJhbUJvZHlBbmdsZVg6IEN1YmlzbUlkSGFuZGxlOyAvLyDjg5Hjg6njg6Hjg7zjgr9JRDogUGFyYW1Cb2R5QW5nbGVYXG5cbiAgX3N0YXRlOiBudW1iZXI7IC8vIOePvuWcqOOBruOCueODhuODvOOCv+OCueeuoeeQhueUqFxuICBfZXhwcmVzc2lvbkNvdW50OiBudW1iZXI7IC8vIOihqOaDheODh+ODvOOCv+OCq+OCpuODs+ODiFxuICBfdGV4dHVyZUNvdW50OiBudW1iZXI7IC8vIOODhuOCr+OCueODgeODo+OCq+OCpuODs+ODiFxuICBfbW90aW9uQ291bnQ6IG51bWJlcjsgLy8g44Oi44O844K344On44Oz44OH44O844K/44Kr44Km44Oz44OIXG4gIF9hbGxNb3Rpb25Db3VudDogbnVtYmVyOyAvLyDjg6Ljg7zjgrfjg6fjg7Pnt4/mlbBcbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0KGMpIExpdmUyRCBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgdGhlIExpdmUyRCBPcGVuIFNvZnR3YXJlIGxpY2Vuc2VcbiAqIHRoYXQgY2FuIGJlIGZvdW5kIGF0IGh0dHBzOi8vd3d3LmxpdmUyZC5jb20vZXVsYS9saXZlMmQtb3Blbi1zb2Z0d2FyZS1saWNlbnNlLWFncmVlbWVudF9lbi5odG1sLlxuICovXG5cbmltcG9ydCB7IExpdmUyREN1YmlzbUZyYW1ld29yayBhcyBjc212ZWN0b3IgfSBmcm9tICcuLi9GcmFtZXdvcmsvc3JjL3R5cGUvY3NtdmVjdG9yJztcbmltcG9ydCBDc21fY3NtVmVjdG9yID0gY3NtdmVjdG9yLmNzbVZlY3RvcjtcbmltcG9ydCBjc21WZWN0b3JfaXRlcmF0b3IgPSBjc212ZWN0b3IuaXRlcmF0b3I7XG5pbXBvcnQgeyBnbCB9IGZyb20gJy4vbGFwcGRlbGVnYXRlJztcblxuLyoqXG4gKiDjg4bjgq/jgrnjg4Hjg6PnrqHnkIbjgq/jg6njgrlcbiAqIOeUu+WDj+iqreOBv+i+vOOBv+OAgeeuoeeQhuOCkuihjOOBhuOCr+ODqeOCueOAglxuICovXG5leHBvcnQgY2xhc3MgTEFwcFRleHR1cmVNYW5hZ2VyIHtcbiAgLyoqXG4gICAqIOOCs+ODs+OCueODiOODqeOCr+OCv1xuICAgKi9cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5fdGV4dHVyZXMgPSBuZXcgQ3NtX2NzbVZlY3RvcjxUZXh0dXJlSW5mbz4oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDop6PmlL7jgZnjgovjgIJcbiAgICovXG4gIHB1YmxpYyByZWxlYXNlKCk6IHZvaWQge1xuICAgIGZvciAoXG4gICAgICBsZXQgaXRlOiBjc21WZWN0b3JfaXRlcmF0b3I8VGV4dHVyZUluZm8+ID0gdGhpcy5fdGV4dHVyZXMuYmVnaW4oKTtcbiAgICAgIGl0ZS5ub3RFcXVhbCh0aGlzLl90ZXh0dXJlcy5lbmQoKSk7XG4gICAgICBpdGUucHJlSW5jcmVtZW50KClcbiAgICApIHtcbiAgICAgIGdsLmRlbGV0ZVRleHR1cmUoaXRlLnB0cigpLmlkKTtcbiAgICB9XG4gICAgdGhpcy5fdGV4dHVyZXMgPSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIOeUu+WDj+iqreOBv+i+vOOBv1xuICAgKlxuICAgKiBAcGFyYW0gZmlsZU5hbWUg6Kqt44G/6L6844KA55S75YOP44OV44Kh44Kk44Or44OR44K55ZCNXG4gICAqIEBwYXJhbSB1c2VQcmVtdWx0aXBseSBQcmVtdWx05Yem55CG44KS5pyJ5Yq544Gr44GZ44KL44GLXG4gICAqIEByZXR1cm4g55S75YOP5oOF5aCx44CB6Kqt44G/6L6844G/5aSx5pWX5pmC44GvbnVsbOOCkui/lOOBmVxuICAgKi9cbiAgcHVibGljIGNyZWF0ZVRleHR1cmVGcm9tUG5nRmlsZShcbiAgICBmaWxlTmFtZTogc3RyaW5nLFxuICAgIHVzZVByZW11bHRpcGx5OiBib29sZWFuLFxuICAgIGNhbGxiYWNrOiAodGV4dHVyZUluZm86IFRleHR1cmVJbmZvKSA9PiB2b2lkXG4gICk6IHZvaWQge1xuICAgIC8vIHNlYXJjaCBsb2FkZWQgdGV4dHVyZSBhbHJlYWR5XG4gICAgZm9yIChcbiAgICAgIGxldCBpdGU6IGNzbVZlY3Rvcl9pdGVyYXRvcjxUZXh0dXJlSW5mbz4gPSB0aGlzLl90ZXh0dXJlcy5iZWdpbigpO1xuICAgICAgaXRlLm5vdEVxdWFsKHRoaXMuX3RleHR1cmVzLmVuZCgpKTtcbiAgICAgIGl0ZS5wcmVJbmNyZW1lbnQoKVxuICAgICkge1xuICAgICAgaWYgKFxuICAgICAgICBpdGUucHRyKCkuZmlsZU5hbWUgPT0gZmlsZU5hbWUgJiZcbiAgICAgICAgaXRlLnB0cigpLnVzZVByZW11bHRwbHkgPT0gdXNlUHJlbXVsdGlwbHlcbiAgICAgICkge1xuICAgICAgICAvLyAy5Zue55uu5Lul6ZmN44Gv44Kt44Oj44OD44K344Ol44GM5L2/55So44GV44KM44KLKOW+heOBoeaZgumWk+OBquOBlylcbiAgICAgICAgLy8gV2ViS2l044Gn44Gv5ZCM44GYSW1hZ2Xjga5vbmxvYWTjgpLlho3luqblkbzjgbbjgavjga/lho3jgqTjg7Pjgrnjgr/jg7PjgrnjgYzlv4XopoFcbiAgICAgICAgLy8g6Kmz57Sw77yaaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzUwMjQxODFcbiAgICAgICAgaXRlLnB0cigpLmltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICBpdGUucHRyKCkuaW1nLm9ubG9hZCA9ICgpOiB2b2lkID0+IGNhbGxiYWNrKGl0ZS5wdHIoKSk7XG4gICAgICAgIGl0ZS5wdHIoKS5pbWcuc3JjID0gZmlsZU5hbWU7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyDjg4fjg7zjgr/jga7jgqrjg7Pjg63jg7zjg4njgpLjg4jjg6rjgqzjg7zjgavjgZnjgotcbiAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICBpbWcub25sb2FkID0gKCk6IHZvaWQgPT4ge1xuICAgICAgLy8g44OG44Kv44K544OB44Oj44Kq44OW44K444Kn44Kv44OI44Gu5L2c5oiQXG4gICAgICBjb25zdCB0ZXg6IFdlYkdMVGV4dHVyZSA9IGdsLmNyZWF0ZVRleHR1cmUoKTtcblxuICAgICAgLy8g44OG44Kv44K544OB44Oj44KS6YG45oqeXG4gICAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0ZXgpO1xuXG4gICAgICAvLyDjg4bjgq/jgrnjg4Hjg6Pjgavjg5Tjgq/jgrvjg6vjgpLmm7jjgY3ovrzjgoBcbiAgICAgIGdsLnRleFBhcmFtZXRlcmkoXG4gICAgICAgIGdsLlRFWFRVUkVfMkQsXG4gICAgICAgIGdsLlRFWFRVUkVfTUlOX0ZJTFRFUixcbiAgICAgICAgZ2wuTElORUFSX01JUE1BUF9MSU5FQVJcbiAgICAgICk7XG4gICAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUFHX0ZJTFRFUiwgZ2wuTElORUFSKTtcblxuICAgICAgLy8gUHJlbXVsdOWHpueQhuOCkuihjOOCj+OBm+OCi1xuICAgICAgaWYgKHVzZVByZW11bHRpcGx5KSB7XG4gICAgICAgIGdsLnBpeGVsU3RvcmVpKGdsLlVOUEFDS19QUkVNVUxUSVBMWV9BTFBIQV9XRUJHTCwgMSk7XG4gICAgICB9XG5cbiAgICAgIC8vIOODhuOCr+OCueODgeODo+OBq+ODlOOCr+OCu+ODq+OCkuabuOOBjei+vOOCgFxuICAgICAgZ2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELCAwLCBnbC5SR0JBLCBnbC5SR0JBLCBnbC5VTlNJR05FRF9CWVRFLCBpbWcpO1xuXG4gICAgICAvLyDjg5/jg4Pjg5fjg57jg4Pjg5fjgpLnlJ/miJBcbiAgICAgIGdsLmdlbmVyYXRlTWlwbWFwKGdsLlRFWFRVUkVfMkQpO1xuXG4gICAgICAvLyDjg4bjgq/jgrnjg4Hjg6PjgpLjg5DjgqTjg7Pjg4lcbiAgICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIG51bGwpO1xuXG4gICAgICBjb25zdCB0ZXh0dXJlSW5mbzogVGV4dHVyZUluZm8gPSBuZXcgVGV4dHVyZUluZm8oKTtcbiAgICAgIGlmICh0ZXh0dXJlSW5mbyAhPSBudWxsKSB7XG4gICAgICAgIHRleHR1cmVJbmZvLmZpbGVOYW1lID0gZmlsZU5hbWU7XG4gICAgICAgIHRleHR1cmVJbmZvLndpZHRoID0gaW1nLndpZHRoO1xuICAgICAgICB0ZXh0dXJlSW5mby5oZWlnaHQgPSBpbWcuaGVpZ2h0O1xuICAgICAgICB0ZXh0dXJlSW5mby5pZCA9IHRleDtcbiAgICAgICAgdGV4dHVyZUluZm8uaW1nID0gaW1nO1xuICAgICAgICB0ZXh0dXJlSW5mby51c2VQcmVtdWx0cGx5ID0gdXNlUHJlbXVsdGlwbHk7XG4gICAgICAgIHRoaXMuX3RleHR1cmVzLnB1c2hCYWNrKHRleHR1cmVJbmZvKTtcbiAgICAgIH1cblxuICAgICAgY2FsbGJhY2sodGV4dHVyZUluZm8pO1xuICAgIH07XG4gICAgaW1nLnNyYyA9IGZpbGVOYW1lO1xuICAgIC8vICDmt7vliqDlhYHorrjlm77niYfotYTmupDot6jln5/or7fmsYJcbiAgICBpbWcuY3Jvc3NPcmlnaW4gPSBcImFub255bW91c1wiO1xuICB9XG5cbiAgLyoqXG4gICAqIOeUu+WDj+OBruino+aUvlxuICAgKlxuICAgKiDphY3liJfjgavlrZjlnKjjgZnjgovnlLvlg4/lhajjgabjgpLop6PmlL7jgZnjgovjgIJcbiAgICovXG4gIHB1YmxpYyByZWxlYXNlVGV4dHVyZXMoKTogdm9pZCB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl90ZXh0dXJlcy5nZXRTaXplKCk7IGkrKykge1xuICAgICAgdGhpcy5fdGV4dHVyZXMuc2V0KGksIG51bGwpO1xuICAgIH1cblxuICAgIHRoaXMuX3RleHR1cmVzLmNsZWFyKCk7XG4gIH1cblxuICAvKipcbiAgICog55S75YOP44Gu6Kej5pS+XG4gICAqXG4gICAqIOaMh+WumuOBl+OBn+ODhuOCr+OCueODgeODo+OBrueUu+WDj+OCkuino+aUvuOBmeOCi+OAglxuICAgKiBAcGFyYW0gdGV4dHVyZSDop6PmlL7jgZnjgovjg4bjgq/jgrnjg4Hjg6NcbiAgICovXG4gIHB1YmxpYyByZWxlYXNlVGV4dHVyZUJ5VGV4dHVyZSh0ZXh0dXJlOiBXZWJHTFRleHR1cmUpOiB2b2lkIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3RleHR1cmVzLmdldFNpemUoKTsgaSsrKSB7XG4gICAgICBpZiAodGhpcy5fdGV4dHVyZXMuYXQoaSkuaWQgIT0gdGV4dHVyZSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fdGV4dHVyZXMuc2V0KGksIG51bGwpO1xuICAgICAgdGhpcy5fdGV4dHVyZXMucmVtb3ZlKGkpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIOeUu+WDj+OBruino+aUvlxuICAgKlxuICAgKiDmjIflrprjgZfjgZ/lkI3liY3jga7nlLvlg4/jgpLop6PmlL7jgZnjgovjgIJcbiAgICogQHBhcmFtIGZpbGVOYW1lIOino+aUvuOBmeOCi+eUu+WDj+ODleOCoeOCpOODq+ODkeOCueWQjVxuICAgKi9cbiAgcHVibGljIHJlbGVhc2VUZXh0dXJlQnlGaWxlUGF0aChmaWxlTmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl90ZXh0dXJlcy5nZXRTaXplKCk7IGkrKykge1xuICAgICAgaWYgKHRoaXMuX3RleHR1cmVzLmF0KGkpLmZpbGVOYW1lID09IGZpbGVOYW1lKSB7XG4gICAgICAgIHRoaXMuX3RleHR1cmVzLnNldChpLCBudWxsKTtcbiAgICAgICAgdGhpcy5fdGV4dHVyZXMucmVtb3ZlKGkpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBfdGV4dHVyZXM6IENzbV9jc21WZWN0b3I8VGV4dHVyZUluZm8+O1xufVxuXG4vKipcbiAqIOeUu+WDj+aDheWgseani+mAoOS9k1xuICovXG5leHBvcnQgY2xhc3MgVGV4dHVyZUluZm8ge1xuICBpbWc6IEhUTUxJbWFnZUVsZW1lbnQ7IC8vIOeUu+WDj1xuICBpZDogV2ViR0xUZXh0dXJlID0gbnVsbDsgLy8g44OG44Kv44K544OB44OjXG4gIHdpZHRoID0gMDsgLy8g5qiq5bmFXG4gIGhlaWdodCA9IDA7IC8vIOmrmOOBlVxuICB1c2VQcmVtdWx0cGx5OiBib29sZWFuOyAvLyBQcmVtdWx05Yem55CG44KS5pyJ5Yq544Gr44GZ44KL44GLXG4gIGZpbGVOYW1lOiBzdHJpbmc7IC8vIOODleOCoeOCpOODq+WQjVxufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQoYykgTGl2ZTJEIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSB0aGUgTGl2ZTJEIE9wZW4gU29mdHdhcmUgbGljZW5zZVxuICogdGhhdCBjYW4gYmUgZm91bmQgYXQgaHR0cHM6Ly93d3cubGl2ZTJkLmNvbS9ldWxhL2xpdmUyZC1vcGVuLXNvZnR3YXJlLWxpY2Vuc2UtYWdyZWVtZW50X2VuLmh0bWwuXG4gKi9cblxuaW1wb3J0IHsgTGl2ZTJEQ3ViaXNtRnJhbWV3b3JrIGFzIGN1YmlzbU1hdHJpeDQ0IH0gZnJvbSAnLi4vRnJhbWV3b3JrL3NyYy9tYXRoL2N1YmlzbW1hdHJpeDQ0JztcbmltcG9ydCB7IExpdmUyREN1YmlzbUZyYW1ld29yayBhcyBjdWJpc212aWV3bWF0cml4IH0gZnJvbSAnLi4vRnJhbWV3b3JrL3NyYy9tYXRoL2N1YmlzbXZpZXdtYXRyaXgnO1xuaW1wb3J0IENzbV9DdWJpc21WaWV3TWF0cml4ID0gY3ViaXNtdmlld21hdHJpeC5DdWJpc21WaWV3TWF0cml4O1xuaW1wb3J0IENzbV9DdWJpc21NYXRyaXg0NCA9IGN1YmlzbU1hdHJpeDQ0LkN1YmlzbU1hdHJpeDQ0O1xuaW1wb3J0IHsgVG91Y2hNYW5hZ2VyIH0gZnJvbSAnLi90b3VjaG1hbmFnZXInO1xuaW1wb3J0IHsgTEFwcExpdmUyRE1hbmFnZXIgfSBmcm9tICcuL2xhcHBsaXZlMmRtYW5hZ2VyJztcbmltcG9ydCB7IExBcHBEZWxlZ2F0ZSwgY2FudmFzLCBnbCB9IGZyb20gJy4vbGFwcGRlbGVnYXRlJztcbmltcG9ydCB7IExBcHBTcHJpdGUgfSBmcm9tICcuL2xhcHBzcHJpdGUnO1xuaW1wb3J0IHsgVGV4dHVyZUluZm8gfSBmcm9tICcuL2xhcHB0ZXh0dXJlbWFuYWdlcic7XG5pbXBvcnQgeyBMQXBwUGFsIH0gZnJvbSAnLi9sYXBwcGFsJztcbmltcG9ydCAqIGFzIExBcHBEZWZpbmUgZnJvbSAnLi9sYXBwZGVmaW5lJztcblxuLyoqXG4gKiDmj4/nlLvjgq/jg6njgrnjgIJcbiAqL1xuZXhwb3J0IGNsYXNzIExBcHBWaWV3IHtcbiAgLyoqXG4gICAqIOOCs+ODs+OCueODiOODqeOCr+OCv1xuICAgKi9cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5fcHJvZ3JhbUlkID0gbnVsbDtcbiAgICB0aGlzLl9iYWNrID0gbnVsbDtcbiAgICB0aGlzLl9nZWFyID0gbnVsbDtcblxuICAgIC8vIOOCv+ODg+ODgemWouS/guOBruOCpOODmeODs+ODiOeuoeeQhlxuICAgIHRoaXMuX3RvdWNoTWFuYWdlciA9IG5ldyBUb3VjaE1hbmFnZXIoKTtcblxuICAgIC8vIOODh+ODkOOCpOOCueW6p+aomeOBi+OCieOCueOCr+ODquODvOODs+W6p+aomeOBq+WkieaPm+OBmeOCi+OBn+OCgeOBrlxuICAgIHRoaXMuX2RldmljZVRvU2NyZWVuID0gbmV3IENzbV9DdWJpc21NYXRyaXg0NCgpO1xuXG4gICAgLy8g55S76Z2i44Gu6KGo56S644Gu5ouh5aSn57iu5bCP44KE56e75YuV44Gu5aSJ5o+b44KS6KGM44GG6KGM5YiXXG4gICAgdGhpcy5fdmlld01hdHJpeCA9IG5ldyBDc21fQ3ViaXNtVmlld01hdHJpeCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIOWIneacn+WMluOBmeOCi+OAglxuICAgKi9cbiAgcHVibGljIGluaXRpYWxpemUoKTogdm9pZCB7XG4gICAgY29uc3QgeyB3aWR0aCwgaGVpZ2h0IH0gPSBjYW52YXM7XG5cbiAgICBjb25zdCByYXRpbzogbnVtYmVyID0gaGVpZ2h0IC8gd2lkdGg7XG4gICAgY29uc3QgbGVmdDogbnVtYmVyID0gTEFwcERlZmluZS5WaWV3TG9naWNhbExlZnQ7XG4gICAgY29uc3QgcmlnaHQ6IG51bWJlciA9IExBcHBEZWZpbmUuVmlld0xvZ2ljYWxSaWdodDtcbiAgICBjb25zdCBib3R0b206IG51bWJlciA9IC1yYXRpbztcbiAgICBjb25zdCB0b3A6IG51bWJlciA9IHJhdGlvO1xuXG4gICAgdGhpcy5fdmlld01hdHJpeC5zZXRTY3JlZW5SZWN0KGxlZnQsIHJpZ2h0LCBib3R0b20sIHRvcCk7IC8vIOODh+ODkOOCpOOCueOBq+WvvuW/nOOBmeOCi+eUu+mdouOBruevhOWbsuOAgiBY44Gu5bem56uv44CBWOOBruWPs+err+OAgVnjga7kuIvnq6/jgIFZ44Gu5LiK56uvXG5cbiAgICBjb25zdCBzY3JlZW5XOiBudW1iZXIgPSBNYXRoLmFicyhsZWZ0IC0gcmlnaHQpO1xuICAgIHRoaXMuX2RldmljZVRvU2NyZWVuLnNjYWxlUmVsYXRpdmUoc2NyZWVuVyAvIHdpZHRoLCAtc2NyZWVuVyAvIHdpZHRoKTtcbiAgICB0aGlzLl9kZXZpY2VUb1NjcmVlbi50cmFuc2xhdGVSZWxhdGl2ZSgtd2lkdGggKiAwLjUsIC1oZWlnaHQgKiAwLjUpO1xuXG4gICAgLy8g6KGo56S656+E5Zuy44Gu6Kit5a6aXG4gICAgdGhpcy5fdmlld01hdHJpeC5zZXRNYXhTY2FsZShMQXBwRGVmaW5lLlZpZXdNYXhTY2FsZSk7IC8vIOmZkOeVjOaLoeW8teeOh1xuICAgIHRoaXMuX3ZpZXdNYXRyaXguc2V0TWluU2NhbGUoTEFwcERlZmluZS5WaWV3TWluU2NhbGUpOyAvLyDpmZDnlYznuK7lsI/njodcblxuICAgIC8vIOihqOekuuOBp+OBjeOCi+acgOWkp+evhOWbslxuICAgIHRoaXMuX3ZpZXdNYXRyaXguc2V0TWF4U2NyZWVuUmVjdChcbiAgICAgIExBcHBEZWZpbmUuVmlld0xvZ2ljYWxNYXhMZWZ0LFxuICAgICAgTEFwcERlZmluZS5WaWV3TG9naWNhbE1heFJpZ2h0LFxuICAgICAgTEFwcERlZmluZS5WaWV3TG9naWNhbE1heEJvdHRvbSxcbiAgICAgIExBcHBEZWZpbmUuVmlld0xvZ2ljYWxNYXhUb3BcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIOino+aUvuOBmeOCi1xuICAgKi9cbiAgcHVibGljIHJlbGVhc2UoKTogdm9pZCB7XG4gICAgdGhpcy5fdmlld01hdHJpeCA9IG51bGw7XG4gICAgdGhpcy5fdG91Y2hNYW5hZ2VyID0gbnVsbDtcbiAgICB0aGlzLl9kZXZpY2VUb1NjcmVlbiA9IG51bGw7XG5cbiAgICB0aGlzLl9nZWFyLnJlbGVhc2UoKTtcbiAgICB0aGlzLl9nZWFyID0gbnVsbDtcblxuICAgIHRoaXMuX2JhY2sucmVsZWFzZSgpO1xuICAgIHRoaXMuX2JhY2sgPSBudWxsO1xuXG4gICAgZ2wuZGVsZXRlUHJvZ3JhbSh0aGlzLl9wcm9ncmFtSWQpO1xuICAgIHRoaXMuX3Byb2dyYW1JZCA9IG51bGw7XG4gIH1cblxuICAvKipcbiAgICog5o+P55S744GZ44KL44CCXG4gICAqL1xuICBwdWJsaWMgcmVuZGVyKCk6IHZvaWQge1xuICAgIGdsLnVzZVByb2dyYW0odGhpcy5fcHJvZ3JhbUlkKTtcblxuICAgIGlmICh0aGlzLl9iYWNrKSB7XG4gICAgICB0aGlzLl9iYWNrLnJlbmRlcih0aGlzLl9wcm9ncmFtSWQpO1xuICAgIH1cbiAgICBpZiAodGhpcy5fZ2Vhcikge1xuICAgICAgdGhpcy5fZ2Vhci5yZW5kZXIodGhpcy5fcHJvZ3JhbUlkKTtcbiAgICB9XG5cbiAgICBnbC5mbHVzaCgpO1xuXG4gICAgY29uc3QgbGl2ZTJETWFuYWdlcjogTEFwcExpdmUyRE1hbmFnZXIgPSBMQXBwTGl2ZTJETWFuYWdlci5nZXRJbnN0YW5jZSgpO1xuXG4gICAgbGl2ZTJETWFuYWdlci5vblVwZGF0ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIOeUu+WDj+OBruWIneacn+WMluOCkuihjOOBhuOAglxuICAgKi9cbiAgcHVibGljIGluaXRpYWxpemVTcHJpdGUoKTogdm9pZCB7XG4gICAgY29uc3Qgd2lkdGg6IG51bWJlciA9IGNhbnZhcy53aWR0aDtcbiAgICBjb25zdCBoZWlnaHQ6IG51bWJlciA9IGNhbnZhcy5oZWlnaHQ7XG5cbiAgICBjb25zdCB0ZXh0dXJlTWFuYWdlciA9IExBcHBEZWxlZ2F0ZS5nZXRJbnN0YW5jZSgpLmdldFRleHR1cmVNYW5hZ2VyKCk7XG4gICAgY29uc3QgcmVzb3VyY2VzUGF0aCA9IExBcHBEZWZpbmUuUmVzb3VyY2VzUGF0aDtcblxuICAgIGxldCBpbWFnZU5hbWUgPSAnJztcblxuICAgIC8vIOS4jeWKoOi9veeUu+W4g++8jOeUqOS6juWBmueci+adv+WomFxuXG4gICAgLy8gLy8g6IOM5pmv55S75YOP5Yid5pyf5YyWXG4gICAgLy8gaW1hZ2VOYW1lID0gTEFwcERlZmluZS5CYWNrSW1hZ2VOYW1lO1xuXG4gICAgLy8gLy8g6Z2e5ZCM5pyf44Gq44Gu44Gn44Kz44O844Or44OQ44OD44Kv6Zai5pWw44KS5L2c5oiQXG4gICAgLy8gY29uc3QgaW5pdEJhY2tHcm91bmRUZXh0dXJlID0gKHRleHR1cmVJbmZvOiBUZXh0dXJlSW5mbyk6IHZvaWQgPT4ge1xuICAgIC8vICAgY29uc3QgeDogbnVtYmVyID0gd2lkdGggKiAwLjU7XG4gICAgLy8gICBjb25zdCB5OiBudW1iZXIgPSBoZWlnaHQgKiAwLjU7XG5cbiAgICAvLyAgIGNvbnN0IGZ3aWR0aCA9IHRleHR1cmVJbmZvLndpZHRoICogMi4wO1xuICAgIC8vICAgY29uc3QgZmhlaWdodCA9IGhlaWdodCAqIDAuOTU7XG4gICAgLy8gICB0aGlzLl9iYWNrID0gbmV3IExBcHBTcHJpdGUoeCwgeSwgZndpZHRoLCBmaGVpZ2h0LCB0ZXh0dXJlSW5mby5pZCk7XG4gICAgLy8gfTtcblxuICAgIC8vIHRleHR1cmVNYW5hZ2VyLmNyZWF0ZVRleHR1cmVGcm9tUG5nRmlsZShcbiAgICAvLyAgIHJlc291cmNlc1BhdGggKyBpbWFnZU5hbWUsXG4gICAgLy8gICBmYWxzZSxcbiAgICAvLyAgIGluaXRCYWNrR3JvdW5kVGV4dHVyZVxuICAgIC8vICk7XG5cbiAgICAvLyAvLyDmra/ou4rnlLvlg4/liJ3mnJ/ljJZcbiAgICAvLyBpbWFnZU5hbWUgPSBMQXBwRGVmaW5lLkdlYXJJbWFnZU5hbWU7XG4gICAgLy8gY29uc3QgaW5pdEdlYXJUZXh0dXJlID0gKHRleHR1cmVJbmZvOiBUZXh0dXJlSW5mbyk6IHZvaWQgPT4ge1xuICAgIC8vICAgY29uc3QgeCA9IHdpZHRoIC0gdGV4dHVyZUluZm8ud2lkdGggKiAwLjU7XG4gICAgLy8gICBjb25zdCB5ID0gaGVpZ2h0IC0gdGV4dHVyZUluZm8uaGVpZ2h0ICogMC41O1xuICAgIC8vICAgY29uc3QgZndpZHRoID0gdGV4dHVyZUluZm8ud2lkdGg7XG4gICAgLy8gICBjb25zdCBmaGVpZ2h0ID0gdGV4dHVyZUluZm8uaGVpZ2h0O1xuICAgIC8vICAgdGhpcy5fZ2VhciA9IG5ldyBMQXBwU3ByaXRlKHgsIHksIGZ3aWR0aCwgZmhlaWdodCwgdGV4dHVyZUluZm8uaWQpO1xuICAgIC8vIH07XG5cbiAgICAvLyB0ZXh0dXJlTWFuYWdlci5jcmVhdGVUZXh0dXJlRnJvbVBuZ0ZpbGUoXG4gICAgLy8gICByZXNvdXJjZXNQYXRoICsgaW1hZ2VOYW1lLFxuICAgIC8vICAgZmFsc2UsXG4gICAgLy8gICBpbml0R2VhclRleHR1cmVcbiAgICAvLyApO1xuXG4gICAgLy8gLy8g44K344Kn44O844OA44O844KS5L2c5oiQXG4gICAgLy8gaWYgKHRoaXMuX3Byb2dyYW1JZCA9PSBudWxsKSB7XG4gICAgLy8gICB0aGlzLl9wcm9ncmFtSWQgPSBMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKS5jcmVhdGVTaGFkZXIoKTtcbiAgICAvLyB9XG4gIH1cblxuICAvKipcbiAgICog44K/44OD44OB44GV44KM44Gf5pmC44Gr5ZG844Gw44KM44KL44CCXG4gICAqXG4gICAqIEBwYXJhbSBwb2ludFgg44K544Kv44Oq44O844OzWOW6p+aomVxuICAgKiBAcGFyYW0gcG9pbnRZIOOCueOCr+ODquODvOODs1nluqfmqJlcbiAgICovXG4gIHB1YmxpYyBvblRvdWNoZXNCZWdhbihwb2ludFg6IG51bWJlciwgcG9pbnRZOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl90b3VjaE1hbmFnZXIudG91Y2hlc0JlZ2FuKHBvaW50WCwgcG9pbnRZKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDjgr/jg4Pjg4HjgZfjgabjgYTjgovjgajjgY3jgavjg53jgqTjg7Pjgr/jgYzli5XjgYTjgZ/jgonlkbzjgbDjgozjgovjgIJcbiAgICpcbiAgICogQHBhcmFtIHBvaW50WCDjgrnjgq/jg6rjg7zjg7NY5bqn5qiZXG4gICAqIEBwYXJhbSBwb2ludFkg44K544Kv44Oq44O844OzWeW6p+aomVxuICAgKi9cbiAgcHVibGljIG9uVG91Y2hlc01vdmVkKHBvaW50WDogbnVtYmVyLCBwb2ludFk6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IHZpZXdYOiBudW1iZXIgPSB0aGlzLnRyYW5zZm9ybVZpZXdYKHRoaXMuX3RvdWNoTWFuYWdlci5nZXRYKCkpO1xuICAgIGNvbnN0IHZpZXdZOiBudW1iZXIgPSB0aGlzLnRyYW5zZm9ybVZpZXdZKHRoaXMuX3RvdWNoTWFuYWdlci5nZXRZKCkpO1xuXG4gICAgdGhpcy5fdG91Y2hNYW5hZ2VyLnRvdWNoZXNNb3ZlZChwb2ludFgsIHBvaW50WSk7XG5cbiAgICBjb25zdCBsaXZlMkRNYW5hZ2VyOiBMQXBwTGl2ZTJETWFuYWdlciA9IExBcHBMaXZlMkRNYW5hZ2VyLmdldEluc3RhbmNlKCk7XG4gICAgbGl2ZTJETWFuYWdlci5vbkRyYWcodmlld1gsIHZpZXdZKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDjgr/jg4Pjg4HjgYzntYLkuobjgZfjgZ/jgonlkbzjgbDjgozjgovjgIJcbiAgICpcbiAgICogQHBhcmFtIHBvaW50WCDjgrnjgq/jg6rjg7zjg7NY5bqn5qiZXG4gICAqIEBwYXJhbSBwb2ludFkg44K544Kv44Oq44O844OzWeW6p+aomVxuICAgKi9cbiAgcHVibGljIG9uVG91Y2hlc0VuZGVkKHBvaW50WDogbnVtYmVyLCBwb2ludFk6IG51bWJlcik6IHZvaWQge1xuICAgIC8vIOOCv+ODg+ODgee1guS6hlxuICAgIGNvbnN0IGxpdmUyRE1hbmFnZXI6IExBcHBMaXZlMkRNYW5hZ2VyID0gTEFwcExpdmUyRE1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcbiAgICBsaXZlMkRNYW5hZ2VyLm9uRHJhZygwLjAsIDAuMCk7XG5cbiAgICB7XG4gICAgICAvLyDjgrfjg7PjgrDjg6vjgr/jg4Pjg5dcbiAgICAgIGNvbnN0IHg6IG51bWJlciA9IHRoaXMuX2RldmljZVRvU2NyZWVuLnRyYW5zZm9ybVgoXG4gICAgICAgIHRoaXMuX3RvdWNoTWFuYWdlci5nZXRYKClcbiAgICAgICk7IC8vIOirlueQhuW6p+aomeWkieaPm+OBl+OBn+W6p+aomeOCkuWPluW+l+OAglxuICAgICAgY29uc3QgeTogbnVtYmVyID0gdGhpcy5fZGV2aWNlVG9TY3JlZW4udHJhbnNmb3JtWShcbiAgICAgICAgdGhpcy5fdG91Y2hNYW5hZ2VyLmdldFkoKVxuICAgICAgKTsgLy8g6KuW55CG5bqn5qiZ5aSJ5YyW44GX44Gf5bqn5qiZ44KS5Y+W5b6X44CCXG5cbiAgICAgIGlmIChMQXBwRGVmaW5lLkRlYnVnVG91Y2hMb2dFbmFibGUpIHtcbiAgICAgICAgTEFwcFBhbC5wcmludE1lc3NhZ2UoYFtBUFBddG91Y2hlc0VuZGVkIHg6ICR7eH0geTogJHt5fWApO1xuICAgICAgfVxuICAgICAgbGl2ZTJETWFuYWdlci5vblRhcCh4LCB5KTtcblxuICAgICAgLy8g5q2v6LuK44Gr44K/44OD44OX44GX44Gf44GLXG4gICAgICAvLyBpZiAodGhpcy5fZ2Vhci5pc0hpdChwb2ludFgsIHBvaW50WSkpIHtcbiAgICAgIC8vICAgbGl2ZTJETWFuYWdlci5uZXh0U2NlbmUoKTtcbiAgICAgIC8vIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogWOW6p+aomeOCklZpZXfluqfmqJnjgavlpInmj5vjgZnjgovjgIJcbiAgICpcbiAgICogQHBhcmFtIGRldmljZVgg44OH44OQ44Kk44K5WOW6p+aomVxuICAgKi9cbiAgcHVibGljIHRyYW5zZm9ybVZpZXdYKGRldmljZVg6IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3Qgc2NyZWVuWDogbnVtYmVyID0gdGhpcy5fZGV2aWNlVG9TY3JlZW4udHJhbnNmb3JtWChkZXZpY2VYKTsgLy8g6KuW55CG5bqn5qiZ5aSJ5o+b44GX44Gf5bqn5qiZ44KS5Y+W5b6X44CCXG4gICAgcmV0dXJuIHRoaXMuX3ZpZXdNYXRyaXguaW52ZXJ0VHJhbnNmb3JtWChzY3JlZW5YKTsgLy8g5ouh5aSn44CB57iu5bCP44CB56e75YuV5b6M44Gu5YCk44CCXG4gIH1cblxuICAvKipcbiAgICogWeW6p+aomeOCklZpZXfluqfmqJnjgavlpInmj5vjgZnjgovjgIJcbiAgICpcbiAgICogQHBhcmFtIGRldmljZVkg44OH44OQ44Kk44K5WeW6p+aomVxuICAgKi9cbiAgcHVibGljIHRyYW5zZm9ybVZpZXdZKGRldmljZVk6IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3Qgc2NyZWVuWTogbnVtYmVyID0gdGhpcy5fZGV2aWNlVG9TY3JlZW4udHJhbnNmb3JtWShkZXZpY2VZKTsgLy8g6KuW55CG5bqn5qiZ5aSJ5o+b44GX44Gf5bqn5qiZ44KS5Y+W5b6X44CCXG4gICAgcmV0dXJuIHRoaXMuX3ZpZXdNYXRyaXguaW52ZXJ0VHJhbnNmb3JtWShzY3JlZW5ZKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBY5bqn5qiZ44KSU2NyZWVu5bqn5qiZ44Gr5aSJ5o+b44GZ44KL44CCXG4gICAqIEBwYXJhbSBkZXZpY2VYIOODh+ODkOOCpOOCuVjluqfmqJlcbiAgICovXG4gIHB1YmxpYyB0cmFuc2Zvcm1TY3JlZW5YKGRldmljZVg6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2RldmljZVRvU2NyZWVuLnRyYW5zZm9ybVgoZGV2aWNlWCk7XG4gIH1cblxuICAvKipcbiAgICogWeW6p+aomeOCklNjcmVlbuW6p+aomeOBq+WkieaPm+OBmeOCi+OAglxuICAgKlxuICAgKiBAcGFyYW0gZGV2aWNlWSDjg4fjg5DjgqTjgrlZ5bqn5qiZXG4gICAqL1xuICBwdWJsaWMgdHJhbnNmb3JtU2NyZWVuWShkZXZpY2VZOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9kZXZpY2VUb1NjcmVlbi50cmFuc2Zvcm1ZKGRldmljZVkpO1xuICB9XG5cbiAgX3RvdWNoTWFuYWdlcjogVG91Y2hNYW5hZ2VyOyAvLyDjgr/jg4Pjg4Hjg57jg43jg7zjgrjjg6Pjg7xcbiAgX2RldmljZVRvU2NyZWVuOiBDc21fQ3ViaXNtTWF0cml4NDQ7IC8vIOODh+ODkOOCpOOCueOBi+OCieOCueOCr+ODquODvOODs+OBuOOBruihjOWIl1xuICBfdmlld01hdHJpeDogQ3NtX0N1YmlzbVZpZXdNYXRyaXg7IC8vIHZpZXdNYXRyaXhcbiAgX3Byb2dyYW1JZDogV2ViR0xQcm9ncmFtOyAvLyDjgrfjgqfjg7zjg4BJRFxuICBfYmFjazogTEFwcFNwcml0ZTsgLy8g6IOM5pmv55S75YOPXG4gIF9nZWFyOiBMQXBwU3ByaXRlOyAvLyDjgq7jgqLnlLvlg49cbiAgX2NoYW5nZU1vZGVsOiBib29sZWFuOyAvLyDjg6Ljg4fjg6vliIfjgormm7/jgYjjg5Xjg6njgrBcbiAgX2lzQ2xpY2s6IGJvb2xlYW47IC8vIOOCr+ODquODg+OCr+S4rVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==