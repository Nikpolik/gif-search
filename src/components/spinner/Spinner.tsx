import React from 'react';
import styles from './spinner.module.css';
import spinner from '../../assets/spinner.png';

export const Spinner = () => {
    return <img className={styles.spinner} src={spinner} />
}