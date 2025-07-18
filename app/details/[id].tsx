import CustomHeader from "@/components/CustomHeader";
import QuantityControl from "@/components/QuantityControl";
import ToppingCard from "@/components/ToppingCard";
import { images } from "@/constants";
import { getMenuItem } from "@/lib/data.appwrite";
import useAppwrite from "@/lib/useAppwrite";
import { useCartStore } from "@/store/cart.store";
import {
  CartCustomization,
  IconWithTextProps,
  MenuCustomization,
  TitleSubtitleProps,
  ToppingListProps,
} from "@/type";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function IconWithText({ iconPath, text }: IconWithTextProps) {
  return (
    <View className="flex-between flex-row gap-x-2">
      <Image source={iconPath} className="size-5" resizeMode="contain" />
      <Text className="text-dark-100 font-semibold">{text}</Text>
    </View>
  );
}

function TitleSubtitle({ title, subtitle }: TitleSubtitleProps) {
  return (
    <View>
      <Text className="text-gray-200 h3-semibold">{title}</Text>
      <Text className="text-dark-100 h3-bold">{subtitle}</Text>
    </View>
  );
}

function StarRating({ rating }: { rating: number }) {
  const filledStars = Math.round(rating);
  const emptyStars = 5 - filledStars;

  return (
    <View className="flex-row items-center gap-x-0.5">
      {[...Array(filledStars)].map((_, index) => (
        <Image
          key={`filled-${index}`}
          source={images.star}
          className="size-5"
          resizeMode="contain"
          tintColor="#fe8c00"
        />
      ))}
      {[...Array(emptyStars)].map((_, index) => (
        <Image
          key={`empty-${index}`}
          source={images.star}
          className="size-5"
          resizeMode="contain"
          tintColor="#d1d5db"
        />
      ))}
      <Text className="paragraph-semibold text-gray-200">{rating}/5</Text>
    </View>
  );
}

function ToppingList({ title, items, emptyText }: ToppingListProps) {
  return (
    <View className="mb-6">
      <Text className="h3-bold mb-2">{title}</Text>
      <FlatList
        horizontal
        data={items}
        renderItem={({ item }) => (
          <ToppingCard item={item.customizations as CartCustomization} />
        )}
        ListEmptyComponent={() => (
          <View>
            <Text>{emptyText}</Text>
          </View>
        )}
        contentContainerClassName="gap-x-3 py-2"
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

function MenuItemDetails() {
  const { id } = useLocalSearchParams();

  const [quantity, setQuantity] = useState(0);

  const { data, loading } = useAppwrite({
    fn: getMenuItem,
    params: { id: id as string },
  });

  const { addItem } = useCartStore();

  if (loading) return <ActivityIndicator />;
  if (!data)
    return (
      <View>
        <Text>The Menu Item not found! Try something else maybe?</Text>
      </View>
    );

  const menuCustomizations = data?.menuCustomizations as MenuCustomization[];
  const toppings: MenuCustomization[] = [];
  const sidings: MenuCustomization[] = [];
  menuCustomizations.forEach((c) =>
    c.customizations.type === "topping" ? toppings.push(c) : sidings.push(c),
  );

  function handleDecrease() {
    if (quantity > 0) setQuantity((prev) => prev - 1);
  }

  function handleIncrease() {
    setQuantity((prev) => prev + 1);
  }

  function handleAddItemToCart() {
    if (quantity === 0) return;
    addItem({ ...data!, id: data!.$id, quantity });
    setQuantity(0);
  }

  return (
    <SafeAreaView className="bg-white">
      <ScrollView className="flex p-6 h-[90%]">
        <CustomHeader />

        {/* Menu Item Card */}
        <View className="flex items-start flex-col w-full min-h-80 relative gap-y-5">
          <View className="absolute -right-24">
            <Image
              source={{ uri: data.image_url }}
              className="size-80"
              resizeMode="contain"
            />
          </View>

          <View>
            <Text className="h1-bold" numberOfLines={1}>
              {data.name}
            </Text>
            <Text className="h3-bold text-gray-100 my-3">
              {data.categories.name}
            </Text>
            <StarRating rating={data.rating} />
          </View>

          <Text className="h1-bold">
            <Text className="text-primary">Rs.</Text> {data.price}
          </Text>

          <View className="flex-center flex-row gap-x-6">
            <TitleSubtitle title="Calories" subtitle={data.calories} />
            <TitleSubtitle title="Protein" subtitle={data.protein} />
          </View>

          <TitleSubtitle title="Bun Type" subtitle="Whole Wheat" />
        </View>

        {/* Delivery Info Stripe */}
        <View className="flex-between flex-row rounded-full bg-primary/10 p-5 my-6">
          <IconWithText iconPath={images.dollar} text="Free Delivery" />
          <IconWithText iconPath={images.clock} text="20 - 30 mins" />
          <IconWithText iconPath={images.star} text="4.5" />
        </View>

        <Text className="text-gray-200 paragraph-semibold mb-6">
          {data.description}
        </Text>

        <ToppingList
          title="Toppings"
          items={toppings}
          emptyText="No Toppings for this item"
        />

        <ToppingList
          title="Side Options"
          items={sidings}
          emptyText="No Side Options for this item"
        />
      </ScrollView>

      <View className="w-full px-5 h-[10%]">
        <View
          className="flex-between flex-row items-center p-3 mb-2 rounded-3xl w-full bg-white"
          style={{
            boxShadow: "0px 0px 5px #87878755",
          }}
        >
          <QuantityControl
            item={{ ...data, id: data.$id, quantity }}
            onDecrease={handleDecrease}
            onIncrease={handleIncrease}
            size="large"
          />

          <TouchableOpacity
            className="flex-center flex-row items-center gap-x-2 rounded-full bg-primary p-3"
            onPress={handleAddItemToCart}
          >
            <Image
              source={images.bag}
              className="size-5"
              resizeMode="contain"
            />
            <Text className="text-white base-bold">
              Add to Cart (Rs. {(quantity * data.price).toFixed(1)})
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default MenuItemDetails;
