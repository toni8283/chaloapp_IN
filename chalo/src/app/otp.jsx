import React, { useRef, useState, useEffect } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";

const { width } = Dimensions.get("window");

export default function OtpScreen() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputs = useRef([]);

  // Timer countdown
  useEffect(() => {
    let interval;
    if (timer > 0 && !canResend) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0 && !canResend) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer, canResend]);

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text.replace(/[^0-9]/g, "");
    setOtp(newOtp);

    if (text && index < 3) {
      inputs.current[index + 1].focus();
    }
  };

  const handleBackspace = (text, index) => {
    if (!text && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleResend = () => {
    if (canResend) {
      setTimer(30);
      setCanResend(false);
      setOtp(["", "", "", ""]);
      inputs.current[0].focus();
      // TODO: Trigger actual OTP resend API call
    }
  };

  const isOtpComplete = otp.every((digit) => digit !== "");

  // Auto-submit when OTP is complete
  useEffect(() => {
    if (isOtpComplete) {
      // Small delay for better UX
      const timeout = setTimeout(() => {
        // TODO: Trigger OTP verification
        console.log("OTP submitted:", otp.join(""));
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [isOtpComplete, otp]);

  return (
    <LinearGradient
      colors={["#FEF9F2", "#FFFFFF", "#FEF9F2"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        flex: 1,
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 28,
            paddingTop: 60,
            paddingBottom: 48,
            justifyContent: "center",
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* BACKGROUND DECORATION - Organic Shapes */}
          <View
            style={{
              position: "absolute",
              top: -50,
              right: -40,
              width: 200,
              height: 200,
              borderRadius: 200,
              backgroundColor: "#C46A4D",
              opacity: 0.05,
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
              opacity: 0.04,
            }}
          />

          {/* MAIN TITLE */}
          <Text
            style={{
              fontSize: 34,
              color: "#2C2C2C",
              fontWeight: "800",
              marginBottom: 12,
              letterSpacing: -0.5,
              lineHeight: 44,
            }}
          >
            Enter code
          </Text>

          {/* SUBTITLE */}
          <Text
            style={{
              fontSize: 15,
              color: "#9E9E9E",
              fontWeight: "500",
              lineHeight: 24,
              marginBottom: 56,
              letterSpacing: 0.3,
            }}
          >
            We've sent a 4-digit code to your phone number
          </Text>

          {/* OTP INPUTS */}
          <View
            style={{
              flexDirection: "row",
              gap: 14,
              justifyContent: "center",
              marginBottom: 64,
            }}
          >
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputs.current[index] = ref)}
                value={digit}
                onChangeText={(text) => handleChange(text, index)}
                onKeyPress={({ nativeEvent }) => {
                  if (nativeEvent.key === "Backspace") {
                    handleBackspace(digit, index);
                  }
                }}
                keyboardType="number-pad"
                maxLength={1}
                textAlign="center"
                placeholder="_"
                placeholderTextColor="#D4D0CC"
                style={{
                  width: width * 0.18,
                  height: width * 0.18,
                  maxWidth: 72,
                  maxHeight: 72,
                  borderRadius: 20,
                  backgroundColor: digit ? "#FFFFFF" : "#FAFAFA",
                  fontSize: 32,
                  color: "#C46A4D",
                  fontWeight: "700",
                  borderWidth: digit ? 1.5 : 1,
                  borderColor: digit ? "#C46A4D" : "#F0EDE8",
                  textAlign: "center",
                  shadowColor: digit ? "#C46A4D" : "transparent",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: digit ? 0.12 : 0,
                  shadowRadius: 12,
                  elevation: digit ? 3 : 0,
                }}
              />
            ))}
          </View>

          {/* RESEND SECTION */}
          <View
            style={{
              marginBottom: 56,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#BDBDBD",
                fontSize: 14,
                fontWeight: "500",
                letterSpacing: 0.2,
                marginBottom: 8,
              }}
            >
              Didn't receive a code?
            </Text>
            {canResend ? (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={handleResend}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Text
                  style={{
                    color: "#C46A4D",
                    fontSize: 16,
                    fontWeight: "700",
                    letterSpacing: 0.3,
                  }}
                >
                  Send again
                </Text>
              </TouchableOpacity>
            ) : (
              <Text
                style={{
                  color: "#D4D0CC",
                  fontSize: 15,
                  fontWeight: "600",
                  letterSpacing: 0.3,
                }}
              >
                Resend in {timer}s
              </Text>
            )}
          </View>

          {/* CONTINUE BUTTON */}
          <Link href="/profileset" asChild>
            <TouchableOpacity
              activeOpacity={isOtpComplete ? 0.8 : 1}
              disabled={!isOtpComplete}
              style={{
                width: "100%",
                height: 60,
                backgroundColor: isOtpComplete ? "#C46A4D" : "#EFEFEF",
                borderRadius: 32,
                justifyContent: "center",
                alignItems: "center",
                shadowColor: isOtpComplete ? "#C46A4D" : "transparent",
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: isOtpComplete ? 0.15 : 0,
                shadowRadius: 20,
                elevation: isOtpComplete ? 4 : 0,
              }}
            >
              <Text
                style={{
                  color: isOtpComplete ? "#FFFFFF" : "#C0C0C0",
                  fontSize: 17,
                  fontWeight: "700",
                  letterSpacing: 0.4,
                }}
              >
                Verify & Continue
              </Text>
            </TouchableOpacity>
          </Link>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}