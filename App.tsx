import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

import Navigators from "./navigation/Navigators";

import { decode, encode } from "base-64";
// @ts-ignore
if (!global.btoa) {
  // @ts-ignore
  global.btoa = encode;
}

// @ts-ignore
if (!global.atob) {
  // @ts-ignore
  global.atob = decode;
}

export default class App extends Component {
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <Navigators />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
