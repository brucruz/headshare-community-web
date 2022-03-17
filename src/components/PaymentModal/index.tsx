import { useCallback, useEffect, useMemo, useState } from 'react';
import Modal from '../Modal';

import { NewCardForm } from '../NewCardForm';
import { useUserCardsQuery, Card } from '../../generated/graphql';
import { useAuth } from '../../hooks/useAuth';
import { LoadingAnimation } from '../LoadingAnimation';
import { PaymentMethodCard } from '../PaymentMethodCard';
import { ButtonProps } from '../Button';

export interface PaymentModalProps {
  nextStep: () => void;
  previousStep: () => void;
  isOpen: boolean;
}

const testCards: Pick<
  Card,
  | 'pagarmeId'
  | 'brand'
  | 'holderName'
  | 'firstDigits'
  | 'lastDigits'
  | 'valid'
  | 'isMain'
>[] = [
  {
    brand: 'mastercard',
    firstDigits: '543210',
    holderName: 'Bruno Gomes da Cruz',
    lastDigits: '1234',
    pagarmeId: '684098',
    valid: true,
    isMain: true,
  },
  {
    brand: 'visa',
    firstDigits: '456120',
    holderName: 'Bruno Cruz',
    lastDigits: '7418',
    pagarmeId: '78090709',
    valid: true,
    isMain: false,
  },
  {
    brand: 'amex',
    firstDigits: '789023',
    holderName: 'Amanda Ragusa',
    lastDigits: '1695',
    pagarmeId: '09840984',
    valid: true,
    isMain: false,
  },
  {
    brand: 'discover',
    firstDigits: '552233',
    holderName: 'Bruno Cruz',
    lastDigits: '6802',
    pagarmeId: '9807974',
    valid: true,
    isMain: false,
  },
  {
    brand: 'hipercard',
    firstDigits: '112233',
    holderName: 'Bruno Gomes',
    lastDigits: '0984',
    pagarmeId: '60938749',
    valid: true,
    isMain: false,
  },
];

export function PaymentModal({
  isOpen,
  previousStep,
}: PaymentModalProps): JSX.Element {
  const [cards, setCards] = useState<
    Pick<
      Card,
      | 'pagarmeId'
      | 'brand'
      | 'holderName'
      | 'firstDigits'
      | 'lastDigits'
      | 'valid'
      | 'isMain'
    >[]
  >(testCards);
  const [paymentState, setPaymentState] = useState<
    'new' | 'main' | 'select' | undefined
  >();

  const { me } = useAuth();

  const { data, error, loading } = useUserCardsQuery({
    variables: {
      limit: 10,
      userId: me?._id,
    },
  });

  useEffect(() => {
    if (data?.cards.cards) {
      setCards(data?.cards.cards);
    }
  }, [data?.cards.cards]);

  useEffect(() => {
    if (!loading && cards && cards.length === 0) {
      setPaymentState('new');
    }

    if (!loading && cards && cards.length > 0) {
      setPaymentState('main');
    }
  }, [cards, loading]);

  const mainCard = useMemo(() => cards.find(card => card.isMain === true), [
    cards,
  ]);

  const handleDefineNewMainCard = useCallback(
    (id: string) => {
      const newCards = cards.map(card => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { isMain, ...rest } = card;
        return card.pagarmeId === id
          ? { isMain: true, ...rest }
          : { isMain: false, ...rest };
      });

      setCards(newCards);
    },
    [cards],
  );

  const ModalTitleSubtitleButton = useMemo((): {
    title: string;
    subtitle?: string;
    mainButton?: ButtonProps;
  } => {
    switch (paymentState) {
      case 'new':
        return {
          title: 'Informe os dados do seu cartão de crédito',
          mainButton: {
            text: 'Confirmar assinatura',
            type: 'submit',
            form: 'updateUserPaymentForm',
            stretch: true,
          },
        };

      case 'select':
        return {
          title: 'Selecione a forma de pagamento',
          mainButton: {
            text: 'Adicionar novo cartão',
            priority: 'secondary',
            stretch: true,
            onClick: () => setPaymentState('new'),
          },
        };

      default:
        return {
          title: 'Confirme os dados do seu cartão de crédito',
          subtitle:
            'Fique tranquilo: você não será cobrado se cancelar antes do período gratuito terminar',
          mainButton: {
            text: 'Confirmar assinatura',
            type: 'submit',
            form: 'updateUserPaymentForm',
            stretch: true,
          },
        };
    }
  }, [paymentState]);

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={() => false}
      previousStep={previousStep}
      closeButton
      defaultContent={{
        ...ModalTitleSubtitleButton,
      }}
    >
      {loading && <LoadingAnimation application="screen" />}

      {paymentState === 'new' && <NewCardForm />}

      {paymentState === 'main' && mainCard && (
        <PaymentMethodCard
          id={mainCard.pagarmeId}
          type="confirmation"
          brand={mainCard.brand}
          cardHolder={mainCard.holderName}
          firstDigits={mainCard.firstDigits}
          lastDigits={mainCard.lastDigits}
          getPaymentState={() => setPaymentState('select')}
        />
      )}

      {paymentState === 'select' && (
        <ul>
          {cards.map(card => (
            <PaymentMethodCard
              key={card.pagarmeId}
              id={card.pagarmeId}
              type="list"
              brand={card.brand}
              cardHolder={card.holderName}
              firstDigits={card.firstDigits}
              lastDigits={card.lastDigits}
              active={card.isMain || false}
              getNewMainCard={id => handleDefineNewMainCard(id)}
            />
          ))}
        </ul>
      )}

      {paymentState === 'main'}
    </Modal>
  );
}
