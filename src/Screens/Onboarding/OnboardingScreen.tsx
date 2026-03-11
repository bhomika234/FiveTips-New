import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";

const { width, height } = Dimensions.get("window");

interface OnboardingScreenProps {
  navigation: any;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const splashScreens = [
    {
      id: 1,
      title: "Welcome to My Homes",
      subtitle: "Explore a World of Tailored Properties",
      description: "Designed to Fit Your Lifestyle with MyHomes",
      image: require("../../assets/Images/home2.png"),
    },
    {
      id: 2,
      title: "Discover Properties",
      subtitle: "From Cozy Apartments to Spacious Villas",
      description: "Your Perfect Match Awaits",
      image: require("../../assets/Images/home3.png"),
    },
    {
      id: 3,
      title: "Start your Search",
      subtitle: "No Matter the Property, We've Got You Covered",
      description: "Start Your Search with My Homes",
      image: require("../../assets/Images/home2.png"),
    },
  ];

  const handleNext = () => {
    if (currentIndex < splashScreens.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      scrollViewRef.current?.scrollTo({
        x: nextIndex * width,
        animated: true,
      });
    } else {
      navigation.navigate("Main");
    }
  };

  const handleSkip = () => {
    navigation.navigate("Main");
  };

  const handleDotPress = (index: number) => {
    setCurrentIndex(index);
    scrollViewRef.current?.scrollTo({
      x: index * width,
      animated: true,
    });
  };

  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / width);
    setCurrentIndex(index);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        style={styles.scrollView}
      >
        {splashScreens.map((screen) => (
          <View key={screen.id} style={[styles.slide, { width }]}>
            <Image source={screen.image} style={styles.backgroundImage} resizeMode="cover" />
            <View style={styles.overlayContainer}>
              <View style={styles.contentContainer}>
                <Text style={styles.title}>{screen.title}</Text>
                <Text style={styles.subtitle}>{screen.subtitle}</Text>
                <Text style={styles.description}>{screen.description}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.bottomContainer}>
        <View style={styles.dotsContainer}>
          {splashScreens.map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleDotPress(index)}
              style={[
                styles.dot,
                { backgroundColor: currentIndex === index ? "#292766" : "#E0E0E0" },
              ]}
            />
          ))}
        </View>

        <View style={styles.buttonContainer}>
          {currentIndex < splashScreens.length - 1 && (
            <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
              <Text style={styles.skipButtonText}>Skip</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity
            onPress={handleNext}
            style={styles.nextButton}
          >
            <Text style={styles.nextButtonText}>
              {currentIndex === splashScreens.length - 1 ? "Get Started" : "Next"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
  },
  slide: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
  },
  overlayContainer: {
    width: "100%",
    backgroundColor: "#292766",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    paddingTop: 40,
    paddingBottom: 120,
  },
  contentContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 20,
  },
  bottomContainer: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    paddingHorizontal: 30,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  skipButton: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  skipButtonText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "500",
  },
  nextButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    height: 50,
    paddingHorizontal: 30,
    flex: 1,
    marginLeft: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  nextButtonText: {
    color: "#292766",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default OnboardingScreen;
