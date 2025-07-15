import CartItem from "@/components/CartItem";
import CustomButton from "@/components/CustomButton";
import CustomHeader from "@/components/CustomHeader";
import CustomOutlinedButton from "@/components/CustomOutlinedButton";
import EmptyComponent from "@/components/EmptyComponent";
import { useCartStore } from "@/store/cart.store";
import { PaymentInfoStripeProps } from "@/type";
import cn from "clsx";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function PaymentInfoStripe({
  label,
  value,
  labelStyle,
  valueStyle,
}: PaymentInfoStripeProps) {
  return (
    <View className="flex-between flex-row my-1">
      <Text className={cn("paragraph-medium text-gray-200", labelStyle)}>
        {label}
      </Text>
      <Text className={cn("paragraph-bold text-dark-100", valueStyle)}>
        {value}
      </Text>
    </View>
  );
}

function Cart() {
  const { items, getTotalItems, getTotalPrice } = useCartStore();

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        data={items}
        renderItem={({ item }) => <CartItem item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerClassName="pb-28 px-5 pt-5"
        ListHeaderComponent={() => (
          <CustomHeader
            title="Your Cart"
            secondRow={
              <View className="custom-header__row">
                <View>
                  <Text className="paragraph-bold text-primary">
                    DELIVERY LOCATION
                  </Text>
                  <Text className="h3-bold">Home</Text>
                </View>

                <CustomOutlinedButton
                  title="Change Location"
                  style="border-primary"
                  textStyle="text-primary"
                />
              </View>
            }
          />
        )}
        ListEmptyComponent={() => (
          <EmptyComponent
            title="Nothing to show here"
            subtitle="Add some delicious items to the cart and they show up here"
          />
        )}
        ListFooterComponent={() =>
          totalItems > 0 && (
            <View className="gap-5">
              <View className="mt-6 border border-gray-200 p-5 rounded-2xl">
                <Text className="h3-bold text-dark-100 mb-5">
                  Payment Summary
                </Text>
                <PaymentInfoStripe
                  label={`Total Items ${totalItems}`}
                  value={`Rs. ${totalPrice.toFixed(2)}`}
                />
                <PaymentInfoStripe label="Delivery Charges" value="Rs. 59" />
                <PaymentInfoStripe
                  label="Discount"
                  value="Rs. -100"
                  valueStyle="!text-success"
                />
                <View className="border-t border-gray-300 my-2" />
                <PaymentInfoStripe
                  label="Total Amount"
                  value={`Rs. ${(totalPrice + 59 - 100).toFixed(2)}`}
                  labelStyle="base-bold !text-dark-100"
                  valueStyle="base-bold !text-dark-100 !text-right"
                />
              </View>

              <CustomButton title="Order Now" />
            </View>
          )
        }
      />
    </SafeAreaView>
  );
}

export default Cart;
