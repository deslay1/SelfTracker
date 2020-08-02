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
var react_native_elements_1 = require("react-native-elements");
var expo_constants_1 = require("expo-constants");
var Fire_1 = require("../Fire");
var Colors_1 = require("../constants/Colors");
var LoginScreen = /** @class */ (function (_super) {
    __extends(LoginScreen, _super);
    function LoginScreen() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            email: "",
            password: "",
            errorMessage: null,
            isLoading: false
        };
        _this.login = function () {
            _this.setState({ isLoading: true });
            var _a = _this.state, email = _a.email, password = _a.password;
            Fire_1["default"].loginUser(email, password);
            _this.setState({ isLoading: false });
        };
        return _this;
    }
    LoginScreen.prototype.componentDidMount = function () { };
    LoginScreen.prototype.render = function () {
        var _this = this;
        return (react_1["default"].createElement(react_native_1.ScrollView, { contentContainerStyle: styles.container },
            react_1["default"].createElement(react_native_1.View, { style: { marginTop: 70, marginBottom: 30 } },
                react_1["default"].createElement(react_native_1.Text, { style: styles.headerText }, "SelfTracker")),
            react_1["default"].createElement(react_native_1.View, { style: styles.formContainer },
                react_1["default"].createElement(react_native_elements_1.Input, { label: "Email", onChangeText: function (email) { return _this.setState({ email: email }); }, keyboardType: "email-address", autoCapitalize: "none" }),
                react_1["default"].createElement(react_native_elements_1.Input, { label: "Password", onChangeText: function (password) { return _this.setState({ password: password }); }, secureTextEntry: true, autoCapitalize: "none" })),
            react_1["default"].createElement(react_native_1.View, { style: styles.buttonContainer },
                react_1["default"].createElement(react_native_1.TouchableHighlight, { style: styles.button, onPress: this.login, underlayColor: Colors_1["default"].underlayColor }, this.state.isLoading ? react_1["default"].createElement(react_native_1.ActivityIndicator, null) : react_1["default"].createElement(react_native_1.Text, { style: styles.buttonText }, "Log In")),
                react_1["default"].createElement(react_native_1.TouchableHighlight, { style: styles.button, onPress: function () { return _this.props.navigation.navigate("Register"); }, underlayColor: Colors_1["default"].underlayColor },
                    react_1["default"].createElement(react_native_1.Text, { style: styles.buttonText }, "Register")))));
    };
    LoginScreen.navigationOptions = {
        headerShown: false
    };
    return LoginScreen;
}(react_1.Component));
exports["default"] = LoginScreen;
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        marginTop: expo_constants_1["default"].statusBarHeight
    },
    headerText: {
        fontSize: 32,
        fontFamily: "sans-serif",
        fontWeight: "500"
    },
    formContainer: {
        justifyContent: "center",
        marginTop: 32,
        marginHorizontal: 30,
        width: 300
    },
    buttonContainer: {
        justifyContent: "center",
        alignItems: "center",
        width: "90%"
    },
    buttonText: {
        fontSize: 18,
        color: "white",
        alignSelf: "center"
    },
    button: {
        height: 42,
        backgroundColor: Colors_1["default"].tintColor,
        borderColor: Colors_1["default"].tintColor,
        borderWidth: 1,
        borderRadius: 8,
        marginTop: 30,
        marginHorizontal: 30,
        marginBottom: -15,
        alignSelf: "stretch",
        justifyContent: "center"
    }
});
