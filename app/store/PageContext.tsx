import useLoadSource from "@/hooks/useLoadSource";
import { AutoUpdateMode } from "@/types/Settings";
import React, { createContext, ReactNode, useState } from "react";

export const PageContext = createContext<PageContextProps>(null!);

export function PageContextProvider({ children }: PageContextProviderProps) {
  const [pageNumber, setPageNumber] = useState<PageNumber>(1);
  // TODO: handle other modes
  const [autoUpdate, setAutoUpdate] = useState<AutoUpdateMode>("onAppOpen");

  // auto reload if wifi internet connection is available
  if (autoUpdate === "onAppOpen") {
    useLoadSource({
      onlyWifi: true,
      onLoadingComplete: () => {
        setPageNumber(1);
        setAutoUpdate("never");
      },
    });
  }

  return (
    <PageContext.Provider value={{ pageNumber, setPageNumber }}>
      {children}
    </PageContext.Provider>
  );
}

export interface PageContextProps {
  pageNumber: PageNumber;
  setPageNumber: (pageNumber: PageNumber) => void;
}

export type PageNumber = number | "all";

interface PageContextProviderProps {
  children: ReactNode;
}
