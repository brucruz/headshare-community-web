/* eslint-disable import/no-extraneous-dependencies */
import { Story, Meta } from '@storybook/react';
// eslint-disable-next-line import/no-unresolved

import { FeaturesModal, FeaturesModalProps } from './index';

export default {
  title: 'Headshare/Membership/FeaturesModal',
  component: FeaturesModal,
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

const Template: Story<FeaturesModalProps> = args => <FeaturesModal {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
