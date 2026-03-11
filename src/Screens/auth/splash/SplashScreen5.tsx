import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Screen, Text } from "../../../Components";
import { AppStackScreenProps } from "../../../utils/interfaces";
import { colors, spacing } from "../../../theme";
import { LinearGradient } from "expo-linear-gradient";

interface SplashScreen5Props extends AppStackScreenProps<"SplashScreen5"> {}

export function SplashScreen5(props: SplashScreen5Props) {
  const handleStart = () => {
    props.navigation.navigate("GettingStart");
  };

  return (
    <Screen preset="fixed" contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        {/* <Image 
          source={require("../../../../assets/splash _screen _5.png")} 
          style={styles.backgroundImage}
          resizeMode="cover"
        /> */}
      </View>
      
      <LinearGradient 
        colors={["rgba(0,0,0,0)", "rgba(52, 27, 103, 0.95)"]} 
        style={styles.gradientOverlay}
      />
      
      <View style={styles.contentContainer}>
        <Text 
          text="Start your Search" 
          style={styles.title}
          weight="bold"
        />
        <Text 
          text="No Matter the Property, We've Got You Covered - Start Your Search with My Homes" 
          style={styles.subtitle}
          weight="medium"
        />
        
        <TouchableOpacity style={styles.startButton} onPress={handleStart}>
          <Text text="Get Started" style={styles.startButtonText} weight="semiBold" />
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
  },
  contentContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  title: {
    color: colors.white,
    fontSize: 42,
    lineHeight: 50,
    marginBottom: spacing.lg,
    textAlign: 'center',
    fontWeight: '800',
  },
  subtitle: {
    color: colors.white,
    fontSize: 18,
    lineHeight: 28,
    textAlign: 'center',
    marginBottom: spacing.xxl,
    opacity: 0.95,
    fontWeight: '600',
  },
  startButton: {
    backgroundColor: colors.white,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xxl,
    borderRadius: 30,
    alignItems: 'center',
    alignSelf: 'center',
    minWidth: 180,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  startButtonText: {
    color: '#341B67',
    fontSize: 18,
    fontWeight: '700',
  },
});
