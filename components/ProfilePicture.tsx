import { images } from "@/constants";
import { View, Image, TouchableOpacity } from "react-native";

function ProfilePicture({ picSource }: { picSource: string }) {
  return (
    <View className="flex-center w-full mb-6">
      <View className="relative">
        <Image
          source={{ uri: picSource }}
          className="size-32 rounded-full"
          resizeMode="contain"
          alt="Profile"
        />

        <TouchableOpacity className="rounded-full p-2 bg-primary absolute bottom-2 right-2">
          <Image
            source={images.pencil}
            className="size-5"
            tintColor="white"
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ProfilePicture;
