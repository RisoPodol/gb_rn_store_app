import SettingsItem from "@/components/SettingsItem";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { logout } from "@/lib/api";
import { useGlobalContext } from "@/lib/global-provider";
import logoutAlert from "@/utils/alerts";
import toasts from "@/utils/toasts";
import React from "react";
import { Image, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const { refetch } = useGlobalContext();
  const handleLogout = async () => {
    logoutAlert(async () => {
      const result = await logout();
      if (result) {
        toasts.success("Logged Out successfully");
        refetch();
      } else {
        toasts.error("Failed to Logout");
      }
    });
  };

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 px-6"
      >
        <Image
          source={images.logoSmall}
          className="size-20 mx-auto m-4 rounded-full"
        />

        <View className="flex flex-col mt-4  ">
          <SettingsItem
            icon={icons.profile}
            title="Account info"
            onPress={() => toasts.notImplemented("Account info")}
          />
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
