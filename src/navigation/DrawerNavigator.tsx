import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { HomeScreen, Profile, NavBar } from "../Screens";
import { colors } from "../theme";
import { DrawerContentComponentProps, DrawerNavigationProp } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

export function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props: DrawerContentComponentProps) => <NavBar {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#1A237E",
          width: 280,
        },
        drawerType: "slide",
        headerShown: true,
        headerStyle: {
          backgroundColor: "#1A237E",
        },
        headerTintColor: "#FFFFFF",
        headerLeft: ({ navigation }: { navigation: DrawerNavigationProp<any, any> }) => (
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={{ marginLeft: 15 }}
          >
            <Ionicons name="menu" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        ),
      }}
    >
      <Drawer.Screen
        name="HomeDrawer"
        component={HomeScreen}
        options={{
          title: "MyHomes",
          headerStyle: {
            backgroundColor: "#1A237E",
          },
          headerTintColor: "#FFFFFF",
        }}
      />
      <Drawer.Screen
        name="ProfileDrawer"
        component={Profile}
        options={{
          title: "Profile",
          headerStyle: {
            backgroundColor: "#1A237E",
          },
          headerTintColor: "#FFFFFF",
        }}
      />
    </Drawer.Navigator>
  );
}
