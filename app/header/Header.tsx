import SideMenu from "@/app/menu/SideMenu";
import { Icon, MenuIcon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import useSearchContent from "@/hooks/useSearchContent";
import Page from "@/types/Page";
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
  const [searchResults, setSearchResults] = useState<Page[]>([]);

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
            const pages = useSearchContent(text);
            setSearchResults(pages);
          }}
          onSelectResult={(pageNumber) => {
            if (setPageNumber) {
              setPageNumber(pageNumber);
            }
          }}
          searchResults={searchResults.map((result) => {
            return {
              index: result.pageNumber ?? 0,
              text: result.title ?? "",
            };
          })}
        />
      </View>
    </View>
  );
}
