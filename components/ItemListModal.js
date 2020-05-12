import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Keyboard,
} from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import Colors from "../constants/Colors";

export default class ItemListModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newItem: "",
    };
  }

  toggleItemCompleted = (index) => {
    let list = this.props.list;
    list.items[index].completed = !list.items[index].completed;

    this.props.updateList(list);
  };

  addItem = () => {
    let list = this.props.list;
    list.items.push({ title: this.state.newItem, completed: false });

    this.props.updateList(list);
    this.setState({ newItem: "" });

    Keyboard.dismiss();
  };

  renderItem = (item, index) => {
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity onPress={() => this.toggleItemCompleted(index)}>
          <FontAwesome
            name={item.completed ? "check-square" : "square-o"}
            size={24}
            color={Colors.underlayColor}
            style={{ width: 32 }}
          />
        </TouchableOpacity>

        <Text
          style={[
            styles.item,
            {
              textDecorationLine: item.completed ? "line-through" : "none",
              color: item.completed ? Colors.tintColor : "black",
            },
          ]}>
          {item.title}
        </Text>
      </View>
    );
  };

  render() {
    const list = this.props.list;
    const itemCount = list.items.length;
    const completedCount = list.items.filter((item) => item.completed).length;
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 500}
        behavior={Platform.OS === "ios" ? "padding" : null}>
        <SafeAreaView style={styles.container}>
          <TouchableOpacity style={{ position: "absolute", top: 64, right: 32 }} onPress={this.props.closeModal}>
            <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>

          <View style={[styles.section, styles.header, { borderBottomColor: list.color }]}>
            <View>
              <Text style={[styles.title, { color: list.color }]}>{list.name}</Text>
              <Text style={styles.itemCount}>
                {completedCount} of {itemCount} completed
              </Text>
            </View>
          </View>

          <View style={[styles.section, { flex: 3 }]}>
            <FlatList
              data={list.items}
              keyExtractor={(item) => item.title}
              renderItem={({ item, index }) => this.renderItem(item, index)}
              contentContainerStyle={{ paddingHorizontal: 32, paddingVertical: 32 }}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="always"
            />
          </View>

          <View style={[styles.section, styles.footer]}>
            <TextInput
              style={[styles.input, { borderColor: list.color }]}
              onChangeText={(text) => this.setState({ newItem: text })}
              value={this.state.newItem}
            />
            <TouchableOpacity style={[styles.addItem, { backgroundColor: list.color }]} onPress={() => this.addItem()}>
              <AntDesign name="plus" size={16} color="white" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    //alignItems: "center",
  },
  section: {
    flex: 1,
    //alignSelf: "center",
  },
  header: {
    justifyContent: "center",
    marginLeft: 40,
    marginRight: 80,
    borderBottomWidth: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    //color: Colors.tintColor,
  },
  itemCount: {
    marginTop: 4,
    marginBottom: 4,
    color: "#ccc",
    fontWeight: "bold",
  },
  footer: {
    paddingHorizontal: 32,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 6,
    marginRight: 8,
    paddingHorizontal: 8,
  },
  addItem: {
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  itemContainer: {
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  item: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
  },
});
