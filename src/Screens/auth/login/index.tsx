import React, { useRef, useState, useContext } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Button, Screen, Text, TextField } from "../../../Components";
import { adjustSize, colors, spacing, typography } from "../../../theme";
import { Images } from "../../../assets/Images";
import { loginValidations } from "../../../validations/auth";
import { ILogin } from "../../../types/app.types";
import { useNavigation } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { WithLocalSvg } from "react-native-svg/css";
import Dropdown from "../../../Components/DropDown";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { UserContext } from "../../../context/UserContext";
interface LoginScreenProps
  extends NativeStackScreenProps<any, "Login"> {}
export function LoginScreen(props: LoginScreenProps) {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { login: loginUser } = useContext(UserContext);
  const authPasswordInput:any = useRef<TextInput>(null);
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<ILogin>({
    resolver: yupResolver(loginValidations),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      email: "suneelsuther@gmail.com",
      password: "112233",
    },
  });

  const [email, password] = watch(["email", "password"]);
  const isFormValid = Boolean(email && password && isValid);
  const [keepLoggedIn, setKeeLoggedIn] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>("admin");

  // Redux hooks

  // Role options for dropdown
  const roleOptions = [
    { label: "Admin", value: "admin" },
    { label: "Tenant", value: "tenant" },
    { label: "Agent", value: "agent" },
    { label: "Facility Manager", value: "facility_manager" },
    { label: "Landlord", value: "landlord" },
    { label: "Sub-Landlord", value: "sub_landlord" },
    { label: "Security", value: "security" },
  ];
  const handleLogin: SubmitHandler<ILogin> = async (formData: ILogin) => {
    loginUser();
  };

  return (
    <>
      <Screen
        preset="fixed"
        contentContainerStyle={styles.screenContentContainer}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles._logoview}>
            <WithLocalSvg asset={Images.logo} style={{ marginBottom: 20 }} />
            <WithLocalSvg asset={Images.sublogo} />
          </View>
          <View style={styles._divider} />
          <Text style={styles._heading_light} weight="semiBold">
            Login
            <Text
              style={styles._heading}
              weight="semiBold"
              text=" To Your Account"
            />
          </Text>

          <Text style={styles._notetext} weight="medium">
            Don’t have an account?{" "}
            <Text
              onPress={() => props.navigation.navigate("CreateAccount")}
              style={styles._register}
              weight="semiBold"
              text=" Register"
            />
          </Text>

          {/* <View style={styles._dropdownview}> */}
            
            <View style={styles._roleDropdown}>
              <Dropdown
                dropdownStyle={styles._dropdownInner}
                placeholderStyle={styles._placeholderStyle}
                selectedTextStyle={styles._selectedTextStyle}
                data={roleOptions}
                placeholder="Choose your role"
                value={selectedRole}
                rightIconColor="#292766"
                onChangeValue={(val: string) => {
                  setSelectedRole(val);
                }}
              />
            </View>
          {/* </View> */}

          <Controller
            control={control}
            render={({ field: { onChange, value, onBlur } }) => (
              <TextField
                value={value}
                onChangeText={(value) => onChange(value)}
                // onBlur={onBlur}
                autoCapitalize="none"
                autoComplete="email"
                borderColor="white"
                autoCorrect={false}
                keyboardType="email-address"
                placeholder="Email"
                // style={{ color: "white" }}
                placeholderTextColor={"#B0B0B0"}
                inputWrapperStyle={{backgroundColor: colors.white}}
                helper={errors.email?.message}
                status={errors.email ? "error" : undefined}
                LeftAccessory={() => (
                  <WithLocalSvg
                    style={{ marginLeft: 10 }}
                    asset={Images.email}
                  />
                )}
                onSubmitEditing={() => authPasswordInput.current?.focus()}
                containerStyle={[
                  styles.textField,

                  // emailFocused ? { borderColor: colors.primary } : null, // Apply border color if focused
                ]}
              />
            )}
            name="email"
            rules={{ required: true }}
            defaultValue=""
          />

          <Controller
            control={control}
            render={({ field: { onChange, value, onBlur } }) => (
              <TextField
                value={value}
                onChangeText={(value) => onChange(value)}
                autoCapitalize="none"
                borderColor="white"
                autoComplete="password"
                placeholderTextColor={"#B0B0B0"}
                autoCorrect={false}
                secureTextEntry={isAuthPasswordHidden}
                placeholder="Password"
                containerStyle={styles.textField}
                helper={errors.password?.message}
                inputWrapperStyle={{backgroundColor: colors.white}}
                // style={{ color: "white" }}
                status={errors.password ? "error" : undefined}
                LeftAccessory={() => (
                  <WithLocalSvg
                    style={{ marginLeft: 10 }}
                    asset={Images.lock}
                  />
                )}
              />
            )}
            name="password"
            rules={{ required: true }}
            defaultValue=""
          />

          <TouchableOpacity
          onPress={() => props.navigation.navigate("ForgotPassword")}
          style={{ paddingLeft:15,marginTop:-10 }}
          >
            <Text
              text="Forgot Password?"
              preset="formHelper"
              weight="normal"
              style={[styles.enterDetails,{color:"#B0B0B0",fontSize:adjustSize(14)}]}
            />
          </TouchableOpacity>

          <Button
            testID="login-button"
            preset="reversed"
            text="Login"
            disabled={!isFormValid }
            onPress={handleSubmit(handleLogin)}
            textStyle={{ color: colors.white }}
            style={[
              !isFormValid && styles.disabledButton,
              {
                backgroundColor: colors.primary,
              },
            ]}
          />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              marginVertical: 20,
            }}
          >
            <TouchableOpacity
              onPress={() => setKeeLoggedIn(!keepLoggedIn)}
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              {keepLoggedIn ? (
                <MaterialCommunityIcons
                  name="checkbox-marked-outline"
                  size={24}
                  color={colors.primary}
                />
              ) : (
                <MaterialCommunityIcons
                  name="checkbox-blank-outline"
                  size={24}
                  color={colors.primary}
                />
              )}
            </TouchableOpacity>

            <Text text="Keep me logged in" style={{ color: colors.primary }} />
          </View>
          <Text text="OR" style={styles._ortext} />

          <Button
            preset="reversed"
            disabled={!isFormValid}
            onPress={handleSubmit(handleLogin)}
            text={"Continue with Google"}
            textStyle={{ color: colors.primary,paddingLeft:20,fontFamily:typography.fonts.poppins.normal }}
            LeftAccessory={() => <WithLocalSvg asset={Images.google} />}
            style={[
              !isFormValid && styles.disabledButton,
              {
                backgroundColor:   colors.white,
                marginVertical: 10,
                marginBottom: 30,
                justifyContent: "flex-start",
              },
            ]}
          />

          <Button
            preset="reversed"
            disabled={!isFormValid}
            onPress={handleSubmit(handleLogin)}
            text={"Continue with Facebook"}
            textStyle={{ color: colors.primary ,paddingLeft:20,fontFamily:typography.fonts.poppins.normal}}
            LeftAccessory={() => <WithLocalSvg asset={Images.facebook} />}
            style={[
              !isFormValid && styles.disabledButton,
              {
                backgroundColor: isFormValid ? colors.fill : colors.border,
                marginBottom: 50,
                justifyContent: "flex-start",
              },
            ]}
          />
        </ScrollView>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  disabledButton: {
    backgroundColor: colors.primary,
  },
  _heading: {
    textAlign: "center",
    fontSize: 24,
    lineHeight: 32,
    color: colors.primary,
  },
  _heading_light: {
    textAlign: "center",
    fontSize: 24,
    lineHeight: 32,
    color: "#737373",
    marginVertical: 5,
  },

  textField: {
    // marginVertical: spacing.md,
  },
  _dropdownview: {
    marginVertical: spacing.md,
  },
  _roleLabel: {
    fontSize: 14,
    color: colors.primary,
    marginBottom: 8,
  },
  _roleDropdown: {
    marginBottom: 10,
  },
  _dropdownInner: {
    // borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 8,
    backgroundColor: "#FFFFFF",
    height: adjustSize(49),
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  _placeholderStyle: {
    color: "#292766",
  },
  _selectedTextStyle: {
    fontSize: adjustSize(12),
    color: "#292766",
  },

  enterDetails: {
    marginBottom: spacing.lg,
    color: "#B0B0B0",
  },
  screenContentContainer: {
    flex: 1,
    paddingHorizontal: spacing.md,
    paddingTop: 70,
    backgroundColor: "#F2F3FF",
  },
  _logoview: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },

  _orview: {
    alignItems: "center",
    marginTop: 35,
  },
  _ortext: {
    fontSize: adjustSize(14),
    paddingHorizontal: spacing.sm,
    textAlign: "center",
    color: "#B0B0B0",
  },
  tapButton: {
    borderRadius: 16,
    marginVertical: spacing.md,
    backgroundColor: colors.fill,
    shadowColor: "#000000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
    marginHorizontal: 1,
    justifyContent: "flex-start",
  },
  _tabbttext: {
    fontFamily: "semiBol",
    paddingLeft: spacing.sm,
    // color: colors.primaryLight,
    textAlign: "left",
  },
  _divider: {
    borderBottomWidth: 1,
    borderColor: "#B0B0B0",
    marginVertical: 25,
  },
  _notetext: {
    textAlign: "center",
    color: colors.primary,
    fontSize: 14,
    marginBottom: 20,
  },
  _register: {
    color: "#B0B0B0",
    textDecorationLine: "underline",
  },
  _row: {
    flexDirection: "row",
    // alignItems: "center",
    gap: 5,
    marginTop: 15,
  },
  _underline: {
    textDecorationLine: "underline",
    marginHorizontal: 3,
    color: colors.primary,
  },
  _agree_text: {
    color: colors.primary,
    marginBottom: 30,
  },
});