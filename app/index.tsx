import { Heading } from "@/components/ui/heading";
import { SearchIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import React from "react";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Input>
        <InputField placeholder="Search..." />
        <InputSlot>
          <InputIcon as={SearchIcon}/>
        </InputSlot>
      </Input>
      <Heading>I am a Heading</Heading>
      <Text>Hello World!! This is so cool. I know who you are.I am someone you may not know.You'll not know me now, and you won't know me in 10,000 years.BLAH BLAH BLAH TODAY WAS TERRIBLE AND WAS SUPER BORING.THE MOST BORING DAY IN THE WHOLE ENTIRE UNIVERSE
      </Text>
    </View>
  );
}
