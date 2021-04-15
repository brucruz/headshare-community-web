/* eslint-disable import/no-extraneous-dependencies */
import { Story, Meta } from '@storybook/react';
// eslint-disable-next-line import/no-unresolved

import { RadioButtonGroup, RadioButtonGroupProps } from './index';

export default {
  title: 'Headshare/Membership/RadioButtonGroup',
  component: RadioButtonGroup,
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

const Template: Story<RadioButtonGroupProps> = args => (
  <RadioButtonGroup {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  elements: [
    {
      index: 0,
      length: 2,
      label: 'R$ 49,90 / mês',
      name: 'month',
      value: 'R$ 49,90 / mês',
      selected: 'month',
    },
    {
      index: 1,
      length: 2,
      label: 'R$ 499 / ano',
      name: 'annual',
      value: 'R$ 499 / ano',
      selected: 'month',
    },
  ],
};

export const Stretched = Template.bind({});
Stretched.args = {
  elements: [
    {
      index: 0,
      length: 2,
      label: 'R$ 49,90 / mês',
      name: 'month',
      value: 'R$ 49,90 / mês',
      selected: 'month',
      stretch: true,
    },
    {
      index: 1,
      length: 2,
      label: 'R$ 499 / ano',
      name: 'annual',
      value: 'R$ 499 / ano',
      selected: 'month',
      stretch: true,
    },
  ],
};
