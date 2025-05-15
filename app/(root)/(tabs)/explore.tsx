import icons from "@/constants/icons";
import React from "react";
import { Image, Text, View } from "react-native";

const Explore = () => {
  return (
    <View className="flex-col flex-1 w-full items-center justify-center bg-white ">
      <Image
        source={icons.explore}
        className="size-20 mb-4"
        tintColor="#EB542D"
      />
      <Text className="text-xl font-bold">Explore products</Text>
      <Text className="text-xs">This page is not implemented yet</Text>
    </View>
  );
};

export default Explore;
