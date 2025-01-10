import React from "react";
import { Heading } from "@/components/ui/heading";
import { StyleSheet, Text, View } from "react-native";
import Header from "./header/Header";

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 10,
  },
});

export default function Index() {
  return (
    <View style={styles.container}>
      <Header />
      <View>
        <Heading>This is the title</Heading>
        <Text style={{ justifyContent: "center" }}>
          Hello World!! This is so cool. I know who you are.I am someone you may
          not know.You&apos;ll not know me now, and you won&apos;t know me in
          10,000 10,000 years.BLAH BLAH BLAH TODAY WAS TERRIBLE AND WAS SUPER
          BORING.THE BORING DAY IN THE WHOLE ENTIRE UNIVERSE.
        </Text>
      </View>
    </View>
  );
}
