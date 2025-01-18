import Page from "@/types/Page";
import * as SQLite from "expo-sqlite";

export default function useGetPage(pageNumber: number): Page | null {
  const db = SQLite.openDatabaseSync("ebinder");
  return db.getFirstSync<Page>(
    "SELECT title, content FROM pages WHERE rowid = ?",
    pageNumber,
  );
}
