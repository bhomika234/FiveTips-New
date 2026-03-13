import "react-native-gesture-handler";
import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { UserProvider, UserContext } from "./src/context/UserContext";
import { AppNavigator } from "./src/navigation/AppNavigator";
import { LoginScreen } from "./src/Screens/index";

// Simple loading component
const SimpleLoader = () => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.loaderContainer,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <Text style={styles.loaderText}>MyHomes</Text>
    </View>
  );
};

function AppContent() {
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SimpleLoader />;
  }

  return user ? (
    <AppNavigator />
  ) : (
    <LoginScreen navigation={undefined as any} route={undefined as any} />
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <UserProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer>
            <AppContent />
          </NavigationContainer>
        </GestureHandlerRootView>
      </UserProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1A237E",
  },
  loaderText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});
