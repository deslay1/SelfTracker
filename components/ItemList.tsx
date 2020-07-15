import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";

import ItemListModal from "./ItemListModal";

export default class ItemList extends Component {
  state = {
    showListVisible: false,
  };

  toggleListModal = () => {
    this.setState({ showListVisible: !this.state.showListVisible });
  };

  render() {
    // @ts-ignore
    const list = this.props.list;
    const completedCount = list.items.filter((item: any) => item.completed).length;
    const remainingCount = list.items.length - completedCount;
    return (
      <View style={[styles.container, { backgroundColor: list.color }]}>
        <Modal animationType="slide" visible={this.state.showListVisible} onRequestClose={() => this.toggleListModal()}>
          <ItemListModal
            // @ts-ignore
            list={list}
            closeModal={() => this.toggleListModal()}
            // @ts-ignore
            updateList={this.props.updateList}
            // @ts-ignore
            deleteList={this.props.deleteList}
          />
        </Modal>
        <TouchableOpacity style={styles.listContainer} onPress={() => this.toggleListModal()}>
          <Text style={styles.listTitle} numberOfLines={1}>
            {list.name}
          </Text>

          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <View style={{ alignItems: "center", flexDirection: "row" }}>
              <Text style={styles.count}>{remainingCount}</Text>
              <Text style={styles.subtitle}>Remaining</Text>
            </View>
            <View style={{ alignItems: "center", flexDirection: "row" }}>
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
  container: {
    flex: 1,
    borderWidth: 1,
    width: 300,
    paddingHorizontal: 20,
    marginVertical: 2,
    borderRadius: 12,
  },
  listContainer: {
    paddingVertical: 8,
    alignItems: "baseline",
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    //alignSelf: "baseline",
  },
  count: {
    fontSize: 16,
    color: "#fff",
    paddingRight: 6,
  },
  subtitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    paddingRight: 12,
  },
});
