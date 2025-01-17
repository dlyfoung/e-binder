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
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import useLoadSource from "@/hooks/useLoadSource";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import FocusedMessage from "../components/FocusedMessage";
import ProgressBar from "../components/ProgressBar";

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
    marginBottom: 3,
    marginTop: 3,
  },
});

export default function SideMenu({ onClose, show }: SideMenuProps) {
  const { t } = useTranslation();
  const [showProgress, setShowProgress] = useState(false);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [progressStep, setProgressStep] = useState<ReloadingStep>("initiating");

  function closeSideMenu() {
    if (onClose) {
      onClose();
    }
  }

  async function reloadDocument() {
    setProgressPercentage(0);
    setShowProgress(true);
    useLoadSource({
      onDownloading: (progress) => {
        setProgressStep("downloading");
        setProgressPercentage(progress);
      },
      onLoadComplete: () => {
        setProgressStep("complete");
        setProgressPercentage(100);
        // give a "feel" that the process is complete
        setTimeout(() => {
          setShowProgress(false);
          closeSideMenu();
        }, 500);
      },
      onUpdatingDatabase: () => {
        setProgressStep("updating-database");
        setProgressPercentage(0);
      },
    });
  }

  function wipeData() {
    closeSideMenu();
  }

  return (
    <>
      {showProgress && (
        <FocusedMessage>
          <ProgressBar
            progressPercentage={progressPercentage}
            text={t(progressStep)}
          />
        </FocusedMessage>
      )}
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

type ReloadingStep =
  | "initiating"
  | "downloading"
  | "updating-database"
  | "complete";
