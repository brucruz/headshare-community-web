import { HTMLAttributes, ReactElement } from 'react';
import ReactModal from 'react-modal';

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  setIsOpen: () => void;
}

const Modal = ({ children, isOpen, setIsOpen }: ModalProps): ReactElement => (
  <ReactModal
    isOpen={isOpen}
    onRequestClose={setIsOpen}
    style={{
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        padding: '0px',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        background: 'var(--page-background)',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        display: 'flex',
        flexDirection: 'column',
        color: 'var(--gray-text)',
        borderRadius: '8px',
        maxWidth: '600px',
        width: '90%',
        border: 'none',
      },
      overlay: {
        backgroundColor: 'rgba(0,0,0, 0.25)',
        zIndex: 999,
      },
    }}
  >
    {children}
  </ReactModal>
);

export default Modal;
