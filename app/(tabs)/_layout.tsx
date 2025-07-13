import { Redirect, Slot } from "expo-router";

function TabsLayout() {
  const isAuthenticated = false;

  if (!isAuthenticated) return <Redirect href="/(auth)/sign-in" />;
  return <Slot />;
}

export default TabsLayout;
