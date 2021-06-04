/* eslint-disable import/no-extraneous-dependencies */
import { Story, Meta } from '@storybook/react';
// eslint-disable-next-line import/no-unresolved

import { PostCover, PostCoverProps } from './index';

export default {
  title: 'Headshare/PostCover',
  component: PostCover,
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

const Template: Story<PostCoverProps> = args => (
  <PostCover {...args}>
    <h2>Conteúdo teste</h2>
    <p style={{ marginTop: '10px' }}>Bla bla bla</p>
  </PostCover>
);

export const Empty = Template.bind({});
Empty.args = {
  communitySlug: 'nihongo',
  postId: '605915cc2d8e6876f4a0aec1',
};

export const Ready = Template.bind({});
Ready.args = {
  communitySlug: 'nihongo',
  postId: '5ffe663c5bde63994a61b3fd',
};
