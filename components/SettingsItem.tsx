import icons from "@/constants/icons";
import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Props {
  icon?: ImageSourcePropType;
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
}: Props) => (
  <TouchableOpacity
    className="flex flex-row items-center justify-between p-4 mb-3 border border-black-400"
    onPress={onPress}
  >
    <View className="flex flex-row items-center gap-3">
      {icon && <Image source={icon} className="size-6 " />}
      <Text className={`text-lg font-semibold text-black-300 ${textStyle}`}>
        {title}
      </Text>
    </View>
    {showArrow && <Image source={icons.arrowRight} className="size-5" />}
  </TouchableOpacity>
);

export default SettingsItem;
