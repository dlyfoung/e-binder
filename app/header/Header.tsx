import React, { useState } from "react";
import { Icon, MenuIcon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { StyleSheet, View } from "react-native";
import SearchBar from "./SearchBar";
import SideMenu from "@/app/menu/SideMenu";

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
  const [showSideMenu, setShowSideMenu] = useState(false);

  function openSideMenu() {
    setShowSideMenu(true);
  }

  return (
    <View style={styles.header}>
      <Pressable onPress={openSideMenu} style={styles.menuButton}>
        <Icon as={MenuIcon} size="xl" />
      </Pressable>
      <SideMenu onClose={() => setShowSideMenu(false)} show={showSideMenu} />
      <View style={styles.searchBar}>
        <SearchBar />
      </View>
    </View>
  );
}
