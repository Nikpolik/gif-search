import React, { FC, HTMLAttributes, DetailedHTMLProps } from 'react';
import styles from './button.module.css';

type ButtonProps = DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    color?: string;
};

export const Button: FC<ButtonProps> = ({ color = '', children, className, style, ...props }) => {
    let defaultStyle = {
        backgroundColor: color
    }
    return <button {...props} style={{ ...defaultStyle, ...style }} className={styles.button + ' ' + className}>{children}</button>
}
