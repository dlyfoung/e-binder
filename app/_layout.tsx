import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { openDatabase } from "@/hooks/db-utils";
import { Stack } from "expo-router";
import React, { useState } from "react";
import { ThemeContext } from "./store/ThemeContext";

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
