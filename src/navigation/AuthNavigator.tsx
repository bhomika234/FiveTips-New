import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen, ForgotPassword, CreateAccount } from "../Screens";

const Stack = createNativeStackNavigator();

export function AuthNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#1A237E",
        },
        headerTintColor: "#FFFFFF",
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        // @ts-ignore
        options={{ title: "Forgot Password" }}
      />
      <Stack.Screen
        name="CreateAccount"
        component={CreateAccount}
        // @ts-ignore
        options={{ title: "Create Account" }}
      />
    </Stack.Navigator>
  );
}
