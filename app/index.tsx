import { VStack } from "@/components/ui/vstack";
import useLoadSource from "@/hooks/useLoadSource";
import "@/i18n";
import { AutoUpdateMode } from "@/types/Settings";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "./header/Header";
import { PageContext, PageNumber } from "./PageContext";
import Reader from "./reader/Reader";

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

export default function Index() {
  const [pageNumber, setPageNumber] = useState<PageNumber>(1);
  // TODO: handle other modes
  const [autoUpdate, setAutoUpdate] = useState<AutoUpdateMode>("onAppOpen");

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
          <Header />
          <Reader pageNumber={pageNumber} />
          {/* TODO: bottom navigator: previous/next */}
        </VStack>
      </SafeAreaView>
    </PageContext.Provider>
  );
}
