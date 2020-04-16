import React, { FC } from 'react';
import { useHover } from '../../hooks/useHover';
import styles from './card.module.css';
import { Button } from '../button/Button';
import { Images } from '../../api/giphy';

type CardProps = Images

const copyToClipboard = async (text: string) => {
    try {
        await navigator.clipboard.writeText(text);
    } catch (e) {
        console.log(e);
    }
}

export const Card: FC<CardProps> = ({ fixed_width, fixed_width_still, original }) => {
    let [ref, hover] = useHover<HTMLImageElement>();
    const span = Math.ceil(parseInt(fixed_width.height) / 40);
    return (
        <div
            className={styles.container}
            ref={ref}
            style={{ gridRowEnd: `span ${span}` }}
        >
            <img
                className={styles.image}
                src={hover ? fixed_width.url : fixed_width_still.url}
            />
            {
                hover ?
                    <div className={styles.overlay}>
                        <Button
                            className={styles.button}
                            onClick={() => copyToClipboard(original.url)}
                            color="grey"
                        >
                            Copy
                        </Button>
                        <Button color="grey">Remove</Button>
                    </div>
                    :
                    null
            }
        </div>
    )
}