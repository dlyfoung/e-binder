import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import useGetAllPages from "@/hooks/useGetAllPages";
import useGetPage from "@/hooks/useGetPage";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet } from "react-native";
import { PageContext } from "../store/PageContext";

const styles = StyleSheet.create({
  divider: {
    marginBottom: 20,
    marginTop: 40,
  },
  readingContainer: {
    paddingBottom: 80,
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

// TODO: paginate?
const maxPages = 300;

export default function Reader() {
  const { t } = useTranslation();
  const { pageNumber } = useContext(PageContext);
  const noContentPage = {
    content: t("no-content"),
    pageNumber: -1,
    title: "",
  };

  const allPages = useGetAllPages();
  const pages =
    pageNumber === "all"
      ? allPages.length > 0
        ? allPages
        : [noContentPage]
      : [useGetPage(pageNumber) ?? noContentPage];

  return (
    <VStack style={styles.readingContainer}>
      <ScrollView style={styles.readingContent}>
        {pages.slice(0, maxPages).map((page) => {
          const key = page?.pageNumber ?? 0;
          const title = page?.title ?? "";
          const content = page?.content ?? "";
          return (
            <React.Fragment key={key}>
              <Heading style={styles.readingTitle}>{title}</Heading>
              <Text size="lg">{content}</Text>
              {page && <Divider style={styles.divider} />}
            </React.Fragment>
          );
        })}
      </ScrollView>
    </VStack>
  );
}
