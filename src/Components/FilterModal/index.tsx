import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
  Modal,
} from "react-native";
import { colors } from "../../theme";
import { Ionicons, Feather } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

interface FilterOptions {
  propertyType: string;
  category: string;
  features: string[];
  facilities: string[];
  location: string;
  minPrice: string;
  maxPrice: string;
  rating: number;
}

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: FilterOptions) => void;
  onClear: () => void;
  initialFilters?: Partial<FilterOptions>;
}

const propertyTypes = ["Apartments", "Maisonette", "Terraces", "Pent-House", "Semi-detached", "Detached", "All"];
const categories = ["Short Let", "Medium Lease", "Long Lease", "Rent"];
const bedroomFeatures = ["2 Bedrooms", "3 Bedrooms", "4 Bedrooms", "5 Bedrooms"];
const facilities = ["Parking", "Free Wifi", "Kitchen", "Swimming Pool", "Garden", "Sea View", "Refreshment", "Kids play area"];

export function FilterModal({ visible, onClose, onApply, onClear, initialFilters }: FilterModalProps) {
  const [propertyType, setPropertyType] = useState(initialFilters?.propertyType || "All");
  const [category, setCategory] = useState(initialFilters?.category || "Long Lease");
  const [features, setFeatures] = useState(initialFilters?.features || ["2 Bedrooms"]);
  const [selectedFacilities, setSelectedFacilities] = useState(initialFilters?.facilities || ["Parking", "Free Wifi", "Kids play area"]);
  const [location, setLocation] = useState(initialFilters?.location || "");
  const [minPrice, setMinPrice] = useState(initialFilters?.minPrice || "2000");
  const [maxPrice, setMaxPrice] = useState(initialFilters?.maxPrice || "16000");
  const [rating, setRating] = useState(initialFilters?.rating || 4.2);

  // Helper to toggle multi-select chips
  const toggleChip = (item: string, state: string[], setState: React.Dispatch<React.SetStateAction<string[]>>) => {
    state.includes(item) 
      ? setState(state.filter((i: string) => i !== item)) 
      : setState([...state, item]);
  };

  const handleApply = () => {
    const filters: FilterOptions = {
      propertyType,
      category,
      features,
      facilities: selectedFacilities,
      location,
      minPrice,
      maxPrice,
      rating,
    };
    onApply(filters);
    onClose();
  };

  const handleClear = () => {
    setPropertyType("All");
    setCategory("Long Lease");
    setFeatures(["2 Bedrooms"]);
    setSelectedFacilities(["Parking", "Free Wifi", "Kids play area"]);
    setLocation("");
    setMinPrice("2000");
    setMaxPrice("16000");
    setRating(4.2);
    onClear();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Ionicons name="close" size={24} color="#1A1E44" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Filters</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Location Search */}
          <Text style={styles.sectionTitle}>Location</Text>
          <View style={styles.searchBar}>
            <Feather name="search" size={20} color="#666" />
            <TextInput 
              placeholder="Search Location" 
              style={styles.input} 
              value={location}
              onChangeText={setLocation}
            />
          </View>

          {/* Property Type Grid */}
          <Text style={styles.sectionTitle}>Property type</Text>
          <View style={styles.chipGrid}>
            {propertyTypes.map((type) => (
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
            {categories.map((cat) => (
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
            {bedroomFeatures.map((feat) => (
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
            {facilities.map((fac) => (
              <Chip 
                key={fac} 
                label={fac} 
                active={selectedFacilities.includes(fac)} 
                onPress={() => toggleChip(fac, selectedFacilities, setSelectedFacilities)} 
              />
            ))}
          </View>

          {/* Price Range Slider Mockup */}
          <Text style={styles.sectionTitle}>Price Range</Text>
          <View style={styles.sliderSection}>
            <View style={styles.track}>
              <View style={[styles.activeTrack, { width: "70%" }]} />
              <View style={[styles.thumb, { left: "70%" }]} />
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.priceText}>${minPrice}</Text>
              <Text style={styles.priceText}>${maxPrice}</Text>
            </View>
          </View>

          {/* Ratings */}
          <Text style={styles.sectionTitle}>Ratings</Text>
          <View style={styles.ratingRow}>
            <Text style={styles.ratingText}>{rating}</Text>
            <View style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Ionicons
                  key={star}
                  name={star <= Math.floor(rating) ? "star" : "star-outline"}
                  size={20}
                  color="#292766"
                />
              ))}
            </View>
          </View>
        </ScrollView>

        {/* Fixed Bottom Buttons */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.clearBtn} onPress={handleClear}>
            <Text style={styles.clearBtnText}>Clear All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.applyBtn} onPress={handleApply}>
            <Text style={styles.applyBtnText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

// Sub-component for Chips
interface ChipProps {
  label: string;
  active: boolean;
  onPress: () => void;
}

const Chip = ({ label, active, onPress }: ChipProps) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.chip, active && styles.activeChip]}
  >
    <Text style={[styles.chipText, active && styles.activeChipText]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  header: { 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-between",
    paddingVertical: 20, 
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE"
  },
  headerTitle: { fontSize: 22, fontWeight: "bold", color: "#1A1E44" },
  closeBtn: { padding: 5 },
  headerSpacer: { width: 34 }, // Same width as close button for centering
  content: { flex: 1, paddingHorizontal: 20 },
  sectionTitle: { fontSize: 16, fontWeight: "700", color: "#1A1E44", marginTop: 25, marginBottom: 15 },
  searchBar: { 
    flexDirection: "row", 
    backgroundColor: "#FFF", 
    borderWidth: 1, 
    borderColor: "#DDD", 
    borderRadius: 12, 
    paddingHorizontal: 15, 
    height: 50, 
    alignItems: "center",
    gap: 10
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
  sliderSection: { marginTop: 10, marginBottom: 20 },
  track: { height: 4, backgroundColor: "#EEE", borderRadius: 2, position: "relative", justifyContent: "center" },
  activeTrack: { height: 4, backgroundColor: "#2D2B6B", borderRadius: 2, position: "absolute" },
  thumb: { position: "absolute", width: 16, height: 16, borderRadius: 8, backgroundColor: "#2D2B6B", top: -6 },
  priceRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  priceText: { fontSize: 12, color: "#666" },
  ratingRow: { 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-between",
    marginBottom: 20 
  },
  ratingText: { fontSize: 16, fontWeight: "600", color: "#1A1E44" },
  starsContainer: { flexDirection: "row", gap: 2 },
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
