webpackHotUpdatelive2d("main",{

/***/ "./Framework/src/model/cubismusermodel.ts":
/*!************************************************!*\
  !*** ./Framework/src/model/cubismusermodel.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var live2dcubismframework_1 = __webpack_require__(/*! ../live2dcubismframework */ "./Framework/src/live2dcubismframework.ts");
var cubismmotionmanager_1 = __webpack_require__(/*! ../motion/cubismmotionmanager */ "./Framework/src/motion/cubismmotionmanager.ts");
var cubismtargetpoint_1 = __webpack_require__(/*! ../math/cubismtargetpoint */ "./Framework/src/math/cubismtargetpoint.ts");
var cubismmodelmatrix_1 = __webpack_require__(/*! ../math/cubismmodelmatrix */ "./Framework/src/math/cubismmodelmatrix.ts");
var cubismmoc_1 = __webpack_require__(/*! ./cubismmoc */ "./Framework/src/model/cubismmoc.ts");
var cubismmotion_1 = __webpack_require__(/*! ../motion/cubismmotion */ "./Framework/src/motion/cubismmotion.ts");
var cubismexpressionmotion_1 = __webpack_require__(/*! ../motion/cubismexpressionmotion */ "./Framework/src/motion/cubismexpressionmotion.ts");
var cubismpose_1 = __webpack_require__(/*! ../effect/cubismpose */ "./Framework/src/effect/cubismpose.ts");
var cubismmodeluserdata_1 = __webpack_require__(/*! ./cubismmodeluserdata */ "./Framework/src/model/cubismmodeluserdata.ts");
var cubismphysics_1 = __webpack_require__(/*! ../physics/cubismphysics */ "./Framework/src/physics/cubismphysics.ts");
var cubismbreath_1 = __webpack_require__(/*! ../effect/cubismbreath */ "./Framework/src/effect/cubismbreath.ts");
var cubismeyeblink_1 = __webpack_require__(/*! ../effect/cubismeyeblink */ "./Framework/src/effect/cubismeyeblink.ts");
var cubismrenderer_webgl_1 = __webpack_require__(/*! ../rendering/cubismrenderer_webgl */ "./Framework/src/rendering/cubismrenderer_webgl.ts");
var cubismdebug_1 = __webpack_require__(/*! ../utils/cubismdebug */ "./Framework/src/utils/cubismdebug.ts");
var CubismRenderer_WebGL = cubismrenderer_webgl_1.Live2DCubismFramework.CubismRenderer_WebGL;
var CubismEyeBlink = cubismeyeblink_1.Live2DCubismFramework.CubismEyeBlink;
var CubismBreath = cubismbreath_1.Live2DCubismFramework.CubismBreath;
var Constant = live2dcubismframework_1.Live2DCubismFramework.Constant;
var CubismPhysics = cubismphysics_1.Live2DCubismFramework.CubismPhysics;
var CubismModelUserData = cubismmodeluserdata_1.Live2DCubismFramework.CubismModelUserData;
var CubismPose = cubismpose_1.Live2DCubismFramework.CubismPose;
var CubismExpressionMotion = cubismexpressionmotion_1.Live2DCubismFramework.CubismExpressionMotion;
var CubismMotion = cubismmotion_1.Live2DCubismFramework.CubismMotion;
var CubismMoc = cubismmoc_1.Live2DCubismFramework.CubismMoc;
var CubismModelMatrix = cubismmodelmatrix_1.Live2DCubismFramework.CubismModelMatrix;
var CubismTargetPoint = cubismtargetpoint_1.Live2DCubismFramework.CubismTargetPoint;
var CubismMotionManager = cubismmotionmanager_1.Live2DCubismFramework.CubismMotionManager;
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    var CubismUserModel = (function () {
        function CubismUserModel() {
            this.loadMotion = function (buffer, size, name, onFinishedMotionHandler) { return CubismMotion.create(buffer, size, onFinishedMotionHandler); };
            this._moc = null;
            this._model = null;
            this._motionManager = null;
            this._expressionManager = null;
            this._eyeBlink = null;
            this._breath = null;
            this._modelMatrix = null;
            this._pose = null;
            this._dragManager = null;
            this._physics = null;
            this._modelUserData = null;
            this._initialized = false;
            this._updating = false;
            this._opacity = 1.0;
            this._lipsync = true;
            this._lastLipSyncValue = 0.0;
            this._dragX = 0.0;
            this._dragY = 0.0;
            this._accelerationX = 0.0;
            this._accelerationY = 0.0;
            this._accelerationZ = 0.0;
            this._debugMode = false;
            this._renderer = null;
            this._motionManager = new CubismMotionManager();
            this._motionManager.setEventCallback(CubismUserModel.cubismDefaultMotionEventCallback, this);
            this._expressionManager = new CubismMotionManager();
            this._dragManager = new CubismTargetPoint();
        }
        CubismUserModel.prototype.isInitialized = function () {
            return this._initialized;
        };
        CubismUserModel.prototype.setInitialized = function (v) {
            this._initialized = v;
        };
        CubismUserModel.prototype.isUpdating = function () {
            return this._updating;
        };
        CubismUserModel.prototype.setUpdating = function (v) {
            this._updating = v;
        };
        CubismUserModel.prototype.setDragging = function (x, y) {
            this._dragManager.set(x, y);
        };
        CubismUserModel.prototype.setAcceleration = function (x, y, z) {
            this._accelerationX = x;
            this._accelerationY = y;
            this._accelerationZ = z;
        };
        CubismUserModel.prototype.getModelMatrix = function () {
            return this._modelMatrix;
        };
        CubismUserModel.prototype.setOpacity = function (a) {
            this._opacity = a;
        };
        CubismUserModel.prototype.getOpacity = function () {
            return this._opacity;
        };
        CubismUserModel.prototype.loadModel = function (buffer) {
            this._moc = CubismMoc.create(buffer);
            this._model = this._moc.createModel();
            this._model.saveParameters();
            if (this._moc == null || this._model == null) {
                cubismdebug_1.CubismLogError('Failed to CreateModel().');
                return;
            }
            this._modelMatrix = new CubismModelMatrix(this._model.getCanvasWidth(), this._model.getCanvasHeight());
        };
        CubismUserModel.prototype.loadExpression = function (buffer, size, name) {
            return CubismExpressionMotion.create(buffer, size);
        };
        CubismUserModel.prototype.loadPose = function (buffer, size) {
            this._pose = CubismPose.create(buffer, size);
        };
        CubismUserModel.prototype.loadUserData = function (buffer, size) {
            this._modelUserData = CubismModelUserData.create(buffer, size);
        };
        CubismUserModel.prototype.loadPhysics = function (buffer, size) {
            this._physics = CubismPhysics.create(buffer, size);
        };
        CubismUserModel.prototype.isHit = function (drawableId, pointX, pointY) {
            var drawIndex = this._model.getDrawableIndex(drawableId);
            if (drawIndex < 0) {
                return false;
            }
            var count = this._model.getDrawableVertexCount(drawIndex);
            var vertices = this._model.getDrawableVertices(drawIndex);
            var left = vertices[0];
            var right = vertices[0];
            var top = vertices[1];
            var bottom = vertices[1];
            for (var j = 1; j < count; ++j) {
                var x = vertices[Constant.vertexOffset + j * Constant.vertexStep];
                var y = vertices[Constant.vertexOffset + j * Constant.vertexStep + 1];
                if (x < left) {
                    left = x;
                }
                if (x > right) {
                    right = x;
                }
                if (y < top) {
                    top = y;
                }
                if (y > bottom) {
                    bottom = y;
                }
            }
            var tx = this._modelMatrix.invertTransformX(pointX);
            var ty = this._modelMatrix.invertTransformY(pointY);
            return left <= tx && tx <= right && top <= ty && ty <= bottom;
        };
        CubismUserModel.prototype.getModel = function () {
            return this._model;
        };
        CubismUserModel.prototype.getRenderer = function () {
            return this._renderer;
        };
        CubismUserModel.prototype.createRenderer = function () {
            if (this._renderer) {
                this.deleteRenderer();
            }
            this._renderer = new CubismRenderer_WebGL();
            this._renderer.initialize(this._model);
        };
        CubismUserModel.prototype.deleteRenderer = function () {
            if (this._renderer != null) {
                this._renderer.release();
                this._renderer = null;
            }
        };
        CubismUserModel.prototype.motionEventFired = function (eventValue) {
            cubismdebug_1.CubismLogInfo('{0}', eventValue.s);
        };
        CubismUserModel.cubismDefaultMotionEventCallback = function (caller, eventValue, customData) {
            var model = customData;
            if (model != null) {
                model.motionEventFired(eventValue);
            }
        };
        CubismUserModel.prototype.release = function () {
            if (this._motionManager != null) {
                this._motionManager.release();
                this._motionManager = null;
            }
            if (this._expressionManager != null) {
                this._expressionManager.release();
                this._expressionManager = null;
            }
            if (this._moc != null) {
                this._moc.deleteModel(this._model);
                this._moc.release();
                this._moc = null;
            }
            this._modelMatrix = null;
            CubismPose.delete(this._pose);
            CubismEyeBlink.delete(this._eyeBlink);
            CubismBreath.delete(this._breath);
            this._dragManager = null;
            CubismPhysics.delete(this._physics);
            CubismModelUserData.delete(this._modelUserData);
            this.deleteRenderer();
        };
        return CubismUserModel;
    }());
    Live2DCubismFramework.CubismUserModel = CubismUserModel;
})(Live2DCubismFramework = exports.Live2DCubismFramework || (exports.Live2DCubismFramework = {}));


/***/ }),

/***/ "./Framework/src/motion/cubismmotionmanager.ts":
/*!*****************************************************!*\
  !*** ./Framework/src/motion/cubismmotionmanager.ts ***!
  \*****************************************************/
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
Object.defineProperty(exports, "__esModule", { value: true });
var cubismmotionqueuemanager_1 = __webpack_require__(/*! ./cubismmotionqueuemanager */ "./Framework/src/motion/cubismmotionqueuemanager.ts");
var CubismMotionQueueManager = cubismmotionqueuemanager_1.Live2DCubismFramework.CubismMotionQueueManager;
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    var CubismMotionManager = (function (_super) {
        __extends(CubismMotionManager, _super);
        function CubismMotionManager() {
            var _this = _super.call(this) || this;
            _this._currentPriority = 0;
            _this._reservePriority = 0;
            return _this;
        }
        CubismMotionManager.prototype.getCurrentPriority = function () {
            return this._currentPriority;
        };
        CubismMotionManager.prototype.getReservePriority = function () {
            return this._reservePriority;
        };
        CubismMotionManager.prototype.setReservePriority = function (val) {
            this._reservePriority = val;
        };
        CubismMotionManager.prototype.startMotionPriority = function (motion, autoDelete, priority) {
            if (priority == this._reservePriority) {
                this._reservePriority = 0;
            }
            this._currentPriority = priority;
            return _super.prototype.startMotion.call(this, motion, autoDelete, this._userTimeSeconds);
        };
        CubismMotionManager.prototype.updateMotion = function (model, deltaTimeSeconds) {
            this._userTimeSeconds += deltaTimeSeconds;
            var updated = _super.prototype.doUpdateMotion.call(this, model, this._userTimeSeconds);
            if (this.isFinished()) {
                this._currentPriority = 0;
            }
            return updated;
        };
        CubismMotionManager.prototype.reserveMotion = function (priority) {
            if (priority <= this._reservePriority ||
                priority <= this._currentPriority) {
                return false;
            }
            this._reservePriority = priority;
            return true;
        };
        return CubismMotionManager;
    }(CubismMotionQueueManager));
    Live2DCubismFramework.CubismMotionManager = CubismMotionManager;
})(Live2DCubismFramework = exports.Live2DCubismFramework || (exports.Live2DCubismFramework = {}));


/***/ }),

/***/ "./Framework/src/motion/cubismmotionqueueentry.ts":
/*!********************************************************!*\
  !*** ./Framework/src/motion/cubismmotionqueueentry.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var acubismmotion_1 = __webpack_require__(/*! ./acubismmotion */ "./Framework/src/motion/acubismmotion.ts");
var ACubismMotion = acubismmotion_1.Live2DCubismFramework.ACubismMotion;
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    var CubismMotionQueueEntry = (function () {
        function CubismMotionQueueEntry() {
            this._autoDelete = false;
            this._motion = null;
            this._available = true;
            this._finished = false;
            this._started = false;
            this._startTimeSeconds = -1.0;
            this._fadeInStartTimeSeconds = 0.0;
            this._endTimeSeconds = -1.0;
            this._stateTimeSeconds = 0.0;
            this._stateWeight = 0.0;
            this._lastEventCheckSeconds = 0.0;
            this._motionQueueEntryHandle = this;
        }
        CubismMotionQueueEntry.prototype.release = function () {
            if (this._autoDelete && this._motion) {
                ACubismMotion.delete(this._motion);
            }
        };
        CubismMotionQueueEntry.prototype.startFadeout = function (fadeoutSeconds, userTimeSeconds) {
            var newEndTimeSeconds = userTimeSeconds + fadeoutSeconds;
            if (this._endTimeSeconds < 0.0 ||
                newEndTimeSeconds < this._endTimeSeconds) {
                this._endTimeSeconds = newEndTimeSeconds;
            }
        };
        CubismMotionQueueEntry.prototype.isFinished = function () {
            return this._finished;
        };
        CubismMotionQueueEntry.prototype.isStarted = function () {
            return this._started;
        };
        CubismMotionQueueEntry.prototype.getStartTime = function () {
            return this._startTimeSeconds;
        };
        CubismMotionQueueEntry.prototype.getFadeInStartTime = function () {
            return this._fadeInStartTimeSeconds;
        };
        CubismMotionQueueEntry.prototype.getEndTime = function () {
            return this._endTimeSeconds;
        };
        CubismMotionQueueEntry.prototype.setStartTime = function (startTime) {
            this._startTimeSeconds = startTime;
        };
        CubismMotionQueueEntry.prototype.setFadeInStartTime = function (startTime) {
            this._fadeInStartTimeSeconds = startTime;
        };
        CubismMotionQueueEntry.prototype.setEndTime = function (endTime) {
            this._endTimeSeconds = endTime;
        };
        CubismMotionQueueEntry.prototype.setIsFinished = function (f) {
            this._finished = f;
        };
        CubismMotionQueueEntry.prototype.setIsStarted = function (f) {
            this._started = f;
        };
        CubismMotionQueueEntry.prototype.isAvailable = function () {
            return this._available;
        };
        CubismMotionQueueEntry.prototype.setIsAvailable = function (v) {
            this._available = v;
        };
        CubismMotionQueueEntry.prototype.setState = function (timeSeconds, weight) {
            this._stateTimeSeconds = timeSeconds;
            this._stateWeight = weight;
        };
        CubismMotionQueueEntry.prototype.getStateTime = function () {
            return this._stateTimeSeconds;
        };
        CubismMotionQueueEntry.prototype.getStateWeight = function () {
            return this._stateWeight;
        };
        CubismMotionQueueEntry.prototype.getLastCheckEventTime = function () {
            return this._lastEventCheckSeconds;
        };
        CubismMotionQueueEntry.prototype.setLastCheckEventTime = function (checkTime) {
            this._lastEventCheckSeconds = checkTime;
        };
        return CubismMotionQueueEntry;
    }());
    Live2DCubismFramework.CubismMotionQueueEntry = CubismMotionQueueEntry;
})(Live2DCubismFramework = exports.Live2DCubismFramework || (exports.Live2DCubismFramework = {}));


/***/ }),

/***/ "./Framework/src/motion/cubismmotionqueuemanager.ts":
/*!**********************************************************!*\
  !*** ./Framework/src/motion/cubismmotionqueuemanager.ts ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var cubismmotionqueueentry_1 = __webpack_require__(/*! ./cubismmotionqueueentry */ "./Framework/src/motion/cubismmotionqueueentry.ts");
var csmvector_1 = __webpack_require__(/*! ../type/csmvector */ "./Framework/src/type/csmvector.ts");
var csmVector = csmvector_1.Live2DCubismFramework.csmVector;
var CubismMotionQueueEntry = cubismmotionqueueentry_1.Live2DCubismFramework.CubismMotionQueueEntry;
var Live2DCubismFramework;
(function (Live2DCubismFramework) {
    var CubismMotionQueueManager = (function () {
        function CubismMotionQueueManager() {
            this._userTimeSeconds = 0.0;
            this._eventCallBack = null;
            this._eventCustomData = null;
            this._motions = new csmVector();
        }
        CubismMotionQueueManager.prototype.release = function () {
            for (var i = 0; i < this._motions.getSize(); ++i) {
                if (this._motions.at(i)) {
                    this._motions.at(i).release();
                    this._motions.set(i, void 0);
                    this._motions.set(i, null);
                }
            }
            this._motions = null;
        };
        CubismMotionQueueManager.prototype.startMotion = function (motion, autoDelete, userTimeSeconds) {
            if (motion == null) {
                return Live2DCubismFramework.InvalidMotionQueueEntryHandleValue;
            }
            var motionQueueEntry = null;
            for (var i = 0; i < this._motions.getSize(); ++i) {
                motionQueueEntry = this._motions.at(i);
                if (motionQueueEntry == null) {
                    continue;
                }
                motionQueueEntry.startFadeout(motionQueueEntry._motion.getFadeOutTime(), userTimeSeconds);
            }
            motionQueueEntry = new CubismMotionQueueEntry();
            motionQueueEntry._autoDelete = autoDelete;
            motionQueueEntry._motion = motion;
            if (motion['_motionData']['curveCount'] < 100) {
                this._motions.pushBack(motionQueueEntry);
            }
            return motionQueueEntry._motionQueueEntryHandle;
        };
        CubismMotionQueueManager.prototype.isFinished = function () {
            for (var ite = this._motions.begin(); ite.notEqual(this._motions.end());) {
                var motionQueueEntry = ite.ptr();
                if (motionQueueEntry == null) {
                    ite = this._motions.erase(ite);
                    continue;
                }
                var motion = motionQueueEntry._motion;
                if (motion == null) {
                    motionQueueEntry.release();
                    motionQueueEntry = void 0;
                    motionQueueEntry = null;
                    ite = this._motions.erase(ite);
                    continue;
                }
                if (!motionQueueEntry.isFinished()) {
                    return false;
                }
                else {
                    ite.preIncrement();
                }
            }
            return true;
        };
        CubismMotionQueueManager.prototype.isFinishedByHandle = function (motionQueueEntryNumber) {
            for (var ite = this._motions.begin(); ite.notEqual(this._motions.end()); ite.increment()) {
                var motionQueueEntry = ite.ptr();
                if (motionQueueEntry == null) {
                    continue;
                }
                if (motionQueueEntry._motionQueueEntryHandle == motionQueueEntryNumber &&
                    !motionQueueEntry.isFinished()) {
                    return false;
                }
            }
            return true;
        };
        CubismMotionQueueManager.prototype.stopAllMotions = function () {
            for (var ite = this._motions.begin(); ite.notEqual(this._motions.end());) {
                var motionQueueEntry = ite.ptr();
                if (motionQueueEntry == null) {
                    ite = this._motions.erase(ite);
                    continue;
                }
                motionQueueEntry.release();
                motionQueueEntry = void 0;
                motionQueueEntry = null;
                ite = this._motions.erase(ite);
            }
        };
        CubismMotionQueueManager.prototype.getCubismMotionQueueEntry = function (motionQueueEntryNumber) {
            for (var ite = this._motions.begin(); ite.notEqual(this._motions.end()); ite.preIncrement()) {
                var motionQueueEntry = ite.ptr();
                if (motionQueueEntry == null) {
                    continue;
                }
                if (motionQueueEntry._motionQueueEntryHandle == motionQueueEntryNumber) {
                    return motionQueueEntry;
                }
            }
            return null;
        };
        CubismMotionQueueManager.prototype.setEventCallback = function (callback, customData) {
            if (customData === void 0) { customData = null; }
            this._eventCallBack = callback;
            this._eventCustomData = customData;
        };
        CubismMotionQueueManager.prototype.doUpdateMotion = function (model, userTimeSeconds) {
            var updated = false;
            for (var ite = this._motions.begin(); ite.notEqual(this._motions.end());) {
                var motionQueueEntry = ite.ptr();
                if (motionQueueEntry == null) {
                    ite = this._motions.erase(ite);
                    continue;
                }
                var motion = motionQueueEntry._motion;
                if (motion == null) {
                    motionQueueEntry.release();
                    motionQueueEntry = void 0;
                    motionQueueEntry = null;
                    ite = this._motions.erase(ite);
                    continue;
                }
                motion.updateParameters(model, motionQueueEntry, userTimeSeconds);
                updated = true;
                var firedList = motion.getFiredEvent(motionQueueEntry.getLastCheckEventTime() -
                    motionQueueEntry.getStartTime(), userTimeSeconds - motionQueueEntry.getStartTime());
                for (var i = 0; i < firedList.getSize(); ++i) {
                    this._eventCallBack(this, firedList.at(i), this._eventCustomData);
                }
                motionQueueEntry.setLastCheckEventTime(userTimeSeconds);
                if (motionQueueEntry.isFinished()) {
                    motionQueueEntry.release();
                    motionQueueEntry = void 0;
                    motionQueueEntry = null;
                    ite = this._motions.erase(ite);
                }
                else {
                    ite.preIncrement();
                }
            }
            return updated;
        };
        return CubismMotionQueueManager;
    }());
    Live2DCubismFramework.CubismMotionQueueManager = CubismMotionQueueManager;
    Live2DCubismFramework.InvalidMotionQueueEntryHandleValue = -1;
})(Live2DCubismFramework = exports.Live2DCubismFramework || (exports.Live2DCubismFramework = {}));


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
            var lucky = Math.floor(Math.random() * 1000 + 100);
            if (lucky == 999) {
                this.startRandomMotion(LAppDefine.MotionGroupIdle, LAppDefine.PriorityIdle);
            }
            else if (lucky == 888) {
                this.startRandomMotion(LAppDefine.MotionGroupDefault, LAppDefine.PriorityIdle);
            }
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


