import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
} from "react-native";
import { Screen } from "../../../../Components";
import { colors } from "../../../../theme";
import { Ionicons, Feather } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export function FilterSortScreen(props: any) {
  const { navigation } = props;
  const [propertyType, setPropertyType] = useState("All");
  const [category, setCategory] = useState("Long Lease");
  const [features, setFeatures] = useState(["2 Bedrooms"]);
  const [facilities, setFacilities] = useState(["Parking", "Free Wifi", "Kids play area"]);

  // Helper to toggle multi-select chips
  const toggleChip = (item: string, state: any, setState: any) => {
    state.includes(item) 
      ? setState(state.filter((i: string) => i !== item)) 
      : setState([...state, item]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF" }}>
      <Screen preset="scroll" contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Filters</Text>
        </View>

        {/* Location Search */}
        <Text style={styles.sectionTitle}>Location</Text>
        <TouchableOpacity 
          style={styles.searchBar}
          onPress={() => navigation.navigate('FilterSort')}
        >
          <TextInput placeholder="Search Location" style={styles.input} editable={false} />
          <Feather name="search" size={20} color="#666" />
        </TouchableOpacity>

        {/* Property Type Grid */}
        <Text style={styles.sectionTitle}>Property type</Text>
        <View style={styles.chipGrid}>
          {["Apartments", "Maisonette", "Terraces", "Pent-House", "Semi-detached", "Detached", "All"].map((type) => (
            <Chip 
              key={type} 
              label={type} 
              active={propertyType === type} 
              onPress={() => setPropertyType(type)} 
            />
          ))}
        </View>

        {/* Categories */}
        <Text style={styles.sectionTitle}>Categories</Text>
        <View style={styles.chipGrid}>
          {["Short Let", "Medium Lease", "Long Lease", "Rent"].map((cat) => (
            <Chip 
              key={cat} 
              label={cat} 
              active={category === cat} 
              onPress={() => setCategory(cat)} 
            />
          ))}
        </View>

        {/* Other Features */}
        <Text style={styles.sectionTitle}>Other Features</Text>
        <View style={styles.chipGrid}>
          {["2 Bedrooms", "3 Bedrooms", "4 Bedrooms", "5 Bedrooms"].map((feat) => (
            <Chip 
              key={feat} 
              label={feat} 
              active={features.includes(feat)} 
              onPress={() => toggleChip(feat, features, setFeatures)} 
            />
          ))}
        </View>

        {/* Facilities */}
        <Text style={styles.sectionTitle}>Facilities</Text>
        <View style={styles.chipGrid}>
          {["Parking", "Free Wifi", "Kitchen", "Swimming Pool", "Garden", "Sea View", "Refreshment", "Kids play area"].map((fac) => (
            <Chip 
              key={fac} 
              label={fac} 
              active={facilities.includes(fac)} 
              onPress={() => toggleChip(fac, facilities, setFacilities)} 
            />
          ))}
        </View>

        {/* Price Range Slider Mockup */}
        <Text style={styles.sectionTitle}>Price Range</Text>
        <View style={styles.sliderSection}>
          <View style={styles.track}>
            <View style={styles.activeTrack} />
            <View style={styles.thumb} />
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceText}>$2000</Text>
            <Text style={styles.priceText}>$16000</Text>
          </View>
        </View>

        {/* Ratings */}
        <Text style={styles.sectionTitle}>Ratings</Text>
        <View style={styles.ratingRow}>
           <Ionicons name="star" size={24} color="#292766" />
           <Ionicons name="star-outline" size={24} color="#CCC" />
           <Ionicons name="star-outline" size={24} color="#CCC" />
           <Ionicons name="star-outline" size={24} color="#CCC" />
           <Ionicons name="star-outline" size={24} color="#CCC" />
        </View>
      </Screen>

      {/* Fixed Bottom Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.clearBtn}>
          <Text style={styles.clearBtnText}>Clear All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.applyBtn}>
          <Text style={styles.applyBtnText}>Apply Filters</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Sub-component for Chips
const Chip = ({ label, active, onPress }: any) => (
  <TouchableOpacity 
    onPress={onPress}
    style={[styles.chip, active && styles.activeChip]}
  >
    <Text style={[styles.chipText, active && styles.activeChipText]}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, paddingBottom: 120 },
  header: { paddingVertical: 20, alignItems: "center" },
  headerTitle: { fontSize: 22, fontWeight: "bold", color: "#1A1E44" },
  sectionTitle: { fontSize: 16, fontWeight: "700", color: "#1A1E44", marginTop: 25, marginBottom: 15 },
  searchBar: { 
    flexDirection: "row", 
    backgroundColor: "#FFF", 
    borderWidth: 1, 
    borderColor: "#DDD", 
    borderRadius: 12, 
    paddingHorizontal: 15, 
    height: 50, 
    alignItems: "center" 
  },
  input: { flex: 1, color: "#333" },
  chipGrid: { flexDirection: "row", flexWrap: "wrap", marginHorizontal: -5 },
  chip: { 
    paddingHorizontal: 15, 
    paddingVertical: 10, 
    borderRadius: 8, 
    borderWidth: 1, 
    borderColor: "#DDD", 
    margin: 5,
    backgroundColor: "#FFF" 
  },
  activeChip: { backgroundColor: "#2D2B6B", borderColor: "#2D2B6B" },
  chipText: { color: "#444", fontSize: 13 },
  activeChipText: { color: "#FFF", fontWeight: "600" },
  sliderSection: { marginTop: 10 },
  track: { height: 4, backgroundColor: "#EEE", borderRadius: 2, position: "relative", justifyContent: "center" },
  activeTrack: { width: "70%", height: 4, backgroundColor: "#2D2B6B", borderRadius: 2 },
  thumb: { position: "absolute", left: "70%", width: 16, height: 16, borderRadius: 8, backgroundColor: "#2D2B6B" },
  priceRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  priceText: { fontSize: 12, color: "#666" },
  ratingRow: { flexDirection: "row", gap: 8, marginBottom: 20 },
  footer: { 
    flexDirection: "row", 
    padding: 20, 
    backgroundColor: "#FFF", 
    borderTopWidth: 1, 
    borderTopColor: "#EEE",
    position: 'absolute',
    bottom: 0,
    width: width
  },
  clearBtn: { flex: 1, height: 50, justifyContent: "center", alignItems: "center", borderRadius: 12, borderWidth: 1, borderColor: "#2D2B6B", marginRight: 10 },
  clearBtnText: { color: "#2D2B6B", fontWeight: "bold" },
  applyBtn: { flex: 1, height: 50, backgroundColor: "#2D2B6B", justifyContent: "center", alignItems: "center", borderRadius: 12 },
  applyBtnText: { color: "#FFF", fontWeight: "bold" },
});