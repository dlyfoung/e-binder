export default interface Page {
  content?: string;
  pageNumber: number;
  title?: string;
}

export type PageSummary = Omit<Page, "content">;
