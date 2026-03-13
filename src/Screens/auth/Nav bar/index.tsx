import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { UserContext } from "../../../context/UserContext";

interface NavItem {
  id: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
}

const navItems: NavItem[] = [
  { id: "1", label: "Profile", icon: "person-outline" },
  { id: "2", label: "Contact us", icon: "mail-outline" }, 
  { id: "3", label: "Favourites", icon: "heart-outline" },
  { id: "4", label: "About us", icon: "information-circle-outline" },
  { id: "5", label: "Help", icon: "cloud-outline" }, 
  { id: "6", label: "Terms & conditions", icon: "document-text-outline" },
  { id: "7", label: "Settings", icon: "settings-outline" },
];

export function NavBar(props: DrawerContentComponentProps) {
  const { navigation } = props;
  const { logout } = useContext(UserContext);

  const handleNavPress = (item: NavItem) => {
    // Handle navigation based on item
    console.log(`Navigating to: ${item.label}`);
    
    // Close drawer and navigate
    switch(item.label) {
      case 'Profile':
        navigation.navigate('ProfileDrawer');
        break;
      case 'Contact us':
        // Navigate to contact screen
        break;
      case 'Favourites':
        // Navigate to favourites screen
        break;
      case 'About us':
        // Navigate to about screen
        break;
      case 'Help':
        // Navigate to help screen
        break;
      case 'Terms & conditions':
        // Navigate to terms screen
        break;
      case 'Settings':
        // Navigate to settings screen
        break;
      default:
        break;
    }
    
    navigation.closeDrawer();
  };

  const handleLogout = () => {
    // Handle logout logic
    console.log("Logging out...");
    logout();
    // Navigation will be handled by App component when user state changes
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

      {/* Divider Line */}
      <View style={styles.divider} />

      {/* Navigation Items */}
      <ScrollView style={styles.navContainer} showsVerticalScrollIndicator={false}>
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

      {/* Bottom Divider */}
      <View style={styles.divider} />

      {/* Logout Section */}
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
    backgroundColor: "#1A237E", // Dark blue background
  },
  logoSection: {
    paddingVertical: 30,
    alignItems: "center",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
    marginTop: 10,
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