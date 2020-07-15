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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_elements_1 = require("react-native-elements");
var vector_icons_1 = require("@expo/vector-icons");
var expo_constants_1 = require("expo-constants");
var Fire_1 = require("../Fire");
var UserPermissions_1 = require("../utils/UserPermissions");
var ImagePicker = require("expo-image-picker");
var Colors_1 = require("../constants/Colors");
var RegisterScreen = /** @class */ (function (_super) {
    __extends(RegisterScreen, _super);
    function RegisterScreen() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            user: {
                username: "",
                email: "",
                password: "",
                image: null
            },
            confirmPassword: "",
            errorMessage: null,
            isLoading: false
        };
        _this.signUp = function () {
            _this.setState({ isLoading: true });
            var user = _this.state.user;
            if (user.password.length < 6) {
                // @ts-ignore
                alert("Password must be 6 characters long");
            }
            else {
                if (user.password === _this.state.confirmPassword) {
                    Fire_1["default"].createUser(user);
                }
                else {
                    // @ts-ignore
                    alert("Passwords do not match");
                }
            }
            _this.setState({ isLoading: false });
        };
        _this.pickImage = function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        UserPermissions_1["default"].getCameraPermission();
                        return [4 /*yield*/, ImagePicker.launchImageLibraryAsync({
                                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                                allowsEditing: true,
                                aspect: [4, 3]
                            })];
                    case 1:
                        result = _a.sent();
                        if (!result.cancelled) {
                            this.setState({ user: __assign(__assign({}, this.state.user), { image: result.uri }) });
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    RegisterScreen.prototype.render = function () {
        var _this = this;
        return (
        // Avoiding the keyboard does not work for me...
        react_1["default"].createElement(react_native_1.ScrollView, { contentContainerStyle: styles.container },
            react_1["default"].createElement(react_native_1.View, null,
                react_1["default"].createElement(react_native_1.TouchableOpacity, { style: styles.back, onPress: function () { return _this.props.navigation.goBack(); } },
                    react_1["default"].createElement(vector_icons_1.AntDesign, { name: "arrowleft", size: 32, color: "#FFF" })),
                react_1["default"].createElement(react_native_1.TouchableOpacity, { style: styles.imagePlaceHolder, onPress: this.pickImage }, this.state.user.image ? (
                // @ts-ignore
                react_1["default"].createElement(react_native_1.Image, { source: { uri: this.state.user.image }, style: styles.image })) : (react_1["default"].createElement(vector_icons_1.AntDesign, { name: "adduser", size: 32, color: "#038887", style: { marginTop: 10, marginLeft: 2 } })))),
            react_1["default"].createElement(react_native_1.View, { style: styles.formContainer },
                react_1["default"].createElement(react_native_elements_1.Input, { label: "Username", labelStyle: { fontSize: 12 }, onChangeText: function (username) { return _this.setState({ user: __assign(__assign({}, _this.state.user), { username: username }) }); } }),
                react_1["default"].createElement(react_native_elements_1.Input, { label: "Email", labelStyle: { fontSize: 12 }, onChangeText: function (email) { return _this.setState({ user: __assign(__assign({}, _this.state.user), { email: email }) }); }, keyboardType: "email-address", autoCapitalize: "none" }),
                react_1["default"].createElement(react_native_elements_1.Input, { label: "Password", labelStyle: { fontSize: 12 }, onChangeText: function (password) { return _this.setState({ user: __assign(__assign({}, _this.state.user), { password: password }) }); }, secureTextEntry: true, autoCapitalize: "none" }),
                react_1["default"].createElement(react_native_elements_1.Input, { label: "Confirm Password", labelStyle: { fontSize: 12 }, onChangeText: function (confirmPassword) { return _this.setState({ confirmPassword: confirmPassword }); }, secureTextEntry: true, autoCapitalize: "none" })),
            react_1["default"].createElement(react_native_1.View, { style: styles.buttonContainer },
                react_1["default"].createElement(react_native_1.TouchableHighlight, { style: styles.button, onPress: this.signUp, underlayColor: Colors_1["default"].underlayColor }, this.state.isLoading ? react_1["default"].createElement(react_native_1.ActivityIndicator, null) : react_1["default"].createElement(react_native_1.Text, { style: styles.buttonText }, "Sign Up")))));
    };
    RegisterScreen.navigationOptions = {
        headerShown: false
    };
    return RegisterScreen;
}(react_1.Component));
exports["default"] = RegisterScreen;
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        marginTop: expo_constants_1["default"].statusBarHeight * 1.5
    },
    back: {
        marginLeft: "10%",
        marginRight: "78%",
        borderRadius: 32,
        backgroundColor: Colors_1["default"].underlayColor,
        alignItems: "center",
        justifyContent: "center",
        padding: 4,
        paddingTop: 6
    },
    formContainer: {
        alignItems: "center",
        marginTop: 32,
        marginHorizontal: "10%",
        height: 300
    },
    buttonContainer: {
        alignSelf: "center",
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
    },
    imagePlaceHolder: {
        alignSelf: "center",
        width: 100,
        height: 100,
        backgroundColor: "#E1E2E6",
        borderRadius: 48,
        marginTop: 12,
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        position: "absolute",
        height: 100,
        width: 100,
        borderRadius: 48
    }
});
