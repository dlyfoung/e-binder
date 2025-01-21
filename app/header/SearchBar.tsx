import { SearchIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Popover, PopoverBody, PopoverContent } from "@/components/ui/popover";
import { Text } from "@/components/ui/text";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  searchIcon: { paddingRight: 10 },
});

export default function SearchBar({ onChangeText }: SearchBarProps) {
  const { t } = useTranslation();

  return (
    <Popover
      placement="bottom left"
      trigger={() => {
        return (
          <Input size="xl">
            <InputField
              variant="rounded"
              placeholder={`${t("search")}...`}
              onChangeText={onChangeText}
            />
            <InputSlot style={styles.searchIcon}>
              <InputIcon as={SearchIcon} />
            </InputSlot>
          </Input>
        );
      }}
    >
      <PopoverContent>
        <PopoverBody>
          <Text>should be the result</Text>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

interface SearchBarProps {
  onChangeText?: (text: string) => void;
}
