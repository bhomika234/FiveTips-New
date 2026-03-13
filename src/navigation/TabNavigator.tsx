import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { DrawerNavigator } from "./DrawerNavigator";

const Tab = createBottomTabNavigator();

export function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#1A237E",
          borderTopColor: "#1A237E",
        },
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "#AAAAAA",
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={DrawerNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
          tabBarLabel: "Home",
        }}
      />
      
      {/* <Tab.Screen
        name="Profile"
        component={Profile}
        // @ts-ignore
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
          tabBarLabel: "Profile",
        }}
      /> */}
    </Tab.Navigator>
  );
}
