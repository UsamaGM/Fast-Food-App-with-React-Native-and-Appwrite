import { images } from "@/constants";
import { useCartStore } from "@/store/cart.store";
import { CartItemType } from "@/type";
import { View, Text, Image, TouchableOpacity } from "react-native";
import BouncyCheckBox from "react-native-bouncy-checkbox";
import QuantityControl from "./QuantityControl";

function CartItem({ item }: { item: CartItemType }) {
  const { increaseQty, decreaseQty, removeItem } = useCartStore();

  return (
    <View
      className="cart-item"
      style={{ elevation: 5, shadowColor: "#878787" }}
    >
      <View className="flex flex-row items-center gap-x-3">
        <View className="my-auto -ml-1 -mr-5">
          <BouncyCheckBox />
        </View>
        <View className="cart-item__image">
          <Image
            source={{ uri: item.image_url }}
            className="size-4/5 rounded-lg"
          />
        </View>

        <View>
          <Text className="base-bold text-dark-100">{item.name}</Text>
          <Text className="paragraph-bold text-primary mt-1">
            Rs. {item.price}
          </Text>

          <QuantityControl
            item={item}
            onDecrease={() => decreaseQty(item.id, item.customizations!)}
            onIncrease={() => increaseQty(item.id, item.customizations!)}
          />
        </View>
      </View>

      <TouchableOpacity
        onPress={() => removeItem(item.id, item.customizations!)}
        className="flex-center absolute bottom-5 right-5"
      >
        <Image source={images.trash} className="size-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
}

export default CartItem;
