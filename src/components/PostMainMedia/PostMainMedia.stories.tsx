/* eslint-disable import/no-extraneous-dependencies */
import { Story, Meta } from '@storybook/react';
// eslint-disable-next-line import/no-unresolved

import { PostMainMedia, PostMainMediaProps } from './index';

export default {
  title: 'Headshare/PostMainMedia',
  component: PostMainMedia,
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

const Template: Story<PostMainMediaProps> = args => (
  <PostMainMedia {...args}>
    <h2>Conteúdo teste</h2>
    <p style={{ marginTop: '10px' }}>Bla bla bla</p>
  </PostMainMedia>
);

export const Primary = Template.bind({});
Primary.args = {
  communitySlug: 'nihongo',
  postId: '5ffe663c5bde63994a61b3fd',
};
