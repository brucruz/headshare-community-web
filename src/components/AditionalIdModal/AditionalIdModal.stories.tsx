/* eslint-disable import/no-extraneous-dependencies */
import { Story, Meta } from '@storybook/react';
// eslint-disable-next-line import/no-unresolved

import { AditionalIdModal, AditionalIdModalProps } from './index';

export default {
  title: 'Headshare/Membership/Aditional Id Modal',
  component: AditionalIdModal,
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

const Template: Story<AditionalIdModalProps> = args => (
  <AditionalIdModal {...args}>
    <h2>Conteúdo teste</h2>
    <p style={{ marginTop: '10px' }}>Bla bla bla</p>
  </AditionalIdModal>
);

export const Primary = Template.bind({});
Primary.args = {
  isOpen: true,
  nextStep: () => '',
};
