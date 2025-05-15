import { Stack } from "expo-router";

import Toast from "react-native-toast-message";
import GlobalProvider from "../lib/global-provider";
import "./global.css";

export default function RootLayout() {
  return (
    <>
      <GlobalProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </GlobalProvider>
      <Toast />
    </>
  );
}
