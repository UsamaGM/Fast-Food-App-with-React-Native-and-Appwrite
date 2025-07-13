import { images } from "@/contants";
import { Image, Text, TouchableOpacity, View } from "react-native";

function CartButton() {
  const totalItems = 5;
  return (
    <TouchableOpacity
      className="cart-btn"
      onPress={() => console.log("Push cart to screen")}
    >
      <Image source={images.bag} className="size-5" resizeMode="contain" />

      {totalItems > 0 && (
        <View className="cart-badge">
          <Text className="small-bold text-white">{totalItems}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

export default CartButton;
