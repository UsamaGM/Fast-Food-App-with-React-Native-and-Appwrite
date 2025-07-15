import { CustomButtonProps } from "@/type";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import cn from "clsx";

function CustomOutlinedButton({
  title,
  isLoading,
  leftIcon,
  onPress,
  style,
  textStyle,
}: CustomButtonProps) {
  return (
    <TouchableOpacity
      disabled={isLoading}
      onPress={onPress}
      className={cn(
        "flex-row items-center justify-center border rounded-full p-3",
        style,
      )}
    >
      {leftIcon && <View style={{ marginRight: 8 }}>{leftIcon}</View>}
      {isLoading ? (
        <ActivityIndicator size="small" color="black" />
      ) : (
        <Text className={cn("paragraph-bold", textStyle)}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

export default CustomOutlinedButton;
