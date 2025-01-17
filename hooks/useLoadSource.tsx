import * as FileSystem from "expo-file-system";

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
    }

    if (onLoadComplete) {
      onLoadComplete();
    }
  });
}

interface LoadSourceProps {
  onDownloading?: (progressPercentage: number) => void;
  onLoadComplete?: () => void;
  onUpdatingDatabase?: () => void;
}
