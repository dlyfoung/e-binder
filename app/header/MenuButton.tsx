import { Icon, MenuIcon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import React from "react";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  menuButton: {
    justifyContent: "center",
    padding: 5,
  },
});

export default function MenuButton({ onPress }: MenuButtonProps) {
  return (
    <Pressable onPress={onPress} style={styles.menuButton}>
      <Icon as={MenuIcon} size="xl" />
    </Pressable>
  );
}

interface MenuButtonProps {
  onPress: () => void;
}
