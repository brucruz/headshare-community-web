/* eslint-disable import/no-extraneous-dependencies */
import { Story, Meta } from '@storybook/react';
// eslint-disable-next-line import/no-unresolved

import { RadioInput, RadioInputProps } from './index';

export default {
  title: 'Headshare/RadioInput',
  component: RadioInput,
} as Meta;

const Template: Story<RadioInputProps> = args => <RadioInput {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Teste',
  name: 'test',
  isChecked: true,
  value: 'test',
  // description: 'Descrição',
};

export const Unchecked = Template.bind({});
Unchecked.args = {
  label: 'Teste',
  name: 'test',
  isChecked: false,
  value: 'test',
  // description: 'Descrição',
};

export const CheckedDescription = Template.bind({});
CheckedDescription.parameters = {
  fileName: 'Checked with Description',
};
CheckedDescription.args = {
  label: 'Teste',
  name: 'test',
  isChecked: true,
  value: 'test',
  description: 'Descrição',
};

export const UncheckedDescription = Template.bind({});
UncheckedDescription.parameters = {
  fileName: 'Unchecked with Description',
};
UncheckedDescription.args = {
  label: 'Teste',
  name: 'test',
  isChecked: false,
  value: 'test',
  description: 'Descrição',
};
