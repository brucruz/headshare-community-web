/* eslint-disable import/no-extraneous-dependencies */
import { Story, Meta } from '@storybook/react';
import { MediaFormat } from '../../generated/graphql';
// eslint-disable-next-line import/no-unresolved

import { Media, MediaProps } from './index';

export default {
  title: 'Headshare/Media',
  component: Media,
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

const Template: Story<MediaProps> = args => <Media {...args} />;

export const Image = Template.bind({});
Image.args = {
  mediaUrl:
    'https://headshare.s3.amazonaws.com/nihongo/images/20210322-l457u-img-0511.jpg,.jpg',
  format: MediaFormat.Image,
  height: 240,
  width: 520,
};

export const Video = Template.bind({});
Video.args = {
  mediaUrl: 'https://vimeo.com/500284451',
  format: MediaFormat.Video,
  height: 240,
  width: 520,
};
