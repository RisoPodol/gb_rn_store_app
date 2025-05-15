import icons from "@/constants/icons";
import { Product } from "@/types";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface Props {
  item: Product;
  onPress?: () => void;
}

const Card = ({ item, onPress }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-1 w-full mt-4 px-2 py-2 "
    >
      <Image
        source={{ uri: item.image }}
        className="w-full h-40"
        resizeMode="contain"
      />

      <View className="flex flex-col mt-2">
        <Text className="text-base  text-black-300" numberOfLines={2}>
          {item.title}
        </Text>
        <View className="flex flex-row items-center py-1">
          <Image source={icons.star} className="size-3" tintColor="#EB542D" />
          <Text className="text-xs px-1">{item.rating.rate}</Text>
          <Text className="text-xs text-black-400">({item.rating.count})</Text>
        </View>
        <Text className="font-bold  text-primary ">
          {item.price.toFixed(2).replace(".", ",")} €
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Card;
