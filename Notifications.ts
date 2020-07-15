import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import { Notifications } from "expo";
import { Platform } from "react-native";

async function registerForPushNotificationsAsync() {
  if (Platform.OS === "android") {
    Notifications.createChannelAndroidAsync("default", {
      name: "default",
      sound: true,
      priority: "max",
      vibrate: [0, 250, 250, 250],
    });
  }
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      // @ts-ignore
      alert("Failed to get push token for push notification!");
      return;
    }
    const token = await Notifications.getExpoPushTokenAsync();
    return token;
    //console.log(token);
    //this.setState({ expoPushToken: token });
  } else {
    // @ts-ignore
    alert("Must use physical device for Push Notifications");
  }
}

async function sendPushNotification(expoPushToken: any) {
  console.log(expoPushToken);
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Original Title",
    body: "And here is the body!",
    data: { data: "goes here" },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

export default { registerForPushNotificationsAsync, sendPushNotification };
