import { VStack } from "@/components/ui/vstack";
import { openDatabase } from "@/hooks/db-utils";
import useLoadSource from "@/hooks/useLoadSource";
import "@/i18n";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PageContext, PageNumber } from "./PageContext";
import { ThemeContext } from "./ThemeContext";
import Header from "./header/Header";
import Reader from "./reader/Reader";

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

async function initDatabase() {
  const db = openDatabase();
  db.execAsync(`
    CREATE VIRTUAL TABLE IF NOT EXISTS pages USING fts4(title TEXT, content TEXT);
  `);
}

export default function Index() {
  const [pageNumber, setPageNumber] = useState<PageNumber>(1);

  initDatabase();
  // auto reload if wifi internet connection is available
  useLoadSource({
    onlyWifi: true,
    onLoadingComplete: () => {
      if (setPageNumber) {
        setPageNumber(1);
      }
    },
  });

  return (
    <ThemeContext.Provider value="light">
      <PageContext.Provider value={{ pageNumber, setPageNumber }}>
        <SafeAreaView>
          <VStack style={styles.container}>
            <Header />
            <Reader pageNumber={pageNumber} />
            {/* TODO: bottom navigator: previous/next */}
          </VStack>
        </SafeAreaView>
      </PageContext.Provider>
    </ThemeContext.Provider>
  );
}
