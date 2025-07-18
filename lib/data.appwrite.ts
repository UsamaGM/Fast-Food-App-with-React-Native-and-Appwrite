import { Category, GetMenuParams, MenuCustomization, MenuItem } from "@/type";
import { Query } from "react-native-appwrite";
import { appwriteConfig, databases } from "./appwrite";

export async function getMenu({ category, query }: GetMenuParams) {
  try {
    const queries: string[] = [];

    if (category) queries.push(Query.equal("categories", category));
    if (query) queries.push(Query.search("name", query));

    const menus = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.menuCollectionId,
      queries,
    );

    return menus.documents as MenuItem[];
  } catch (e) {
    throw new Error(e as string);
  }
}

export async function getMenuItem({ id }: { id: string }) {
  try {
    const doc = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.menuCollectionId,
      id,
    );

    return doc as MenuItem;
  } catch (e) {
    throw new Error(e as string);
  }
}

export async function getCategories() {
  try {
    const categories = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.categoriesCollectionId,
    );

    return categories.documents as Category[];
  } catch (e) {
    throw new Error(e as string);
  }
}

export async function getCustomizations() {
  try {
    const customizations = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.customizationsCollectionId,
      [Query.limit(6)],
    );

    return customizations.documents as MenuCustomization[];
  } catch (e) {
    throw new Error(e as string);
  }
}
