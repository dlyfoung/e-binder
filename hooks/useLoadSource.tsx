import * as FileSystem from "expo-file-system";

export default async function useLoadSource() {
  const callback = (downloadProgress: FileSystem.DownloadProgressData) => {
    const progress =
      downloadProgress.totalBytesWritten /
      downloadProgress.totalBytesExpectedToWrite;
    console.log(`progress=${progress}`);
  };

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
    console.log("page 1");
    console.log(pages[0]);
  });
}
