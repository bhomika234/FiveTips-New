import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Text, Screen } from "../../Components";
import { AppStackScreenProps } from "../../utils/interfaces";
import { colors, spacing } from "../../theme";
import { UserContext } from "../../context/UserContext";
import { WithLocalSvg } from "react-native-svg/css";
import { Images } from "../../assets/Images";
import { Ionicons } from "@expo/vector-icons";

export function ContactSupport(props: AppStackScreenProps<"ContactSupport">) {
  const { user } = React.useContext(UserContext) as { user: any };
  const { navigation } = props;
  const listOptions = [
    {
      id: 0,
      title: "Customer Support",
      icon: Images.help,
      onPress: () => props.navigation.navigate("Subscription"),
    },
    {
      id: 1,
      title: "WhatsApp",
      icon: Images.whatsapp,
      onPress: () => props.navigation.navigate("TermsConditions"),
    },
    {
      id: 2,
      title: "Website",
      icon: Images.website,
      onPress: () => props.navigation.navigate("PrivacyPolicy"),
    },
    {
      id: 3,
      title: "Facebook",
      icon: Images.facebook,
      onPress: () => props.navigation.navigate("ContactSupport"),
    },
    {
      id: 4,
      title: "Twitter",
      icon: Images.twitter,
      onPress: () => {},
    },
    {
      id: 5,
      title: "Instagram",
      icon: Images.instagram,
      onPress: () => {},
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#1A1E44" />
        </TouchableOpacity>
        <Text weight="bold" text="Contact us" style={styles.headerTitle} />
        <View style={styles.headerSpacer} />
      </View>

      {/* Brand Section */}
      <View style={styles.brandSection}>
        <Text weight="bold" text="MyHomes" style={styles.brandName} />
        <Text
          weight="medium"
          text="Hello there, how can we help?"
          style={styles.subtitle}
        />
      </View>

      {/* Contact Options List */}
      <View style={styles.listContainer}>
        <FlatList
          scrollEnabled={false}
          data={listOptions}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.listItem}
              activeOpacity={0.7}
              onPress={() => item.onPress()}
            >
              <View style={styles.iconContainer}>
                <WithLocalSvg asset={item.icon} />
              </View>
              <Text
                weight="semiBold"
                text={item.title}
                style={styles.listText}
              />
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    color: "#1A1E44",
    fontWeight: "600",
  },
  headerSpacer: {
    width: 40,
  },
  brandSection: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
  },
  brandName: {
    fontSize: 32,
    color: "#1A1E44",
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listContent: {
    gap: 12,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#F8F9FA",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  listText: {
    fontSize: 16,
    color: "#212121",
    flex: 1,
    fontWeight: "600",
  },
});
