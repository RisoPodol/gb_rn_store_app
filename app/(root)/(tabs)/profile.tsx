import { logout } from "@/app/lib/api";
import { useGlobalContext } from "@/app/lib/global-provider";
import icons from "@/constants/icons";
import React from "react";
import {
  Alert,
  Image,
  ImageSourcePropType,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

interface SettingsItemProps {
  icon: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  textStyle?: string;
  showArrow?: boolean;
}

const SettingsItem = ({
  icon,
  title,
  onPress,
  textStyle,
  showArrow = true,
}: SettingsItemProps) => (
  <TouchableOpacity
    className="flex flex-row items-center justify-between p-4 mb-3 border border-black-400"
    onPress={onPress}
  >
    <View className="flex flex-row items-center gap-3">
      <Image source={icon} className="size-6 " />
      <Text className={`text-lg font-semibold text-black-300 ${textStyle}`}>
        {title}
      </Text>
    </View>
    {showArrow && <Image source={icons.arrowRight} className="size-5" />}
  </TouchableOpacity>
);

const Profile = () => {
  const { refetch } = useGlobalContext();
  const handleLogout = async () => {
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
          onPress: async () => {
            const result = await logout();

            if (result) {
              Toast.show({
                topOffset: 60,
                type: "success",
                text1: "Logged out successfully",
                position: "top",
                visibilityTime: 3000,
                autoHide: true,
              });
              refetch();
            } else {
              Toast.show({
                topOffset: 60,
                type: "error",
                text1: "Failed to Logout",
                position: "top",
                visibilityTime: 3000,
                autoHide: true,
              });
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 px-6"
      >
        <Text className="text-2xl font-bold text-center pt-2">
          Hello, Richard
        </Text>

        <View className="flex flex-col mt-4  ">
          <SettingsItem icon={icons.profile} title="Account info" />
          <SettingsItem
            icon={icons.logout}
            showArrow={false}
            title="Logout"
            onPress={handleLogout}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
