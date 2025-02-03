import { VStack } from "@/components/ui/vstack";
import "@/i18n";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "./header/Header";
import MenuButton from "./header/MenuButton";
import PageSearchBar from "./header/PageSearchBar";
import SideMenu from "./menu/SideMenu";
import Reader from "./reader/Reader";
import { PageContextProvider } from "./store/PageContext";

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  searchBar: { flex: 1 },
});

export default function Index() {
  const [showSideMenu, setShowSideMenu] = useState(false);

  return (
    <PageContextProvider>
      <SafeAreaView>
        <VStack style={styles.container}>
          <Header>
            <MenuButton onPress={() => setShowSideMenu(true)} />
            <View style={styles.searchBar}>
              <PageSearchBar />
            </View>
          </Header>
          <SideMenu
            isOpen={showSideMenu}
            onClose={() => setShowSideMenu(false)}
          />
          <Reader />
          {/* TODO: bottom navigator: previous/next */}
        </VStack>
      </SafeAreaView>
    </PageContextProvider>
  );
}
