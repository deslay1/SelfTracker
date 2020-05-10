import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

import Navigators from "./navigation/Navigators";

export default class App extends Component {
  constructor(props) {
    super(props);
    Text.defaultProps = Text.defaultProps || {};
    Text.defaultProps.style = { fontFamily: "Roboto" };
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
