import React from "react";
import { Icon, MenuIcon } from "@/components/ui/icon";
import { StyleSheet, View } from "react-native";
import { Pressable } from "@/components/ui/pressable";
import SearchBar from "./SearchBar";

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
  },
  menuButton: {
    justifyContent: "center",
    padding: 5,
  },
  searchBar: { flex: 1 },
});

export default function Header() {
  return (
    <View style={styles.header}>
      <Pressable style={styles.menuButton}>
        <Icon as={MenuIcon} size="xl" />
      </Pressable>
      <View style={styles.searchBar}>
        <SearchBar />
      </View>
    </View>
  );
}
