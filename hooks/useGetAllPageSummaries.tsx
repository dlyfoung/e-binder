import { PageSummary } from "@/types/Page";
import { openDatabase } from "./db-utils";

export default function useGetAllPageSummaries(): PageSummary[] {
  const db = openDatabase();
  const pageSummaries = db.getAllSync<PageSummary>(
    "SELECT rowid as pageNumber, title FROM pages",
  );
  db.closeSync();

  return pageSummaries;
}
