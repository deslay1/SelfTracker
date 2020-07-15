import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import DrawerButton from "../components/DrawerButton";
import Constants from "expo-constants";
import Colors from "../constants/Colors";

import firebase from "firebase";
import Fire from "../Fire";

const moods = [
  { id: 1, text: "Productive", color: "#4caf50", count: 0 },
  { id: 2, text: "Relaxed", color: "#2196f3", count: 0 },
  { id: 3, text: "Ambitious", color: "red", count: 0 },
  { id: 4, text: "Stressed", color: "#ff5722", count: 0 },
  { id: 5, text: "Happy", color: "#ffeb3b", count: 0 },
  { id: 6, text: "Sad", color: "purple", count: 0 },
  { id: 7, text: "Bored", color: "darkgrey", count: 0 },
  { id: 8, text: "Excited", color: "skyblue", count: 0 },
  { id: 9, text: "Indifferent", color: "black", count: 0 },
];

export default class TemporaryScreen extends Component {
  public props: any;
  public setState: any;
  state = {
    allMoods: [],
    moods: moods,
  };

  componentDidMount() {
    Fire.getMoods((allMoods: any) => {
      /*       const moodTimestamp = firebase.firestore.Timestamp.fromMillis(
        allMoods.sort((a, b) => a.day - b.millis)[1].day
      ).toDate();
      const moodDay = moodTimestamp.getDate();
      console.log(moodDay); */

      allMoods.map((mood: any) => {
        const stateMoods = this.state.moods;
        const moodsFiltered = stateMoods.map((e) => e.text);
        const moodIndex = moodsFiltered.indexOf(mood.text);
        stateMoods[moodIndex].count++;
        this.setState({ moods: stateMoods.sort((a, b) => b.count - a.count) });
      });
      this.setState({
        allMoods: allMoods,
      });
    });
  }

  componentWillUnmount() {
    Fire.detachMood();
  }

  renderMood = (lower: number, upper: number) => {
    return this.state.moods.slice(lower, upper).map((mood: any) => {
      return (
        <View style={styles.moodBox} key={mood.id}>
          <Text style={styles.moodText}>{mood.text}</Text>
          <View style={[styles.mood, { backgroundColor: mood.color }]}>
            <View style={styles.moodCountBox}>
              <Text style={{ padding: "5%" }}>{mood.count}</Text>
            </View>
          </View>
          <Text style={styles.moodText}>{Math.floor((mood.count / this.state.allMoods.length) * 100) + " %"}</Text>
        </View>
      );
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{this.props.navigation.title}Mood Statistics</Text>
          <View style={{ paddingLeft: "10%" }}>
            {/* @ts-ignore */}
            <DrawerButton navigation={this.props.navigation} />
          </View>
        </View>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={{ flexDirection: "row" }}>{this.renderMood(0, 3)}</View>
          <View style={{ flexDirection: "row" }}>{this.renderMood(3, 6)}</View>
          <View style={{ flexDirection: "row" }}>{this.renderMood(6, 9)}</View>
        </ScrollView>
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
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 1 * Constants.statusBarHeight,
    paddingHorizontal: "8%",
    paddingBottom: 0.5 * Constants.statusBarHeight,
    backgroundColor: "#FFF",
    borderBottomWidth: 2,
    borderBottomColor: "#EBECF4",
    shadowColor: "#454D65",
    shadowOffset: { width: 2, height: 10 },
    shadowRadius: 8,
    shadowOpacity: 0.6,
    elevation: 10,
    zIndex: 2,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  content: {
    marginTop: "10%",
    alignItems: "center",
  },
  moodBox: {
    alignItems: "center",
    marginHorizontal: "6%",
    borderColor: Colors.tintColor,
  },
  moodText: {
    fontSize: 12,
    textAlign: "center",
    marginVertical: 4,
  },
  moodCountBox: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    paddingHorizontal: "10%",
    borderRadius: 32,
  },
  mood: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 32,
    height: 60,
    width: 60,
    margin: 2,
  },
});
