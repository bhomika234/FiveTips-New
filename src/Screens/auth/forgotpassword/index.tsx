import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Button, Screen, Text, TextField } from "../../../Components";
import { AppStackScreenProps } from "../../../utils/interfaces";
import { colors, spacing } from "../../../theme";
import { WithLocalSvg } from "react-native-svg/css";
import { Images } from "../../../assets/Images";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgotPasswordValidations } from "../../../validations/auth";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

interface ForgotPasswordScreenProps extends AppStackScreenProps<"ForgotPassword"> {}

export function ForgotPassword({ navigation }: ForgotPasswordScreenProps) {
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(forgotPasswordValidations),
    defaultValues: { email: "" },
    mode: "onBlur",
  });

  const onSubmit = async (data: { email: string }) => {
    setLoading(true);
    try {
      // API call logic yahan aayegi
      console.log("Email sent to:", data.email);
      Toast.show({ type: "success", text1: "Reset link sent to your email!" });
      
      // Navigate to reset password screen after successful email submission
      setTimeout(() => {
        navigation.navigate("ResetPassword");
      }, 1500);
    } catch (e) {
      Toast.show({ type: "error", text1: "Something went wrong" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen preset="fixed" contentContainerStyle={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.logoCircle}>
          {/* Logo Replace karein agar SVG alag hai */}
          <WithLocalSvg asset={Images.logo} height={60} width={60} />
        </View>
        <Text preset="heading" style={styles.title}>Forgot Password?</Text>
        <Text style={styles.subTitle}>Enter your email to reset your password</Text>
      </View>

      {/* Input Section */}
      <View style={styles.inputContainer}>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value, onBlur } }) => (
            <TextField
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Type your email address"
              autoCapitalize="none"
              keyboardType="email-address"
              status={errors.email ? "error" : undefined}
              helper={errors.email?.message}
              inputWrapperStyle={styles.textFieldWrapper}
              LeftAccessory={() => (
                <Ionicons 
                  name="mail" 
                  size={20} 
                  color="#2E2E5D" 
                  style={{ marginLeft: spacing.md }} 
                />
              )}
            />
          )}
        />
      </View>

      {/* Footer Button */}
      <View style={styles.footer}>
        <Button
          text="Send Link"
          onPress={handleSubmit(onSubmit)}
          loading={loading}
          style={styles.sendButton}
          textStyle={styles.buttonText}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FE", // Light background from image
    paddingHorizontal: spacing.lg,
  },
  header: {
    alignItems: "center",
    marginTop: 60,
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#2E2E5D",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#2E2E5D",
    marginBottom: spacing.xs,
  },
  subTitle: {
    fontSize: 14,
    color: "#52528b",
    textAlign: "center",
  },
  inputContainer: {
    marginTop: 40,
  },
  textFieldWrapper: {
    backgroundColor: "white",
    borderRadius: 15,
    borderWidth: 0,
    elevation: 2, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    height: 60,
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: spacing.xxl,
  },
  sendButton: {
    backgroundColor: "#2E2E5D",
    borderRadius: 12,
    borderWidth: 0,
    height: 55,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
});