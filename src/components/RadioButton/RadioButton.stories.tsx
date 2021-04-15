/* eslint-disable import/no-extraneous-dependencies */
import { Story, Meta } from '@storybook/react';
// eslint-disable-next-line import/no-unresolved

import { RadioButton, RadioButtonProps } from './index';

export default {
  title: 'Headshare/Membership/RadioButton',
  component: RadioButton,
  parameters: {
    backgrounds: {
      default: 'page-background',
      values: [
        { name: 'page-background', value: '#FAFAFA' },
        { name: 'white', value: '#fff' },
      ],
    },
  },
} as Meta;

const Template: Story<RadioButtonProps> = args => <RadioButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Test',
  name: 'test',
  value: 'test',
  selected: true,
};

export const Unchecked = Template.bind({});
Unchecked.args = {
  label: 'Test',
  name: 'test',
  value: 'test',
  selected: false,
};
