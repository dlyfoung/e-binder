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
});

const noResultKey = "no-result";
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
          <MenuItemLabel size="sm">{noResult}</MenuItemLabel>
        </MenuItem>
      );
    }

    const isTruncated = searchResults.length > maxResults;
    const numResultsToDisplay = isTruncated ? maxResults : searchResults.length;
    const resultsToDisplay = searchResults.slice(0, numResultsToDisplay);
    // TODO add more result message

    return resultsToDisplay.map((result) => {
      return (
        <>
          <MenuItem key={result.index} textValue={result.text}>
            <MenuItemLabel size="sm">{result.text}</MenuItemLabel>
          </MenuItem>
          <MenuSeparator />
        </>
      );
    });
  }

  return (
    <Menu
      disabledKeys={[noResultKey]}
      isOpen={showResults}
      onClose={closeResults}
      onOpen={openResults}
      offset={-50}
      onSelectionChange={(keys) => {
        if (onSelectResult && keys !== "all") {
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
