import "@/i18n";
import React from "react";
import { StyleSheet, View } from "react-native";
import ContentContainer from "./body/ContentContainer";
import { ContentContext } from "./ContentContext";
import Header from "./header/Header";

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
      <ContentContext.Provider value="read">
        <ContentContainer />
      </ContentContext.Provider>
    </View>
  );
}
