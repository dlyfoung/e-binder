import { SearchIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import {
  Menu,
  MenuItem,
  MenuItemLabel,
  MenuSeparator,
} from "@/components/ui/menu";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  searchIcon: { paddingRight: 10 },
  searchResultDisabled: { fontStyle: "italic" },
});

const noResultKey = "no-result";
const moreResultKey = "more-results";
const maxResults = 10;

export default function SearchBar({
  onChangeText,
  onSelectResult,
  searchResults,
}: SearchBarProps) {
  const { t } = useTranslation();
  const [showResults, setShowResults] = useState(false);

  function openResults() {
    setShowResults(true);
  }

  function closeResults() {
    setShowResults(false);
  }

  function buildSearchResults(searchResults: SearchResult[]) {
    // if no result, default to a no result message
    if (searchResults.length == 0) {
      const noResult = t("no-result");
      return (
        <MenuItem key={noResultKey} textValue={noResult}>
          <MenuItemLabel style={styles.searchResultDisabled}>
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
            <MenuItemLabel>{result.text}</MenuItemLabel>
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
          <MenuItem key={moreResultKey} textValue={moreResult}>
            <MenuItemLabel style={styles.searchResultDisabled}>
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
      offset={-50}
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
              variant="rounded"
              placeholder={`${t("search")}...`}
              onChangeText={onChangeText}
              {...triggerProps}
            />
            <InputSlot style={styles.searchIcon}>
              <InputIcon as={SearchIcon} />
            </InputSlot>
          </Input>
        );
      }}
    >
      {buildSearchResults(searchResults === undefined ? [] : searchResults)}
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
