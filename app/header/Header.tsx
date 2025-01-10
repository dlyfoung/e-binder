import React from "react";
import { SearchBar } from "@/components/ui/iworship/SearchBar";
import { Icon, MenuIcon } from "@/components/ui/icon";
import { View } from "react-native";
import { Pressable } from "@/components/ui/pressable";

export default function Header() {
  return (
    <View
      style={{
        flexDirection: "row",
      }}
    >
      <Pressable>
        <Icon as={MenuIcon} size="xl" />
      </Pressable>
      <View style={{ flex: 1 }}>
        <SearchBar />
      </View>
    </View>
  );
}
