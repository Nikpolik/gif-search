import React, { FC, CSSProperties } from 'react';
import styles from './grid.module.css';

export type GridProps = {
    rowSpan: number;
    itemWidth: number;
    columnGap: number;
    className?: string;
    addonAfter?: JSX.Element | null
}

export const Grid: FC<GridProps> = ({ children, rowSpan, columnGap, itemWidth, className, addonAfter }) => {
    const gridStyle: CSSProperties = {
        columnGap,
        gridTemplateColumns: `repeat(auto-fit, ${itemWidth}px)`,
        gridAutoRows: rowSpan
    }
    return (
        <div className={styles.grid + ' ' + className} style={gridStyle}>
            {children}
            {
                addonAfter ?
                    <div className={styles.lastRow}>
                        {addonAfter}
                    </div>
                    :
                    null
            }
        </div>
    )
}