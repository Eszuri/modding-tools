import {errorTextState, selectFileState, textContentState} from "@/state/jotai";
import {useAtomValue, useSetAtom} from "jotai";
import {useCallback} from "react";
import {getCharCodes} from "./remap";

export const handleRepack = () => {
    const selectedFile = useAtomValue(selectFileState);
    const setError = useSetAtom(errorTextState);
    const textContent = useAtomValue(textContentState);
    useCallback(async () => {
        if (textContent.trim() === "") {
            setError("Tidak ada teks untuk di-repack!");
            return;
        }

        const charCodes = getCharCodes();
        const lines = textContent.split('\n').filter(line => line.length > 0);
        const lineCount = lines.length;

        const specialMultiCharKeys = Array.from(charCodes.keys())
            .filter(key => key.length > 1 && !key.startsWith('{'))
            .sort((a, b) => b.length - a.length);

        const messageData: number[][] = [];
        let totalMessageLength = 0;

        for (const line of lines) {
            const currentMessageBytes: number[] = [];
            let i = 0;
            while (i < line.length) {
                let matchFound = false;

                if (line[i] === '{' && line[i + 5] === '}') {
                    const hexContent = line.substring(i + 1, i + 5);
                    const hexValue = parseInt(hexContent, 16);
                    if (!isNaN(hexValue)) {
                        currentMessageBytes.push(hexValue);
                        i += 6;
                        matchFound = true;
                    }
                }

                if (matchFound) continue;

                for (const key of specialMultiCharKeys) {
                    if (line.startsWith(key, i)) {
                        currentMessageBytes.push(charCodes.get(key)!);
                        i += key.length;
                        matchFound = true;
                        break;
                    }
                }

                if (matchFound) continue;

                const char = line[i];
                const charCode = charCodes.get(char);
                if (charCode !== undefined) {
                    currentMessageBytes.push(charCode);
                } else {
                    console.warn(`Karakter tidak dikenal dan diabaikan: '${char}'`);
                }
                i++;
            }

            messageData.push(currentMessageBytes);
            totalMessageLength += currentMessageBytes.length * 2;
        }

        const headerSize = 4 + (8 * lineCount);
        const finalSize = headerSize + totalMessageLength;
        const padding = (16 - (finalSize % 16)) % 16;
        const finalBuffer = new ArrayBuffer(finalSize + padding);
        const dataView = new DataView(finalBuffer);

        dataView.setUint32(0, lineCount, true);
        let writerOffset = 4;

        const offsets: bigint[] = [];
        let messageStartOffset = BigInt(headerSize);

        for (const msg of messageData) {
            offsets.push(messageStartOffset);
            messageStartOffset += BigInt(msg.length * 2);
        }

        for (const offset of offsets) {
            dataView.setBigUint64(writerOffset, offset, true);
            writerOffset += 8;
        }

        for (const msg of messageData) {
            for (const code of msg) {
                dataView.setUint16(writerOffset, code, true);
                writerOffset += 2;
            }
        }

        for (let i = 0; i < padding; i++) {
            dataView.setUint8(writerOffset, 0);
            writerOffset++;
        }

        const blob = new Blob([finalBuffer], {type: 'application/octet-stream'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const originalName = selectedFile?.name.replace(/\.[^/.]+$/, "") || "repacked";
        a.download = `${originalName}.msd`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        setError("");

    }, [textContent, selectedFile])
};
