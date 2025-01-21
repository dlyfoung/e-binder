import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import useGetPage from "@/hooks/useGetPage";
import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  readingContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  readingContent: {
    padding: 10,
    width: "100%",
  },
  readingTitle: {
    padding: 10,
  },
});

export default function Reader({ pageNumber }: ReaderProps) {
  const { t } = useTranslation();
  const page = useGetPage(pageNumber);
  const title = page?.title ?? "";
  const content = page?.content ?? t("no-content");

  return (
    <VStack style={styles.readingContainer}>
      <Heading style={styles.readingTitle}>{title}</Heading>
      <ScrollView style={styles.readingContent}>
        <Text>{content}</Text>
      </ScrollView>
    </VStack>
  );
}

interface ReaderProps {
  pageNumber: number;
}
