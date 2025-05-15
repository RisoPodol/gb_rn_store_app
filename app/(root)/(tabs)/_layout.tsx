import icons from "@/constants/icons";
import images from "@/constants/images";
import { PlatformPressable } from "@react-navigation/elements";
import { Tabs } from "expo-router";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";

const TabIcon = ({ focused, icon }: { focused: boolean; icon: any }) => (
  <View className="flex-1 mt-3 flex flex-col items-center">
    <Image
      source={icon}
      className="size-6"
      tintColor={focused ? "#EB542D" : "#000000"}
      resizeMode="contain"
    />
  </View>
);

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarButton: (props) => (
          <PlatformPressable
            {...props}
            android_ripple={{ color: "transparent" }}
          />
        ),
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "white",
          position: "absolute",
          borderTopColor: "#D2D5DA",
          borderTopWidth: 1,
          minHeight: 70,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: () => (
            <Image
              source={images.logoText}
              className="size-28"
              resizeMode="contain"
            />
          ),
          headerTitleAlign: "center",
          headerRight: () => (
            <TouchableOpacity className="mr-6">
              <Image source={icons.logout} className="size-5" />
            </TouchableOpacity>
          ),
          tabBarIconStyle: {},
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.homeGb} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.explore} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.cart} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.profile} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
