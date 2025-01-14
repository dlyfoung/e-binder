import { SearchIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  searchIcon: { paddingRight: 10 },
});

export default function SearchBar() {
  const { t } = useTranslation();

  return (
    <Input>
      <InputField variant="rounded" placeholder={`${t("search")}...`} />
      <InputSlot style={styles.searchIcon}>
        <InputIcon as={SearchIcon} />
      </InputSlot>
    </Input>
  );
}
