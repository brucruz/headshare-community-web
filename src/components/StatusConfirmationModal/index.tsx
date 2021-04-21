import Modal from '../Modal';
import {
  StatusConfirmationText,
  StatusConfirmationTitle,
  StatusSmiley,
} from './StatusConfirmationModal';

export interface StatusConfirmationModalProps {
  success?: boolean;
  message: { title: string; text: string };
  nextStep: () => void;
  previousStep: () => void;
  isOpen: boolean;
}

export function StatusConfirmationModal({
  success = true,
  message,
  nextStep,
  previousStep,
  isOpen,
}: StatusConfirmationModalProps): JSX.Element {
  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={() => false}
      previousStep={previousStep}
      closeButton
    >
      <StatusSmiley>{success === true ? ';D' : ':('}</StatusSmiley>

      <StatusConfirmationTitle>{message.title}</StatusConfirmationTitle>

      <StatusConfirmationText>{message.text}</StatusConfirmationText>
    </Modal>
  );
}
