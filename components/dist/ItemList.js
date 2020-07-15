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
var ItemListModal_1 = require("./ItemListModal");
var ItemList = /** @class */ (function (_super) {
    __extends(ItemList, _super);
    function ItemList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            showListVisible: false
        };
        _this.toggleListModal = function () {
            _this.setState({ showListVisible: !_this.state.showListVisible });
        };
        return _this;
    }
    ItemList.prototype.render = function () {
        var _this = this;
        // @ts-ignore
        var list = this.props.list;
        var completedCount = list.items.filter(function (item) { return item.completed; }).length;
        var remainingCount = list.items.length - completedCount;
        return (react_1["default"].createElement(react_native_1.View, { style: [styles.container, { backgroundColor: list.color }] },
            react_1["default"].createElement(react_native_1.Modal, { animationType: "slide", visible: this.state.showListVisible, onRequestClose: function () { return _this.toggleListModal(); } },
                react_1["default"].createElement(ItemListModal_1["default"]
                // @ts-ignore
                , { 
                    // @ts-ignore
                    list: list, closeModal: function () { return _this.toggleListModal(); }, 
                    // @ts-ignore
                    updateList: this.props.updateList, 
                    // @ts-ignore
                    deleteList: this.props.deleteList })),
            react_1["default"].createElement(react_native_1.TouchableOpacity, { style: styles.listContainer, onPress: function () { return _this.toggleListModal(); } },
                react_1["default"].createElement(react_native_1.Text, { style: styles.listTitle, numberOfLines: 1 }, list.name),
                react_1["default"].createElement(react_native_1.View, { style: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" } },
                    react_1["default"].createElement(react_native_1.View, { style: { alignItems: "center", flexDirection: "row" } },
                        react_1["default"].createElement(react_native_1.Text, { style: styles.count }, remainingCount),
                        react_1["default"].createElement(react_native_1.Text, { style: styles.subtitle }, "Remaining")),
                    react_1["default"].createElement(react_native_1.View, { style: { alignItems: "center", flexDirection: "row" } },
                        react_1["default"].createElement(react_native_1.Text, { style: styles.count }, completedCount),
                        react_1["default"].createElement(react_native_1.Text, { style: styles.subtitle }, "Completed"))))));
    };
    return ItemList;
}(react_1.Component));
exports["default"] = ItemList;
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1,
        width: 300,
        paddingHorizontal: 20,
        marginVertical: 2,
        borderRadius: 12
    },
    listContainer: {
        paddingVertical: 8,
        alignItems: "baseline"
    },
    listTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 10
    },
    count: {
        fontSize: 16,
        color: "#fff",
        paddingRight: 6
    },
    subtitle: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
        paddingRight: 12
    }
});
