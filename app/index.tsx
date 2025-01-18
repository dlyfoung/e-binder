import "@/i18n";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemeContext } from "./ThemeContext";
import Header from "./header/Header";
import Reader from "./reader/Reader";

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 10,
  },
});

export default function Index() {
  return (
    <View style={styles.container}>
      <Header />
      <ThemeContext.Provider value="light">
        <Reader pageNumber={1} />
      </ThemeContext.Provider>
    </View>
  );
}
