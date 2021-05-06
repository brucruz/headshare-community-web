/* eslint-disable import/no-extraneous-dependencies */
import { Story, Meta } from '@storybook/react';
// eslint-disable-next-line import/no-unresolved

import CommentButton, { CommentButtonProps } from './index';

export default {
  title: 'Headshare/CommentButton',
  component: CommentButton,
} as Meta;

const Template: Story<CommentButtonProps> = args => <CommentButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  comments: 10,
};
