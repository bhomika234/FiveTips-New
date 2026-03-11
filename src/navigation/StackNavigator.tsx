import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { colors, typography } from "../theme";
import {
  HomeScreen,
  Profile,
  LoginScreen,
  Intro,
  CreateAccount,
  ForgotPassword,
  ResetPassword,
} from "../Screens";

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
  Main: undefined;
};

type TabParamList = {
  Home: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

/* -------------------- TABS -------------------- */

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: colors.white },
        tabBarActiveTintColor: colors.primary,
        tabBarLabelStyle: {
          fontFamily: typography.fonts.poppins.bold,
          fontSize: 13,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
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
      <Stack.Screen name="Main" component={Tabs} />
    </Stack.Navigator>
  );
};
