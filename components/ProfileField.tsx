import { ProfileDetailRowProps } from "@/type";
import { View, Text, Image } from "react-native";

function ProfileField({ label, value, iconPath }: ProfileDetailRowProps) {
  return (
    <View className="profile-field">
      <View className="profile-field__icon">
        <Image source={iconPath} className="size-8" resizeMode="contain" />
      </View>

      <View className="flex flex-col justify-between py-2">
        <Text className=" text-gray-200">{label}</Text>
        <Text className="paragraph-bold">{value}</Text>
      </View>
    </View>
  );
}

export default ProfileField;
