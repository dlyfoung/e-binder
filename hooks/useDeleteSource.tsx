import { openDatabase } from "./db-utils";

export default function useDeleteSource({
  onDeletionComplete,
  onDeletionStart,
}: useDeleteSourceProps) {
  const db = openDatabase();

  if (onDeletionStart) {
    onDeletionStart();
  }

  db.runSync(`DELETE FROM pages;`);

  if (onDeletionComplete) {
    onDeletionComplete();
  }
}

interface useDeleteSourceProps {
  onDeletionComplete?: () => void;
  onDeletionStart?: () => void;
}
