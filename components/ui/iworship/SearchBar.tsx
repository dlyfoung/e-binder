import React from "react";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { SearchIcon } from "@/components/ui/icon";

const fieldStyle = {
  padding: 100,
};

export function SearchBar() {
  return (
    <Input>
      <InputField 
        placeholder="Search..." 
        style={fieldStyle}
      />
      <InputSlot>
        <InputIcon as={SearchIcon} />
      </InputSlot>
    </Input>
  );
}
