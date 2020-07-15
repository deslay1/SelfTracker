import React from "react";
import { Feather } from "@expo/vector-icons";

import Colors from "../constants/Colors";

export default function TabIcon(props: any) {
  return (
    <Feather
      name={props.name}
      size={22}
      style={{ marginBottom: -3 }}
      color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
}
