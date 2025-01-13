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
import { Icon, RemoveIcon, RepeatIcon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  menuIcon: {
    marginRight: 5,
  },
  menuItem: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 2,
    marginTop: 2,
  },
});

export default function SideMenu({ onClose, show }: SideMenuProps) {
  const { t } = useTranslation();

  return (
    <Drawer closeOnOverlayClick={true} isOpen={show} size="lg">
      <DrawerBackdrop />
      <DrawerContent>
        <DrawerHeader>
          <Heading>{t("settings")}</Heading>
        </DrawerHeader>
        <DrawerBody>
          <Pressable style={styles.menuItem}>
            <Icon as={RepeatIcon} style={styles.menuIcon} />
            <Text>{t("reload-document")}</Text>
          </Pressable>
          <Pressable style={styles.menuItem}>
            <Icon as={RemoveIcon} style={styles.menuIcon} />
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
