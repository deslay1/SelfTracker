import React, { Component } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, ActivityIndicator } from "react-native";
import Constants from "expo-constants";

import Fire from "../Fire";

import DrawerButton from "../components/DrawerButton";
import AddListModal from "../components/AddListModal";
import ItemList from "../components/ItemList";

import { AntDesign } from "@expo/vector-icons";
import Colors from "../constants/Colors";

interface List {
  name: string;
  color: string;
  items: any;
  id?: string;
}

export default class ListMenuScreen extends Component {
  public props: any;
  public setState: any;
  state = {
    addItemVisible: false,
    lists: [],
    user: {},
    loading: true,
    userLoading: true,
  };

  componentDidMount() {
    const user = this.props.uid || Fire.uid;
    // @ts-ignore
    Fire.getLists((lists: any) => {
      this.setState({ lists, user }, () => {
        this.setState({ loading: false });
      });
      this.getUsername(user);
    });
  }
  // @ts-ignore
  unMount = () => null;

  getUsername(user: any) {
    //const user = this.props.uid || Fire.shared.uid;
    // @ts-ignore
    this.unMount = Fire.firestore
      .collection("users")
      .doc(user)
      .onSnapshot(
        (doc: any) => {
          const user: object | null = doc.data();
          this.setState({ user, userLoading: false });
        },
        (error) => {
          // @ts-ignore
          alert(error.message);
        }
      );
    // @ts-ignore
    const username: string = this.state.user.username;
    return username;
  }

  componentWillUnmount() {
    Fire.detach();
    // @ts-ignore
    this.unMount();
  }

  toggleAddItemModal() {
    this.setState({ addItemVisible: !this.state.addItemVisible });
  }

  renderList = (list: List) => {
    // @ts-ignore
    return <ItemList list={list} updateList={this.updateList} deleteList={this.deleteList} />;
  };

  addList = (list: List) => {
    Fire.addList({
      name: list.name,
      color: list.color,
      items: [],
    });
  };

  updateList = (list: List) => {
    Fire.updateList(list);
  };

  deleteList = (list: List) => {
    Fire.deleteList(list);
  };

  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          visible={this.state.addItemVisible}
          onRequestClose={() => this.toggleAddItemModal()}>
          <AddListModal closeModal={() => this.toggleAddItemModal()} addList={this.addList} />
        </Modal>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{this.props.navigation.title}My Lists</Text>
          {/* @ts-ignore */}
          <DrawerButton navigation={this.props.navigation} screen={"MENU"} unMount={this.unMount()} />
        </View>

        <View style={styles.content}>
          {this.state.loading ? (
            <ActivityIndicator />
          ) : (
            // @ts-ignore
            <Text style={{ fontWeight: "bold" }}>{this.state.user.username}'s : </Text>
          )}

          <View style={styles.contentHeader}>
            <View style={styles.divider} />
            <Text style={styles.contentTitle}>
              Tasks & <Text style={{ color: Colors.tintColor }}>Todos</Text>
            </Text>

            <View style={styles.divider} />
          </View>
          <View style={{ marginVertical: 16 }}>
            <TouchableOpacity style={styles.addList} onPress={() => this.toggleAddItemModal()}>
              <AntDesign name="plus" size={16} color={Colors.tintColor} />
            </TouchableOpacity>
            <Text style={styles.add}>Add a list</Text>
          </View>

          <View style={styles.flatList}>
            <FlatList
              data={this.state.lists}
              keyExtractor={(item: any) => item.id.toString()}
              //horizontal={true}
              //showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
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
// @ts-ignore
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
    paddingHorizontal: "8%",
    paddingTop: 1 * Constants.statusBarHeight,
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
    marginTop: 16,
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
  flatList: { height: 360 },
  addList: {
    borderWidth: 2,
    borderColor: Colors.lightTintColor,
    borderRadius: 8,
    paddingVertical: 6,
    alignItems: "center",
    marginHorizontal: "3%",
  },
  add: {
    fontWeight: "bold",
    color: Colors.tintColor,
    fontSize: 14,
    marginTop: 2,
  },
});
