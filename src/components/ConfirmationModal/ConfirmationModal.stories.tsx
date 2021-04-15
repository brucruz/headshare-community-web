/* eslint-disable import/no-extraneous-dependencies */
import { Story, Meta } from '@storybook/react';
// eslint-disable-next-line import/no-unresolved

import { ConfirmationModal, ConfirmationModalProps } from './index';

export default {
  title: 'Headshare/ConfirmationModal',
  component: ConfirmationModal,
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

const Template: Story<ConfirmationModalProps> = args => (
  <ConfirmationModal {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  isOpen: true,
  confirmationText: {
    title: 'Tem certeza?',
    subtitle: 'Ao aceitar, você não poderá alterar sua opção',
  },
};
