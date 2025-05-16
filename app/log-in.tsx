import InputField from "@/components/InputField";
import images from "@/constants/images";
import { login, register } from "@/lib/api";
import { useGlobalContext } from "@/lib/global-provider";
import toasts from "@/utils/toasts";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TabView } from "react-native-tab-view";

const LoginForm = () => {
  const { refetch, loading, isLoggedIn } = useGlobalContext();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const passwordRef = useRef<TextInput>(null);

  const handleLogin = async () => {
    let hasError = false;
    if (!username) {
      setUsernameError("Email is required");
      hasError = true;
    } else {
      setUsernameError(null);
    }

    if (!password) {
      setPasswordError("Password is required");
      hasError = true;
    } else {
      setPasswordError(null);
    }

    if (!hasError) {
      const result = await login({ username: username, password: password });

      if (result) {
        refetch();
      } else {
        toasts.error("Failed to Log In");
      }
    }
  };

  return (
    <View className="px-6">
      <InputField
        placeholder="Username"
        errorMessage={usernameError}
        onChangeText={(text) => {
          if (text) setUsernameError(null);
          setUsername(text);
        }}
        returnKeyType="next"
        onSubmitEditing={() => passwordRef.current?.focus()}
      />
      <InputField
        placeholder="Password"
        errorMessage={passwordError}
        isSecureTextEntry={true}
        onChangeText={(text) => {
          if (text) setPasswordError(null);
          setPassword(text);
        }}
        returnKeyType="done"
        onSubmitEditing={handleLogin}
        inputRef={passwordRef}
      />

      <TouchableOpacity
        className="my-4"
        onPress={() => toasts.notImplemented("Forgot Password")}
      >
        <Text className="text-black-300 text-base underline">
          Forgot your password?
        </Text>
      </TouchableOpacity>

      <TouchableOpacity className="bg-primary p-5" onPress={handleLogin}>
        <Text className="text-white text-lg font-medium text-center uppercase">
          Log In
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const RegisterForm = ({ setIndex }: { setIndex: (index: number) => void }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const handleRegister = async () => {
    console.log("username: ", username);
    console.log("email: ", email);
    console.log("password: ", password);
    let hasError = false;

    if (!username) {
      setUsernameError("Username is required");
      hasError = true;
    } else {
      setUsernameError(null);
    }

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!email) {
      setEmailError("Email is required");
      hasError = true;
    } else if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      hasError = true;
    } else {
      setEmailError(null);
    }

    if (!password) {
      setPasswordError("Password is required");
      hasError = true;
    } else if (password.trim().length < 8) {
      console.log(password.trim().length);
      setPasswordError("Password does not match the criteria");
      hasError = true;
    } else {
      setPasswordError(null);
    }

    if (!hasError) {
      const result = await register({
        username: username,
        email: email,
        password: password,
      });

      if (result) {
        setIndex(0);
        toasts.success("Registration successful", "You can now Log In");
      } else {
        toasts.error("Failed to Log In");
      }
    }
  };

  return (
    <View className="px-6">
      <InputField
        placeholder="Username"
        errorMessage={usernameError}
        onChangeText={(text) => {
          if (text) setUsernameError(null);
          setUsername(text);
        }}
        returnKeyType="next"
        onSubmitEditing={() => emailRef.current?.focus()}
      />
      <InputField
        placeholder="E-mail"
        errorMessage={emailError}
        onChangeText={(text) => {
          if (text) setEmailError(null);
          setEmail(text);
        }}
        returnKeyType="next"
        inputRef={emailRef}
        onSubmitEditing={() => passwordRef.current?.focus()}
        keyboardType="email-address"
      />
      <InputField
        placeholder="Password"
        errorMessage={passwordError}
        isSecureTextEntry={true}
        onChangeText={(text) => {
          if (text) setPasswordError(null);
          console.log("password", text);
          setPassword(text);
        }}
        returnKeyType="done"
        onSubmitEditing={handleRegister}
        inputRef={passwordRef}
      />
      <View className="pb-5">
        <Text className="text-black-400">
          The minimum number of characters is 8. Leading and trailing spaces
          will be ignored.
        </Text>
      </View>

      <TouchableOpacity className="bg-primary p-5" onPress={handleRegister}>
        <Text className="text-white text-lg font-medium text-center uppercase">
          Create an account
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const routes = [
  { key: "login", title: "Log In" },
  { key: "register", title: "New Account" },
];

const LogIn = () => {
  const { refetch, loading, isLoggedIn } = useGlobalContext();

  useEffect(() => {
    if (!loading && isLoggedIn) {
      toasts.success("Logged In successfully new");
      router.replace("/");
    }
  }, [loading, isLoggedIn]);

  const [index, setIndex] = useState(0);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      enableOnAndroid={false}
      extraScrollHeight={20}
    >
      <Image
        source={images.logoBig}
        className="h-20 w-full my-20"
        resizeMode="contain"
      />
      <TabView
        navigationState={{ index, routes }}
        renderScene={({ route }) => {
          switch (route.key) {
            case "login":
              return <LoginForm />;
            case "register":
              return <RegisterForm setIndex={setIndex} />;
            default:
              return null;
          }
        }}
        onIndexChange={setIndex}
        renderTabBar={() => (
          <View className="flex-row mx-6 mb-4">
            {routes.map((route) => (
              <TouchableOpacity
                key={route.key}
                className={`flex-1 p-5 ${
                  index === routes.indexOf(route)
                    ? "border border-black"
                    : "border border-black-400"
                }`}
                onPress={() => setIndex(routes.indexOf(route))}
              >
                <Text className="text-center">{route.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        initialLayout={{ width: Dimensions.get("window").width }}
      />
    </KeyboardAwareScrollView>
  );
};

export default LogIn;
