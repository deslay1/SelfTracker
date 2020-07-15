import React, { Component } from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { DrawerActions } from "react-navigation-drawer";

export default class DrawerButton extends Component {
  componentDidMount() {
    // @ts-ignore
    this.props.unMount;
  }
  render() {
    return (
      // @ts-ignore
      <TouchableOpacity onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}>
        <FontAwesome name="bars" size={32} colors="black" />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-end",
    marginRight: 30,
  },
  text: {
    fontSize: 14,
    alignItems: "center",
    color: "red",
  },
});
