import { useRef, useState, useEffect, MutableRefObject, RefObject } from 'react';

export const useHover = <T extends HTMLElement>(): [RefObject<T>, boolean] => {
    const [hover, setHover] = useState(false);
    const ref = useRef<T>(null);
    useEffect(() => {
        const element = ref.current;
        const onMouseOver = () => {
            setTimeout(() => {
                setHover(true);
            }, 5);
        }
        const onMouseExit = () => {
            setHover(false);
        }
        element?.addEventListener('mouseover', onMouseOver);
        element?.addEventListener('mouseleave', onMouseExit)
        return () => {
            element?.removeEventListener('mouseover', onMouseOver);
            element?.removeEventListener('mouseleave', onMouseExit);
        }
    }, [ref.current]);
    return [ref, hover];
}