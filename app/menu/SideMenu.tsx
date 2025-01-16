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
import * as FileSystem from "expo-file-system";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";

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

  function closeSideMenu() {
    if (onClose) {
      onClose();
    }
  }

  async function reloadDocument() {
    const callback = (downloadProgress: FileSystem.DownloadProgressData) => {
      const progress =
        downloadProgress.totalBytesWritten /
        downloadProgress.totalBytesExpectedToWrite;
      console.log(`progress=${progress}`);
    };

    const downloadResumable = FileSystem.createDownloadResumable(
      "https://docs.google.com/document/u/0/export?format=txt&id=1mtZ0EV1xHzE-0gjbzUU-a_qdr6UHMUD8u8Vq_gEnEFQ",
      FileSystem.documentDirectory + "source.txt",
      {},
      callback,
    );

    const { uri } = await downloadResumable.downloadAsync();
    console.log("Finished downloading to ", uri);

    FileSystem.readAsStringAsync(uri).then((textContent) => {
      const pageBreak = "________________";
      const pages = textContent.split(pageBreak);

      console.log(`page number=${pages.length}`);
      console.log("page 1");
      console.log(pages[0]);
    });

    closeSideMenu();
  }

  function wipeData() {
    closeSideMenu();
  }

  return (
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
  );
}

interface SideMenuProps {
  onClose?: () => void;
  show: boolean;
}
