import { ImageSourcePropType } from "react-native";
import { Models } from "react-native-appwrite";

// Auth Types Start
interface CreateUserParams {
  email: string;
  password: string;
  name: string;
}

interface SignInParams {
  email: string;
  password: string;
}

interface UpdateEmailParams {
  newEmail: string;
  prevEmail: string;
  password: string;
  userId: string;
}

interface UpdateNameParams {
  newName: string;
  prevName: string;
  userId: string;
}

interface UpdatePasswordParams {
  newPassword: string;
  oldPassword: string;
}

type Theme = "light" | "dark" | "system";
interface UpdatePrefsParams {
  theme: Theme;
}

interface ProfileEditFieldProps {
  label: string;
  value: string;
  iconPath: any;
  placeholder?: string;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  onChangeText: (text: string) => void;
  fieldKey: ProfileOptions;
  editing: ProfileOptions;
  onEdit: (field: ProfileOptions) => void;
  onSave?: () => void;
}

type ProfileOptions =
  | "email"
  | "phone"
  | "address"
  | "password"
  | "name"
  | null;
// Auth Types End

interface MenuItem extends Models.Document {
  name: string;
  price: number;
  image_url: string;
  description: string;
  calories: number;
  protein: number;
  rating: number;
  type: string;
  categories: Category;
}

interface MenuWithCustomizations extends Models.Document {
  menu: MenuItem;
  customizations: CartCustomization[];
}

interface Category extends Models.Document {
  name: string;
  description: string;
}

export interface User extends Models.Document {
  name: string;
  email: string;
  avatar: string;
}

interface CartCustomization {
  id: string;
  name: string;
  price: number;
  type: string;
  image_url: string;
}

interface MenuCustomization extends Models.Document {
  customizations: CartCustomization;
}

interface CartItemType {
  id: string; // menu item id
  name: string;
  price: number;
  image_url: string;
  quantity: number;
  customizations?: CartCustomization[];
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItemType & { quantity?: number }) => void;
  removeItem: (id: string, customizations: CartCustomization[]) => void;
  increaseQty: (id: string, customizations: CartCustomization[]) => void;
  decreaseQty: (id: string, customizations: CartCustomization[]) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

interface TabBarIconProps {
  focused: boolean;
  icon: ImageSourcePropType;
  title: string;
}

interface PaymentInfoStripeProps {
  label: string;
  value: string;
  labelStyle?: string;
  valueStyle?: string;
}

interface CustomButtonProps {
  onPress?: () => void;
  title?: string;
  style?: string;
  leftIcon?: React.ReactNode;
  textStyle?: string;
  isLoading?: boolean;
}

interface CustomHeaderProps {
  title?: string;
  secondRow?: React.ReactNode;
}

interface CustomInputProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  label: string;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
}

interface ProfileFieldProps {
  label: string;
  value: string;
  icon: ImageSourcePropType;
}

interface GetMenuParams {
  category: string;
  query: string;
}

interface EmptyComponentProps {
  title: string;
  subtitle: string;
}

interface TitleSubtitleProps {
  title: string;
  subtitle: string | number;
}

interface IconWithTextProps {
  iconPath: ImageSourcePropType;
  text: string;
}

interface ToppingListProps {
  title: string;
  items: MenuCustomization[];
  emptyText: string;
}

interface ProfileDetailRowProps {
  label: string;
  value: string | undefined;
  iconPath: any;
}
