import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { openDatabase } from "@/hooks/db-utils";
import { Stack } from "expo-router";
import React, { useState } from "react";
import { LogBox } from "react-native";
import { ThemeContext } from "./store/ThemeContext";

// Hide logbox due to e2e tests. Cannot pass an argument when running the tests with expo.
// For more details, see https://github.com/mobile-dev-inc/maestro/issues/2015
// Until it is fixed, we ignore logs.
LogBox.ignoreAllLogs();

async function initDatabase() {
  const db = openDatabase();
  db.execAsync(`
    CREATE VIRTUAL TABLE IF NOT EXISTS pages USING fts4(title TEXT, content TEXT);
  `);
  db.closeAsync();
}

export default function RootLayout() {
  const [initDb, setInitDb] = useState(true);
  if (initDb) {
    initDatabase();
    setInitDb(false);
  }

  return (
    <ThemeContext.Provider value="light">
      <GluestackUIProvider mode="light">
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </GluestackUIProvider>
    </ThemeContext.Provider>
  );
}
