import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";

import ItemListModal from "./ItemListModal";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default class ItemList extends Component {
  state = {
    showListVisible: false,
  };

  toggleListModal = () => {
    this.setState({ showListVisible: !this.state.showListVisible });
  };

  render() {
    const list = this.props.list;
    const completedCount = list.items.filter((item) => item.completed).length;
    const remainingCount = list.items.length - completedCount;
    return (
      <View>
        <Modal animationType="slide" visible={this.state.showListVisible} onRequestClose={() => this.toggleListModal()}>
          <ItemListModal
            list={list}
            closeModal={() => this.toggleListModal()}
            updateList={this.props.updateList}
            deleteList={this.props.deleteList}
          />
        </Modal>
        <TouchableOpacity
          style={[styles.listContainer, { backgroundColor: list.color }]}
          onPress={() => this.toggleListModal()}>
          <Text style={styles.listTitle} numberOfLines={1}>
            {list.name}
          </Text>

          <View>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.count}>{remainingCount}</Text>
              <Text style={styles.subtitle}>Remaining</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.count}>{completedCount}</Text>
              <Text style={styles.subtitle}>Completed</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginHorizontal: 12,
    alignItems: "center",
    width: 150,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  count: {
    fontSize: 32,
    color: "#fff",
  },
  subtitle: {
    color: "#fff",
    fontWeight: "bold",
  },
});
