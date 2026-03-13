import "react-native-gesture-handler";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { TouchableOpacity, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {
  HomeScreen,
  // Profile,
  // NavBar,
  // History,
  // Subscription,
  // ContactSupport,
  Profile,
} from "../Screens";
import { colors, typography } from "../theme";
import {
  DrawerContentComponentProps,
  DrawerNavigationProp,
} from "@react-navigation/drawer";
import { CustomDrawerContent } from "../Components/CustomDrawer";
const Tab = createBottomTabNavigator();

const Drawer = createDrawerNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#292766",
          height: 90,
          paddingBottom: 15,
          paddingTop: 15,
          paddingHorizontal: 10,
          borderRadius: 0,
          elevation: 12,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.15,
          shadowRadius: 8,
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "#FFFFFF80",
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
export function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props: DrawerContentComponentProps) => (
        <CustomDrawerContent {...props} />
      )}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: "#1A237E",
          width: 280,
        },
        drawerType: "slide",
        headerStyle: {
          backgroundColor: "#1A237E",
        },
        headerTintColor: "#FFFFFF",
        // headerLeft: ({
        //   navigation,
        // }: {
        //   navigation: DrawerNavigationProp<any, any>;
        // }) => (
        //   <TouchableOpacity
        //     onPress={() => navigation.openDrawer()}
        //     style={{ marginLeft: 15 }}
        //   >
        //     <Ionicons name="menu" size={24} color="#FFFFFF" />
        //   </TouchableOpacity>
        // ),
      }}
    >
      <Drawer.Screen
        name="HomeDrawer"
        component={Tabs}
        options={{
          title: "MyHomes",
          headerStyle: {
            backgroundColor: "#1A237E",
          },
          headerTintColor: "#FFFFFF",
        }}
      />
      {/* <Drawer.Screen
        name="ProfileDrawer"
        component={Profile}
        options={{
          title: "Profile",
          headerStyle: {
            backgroundColor: "#1A237E",
          },
          headerTintColor: "#FFFFFF",
        }}
      /> */}
      {/* <Drawer.Screen
        name="HistoryDrawer"
        component={History}
        options={{
          title: "History",
          headerStyle: {
            backgroundColor: "#1A237E",
          },
          headerTintColor: "#FFFFFF",
        }}
      />
      <Drawer.Screen
        name="SubscriptionDrawer"
        component={Subscription}
        options={{
          title: "Subscription",
          headerStyle: {
            backgroundColor: "#1A237E",
          },
          headerTintColor: "#FFFFFF",
        }}
      /> */}
      {/* <Drawer.Screen
        name="ContactSupportDrawer"
        component={ContactSupport}
        options={{
          title: "Contact Support",
          headerStyle: {
            backgroundColor: "#1A237E",
          },
          headerTintColor: "#FFFFFF",
        }}
      /> */}
    </Drawer.Navigator>
  );
}
