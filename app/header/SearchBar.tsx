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

export default function SearchBar({
  onChangeText,
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

  function buildSearchResults(searchResults: string[]) {
    // if no result, default to a no result message
    if (searchResults.length == 0) {
      searchResults.push(t("no-result"));
    }

    const maxResults = 10;
    const isTruncated = searchResults.length > maxResults;
    const numResultsToDisplay = isTruncated ? maxResults : searchResults.length;

    const resultsToDisplay = searchResults.slice(0, numResultsToDisplay);

    return resultsToDisplay.map((result, index) => {
      const key = `result${index}`;
      return (
        <>
          <MenuItem key={key} textValue="{result}">
            <MenuItemLabel size="sm">{result}</MenuItemLabel>
          </MenuItem>
          <MenuSeparator />
        </>
      );
    });
  }

  return (
    <Menu
      isOpen={showResults}
      onClose={closeResults}
      onOpen={openResults}
      offset={-50}
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
  searchResults?: string[];
}
