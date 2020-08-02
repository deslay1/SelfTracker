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
var DrawerButton_1 = require("../components/DrawerButton");
var expo_constants_1 = require("expo-constants");
var Colors_1 = require("../constants/Colors");
var Fire_1 = require("../Fire");
var moods_1 = require("../utils/moods");
var TemporaryScreen = /** @class */ (function (_super) {
    __extends(TemporaryScreen, _super);
    function TemporaryScreen() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            allMoods: [],
            moods: moods_1["default"],
            loading: true,
            refreshing: false
        };
        _this.makeUnique = function (data, key) {
            return __spreadArrays(new Map(data.map(function (x) { return [key(x), x]; })).values());
        };
        _this.resetMoodCounts = function () {
            var moodsReset = _this.state.moods.map(function (e) {
                e.count = 0;
                return e;
            });
            _this.setState({ moods: moodsReset, isLoading: false });
        };
        _this.onRefresh = function () {
            _this.setState({ refreshing: true });
            setTimeout(function () {
                _this.setState({ refreshing: false });
            }, 2000);
        };
        _this.renderMood = function (lower, upper) {
            return _this.state.moods.slice(lower, upper).map(function (mood) {
                return (react_1["default"].createElement(react_native_1.View, { style: styles.moodBox, key: mood.id },
                    react_1["default"].createElement(react_native_1.Text, { style: styles.moodText }, mood.text),
                    react_1["default"].createElement(react_native_1.View, { style: [styles.mood, { backgroundColor: mood.color }] },
                        react_1["default"].createElement(react_native_1.View, { style: styles.moodCountBox },
                            react_1["default"].createElement(react_native_1.Text, { style: { padding: "5%" } }, mood.count))),
                    react_1["default"].createElement(react_native_1.Text, { style: styles.moodText }, Math.floor((mood.count / _this.state.allMoods.length) * 100) + " %")));
            });
        };
        return _this;
    }
    TemporaryScreen.prototype.componentDidMount = function () {
        var _this = this;
        Fire_1["default"].getMoods(function (allMoods) {
            /*       const moodTimestamp = firebase.firestore.Timestamp.fromMillis(
              allMoods.sort((a, b) => a.day - b.millis)[1].day
            ).toDate();
            const moodDay = moodTimestamp.getDate();
            console.log(moodDay); */
            // To keep from adding on to the count cause callback from firestore is always fired whenever changes are made to the database
            _this.resetMoodCounts();
            var unique = _this.makeUnique(allMoods, function (mood) { return mood.day; });
            unique.map(function (mood) {
                var stateMoods = _this.state.moods;
                var moodTypes = stateMoods.map(function (e) { return e.text; });
                var moodIndex = moodTypes.indexOf(mood.text);
                stateMoods[moodIndex].count++;
                _this.setState({ moods: stateMoods.sort(function (a, b) { return b.count - a.count; }) });
            });
            _this.setState({
                allMoods: allMoods,
                loading: false
            });
        });
    };
    TemporaryScreen.prototype.componentWillUnmount = function () {
        Fire_1["default"].detachMood();
    };
    TemporaryScreen.prototype.render = function () {
        return (react_1["default"].createElement(react_native_1.View, { style: styles.container },
            react_1["default"].createElement(react_native_1.View, { style: styles.header },
                react_1["default"].createElement(react_native_1.Text, { style: styles.headerTitle },
                    this.props.navigation.title,
                    "Mood Statistics"),
                react_1["default"].createElement(react_native_1.View, { style: { paddingLeft: "10%" } },
                    react_1["default"].createElement(DrawerButton_1["default"], { navigation: this.props.navigation }))),
            !this.state.loading && (react_1["default"].createElement(react_native_1.ScrollView, { contentContainerStyle: styles.content, refreshControl: react_1["default"].createElement(react_native_1.RefreshControl, { refreshing: this.state.refreshing, onRefresh: this.onRefresh }) },
                react_1["default"].createElement(react_native_1.View, { style: { flexDirection: "row" } }, this.renderMood(0, 3)),
                react_1["default"].createElement(react_native_1.View, { style: { flexDirection: "row" } }, this.renderMood(3, 6)),
                react_1["default"].createElement(react_native_1.View, { style: { flexDirection: "row" } }, this.renderMood(6, 9))))));
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
        backgroundColor: "#fff"
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 1 * expo_constants_1["default"].statusBarHeight,
        paddingHorizontal: "8%",
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
        marginTop: "10%",
        alignItems: "center"
    },
    moodBox: {
        alignItems: "center",
        marginHorizontal: "6%",
        borderColor: Colors_1["default"].tintColor
    },
    moodText: {
        fontSize: 12,
        textAlign: "center",
        marginVertical: 4
    },
    moodCountBox: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFF",
        paddingHorizontal: "10%",
        borderRadius: 32
    },
    mood: {
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderRadius: 32,
        height: 60,
        width: 60,
        margin: 2
    }
});
