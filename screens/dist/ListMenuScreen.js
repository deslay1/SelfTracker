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
var expo_constants_1 = require("expo-constants");
var Fire_1 = require("../Fire");
var DrawerButton_1 = require("../components/DrawerButton");
var AddListModal_1 = require("../components/AddListModal");
var ItemList_1 = require("../components/ItemList");
var vector_icons_1 = require("@expo/vector-icons");
var Colors_1 = require("../constants/Colors");
var ListMenuScreen = /** @class */ (function (_super) {
    __extends(ListMenuScreen, _super);
    function ListMenuScreen() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            addItemVisible: false,
            lists: [],
            user: {},
            loading: true,
            userLoading: true
        };
        // @ts-ignore
        _this.unMount = function () { return null; };
        _this.renderList = function (list) {
            // @ts-ignore
            return react_1["default"].createElement(ItemList_1["default"], { list: list, updateList: _this.updateList, deleteList: _this.deleteList });
        };
        _this.addList = function (list) {
            Fire_1["default"].addList({
                name: list.name,
                color: list.color,
                items: []
            });
        };
        _this.updateList = function (list) {
            Fire_1["default"].updateList(list);
        };
        _this.deleteList = function (list) {
            Fire_1["default"].deleteList(list);
        };
        return _this;
    }
    ListMenuScreen.prototype.componentDidMount = function () {
        var _this = this;
        var user = this.props.uid || Fire_1["default"].uid;
        // @ts-ignore
        Fire_1["default"].getLists(function (lists) {
            _this.setState({ lists: lists, user: user }, function () {
                _this.setState({ loading: false });
            });
            _this.getUsername(user);
        });
    };
    ListMenuScreen.prototype.getUsername = function (user) {
        var _this = this;
        //const user = this.props.uid || Fire.shared.uid;
        // @ts-ignore
        this.unMount = Fire_1["default"].firestore
            .collection("users")
            .doc(user)
            .onSnapshot(function (doc) {
            var user = doc.data();
            _this.setState({ user: user, userLoading: false });
        }, function (error) {
            // @ts-ignore
            alert(error.message);
        });
        // @ts-ignore
        var username = this.state.user.username;
        return username;
    };
    ListMenuScreen.prototype.componentWillUnmount = function () {
        Fire_1["default"].detach();
        // @ts-ignore
        this.unMount();
    };
    ListMenuScreen.prototype.toggleAddItemModal = function () {
        this.setState({ addItemVisible: !this.state.addItemVisible });
    };
    ListMenuScreen.prototype.render = function () {
        var _this = this;
        return (react_1["default"].createElement(react_native_1.View, { style: styles.container },
            react_1["default"].createElement(react_native_1.Modal, { animationType: "slide", visible: this.state.addItemVisible, onRequestClose: function () { return _this.toggleAddItemModal(); } },
                react_1["default"].createElement(AddListModal_1["default"], { closeModal: function () { return _this.toggleAddItemModal(); }, addList: this.addList })),
            react_1["default"].createElement(react_native_1.View, { style: styles.header },
                react_1["default"].createElement(react_native_1.Text, { style: styles.headerTitle },
                    this.props.navigation.title,
                    "My Lists"),
                react_1["default"].createElement(DrawerButton_1["default"], { navigation: this.props.navigation, screen: "MENU", unMount: this.unMount() })),
            react_1["default"].createElement(react_native_1.View, { style: styles.content },
                this.state.loading ? (react_1["default"].createElement(react_native_1.ActivityIndicator, null)) : (
                // @ts-ignore
                react_1["default"].createElement(react_native_1.Text, { style: { fontWeight: "bold" } },
                    this.state.user.username,
                    "'s : ")),
                react_1["default"].createElement(react_native_1.View, { style: styles.contentHeader },
                    react_1["default"].createElement(react_native_1.View, { style: styles.divider }),
                    react_1["default"].createElement(react_native_1.Text, { style: styles.contentTitle },
                        "Tasks & ",
                        react_1["default"].createElement(react_native_1.Text, { style: { color: Colors_1["default"].tintColor } }, "Todos")),
                    react_1["default"].createElement(react_native_1.View, { style: styles.divider })),
                react_1["default"].createElement(react_native_1.View, { style: { marginVertical: 16 } },
                    react_1["default"].createElement(react_native_1.TouchableOpacity, { style: styles.addList, onPress: function () { return _this.toggleAddItemModal(); } },
                        react_1["default"].createElement(vector_icons_1.AntDesign, { name: "plus", size: 16, color: Colors_1["default"].tintColor })),
                    react_1["default"].createElement(react_native_1.Text, { style: styles.add }, "Add a list")),
                react_1["default"].createElement(react_native_1.View, { style: styles.flatList },
                    react_1["default"].createElement(react_native_1.FlatList, { data: this.state.lists, keyExtractor: function (item) { return item.id.toString(); }, 
                        //horizontal={true}
                        //showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator: false, renderItem: function (_a) {
                            var item = _a.item;
                            return _this.renderList(item);
                        }, keyboardDismissMode: "none", keyboardShouldPersistTaps: "always" })))));
    };
    return ListMenuScreen;
}(react_1.Component));
exports["default"] = ListMenuScreen;
// @ts-ignore
ListMenuScreen.navigationOptions = {
    headerShown: false
};
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: "8%",
        paddingTop: 1 * expo_constants_1["default"].statusBarHeight,
        paddingBottom: 0.5 * expo_constants_1["default"].statusBarHeight,
        backgroundColor: "#FFF",
        borderBottomWidth: 2,
        borderBottomColor: "#EBECF4",
        shadowColor: "#454D65",
        shadowOffset: { width: 2, height: 10 },
        shadowRadius: 8,
        shadowOpacity: 0.6,
        elevation: 10,
        zIndex: 2
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: "bold"
    },
    content: {
        marginTop: 16,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },
    contentHeader: {
        flexDirection: "row"
    },
    divider: {
        backgroundColor: Colors_1["default"].lightTextColor,
        height: 1,
        flex: 1,
        alignSelf: "center"
    },
    contentTitle: {
        fontSize: 30,
        fontWeight: "bold",
        color: Colors_1["default"].lightTextColor,
        paddingHorizontal: 32
    },
    flatList: { height: 360 },
    addList: {
        borderWidth: 2,
        borderColor: Colors_1["default"].lightTintColor,
        borderRadius: 8,
        paddingVertical: 6,
        alignItems: "center",
        marginHorizontal: "3%"
    },
    add: {
        fontWeight: "bold",
        color: Colors_1["default"].tintColor,
        fontSize: 14,
        marginTop: 2
    }
});
