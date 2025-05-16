import { Alert } from "react-native";

const logoutAlert = (onPress: () => void) => {
  Alert.alert(
    "Logout",
    "Are you sure you want to logout?",
    [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        style: "destructive",
        onPress,
      },
    ],
    { cancelable: false }
  );
};

export default logoutAlert;
