import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView, ImageBackground, Image, TouchableHighlight } from "react-native";
import { DrawerNavigatorItems } from "react-navigation-drawer";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../constants/Colors";

import Fire from "../Fire";

const user = "1";

export default class Sidebar extends Component {
  state = {
    user: {},
    loading: false,
  };

  userMount = null;

  componentDidMount() {
    const user = this.props.uid || Fire.shared.uid;

    this.userMount = Fire.shared.firestore
      .collection("users")
      .doc(user)
      .onSnapshot(
        (doc) => {
          this.setState({ user: doc.data(), loading: true });
        },
        (error) => {
          alert(error.message);
        }
      );
  }

  componentWillUnmount() {
    this.userMount();
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <ImageBackground source={require("../assets/images/sidebar2.jpg")} style={styles.imageBackground}>
          <View style={styles.sidebarItems}>
            <View>
              <Image
                source={
                  this.state.user.image ? { uri: this.state.user.image } : require("../assets/images/catprofile.jpg")
                }
                style={styles.image}></Image>
              <Text style={styles.name}>{this.state.user.username}</Text>
            </View>
            <View style={styles.sidebarRight}>
              <TouchableHighlight
                style={styles.button}
                onPress={Fire.shared.signOut}
                underlayColor={Colors.underlayColor}>
                <Text style={styles.buttonText}>Log Out</Text>
              </TouchableHighlight>
            </View>
          </View>
        </ImageBackground>

        <View style={styles.container}>
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
  },
  sidebarRight: {
    justifyContent: "flex-end",
  },
  imageBackground: {
    padding: 16,
    paddingTop: 50,
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
