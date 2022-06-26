import React from 'react';
import Button from './Button';
import { render } from "@testing-library/react";

it('renders', () => {
    render(<Button>Hello World</Button>);
});