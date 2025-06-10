import {errorBINState, manifestFileState, repackFilesState, statusState} from "@/state/jotai";
import {useAtomValue, useSetAtom} from "jotai";
import {useCallback} from "react";

export default function useRepack() {
    const repackFiles = useAtomValue(repackFilesState);
    const manifestFile = useAtomValue(manifestFileState);


    return useCallback(async () => {
        const setError = useSetAtom(errorBINState);
        const setStatus = useSetAtom(statusState);
        if (!repackFiles || !manifestFile) {
            setError("Pilih file manifest (.txt) dan semua file komponennya!");
            return;
        }
        setStatus("Membaca manifest...");
        try {
            const manifestText = await manifestFile.text();
            const lines = manifestText.split('\n').filter(l => l.trim() !== '');

            const fileCountLine = lines.find(l => l.startsWith('FileCount'));
            if (!fileCountLine) throw new Error("Manifest tidak valid: FileCount tidak ditemukan.");
            const fileCount = parseInt(fileCountLine.split('=')[1].trim());

            const datExtension = lines[1].trim();
            const outFileName = manifestFile.name.replace('.txt', '') + datExtension;

            const fileMap = new Map<string, File>();
            for (const file of repackFiles) {
                fileMap.set(file.name, file);
            }

            const fileDataArray: ArrayBuffer[] = [];
            const extensions: string[] = [];
            for (let i = 0; i < fileCount; i++) {
                const line = lines[i + 2];
                const filePath = line.split('=')[1].trim().replace(/\\/g, '/');
                const fileName = filePath.substring(filePath.lastIndexOf('/') + 1);

                const file = fileMap.get(fileName);
                if (!file) throw new Error(`File komponen hilang: ${fileName}`);

                fileDataArray.push(await file.arrayBuffer());
                extensions.push(fileName.substring(fileName.lastIndexOf('.') + 1));
            }

            setStatus(`Menggabungkan ${fileCount} file...`);

            let headerSize = 4 + (fileCount * 8);
            headerSize += (16 - (headerSize % 16)) % 16;
            const totalDataSize = fileDataArray.reduce((sum, buf) => sum + buf.byteLength, 0);

            const finalBuffer = new ArrayBuffer(headerSize + totalDataSize);
            const dataView = new DataView(finalBuffer);
            const textEncoder = new TextEncoder();
            let writerOffset = 0;

            dataView.setUint32(writerOffset, fileCount, true);
            writerOffset = headerSize;

            const offsets: number[] = [];
            for (const buffer of fileDataArray) {
                offsets.push(writerOffset);
                new Uint8Array(finalBuffer).set(new Uint8Array(buffer), writerOffset);
                writerOffset += buffer.byteLength;
            }

            let tableWriterOffset = 4;
            for (const offset of offsets) {
                dataView.setUint32(tableWriterOffset, offset, true);
                tableWriterOffset += 4;
            }
            for (const ext of extensions) {
                const encodedExt = textEncoder.encode(ext);
                for (let i = 0; i < 4; i++) {
                    dataView.setUint8(tableWriterOffset + i, i < encodedExt.length ? encodedExt[i] : 0);
                }
                tableWriterOffset += 4;
            }

            setStatus("Membuat file arsip...");
            const blob = new Blob([finalBuffer], {type: 'application/octet-stream'});
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = outFileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            setStatus("Repack selesai!");
            setError("");

        } catch (e) {
            setError(`Error saat repack: ${e}`);
            setStatus("Gagal.");
        }
    }, [repackFiles, manifestFile])
}
