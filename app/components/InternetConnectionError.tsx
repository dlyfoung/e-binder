import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogContent,
} from "@/components/ui/alert-dialog";
import { HStack } from "@/components/ui/hstack";
import { AlertCircleIcon, Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  errorMessageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  errorMessage: { paddingHorizontal: 10 },
});

export default function InternetConnectionError({
  isOpen,
  onClose,
}: InternetConnectionErrorProps) {
  const { t } = useTranslation();
  return (
    <AlertDialog isOpen={isOpen} onClose={onClose}>
      <AlertDialogBackdrop />
      <AlertDialogContent>
        <AlertDialogBody>
          <HStack style={styles.errorMessageContainer}>
            <Icon as={AlertCircleIcon} size={"lg"} stroke="red" />
            <Text size={"lg"} style={styles.errorMessage}>
              {t("internet-connection-error")}
            </Text>
          </HStack>
        </AlertDialogBody>
      </AlertDialogContent>
    </AlertDialog>
  );
}

interface InternetConnectionErrorProps {
  isOpen: boolean;
  onClose: () => void;
}
