import { VStack } from "@/components/ui/vstack";
import { openDatabase } from "@/hooks/db-utils";
import "@/i18n";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { PageContext, PageNumber } from "./PageContext";
import { ThemeContext } from "./ThemeContext";
import Header from "./header/Header";
import Reader from "./reader/Reader";

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

function initDatabase() {
  const db = openDatabase();
  db.execSync(`
    CREATE VIRTUAL TABLE IF NOT EXISTS pages USING fts4(title TEXT, content TEXT);
  `);
}

export default function Index() {
  const [pageNumber, setPageNumber] = useState<PageNumber>(1);

  initDatabase();

  return (
    <ThemeContext.Provider value="light">
      <PageContext.Provider value={{ pageNumber, setPageNumber }}>
        <VStack style={styles.container}>
          <Header />
          <Reader pageNumber={pageNumber} />
          {/* TODO: bottom navigator: previous/next */}
        </VStack>
      </PageContext.Provider>
    </ThemeContext.Provider>
  );
}
