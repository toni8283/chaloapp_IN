import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import * as ImagePicker from "expo-image-picker";

const { width, height } = Dimensions.get("window");

export default function ProfileSetupScreen() {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [photo, setPhoto] = useState(null);
  const [genderModalVisible, setGenderModalVisible] = useState(false);

  const isFormComplete = name.trim() !== "" && gender !== "" && age !== "";

  const genderOptions = ["Male", "Female", "Prefer not to say"];

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission needed to add profile photo");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  return (
    <LinearGradient
      colors={["#FEF9F2", "#FFFFFF", "#FEF9F2"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
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

        {/* PROGRESS INDICATOR */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 32,
            gap: 8,
          }}
        >
          <View
            style={{
              width: 28,
              height: 4,
              borderRadius: 2,
              backgroundColor: "#C46A4D",
            }}
          />
          <View
            style={{
              width: 28,
              height: 4,
              borderRadius: 2,
              backgroundColor: "#C46A4D",
            }}
          />
          <View
            style={{
              width: 28,
              height: 4,
              borderRadius: 2,
              backgroundColor: "#E8E4E0",
            }}
          />
        </View>

        {/* TITLE */}
        <Text
          style={{
            fontSize: 34,
            color: "#2C2C2C",
            fontWeight: "700",
            marginBottom: 6,
            letterSpacing: -0.3,
            textAlign: "center",
          }}
        >
          Profile setup
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: "#9E9E9E",
            fontWeight: "400",
            marginBottom: 40,
            lineHeight: 20,
            textAlign: "center",
          }}
        >
          Just a few details
        </Text>

        {/* PROFILE PHOTO */}
        <View style={{ alignItems: "center", marginBottom: 28 }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={pickImage}
            style={{
              width: 88,
              height: 88,
              borderRadius: 44,
              backgroundColor: "#FAFAFA",
              borderWidth: 1,
              borderColor: "#F0EDE8",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            {photo ? (
              <Image
                source={{ uri: photo }}
                style={{ width: "100%", height: "100%" }}
              />
            ) : (
              <Text style={{ fontSize: 26, color: "#D4D0CC" }}>+</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* NAME */}
        <View style={{ marginBottom: 16 }}>
          <Text
            style={{
              fontSize: 13,
              color: "#9E9E9E",
              fontWeight: "500",
              marginBottom: 6,
              letterSpacing: 0.3,
            }}
          >
            Your name
          </Text>
          <TextInput
            placeholder="Rohan"
            placeholderTextColor="#D4D0CC"
            value={name}
            onChangeText={setName}
            style={{
              width: "100%",
              height: 48,
              backgroundColor: "#FFFFFF",
              borderRadius: 24,
              paddingHorizontal: 18,
              fontSize: 15,
              fontWeight: "500",
              color: "#2C2C2C",
              borderWidth: 1,
              borderColor: "#F0EDE8",
            }}
          />
        </View>

        {/* GENDER + AGE - Row layout to save space */}
        <View
          style={{
            flexDirection: "row",
            gap: 14,
            marginBottom: 16,
          }}
        >
          {/* GENDER */}
          <View style={{ flex: 2 }}>
            <Text
              style={{
                fontSize: 13,
                color: "#9E9E9E",
                fontWeight: "500",
                marginBottom: 6,
                letterSpacing: 0.3,
              }}
            >
              Gender
            </Text>
            <TouchableOpacity
              onPress={() => setGenderModalVisible(true)}
              style={{
                width: "100%",
                height: 48,
                backgroundColor: "#FFFFFF",
                borderRadius: 24,
                paddingHorizontal: 18,
                justifyContent: "center",
                borderWidth: 1,
                borderColor: "#F0EDE8",
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  color: gender ? "#2C2C2C" : "#D4D0CC",
                  fontWeight: gender ? "500" : "400",
                }}
              >
                {gender || "Select"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* AGE */}
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 13,
                color: "#9E9E9E",
                fontWeight: "500",
                marginBottom: 6,
                letterSpacing: 0.3,
              }}
            >
              Age
            </Text>
            <TextInput
              placeholder="18"
              placeholderTextColor="#D4D0CC"
              keyboardType="number-pad"
              value={age}
              onChangeText={setAge}
              maxLength={2}
              style={{
                width: "100%",
                height: 48,
                backgroundColor: "#FFFFFF",
                borderRadius: 24,
                paddingHorizontal: 18,
                fontSize: 15,
                fontWeight: "500",
                color: "#2C2C2C",
                textAlign: "center",
                borderWidth: 1,
                borderColor: "#F0EDE8",
              }}
            />
          </View>
        </View>

        {/* CONTINUE BUTTON */}
        <Link href="/dash" asChild>
          <TouchableOpacity
            activeOpacity={isFormComplete ? 0.8 : 1}
            disabled={!isFormComplete}
            style={{
              width: "100%",
              height: 54,
              backgroundColor: isFormComplete ? "#C46A4D" : "#EFEFEF",
              borderRadius: 27,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 24,
              shadowColor: isFormComplete ? "#C46A4D" : "transparent",
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: isFormComplete ? 0.12 : 0,
              shadowRadius: 16,
              elevation: isFormComplete ? 3 : 0,
            }}
          >
            <Text
              style={{
                color: isFormComplete ? "#FFFFFF" : "#C0C0C0",
                fontSize: 17,
                fontWeight: "600",
                letterSpacing: 0.3,
              }}
            >
              Start Exploring
            </Text>
          </TouchableOpacity>
        </Link>

        {/* SKIP OPTION */}
        <Link href="/feed" asChild>
          <TouchableOpacity
            activeOpacity={0.7}
            style={{ alignItems: "center", marginTop: 16 }}
          >
            <Text
              style={{
                fontSize: 13,
                color: "#C8C4C0",
                fontWeight: "500",
              }}
            >
              Skip for now
            </Text>
          </TouchableOpacity>
        </Link>
      </View>

      {/* GENDER MODAL */}
      <Modal
        visible={genderModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setGenderModalVisible(false)}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.3)",
            justifyContent: "flex-end",
          }}
          activeOpacity={1}
          onPress={() => setGenderModalVisible(false)}
        >
          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderTopLeftRadius: 28,
              borderTopRightRadius: 28,
              paddingHorizontal: 24,
              paddingTop: 24,
              paddingBottom: 40,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: "#2C2C2C",
                textAlign: "center",
                marginBottom: 20,
              }}
            >
              Select gender
            </Text>
            {genderOptions.map((option) => (
              <TouchableOpacity
                key={option}
                onPress={() => {
                  setGender(option);
                  setGenderModalVisible(false);
                }}
                style={{
                  paddingVertical: 16,
                  borderBottomWidth: 1,
                  borderBottomColor: "#F0EDE8",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: gender === option ? "#C46A4D" : "#2C2C2C",
                    fontWeight: gender === option ? "600" : "400",
                    textAlign: "center",
                  }}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </LinearGradient>
  );
}