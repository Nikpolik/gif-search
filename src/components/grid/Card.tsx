import React, { FC } from 'react';
import { useHover } from '../../hooks/useHover';
import styles from './card.module.css';
import { Button } from '../button/Button';
import { Gif } from '../../api/giphy';

type CardProps = Gif & {
    totalMargin: number;
    rowSpan: number;
    remove: (id: string) => void;
}

const copyToClipboard = async (text: string) => {
    try {
        await navigator.clipboard.writeText(text);
    } catch (e) {
        console.log(e);
        alert('Clipboard access not available please update your browser to use this feature')
    }
}

export const Card: FC<CardProps> = ({ images: { fixed_width, fixed_width_still, original }, rowSpan, totalMargin, remove, id, url }) => {
    let [ref, hover] = useHover<HTMLImageElement>();
    const image = hover ? fixed_width : fixed_width_still;
    const height = parseInt(image.height)
    const span = Math.ceil(height / rowSpan);
    return (
        <div
            className={styles.container}
            ref={ref}
            style={{
                gridRowEnd: `span ${span}`,
                marginBottom: totalMargin
            }}
        >
            <img
                className={styles.image}
                src={image.url}
            />
            {
                hover ?
                    <div
                        className={styles.overlay}
                    >
                        <Button
                            className={styles.button}
                            onClick={() => copyToClipboard(url)}
                            color="#F8B195"
                        >
                            Copy
                        </Button>
                        <Button
                            color="#F8B195"
                            onClick={() => remove(id)}
                        >
                            Remove
                        </Button>
                    </div>
                    :
                    null
            }
        </div>
    )
}