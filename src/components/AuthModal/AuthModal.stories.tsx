/* eslint-disable import/no-extraneous-dependencies */
import { Story, Meta } from '@storybook/react';
// eslint-disable-next-line import/no-unresolved

import AuthModal, { AuthModalProps } from './index';

export default {
  title: 'Headshare/AuthModal',
  component: AuthModal,
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

const Template: Story<AuthModalProps> = args => (
  <AuthModal {...args}>
    <h2>Conteúdo teste</h2>
    <p style={{ marginTop: '10px' }}>Bla bla bla</p>
  </AuthModal>
);

export const Primary = Template.bind({});
Primary.args = {
  isOpen: true,
};
