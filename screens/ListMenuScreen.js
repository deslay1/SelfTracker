import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";

import Fire from "../Fire";

import DrawerButton from "../components/DrawerButton";
import AddListModal from "../components/AddListModal";
import ItemList from "../components/ItemList";

import { FontAwesome, AntDesign } from "@expo/vector-icons";
import Colors from "../constants/Colors";

export default class ListMenuScreen extends Component {
  state = {
    addItemVisible: false,
    lists: [],
    user: {},
    loading: true,
    userLoading: true,
  };

  componentDidMount() {
    const user = this.props.uid || Fire.shared.uid;
    Fire.shared.getLists((lists) => {
      this.setState({ lists, user }, () => {
        this.setState({ loading: false });
      });
    });
  }

  getUsername() {
    const user = this.props.uid || Fire.shared.uid;
    Fire.shared.firestore
      .collection("users")
      .doc(user)
      .onSnapshot(
        (doc) => {
          this.setState({ user: doc.data(), userLoading: false });
        },
        (error) => {
          alert(error.message);
        }
      );
    return this.state.user.username;
  }

  componentWillUnmount() {
    Fire.shared.detach();
  }

  toggleAddItemModal() {
    this.setState({ addItemVisible: !this.state.addItemVisible });
  }

  renderList = (list) => {
    return <ItemList list={list} updateList={this.updateList} deleteList={this.deleteList} />;
  };

  addList = (list) => {
    Fire.shared.addList({
      name: list.name,
      color: list.color,
      items: [],
    });
  };

  updateList = (list) => {
    Fire.shared.updateList(list);
  };

  deleteList = (list) => {
    Fire.shared.deleteList(list);
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
          <DrawerButton navigation={this.props.navigation} screen={"MENU"} />
        </View>

        <View style={styles.content}>
          {this.state.loading ? (
            <ActivityIndicator />
          ) : (
            <Text style={{ fontWeight: "bold" }}>{this.getUsername()}'s : </Text>
          )}

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
              keyExtractor={(item) => item.id.toString()}
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
