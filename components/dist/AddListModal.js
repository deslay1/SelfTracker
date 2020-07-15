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
//import Colors from "../constants/Colors";
var AddListModal = /** @class */ (function (_super) {
    __extends(AddListModal, _super);
    function AddListModal() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.backgroundColors = ["#5CD859", "#24A6D9", "#595BD9", "#8022D9", "#D159D8", "#D85963", "#D88559"];
        _this.state = {
            name: "",
            color: _this.backgroundColors[0]
        };
        _this.createTodo = function () {
            var _a = _this.state, name = _a.name, color = _a.color;
            var list = { name: name, color: color };
            _this.props.addList(list);
            _this.setState({ name: "" });
            _this.props.closeModal();
        };
        return _this;
    }
    AddListModal.prototype.renderColors = function () {
        var _this = this;
        return this.backgroundColors.map(function (color) {
            return (react_1["default"].createElement(react_native_1.TouchableOpacity, { key: color, style: [styles.colorSelect, { backgroundColor: color }], onPress: function () { return _this.setState({ color: color }); } }));
        });
    };
    AddListModal.prototype.render = function () {
        var _this = this;
        return (react_1["default"].createElement(react_native_1.KeyboardAvoidingView, { style: styles.container, keyboardVerticalOffset: -500, behavior: react_native_1.Platform.OS === "ios" ? "padding" : null },
            react_1["default"].createElement(react_native_1.TouchableOpacity, { style: { position: "absolute", top: 32, right: 32 }, onPress: this.props.closeModal },
                react_1["default"].createElement(vector_icons_1.AntDesign, { name: "close", size: 24, color: "black" })),
            react_1["default"].createElement(react_native_1.View, { style: { alignSelf: "stretch", marginHorizontal: 32 } },
                react_1["default"].createElement(react_native_1.Text, { style: styles.title }, "Create a List"),
                react_1["default"].createElement(react_native_1.TextInput, { style: [styles.input, { borderColor: this.state.color }], placeholder: "Enter List Name (max 15 characters)", onChangeText: function (name) { return _this.setState({ name: name }); }, maxLength: 15 }),
                react_1["default"].createElement(react_native_1.View, { style: styles.colorSelectContainer }, this.renderColors()),
                react_1["default"].createElement(react_native_1.TouchableOpacity, { style: [styles.create, { backgroundColor: this.state.color }], onPress: this.createTodo },
                    react_1["default"].createElement(react_native_1.Text, { style: { color: "#fff", fontWeight: "bold" } }, "Create!")))));
    };
    return AddListModal;
}(react_1.Component));
exports["default"] = AddListModal;
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        alignSelf: "center"
    },
    input: {
        borderWidth: react_native_1.StyleSheet.hairlineWidth,
        borderRadius: 6,
        height: 50,
        marginTop: 8,
        paddingHorizontal: 16
    },
    create: {
        marginTop: 16,
        height: 50,
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center"
    },
    colorSelectContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 12
    },
    colorSelect: {
        width: 30,
        height: 30,
        borderRadius: 4
    }
});
