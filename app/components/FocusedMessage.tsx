import { Portal } from "@/components/ui/portal";
import { VStack } from "@/components/ui/vstack";
import React, { ReactNode } from "react";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  message: {
    opacity: 1.0,
  },
  overlay: {
    flex: 1,
    position: "absolute",
    left: 0,
    top: 0,
    opacity: 0.5,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default function FocusedMessage({ children }: FocusedMessageProps) {
  return (
    <Portal isOpen={true} style={styles.overlay}>
      <VStack style={styles.message}>{children}</VStack>
    </Portal>
  );
}

interface FocusedMessageProps {
  children?: ReactNode;
}
