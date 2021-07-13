import { HTMLAttributes, useMemo } from 'react';
import { MdClose } from 'react-icons/md';
import {
  ModalContainer,
  ModalMainButton,
  ModalOverlay,
  ModalSubitle,
  ModalTitle,
} from './Modal';
import Button, { ButtonProps } from '../Button';

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  setIsOpen: () => void;
  closeButton?: boolean;
  applyOverlay?: boolean;
  defaultContent?: {
    title: string;
    subtitle?: string;
    mainButton?: ButtonProps;
  };
  nextStep?: () => void;
  previousStep?: () => void;
  'data-testid'?: string;
}

export default function Modal({
  children,
  isOpen,
  setIsOpen,
  closeButton = false,
  applyOverlay = true,
  defaultContent,
  style,
  nextStep,
}: // previousStep,
ModalProps): JSX.Element {
  const buttonConfig = useMemo((): ButtonProps | undefined => {
    if (nextStep) {
      let buttonProps = {} as ButtonProps;

      if (defaultContent?.mainButton) {
        buttonProps = defaultContent.mainButton;
      }

      const { text, stretch, size, priority, ...rest } = buttonProps;

      return {
        text: text || 'Prosseguir',
        stretch: stretch || true,
        size: size || 'medium',
        priority: priority || 'primary',
        onClick: nextStep,
        // disabled: disabled || false,
        ...rest,
      };
    }

    return defaultContent?.mainButton;
  }, [defaultContent?.mainButton, nextStep]);

  return (
    <div data-testid="modal">
      {isOpen && applyOverlay && (
        <ModalOverlay data-testid="modal-overlay" onClick={setIsOpen} />
      )}

      {isOpen && (
        <ModalContainer data-testid="modal-container" style={style}>
          {closeButton && (
            <section
              style={{
                marginBottom: '5px',
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <button type="button">
                <MdClose
                  onClick={setIsOpen}
                  style={{
                    height: '24px',
                    width: '24px',
                    color: '#363636',
                  }}
                />
              </button>
            </section>
          )}

          {defaultContent?.title && (
            <ModalTitle>{defaultContent.title}</ModalTitle>
          )}

          {defaultContent?.subtitle && (
            <ModalSubitle>{defaultContent.subtitle}</ModalSubitle>
          )}

          {children}

          {buttonConfig && (
            <ModalMainButton>
              <Button {...buttonConfig} />
            </ModalMainButton>
          )}
        </ModalContainer>
      )}
    </div>
  );
}
