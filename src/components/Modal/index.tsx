import { HTMLAttributes, ReactElement } from 'react';
import { MdClose } from 'react-icons/md';
import ReactModal from 'react-modal';

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  setIsOpen: () => void;
  closeButton?: boolean;
}

const Modal = ({
  children,
  isOpen,
  setIsOpen,
  closeButton = false,
}: ModalProps): ReactElement => (
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
        minWidth: '100px',
        maxWidth: '600px',
        minHeight: '100px',
        width: '90%',
        border: 'none',
        paddingTop: '15px',
        paddingRight: '20px',
        paddingLeft: '20px',
        paddingBottom: '50px',
      },
      overlay: {
        backgroundColor: 'rgba(0,0,0, 0.25)',
        zIndex: 999,
      },
    }}
  >
    {closeButton && (
      <section>
        <button
          style={{
            marginBottom: '5px',
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
          type="button"
          onClick={setIsOpen}
        >
          <MdClose
            style={{
              height: '24px',
              width: '24px',
              color: '#363636',
            }}
          />
        </button>
      </section>
    )}

    {children}
  </ReactModal>
);

export default Modal;
