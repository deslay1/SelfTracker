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
var Colors_1 = require("../constants/Colors");
var AddMoodModal = /** @class */ (function (_super) {
    __extends(AddMoodModal, _super);
    function AddMoodModal() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            moods: [
                { id: 1, text: "Productive", color: "#4caf50" },
                { id: 2, text: "Relaxed", color: "#2196f3" },
                { id: 3, text: "Ambitious", color: "red" },
                { id: 4, text: "Stressed", color: "#ff5722" },
                { id: 5, text: "Happy", color: "#ffeb3b" },
                { id: 6, text: "Sad", color: "purple" },
                { id: 7, text: "Bored", color: "darkgrey" },
                { id: 8, text: "Excited", color: "skyblue" },
                { id: 9, text: "Indifferent", color: "black" },
            ]
        };
        _this.addMood = function (color, text) {
            _this.props.addMood(color, text);
        };
        _this.renderMood = function (mood, index) {
            return (react_1["default"].createElement(react_native_1.View, { style: styles.moodBox, key: mood.id },
                react_1["default"].createElement(react_native_1.Text, { style: styles.moodText }, mood.text),
                react_1["default"].createElement(react_native_1.TouchableOpacity, { style: [styles.mood, { backgroundColor: mood.color }], onPress: function () { return _this.addMood(mood.color, mood.text); } })));
        };
        return _this;
    }
    AddMoodModal.prototype.render = function () {
        var _this = this;
        return (react_1["default"].createElement(react_native_1.View, { style: styles.container },
            react_1["default"].createElement(react_native_1.View, { style: styles.selectMoodContainer },
                react_1["default"].createElement(react_native_1.Text, { style: styles.selectText },
                    "Select mood for day ",
                    this.props.day.id)),
            react_1["default"].createElement(react_native_1.View, { style: styles.contentContainer },
                react_1["default"].createElement(react_native_1.FlatList, { data: this.state.moods, keyExtractor: function (mood) { return mood.id.toString(); }, renderItem: function (_a) {
                        var item = _a.item, index = _a.index;
                        return _this.renderMood(item, index);
                    }, 
                    //horizontal={true}
                    //showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator: false, numColumns: 3 })),
            react_1["default"].createElement(react_native_1.TouchableOpacity, { style: styles.button, onPress: function () { return _this.props.closeModal(); } },
                react_1["default"].createElement(react_native_1.Text, { style: styles.buttonText }, "Go back "))));
    };
    return AddMoodModal;
}(react_1.Component));
exports["default"] = AddMoodModal;
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    },
    contentContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
        height: 300
    },
    moodContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 0.7,
        borderRadius: 12,
        borderColor: Colors_1["default"].tintColor,
        width: 300
    },
    moodBox: {
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 4,
        //borderWidth: 0.7,
        //borderRadius: 12,
        borderColor: Colors_1["default"].tintColor
    },
    moodText: {
        fontSize: 12,
        textAlign: "center",
        marginVertical: 4
    },
    mood: {
        borderWidth: 1,
        borderRadius: 32,
        padding: 30,
        margin: 2
    },
    selectMoodContainer: {
        padding: 10,
        paddingHorizontal: 20,
        marginTop: 60,
        marginBottom: 40,
        borderRadius: 16
    },
    selectText: {
        fontSize: 24,
        fontWeight: "bold"
    },
    button: {
        width: 220,
        padding: 8,
        backgroundColor: Colors_1["default"].lightTintColor,
        borderWidth: 0.5,
        borderRadius: 8
    },
    buttonText: {
        textAlign: "center",
        fontSize: 14,
        paddingVertical: 8,
        paddingHorizontal: 2
    }
});
