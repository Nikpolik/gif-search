import React, { HTMLAttributes, FC, DetailedHTMLProps } from 'react';
import styles from './input.module.css';

type InputProps = DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const Input: FC<InputProps> = ({ children, className, ...props }) => {
    return <input className={styles.input + ' ' + className} {...props}>{children}</input>
}