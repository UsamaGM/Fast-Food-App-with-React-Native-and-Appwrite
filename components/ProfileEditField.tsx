import { images } from "@/constants";
import { ProfileEditFieldProps } from "@/type";
import { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";

function ProfileEditField({
  label,
  value,
  iconPath,
  placeholder,
  keyboardType = "default",
  onChangeText,
  fieldKey,
  editing,
  onEdit,
  onSave,
}: ProfileEditFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const isEditing = editing === fieldKey;

  const handleEditPress = () => {
    if (isEditing) {
      onSave?.();
    } else {
      onEdit(fieldKey);
    }
  };

  return (
    <View className="profile-field">
      <View className="profile-field__icon">
        <Image source={iconPath} className="size-8" resizeMode="contain" />
      </View>

      <View className="flex-1 flex flex-col justify-between py-2">
        <Text className="text-gray-200 mb-1">{label}</Text>

        {isEditing ? (
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            autoFocus={true}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            keyboardType={keyboardType}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholderTextColor="#888"
            className={`paragraph-bold text-dark-100 border-b-2 pb-1 ${
              isFocused ? "border-primary" : "border-gray-300"
            }`}
          />
        ) : (
          <Text className="paragraph-bold text-dark-100">
            {value || placeholder}
          </Text>
        )}
      </View>

      <TouchableOpacity
        onPress={handleEditPress}
        className="flex-center p-2 ml-2"
      >
        <Image
          source={isEditing ? images.check : images.pencil}
          className="size-5"
          tintColor={isEditing ? "#22c55e" : "#6b7280"}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
}

export default ProfileEditField;
