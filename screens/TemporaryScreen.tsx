import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

export default class TemporaryScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>This is a temp screen</Text>
      </View>
    );
  }
}
// @ts-ignore
TemporaryScreen.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
