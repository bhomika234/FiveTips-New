import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from "react-native";
import { Screen } from "../../Components";
import { colors, spacing } from "../../theme";
import { Images } from "../../assets/Images";
import { Ionicons } from "@expo/vector-icons";

interface Property {
  id: string;
  title: string;
  price: string;
  location: string;
  rating: number;
  image: any;
  beds: number;
  baths: number;
  sqft: string;
  isFavorite?: boolean;
}

const mockProperties: Property[] = [
  {
    id: "1",
    title: "Modern Apartment",
    price: "$2,500/month",
    location: "Downtown, NY",
    rating: 4.8,
    image: Images.bg,
    beds: 2,
    baths: 2,
    sqft: "1,200",
  },
  {
    id: "2", 
    title: "Luxury Villa",
    price: "$5,000/month",
    location: "Beverly Hills, CA",
    rating: 4.9,
    image: Images.bg1,
    beds: 4,
    baths: 3,
    sqft: "3,500",
  },
  {
    id: "3",
    title: "Cozy Studio",
    price: "$1,200/month", 
    location: "Brooklyn, NY",
    rating: 4.5,
    image: Images.bg3,
    beds: 1,
    baths: 1,
    sqft: "600",
  },
];

const PropertyCard = ({ property, onPress }: { property: Property; onPress: () => void }) => (
  <TouchableOpacity style={styles.propertyCard} onPress={onPress}>
    <Image source={property.image} style={styles.propertyImage} />
    <TouchableOpacity style={styles.favoriteButton}>
      <Ionicons name="heart-outline" size={20} color="#FF6B6B" />
    </TouchableOpacity>
    <View style={styles.propertyInfo}>
      <Text style={styles.propertyTitle}>{property.title}</Text>
      <Text style={styles.propertyPrice}>{property.price}</Text>
      <Text style={styles.propertyLocation}>{property.location}</Text>
      <View style={styles.propertyDetails}>
        <Text style={styles.propertyDetail}>{property.beds} beds</Text>
        <Text style={styles.propertyDetail}>{property.baths} baths</Text>
        <Text style={styles.propertyDetail}>{property.sqft} sqft</Text>
      </View>
      <View style={styles.ratingContainer}>
        <Ionicons name="star" size={16} color="#FFD700" />
        <Text style={styles.rating}>{property.rating}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

export function Home(props: any) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "House", "Apartment", "Villa", "Studio"];

  const renderPropertyItem = ({ item }: { item: Property }) => (
    <PropertyCard 
      property={item} 
      onPress={() => props.navigation.navigate("Details", { propertyId: item.id })}
    />
  );

  return (
    <Screen preset="fixed" contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search location, property type..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={20} color="#292766" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Categories */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.categoryButtonActive
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={[
                styles.categoryText,
                selectedCategory === category && styles.categoryTextActive
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Best for you */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Best for you</Text>
          <FlatList
            data={mockProperties.slice(0, 2)}
            renderItem={renderPropertyItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />
        </View>

        {/* Top Rated */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Rated</Text>
          <FlatList
            data={mockProperties.slice(1, 3)}
            renderItem={renderPropertyItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />
        </View>

        {/* Special Offers */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Special Offers</Text>
          {mockProperties.map((property) => (
            <PropertyCard 
              key={property.id}
              property={property}
              onPress={() => props.navigation.navigate("Details", { propertyId: property.id })}
            />
          ))}
        </View>

        {/* Trending Properties */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trending Properties</Text>
          <FlatList
            data={mockProperties}
            renderItem={renderPropertyItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 25,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginRight: spacing.sm,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  filterButton: {
    width: 45,
    height: 45,
    backgroundColor: "#F5F5F5",
    borderRadius: 22.5,
    justifyContent: "center",
    alignItems: "center",
  },
  categoriesContainer: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  categoryButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginRight: spacing.sm,
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
  },
  categoryButtonActive: {
    backgroundColor: "#292766",
  },
  categoryText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  categoryTextActive: {
    color: colors.white,
  },
  section: {
    marginTop: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#292766",
    marginBottom: spacing.md,
  },
  horizontalList: {
    paddingRight: spacing.md,
  },
  propertyCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginRight: spacing.md,
    width: 280,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  propertyImage: {
    width: "100%",
    height: 180,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    resizeMode: "cover",
  },
  favoriteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  propertyInfo: {
    padding: spacing.md,
  },
  propertyTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: spacing.xs,
  },
  propertyPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#292766",
    marginBottom: spacing.xs,
  },
  propertyLocation: {
    fontSize: 14,
    color: "#666",
    marginBottom: spacing.sm,
  },
  propertyDetails: {
    flexDirection: "row",
    marginBottom: spacing.sm,
  },
  propertyDetail: {
    fontSize: 12,
    color: "#666",
    marginRight: spacing.md,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginLeft: spacing.xs,
  },
});
