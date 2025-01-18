import Page from "@/types/Page";
import * as FileSystem from "expo-file-system";
import * as SQLite from "expo-sqlite";

export default async function useLoadSource({
  onDownloading,
  onLoadComplete,
  onUpdatingDatabase,
}: LoadSourceProps) {
  const callback = (downloadProgress: FileSystem.DownloadProgressData) => {
    // downloadProgress.totalBytesExpectedToWrite can be -1 if the response's content-length
    // is not defined. https://github.com/expo/expo/issues/7523#issuecomment-606000669
    const progress =
      downloadProgress.totalBytesExpectedToWrite >= 0
        ? downloadProgress.totalBytesWritten /
          downloadProgress.totalBytesExpectedToWrite
        : 100;

    if (onDownloading) {
      onDownloading(progress);
    }
  };

  if (onDownloading) {
    onDownloading(0);
  }
  const downloadResumable = FileSystem.createDownloadResumable(
    "https://docs.google.com/document/u/0/export?format=txt&id=1mtZ0EV1xHzE-0gjbzUU-a_qdr6UHMUD8u8Vq_gEnEFQ",
    FileSystem.documentDirectory + "source.txt",
    {},
    callback,
  );

  const { uri } = await downloadResumable.downloadAsync();
  console.log("Finished downloading to ", uri);

  FileSystem.readAsStringAsync(uri).then((textContent) => {
    const pageBreak = "________________";
    const pages = textContent.split(pageBreak);

    console.log(`page number=${pages.length}`);
    // console.log("page 1");
    // console.log(pages[0]);

    if (onUpdatingDatabase) {
      onUpdatingDatabase();
      updateDatabase(pages);
    }

    if (onLoadComplete) {
      onLoadComplete();
    }
  });
}

function updateDatabase(pages: string[]) {
  const db = SQLite.openDatabaseSync("ebinder");
  db.execSync(`
    CREATE VIRTUAL TABLE IF NOT EXISTS pages USING fts4(title TEXT, content TEXT);
    DELETE FROM pages;
  `);
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
  onDownloading?: (progressPercentage: number) => void;
  onLoadComplete?: () => void;
  onUpdatingDatabase?: () => void;
}
