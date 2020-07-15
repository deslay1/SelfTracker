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
var firebase_1 = __importDefault(require("firebase"));
Promise.resolve().then(function () { return __importStar(require("firebase/firestore")); });
unMount = function () { return null; };
var ListController = /** @class */ (function () {
    function ListController() {
    }
    ListController.prototype.getLists = function (callback) {
        var ref = this.listsCollection.orderBy("name");
        this.unMount = ref.onSnapshot(function (snapshot) {
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
        this.listsCollection.doc(list.id).delete();
    };
    Object.defineProperty(ListController.prototype, "listsCollection", {
        get: function () {
            return firebase_1.default.firestore().collection("users").doc(this.uid).collection("lists");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ListController.prototype, "uid", {
        get: function () {
            return (firebase_1.default.auth().currentUser || {}).uid;
        },
        enumerable: false,
        configurable: true
    });
    ListController.prototype.detach = function () {
        this.unMount();
    };
    Object.defineProperty(ListController.prototype, "listDB", {
        get: function () {
            return this.firestore.collection("lists");
        },
        enumerable: false,
        configurable: true
    });
    return ListController;
}());
exports.default = new ListController();
