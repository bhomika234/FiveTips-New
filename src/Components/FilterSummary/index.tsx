import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { FilterChip } from "../FilterChip";
import { Ionicons } from "@expo/vector-icons";

interface FilterOptions {
  propertyType?: string;
  category?: string;
  features?: string[];
  facilities?: string[];
  location?: string;
  minPrice?: string;
  maxPrice?: string;
  rating?: number;
}

interface FilterSummaryProps {
  filters: FilterOptions;
  onRemoveFilter: (filterKey: keyof FilterOptions, value?: string) => void;
  onClearAll: () => void;
  style?: ViewStyle;
  horizontal?: boolean;
}

export function FilterSummary({
  filters,
  onRemoveFilter,
  onClearAll,
  style,
  horizontal = true,
}: FilterSummaryProps) {
  const activeFilters: Array<{
    key: keyof FilterOptions;
    label: string;
    value?: string;
  }> = [];

  // Collect active filters
  if (filters.propertyType && filters.propertyType !== "All") {
    activeFilters.push({ key: "propertyType", label: filters.propertyType });
  }

  if (filters.category && filters.category !== "Long Lease") {
    activeFilters.push({ key: "category", label: filters.category });
  }

  if (filters.location) {
    activeFilters.push({ key: "location", label: filters.location });
  }

  if (filters.features && filters.features.length > 0) {
    filters.features.forEach((feature) => {
      if (feature !== "2 Bedrooms") {
        // Don't show default selection
        activeFilters.push({ key: "features", label: feature, value: feature });
      }
    });
  }

  if (filters.facilities && filters.facilities.length > 0) {
    filters.facilities.forEach((facility) => {
      if (!["Parking", "Free Wifi", "Kids play area"].includes(facility)) {
        // Don't show defaults
        activeFilters.push({
          key: "facilities",
          label: facility,
          value: facility,
        });
      }
    });
  }

  if (filters.rating && filters.rating !== 4.2) {
    activeFilters.push({ key: "rating", label: `${filters.rating}+ Stars` });
  }

  if (filters.minPrice && filters.maxPrice) {
    if (filters.minPrice !== "2000" || filters.maxPrice !== "16000") {
      activeFilters.push({
        key: "minPrice" as keyof FilterOptions,
        label: `$${filters.minPrice}-$${filters.maxPrice}`,
      });
    }
  }

  if (activeFilters.length === 0) return null;

  return (
    <View style={[styles.container, style]}>
      <ScrollView
        horizontal={horizontal}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {activeFilters.map((filter, index) => (
          <FilterChip
            key={`${filter.key}-${filter.value || index}`}
            label={filter.label}
            onRemove={() => onRemoveFilter(filter.key, filter.value)}
            active
            size="small"
            variant="filled"
          />
        ))}

        <TouchableOpacity style={styles.clearAllBtn} onPress={onClearAll}>
          <Ionicons name="close-circle-outline" size={16} color="#666" />
          <Text style={styles.clearAllText}>Clear All</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  scrollContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 8,
  },
  clearAllBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: "#F5F5F5",
    gap: 4,
  },
  clearAllText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
});
