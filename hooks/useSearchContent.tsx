import Page from "@/types/Page";
import { openDatabase } from "./db-utils";

export default function useSearchContent(text: string) {
  if (text == null || text === "") {
    return null;
  }

  const db = openDatabase();
  // TODO: multi results
  const found = db.getFirstSync<Page>(
    "SELECT rowid as pageNumber, title, content FROM pages WHERE title MATCH ?",
    `${text}*`,
  );
  // TODO: check why db.closeAsync() clears results
  return found;
}
