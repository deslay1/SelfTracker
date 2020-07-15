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
  Alert,
  Animated,
} from "react-native";

import Swipeable from "react-native-gesture-handler/Swipeable";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import Colors from "../constants/Colors";

export default class ItemListModal extends Component {
  public props: any;
  public setState: any;
  constructor(props: any) {
    super(props);
    this.state = {
      newItem: "",
    };
  }

  toggleItemCompleted = (index: number) => {
    let list = this.props.list;
    list.items[index].completed = !list.items[index].completed;

    this.props.updateList(list);
  };

  addItem = () => {
    let list = this.props.list;

    if (!list.items.some((item: any) => item.title === this.state.newItem)) {
      list.items.push({ title: this.state.newItem, completed: false });
      this.props.updateList(list);
    }
    this.setState({ newItem: "" });
    Keyboard.dismiss();
  };

  deleteItem = (index: number) => {
    let list = this.props.list;
    list.items.splice(index, 1);

    this.props.updateList(list);
  };

  alertDeleteList = (list: any) =>
    Alert.alert(
      "Delete List?",
      "Are you sure you want to delete this list?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "Delete", onPress: () => this.props.deleteList(list) },
      ],
      { cancelable: false }
    );

  alertDeleteItem = (itemIndex: number) =>
    Alert.alert(
      "Delete Item?",
      "Are you sure you want to delete this item?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "Delete", onPress: () => this.deleteItem(itemIndex) },
      ],
      { cancelable: true }
    );

  renderItem = (item: any, index: number) => {
    return (
      // @ts-ignore
      <Swipeable renderRightActions={(_, dragX) => this.rightActions(dragX, index)}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
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
          <View>
            <TouchableOpacity style={styles.button} onPress={() => this.alertDeleteItem(index)}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Swipeable>
    );
  };

  rightActions = (dragX: number, index: number) => {
    <TouchableOpacity>
      <Animated.View>
        <Animated.Text>Delete</Animated.Text>
      </Animated.View>
    </TouchableOpacity>;
  };

  render() {
    const list = this.props.list;
    const itemCount = list.items.length;
    const completedCount = list.items.filter((item: any) => item.completed).length;
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 500}
        behavior={Platform.OS === "ios" ? "padding" : null}>
        <SafeAreaView style={styles.container}>
          <View style={[styles.section, styles.header]}>
            <View style={{ paddingBottom: 4, borderBottomWidth: 4, borderBottomColor: list.color }}>
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}>
                  <Text style={[styles.title, { color: list.color }]}>{list.name}</Text>
                  <TouchableOpacity onPress={() => this.alertDeleteList(list)}>
                    <FontAwesome name="trash" color={Colors.tintColor} size={24} />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={this.props.closeModal}>
                  <Text
                    style={[
                      styles.closeModalText,
                      {
                        borderColor: list.color,
                      },
                    ]}>
                    Close
                  </Text>
                  {/* <AntDesign
                    style={{
                      alignSelf: "center",
                      padding: 4,
                      borderWidth: 4,
                      borderRadius: 16,
                      borderColor: list.color,
                    }}
                    name="close"
                    size={24}
                    color={Colors.tintColor}
                  /> */}
                </TouchableOpacity>
              </View>
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
              placeholder="Add an item"
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
    marginRight: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginRight: 12,
    //color: Colors.tintColor,
  },
  itemCount: {
    marginTop: 4,
    marginBottom: 4,
    color: "#ccc",
    fontWeight: "bold",
  },
  closeModalText: {
    fontSize: 14,
    fontWeight: "bold",
    alignSelf: "center",
    textAlign: "center",
    textAlignVertical: "center",
    padding: 4,
    borderWidth: 4,
    borderRadius: 16,
  },
  buttonText: {
    fontSize: 12,
    paddingHorizontal: 2,
    color: "white",
    alignSelf: "center",
  },
  button: {
    backgroundColor: Colors.tintColor,
    borderColor: Colors.lightTintColor,
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginVertical: 2,
    marginHorizontal: 2,
    alignSelf: "stretch",
    justifyContent: "center",
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
    width: 200,
  },
  item: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
  },
});
