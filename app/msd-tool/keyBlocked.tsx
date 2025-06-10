import {errorTextState, textContentState} from "@/state/jotai";
import {useAtom, useSetAtom} from "jotai";

export default function TextareaEditing() {
    const setError = useSetAtom(errorTextState);
    const [textContent, setTextContent] = useAtom(textContentState);
    const NAVIGATION_KEYS = [
        'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight',
        'Home', 'End', 'PageUp', 'PageDown',
        'Shift', 'Control', 'Alt', 'Meta',
        'CapsLock', 'Escape',
        'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'
    ];

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (NAVIGATION_KEYS.includes(event.key)) {
            return;
        }

        const {value, selectionStart, selectionEnd} = event.target as HTMLTextAreaElement;
        const protectedPattern = /\{.*?\}/g;
        let match;

        while ((match = protectedPattern.exec(value)) !== null) {
            const startIndex = match.index;
            const endIndex = startIndex + match[0].length;

            const selectionOverlaps = selectionStart < endIndex && selectionEnd > startIndex;

            if (selectionOverlaps) {
                event.preventDefault();
                setError(`Anda tidak dapat mengubah : ${match[0]}`);
                return;
            }

            const tryingToDeleteEndBoundary = event.key === 'Backspace' && selectionStart === selectionEnd && selectionStart === endIndex;

            const tryingToDeleteStartBoundary = event.key === 'Delete' && selectionStart === selectionEnd && selectionStart === startIndex;

            if (tryingToDeleteEndBoundary || tryingToDeleteStartBoundary) {
                event.preventDefault();
                setError(`Anda tidak dapat menghapus : ${match[0]}`);
                return;
            }
        }
    };

    const handlePaste = (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
        const {value, selectionStart, selectionEnd} = event.target;
        const protectedPattern = /\{.*?\}/g;
        let match;

        while ((match = protectedPattern.exec(value)) !== null) {
            const startIndex = match.index;
            const endIndex = startIndex + match[0].length;

            if (selectionStart < endIndex && selectionEnd > startIndex) {
                event.preventDefault();
                setError(`Aksi 'paste' dibatalkan karena akan mengubah: ${match[0]}`);
                return;
            }
        }
    };


    return (
        <textarea
            value={textContent}
            onChange={(event) => {setTextContent(event.target.value)}}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            spellCheck={false}
            placeholder="Hasil ekstrak akan muncul di sini, atau tempel teks untuk di-repack..."
            className="w-full h-96 p-2 bg-gray-900 border border-gray-600 rounded-md focus:ring-yellow-500 focus:border-yellow-500 text-gray-200"
        />
    )
}
