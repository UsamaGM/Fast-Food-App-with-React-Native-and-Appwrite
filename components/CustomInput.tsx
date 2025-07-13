import { CustomInputProps } from "@/type";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";

function CustomInput({
  placeholder = "Enter Text",
  value,
  onChangeText,
  label,
  secureTextEntry = false,
  keyboardType = "default",
}: CustomInputProps) {
  const [isFocuced, setIsFocuced] = useState<boolean>(false);
  return (
    <View className="w-full">
      <Text className="label">{label}</Text>

      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        onFocus={() => setIsFocuced(true)}
        onBlur={() => setIsFocuced(false)}
        placeholderTextColor="#888"
        className={`input ${isFocuced ? "border-primary" : "border-gray-300"}`}
      />
    </View>
  );
}

export default CustomInput;
