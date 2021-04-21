import NextImage from 'next/image';
import { useMemo } from 'react';
import {
  PaymentCardHolder,
  PaymentCardNumber,
  PaymentMethodAction,
  PaymentMethodCardContainer,
  PaymentMethodDetails,
} from './PaymentMethodCard';
import { getBrandImage } from '../../utils/getBrandImage';

export interface PaymentMethodCardProps {
  id: string;
  type: 'confirmation' | 'list';
  active?: boolean;
  brand: string;
  firstDigits: string;
  lastDigits: string;
  cardHolder: string;
  getPaymentState?: (newState: 'new' | 'main' | 'select') => void;
  getNewMainCard?: (newCardId: string) => void;
}

export function PaymentMethodCard({
  id,
  type,
  active = false,
  brand,
  firstDigits,
  lastDigits,
  cardHolder,
  getPaymentState,
  getNewMainCard,
}: PaymentMethodCardProps): JSX.Element {
  const firstDigitsFormatted = useMemo(
    () => `${firstDigits.substring(0, 4)} ${firstDigits.substring(4, 6)}`,
    [firstDigits],
  );

  return (
    <PaymentMethodCardContainer
      active={active}
      type={type}
      onClick={() => type === 'list' && getNewMainCard && getNewMainCard(id)}
    >
      <NextImage src={getBrandImage(brand)} width={32} height={32} />

      <PaymentMethodDetails>
        <PaymentCardNumber active={active}>
          {type === 'list' && <span>{firstDigitsFormatted}</span>}
          {type === 'confirmation' && <span>{brand.toUpperCase()}</span>}

          <div>
            <div />
            {type === 'list' && <div />}
            {type === 'list' && <div />}
          </div>

          <span>{lastDigits}</span>
        </PaymentCardNumber>

        <PaymentCardHolder active={active}>
          <span>{cardHolder.toUpperCase()}</span>
        </PaymentCardHolder>
      </PaymentMethodDetails>

      <PaymentMethodAction
        active={active}
        onClick={() => getPaymentState && getPaymentState('select')}
      >
        {type === 'confirmation' && <span>ALTERAR</span>}
      </PaymentMethodAction>
    </PaymentMethodCardContainer>
  );
}
