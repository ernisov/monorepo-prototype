import React from 'react';

export type ButtonProps = {
    children: React.ReactNode;
};

const Button = ({ children }: ButtonProps) => {
    return <button>{children}</button>;
};

export default Button;
