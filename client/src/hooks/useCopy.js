// hooks/useCopy.js

import { useState, useCallback } from 'react';

export function useCopy() {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = useCallback(async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error('Failed to copy:', error);
        }
    }, []);

    return { copied, copyToClipboard };
}