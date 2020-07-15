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
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var Navigators_1 = require("./navigation/Navigators");
var base_64_1 = require("base-64");
// @ts-ignore
if (!global.btoa) {
    // @ts-ignore
    global.btoa = base_64_1.encode;
}
// @ts-ignore
if (!global.atob) {
    // @ts-ignore
    global.atob = base_64_1.decode;
}
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App(props) {
        return _super.call(this, props) || this;
    }
    App.prototype.render = function () {
        return (react_1["default"].createElement(react_native_1.View, { style: styles.container },
            react_1["default"].createElement(Navigators_1["default"], null)));
    };
    return App;
}(react_1.Component));
exports["default"] = App;
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    }
});
