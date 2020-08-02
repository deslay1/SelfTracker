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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var Colors_1 = require("../constants/Colors");
var vector_icons_1 = require("@expo/vector-icons");
var expo_constants_1 = require("expo-constants");
var DrawerButton_1 = require("../components/DrawerButton");
var firebase_1 = require("firebase");
var Fire_1 = require("../Fire");
var moment_1 = require("moment");
// import Notifications from "../Notifications";
// import * as Noty from "expo-notifications";
var AddMoodModal_1 = require("../components/AddMoodModal");
var monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
var MoodTrackerScreen = /** @class */ (function (_super) {
    __extends(MoodTrackerScreen, _super);
    function MoodTrackerScreen() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            allMoods: [],
            date: new Date(),
            days: [],
            smallestMillis: 0,
            largestMillis: 0,
            month: "",
            modalVisible: false,
            activeDay: -1,
            monthID: -1,
            monthIndex: -1,
            year: "",
            today: 0,
            todayMillis: 0,
            expoPushToken: -1
        };
        _this.getDays = function (date) {
            var allMoods = _this.state.allMoods;
            var lowerLimit = moment_1["default"](date).startOf("month").valueOf();
            var upperLimit = moment_1["default"](date).endOf("month").valueOf();
            var moods = allMoods.filter(function (e) { return e.day < upperLimit && e.day >= lowerLimit; });
            //console.log(moods);
            var monthDate = firebase_1["default"].firestore.Timestamp.fromMillis(date).toDate();
            var month = monthDate.getMonth();
            var year = monthDate.getFullYear();
            var daysInMonth = moment_1["default"](date).daysInMonth();
            // @ts-ignore
            var days = __spreadArrays(Array(daysInMonth).keys()).map(function (e, i) {
                var day = moment_1["default"]().format(Number(year) + " " + Number(month + 1) + " " + Number(i + 1));
                var dayDate = moment_1["default"](day, "YYYY MM DD");
                var timestampProper = new firebase_1["default"].firestore.Timestamp(dayDate.unix(), 0).toDate();
                var millis = firebase_1["default"].firestore.Timestamp.fromDate(timestampProper).toMillis();
                var el = {
                    id: i + 1,
                    value: i + 1,
                    color: Colors_1["default"].lightTintColor,
                    moodID: 0,
                    millis: millis
                };
                return el;
            });
            moods.map(function (e) {
                var moodTimestamp = firebase_1["default"].firestore.Timestamp.fromMillis(e.day).toDate();
                var moodDay = moodTimestamp.getDate();
                days.splice(moodDay - 1, 1, {
                    id: moodDay,
                    value: e.text,
                    color: e.color,
                    moodID: e.id,
                    millis: e.day
                });
            });
            var today = Number(moment_1["default"]().format("D"));
            _this.setState({ days: days, month: monthNames[month], monthIndex: month, year: year, today: today });
        };
        _this.changeToPreviousMonth = function () {
            var index = _this.state.monthIndex;
            var date = _this.state.date;
            date.setMonth(date.getMonth() - 1);
            _this.getDays(date);
            if (index > 0) {
                _this.setState({ month: monthNames[index - 1], monthIndex: index - 1, date: date });
            }
            else {
                _this.setState({ month: monthNames[11], monthIndex: 11, date: date });
            }
        };
        _this.changeToNextMonth = function () {
            var index = _this.state.monthIndex;
            var date = _this.state.date;
            date.setMonth(date.getMonth() + 1);
            _this.getDays(date);
            if (index < 11) {
                _this.setState({ month: monthNames[index + 1], monthIndex: index + 1, date: date });
            }
            else {
                _this.setState({ month: monthNames[0], monthIndex: 0, date: date });
            }
        };
        _this.renderDay = function (item, index) {
            return (react_1["default"].createElement(react_native_1.View, null,
                react_1["default"].createElement(react_native_1.StatusBar, null),
                react_1["default"].createElement(react_native_1.View, { style: [
                        styles.dayContainer,
                        { backgroundColor: _this.state.today === index + 1 ? Colors_1["default"].lightActiveColor : "white" },
                    ] },
                    react_1["default"].createElement(react_native_1.Text, { style: { fontSize: 12, paddingBottom: 1 } },
                        "Day ",
                        item.id),
                    react_1["default"].createElement(react_native_1.TouchableOpacity, { style: [
                            styles.dayItem,
                            {
                                backgroundColor: item.color
                            },
                        ], onPress: function () {
                            if ((item.millis && item.millis <= _this.state.largestMillis && item.millis >= _this.state.smallestMillis) ||
                                item.id === moment_1["default"](_this.state.todayMillis).toDate().getDate()) {
                                _this.setState({ activeDay: index });
                                _this.toggleAddMood();
                            }
                            else {
                                console.log(moment_1["default"](item.millis).toDate().getDate());
                                console.log(moment_1["default"](_this.state.todayMillis).toDate().getDate());
                                console.log("Can't update this day. Out of range.");
                            }
                        } }))));
        };
        return _this;
    }
    MoodTrackerScreen.prototype.componentDidMount = function () {
        var _this = this;
        // @ts-ignore
        Fire_1["default"].getMoods(function (allMoods) {
            //const date = new Date();
            var date = _this.state.date;
            var now = firebase_1["default"].firestore.Timestamp.fromDate(date).toMillis();
            _this.setState({
                allMoods: allMoods,
                date: date,
                todayMillis: now,
                smallestMillis: Math.min.apply(Math, allMoods.map(function (e) { return e.day; })),
                largestMillis: Math.max.apply(Math, allMoods.map(function (e) { return e.day; }))
            });
            _this.getDays(now);
            /*       Notifications.registerForPushNotificationsAsync().then((token) => {
              Notifications.sendPushNotification(token);
              this.setState({ expoPushToken: token });
            }); */
        });
        // Doesn't work.......
        //Noty.addNotificationResponseReceivedListener(this._handleNotificationResponse);
    };
    /*  _handleNotification = (notification) => {
      console.log(notification);
      // this.setState({ notification: notification });
    }; */
    MoodTrackerScreen.prototype.componentWillUnmount = function () {
        Fire_1["default"].detachMood();
    };
    MoodTrackerScreen.prototype.toggleAddMood = function () {
        this.setState({ modalVisible: !this.state.modalVisible });
    };
    MoodTrackerScreen.prototype.addMood = function (moodColor, moodText) {
        var days = this.state.days;
        var index = this.state.activeDay;
        var mood = days[index];
        mood.color = moodColor;
        mood.value = moodText;
        days[index] = mood;
        if (mood.moodID !== 0) {
            var toUpdate = { color: moodColor, text: moodText };
            Fire_1["default"].updateMood(toUpdate, mood.moodID);
        }
        else {
            var toAdd = { color: moodColor, text: mood.value, day: mood.millis };
            //Fire.shared.addMood(toAdd, this.state.monthID);
            Fire_1["default"].addMood(toAdd);
        }
        this.setState({ days: days, modalVisible: !this.state.modalVisible });
    };
    MoodTrackerScreen.prototype.render = function () {
        var _this = this;
        return (react_1["default"].createElement(react_native_1.View, { style: styles.container },
            react_1["default"].createElement(react_native_1.ImageBackground, { source: require("../assets/images/header.jpg"), style: styles.headerImage },
                react_1["default"].createElement(react_native_1.View, { style: styles.headerContainer },
                    react_1["default"].createElement(react_native_1.TouchableOpacity, { style: { paddingHorizontal: "1%" }, onPress: function () { return _this.changeToPreviousMonth(); } },
                        react_1["default"].createElement(vector_icons_1.Entypo, { name: "arrow-with-circle-left", size: 30 })),
                    react_1["default"].createElement(react_native_1.Text, { style: styles.header },
                        this.state.month + " " + this.state.year,
                        " "),
                    react_1["default"].createElement(react_native_1.TouchableOpacity, { style: { paddingHorizontal: "1%" }, onPress: function () { return _this.changeToNextMonth(); } },
                        react_1["default"].createElement(vector_icons_1.Entypo, { name: "arrow-with-circle-right", size: 30 })),
                    react_1["default"].createElement(DrawerButton_1["default"], { navigation: this.props.navigation }))),
            react_1["default"].createElement(react_native_1.View, { style: styles.contentContainer },
                react_1["default"].createElement(react_native_1.Modal, { animationType: "slide", visible: this.state.modalVisible, onRequestClose: function () { return _this.toggleAddMood(); } },
                    react_1["default"].createElement(AddMoodModal_1["default"], { closeModal: function () { return _this.toggleAddMood(); }, addMood: function (moodColor, moodText) { return _this.addMood(moodColor, moodText); }, day: this.state.days[this.state.activeDay] })),
                react_1["default"].createElement(react_native_1.FlatList, { data: this.state.days, keyExtractor: function (day) { return day.millis; }, numColumns: 3, renderItem: function (_a) {
                        var item = _a.item, index = _a.index;
                        return _this.renderDay(item, index);
                    }, showsVerticalScrollIndicator: false }))));
    };
    return MoodTrackerScreen;
}(react_1.Component));
exports["default"] = MoodTrackerScreen;
// @ts-ignore
MoodTrackerScreen.navigationOptions = {
    headerShown: false
};
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    headerContainer: {
        alignItems: "center",
        justifyContent: "space-evenly",
        flexDirection: "row",
        backgroundColor: Colors_1["default"].lightTintColor,
        marginHorizontal: 10,
        borderRadius: 16,
        marginTop: expo_constants_1["default"].statusBarHeight,
        marginBottom: 0.5 * expo_constants_1["default"].statusBarHeight,
        padding: 10
    },
    header: {
        fontSize: 20,
        fontFamily: react_native_1.Platform.OS === "android" ? "Roboto" : "Avenir",
        fontWeight: "bold",
        textShadowOffset: { width: 4, height: 10 },
        textTransform: "capitalize"
    },
    headerImage: {
        color: Colors_1["default"].lightTintColor,
        justifyContent: "center"
    },
    contentContainer: {
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        borderWidth: 6,
        borderColor: Colors_1["default"].lightTintColor,
        marginBottom: 70
    },
    dayContainer: {
        margin: 4,
        padding: 4,
        borderWidth: 2,
        borderRadius: 12,
        alignItems: "center",
        width: 90
    },
    dayItem: {
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        borderWidth: 2,
        borderRadius: 32,
        width: 60,
        height: 60
    }
});
