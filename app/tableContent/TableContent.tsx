import {
  Drawer,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
} from "@/components/ui/drawer";
import { Heading } from "@/components/ui/heading";
import { CloseIcon, Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import useGetAllPageSummaries from "@/hooks/useGetAllPageSummaries";
import { PageSummary } from "@/types/Page";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, SafeAreaView, StyleSheet } from "react-native";
import { PageContext, PageNumber } from "../PageContext";

const styles = StyleSheet.create({
  letter: { paddingVertical: 5 },
  title: { paddingVertical: 3 },
});

export default function TableContent({ onClose, show }: TableContentProps) {
  const { t } = useTranslation();
  const setPageNumber = useContext(PageContext)?.setPageNumber;

  const tableContent = new Map<string, PageSummary[]>();
  useGetAllPageSummaries()
    // TODO: refactor optional props for page and remove following filter
    .filter((pageSummary) => pageSummary.title != null)
    .map((pageSummary) => {
      const letter = pageSummary.title!.substring(0, 1);
      return { letter, pageSummary };
    })
    .forEach((indexedPage) => {
      const pageArr = tableContent.get(indexedPage.letter) ?? [];
      pageArr.push(indexedPage.pageSummary);
      tableContent.set(indexedPage.letter, pageArr);
    });

  function gotoPage(pageNumber: PageNumber) {
    if (setPageNumber) {
      setPageNumber(pageNumber);
    }
    if (onClose) {
      onClose();
    }
  }

  return (
    <Drawer isOpen={show} onClose={onClose} size="full">
      <DrawerBackdrop />
      <DrawerContent>
        <DrawerHeader>
          <SafeAreaView style={{ flexDirection: "row" }}>
            <Heading style={{ flex: 1 }}>{t("table-content")}</Heading>
            <DrawerCloseButton onPress={onClose}>
              <Icon as={CloseIcon} />
            </DrawerCloseButton>
          </SafeAreaView>
        </DrawerHeader>
        <DrawerBody>
          {Array.from(tableContent.entries()).map((entry, index) => {
            const letter = isNaN(Number(entry[0])) ? entry[0] : "0-9";
            const pageArr = entry[1];

            return (
              <React.Fragment key={index}>
                <Heading style={styles.letter}>{letter}</Heading>
                {pageArr.map((p, pIndex) => {
                  return (
                    <Pressable
                      key={pIndex}
                      onPress={() => p.pageNumber && gotoPage(p.pageNumber)}
                    >
                      <Text size="lg" style={styles.title}>
                        {p.title}
                      </Text>
                    </Pressable>
                  );
                })}
              </React.Fragment>
            );
          })}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

interface TableContentProps {
  onClose?: () => void;
  show: boolean;
}
