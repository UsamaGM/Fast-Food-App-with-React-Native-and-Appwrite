import CustomButton from "@/components/CustomButton";
import CustomHeader from "@/components/CustomHeader";
import CustomOutlinedButton from "@/components/CustomOutlinedButton";
import ProfileEditField from "@/components/ProfileEditField";
import ProfilePicture from "@/components/ProfilePicture";
import { images } from "@/constants";
import { updateEmail, updateName } from "@/lib/auth.appwrite";
import useAuthStore from "@/store/auth.store";
import { ProfileOptions } from "@/type";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";

function UpdateProfile() {
  const { user, setUser } = useAuthStore();

  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<ProfileOptions>(null);
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "+923238027692",
    address1: "123 Main Street, Karachi, Pakistan",
    address2: "321 Main Street, Karachi, Pakistan",
  });

  function handleEdit(field: ProfileOptions) {
    setEditing(field);
  }

  async function handleUpdateName() {
    setLoading(true);

    try {
      await updateName({
        newName: form.name,
        prevName: user!.name,
        userId: user!.$id,
      });
      setUser({ ...user!, name: form.name });
      setEditing(null);
    } catch (e) {
      console.log(e);
      Alert.alert("Error", "Failed to update name");
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateEmail() {
    setLoading(true);

    try {
      await updateEmail({
        newEmail: form?.email,
        prevEmail: user!.email,
        userId: user!.$id,
        password: form.password,
      });
      setUser({ ...user!, email: form.email });
      setEditing(null);
    } catch {
      Alert.alert("Error", "Failed to update email");
    } finally {
      setLoading(false);
    }
  }

  function handleDummySave() {
    Alert.alert("Success", "Dummy data saved successfully");
    setEditing(null);
  }

  async function handleSaveAll() {
    if (editing) {
      Alert.alert("Editing", "Complete editing all fields to save");
      return;
    }

    Promise.all([handleUpdateName(), handleUpdateEmail()]);
  }

  function handleCancel() {
    router.back();
  }

  return (
    <ScrollView className="bg-white p-5">
      <CustomHeader title="Update Profile" />

      <ProfilePicture picSource={user?.avatar || images.avatar} />

      <View className="mb-6">
        <Text className="h3-bold text-dark-100 mb-4">Personal Information</Text>

        <View className="gap-y-2">
          <ProfileEditField
            label="Full Name"
            value={form.name}
            iconPath={images.user}
            placeholder="Enter your full name"
            onChangeText={(text) => setForm({ ...form, name: text })}
            fieldKey="name"
            editing={editing}
            onEdit={handleEdit}
            onSave={handleUpdateName}
          />

          <ProfileEditField
            label="Email Address"
            value={form.email}
            iconPath={images.envelope}
            placeholder="Enter your email address"
            keyboardType="email-address"
            onChangeText={(text) => setForm({ ...form, email: text })}
            fieldKey="email"
            editing={editing}
            onEdit={handleEdit}
            onSave={handleUpdateEmail}
          />

          <ProfileEditField
            label="Phone Number"
            value={form.phone}
            iconPath={images.phone}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
            onChangeText={(text) => setForm({ ...form, phone: text })}
            fieldKey="phone"
            editing={editing}
            onEdit={handleEdit}
            onSave={handleDummySave}
          />
        </View>
      </View>

      <View className="mb-6">
        <Text className="h3-bold text-dark-100 mb-4">Address Information</Text>

        <View className="gap-y-2">
          <ProfileEditField
            label="Home Address"
            value={form.address1}
            iconPath={images.location}
            placeholder="Enter your home address"
            onChangeText={(text) => setForm({ ...form, address1: text })}
            fieldKey="address"
            editing={editing}
            onEdit={handleEdit}
            onSave={handleDummySave}
          />

          <ProfileEditField
            label="Work Address"
            value={form.address2}
            iconPath={images.location}
            placeholder="Enter your work address"
            onChangeText={(text) => setForm({ ...form, address2: text })}
            fieldKey="address"
            editing={editing}
            onEdit={handleEdit}
            onSave={handleDummySave}
          />
        </View>
      </View>

      <View className="flex flex-col gap-y-4 mt-8">
        <CustomButton
          title="Save All Changes"
          onPress={handleSaveAll}
          isLoading={loading}
        />

        <CustomOutlinedButton
          title="Cancel"
          style="border-gray-300"
          textStyle="text-gray-500"
          onPress={handleCancel}
        />
      </View>
    </ScrollView>
  );
}

export default UpdateProfile;
