import {atom} from "jotai";

export const selectFileState = atom<File | null>(null);
export const errorTextState = atom<string>("");
export const textContentState = atom<string>("");
