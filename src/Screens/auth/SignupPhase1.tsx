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

interface ISignupPhase1 {
  fullName: string;
  email: string;
  role: string;
}

const signupPhase1Schema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  role: yup.string().required("Please select your role"),
});

export const SignupPhase1 = ({ navigation }: any) => {
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  const roles = ["Property Owner", "Agent", "Tenant", "Developer"];

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm<ISignupPhase1>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(signupPhase1Schema),
    defaultValues: {
      fullName: "",
      email: "",
      role: "",
    },
  });

  const fullName = watch("fullName");
  const email = watch("email");

  const isFormValid = Boolean(
    fullName && 
    email && 
    selectedRole && 
    isValid
  );

  const handleNext = async (formData: ISignupPhase1) => {
    setLoading(true);
    try {
      console.log("Signup Phase 1:", formData);
      // Navigate to next phase with data
      navigation.navigate("SignupPhase2", { 
        phase1Data: formData 
      });
    } catch (error) {
      console.error("Signup error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    setValue("role", role);
    setShowRoleDropdown(false);
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
        <Text style={styles.title}>Create Account</Text>
        
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        {/* Role Dropdown */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Select Your Role</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setShowRoleDropdown(!showRoleDropdown)}
          >
            <Text style={[styles.dropdownText, !selectedRole && { color: "#999" }]}>
              {selectedRole || "Select Your Role"}
            </Text>
            <Text style={styles.dropdownArrow}>▼</Text>
          </TouchableOpacity>
          
          {showRoleDropdown && (
            <View style={styles.dropdownList}>
              {roles.map((role) => (
                <TouchableOpacity
                  key={role}
                  style={styles.dropdownItem}
                  onPress={() => handleRoleSelect(role)}
                >
                  <Text style={styles.dropdownItemText}>{role}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          {errors.role && (
            <Text style={styles.errorText}>{errors.role.message}</Text>
          )}
        </View>

        {/* Full Name Input */}
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            name="fullName"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                placeholder="Enter you full name"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                LeftAccessory={() => (
                  <View style={styles.iconContainer}>
                    <Text style={styles.icon}>👤</Text>
                  </View>
                )}
              />
            )}
          />
          {errors.fullName && (
            <Text style={styles.errorText}>{errors.fullName.message}</Text>
          )}
        </View>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                placeholder="Enter a valid email address"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType="email-address"
                autoCapitalize="none"
                LeftAccessory={() => (
                  <View style={styles.iconContainer}>
                    <Text style={styles.icon}>✉️</Text>
                  </View>
                )}
              />
            )}
          />
          {errors.email && (
            <Text style={styles.errorText}>{errors.email.message}</Text>
          )}
        </View>

        {/* Next Button */}
        <Button
          text="Next"
          gradient={true}
          onPress={handleSubmit(handleNext)}
          disabled={!isFormValid || loading}
          loading={loading}
          style={styles.nextButton}
        />
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
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#292766",
    textAlign: "center",
    marginBottom: 10,
  },
  loginText: {
    color: "#292766",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 8,
  },
  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  dropdownText: {
    fontSize: 16,
    color: "#333333",
    flex: 1,
  },
  dropdownArrow: {
    fontSize: 12,
    color: "#666666",
  },
  dropdownList: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginTop: 5,
    maxHeight: 200,
    zIndex: 1000,
  },
  dropdownItem: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  dropdownItemText: {
    fontSize: 16,
    color: "#333333",
  },
  iconContainer: {
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    fontSize: 18,
  },
  nextButton: {
    marginBottom: 30,
    marginTop: 20,
  },
  errorText: {
    color: "#FF0000",
    fontSize: 12,
    marginTop: 5,
  },
});
