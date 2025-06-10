"use client"

import {useCallback} from "react";
import {getCharCodes, getReversedCharCodes} from "./remap";
import {useAtomValue, useSetAtom} from "jotai";
import {errorTextState, selectFileState, textContentState} from "@/state/jotai";

export const useExtract = () => {
    const selectedFile = useAtomValue(selectFileState);
    const setError = useSetAtom(errorTextState);
    const setTextContent = useSetAtom(textContentState);

    return useCallback(async () => {
        if (!selectedFile) {
            setError("Pilih file .msd terlebih dahulu!");
            return;
        }
        const charCodes = getCharCodes();
        const reversedCharCodes = getReversedCharCodes(charCodes);
        const endTag = 0x8001;
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const arrayBuffer = e.target?.result as ArrayBuffer;
                const dataView = new DataView(arrayBuffer);
                let offset = 0;
                if (dataView.byteLength < 4) {
                    setError("File tidak valid atau terlalu kecil.");
                    return;
                }
                const messageCount = dataView.getUint32(offset, true);
                offset += 4;
                if (4 + (messageCount * 8) > dataView.byteLength) {
                    setError(`Format file tidak valid.`);
                    return;
                }
                const offsets: bigint[] = [];
                for (let i = 0; i < messageCount; i++) {
                    offsets.push(dataView.getBigUint64(offset, true));
                    offset += 8;
                }
                let resultText = "";
                for (let i = 0; i < messageCount; i++) {
                    let currentOffset = Number(offsets[i]);
                    if (currentOffset >= dataView.byteLength) {
                        console.error(`Error: Offset untuk pesan ${i} (${currentOffset}) berada di luar batas file (${dataView.byteLength}).`);
                        resultText += `[ERROR: PESAN ${i} TIDAK BISA DIBACA - OFFSET SALAH]\n`;
                        continue;
                    }
                    let messageLine = "";

                    while (currentOffset < dataView.byteLength) {
                        if (currentOffset + 2 > dataView.byteLength) {
                            console.warn(`Peringatan: Mencapai akhir file secara tak terduga saat memproses pesan ${i}.`);
                            break;
                        }

                        const messageChar = dataView.getUint16(currentOffset, true);
                        currentOffset += 2;

                        const char = reversedCharCodes.get(messageChar);
                        if (char) {
                            messageLine += char;
                        } else {
                            messageLine += `{${messageChar.toString(16).toUpperCase().padStart(4, '0')}}`;
                        }

                        if (messageChar === endTag) {
                            if (currentOffset < dataView.byteLength && dataView.getUint16(currentOffset, true) === 0) {
                                messageLine += "{0000}";
                                currentOffset += 2;
                            }
                            break;
                        }
                    }
                    resultText += messageLine + "\n";
                }
                setTextContent(resultText.trim());
                setError("");
            } catch (err: any) {
                setError(`Terjadi kesalahan saat ekstrak: ${err.message}`);
                console.error(err);
            }
        };
        reader.onerror = () => {
            setError("Gagal membaca file.");
        }
        reader.readAsArrayBuffer(selectedFile);
    }, [selectedFile, setError, setTextContent]);
}
