import { Category } from "@/type";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Text, FlatList, TouchableOpacity, Platform } from "react-native";
import cn from "clsx";

function Filter({ categories }: { categories: Category[] }) {
  const searchParms = useLocalSearchParams();
  const [active, setActive] = useState(searchParms.category || "");

  function handlePress(id: string) {
    setActive(id);

    if (id === "all") router.setParams({ category: undefined });
    else router.setParams({ category: id });
  }

  const filterData: (Category | { $id: string; name: string })[] = categories
    ? [{ $id: "all", name: "All" }, ...categories]
    : [{ $id: "all", name: "All" }];

  return (
    <FlatList
      data={filterData}
      keyExtractor={(item) => item.$id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="gap-x-2 pb-3"
      renderItem={({ item }) => (
        <TouchableOpacity
          className={cn(
            "filter",
            active === item.$id ? "bg-amber-500" : "bg-white",
          )}
          style={
            Platform.OS === "android"
              ? { elevation: 5, shadowColor: "#878787" }
              : {}
          }
          onPress={() => handlePress(item.$id)}
        >
          <Text
            className={cn(
              "body-medium",
              active === item.$id ? "text-white" : "text-gray-500",
            )}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
}

export default Filter;
