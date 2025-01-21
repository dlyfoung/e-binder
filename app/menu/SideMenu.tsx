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
import useDeleteSource from "@/hooks/useDeleteSource";
import useLoadSource from "@/hooks/useLoadSource";
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

  function startProgress(step: ReloadingStep | WipeDataStep) {
    setProgressStep(step);
    setProgressPercentage(0);
    setShowProgress(true);
  }

  function completeProgress() {
    setProgressStep("complete");
    setProgressPercentage(100);
    // give a "feel" that the process is complete
    setTimeout(() => {
      setShowProgress(false);
      closeSideMenu();
    }, 500);
  }

  async function reloadDocument() {
    startProgress("initiating");
    useLoadSource({
      onDownloading: (progress) => {
        setProgressStep("downloading");
        setProgressPercentage(progress);
      },
      onLoadComplete: completeProgress,
      onUpdatingDatabase: () => {
        setProgressStep("updating-database");
        setProgressPercentage(0);
      },
    });
  }

  function wipeData() {
    useDeleteSource({
      onDeletionComplete: () => {
        completeProgress();
        if (setPageNumber) {
          // clear reader content
          setPageNumber(-1);
        }
      },
      onDeletionStart: () => startProgress("deleting"),
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

// TODO: move into hooks
type ReloadingStep =
  | "initiating"
  | "downloading"
  | "updating-database"
  | "complete";

type WipeDataStep = "initiating" | "deleting" | "complete";
