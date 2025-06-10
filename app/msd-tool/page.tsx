"use client";

import {useAtom, useSetAtom} from 'jotai';
import {errorTextState, selectFileState, textContentState} from '@/state/jotai';
import {useExtract} from '@/app/msd-tool/extract';
import {useRepack} from '@/app/msd-tool/repack';
import {useState} from 'react';
import axios from 'axios';
import TextareaEditing from '@/app/msd-tool/keyBlocked';

export default function HomePage() {
    const [selectedFile, setSelectedFile] = useAtom(selectFileState);
    const [error, setError] = useAtom(errorTextState);
    const setTextContent = useSetAtom(textContentState);

    const [fileName, setFileName] = useState('');
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState('No File Chosen');
    const lastModifiedFile = new Date(Number(selectedFile?.lastModified));

    const handleExtract = useExtract();
    const handleRepack = useRepack();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setTextContent("");
            setError("");
            setProgress(0);
            setFileName(file.name);
            setProgress(0);
            setMessage(`uploading ${progress}%`);

        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            axios.post('/api/upload/single', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent: ProgressEvent) => {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    setProgress(percentCompleted);
                },
            });

            setMessage('Upload Success');

        } catch (err) {
            setMessage('Upload Failed');
            console.error(err);
        }
    };
    return (
        <main className="flex flex-col items-center justify-center p-5 text-white">
            <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-4 text-center text-yellow-400">God Hand MSD Tool</h1>

                {error && <p className="bg-red-500 text-white p-2 rounded mb-4">{error}</p>}

                <div className='mb-2'>
                    <div className='flex w-full h-10 overflow-hidden transition duration-500'>
                        <label htmlFor="file-upload" className="w-28 min-w-28 h-full flex justify-center items-center text-sm font-medium mb-2 bg-amber-500 cursor-pointer p-2 rounded hover:bg-amber-400">Unggah File</label>
                        <div className={`w-[100%] h-full flex justify-center items-center relative`}>
                            {message}
                            <div className={`w-[${progress}%] transition duration-1000 left-0 absolute border-b-2 border-green-500 h-full`}></div>
                        </div>
                    </div>

                    <input
                        id='file-upload'
                        type="file"
                        accept=".msd"
                        onChange={handleFileChange}
                        className='hidden' />

                </div>

                <div className={`mb-2 ${fileName == '' ? 'hidden' : 'block'}`}>
                    <div className='flex border-b-2'><span className="w-28">Name File:</span>{selectedFile?.name}</div>
                    <div className='flex border-b-2'><span className="w-28">Size File:</span>{selectedFile?.size} ({(selectedFile?.size as number / 1000).toFixed(1)} KiB)</div>
                    <div className='flex border-b-2'><span className="w-28">Last Modified:</span>{lastModifiedFile.getDate()}/{lastModifiedFile.getMonth()}/{lastModifiedFile.getFullYear()}, {lastModifiedFile.getHours()}.{lastModifiedFile.getMinutes()}.{lastModifiedFile.getSeconds()}</div>
                </div>

                <div className="flex space-x-4 mb-4">
                    <button
                        onClick={handleExtract}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-500 disabled:cursor-not-allowed"
                    >Ekstrak To Text
                    </button>
                    <button
                        onClick={handleRepack}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-500 disabled:cursor-not-allowed"
                    >Repack To .MSD</button>
                </div>
                <TextareaEditing />
            </div>
        </main>
    );
}
