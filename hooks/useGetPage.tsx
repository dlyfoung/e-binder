import Page from "@/types/Page";
import { openDatabase } from "./db-utils";

export default function useGetPage(pageNumber: number): Page | null {
  const db = openDatabase();
  const page = db.getFirstSync<Page>(
    "SELECT rowid as pageNumber, title, content FROM pages WHERE rowid = ?",
    pageNumber,
  );
  db.closeSync();

  return page;
}
