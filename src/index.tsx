import React, { useContext, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
  ActivityIndicator,
} from "react-native";
import { Screen, Text } from "./Components";
import { colors, spacing, adjustSize } from "./theme";
import { Images } from "./assets/Images";
import { WithLocalSvg } from "react-native-svg/css";
import { UserContext } from "./context/UserContext";
import { supabase } from "./utils/supabase";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import * as AppleAuthentication from "expo-apple-authentication";
import * as Crypto from "expo-crypto";

WebBrowser.maybeCompleteAuthSession();

const SUPABASE_URL = "https://ypcbpnjxezjngpiuftnu.supabase.co";

export function HomeScreen() {
  const { login } = useContext(UserContext);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [appleLoading, setAppleLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setGoogleLoading(true);

      const redirectUrl = AuthSession.makeRedirectUri({
        path: "auth/callback",
      });

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: redirectUrl,
          skipBrowserRedirect: true,
        },
      });

      if (error) {
        Alert.alert("Error", error.message);
        return;
      }

      if (data?.url) {
        const result = await WebBrowser.openAuthSessionAsync(
          data.url,
          redirectUrl
        );

        if (result.type === "success" && result.url) {
          const url = new URL(result.url);
          const params = new URLSearchParams(url.hash.substring(1));
          const accessToken = params.get("access_token");
          const refreshToken = params.get("refresh_token");

          if (accessToken && refreshToken) {
            const { error: sessionError } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
            });

            if (sessionError) {
              Alert.alert("Error", sessionError.message);
            } else {
              login();
            }
          }
        }
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      Alert.alert("Google Sign-In Failed", errorMessage);
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleAppleSignIn = async () => {
    try {
      setAppleLoading(true);

      const rawNonce = Crypto.getRandomValues(new Uint8Array(32))
        .reduce((acc, val) => acc + val.toString(16).padStart(2, "0"), "");
      const hashedNonce = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        rawNonce
      );

      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
        nonce: hashedNonce,
      });

      if (credential.identityToken) {
        const { error } = await supabase.auth.signInWithIdToken({
          provider: "apple",
          token: credential.identityToken,
          nonce: rawNonce,
        });

        if (error) {
          Alert.alert("Error", error.message);
        } else {
          login();
        }
      }
    } catch (err: unknown) {
      if (err && typeof err === "object" && "code" in err) {
        const appleErr = err as { code: string };
        if (appleErr.code === "ERR_REQUEST_CANCELED") {
          return;
        }
      }
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      Alert.alert("Apple Sign-In Failed", errorMessage);
    } finally {
      setAppleLoading(false);
    }
  };

  return (
    <Screen preset="fixed" contentContainerStyle={styles.screenContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.logoSection}>
          <WithLocalSvg asset={Images.logo} style={styles.logo} />
          <WithLocalSvg asset={Images.sublogo} style={styles.sublogo} />
        </View>

        <View style={styles.divider} />

        <Text style={styles.welcomeTitle} weight="semiBold">
          Welcome
        </Text>
        <Text style={styles.welcomeSubtitle} weight="medium">
          Sign in to continue
        </Text>

        <View style={styles.buttonSection}>
          {/* Google Sign-In Button */}
          <TouchableOpacity
            style={[styles.authButton, styles.googleButton]}
            onPress={handleGoogleSignIn}
            disabled={googleLoading}
            activeOpacity={0.8}
          >
            {googleLoading ? (
              <ActivityIndicator size="small" color={colors.primary} />
            ) : (
              <WithLocalSvg asset={Images.google} style={styles.buttonIcon} />
            )}
            <Text style={styles.googleButtonText} weight="medium">
              Continue with Google
            </Text>
          </TouchableOpacity>

          {/* Apple Sign-In Button */}
          {Platform.OS === "ios" ? (
            <TouchableOpacity
              style={[styles.authButton, styles.appleButton]}
              onPress={handleAppleSignIn}
              disabled={appleLoading}
              activeOpacity={0.8}
            >
              {appleLoading ? (
                <ActivityIndicator size="small" color={colors.white} />
              ) : (
                <WithLocalSvg asset={Images.apple} style={styles.buttonIcon} />
              )}
              <Text style={styles.appleButtonText} weight="medium">
                Continue with Apple
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.authButton, styles.appleButton]}
              onPress={handleAppleSignIn}
              disabled={appleLoading}
              activeOpacity={0.8}
            >
              {appleLoading ? (
                <ActivityIndicator size="small" color={colors.white} />
              ) : (
                <WithLocalSvg asset={Images.apple} style={styles.buttonIcon} />
              )}
              <Text style={styles.appleButtonText} weight="medium">
                Continue with Apple
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText} weight="normal">
            By continuing, you agree to our{" "}
            <Text style={styles.linkText} weight="medium">
              Terms of Service
            </Text>{" "}
            &{" "}
            <Text style={styles.linkText} weight="medium">
              Privacy Policy
            </Text>
          </Text>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#F2F3FF",
    paddingHorizontal: spacing.md,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: spacing.xxl,
  },
  logoSection: {
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  logo: {
    marginBottom: 20,
  },
  sublogo: {},
  divider: {
    borderBottomWidth: 1,
    borderColor: "#B0B0B0",
    marginVertical: 25,
  },
  welcomeTitle: {
    textAlign: "center",
    fontSize: adjustSize(28),
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  welcomeSubtitle: {
    textAlign: "center",
    fontSize: adjustSize(14),
    color: "#737373",
    marginBottom: spacing.xxl,
  },
  buttonSection: {
    gap: 16,
  },
  authButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: spacing.md,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  googleButton: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  appleButton: {
    backgroundColor: "#000000",
  },
  buttonIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  googleButtonText: {
    fontSize: adjustSize(16),
    color: colors.primary,
    marginLeft: 12,
  },
  appleButtonText: {
    fontSize: adjustSize(16),
    color: colors.white,
    marginLeft: 12,
  },
  footer: {
    marginTop: spacing.xxl,
    paddingHorizontal: spacing.lg,
  },
  footerText: {
    textAlign: "center",
    fontSize: adjustSize(12),
    color: "#737373",
    lineHeight: 18,
  },
  linkText: {
    color: colors.primary,
    textDecorationLine: "underline",
  },
});
