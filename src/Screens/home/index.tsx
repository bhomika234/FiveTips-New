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
  Dimensions,
} from "react-native";
import { Screen } from "../../Components";
import { colors, spacing } from "../../theme";
import { Images } from "../../assets/Images";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

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
  category?: string;
}

const mockProperties: Property[] = [
  { id: "1", title: "2 Bedroom Apartment", price: "$150", location: "Downtown", rating: 4.8, image: Images.bg1, beds: 2, baths: 2, sqft: "1200" },
  { id: "2", title: "Luxury Villa", price: "$150,000", location: "Suburban", rating: 4.9, image: Images.bg1, beds: 4, baths: 3, sqft: "3500" },
  { id: "3", title: "Maisonette", price: "$2,000", location: "City Center", rating: 4.5, image: Images.bg3, beds: 3, baths: 2, sqft: "1500" },
];

// --- Sub-Components for Sections ---

// 1. Best for You (Small cards with overlay)
const BestForYouCard = ({ item }: { item: Property }) => (
  <TouchableOpacity style={styles.bestCard}>
    <Image source={item.image} style={styles.bestImage} />
    <View style={styles.bestOverlay}>
      <Text style={styles.bestPriceText}>{item.price}/City</Text>
      <Ionicons name="heart-outline" size={18} color="white" />
    </View>
  </TouchableOpacity>
);

// 2. Top Rated (Card with icon row)
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

// Top Rated Card Component
const TopRatedCard = ({ item }: { item: Property }) => (
  <TouchableOpacity style={styles.topRatedCard}>
    <Image source={item.image} style={styles.topRatedImage} />
    <View style={styles.iconRow}>
      {[1, 2, 3, 4].map((i) => (
        <View key={i} style={styles.iconCircle}>
          <Ionicons name="home" size={16} color="#292766" />
        </View>
      ))}
    </View>
    <View style={styles.topRatedInfo}>
      <Text style={styles.propertyTitle}>{item.title}</Text>
      <Text style={styles.propertySub}>{item.location}</Text>
      <Text style={styles.mainPrice}>{item.price}</Text>
    </View>
  </TouchableOpacity>
);

// 3. Special Offers (Horizontal row layout)
const SpecialOfferCard = ({ item }: { item: Property }) => (
  <View style={styles.offerCard}>
    <Image source={item.image} style={styles.offerImage} />
    <View style={styles.offerInfo}>
      <Text style={styles.offerTitle} numberOfLines={2}>Book our luxury villa for 2 days and get stay of 1 more night for free</Text>
      <Text style={styles.offerSub}>{item.beds} Beds, 2 Guests</Text>
      <Text style={styles.offerPrice}>$150000</Text>
    </View>
  </View>
);

export function Home(props: any) {
  return (
    <Screen preset="scroll" contentContainerStyle={styles.container}>
      {/* Search Header */}
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <TextInput placeholder="Search" style={styles.searchInput} />
          <Ionicons name="chevron-forward" size={18} color="#CCC" />
        </View>
        <TouchableOpacity style={styles.filterBtn}>
          <Ionicons name="options-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Sections */}
      <View style={styles.content}>
        
        <SectionTitle title="Best for you" />
        <FlatList 
          horizontal 
          data={mockProperties} 
          renderItem={({item}) => <BestForYouCard item={item} />} 
          showsHorizontalScrollIndicator={false}
        />

        <SectionTitle title="Top Rated" />
        <FlatList 
          horizontal 
          data={mockProperties} 
          renderItem={({item}) => <TopRatedCard item={item} />} 
          showsHorizontalScrollIndicator={false}
        />

        <SectionTitle title="Special Offers" />
        {mockProperties.map(item => <SpecialOfferCard key={item.id} item={item} />)}

        <SectionTitle title="Trending properties" />
        <FlatList 
          horizontal 
          data={mockProperties} 
          renderItem={({item}) => (
            <View style={{marginRight: 15, alignItems: 'center'}}>
              <Image source={item.image} style={styles.trendingImage} />
              <Text style={styles.trendingText}>Maisonette</Text>
            </View>
          )} 
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </Screen>
  );
}

