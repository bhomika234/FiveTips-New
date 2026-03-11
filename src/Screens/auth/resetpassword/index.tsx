import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Button, Screen, Text, TextField } from "../../../Components";
import { AppStackScreenProps } from "../../../utils/interfaces";
import { colors, spacing } from "../../../theme";
import { WithLocalSvg } from "react-native-svg/css";
import { Images } from "../../../assets/Images";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

interface ResetPasswordScreenProps extends AppStackScreenProps<"ResetPassword"> {}

const resetPasswordValidations = yup.object().shape({
  newPassword: yup.string().min(6, "Password must be at least 6 characters").required("New password is required"),
  confirmPassword: yup.string().oneOf([yup.ref("newPassword")], "Passwords must match").required("Confirm password is required"),
});

export function ResetPassword({ navigation }: ResetPasswordScreenProps) {
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(resetPasswordValidations),
    defaultValues: { 
      newPassword: "", 
      confirmPassword: "" 
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: { newPassword: string; confirmPassword: string }) => {
    setLoading(true);
    try {
      // API call logic for password reset
      console.log("Password reset with:", data.newPassword);
      Toast.show({ type: "success", text1: "Password reset successfully!" });
      
      // Navigate back to login after successful reset
      setTimeout(() => {
        navigation.navigate("Login");
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
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#2E2E5D" />
        </TouchableOpacity>
        <View style={styles.logoCircle}>
          <WithLocalSvg asset={Images.logo} height={60} width={60} />
        </View>
        <Text preset="heading" style={styles.title}>Reset Password</Text>
        <Text style={styles.subTitle}>Create a new password to regain access</Text>
      </View>

      {/* Input Section */}
      <View style={styles.inputContainer}>
        <Controller
          control={control}
          name="newPassword"
          render={({ field: { onChange, value, onBlur } }) => (
            <TextField
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Enter new password"
              secureTextEntry
              status={errors.newPassword ? "error" : undefined}
              helper={errors.newPassword?.message}
              inputWrapperStyle={styles.textFieldWrapper}
              LeftAccessory={() => (
                <Ionicons 
                  name="lock-closed" 
                  size={20} 
                  color="#2E2E5D" 
                  style={{ marginLeft: spacing.md }} 
                />
              )}
            />
          )}
        />

        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, value, onBlur } }) => (
            <TextField
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Re-enter new password"
              secureTextEntry
              status={errors.confirmPassword ? "error" : undefined}
              helper={errors.confirmPassword?.message}
              inputWrapperStyle={[styles.textFieldWrapper, styles.confirmPasswordField]}
              LeftAccessory={() => (
                <Ionicons 
                  name="lock-closed" 
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
          text="Save"
          onPress={handleSubmit(onSubmit)}
          loading={loading}
          style={styles.saveButton}
          textStyle={styles.buttonText}
          disabled={!isValid}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FE",
    paddingHorizontal: spacing.lg,
  },
  header: {
    alignItems: "center",
    marginTop: 60,
  },
  backButton: {
    position: "absolute",
    left: 0,
    top: 60,
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
    color: "#7D7D9D",
    textAlign: "center",
  },
  inputContainer: {
    marginTop: 40,
  },
  textFieldWrapper: {
    backgroundColor: "white",
    borderRadius: 15,
    borderWidth: 0,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    height: 60,
    marginBottom: spacing.md,
  },
  confirmPasswordField: {
    marginTop: spacing.md,
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: spacing.xxl,
  },
  saveButton: {
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
