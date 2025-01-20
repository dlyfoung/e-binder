import Page from "@/types/Page";
import * as SQLite from "expo-sqlite";

export default function useGetPage(pageNumber: number): Page | null {
  // TODO: handle errors
  const db = SQLite.openDatabaseSync("ebinder");
  const page = db.getFirstSync<Page>(
    "SELECT rowid as pageNumber, title, content FROM pages WHERE rowid = ?",
    pageNumber,
  );
  // TODOL: db.closeAsync()???;

  return page;
}
