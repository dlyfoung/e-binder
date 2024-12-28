import React from "react";
import { Heading } from "@/components/ui/heading";
import { Text, View } from "react-native";
import { SearchBar } from "@/components/ui/iworship/SearchBar";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SearchBar />
      <Heading>I am a Heading</Heading>
      <Text>
        Hello World!! This is so cool. I know who you are.I am someone you may
        not know.You'll not know me now, and you won't know me in 10,000
        years.BLAH BLAH BLAH TODAY WAS TERRIBLE AND WAS SUPER BORING.THE MOST
        BORING DAY IN THE WHOLE ENTIRE UNIVERSE
      </Text>
    </View>
  );
}
