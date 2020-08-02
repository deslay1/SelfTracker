import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  Modal,
  Platform,
} from "react-native";
import Colors from "../constants/Colors";
import { Entypo } from "@expo/vector-icons";
import Constants from "expo-constants";
import DrawerButton from "../components/DrawerButton";

import firebase from "firebase";
import Fire from "../Fire";
import moment from "moment";
// import Notifications from "../Notifications";
// import * as Noty from "expo-notifications";

import AddMoodModal from "../components/AddMoodModal";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/* Noty.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
}); */

interface Mood {
  id: number;
  color: string;
  value: string;
  moodID: number;
  millis: number;
}

export default class MoodTrackerScreen extends Component {
  public setState: any;
  state = {
    allMoods: [],
    date: new Date(),
    days: [],
    smallestMillis: 0,
    largestMillis: 0,
    month: "",
    modalVisible: false,
    activeDay: -1,
    monthID: -1,
    monthIndex: -1,
    year: "",
    today: 0,
    todayMillis: 0,
    expoPushToken: -1,
  };

  componentDidMount() {
    // @ts-ignore
    Fire.getMoods((allMoods: any) => {
      //const date = new Date();
      const date = this.state.date;
      const now = firebase.firestore.Timestamp.fromDate(date).toMillis();
      this.setState({
        allMoods: allMoods,
        date,
        todayMillis: now,
        smallestMillis: Math.min(...allMoods.map((e: any) => e.day)),
        largestMillis: Math.max(...allMoods.map((e: any) => e.day)),
      });
      this.getDays(now);
      /*       Notifications.registerForPushNotificationsAsync().then((token) => {
        Notifications.sendPushNotification(token);
        this.setState({ expoPushToken: token });
      }); */
    });

    // Doesn't work.......
    //Noty.addNotificationResponseReceivedListener(this._handleNotificationResponse);
  }

  /*  _handleNotification = (notification) => {
    console.log(notification);
    // this.setState({ notification: notification });
  }; */

  componentWillUnmount() {
    Fire.detachMood();
  }

  getDays = (date: number) => {
    const allMoods = this.state.allMoods;
    const lowerLimit = moment(date).startOf("month").valueOf();
    const upperLimit = moment(date).endOf("month").valueOf();
    const moods = allMoods.filter((e: any) => e.day < upperLimit && e.day >= lowerLimit);
    //console.log(moods);

    const monthDate = firebase.firestore.Timestamp.fromMillis(date).toDate();
    const month = monthDate.getMonth();
    const year = monthDate.getFullYear();
    const daysInMonth = moment(date).daysInMonth();
    // @ts-ignore
    const days = [...Array(daysInMonth).keys()].map((e, i) => {
      const day = moment().format(Number(year) + " " + Number(month + 1) + " " + Number(i + 1));
      const dayDate = moment(day, "YYYY MM DD");

      const timestampProper = new firebase.firestore.Timestamp(dayDate.unix(), 0).toDate();
      const millis = firebase.firestore.Timestamp.fromDate(timestampProper).toMillis();
      const el = {
        id: i + 1,
        value: i + 1,
        color: Colors.lightTintColor,
        moodID: 0,
        millis,
      };
      return el;
    });

    moods.map((e: any) => {
      const moodTimestamp = firebase.firestore.Timestamp.fromMillis(e.day).toDate();
      const moodDay = moodTimestamp.getDate();
      days.splice(moodDay - 1, 1, {
        id: moodDay,
        value: e.text,
        color: e.color,
        moodID: e.id,
        millis: e.day,
      });
    });

    const today = Number(moment().format("D"));

    this.setState({ days, month: monthNames[month], monthIndex: month, year, today });
  };

  toggleAddMood() {
    this.setState({ modalVisible: !this.state.modalVisible });
  }

  addMood(moodColor: string, moodText: string) {
    const days: Mood[] = this.state.days;
    const index = this.state.activeDay;
    const mood: Mood = days[index];
    mood.color = moodColor;
    mood.value = moodText;
    days[index] = mood;

    if (mood.moodID !== 0) {
      const toUpdate = { color: moodColor, text: moodText };
      Fire.updateMood(toUpdate, mood.moodID);
    } else {
      const toAdd = { color: moodColor, text: mood.value, day: mood.millis };
      //Fire.shared.addMood(toAdd, this.state.monthID);
      Fire.addMood(toAdd);
    }

    this.setState({ days, modalVisible: !this.state.modalVisible });
  }

