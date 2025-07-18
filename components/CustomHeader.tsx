import { images } from "@/constants";
import { CustomHeaderProps } from "@/type";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, Image } from "react-native";

function CustomHeader({ title, secondRow }: CustomHeaderProps) {
  const router = useRouter();

  return (
    <View>
      <View className="custom-header__row">
        <TouchableOpacity onPress={() => router.back()}>
          <Image
            source={images.arrowBack}
            className="size-5"
            resizeMode="contain"
          />
        </TouchableOpacity>

        {title && <Text className="base-semibold text-dark-100">{title}</Text>}

        <Image source={images.search} className="size-5" resizeMode="contain" />
      </View>

      {secondRow}
    </View>
  );
}

export default CustomHeader;
