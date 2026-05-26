import { Link } from "expo-router";
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Logo from "../../assets/icons/logo.svg"; // Importing the circular graphic as a React component

const { width } = Dimensions.get("window");

// Base colors for the new theme
const THEME_BG = "#ECDBD2"; // Warm beige background
const THEME_INK = "#1F1F1F"; // Dark grey/black for text, borders, and icons

export default function HomeScreen() {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={THEME_BG} />
      <SafeAreaView style={{ flex: 1, backgroundColor: THEME_BG }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
              paddingHorizontal: 28,
              paddingTop: 60,
              paddingBottom: 40,
              backgroundColor: THEME_BG,
            }}
          >
            {/* LOGO */}
            <View style={{ alignItems: "center", marginBottom: 60 }}>
              <Image
                source={require("../../assets/images/bgtext.png")} // Using your existing logo image
                style={{
                  width: 200,
                  height: 60,
                  resizeMode: "contain",
                  tintColor: THEME_INK, // Forces the logo to match the dark ink color
                }}
              />
            </View>

            {/* CENTRAL GRAPHIC */}
            <View
              style={{
                alignItems: "center",
                marginBottom: 70,
              }}
            >
              <View
                style={{
                  width: width * 0.4,
                  height: width * 0.4,
                  borderRadius: (width * 0.4) / 2,
                  overflow: "hidden",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Logo width={width * 0.4} height={width * 0.4} />
              </View>
            </View>

            {/* PRIMARY BUTTON - Create Account */}
            <Link href="/getstarted" asChild>
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  width: "75%", // Narrower width to match the screenshot
                  height: 52,
                  backgroundColor: "transparent",
                  borderRadius: 30,
                  borderWidth: 1.5,
                  borderColor: THEME_INK,
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 16,
                }}
              >
                <Text
                  style={{
                    color: THEME_INK,
                    fontSize: 16,
                    fontWeight: "500",
                    letterSpacing: 0.3,
                  }}
                >
                  Create Account
                </Text>
              </TouchableOpacity>
            </Link>

            {/* SECONDARY BUTTON - Have an Account */}
            <Link href="/dash" asChild>
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  width: "75%",
                  height: 52,
                  backgroundColor: "transparent",
                  borderRadius: 30,
                  borderWidth: 1.5,
                  borderColor: THEME_INK,
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 32,
                }}
              >
                <Text
                  style={{
                    color: THEME_INK,
                    fontSize: 16,
                    fontWeight: "500",
                    letterSpacing: 0.3,
                  }}
                >
                  Have an Account
                </Text>
              </TouchableOpacity>
            </Link>

            {/* DIVIDER */}
            <Text
              style={{
                color: THEME_INK,
                fontSize: 14,
                fontWeight: "400",
                marginBottom: 24,
              }}
            >
              Or
            </Text>

            {/* SOCIAL ICONS */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 28, // Spacing between the icons
                marginBottom: 40,
              }}
            >
              <TouchableOpacity activeOpacity={0.6}>
                <Image
                  source={require("../../assets/icons/appleicon.png")}
                  style={{
                    width: 26,
                    height: 26,
                    resizeMode: "contain",
                    tintColor: THEME_INK, // Monochrome styling
                  }}
                />
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.6}>
                <Image
                  source={require("../../assets/icons/google.png")}
                  style={{
                    width: 26,
                    height: 26,
                    resizeMode: "contain",
                  }}
                />
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.6}>
                <Image
                  source={require("../../assets/icons/fb.png")}
                  style={{
                    width: 26,
                    height: 26,
                    resizeMode: "contain",
                    tintColor: "#55aaff", // Monochrome styling
                  }}
                />
              </TouchableOpacity>
            </View>

            {/* FLEX SPACER to push terms to the very bottom if screen is tall */}
            <View style={{ flex: 1 }} />

            {/* TERMS & PRIVACY */}
            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 11,
                  color: THEME_INK,
                  opacity: 0.6, // Slight fade for the footer text
                  textAlign: "center",
                  lineHeight: 16,
                  letterSpacing: 0.2,
                }}
              >
                By continuing, you agree to our{" "}
                <Text style={{ fontWeight: "600" }}>Terms</Text> and{" "}
                <Text style={{ fontWeight: "600" }}>Privacy Policy</Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
