import { createContext } from "react";

export const PageContext = createContext<PageContextProps | null>(null);

export interface PageContextProps {
  pageNumber: number;
  setPageNumber: (pageNumber: number) => void;
}
