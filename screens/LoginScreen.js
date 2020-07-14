import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableHighlight, ActivityIndicator, ScrollView, Image } from "react-native";
import { Input } from "react-native-elements";
import Constants from "expo-constants";

import * as firebase from "firebase";
import Fire from "../Fire";

import Colors from "../constants/Colors";

export default class LoginScreen extends Component {
  static navigationOptions = {
    headerShown: false,
  };
  state = {
    email: "",
    password: "",
    errorMessage: null,
    isLoading: false,
  };
  login = () => {
    this.setState({ isLoading: true });
    const { email, password } = this.state;
    Fire.shared.loginUser(email, password);
    this.setState({ isLoading: false });
  };
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={{ marginTop: 70 }}>
          {/* <Image source={require("../assets/images/appLogo.png")} style={{ width: 200, height: 100 }} /> */}
        </View>
        <ActivityIndicator animating={this.state.isLoading} />
        <View style={styles.formContainer}>
          <Input
            label={"Email"}
            onChangeText={(email) => this.setState({ email: email })}
            shake={!this.state.error ? false : true}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input
            label={"Password"}
            onChangeText={(password) => this.setState({ password: password })}
            shake={!this.state.error ? false : true}
            secureTextEntry={true}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableHighlight style={styles.button} onPress={this.login} underlayColor={Colors.underlayColor}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.button}
            onPress={() => this.props.navigation.navigate("Register")}
            underlayColor={Colors.underlayColor}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: Constants.statusBarHeight,
  },
  formContainer: {
    justifyContent: "center",
    marginTop: 32,
    marginHorizontal: 30,
    width: 300,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    alignSelf: "center",
  },
  button: {
    height: 42,
    backgroundColor: Colors.tintColor,
    borderColor: Colors.tintColor,
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 30,
    marginHorizontal: 30,
    marginBottom: -15,
    alignSelf: "stretch",
    justifyContent: "center",
  },
});
