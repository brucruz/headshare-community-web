/* eslint-disable import/no-extraneous-dependencies */
import { Story, Meta } from '@storybook/react';
import Modal from '../Modal';
// eslint-disable-next-line import/no-unresolved

import { MultiStepModal, MultiStepModalProps } from './index';

export default {
  title: 'Headshare/Basic Components/Multi-Step Modal',
  component: MultiStepModal,
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

const Template: Story<MultiStepModalProps> = args => (
  <MultiStepModal {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  isShown: true,
  modals: [
    ({ style, nextStep, previousStep, applyOverlay, setIsOpen }) => (
      <Modal
        style={style}
        closeButton
        applyOverlay={applyOverlay}
        isOpen
        setIsOpen={setIsOpen}
        defaultContent={{
          title: 'Teste #1',
          subtitle: 'Este é um modal de teste',
        }}
        nextStep={nextStep}
        previousStep={previousStep}
      />
    ),
    ({ style, nextStep, previousStep, applyOverlay, setIsOpen }) => (
      <Modal
        style={style}
        closeButton
        applyOverlay={applyOverlay}
        isOpen
        setIsOpen={setIsOpen}
        defaultContent={{
          title: 'Teste #2',
          subtitle: 'Este é um modal de teste',
          // mainButton: {
          //   text: 'Next',
          //   stretch: true,
          //   onClick: nextStep,
          // },
        }}
        nextStep={nextStep}
        previousStep={previousStep}
      />
    ),
  ],
};
