import { Heading } from "@/components/ui/heading";
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
      <Heading>I am a Heading</Heading>
      <Text>Hello World!! This is so cool. I know who you are. You are ponia
      . ah ah. awsome
      </Text>
    </View>
  );
}
