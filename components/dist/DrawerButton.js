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
var vector_icons_1 = require("@expo/vector-icons");
var Colors_1 = require("../constants/Colors");
var react_navigation_drawer_1 = require("react-navigation-drawer");
var DrawerButton = /** @class */ (function (_super) {
    __extends(DrawerButton, _super);
    function DrawerButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DrawerButton.prototype.componentDidMount = function () {
        // @ts-ignore
        this.props.unMount;
    };
    DrawerButton.prototype.render = function () {
        var _this = this;
        return (react_1["default"].createElement(react_native_1.TouchableOpacity, { style: styles.container, 
            // @ts-ignore
            onPress: function () { return _this.props.navigation.dispatch(react_navigation_drawer_1.DrawerActions.openDrawer()); } },
            react_1["default"].createElement(vector_icons_1.FontAwesome, { name: "bars", size: 32, color: Colors_1["default"].tintColor })));
    };
    return DrawerButton;
}(react_1.Component));
exports["default"] = DrawerButton;
var styles = react_native_1.StyleSheet.create({
    container: {
        alignItems: "center",
        marginLeft: "2%",
        padding: 3,
        borderRadius: 8
    },
    text: {
        fontSize: 14,
        alignItems: "center",
        color: "red"
    }
});
