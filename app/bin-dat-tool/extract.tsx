import {archiveFileState, errorBINState, logState, statusState} from "@/state/jotai";
import {useAtomValue, useSetAtom} from "jotai";
import JSZip from "jszip";
import {useCallback} from "react";

export default function useExtract() {
    const setError = useSetAtom(errorBINState);
    const setStatus = useSetAtom(statusState);
    const archiveFile = useAtomValue(archiveFileState);
    const setLog = useSetAtom(logState);

    const extensionFile = archiveFile?.name.split('.').pop();

    return useCallback(async () => {

        if (!archiveFile) {
            setError("Pilih file .DAT atau .BIN terlebih dahulu!");
            return;
        }
        setStatus("Membaca file arsip...");
        try {
            const arrayBuffer = await archiveFile.arrayBuffer();
            const dataView = new DataView(arrayBuffer);
            const zip = new JSZip();
            const folderName = archiveFile.name.replace(/\.[^/.]+$/, "");
            const folder = zip.folder(folderName)!;

            const fileCount = dataView.getUint32(0, true);
            let manifestContent = `FileCount = ${fileCount}\n${archiveFile.name.substring(archiveFile.name.lastIndexOf('.'))}\n`;

            setLog("Mengambil Deskripsi FIle ..." + `\n\n` + "Total FIle: " + fileCount + `\n`);

            if (extensionFile != "bin" && extensionFile != "dat") {
                setLog(prev => prev + "Format File Tidak Valid" + `\n` + "File Harus berformat .dat atau .bin");
            }


            const offsets: number[] = [];
            const extensions: string[] = [];
            const textDecoder = new TextDecoder('utf-8');

            for (let i = 0; i < fileCount; i++) {
                offsets.push(dataView.getUint32(4 + i * 4, true));
            }

            const extTableOffset = 4 + fileCount * 4;
            for (let i = 0; i < fileCount; i++) {
                const extBytes = new Uint8Array(arrayBuffer, extTableOffset + i * 4, 4);
                const zeroIndex = extBytes.indexOf(0);
                const finalBytes = zeroIndex !== -1 ? extBytes.slice(0, zeroIndex) : extBytes;
                let extension = textDecoder.decode(finalBytes);
                extensions.push(extension || "DMY");
            }

            setStatus(`Mengekstrak ${fileCount} file...`);
            setLog((prev) => prev + "📁" + folderName + `/\n`)

            for (let i = 0; i < fileCount; i++) {
                const startOffset = offsets[i];
                const endOffset = (i === fileCount - 1) ? arrayBuffer.byteLength : offsets[i + 1];
                const fileData = arrayBuffer.slice(startOffset, endOffset);

                const outFileName = `${folderName}_${i}.${extensions[i]}`;
                folder.file(outFileName, fileData);
                manifestContent += `File_${i} = ${folderName}\\${outFileName}\n`;
                setLog((prev) => prev + `  ⫰` + ". " + outFileName + `\n`)
            }

            setLog(prev => prev + `\n` + "Membuat Struktur Folder / Manifest File ..." + `\n`)
            zip.file(`${folderName}.txt`, manifestContent);
            setLog(prev => prev + folderName + ".txt" + `\n` + "Berhasil ✅")



            setStatus("Membuat file .zip...");
            const zipBlob = await zip.generateAsync({type: "blob"});
            const url = URL.createObjectURL(zipBlob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${folderName}.zip`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            setStatus("Ekstraksi selesai!");
            setError("");

        } catch (e: unknown) {
            setError(`Error saat ekstrak: ${e.message}`);
            setStatus("Gagal.");
        }
    }, [archiveFile])
}
