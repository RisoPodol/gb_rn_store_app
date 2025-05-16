import icons from "@/constants/icons";
import { useState } from "react";
import {
  Image,
  KeyboardTypeOptions,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface Props {
  placeholder: string;
  errorMessage: string | null;
  isSecureTextEntry?: boolean;
  onChangeText?: ((text: string) => void) | undefined;
  returnKeyType?: "done" | "go" | "next" | "search" | "send";
  onSubmitEditing?: () => void;
  inputRef?: React.RefObject<TextInput | null>;
  keyboardType?: KeyboardTypeOptions | undefined;
}

const InputField = ({
  placeholder,
  errorMessage,
  isSecureTextEntry = false,
  onChangeText,
  returnKeyType = "done",
  onSubmitEditing,
  inputRef,
  keyboardType = "default",
}: Props) => {
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);

  return (
    <View className="flex flex-col mb-3">
      <View
        className={`flex flex-row items-center border ${
          Platform.OS === "ios" ? "p-5" : "py-1 px-5"
        } ${
          errorMessage
            ? "border-red-500"
            : focused
            ? "border-black"
            : "border-gray-300"
        }`}
      >
        <TextInput
          ref={inputRef}
          className="flex-1 text-black text-xl w-full"
          placeholder={placeholder}
          placeholderTextColor="#D2D5DA"
          secureTextEntry={isSecureTextEntry ? !visible : false}
          onChangeText={(text) => onChangeText?.(text)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          keyboardType={keyboardType}
        />
        {isSecureTextEntry && (
          <TouchableOpacity
            onPress={() => setVisible(!visible)}
            className="ml-3"
          >
            <Image
              source={visible ? icons.eyeHide : icons.eyeShow}
              className="size-8 "
              tintColor={"#D2D5DA"}
            />
          </TouchableOpacity>
        )}
      </View>
      {errorMessage && (
        <Text className="text-primary mt-1 text-right">{errorMessage}</Text>
      )}
    </View>
  );
};

export default InputField;
