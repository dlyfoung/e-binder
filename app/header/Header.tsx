import SideMenu from "@/app/menu/SideMenu";
import { Icon, MenuIcon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import useSearchContent from "@/hooks/useSearchContent";
import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { PageContext } from "../PageContext";
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
  const setPageNumber = useContext(PageContext)?.setPageNumber;
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
        <SearchBar
          onChangeText={(text) => {
            // TODO: debounce
            const page = useSearchContent(text);
            if (setPageNumber != null && page?.pageNumber != null) {
              setPageNumber(page.pageNumber);
            } else {
              // TODO not found message
              console.log(`${text} not found`);
            }
          }}
        />
      </View>
    </View>
  );
}
