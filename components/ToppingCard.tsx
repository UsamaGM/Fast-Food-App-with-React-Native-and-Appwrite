import { images } from "@/constants";
import { CartCustomization } from "@/type";
import { View, Text, Image, TouchableOpacity } from "react-native";

function ToppingCard({ item }: { item: CartCustomization }) {
  return (
    <View
      className="rounded-2xl bg-[#392D2D] min-w-24 w-fit"
      style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
    >
      <View className="bg-white rounded-2xl flex-center">
        <Image
          source={{ uri: item.image_url }}
          className="size-20"
          resizeMode="contain"
        />
      </View>

      <View className="flex-between flex-row gap-x-2 p-2">
        <Text className="text-white-100">{item.name}</Text>
        <TouchableOpacity
          className="rounded-full p-1 bg-error"
          onPress={() => console.log("Onion pressed")}
        >
          <Image
            source={images.plus}
            className="size-3"
            tintColor="white"
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ToppingCard;
