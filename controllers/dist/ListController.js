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
var firebase_1 = require("firebase");
Promise.resolve().then(function () { return require("firebase/firestore"); });
// @ts-ignore
unMount = function () { return null; };
var ListController = /** @class */ (function () {
    function ListController() {
    }
    ListController.prototype.getLists = function (callback) {
        this.unMount = this.listsCollection.orderBy("name").onSnapshot(function (snapshot) {
            var lists = [];
            snapshot.forEach(function (doc) {
                lists.push(__assign({ id: doc.id }, doc.data()));
            });
            callback(lists);
        });
    };
    ListController.prototype.addList = function (list) {
        this.listsCollection.add(list);
    };
    ListController.prototype.updateList = function (list) {
        this.listsCollection.doc(list.id).update(list);
    };
    ListController.prototype.deleteList = function (list) {
        this.listsCollection.doc(list.id)["delete"]();
    };
    Object.defineProperty(ListController.prototype, "listsCollection", {
        get: function () {
            return firebase_1["default"].firestore().collection("users").doc(this.uid).collection("lists");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ListController.prototype, "uid", {
        get: function () {
            return (firebase_1["default"].auth().currentUser || {}).uid;
        },
        enumerable: false,
        configurable: true
    });
    ListController.prototype.detach = function () {
        this.unMount();
    };
    return ListController;
}());
exports["default"] = new ListController();
