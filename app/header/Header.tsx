import React from "react";
import { SearchBar } from "@/components/ui/iworship/SearchBar";
import { Icon, MenuIcon } from "@/components/ui/icon";
import { View } from "react-native";

export default function Header() {
  return (
    <View
      style={{
        flexDirection: "row",
      }}
    >
      <Icon as={MenuIcon} />
      <SearchBar />
    </View>
  );
}
