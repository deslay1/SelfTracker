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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_navigation_drawer_1 = require("react-navigation-drawer");
//import { FontAwesome } from "@expo/vector-icons";
var Colors_1 = require("../constants/Colors");
var expo_constants_1 = require("expo-constants");
var Fire_1 = require("../Fire");
var Sidebar = /** @class */ (function (_super) {
    __extends(Sidebar, _super);
    function Sidebar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            user: {},
            loading: false
        };
        _this.userMount = function () { return null; };
        return _this;
    }
    Sidebar.prototype.componentDidMount = function () {
        var _this = this;
        // @ts-ignore
        var user = this.props.uid || Fire_1["default"].uid;
        // @ts-ignore
        this.userMount = Fire_1["default"].firestore
            .collection("users")
            .doc(user)
            .onSnapshot(function (doc) {
            _this.setState({ user: doc.data(), loading: true });
        }, function (error) {
            // @ts-ignore
            alert(error.message);
        });
    };
    Sidebar.prototype.componentWillUnmount = function () {
        Fire_1["default"].detach();
        this.userMount();
    };
    Sidebar.prototype.render = function () {
        return (react_1["default"].createElement(react_native_1.ScrollView, { style: styles.container },
            react_1["default"].createElement(react_native_1.ImageBackground, { source: require("../assets/images/sidebar2.jpg"), style: styles.imageBackground },
                react_1["default"].createElement(react_native_1.View, { style: styles.sidebarItems },
                    react_1["default"].createElement(react_native_1.View, { style: { alignItems: "center" } },
                        react_1["default"].createElement(react_native_1.Image, { source: 
                            // @ts-ignore
                            this.state.user.image ? { uri: this.state.user.image } : require("../assets/images/catprofile.jpg"), style: styles.image }),
                        react_1["default"].createElement(react_native_1.Text, { style: styles.name }, this.state.user.username)),
                    react_1["default"].createElement(react_native_1.View, { style: styles.sidebarRight },
                        react_1["default"].createElement(react_native_1.TouchableHighlight, { style: styles.button, onPress: Fire_1["default"].signOut, underlayColor: Colors_1["default"].underlayColor },
                            react_1["default"].createElement(react_native_1.Text, { style: styles.buttonText }, "Log Out"))))),
            react_1["default"].createElement(react_native_1.View, { style: styles.container },
                react_1["default"].createElement(react_navigation_drawer_1.DrawerNavigatorItems, __assign({}, this.props)))));
    };
    return Sidebar;
}(react_1.Component));
exports["default"] = Sidebar;
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1
    },
    sidebarItems: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: "3%",
        paddingTop: expo_constants_1["default"].statusBarHeight
    },
    sidebarRight: {
        justifyContent: "flex-end"
    },
    imageBackground: {
        padding: 16
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: "#FFF"
    },
    name: {
        color: "#FFF",
        fontSize: 20,
        fontWeight: "bold",
        marginVertical: 4
    },
    buttonText: {
        fontSize: 14,
        paddingHorizontal: 6,
        color: "white",
        alignSelf: "center"
    },
    button: {
        backgroundColor: Colors_1["default"].tintColor,
        borderColor: Colors_1["default"].lightTintColor,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginVertical: 2,
        marginHorizontal: 4,
        alignSelf: "stretch",
        justifyContent: "center"
    }
});
