import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, TextInput, Platform } from "react-native";
import { AntDesign } from "@expo/vector-icons";
//import Colors from "../constants/Colors";

export default class AddListModal extends Component {
  backgroundColors = ["#5CD859", "#24A6D9", "#595BD9", "#8022D9", "#D159D8", "#D85963", "#D88559"];

  public props: any;
  public setState: any;

  state = {
    name: "",
    color: this.backgroundColors[0],
  };

  createTodo = () => {
    const { name, color } = this.state;

    const list = { name, color };
    this.props.addList(list);

    this.setState({ name: "" });
    this.props.closeModal();
  };

  renderColors() {
    return this.backgroundColors.map((color) => {
      return (
        <TouchableOpacity
          key={color}
          style={[styles.colorSelect, { backgroundColor: color }]}
          onPress={() => this.setState({ color })}></TouchableOpacity>
      );
    });
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        keyboardVerticalOffset={-500}
        behavior={Platform.OS === "ios" ? "padding" : null}>
        <TouchableOpacity style={{ position: "absolute", top: 32, right: 32 }} onPress={this.props.closeModal}>
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>

        <View style={{ alignSelf: "stretch", marginHorizontal: 32 }}>
          <Text style={styles.title}>Create a List</Text>

          <TextInput
            style={[styles.input, { borderColor: this.state.color }]}
            placeholder="Enter List Name (max 15 characters)"
            onChangeText={(name) => this.setState({ name: name })}
            maxLength={15}
          />

          <View style={styles.colorSelectContainer}>{this.renderColors()}</View>

          <TouchableOpacity style={[styles.create, { backgroundColor: this.state.color }]} onPress={this.createTodo}>
            <Text style={{ color: "#fff", fontWeight: "bold" }}>Create!</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 6,
    height: 50,
    marginTop: 8,
    paddingHorizontal: 16,
  },
  create: {
    marginTop: 16,
    height: 50,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  colorSelectContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  colorSelect: {
    width: 30,
    height: 30,
    borderRadius: 4,
  },
});
