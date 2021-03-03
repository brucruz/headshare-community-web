import {
  ButtonsContainer,
  ConfirmationModalText,
  InnerContainer,
} from '../styles/components/ConfirmationModal';
import Button from './Button';
import Modal from './Modal';

interface ConfirmationModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  confirmationText: {
    title: string;
    subtitle?: string;
  };
  confirmationAction: () => void;
}

export function ConfirmationModal({
  isOpen,
  setIsOpen,
  confirmationText,
  confirmationAction,
}: ConfirmationModalProps): JSX.Element {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <InnerContainer>
        <ConfirmationModalText>
          <h3>{confirmationText.title}</h3>

          {confirmationText.subtitle && <p>{confirmationText.subtitle}</p>}
        </ConfirmationModalText>

        <ButtonsContainer>
          <Button text="Confirmar" size="small" onClick={confirmationAction} />
          <Button
            text="Cancelar"
            priority="tertiary"
            size="small"
            onClick={setIsOpen}
          />
        </ButtonsContainer>
      </InnerContainer>
    </Modal>
  );
}
