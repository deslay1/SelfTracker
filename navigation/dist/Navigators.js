"use strict";
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
// Navigators
var react_navigation_1 = require("react-navigation");
var react_navigation_stack_1 = require("react-navigation-stack");
var react_navigation_tabs_1 = require("react-navigation-tabs");
var react_navigation_drawer_1 = require("react-navigation-drawer");
// Screens
var ListMenuScreen_1 = require("../screens/ListMenuScreen");
var MoodTrackerScreen_1 = require("../screens/MoodTrackerScreen");
var MoodStatisticsScreen_1 = require("../screens/MoodStatisticsScreen");
var LoginScreen_1 = require("../screens/LoginScreen");
var RegisterScreen_1 = require("../screens/RegisterScreen");
var LoadingScreen_1 = require("../screens/LoadingScreen");
var TabIcon_1 = require("../components/TabIcon");
var SideBar_1 = require("../components/SideBar");
var Colors_1 = require("../constants/Colors");
var vector_icons_1 = require("@expo/vector-icons");
//screens within main tab screen
var MenuStack = react_navigation_stack_1.createStackNavigator({
    ListMenu: ListMenuScreen_1["default"]
}, {
    initialRouteName: "ListMenu",
    navigationOptions: {
        tabBarLabel: "Tasks & Todos",
        tabBarIcon: function (_a) {
            var focused = _a.focused;
            return react_1["default"].createElement(TabIcon_1["default"], { focused: focused, name: "book" });
        }
    }
});
var MoodStack = react_navigation_stack_1.createStackNavigator({
    MoodTracker: MoodTrackerScreen_1["default"]
}, {
    navigationOptions: {
        tabBarLabel: "Mood Tracker",
        tabBarIcon: function (_a) {
            var focused = _a.focused;
            return react_1["default"].createElement(TabIcon_1["default"], { focused: focused, name: "eye" });
        }
    }
});
var TabNavigator = react_navigation_tabs_1.createBottomTabNavigator({
    MenuStack: MenuStack,
    MoodStack: MoodStack
}, {
    initialRouteName: "MenuStack",
    tabBarOptions: {
        activeTintColor: "#000",
        style: { height: 50 }
    }
});
var MoodStatisticsStack = react_navigation_stack_1.createStackNavigator({
    MoodStats: MoodStatisticsScreen_1["default"]
});
var Drawernavigator = react_navigation_drawer_1.createDrawerNavigator({
    TabNavigator: {
        screen: TabNavigator,
        navigationOptions: {
            title: "Home",
            drawerIcon: function (_a) {
                var tintColor = _a.tintColor;
                return react_1["default"].createElement(vector_icons_1.Feather, { name: "home", size: 20, color: tintColor });
            }
        }
    },
    TemporaryStack: {
        screen: MoodStatisticsStack,
        navigationOptions: {
            title: "Mood Statistics",
            drawerIcon: function (_a) {
                var tintColor = _a.tintColor;
                return react_1["default"].createElement(vector_icons_1.Feather, { name: "user", size: 20, color: tintColor });
            }
        }
    }
}, {
    initialRouteName: "TabNavigator",
    /*     initialRouteParams: {
      title: "Home",
    }, */
    //drawerType: "slide",
    // @ts-ignore
    contentComponent: function (props) { return react_1["default"].createElement(SideBar_1["default"], __assign({}, props, { navigation: props.navigation })); },
    drawerWidth: react_native_1.Dimensions.get("window").width * 0.85,
    hideStatusBar: true,
    contentOptions: {
        activeBackgroundColor: Colors_1["default"].lightTintColor,
        activeTintColor: Colors_1["default"].tintColor,
        itemsContainerStyle: {
            marginTop: 16,
            marginHorizontal: 10
        },
        itemStyle: {
            borderRadius: 8
        }
    }
});
var AuthStack = react_navigation_stack_1.createStackNavigator({
    Login: LoginScreen_1["default"],
    Register: RegisterScreen_1["default"]
}, {
    initialRouteName: "Login"
});
exports["default"] = react_navigation_1.createAppContainer(react_navigation_1.createSwitchNavigator({
    Main: Drawernavigator,
    Auth: AuthStack,
    Loading: LoadingScreen_1["default"]
}, {
    initialRouteName: "Loading"
}));
