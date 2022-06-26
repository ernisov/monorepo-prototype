import React from 'react';
import styles from './Button.module.css';

export type ButtonProps = {
    children: React.ReactNode;
};

const Button = ({ children }: ButtonProps) => {
    return <button className={styles.button}>{children}</button>;
};

export default Button;