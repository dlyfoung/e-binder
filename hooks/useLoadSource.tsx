import Page from "@/types/Page";
import NetInfo from "@react-native-community/netinfo";
import * as FileSystem from "expo-file-system";
import { openDatabase } from "./db-utils";

export default async function useLoadSource({
  onInternetConnectionError: onInternetConnectionError,
  onLoadingComplete,
  updateProgress,
  onlyWifi,
}: LoadSourceProps) {
  if (updateProgress) {
    updateProgress("initiating", 0);
  }

  // check internet connection
  const { isConnected, isWifiEnabled } = await NetInfo.fetch();
  if (!isConnected || (onlyWifi && !isWifiEnabled)) {
    if (onInternetConnectionError) {
      onInternetConnectionError();
    }
    return;
  }

  const callback = (downloadProgress: FileSystem.DownloadProgressData) => {
    // downloadProgress.totalBytesExpectedToWrite can be -1 if the response's content-length
    // is not defined. https://github.com/expo/expo/issues/7523#issuecomment-606000669
    const progress =
      downloadProgress.totalBytesExpectedToWrite >= 0
        ? downloadProgress.totalBytesWritten /
          downloadProgress.totalBytesExpectedToWrite
        : 100;

    if (updateProgress) {
      updateProgress("downloading", progress);
    }
  };

  if (updateProgress) {
    updateProgress("downloading", 0);
  }
  // TODO: externalize config
  const downloadResumable = FileSystem.createDownloadResumable(
    "https://docs.google.com/document/u/0/export?format=txt&id=1mtZ0EV1xHzE-0gjbzUU-a_qdr6UHMUD8u8Vq_gEnEFQ",
    FileSystem.documentDirectory + "source.txt",
    {},
    callback,
  );

  const { uri } = await downloadResumable.downloadAsync();

  FileSystem.readAsStringAsync(uri).then((textContent) => {
    const pageBreak = "________________";
    const pages = textContent.split(pageBreak);

    // TODO: incremental update callback
    if (updateProgress) {
      updateProgress("updating-database", 50);
    }
    updateDatabase(pages);

    if (updateProgress) {
      updateProgress("complete", 100);
    }
    if (onLoadingComplete) {
      onLoadingComplete();
    }
  });
}

function updateDatabase(pages: string[]) {
  const db = openDatabase();
  db.runSync(`DELETE FROM pages;`);

  // TODO: batch and incremental progress
  pages.forEach((page) => {
    const { title, content } = parsePage(page);
    if (content) {
      db.runSync(
        "INSERT INTO pages (title, content) VALUES (?, ?)",
        title ?? null,
        content,
      );
    }
  });
  db.closeSync();
}

function parsePage(page: string): Page {
  if (!page) return {};

  // use the first non empty line as title
  const lines = page.split(/\r?\n/);

  let index = -1;
  let found = false;
  while (index < lines.length && !found) {
    index++;
    found = lines[index].trim() !== "";
  }

  if (found) {
    const title = lines[index].trim();
    return index === lines.length - 1
      ? {
          // if there is only one line, title and content are the same
          content: title,
          title: title,
        }
      : {
          // content is everything that follows the title
          content: page.substring(page.indexOf(title) + title.length).trim(),
          title: title,
        };
  }

  return {};
}

interface LoadSourceProps {
  onInternetConnectionError?: () => void;
  onLoadingComplete?: () => void;
  updateProgress?: (
    progressStep: ReloadingStep,
    progressPercentage: number,
  ) => void;
  onlyWifi?: boolean;
}

export type ReloadingStep =
  | "initiating"
  | "downloading"
  | "updating-database"
  | "complete";
