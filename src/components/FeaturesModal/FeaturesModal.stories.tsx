/* eslint-disable import/no-extraneous-dependencies */
import { Story, Meta } from '@storybook/react';
// eslint-disable-next-line import/no-unresolved

import { FeaturesModal, FeaturesModalProps } from './index';

export default {
  title: 'Headshare/Membership/FeaturesModal',
  component: FeaturesModal,
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

const Template: Story<FeaturesModalProps> = args => <FeaturesModal {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  communityTitle: 'Nihongo Plus',
  communityMainPlans: [
    {
      period: 'monthly',
      value: 4990,
      valueLabel: 'R$ 49,90 / mês',
    },
    {
      period: 'annually',
      value: 49900,
      valueLabel: 'R$ 499 / ano',
    },
  ],
  communityFeatures: [
    {
      description: 'Novas aulas sendo adicionadas toda semana',
      included: true,
    },
    {
      description:
        'Seja notificado por email quando novas aulas exclusivas para membros forem publicadas',
      included: true,
    },
    {
      description:
        'Participe de discussões exclusivas com os membros da comunidade',
      included: true,
    },
    {
      description: 'Receba descontos em novos cursos do Nihongo Plus',
      included: true,
    },
    {
      description:
        'Mantenha contato direto com os criadores da comunidade Nihongo Plus',
      included: true,
    },
    {
      description: 'Espaço para você definir outras vantagens que preferir',
      included: false,
    },
  ],
  isOpen: true,
};
