/* eslint-disable import/no-extraneous-dependencies */
import { Story, Meta } from '@storybook/react';
// eslint-disable-next-line import/no-unresolved

import { PaymentModal, PaymentModalProps } from './index';

export default {
  title: 'Headshare/Membership/Payment Modal',
  component: PaymentModal,
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

const Template: Story<PaymentModalProps> = args => (
  <PaymentModal {...args}>
    <h2>Conteúdo teste</h2>
    <p style={{ marginTop: '10px' }}>Bla bla bla</p>
  </PaymentModal>
);

export const Primary = Template.bind({});
Primary.args = {
  isOpen: true,
  nextStep: () => '',
};
