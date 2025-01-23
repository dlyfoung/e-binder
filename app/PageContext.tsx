import { createContext } from "react";

export const PageContext = createContext<PageContextProps | null>(null);

export interface PageContextProps {
  pageNumber: PageNumber;
  setPageNumber: (pageNumber: PageNumber) => void;
}

export type PageNumber = number | "all";
