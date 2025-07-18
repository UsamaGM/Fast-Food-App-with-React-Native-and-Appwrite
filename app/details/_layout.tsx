import useAuthStore from "@/store/auth.store";
import { Redirect, Stack } from "expo-router";

export default function Layout() {
  const { isAuthenticated, isLoading } = useAuthStore();

  console.log(isAuthenticated);

  if (!isAuthenticated && !isLoading) {
    return <Redirect href="/sign-in" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
