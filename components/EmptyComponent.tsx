import { images } from "@/constants";
import { EmptyComponentProps } from "@/type";
import { Image, View, Text } from "react-native";

function EmptyComponent({ title, subtitle }: EmptyComponentProps) {
  return (
    <View className="flex-center flex-col">
      <Image
        source={images.emptyState}
        className="size-52"
        resizeMode="contain"
      />
      <Text className="h3-bold">{title}</Text>
      <Text className="mt-5 text-gray-200 text-center">{subtitle}</Text>
    </View>
  );
}

export default EmptyComponent;
