import { Platform } from "react-native";
import Toast from "react-native-toast-message";

const notImplemented = (title: string) => {
  info(title, "This feature is not implemented yet");
};

const info = (title: string, subtitle?: string) => {
  showToast(title, "info", subtitle);
};

const error = (title: string, subtitle?: string) => {
  showToast(title, "error", subtitle);
};

const success = (title: string, subtitle?: string) => {
  showToast(title, "success", subtitle);
};

const showToast = (title: string, type: string, subtitle?: string) => {
  Toast.show({
    topOffset: Platform.OS === "ios" ? 100 : 50,
    type: type,
    text1: title,
    text2: subtitle,
    position: "top",
    visibilityTime: 3000,
    autoHide: true,
  });
};

export default {
  notImplemented,
  info,
  error,
  success,
};
