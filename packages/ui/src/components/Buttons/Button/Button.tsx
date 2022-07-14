import React from 'react';
import styles from './Button.module.css';

export type ButtonProps = {
    children: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const Button = ({ children, onClick }: ButtonProps) => {
    return <button className={styles.button} onClick={onClick}>{children}</button>;
};

export default Button;
