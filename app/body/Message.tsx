import { Alert, AlertIcon, AlertText } from "@/components/ui/alert";
import { CheckCircleIcon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import React from "react";

export default function Message() {
  return (
    <Alert action="error" className="gap-3">
      <AlertIcon as={CheckCircleIcon} size="lg" />
      <AlertText className="text-typography-900" size="sm">
        <Text>Heads up:</Text>
        Once done, this action cannot be undone
      </AlertText>
    </Alert>
  );
}
