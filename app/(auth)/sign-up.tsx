import { router } from "expo-router";
import { View, Text, Button } from "react-native";

function SignUp() {
  return (
    <View>
      <Text>SignUp</Text>
      <Button title="Sign In" onPress={() => router.push("/(auth)/sign-in")} />
    </View>
  );
}

export default SignUp;
