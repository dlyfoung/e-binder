import { Button, ButtonText } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import {
  Drawer,
  DrawerBackdrop,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from "@/components/ui/drawer";
import { Heading } from "@/components/ui/heading";
import { EyeIcon, Icon, MenuIcon, RepeatIcon } from "@/components/ui/icon";
import { Modal, ModalBackdrop, ModalContent } from "@/components/ui/modal";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { WipeDataStep } from "@/hooks/useDeleteSource";
import useLoadSource, { ReloadingStep } from "@/hooks/useLoadSource";
import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaView, StyleSheet } from "react-native";
import InternetConnectionError from "../components/InternetConnectionError";
import ProgressBar from "../components/ProgressBar";
import { PageContext } from "../PageContext";
import TableContent from "../tableContent/TableContent";

const styles = StyleSheet.create({
  divider: {
    marginVertical: 10,
  },
  menuContent: {
    marginBottom: 20,
    marginTop: 20,
  },
  menuIcon: {
    marginRight: 5,
  },
  menuItem: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 7,
    marginTop: 7,
  },
});

export default function SideMenu({ onClose, isOpen }: SideMenuProps) {
  const { t } = useTranslation();
  const setPageNumber = useContext(PageContext)?.setPageNumber;
  const [showProgress, setShowProgress] = useState(false);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [progressStep, setProgressStep] = useState<
    ReloadingStep | WipeDataStep
  >("initiating");
  const [showTableContent, setShowTableContent] = useState(false);
  const [showInternetConnectionError, setShowInternetConnectionError] =
    useState(false);

  function closeSideMenu() {
    if (onClose) {
      onClose();
    }
  }

  function updateProgress(
    progressStep: ReloadingStep | WipeDataStep,
    progressPercentage: number,
  ) {
    setProgressStep(progressStep);
    setProgressPercentage(progressPercentage);
  }

  function completeProgress(pageNumber: number) {
    // give a "feel" that the process is complete
    setTimeout(() => {
      setShowProgress(false);
      closeSideMenu();
    }, 500);

    if (setPageNumber) {
      setPageNumber(pageNumber);
    }
  }

  function viewAll() {
    if (setPageNumber) {
      setPageNumber("all");
    }
    closeSideMenu();
  }

  function viewTableOfContent() {
    setShowTableContent(true);
    closeSideMenu();
  }

  function reloadDocument() {
    setShowProgress(true);
    useLoadSource({
      onInternetConnectionError: () => {
        setShowProgress(false);
        setShowInternetConnectionError(true);
      },
      onLoadingComplete: () => completeProgress(1),
      updateProgress,
    });
  }

  return (
    <>
      {showInternetConnectionError ? (
        <InternetConnectionError
          isOpen={showInternetConnectionError}
          onClose={() => setShowInternetConnectionError(false)}
        />
      ) : (
        <Modal isOpen={showProgress}>
          <ModalBackdrop />
          <ModalContent>
            <ProgressBar
              progressPercentage={progressPercentage}
              text={t(progressStep)}
            />
          </ModalContent>
        </Modal>
      )}
      <TableContent
        onClose={() => setShowTableContent(false)}
        isOpen={showTableContent}
      />
      <Drawer closeOnOverlayClick={true} isOpen={isOpen} size="lg">
        <DrawerBackdrop />
        <DrawerContent>
          <DrawerHeader>
            <SafeAreaView>
              <Heading>{t("settings")}</Heading>
            </SafeAreaView>
          </DrawerHeader>
          <DrawerBody style={styles.menuContent}>
            <Pressable onPress={viewTableOfContent} style={styles.menuItem}>
              <Icon as={MenuIcon} style={styles.menuIcon} />
              <Text>{t("view-table-content")}</Text>
            </Pressable>
            <Pressable onPress={viewAll} style={styles.menuItem}>
              <Icon as={EyeIcon} style={styles.menuIcon} />
              <Text>{t("view-all")}</Text>
            </Pressable>
            <Divider style={styles.divider} />
            <Pressable onPress={reloadDocument} style={styles.menuItem}>
              <Icon as={RepeatIcon} style={styles.menuIcon} />
              <Text>{t("reload-document")}</Text>
            </Pressable>
          </DrawerBody>
          <DrawerFooter>
            <Button onPress={onClose} style={{ flex: 1 }}>
              <ButtonText>{t("close")}</ButtonText>
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

interface SideMenuProps {
  onClose?: () => void;
  isOpen: boolean;
}
