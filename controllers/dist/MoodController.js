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
exports.__esModule = true;
exports.now = void 0;
var firebase_1 = require("firebase");
Promise.resolve().then(function () { return require("firebase/firestore"); });
// import moment from "moment";
exports.now = null;
// @ts-ignore
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
                var mood = __assign({ id: doc.id }, doc.data());
                moodsArray.push(mood);
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
        this.moodsCollection.doc(mood.id)["delete"]();
    };
    Object.defineProperty(MoodController.prototype, "moodsCollection", {
        get: function () {
            return firebase_1["default"].firestore().collection("users").doc(this.uid).collection("moods");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MoodController.prototype, "uid", {
        get: function () {
            return (firebase_1["default"].auth().currentUser || {}).uid;
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
exports["default"] = new MoodController();
