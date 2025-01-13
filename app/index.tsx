import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import React from "react";
import { StyleSheet, View } from "react-native";
import Header from "./header/Header";

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 10,
  },
  readingContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  readingContent: {
    alignItems: "center",
    padding: 10,
  },
  readingTitle: {
    padding: 10,
  },
});

export default function Index() {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.readingContainer}>
        <Heading style={styles.readingTitle}>This is the title</Heading>
        <View style={styles.readingContent}>
          {/* TODO: format paragraphs */}
          <Text>
            Hello World!! This is so cool. I know who you are.I am someone you
            may not know.
          </Text>
          <Text>
            You&apos;ll not know me now, and you won&apos;t know me in 10,000
            10,000 years.BLAH BLAH BLAH TODAY WAS TERRIBLE AND WAS SUPER
            BORING.THE BORING DAY IN THE WHOLE ENTIRE UNIVERSE.
          </Text>
        </View>
      </View>
    </View>
  );
}
