import React from 'react';
import Button from './Button';
import { render, screen } from "@testing-library/react";
import {userEvent} from "@storybook/testing-library";

it('renders', () => {
    render(<Button>Hello World</Button>);
});

it('clicks', () => {
    const func = jest.fn();
     render(<Button onClick={func}>Button</Button>);
    userEvent.click(screen.getByText('Button'));
    expect(func).toBeCalled();
});