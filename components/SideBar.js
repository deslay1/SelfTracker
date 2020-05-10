import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView, ImageBackground, Image } from "react-native";
import { DrawerNavigatorItems } from "react-navigation-drawer";
import { FontAwesome } from "@expo/vector-icons";

export default Sidebar = (props) => (
  <ScrollView style={styles.container}>
    <ImageBackground source={require("../assets/images/sidebar2.jpg")} style={styles.imageBackground}>
      <Image source={require("../assets/images/catprofile.jpg")} style={styles.image}></Image>
      <Text style={styles.name}>Username</Text>
    </ImageBackground>

    <View style={styles.container}>
      <DrawerNavigatorItems {...props} />
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
