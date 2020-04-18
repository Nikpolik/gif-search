import React, { FC, CSSProperties, RefObject } from 'react';
import styles from './grid.module.css';

export type GridProps = {
    rowSpan: number;
    itemWidth: number;
    columnGap: number;
    className?: string;
    addonAfter?: JSX.Element | null;
    ref?: RefObject<HTMLDivElement>
}

export const Grid: FC<GridProps> = ({ children, rowSpan, columnGap, itemWidth, className, addonAfter, ref }) => {
    const gridStyle: CSSProperties = {
        columnGap,
        gridTemplateColumns: `repeat(auto-fit, ${itemWidth}px)`,
        gridAutoRows: rowSpan
    }
    return (
        <div ref={ref} className={styles.grid + ' ' + className} style={gridStyle}>
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