import React, { Component } from "react";
import { View, Text, FlatList, SafeAreaView, StyleSheet, TouchableOpacity, Modal } from "react-native";

import DrawerButton from "../components/DrawerButton";
import AddItemModal from "../components/AddItemModal";
import ItemList from "../components/ItemList";

import { FontAwesome, AntDesign } from "@expo/vector-icons";
import Colors from "../constants/Colors";

export default class ListMenuScreen extends Component {
  state = {
    addItemVisible: false,
    lists: [],
  };

  toggleAddItemModal() {
    this.setState({ addItemVisible: !this.state.addItemVisible });
  }

  renderList = (list) => {
    return <ItemList list={list} updateList={this.updateList} />;
  };

  addList = (list) => {
    this.setState({ lists: [...this.state.lists, { ...list, id: this.state.lists.length + 1, items: [] }] });
  };

  updateList = (list) => {
    this.setState({
      lists: this.state.lists.map((item) => {
        return item.id === list.id ? list : item;
      }),
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          visible={this.state.addItemVisible}
          onRequestClose={() => this.toggleAddItemModal()}>
          <AddItemModal closeModal={() => this.toggleAddItemModal()} addList={this.addList} />
        </Modal>
        <SafeAreaView style={styles.header}>
          <Text style={styles.headerTitle}>{this.props.navigation.title}My Lists</Text>
          <DrawerButton navigation={this.props.navigation} screen={"MENU"} />
        </SafeAreaView>

        <View style={styles.content}>
          <View style={styles.contentHeader}>
            <View style={styles.divider} />
            <Text style={styles.contentTitle}>
              Tasks & <Text style={{ color: Colors.tintColor }}>Todos</Text>
            </Text>

            <View style={styles.divider} />
          </View>
          <View style={{ marginVertical: 32 }}>
            <TouchableOpacity style={styles.addList} onPress={() => this.toggleAddItemModal()}>
              <AntDesign name="plus" size={16} color={Colors.tintColor} />
            </TouchableOpacity>
            <Text style={styles.add}>Add a list</Text>
          </View>

          <View style={{ height: 300, paddingLeft: 8 }}>
            <FlatList
              data={this.state.lists}
              keyExtractor={(item) => item.name}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => this.renderList(item)}
              keyboardDismissMode="none"
              keyboardShouldPersistTaps="always"
            />
          </View>
        </View>
      </View>
    );
  }
}

ListMenuScreen.navigationOptions = {
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
    paddingHorizontal: 15,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: "#FFF",
    borderBottomWidth: 2,
    borderBottomColor: "#EBECF4",
    shadowColor: "#454D65",
    shadowOffset: { height: 10 },
    shadowRadius: 8,
    shadowOpacity: 0.6,
    elevation: 10,
    zIndex: 2,
  },
  headerTitle: {
    marginLeft: 30,
    fontSize: 24,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  contentHeader: {
    flexDirection: "row",
  },
  divider: {
    backgroundColor: Colors.lightTextColor,
    height: 1,
    flex: 1,
    alignSelf: "center",
  },
  contentTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: Colors.lightTextColor,
    paddingHorizontal: 32,
  },
  addList: {
    borderWidth: 2,
    borderColor: Colors.lightTintColor,
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  add: {
    fontWeight: "bold",
    color: Colors.tintColor,
    fontSize: 14,
    marginTop: 4,
  },
});
