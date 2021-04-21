/* eslint-disable import/no-extraneous-dependencies */
import { Story, Meta } from '@storybook/react';
// eslint-disable-next-line import/no-unresolved

import { StatusConfirmationModal, StatusConfirmationModalProps } from './index';

export default {
  title: 'Headshare/Membership/Status Confirmation Modal',
  component: StatusConfirmationModal,
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

const Template: Story<StatusConfirmationModalProps> = args => (
  <StatusConfirmationModal {...args}>
    <h2>Conteúdo teste</h2>
    <p style={{ marginTop: '10px' }}>Bla bla bla</p>
  </StatusConfirmationModal>
);

export const Primary = Template.bind({});
Primary.args = {
  isOpen: true,
  nextStep: () => '',
  success: true,
  message: {
    title: 'Pagamento agendado!',
    text: `A partir de agora você é um membro da comunidade Nihongo Plus

    Fique à vontade para explorar todos os recursos disponíveis na comunidade
    
    Seu próximo pagamento foi agendado para daqui a 7 dias`,
  },
};
