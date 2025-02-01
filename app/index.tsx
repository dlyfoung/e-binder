import { VStack } from "@/components/ui/vstack";
import useLoadSource from "@/hooks/useLoadSource";
import useSearchContent from "@/hooks/useSearchContent";
import "@/i18n";
import Page from "@/types/Page";
import { AutoUpdateMode } from "@/types/Settings";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "./header/Header";
import MenuButton from "./header/MenuButton";
import SearchBar from "./header/SearchBar";
import SideMenu from "./menu/SideMenu";
import { PageContext, PageNumber } from "./PageContext";
import Reader from "./reader/Reader";

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  searchBar: { flex: 1 },
});

export default function Index() {
  const [pageNumber, setPageNumber] = useState<PageNumber>(1);
  // TODO: handle other modes
  const [autoUpdate, setAutoUpdate] = useState<AutoUpdateMode>("onAppOpen");
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [searchResults, setSearchResults] = useState<Page[]>([]);

  // auto reload if wifi internet connection is available
  if (autoUpdate === "onAppOpen") {
    useLoadSource({
      onlyWifi: true,
      onLoadingComplete: () => {
        if (setPageNumber) {
          setPageNumber(1);
        }
        setAutoUpdate("never");
      },
    });
  }

  return (
    <PageContext.Provider value={{ pageNumber, setPageNumber }}>
      <SafeAreaView>
        <VStack style={styles.container}>
          <Header>
            <MenuButton onPress={() => setShowSideMenu(true)} />
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
          </Header>
          <SideMenu
            isOpen={showSideMenu}
            onClose={() => setShowSideMenu(false)}
          />
          <Reader pageNumber={pageNumber} />
          {/* TODO: bottom navigator: previous/next */}
        </VStack>
      </SafeAreaView>
    </PageContext.Provider>
  );
}
