import React from "react";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { SearchIcon } from "@/components/ui/icon";

export function SearchBar() {
  return (
    <Input>
      <InputField placeholder="Search..." />
      <InputSlot>
        <InputIcon as={SearchIcon} />
      </InputSlot>
    </Input>
  );
}
