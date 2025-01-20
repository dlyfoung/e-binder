import { VStack } from "@/components/ui/vstack";
import "@/i18n";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { PageContext } from "./PageContext";
import { ThemeContext } from "./ThemeContext";
import Header from "./header/Header";
import Reader from "./reader/Reader";

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

export default function Index() {
  const [pageNumber, setPageNumber] = useState(1);

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
