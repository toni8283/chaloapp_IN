const BASE_URL = "http://192.168.29.69:8000";

export const generateOTP = async (phone) => {
  try {
    const response = await fetch(`${BASE_URL}/generate-otp/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone: phone }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error generating OTP:", error);
    throw error;
  }
};
