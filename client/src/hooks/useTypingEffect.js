// hooks/useTypingEffect.js

import { useState, useEffect, useRef } from 'react';

export function useTypingEffect(text, speed = 50, chunkSize = 1) {
    const [displayedText, setDisplayedText] = useState('');
    const typedTextsRef = useRef(new Set());

    useEffect(() => {
        if (!text) {
            setDisplayedText('');
            return;
        }

        // Already typed - show immediately
        if (typedTextsRef.current.has(text)) {
            setDisplayedText(text);
            return;
        }

        setDisplayedText('');
        const words = text.split(' ');
        let index = 0;

        const timer = setInterval(() => {
            if (index < words.length) {
                const chunk = words.slice(index, index + chunkSize).join(' ');
                setDisplayedText(prev => prev + (index === 0 ? '' : ' ') + chunk);
                index += chunkSize;
            } else {
                typedTextsRef.current.add(text);
                clearInterval(timer);
            }
        }, speed);

        return () => clearInterval(timer);
    }, [text, speed, chunkSize]);

    return displayedText;
}