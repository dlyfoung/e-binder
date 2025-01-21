import { SearchIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Popover } from "@/components/ui/popover";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  searchIcon: { paddingRight: 10 },
});

export default function SearchBar({ onChangeText }: SearchBarProps) {
  const { t } = useTranslation();

  return (
    <>
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
      <Popover
        children={undefined}
        trigger={function (_props: any, state: { open: boolean }): JSX.Element {
          throw new Error("Function not implemented.");
        }}
      ></Popover>
    </>
  );
}

interface SearchBarProps {
  onChangeText?: (text: string) => void;
}
