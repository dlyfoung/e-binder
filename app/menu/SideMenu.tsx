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

export default function SideMenu({ onClose, show }: SideMenuProps) {
  return (
    <Drawer closeOnOverlayClick={true} isOpen={show} size="lg">
      <DrawerBackdrop />
      <DrawerContent>
        <DrawerHeader>
          <Heading>Menu</Heading>
        </DrawerHeader>
        <DrawerBody>
          <Text>Settings</Text>
        </DrawerBody>
        <DrawerFooter>
          <Button onPress={onClose} style={{ flex: 1 }}>
            <ButtonText>Close</ButtonText>
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
