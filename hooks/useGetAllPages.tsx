import Page from "@/types/Page";
import { openDatabase } from "./db-utils";

export default function useGetAllPages(): Page[] {
  const db = openDatabase();
  const pages = db.getAllSync<Page>(
    "SELECT rowid as pageNumber, title, content FROM pages",
  );

  return pages;
}
