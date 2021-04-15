/* eslint-disable import/no-extraneous-dependencies */
import { Story, Meta } from '@storybook/react';
// eslint-disable-next-line import/no-unresolved

import Modal, { ModalProps } from './index';

export default {
  title: 'Headshare/Modal',
  component: Modal,
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

const Template: Story<ModalProps> = args => (
  <Modal {...args}>
    <h2>Conteúdo teste</h2>
    <p style={{ marginTop: '10px' }}>Bla bla bla</p>
  </Modal>
);

export const Primary = Template.bind({});
Primary.args = {
  isOpen: true,
  closeButton: true,
};
