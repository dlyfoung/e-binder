import React from "react";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { SearchIcon } from "@/components/ui/icon";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  searchIcon: { paddingRight: 10 },
});

export default function SearchBar() {
  return (
    <Input>
      <InputField variant="rounded" placeholder="Search..." />
      <InputSlot style={styles.searchIcon}>
        <InputIcon as={SearchIcon} />
      </InputSlot>
    </Input>
  );
}
