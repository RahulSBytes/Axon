import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';

export function useCopy() {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = useCallback(async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            toast.error('Failed to copy:');
        }
    }, []);

    return { copied, copyToClipboard };
}