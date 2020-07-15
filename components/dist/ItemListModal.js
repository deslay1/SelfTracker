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
var Swipeable_1 = require("react-native-gesture-handler/Swipeable");
var vector_icons_1 = require("@expo/vector-icons");
var Colors_1 = require("../constants/Colors");
var ItemListModal = /** @class */ (function (_super) {
    __extends(ItemListModal, _super);
    function ItemListModal(props) {
        var _this = _super.call(this, props) || this;
        _this.toggleItemCompleted = function (index) {
            var list = _this.props.list;
            list.items[index].completed = !list.items[index].completed;
            _this.props.updateList(list);
        };
        _this.addItem = function () {
            var list = _this.props.list;
            if (!list.items.some(function (item) { return item.title === _this.state.newItem; })) {
                list.items.push({ title: _this.state.newItem, completed: false });
                _this.props.updateList(list);
            }
            _this.setState({ newItem: "" });
            react_native_1.Keyboard.dismiss();
        };
        _this.deleteItem = function (index) {
            var list = _this.props.list;
            list.items.splice(index, 1);
            _this.props.updateList(list);
        };
        _this.alertDeleteList = function (list) {
            return react_native_1.Alert.alert("Delete List?", "Are you sure you want to delete this list?", [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                { text: "Delete", onPress: function () { return _this.props.deleteList(list); } },
            ], { cancelable: false });
        };
        _this.alertDeleteItem = function (itemIndex) {
            return react_native_1.Alert.alert("Delete Item?", "Are you sure you want to delete this item?", [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                { text: "Delete", onPress: function () { return _this.deleteItem(itemIndex); } },
            ], { cancelable: true });
        };
        _this.renderItem = function (item, index) {
            return (
            // @ts-ignore
            react_1["default"].createElement(Swipeable_1["default"], { renderRightActions: function (_, dragX) { return _this.rightActions(dragX, index); } },
                react_1["default"].createElement(react_native_1.View, { style: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" } },
                    react_1["default"].createElement(react_native_1.View, { style: styles.itemContainer },
                        react_1["default"].createElement(react_native_1.TouchableOpacity, { onPress: function () { return _this.toggleItemCompleted(index); } },
                            react_1["default"].createElement(vector_icons_1.FontAwesome, { name: item.completed ? "check-square" : "square-o", size: 24, color: Colors_1["default"].underlayColor, style: { width: 32 } })),
                        react_1["default"].createElement(react_native_1.Text, { style: [
                                styles.item,
                                {
                                    textDecorationLine: item.completed ? "line-through" : "none",
                                    color: item.completed ? Colors_1["default"].tintColor : "black"
                                },
                            ] }, item.title)),
                    react_1["default"].createElement(react_native_1.View, null,
                        react_1["default"].createElement(react_native_1.TouchableOpacity, { style: styles.button, onPress: function () { return _this.alertDeleteItem(index); } },
                            react_1["default"].createElement(react_native_1.Text, { style: styles.buttonText }, "Delete"))))));
        };
        _this.rightActions = function (dragX, index) {
            react_1["default"].createElement(react_native_1.TouchableOpacity, null,
                react_1["default"].createElement(react_native_1.Animated.View, null,
                    react_1["default"].createElement(react_native_1.Animated.Text, null, "Delete")));
        };
        _this.state = {
            newItem: ""
        };
        return _this;
    }
    ItemListModal.prototype.render = function () {
        var _this = this;
        var list = this.props.list;
        var itemCount = list.items.length;
        var completedCount = list.items.filter(function (item) { return item.completed; }).length;
        return (react_1["default"].createElement(react_native_1.KeyboardAvoidingView, { style: { flex: 1 }, keyboardVerticalOffset: react_native_1.Platform.OS === "ios" ? 0 : 500, behavior: react_native_1.Platform.OS === "ios" ? "padding" : null },
            react_1["default"].createElement(react_native_1.SafeAreaView, { style: styles.container },
                react_1["default"].createElement(react_native_1.View, { style: [styles.section, styles.header] },
                    react_1["default"].createElement(react_native_1.View, { style: { paddingBottom: 4, borderBottomWidth: 4, borderBottomColor: list.color } },
                        react_1["default"].createElement(react_native_1.View, { style: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" } },
                            react_1["default"].createElement(react_native_1.View, { style: {
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between"
                                } },
                                react_1["default"].createElement(react_native_1.Text, { style: [styles.title, { color: list.color }] }, list.name),
                                react_1["default"].createElement(react_native_1.TouchableOpacity, { onPress: function () { return _this.alertDeleteList(list); } },
                                    react_1["default"].createElement(vector_icons_1.FontAwesome, { name: "trash", color: Colors_1["default"].tintColor, size: 24 }))),
                            react_1["default"].createElement(react_native_1.TouchableOpacity, { onPress: this.props.closeModal },
                                react_1["default"].createElement(react_native_1.Text, { style: [
                                        styles.closeModalText,
                                        {
                                            borderColor: list.color
                                        },
                                    ] }, "Close"))),
                        react_1["default"].createElement(react_native_1.Text, { style: styles.itemCount },
                            completedCount,
                            " of ",
                            itemCount,
                            " completed"))),
                react_1["default"].createElement(react_native_1.View, { style: [styles.section, { flex: 3 }] },
                    react_1["default"].createElement(react_native_1.FlatList, { data: list.items, keyExtractor: function (item) { return item.title; }, renderItem: function (_a) {
                            var item = _a.item, index = _a.index;
                            return _this.renderItem(item, index);
                        }, contentContainerStyle: { paddingHorizontal: 32, paddingVertical: 32 }, showsVerticalScrollIndicator: false, keyboardShouldPersistTaps: "always" })),
                react_1["default"].createElement(react_native_1.View, { style: [styles.section, styles.footer] },
                    react_1["default"].createElement(react_native_1.TextInput, { style: [styles.input, { borderColor: list.color }], onChangeText: function (text) { return _this.setState({ newItem: text }); }, value: this.state.newItem, placeholder: "Add an item" }),
                    react_1["default"].createElement(react_native_1.TouchableOpacity, { style: [styles.addItem, { backgroundColor: list.color }], onPress: function () { return _this.addItem(); } },
                        react_1["default"].createElement(vector_icons_1.AntDesign, { name: "plus", size: 16, color: "white" }))))));
    };
    return ItemListModal;
}(react_1.Component));
exports["default"] = ItemListModal;
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },
    section: {
        flex: 1
    },
    header: {
        justifyContent: "center",
        marginLeft: 40,
        marginRight: 40
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginRight: 12
    },
    itemCount: {
        marginTop: 4,
        marginBottom: 4,
        color: "#ccc",
        fontWeight: "bold"
    },
    closeModalText: {
        fontSize: 14,
        fontWeight: "bold",
        alignSelf: "center",
        textAlign: "center",
        textAlignVertical: "center",
        padding: 4,
        borderWidth: 4,
        borderRadius: 16
    },
    buttonText: {
        fontSize: 12,
        paddingHorizontal: 2,
        color: "white",
        alignSelf: "center"
    },
    button: {
        backgroundColor: Colors_1["default"].tintColor,
        borderColor: Colors_1["default"].lightTintColor,
        borderWidth: 1,
        borderRadius: 8,
        padding: 8,
        marginVertical: 2,
        marginHorizontal: 2,
        alignSelf: "stretch",
        justifyContent: "center"
    },
    footer: {
        paddingHorizontal: 32,
        flexDirection: "row",
        alignItems: "center"
    },
    input: {
        flex: 1,
        height: 48,
        borderWidth: react_native_1.StyleSheet.hairlineWidth,
        borderRadius: 6,
        marginRight: 8,
        paddingHorizontal: 8
    },
    addItem: {
        borderRadius: 4,
        padding: 16,
        alignItems: "center",
        justifyContent: "center"
    },
    itemContainer: {
        paddingVertical: 16,
        flexDirection: "row",
        alignItems: "center",
        width: 200
    },
    item: {
        color: "black",
        fontWeight: "bold",
        fontSize: 16
    }
});
