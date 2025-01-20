import { Progress, ProgressFilledTrack } from "@/components/ui/progress";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import React from "react";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  progressBar: { backgroundColor: "orange" },
});

export default function ProgressBar({
  progressPercentage,
  text,
}: ProgressBarProps) {
  return (
    <VStack space="lg">
      <Text size="lg">{`${text} ${progressPercentage}%`}</Text>
      <Progress value={progressPercentage}>
        <ProgressFilledTrack style={styles.progressBar} />
      </Progress>
    </VStack>
  );
}

interface ProgressBarProps {
  progressPercentage: number;
  text?: string;
}
