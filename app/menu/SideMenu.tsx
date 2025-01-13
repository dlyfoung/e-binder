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
import { Text } from "@/components/ui/text";
import React from "react";
import { useTranslation } from "react-i18next";

export default function SideMenu({ onClose, show }: SideMenuProps) {
  const { t } = useTranslation();

  return (
    <Drawer closeOnOverlayClick={true} isOpen={show} size="lg">
      <DrawerBackdrop />
      <DrawerContent>
        <DrawerHeader>
          <Heading>{t("menu")}</Heading>
        </DrawerHeader>
        <DrawerBody>
          <Text>TODO</Text>
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
