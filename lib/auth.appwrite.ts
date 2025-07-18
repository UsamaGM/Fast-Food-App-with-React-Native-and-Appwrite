import {
  CreateUserParams,
  SignInParams,
  UpdateEmailParams,
  UpdateNameParams,
  UpdatePasswordParams,
  UpdatePrefsParams,
} from "@/type";
import { Avatars, ID, Query } from "react-native-appwrite";
import { account, appwriteConfig, client, databases } from "./appwrite";
import { Alert } from "react-native";

const avatars = new Avatars(client);

export async function createUser({ name, email, password }: CreateUserParams) {
  try {
    const newAccount = await account.create(ID.unique(), email, password, name);
    if (!newAccount) throw Error;

    await signIn({ email, password });

    const avatarUrl = avatars.getInitialsURL(name);

    return await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      { name, email, accountId: newAccount.$id, avatar: avatarUrl },
    );
  } catch (e) {
    throw new Error(e as string);
  }
}

export async function signIn({ email, password }: SignInParams) {
  try {
    await account.createEmailPasswordSession(email, password);
  } catch (e) {
    throw new Error(e as string);
  }
}

export async function signOut() {
  try {
    await account.deleteSession("current");
  } catch (e) {
    throw new Error(e as string);
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)],
    );

    return currentUser.documents[0];
  } catch (e) {
    throw new Error(e as string);
  }
}

export async function updateEmail({
  newEmail,
  prevEmail,
  password,
  userId,
}: UpdateEmailParams) {
  if (newEmail === prevEmail) return Alert.alert("Email is same");
  if (!newEmail.trim()) return Alert.alert("Email is invalid");

  try {
    await Promise.all([
      account.updateEmail(newEmail, password),
      databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        userId,
        { email: newEmail },
      ),
    ]);
    Alert.alert("Success", "Email updated successfully");
  } catch (e) {
    throw new Error(e as string);
  }
}

export async function updateName({
  newName,
  prevName,
  userId,
}: UpdateNameParams) {
  if (newName === prevName) throw new Error("Name is the same");
  if (!newName.trim()) throw new Error("Name cannot be empty");

  try {
    await Promise.all([
      account.updateName(newName),
      databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        userId,
        { name: newName },
      ),
    ]);
    Alert.alert("Success", "Name updated successfully");
  } catch (e) {
    throw new Error(e as string);
  }
}

export async function updatePassword({
  newPassword,
  oldPassword,
}: UpdatePasswordParams) {
  try {
    return await account.updatePassword(newPassword, oldPassword);
  } catch (e) {
    throw new Error(e as string);
  }
}

export async function updatePrefs({ theme }: UpdatePrefsParams) {
  try {
    await account.updatePrefs({ theme });
  } catch (e) {
    throw new Error(e as string);
  }
}
