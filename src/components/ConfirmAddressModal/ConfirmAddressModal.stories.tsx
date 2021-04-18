/* eslint-disable import/no-extraneous-dependencies */
import { Story, Meta } from '@storybook/react';
// eslint-disable-next-line import/no-unresolved

import { ConfirmAddressModal, ConfirmAddressModalProps } from './index';

export default {
  title: 'Headshare/Membership/Confirm Address Modal',
  component: ConfirmAddressModal,
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

const Template: Story<ConfirmAddressModalProps> = args => (
  <ConfirmAddressModal {...args}>
    <h2>Conteúdo teste</h2>
    <p style={{ marginTop: '10px' }}>Bla bla bla</p>
  </ConfirmAddressModal>
);

export const Primary = Template.bind({});
Primary.args = {
  isOpen: true,
  nextStep: () => '',
};