  changeToPreviousMonth = () => {
    const index: number = this.state.monthIndex;

    const date: any = this.state.date;
    date.setMonth(date.getMonth() - 1);
    this.getDays(date);
    if (index > 0) {
      this.setState({ month: monthNames[index - 1], monthIndex: index - 1, date });
    } else {
      this.setState({ month: monthNames[11], monthIndex: 11, date });
    }
  };

  changeToNextMonth = () => {
    const index: number = this.state.monthIndex;

    const date: any = this.state.date;
    date.setMonth(date.getMonth() + 1);
    this.getDays(date);
    if (index < 11) {
      this.setState({ month: monthNames[index + 1], monthIndex: index + 1, date });
    } else {
      this.setState({ month: monthNames[0], monthIndex: 0, date });
    }
  };

  renderDay = (item: Mood, index: number) => {
    return (
      <View>
        <StatusBar />
        <View
          style={[
            styles.dayContainer,
            { backgroundColor: this.state.today === index + 1 ? Colors.lightActiveColor : "white" },
          ]}>
          <Text style={{ fontSize: 12, paddingBottom: 1 }}>Day {item.id}</Text>
          <TouchableOpacity
            style={[
              styles.dayItem,
              {
                backgroundColor: item.color,
              },
            ]}
            onPress={() => {
              if (
                (item.millis && item.millis <= this.state.largestMillis && item.millis >= this.state.smallestMillis) ||
                item.id === moment(this.state.todayMillis).toDate().getDate()
              ) {
                this.setState({ activeDay: index });
                this.toggleAddMood();
              } else {
                console.log(moment(item.millis).toDate().getDate());
                console.log(moment(this.state.todayMillis).toDate().getDate());
                console.log("Can't update this day. Out of range.");
              }
            }}>
            {/* <Text>{item.value}</Text> */}
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={require("../assets/images/header.jpg")} style={styles.headerImage}>
          <View style={styles.headerContainer}>
            <TouchableOpacity style={{ paddingHorizontal: "1%" }} onPress={() => this.changeToPreviousMonth()}>
              <Entypo name="arrow-with-circle-left" size={30} />
            </TouchableOpacity>
            <Text style={styles.header}>{this.state.month + " " + this.state.year} </Text>
            <TouchableOpacity style={{ paddingHorizontal: "1%" }} onPress={() => this.changeToNextMonth()}>
              <Entypo name="arrow-with-circle-right" size={30} />
            </TouchableOpacity>
            {/* @ts-ignore */}
            <DrawerButton navigation={this.props.navigation} />
          </View>
        </ImageBackground>
        <View style={styles.contentContainer}>
          <Modal animationType="slide" visible={this.state.modalVisible} onRequestClose={() => this.toggleAddMood()}>
            <AddMoodModal
              closeModal={() => this.toggleAddMood()}
              addMood={(moodColor: string, moodText: string) => this.addMood(moodColor, moodText)}
              day={this.state.days[this.state.activeDay]}
            />
          </Modal>
          <FlatList
            data={this.state.days}
            keyExtractor={(day: any) => day.millis}
            numColumns={3}
            renderItem={({ item, index }) => this.renderDay(item, index)}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    );
  }
}
// @ts-ignore
MoodTrackerScreen.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
    backgroundColor: Colors.lightTintColor,
    marginHorizontal: 10,
    borderRadius: 16,
    marginTop: Constants.statusBarHeight,
    marginBottom: 0.5 * Constants.statusBarHeight,
    padding: 10,
  },
  header: {
    fontSize: 20,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontWeight: "bold",
    textShadowOffset: { width: 4, height: 10 },
    textTransform: "capitalize",
  },
  headerImage: {
    color: Colors.lightTintColor,
    justifyContent: "center",
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    borderWidth: 6,
    borderColor: Colors.lightTintColor,
    marginBottom: 70,
  },
  dayContainer: {
    margin: 4,
    padding: 4,
    borderWidth: 2,
    borderRadius: 12,
    alignItems: "center",
    width: 90,
  },
  dayItem: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    borderWidth: 2,
    borderRadius: 32,
    width: 60,
    height: 60,
  },
});
