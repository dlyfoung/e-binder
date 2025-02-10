import { SearchIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import {
  Menu,
  MenuItem,
  MenuItemLabel,
  MenuSeparator,
} from "@/components/ui/menu";
import { Pressable } from "@/components/ui/pressable";
import usePlatform from "@/hooks/usePlatform";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  searchIcon: { paddingRight: 10 },
  searchInput: { padding: 10 },
  searchResultDisabled: { fontStyle: "italic" },
});

const noResultKey = "no-result";
const moreResultKey = "more-results";
const maxResults = 7;

let timeoutId: number;

const debounceSearch = (
  searchFunction: (text: string) => void,
  delay: number,
) => {
  return (text: string) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      searchFunction(text);
    }, delay);
  };
};

export default function SearchBar({
  onChangeText,
  onSelectResult,
  searchResults,
}: SearchBarProps) {
  const { t } = useTranslation();
  const [showResults, setShowResults] = useState(false);
  // defines if the user is actually searching
  const [isSearching, setIsSearching] = useState(false);

  function openResults() {
    setShowResults(isSearching);
  }

  function closeResults() {
    setShowResults(false);
  }

  function onSearchTextChange(text: string) {
    const debouncedSearchFunction = debounceSearch(search, 300);
    debouncedSearchFunction(text);
  }

  function search(text: string) {
    const isSearchTextNotEmpty = text.trim() !== "";
    setIsSearching(isSearchTextNotEmpty);
    if (onChangeText) {
      onChangeText(text);
    }
    setShowResults(isSearchTextNotEmpty);
  }

  function buildSearchResults(searchResults: SearchResult[]) {
    // if no result, default to a no result message
    if (searchResults.length == 0) {
      const noResult = t("no-result");
      return (
        <MenuItem disabled={true} key={noResultKey} textValue={noResult}>
          <MenuItemLabel style={styles.searchResultDisabled} size="xl">
            {noResult}
          </MenuItemLabel>
        </MenuItem>
      );
    }

    const isTruncated = searchResults.length > maxResults;
    const numResultsToDisplay = isTruncated ? maxResults : searchResults.length;
    const resultsToDisplay = searchResults.slice(0, numResultsToDisplay);
    const resultMenuItems = resultsToDisplay.map((result, index) => {
      return (
        <React.Fragment key={result.index}>
          <MenuItem key={result.index} textValue={result.text}>
            <MenuItemLabel size="xl">{result.text}</MenuItemLabel>
          </MenuItem>
          {index < numResultsToDisplay - 1 && <MenuSeparator />}
        </React.Fragment>
      );
    });

    if (isTruncated) {
      const moreResult = t("more-results", {
        count: searchResults.length - maxResults,
      });
      resultMenuItems.push(
        <React.Fragment key={moreResultKey}>
          <MenuSeparator />
          <MenuItem disabled={true} key={moreResultKey} textValue={moreResult}>
            <MenuItemLabel size="xl" style={styles.searchResultDisabled}>
              {moreResult}
            </MenuItemLabel>
          </MenuItem>
        </React.Fragment>,
      );
    }

    return resultMenuItems;
  }

  return (
    <Menu
      disabledKeys={[moreResultKey, noResultKey]}
      isOpen={showResults}
      onClose={closeResults}
      onOpen={openResults}
      offset={usePlatform(5, -50, 0)}
      onSelectionChange={(keys) => {
        if (onSelectResult && keys !== "all") {
          // single selection mode
          const selected = Array.from(keys as Set<number>)[0];
          onSelectResult(selected);
        }
      }}
      placement="bottom left"
      selectionMode="single"
      trigger={(triggerProps) => {
        return (
          <Input size="xl">
            <InputField
              style={styles.searchInput}
              variant="rounded"
              placeholder={`${t("search")}...`}
              onChangeText={onSearchTextChange}
              {...triggerProps}
            />
            <InputSlot style={styles.searchIcon}>
              <Pressable onPress={openResults}>
                <InputIcon as={SearchIcon} testID="searchButton" />
              </Pressable>
            </InputSlot>
          </Input>
        );
      }}
    >
      {isSearching &&
        buildSearchResults(searchResults === undefined ? [] : searchResults)}
    </Menu>
  );
}

interface SearchBarProps {
  onChangeText?: (text: string) => void;
  onSelectResult?: (index: number) => void;
  searchResults?: SearchResult[];
}

interface SearchResult {
  index: number;
  text: string;
}
