import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

export default class MoodTrackerScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Mood tracker screen</Text>
      </View>
    );
  }
}

MoodTrackerScreen.navigationOptions = {
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
