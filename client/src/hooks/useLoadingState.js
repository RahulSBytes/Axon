import { useState, useCallback } from 'react';

export function useLoadingState() {
    const [loadingStates, setLoadingStates] = useState({});

    const isLoading = useCallback((id) => loadingStates[id] || false, [loadingStates]);

    const withLoading = useCallback((id, asyncFn) => {
        return async (...args) => {
            setLoadingStates(prev => ({ ...prev, [id]: true }));
            try {
                return await asyncFn(...args);
            } finally {
                setLoadingStates(prev => ({ ...prev, [id]: false }));
            }
        };
    }, []);

    return { isLoading, withLoading };
}