import { Button, ButtonText } from "@/components/ui/button";
import {
  Drawer,
  DrawerBackdrop,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from "@/components/ui/drawer";
import { Heading } from "@/components/ui/heading";
import { Icon, RepeatIcon, SlashIcon } from "@/components/ui/icon";
import { Modal, ModalBackdrop, ModalContent } from "@/components/ui/modal";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import useDeleteSource, { WipeDataStep } from "@/hooks/useDeleteSource";
import useLoadSource, { ReloadingStep } from "@/hooks/useLoadSource";
import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import ProgressBar from "../components/ProgressBar";
import { PageContext } from "../PageContext";

const styles = StyleSheet.create({
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

export default function SideMenu({ onClose, show }: SideMenuProps) {
  const { t } = useTranslation();
  const setPageNumber = useContext(PageContext)?.setPageNumber;
  const [showProgress, setShowProgress] = useState(false);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [progressStep, setProgressStep] = useState<
    ReloadingStep | WipeDataStep
  >("initiating");

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

  function reloadDocument() {
    setShowProgress(true);
    useLoadSource({
      onLoadingComplete: () => completeProgress(1),
      updateProgress,
    });
  }

  function wipeData() {
    setShowProgress(true);
    useDeleteSource({
      // clear reader content
      onDeletionComplete: () => completeProgress(0),
      updateProgress,
    });
  }

  return (
    <>
      <Modal isOpen={showProgress}>
        <ModalBackdrop />
        <ModalContent>
          <ProgressBar
            progressPercentage={progressPercentage}
            text={t(progressStep)}
          />
        </ModalContent>
      </Modal>
      <Drawer closeOnOverlayClick={true} isOpen={show} size="lg">
        <DrawerBackdrop />
        <DrawerContent>
          <DrawerHeader>
            <Heading>{t("settings")}</Heading>
          </DrawerHeader>
          <DrawerBody style={styles.menuContent}>
            <Pressable onPress={reloadDocument} style={styles.menuItem}>
              <Icon as={RepeatIcon} style={styles.menuIcon} />
              <Text>{t("reload-document")}</Text>
            </Pressable>
            <Pressable onPress={wipeData} style={styles.menuItem}>
              <Icon as={SlashIcon} style={styles.menuIcon} />
              <Text>{t("wipe-data")}</Text>
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
  show: boolean;
}
