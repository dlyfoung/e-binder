import Page from "@/types/Page";
import { openDatabase } from "./db-utils";

export default function useSearchContent(text: string): Page[] {
  if (text == null || text === "") {
    return [];
  }

  const db = openDatabase();
  const found = db.getAllSync<Page>(
    "SELECT rowid as pageNumber, title, content FROM pages WHERE title MATCH ?",
    `${text}*`,
  );
  // TODO: check why db.closeAsync() clears results
  return found;
}
