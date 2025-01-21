import { openDatabase } from "./db-utils";

export default function useDeleteSource({
  onDeletionComplete,
  updateProgress,
}: UseDeleteSourceProps) {
  if (updateProgress) {
    updateProgress("initiating", 0);
  }
  const db = openDatabase();

  if (updateProgress) {
    updateProgress("deleting", 0);
  }

  db.runSync(`DELETE FROM pages;`);

  if (updateProgress) {
    updateProgress("complete", 100);
  }
  if (onDeletionComplete) {
    onDeletionComplete();
  }
}

interface UseDeleteSourceProps {
  onDeletionComplete?: () => void;
  updateProgress?: (
    progressStep: WipeDataStep,
    progressPercentage: number,
  ) => void;
}

export type WipeDataStep = "initiating" | "deleting" | "complete";
