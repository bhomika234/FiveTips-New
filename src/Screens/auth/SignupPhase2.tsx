import React, { useState } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { Button, Screen, Text, TextField } from "../../Components";
import { colors, spacing } from "../../theme";
import { Controller, useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRoute } from "@react-navigation/native";

interface ISignupPhase2 {
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

const signupPhase2Schema = yup.object().shape({
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
  agreeToTerms: yup.boolean().required("You must agree to the terms and conditions").oneOf([true], "You must agree to the terms and conditions"),
});

export const SignupPhase2 = ({ navigation }: any) => {
  const [loading, setLoading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  
  const route = useRoute();
  const { phase1Data } = route.params as { phase1Data: any };

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm<ISignupPhase2>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(signupPhase2Schema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
  });

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const isFormValid = Boolean(
    password && 
    confirmPassword && 
    agreeToTerms && 
    isValid
  );

  const handleSignup = async (formData: ISignupPhase2) => {
    setLoading(true);
    try {
      const completeSignupData = {
        ...phase1Data,
        ...formData,
      };
      console.log("Complete signup data:", completeSignupData);
      // TODO: Implement actual signup logic
      navigation.navigate("Main");
    } catch (error) {
      console.error("Signup error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTermsToggle = () => {
    const newValue = !agreeToTerms;
    setAgreeToTerms(newValue);
    setValue("agreeToTerms", newValue);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Image source={require("../../../../assets/logo.png")} style={styles.logoImage} />
          </View>
          <Text style={styles.logoText}>myhomesng.com</Text>
          <Text style={styles.taglineText}>my home, my way..</Text>
        </View>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.progressContainer}>
          <View style={[styles.progressDot, styles.progressDotActive]} />
          <View style={[styles.progressLine, styles.progressLineActive]} />
          <View style={[styles.progressDot, styles.progressDotActive]} />
        </View>

        <Text style={styles.title}>Create Account</Text>
        
        <View style={styles.userInfo}>
          <Text style={styles.userInfoText}>{phase1Data?.fullName}</Text>
          <Text style={styles.userInfoText}>{phase1Data?.email}</Text>
          <Text style={styles.userInfoText}>{phase1Data?.role}</Text>
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                placeholder="Enter strong password"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry
                LeftAccessory={() => (
                  <View style={styles.iconContainer}>
                    <Text style={styles.icon}>🔒</Text>
                  </View>
                )}
              />
            )}
          />
          {errors.password && (
            <Text style={styles.errorText}>{errors.password.message}</Text>
          )}
        </View>

        {/* Confirm Password Input */}
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                placeholder="Re-enter password"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry
                LeftAccessory={() => (
                  <View style={styles.iconContainer}>
                    <Text style={styles.icon}>🔒</Text>
                  </View>
                )}
              />
            )}
          />
          {errors.confirmPassword && (
            <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>
          )}
        </View>

        {/* Terms Checkbox */}
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={[styles.checkbox, agreeToTerms && styles.checkboxChecked]}
            onPress={handleTermsToggle}
          >
            {agreeToTerms && <Text style={styles.checkmark}>✓</Text>}
          </TouchableOpacity>
          <Text style={styles.checkboxLabel}>
            I agree to be bound by these Terms & Condition and User Agreement.
          </Text>
        </View>
        {errors.agreeToTerms && (
          <Text style={styles.errorText}>{errors.agreeToTerms.message}</Text>
        )}

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <Button
            text="Back"
            onPress={handleBack}
            style={[styles.actionButton, styles.backButton]}
            textStyle={styles.backButtonText}
          />
          
          <Button
            text="Sign up"
            gradient={true}
            onPress={handleSubmit(handleSignup)}
            disabled={!isFormValid || loading}
            loading={loading}
            style={[styles.actionButton, styles.signupButton]}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    backgroundColor: "#292766",
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: "center",
  },
  logoCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  logoImage: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  logoText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 5,
  },
  taglineText: {
    fontSize: 12,
    color: "#FFFFFF",
    opacity: 0.8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E0E0E0",
  },
  progressDotActive: {
    backgroundColor: "#292766",
  },
  progressLine: {
    width: 40,
    height: 2,
    backgroundColor: "#E0E0E0",
    marginHorizontal: 8,
  },
  progressLineActive: {
    backgroundColor: "#292766",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#292766",
    textAlign: "center",
    marginBottom: 20,
  },
  userInfo: {
    backgroundColor: "#F8F9FA",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  userInfoText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  inputContainer: {
    marginBottom: 20,
  },
  iconContainer: {
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    fontSize: 18,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.primary,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
  },
  checkmark: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  checkboxLabel: {
    fontSize: 14,
    color: "#666666",
    flex: 1,
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 30,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 5,
  },
  backButton: {
    backgroundColor: "#F5F5F5",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  backButtonText: {
    color: "#292766",
  },
  signupButton: {
    backgroundColor: "#292766",
  },
  errorText: {
    color: "#FF0000",
    fontSize: 12,
    marginTop: 5,
  },
});
