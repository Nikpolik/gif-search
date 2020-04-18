import React, { FC } from 'react';
import styles from './spinner.module.css';
import spinner from '../../assets/spinner.png';

export const Spinner: FC<{ className?: string }> = ({ className }) => {
    return <img className={styles.spinner + " " + className} src={spinner} />
}