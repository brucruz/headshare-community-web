import { ChangeEvent, useCallback, useState } from 'react';
import { useFormik } from 'formik';

import { MdCreditCard } from 'react-icons/md';
import Input from '../Input';
import Modal from '../Modal';
import {
  PaymentForm,
  PaymentInputWrapper,
  PaymentInputWrapperSameLine,
  PaymentInputGroupWrapper,
} from './PaymentModal';
import { fetchCardBinData } from '../../services/binlist/fetchCardBinData';
import { removeFormatCardNumber } from '../../utils/removeFormatCardNumber';
import creditCardBrands, { GENERIC } from '../../constants/creditCardBrands';

export interface PaymentModalProps {
  nextStep: () => void;
  previousStep: () => void;
  isOpen: boolean;
}

export interface UpdateUserPaymentVariables {
  card_number: string;
  card_holder_name: string;
  card_cvv: string;
  card_expiration_date_month: string;
  card_expiration_date_year: string;
}

export function PaymentModal({
  isOpen,
  previousStep,
}: PaymentModalProps): JSX.Element {
  const [cardBrand, setCardBrand] = useState(GENERIC);

  const updateUserPaymentForm = useFormik<UpdateUserPaymentVariables>({
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
    <Modal
      isOpen={isOpen}
      setIsOpen={() => false}
      previousStep={previousStep}
      closeButton
      defaultContent={{
        title: 'Informe os dados do seu cartão de crédito',
        mainButton: {
          text: 'Confirmar assinatura',
          type: 'submit',
          form: 'updateUserPaymentForm',
          stretch: true,
        },
      }}
    >
      <PaymentForm
        id="updateUserPaymentForm"
        onSubmit={updateUserPaymentForm.handleSubmit}
      >
        <p>
          Fique tranquilo: você não será cobrado se cancelar antes do período
          gratuito terminar
        </p>

        <PaymentInputWrapper>
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
        </PaymentInputWrapper>

        <PaymentInputWrapper>
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
        </PaymentInputWrapper>

        <PaymentInputGroupWrapper>
          <p>Validade:</p>

          <PaymentInputWrapperSameLine>
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
          </PaymentInputWrapperSameLine>
        </PaymentInputGroupWrapper>

        <PaymentInputWrapperSameLine>
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
        </PaymentInputWrapperSameLine>
      </PaymentForm>
    </Modal>
  );
}
