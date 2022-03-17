/* eslint-disable no-underscore-dangle */
import { ChangeEvent, useCallback, useState } from 'react';
import { useFormik } from 'formik';

import { addressFromZipcodePagarme } from '../../services/pagarme/implementations/addressFromZipcodePagarme';
import { removeFormatZipcode } from '../../utils/removeFormatZipcode';
import Input from '../Input';
import Modal from '../Modal';
import {
  ConfirmAddressForm,
  ConfirmAddressInputGroupWrapper,
  ConfirmAddressInputWrapper,
  ConfirmAddressInputWrapperSameLine,
} from './ConfirmAddressModal';
import { useUpdateUserAddressMutation } from '../../generated/graphql';
import { useAuth } from '../../hooks/useAuth';

export interface ConfirmAddressModalProps {
  nextStep: () => void;
  previousStep: () => void;
  isOpen: boolean;
}

export interface UpdateUserConfirmAddressVariables {
  zipcode: string;
  street: string;
  number: string;
  complement: string;
  neighbourhood: string;
  city: string;
  state: string;
  country: string;
}

export function ConfirmAddressModal({
  isOpen,
  nextStep,
  previousStep,
}: ConfirmAddressModalProps): JSX.Element {
  const { me } = useAuth();

  const [showFields, setShowFields] = useState(false);

  const [updateUser] = useUpdateUserAddressMutation();

  const updateUserConfirmAddressForm = useFormik<UpdateUserConfirmAddressVariables>(
    {
      initialValues: {
        zipcode: '',
        street: '',
        number: '',
        complement: '',
        neighbourhood: '',
        city: '',
        state: '',
        country: '',
      },
      onSubmit: async values => {
        const response = await updateUser({
          variables: {
            userId: me?._id,
            address: values,
          },
        });

        console.log(response);
      },
    },
  );

  const handleChangeZipcode = useCallback(
    async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
      const inputZipcode = event.target.value;

      updateUserConfirmAddressForm.setFieldValue('zipcode', inputZipcode);
      if (inputZipcode.length === 9) {
        const {
          address,
          errors: zipcodeErrors,
        } = await addressFromZipcodePagarme(removeFormatZipcode(inputZipcode));

        if (address) {
          const { street, neighbourhood, city, state } = address;

          updateUserConfirmAddressForm.setValues({
            street: street || '',
            number: '',
            complement: '',
            neighbourhood: neighbourhood || '',
            city,
            state,
            country: 'Brasil',
            zipcode: inputZipcode,
          });

          setShowFields(true);
        }

        if (!address) {
          updateUserConfirmAddressForm.setFieldError(
            'zipcode',
            zipcodeErrors[0].message,
          );
        }
      }

      if (inputZipcode.length < 9) {
        setShowFields(false);
      }
    },

    [updateUserConfirmAddressForm],
  );

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={() => false}
      nextStep={nextStep}
      previousStep={previousStep}
      closeButton
      defaultContent={{
        title: 'Confirme seu endereço de cobrança:',
        mainButton: {
          text: 'Prosseguir',
          type: 'submit',
          form: 'updateUserConfirmAddressForm',
        },
      }}
    >
      <ConfirmAddressForm
        id="updateUserConfirmAddressForm"
        onSubmit={updateUserConfirmAddressForm.handleSubmit}
      >
        <ConfirmAddressInputGroupWrapper>
          <ConfirmAddressInputWrapper>
            <Input
              name="zipcode"
              value={updateUserConfirmAddressForm.values.zipcode}
              onChange={handleChangeZipcode}
              label="CEP"
              placeholder="01234-567"
              mask="99999-999"
              error={
                updateUserConfirmAddressForm.errors.zipcode
                // updateUserConfirmAddressForm.touched.zipcode &&
              }
            />
          </ConfirmAddressInputWrapper>

          {showFields && (
            <>
              <ConfirmAddressInputWrapper>
                <Input
                  name="street"
                  value={updateUserConfirmAddressForm.values.street}
                  onChange={e =>
                    updateUserConfirmAddressForm.setFieldValue(
                      'street',
                      e.target.value,
                    )
                  }
                  label="Rua"
                  placeholder="Av. Brasil"
                  error={
                    updateUserConfirmAddressForm.errors.street
                    // updateUserConfirmAddressForm.touched.street &&
                  }
                />
              </ConfirmAddressInputWrapper>

              <ConfirmAddressInputWrapperSameLine>
                <Input
                  name="number"
                  value={updateUserConfirmAddressForm.values.number}
                  onChange={e =>
                    updateUserConfirmAddressForm.setFieldValue(
                      'number',
                      e.target.value,
                    )
                  }
                  label="Número"
                  placeholder="192"
                  error={
                    updateUserConfirmAddressForm.errors.number
                    // updateUserConfirmAddressForm.touched.number &&
                  }
                />

                <Input
                  name="complement"
                  value={updateUserConfirmAddressForm.values.complement}
                  placeholder="Apto. 12"
                  onChange={e =>
                    updateUserConfirmAddressForm.setFieldValue(
                      'complement',
                      e.target.value,
                    )
                  }
                  label="Complemento"
                  error={
                    updateUserConfirmAddressForm.errors.complement
                    // updateUserConfirmAddressForm.touched.complement &&
                  }
                />
              </ConfirmAddressInputWrapperSameLine>

              <ConfirmAddressInputWrapper>
                <Input
                  name="neighbourhood"
                  value={updateUserConfirmAddressForm.values.neighbourhood}
                  onChange={e =>
                    updateUserConfirmAddressForm.setFieldValue(
                      'neighbourhood',
                      e.target.value,
                    )
                  }
                  label="Bairro"
                  placeholder="Centro"
                  error={
                    updateUserConfirmAddressForm.errors.neighbourhood
                    // updateUserConfirmAddressForm.touched.neighbourhood &&
                  }
                />
              </ConfirmAddressInputWrapper>

              <ConfirmAddressInputWrapper>
                <Input
                  name="city"
                  value={updateUserConfirmAddressForm.values.city}
                  onChange={e =>
                    updateUserConfirmAddressForm.setFieldValue(
                      'city',
                      e.target.value,
                    )
                  }
                  label="Cidade"
                  placeholder="São Paulo"
                  error={
                    updateUserConfirmAddressForm.errors.city
                    // updateUserConfirmAddressForm.touched.city &&
                  }
                />
              </ConfirmAddressInputWrapper>

              <ConfirmAddressInputWrapperSameLine>
                <Input
                  name="state"
                  value={updateUserConfirmAddressForm.values.state}
                  onChange={e =>
                    updateUserConfirmAddressForm.setFieldValue(
                      'state',
                      e.target.value,
                    )
                  }
                  label="UF"
                  placeholder="SP"
                  mask="aa"
                  error={
                    updateUserConfirmAddressForm.errors.state
                    // updateUserConfirmAddressForm.touched.state &&
                  }
                />

                <Input
                  name="country"
                  value={updateUserConfirmAddressForm.values.country}
                  placeholder="Brasil"
                  onChange={e =>
                    updateUserConfirmAddressForm.setFieldValue(
                      'country',
                      e.target.value,
                    )
                  }
                  label="País"
                  error={
                    updateUserConfirmAddressForm.errors.country
                    // updateUserConfirmAddressForm.touched.country &&
                  }
                />
              </ConfirmAddressInputWrapperSameLine>
            </>
          )}
        </ConfirmAddressInputGroupWrapper>
      </ConfirmAddressForm>
    </Modal>
  );
}
