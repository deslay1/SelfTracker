import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import Colors from "../constants/Colors";

import moods from "../utils/moods";

export default class AddMoodModal extends Component {
  public props: any;
  public setState: any;
  state = {
    moods: moods,
  };

  addMood = (color: string, text: string) => {
    this.props.addMood(color, text);
  };

  renderMood = (mood: any) => {
    return (
      <View style={styles.moodBox} key={mood.id}>
        <Text style={styles.moodText}>{mood.text}</Text>
        <TouchableOpacity
          style={[styles.mood, { backgroundColor: mood.color }]}
          onPress={() => this.addMood(mood.color, mood.text)}></TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.selectMoodContainer}>
          <Text style={styles.selectText}>Select mood for day {this.props.day.id}</Text>
        </View>
        {/*         <View style={styles.contentContainer}>
          <View style={styles.moodContainer}>{this.renderMood()}</View>
        </View> */}
        <View style={styles.contentContainer}>
          <FlatList
            data={this.state.moods}
            keyExtractor={(mood) => mood.id.toString()}
            renderItem={({ item }) => this.renderMood(item)}
            //horizontal={true}
            //showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            numColumns={3}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={() => this.props.closeModal()}>
          <Text style={styles.buttonText}>Go back </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    //justifyContent: "center",
    //backgroundColor: Colors.lightTintColor,
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    height: 300,
  },
  moodContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.7,
    borderRadius: 12,
    borderColor: Colors.tintColor,
    width: 300,
  },
  moodBox: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 4,
    //borderWidth: 0.7,
    //borderRadius: 12,
    borderColor: Colors.tintColor,
  },
  moodText: {
    fontSize: 12,
    textAlign: "center",
    marginVertical: 4,
  },
  mood: {
    borderWidth: 1,
    borderRadius: 32,
    padding: 30,
    margin: 2,
  },
  selectMoodContainer: {
    padding: 10,
    paddingHorizontal: 20,
    marginTop: 60,
    marginBottom: 40,
    borderRadius: 16,
  },
  selectText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  button: {
    width: 220,
    padding: 8,
    backgroundColor: Colors.lightTintColor,
    borderWidth: 0.5,
    borderRadius: 8,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 14,
    paddingVertical: 8,
    paddingHorizontal: 2,
  },
});
