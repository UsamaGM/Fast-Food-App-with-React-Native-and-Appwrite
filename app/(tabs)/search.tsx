import CartButton from "@/components/CartButton";
import EmptyComponent from "@/components/EmptyComponent";
import Filter from "@/components/Filter";
import MenuCard from "@/components/MenuCard";
import SearchBar from "@/components/SearchBar";
import { getCategories, getMenu } from "@/lib/data.appwrite";
import useAppwrite from "@/lib/useAppwrite";
import { Category, MenuItem } from "@/type";
import cn from "clsx";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function Search() {
  const { category, query } = useLocalSearchParams<{
    category: string;
    query: string;
  }>();

  const { data, refetch, loading } = useAppwrite({
    fn: getMenu,
    params: { category, query, limit: 6 },
  });
  const { data: categories } = useAppwrite({ fn: getCategories });

  useEffect(() => {
    refetch({ category, query, limit: 6 });
  }, [category, query]);

  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        data={data}
        renderItem={({ item, index }) => {
          const isFirstRightColItem = index % 2 === 0;

          return (
            <View
              className={cn(
                "flex-1 max-w-[48%]",
                isFirstRightColItem ? "mt-0" : "mt-10",
              )}
            >
              <MenuCard item={item as MenuItem} />
            </View>
          );
        }}
        keyExtractor={(item) => item.$id}
        numColumns={2}
        columnWrapperClassName="gap-7"
        contentContainerClassName="gap-7 px-5 pb-32"
        ListHeaderComponent={() => (
          <View className="my-5 gap-5">
            <View className="flex-between flex-row w-full">
              <View className="flex-start">
                <Text className="small-bold uppercase text-primary">
                  Search
                </Text>
                <View className="flex-start flex-row gap-x-1 mt-0.5">
                  <Text className="paragraph-semibold text-gray-200">
                    Find the Food you Love
                  </Text>
                </View>
              </View>
              <CartButton />
            </View>

            <SearchBar />
            {data && data.length > 0 && (
              <Filter categories={categories as Category[]} />
            )}
          </View>
        )}
        ListEmptyComponent={() =>
          !loading && (
            <EmptyComponent
              title="Nothing matched your search"
              subtitle="Try a different search term or check for typos"
            />
          )
        }
      />
    </SafeAreaView>
  );
}

export default Search;