/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9saXZlMmQvLi9GcmFtZXdvcmsvc3JjL21vZGVsL2N1YmlzbXVzZXJtb2RlbC50cyIsIndlYnBhY2s6Ly9saXZlMmQvLi9GcmFtZXdvcmsvc3JjL21vdGlvbi9jdWJpc21tb3Rpb25tYW5hZ2VyLnRzIiwid2VicGFjazovL2xpdmUyZC8uL0ZyYW1ld29yay9zcmMvbW90aW9uL2N1YmlzbW1vdGlvbnF1ZXVlZW50cnkudHMiLCJ3ZWJwYWNrOi8vbGl2ZTJkLy4vRnJhbWV3b3JrL3NyYy9tb3Rpb24vY3ViaXNtbW90aW9ucXVldWVtYW5hZ2VyLnRzIiwid2VicGFjazovL2xpdmUyZC8uL3NyYy9sYXBwbW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBT0EsOEhBQW9GO0FBQ3BGLHNJQUE2RjtBQUM3Riw0SEFBdUY7QUFDdkYsNEhBQXVGO0FBQ3ZGLCtGQUFpRTtBQUdqRSxpSEFBK0U7QUFDL0UsK0lBQW1HO0FBQ25HLDJHQUEyRTtBQUMzRSw2SEFBcUY7QUFDckYsc0hBQWtGO0FBSWxGLGlIQUErRTtBQUMvRSx1SEFBbUY7QUFDbkYsK0lBQWtHO0FBQ2xHLDRHQUFxRTtBQUNyRSxJQUFPLG9CQUFvQixHQUFHLDRDQUFvQixDQUFDLG9CQUFvQixDQUFDO0FBQ3hFLElBQU8sY0FBYyxHQUFHLHNDQUFjLENBQUMsY0FBYyxDQUFDO0FBQ3RELElBQU8sWUFBWSxHQUFHLG9DQUFZLENBQUMsWUFBWSxDQUFDO0FBR2hELElBQU8sUUFBUSxHQUFHLDZDQUFlLENBQUMsUUFBUSxDQUFDO0FBRTNDLElBQU8sYUFBYSxHQUFHLHFDQUFhLENBQUMsYUFBYSxDQUFDO0FBQ25ELElBQU8sbUJBQW1CLEdBQUcsMkNBQW1CLENBQUMsbUJBQW1CLENBQUM7QUFDckUsSUFBTyxVQUFVLEdBQUcsa0NBQVUsQ0FBQyxVQUFVLENBQUM7QUFDMUMsSUFBTyxzQkFBc0IsR0FBRyw4Q0FBc0IsQ0FBQyxzQkFBc0IsQ0FBQztBQUM5RSxJ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dGVudCI6WyIvKipcbiAqIENvcHlyaWdodChjKSBMaXZlMkQgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IHRoZSBMaXZlMkQgT3BlbiBTb2Z0d2FyZSBsaWNlbnNlXG4gKiB0aGF0IGNhbiBiZSBmb3VuZCBhdCBodHRwczovL3d3dy5saXZlMmQuY29tL2V1bGEvbGl2ZTJkLW9wZW4tc29mdHdhcmUtbGljZW5zZS1hZ3JlZW1lbnRfZW4uaHRtbC5cbiAqL1xuXG5pbXBvcnQgeyBMaXZlMkRDdWJpc21GcmFtZXdvcmsgYXMgY3ViaXNtZnJhbWV3b3JrIH0gZnJvbSAnLi4vbGl2ZTJkY3ViaXNtZnJhbWV3b3JrJztcbmltcG9ydCB7IExpdmUyREN1YmlzbUZyYW1ld29yayBhcyBjdWJpc21tb3Rpb25tYW5hZ2VyIH0gZnJvbSAnLi4vbW90aW9uL2N1YmlzbW1vdGlvbm1hbmFnZXInO1xuaW1wb3J0IHsgTGl2ZTJEQ3ViaXNtRnJhbWV3b3JrIGFzIGN1YmlzbXRhcmdldHBvaW50IH0gZnJvbSAnLi4vbWF0aC9jdWJpc210YXJnZXRwb2ludCc7XG5pbXBvcnQgeyBMaXZlMkRDdWJpc21GcmFtZXdvcmsgYXMgY3ViaXNtbW9kZWxtYXRyaXggfSBmcm9tICcuLi9tYXRoL2N1YmlzbW1vZGVsbWF0cml4JztcbmltcG9ydCB7IExpdmUyREN1YmlzbUZyYW1ld29yayBhcyBjdWJpc21tb2MgfSBmcm9tICcuL2N1YmlzbW1vYyc7XG5pbXBvcnQgeyBMaXZlMkRDdWJpc21GcmFtZXdvcmsgYXMgY3ViaXNtbW9kZWwgfSBmcm9tICcuL2N1YmlzbW1vZGVsJztcbmltcG9ydCB7IExpdmUyREN1YmlzbUZyYW1ld29yayBhcyBhY3ViaXNtbW90aW9uIH0gZnJvbSAnLi4vbW90aW9uL2FjdWJpc21tb3Rpb24nO1xuaW1wb3J0IHsgTGl2ZTJEQ3ViaXNtRnJhbWV3b3JrIGFzIGN1YmlzbW1vdGlvbiB9IGZyb20gJy4uL21vdGlvbi9jdWJpc21tb3Rpb24nO1xuaW1wb3J0IHsgTGl2ZTJEQ3ViaXNtRnJhbWV3b3JrIGFzIGN1YmlzbWV4cHJlc3Npb25tb3Rpb24gfSBmcm9tICcuLi9tb3Rpb24vY3ViaXNtZXhwcmVzc2lvbm1vdGlvbic7XG5pbXBvcnQgeyBMaXZlMkRDdWJpc21GcmFtZXdvcmsgYXMgY3ViaXNtcG9zZSB9IGZyb20gJy4uL2VmZmVjdC9jdWJpc21wb3NlJztcbmltcG9ydCB7IExpdmUyREN1YmlzbUZyYW1ld29yayBhcyBjdWJpc21tb2RlbHVzZXJkYXRhIH0gZnJvbSAnLi9jdWJpc21tb2RlbHVzZXJkYXRhJztcbmltcG9ydCB7IExpdmUyREN1YmlzbUZyYW1ld29yayBhcyBjdWJpc21waHlzaWNzIH0gZnJvbSAnLi4vcGh5c2ljcy9jdWJpc21waHlzaWNzJztcbmltcG9ydCB7IExpdmUyREN1YmlzbUZyYW1ld29yayBhcyBjdWJpc21pZCB9IGZyb20gJy4uL2lkL2N1YmlzbWlkJztcbmltcG9ydCB7IExpdmUyREN1YmlzbUZyYW1ld29yayBhcyBjc21zdHJpbmcgfSBmcm9tICcuLi90eXBlL2NzbXN0cmluZyc7XG5pbXBvcnQgeyBMaXZlMkRDdWJpc21GcmFtZXdvcmsgYXMgY3ViaXNtbW90aW9ucXVldWVtYW5hZ2VyIH0gZnJvbSAnLi4vbW90aW9uL2N1YmlzbW1vdGlvbnF1ZXVlbWFuYWdlcic7XG5pbXBvcnQgeyBMaXZlMkRDdWJpc21GcmFtZXdvcmsgYXMgY3ViaXNtYnJlYXRoIH0gZnJvbSAnLi4vZWZmZWN0L2N1YmlzbWJyZWF0aCc7XG5pbXBvcnQgeyBMaXZlMkRDdWJpc21GcmFtZXdvcmsgYXMgY3ViaXNtZXllYmxpbmsgfSBmcm9tICcuLi9lZmZlY3QvY3ViaXNtZXllYmxpbmsnO1xuaW1wb3J0IHsgTGl2ZTJEQ3ViaXNtRnJhbWV3b3JrIGFzIGN1YmlzbXJlbmRlcmVyX3dlYmdsIH0gZnJvbSAnLi4vcmVuZGVyaW5nL2N1YmlzbXJlbmRlcmVyX3dlYmdsJztcbmltcG9ydCB7IEN1YmlzbUxvZ0Vycm9yLCBDdWJpc21Mb2dJbmZvIH0gZnJvbSAnLi4vdXRpbHMvY3ViaXNtZGVidWcnO1xuaW1wb3J0IEN1YmlzbVJlbmRlcmVyX1dlYkdMID0gY3ViaXNtcmVuZGVyZXJfd2ViZ2wuQ3ViaXNtUmVuZGVyZXJfV2ViR0w7XG5pbXBvcnQgQ3ViaXNtRXllQmxpbmsgPSBjdWJpc21leWVibGluay5DdWJpc21FeWVCbGluaztcbmltcG9ydCBDdWJpc21CcmVhdGggPSBjdWJpc21icmVhdGguQ3ViaXNtQnJlYXRoO1xuaW1wb3J0IEN1YmlzbU1vdGlvblF1ZXVlTWFuYWdlciA9IGN1YmlzbW1vdGlvbnF1ZXVlbWFuYWdlci5DdWJpc21Nb3Rpb25RdWV1ZU1hbmFnZXI7XG5pbXBvcnQgY3NtU3RyaW5nID0gY3Ntc3RyaW5nLmNzbVN0cmluZztcbmltcG9ydCBDb25zdGFudCA9IGN1YmlzbWZyYW1ld29yay5Db25zdGFudDtcbmltcG9ydCBDdWJpc21JZEhhbmRsZSA9IGN1YmlzbWlkLkN1YmlzbUlkSGFuZGxlO1xuaW1wb3J0IEN1YmlzbVBoeXNpY3MgPSBjdWJpc21waHlzaWNzLkN1YmlzbVBoeXNpY3M7XG5pbXBvcnQgQ3ViaXNtTW9kZWxVc2VyRGF0YSA9IGN1YmlzbW1vZGVsdXNlcmRhdGEuQ3ViaXNtTW9kZWxVc2VyRGF0YTtcbmltcG9ydCBDdWJpc21Qb3NlID0gY3ViaXNtcG9zZS5DdWJpc21Qb3NlO1xuaW1wb3J0IEN1YmlzbUV4cHJlc3Npb25Nb3Rpb24gPSBjdWJpc21leHByZXNzaW9ubW90aW9uLkN1YmlzbUV4cHJlc3Npb25Nb3Rpb247XG5pbXBvcnQgQ3ViaXNtTW90aW9uID0gY3ViaXNtbW90aW9uLkN1YmlzbU1vdGlvbjtcbmltcG9ydCBBQ3ViaXNtTW90aW9uID0gYWN1YmlzbW1vdGlvbi5BQ3ViaXNtTW90aW9uO1xuaW1wb3J0IEZpbmlzaGVkTW90aW9uQ2FsbGJhY2sgPSBhY3ViaXNtbW90aW9uLkZpbmlzaGVkTW90aW9uQ2FsbGJhY2s7XG5pbXBvcnQgQ3ViaXNtTW9kZWwgPSBjdWJpc21tb2RlbC5DdWJpc21Nb2RlbDtcbmltcG9ydCBDdWJpc21Nb2MgPSBjdWJpc21tb2MuQ3ViaXNtTW9jO1xuaW1wb3J0IEN1YmlzbU1vZGVsTWF0cml4ID0gY3ViaXNtbW9kZWxtYXRyaXguQ3ViaXNtTW9kZWxNYXRyaXg7XG5pbXBvcnQgQ3ViaXNtVGFyZ2V0UG9pbnQgPSBjdWJpc210YXJnZXRwb2ludC5DdWJpc21UYXJnZXRQb2ludDtcbmltcG9ydCBDdWJpc21Nb3Rpb25NYW5hZ2VyID0gY3ViaXNtbW90aW9ubWFuYWdlci5DdWJpc21Nb3Rpb25NYW5hZ2VyO1xuXG5leHBvcnQgbmFtZXNwYWNlIExpdmUyREN1YmlzbUZyYW1ld29yayB7XG4gIC8qKlxuICAgKiDjg6bjg7zjgrbjg7zjgYzlrp/pmpvjgavkvb/nlKjjgZnjgovjg6Ljg4fjg6tcbiAgICpcbiAgICog44Om44O844K244O844GM5a6f6Zqb44Gr5L2/55So44GZ44KL44Oi44OH44Or44Gu5Z+65bqV44Kv44Op44K544CC44GT44KM44KS57aZ5om/44GX44Gm44Om44O844K244O844GM5a6f6KOF44GZ44KL44CCXG4gICAqL1xuICBleHBvcnQgY2xhc3MgQ3ViaXNtVXNlck1vZGVsIHtcbiAgICAvKipcbiAgICAgKiDliJ3mnJ/ljJbnirbmhYvjga7lj5blvpdcbiAgICAgKlxuICAgICAqIOWIneacn+WMluOBleOCjOOBpuOBhOOCi+eKtuaFi+OBi++8n1xuICAgICAqXG4gICAgICogQHJldHVybiB0cnVlICAgICDliJ3mnJ/ljJbjgZXjgozjgabjgYTjgotcbiAgICAgKiBAcmV0dXJuIGZhbHNlICAgIOWIneacn+WMluOBleOCjOOBpuOBhOOBquOBhFxuICAgICAqL1xuICAgIHB1YmxpYyBpc0luaXRpYWxpemVkKCk6IGJvb2xlYW4ge1xuICAgICAgcmV0dXJuIHRoaXMuX2luaXRpYWxpemVkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWIneacn+WMlueKtuaFi+OBruioreWumlxuICAgICAqXG4gICAgICog5Yid5pyf5YyW54q25oWL44KS6Kit5a6a44GZ44KL44CCXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdiDliJ3mnJ/ljJbnirbmhYtcbiAgICAgKi9cbiAgICBwdWJsaWMgc2V0SW5pdGlhbGl6ZWQodjogYm9vbGVhbik6IHZvaWQge1xuICAgICAgdGhpcy5faW5pdGlhbGl6ZWQgPSB2O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOabtOaWsOeKtuaFi+OBruWPluW+l1xuICAgICAqXG4gICAgICog5pu05paw44GV44KM44Gm44GE44KL54q25oWL44GL77yfXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHRydWUgICAgIOabtOaWsOOBleOCjOOBpuOBhOOCi1xuICAgICAqIEByZXR1cm4gZmFsc2UgICAg5pu05paw44GV44KM44Gm44GE44Gq44GEXG4gICAgICovXG4gICAgcHVibGljIGlzVXBkYXRpbmcoKTogYm9vbGVhbiB7XG4gICAgICByZXR1cm4gdGhpcy5fdXBkYXRpbmc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5pu05paw54q25oWL44Gu6Kit5a6aXG4gICAgICpcbiAgICAgKiDmm7TmlrDnirbmhYvjgpLoqK3lrprjgZnjgotcbiAgICAgKlxuICAgICAqIEBwYXJhbSB2IOabtOaWsOeKtuaFi1xuICAgICAqL1xuICAgIHB1YmxpYyBzZXRVcGRhdGluZyh2OiBib29sZWFuKTogdm9pZCB7XG4gICAgICB0aGlzLl91cGRhdGluZyA9IHY7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog44Oe44Km44K544OJ44Op44OD44Kw5oOF5aCx44Gu6Kit5a6aXG4gICAgICogQHBhcmFtIOODieODqeODg+OCsOOBl+OBpuOBhOOCi+OCq+ODvOOCveODq+OBrljkvY3nva5cbiAgICAgKiBAcGFyYW0g44OJ44Op44OD44Kw44GX44Gm44GE44KL44Kr44O844K944Or44GuWeS9jee9rlxuICAgICAqL1xuICAgIHB1YmxpYyBzZXREcmFnZ2luZyh4OiBudW1iZXIsIHk6IG51bWJlcik6IHZvaWQge1xuICAgICAgdGhpcy5fZHJhZ01hbmFnZXIuc2V0KHgsIHkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWKoOmAn+W6puOBruaDheWgseOCkuioreWumuOBmeOCi1xuICAgICAqIEBwYXJhbSB4IFjou7jmlrnlkJHjga7liqDpgJ/luqZcbiAgICAgKiBAcGFyYW0geSBZ6Lu45pa55ZCR44Gu5Yqg6YCf5bqmXG4gICAgICogQHBhcmFtIHogWui7uOaWueWQkeOBruWKoOmAn+W6plxuICAgICAqL1xuICAgIHB1YmxpYyBzZXRBY2NlbGVyYXRpb24oeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlcik6IHZvaWQge1xuICAgICAgdGhpcy5fYWNjZWxlcmF0aW9uWCA9IHg7XG4gICAgICB0aGlzLl9hY2NlbGVyYXRpb25ZID0geTtcbiAgICAgIHRoaXMuX2FjY2VsZXJhdGlvblogPSB6O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOODouODh+ODq+ihjOWIl+OCkuWPluW+l+OBmeOCi1xuICAgICAqIEByZXR1cm4g44Oi44OH44Or6KGM5YiXXG4gICAgICovXG4gICAgcHVibGljIGdldE1vZGVsTWF0cml4KCk6IEN1YmlzbU1vZGVsTWF0cml4IHtcbiAgICAgIHJldHVybiB0aGlzLl9tb2RlbE1hdHJpeDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDkuI3pgI/mmI7luqbjga7oqK3lrppcbiAgICAgKiBAcGFyYW0gYSDkuI3pgI/mmI7luqZcbiAgICAgKi9cbiAgICBwdWJsaWMgc2V0T3BhY2l0eShhOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgIHRoaXMuX29wYWNpdHkgPSBhO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOS4jemAj+aYjuW6puOBruWPluW+l1xuICAgICAqIEByZXR1cm4g5LiN6YCP5piO5bqmXG4gICAgICovXG4gICAgcHVibGljIGdldE9wYWNpdHkoKTogbnVtYmVyIHtcbiAgICAgIHJldHVybiB0aGlzLl9vcGFjaXR5O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOODouODh+ODq+ODh+ODvOOCv+OCkuiqreOBv+i+vOOCgFxuICAgICAqXG4gICAgICogQHBhcmFtIGJ1ZmZlciAgICBtb2Mz44OV44Kh44Kk44Or44GM6Kqt44G/6L6844G+44KM44Gm44GE44KL44OQ44OD44OV44KhXG4gICAgICovXG4gICAgcHVibGljIGxvYWRNb2RlbChidWZmZXI6IEFycmF5QnVmZmVyKSB7XG4gICAgICB0aGlzLl9tb2MgPSBDdWJpc21Nb2MuY3JlYXRlKGJ1ZmZlcik7XG4gICAgICB0aGlzLl9tb2RlbCA9IHRoaXMuX21vYy5jcmVhdGVNb2RlbCgpO1xuICAgICAgdGhpcy5fbW9kZWwuc2F2ZVBhcmFtZXRlcnMoKTtcblxuICAgICAgaWYgKHRoaXMuX21vYyA9PSBudWxsIHx8IHRoaXMuX21vZGVsID09IG51bGwpIHtcbiAgICAgICAgQ3ViaXNtTG9nRXJyb3IoJ0ZhaWxlZCB0byBDcmVhdGVNb2RlbCgpLicpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX21vZGVsTWF0cml4ID0gbmV3IEN1YmlzbU1vZGVsTWF0cml4KFxuICAgICAgICB0aGlzLl9tb2RlbC5nZXRDYW52YXNXaWR0aCgpLFxuICAgICAgICB0aGlzLl9tb2RlbC5nZXRDYW52YXNIZWlnaHQoKVxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDjg6Ljg7zjgrfjg6fjg7Pjg4fjg7zjgr/jgpLoqq3jgb/ovrzjgoBcbiAgICAgKiBAcGFyYW0gYnVmZmVyIG1vdGlvbjMuanNvbuODleOCoeOCpOODq+OBjOiqreOBv+i+vOOBvuOCjOOBpuOBhOOCi+ODkOODg+ODleOCoVxuICAgICAqIEBwYXJhbSBzaXplIOODkOODg+ODleOCoeOBruOCteOCpOOCulxuICAgICAqIEBwYXJhbSBuYW1lIOODouODvOOCt+ODp+ODs+OBruWQjeWJjVxuICAgICAqIEBwYXJhbSBvbkZpbmlzaGVkTW90aW9uSGFuZGxlciDjg6Ljg7zjgrfjg6fjg7Plho3nlJ/ntYLkuobmmYLjgavlkbzjgbPlh7rjgZXjgozjgovjgrPjg7zjg6vjg5Djg4Pjgq/plqLmlbBcbiAgICAgKiBAcmV0dXJuIOODouODvOOCt+ODp+ODs+OCr+ODqeOCuVxuICAgICAqL1xuICAgIHB1YmxpYyBsb2FkTW90aW9uID0gKFxuICAgICAgYnVmZmVyOiBBcnJheUJ1ZmZlcixcbiAgICAgIHNpemU6IG51bWJlcixcbiAgICAgIG5hbWU6IHN0cmluZyxcbiAgICAgIG9uRmluaXNoZWRNb3Rpb25IYW5kbGVyPzogRmluaXNoZWRNb3Rpb25DYWxsYmFja1xuICAgICkgPT4gQ3ViaXNtTW90aW9uLmNyZWF0ZShidWZmZXIsIHNpemUsIG9uRmluaXNoZWRNb3Rpb25IYW5kbGVyKTtcblxuICAgIC8qKlxuICAgICAqIOihqOaDheODh+ODvOOCv+OBruiqreOBv+i+vOOBv1xuICAgICAqIEBwYXJhbSBidWZmZXIgZXhw44OV44Kh44Kk44Or44GM6Kqt44G/6L6844G+44KM44Gm44GE44KL44OQ44OD44OV44KhXG4gICAgICogQHBhcmFtIHNpemUg44OQ44OD44OV44Kh44Gu44K144Kk44K6XG4gICAgICogQHBhcmFtIG5hbWUg6KGo5oOF44Gu5ZCN5YmNXG4gICAgICovXG4gICAgcHVibGljIGxvYWRFeHByZXNzaW9uKFxuICAgICAgYnVmZmVyOiBBcnJheUJ1ZmZlcixcbiAgICAgIHNpemU6IG51bWJlcixcbiAgICAgIG5hbWU6IHN0cmluZ1xuICAgICk6IEFDdWJpc21Nb3Rpb24ge1xuICAgICAgcmV0dXJuIEN1YmlzbUV4cHJlc3Npb25Nb3Rpb24uY3JlYXRlKGJ1ZmZlciwgc2l6ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog44Od44O844K644OH44O844K/44Gu6Kqt44G/6L6844G/XG4gICAgICogQHBhcmFtIGJ1ZmZlciBwb3NlMy5qc29u44GM6Kqt44G/6L6844G+44KM44Gm44GE44KL44OQ44OD44OV44KhXG4gICAgICogQHBhcmFtIHNpemUg44OQ44OD44OV44Kh44Gu44K144Kk44K6XG4gICAgICovXG4gICAgcHVibGljIGxvYWRQb3NlKGJ1ZmZlcjogQXJyYXlCdWZmZXIsIHNpemU6IG51bWJlcik6IHZvaWQge1xuICAgICAgdGhpcy5fcG9zZSA9IEN1YmlzbVBvc2UuY3JlYXRlKGJ1ZmZlciwgc2l6ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog44Oi44OH44Or44Gr5LuY5bGe44GZ44KL44Om44O844K244O844OH44O844K/44KS6Kqt44G/6L6844KAXG4gICAgICogQHBhcmFtIGJ1ZmZlciB1c2VyZGF0YTMuanNvbuOBjOiqreOBv+i+vOOBvuOCjOOBpuOBhOOCi+ODkOODg+ODleOCoVxuICAgICAqIEBwYXJhbSBzaXplIOODkOODg+ODleOCoeOBruOCteOCpOOCulxuICAgICAqL1xuICAgIHB1YmxpYyBsb2FkVXNlckRhdGEoYnVmZmVyOiBBcnJheUJ1ZmZlciwgc2l6ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgICB0aGlzLl9tb2RlbFVzZXJEYXRhID0gQ3ViaXNtTW9kZWxVc2VyRGF0YS5jcmVhdGUoYnVmZmVyLCBzaXplKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDniannkIbmvJTnrpfjg4fjg7zjgr/jga7oqq3jgb/ovrzjgb9cbiAgICAgKiBAcGFyYW0gYnVmZmVyICBwaHlzaWNzMy5qc29u44GM6Kqt44G/6L6844G+44KM44Gm44GE44KL44OQ44OD44OV44KhXG4gICAgICogQHBhcmFtIHNpemUgICAg44OQ44OD44OV44Kh44Gu44K144Kk44K6XG4gICAgICovXG4gICAgcHVibGljIGxvYWRQaHlzaWNzKGJ1ZmZlcjogQXJyYXlCdWZmZXIsIHNpemU6IG51bWJlcik6IHZvaWQge1xuICAgICAgdGhpcy5fcGh5c2ljcyA9IEN1YmlzbVBoeXNpY3MuY3JlYXRlKGJ1ZmZlciwgc2l6ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5b2T44Gf44KK5Yik5a6a44Gu5Y+W5b6XXG4gICAgICogQHBhcmFtIGRyYXdhYmxlSWQg5qSc6Ki844GX44Gf44GERHJhd2FibGXjga5JRFxuICAgICAqIEBwYXJhbSBwb2ludFggWOS9jee9rlxuICAgICAqIEBwYXJhbSBwb2ludFkgWeS9jee9rlxuICAgICAqIEByZXR1cm4gdHJ1ZSDjg5Ljg4Pjg4jjgZfjgabjgYTjgotcbiAgICAgKiBAcmV0dXJuIGZhbHNlIOODkuODg+ODiOOBl+OBpuOBhOOBquOBhFxuICAgICAqL1xuICAgIHB1YmxpYyBpc0hpdChcbiAgICAgIGRyYXdhYmxlSWQ6IEN1YmlzbUlkSGFuZGxlLFxuICAgICAgcG9pbnRYOiBudW1iZXIsXG4gICAgICBwb2ludFk6IG51bWJlclxuICAgICk6IGJvb2xlYW4ge1xuICAgICAgY29uc3QgZHJhd0luZGV4OiBudW1iZXIgPSB0aGlzLl9tb2RlbC5nZXREcmF3YWJsZUluZGV4KGRyYXdhYmxlSWQpO1xuXG4gICAgICBpZiAoZHJhd0luZGV4IDwgMCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7IC8vIOWtmOWcqOOBl+OBquOBhOWgtOWQiOOBr2ZhbHNlXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNvdW50OiBudW1iZXIgPSB0aGlzLl9tb2RlbC5nZXREcmF3YWJsZVZlcnRleENvdW50KGRyYXdJbmRleCk7XG4gICAgICBjb25zdCB2ZXJ0aWNlczogRmxvYXQzMkFycmF5ID0gdGhpcy5fbW9kZWwuZ2V0RHJhd2FibGVWZXJ0aWNlcyhkcmF3SW5kZXgpO1xuXG4gICAgICBsZXQgbGVmdDogbnVtYmVyID0gdmVydGljZXNbMF07XG4gICAgICBsZXQgcmlnaHQ6IG51bWJlciA9IHZlcnRpY2VzWzBdO1xuICAgICAgbGV0IHRvcDogbnVtYmVyID0gdmVydGljZXNbMV07XG4gICAgICBsZXQgYm90dG9tOiBudW1iZXIgPSB2ZXJ0aWNlc1sxXTtcblxuICAgICAgZm9yIChsZXQgaiA9IDE7IGogPCBjb3VudDsgKytqKSB7XG4gICAgICAgIGNvbnN0IHggPSB2ZXJ0aWNlc1tDb25zdGFudC52ZXJ0ZXhPZmZzZXQgKyBqICogQ29uc3RhbnQudmVydGV4U3RlcF07XG4gICAgICAgIGNvbnN0IHkgPSB2ZXJ0aWNlc1tDb25zdGFudC52ZXJ0ZXhPZmZzZXQgKyBqICogQ29uc3RhbnQudmVydGV4U3RlcCArIDFdO1xuXG4gICAgICAgIGlmICh4IDwgbGVmdCkge1xuICAgICAgICAgIGxlZnQgPSB4OyAvLyBNaW4geFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHggPiByaWdodCkge1xuICAgICAgICAgIHJpZ2h0ID0geDsgLy8gTWF4IHhcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh5IDwgdG9wKSB7XG4gICAgICAgICAgdG9wID0geTsgLy8gTWluIHlcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh5ID4gYm90dG9tKSB7XG4gICAgICAgICAgYm90dG9tID0geTsgLy8gTWF4IHlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCB0eDogbnVtYmVyID0gdGhpcy5fbW9kZWxNYXRyaXguaW52ZXJ0VHJhbnNmb3JtWChwb2ludFgpO1xuICAgICAgY29uc3QgdHk6IG51bWJlciA9IHRoaXMuX21vZGVsTWF0cml4LmludmVydFRyYW5zZm9ybVkocG9pbnRZKTtcblxuICAgICAgcmV0dXJuIGxlZnQgPD0gdHggJiYgdHggPD0gcmlnaHQgJiYgdG9wIDw9IHR5ICYmIHR5IDw9IGJvdHRvbTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDjg6Ljg4fjg6vjga7lj5blvpdcbiAgICAgKiBAcmV0dXJuIOODouODh+ODq1xuICAgICAqL1xuICAgIHB1YmxpYyBnZXRNb2RlbCgpOiBDdWJpc21Nb2RlbCB7XG4gICAgICByZXR1cm4gdGhpcy5fbW9kZWw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog44Os44Oz44OA44Op44Gu5Y+W5b6XXG4gICAgICogQHJldHVybiDjg6zjg7Pjg4Djg6lcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0UmVuZGVyZXIoKTogQ3ViaXNtUmVuZGVyZXJfV2ViR0wge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlbmRlcmVyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOODrOODs+ODgOODqeOCkuS9nOaIkOOBl+OBpuWIneacn+WMluOCkuWun+ihjOOBmeOCi1xuICAgICAqL1xuICAgIHB1YmxpYyBjcmVhdGVSZW5kZXJlcigpOiB2b2lkIHtcbiAgICAgIGlmICh0aGlzLl9yZW5kZXJlcikge1xuICAgICAgICB0aGlzLmRlbGV0ZVJlbmRlcmVyKCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3JlbmRlcmVyID0gbmV3IEN1YmlzbVJlbmRlcmVyX1dlYkdMKCk7XG4gICAgICB0aGlzLl9yZW5kZXJlci5pbml0aWFsaXplKHRoaXMuX21vZGVsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDjg6zjg7Pjg4Djg6njga7op6PmlL5cbiAgICAgKi9cbiAgICBwdWJsaWMgZGVsZXRlUmVuZGVyZXIoKTogdm9pZCB7XG4gICAgICBpZiAodGhpcy5fcmVuZGVyZXIgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5yZWxlYXNlKCk7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDjgqTjg5njg7Pjg4jnmbrngavmmYLjga7mqJnmupblh6bnkIZcbiAgICAgKlxuICAgICAqIEV2ZW5044GM5YaN55Sf5Yem55CG5pmC44Gr44GC44Gj44Gf5aC05ZCI44Gu5Yem55CG44KS44GZ44KL44CCXG4gICAgICog57aZ5om/44Gn5LiK5pu444GN44GZ44KL44GT44Go44KS5oOz5a6a44GX44Gm44GE44KL44CCXG4gICAgICog5LiK5pu444GN44GX44Gq44GE5aC05ZCI44Gv44Ot44Kw5Ye65Yqb44KS44GZ44KL44CCXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZXZlbnRWYWx1ZSDnmbrngavjgZfjgZ/jgqTjg5njg7Pjg4jjga7mloflrZfliJfjg4fjg7zjgr9cbiAgICAgKi9cbiAgICBwdWJsaWMgbW90aW9uRXZlbnRGaXJlZChldmVudFZhbHVlOiBjc21TdHJpbmcpOiB2b2lkIHtcbiAgICAgIEN1YmlzbUxvZ0luZm8oJ3swfScsIGV2ZW50VmFsdWUucyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog44Kk44OZ44Oz44OI55So44Gu44Kz44O844Or44OQ44OD44KvXG4gICAgICpcbiAgICAgKiBDdWJpc21Nb3Rpb25RdWV1ZU1hbmFnZXLjgavjgqTjg5njg7Pjg4jnlKjjgavnmbvpjLLjgZnjgovjgZ/jgoHjga5DYWxsYmFja+OAglxuICAgICAqIEN1YmlzbVVzZXJNb2RlbOOBrue2meaJv+WFiOOBrkV2ZW50RmlyZWTjgpLlkbzjgbbjgIJcbiAgICAgKlxuICAgICAqIEBwYXJhbSBjYWxsZXIg55m654Gr44GX44Gf44Kk44OZ44Oz44OI44KS566h55CG44GX44Gm44GE44Gf44Oi44O844K344On44Oz44Oe44ON44O844K444Oj44O844CB5q+U6LyD55SoXG4gICAgICogQHBhcmFtIGV2ZW50VmFsdWUg55m654Gr44GX44Gf44Kk44OZ44Oz44OI44Gu5paH5a2X5YiX44OH44O844K/XG4gICAgICogQHBhcmFtIGN1c3RvbURhdGEgQ3ViaXNtVXNlck1vZGVs44KS57aZ5om/44GX44Gf44Kk44Oz44K544K/44Oz44K544KS5oOz5a6aXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBjdWJpc21EZWZhdWx0TW90aW9uRXZlbnRDYWxsYmFjayhcbiAgICAgIGNhbGxlcjogQ3ViaXNtTW90aW9uUXVldWVNYW5hZ2VyLFxuICAgICAgZXZlbnRWYWx1ZTogY3NtU3RyaW5nLFxuICAgICAgY3VzdG9tRGF0YTogQ3ViaXNtVXNlck1vZGVsXG4gICAgKTogdm9pZCB7XG4gICAgICBjb25zdCBtb2RlbDogQ3ViaXNtVXNlck1vZGVsID0gY3VzdG9tRGF0YTtcblxuICAgICAgaWYgKG1vZGVsICE9IG51bGwpIHtcbiAgICAgICAgbW9kZWwubW90aW9uRXZlbnRGaXJlZChldmVudFZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDjgrPjg7Pjgrnjg4jjg6njgq/jgr9cbiAgICAgKi9cbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XG4gICAgICAvLyDlkITlpInmlbDliJ3mnJ/ljJZcbiAgICAgIHRoaXMuX21vYyA9IG51bGw7XG4gICAgICB0aGlzLl9tb2RlbCA9IG51bGw7XG4gICAgICB0aGlzLl9tb3Rpb25NYW5hZ2VyID0gbnVsbDtcbiAgICAgIHRoaXMuX2V4cHJlc3Npb25NYW5hZ2VyID0gbnVsbDtcbiAgICAgIHRoaXMuX2V5ZUJsaW5rID0gbnVsbDtcbiAgICAgIHRoaXMuX2JyZWF0aCA9IG51bGw7XG4gICAgICB0aGlzLl9tb2RlbE1hdHJpeCA9IG51bGw7XG4gICAgICB0aGlzLl9wb3NlID0gbnVsbDtcbiAgICAgIHRoaXMuX2RyYWdNYW5hZ2VyID0gbnVsbDtcbiAgICAgIHRoaXMuX3BoeXNpY3MgPSBudWxsO1xuICAgICAgdGhpcy5fbW9kZWxVc2VyRGF0YSA9IG51bGw7XG4gICAgICB0aGlzLl9pbml0aWFsaXplZCA9IGZhbHNlO1xuICAgICAgdGhpcy5fdXBkYXRpbmcgPSBmYWxzZTtcbiAgICAgIHRoaXMuX29wYWNpdHkgPSAxLjA7XG4gICAgICB0aGlzLl9saXBzeW5jID0gdHJ1ZTtcbiAgICAgIHRoaXMuX2xhc3RMaXBTeW5jVmFsdWUgPSAwLjA7XG4gICAgICB0aGlzLl9kcmFnWCA9IDAuMDtcbiAgICAgIHRoaXMuX2RyYWdZID0gMC4wO1xuICAgICAgdGhpcy5fYWNjZWxlcmF0aW9uWCA9IDAuMDtcbiAgICAgIHRoaXMuX2FjY2VsZXJhdGlvblkgPSAwLjA7XG4gICAgICB0aGlzLl9hY2NlbGVyYXRpb25aID0gMC4wO1xuICAgICAgdGhpcy5fZGVidWdNb2RlID0gZmFsc2U7XG4gICAgICB0aGlzLl9yZW5kZXJlciA9IG51bGw7XG5cbiAgICAgIC8vIOODouODvOOCt+ODp+ODs+ODnuODjeODvOOCuOODo+ODvOOCkuS9nOaIkFxuICAgICAgdGhpcy5fbW90aW9uTWFuYWdlciA9IG5ldyBDdWJpc21Nb3Rpb25NYW5hZ2VyKCk7XG4gICAgICB0aGlzLl9tb3Rpb25NYW5hZ2VyLnNldEV2ZW50Q2FsbGJhY2soXG4gICAgICAgIEN1YmlzbVVzZXJNb2RlbC5jdWJpc21EZWZhdWx0TW90aW9uRXZlbnRDYWxsYmFjayxcbiAgICAgICAgdGhpc1xuICAgICAgKTtcblxuICAgICAgLy8g6KGo5oOF44Oe44ON44O844K444Oj44O844KS5L2c5oiQXG4gICAgICB0aGlzLl9leHByZXNzaW9uTWFuYWdlciA9IG5ldyBDdWJpc21Nb3Rpb25NYW5hZ2VyKCk7XG5cbiAgICAgIC8vIOODieODqeODg+OCsOOBq+OCiOOCi+OCouODi+ODoeODvOOCt+ODp+ODs1xuICAgICAgdGhpcy5fZHJhZ01hbmFnZXIgPSBuZXcgQ3ViaXNtVGFyZ2V0UG9pbnQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDjg4fjgrnjg4jjg6njgq/jgr/jgavnm7jlvZPjgZnjgovlh6bnkIZcbiAgICAgKi9cbiAgICBwdWJsaWMgcmVsZWFzZSgpIHtcbiAgICAgIGlmICh0aGlzLl9tb3Rpb25NYW5hZ2VyICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5fbW90aW9uTWFuYWdlci5yZWxlYXNlKCk7XG4gICAgICAgIHRoaXMuX21vdGlvbk1hbmFnZXIgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5fZXhwcmVzc2lvbk1hbmFnZXIgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLl9leHByZXNzaW9uTWFuYWdlci5yZWxlYXNlKCk7XG4gICAgICAgIHRoaXMuX2V4cHJlc3Npb25NYW5hZ2VyID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuX21vYyAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuX21vYy5kZWxldGVNb2RlbCh0aGlzLl9tb2RlbCk7XG4gICAgICAgIHRoaXMuX21vYy5yZWxlYXNlKCk7XG4gICAgICAgIHRoaXMuX21vYyA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX21vZGVsTWF0cml4ID0gbnVsbDtcblxuICAgICAgQ3ViaXNtUG9zZS5kZWxldGUodGhpcy5fcG9zZSk7XG4gICAgICBDdWJpc21FeWVCbGluay5kZWxldGUodGhpcy5fZXllQmxpbmspO1xuICAgICAgQ3ViaXNtQnJlYXRoLmRlbGV0ZSh0aGlzLl9icmVhdGgpO1xuXG4gICAgICB0aGlzLl9kcmFnTWFuYWdlciA9IG51bGw7XG5cbiAgICAgIEN1YmlzbVBoeXNpY3MuZGVsZXRlKHRoaXMuX3BoeXNpY3MpO1xuICAgICAgQ3ViaXNtTW9kZWxVc2VyRGF0YS5kZWxldGUodGhpcy5fbW9kZWxVc2VyRGF0YSk7XG5cbiAgICAgIHRoaXMuZGVsZXRlUmVuZGVyZXIoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX21vYzogQ3ViaXNtTW9jOyAvLyBNb2Pjg4fjg7zjgr9cbiAgICBwcm90ZWN0ZWQgX21vZGVsOiBDdWJpc21Nb2RlbDsgLy8gTW9kZWzjgqTjg7Pjgrnjgr/jg7PjgrlcblxuICAgIHByb3RlY3RlZCBfbW90aW9uTWFuYWdlcjogQ3ViaXNtTW90aW9uTWFuYWdlcjsgLy8g44Oi44O844K344On44Oz566h55CGXG4gICAgcHJvdGVjdGVkIF9leHByZXNzaW9uTWFuYWdlcjogQ3ViaXNtTW90aW9uTWFuYWdlcjsgLy8g6KGo5oOF566h55CGXG4gICAgcHJvdGVjdGVkIF9leWVCbGluazogQ3ViaXNtRXllQmxpbms7IC8vIOiHquWLleOBvuOBsOOBn+OBjVxuICAgIHByb3RlY3RlZCBfYnJlYXRoOiBDdWJpc21CcmVhdGg7IC8vIOWRvOWQuFxuICAgIHByb3RlY3RlZCBfbW9kZWxNYXRyaXg6IEN1YmlzbU1vZGVsTWF0cml4OyAvLyDjg6Ljg4fjg6vooYzliJdcbiAgICBwcm90ZWN0ZWQgX3Bvc2U6IEN1YmlzbVBvc2U7IC8vIOODneODvOOCuueuoeeQhlxuICAgIHByb3RlY3RlZCBfZHJhZ01hbmFnZXI6IEN1YmlzbVRhcmdldFBvaW50OyAvLyDjg57jgqbjgrnjg4njg6njg4PjgrBcbiAgICBwcm90ZWN0ZWQgX3BoeXNpY3M6IEN1YmlzbVBoeXNpY3M7IC8vIOeJqeeQhua8lOeul1xuICAgIHByb3RlY3RlZCBfbW9kZWxVc2VyRGF0YTogQ3ViaXNtTW9kZWxVc2VyRGF0YTsgLy8g44Om44O844K244O844OH44O844K/XG5cbiAgICBwcm90ZWN0ZWQgX2luaXRpYWxpemVkOiBib29sZWFuOyAvLyDliJ3mnJ/ljJbjgZXjgozjgZ/jgYvjganjgYbjgYtcbiAgICBwcm90ZWN0ZWQgX3VwZGF0aW5nOiBib29sZWFuOyAvLyDmm7TmlrDjgZXjgozjgZ/jgYvjganjgYbjgYtcbiAgICBwcm90ZWN0ZWQgX29wYWNpdHk6IG51bWJlcjsgLy8g5LiN6YCP5piO5bqmXG4gICAgcHJvdGVjdGVkIF9saXBzeW5jOiBib29sZWFuOyAvLyDjg6rjg4Pjg5fjgrfjg7Pjgq/jgZnjgovjgYvjganjgYbjgYtcbiAgICBwcm90ZWN0ZWQgX2xhc3RMaXBTeW5jVmFsdWU6IG51bWJlcjsgLy8g5pyA5b6M44Gu44Oq44OD44OX44K344Oz44Kv44Gu5Yi25b6h5ZywXG4gICAgcHJvdGVjdGVkIF9kcmFnWDogbnVtYmVyOyAvLyDjg57jgqbjgrnjg4njg6njg4PjgrDjga5Y5L2N572uXG4gICAgcHJvdGVjdGVkIF9kcmFnWTogbnVtYmVyOyAvLyDjg57jgqbjgrnjg4njg6njg4PjgrDjga5Z5L2N572uXG4gICAgcHJvdGVjdGVkIF9hY2NlbGVyYXRpb25YOiBudW1iZXI7IC8vIFjou7jmlrnlkJHjga7liqDpgJ/luqZcbiAgICBwcm90ZWN0ZWQgX2FjY2VsZXJhdGlvblk6IG51bWJlcjsgLy8gWei7uOaWueWQkeOBruWKoOmAn+W6plxuICAgIHByb3RlY3RlZCBfYWNjZWxlcmF0aW9uWjogbnVtYmVyOyAvLyBa6Lu45pa55ZCR44Gu5Yqg6YCf5bqmXG4gICAgcHJvdGVjdGVkIF9kZWJ1Z01vZGU6IGJvb2xlYW47IC8vIOODh+ODkOODg+OCsOODouODvOODieOBi+OBqeOBhuOBi1xuXG4gICAgcHJpdmF0ZSBfcmVuZGVyZXI6IEN1YmlzbVJlbmRlcmVyX1dlYkdMOyAvLyDjg6zjg7Pjg4Djg6lcbiAgfVxufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQoYykgTGl2ZTJEIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSB0aGUgTGl2ZTJEIE9wZW4gU29mdHdhcmUgbGljZW5zZVxuICogdGhhdCBjYW4gYmUgZm91bmQgYXQgaHR0cHM6Ly93d3cubGl2ZTJkLmNvbS9ldWxhL2xpdmUyZC1vcGVuLXNvZnR3YXJlLWxpY2Vuc2UtYWdyZWVtZW50X2VuLmh0bWwuXG4gKi9cblxuaW1wb3J0IHsgTGl2ZTJEQ3ViaXNtRnJhbWV3b3JrIGFzIGN1YmlzbW1vdGlvbnF1ZXVlbWFuYWdlciB9IGZyb20gJy4vY3ViaXNtbW90aW9ucXVldWVtYW5hZ2VyJztcbmltcG9ydCB7IExpdmUyREN1YmlzbUZyYW1ld29yayBhcyBhY3ViaXNtbW90aW9uIH0gZnJvbSAnLi9hY3ViaXNtbW90aW9uJztcbmltcG9ydCB7IExpdmUyREN1YmlzbUZyYW1ld29yayBhcyBjdWJpc21tb2RlbCB9IGZyb20gJy4uL21vZGVsL2N1YmlzbW1vZGVsJztcbmltcG9ydCBDdWJpc21Nb3Rpb25RdWV1ZUVudHJ5SGFuZGxlID0gY3ViaXNtbW90aW9ucXVldWVtYW5hZ2VyLkN1YmlzbU1vdGlvblF1ZXVlRW50cnlIYW5kbGU7XG5pbXBvcnQgQ3ViaXNtTW9kZWwgPSBjdWJpc21tb2RlbC5DdWJpc21Nb2RlbDtcbmltcG9ydCBBQ3ViaXNtTW90aW9uID0gYWN1YmlzbW1vdGlvbi5BQ3ViaXNtTW90aW9uO1xuaW1wb3J0IEN1YmlzbU1vdGlvblF1ZXVlTWFuYWdlciA9IGN1YmlzbW1vdGlvbnF1ZXVlbWFuYWdlci5DdWJpc21Nb3Rpb25RdWV1ZU1hbmFnZXI7XG5cbmV4cG9ydCBuYW1lc3BhY2UgTGl2ZTJEQ3ViaXNtRnJhbWV3b3JrIHtcbiAgLyoqXG4gICAqIOODouODvOOCt+ODp+ODs+OBrueuoeeQhlxuICAgKlxuICAgKiDjg6Ljg7zjgrfjg6fjg7Pjga7nrqHnkIbjgpLooYzjgYbjgq/jg6njgrlcbiAgICovXG4gIGV4cG9ydCBjbGFzcyBDdWJpc21Nb3Rpb25NYW5hZ2VyIGV4dGVuZHMgQ3ViaXNtTW90aW9uUXVldWVNYW5hZ2VyIHtcbiAgICAvKipcbiAgICAgKiDjgrPjg7Pjgrnjg4jjg6njgq/jgr9cbiAgICAgKi9cbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XG4gICAgICBzdXBlcigpO1xuICAgICAgdGhpcy5fY3VycmVudFByaW9yaXR5ID0gMDtcbiAgICAgIHRoaXMuX3Jlc2VydmVQcmlvcml0eSA9IDA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5YaN55Sf5Lit44Gu44Oi44O844K344On44Oz44Gu5YSq5YWI5bqm44Gu5Y+W5b6XXG4gICAgICogQHJldHVybiAg44Oi44O844K344On44Oz44Gu5YSq5YWI5bqmXG4gICAgICovXG4gICAgcHVibGljIGdldEN1cnJlbnRQcmlvcml0eSgpOiBudW1iZXIge1xuICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRQcmlvcml0eTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDkuojntITkuK3jga7jg6Ljg7zjgrfjg6fjg7Pjga7lhKrlhYjluqbjgpLlj5blvpfjgZnjgovjgIJcbiAgICAgKiBAcmV0dXJuICDjg6Ljg7zjgrfjg6fjg7Pjga7lhKrlhYjluqZcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0UmVzZXJ2ZVByaW9yaXR5KCk6IG51bWJlciB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVzZXJ2ZVByaW9yaXR5O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOS6iOe0hOS4reOBruODouODvOOCt+ODp+ODs+OBruWEquWFiOW6puOCkuioreWumuOBmeOCi+OAglxuICAgICAqIEBwYXJhbSAgIHZhbCAgICAg5YSq5YWI5bqmXG4gICAgICovXG4gICAgcHVibGljIHNldFJlc2VydmVQcmlvcml0eSh2YWw6IG51bWJlcik6IHZvaWQge1xuICAgICAgdGhpcy5fcmVzZXJ2ZVByaW9yaXR5ID0gdmFsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiuvuWumuS8mOWFiOe6p+WQjuW8gOWni+WKqOS9nOOAglxuICAgICAqXG4gICAgICogQHBhcmFtIG1vdGlvbiAgICAgICAgICDliqjkvZxcbiAgICAgKiBAcGFyYW0gYXV0b0RlbGV0ZSAgICAgIOWGjeeUn+OBjOeLqeeMn+OBl+OBn+ODouODvOOCt+ODp+ODs+OBruOCpOODs+OCueOCv+ODs+OCueOCkuWJiumZpOOBmeOCi+OBquOCiXRydWVcbiAgICAgKiBAcGFyYW0gcHJpb3JpdHkgICAgICAgIOWEquWFiOW6plxuICAgICAqIEByZXR1cm4gICAgICAgICAgICAgICAg6L+U5Zue5byA5aeL55qE5Yqo5L2c55qE6K+G5Yir5Y+356CB44CC55So5LqO5Yik5a6a5Liq5Yir5Yqo5L2c5piv5ZCm57uT5p2f55qESXNGaW5pc2hlZO+8iO+8ieWPguaVsOOAguaXoOazleW8gOWni+aXtuS4uuKAnC0x4oCdXG4gICAgICovXG4gICAgcHVibGljIHN0YXJ0TW90aW9uUHJpb3JpdHkoXG4gICAgICBtb3Rpb246IEFDdWJpc21Nb3Rpb24sXG4gICAgICBhdXRvRGVsZXRlOiBib29sZWFuLFxuICAgICAgcHJpb3JpdHk6IG51bWJlclxuICAgICk6IEN1YmlzbU1vdGlvblF1ZXVlRW50cnlIYW5kbGUge1xuICAgICAgaWYgKHByaW9yaXR5ID09IHRoaXMuX3Jlc2VydmVQcmlvcml0eSkge1xuICAgICAgICB0aGlzLl9yZXNlcnZlUHJpb3JpdHkgPSAwOyAvLyDkuojntITjgpLop6PpmaRcbiAgICAgIH1cblxuICAgICAgdGhpcy5fY3VycmVudFByaW9yaXR5ID0gcHJpb3JpdHk7IC8vIOWGjeeUn+S4reODouODvOOCt+ODp+ODs+OBruWEquWFiOW6puOCkuioreWumlxuXG4gICAgICByZXR1cm4gc3VwZXIuc3RhcnRNb3Rpb24obW90aW9uLCBhdXRvRGVsZXRlLCB0aGlzLl91c2VyVGltZVNlY29uZHMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOODouODvOOCt+ODp+ODs+OCkuabtOaWsOOBl+OBpuOAgeODouODh+ODq+OBq+ODkeODqeODoeODvOOCv+WApOOCkuWPjeaYoOOBmeOCi+OAglxuICAgICAqXG4gICAgICogQHBhcmFtIG1vZGVsICAg5a++6LGh44Gu44Oi44OH44OrXG4gICAgICogQHBhcmFtIGRlbHRhVGltZVNlY29uZHMgICAg44OH44Or44K/5pmC6ZaTW+enkl1cbiAgICAgKiBAcmV0dXJuICB0cnVlICAgIOabtOaWsOOBleOCjOOBpuOBhOOCi1xuICAgICAqIEByZXR1cm4gIGZhbHNlICAg5pu05paw44GV44KM44Gm44GE44Gq44GEXG4gICAgICovXG4gICAgcHVibGljIHVwZGF0ZU1vdGlvbihtb2RlbDogQ3ViaXNtTW9kZWwsIGRlbHRhVGltZVNlY29uZHM6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgICAgdGhpcy5fdXNlclRpbWVTZWNvbmRzICs9IGRlbHRhVGltZVNlY29uZHM7XG5cbiAgICAgIGNvbnN0IHVwZGF0ZWQ6IGJvb2xlYW4gPSBzdXBlci5kb1VwZGF0ZU1vdGlvbihcbiAgICAgICAgbW9kZWwsXG4gICAgICAgIHRoaXMuX3VzZXJUaW1lU2Vjb25kc1xuICAgICAgKTtcblxuICAgICAgaWYgKHRoaXMuaXNGaW5pc2hlZCgpKSB7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRQcmlvcml0eSA9IDA7IC8vIOWGjeeUn+S4reOBruODouODvOOCt+ODp+ODs+OBruWEquWFiOW6puOCkuino+mZpFxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdXBkYXRlZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDjg6Ljg7zjgrfjg6fjg7PjgpLkuojntITjgZnjgovjgIJcbiAgICAgKlxuICAgICAqIEBwYXJhbSAgIHByaW9yaXR5ICAgIOWEquWFiOW6plxuICAgICAqIEByZXR1cm4gIHRydWUgICAg5LqI57SE44Gn44GN44GfXG4gICAgICogQHJldHVybiAgZmFsc2UgICDkuojntITjgafjgY3jgarjgYvjgaPjgZ9cbiAgICAgKi9cbiAgICBwdWJsaWMgcmVzZXJ2ZU1vdGlvbihwcmlvcml0eTogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgICBpZiAoXG4gICAgICAgIHByaW9yaXR5IDw9IHRoaXMuX3Jlc2VydmVQcmlvcml0eSB8fFxuICAgICAgICBwcmlvcml0eSA8PSB0aGlzLl9jdXJyZW50UHJpb3JpdHlcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3Jlc2VydmVQcmlvcml0eSA9IHByaW9yaXR5O1xuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBfY3VycmVudFByaW9yaXR5OiBudW1iZXI7IC8vIOePvuWcqOWGjeeUn+S4reOBruODouODvOOCt+ODp+ODs+OBruWEquWFiOW6plxuICAgIF9yZXNlcnZlUHJpb3JpdHk6IG51bWJlcjsgLy8g5YaN55Sf5LqI5a6a44Gu44Oi44O844K344On44Oz44Gu5YSq5YWI5bqm44CC5YaN55Sf5Lit44GvMOOBq+OBquOCi+OAguODouODvOOCt+ODp+ODs+ODleOCoeOCpOODq+OCkuWIpeOCueODrOODg+ODieOBp+iqreOBv+i+vOOCgOOBqOOBjeOBruapn+iDveOAglxuICB9XG59XG4iLCIvKipcbiAqIENvcHlyaWdodChjKSBMaXZlMkQgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IHRoZSBMaXZlMkQgT3BlbiBTb2Z0d2FyZSBsaWNlbnNlXG4gKiB0aGF0IGNhbiBiZSBmb3VuZCBhdCBodHRwczovL3d3dy5saXZlMmQuY29tL2V1bGEvbGl2ZTJkLW9wZW4tc29mdHdhcmUtbGljZW5zZS1hZ3JlZW1lbnRfZW4uaHRtbC5cbiAqL1xuXG5pbXBvcnQgeyBMaXZlMkRDdWJpc21GcmFtZXdvcmsgYXMgYWN1YmlzbW1vdGlvbiB9IGZyb20gJy4vYWN1YmlzbW1vdGlvbic7XG5pbXBvcnQgeyBMaXZlMkRDdWJpc21GcmFtZXdvcmsgYXMgY3ViaXNtbW90aW9ucXVldWVtYW5hZ2VyIH0gZnJvbSAnLi9jdWJpc21tb3Rpb25xdWV1ZW1hbmFnZXInO1xuaW1wb3J0IEN1YmlzbU1vdGlvblF1ZXVlRW50cnlIYW5kbGUgPSBjdWJpc21tb3Rpb25xdWV1ZW1hbmFnZXIuQ3ViaXNtTW90aW9uUXVldWVFbnRyeUhhbmRsZTtcbmltcG9ydCBBQ3ViaXNtTW90aW9uID0gYWN1YmlzbW1vdGlvbi5BQ3ViaXNtTW90aW9uO1xuXG5leHBvcnQgbmFtZXNwYWNlIExpdmUyREN1YmlzbUZyYW1ld29yayB7XG4gIC8qKlxuICAgKiBDdWJpc21Nb3Rpb25RdWV1ZU1hbmFnZXLjgaflho3nlJ/jgZfjgabjgYTjgovlkITjg6Ljg7zjgrfjg6fjg7Pjga7nrqHnkIbjgq/jg6njgrnjgIJcbiAgICovXG4gIGV4cG9ydCBjbGFzcyBDdWJpc21Nb3Rpb25RdWV1ZUVudHJ5IHtcbiAgICAvKipcbiAgICAgKiDjgrPjg7Pjgrnjg4jjg6njgq/jgr9cbiAgICAgKi9cbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XG4gICAgICB0aGlzLl9hdXRvRGVsZXRlID0gZmFsc2U7XG4gICAgICB0aGlzLl9tb3Rpb24gPSBudWxsO1xuICAgICAgdGhpcy5fYXZhaWxhYmxlID0gdHJ1ZTtcbiAgICAgIHRoaXMuX2ZpbmlzaGVkID0gZmFsc2U7XG4gICAgICB0aGlzLl9zdGFydGVkID0gZmFsc2U7XG4gICAgICB0aGlzLl9zdGFydFRpbWVTZWNvbmRzID0gLTEuMDtcbiAgICAgIHRoaXMuX2ZhZGVJblN0YXJ0VGltZVNlY29uZHMgPSAwLjA7XG4gICAgICB0aGlzLl9lbmRUaW1lU2Vjb25kcyA9IC0xLjA7XG4gICAgICB0aGlzLl9zdGF0ZVRpbWVTZWNvbmRzID0gMC4wO1xuICAgICAgdGhpcy5fc3RhdGVXZWlnaHQgPSAwLjA7XG4gICAgICB0aGlzLl9sYXN0RXZlbnRDaGVja1NlY29uZHMgPSAwLjA7XG4gICAgICB0aGlzLl9tb3Rpb25RdWV1ZUVudHJ5SGFuZGxlID0gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDjg4fjgrnjg4jjg6njgq/jgr/nm7jlvZPjga7lh6bnkIZcbiAgICAgKi9cbiAgICBwdWJsaWMgcmVsZWFzZSgpOiB2b2lkIHtcbiAgICAgIGlmICh0aGlzLl9hdXRvRGVsZXRlICYmIHRoaXMuX21vdGlvbikge1xuICAgICAgICBBQ3ViaXNtTW90aW9uLmRlbGV0ZSh0aGlzLl9tb3Rpb24pOyAvL1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOODleOCp+ODvOODieOCouOCpuODiOOBrumWi+Wni1xuICAgICAqIEBwYXJhbSBmYWRlT3V0U2Vjb25kcyDjg5Xjgqfjg7zjg4njgqLjgqbjg4jjgavjgYvjgYvjgovmmYLplpNb56eSXVxuICAgICAqIEBwYXJhbSB1c2VyVGltZVNlY29uZHMg44OH44Or44K/5pmC6ZaT44Gu56mN566X5YCkW+enkl1cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhcnRGYWRlb3V0KGZhZGVvdXRTZWNvbmRzOiBudW1iZXIsIHVzZXJUaW1lU2Vjb25kczogbnVtYmVyKTogdm9pZCB7XG4gICAgICBjb25zdCBuZXdFbmRUaW1lU2Vjb25kczogbnVtYmVyID0gdXNlclRpbWVTZWNvbmRzICsgZmFkZW91dFNlY29uZHM7XG5cbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy5fZW5kVGltZVNlY29uZHMgPCAwLjAgfHxcbiAgICAgICAgbmV3RW5kVGltZVNlY29uZHMgPCB0aGlzLl9lbmRUaW1lU2Vjb25kc1xuICAgICAgKSB7XG4gICAgICAgIHRoaXMuX2VuZFRpbWVTZWNvbmRzID0gbmV3RW5kVGltZVNlY29uZHM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog44Oi44O844K344On44Oz44Gu57WC5LqG44Gu56K66KqNXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHRydWUg44Oi44O844K344On44Oz44GM57WC5LqG44GX44GfXG4gICAgICogQHJldHVybiBmYWxzZSDntYLkuobjgZfjgabjgYTjgarjgYRcbiAgICAgKi9cbiAgICBwdWJsaWMgaXNGaW5pc2hlZCgpOiBib29sZWFuIHtcbiAgICAgIHJldHVybiB0aGlzLl9maW5pc2hlZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDjg6Ljg7zjgrfjg6fjg7Pjga7plovlp4vjga7norroqo1cbiAgICAgKiBAcmV0dXJuIHRydWUg44Oi44O844K344On44Oz44GM6ZaL5aeL44GX44GfXG4gICAgICogQHJldHVybiBmYWxzZSDplovlp4vjgZfjgabjgYTjgarjgYRcbiAgICAgKi9cbiAgICBwdWJsaWMgaXNTdGFydGVkKCk6IGJvb2xlYW4ge1xuICAgICAgcmV0dXJuIHRoaXMuX3N0YXJ0ZWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog44Oi44O844K344On44Oz44Gu6ZaL5aeL5pmC5Yi744Gu5Y+W5b6XXG4gICAgICogQHJldHVybiDjg6Ljg7zjgrfjg6fjg7Pjga7plovlp4vmmYLliLtb56eSXVxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRTdGFydFRpbWUoKTogbnVtYmVyIHtcbiAgICAgIHJldHVybiB0aGlzLl9zdGFydFRpbWVTZWNvbmRzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOODleOCp+ODvOODieOCpOODs+OBrumWi+Wni+aZguWIu+OBruWPluW+l1xuICAgICAqIEByZXR1cm4g44OV44Kn44O844OJ44Kk44Oz44Gu6ZaL5aeL5pmC5Yi7W+enkl1cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0RmFkZUluU3RhcnRUaW1lKCk6IG51bWJlciB7XG4gICAgICByZXR1cm4gdGhpcy5fZmFkZUluU3RhcnRUaW1lU2Vjb25kcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDjg5Xjgqfjg7zjg4njgqTjg7Pjga7ntYLkuobmmYLliLvjga7lj5blvpdcbiAgICAgKiBAcmV0dXJuIOODleOCp+ODvOODieOCpOODs+OBrue1guS6huaZguWIu+OBruWPluW+l1xuICAgICAqL1xuICAgIHB1YmxpYyBnZXRFbmRUaW1lKCk6IG51bWJlciB7XG4gICAgICByZXR1cm4gdGhpcy5fZW5kVGltZVNlY29uZHM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog44Oi44O844K344On44Oz44Gu6ZaL5aeL5pmC5Yi744Gu6Kit5a6aXG4gICAgICogQHBhcmFtIHN0YXJ0VGltZSDjg6Ljg7zjgrfjg6fjg7Pjga7plovlp4vmmYLliLtcbiAgICAgKi9cbiAgICBwdWJsaWMgc2V0U3RhcnRUaW1lKHN0YXJ0VGltZTogbnVtYmVyKTogdm9pZCB7XG4gICAgICB0aGlzLl9zdGFydFRpbWVTZWNvbmRzID0gc3RhcnRUaW1lO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOODleOCp+ODvOODieOCpOODs+OBrumWi+Wni+aZguWIu+OBruioreWumlxuICAgICAqIEBwYXJhbSBzdGFydFRpbWUg44OV44Kn44O844OJ44Kk44Oz44Gu6ZaL5aeL5pmC5Yi7W+enkl1cbiAgICAgKi9cbiAgICBwdWJsaWMgc2V0RmFkZUluU3RhcnRUaW1lKHN0YXJ0VGltZTogbnVtYmVyKTogdm9pZCB7XG4gICAgICB0aGlzLl9mYWRlSW5TdGFydFRpbWVTZWNvbmRzID0gc3RhcnRUaW1lO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOODleOCp+ODvOODieOCpOODs+OBrue1guS6huaZguWIu+OBruioreWumlxuICAgICAqIEBwYXJhbSBlbmRUaW1lIOODleOCp+ODvOODieOCpOODs+OBrue1guS6huaZguWIu1vnp5JdXG4gICAgICovXG4gICAgcHVibGljIHNldEVuZFRpbWUoZW5kVGltZTogbnVtYmVyKTogdm9pZCB7XG4gICAgICB0aGlzLl9lbmRUaW1lU2Vjb25kcyA9IGVuZFRpbWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog44Oi44O844K344On44Oz44Gu57WC5LqG44Gu6Kit5a6aXG4gICAgICogQHBhcmFtIGYgdHJ1ZeOBquOCieODouODvOOCt+ODp+ODs+OBrue1guS6hlxuICAgICAqL1xuICAgIHB1YmxpYyBzZXRJc0ZpbmlzaGVkKGY6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgIHRoaXMuX2ZpbmlzaGVkID0gZjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDjg6Ljg7zjgrfjg6fjg7Pplovlp4vjga7oqK3lrppcbiAgICAgKiBAcGFyYW0gZiB0cnVl44Gq44KJ44Oi44O844K344On44Oz44Gu6ZaL5aeLXG4gICAgICovXG4gICAgcHVibGljIHNldElzU3RhcnRlZChmOiBib29sZWFuKTogdm9pZCB7XG4gICAgICB0aGlzLl9zdGFydGVkID0gZjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDjg6Ljg7zjgrfjg6fjg7Pjga7mnInlirnmgKfjga7norroqo1cbiAgICAgKiBAcmV0dXJuIHRydWUg44Oi44O844K344On44Oz44Gv5pyJ5Yq5XG4gICAgICogQHJldHVybiBmYWxzZSDjg6Ljg7zjgrfjg6fjg7Pjga/nhKHlirlcbiAgICAgKi9cbiAgICBwdWJsaWMgaXNBdmFpbGFibGUoKTogYm9vbGVhbiB7XG4gICAgICByZXR1cm4gdGhpcy5fYXZhaWxhYmxlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOODouODvOOCt+ODp+ODs+OBruacieWKueaAp+OBruioreWumlxuICAgICAqIEBwYXJhbSB2IHRydWXjgarjgonjg6Ljg7zjgrfjg6fjg7Pjga/mnInlirlcbiAgICAgKi9cbiAgICBwdWJsaWMgc2V0SXNBdmFpbGFibGUodjogYm9vbGVhbik6IHZvaWQge1xuICAgICAgdGhpcy5fYXZhaWxhYmxlID0gdjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDjg6Ljg7zjgrfjg6fjg7Pjga7nirbmhYvjga7oqK3lrppcbiAgICAgKiBAcGFyYW0gdGltZVNlY29uZHMg54++5Zyo5pmC5Yi7W+enkl1cbiAgICAgKiBAcGFyYW0gd2VpZ2h0IOODouODvOOCt+ODp+ODs+WwvumHjeOBv1xuICAgICAqL1xuICAgIHB1YmxpYyBzZXRTdGF0ZSh0aW1lU2Vjb25kczogbnVtYmVyLCB3ZWlnaHQ6IG51bWJlcik6IHZvaWQge1xuICAgICAgdGhpcy5fc3RhdGVUaW1lU2Vjb25kcyA9IHRpbWVTZWNvbmRzO1xuICAgICAgdGhpcy5fc3RhdGVXZWlnaHQgPSB3ZWlnaHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog44Oi44O844K344On44Oz44Gu54++5Zyo5pmC5Yi744Gu5Y+W5b6XXG4gICAgICogQHJldHVybiDjg6Ljg7zjgrfjg6fjg7Pjga7nj77lnKjmmYLliLtb56eSXVxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRTdGF0ZVRpbWUoKTogbnVtYmVyIHtcbiAgICAgIHJldHVybiB0aGlzLl9zdGF0ZVRpbWVTZWNvbmRzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOODouODvOOCt+ODp+ODs+OBrumHjeOBv+OBruWPluW+l1xuICAgICAqIEByZXR1cm4g44Oi44O844K344On44Oz44Gu6YeN44G/XG4gICAgICovXG4gICAgcHVibGljIGdldFN0YXRlV2VpZ2h0KCk6IG51bWJlciB7XG4gICAgICByZXR1cm4gdGhpcy5fc3RhdGVXZWlnaHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5pyA5b6M44Gr44Kk44OZ44Oz44OI44Gu55m654Gr44KS44OB44Kn44OD44Kv44GX44Gf5pmC6ZaT44KS5Y+W5b6XXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIOacgOW+jOOBq+OCpOODmeODs+ODiOOBrueZuueBq+OCkuODgeOCp+ODg+OCr+OBl+OBn+aZgumWk1vnp5JdXG4gICAgICovXG4gICAgcHVibGljIGdldExhc3RDaGVja0V2ZW50VGltZSgpOiBudW1iZXIge1xuICAgICAgcmV0dXJuIHRoaXMuX2xhc3RFdmVudENoZWNrU2Vjb25kcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmnIDlvozjgavjgqTjg5njg7Pjg4jjgpLjg4Hjgqfjg4Pjgq/jgZfjgZ/mmYLplpPjgpLoqK3lrppcbiAgICAgKiBAcGFyYW0gY2hlY2tUaW1lIOacgOW+jOOBq+OCpOODmeODs+ODiOOCkuODgeOCp+ODg+OCr+OBl+OBn+aZgumWk1vnp5JdXG4gICAgICovXG4gICAgcHVibGljIHNldExhc3RDaGVja0V2ZW50VGltZShjaGVja1RpbWU6IG51bWJlcik6IHZvaWQge1xuICAgICAgdGhpcy5fbGFzdEV2ZW50Q2hlY2tTZWNvbmRzID0gY2hlY2tUaW1lO1xuICAgIH1cblxuICAgIF9hdXRvRGVsZXRlOiBib29sZWFuOyAvLyDoh6rli5XliYrpmaRcbiAgICBfbW90aW9uOiBBQ3ViaXNtTW90aW9uOyAvLyDjg6Ljg7zjgrfjg6fjg7NcblxuICAgIF9hdmFpbGFibGU6IGJvb2xlYW47IC8vIOacieWKueWMluODleODqeOCsFxuICAgIF9maW5pc2hlZDogYm9vbGVhbjsgLy8g57WC5LqG44OV44Op44KwXG4gICAgX3N0YXJ0ZWQ6IGJvb2xlYW47IC8vIOmWi+Wni+ODleODqeOCsFxuICAgIF9zdGFydFRpbWVTZWNvbmRzOiBudW1iZXI7IC8vIOODouODvOOCt+ODp+ODs+WGjeeUn+mWi+Wni+aZguWIu1vnp5JdXG4gICAgX2ZhZGVJblN0YXJ0VGltZVNlY29uZHM6IG51bWJlcjsgLy8g44OV44Kn44O844OJ44Kk44Oz6ZaL5aeL5pmC5Yi777yI44Or44O844OX44Gu5pmC44Gv5Yid5Zue44Gu44G/77yJW+enkl1cbiAgICBfZW5kVGltZVNlY29uZHM6IG51bWJlcjsgLy8g57WC5LqG5LqI5a6a5pmC5Yi7W+enkl1cbiAgICBfc3RhdGVUaW1lU2Vjb25kczogbnVtYmVyOyAvLyDmmYLliLvjga7nirbmhYtb56eSXVxuICAgIF9zdGF0ZVdlaWdodDogbnVtYmVyOyAvLyDph43jgb/jga7nirbmhYtcbiAgICBfbGFzdEV2ZW50Q2hlY2tTZWNvbmRzOiBudW1iZXI7IC8vIOacgOe1guOBrk1vdGlvbuWBtOOBruODgeOCp+ODg+OCr+OBl+OBn+aZgumWk1xuXG4gICAgX21vdGlvblF1ZXVlRW50cnlIYW5kbGU6IEN1YmlzbU1vdGlvblF1ZXVlRW50cnlIYW5kbGU7IC8vIOavj+S4quWunuS+i+WFt+acieWUr+S4gOWAvOeahOagh+ivhuWPt1xuICB9XG59XG4iLCIvKipcbiAqIENvcHlyaWdodChjKSBMaXZlMkQgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IHRoZSBMaXZlMkQgT3BlbiBTb2Z0d2FyZSBsaWNlbnNlXG4gKiB0aGF0IGNhbiBiZSBmb3VuZCBhdCBodHRwczovL3d3dy5saXZlMmQuY29tL2V1bGEvbGl2ZTJkLW9wZW4tc29mdHdhcmUtbGljZW5zZS1hZ3JlZW1lbnRfZW4uaHRtbC5cbiAqL1xuXG5pbXBvcnQgeyBMaXZlMkRDdWJpc21GcmFtZXdvcmsgYXMgYWN1YmlzbW1vdGlvbiB9IGZyb20gJy4vYWN1YmlzbW1vdGlvbic7XG5pbXBvcnQgeyBMaXZlMkRDdWJpc21GcmFtZXdvcmsgYXMgY3ViaXNtbW90aW9ucXVldWVlbnRyeSB9IGZyb20gJy4vY3ViaXNtbW90aW9ucXVldWVlbnRyeSc7XG5pbXBvcnQgeyBMaXZlMkRDdWJpc21GcmFtZXdvcmsgYXMgY3NtdmVjdG9yIH0gZnJvbSAnLi4vdHlwZS9jc212ZWN0b3InO1xuaW1wb3J0IHsgTGl2ZTJEQ3ViaXNtRnJhbWV3b3JrIGFzIGN1YmlzbW1vZGVsIH0gZnJvbSAnLi4vbW9kZWwvY3ViaXNtbW9kZWwnO1xuaW1wb3J0IHsgTGl2ZTJEQ3ViaXNtRnJhbWV3b3JrIGFzIGNzbXN0cmluZyB9IGZyb20gJy4uL3R5cGUvY3Ntc3RyaW5nJztcbmltcG9ydCBjc21TdHJpbmcgPSBjc21zdHJpbmcuY3NtU3RyaW5nO1xuaW1wb3J0IEN1YmlzbU1vZGVsID0gY3ViaXNtbW9kZWwuQ3ViaXNtTW9kZWw7XG5pbXBvcnQgY3NtVmVjdG9yID0gY3NtdmVjdG9yLmNzbVZlY3RvcjtcbmltcG9ydCBpdGVyYXRvciA9IGNzbXZlY3Rvci5pdGVyYXRvcjtcbmltcG9ydCBDdWJpc21Nb3Rpb25RdWV1ZUVudHJ5ID0gY3ViaXNtbW90aW9ucXVldWVlbnRyeS5DdWJpc21Nb3Rpb25RdWV1ZUVudHJ5O1xuaW1wb3J0IEFDdWJpc21Nb3Rpb24gPSBhY3ViaXNtbW90aW9uLkFDdWJpc21Nb3Rpb247XG5cbmV4cG9ydCBuYW1lc3BhY2UgTGl2ZTJEQ3ViaXNtRnJhbWV3b3JrIHtcbiAgLyoqXG4gICAqIOODouODvOOCt+ODp+ODs+WGjeeUn+OBrueuoeeQhlxuICAgKlxuICAgKiDjg6Ljg7zjgrfjg6fjg7Plho3nlJ/jga7nrqHnkIbnlKjjgq/jg6njgrnjgIJDdWJpc21Nb3Rpb27jg6Ljg7zjgrfjg6fjg7PjgarjgalBQ3ViaXNtTW90aW9u44Gu44K144OW44Kv44Op44K544KS5YaN55Sf44GZ44KL44Gf44KB44Gr5L2/55So44GZ44KL44CCXG4gICAqXG4gICAqIEBub3RlIOWGjeeUn+S4reOBq+WIpeOBruODouODvOOCt+ODp+ODs+OBjCBTdGFydE1vdGlvbigp44GV44KM44Gf5aC05ZCI44Gv44CB5paw44GX44GE44Oi44O844K344On44Oz44Gr5ruR44KJ44GL44Gr5aSJ5YyW44GX5pen44Oi44O844K344On44Oz44Gv5Lit5pat44GZ44KL44CCXG4gICAqICAgICAgIOihqOaDheeUqOODouODvOOCt+ODp+ODs+OAgeS9k+eUqOODouODvOOCt+ODp+ODs+OBquOBqeOCkuWIhuOBkeOBpuODouODvOOCt+ODp+ODs+WMluOBl+OBn+WgtOWQiOOBquOBqeOAgVxuICAgKiAgICAgICDopIfmlbDjga7jg6Ljg7zjgrfjg6fjg7PjgpLlkIzmmYLjgavlho3nlJ/jgZXjgZvjgovloLTlkIjjga/jgIHopIfmlbDjga5DdWJpc21Nb3Rpb25RdWV1ZU1hbmFnZXLjgqTjg7Pjgrnjgr/jg7PjgrnjgpLkvb/nlKjjgZnjgovjgIJcbiAgICovXG4gIGV4cG9ydCBjbGFzcyBDdWJpc21Nb3Rpb25RdWV1ZU1hbmFnZXIge1xuICAgIC8qKlxuICAgICAqIOOCs+ODs+OCueODiOODqeOCr+OCv1xuICAgICAqL1xuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcbiAgICAgIHRoaXMuX3VzZXJUaW1lU2Vjb25kcyA9IDAuMDtcbiAgICAgIHRoaXMuX2V2ZW50Q2FsbEJhY2sgPSBudWxsO1xuICAgICAgdGhpcy5fZXZlbnRDdXN0b21EYXRhID0gbnVsbDtcbiAgICAgIHRoaXMuX21vdGlvbnMgPSBuZXcgY3NtVmVjdG9yPEN1YmlzbU1vdGlvblF1ZXVlRW50cnk+KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog44OH44K544OI44Op44Kv44K/XG4gICAgICovXG4gICAgcHVibGljIHJlbGVhc2UoKTogdm9pZCB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX21vdGlvbnMuZ2V0U2l6ZSgpOyArK2kpIHtcbiAgICAgICAgaWYgKHRoaXMuX21vdGlvbnMuYXQoaSkpIHtcbiAgICAgICAgICB0aGlzLl9tb3Rpb25zLmF0KGkpLnJlbGVhc2UoKTtcbiAgICAgICAgICB0aGlzLl9tb3Rpb25zLnNldChpLCB2b2lkIDApO1xuICAgICAgICAgIHRoaXMuX21vdGlvbnMuc2V0KGksIG51bGwpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX21vdGlvbnMgPSBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOaMh+WumuWKqOS9nOeahOW8gOWni1xuICAgICAqXG4gICAgICog5byA5aeL5oyH5a6a55qE5Yqo5L2c44CC5aaC5p6c5bey57uP5pyJ55u45ZCM57G75Z6L55qE5Yqo5L2c77yM5YiZ5a+5546w5pyJ5Yqo5L2c56uL57uT5p2f5qCH5b+X77yM5byA5aeL5reh5Ye644CCXG4gICAgICpcbiAgICAgKiBAcGFyYW0gICBtb3Rpb24gICAgICAgICAgICAgIOW8gOWni+eahOWKqOS9nFxuICAgICAqIEBwYXJhbSAgIGF1dG9EZWxldGUgICAgICAgICAg5Yig6Zmk5pKt5pS+57uT5p2f55qE5Yqo5L2c5a6e5L6LIHRydWVcbiAgICAgKiBAcGFyYW0gICB1c2VyVGltZVNlY29uZHMgICAgIOWinumHj+aXtumXtOeahOe0r+iuoeWAvFvnp5JdXG4gICAgICogQHJldHVybiAgICAgICAgICAgICAgICAgICAgICDov5Tlm57lvIDlp4vnmoTliqjkvZznmoTor4bliKvlj7fnoIHjgILnlKjkuo7liKTlrprkuKrliKvliqjkvZzmmK/lkKbnu5PmnZ/nmoRJc0ZpbmlzaGVk77yI77yJ5Y+C5pWw44CC5peg5rOV5byA5aeL5pe25Li64oCcLTHigJ1cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhcnRNb3Rpb24oXG4gICAgICBtb3Rpb246IEFDdWJpc21Nb3Rpb24sXG4gICAgICBhdXRvRGVsZXRlOiBib29sZWFuLFxuICAgICAgdXNlclRpbWVTZWNvbmRzOiBudW1iZXJcbiAgICApOiBDdWJpc21Nb3Rpb25RdWV1ZUVudHJ5SGFuZGxlIHtcbiAgICAgIGlmIChtb3Rpb24gPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gSW52YWxpZE1vdGlvblF1ZXVlRW50cnlIYW5kbGVWYWx1ZTtcbiAgICAgIH1cblxuICAgICAgbGV0IG1vdGlvblF1ZXVlRW50cnk6IEN1YmlzbU1vdGlvblF1ZXVlRW50cnkgPSBudWxsO1xuICAgICAgXG4gICAgICAvL+WmguaenOW3sue7j+acieWKqOS9nOeahOivneWwseeri+e7k+adn+agh+W/l1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9tb3Rpb25zLmdldFNpemUoKTsgKytpKSB7XG4gICAgICAgIG1vdGlvblF1ZXVlRW50cnkgPSB0aGlzLl9tb3Rpb25zLmF0KGkpO1xuICAgICAgICBpZiAobW90aW9uUXVldWVFbnRyeSA9PSBudWxsKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBtb3Rpb25RdWV1ZUVudHJ5LnN0YXJ0RmFkZW91dChcbiAgICAgICAgICBtb3Rpb25RdWV1ZUVudHJ5Ll9tb3Rpb24uZ2V0RmFkZU91dFRpbWUoKSxcbiAgICAgICAgICB1c2VyVGltZVNlY29uZHNcbiAgICAgICAgKTsgLy8g5byA5aeL5reh5Ye65bm26YCA5Ye6XG4gICAgICB9XG5cbiAgICAgIG1vdGlvblF1ZXVlRW50cnkgPSBuZXcgQ3ViaXNtTW90aW9uUXVldWVFbnRyeSgpOyAvLyDpgIDlh7rml7bkuKLlvINcbiAgICAgIG1vdGlvblF1ZXVlRW50cnkuX2F1dG9EZWxldGUgPSBhdXRvRGVsZXRlO1xuICAgICAgbW90aW9uUXVldWVFbnRyeS5fbW90aW9uID0gbW90aW9uO1xuICAgICAgLy8gY29uc29sZS5sb2coJ2V2ZW50Q291bnQnLG1vdGlvblsnX21vdGlvbkRhdGEnXSlcbiAgICAgIC8vIOa3u+WKoOi2hemikeWKqOS9nOaLpuaIquWZqO+8jOaNrua1i+ivle+8jGN1cnZlQ291bnTotoXov4cxMDDnmoTmqKHlnovkvJrlr7zoh7TliqjkvZzlvILluLgs5b6F5L+u5aSNIDIwMjAuOS4xMVxuICAgICAgaWYobW90aW9uWydfbW90aW9uRGF0YSddWydjdXJ2ZUNvdW50J108MTAwKXtcbiAgICAgICAgdGhpcy5fbW90aW9ucy5wdXNoQmFjayhtb3Rpb25RdWV1ZUVudHJ5KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG1vdGlvblF1ZXVlRW50cnkuX21vdGlvblF1ZXVlRW50cnlIYW5kbGU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5YWo44Gm44Gu44Oi44O844K344On44Oz44Gu57WC5LqG44Gu56K66KqNXG4gICAgICogQHJldHVybiB0cnVlIOWFqOOBpue1guS6huOBl+OBpuOBhOOCi1xuICAgICAqIEByZXR1cm4gZmFsc2Ug57WC5LqG44GX44Gm44GE44Gq44GEXG4gICAgICovXG4gICAgcHVibGljIGlzRmluaXNoZWQoKTogYm9vbGVhbiB7XG4gICAgICAvLyAtLS0tLS0tIOWHpueQhuOCkuihjOOBhiAtLS0tLS0tXG4gICAgICAvLyDml6Ljgavjg6Ljg7zjgrfjg6fjg7PjgYzjgYLjgozjgbDntYLkuobjg5Xjg6njgrDjgpLnq4vjgabjgotcblxuICAgICAgZm9yIChcbiAgICAgICAgbGV0IGl0ZTogaXRlcmF0b3I8Q3ViaXNtTW90aW9uUXVldWVFbnRyeT4gPSB0aGlzLl9tb3Rpb25zLmJlZ2luKCk7XG4gICAgICAgIGl0ZS5ub3RFcXVhbCh0aGlzLl9tb3Rpb25zLmVuZCgpKTtcblxuICAgICAgKSB7XG4gICAgICAgIGxldCBtb3Rpb25RdWV1ZUVudHJ5OiBDdWJpc21Nb3Rpb25RdWV1ZUVudHJ5ID0gaXRlLnB0cigpO1xuXG4gICAgICAgIGlmIChtb3Rpb25RdWV1ZUVudHJ5ID09IG51bGwpIHtcbiAgICAgICAgICBpdGUgPSB0aGlzLl9tb3Rpb25zLmVyYXNlKGl0ZSk7IC8vIOWJiumZpFxuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbW90aW9uOiBBQ3ViaXNtTW90aW9uID0gbW90aW9uUXVldWVFbnRyeS5fbW90aW9uO1xuXG4gICAgICAgIGlmIChtb3Rpb24gPT0gbnVsbCkge1xuICAgICAgICAgIG1vdGlvblF1ZXVlRW50cnkucmVsZWFzZSgpO1xuICAgICAgICAgIG1vdGlvblF1ZXVlRW50cnkgPSB2b2lkIDA7XG4gICAgICAgICAgbW90aW9uUXVldWVFbnRyeSA9IG51bGw7XG4gICAgICAgICAgaXRlID0gdGhpcy5fbW90aW9ucy5lcmFzZShpdGUpOyAvLyDliYrpmaRcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIC0tLS0tIOe1guS6hua4iOOBv+OBruWHpueQhuOBjOOBguOCjOOBsOWJiumZpOOBmeOCiyAtLS0tLS1cbiAgICAgICAgaWYgKCFtb3Rpb25RdWV1ZUVudHJ5LmlzRmluaXNoZWQoKSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGUucHJlSW5jcmVtZW50KCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5oyH5a6a44GX44Gf44Oi44O844K344On44Oz44Gu57WC5LqG44Gu56K66KqNXG4gICAgICogQHBhcmFtIG1vdGlvblF1ZXVlRW50cnlOdW1iZXIg44Oi44O844K344On44Oz44Gu6K2Y5Yil55Wq5Y+3XG4gICAgICogQHJldHVybiB0cnVlIOWFqOOBpue1guS6huOBl+OBpuOBhOOCi1xuICAgICAqIEByZXR1cm4gZmFsc2Ug57WC5LqG44GX44Gm44GE44Gq44GEXG4gICAgICovXG4gICAgcHVibGljIGlzRmluaXNoZWRCeUhhbmRsZShcbiAgICAgIG1vdGlvblF1ZXVlRW50cnlOdW1iZXI6IEN1YmlzbU1vdGlvblF1ZXVlRW50cnlIYW5kbGVcbiAgICApOiBib29sZWFuIHtcbiAgICAgIC8vIOaXouOBq+ODouODvOOCt+ODp+ODs+OBjOOBguOCjOOBsOe1guS6huODleODqeOCsOOCkueri+OBpuOCi1xuICAgICAgZm9yIChcbiAgICAgICAgbGV0IGl0ZTogaXRlcmF0b3I8Q3ViaXNtTW90aW9uUXVldWVFbnRyeT4gPSB0aGlzLl9tb3Rpb25zLmJlZ2luKCk7XG4gICAgICAgIGl0ZS5ub3RFcXVhbCh0aGlzLl9tb3Rpb25zLmVuZCgpKTtcbiAgICAgICAgaXRlLmluY3JlbWVudCgpXG4gICAgICApIHtcbiAgICAgICAgY29uc3QgbW90aW9uUXVldWVFbnRyeTogQ3ViaXNtTW90aW9uUXVldWVFbnRyeSA9IGl0ZS5wdHIoKTtcblxuICAgICAgICBpZiAobW90aW9uUXVldWVFbnRyeSA9PSBudWxsKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXG4gICAgICAgICAgbW90aW9uUXVldWVFbnRyeS5fbW90aW9uUXVldWVFbnRyeUhhbmRsZSA9PSBtb3Rpb25RdWV1ZUVudHJ5TnVtYmVyICYmXG4gICAgICAgICAgIW1vdGlvblF1ZXVlRW50cnkuaXNGaW5pc2hlZCgpXG4gICAgICAgICkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5YWo44Gm44Gu44Oi44O844K344On44Oz44KS5YGc5q2i44GZ44KLXG4gICAgICovXG4gICAgcHVibGljIHN0b3BBbGxNb3Rpb25zKCk6IHZvaWQge1xuICAgICAgLy8gLS0tLS0tLSDlh6bnkIbjgpLooYzjgYYgLS0tLS0tLVxuICAgICAgLy8g5pei44Gr44Oi44O844K344On44Oz44GM44GC44KM44Gw57WC5LqG44OV44Op44Kw44KS56uL44Gm44KLXG5cbiAgICAgIGZvciAoXG4gICAgICAgIGxldCBpdGU6IGl0ZXJhdG9yPEN1YmlzbU1vdGlvblF1ZXVlRW50cnk+ID0gdGhpcy5fbW90aW9ucy5iZWdpbigpO1xuICAgICAgICBpdGUubm90RXF1YWwodGhpcy5fbW90aW9ucy5lbmQoKSk7XG5cbiAgICAgICkge1xuICAgICAgICBsZXQgbW90aW9uUXVldWVFbnRyeTogQ3ViaXNtTW90aW9uUXVldWVFbnRyeSA9IGl0ZS5wdHIoKTtcblxuICAgICAgICBpZiAobW90aW9uUXVldWVFbnRyeSA9PSBudWxsKSB7XG4gICAgICAgICAgaXRlID0gdGhpcy5fbW90aW9ucy5lcmFzZShpdGUpO1xuXG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyAtLS0tLSDntYLkuobmuIjjgb/jga7lh6bnkIbjgYzjgYLjgozjgbDliYrpmaTjgZnjgosgLS0tLS0tXG4gICAgICAgIG1vdGlvblF1ZXVlRW50cnkucmVsZWFzZSgpO1xuICAgICAgICBtb3Rpb25RdWV1ZUVudHJ5ID0gdm9pZCAwO1xuICAgICAgICBtb3Rpb25RdWV1ZUVudHJ5ID0gbnVsbDtcbiAgICAgICAgaXRlID0gdGhpcy5fbW90aW9ucy5lcmFzZShpdGUpOyAvLyDliYrpmaRcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgICAgICog5oyH5a6a44GX44GfQ3ViaXNtTW90aW9uUXVldWVFbnRyeeOBruWPluW+l1xuXG4gICAgICAgICAqIEBwYXJhbSAgIG1vdGlvblF1ZXVlRW50cnlOdW1iZXIgIOODouODvOOCt+ODp+ODs+OBruitmOWIpeeVquWPt1xuICAgICAgICAgKiBAcmV0dXJuICDmjIflrprjgZfjgZ9DdWJpc21Nb3Rpb25RdWV1ZUVudHJ5XG4gICAgICAgICAqIEByZXR1cm4gIG51bGwgICDopovjgaTjgYvjgonjgarjgYvjgaPjgZ9cbiAgICAgICAgICovXG4gICAgcHVibGljIGdldEN1YmlzbU1vdGlvblF1ZXVlRW50cnkoXG4gICAgICBtb3Rpb25RdWV1ZUVudHJ5TnVtYmVyOiBhbnlcbiAgICApOiBDdWJpc21Nb3Rpb25RdWV1ZUVudHJ5IHtcbiAgICAgIC8vLS0tLS0tLSDlh6bnkIbjgpLooYzjgYYgLS0tLS0tLVxuICAgICAgLy8g5pei44Gr44Oi44O844K344On44Oz44GM44GC44KM44Gw57WC5LqG44OV44Op44Kw44KS56uL44Gm44KLXG4gICAgICBmb3IgKFxuICAgICAgICBsZXQgaXRlOiBpdGVyYXRvcjxDdWJpc21Nb3Rpb25RdWV1ZUVudHJ5PiA9IHRoaXMuX21vdGlvbnMuYmVnaW4oKTtcbiAgICAgICAgaXRlLm5vdEVxdWFsKHRoaXMuX21vdGlvbnMuZW5kKCkpO1xuICAgICAgICBpdGUucHJlSW5jcmVtZW50KClcbiAgICAgICkge1xuICAgICAgICBjb25zdCBtb3Rpb25RdWV1ZUVudHJ5OiBDdWJpc21Nb3Rpb25RdWV1ZUVudHJ5ID0gaXRlLnB0cigpO1xuXG4gICAgICAgIGlmIChtb3Rpb25RdWV1ZUVudHJ5ID09IG51bGwpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChcbiAgICAgICAgICBtb3Rpb25RdWV1ZUVudHJ5Ll9tb3Rpb25RdWV1ZUVudHJ5SGFuZGxlID09IG1vdGlvblF1ZXVlRW50cnlOdW1iZXJcbiAgICAgICAgKSB7XG4gICAgICAgICAgcmV0dXJuIG1vdGlvblF1ZXVlRW50cnk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog44Kk44OZ44Oz44OI44KS5Y+X44GR5Y+W44KLQ2FsbGJhY2vjga7nmbvpjLJcbiAgICAgKlxuICAgICAqIEBwYXJhbSBjYWxsYmFjayDjgrPjg7zjg6vjg5Djg4Pjgq/plqLmlbBcbiAgICAgKiBAcGFyYW0gY3VzdG9tRGF0YSDjgrPjg7zjg6vjg5Djg4Pjgq/jgavov5TjgZXjgozjgovjg4fjg7zjgr9cbiAgICAgKi9cbiAgICBwdWJsaWMgc2V0RXZlbnRDYWxsYmFjayhcbiAgICAgIGNhbGxiYWNrOiBDdWJpc21Nb3Rpb25FdmVudEZ1bmN0aW9uLFxuICAgICAgY3VzdG9tRGF0YTogYW55ID0gbnVsbFxuICAgICk6IHZvaWQge1xuICAgICAgdGhpcy5fZXZlbnRDYWxsQmFjayA9IGNhbGxiYWNrO1xuICAgICAgdGhpcy5fZXZlbnRDdXN0b21EYXRhID0gY3VzdG9tRGF0YTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDjg6Ljg7zjgrfjg6fjg7PjgpLmm7TmlrDjgZfjgabjgIHjg6Ljg4fjg6vjgavjg5Hjg6njg6Hjg7zjgr/lgKTjgpLlj43mmKDjgZnjgovjgIJcbiAgICAgKlxuICAgICAqIEBwYXJhbSAgIG1vZGVsICAg5a++6LGh44Gu44Oi44OH44OrXG4gICAgICogQHBhcmFtICAgdXNlclRpbWVTZWNvbmRzICAg44OH44Or44K/5pmC6ZaT44Gu56mN566X5YCkW+enkl1cbiAgICAgKiBAcmV0dXJuICB0cnVlICAgIOODouODh+ODq+OBuOODkeODqeODoeODvOOCv+WApOOBruWPjeaYoOOBguOCilxuICAgICAqIEByZXR1cm4gIGZhbHNlICAg44Oi44OH44Or44G444OR44Op44Oh44O844K/5YCk44Gu5Y+N5pig44Gq44GXKOODouODvOOCt+ODp+ODs+OBruWkieWMluOBquOBlylcbiAgICAgKi9cbiAgICBwdWJsaWMgZG9VcGRhdGVNb3Rpb24oXG4gICAgICBtb2RlbDogQ3ViaXNtTW9kZWwsXG4gICAgICB1c2VyVGltZVNlY29uZHM6IG51bWJlclxuICAgICk6IGJvb2xlYW4ge1xuICAgICAgbGV0IHVwZGF0ZWQgPSBmYWxzZTtcblxuICAgICAgLy8gLS0tLS0tLSDlh6bnkIbjgpLooYzjgYYgLS0tLS0tLS1cbiAgICAgIC8vIOaXouOBq+ODouODvOOCt+ODp+ODs+OBjOOBguOCjOOBsOe1guS6huODleODqeOCsOOCkueri+OBpuOCi1xuXG4gICAgICBmb3IgKFxuICAgICAgICBsZXQgaXRlOiBpdGVyYXRvcjxDdWJpc21Nb3Rpb25RdWV1ZUVudHJ5PiA9IHRoaXMuX21vdGlvbnMuYmVnaW4oKTtcbiAgICAgICAgaXRlLm5vdEVxdWFsKHRoaXMuX21vdGlvbnMuZW5kKCkpO1xuXG4gICAgICApIHtcbiAgICAgICAgbGV0IG1vdGlvblF1ZXVlRW50cnk6IEN1YmlzbU1vdGlvblF1ZXVlRW50cnkgPSBpdGUucHRyKCk7XG5cbiAgICAgICAgaWYgKG1vdGlvblF1ZXVlRW50cnkgPT0gbnVsbCkge1xuICAgICAgICAgIGl0ZSA9IHRoaXMuX21vdGlvbnMuZXJhc2UoaXRlKTsgLy8g5YmK6ZmkXG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtb3Rpb246IEFDdWJpc21Nb3Rpb24gPSBtb3Rpb25RdWV1ZUVudHJ5Ll9tb3Rpb247XG5cbiAgICAgICAgaWYgKG1vdGlvbiA9PSBudWxsKSB7XG4gICAgICAgICAgbW90aW9uUXVldWVFbnRyeS5yZWxlYXNlKCk7XG4gICAgICAgICAgbW90aW9uUXVldWVFbnRyeSA9IHZvaWQgMDtcbiAgICAgICAgICBtb3Rpb25RdWV1ZUVudHJ5ID0gbnVsbDtcbiAgICAgICAgICBpdGUgPSB0aGlzLl9tb3Rpb25zLmVyYXNlKGl0ZSk7IC8vIOWJiumZpFxuXG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyAtLS0tLS0g5YCk44KS5Y+N5pig44GZ44KLIC0tLS0tLVxuICAgICAgICBtb3Rpb24udXBkYXRlUGFyYW1ldGVycyhtb2RlbCwgbW90aW9uUXVldWVFbnRyeSwgdXNlclRpbWVTZWNvbmRzKTtcbiAgICAgICAgdXBkYXRlZCA9IHRydWU7XG5cbiAgICAgICAgLy8gLS0tLS0tIOODpuODvOOCtuODiOODquOCrOODvOOCpOODmeODs+ODiOOCkuaknOafu+OBmeOCiyAtLS0tXG4gICAgICAgIGNvbnN0IGZpcmVkTGlzdDogY3NtVmVjdG9yPGNzbVN0cmluZz4gPSBtb3Rpb24uZ2V0RmlyZWRFdmVudChcbiAgICAgICAgICBtb3Rpb25RdWV1ZUVudHJ5LmdldExhc3RDaGVja0V2ZW50VGltZSgpIC1cbiAgICAgICAgICAgIG1vdGlvblF1ZXVlRW50cnkuZ2V0U3RhcnRUaW1lKCksXG4gICAgICAgICAgdXNlclRpbWVTZWNvbmRzIC0gbW90aW9uUXVldWVFbnRyeS5nZXRTdGFydFRpbWUoKVxuICAgICAgICApO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmlyZWRMaXN0LmdldFNpemUoKTsgKytpKSB7XG4gICAgICAgICAgdGhpcy5fZXZlbnRDYWxsQmFjayh0aGlzLCBmaXJlZExpc3QuYXQoaSksIHRoaXMuX2V2ZW50Q3VzdG9tRGF0YSk7XG4gICAgICAgIH1cblxuICAgICAgICBtb3Rpb25RdWV1ZUVudHJ5LnNldExhc3RDaGVja0V2ZW50VGltZSh1c2VyVGltZVNlY29uZHMpO1xuXG4gICAgICAgIC8vIC0tLS0tLSDntYLkuobmuIjjgb/jga7lh6bnkIbjgYzjgYLjgozjgbDliYrpmaTjgZnjgosgLS0tLS0tXG4gICAgICAgIGlmIChtb3Rpb25RdWV1ZUVudHJ5LmlzRmluaXNoZWQoKSkge1xuICAgICAgICAgIG1vdGlvblF1ZXVlRW50cnkucmVsZWFzZSgpO1xuICAgICAgICAgIG1vdGlvblF1ZXVlRW50cnkgPSB2b2lkIDA7XG4gICAgICAgICAgbW90aW9uUXVldWVFbnRyeSA9IG51bGw7XG4gICAgICAgICAgaXRlID0gdGhpcy5fbW90aW9ucy5lcmFzZShpdGUpOyAvLyDliYrpmaRcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGUucHJlSW5jcmVtZW50KCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHVwZGF0ZWQ7XG4gICAgfVxuICAgIF91c2VyVGltZVNlY29uZHM6IG51bWJlcjsgLy8g44OH44Or44K/5pmC6ZaT44Gu56mN566X5YCkW+enkl1cblxuICAgIF9tb3Rpb25zOiBjc21WZWN0b3I8Q3ViaXNtTW90aW9uUXVldWVFbnRyeT47IC8vIOODouODvOOCt+ODp+ODs1xuICAgIF9ldmVudENhbGxCYWNrOiBDdWJpc21Nb3Rpb25FdmVudEZ1bmN0aW9uOyAvLyDjgrPjg7zjg6vjg5Djg4Pjgq/plqLmlbBcbiAgICBfZXZlbnRDdXN0b21EYXRhOiBhbnk7IC8vIOOCs+ODvOODq+ODkOODg+OCr+OBq+aIu+OBleOCjOOCi+ODh+ODvOOCv1xuICB9XG5cbiAgLyoqXG4gICAqIOOCpOODmeODs+ODiOOBruOCs+ODvOODq+ODkOODg+OCr+mWouaVsOOCkuWumue+qVxuICAgKlxuICAgKiDjgqTjg5njg7Pjg4jjga7jgrPjg7zjg6vjg5Djg4Pjgq/jgavnmbvpjLLjgafjgY3jgovplqLmlbDjga7lnovmg4XloLFcbiAgICogQHBhcmFtIGNhbGxlciAgICAgICAg55m654Gr44GX44Gf44Kk44OZ44Oz44OI44KS5YaN55Sf44GV44Gb44GfQ3ViaXNtTW90aW9uUXVldWVNYW5hZ2VyXG4gICAqIEBwYXJhbSBldmVudFZhbHVlICAgIOeZuueBq+OBl+OBn+OCpOODmeODs+ODiOOBruaWh+Wtl+WIl+ODh+ODvOOCv1xuICAgKiBAcGFyYW0gY3VzdG9tRGF0YSAgIOOCs+ODvOODq+ODkOODg+OCr+OBq+i/lOOBleOCjOOCi+eZu+mMsuaZguOBq+aMh+WumuOBleOCjOOBn+ODh+ODvOOCv1xuICAgKi9cbiAgZXhwb3J0IGludGVyZmFjZSBDdWJpc21Nb3Rpb25FdmVudEZ1bmN0aW9uIHtcbiAgICAoXG4gICAgICBjYWxsZXI6IEN1YmlzbU1vdGlvblF1ZXVlTWFuYWdlcixcbiAgICAgIGV2ZW50VmFsdWU6IGNzbVN0cmluZyxcbiAgICAgIGN1c3RvbURhdGE6IGFueVxuICAgICk6IHZvaWQ7XG4gIH1cblxuICAvKipcbiAgICog44Oi44O844K344On44Oz44Gu6K2Y5Yil55Wq5Y+3XG4gICAqXG4gICAqIOODouODvOOCt+ODp+ODs+OBruitmOWIpeeVquWPt+OBruWumue+qVxuICAgKi9cbiAgZXhwb3J0IGRlY2xhcmUgdHlwZSBDdWJpc21Nb3Rpb25RdWV1ZUVudHJ5SGFuZGxlID0gYW55O1xuICBleHBvcnQgY29uc3QgSW52YWxpZE1vdGlvblF1ZXVlRW50cnlIYW5kbGVWYWx1ZTogQ3ViaXNtTW90aW9uUXVldWVFbnRyeUhhbmRsZSA9IC0xO1xufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQoYykgTGl2ZTJEIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSB0aGUgTGl2ZTJEIE9wZW4gU29mdHdhcmUgbGljZW5zZVxuICogdGhhdCBjYW4gYmUgZm91bmQgYXQgaHR0cHM6Ly93d3cubGl2ZTJkLmNvbS9ldWxhL2xpdmUyZC1vcGVuLXNvZnR3YXJlLWxpY2Vuc2UtYWdyZWVtZW50X2VuLmh0bWwuXG4gKi9cblxuaW1wb3J0IHsgTGl2ZTJEQ3ViaXNtRnJhbWV3b3JrIGFzIGxpdmUyZGN1YmlzbWZyYW1ld29yayB9IGZyb20gJy4uL0ZyYW1ld29yay9zcmMvbGl2ZTJkY3ViaXNtZnJhbWV3b3JrJztcbmltcG9ydCB7IExpdmUyREN1YmlzbUZyYW1ld29yayBhcyBjdWJpc21pZCB9IGZyb20gJy4uL0ZyYW1ld29yay9zcmMvaWQvY3ViaXNtaWQnO1xuaW1wb3J0IHsgTGl2ZTJEQ3ViaXNtRnJhbWV3b3JrIGFzIGN1YmlzbXVzZXJtb2RlbCB9IGZyb20gJy4uL0ZyYW1ld29yay9zcmMvbW9kZWwvY3ViaXNtdXNlcm1vZGVsJztcbmltcG9ydCB7IExpdmUyREN1YmlzbUZyYW1ld29yayBhcyBpY3ViaXNtbW9kZWxzZXR0aW5nIH0gZnJvbSAnLi4vRnJhbWV3b3JrL3NyYy9pY3ViaXNtbW9kZWxzZXR0aW5nJztcbmltcG9ydCB7IExpdmUyREN1YmlzbUZyYW1ld29yayBhcyBjdWJpc21tb2RlbHNldHRpbmdqc29uIH0gZnJvbSAnLi4vRnJhbWV3b3JrL3NyYy9jdWJpc21tb2RlbHNldHRpbmdqc29uJztcbmltcG9ydCB7IExpdmUyREN1YmlzbUZyYW1ld29yayBhcyBjdWJpc21kZWZhdWx0cGFyYW1ldGVyaWQgfSBmcm9tICcuLi9GcmFtZXdvcmsvc3JjL2N1YmlzbWRlZmF1bHRwYXJhbWV0ZXJpZCc7XG5pbXBvcnQgeyBMaXZlMkRDdWJpc21GcmFtZXdvcmsgYXMgYWN1YmlzbW1vdGlvbiB9IGZyb20gJy4uL0ZyYW1ld29yay9zcmMvbW90aW9uL2FjdWJpc21tb3Rpb24nO1xuaW1wb3J0IHsgTGl2ZTJEQ3ViaXNtRnJhbWV3b3JrIGFzIGN1YmlzbWV5ZWJsaW5rIH0gZnJvbSAnLi4vRnJhbWV3b3JrL3NyYy9lZmZlY3QvY3ViaXNtZXllYmxpbmsnO1xuaW1wb3J0IHsgTGl2ZTJEQ3ViaXNtRnJhbWV3b3JrIGFzIGN1YmlzbWJyZWF0aCB9IGZyb20gJy4uL0ZyYW1ld29yay9zcmMvZWZmZWN0L2N1YmlzbWJyZWF0aCc7XG5pbXBvcnQgeyBMaXZlMkRDdWJpc21GcmFtZXdvcmsgYXMgY3NtdmVjdG9yIH0gZnJvbSAnLi4vRnJhbWV3b3JrL3NyYy90eXBlL2NzbXZlY3Rvcic7XG5pbXBvcnQgeyBMaXZlMkRDdWJpc21GcmFtZXdvcmsgYXMgY3NtbWFwIH0gZnJvbSAnLi4vRnJhbWV3b3JrL3NyYy90eXBlL2NzbW1hcCc7XG5pbXBvcnQgeyBMaXZlMkRDdWJpc21GcmFtZXdvcmsgYXMgY3ViaXNtbWF0cml4NDQgfSBmcm9tICcuLi9GcmFtZXdvcmsvc3JjL21hdGgvY3ViaXNtbWF0cml4NDQnO1xuaW1wb3J0IHsgTGl2ZTJEQ3ViaXNtRnJhbWV3b3JrIGFzIGN1YmlzbW1vdGlvbiB9IGZyb20gJy4uL0ZyYW1ld29yay9zcmMvbW90aW9uL2N1YmlzbW1vdGlvbic7XG5pbXBvcnQgeyBMaXZlMkRDdWJpc21GcmFtZXdvcmsgYXMgY3ViaXNtbW90aW9ucXVldWVtYW5hZ2VyIH0gZnJvbSAnLi4vRnJhbWV3b3JrL3NyYy9tb3Rpb24vY3ViaXNtbW90aW9ucXVldWVtYW5hZ2VyJztcbmltcG9ydCB7IExpdmUyREN1YmlzbUZyYW1ld29yayBhcyBjc21zdHJpbmcgfSBmcm9tICcuLi9GcmFtZXdvcmsvc3JjL3R5cGUvY3Ntc3RyaW5nJztcbmltcG9ydCB7IExpdmUyREN1YmlzbUZyYW1ld29yayBhcyBjc21yZWN0IH0gZnJvbSAnLi4vRnJhbWV3b3JrL3NyYy90eXBlL2NzbXJlY3RmJztcbmltcG9ydCB7IEN1YmlzbUxvZ0luZm8gfSBmcm9tICcuLi9GcmFtZXdvcmsvc3JjL3V0aWxzL2N1YmlzbWRlYnVnJztcbmltcG9ydCBjc21SZWN0ID0gY3NtcmVjdC5jc21SZWN0O1xuaW1wb3J0IGNzbVN0cmluZyA9IGNzbXN0cmluZy5jc21TdHJpbmc7XG5pbXBvcnQgSW52YWxpZE1vdGlvblF1ZXVlRW50cnlIYW5kbGVWYWx1ZSA9IGN1YmlzbW1vdGlvbnF1ZXVlbWFuYWdlci5JbnZhbGlkTW90aW9uUXVldWVFbnRyeUhhbmRsZVZhbHVlO1xuaW1wb3J0IEN1YmlzbU1vdGlvblF1ZXVlRW50cnlIYW5kbGUgPSBjdWJpc21tb3Rpb25xdWV1ZW1hbmFnZXIuQ3ViaXNtTW90aW9uUXVldWVFbnRyeUhhbmRsZTtcbmltcG9ydCBDdWJpc21Nb3Rpb24gPSBjdWJpc21tb3Rpb24uQ3ViaXNtTW90aW9uO1xuaW1wb3J0IEN1YmlzbU1hdHJpeDQ0ID0gY3ViaXNtbWF0cml4NDQuQ3ViaXNtTWF0cml4NDQ7XG5pbXBvcnQgY3NtTWFwID0gY3NtbWFwLmNzbU1hcDtcbmltcG9ydCBjc21WZWN0b3IgPSBjc212ZWN0b3IuY3NtVmVjdG9yO1xuaW1wb3J0IEN1YmlzbUJyZWF0aCA9IGN1YmlzbWJyZWF0aC5DdWJpc21CcmVhdGg7XG5pbXBvcnQgQnJlYXRoUGFyYW1ldGVyRGF0YSA9IGN1YmlzbWJyZWF0aC5CcmVhdGhQYXJhbWV0ZXJEYXRhO1xuaW1wb3J0IEN1YmlzbUV5ZUJsaW5rID0gY3ViaXNtZXllYmxpbmsuQ3ViaXNtRXllQmxpbms7XG5pbXBvcnQgQUN1YmlzbU1vdGlvbiA9IGFjdWJpc21tb3Rpb24uQUN1YmlzbU1vdGlvbjtcbmltcG9ydCBGaW5pc2hlZE1vdGlvbkNhbGxiYWNrID0gYWN1YmlzbW1vdGlvbi5GaW5pc2hlZE1vdGlvbkNhbGxiYWNrO1xuaW1wb3J0IEN1YmlzbUZyYW1ld29yayA9IGxpdmUyZGN1YmlzbWZyYW1ld29yay5DdWJpc21GcmFtZXdvcms7XG5pbXBvcnQgQ3ViaXNtSWRIYW5kbGUgPSBjdWJpc21pZC5DdWJpc21JZEhhbmRsZTtcbmltcG9ydCBDdWJpc21Vc2VyTW9kZWwgPSBjdWJpc211c2VybW9kZWwuQ3ViaXNtVXNlck1vZGVsO1xuaW1wb3J0IElDdWJpc21Nb2RlbFNldHRpbmcgPSBpY3ViaXNtbW9kZWxzZXR0aW5nLklDdWJpc21Nb2RlbFNldHRpbmc7XG5pbXBvcnQgQ3ViaXNtTW9kZWxTZXR0aW5nSnNvbiA9IGN1YmlzbW1vZGVsc2V0dGluZ2pzb24uQ3ViaXNtTW9kZWxTZXR0aW5nSnNvbjtcbmltcG9ydCBDdWJpc21EZWZhdWx0UGFyYW1ldGVySWQgPSBjdWJpc21kZWZhdWx0cGFyYW1ldGVyaWQ7XG5cbmltcG9ydCB7IExBcHBQYWwgfSBmcm9tICcuL2xhcHBwYWwnO1xuaW1wb3J0IHsgZ2wsIGNhbnZhcywgZnJhbWVCdWZmZXIsIExBcHBEZWxlZ2F0ZSB9IGZyb20gJy4vbGFwcGRlbGVnYXRlJztcbmltcG9ydCB7IFRleHR1cmVJbmZvIH0gZnJvbSAnLi9sYXBwdGV4dHVyZW1hbmFnZXInO1xuaW1wb3J0ICogYXMgTEFwcERlZmluZSBmcm9tICcuL2xhcHBkZWZpbmUnO1xuaW1wb3J0ICd3aGF0d2ctZmV0Y2gnO1xuXG5lbnVtIExvYWRTdGVwIHtcbiAgTG9hZEFzc2V0cyxcbiAgTG9hZE1vZGVsLFxuICBXYWl0TG9hZE1vZGVsLFxuICBMb2FkRXhwcmVzc2lvbixcbiAgV2FpdExvYWRFeHByZXNzaW9uLFxuICBMb2FkUGh5c2ljcyxcbiAgV2FpdExvYWRQaHlzaWNzLFxuICBMb2FkUG9zZSxcbiAgV2FpdExvYWRQb3NlLFxuICBTZXR1cEV5ZUJsaW5rLFxuICBTZXR1cEJyZWF0aCxcbiAgTG9hZFVzZXJEYXRhLFxuICBXYWl0TG9hZFVzZXJEYXRhLFxuICBTZXR1cEV5ZUJsaW5rSWRzLFxuICBTZXR1cExpcFN5bmNJZHMsXG4gIFNldHVwTGF5b3V0LFxuICBMb2FkTW90aW9uLFxuICBXYWl0TG9hZE1vdGlvbixcbiAgQ29tcGxldGVJbml0aWFsaXplLFxuICBDb21wbGV0ZVNldHVwTW9kZWwsXG4gIExvYWRUZXh0dXJlLFxuICBXYWl0TG9hZFRleHR1cmUsXG4gIENvbXBsZXRlU2V0dXBcbn1cblxuLyoqXG4gKiDjg6bjg7zjgrbjg7zjgYzlrp/pmpvjgavkvb/nlKjjgZnjgovjg6Ljg4fjg6vjga7lrp/oo4Xjgq/jg6njgrk8YnI+XG4gKiDjg6Ljg4fjg6vnlJ/miJDjgIHmqZ/og73jgrPjg7Pjg53jg7zjg43jg7Pjg4jnlJ/miJDjgIHmm7TmlrDlh6bnkIbjgajjg6zjg7Pjg4Djg6rjg7PjgrDjga7lkbzjgbPlh7rjgZfjgpLooYzjgYbjgIJcbiAqL1xuZXhwb3J0IGNsYXNzIExBcHBNb2RlbCBleHRlbmRzIEN1YmlzbVVzZXJNb2RlbCB7XG4gIC8qKlxuICAgKiBtb2RlbDMuanNvbuOBjOe9ruOBi+OCjOOBn+ODh+OCo+ODrOOCr+ODiOODquOBqOODleOCoeOCpOODq+ODkeOCueOBi+OCieODouODh+ODq+OCkueUn+aIkOOBmeOCi1xuICAgKiBAcGFyYW0gZGlyXG4gICAqIEBwYXJhbSBmaWxlTmFtZVxuICAgKi9cbiAgcHVibGljIGxvYWRBc3NldHMoZGlyOiBzdHJpbmcsIGZpbGVOYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZygn6LWE5rqQ6Lev5b6EJyxkaXIpXG4gICAgdGhpcy5fbW9kZWxIb21lRGlyID0gZGlyO1xuICAgIGZldGNoKGAke3RoaXMuX21vZGVsSG9tZURpcn0vJHtmaWxlTmFtZX1gKVxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuYXJyYXlCdWZmZXIoKSlcbiAgICAgIC50aGVuKGFycmF5QnVmZmVyID0+IHtcbiAgICAgICAgY29uc3Qgc2V0dGluZzogSUN1YmlzbU1vZGVsU2V0dGluZyA9IG5ldyBDdWJpc21Nb2RlbFNldHRpbmdKc29uKFxuICAgICAgICAgIGFycmF5QnVmZmVyLFxuICAgICAgICAgIGFycmF5QnVmZmVyLmJ5dGVMZW5ndGhcbiAgICAgICAgKTtcblxuICAgICAgICAvLyDjgrnjg4bjg7zjg4jjgpLmm7TmlrBcbiAgICAgICAgdGhpcy5fc3RhdGUgPSBMb2FkU3RlcC5Mb2FkTW9kZWw7XG5cbiAgICAgICAgLy8g57WQ5p6c44KS5L+d5a2YXG4gICAgICAgIHRoaXMuc2V0dXBNb2RlbChzZXR0aW5nKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIG1vZGVsMy5qc29u44GL44KJ44Oi44OH44Or44KS55Sf5oiQ44GZ44KL44CCXG4gICAqIG1vZGVsMy5qc29u44Gu6KiY6L+w44Gr5b6T44Gj44Gm44Oi44OH44Or55Sf5oiQ44CB44Oi44O844K344On44Oz44CB54mp55CG5ryU566X44Gq44Gp44Gu44Kz44Oz44Od44O844ON44Oz44OI55Sf5oiQ44KS6KGM44GG44CCXG4gICAqXG4gICAqIEBwYXJhbSBzZXR0aW5nIElDdWJpc21Nb2RlbFNldHRpbmfjga7jgqTjg7Pjgrnjgr/jg7PjgrlcbiAgICovXG4gIHByaXZhdGUgc2V0dXBNb2RlbChzZXR0aW5nOiBJQ3ViaXNtTW9kZWxTZXR0aW5nKTogdm9pZCB7XG4gICAgdGhpcy5fdXBkYXRpbmcgPSB0cnVlO1xuICAgIHRoaXMuX2luaXRpYWxpemVkID0gZmFsc2U7XG5cbiAgICB0aGlzLl9tb2RlbFNldHRpbmcgPSBzZXR0aW5nO1xuXG4gICAgLy8gQ3ViaXNtTW9kZWxcbiAgICBpZiAodGhpcy5fbW9kZWxTZXR0aW5nLmdldE1vZGVsRmlsZU5hbWUoKSAhPSAnJykge1xuICAgICAgY29uc3QgbW9kZWxGaWxlTmFtZSA9IHRoaXMuX21vZGVsU2V0dGluZy5nZXRNb2RlbEZpbGVOYW1lKCk7XG5cbiAgICAgIGZldGNoKGAke3RoaXMuX21vZGVsSG9tZURpcn0vJHttb2RlbEZpbGVOYW1lfWApXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmFycmF5QnVmZmVyKCkpXG4gICAgICAgIC50aGVuKGFycmF5QnVmZmVyID0+IHtcbiAgICAgICAgICB0aGlzLmxvYWRNb2RlbChhcnJheUJ1ZmZlcik7XG4gICAgICAgICAgdGhpcy5fc3RhdGUgPSBMb2FkU3RlcC5Mb2FkRXhwcmVzc2lvbjtcblxuICAgICAgICAgIC8vIGNhbGxiYWNrXG4gICAgICAgICAgbG9hZEN1YmlzbUV4cHJlc3Npb24oKTtcbiAgICAgICAgfSk7XG5cbiAgICAgIHRoaXMuX3N0YXRlID0gTG9hZFN0ZXAuV2FpdExvYWRNb2RlbDtcbiAgICB9IGVsc2Uge1xuICAgICAgTEFwcFBhbC5wcmludE1lc3NhZ2UoJ01vZGVsIGRhdGEgZG9lcyBub3QgZXhpc3QuJyk7XG4gICAgfVxuXG4gICAgLy8gRXhwcmVzc2lvblxuICAgIGNvbnN0IGxvYWRDdWJpc21FeHByZXNzaW9uID0gKCk6IHZvaWQgPT4ge1xuICAgICAgaWYgKHRoaXMuX21vZGVsU2V0dGluZy5nZXRFeHByZXNzaW9uQ291bnQoKSA+IDApIHtcbiAgICAgICAgY29uc3QgY291bnQ6IG51bWJlciA9IHRoaXMuX21vZGVsU2V0dGluZy5nZXRFeHByZXNzaW9uQ291bnQoKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgICBjb25zdCBleHByZXNzaW9uTmFtZSA9IHRoaXMuX21vZGVsU2V0dGluZy5nZXRFeHByZXNzaW9uTmFtZShpKTtcbiAgICAgICAgICBjb25zdCBleHByZXNzaW9uRmlsZU5hbWUgPSB0aGlzLl9tb2RlbFNldHRpbmcuZ2V0RXhwcmVzc2lvbkZpbGVOYW1lKFxuICAgICAgICAgICAgaVxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBmZXRjaChgJHt0aGlzLl9tb2RlbEhvbWVEaXJ9LyR7ZXhwcmVzc2lvbkZpbGVOYW1lfWApXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5hcnJheUJ1ZmZlcigpKVxuICAgICAgICAgICAgLnRoZW4oYXJyYXlCdWZmZXIgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBtb3Rpb246IEFDdWJpc21Nb3Rpb24gPSB0aGlzLmxvYWRFeHByZXNzaW9uKFxuICAgICAgICAgICAgICAgIGFycmF5QnVmZmVyLFxuICAgICAgICAgICAgICAgIGFycmF5QnVmZmVyLmJ5dGVMZW5ndGgsXG4gICAgICAgICAgICAgICAgZXhwcmVzc2lvbk5hbWVcbiAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICBpZiAodGhpcy5fZXhwcmVzc2lvbnMuZ2V0VmFsdWUoZXhwcmVzc2lvbk5hbWUpICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBBQ3ViaXNtTW90aW9uLmRlbGV0ZShcbiAgICAgICAgICAgICAgICAgIHRoaXMuX2V4cHJlc3Npb25zLmdldFZhbHVlKGV4cHJlc3Npb25OYW1lKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgdGhpcy5fZXhwcmVzc2lvbnMuc2V0VmFsdWUoZXhwcmVzc2lvbk5hbWUsIG51bGwpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgdGhpcy5fZXhwcmVzc2lvbnMuc2V0VmFsdWUoZXhwcmVzc2lvbk5hbWUsIG1vdGlvbik7XG5cbiAgICAgICAgICAgICAgdGhpcy5fZXhwcmVzc2lvbkNvdW50Kys7XG5cbiAgICAgICAgICAgICAgaWYgKHRoaXMuX2V4cHJlc3Npb25Db3VudCA+PSBjb3VudCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3N0YXRlID0gTG9hZFN0ZXAuTG9hZFBoeXNpY3M7XG5cbiAgICAgICAgICAgICAgICAvLyBjYWxsYmFja1xuICAgICAgICAgICAgICAgIGxvYWRDdWJpc21QaHlzaWNzKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3N0YXRlID0gTG9hZFN0ZXAuV2FpdExvYWRFeHByZXNzaW9uO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fc3RhdGUgPSBMb2FkU3RlcC5Mb2FkUGh5c2ljcztcblxuICAgICAgICAvLyBjYWxsYmFja1xuICAgICAgICBsb2FkQ3ViaXNtUGh5c2ljcygpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBQaHlzaWNzXG4gICAgY29uc3QgbG9hZEN1YmlzbVBoeXNpY3MgPSAoKTogdm9pZCA9PiB7XG4gICAgICBpZiAodGhpcy5fbW9kZWxTZXR0aW5nLmdldFBoeXNpY3NGaWxlTmFtZSgpICE9ICcnKSB7XG4gICAgICAgIGNvbnN0IHBoeXNpY3NGaWxlTmFtZSA9IHRoaXMuX21vZGVsU2V0dGluZy5nZXRQaHlzaWNzRmlsZU5hbWUoKTtcblxuICAgICAgICBmZXRjaChgJHt0aGlzLl9tb2RlbEhvbWVEaXJ9LyR7cGh5c2ljc0ZpbGVOYW1lfWApXG4gICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuYXJyYXlCdWZmZXIoKSlcbiAgICAgICAgICAudGhlbihhcnJheUJ1ZmZlciA9PiB7XG4gICAgICAgICAgICB0aGlzLmxvYWRQaHlzaWNzKGFycmF5QnVmZmVyLCBhcnJheUJ1ZmZlci5ieXRlTGVuZ3RoKTtcblxuICAgICAgICAgICAgdGhpcy5fc3RhdGUgPSBMb2FkU3RlcC5Mb2FkUG9zZTtcblxuICAgICAgICAgICAgLy8gY2FsbGJhY2tcbiAgICAgICAgICAgIGxvYWRDdWJpc21Qb3NlKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX3N0YXRlID0gTG9hZFN0ZXAuV2FpdExvYWRQaHlzaWNzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fc3RhdGUgPSBMb2FkU3RlcC5Mb2FkUG9zZTtcblxuICAgICAgICAvLyBjYWxsYmFja1xuICAgICAgICBsb2FkQ3ViaXNtUG9zZSgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBQb3NlXG4gICAgY29uc3QgbG9hZEN1YmlzbVBvc2UgPSAoKTogdm9pZCA9PiB7XG4gICAgICBpZiAodGhpcy5fbW9kZWxTZXR0aW5nLmdldFBvc2VGaWxlTmFtZSgpICE9ICcnKSB7XG4gICAgICAgIGNvbnN0IHBvc2VGaWxlTmFtZSA9IHRoaXMuX21vZGVsU2V0dGluZy5nZXRQb3NlRmlsZU5hbWUoKTtcblxuICAgICAgICBmZXRjaChgJHt0aGlzLl9tb2RlbEhvbWVEaXJ9LyR7cG9zZUZpbGVOYW1lfWApXG4gICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuYXJyYXlCdWZmZXIoKSlcbiAgICAgICAgICAudGhlbihhcnJheUJ1ZmZlciA9PiB7XG4gICAgICAgICAgICB0aGlzLmxvYWRQb3NlKGFycmF5QnVmZmVyLCBhcnJheUJ1ZmZlci5ieXRlTGVuZ3RoKTtcblxuICAgICAgICAgICAgdGhpcy5fc3RhdGUgPSBMb2FkU3RlcC5TZXR1cEV5ZUJsaW5rO1xuXG4gICAgICAgICAgICAvLyBjYWxsYmFja1xuICAgICAgICAgICAgc2V0dXBFeWVCbGluaygpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9zdGF0ZSA9IExvYWRTdGVwLldhaXRMb2FkUG9zZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3N0YXRlID0gTG9hZFN0ZXAuU2V0dXBFeWVCbGluaztcblxuICAgICAgICAvLyBjYWxsYmFja1xuICAgICAgICBzZXR1cEV5ZUJsaW5rKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIEV5ZUJsaW5rXG4gICAgY29uc3Qgc2V0dXBFeWVCbGluayA9ICgpOiB2b2lkID0+IHtcbiAgICAgIGlmICh0aGlzLl9tb2RlbFNldHRpbmcuZ2V0RXllQmxpbmtQYXJhbWV0ZXJDb3VudCgpID4gMCkge1xuICAgICAgICB0aGlzLl9leWVCbGluayA9IEN1YmlzbUV5ZUJsaW5rLmNyZWF0ZSh0aGlzLl9tb2RlbFNldHRpbmcpO1xuICAgICAgICB0aGlzLl9zdGF0ZSA9IExvYWRTdGVwLlNldHVwQnJlYXRoO1xuICAgICAgfVxuXG4gICAgICAvLyBjYWxsYmFja1xuICAgICAgc2V0dXBCcmVhdGgoKTtcbiAgICB9O1xuXG4gICAgLy8gQnJlYXRoXG4gICAgY29uc3Qgc2V0dXBCcmVhdGggPSAoKTogdm9pZCA9PiB7XG4gICAgICB0aGlzLl9icmVhdGggPSBDdWJpc21CcmVhdGguY3JlYXRlKCk7XG5cbiAgICAgIGNvbnN0IGJyZWF0aFBhcmFtZXRlcnM6IGNzbVZlY3RvcjxCcmVhdGhQYXJhbWV0ZXJEYXRhPiA9IG5ldyBjc21WZWN0b3IoKTtcbiAgICAgIGJyZWF0aFBhcmFtZXRlcnMucHVzaEJhY2soXG4gICAgICAgIG5ldyBCcmVhdGhQYXJhbWV0ZXJEYXRhKHRoaXMuX2lkUGFyYW1BbmdsZVgsIDAuMCwgMTUuMCwgNi41MzQ1LCAwLjUpXG4gICAgICApO1xuICAgICAgYnJlYXRoUGFyYW1ldGVycy5wdXNoQmFjayhcbiAgICAgICAgbmV3IEJyZWF0aFBhcmFtZXRlckRhdGEodGhpcy5faWRQYXJhbUFuZ2xlWSwgMC4wLCA4LjAsIDMuNTM0NSwgMC41KVxuICAgICAgKTtcbiAgICAgIGJyZWF0aFBhcmFtZXRlcnMucHVzaEJhY2soXG4gICAgICAgIG5ldyBCcmVhdGhQYXJhbWV0ZXJEYXRhKHRoaXMuX2lkUGFyYW1BbmdsZVosIDAuMCwgMTAuMCwgNS41MzQ1LCAwLjUpXG4gICAgICApO1xuICAgICAgYnJlYXRoUGFyYW1ldGVycy5wdXNoQmFjayhcbiAgICAgICAgbmV3IEJyZWF0aFBhcmFtZXRlckRhdGEodGhpcy5faWRQYXJhbUJvZHlBbmdsZVgsIDAuMCwgNC4wLCAxNS41MzQ1LCAwLjUpXG4gICAgICApO1xuICAgICAgYnJlYXRoUGFyYW1ldGVycy5wdXNoQmFjayhcbiAgICAgICAgbmV3IEJyZWF0aFBhcmFtZXRlckRhdGEoXG4gICAgICAgICAgQ3ViaXNtRnJhbWV3b3JrLmdldElkTWFuYWdlcigpLmdldElkKFxuICAgICAgICAgICAgQ3ViaXNtRGVmYXVsdFBhcmFtZXRlcklkLlBhcmFtQnJlYXRoXG4gICAgICAgICAgKSxcbiAgICAgICAgICAwLjAsXG4gICAgICAgICAgMC41LFxuICAgICAgICAgIDMuMjM0NSxcbiAgICAgICAgICAwLjVcbiAgICAgICAgKVxuICAgICAgKTtcblxuICAgICAgdGhpcy5fYnJlYXRoLnNldFBhcmFtZXRlcnMoYnJlYXRoUGFyYW1ldGVycyk7XG4gICAgICB0aGlzLl9zdGF0ZSA9IExvYWRTdGVwLkxvYWRVc2VyRGF0YTtcblxuICAgICAgLy8gY2FsbGJhY2tcbiAgICAgIGxvYWRVc2VyRGF0YSgpO1xuICAgIH07XG5cbiAgICAvLyBVc2VyRGF0YVxuICAgIGNvbnN0IGxvYWRVc2VyRGF0YSA9ICgpOiB2b2lkID0+IHtcbiAgICAgIGlmICh0aGlzLl9tb2RlbFNldHRpbmcuZ2V0VXNlckRhdGFGaWxlKCkgIT0gJycpIHtcbiAgICAgICAgY29uc3QgdXNlckRhdGFGaWxlID0gdGhpcy5fbW9kZWxTZXR0aW5nLmdldFVzZXJEYXRhRmlsZSgpO1xuXG4gICAgICAgIGZldGNoKGAke3RoaXMuX21vZGVsSG9tZURpcn0vJHt1c2VyRGF0YUZpbGV9YClcbiAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5hcnJheUJ1ZmZlcigpKVxuICAgICAgICAgIC50aGVuKGFycmF5QnVmZmVyID0+IHtcbiAgICAgICAgICAgIHRoaXMubG9hZFVzZXJEYXRhKGFycmF5QnVmZmVyLCBhcnJheUJ1ZmZlci5ieXRlTGVuZ3RoKTtcblxuICAgICAgICAgICAgdGhpcy5fc3RhdGUgPSBMb2FkU3RlcC5TZXR1cEV5ZUJsaW5rSWRzO1xuXG4gICAgICAgICAgICAvLyBjYWxsYmFja1xuICAgICAgICAgICAgc2V0dXBFeWVCbGlua0lkcygpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuX3N0YXRlID0gTG9hZFN0ZXAuV2FpdExvYWRVc2VyRGF0YTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3N0YXRlID0gTG9hZFN0ZXAuU2V0dXBFeWVCbGlua0lkcztcblxuICAgICAgICAvLyBjYWxsYmFja1xuICAgICAgICBzZXR1cEV5ZUJsaW5rSWRzKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIEV5ZUJsaW5rSWRzXG4gICAgY29uc3Qgc2V0dXBFeWVCbGlua0lkcyA9ICgpOiB2b2lkID0+IHtcbiAgICAgIGNvbnN0IGV5ZUJsaW5rSWRDb3VudDogbnVtYmVyID0gdGhpcy5fbW9kZWxTZXR0aW5nLmdldEV5ZUJsaW5rUGFyYW1ldGVyQ291bnQoKTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBleWVCbGlua0lkQ291bnQ7ICsraSkge1xuICAgICAgICB0aGlzLl9leWVCbGlua0lkcy5wdXNoQmFjayhcbiAgICAgICAgICB0aGlzLl9tb2RlbFNldHRpbmcuZ2V0RXllQmxpbmtQYXJhbWV0ZXJJZChpKVxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9zdGF0ZSA9IExvYWRTdGVwLlNldHVwTGlwU3luY0lkcztcblxuICAgICAgLy8gY2FsbGJhY2tcbiAgICAgIHNldHVwTGlwU3luY0lkcygpO1xuICAgIH07XG5cbiAgICAvLyBMaXBTeW5jSWRzXG4gICAgY29uc3Qgc2V0dXBMaXBTeW5jSWRzID0gKCk6IHZvaWQgPT4ge1xuICAgICAgY29uc3QgbGlwU3luY0lkQ291bnQgPSB0aGlzLl9tb2RlbFNldHRpbmcuZ2V0TGlwU3luY1BhcmFtZXRlckNvdW50KCk7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlwU3luY0lkQ291bnQ7ICsraSkge1xuICAgICAgICB0aGlzLl9saXBTeW5jSWRzLnB1c2hCYWNrKHRoaXMuX21vZGVsU2V0dGluZy5nZXRMaXBTeW5jUGFyYW1ldGVySWQoaSkpO1xuICAgICAgfVxuICAgICAgdGhpcy5fc3RhdGUgPSBMb2FkU3RlcC5TZXR1cExheW91dDtcblxuICAgICAgLy8gY2FsbGJhY2tcbiAgICAgIHNldHVwTGF5b3V0KCk7XG4gICAgfTtcblxuICAgIC8vIExheW91dFxuICAgIGNvbnN0IHNldHVwTGF5b3V0ID0gKCk6IHZvaWQgPT4ge1xuICAgICAgY29uc3QgbGF5b3V0OiBjc21NYXA8c3RyaW5nLCBudW1iZXI+ID0gbmV3IGNzbU1hcDxzdHJpbmcsIG51bWJlcj4oKTtcbiAgICAgIHRoaXMuX21vZGVsU2V0dGluZy5nZXRMYXlvdXRNYXAobGF5b3V0KTtcbiAgICAgIHRoaXMuX21vZGVsTWF0cml4LnNldHVwRnJvbUxheW91dChsYXlvdXQpO1xuICAgICAgdGhpcy5fc3RhdGUgPSBMb2FkU3RlcC5Mb2FkTW90aW9uO1xuXG4gICAgICAvLyBjYWxsYmFja1xuICAgICAgbG9hZEN1YmlzbU1vdGlvbigpO1xuICAgIH07XG5cbiAgICAvLyBNb3Rpb25cbiAgICBjb25zdCBsb2FkQ3ViaXNtTW90aW9uID0gKCk6IHZvaWQgPT4ge1xuICAgICAgdGhpcy5fc3RhdGUgPSBMb2FkU3RlcC5XYWl0TG9hZE1vdGlvbjtcbiAgICAgIHRoaXMuX21vZGVsLnNhdmVQYXJhbWV0ZXJzKCk7XG4gICAgICB0aGlzLl9hbGxNb3Rpb25Db3VudCA9IDA7XG4gICAgICB0aGlzLl9tb3Rpb25Db3VudCA9IDA7XG4gICAgICBjb25zdCBncm91cDogc3RyaW5nW10gPSBbXTtcblxuICAgICAgY29uc3QgbW90aW9uR3JvdXBDb3VudDogbnVtYmVyID0gdGhpcy5fbW9kZWxTZXR0aW5nLmdldE1vdGlvbkdyb3VwQ291bnQoKTtcblxuICAgICAgLy8g44Oi44O844K344On44Oz44Gu57eP5pWw44KS5rGC44KB44KLXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1vdGlvbkdyb3VwQ291bnQ7IGkrKykge1xuICAgICAgICBncm91cFtpXSA9IHRoaXMuX21vZGVsU2V0dGluZy5nZXRNb3Rpb25Hcm91cE5hbWUoaSk7XG4gICAgICAgIHRoaXMuX2FsbE1vdGlvbkNvdW50ICs9IHRoaXMuX21vZGVsU2V0dGluZy5nZXRNb3Rpb25Db3VudChncm91cFtpXSk7XG4gICAgICB9XG5cbiAgICAgIC8vIOODouODvOOCt+ODp+ODs+OBruiqreOBv+i+vOOBv1xuICAgICAgLy8g6KOF5YWl5Yqo5L2cXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1vdGlvbkdyb3VwQ291bnQ7IGkrKykge1xuICAgICAgICB0aGlzLnByZUxvYWRNb3Rpb25Hcm91cChncm91cFtpXSk7XG4gICAgICB9XG5cbiAgICAgIC8vIOODouODvOOCt+ODp+ODs+OBjOOBquOBhOWgtOWQiFxuICAgICAgaWYgKG1vdGlvbkdyb3VwQ291bnQgPT0gMCkge1xuICAgICAgICB0aGlzLl9zdGF0ZSA9IExvYWRTdGVwLkxvYWRUZXh0dXJlO1xuXG4gICAgICAgIC8vIOWFqOOBpuOBruODouODvOOCt+ODp+ODs+OCkuWBnOatouOBmeOCi1xuICAgICAgICB0aGlzLl9tb3Rpb25NYW5hZ2VyLnN0b3BBbGxNb3Rpb25zKCk7XG5cbiAgICAgICAgdGhpcy5fdXBkYXRpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5faW5pdGlhbGl6ZWQgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuY3JlYXRlUmVuZGVyZXIoKTtcbiAgICAgICAgdGhpcy5zZXR1cFRleHR1cmVzKCk7XG4gICAgICAgIHRoaXMuZ2V0UmVuZGVyZXIoKS5zdGFydFVwKGdsKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIOODhuOCr+OCueODgeODo+ODpuODi+ODg+ODiOOBq+ODhuOCr+OCueODgeODo+OCkuODreODvOODieOBmeOCi1xuICAgKi9cbiAgcHJpdmF0ZSBzZXR1cFRleHR1cmVzKCk6IHZvaWQge1xuICAgIC8vIGlQaG9uZeOBp+OBruOCouODq+ODleOCoeWTgeizquWQkeS4iuOBruOBn+OCgVR5cGVzY3JpcHTjgafjga9wcmVtdWx0aXBsaWVkQWxwaGHjgpLmjqHnlKhcbiAgICBjb25zdCB1c2VQcmVtdWx0aXBseSA9IHRydWU7XG5cbiAgICBpZiAodGhpcy5fc3RhdGUgPT0gTG9hZFN0ZXAuTG9hZFRleHR1cmUpIHtcbiAgICAgIC8vIOODhuOCr+OCueODgeODo+iqreOBv+i+vOOBv+eUqFxuICAgICAgY29uc3QgdGV4dHVyZUNvdW50OiBudW1iZXIgPSB0aGlzLl9tb2RlbFNldHRpbmcuZ2V0VGV4dHVyZUNvdW50KCk7XG5cbiAgICAgIGZvciAoXG4gICAgICAgIGxldCBtb2RlbFRleHR1cmVOdW1iZXIgPSAwO1xuICAgICAgICBtb2RlbFRleHR1cmVOdW1iZXIgPCB0ZXh0dXJlQ291bnQ7XG4gICAgICAgIG1vZGVsVGV4dHVyZU51bWJlcisrXG4gICAgICApIHtcbiAgICAgICAgLy8g44OG44Kv44K544OB44Oj5ZCN44GM56m65paH5a2X44Gg44Gj44Gf5aC05ZCI44Gv44Ot44O844OJ44O744OQ44Kk44Oz44OJ5Yem55CG44KS44K544Kt44OD44OXXG4gICAgICAgIGlmICh0aGlzLl9tb2RlbFNldHRpbmcuZ2V0VGV4dHVyZUZpbGVOYW1lKG1vZGVsVGV4dHVyZU51bWJlcikgPT0gJycpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFdlYkdM44Gu44OG44Kv44K544OB44Oj44Om44OL44OD44OI44Gr44OG44Kv44K544OB44Oj44KS44Ot44O844OJ44GZ44KLXG4gICAgICAgIC8vIOWcqFdlYkdM55qE57q555CG5Y2V5YWD5Lit5Yqg6L2957q555CGXG4gICAgICAgIGxldCB0ZXh0dXJlUGF0aCA9IHRoaXMuX21vZGVsU2V0dGluZy5nZXRUZXh0dXJlRmlsZU5hbWUoXG4gICAgICAgICAgbW9kZWxUZXh0dXJlTnVtYmVyXG4gICAgICAgICk7XG4gICAgICAgIHRleHR1cmVQYXRoID0gdGhpcy5fbW9kZWxIb21lRGlyICsgdGV4dHVyZVBhdGg7XG5cbiAgICAgICAgLy8g44Ot44O844OJ5a6M5LqG5pmC44Gr5ZG844Gz5Ye644GZ44Kz44O844Or44OQ44OD44Kv6Zai5pWwXG4gICAgICAgIC8vIOWKoOi9veWujOaIkOaXtuiwg+eUqOeahOWbnuiwg+WHveaVsFxuICAgICAgICBjb25zdCBvbkxvYWQgPSAodGV4dHVyZUluZm86IFRleHR1cmVJbmZvKTogdm9pZCA9PiB7XG4gICAgICAgICAgdGhpcy5nZXRSZW5kZXJlcigpLmJpbmRUZXh0dXJlKG1vZGVsVGV4dHVyZU51bWJlciwgdGV4dHVyZUluZm8uaWQpO1xuXG4gICAgICAgICAgdGhpcy5fdGV4dHVyZUNvdW50Kys7XG5cbiAgICAgICAgICBpZiAodGhpcy5fdGV4dHVyZUNvdW50ID49IHRleHR1cmVDb3VudCkge1xuICAgICAgICAgICAgLy8g44Ot44O844OJ5a6M5LqGXG4gICAgICAgICAgICB0aGlzLl9zdGF0ZSA9IExvYWRTdGVwLkNvbXBsZXRlU2V0dXA7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIOiqreOBv+i+vOOBv1xuICAgICAgICBMQXBwRGVsZWdhdGUuZ2V0SW5zdGFuY2UoKVxuICAgICAgICAgIC5nZXRUZXh0dXJlTWFuYWdlcigpXG4gICAgICAgICAgLmNyZWF0ZVRleHR1cmVGcm9tUG5nRmlsZSh0ZXh0dXJlUGF0aCwgdXNlUHJlbXVsdGlwbHksIG9uTG9hZCk7XG4gICAgICAgIHRoaXMuZ2V0UmVuZGVyZXIoKS5zZXRJc1ByZW11bHRpcGxpZWRBbHBoYSh1c2VQcmVtdWx0aXBseSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3N0YXRlID0gTG9hZFN0ZXAuV2FpdExvYWRUZXh0dXJlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiDjg6zjg7Pjg4Djg6njgpLlho3mp4vnr4njgZnjgotcbiAgICovXG4gIHB1YmxpYyByZWxvYWRSZW5kZXJlcigpOiB2b2lkIHtcbiAgICB0aGlzLmRlbGV0ZVJlbmRlcmVyKCk7XG4gICAgdGhpcy5jcmVhdGVSZW5kZXJlcigpO1xuICAgIHRoaXMuc2V0dXBUZXh0dXJlcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIOabtOaWsFxuICAgKi9cbiAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fc3RhdGUgIT0gTG9hZFN0ZXAuQ29tcGxldGVTZXR1cCkgcmV0dXJuO1xuXG4gICAgY29uc3QgZGVsdGFUaW1lU2Vjb25kczogbnVtYmVyID0gTEFwcFBhbC5nZXREZWx0YVRpbWUoKTtcbiAgICB0aGlzLl91c2VyVGltZVNlY29uZHMgKz0gZGVsdGFUaW1lU2Vjb25kcztcblxuICAgIHRoaXMuX2RyYWdNYW5hZ2VyLnVwZGF0ZShkZWx0YVRpbWVTZWNvbmRzKTtcbiAgICB0aGlzLl9kcmFnWCA9IHRoaXMuX2RyYWdNYW5hZ2VyLmdldFgoKTtcbiAgICB0aGlzLl9kcmFnWSA9IHRoaXMuX2RyYWdNYW5hZ2VyLmdldFkoKTtcblxuICAgIC8vIOODouODvOOCt+ODp+ODs+OBq+OCiOOCi+ODkeODqeODoeODvOOCv+abtOaWsOOBruacieeEoVxuICAgIGxldCBtb3Rpb25VcGRhdGVkID0gZmFsc2U7XG5cbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgdGhpcy5fbW9kZWwubG9hZFBhcmFtZXRlcnMoKTsgLy8g5YmN5Zue44K744O844OW44GV44KM44Gf54q25oWL44KS44Ot44O844OJXG4gICAgaWYgKHRoaXMuX21vdGlvbk1hbmFnZXIuaXNGaW5pc2hlZCgpKSB7XG4gICAgICB0aGlzLnN0YXJ0UmFuZG9tTW90aW9uKFxuICAgICAgICBMQXBwRGVmaW5lLk1vdGlvbkdyb3VwSWRsZSxcbiAgICAgICAgTEFwcERlZmluZS5Qcmlvcml0eUlkbGVcbiAgICAgICk7XG4gICAgICAvLyDlnKjmsqHmnInliqjkvZznmoTov5DooYznmoTmg4XlhrXkuIvvvIzku47lvoXmnLrliqjkvZzkuK3pmo/mnLrov5DooYzmir3lj5bvvIzlkb3ov5Dmir3niYzllabllabllaZeIF5cbiAgICAgIGxldCBsdWNreSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMDAgKyAxMDApO1xuICAgICAgaWYgKGx1Y2t5ID09IDk5OSkge1xuICAgICAgICB0aGlzLnN0YXJ0UmFuZG9tTW90aW9uKFxuICAgICAgICAgIExBcHBEZWZpbmUuTW90aW9uR3JvdXBJZGxlLFxuICAgICAgICAgIExBcHBEZWZpbmUuUHJpb3JpdHlJZGxlXG4gICAgICAgICk7XG4gICAgICB9IGVsc2UgaWYgKGx1Y2t5ID09IDg4OCkge1xuICAgICAgICB0aGlzLnN0YXJ0UmFuZG9tTW90aW9uKFxuICAgICAgICAgIExBcHBEZWZpbmUuTW90aW9uR3JvdXBEZWZhdWx0LFxuICAgICAgICAgIExBcHBEZWZpbmUuUHJpb3JpdHlJZGxlXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIG1vdGlvblVwZGF0ZWQgPSB0aGlzLl9tb3Rpb25NYW5hZ2VyLnVwZGF0ZU1vdGlvbihcbiAgICAgICAgdGhpcy5fbW9kZWwsXG4gICAgICAgIGRlbHRhVGltZVNlY29uZHNcbiAgICAgICk7IC8vIOabtOaWsOWKqOS9nFxuICAgIH1cbiAgICB0aGlzLl9tb2RlbC5zYXZlUGFyYW1ldGVycygpOyAvLyDnirbmhYvjgpLkv53lrZhcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvLyDjgb7jgbDjgZ/jgY1cbiAgICBpZiAoIW1vdGlvblVwZGF0ZWQpIHtcbiAgICAgIGlmICh0aGlzLl9leWVCbGluayAhPSBudWxsKSB7XG4gICAgICAgIC8vIOODoeOCpOODs+ODouODvOOCt+ODp+ODs+OBruabtOaWsOOBjOOBquOBhOOBqOOBjVxuICAgICAgICB0aGlzLl9leWVCbGluay51cGRhdGVQYXJhbWV0ZXJzKHRoaXMuX21vZGVsLCBkZWx0YVRpbWVTZWNvbmRzKTsgLy8g55uu44OR44OBXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2V4cHJlc3Npb25NYW5hZ2VyICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX2V4cHJlc3Npb25NYW5hZ2VyLnVwZGF0ZU1vdGlvbih0aGlzLl9tb2RlbCwgZGVsdGFUaW1lU2Vjb25kcyk7IC8vIOihqOaDheOBp+ODkeODqeODoeODvOOCv+abtOaWsO+8iOebuOWvvuWkieWMlu+8iVxuICAgIH1cblxuICAgIC8vIOODieODqeODg+OCsOOBq+OCiOOCi+WkieWMllxuICAgIC8vIOODieODqeODg+OCsOOBq+OCiOOCi+mhlOOBruWQkeOBjeOBruiqv+aVtFxuICAgIHRoaXMuX21vZGVsLmFkZFBhcmFtZXRlclZhbHVlQnlJZCh0aGlzLl9pZFBhcmFtQW5nbGVYLCB0aGlzLl9kcmFnWCAqIDMwKTsgLy8gLTMw44GL44KJMzDjga7lgKTjgpLliqDjgYjjgotcbiAgICB0aGlzLl9tb2RlbC5hZGRQYXJhbWV0ZXJWYWx1ZUJ5SWQodGhpcy5faWRQYXJhbUFuZ2xlWSwgdGhpcy5fZHJhZ1kgKiAzMCk7XG4gICAgdGhpcy5fbW9kZWwuYWRkUGFyYW1ldGVyVmFsdWVCeUlkKFxuICAgICAgdGhpcy5faWRQYXJhbUFuZ2xlWixcbiAgICAgIHRoaXMuX2RyYWdYICogdGhpcy5fZHJhZ1kgKiAtMzBcbiAgICApO1xuXG4gICAgLy8g44OJ44Op44OD44Kw44Gr44KI44KL5L2T44Gu5ZCR44GN44Gu6Kq/5pW0XG4gICAgdGhpcy5fbW9kZWwuYWRkUGFyYW1ldGVyVmFsdWVCeUlkKFxuICAgICAgdGhpcy5faWRQYXJhbUJvZHlBbmdsZVgsXG4gICAgICB0aGlzLl9kcmFnWCAqIDEwXG4gICAgKTsgLy8gLTEw44GL44KJMTDjga7lgKTjgpLliqDjgYjjgotcblxuICAgIC8vIOODieODqeODg+OCsOOBq+OCiOOCi+ebruOBruWQkeOBjeOBruiqv+aVtFxuICAgIHRoaXMuX21vZGVsLmFkZFBhcmFtZXRlclZhbHVlQnlJZCh0aGlzLl9pZFBhcmFtRXllQmFsbFgsIHRoaXMuX2RyYWdYKTsgLy8gLTHjgYvjgokx44Gu5YCk44KS5Yqg44GI44KLXG4gICAgdGhpcy5fbW9kZWwuYWRkUGFyYW1ldGVyVmFsdWVCeUlkKHRoaXMuX2lkUGFyYW1FeWVCYWxsWSwgdGhpcy5fZHJhZ1kpO1xuXG4gICAgLy8g5ZG85ZC444Gq44GpXG4gICAgaWYgKHRoaXMuX2JyZWF0aCAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9icmVhdGgudXBkYXRlUGFyYW1ldGVycyh0aGlzLl9tb2RlbCwgZGVsdGFUaW1lU2Vjb25kcyk7XG4gICAgfVxuXG4gICAgLy8g54mp55CG5ryU566X44Gu6Kit5a6aXG4gICAgaWYgKHRoaXMuX3BoeXNpY3MgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fcGh5c2ljcy5ldmFsdWF0ZSh0aGlzLl9tb2RlbCwgZGVsdGFUaW1lU2Vjb25kcyk7XG4gICAgfVxuXG4gICAgLy8g44Oq44OD44OX44K344Oz44Kv44Gu6Kit5a6aXG4gICAgaWYgKHRoaXMuX2xpcHN5bmMpIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gMDsgLy8g44Oq44Ki44Or44K/44Kk44Og44Gn44Oq44OD44OX44K344Oz44Kv44KS6KGM44GG5aC05ZCI44CB44K344K544OG44Og44GL44KJ6Z+z6YeP44KS5Y+W5b6X44GX44Gm44CBMH4x44Gu56+E5Zuy44Gn5YCk44KS5YWl5Yqb44GX44G+44GZ44CCXG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fbGlwU3luY0lkcy5nZXRTaXplKCk7ICsraSkge1xuICAgICAgICB0aGlzLl9tb2RlbC5hZGRQYXJhbWV0ZXJWYWx1ZUJ5SWQodGhpcy5fbGlwU3luY0lkcy5hdChpKSwgdmFsdWUsIDAuOCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8g44Od44O844K644Gu6Kit5a6aXG4gICAgaWYgKHRoaXMuX3Bvc2UgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fcG9zZS51cGRhdGVQYXJhbWV0ZXJzKHRoaXMuX21vZGVsLCBkZWx0YVRpbWVTZWNvbmRzKTtcbiAgICB9XG5cbiAgICB0aGlzLl9tb2RlbC51cGRhdGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDlvJXmlbDjgafmjIflrprjgZfjgZ/jg6Ljg7zjgrfjg6fjg7Pjga7lho3nlJ/jgpLplovlp4vjgZnjgotcbiAgICogQHBhcmFtIGdyb3VwIOODouODvOOCt+ODp+ODs+OCsOODq+ODvOODl+WQjVxuICAgKiBAcGFyYW0gbm8g44Kw44Or44O844OX5YaF44Gu55Wq5Y+3XG4gICAqIEBwYXJhbSBwcmlvcml0eSDlhKrlhYjluqZcbiAgICogQHBhcmFtIG9uRmluaXNoZWRNb3Rpb25IYW5kbGVyIOODouODvOOCt+ODp+ODs+WGjeeUn+e1guS6huaZguOBq+WRvOOBs+WHuuOBleOCjOOCi+OCs+ODvOODq+ODkOODg+OCr+mWouaVsFxuICAgKiBAcmV0dXJuIOmWi+Wni+OBl+OBn+ODouODvOOCt+ODp+ODs+OBruitmOWIpeeVquWPt+OCkui/lOOBmeOAguWAi+WIpeOBruODouODvOOCt+ODp+ODs+OBjOe1guS6huOBl+OBn+OBi+WQpuOBi+OCkuWIpOWumuOBmeOCi2lzRmluaXNoZWQoKeOBruW8leaVsOOBp+S9v+eUqOOBmeOCi+OAgumWi+Wni+OBp+OBjeOBquOBhOaZguOBr1stMV1cbiAgICovXG4gIHB1YmxpYyBzdGFydE1vdGlvbihcbiAgICBncm91cDogc3RyaW5nLFxuICAgIG5vOiBudW1iZXIsXG4gICAgcHJpb3JpdHk6IG51bWJlcixcbiAgICBvbkZpbmlzaGVkTW90aW9uSGFuZGxlcj86IEZpbmlzaGVkTW90aW9uQ2FsbGJhY2tcbiAgKTogQ3ViaXNtTW90aW9uUXVldWVFbnRyeUhhbmRsZSB7XG4gICAgaWYgKHByaW9yaXR5ID09IExBcHBEZWZpbmUuUHJpb3JpdHlGb3JjZSkge1xuICAgICAgdGhpcy5fbW90aW9uTWFuYWdlci5zZXRSZXNlcnZlUHJpb3JpdHkocHJpb3JpdHkpO1xuICAgIH0gZWxzZSBpZiAoIXRoaXMuX21vdGlvbk1hbmFnZXIucmVzZXJ2ZU1vdGlvbihwcmlvcml0eSkpIHtcbiAgICAgIGlmICh0aGlzLl9kZWJ1Z01vZGUpIHtcbiAgICAgICAgTEFwcFBhbC5wcmludE1lc3NhZ2UoXCJbQVBQXWNhbid0IHN0YXJ0IG1vdGlvbi5cIik7XG4gICAgICB9XG4gICAgICByZXR1cm4gSW52YWxpZE1vdGlvblF1ZXVlRW50cnlIYW5kbGVWYWx1ZTtcbiAgICB9XG5cbiAgICBjb25zdCBtb3Rpb25GaWxlTmFtZSA9IHRoaXMuX21vZGVsU2V0dGluZy5nZXRNb3Rpb25GaWxlTmFtZShncm91cCwgbm8pO1xuXG4gICAgLy8gZXgpIGlkbGVfMFxuICAgIGNvbnN0IG5hbWUgPSBgJHtncm91cH1fJHtub31gO1xuICAgIGxldCBtb3Rpb246IEN1YmlzbU1vdGlvbiA9IHRoaXMuX21vdGlvbnMuZ2V0VmFsdWUobmFtZSkgYXMgQ3ViaXNtTW90aW9uO1xuICAgIGxldCBhdXRvRGVsZXRlID0gZmFsc2U7XG5cbiAgICBpZiAobW90aW9uID09IG51bGwpIHtcbiAgICAgIGZldGNoKGAke3RoaXMuX21vZGVsSG9tZURpcn0vJHttb3Rpb25GaWxlTmFtZX1gKVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5hcnJheUJ1ZmZlcigpKVxuICAgICAgICAudGhlbihhcnJheUJ1ZmZlciA9PiB7XG4gICAgICAgICAgbW90aW9uID0gdGhpcy5sb2FkTW90aW9uKFxuICAgICAgICAgICAgYXJyYXlCdWZmZXIsXG4gICAgICAgICAgICBhcnJheUJ1ZmZlci5ieXRlTGVuZ3RoLFxuICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgIG9uRmluaXNoZWRNb3Rpb25IYW5kbGVyXG4gICAgICAgICAgKTtcbiAgICAgICAgICBsZXQgZmFkZVRpbWU6IG51bWJlciA9IHRoaXMuX21vZGVsU2V0dGluZy5nZXRNb3Rpb25GYWRlSW5UaW1lVmFsdWUoXG4gICAgICAgICAgICBncm91cCxcbiAgICAgICAgICAgIG5vXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGlmIChmYWRlVGltZSA+PSAwLjApIHtcbiAgICAgICAgICAgIG1vdGlvbi5zZXRGYWRlSW5UaW1lKGZhZGVUaW1lKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmYWRlVGltZSA9IHRoaXMuX21vZGVsU2V0dGluZy5nZXRNb3Rpb25GYWRlT3V0VGltZVZhbHVlKGdyb3VwLCBubyk7XG4gICAgICAgICAgaWYgKGZhZGVUaW1lID49IDAuMCkge1xuICAgICAgICAgICAgbW90aW9uLnNldEZhZGVPdXRUaW1lKGZhZGVUaW1lKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBtb3Rpb24uc2V0RWZmZWN0SWRzKHRoaXMuX2V5ZUJsaW5rSWRzLCB0aGlzLl9saXBTeW5jSWRzKTtcbiAgICAgICAgICBhdXRvRGVsZXRlID0gdHJ1ZTsgLy8g57WC5LqG5pmC44Gr44Oh44Oi44Oq44GL44KJ5YmK6ZmkXG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBtb3Rpb24uc2V0RmluaXNoZWRNb3Rpb25IYW5kbGVyKG9uRmluaXNoZWRNb3Rpb25IYW5kbGVyKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fZGVidWdNb2RlKSB7XG4gICAgICBMQXBwUGFsLnByaW50TWVzc2FnZShgW0FQUF1zdGFydCBtb3Rpb246IFske2dyb3VwfV8ke25vfWApO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fbW90aW9uTWFuYWdlci5zdGFydE1vdGlvblByaW9yaXR5KFxuICAgICAgbW90aW9uLFxuICAgICAgYXV0b0RlbGV0ZSxcbiAgICAgIHByaW9yaXR5XG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDjg6njg7Pjg4Djg6DjgavpgbjjgbDjgozjgZ/jg6Ljg7zjgrfjg6fjg7Pjga7lho3nlJ/jgpLplovlp4vjgZnjgovjgIJcbiAgICogQHBhcmFtIGdyb3VwIOODouODvOOCt+ODp+ODs+OCsOODq+ODvOODl+WQjVxuICAgKiBAcGFyYW0gcHJpb3JpdHkg5YSq5YWI5bqmXG4gICAqIEBwYXJhbSBvbkZpbmlzaGVkTW90aW9uSGFuZGxlciDjg6Ljg7zjgrfjg6fjg7Plho3nlJ/ntYLkuobmmYLjgavlkbzjgbPlh7rjgZXjgozjgovjgrPjg7zjg6vjg5Djg4Pjgq/plqLmlbBcbiAgICogQHBhcmFtIG9uRmluaXNoZWRNb3Rpb25IYW5kbGVyIOWKqOS9nOWGjeeUn+e7k+adn+aXtuiwg+eUqOeahOWbnuWRvOWHveaVsFxuICAgKiBAcmV0dXJuIOmWi+Wni+OBl+OBn+ODouODvOOCt+ODp+ODs+OBruitmOWIpeeVquWPt+OCkui/lOOBmeOAguWAi+WIpeOBruODouODvOOCt+ODp+ODs+OBjOe1guS6huOBl+OBn+OBi+WQpuOBi+OCkuWIpOWumuOBmeOCi2lzRmluaXNoZWQoKeOBruW8leaVsOOBp+S9v+eUqOOBmeOCi+OAgumWi+Wni+OBp+OBjeOBquOBhOaZguOBr1stMV1cbiAgICogQHJldHVybiDov5Tlm57lvIDlp4vliqjkvZznmoTor4bliKvlj7fnoIHjgILnlKjkuo7liKTlrprkuKrliKvliqjkvZzmmK/lkKbnu5PmnZ/nmoRpc0ZpbmlzaGVk77yI77yJ5Y+C5pWw44CC5peg5rOV5byA5aeL5pe2Wy0xXVxuICAgKi9cbiAgcHVibGljIHN0YXJ0UmFuZG9tTW90aW9uKFxuICAgIGdyb3VwOiBzdHJpbmcsXG4gICAgcHJpb3JpdHk6IG51bWJlcixcbiAgICBvbkZpbmlzaGVkTW90aW9uSGFuZGxlcj86IEZpbmlzaGVkTW90aW9uQ2FsbGJhY2tcbiAgKTogQ3ViaXNtTW90aW9uUXVldWVFbnRyeUhhbmRsZSB7XG4gICAgaWYgKHRoaXMuX21vZGVsU2V0dGluZy5nZXRNb3Rpb25Db3VudChncm91cCkgPT0gMCkge1xuICAgICAgcmV0dXJuIEludmFsaWRNb3Rpb25RdWV1ZUVudHJ5SGFuZGxlVmFsdWU7XG4gICAgfVxuXG4gICAgY29uc3Qgbm86IG51bWJlciA9IE1hdGguZmxvb3IoXG4gICAgICBNYXRoLnJhbmRvbSgpICogdGhpcy5fbW9kZWxTZXR0aW5nLmdldE1vdGlvbkNvdW50KGdyb3VwKVxuICAgICk7XG4gICAgcmV0dXJuIHRoaXMuc3RhcnRNb3Rpb24oZ3JvdXAsIG5vLCBwcmlvcml0eSwgb25GaW5pc2hlZE1vdGlvbkhhbmRsZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIOW8leaVsOOBp+aMh+WumuOBl+OBn+ihqOaDheODouODvOOCt+ODp+ODs+OCkuOCu+ODg+ODiOOBmeOCi1xuICAgKlxuICAgKiBAcGFyYW0gZXhwcmVzc2lvbklkIOihqOaDheODouODvOOCt+ODp+ODs+OBrklEXG4gICAqL1xuICBwdWJsaWMgc2V0RXhwcmVzc2lvbihleHByZXNzaW9uSWQ6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IG1vdGlvbjogQUN1YmlzbU1vdGlvbiA9IHRoaXMuX2V4cHJlc3Npb25zLmdldFZhbHVlKGV4cHJlc3Npb25JZCk7XG5cbiAgICBpZiAodGhpcy5fZGVidWdNb2RlKSB7XG4gICAgICBMQXBwUGFsLnByaW50TWVzc2FnZShgW0FQUF1leHByZXNzaW9uOiBbJHtleHByZXNzaW9uSWR9XWApO1xuICAgIH1cblxuICAgIGlmIChtb3Rpb24gIT0gbnVsbCkge1xuICAgICAgdGhpcy5fZXhwcmVzc2lvbk1hbmFnZXIuc3RhcnRNb3Rpb25Qcmlvcml0eShcbiAgICAgICAgbW90aW9uLFxuICAgICAgICBmYWxzZSxcbiAgICAgICAgTEFwcERlZmluZS5Qcmlvcml0eUZvcmNlXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5fZGVidWdNb2RlKSB7XG4gICAgICAgIExBcHBQYWwucHJpbnRNZXNzYWdlKGBbQVBQXWV4cHJlc3Npb25bJHtleHByZXNzaW9uSWR9XSBpcyBudWxsYCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIOODqeODs+ODgOODoOOBq+mBuOOBsOOCjOOBn+ihqOaDheODouODvOOCt+ODp+ODs+OCkuOCu+ODg+ODiOOBmeOCi1xuICAgKi9cbiAgcHVibGljIHNldFJhbmRvbUV4cHJlc3Npb24oKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2V4cHJlc3Npb25zLmdldFNpemUoKSA9PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgbm86IG51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuX2V4cHJlc3Npb25zLmdldFNpemUoKSk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2V4cHJlc3Npb25zLmdldFNpemUoKTsgaSsrKSB7XG4gICAgICBpZiAoaSA9PSBubykge1xuICAgICAgICBjb25zdCBuYW1lOiBzdHJpbmcgPSB0aGlzLl9leHByZXNzaW9ucy5fa2V5VmFsdWVzW2ldLmZpcnN0O1xuICAgICAgICB0aGlzLnNldEV4cHJlc3Npb24obmFtZSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICog44Kk44OZ44Oz44OI44Gu55m654Gr44KS5Y+X44GR5Y+W44KLXG4gICAqL1xuICBwdWJsaWMgbW90aW9uRXZlbnRGaXJlZChldmVudFZhbHVlOiBjc21TdHJpbmcpOiB2b2lkIHtcbiAgICBDdWJpc21Mb2dJbmZvKCd7MH0gaXMgZmlyZWQgb24gTEFwcE1vZGVsISEnLCBldmVudFZhbHVlLnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIOW9k+OBn+OCiuWIpOWumuODhuOCueODiFxuICAgKiDmjIflrprvvKnvvKTjga7poILngrnjg6rjgrnjg4jjgYvjgonnn6nlvaLjgpLoqIjnrpfjgZfjgIHluqfmqJnjgpLjgYznn6nlvaLnr4Tlm7LlhoXjgYvliKTlrprjgZnjgovjgIJcbiAgICog5qC55o2u5oyH5a6aSUTnmoTpobbngrnliJfooajorqHnrpfnn6nlvaLvvIzliKTlrprlnZDmoIfmmK/lkKblnKjnn6nlvaLojIPlm7TlhoXjgIJcbiAgICpcbiAgICogQHBhcmFtIGhpdEFyZW5hTmFtZSAg5b2T44Gf44KK5Yik5a6a44KS44OG44K544OI44GZ44KL5a++6LGh44GuSURcbiAgICogQHBhcmFtIHggICAgICAgICAgICAg5Yik5a6a44KS6KGM44GGWOW6p+aomVxuICAgKiBAcGFyYW0geSAgICAgICAgICAgICDliKTlrprjgpLooYzjgYZZ5bqn5qiZXG4gICAqL1xuICBwdWJsaWMgaGl0VGVzdChoaXRBcmVuYU5hbWU6IHN0cmluZywgeDogbnVtYmVyLCB5OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICAvLyDpgI/mmI7mmYLjga/lvZPjgZ/jgorliKTlrprnhKHjgZfjgIJcbiAgICBpZiAodGhpcy5fb3BhY2l0eSA8IDEpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBjb3VudDogbnVtYmVyID0gdGhpcy5fbW9kZWxTZXR0aW5nLmdldEhpdEFyZWFzQ291bnQoKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgaWYgKHRoaXMuX21vZGVsU2V0dGluZy5nZXRIaXRBcmVhTmFtZShpKSA9PSBoaXRBcmVuYU5hbWUpIHtcbiAgICAgICAgY29uc3QgZHJhd0lkOiBDdWJpc21JZEhhbmRsZSA9IHRoaXMuX21vZGVsU2V0dGluZy5nZXRIaXRBcmVhSWQoaSk7XG4gICAgICAgIHJldHVybiB0aGlzLmlzSGl0KGRyYXdJZCwgeCwgeSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIOODouODvOOCt+ODp+ODs+ODh+ODvOOCv+OCkuOCsOODq+ODvOODl+WQjeOBi+OCieS4gOaLrOOBp+ODreODvOODieOBmeOCi+OAglxuICAgKiDjg6Ljg7zjgrfjg6fjg7Pjg4fjg7zjgr/jga7lkI3liY3jga/lhoXpg6jjgadNb2RlbFNldHRpbmfjgYvjgonlj5blvpfjgZnjgovjgIJcbiAgICog5LuO57uE5ZCI5ZCN56ew5Lit57uf5LiA5Yqg6L295Yqo5L2c5pWw5o2u44CCXG4gICAqIOWKqOS9nOaVsOaNrueahOWQjeensOWcqOWGhemDqOS7jk1vZGVsU2V0dGluZ+WPluW+l+OAglxuICAgKlxuICAgKiBAcGFyYW0gZ3JvdXAg44Oi44O844K344On44Oz44OH44O844K/44Gu44Kw44Or44O844OX5ZCNXG4gICAqIGdyb3Vw5Yqo5L2c5pWw5o2u55qE57uE5ZCN56ewXG4gICAqL1xuICBwdWJsaWMgcHJlTG9hZE1vdGlvbkdyb3VwKGdyb3VwOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX21vZGVsU2V0dGluZy5nZXRNb3Rpb25Db3VudChncm91cCk7IGkrKykge1xuICAgICAgY29uc3QgbW90aW9uRmlsZU5hbWUgPSB0aGlzLl9tb2RlbFNldHRpbmcuZ2V0TW90aW9uRmlsZU5hbWUoZ3JvdXAsIGkpO1xuICAgICAgLy8gZXgpIGlkbGVfMFxuICAgICAgY29uc3QgbmFtZSA9IGAke2dyb3VwfV8ke2l9YDtcbiAgICAgIGlmICh0aGlzLl9kZWJ1Z01vZGUpIHtcbiAgICAgICAgTEFwcFBhbC5wcmludE1lc3NhZ2UoXG4gICAgICAgICAgYFtBUFBdbG9hZCBtb3Rpb246ICR7bW90aW9uRmlsZU5hbWV9ID0+IFske25hbWV9XWBcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgZmV0Y2goYCR7dGhpcy5fbW9kZWxIb21lRGlyfS8ke21vdGlvbkZpbGVOYW1lfWApXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmFycmF5QnVmZmVyKCkpXG4gICAgICAgIC50aGVuKGFycmF5QnVmZmVyID0+IHtcbiAgICAgICAgICBjb25zdCB0bXBNb3Rpb246IEN1YmlzbU1vdGlvbiA9IHRoaXMubG9hZE1vdGlvbihcbiAgICAgICAgICAgIGFycmF5QnVmZmVyLFxuICAgICAgICAgICAgYXJyYXlCdWZmZXIuYnl0ZUxlbmd0aCxcbiAgICAgICAgICAgIG5hbWVcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgbGV0IGZhZGVUaW1lID0gdGhpcy5fbW9kZWxTZXR0aW5nLmdldE1vdGlvbkZhZGVJblRpbWVWYWx1ZShncm91cCwgaSk7XG4gICAgICAgICAgaWYgKGZhZGVUaW1lID49IDAuMCkge1xuICAgICAgICAgICAgdG1wTW90aW9uLnNldEZhZGVJblRpbWUoZmFkZVRpbWUpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGZhZGVUaW1lID0gdGhpcy5fbW9kZWxTZXR0aW5nLmdldE1vdGlvbkZhZGVPdXRUaW1lVmFsdWUoZ3JvdXAsIGkpO1xuICAgICAgICAgIGlmIChmYWRlVGltZSA+PSAwLjApIHtcbiAgICAgICAgICAgIHRtcE1vdGlvbi5zZXRGYWRlT3V0VGltZShmYWRlVGltZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRtcE1vdGlvbi5zZXRFZmZlY3RJZHModGhpcy5fZXllQmxpbmtJZHMsIHRoaXMuX2xpcFN5bmNJZHMpO1xuXG4gICAgICAgICAgaWYgKHRoaXMuX21vdGlvbnMuZ2V0VmFsdWUobmFtZSkgIT0gbnVsbCkge1xuICAgICAgICAgICAgQUN1YmlzbU1vdGlvbi5kZWxldGUodGhpcy5fbW90aW9ucy5nZXRWYWx1ZShuYW1lKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5fbW90aW9ucy5zZXRWYWx1ZShuYW1lLCB0bXBNb3Rpb24pO1xuXG4gICAgICAgICAgdGhpcy5fbW90aW9uQ291bnQrKztcbiAgICAgICAgICBpZiAodGhpcy5fbW90aW9uQ291bnQgPj0gdGhpcy5fYWxsTW90aW9uQ291bnQpIHtcbiAgICAgICAgICAgIHRoaXMuX3N0YXRlID0gTG9hZFN0ZXAuTG9hZFRleHR1cmU7XG5cbiAgICAgICAgICAgIC8vIOWFqOOBpuOBruODouODvOOCt+ODp+ODs+OCkuWBnOatouOBmeOCi1xuICAgICAgICAgICAgdGhpcy5fbW90aW9uTWFuYWdlci5zdG9wQWxsTW90aW9ucygpO1xuXG4gICAgICAgICAgICB0aGlzLl91cGRhdGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5faW5pdGlhbGl6ZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVJlbmRlcmVyKCk7XG4gICAgICAgICAgICB0aGlzLnNldHVwVGV4dHVyZXMoKTtcbiAgICAgICAgICAgIHRoaXMuZ2V0UmVuZGVyZXIoKS5zdGFydFVwKGdsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiDjgZnjgbnjgabjga7jg6Ljg7zjgrfjg6fjg7Pjg4fjg7zjgr/jgpLop6PmlL7jgZnjgovjgIJcbiAgICovXG4gIHB1YmxpYyByZWxlYXNlTW90aW9ucygpOiB2b2lkIHtcbiAgICB0aGlzLl9tb3Rpb25zLmNsZWFyKCk7XG4gIH1cblxuICAvKipcbiAgICog5YWo44Gm44Gu6KGo5oOF44OH44O844K/44KS6Kej5pS+44GZ44KL44CCXG4gICAqL1xuICBwdWJsaWMgcmVsZWFzZUV4cHJlc3Npb25zKCk6IHZvaWQge1xuICAgIHRoaXMuX2V4cHJlc3Npb25zLmNsZWFyKCk7XG4gIH1cblxuICAvKipcbiAgICog44Oi44OH44Or44KS5o+P55S744GZ44KL5Yem55CG44CC44Oi44OH44Or44KS5o+P55S744GZ44KL56m66ZaT44GuVmlldy1Qcm9qZWN0aW9u6KGM5YiX44KS5rih44GZ44CCXG4gICAqL1xuICBwdWJsaWMgZG9EcmF3KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9tb2RlbCA9PSBudWxsKSByZXR1cm47XG5cbiAgICAvLyDjgq3jg6Pjg7Pjg5DjgrnjgrXjgqTjgrrjgpLmuKHjgZlcbiAgICBjb25zdCB2aWV3cG9ydDogbnVtYmVyW10gPSBbMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0XTtcblxuICAgIHRoaXMuZ2V0UmVuZGVyZXIoKS5zZXRSZW5kZXJTdGF0ZShmcmFtZUJ1ZmZlciwgdmlld3BvcnQpO1xuICAgIHRoaXMuZ2V0UmVuZGVyZXIoKS5kcmF3TW9kZWwoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDjg6Ljg4fjg6vjgpLmj4/nlLvjgZnjgovlh6bnkIbjgILjg6Ljg4fjg6vjgpLmj4/nlLvjgZnjgovnqbrplpPjga5WaWV3LVByb2plY3Rpb27ooYzliJfjgpLmuKHjgZnjgIJcbiAgICovXG4gIHB1YmxpYyBkcmF3KG1hdHJpeDogQ3ViaXNtTWF0cml4NDQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fbW9kZWwgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIOWQhOiqreOBv+i+vOOBv+e1guS6huW+jFxuICAgIGlmICh0aGlzLl9zdGF0ZSA9PSBMb2FkU3RlcC5Db21wbGV0ZVNldHVwKSB7XG4gICAgICBtYXRyaXgubXVsdGlwbHlCeU1hdHJpeCh0aGlzLl9tb2RlbE1hdHJpeCk7XG5cbiAgICAgIHRoaXMuZ2V0UmVuZGVyZXIoKS5zZXRNdnBNYXRyaXgobWF0cml4KTtcblxuICAgICAgdGhpcy5kb0RyYXcoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICog44Kz44Oz44K544OI44Op44Kv44K/XG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuX21vZGVsU2V0dGluZyA9IG51bGw7XG4gICAgdGhpcy5fbW9kZWxIb21lRGlyID0gbnVsbDtcbiAgICB0aGlzLl91c2VyVGltZVNlY29uZHMgPSAwLjA7XG5cbiAgICB0aGlzLl9leWVCbGlua0lkcyA9IG5ldyBjc21WZWN0b3I8Q3ViaXNtSWRIYW5kbGU+KCk7XG4gICAgdGhpcy5fbGlwU3luY0lkcyA9IG5ldyBjc21WZWN0b3I8Q3ViaXNtSWRIYW5kbGU+KCk7XG5cbiAgICB0aGlzLl9tb3Rpb25zID0gbmV3IGNzbU1hcDxzdHJpbmcsIEFDdWJpc21Nb3Rpb24+KCk7XG4gICAgdGhpcy5fZXhwcmVzc2lvbnMgPSBuZXcgY3NtTWFwPHN0cmluZywgQUN1YmlzbU1vdGlvbj4oKTtcblxuICAgIHRoaXMuX2hpdEFyZWEgPSBuZXcgY3NtVmVjdG9yPGNzbVJlY3Q+KCk7XG4gICAgdGhpcy5fdXNlckFyZWEgPSBuZXcgY3NtVmVjdG9yPGNzbVJlY3Q+KCk7XG5cbiAgICB0aGlzLl9pZFBhcmFtQW5nbGVYID0gQ3ViaXNtRnJhbWV3b3JrLmdldElkTWFuYWdlcigpLmdldElkKFxuICAgICAgQ3ViaXNtRGVmYXVsdFBhcmFtZXRlcklkLlBhcmFtQW5nbGVYXG4gICAgKTtcbiAgICB0aGlzLl9pZFBhcmFtQW5nbGVZID0gQ3ViaXNtRnJhbWV3b3JrLmdldElkTWFuYWdlcigpLmdldElkKFxuICAgICAgQ3ViaXNtRGVmYXVsdFBhcmFtZXRlcklkLlBhcmFtQW5nbGVZXG4gICAgKTtcbiAgICB0aGlzLl9pZFBhcmFtQW5nbGVaID0gQ3ViaXNtRnJhbWV3b3JrLmdldElkTWFuYWdlcigpLmdldElkKFxuICAgICAgQ3ViaXNtRGVmYXVsdFBhcmFtZXRlcklkLlBhcmFtQW5nbGVaXG4gICAgKTtcbiAgICB0aGlzLl9pZFBhcmFtRXllQmFsbFggPSBDdWJpc21GcmFtZXdvcmsuZ2V0SWRNYW5hZ2VyKCkuZ2V0SWQoXG4gICAgICBDdWJpc21EZWZhdWx0UGFyYW1ldGVySWQuUGFyYW1FeWVCYWxsWFxuICAgICk7XG4gICAgdGhpcy5faWRQYXJhbUV5ZUJhbGxZID0gQ3ViaXNtRnJhbWV3b3JrLmdldElkTWFuYWdlcigpLmdldElkKFxuICAgICAgQ3ViaXNtRGVmYXVsdFBhcmFtZXRlcklkLlBhcmFtRXllQmFsbFlcbiAgICApO1xuICAgIHRoaXMuX2lkUGFyYW1Cb2R5QW5nbGVYID0gQ3ViaXNtRnJhbWV3b3JrLmdldElkTWFuYWdlcigpLmdldElkKFxuICAgICAgQ3ViaXNtRGVmYXVsdFBhcmFtZXRlcklkLlBhcmFtQm9keUFuZ2xlWFxuICAgICk7XG5cbiAgICB0aGlzLl9zdGF0ZSA9IExvYWRTdGVwLkxvYWRBc3NldHM7XG4gICAgdGhpcy5fZXhwcmVzc2lvbkNvdW50ID0gMDtcbiAgICB0aGlzLl90ZXh0dXJlQ291bnQgPSAwO1xuICAgIHRoaXMuX21vdGlvbkNvdW50ID0gMDtcbiAgICB0aGlzLl9hbGxNb3Rpb25Db3VudCA9IDA7XG4gIH1cblxuICBfbW9kZWxTZXR0aW5nOiBJQ3ViaXNtTW9kZWxTZXR0aW5nOyAvLyDjg6Ljg4fjg6vjgrvjg4Pjg4bjgqPjg7PjgrDmg4XloLFcbiAgX21vZGVsSG9tZURpcjogc3RyaW5nOyAvLyDjg6Ljg4fjg6vjgrvjg4Pjg4bjgqPjg7PjgrDjgYznva7jgYvjgozjgZ/jg4fjgqPjg6zjgq/jg4jjg6pcbiAgX3VzZXJUaW1lU2Vjb25kczogbnVtYmVyOyAvLyDjg4fjg6vjgr/mmYLplpPjga7nqY3nrpflgKRb56eSXVxuXG4gIF9leWVCbGlua0lkczogY3NtVmVjdG9yPEN1YmlzbUlkSGFuZGxlPjsgLy8g44Oi44OH44Or44Gr6Kit5a6a44GV44KM44Gf556s44GN5qmf6IO955So44OR44Op44Oh44O844K/SURcbiAgX2xpcFN5bmNJZHM6IGNzbVZlY3RvcjxDdWJpc21JZEhhbmRsZT47IC8vIOODouODh+ODq+OBq+ioreWumuOBleOCjOOBn+ODquODg+ODl+OCt+ODs+OCr+apn+iDveeUqOODkeODqeODoeODvOOCv0lEXG5cbiAgX21vdGlvbnM6IGNzbU1hcDxzdHJpbmcsIEFDdWJpc21Nb3Rpb24+OyAvLyDoqq3jgb/ovrzjgb7jgozjgabjgYTjgovjg6Ljg7zjgrfjg6fjg7Pjga7jg6rjgrnjg4hcbiAgX2V4cHJlc3Npb25zOiBjc21NYXA8c3RyaW5nLCBBQ3ViaXNtTW90aW9uPjsgLy8g6Kqt44G/6L6844G+44KM44Gm44GE44KL6KGo5oOF44Gu44Oq44K544OIXG5cbiAgX2hpdEFyZWE6IGNzbVZlY3Rvcjxjc21SZWN0PjtcbiAgX3VzZXJBcmVhOiBjc21WZWN0b3I8Y3NtUmVjdD47XG5cbiAgX2lkUGFyYW1BbmdsZVg6IEN1YmlzbUlkSGFuZGxlOyAvLyDjg5Hjg6njg6Hjg7zjgr9JRDogUGFyYW1BbmdsZVhcbiAgX2lkUGFyYW1BbmdsZVk6IEN1YmlzbUlkSGFuZGxlOyAvLyDjg5Hjg6njg6Hjg7zjgr9JRDogUGFyYW1BbmdsZVlcbiAgX2lkUGFyYW1BbmdsZVo6IEN1YmlzbUlkSGFuZGxlOyAvLyDjg5Hjg6njg6Hjg7zjgr9JRDogUGFyYW1BbmdsZVpcbiAgX2lkUGFyYW1FeWVCYWxsWDogQ3ViaXNtSWRIYW5kbGU7IC8vIOODkeODqeODoeODvOOCv0lEOiBQYXJhbUV5ZUJhbGxYXG4gIF9pZFBhcmFtRXllQmFsbFk6IEN1YmlzbUlkSGFuZGxlOyAvLyDjg5Hjg6njg6Hjg7zjgr9JRDogUGFyYW1FeWVCQWxsWVxuICBfaWRQYXJhbUJvZHlBbmdsZVg6IEN1YmlzbUlkSGFuZGxlOyAvLyDjg5Hjg6njg6Hjg7zjgr9JRDogUGFyYW1Cb2R5QW5nbGVYXG5cbiAgX3N0YXRlOiBudW1iZXI7IC8vIOePvuWcqOOBruOCueODhuODvOOCv+OCueeuoeeQhueUqFxuICBfZXhwcmVzc2lvbkNvdW50OiBudW1iZXI7IC8vIOihqOaDheODh+ODvOOCv+OCq+OCpuODs+ODiFxuICBfdGV4dHVyZUNvdW50OiBudW1iZXI7IC8vIOODhuOCr+OCueODgeODo+OCq+OCpuODs+ODiFxuICBfbW90aW9uQ291bnQ6IG51bWJlcjsgLy8g44Oi44O844K344On44Oz44OH44O844K/44Kr44Km44Oz44OIXG4gIF9hbGxNb3Rpb25Db3VudDogbnVtYmVyOyAvLyDjg6Ljg7zjgrfjg6fjg7Pnt4/mlbBcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=