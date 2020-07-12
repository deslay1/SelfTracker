import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import { Input } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import Constants from "expo-constants";

import Fire from "../Fire";

import UserPermissions from "../utils/UserPermissions";
import * as ImagePicker from "expo-image-picker";

import Colors from "../constants/Colors";

export default class RegisterScreen extends Component {
  static navigationOptions = {
    headerShown: false,
  };
  state = {
    user: {
      username: "",
      email: "",
      password: "",
      image: null,
    },
    confirmPassword: "",
    errorMessage: null,
  };
  signUp = () => {
    const user = this.state.user;
    if (user.password.length < 6) {
      alert("Password must be 6 characters long");
    } else {
      if (user.password === this.state.confirmPassword) {
        Fire.shared.createUser(user);
      } else {
        alert("Passwords do not match");
      }
    }
  };

  pickImage = async () => {
    UserPermissions.getCameraPermission();

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      this.setState({ user: { ...this.state.user, image: result.uri } });
    }
  };

  render() {
    return (
      // Avoiding the keyboard does not work for me...
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.goBack()}>
            <AntDesign name="arrowleft" size={32} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.imagePlaceHolder} onPress={this.pickImage}>
            {this.state.user.image ? (
              <Image source={{ uri: this.state.user.image }} style={styles.image} />
            ) : (
              <AntDesign name="adduser" size={32} color="#038887" style={{ marginTop: 10, marginLeft: 2 }} />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.formContainer}>
          <Input
            label={"Username"}
            labelStyle={{ fontSize: 12 }}
            onChangeText={(username) => this.setState({ user: { ...this.state.user, username } })}
          />
          <Input
            label={"Email"}
            labelStyle={{ fontSize: 12 }}
            onChangeText={(email) => this.setState({ user: { ...this.state.user, email } })}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input
            label={"Password"}
            labelStyle={{ fontSize: 12 }}
            onChangeText={(password) => this.setState({ user: { ...this.state.user, password } })}
            secureTextEntry={true}
            autoCapitalize="none"
          />
          <Input
            label={"Confirm Password"}
            labelStyle={{ fontSize: 12 }}
            onChangeText={(confirmPassword) => this.setState({ confirmPassword: confirmPassword })}
            secureTextEntry={true}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableHighlight style={styles.button} onPress={this.signUp} underlayColor={Colors.underlayColor}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight * 1.5,
  },
  back: {
    marginLeft: "10%",
    marginRight: "78%",
    borderRadius: 32,
    backgroundColor: Colors.underlayColor,
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
    paddingTop: 6,
  },
  formContainer: {
    alignItems: "center",
    marginTop: 32,
    marginHorizontal: "10%",
    height: 300,
  },
  buttonContainer: {
    alignSelf: "center",
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
  imagePlaceHolder: {
    alignSelf: "center",
    width: 100,
    height: 100,
    backgroundColor: "#E1E2E6",
    borderRadius: 48,
    marginTop: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    position: "absolute",
    height: 100,
    width: 100,
    borderRadius: 48,
  },
});
