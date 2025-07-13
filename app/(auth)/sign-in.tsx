import { router } from "expo-router";
import { View, Text, Button } from "react-native";

function SignIn() {
  return (
    <View>
      <Text>SignIn</Text>
      <Button title="Sign Up" onPress={() => router.push("/(auth)/sign-up")} />
    </View>
  );
}

export default SignIn;
