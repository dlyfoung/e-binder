import useSearchContent from "@/hooks/useSearchContent";
import Page from "@/types/Page";
import React, { useContext, useState } from "react";
import SearchBar from "../components/SearchBar";
import { PageContext } from "../store/PageContext";

export default function PageSearchBar() {
  const { setPageNumber } = useContext(PageContext);
  const [searchResults, setSearchResults] = useState<Page[]>([]);

  return (
    <SearchBar
      onSelectResult={(pageNumber) => setPageNumber(pageNumber)}
      onChangeText={(text) => {
        const pages = useSearchContent(text);
        setSearchResults(pages);
      }}
      searchResults={searchResults.map((result) => {
        return {
          index: result.pageNumber ?? 0,
          text: result.title ?? "",
        };
      })}
    />
  );
}
