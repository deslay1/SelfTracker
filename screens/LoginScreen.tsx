import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableHighlight, ActivityIndicator, ScrollView /* Image */ } from "react-native";
import { Input } from "react-native-elements";
import Constants from "expo-constants";

import Fire from "../Fire";

import Colors from "../constants/Colors";

export default class LoginScreen extends Component {
  public setState: any;
  public props: any;
  public email: any;
  public password: any;
  static navigationOptions = {
    headerShown: false,
  };
  state = {
    email: "",
    password: "",
    errorMessage: null,
    isLoading: false,
  };

  componentDidMount() {}

  login = () => {
    this.setState({ isLoading: true });
    const { email, password } = this.state;
    Fire.loginUser(email, password);
    this.setState({ isLoading: false });
  };
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={{ marginTop: 70, marginBottom: 30 }}>
          {/* <Image source={require("../assets/images/appLogo.png")} style={{ width: 200, height: 100 }} /> */}
          <Text style={styles.headerText}>SelfTracker</Text>
        </View>
        <View style={styles.formContainer}>
          <Input
            label={"Email"}
            onChangeText={(email) => this.setState({ email: email })}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input
            label={"Password"}
            onChangeText={(password) => this.setState({ password: password })}
            secureTextEntry={true}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableHighlight style={styles.button} onPress={this.login} underlayColor={Colors.underlayColor}>
            {this.state.isLoading ? <ActivityIndicator /> : <Text style={styles.buttonText}>Log In</Text>}
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
  headerText: {
    fontSize: 32,
    fontFamily: "sans-serif",
    fontWeight: "500",
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
