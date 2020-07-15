"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.now = void 0;
var firebase_1 = __importDefault(require("firebase"));
Promise.resolve().then(function () { return __importStar(require("firebase/firestore")); });
exports.now = null;
unMount = function () { return null; };
var MoodController = /** @class */ (function () {
    function MoodController() {
    }
    MoodController.prototype.getMoods = function (callback) {
        /* const now = firebase.firestore.Timestamp.fromDate(new Date()).toMillis();
        const lowerLimit = moment(now).startOf("month").valueOf();
        const upperLimit = moment(now).endOf("month").valueOf();
        let moodsRef = this.moodsCollection.where("day", ">", lowerLimit).where("day", "<=", upperLimit); */
        var moodsRef = this.moodsCollection;
        var moodsArray = [];
        this.unMount = moodsRef.onSnapshot(function (snapshot) {
            snapshot.forEach(function (doc) {
                moodsArray.push(__assign({ id: doc.id }, doc.data()));
            });
            callback(moodsArray);
        });
    };
    MoodController.prototype.addMood = function (mood) {
        this.moodsCollection.add(mood);
    };
    MoodController.prototype.updateMood = function (mood, moodUID) {
        this.moodsCollection.doc(moodUID).update(mood);
    };
    MoodController.prototype.deleteMood = function (mood) {
        this.moodsCollection.doc(mood.id).delete();
    };
    Object.defineProperty(MoodController.prototype, "moodsCollection", {
        get: function () {
            return firebase_1.default.firestore().collection("users").doc(this.uid).collection("moods");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MoodController.prototype, "uid", {
        get: function () {
            return (firebase_1.default.auth().currentUser || {}).uid;
        },
        enumerable: false,
        configurable: true
    });
    MoodController.prototype.detach = function () {
        this.unMount();
    };
    Object.defineProperty(MoodController.prototype, "moodDB", {
        get: function () {
            return this.firestore.collection("moods");
        },
        enumerable: false,
        configurable: true
    });
    return MoodController;
}());
exports.default = new MoodController();
