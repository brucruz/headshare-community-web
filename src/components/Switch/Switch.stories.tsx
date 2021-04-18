/* eslint-disable import/no-extraneous-dependencies */
import { Story, Meta } from '@storybook/react';
// eslint-disable-next-line import/no-unresolved

import Switch, { SwitchProps } from './index';

export default {
  title: 'Headshare/Basic Components/Switch',
  component: Switch,
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

const Template: Story<SwitchProps> = args => <Switch {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  id: 'test',
  isOn: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  id: 'test',
  isOn: false,
};
