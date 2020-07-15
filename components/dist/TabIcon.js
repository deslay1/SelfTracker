"use strict";
exports.__esModule = true;
var react_1 = require("react");
var vector_icons_1 = require("@expo/vector-icons");
var Colors_1 = require("../constants/Colors");
function TabIcon(props) {
    return (react_1["default"].createElement(vector_icons_1.Feather, { name: props.name, size: 22, style: { marginBottom: -3 }, color: props.focused ? Colors_1["default"].tabIconSelected : Colors_1["default"].tabIconDefault }));
}
exports["default"] = TabIcon;
