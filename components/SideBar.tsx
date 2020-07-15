import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView, ImageBackground, Image, TouchableHighlight } from "react-native";
import { DrawerNavigatorItems } from "react-navigation-drawer";
//import { FontAwesome } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import Constants from "expo-constants";

import Fire from "../Fire";

export default class Sidebar extends Component {
  state = {
    user: {},
    loading: false,
  };

  userMount = () => null;

  componentDidMount() {
    // @ts-ignore
    const user = this.props.uid || Fire.uid;
    // @ts-ignore
    this.userMount = Fire.firestore
      .collection("users")
      .doc(user)
      .onSnapshot(
        (doc) => {
          this.setState({ user: doc.data(), loading: true });
        },
        (error) => {
          // @ts-ignore
          alert(error.message);
        }
      );
  }

  componentWillUnmount() {
    Fire.detach();
    this.userMount();
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <ImageBackground source={require("../assets/images/sidebar2.jpg")} style={styles.imageBackground}>
          <View style={styles.sidebarItems}>
            <View style={{ alignItems: "center" }}>
              <Image
                source={
                  // @ts-ignore
                  this.state.user.image ? { uri: this.state.user.image } : require("../assets/images/catprofile.jpg")
                }
                style={styles.image}></Image>
              {/* @ts-ignore*/}
              <Text style={styles.name}>{this.state.user.username}</Text>
            </View>
            <View style={styles.sidebarRight}>
              <TouchableHighlight style={styles.button} onPress={Fire.signOut} underlayColor={Colors.underlayColor}>
                <Text style={styles.buttonText}>Log Out</Text>
              </TouchableHighlight>
            </View>
          </View>
        </ImageBackground>

        <View style={styles.container}>
          {/* @ts-ignore*/}
          <DrawerNavigatorItems {...this.props} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sidebarItems: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: "3%",
    paddingTop: Constants.statusBarHeight,
  },
  sidebarRight: {
    justifyContent: "flex-end",
  },
  imageBackground: {
    padding: 16,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "#FFF",
  },
  name: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 4,
  },
  buttonText: {
    fontSize: 14,
    paddingHorizontal: 6,
    color: "white",
    alignSelf: "center",
  },
  button: {
    backgroundColor: Colors.tintColor,
    borderColor: Colors.lightTintColor,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginVertical: 2,
    marginHorizontal: 4,
    alignSelf: "stretch",
    justifyContent: "center",
  },
});
