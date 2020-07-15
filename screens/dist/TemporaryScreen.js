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
var TemporaryScreen = /** @class */ (function (_super) {
    __extends(TemporaryScreen, _super);
    function TemporaryScreen() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TemporaryScreen.prototype.render = function () {
        return (react_1["default"].createElement(react_native_1.View, { style: styles.container },
            react_1["default"].createElement(react_native_1.Text, null, "This is a temp screen")));
    };
    return TemporaryScreen;
}(react_1.Component));
exports["default"] = TemporaryScreen;
// @ts-ignore
TemporaryScreen.navigationOptions = {
    headerShown: false
};
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    }
});
