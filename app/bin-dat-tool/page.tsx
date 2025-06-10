"use client";

import {archiveFileState, errorBINState, logState, manifestFileState, repackFilesState, statusState} from "@/state/jotai";
import {useAtom, useAtomValue, useSetAtom} from "jotai";
import useExtract from "@/app/bin-dat-tool/extract";
import useRepack from "@/app/bin-dat-tool/repack";
import {ChangeEvent, useEffect, useState} from "react";

export default function HomePage() {
    interface UploadProgress {
        file: File;
        progress: number;
        status: UploadStatus;
    }

    type UploadStatus = 'pending' | 'uploading' | 'success' | 'error';
    const [archiveFile, setArchiveFile] = useAtom(archiveFileState);
    const [manifestFile, setManifestFile] = useAtom(manifestFileState);
    const [repackFiles, setRepackFiles] = useAtom(repackFilesState);
    const error = useAtomValue(errorBINState);
    const status = useAtomValue(statusState);
    const setStatus = useSetAtom(statusState);
    const log = useAtomValue(logState);
    const [switchMode, setSwitchMode] = useState(false);
    const [uploadingFiles, setUploadingFiles] = useState<UploadProgress[]>([]);


    const handleChangeMultiple = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files).map(file => ({
                file: file,
                progress: 0,
                status: 'pending' as UploadStatus,
            }));
            setUploadingFiles(selectedFiles);
            setRepackFiles(e.target.files)
        }
    }

    useEffect(() => {
        if (uploadingFiles.length === 0) {
            setStatus("Upload File Terlebih Dahulu")
        } else {
            const updateFileProgress = (index: number, progress: number, status: UploadStatus) => {
                setUploadingFiles(prevFiles => {
                    const newFiles = [...prevFiles];
                    if (newFiles[index]) {
                        newFiles[index] = {...newFiles[index], progress, status};
                    }
                    return newFiles;
                });
            };
            uploadingFiles.forEach((fileProgress, index) => {
                if (fileProgress.status === 'pending') {
                    const xhr = new XMLHttpRequest();
                    const formData = new FormData();
                    formData.append('file', fileProgress.file);
                    xhr.upload.addEventListener('progress', (event) => {
                        if (event.lengthComputable) {
                            const progressPercentage = Math.round((event.loaded / event.total) * 100);
                            updateFileProgress(index, progressPercentage, 'uploading');
                        }
                    });
                    xhr.addEventListener('load', () => {
                        updateFileProgress(index, 100, 'success');
                        console.log(`Upload sukses: ${fileProgress.file.name}`);
                    });
                    xhr.addEventListener('error', () => {
                        updateFileProgress(index, fileProgress.progress, 'error');
                        console.error(`Upload gagal: ${fileProgress.file.name}`);
                    });

                    const API_ENDPOINT = '/api/upload/multiple';
                    xhr.open('POST', API_ENDPOINT, true);
                    xhr.send(formData);
                    updateFileProgress(index, 0, 'uploading');
                }
            });
        }
    }, [uploadingFiles])


    const getProgressBarColor = (status: UploadStatus) => {
        switch (status) {
            case 'success':
                return '#4caf50';
            case 'error':
                return '#f44336';
            default:
                return '#2196f3';
        }
    }

    const handleExtract = useExtract();
    const handleRepack = useRepack();

    return (
        <main className="flex min-h-screen flex-col items-center p-4 bg-gray-900 text-white">
            <div className="w-full max-w-4xl space-y-8">
                <div className="w-full flex justify-center items-center">
                    <label className="switch cursor-pointer relative flex w-[12rem] scale-75 overflow-hidden p-2">
                        <input type="checkbox" className="peer hidden" onChange={(event) => {setSwitchMode(event.target.checked)}} />
                        <div className="absolute -right-[15rem] z-[1] flex h-12 w-48 skew-x-12 items-center justify-center text-lg duration-500 peer-checked:right-1">
                            <span className="-skew-x-12">Repack Mode</span>
                        </div>
                        <div className="z-0 h-12 w-48 -skew-x-12 border border-black bg-sky-600 duration-500 peer-checked:skew-x-12 peer-checked:bg-emerald-600"></div>
                        <div className="absolute left-[0.1rem] flex h-12 w-48 -skew-x-12 items-center justify-center text-lg duration-500 peer-checked:-left-[16rem]">
                            <span className="skew-x-12">Extract Mode</span>
                        </div>
                    </label>
                </div>
                <div className={`bg-gray-800 p-6 rounded-lg shadow-lg ${switchMode == true && "hidden"}`}>
                    <div className="bg-gray-700 p-3 rounded-lg text-center mb-4">
                        <p>Status: <span className="font-semibold text-yellow-300">{status}</span></p>
                        {error && <p className="text-red-400 mt-2">{error}</p>}
                    </div>
                    <h1 className="text-2xl font-bold mb-4 text-center text-blue-400">DAT/BIN Extractor</h1>
                    <div className="mb-4">
                        <label htmlFor="archive-upload" className="block text-sm font-medium mb-2">1. Unggah File .DAT atau .BIN</label>
                        <input
                            id="archive-upload"
                            type="file"
                            accept=".dat,.bin"
                            onChange={(e) => setArchiveFile(e.target.files?.[0] ?? null)}
                            className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-black hover:file:bg-blue-600"
                        />
                    </div>
                    <button
                        onClick={handleExtract}
                        disabled={!archiveFile}
                        className="w-full bg-blue-600 mb-3 cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-500 disabled:cursor-not-allowed"
                    >
                        Ekstrak ke .zip
                    </button>

                    <h1>Log:</h1>
                    <textarea
                        className='bg-black p-2 w-full h-40 rounded'
                        value={log}
                        disabled={true}
                    />
                </div>

                <div className={`bg-gray-800 p-6 rounded-lg shadow-lg ${switchMode == false && "hidden"}`}>
                    <div className="bg-gray-700 p-3 rounded-lg text-center mb-4">
                        <p>Status: <span className="font-semibold text-yellow-300">{status}</span></p>
                        {error && <p className="text-red-400 mt-2">{error}</p>}
                    </div>
                    <h1 className="text-2xl font-bold mb-4 text-center text-green-500">DAT/BIN Repacker</h1>
                    <div className="mb-4">
                        <label htmlFor="manifest-upload" className="block text-sm font-medium mb-2">1. Unggah File Manifest (.txt)</label>
                        <input id="manifest-upload" type="file" accept=".txt" onChange={(e) => setManifestFile(e.target.files?.[0] ?? null)} className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-500 file:text-black hover:file:bg-green-600" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="repack-upload" className="block text-sm font-medium mb-2">2. Unggah SEMUA File Komponen</label>
                        <input id="repack-upload" type="file" multiple onChange={handleChangeMultiple} className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-500 file:text-black hover:file:bg-green-600" />
                    </div>
                    <button
                        onClick={handleRepack} disabled={!repackFiles || !manifestFile} className="w-full cursor-pointer bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-500 disabled:cursor-not-allowed">
                        Repack ke .DAT/.BIN
                    </button>
                    <h1 className="capitalize mt-4">log:</h1>


                    <div style={{marginTop: '30px'}}>
                        {uploadingFiles.map((upload, index) => (
                            <div key={index} style={{marginBottom: '15px'}}>
                                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '5px'}}>
                                    <span>{upload.file.name}</span>
                                    <span>
                                        {upload.status === 'success' && '✅ Selesai'}
                                        {upload.status === 'error' && '❌ Gagal'}
                                        {upload.status === 'uploading' && `${upload.progress}%`}
                                        {upload.status === 'pending' && 'Menunggu...'}
                                    </span>
                                </div>
                                <div style={{backgroundColor: '#e0e0e0', borderRadius: '5px', overflow: 'hidden'}}>
                                    <div style={{
                                        width: `${upload.progress}%`,
                                        height: '20px',
                                        backgroundColor: getProgressBarColor(upload.status),
                                        transition: 'width 0.3s ease-in-out',
                                    }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
