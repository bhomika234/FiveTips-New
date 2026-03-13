import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { DrawerContentComponentProps } from "@react-navigation/drawer";

import { colors, typography } from "../theme";
import {
  LoginScreen,
  Intro,
  CreateAccount,
  ForgotPassword,
  ResetPassword,
} from "../Screens";
import { DrawerNavigator } from "./DrawerNavigator";

export type StackParamList = {
  SplashScreen2: undefined;
  SplashScreen4: undefined;
  SplashScreen5: undefined;
  Intro: undefined;
  Login: undefined;
  CreateAccount: undefined;
  ForgotPassword: undefined;
  ResetPassword: undefined;
  SignupPhase1: undefined;
  SignupPhase2: undefined;
  LogoScreen: undefined;
  Onboarding: undefined;
  ProfileScreen: undefined;
  FilterSort: undefined;
  NavBar: undefined;
  Main: undefined;
};

type TabParamList = {
  Home: undefined;
  Favorites: undefined;
  BookNow: undefined;
  Notification: undefined;
  Chat: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

/* -------------------- TABS -------------------- */

const NavBarWrapper = () => {
  // Create minimal mock props for NavBar when used as standalone screen
  const mockProps = {} as DrawerContentComponentProps;

  return <NavBar {...mockProps} />;
};

/* -------------------- MAIN NAVIGATION -------------------- */

export const Navigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Main"
    >
      <Stack.Screen name="Intro" component={Intro} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="CreateAccount" component={CreateAccount} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="Main" component={DrawerNavigator} />
      {/* <Stack.Screen name="NavBar" component={NavBarWrapper} /> */}
    </Stack.Navigator>
  );
};
