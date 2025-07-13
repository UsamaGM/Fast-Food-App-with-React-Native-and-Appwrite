import useAuthStore from "@/store/auth.store";
import { Redirect, Slot } from "expo-router";

function TabsLayout() {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) return <Redirect href="/sign-in" />;
  return <Slot />;
}

export default TabsLayout;
