import { useState, useCallback, useEffect } from 'react';

export const usePersistentState = <T>(key: string, initialValue: T): [T, (newValue: T) => void] => {
    const [value, setValue] = useState<T>(initialValue);
    useEffect(() => {
        //initialize values
        const storedItems = localStorage.getItem(key);
        if (storedItems) {
            setValue(JSON.parse(storedItems));
        }
    }, [key]);
    const setPersistentValue = useCallback((newValue: T) => {
        localStorage.setItem(key, JSON.stringify(newValue));
        setValue(newValue);
    }, [value, key]);
    return [value, setPersistentValue];
}
