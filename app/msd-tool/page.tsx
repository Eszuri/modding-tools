"use client";

import {handleExtract} from './extract';
import {handleRepack} from './repack';
import {useAtom, useSetAtom} from 'jotai';
import {errorTextState, selectFileState, textContentState} from '@/state/jotai';

export default function HomePage() {
    const setSelectedFile = useSetAtom(selectFileState);
    const [error, setError] = useAtom(errorTextState);
    const [textContent, setTextContent] = useAtom(textContentState);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setTextContent("");
            setError("");
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-900 text-white">
            <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-4 text-center text-yellow-400">God Hand MSD Tool</h1>

                {error && <p className="bg-red-500 text-white p-2 rounded mb-4">{error}</p>}

                <div className="mb-4">
                    <label htmlFor="file-upload" className="block text-sm font-medium mb-2">Unggah File .msd</label>
                    <input
                        id="file-upload"
                        type="file"
                        accept=".msd"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-yellow-500 file:text-black hover:file:bg-yellow-600"
                    />
                </div>

                <div className="flex space-x-4 mb-4">
                    <button
                        onClick={handleExtract}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-500 disabled:cursor-not-allowed"
                    >
                        Ekstrak Teks dari .msd
                    </button>
                    <button
                        onClick={handleRepack}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-500 disabled:cursor-not-allowed"
                    >
                        Repack Teks ke .msd
                    </button>
                </div>

                <textarea
                    value={textContent}
                    onChange={(e) => setTextContent(e.target.value)}
                    placeholder="Hasil ekstrak akan muncul di sini, atau tempel teks untuk di-repack..."
                    className="w-full h-96 p-2 bg-gray-900 border border-gray-600 rounded-md focus:ring-yellow-500 focus:border-yellow-500 text-gray-200"
                />
            </div>
        </main>
    );
}