const SectionTitle = ({ title }: { title: string }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <TouchableOpacity><Text style={styles.viewAll}>View All</Text></TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {  backgroundColor: "#F9FAFF" },
  header: { flexDirection: 'row', padding: 20, alignItems: 'center' },
  searchBar: {
    flex: 1, backgroundColor: 'white', borderRadius: 10, 
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15,
    height: 50, marginRight: 10, borderWidth: 1, borderColor: '#EEE'
  },
  searchInput: { flex: 1, fontSize: 16 },
  filterBtn: { 
    backgroundColor: '#292766', width: 50, height: 50, 
    borderRadius: 12, justifyContent: 'center', alignItems: 'center' 
  },
  content: { paddingHorizontal: 20 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 15 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#292766' },
  viewAll: { fontSize: 12, color: '#AAA' },

  // Best For You Styles
  bestCard: { width: 150, height: 100, marginRight: 15, borderRadius: 15, overflow: 'hidden' },
  bestImage: { width: '100%', height: '100%' },
  bestOverlay: { 
    position: 'absolute', bottom: 0, width: '100%', flexDirection: 'row', 
    justifyContent: 'space-between', padding: 10, backgroundColor: 'rgba(0,0,0,0.2)' 
  },
  bestPriceText: { color: 'white', fontSize: 10, fontWeight: 'bold' },

  // Top Rated Styles
  topRatedCard: { width: 220, backgroundColor: 'white', borderRadius: 20, marginRight: 15, padding: 10 },
  topRatedImage: { width: '100%', height: 150, borderRadius: 15 },
  iconRow: { flexDirection: 'row', marginTop: -20, justifyContent: 'center' },
  iconCircle: { 
    backgroundColor: 'white', width: 30, height: 30, borderRadius: 15, 
    justifyContent: 'center', alignItems: 'center', marginHorizontal: 2,
    elevation: 3, shadowOpacity: 0.1
  },
  topRatedInfo: { marginTop: 10 },
  propertyTitle: { fontWeight: 'bold', color: '#292766' },
  propertySub: { color: '#AAA', fontSize: 10 },
  mainPrice: { alignSelf: 'flex-end', fontWeight: 'bold', color: '#292766', marginTop: -15 },

  // Special Offers Styles
  offerCard: { flexDirection: 'row', backgroundColor: 'white', borderRadius: 15, padding: 10, marginBottom: 15 },
  offerImage: { width: 80, height: 80, borderRadius: 10 },
  offerInfo: { flex: 1, marginLeft: 15, justifyContent: 'space-between' },
  offerTitle: { fontSize: 12, fontWeight: '600', color: '#292766' },
  offerSub: { fontSize: 10, color: '#AAA' },
  offerPrice: { alignSelf: 'flex-end', fontWeight: 'bold', color: '#292766' },

  // Trending
  trendingImage: { width: 100, height: 100, borderRadius: 15 },
  trendingText: { marginTop: 5, fontSize: 12, color: '#292766' },

  // Property Card Styles
  propertyCard: { 
    width: 220, 
    backgroundColor: 'white', 
    borderRadius: 20, 
    marginRight: 15, 
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  propertyImage: { width: '100%', height: 150, borderRadius: 15 },
  favoriteButton: { 
    position: 'absolute', 
    top: 10, 
    right: 10, 
    backgroundColor: 'white', 
    width: 30, 
    height: 30, 
    borderRadius: 15, 
    justifyContent: 'center', 
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2
  },
  propertyInfo: { marginTop: 10 },
  propertyPrice: { fontSize: 16, fontWeight: 'bold', color: '#292766', marginTop: 5 },
  propertyLocation: { fontSize: 12, color: '#AAA', marginTop: 2 },
  propertyDetails: { flexDirection: 'row', marginTop: 8 },
  propertyDetail: { fontSize: 10, color: '#666', marginRight: 10 },
  ratingContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  rating: { fontSize: 12, color: '#666', marginLeft: 4 }
});