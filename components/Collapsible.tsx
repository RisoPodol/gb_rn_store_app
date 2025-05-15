import icons from "@/constants/icons";
import { PropsWithChildren, useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export function Collapsible({
  children,
  title,
  scrollRef,
}: PropsWithChildren & {
  title: string;
  scrollRef?: React.RefObject<ScrollView | null>;
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen && scrollRef?.current) {
      scrollRef.current.scrollTo({
        y: 300,
        animated: true,
      });
    }
  }, [isOpen, scrollRef]);

  return (
    <View className="border-b border-black-400">
      <TouchableOpacity
        className="flex flex-row items-center justify-between py-4 "
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}
      >
        <Text className="font-semibold text-black-300">{title}</Text>
        <Image
          source={icons.arrowRight}
          className={`size-5 ${isOpen ? "-rotate-90" : "rotate-90"}`}
        />
      </TouchableOpacity>

      {isOpen && <View className="pb-4">{children}</View>}
    </View>
  );
}
