import { Platform } from "react-native";

export default function usePlatform<T>(
  iosValue: T,
  androidValue: T,
  defaultValue: T,
): T {
  return Platform.OS === "ios"
    ? iosValue
    : Platform.OS === "android"
      ? androidValue
      : defaultValue;
}
