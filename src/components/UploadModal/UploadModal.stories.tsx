/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable import/no-extraneous-dependencies */
import { Story, Meta } from '@storybook/react';

import UploadModal, { UploadModalProps } from './index';

export default {
  title: 'Headshare/UploadModal',
  component: UploadModal,
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

const Template: Story<UploadModalProps> = args => <UploadModal {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  communitySlug: 'Teste',
  postId: 'Teste',
  displayUploadModal: true,
  // setDisplayUploadModal: (args: boolean) => void,
  // setMainMediaState: (args: 'empty' | 'uploading' | 'ready') => void,
  passUploadInfo: () => {},
};
