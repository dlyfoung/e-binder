import Page from "@/types/Page";
import * as SQLite from "expo-sqlite";

export default function useSearchContent(text: string) {
  if (text == null || text === "") {
    return null;
  }

  // TODO: handle errors
  const db = SQLite.openDatabaseSync("ebinder");
  // TODO: multi results
  const found = db.getFirstSync<Page>(
    "SELECT rowid as pageNumber, title, content FROM pages WHERE title MATCH ?",
    `${text}*`,
  );
  // TODO: check why db.closeAsync() clears results
  return found;
}
