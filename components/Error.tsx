import images from "@/constants/images";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface Props {
  title?: string;
  description?: string;
  onTryAgain?: () => void;
  buttonText?: string;
}

const Error = ({ title, description, onTryAgain, buttonText }: Props) => {
  return (
    <View className="flex-col flex-1 w-full items-center justify-center bg-white ">
      <Image source={images.error} className="size-60 mb-4" />
      <Text className="text-xl font-bold px-10 pb-1 text-center">
        {title ?? "Something went wrong"}
      </Text>
      {description && (
        <Text className="text px-16 text-center">{description}</Text>
      )}
      {onTryAgain && (
        <TouchableOpacity
          className="mt-4 bg-primary px-12 py-3"
          onPress={onTryAgain}
        >
          <Text className="text-white font-bold text-base">
            {buttonText ?? "Try Again"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Error;
