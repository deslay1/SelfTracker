import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../constants/Colors";

import { DrawerActions } from "react-navigation-drawer";

export default class DrawerButton extends Component {
  componentDidMount() {
    // @ts-ignore
    this.props.unMount;
  }
  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        // @ts-ignore
        onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}>
        <FontAwesome name="bars" size={32} color={Colors.tintColor} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginLeft: "2%",
    padding: 3,
    borderRadius: 8,
    //backgroundColor: "#FFF",
  },
  text: {
    fontSize: 14,
    alignItems: "center",
    color: "red",
  },
});
