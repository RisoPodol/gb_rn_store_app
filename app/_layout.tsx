import { Stack } from "expo-router";

import Toast from "react-native-toast-message";
import "./global.css";
import GlobalProvider from "./lib/global-provider";

export default function RootLayout() {
  return (
    <>
      <GlobalProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </GlobalProvider>
      <Toast />
    </>
  );
}
