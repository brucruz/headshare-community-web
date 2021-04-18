import { useCallback, useState } from 'react';
import { useTransition } from 'react-spring';
import { ModalOverlay } from '../../styles/components/Modal';
import { ModalProps } from '../Modal';

export interface MultiStepModalProps {
  isShown: boolean;
  hide: () => void;
  // eslint-disable-next-line no-empty-pattern
  modals: (({}: ModalProps) => JSX.Element)[];
  nextStep: () => void;
}

export function MultiStepModal({
  isShown,
  hide,
  modals,
}: MultiStepModalProps): JSX.Element {
  const [modalIndex, setModalIndex] = useState(0);

  const handleNext = useCallback(() => {
    setModalIndex(state => (state + 1) % modals.length);
  }, [modals]);
  const handlePrevious = useCallback(() => {
    setModalIndex(state => (state - 1) % modals.length);
  }, [modals]);

  const multiStepModalsTransition = useTransition(modalIndex, null, {
    from: {
      left: '100%',
      marginRight: '0%',
      opacity: 0,
    },
    enter: {
      left: '50%',
      marginRight: '-50%',
      opacity: 1,
    },
    leave: {
      left: '0px',
      marginRight: '100%',
      opacity: 0,
    },
  });

  return (
    <>
      {isShown && <ModalOverlay />}

      {multiStepModalsTransition.map(({ item, key, props }) => {
        const Modal = modals[item];
        return (
          <>
            {isShown && (
              <Modal
                key={key}
                style={props}
                isOpen={isShown}
                setIsOpen={hide}
                nextStep={handleNext}
                previousStep={handlePrevious}
                applyOverlay={false}
              >
                {item}
              </Modal>
            )}
          </>
        );
      })}
    </>
  );
}
