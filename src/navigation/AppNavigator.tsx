import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { UserContext } from "../context/UserContext";
import { AuthNavigator } from "./AuthNavigator";
import { TabNavigator } from "./TabNavigator";
import { DrawerNavigator } from "./DrawerNavigator";

const Stack = createNativeStackNavigator();

export function AppNavigator() {
  // const { user } = useContext(UserContext);
  const user = true;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="Main" component={DrawerNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
}
