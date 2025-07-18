import CustomHeader from "@/components/CustomHeader";
import CustomOutlinedButton from "@/components/CustomOutlinedButton";
import ProfileField from "@/components/ProfileField";
import ProfilePicture from "@/components/ProfilePicture";
import { images } from "@/constants";
import { signOut } from "@/lib/auth.appwrite";
import useAuthStore from "@/store/auth.store";
import { router } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, View } from "react-native";

function Profile() {
  const [isLoading, setIsLoading] = useState(false);
  const { user, setIsAuthenticated } = useAuthStore();

  async function handleLogout() {
    setIsLoading(true);
    await signOut();
    setIsAuthenticated(false);
    setIsLoading(false);
  }

  return (
    <ScrollView className="bg-white p-5">
      <CustomHeader title="Profile" />

      <ProfilePicture picSource={user?.avatar!} />

      <View className="my-3">
        <ProfileField
          label="Full Name"
          value={user?.name}
          iconPath={images.user}
        />
        <ProfileField
          label="Email"
          value={user?.email}
          iconPath={images.envelope}
        />
        <ProfileField
          label="Phone Number"
          value="+923238027692"
          iconPath={images.phone}
        />
        <ProfileField
          label="Address 1 - (Home)"
          value="123 Main Street, Karachi, Pakistan"
          iconPath={images.location}
        />
        <ProfileField
          label="Address 2 - (Work)"
          value="321 Main Street, Karachi, Pakistan"
          iconPath={images.location}
        />
      </View>

      <View className="flex flex-col gap-y-5">
        <CustomOutlinedButton
          title="Edit Profile"
          style="border-primary bg-primary/10"
          textStyle="text-primary"
          onPress={() => router.push("/update-profile")}
        />
        <CustomOutlinedButton
          title="Logout"
          leftIcon={<Image source={images.logout} className="size-6" />}
          style="border-error bg-error/10"
          textStyle="text-error"
          onPress={handleLogout}
          isLoading={isLoading}
        />
      </View>
    </ScrollView>
  );
}

export default Profile;
