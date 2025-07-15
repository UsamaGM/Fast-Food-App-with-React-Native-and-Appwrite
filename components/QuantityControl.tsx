import { images } from "@/constants";
import { CartItemType } from "@/type";
import { View, TouchableOpacity, Image, Text } from "react-native";

function QuantityControl({
  item,
  onIncrease,
  onDecrease,
  size = "small",
}: {
  item: CartItemType;
  onDecrease: () => void;
  onIncrease: () => void;
  size?: "small" | "large";
}) {
  return (
    <View className="flex flex-row items-center gap-x-4 mt-2">
      <TouchableOpacity onPress={onDecrease} className="cart-item__actions">
        <Image
          source={images.minus}
          className={size === "small" ? "size-3" : "size-5"}
          resizeMode="contain"
          tintColor="#FF9C01"
        />
      </TouchableOpacity>

      <Text className="base-bold text-dark-100">{item.quantity}</Text>

      <TouchableOpacity onPress={onIncrease} className="cart-item__actions">
        <Image
          source={images.plus}
          className={size === "small" ? "size-3" : "size-5"}
          resizeMode="contain"
          tintColor="#FF9C01"
        />
      </TouchableOpacity>
    </View>
  );
}

export default QuantityControl;
