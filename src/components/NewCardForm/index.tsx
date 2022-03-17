import { useFormik } from 'formik';
import { ChangeEvent, useCallback, useState } from 'react';
import { MdCreditCard } from 'react-icons/md';
import creditCardBrands, { GENERIC } from '../../constants/creditCardBrands';
import { fetchCardBinData } from '../../services/binlist/fetchCardBinData';
import { removeFormatCardNumber } from '../../utils/removeFormatCardNumber';
import Input from '../Input';
import {
  NewCardFormContainer,
  NewCardInputGroupWrapper,
  NewCardInputWrapper,
  NewCardInputWrapperSameLine,
} from './NewCardForm';

export interface NewCardFormVariables {
  card_number: string;
  card_holder_name: string;
  card_cvv: string;
  card_expiration_date_month: string;
  card_expiration_date_year: string;
}

export function NewCardForm(): JSX.Element {
  const [cardBrand, setCardBrand] = useState(GENERIC);

  const updateUserPaymentForm = useFormik<NewCardFormVariables>({
    initialValues: {
      card_number: '',
      card_holder_name: '',
      card_cvv: '',
      card_expiration_date_month: '',
      card_expiration_date_year: '',
    },
    onSubmit: async values => {
      console.log(values);
    },
  });

  const handleCardNumberChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const cardNumber = e.target.value;

      updateUserPaymentForm.setFieldValue('card_number', cardNumber);

      if (cardNumber.length < 4) {
        setCardBrand(GENERIC);
      }

      if (cardNumber.length >= 4) {
        const { cardBin, error } = await fetchCardBinData(
          removeFormatCardNumber(cardNumber),
        );

        if (cardBin) {
          const key =
            cardBin.scheme &&
            (cardBin.scheme.toUpperCase() as keyof typeof creditCardBrands);

          if (key) {
            const brand = creditCardBrands[key];

            setCardBrand(brand);
          }

          if (!key) {
            setCardBrand(GENERIC);
          }
        }

        if (error) {
          updateUserPaymentForm.setFieldError('card_number', error);
          setCardBrand(GENERIC);
        }
      }
    },
    [updateUserPaymentForm],
  );

  return (
    <NewCardFormContainer
      id="updateUserPaymentForm"
      onSubmit={updateUserPaymentForm.handleSubmit}
    >
      <NewCardInputWrapper>
        <Input
          name="card_number"
          value={updateUserPaymentForm.values.card_number}
          onChange={handleCardNumberChange}
          label="Número"
          placeholder="1234 5678 9012 3456"
          mask="9999 9999 9999 9999"
          error={
            updateUserPaymentForm.errors.card_number
            // updateUserPaymentForm.touched.card_number &&
          }
          creditCardBrand={cardBrand}
        />
      </NewCardInputWrapper>

      <NewCardInputWrapper>
        <Input
          name="card_holder_name"
          value={updateUserPaymentForm.values.card_holder_name}
          onChange={e =>
            updateUserPaymentForm.setFieldValue(
              'card_holder_name',
              e.target.value,
            )
          }
          label="Nome impresso"
          placeholder="Fulano de Tal"
        />
      </NewCardInputWrapper>

      <NewCardInputGroupWrapper>
        <p>Validade:</p>

        <NewCardInputWrapperSameLine>
          <Input
            name="card_expiration_date_month"
            value={updateUserPaymentForm.values.card_expiration_date_month}
            onChange={e =>
              updateUserPaymentForm.setFieldValue(
                'card_expiration_date_month',
                e.target.value,
              )
            }
            label="Mês"
            placeholder="11"
            mask="99"
          />

          <Input
            name="card_expiration_date_year"
            value={updateUserPaymentForm.values.card_expiration_date_year}
            onChange={e =>
              updateUserPaymentForm.setFieldValue(
                'card_expiration_date_year',
                e.target.value,
              )
            }
            label="Ano"
            placeholder="2030"
            mask="9999"
          />
        </NewCardInputWrapperSameLine>
      </NewCardInputGroupWrapper>

      <NewCardInputWrapperSameLine>
        <Input
          name="card_cvv"
          value={updateUserPaymentForm.values.card_cvv}
          onChange={e =>
            updateUserPaymentForm.setFieldValue('card_cvv', e.target.value)
          }
          label="CVV"
          placeholder="123"
          mask="999"
        />

        <div>
          <MdCreditCard />
        </div>
      </NewCardInputWrapperSameLine>
    </NewCardFormContainer>
  );
}
