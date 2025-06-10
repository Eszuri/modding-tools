import {atom} from "jotai";

// msd tool
export const selectFileState = atom<File | null>(null);
export const errorTextState = atom<string>("");
export const textContentState = atom<string>("");


// bin dat tool
export const archiveFileState = atom<File | null>(null);
export const repackFilesState = atom<FileList | null>(null);
export const manifestFileState = atom<File | null>(null);
export const statusState = atom<string>("");
export const errorBINState = atom<string>("");
export const logState = atom<string>("");

