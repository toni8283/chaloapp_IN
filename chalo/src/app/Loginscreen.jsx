import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import CountryPicker from "react-native-country-picker-modal";

const { width } = Dimensions.get("window");

export default function LoginScreen() {
  const [countryCode, setCountryCode] = useState("IN");
  const [callingCode, setCallingCode] = useState("91");
  const [phone, setPhone] = useState("");
  const isValidPhone = phone.length === 10;

  // Placeholder for Google Sign In
  const handleGoogleSignIn = async () => {
    // TODO: Implement Google Sign In
    Alert.alert("Google Sign In", "Will be implemented with expo-auth-session");
  };

  // Placeholder for Apple Sign In
  const handleAppleSignIn = async () => {
    // TODO: Implement Apple Sign In
    Alert.alert("Apple Sign In", "Will be implemented with expo-auth-session");
  };

  return (
    <LinearGradient
      colors={["#FEF9F2", "#FFFFFF", "#FEF9F2"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View
          style={{
            flex: 1,
            paddingHorizontal: 28,
            justifyContent: "center",
          }}
        >
          {/* BACKGROUND DECORATION */}
          <View
            style={{
              position: "absolute",
              top: -50,
              right: -40,
              width: 200,
              height: 200,
              borderRadius: 200,
              backgroundColor: "#C46A4D",
              opacity: 0.04,
            }}
          />
          <View
            style={{
              position: "absolute",
              bottom: 80,
              left: -30,
              width: 150,
              height: 150,
              borderRadius: 150,
              backgroundColor: "#7A9E7E",
              opacity: 0.03,
            }}
          />

          {/* ILLUSTRATION */}
          <View style={{ alignItems: "center", marginBottom: 40 }}>
            <Image
              source={require("../../assets/images/Tea.png")}
              style={{
                width: width * 0.45,
                height: width * 0.45,
                resizeMode: "contain",
              }}
            />
          </View>

          {/* TITLE */}
          <Text
            style={{
              fontSize: 32,
              color: "#2C2C2C",
              fontWeight: "700",
              marginBottom: 8,
              letterSpacing: -0.3,
              textAlign: "center",
            }}
          >
            Welcome back
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: "#9E9E9E",
              fontWeight: "400",
              marginBottom: 40,
              lineHeight: 22,
              textAlign: "center",
            }}
          >
            Continue with phone or social account
          </Text>

          {/* PHONE INPUT */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#FFFFFF",
              borderRadius: 32,
              height: 56,
              paddingHorizontal: 18,
              marginBottom: 20,
              borderWidth: 1,
              borderColor: "#F0EDE8",
            }}
          >
            <CountryPicker
              countryCode={countryCode}
              withFlag
              withCallingCode
              withFilter
              withEmoji
              onSelect={(country) => {
                setCountryCode(country.cca2);
                setCallingCode(country.callingCode[0]);
              }}
            />

            <Text
              style={{
                marginLeft: 6,
                color: "#2C2C2C",
                fontSize: 16,
                fontWeight: "600",
                marginRight: 10,
              }}
            >
              +{callingCode}
            </Text>

            <TextInput
              placeholder="Phone number"
              placeholderTextColor="#D4D0CC"
              keyboardType="phone-pad"
              value={phone}
              maxLength={10}
              onChangeText={(text) => {
                const cleaned = text.replace(/[^0-9]/g, "").slice(0, 10);
                setPhone(cleaned);
              }}
              style={{
                fontSize: 16,
                flex: 1,
                color: "#2C2C2C",
                fontWeight: "500",
              }}
            />
          </View>

          {/* LOGIN BUTTON */}
          <Link
            href={{
              pathname: "/LoginOTP",
            }}
            asChild
          >
            <TouchableOpacity
              activeOpacity={isValidPhone ? 0.8 : 1}
              disabled={!isValidPhone}
              style={{
                width: "100%",
                height: 56,
                backgroundColor: isValidPhone ? "#C46A4D" : "#EFEFEF",
                borderRadius: 28,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 24,
                shadowColor: isValidPhone ? "#C46A4D" : "transparent",
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: isValidPhone ? 0.12 : 0,
                shadowRadius: 16,
                elevation: isValidPhone ? 3 : 0,
              }}
            >
              <Text
                style={{
                  color: isValidPhone ? "#FFFFFF" : "#C0C0C0",
                  fontSize: 17,
                  fontWeight: "600",
                  letterSpacing: 0.3,
                }}
              >
                Continue with Phone
              </Text>
            </TouchableOpacity>
          </Link>

          {/* DIVIDER */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              marginBottom: 24,
            }}
          >
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: "#E8E4E0",
              }}
            />
            <Text
              style={{
                marginHorizontal: 16,
                color: "#BDBDBD",
                fontSize: 13,
                fontWeight: "500",
                letterSpacing: 0.3,
              }}
            >
              OR
            </Text>
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: "#E8E4E0",
              }}
            />
          </View>

          {/* SOCIAL BUTTONS - Row */}
          <View
            style={{
              flexDirection: "row",
              gap: 14,
              marginBottom: 32,
            }}
          >
            {/* GOOGLE BUTTON */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleGoogleSignIn}
              style={{
                flex: 1,
                height: 56,
                borderRadius: 28,
                backgroundColor: "#FFFFFF",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#F0EDE8",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.04,
                shadowRadius: 6,
                elevation: 1,
              }}
            >
              <Image
                source={require("../../assets/icons/google.png")}
                style={{
                  width: 22,
                  height: 22,
                  resizeMode: "contain",
                  marginRight: 10,
                }}
              />
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "600",
                  color: "#4A4A4A",
                }}
              >
                Google
              </Text>
            </TouchableOpacity>

            {/* APPLE BUTTON */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleAppleSignIn}
              style={{
                flex: 1,
                height: 56,
                borderRadius: 28,
                backgroundColor: "#FFFFFF",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#F0EDE8",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.04,
                shadowRadius: 6,
                elevation: 1,
              }}
            >
              <Image
                source={require("../../assets/icons/appleicon.png")}
                style={{
                  width: 22,
                  height: 22,
                  resizeMode: "contain",
                  marginRight: 10,
                }}
              />
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "600",
                  color: "#4A4A4A",
                }}
              >
                Apple
              </Text>
            </TouchableOpacity>
          </View>

          {/* BACK TO SIGNUP */}
          <Link href="/getstarted" asChild>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{ alignItems: "center" }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: "#C8C4C0",
                  fontWeight: "500",
                }}
              >
                Don't have an account?{" "}
                <Text style={{ color: "#C46A4D", fontWeight: "600" }}>
                  Sign up
                </Text>
              </Text>
            </TouchableOpacity>
          </Link>

          {/* TERMS & PRIVACY (Small) */}
          <Text
            style={{
              fontSize: 10,
              color: "#C8C4C0",
              textAlign: "center",
              marginTop: 32,
              lineHeight: 16,
            }}
          >
            By continuing, you agree to our{" "}
            <Text style={{ color: "#C46A4D" }}>Terms</Text> and{" "}
            <Text style={{ color: "#C46A4D" }}>Privacy Policy</Text>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}