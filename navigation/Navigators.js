import React, { Component } from "react";
import { Dimensions } from "react-native";

// Navigators
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";

// Screens
import ListMenuScreen from "../screens/ListMenuScreen";
import ItemListScreen from "../screens/ItemListScreen";
import MoodTrackerScreen from "../screens/MoodTrackerScreen";
import TemporaryScreen from "../screens/TemporaryScreen";

import TabIcon from "../components/TabIcon";
import SideBar from "../components/SideBar";

import Colors from "../constants/Colors";

import { Feather } from "@expo/vector-icons";

//screens within main tab screen
const MenuStack = createStackNavigator(
  {
    ListMenu: ListMenuScreen,
    ItemList: ItemListScreen,
  },
  {
    initialRouteName: "ListMenu",
    navigationOptions: {
      tabBarLabel: "Home",
      tabBarIcon: ({ focused }) => <TabIcon focused={focused} name={"book"} />,
    },
  }
);

const MoodStack = createStackNavigator(
  {
    MoodTracker: MoodTrackerScreen,
  },
  {
    navigationOptions: {
      tabBarLabel: "Mood",
      tabBarIcon: ({ focused }) => <TabIcon focused={focused} name={"eye"} />,
    },
  }
);

const TabNavigator = createBottomTabNavigator(
  {
    MenuStack,
    MoodStack,
  },
  {
    initialRouteName: "MenuStack",
  }
);

const TemporaryStack = createStackNavigator({
  Temporary: TemporaryScreen,
});

const Drawernavigator = createDrawerNavigator(
  {
    TabNavigator: {
      screen: TabNavigator,
      navigationOptions: {
        title: "Home",
        drawerIcon: ({ tintColor }) => <Feather name="home" size={20} color={tintColor} />,
      },
    },
    TemporaryStack: {
      screen: TemporaryStack,
      navigationOptions: {
        title: "Profile",
        drawerIcon: ({ tintColor }) => <Feather name="user" size={20} color={tintColor} />,
      },
    },
  },
  {
    initialRouteName: "TabNavigator",
    initialRouteParams: {
      title: "Home",
    },
    //drawerType: "slide",
    contentComponent: (props) => <SideBar {...props} />,
    drawerWidth: Dimensions.get("window").width * 0.85,
    hideStatusBar: true,
    contentOptions: {
      activeBackgroundColor: Colors.lightTintColor,
      activeTintColor: Colors.tintColor,
      itemsContainerStyle: {
        marginTop: 16,
        marginHorizontal: 10,
      },
      itemStyle: {
        borderRadius: 8,
      },
    },
  }
);

export default createAppContainer(
  createSwitchNavigator(
    {
      Main: Drawernavigator,
      //Register: RegisterScreen,
      //Login: LoginScreen,
      //Loading: LoadingScreen,
    } /* ,
      {
        initialRouteName: "Loading",
      } */
  )
);
