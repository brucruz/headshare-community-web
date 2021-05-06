/* eslint-disable import/no-extraneous-dependencies */
import { Story, Meta } from '@storybook/react';
// eslint-disable-next-line import/no-unresolved

import { ExplainedInput, ExplainedInputProps } from './index';

export default {
  title: 'Headshare/Explained Input',
  component: ExplainedInput,
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

const Template: Story<ExplainedInputProps> = args => (
  <ExplainedInput {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  explanation: {
    title: 'Test',
  },
};
