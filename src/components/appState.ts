import { usePersistentState } from "../hooks/useStorage";
import { Gif, getGifs } from "../api/giphy";
import { useState } from "react";

const ITEM_LIMIT = 25;

export const useAppState = () => {
    const [gifs, setGifs] = usePersistentState<Gif[] | null>('urls', null);
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [currentOffset, setCurrentOffset] = useState(0);
    const [currentType, setCurrentType] = useState<'trending' | 'search'>('search');

    const loadMore = async () => {
        const { data, pagination } = await getGifs(currentType, value, { offset: currentOffset, limit: ITEM_LIMIT });
        if (pagination.total_count > pagination.offset) {
            setCurrentOffset(pagination.offset + ITEM_LIMIT);
        }
        setGifs([...gifs as Gif[], ...data]);
    }

    const loadInitial = async (type: 'trending' | 'search', value?: string) => {
        setLoading(true);
        setCurrentType(type);
        const { data, pagination } = await getGifs(type, value, { offset: 0, limit: ITEM_LIMIT });
        if (pagination.total_count > pagination.offset) {
            setCurrentOffset(pagination.offset + ITEM_LIMIT);
        }
        setGifs(data);
        setLoading(false);
    }

    const clear = () => {
        setGifs(null);
    }

    const remove = (id: string) => {
        if (!gifs) {
            return;
        }
        const index = gifs.findIndex((g) => g.id === id);
        if (index != -1) {
            gifs.splice(index, 1);
            setGifs([...gifs]);
        }
    }
    return {
        gifs,
        value,
        setValue,
        loading,
        loadInitial,
        loadMore,
        clear,
        remove
    }
}