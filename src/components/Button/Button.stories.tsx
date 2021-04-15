/* eslint-disable import/no-extraneous-dependencies */
import { Story, Meta } from '@storybook/react';
// eslint-disable-next-line import/no-unresolved

import Button, { ButtonProps } from './index';

export default {
  title: 'Headshare/Button',
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = args => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  priority: 'primary',
  text: 'Click here',
  size: 'medium',
  stretch: false,
  isLoading: false,
};

export const Secondary = Template.bind({});
Secondary.args = {
  priority: 'secondary',
  text: 'Click here',
  size: 'medium',
  stretch: false,
  isLoading: false,
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  priority: 'tertiary',
  text: 'Click here',
  size: 'medium',
  stretch: false,
  isLoading: false,
};
