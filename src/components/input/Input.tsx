import React, { FC, DetailedHTMLProps, InputHTMLAttributes } from 'react';
import styles from './input.module.css';

type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const Input: FC<InputProps> = ({ children, className, ...props }) => {
    return <input className={styles.input + ' ' + className} {...props}>{children}</input>
}