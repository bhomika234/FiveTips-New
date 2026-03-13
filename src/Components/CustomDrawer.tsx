import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DrawerContentComponentProps } from "@react-navigation/drawer";

interface NavItem {
  id: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: string;
}

const navItems: NavItem[] = [
  { id: "1", label: "Profile", icon: "person-outline", route: "ProfileDrawer" },
  { id: "2", label: "Contact us", icon: "mail-outline", route: "ContactScreen" },
  { id: "3", label: "Favourites", icon: "heart-outline", route: "FavouriteScreen" },
  { id: "4", label: "Filters", icon: "options-outline", route: "FilterSortScreen" }, // ✅ Added
  { id: "5", label: "About us", icon: "information-circle-outline", route: "AboutScreen" },
  { id: "6", label: "Help", icon: "cloud-outline", route: "HelpScreen" },
  { id: "7", label: "Terms & conditions", icon: "document-text-outline", route: "TCS" },
  { id: "8", label: "Settings", icon: "settings-outline", route: "SettingsScreen" },
];

export function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { navigation } = props;

  const handleNavPress = (item: NavItem) => {
    navigation.navigate(item.route as never);
    navigation.closeDrawer();
  };

  const handleLogout = () => {
    console.log("Logging out...");
    // logout logic here
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1A237E" />

      {/* Logo Section */}
      <View style={styles.logoSection}>
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Ionicons name="home" size={32} color="#FFFFFF" />
          </View>
          <Text style={styles.logoText}>MyHomes</Text>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Navigation Items */}
      <ScrollView
        style={styles.navContainer}
        showsVerticalScrollIndicator={false}
      >
        {navItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.navItem}
            onPress={() => handleNavPress(item)}
            activeOpacity={0.7}
          >
            <View style={styles.navItemContent}>
              <Ionicons name={item.icon} size={24} color="#FFFFFF" />
              <Text style={styles.navItemText}>{item.label}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Logout */}
      <TouchableOpacity
        style={styles.logoutSection}
        onPress={handleLogout}
        activeOpacity={0.7}
      >
        <View style={styles.logoutContent}>
          <Ionicons name="log-out-outline" size={24} color="#FFFFFF" />
          <Text style={styles.logoutText}>Logout</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A237E",
  },
  logoSection: {
    paddingVertical: 30,
    alignItems: "center",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FFFFFF20",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  logoText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  divider: {
    height: 1,
    backgroundColor: "#FFFFFF30",
    marginHorizontal: 20,
    marginVertical: 10,
  },
  navContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  navItem: {
    paddingVertical: 15,
    marginVertical: 5,
  },
  navItemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  navItemText: {
    fontSize: 16,
    color: "#FFFFFF",
    marginLeft: 20,
    fontWeight: "500",
  },
  logoutSection: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  logoutContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoutText: {
    fontSize: 16,
    color: "#FFFFFF",
    marginLeft: 20,
    fontWeight: "600",
  },
});