import { VStack } from "@/components/ui/vstack";
import "@/i18n";
import React from "react";
import { StyleSheet } from "react-native";
import { ThemeContext } from "./ThemeContext";
import Header from "./header/Header";
import Reader from "./reader/Reader";

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

export default function Index() {
  return (
    <ThemeContext.Provider value="light">
      <VStack style={styles.container}>
        <Header />
        <Reader pageNumber={1} />
      </VStack>
    </ThemeContext.Provider>
  );
}
