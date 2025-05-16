import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
  text: string;
  onPress: () => void;
}

const BottomScreenButton = ({ text, onPress }: Props) => (
  <View className="absolute bg-white bottom-0 w-full p-7">
    <TouchableOpacity className="bg-primary p-4" onPress={onPress}>
      <Text className="text-white text-center uppercase text-xl">{text}</Text>
    </TouchableOpacity>
  </View>
);

export default BottomScreenButton;
