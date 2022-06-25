import React from 'react';
import Button from './Button';
import {ComponentMeta, ComponentStory} from "@storybook/react";

export default {
    title: 'Buttons/Button',
    component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args}  children={args.children}/>;

export const Default = Template.bind({});
Default.args = {
    children: 'Hello',
};