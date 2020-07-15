"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var Permissions = require("expo-permissions");
var expo_constants_1 = require("expo-constants");
var expo_1 = require("expo");
var react_native_1 = require("react-native");
function registerForPushNotificationsAsync() {
    return __awaiter(this, void 0, void 0, function () {
        var existingStatus, finalStatus, status, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (react_native_1.Platform.OS === "android") {
                        expo_1.Notifications.createChannelAndroidAsync("default", {
                            name: "default",
                            sound: true,
                            priority: "max",
                            vibrate: [0, 250, 250, 250]
                        });
                    }
                    if (!expo_constants_1["default"].isDevice) return [3 /*break*/, 5];
                    return [4 /*yield*/, Permissions.getAsync(Permissions.NOTIFICATIONS)];
                case 1:
                    existingStatus = (_a.sent()).status;
                    finalStatus = existingStatus;
                    if (!(existingStatus !== "granted")) return [3 /*break*/, 3];
                    return [4 /*yield*/, Permissions.askAsync(Permissions.NOTIFICATIONS)];
                case 2:
                    status = (_a.sent()).status;
                    finalStatus = status;
                    _a.label = 3;
                case 3:
                    if (finalStatus !== "granted") {
                        // @ts-ignore
                        alert("Failed to get push token for push notification!");
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, expo_1.Notifications.getExpoPushTokenAsync()];
                case 4:
                    token = _a.sent();
                    return [2 /*return*/, token];
                case 5:
                    // @ts-ignore
                    alert("Must use physical device for Push Notifications");
                    _a.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    });
}
function sendPushNotification(expoPushToken) {
    return __awaiter(this, void 0, void 0, function () {
        var message;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log(expoPushToken);
                    message = {
                        to: expoPushToken,
                        sound: "default",
                        title: "Original Title",
                        body: "And here is the body!",
                        data: { data: "goes here" }
                    };
                    return [4 /*yield*/, fetch("https://exp.host/--/api/v2/push/send", {
                            method: "POST",
                            headers: {
                                Accept: "application/json",
                                "Accept-encoding": "gzip, deflate",
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(message)
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports["default"] = { registerForPushNotificationsAsync: registerForPushNotificationsAsync, sendPushNotification: sendPushNotification };
