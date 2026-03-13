import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface FilterChipProps {
  label: string;
  onRemove?: () => void;
  active?: boolean;
  style?: ViewStyle;
  size?: "small" | "medium" | "large";
  variant?: "default" | "outlined" | "filled";
}

export function FilterChip({
  label,
  onRemove,
  active = false,
  style,
  size = "medium",
  variant = "default",
}: FilterChipProps) {
  const getChipStyle = () => {
    const baseStyle: any[] = [styles.chip];

    // Size variations
    switch (size) {
      case "small":
        baseStyle.push(styles.chipSmall);
        break;
      case "large":
        baseStyle.push(styles.chipLarge);
        break;
      default:
        baseStyle.push(styles.chipMedium);
    }

    // Variant variations
    switch (variant) {
      case "outlined":
        baseStyle.push(styles.chipOutlined);
        if (active) baseStyle.push(styles.chipOutlinedActive);
        break;
      case "filled":
        baseStyle.push(styles.chipFilled);
        if (active) baseStyle.push(styles.chipFilledActive);
        break;
      default:
        baseStyle.push(styles.chipDefault);
        if (active) baseStyle.push(styles.chipDefaultActive);
    }

    return baseStyle;
  };

  const getTextStyle = () => {
    const baseStyle: any[] = [styles.chipText];

    switch (size) {
      case "small":
        baseStyle.push(styles.chipTextSmall);
        break;
      case "large":
        baseStyle.push(styles.chipTextLarge);
        break;
      default:
        baseStyle.push(styles.chipTextMedium);
    }

    if (variant === "filled" || (variant === "default" && active)) {
      baseStyle.push(styles.chipTextWhite);
    }

    return baseStyle;
  };

  return (
    <View style={[getChipStyle(), style]}>
      <Text style={getTextStyle()}>{label}</Text>
      {onRemove && (
        <TouchableOpacity onPress={onRemove} style={styles.removeBtn}>
          <Ionicons
            name="close-circle"
            size={size === "small" ? 14 : size === "large" ? 20 : 16}
            color={
              variant === "filled" || (variant === "default" && active)
                ? "#FFF"
                : "#666"
            }
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
  },
  chipSmall: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  chipMedium: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  chipLarge: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  chipDefault: {
    backgroundColor: "#FFF",
    borderColor: "#DDD",
  },
  chipDefaultActive: {
    backgroundColor: "#2D2B6B",
    borderColor: "#2D2B6B",
  },
  chipOutlined: {
    backgroundColor: "transparent",
    borderColor: "#2D2B6B",
  },
  chipOutlinedActive: {
    backgroundColor: "#2D2B6B",
    borderColor: "#2D2B6B",
  },
  chipFilled: {
    backgroundColor: "#F5F5F5",
    borderColor: "transparent",
  },
  chipFilledActive: {
    backgroundColor: "#2D2B6B",
    borderColor: "transparent",
  },
  chipText: {
    fontWeight: "500",
  },
  chipTextSmall: {
    fontSize: 12,
  },
  chipTextMedium: {
    fontSize: 13,
  },
  chipTextLarge: {
    fontSize: 15,
  },
  chipTextWhite: {
    color: "#FFF",
  },
  removeBtn: {
    marginLeft: 6,
  },
});
