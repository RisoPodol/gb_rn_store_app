import icons from "@/constants/icons";
import images from "@/constants/images";
import toasts from "@/utils/toasts";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { login } from "../lib/api";
import { useGlobalContext } from "../lib/global-provider";

const LogIn = () => {
  const { refetch, loading, isLoggedIn } = useGlobalContext();

  useEffect(() => {
    if (!loading && isLoggedIn) {
      toasts.success("Logged In successfully new");
      router.replace("/");
    }
  }, [loading, isLoggedIn]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleLogin = async () => {
    let hasError = false;
    if (!email) {
      setEmailError("Email is required");
      hasError = true;
    } else {
      setEmailError(null);
    }

    if (!password) {
      setPasswordError("Password is required");
      hasError = true;
    } else {
      setPasswordError(null);
    }

    if (!hasError) {
      // const result = await login({ username: email, password: password });
      const result = await login();

      if (result) {
        refetch();
      } else {
        toasts.error("Failed to Log In");
      }
    }
  };

  const handleRegister = async () => {
    // const result = await register();
    // if (result != null) {
    //   console.log("Registration successful");
    //   // Navigate to the next screen or perform any other action
    // } else {
    //   console.log("Registration failed");
    //   // Show an error message or handle the failure
    // }
  };

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView className="h-full px-6">
        <Image
          source={images.logoBig}
          className="h-20 w-full my-20"
          resizeMode="contain"
        />

        <View className="flex flex-row border border-black-400 mb-4">
          <TouchableOpacity
            className="flex flex-1 bg-white p-3 items-center border border-black"
            onPress={() => {}}
          >
            <Text className="text-lg font-medium text-black">Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex flex-1 bg-white p-3 items-center"
            onPress={handleRegister}
          >
            <Text className="text-lg font-medium text-black-400">
              New account
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex flex-col mb-3">
          <View
            className={`flex items-center border p-5 ${
              emailError
                ? "border-red-500"
                : emailFocused
                ? "border-black"
                : "border-gray-300"
            }`}
          >
            <TextInput
              className="text-black text-xl w-full"
              placeholder="E-mail"
              placeholderTextColor="#D2D5DA"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={(text) => {
                if (text) setEmailError(null);
                setEmail(text);
              }}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
            />
          </View>
          {emailError && (
            <Text className="text-primary mt-1 text-right">{emailError}</Text>
          )}
        </View>

        <View className="flex flex-col mb-3">
          <View
            className={`flex flex-row items-center border p-5 ${
              passwordError
                ? "border-red-500"
                : passwordFocused
                ? "border-black"
                : "border-gray-300"
            }`}
          >
            <TextInput
              className="flex-1 text-black text-xl w-full"
              placeholder="Password"
              placeholderTextColor="#D2D5DA"
              secureTextEntry={!passwordVisible}
              onChangeText={(text) => {
                if (text) setPasswordError(null);
                setPassword(text);
              }}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
              className="ml-3"
            >
              <Image
                source={passwordVisible ? icons.eyeHide : icons.eyeShow}
                className="size-8 "
                tintColor={"#D2D5DA"}
              />
            </TouchableOpacity>
          </View>
          {passwordError && (
            <Text className="text-primary mt-1 text-right">
              {passwordError}
            </Text>
          )}
        </View>

        <TouchableOpacity className="my-4">
          <Text className="text-black-300 text-base underline">
            Forgot Password?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="bg-primary p-5" onPress={handleLogin}>
          <Text className="text-white text-lg font-medium text-center uppercase">
            Log In
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LogIn;
