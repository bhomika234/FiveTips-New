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
  Favorites: undefined;
  BookNow: undefined;
  Notification: undefined;
  Chat: undefined;
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
        tabBarStyle: { 
          backgroundColor: '#292766',
          height: 90,
          paddingBottom: 15,
          paddingTop: 15,
          paddingHorizontal: 10,
          borderRadius: 0,
          elevation: 12,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.15,
          shadowRadius: 8,
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#FFFFFF80',
        tabBarLabelStyle: {
          fontFamily: typography.fonts.poppins.bold,
          fontSize: 12,
          marginTop: 8,
        },
        tabBarItemStyle: {
          paddingVertical: 8,
          paddingHorizontal: 5,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={28} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Favorites"
        component={HomeScreen}
        options={{
          tabBarLabel: "Favorites",
          tabBarIcon: ({ color }) => (
            <Ionicons name="heart" size={28} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="BookNow"
        component={HomeScreen}
        options={{
          tabBarLabel: "Book now",
          tabBarIcon: ({ color }) => (
            <Ionicons name="calendar" size={28} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Notification"
        component={HomeScreen}
        options={{
          tabBarLabel: "Notification",
          tabBarIcon: ({ color }) => (
            <Ionicons name="notifications" size={28} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Chat"
        component={HomeScreen}
        options={{
          tabBarLabel: "Chat",
          tabBarIcon: ({ color }) => (
            <Ionicons name="chatbubble" size={28} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={28} color={color} />
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
