import { Image, View } from "react-native";

interface Props {
  focused: boolean;
  icon: any;
}

const TabIcon = ({ focused, icon }: Props) => (
  <View className="flex-1 mt-3 flex flex-col items-center">
    <Image
      source={icon}
      className="size-6"
      tintColor={focused ? "#EB542D" : "#000000"}
      resizeMode="contain"
    />
  </View>
);

export default TabIcon;
