import {
  Animated,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import CountryPicker from "react-native-country-picker-modal";

const router = useRouter();

export default function GetStartedScreen() {
  const [countryCode, setCountryCode] = useState("IN");
  const [callingCode, setCallingCode] = useState("91");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const isValidPhone = phone.length === 10;
  const generateOTP = async () => {
    if (phone.length < 10) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }
    try {
      setLoading(true);
      const response = await fetch("http://192.168.29.69:8000/generate-otp/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone: phone }),
      });

      const data = await response.json();
      console.log("OTP generated successfully:", data);
      router.push({
        pathname: "/otp",
        params: {
          phone: phone,
        },
      });
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 900,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "#FEF9F2" }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={["#FEF9F2", "#FFFFFF", "#FEF9F2"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            flex: 1,
            alignItems: "center",
            paddingHorizontal: 28,
            paddingTop: 60,
            paddingBottom: 48,
            justifyContent: "center",
          }}
        >
          {/* BACKGROUND DECORATION - Organic Shapes */}
          <View
            style={{
              position: "absolute",
              top: -60,
              right: -50,
              width: 220,
              height: 220,
              borderRadius: 220,
              backgroundColor: "#C46A4D",
              opacity: 0.06,
            }}
          />
          <View
            style={{
              position: "absolute",
              bottom: 120,
              left: -40,
              width: 160,
              height: 160,
              borderRadius: 160,
              backgroundColor: "#7A9E7E",
              opacity: 0.05,
            }}
          />

          {/* ILLUSTRATION - Cartoon vector of two people together */}
          <Animated.Image
            source={require("../../assets/images/Tea.png")} // ← REPLACE with your cartoon vector
            style={{
              width: 280,
              height: 220,
              marginBottom: 48,
              resizeMode: "contain",
              opacity: fadeAnim,
              borderRadius: 32,
              transform: [{ translateY: slideAnim }],
            }}
          />

          {/* MAIN TITLE */}
          <Text
            style={{
              fontSize: 36,
              color: "#2C2C2C",
              marginBottom: 12,
              textAlign: "center",
              fontWeight: "800",
              lineHeight: 44,
              letterSpacing: -0.5,
            }}
          >
            You don't have{"\n"}to go alone
          </Text>

          {/* SUBTITLE */}
          <Text
            style={{
              fontSize: 15,
              color: "#9E9E9E",
              marginBottom: 56,
              textAlign: "center",
              fontWeight: "500",
              lineHeight: 24,
              letterSpacing: 0.3,
            }}
          >
            Enter your phone number to get started
          </Text>

          {/* PHONE INPUT SECTION */}
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
              marginBottom: 48,
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#FFFFFF",
                borderRadius: 32,
                height: 60,
                paddingHorizontal: 18,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.06,
                shadowRadius: 12,
                elevation: 3,
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
                placeholderTextColor="#C8C4C0"
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

            {/* NEXT BUTTON */}
            <TouchableOpacity
              onPress={generateOTP}
              disabled={!isValidPhone}
              activeOpacity={0.8}
              style={{
                width: 60,
                height: 60,
                backgroundColor: isValidPhone ? "#C46A4D" : "#EFEFEF",
                borderRadius: 32,
                justifyContent: "center",
                alignItems: "center",
                shadowColor: isValidPhone ? "#C46A4D" : "transparent",
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: isValidPhone ? 0.2 : 0,
                shadowRadius: 16,
                elevation: isValidPhone ? 4 : 0,
              }}
            >
              <Image
                source={require("../../assets/icons/right.png")}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: isValidPhone ? "#FFFFFF" : "#BDBDBD",
                  resizeMode: "contain",
                }}
              />
            </TouchableOpacity>
          </View>

          {/* FOOTER TEXT */}
          <Text
            style={{
              fontSize: 13,
              color: "#BDBDBD",
              marginTop: 8,
              textAlign: "center",
              fontWeight: "500",
              lineHeight: 20,
              letterSpacing: 0.2,
            }}
          >
            We'll send a verification code to your phone
          </Text>
        </LinearGradient>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
