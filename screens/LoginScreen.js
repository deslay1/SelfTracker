import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableHighlight, ActivityIndicator, KeyboardAvoidingView } from "react-native";
import { Input } from "react-native-elements";

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
      <KeyboardAvoidingView style={styles.container}>
        <ActivityIndicator animating={this.state.isLoading} />
        <View style={styles.formContainer}>
          <Input
            label={"Email"}
            onChangeText={(email) => this.setState({ email: email })}
            shake={!this.state.error ? false : true}
          />
          <Input
            label={"Password"}
            onChangeText={(password) => this.setState({ password: password })}
            shake={!this.state.error ? false : true}
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
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  formContainer: {
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