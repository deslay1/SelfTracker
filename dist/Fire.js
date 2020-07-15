"use strict";
exports.__esModule = true;
var config_1 = require("./config");
var firebase_1 = require("firebase");
Promise.resolve().then(function () { return require("firebase/firestore"); });
//Controllers
var UserController_1 = require("./controllers/UserController");
var ListController_1 = require("./controllers/ListController");
var MoodController_1 = require("./controllers/MoodController");
var FireAPI = /** @class */ (function () {
    function FireAPI() {
        // not utilized
        /*   loadingCheck = () => {
          this.checkAuth();
        };
      
        checkAuth = () => {
          firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
              firebase
                .auth()
                .signInAnonymously()
                .catch(function (error) {
                  alert(error.message);
                });
            }
          });
        }; */
        // User stuff
        this.loginUser = function (email, password) {
            UserController_1["default"].loginUser(email, password);
        };
        this.createUser = function (user) {
            UserController_1["default"].createUser(user);
        };
        this.signOut = function () {
            firebase_1["default"].auth().signOut();
        };
        if (!firebase_1["default"].apps.length) {
            firebase_1["default"].initializeApp(config_1["default"]);
            //firebase.analytics();
        }
    }
    Object.defineProperty(FireAPI.prototype, "uid", {
        /* get user() {
          console.log(UserController.user);
          return UserController.user;
        } */
        get: function () {
            return (firebase_1["default"].auth().currentUser || {}).uid;
        },
        enumerable: false,
        configurable: true
    });
    FireAPI.prototype.getLists = function (callback) {
        ListController_1["default"].getLists(callback);
    };
    FireAPI.prototype.addList = function (list) {
        ListController_1["default"].addList(list);
    };
    FireAPI.prototype.updateList = function (list) {
        ListController_1["default"].updateList(list);
    };
    FireAPI.prototype.deleteList = function (list) {
        ListController_1["default"].deleteList(list);
    };
    FireAPI.prototype.detach = function () {
        ListController_1["default"].detach();
    };
    FireAPI.prototype.getMoods = function (callback) {
        MoodController_1["default"].getMoods(callback);
    };
    /*   addMood(mood, moodsUID) {
      MoodController.addMood(mood, moodsUID);
    } */
    FireAPI.prototype.addMood = function (mood) {
        MoodController_1["default"].addMood(mood);
    };
    FireAPI.prototype.updateMood = function (mood, moodUID) {
        MoodController_1["default"].updateMood(mood, moodUID);
    };
    FireAPI.prototype.deleteMood = function (mood) {
        MoodController_1["default"].deleteMood(mood);
    };
    FireAPI.prototype.detachMood = function () {
        MoodController_1["default"].detach();
    };
    Object.defineProperty(FireAPI.prototype, "firestore", {
        get: function () {
            return firebase_1["default"].firestore();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FireAPI.prototype, "firebase", {
        get: function () {
            return firebase_1["default"];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FireAPI.prototype, "timestamp", {
        get: function () {
            return firebase_1["default"].firestore.FieldValue.serverTimestamp();
        },
        enumerable: false,
        configurable: true
    });
    return FireAPI;
}());
//Fire.shared = new Fire();
var Fire = new FireAPI();
exports["default"] = Fire;
