import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface FilterButtonProps {
  onPress: () => void;
  style?: ViewStyle;
  size?: number;
  color?: string;
  backgroundColor?: string;
}

export function FilterButton({ 
  onPress, 
  style, 
  size = 24, 
  color = "white", 
  backgroundColor = "#292766" 
}: FilterButtonProps) {
  return (
    <TouchableOpacity 
      style={[styles.filterBtn, { backgroundColor }, style]} 
      onPress={onPress}
    >
      <Ionicons name="options-outline" size={size} color={color} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  filterBtn: { 
    width: 50, 
    height: 50, 
    borderRadius: 12, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
});
